/**
 * MR 表單數據構建器
 *
 * 職責：把 EC 工單系統的「備貨單 + 報價單物料明細」映射為倉庫通「MR表單」的 formDataJson
 *
 * 映射原則（已與業務確認）：
 * - 粒度：一張備貨單 = 一張 MR
 * - 報價物料明細 → MR 子表的「預算」組（預算數量 / 預算單價 / 預算金額）
 * - 「實際」組（實際數量 / 實際單價 / 實際金額 / 供應商 / 採購單號）留空，等採購訂單創建後回填
 * - MR 的「物料名稱」需關聯「供應商價格」表，按貨品編號反查實例 ID
 */
import {
  APP_TYPE,
  MR_HEADER,
  MR_ITEM,
  MR_TYPE_BY_CATEGORY,
  SUPPLIER_PRICE_ASSOCIATION
} from './fieldMap.js';

/**
 * 生成 MR 號碼：沿用倉庫通原規則 MR + MMDD + 序號（如 MR0903-4）
 * @param {Date} date 生成日期
 * @param {string[]} existingMrNos 已有的 MR 號碼清單（用於取當日最大序號 + 1）
 * @returns {string} 新的 MR 號碼
 */
export function buildMrNo(date, existingMrNos = []) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const prefix = `MR${month}${day}-`;
  const usedSeq = existingMrNos
    .filter((no) => typeof no === 'string' && no.startsWith(prefix))
    .map((no) => Number(no.slice(prefix.length)))
    .filter((seq) => Number.isFinite(seq) && seq > 0);
  const nextSeq = usedSeq.length ? Math.max(...usedSeq) + 1 : 1;
  return `${prefix}${nextSeq}`;
}

/**
 * 映射 MR「類型」：EC 報價類別 → 倉庫通選項值
 * @param {string} category EC 報價類別（M / P / I，M+P 取 M）
 * @returns {string} 倉庫通 MR 類型選項值
 */
export function mapMrCategory(category) {
  const key = String(category || '').toUpperCase();
  // M+P 這類組合類別，優先歸入 M（保養維修）
  if (key.includes('M')) return MR_TYPE_BY_CATEGORY.M;
  if (key.includes('P')) return MR_TYPE_BY_CATEGORY.P;
  if (key.includes('I')) return MR_TYPE_BY_CATEGORY.I;
  return '';
}

/** 金額保留兩位小數，避免浮點誤差寫入宜搭 */
function round2(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 100) / 100;
}

/**
 * 構建單行 MR 物料明細
 * @param {object} item EC 報價物料明細行
 * @param {object} matcher 物料匹配器
 * @returns {Promise<{row:object, report:object}>} 子表行數據 + 匹配結果報告
 */
async function buildMrItemRow(item, matcher) {
  const qty = round2(item.qty);
  const unitPrice = round2(item.unitPrice);
  const match = await matcher.findByProductCode(item.productCode);

  const row = {
    [MR_ITEM.materialNameText]: item.productName || item.name || '',
    [MR_ITEM.materialCode]: item.productCode || '',
    [MR_ITEM.budgetQty]: qty,
    [MR_ITEM.unit]: item.unit || '',
    [MR_ITEM.spec]: item.spec || '',
    [MR_ITEM.budgetUnitPrice]: unitPrice,
    [MR_ITEM.budgetAmount]: round2(qty * unitPrice)
  };

  // 命中「供應商價格」表時寫入關聯；未命中則留空並在採購備註中標記
  if (match.record) {
    row[MR_ITEM.materialRef] = [
      {
        appType: SUPPLIER_PRICE_ASSOCIATION.appType,
        formUuid: SUPPLIER_PRICE_ASSOCIATION.formUuid,
        // formType 必填，缺失時宜搭會靜默丟棄該關聯（實測驗證）
        formType: SUPPLIER_PRICE_ASSOCIATION.formType,
        instanceId: match.record.instanceId,
        // title / subTitle 對應關聯表顯示用的「貨品編號 / 產品名稱」
        title: match.record.productCode,
        subTitle: match.record.productName
      }
    ];
    // 素材分類與品牌在命中時可一併帶出，方便 MR 閱讀
    if (match.record.productCategory) row[MR_ITEM.category] = match.record.productCategory;
    if (match.record.productUnit && !row[MR_ITEM.unit]) row[MR_ITEM.unit] = match.record.productUnit;
  } else {
    row[MR_ITEM.purchaseRemark] = match.note;
  }

  return {
    row,
    report: {
      productCode: item.productCode || '',
      productName: item.productName || item.name || '',
      qty,
      matchStatus: match.status,
      matchedInstanceId: match.record ? match.record.instanceId : '',
      matchedSupplier: match.record ? match.record.supplierName : '',
      candidateCount: match.candidates.length,
      note: match.note
    }
  };
}

/**
 * 構建完整的 MR formDataJson
 * @param {object} params
 * @param {string} params.mrNo MR 號碼
 * @param {string} params.category EC 報價類別（M / P / I）
 * @param {string} params.applicantUserId 申請人釘釘 userId
 * @param {string} [params.site] 場地
 * @param {string} [params.projectDesc] 工程項目
 * @param {string} [params.quotationRef] 報價 ourRef（寫入 Quotation ref）
 * @param {Array} params.items 報價物料明細
 * @param {object} params.matcher 物料匹配器
 * @param {Date} [params.createdAt] 單據日期
 * @returns {Promise<{formData:object, items:Array}>} formData 為可直接提交的對象，items 為匹配報告
 */
export async function buildMrFormData({
  mrNo,
  category,
  applicantUserId,
  site = '',
  projectDesc = '',
  quotationRef = '',
  items = [],
  matcher,
  createdAt = new Date()
}) {
  const rows = [];
  const report = [];
  for (const item of items) {
    const built = await buildMrItemRow(item, matcher);
    rows.push(built.row);
    report.push(built.report);
  }

  const formData = {
    [MR_HEADER.mrNo]: mrNo,
    [MR_HEADER.date]: createdAt.getTime(),
    [MR_HEADER.applicant]: applicantUserId ? [applicantUserId] : [],
    [MR_HEADER.category]: mapMrCategory(category),
    [MR_HEADER.site]: site,
    [MR_HEADER.projectDesc]: projectDesc,
    [MR_HEADER.quotationRef]: quotationRef,
    [MR_HEADER.items]: rows
  };

  return { formData, items: report };
}

export { APP_TYPE };
