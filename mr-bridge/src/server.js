/**
 * MR 中間服務 HTTP 入口
 *
 * 對外接口：
 * - GET  /health          健康檢查
 * - GET  /api/materials   物料清單（倉庫通「產品信息」，供 EC 報價物料明細下拉）
 * - POST /api/mr/push     推送 MR（EC 備貨單 → 倉庫通 MR表單 新建）
 *
 * 啟動：node src/server.js
 */
import http from 'node:http';
import { loadConfig } from './config.js';
import { createYidaClient } from './yidaClient.js';
import { MrService } from './mrService.js';
import { APP_TYPE, FORM_UUID } from './fieldMap.js';

/** 讀取並解析請求體（限制 2MB，避免異常大包打爆內存） */
function readJsonBody(request, limitBytes = 2 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(new Error('請求體過大（上限 2MB）'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8').trim();
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error(`請求體不是合法 JSON：${error.message}`));
      }
    });
    request.on('error', reject);
  });
}

/** 統一響應輸出（附 CORS 頭，允許 EC 原型頁面直接調用） */
function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  response.end(body);
}

/** 路由分發 */
async function handleRequest(request, response, service, config) {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const route = `${request.method} ${url.pathname}`;

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (route === 'GET /health') {
    sendJson(response, 200, { ok: true, mode: config.mode, appType: config.appType || APP_TYPE });
    return;
  }

  if (route === 'GET /api/materials') {
    sendJson(response, 200, await service.listMaterials());
    return;
  }

  if (route === 'POST /api/mr/push') {
    const payload = await readJsonBody(request);
    sendJson(response, 200, await service.pushMr(payload));
    return;
  }

  sendJson(response, 404, {
    ok: false,
    error: `未找到路由 ${route}`,
    availableRoutes: ['GET /health', 'GET /api/materials', 'POST /api/mr/push']
  });
}

/** 服務啟動 */
function start() {
  const config = loadConfig();
  config.appType = config.appType || APP_TYPE;
  const yidaClient = createYidaClient(config, { formUuidMap: { FORM_UUID } });
  const service = new MrService({ config, yidaClient });

  const server = http.createServer((request, response) => {
    handleRequest(request, response, service, config).catch((error) => {
      sendJson(response, 500, { ok: false, error: error.message });
    });
  });

  server.listen(config.port, () => {
    console.log(`[mr-bridge] 已啟動 http://localhost:${config.port}  mode=${config.mode}`);
    console.log(`[mr-bridge] 健康檢查   GET  http://localhost:${config.port}/health`);
    console.log(`[mr-bridge] 物料清單   GET  http://localhost:${config.port}/api/materials`);
    console.log(`[mr-bridge] 推送 MR    POST http://localhost:${config.port}/api/mr/push`);
  });
}

start();
