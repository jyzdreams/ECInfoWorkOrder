/**
 * MR 表單構建器單元測試
 * 驗證 MR 號碼規則、類型映射，以及「報價物料明細 → MR 子表預算組」的字段映射
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DryRunYidaClient } from '../src/yidaClient.js';
import { MaterialMatcher, MISSING_NOTE } from '../src/materialMatcher.js';
import { buildMrFormData, buildMrNo, mapMrCategory } from '../src/mrBuilder.js';
import { APP_TYPE, FORM_UUID, MR_HEADER, MR_ITEM } from '../src/fieldMap.js';

const FIXTURE_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');
const APPLICANT_USER_ID = '2256462548-935114165';

/** 建立一個基於本地快照的物料匹配器 */
function createMatcher() {
  const yidaClient = new DryRunYidaClient({ fixtureDir: FIXTURE_DIR });
  yidaClient.fixtureFormUuidMap = { FORM_UUID };
  return new MaterialMatcher({ yidaClient, appType: APP_TYPE });
}

test('MR 號碼沿用 MR+MMDD+序號，並在當日既有號碼上遞增', () => {
  const date = new Date(2026, 8, 3); // 2026-09-03
  assert.equal(buildMrNo(date, []), 'MR0903-1');
  assert.equal(buildMrNo(date, ['MR0903-1', 'MR0903-4', 'MR0902-1']), 'MR0903-5');
  // 其他日期的號碼不影響當日序號
  assert.equal(buildMrNo(date, ['MR0902-9']), 'MR0903-1');
});

test('類型映射：M/P/I 對應倉庫通三個選項，M+P 歸入 M', () => {
  assert.equal(mapMrCategory('M'), 'Maintenance (M)');
  assert.equal(mapMrCategory('P'), 'Project (P)');
  assert.equal(mapMrCategory('I'), 'Internal Used (I)');
  assert.equal(mapMrCategory('M+P'), 'Maintenance (M)');
  assert.equal(mapMrCategory(''), '');
});

test('報價物料明細寫入 MR 子表預算組，並按貨品編號建立關聯', async () => {
  const matcher = createMatcher();
  const createdAt = new Date(2026, 8, 27, 10, 0, 0);
  const { formData, items } = await buildMrFormData({
    mrNo: 'MR0927-1',
    category: 'M',
    applicantUserId: APPLICANT_USER_ID,
    site: '深圳 - 機房',
    projectDesc: '機房監控升級工程',
    quotationRef: '2P2601285',
    matcher,
    createdAt,
    items: [
      {
        productCode: 'EC(電源開關)-啟明-110V-深圳',
        productName: 'qm開關',
        spec: '110V',
        qty: 4,
        unit: '個',
        unitPrice: 35
      }
    ]
  });

  // 主表
  assert.equal(formData[MR_HEADER.mrNo], 'MR0927-1');
  assert.equal(formData[MR_HEADER.date], createdAt.getTime());
  assert.deepEqual(formData[MR_HEADER.applicant], [APPLICANT_USER_ID]);
  assert.equal(formData[MR_HEADER.category], 'Maintenance (M)');
  assert.equal(formData[MR_HEADER.site], '深圳 - 機房');
  assert.equal(formData[MR_HEADER.projectDesc], '機房監控升級工程');
  assert.equal(formData[MR_HEADER.quotationRef], '2P2601285');

  // 子表：預算組有值，實際組留空
  const row = formData[MR_HEADER.items][0];
  assert.equal(row[MR_ITEM.materialNameText], 'qm開關');
  assert.equal(row[MR_ITEM.materialCode], 'EC(電源開關)-啟明-110V-深圳');
  assert.equal(row[MR_ITEM.budgetQty], 4);
  assert.equal(row[MR_ITEM.budgetUnitPrice], 35);
  assert.equal(row[MR_ITEM.budgetAmount], 140);
  assert.equal(row[MR_ITEM.actualQty], undefined);
  assert.equal(row[MR_ITEM.supplier], undefined);
  assert.equal(row[MR_ITEM.purchaseOrderNo], undefined);

  // 關聯「供應商價格」表
  const association = row[MR_ITEM.materialRef];
  assert.equal(association.length, 1);
  assert.equal(association[0].appType, APP_TYPE);
  assert.equal(association[0].formUuid, FORM_UUID.supplierPrice);
  assert.ok(association[0].instanceId.startsWith('FINST-'));
  // formType 缺失時宜搭會靜默丟棄關聯，必須寫入
  assert.equal(association[0].formType, 'receipt');
  assert.equal(association[0].title, 'EC(電源開關)-啟明-110V-深圳');
  assert.equal(association[0].subTitle, 'qm開關');

  // 報告：命中數與未命中數
  assert.equal(items[0].matchStatus, 'matched');
  assert.equal(items[0].matchedSupplier, '深圳啟明');
});

test('未命中供應商價格的物料只寫文本並在採購備註標記待維護', async () => {
  const matcher = createMatcher();
  const { formData, items } = await buildMrFormData({
    mrNo: 'MR0927-2',
    category: 'P',
    applicantUserId: APPLICANT_USER_ID,
    matcher,
    items: [
      {
        productCode: 'ECINFO-2585',
        productName: '銅底盤',
        spec: '-',
        qty: 2,
        unit: 'PCS',
        unitPrice: 198
      }
    ]
  });

  const row = formData[MR_HEADER.items][0];
  assert.equal(row[MR_ITEM.materialRef], undefined);
  assert.equal(row[MR_ITEM.purchaseRemark], MISSING_NOTE);
  assert.equal(row[MR_ITEM.budgetAmount], 396);
  assert.equal(items[0].matchStatus, 'missing');
});
