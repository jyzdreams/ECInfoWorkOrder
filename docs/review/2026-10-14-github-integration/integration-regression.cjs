// Isolated technical regression. Uses fresh browser storage and mocked APIs; never writes warehouse data.
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/Users/xiaoxiangruanjian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const url = process.env.EC_TEST_URL || 'http://127.0.0.1:55227/index.html';
assert(['127.0.0.1', 'localhost'].includes(new URL(url).hostname), 'Only local test servers allowed');
const evidence = process.env.EC_TEST_EVIDENCE || '.codex/github-integration/2026-10-14/test-results';
fs.mkdirSync(evidence, { recursive: true });
const results = [];
let browser;
async function login(p, role, name) {
  await p.evaluate(() => logout());
  await p.locator(`[data-login-role="${role}"]`).click();
  await p.locator('[data-login-user]').filter({ hasText: name }).first().click();
}
async function capture(p, name) {
  fs.writeFileSync(path.join(evidence, name + '.txt'), await p.locator('body').innerText());
  await p.screenshot({ path: path.join(evidence, name + '.png') });
}
async function test(id, run, products = true) {
  const c = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await c.newPage();
  const errors = [], requests = [];
  p.on('pageerror', e => errors.push(e.message));
  p.on('dialog', d => d.dismiss());
  await p.route('**/*', route => {
    const u = new URL(route.request().url());
    if (u.hostname !== '127.0.0.1' && u.hostname !== 'localhost') return route.abort();
    if (u.pathname.startsWith('/api/')) {
      requests.push({ method: route.request().method(), path: u.pathname });
      if (u.pathname.endsWith('/products')) return route.fulfill({ status: products ? 200 : 503, contentType: 'application/json', body: JSON.stringify(products ? { success: true, products: [{ code: 'CODE-001', name: '測試電源', spec: '12V', unit: '個' }] } : { success: false }) });
      return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ success: true, formInstId: 'TEST-ONLY-NOT-REAL', mrId: 'MR-DEMO-TEST', status: 'existing', verifiedMaterialCount: 1 }) });
    }
    return route.continue();
  });
  try {
    await p.goto(url); await p.waitForFunction(() => Boolean(window.ecRemediation));
    await run(p, requests);
    assert.deepEqual(errors, [], 'No browser JS errors');
    results.push({ id, status: 'PASS', apiRequests: requests });
  } catch (e) {
    results.push({ id, status: 'FAIL', message: e.message, errors });
    await capture(p, 'FAIL-' + id).catch(() => {});
  } finally { await c.close(); }
}
(async () => {
  browser = await chromium.launch({ headless: true, executablePath: process.env.EC_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  await test('A1-CR-area', async p => {
    await login(p, 'CR', '陳關係');
    assert.deepEqual(await p.evaluate(() => [currentRole().area, canReadCurrentCRArea('1區'), canReadCurrentCRArea('2區'), canReadCurrentCRArea('')]), ['1區', true, false, false]);
    assert(await p.evaluate(() => currentVisibleTickets().every(t => t.area === currentRole().area)));
  });
  await test('A2-quote-handoff', async p => {
    await login(p, 'CS', '陳小姐');
    await p.evaluate(() => requestQuotationFromCall({ ticketId: 'WO-DEMO-CM' }));
    const requestId = await p.evaluate(() => ecRemediation.quoteRequests.find(r => r.ticketId === 'WO-DEMO-CM').id);
    await login(p, 'CR', '何關係');
    await p.locator('[data-page="quotations"]').click();
    await p.locator(`[data-rem-forward-quote="${requestId}"]`).click();
    const q = await p.evaluate(() => quotations.find(q => q.ticketId === 'WO-DEMO-CM'));
    assert(q && q.revision === 0);
    assert.equal(await p.evaluate(id => ecRemediation.quoteRequests.find(r => r.id === id).status, requestId), '已轉交');
    await login(p, 'QUO', '鄒組長');
    await p.locator(`[data-view-quotation="${q.id}"]`).first().click();
    assert((await p.locator('.wo-drawer').innerText()).includes('WO-DEMO-CM'));
    await p.locator('[data-qm-close]').click();
    await p.locator(`[data-edit-quotation-drawer="${q.id}"]`).click();
    await p.locator('#quotationEditForm select[name="owner"]').selectOption({ label: '鄒組長' }, { force: true });
    await p.locator('button[form="quotationEditForm"]').click();
    assert.equal(await p.evaluate(id => quotations.find(q => q.id === id).owner, q.id), '鄒組長');
  });
  await test('A3-quote-edit-save-tabs', async p => {
    await login(p, 'QUO', '鄒組長');
    await p.locator('[data-view-quotation="QT-DEMO-P"]').first().click();
    await p.locator('[data-create-revision="QT-DEMO-P"]').click();
    assert.equal(await p.locator('#quotationEditForm [data-qm-detail-tab]').count(), 2);
    await p.locator('#quotationEditForm select[name="owner"]').selectOption({ label: '鄒組長' }, { force: true });
    await p.locator('#qe-warrantyPeriod').selectOption('90天', { force: true });
    await p.locator('#quotationEditForm input[name="validUntil"]').fill('', { force: true });
    const custom = await p.locator('[data-qe-name]').first().inputValue(); assert(custom);
    await p.locator('[data-qm-detail-tab="delivery"]').click();
    assert((await p.locator('[data-qm-detail-panel="delivery"]').innerText()).includes('未中單'));
    await p.locator('[data-qm-detail-tab="quote"]').click();
    await capture(p, 'quote-edit');
    await p.locator('button[form="quotationEditForm"]').click();
    const q = await p.evaluate(() => quotations.find(q => q.id === 'QT-DEMO-P'));
    assert.equal(q.warrantyPeriod, '90天'); assert.equal(q.validUntil, ''); assert.equal(q.owner, '鄒組長'); assert.equal(q.revision, 1); assert(q.items.some(i => i.name === custom));
    await p.locator('[data-view-quotation="QT-DEMO-P"]').first().click();
    await p.locator('[data-quotation-history="QT-DEMO-P"]').click();
    assert.equal(await p.locator('.quotation-history-overlay').count(), 1);
    await p.locator('[data-quotation-history-close]').click();
    await p.locator('[data-print-quotation="QT-DEMO-P"]').click();
    const frame = p.frameLocator('.quotation-print-preview-frame');
    await frame.locator('.letterhead img').waitFor();
    assert(await frame.locator('img').evaluate(img => img.complete && img.naturalWidth > 0));
    assert((await frame.locator('body').innerText()).includes('QT-DEMO-PR1'));
    await capture(p, 'quotation-print');
    await p.locator('[data-quotation-print-close]').click();
    await p.locator('[data-print-quotation="QT-DEMO-P"]').click();
    assert.equal(await p.locator('[data-quotation-print-preview]').count(), 1);
  });
  await test('A4-MR-readiness-retry', async (p, requests) => {
    await login(p, 'QUO', '鄒組長');
    await p.locator('[data-view-quotation="QT-DEMO-MP"]').first().click();
    const before = await p.evaluate(() => ({ ready: canConfirmFirstDispatch(ticketById('WO-DEMO-MP-P')), count: tickets.length, invoice: invoices.length, payment: payments.length, mr: structuredClone(ecRemediation.materialRequests.find(m => m.quotationId === 'QT-DEMO-MP')) }));
    assert.equal(before.ready, false); assert.equal(before.mr.requestStatus, '已完成');
    await p.locator('[data-rem-resync]').click();
    await p.waitForFunction(() => ecRemediation.materialRequests.find(m => m.quotationId === 'QT-DEMO-MP').warehouseSync?.status === '已同步');
    const after = await p.evaluate(() => ({ ready: canConfirmFirstDispatch(ticketById('WO-DEMO-MP-P')), count: tickets.length, invoice: invoices.length, payment: payments.length, mr: ecRemediation.materialRequests.find(m => m.quotationId === 'QT-DEMO-MP') }));
    assert.equal(after.ready, false); assert.equal(after.mr.status, '待備貨'); assert.equal(after.count, before.count); assert.equal(after.invoice, before.invoice); assert.equal(after.payment, before.payment);
    assert.equal(requests.filter(r => r.method === 'POST').length, 1);
    await capture(p, 'mr-retry-mock');
    await login(p, 'CR', '何關係'); await p.evaluate(() => setPage('quotations'));
    await p.locator('[data-view-quotation="QT-DEMO-MP"]').first().click();
    assert.equal(await p.locator('[data-rem-resync]').count(), 0);
  });
  await test('A5-mobile-note-search', async p => {
    await login(p, 'TL', '李組長'); await p.locator('[data-view="mobile"]').click();
    await p.locator('[data-tl-home-dispatch-tab="待分派"]').first().click();
    await p.locator('[data-md-ticket="WO-DEMO-CM"]').click();
    await p.locator('[data-md-master]').first().click();
    const master = await p.evaluate(() => state.mdSelectedMaster);
    await p.locator('#mdRemark').fill('測試：明天下午三點，先到公司領單');
    await p.locator('[data-md-master-keyword]').fill(master);
    await p.waitForTimeout(350);
    assert.equal(await p.locator('#mdRemark').inputValue(), '測試：明天下午三點，先到公司領單');
    await p.locator('[data-md-master-keyword]').fill(''); await p.waitForTimeout(350);
    const second = p.locator('[data-md-master]').filter({ hasNotText: master }).first();
    if (await second.count()) { await second.click(); assert.equal(await p.locator('#mdRemark').inputValue(), '測試：明天下午三點，先到公司領單'); }
    const assigned = await p.evaluate(() => state.mdSelectedMaster);
    await p.locator('[data-md-submit]').click();
    assert.deepEqual(await p.evaluate(() => [ticketById('WO-DEMO-CM').status, ticketById('WO-DEMO-CM').assignNote]), ['待確認', '測試：明天下午三點，先到公司領單']);
    await login(p, 'MASTER', assigned); await p.locator('[data-view="mobile"]').click();
    await p.evaluate(() => { state.selectedTicketId = 'WO-DEMO-CM'; setMobilePage('mobileDetail'); });
    assert((await p.locator('body').innerText()).includes('明天下午三點')); await capture(p, 'dispatch-note-master');
  });
  await test('A6-CP-supervisor-independent-finance', async p => {
    await login(p, 'MASTER', '周師傅');
    // Explicit disposable fixture, not a historical customer or a completed business chain.
    await p.evaluate(() => {
      const q = { ...structuredClone(quotations.find(q => q.id === 'QT-DEMO-P')), id: 'TEST-CP-Q', status: '已中單', ticketId: 'TEST-CP', sourceTicketId: 'TEST-CP', acceptedItems: [{ name: '測試維修服務', qty: 1, itemType: '服務' }] };
      quotations.push(q);
      const t = { ...structuredClone(ticketById('WO-DEMO-INSTANT')), id: 'TEST-CP', quotationId: q.id, master: '周師傅', tl: '李組長', status: '處理中', cpNo: '123459', cpSourceImage: 'data:image/png;base64,iVBORw0KGgo=', cpNoSignature: true, beforeServicePhotos: ['test-before'], afterServicePhotos: ['test-after'] };
      tickets.push(t); saveDataToLocalStorage(); state.view = 'mobile'; state.selectedTicketId = t.id; setMobilePage('workRecord');
    });
    const counts = await p.evaluate(() => [invoices.length, payments.length]);
    assert((await p.locator('body').innerText()).includes('測試維修服務'));
    await p.locator('[data-cp-submit]').click();
    assert.equal(await p.evaluate(() => ticketById('TEST-CP').status), '待完工確認');
    // Existing SF-05 role-switch countdown issue is separately retained, not claimed fixed.
    await p.evaluate(() => { clearInterval(state.srSubmitCountdownTimer); state.srSubmitted = false; });
    await login(p, 'CR', '何關係'); assert.equal(await p.evaluate(() => canConfirmCurrentReport(ticketById('TEST-CP'))), false);
    await login(p, 'TL', '王組長'); assert.equal(await p.evaluate(() => canConfirmCurrentReport(ticketById('TEST-CP'))), false);
    await login(p, 'TL', '李組長'); assert.equal(await p.evaluate(() => canConfirmCurrentReport(ticketById('TEST-CP'))), true);
    await p.evaluate(() => { performAction('confirmClose', 'TEST-CP'); render(); });
    assert.equal(await p.evaluate(() => ticketById('TEST-CP').status), '已完成'); assert.deepEqual(await p.evaluate(() => [invoices.length, payments.length]), counts);
    await login(p, 'FIN', '陳會計'); assert(await p.evaluate(() => getFinancePendingQuotations().some(q => q.id === 'TEST-CP-Q')));
    await capture(p, 'completion-finance-readonly');
  });
  await test('A7-SR-number-and-retained-fields', async p => {
    await login(p, 'MASTER', '周師傅');
    await p.evaluate(() => { const t = ticketById('WO-DEMO-INSTANT'); t.serviceReportNo = '0123456'; state.view = 'mobile'; state.selectedTicketId = t.id; setMobilePage('workRecord'); });
    assert.equal(await p.evaluate(() => requiresCompletionPaper(ticketById('WO-DEMO-INSTANT'))), false);
    assert((await p.locator('body').innerText()).includes('客戶滿意度')); assert((await p.locator('body').innerText()).includes('是否後補報價'));
    assert(await p.locator('input').evaluateAll(inputs => inputs.some(i => i.value === '0123456' && i.maxLength === 7)));
  });
  await test('P1-products-code-and-custom', async p => {
    await p.waitForFunction(() => warehouseProducts.length > 0); await login(p, 'QUO', '鄒組長');
    await p.locator('[data-view-quotation="QT-DEMO-P"]').first().click(); await p.locator('[data-create-revision="QT-DEMO-P"]').click();
    const field = p.locator('[data-qe-name]').first(); assert.equal(await field.evaluate(e => e.tagName), 'SELECT');
    assert((await field.locator('option').allTextContents()).some(s => s.includes('自訂')));
    await field.selectOption('CODE-001', { force: true });
    const payload = await p.evaluate(() => ecRemediation.warehousePayload({ id:'TEST', quotationId:'QT-DEMO-P', lines:[{id:1,name:'CODE-001',qty:1}], status:'待備貨' }));
    assert.equal(payload.materials[0].code, 'CODE-001');
  });
  await test('P2-offline-manual-fallback', async p => {
    await login(p, 'QUO', '鄒組長'); await p.locator('[data-view-quotation="QT-DEMO-P"]').first().click(); await p.locator('[data-create-revision="QT-DEMO-P"]').click();
    assert.equal(await p.locator('[data-qe-name]').first().evaluate(e => e.tagName), 'INPUT');
  }, false);
  await test('P3-zero-total-and-M-preserved', async p => {
    await login(p, 'QUO', '鄒組長'); assert.equal(await p.locator('[data-page="maintenance"]').count(), 1);
    await p.locator('[data-view-quotation="QT-DEMO-M"]').first().click();
    await p.locator('[data-qm-detail-tab="delivery"]').click();
    assert((await p.locator('.wo-drawer').innerText()).includes('無需物料'));
    await p.evaluate(() => { const q=quotations.find(q=>q.id==='QT-DEMO-P');q.discount=100;q.totalAmount=0;exportQuotationPdf(q.id); });
    const text = await p.frameLocator('.quotation-print-preview-frame').locator('body').innerText();
    assert(/Total[\s\S]*?0\.00/.test(text)); assert(!text.includes('Included'));
  });
  await test('P4-PC-search-preserves-note', async p => {
    await login(p, 'TL', '李組長');
    await p.evaluate(() => { state.page='dispatch';state.selectedDispatchId='WO-DEMO-CM';state.dispatchModalOpen=true;render(); });
    await p.locator('#dispatchAssignNote').fill('測試派工備註不應被搜索清空');
    await p.locator('[data-dispatch-master-keyword]').fill('陳'); await p.waitForTimeout(350);
    assert.equal(await p.locator('#dispatchAssignNote').inputValue(), '測試派工備註不應被搜索清空');
    const view = await p.evaluate(() => getDispatchMasterView()); assert.equal(view.statusFilter, '全部');
    assert(view.finalMasters.every(m => m.area === view.ticket.area));
    await p.locator('[data-dispatch-master-keyword]').fill('不存在的人'); await p.waitForTimeout(350);
    assert.equal(await p.evaluate(() => state.selectedMaster), '');
  });
  await browser.close();
  fs.writeFileSync(path.join(evidence, 'results.json'), JSON.stringify(results, null, 2));
  console.log(results.map(r => `${r.id}: ${r.status}${r.message ? ' ' + r.message : ''}`).join('\n'));
  if (results.some(r => r.status !== 'PASS')) process.exitCode = 1;
})().catch(async e => { console.error(e); if (browser) await browser.close(); process.exitCode = 1; });
