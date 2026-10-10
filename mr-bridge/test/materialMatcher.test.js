/**
 * 物料匹配器單元測試
 * 用本地快照資料（真實抓取的倉庫通資料）驗證「貨品編號 → 供應商價格」反查規則
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DryRunYidaClient } from '../src/yidaClient.js';
import { MaterialMatcher, MATCH_STATUS, MISSING_NOTE } from '../src/materialMatcher.js';
import { APP_TYPE, FORM_UUID } from '../src/fieldMap.js';

const FIXTURE_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');

/** 建立一個基於本地快照的物料匹配器 */
function createMatcher() {
  const yidaClient = new DryRunYidaClient({ fixtureDir: FIXTURE_DIR });
  yidaClient.fixtureFormUuidMap = { FORM_UUID };
  return new MaterialMatcher({ yidaClient, appType: APP_TYPE });
}

test('產品信息表可讀出全部 27 條物料主數據', async () => {
  const matcher = createMatcher();
  const products = await matcher.loadProducts();
  assert.equal(products.length, 27);
  assert.ok(products.every((item) => item.productCode));
});

test('唯一貨品編號命中一條供應商價格', async () => {
  const matcher = createMatcher();
  const result = await matcher.findByProductCode('EC(電源開關)-啟明-110V-深圳');
  assert.equal(result.status, MATCH_STATUS.MATCHED);
  assert.equal(result.record.supplierName, '深圳啟明');
  assert.equal(result.record.purchasePrice, 35);
  assert.ok(result.record.instanceId.startsWith('FINST-'));
});

test('重複貨品編號取最近修改的一條', async () => {
  const matcher = createMatcher();
  const result = await matcher.findByProductCode('EC(电源)--12v-');
  assert.equal(result.status, MATCH_STATUS.DUPLICATED);
  assert.equal(result.candidates.length, 3);
  // 三條資料的 gmtModified 最大者應被選中
  const latest = Math.max(...result.candidates.map((item) => item.modifiedAt));
  assert.equal(result.record.modifiedAt, latest);
});

test('未命中時返回待維護備註且不建立關聯', async () => {
  const matcher = createMatcher();
  const result = await matcher.findByProductCode('ECINFO-2585');
  assert.equal(result.status, MATCH_STATUS.MISSING);
  assert.equal(result.record, null);
  assert.equal(result.note, MISSING_NOTE);
});

test('空貨品編號視為未命中，不拋錯', async () => {
  const matcher = createMatcher();
  const result = await matcher.findByProductCode('');
  assert.equal(result.status, MATCH_STATUS.MISSING);
  assert.equal(result.note, MISSING_NOTE);
});
