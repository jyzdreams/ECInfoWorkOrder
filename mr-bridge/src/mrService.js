/**
 * MR 推送業務編排
 *
 * 對外能力：
 * - listMaterials()：返回倉庫通「產品信息」清單（給 EC 報價物料明細下拉用）
 * - pushMr(payload)：按「一張備貨單 = 一張 MR」推送並新建 MR表單實例
 */
import { FORM_UUID, MR_HEADER } from './fieldMap.js';
import { buildMrFormData, buildMrNo } from './mrBuilder.js';
import { MaterialMatcher } from './materialMatcher.js';

export class MrService {
  /**
   * @param {object} options
   * @param {object} options.config 服務配置
   * @param {object} options.yidaClient 宜搭客戶端
   */
  constructor({ config, yidaClient }) {
    this.config = config;
    this.yidaClient = yidaClient;
    this.matcher = new MaterialMatcher({ yidaClient, appType: config.appType });
  }

  /** 校驗推送入參，缺失必填項時拋出可讀錯誤 */
  validatePushPayload(payload) {
    const errors = [];
    if (!payload || typeof payload !== 'object') {
      throw new Error('請求體必須是 JSON 對象');
    }
    if (!payload.stockPreparation || !payload.stockPreparation.id) {
      errors.push('stockPreparation.id（備貨單號）');
    }
    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      errors.push('items（報價物料明細，至少一行）');
    }
    if (!payload.applicantUserId && !this.config.openapi.defaultUserId) {
      errors.push('applicantUserId（申請人釘釘 userId）');
    }
    if (errors.length) {
      throw new Error(`推送 MR 缺少必填項：${errors.join('、')}`);
    }
  }

  /** 讀取倉庫通「產品信息」清單（供 EC 下拉數據源） */
  async listMaterials() {
    const products = await this.matcher.loadProducts();
    return {
      ok: true,
      mode: this.config.mode,
      total: products.length,
      materials: products
    };
  }

  /** 讀取既有 MR 號碼清單，用於生成當日序號 */
  async loadExistingMrNos() {
    const result = await this.yidaClient.searchFormDatas({
      appType: this.config.appType,
      formUuid: FORM_UUID.mr,
      currentPage: 1,
      pageSize: 100
    });
    return (result.data || [])
      .map((record) => MaterialMatcher.extractFormData(record)[MR_HEADER.mrNo])
      .filter(Boolean);
  }

  /**
   * 推送 MR：由備貨單 + 報價物料明細生成並新建一張 MR表單
   * @param {object} payload 推送入參
   * @returns {Promise<object>} 推送結果（含 MR 號碼、實例 ID、逐行匹配報告）
   */
  async pushMr(payload) {
    this.validatePushPayload(payload);

    const { stockPreparation, quotation = {}, items, site = '', projectDesc = '', applicantUserId } = payload;

    // 1. 生成 MR 號碼（沿用倉庫通規則 MR+MMDD+序號）
    const now = new Date();
    const existingMrNos = await this.loadExistingMrNos();
    const mrNo = payload.mrNo || buildMrNo(now, existingMrNos);

    // 2. 構建 MR formData（逐行反查「供應商價格」表）
    const { formData, items: itemReport } = await buildMrFormData({
      mrNo,
      category: quotation.category || payload.category || '',
      applicantUserId: applicantUserId || this.config.openapi.defaultUserId,
      site,
      projectDesc,
      quotationRef: quotation.ourRef || payload.quotationRef || '',
      items,
      matcher: this.matcher,
      createdAt: now
    });

    // 3. 寫入倉庫通 MR表單
    const saved = await this.yidaClient.saveFormData({
      appType: this.config.appType,
      formUuid: FORM_UUID.mr,
      formDataJson: formData,
      userId: applicantUserId || this.config.openapi.defaultUserId
    });

    const matchedCount = itemReport.filter((row) => row.matchStatus !== 'missing').length;
    return {
      ok: true,
      mode: this.config.mode,
      mrNo,
      formInstId: saved.formInstId,
      stockPreparationId: stockPreparation.id,
      itemCount: itemReport.length,
      matchedCount,
      missingCount: itemReport.length - matchedCount,
      items: itemReport
    };
  }
}
