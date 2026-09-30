/**
 * 倉庫通（宜搭應用）表單與字段 ID 常量表
 *
 * 說明：
 * - 所有 fieldId 均由 `openyida get-schema` 對真實表單實測取得，禁止手寫猜測
 * - 取樣時間：2026-09-27
 * - 應用：倉庫通（APP_RGMX9WOCVWT4XNZC1CQD，組織「Ec Info Tech Limited（專業版）」）
 */

/** 宜搭應用 ID（倉庫通） */
export const APP_TYPE = 'APP_RGMX9WOCVWT4XNZC1CQD';

/** 用到的表單 UUID */
export const FORM_UUID = {
  /** MR表單（receipt 型，物料需求單） */
  mr: 'FORM-FF9A60A90BD2454CBD0234703EA3462A3DDK',
  /** 產品信息（物料主數據，供 EC 報價物料明細下拉使用） */
  product: 'FORM-HT866U9151NDSK4993GFJCG4K9JL2DBXFHULLH',
  /** 供應商價格（供應商 × 產品的採購報價，MR 物料明細的關聯目標表） */
  supplierPrice: 'FORM-0B1995EDEF8D438C8D799F0218E9119AQ325',
  /** 採購訂單（流程表單，用於後續回同步採購單到 EC） */
  purchaseOrder: 'FORM-DJC666A16MPDWNE4AVZ0F9N4QBSX3AOPVIULLC'
};

/**
 * MR表單：主表字段
 * 來源：openyida get-schema APP_RGMX9WOCVWT4XNZC1CQD FORM-FF9A60A90BD2454CBD0234703EA3462A3DDK
 */
export const MR_HEADER = {
  /** MR號碼（TextField），規則 MR+MMDD+序號，如 MR0903-4 */
  mrNo: 'textField_mt84dlj5',
  /** 場地（TextField） */
  site: 'textField_2xpc2qtt5',
  /** 結算價格（NumberField） */
  settlementPrice: 'numberField_2xpd5hrya',
  /** 利潤率（NumberField） */
  profitRate: 'numberField_2xpd7jwbn',
  /** 完成日期（DateField） */
  completionDate: 'dateField_2xpd9b40y',
  /** 類型（RadioField）：Maintenance (M) / Project (P) / Internal Used (I) */
  category: 'radioField_2xpdbbl2r',
  /** 申請人（EmployeeField，需釘釘 userId 陣列） */
  applicant: 'employeeField_2xpc11nsm',
  /** 合同總價（NumberField） */
  contractAmount: 'numberField_2xpd4aqt2',
  /** 利潤（NumberField） */
  profit: 'numberField_2xpd6rsdb',
  /** 日期（DateField），13 位毫秒時間戳 */
  date: 'dateField_2xpd8psik',
  /** 工程項目（TextareaField） */
  projectDesc: 'textareaField_2xpc330r7',
  /** 物料明細（TableField 子表） */
  items: 'tableField_mt82hr87',
  /** Quotation ref（TextField），對應 EC 報價的 ourRef */
  quotationRef: 'textField_lcmq1gy22'
};

/**
 * MR表單：物料明細子表字段（隸屬於 MR_HEADER.items）
 * 預算組 = 報價物料明細；實際組 / 供應商 / 採購單號 = 採購後回填
 */
export const MR_ITEM = {
  /** 物料名稱（AssociationFormField，關聯「供應商價格」表） */
  materialRef: 'associationFormField_mt84dlj2',
  /** 物料名稱（文本）（TextField） */
  materialNameText: 'textField_mtgp1s29',
  /** 物料編號（TextField），存倉庫通的貨品編號 */
  materialCode: 'textField_mt82hr88',
  /** 預算數量（NumberField） */
  budgetQty: 'numberField_mt82hr8b',
  /** 物料單位（TextField） */
  unit: 'textField_mt84dlj4',
  /** 規格/型號（TextField） */
  spec: 'textField_mt82hr89',
  /** 物料分類（TextField） */
  category: 'textField_mt84dlj3',
  /** 品牌（TextField） */
  brand: 'textField_mtgm2fgt',
  /** 預算單價（NumberField） */
  budgetUnitPrice: 'numberField_mtgm2fgu',
  /** 預算金額（NumberField） */
  budgetAmount: 'numberField_mtgm2fgx',
  /** 實際數量（NumberField） */
  actualQty: 'numberField_mtgm2fgy',
  /** 實際單價（NumberField） */
  actualUnitPrice: 'numberField_mtgm2fgz',
  /** 實際金額（NumberField） */
  actualAmount: 'numberField_mtgm2fh0',
  /** 供應商（TextField） */
  supplier: 'textField_mtii86g2',
  /** 判頭（TextField） */
  contractor: 'textField_mtgm2fh2',
  /** 備註（銷售）（TextareaField） */
  salesRemark: 'textareaField_mtgm2fh3',
  /** 備註（採購）（TextareaField） */
  purchaseRemark: 'textareaField_mtgm2fh4',
  /** 採購單號（TextField） */
  purchaseOrderNo: 'textField_mtgm2fh5'
};

