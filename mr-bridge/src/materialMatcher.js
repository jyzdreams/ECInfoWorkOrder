/**
 * 物料匹配器
 *
 * 職責：
 * 1. 讀取倉庫通「產品信息」表，作為 EC 報價物料明細下拉的物料清單
 * 2. 讀取倉庫通「供應商價格」表，按「貨品編號」建立反查索引
 *    —— MR 的「物料名稱」字段必須關聯到「供應商價格」表的實例，
 *       因此推送時要按貨品編號反查實例 ID
 *
 * 反查規則（已與業務確認）：
 * - 命中 1 條 → 直接關聯
 * - 命中 N 條 → 取 gmtModified 最新一條（重複資料通常同價同供應商，取哪條等價）
 * - 命中 0 條 → 只寫文本欄位，關聯留空，並在「備註（採購）」標記待維護（不阻斷推送）
 */
import { FORM_UUID, PRODUCT, SUPPLIER_PRICE } from './fieldMap.js';

/** 匹配狀態枚舉 */
export const MATCH_STATUS = {
  /** 唯一命中，可建立關聯 */
  MATCHED: 'matched',
  /** 多條命中，取最新一條 */
  DUPLICATED: 'duplicated',
  /** 未命中，只能寫文本 */
  MISSING: 'missing'
};

/** 未命中時的備註文案（寫入 MR 子表的「備註（採購）」） */
export const MISSING_NOTE = '供應商價格表暫無此物料報價，待採購部維護';

export class MaterialMatcher {
  /**
   * @param {object} options
   * @param {object} options.yidaClient 宜搭客戶端
   * @param {string} options.appType 宜搭應用 ID
   */
  constructor({ yidaClient, appType }) {
    this.yidaClient = yidaClient;
    this.appType = appType;
    /** 產品信息清單緩存 */
    this.productCache = null;
    /** 貨品編號 → 供應商價格記錄陣列 的索引緩存 */
    this.supplierPriceIndex = null;
  }

  /** 從宜搭記錄中取 formData（OpenAPI 頂層是 formData，降級兼容 formDataJson 字串） */
  static extractFormData(record) {
    if (record && record.formData) return record.formData;
    if (record && typeof record.formDataJson === 'string') {
      try {
        return JSON.parse(record.formDataJson);
      } catch {
        return {};
      }
    }
    return {};
  }

  /** 讀取並緩存「產品信息」清單（供 EC 側下拉使用） */
  async loadProducts() {
    if (this.productCache) return this.productCache;
    const result = await this.yidaClient.searchFormDatas({
      appType: this.appType,
      formUuid: FORM_UUID.product,
      currentPage: 1,
      pageSize: 100
    });
    this.productCache = (result.data || []).map((record) => {
      const formData = MaterialMatcher.extractFormData(record);
      return {
        instanceId: record.formInstId || record.formInstanceId || '',
        productCode: formData[PRODUCT.code] || '',
        productName: formData[PRODUCT.name] || '',
        spec: formData[PRODUCT.spec] || '',
        unit: formData[PRODUCT.unit] || '',
        ecType: formData[PRODUCT.ecType] || '',
        brand: formData[PRODUCT.brand] || '',
        origin: formData[PRODUCT.origin] || '',
        productNo: formData[PRODUCT.productNo] || '',
        costPrice: formData[PRODUCT.costPrice] ?? null
      };
    });
    return this.productCache;
  }

  /** 讀取並緩存「供應商價格」反查索引：貨品編號 → 記錄陣列 */
  async loadSupplierPriceIndex() {
    if (this.supplierPriceIndex) return this.supplierPriceIndex;
    const result = await this.yidaClient.searchFormDatas({
      appType: this.appType,
      formUuid: FORM_UUID.supplierPrice,
      currentPage: 1,
      pageSize: 100
    });
    const index = new Map();
    (result.data || []).forEach((record) => {
      const formData = MaterialMatcher.extractFormData(record);
      const code = String(formData[SUPPLIER_PRICE.productCode] || '').trim();
      if (!code) return;
      const entry = {
        instanceId: record.formInstId || record.formInstanceId || '',
        productCode: code,
        productName: formData[SUPPLIER_PRICE.productName] || '',
        supplierName: formData[SUPPLIER_PRICE.supplierName] || '',
        supplierCode: formData[SUPPLIER_PRICE.supplierCode] || '',
        productRule: formData[SUPPLIER_PRICE.productRule] || '',
        productUnit: formData[SUPPLIER_PRICE.productUnit] || '',
        productCategory: formData[SUPPLIER_PRICE.productCategory] || '',
        purchasePrice: formData[SUPPLIER_PRICE.purchasePrice] ?? null,
        // gmtModified 可能是毫秒時間戳或 ISO 字串，統一轉為數字用於比較
        modifiedAt: Number(record.gmtModified) || Date.parse(record.modifiedTimeGMT || '') || 0
      };
      if (!index.has(code)) index.set(code, []);
      index.get(code).push(entry);
    });
    this.supplierPriceIndex = index;
    return this.supplierPriceIndex;
  }

  /**
   * 按貨品編號反查「供應商價格」表
   * @param {string} productCode 貨品編號
   * @returns {Promise<{status:string, record:object|null, candidates:Array, note:string}>}
   */
  async findByProductCode(productCode) {
    const code = String(productCode || '').trim();
    if (!code) {
      return { status: MATCH_STATUS.MISSING, record: null, candidates: [], note: MISSING_NOTE };
    }
    const index = await this.loadSupplierPriceIndex();
    const candidates = index.get(code) || [];
    if (candidates.length === 0) {
      return { status: MATCH_STATUS.MISSING, record: null, candidates: [], note: MISSING_NOTE };
    }
    if (candidates.length === 1) {
      return { status: MATCH_STATUS.MATCHED, record: candidates[0], candidates, note: '' };
    }
    // 多條命中：取最近修改的一條
    const latest = [...candidates].sort((a, b) => b.modifiedAt - a.modifiedAt)[0];
    return { status: MATCH_STATUS.DUPLICATED, record: latest, candidates, note: '' };
  }
}
