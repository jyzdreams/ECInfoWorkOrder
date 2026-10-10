/**
 * 宜搭表單數據客戶端
 *
 * 提供兩種實現：
 * - OpenApiYidaClient：走釘釘開放平台「宜搭 OpenAPI v2」，用於生產環境
 *   - 取 token：POST https://api.dingtalk.com/v1.0/oauth2/accessToken
 *   - 查詢：  POST https://api.dingtalk.com/v2.0/yida/forms/instances/search
 *   - 新增：  POST https://api.dingtalk.com/v2.0/yida/forms/instances
 *   - 更新：  PUT  https://api.dingtalk.com/v2.0/yida/forms/instances
 * - DryRunYidaClient：不發真實請求，基於本地快照資料返回，用於本地校驗映射邏輯
 *
 * 參考：https://open.dingtalk.com/document/orgapp/api-saveformdata-v2
 *       https://open.dingtalk.com/document/orgapp/api-searchformdatas-v2
 */
import fs from 'node:fs';
import path from 'node:path';

const DINGTALK_API_HOST = 'https://api.dingtalk.com';

/** 宜搭 OpenAPI 客戶端（生產模式） */
export class OpenApiYidaClient {
  /**
   * @param {object} options
   * @param {string} options.appKey 釘釘企業內部應用 AppKey
   * @param {string} options.appSecret 釘釘企業內部應用 AppSecret
   * @param {string} options.systemToken 宜搭應用密鑰（應用設置-部署運維）
   * @param {string} options.defaultUserId 默認操作人 userId
   */
  constructor({ appKey, appSecret, systemToken, defaultUserId = '' }) {
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.systemToken = systemToken;
    this.defaultUserId = defaultUserId;
    /** accessToken 緩存 { token, expiresAt } */
    this.tokenCache = null;
  }

  /** 獲取 accessToken，帶本地緩存（提前 5 分鐘過期） */
  async getAccessToken() {
    const now = Date.now();
    if (this.tokenCache && this.tokenCache.expiresAt > now) {
      return this.tokenCache.token;
    }
    const response = await fetch(`${DINGTALK_API_HOST}/v1.0/oauth2/accessToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appKey: this.appKey, appSecret: this.appSecret })
    });
    const payload = await response.json();
    if (!response.ok || !payload.accessToken) {
      throw new Error(`獲取 accessToken 失敗：${response.status} ${JSON.stringify(payload)}`);
    }
    this.tokenCache = {
      token: payload.accessToken,
      expiresAt: now + (Number(payload.expireIn) || 7200) * 1000 - 5 * 60 * 1000
    };
    return this.tokenCache.token;
  }

  /** 統一的宜搭 OpenAPI 請求封裝 */
  async request(method, apiPath, body) {
    const token = await this.getAccessToken();
    const response = await fetch(`${DINGTALK_API_HOST}${apiPath}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-acs-dingtalk-access-token': token
      },
      body: body ? JSON.stringify(body) : undefined
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.success === false) {
      throw new Error(`宜搭接口調用失敗 ${apiPath}：${response.status} ${JSON.stringify(payload)}`);
    }
    return payload;
  }

  /** 拼裝宜搭 OpenAPI 公共入參（appType / systemToken / userId / language） */
  buildCommonParams(appType, userId) {
    return {
      appType,
      systemToken: this.systemToken,
      userId: userId || this.defaultUserId,
      language: 'zh_CN'
    };
  }

  /**
   * 查詢表單實例列表
   * @returns {Promise<{totalCount:number, data:Array}>}
   */
  async searchFormDatas({ appType, formUuid, searchFieldJson = '', currentPage = 1, pageSize = 100, userId }) {
    return this.request('POST', '/v2.0/yida/forms/instances/search', {
      ...this.buildCommonParams(appType, userId),
      formUuid,
      searchFieldJson,
      currentPage,
      pageSize
    });
  }

  /**
   * 新增表單實例
   * @returns {Promise<{formInstId:string}>}
   */
  async saveFormData({ appType, formUuid, formDataJson, userId }) {
    const payload = await this.request('POST', '/v2.0/yida/forms/instances', {
      ...this.buildCommonParams(appType, userId),
      formUuid,
      formDataJson: typeof formDataJson === 'string' ? formDataJson : JSON.stringify(formDataJson)
    });
    // 新增接口返回 result 為實例 ID
    return { formInstId: payload.result || payload.formInstId || '' };
  }

  /**
   * 更新表單實例（子表只能整表覆蓋，無法只更新某一行）
   */
  async updateFormData({ appType, formUuid, formInstId, updateFormDataJson, userId }) {
    return this.request('PUT', '/v2.0/yida/forms/instances', {
      ...this.buildCommonParams(appType, userId),
      formInstId,
      updateFormDataJson:
        typeof updateFormDataJson === 'string' ? updateFormDataJson : JSON.stringify(updateFormDataJson)
    });
  }
}

/** 本地校驗客戶端：讀取快照資料，不產生任何真實寫入 */
export class DryRunYidaClient {
  /**
   * @param {object} options
   * @param {string} options.fixtureDir 快照資料目錄
   */
  constructor({ fixtureDir }) {
    this.fixtureDir = fixtureDir;
    /** 記錄所有被攔截的調用，便於排查與斷言 */
    this.calls = [];
  }

  /** 讀取快照 JSON 檔案（兼容 CLI 輸出噪聲，自動截取 JSON 片段） */
  readFixture(fileName) {
    const filePath = path.join(this.fixtureDir, fileName);
    if (!fs.existsSync(filePath)) return { totalCount: 0, data: [] };
    const raw = fs.readFileSync(filePath, 'utf8');
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    return JSON.parse(raw.slice(start, end + 1));
  }

  /** 按 formUuid 選擇對應快照檔案 */
  resolveFixtureFile(formUuid) {
    const { FORM_UUID } = this.fixtureFormUuidMap;
    if (formUuid === FORM_UUID.supplierPrice) return 'supplierPrice.json';
    if (formUuid === FORM_UUID.product) return 'productInfo.json';
    if (formUuid === FORM_UUID.mr) return 'mrList.json';
    return null;
  }

  /** 查詢：從快照檔案返回資料 */
  async searchFormDatas({ formUuid }) {
    const fileName = this.resolveFixtureFile(formUuid);
    this.calls.push({ type: 'search', formUuid, fileName });
    if (!fileName) return { totalCount: 0, data: [] };
    return this.readFixture(fileName);
  }

  /** 新增：只記錄，不寫入，返回模擬實例 ID */
  async saveFormData({ formUuid, formDataJson }) {
    const formInstId = `FINST-DRYRUN-${Date.now()}`;
    this.calls.push({ type: 'save', formUuid, formDataJson, formInstId });
    return { formInstId };
  }

  /** 更新：只記錄 */
  async updateFormData({ formUuid, formInstId, updateFormDataJson }) {
    this.calls.push({ type: 'update', formUuid, formInstId, updateFormDataJson });
    return { success: true };
  }
}

/** 由配置創建對應的客戶端實例 */
export function createYidaClient(config, options = {}) {
  if (config.mode === 'openapi') {
    return new OpenApiYidaClient(config.openapi);
  }
  const client = new DryRunYidaClient({
    fixtureDir: options.fixtureDir || path.join(process.cwd(), 'test', 'fixtures')
  });
  // 注入表單 UUID 映射，供快照檔案路由使用
  client.fixtureFormUuidMap = options.formUuidMap || {};
  return client;
}
