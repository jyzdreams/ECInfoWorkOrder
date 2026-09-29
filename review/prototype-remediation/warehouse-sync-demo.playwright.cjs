/* Live demo regression: quotation won -> MR -> real Warehouse Tong (Yida) form. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = 'http://localhost:18766';
const evidence = path.join(__dirname, 'evidence');
fs.mkdirSync(evidence, { recursive: true });
const assert = (condition, message) => { if (!condition) throw new Error(message); };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto(base, { waitUntil: 'load' });
  await page.waitForFunction(() => !!window.ecRemediation);

  await page.evaluate(() => {
    state.role = 'QUO';
    state.page = 'quotations';
    state.view = 'pc';
    render();
    openQuotationDrawer('QT-DEMO-P');
  });
  await page.locator('[data-mark-won="QT-DEMO-P"]').click();
  const form = page.locator('[data-rem-won-form="QT-DEMO-P"]');
  await form.locator('[name="acceptanceNote"]').fill('仓库通联调 Demo：客户书面确认成交版');
  await form.locator('[data-final-item-type]').evaluateAll(nodes => nodes.forEach(node => {
    if (!node.value) node.value = '服務';
  }));
  await form.locator('button[type="submit"]').click();
  await page.waitForFunction(() => {
    const mr = ecRemediation.materialRequests.find(item => item.quotationId === 'QT-DEMO-P');
    return quotations.find(item => item.id === 'QT-DEMO-P')?.status === '已中單' && mr?.warehouseSync?.status === '已同步';
  });

  const outcome = await page.evaluate(async () => {
    const mr = ecRemediation.materialRequests.find(item => item.quotationId === 'QT-DEMO-P');
    const before = {
      recordId: mr.warehouseSync.externalRecordId,
      successLogs: ecRemediation.warehouseSyncLogs.filter(log => log.mrId === mr.id && log.status === '已同步').length
    };
    await ecRemediation.syncMaterialRequestToWarehouseTong(mr, { force: true });
    return {
      mr,
      before,
      after: {
        recordId: mr.warehouseSync.externalRecordId,
        successLogs: ecRemediation.warehouseSyncLogs.filter(log => log.mrId === mr.id && log.status === '已同步').length
      }
    };
  });
  assert(outcome.mr.lines.length === 1 && outcome.mr.lines[0].name === '門禁讀卡器', '同步载荷没有严格取成交版物料行');
  assert(outcome.mr.warehouseSync.payload.materials.length === 1, '仓库通子表物料数量错误');
  assert(outcome.mr.warehouseSync.idempotencyKey === `EC-MR:${outcome.mr.id}`, '幂等键错误');
  assert(outcome.mr.warehouseSync.mode === 'REAL · 宜搭線上', '同步模式不是线上宜搭');
  assert(outcome.mr.warehouseSync.externalRecordId.startsWith('FINST-'), '没有取得真实宜搭 formInstId');
  assert(outcome.mr.warehouseSync.remoteMrId.startsWith('MR-DEMO-'), '远端记录没有演示数据标识');
  assert(outcome.after.recordId === outcome.before.recordId && outcome.after.successLogs === 1, '重试产生重复仓库通记录');

  await page.evaluate(id => {
    state.role = 'PUR';
    state.page = 'procurement';
    state.view = 'pc';
    ecRemediation.selectedMrId = id;
    render();
  }, outcome.mr.id);
  await page.locator(`[data-rem-mr-detail="${outcome.mr.id}"]`).waitFor();
  assert(await page.getByText(outcome.mr.warehouseSync.externalRecordId, { exact: true }).count() > 0, '备货页面未显示仓库通回执');
  await page.screenshot({ path: path.join(evidence, 'WAREHOUSE-SYNC-DEMO.png'), fullPage: true });
  assert(pageErrors.length === 0, `页面脚本异常：${pageErrors.join('; ')}`);
  console.log(`WAREHOUSE-SYNC-DEMO PASS · ${outcome.mr.id} -> ${outcome.mr.warehouseSync.externalRecordId}`);
  await context.close();
  await browser.close();
})().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
