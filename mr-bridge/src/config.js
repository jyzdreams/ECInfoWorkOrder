/**
 * 服務配置讀取與校驗
 *
 * 配置來源優先級：環境變數 > config.json > 內置默認值
 * 憑據（appKey / appSecret / systemToken）只允許寫在 config.json 或環境變數中，
 * 不可寫入倉庫（config.json 已在 .gitignore 中忽略）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(CURRENT_DIR, '..');
const CONFIG_FILE = path.join(PROJECT_ROOT, 'config.json');

/** 讀取 config.json（不存在時返回空對象，不拋錯） */
function readConfigFile() {
  if (!fs.existsSync(CONFIG_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (error) {
    throw new Error(`config.json 解析失敗：${error.message}`);
  }
}

/** 環境變數覆蓋（僅在有值時生效） */
function applyEnvOverride(config) {
  const env = process.env;
  if (env.MR_BRIDGE_PORT) config.port = Number(env.MR_BRIDGE_PORT);
  if (env.MR_BRIDGE_MODE) config.mode = env.MR_BRIDGE_MODE;
  if (env.MR_BRIDGE_APP_TYPE) config.appType = env.MR_BRIDGE_APP_TYPE;
  if (env.MR_BRIDGE_CORP_ID) config.corpId = env.MR_BRIDGE_CORP_ID;
  config.openapi = config.openapi || {};
  if (env.MR_BRIDGE_APP_KEY) config.openapi.appKey = env.MR_BRIDGE_APP_KEY;
  if (env.MR_BRIDGE_APP_SECRET) config.openapi.appSecret = env.MR_BRIDGE_APP_SECRET;
  if (env.MR_BRIDGE_SYSTEM_TOKEN) config.openapi.systemToken = env.MR_BRIDGE_SYSTEM_TOKEN;
  if (env.MR_BRIDGE_USER_ID) config.openapi.defaultUserId = env.MR_BRIDGE_USER_ID;
  return config;
}

/** 校驗配置完整性：openapi 模式下憑據缺失則直接拋錯，避免運行時才暴露 */
function validate(config) {
  if (!['dry-run', 'openapi'].includes(config.mode)) {
    throw new Error(`不支持的 mode：${config.mode}，可選值為 dry-run / openapi`);
  }
  if (config.mode === 'openapi') {
    const { appKey, appSecret, systemToken } = config.openapi || {};
    const missing = [];
    if (!appKey) missing.push('openapi.appKey');
    if (!appSecret) missing.push('openapi.appSecret');
    if (!systemToken) missing.push('openapi.systemToken');
    if (missing.length) {
      throw new Error(
        `mode=openapi 缺少必要憑據：${missing.join('、')}。` +
          '請複製 config.example.json 為 config.json 並填入，或改用 mode=dry-run 做本地校驗。'
      );
    }
  }
  return config;
}

/** 載入並校驗配置（服務啟動時調用一次） */
export function loadConfig() {
  const base = {
    port: 8790,
    mode: 'dry-run',
    appType: '',
    corpId: '',
    openapi: { appKey: '', appSecret: '', systemToken: '', defaultUserId: '' }
  };
  const merged = { ...base, ...readConfigFile() };
  // openapi 子對象需要單獨淺合併，避免默認 key 被整體覆蓋丟失
  merged.openapi = { ...base.openapi, ...(readConfigFile().openapi || {}) };
  return validate(applyEnvOverride(merged));
}

export { PROJECT_ROOT, CONFIG_FILE };