/**
 * 產品信息表字段（物料主數據，EC 報價物料明細下拉的數據源）
 */
export const PRODUCT = {
  /** 貨品名稱（TextField） */
  name: 'textField_lluh6s8y',
  /** 貨品編號（TextField），跨系統物料匹配鍵 */
  code: 'textField_mrxfgkng',
  /** EC貨物類型（SelectField） */
  ecType: 'selectField_lluief3n',
  /** 規格（TextField） */
  spec: 'textField_lluief3m',
  /** 單位（SelectField） */
  unit: 'selectField_lluief3o',
  /** 品牌(Model)（TextField） */
  brand: 'textField_tzjw1xk58',
  /** 產地（TextField） */
  origin: 'textField_msorv8v8',
  /** 產品編號（SerialNumberField 流水號） */
  productNo: 'serialNumberField_lluh6s8x',
  /** 銷售價格（NumberField） */
  salesPrice: 'numberField_lluief3q',
  /** 成本單價（NumberField） */
  costPrice: 'numberField_lluief3r'
};

/**
 * 供應商價格表字段（MR 物料明細關聯的反查來源）
 */
export const SUPPLIER_PRICE = {
  /** 供應商名稱（TextField） */
  supplierName: 'textField_lzwaqnw7',
  /** 供應商編碼（TextField） */
  supplierCode: 'textField_lzwaqnw6',
  /** 貨品編號（TextField），反查鍵 */
  productCode: 'textField_lluou1c5',
  /** 產品名稱（TextField） */
  productName: 'textField_llvlifra',
  /** 產品規則（TextField） */
  productRule: 'textField_lluou1c6',
  /** 產品單位（TextField） */
  productUnit: 'textField_lluou1c7',
  /** 產品分類（TextField） */
  productCategory: 'textField_lluou1c8',
  /** 採購單價（NumberField） */
  purchasePrice: 'numberField_llxl4d3o'
};

/**
 * 採購訂單表字段（後續回同步採購單到 EC 時使用）
 */
export const PURCHASE_ORDER = {
  /** 采購訂單號（TextField） */
  orderNo: 'textField_wbgw1oz4s',
  /** 選擇MR（AssociationFormField） */
  mrRef: 'associationFormField_89kt1gybh',
  /** MR號碼(文本)（TextField） */
  mrNoText: 'textField_mt2d2869',
  /** 供應商名稱（AssociationFormField） */
  supplierRef: 'associationFormField_lluk25g9',
  /** 供應商名稱（文本）（TextField） */
  supplierNameText: 'textField_lq3i3x92',
  /** 日期（DateField） */
  orderDate: 'dateField_llukdke0',
  /** 需到貨日期（DateField） */
  expectedDate: 'dateField_llukdke3',
  /** 備註（TextareaField） */
  remark: 'textareaField_lsx0k244',
  /** 入库状态（RadioField） */
  inboundStatus: 'radioField_llxdq586',
  /** 採購產品明細（TableField） */
  items: 'tableField_lluk25ga'
};

/**
 * 採購訂單「採購產品明細」子表字段
 */
export const PURCHASE_ORDER_ITEM = {
  /** 產品名稱（TextField） */
  productName: 'textField_lr0ft66m',
  /** 貨品編號（TextField） */
  productCode: 'textField_lluk25gd',
  /** 採購數量（NumberField） */
  qty: 'numberField_llukdke4',
  /** 採購單價（NumberField） */
  unitPrice: 'numberField_lluk25gg',
  /** 已入庫數量（NumberField） */
  inboundQty: 'numberField_lns8yxjz',
  /** 產品規格（TextField） */
  spec: 'textField_lluk25gc',
  /** 單位（TextField） */
  unit: 'textField_lluk25gf'
};

/**
 * MR「類型」選項映射：EC 報價類別 → 倉庫通 MR 類型
 * 對應 radioField_2xpdbbl2r 的三個選項值
 */
export const MR_TYPE_BY_CATEGORY = {
  M: 'Maintenance (M)',
  P: 'Project (P)',
  I: 'Internal Used (I)'
};

/** 關聯「供應商價格」表時需要回填的欄位（宜搭關聯字段格式要求） */
export const SUPPLIER_PRICE_ASSOCIATION = {
  appType: APP_TYPE,
  formUuid: FORM_UUID.supplierPrice,
  // formType 必填：缺失時宜搭會靜默丟棄該關聯（實測驗證）
  formType: 'receipt'
};
