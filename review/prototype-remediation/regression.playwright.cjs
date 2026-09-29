/* EC Prototype remediation: seven isolated, continuing Playwright business scenarios. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = 'http://localhost:18766';
const evidence = path.join(__dirname, 'evidence');
fs.mkdirSync(evidence, { recursive: true });
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const read = (page, expression, arg) => page.evaluate(expression, arg);

async function setRole(page, role, pageKey = 'workorder', view = 'pc', person = '') {
  await page.evaluate(({ role, pageKey, view, person }) => {
    state.role = role;
    state.currentPerson = person ? users.find(u => u.name === person) : null;
    state.page = pageKey;
    state.view = view;
    state.mobilePage = 'tasks';
    state.selectedTicketId = null;
    state.mobileProcessTicketId = null;
    state.selectedTenderId = null;
    hideWorkOrderDrawer();
    render();
  }, { role, pageKey, view, person });
}

async function winQuote(page, id) {
  await setRole(page, 'QUO', 'quotations');
  await page.evaluate(id => openQuotationDrawer(id), id);
  await page.locator(`[data-mark-won="${id}"]`).click();
  const form = page.locator(`[data-rem-won-form="${id}"]`);
  await form.locator('[name="acceptanceNote"]').fill(`客戶書面確認 ${id} 最終版`);
  await form.locator('[data-final-item-type]').first().count().then(async count => {
    if (count) await form.locator('[data-final-item-type]').evaluateAll(nodes => nodes.forEach(n => { if (!n.value) n.value = '服務'; }));
  });
  await form.locator('button[type="submit"]').click();
  await page.waitForFunction(id => quotations.find(q => q.id === id)?.status === '已中單', id);
  assert(await read(page, id => quotations.find(q => q.id === id)?.status === '已中單', id), `${id} 未完成 QUO 中單`);
}

async function prepareMaterial(page, quoteId) {
  await setRole(page, 'PUR', 'procurement');
  const mrId = await read(page, id => ecRemediation.materialRequests.find(m => m.quotationId === id)?.id, quoteId);
  assert(mrId, `${quoteId} 未生成 MR`);
  await page.locator(`[data-rem-mr="${mrId}"]`).first().click();
  await page.locator(`[data-rem-prepared="${mrId}"]`).evaluateAll(nodes => nodes.forEach(n => { n.value = n.max; }));
  await page.locator(`[data-rem-mr-ready="${mrId}"]`).click();
  assert(await read(page, id => ecRemediation.materialRequests.find(m => m.id === id)?.status === '材料就緒', mrId), `${mrId} 未就緒`);
  return mrId;
}

async function submitSr(page, id, srNo, needQuote = false) {
  await page.evaluate(({ id }) => {
    const t = tickets.find(item => item.id === id);
    if (!t) throw new Error(`CALL ${id} 不存在`);
    t.beforeServicePhotos = ['data:image/png;base64,AA=='];
    t.afterServicePhotos = ['data:image/png;base64,AA=='];
    t.serviceCheckInAt = new Date().toLocaleString('zh-HK');
    t.status = '處理中';
    t.master ||= '周師傅';
    state.role = 'MASTER';
    state.currentPerson = users.find(u => u.name === t.master) || null;
    state.view = 'mobile';
    state.mobilePage = 'tasks';
    state.selectedTicketId = id;
    state.mobileProcessTicketId = id;
    state.mobileProcessStep = 'report';
    state.srInitialized = false;
    state.srSubmitted = false;
    hideWorkOrderDrawer();
    render();
  }, { id });
  await page.locator('#serviceReportNo').last().fill(srNo);
  await page.locator('#completedWork').last().fill(`已完成 ${id} 現場工作`);
  await page.locator('#faultResult').last().fill(needQuote ? '發現需另行報價的維修問題' : '已處理，無需額外跟進');
  await page.locator(`[data-sr-quotation-radio="${needQuote}"]`).last().click();
  if (needQuote) await page.locator('#quotationNote').last().fill(`本次 SR ${srNo} 發現新維修項`);
  await page.locator('[data-sr-supplement-radio="false"]').last().click();
  await page.locator('[data-sr-satisfaction="滿意"]').last().click();
  await page.locator('#srCustomerAbsent').last().check();
  await page.locator(`[data-action="submitResult"][data-id="${id}"]`).last().click();
  assert(await read(page, id => tickets.find(t => t.id === id)?.status === '待完工確認', id), `${id} SR 提交后未待确认`);
}

async function confirmSr(page, id) {
  await setRole(page, 'CR', 'workorder');
  await page.locator(`[data-rem-call="${id}"]`).first().click();
  await page.locator(`[data-rem-confirm="${id}"]`).click();
  assert(await read(page, id => {
    const t = tickets.find(item => item.id === id);
    return t?.status === '已完成' && !!t.confirmedBy && !!t.confirmedAt;
  }, id), `${id} 未由 CR/TL 确认完工`);
}

const scenarios = [
  ['SCENE-01', '普通报价维修', async page => {
    const before = await read(page, () => quotations.find(q => q.id === 'QT-DEMO-P').status);
    assert(before !== '已中單', '普通报价预设已经中单');
    await winQuote(page, 'QT-DEMO-P');
    const mr = await read(page, () => ecRemediation.materialRequests.find(m => m.quotationId === 'QT-DEMO-P'));
    assert(mr?.lines.length === 1 && mr.lines[0].qty === 2, 'MR 未按成交版物料快照生成');
    assert(mr?.warehouseSync?.status === '已同步', 'MR 未主动同步到仓库通');
    assert(mr?.warehouseSync?.mode === 'DEMO' && mr.warehouseSync.externalRecordId, '仓库通 Demo 回执不完整');
    assert(mr?.warehouseSync?.payload?.idempotencyKey === `EC-MR:${mr.id}`, '仓库通同步幂等键错误');
    const syncBeforeRetry = await read(page, id => ({
      externalRecordId: ecRemediation.materialRequests.find(m => m.id === id).warehouseSync.externalRecordId,
      successLogs: ecRemediation.warehouseSyncLogs.filter(log => log.mrId === id && log.status === '已同步').length
    }), mr.id);
    await page.evaluate(id => ecRemediation.syncMaterialRequestToWarehouseTong(ecRemediation.findMr(id), { force: true }), mr.id);
    const syncAfterRetry = await read(page, id => ({
      externalRecordId: ecRemediation.materialRequests.find(m => m.id === id).warehouseSync.externalRecordId,
      successLogs: ecRemediation.warehouseSyncLogs.filter(log => log.mrId === id && log.status === '已同步').length
    }), mr.id);
    assert(syncAfterRetry.externalRecordId === syncBeforeRetry.externalRecordId && syncAfterRetry.successLogs === 1, '重复同步产生了重复仓库通记录');
    assert(await read(page, () => !quotations.find(q => q.id === 'QT-DEMO-P').tenderNo), '普通报价被写入伪 Tender 号');
    await setRole(page, 'CR');
    await page.locator('[data-rem-call="WO-DEMO-P"]').first().click();
    assert(await page.locator('[data-rem-formal-save="WO-DEMO-P"]').isDisabled(), '缺料时仍可正式预约');
    await prepareMaterial(page, 'QT-DEMO-P');
    await setRole(page, 'CR');
    await page.locator('[data-rem-call="WO-DEMO-P"]').first().click();
    await page.locator('[data-rem-formal-date="WO-DEMO-P"]').fill('2026-10-10');
    await page.locator('[data-rem-formal-save="WO-DEMO-P"]').click();
    assert(await read(page, () => tickets.find(t => t.id === 'WO-DEMO-P').formalAppointmentAt === '2026-10-10'), '正式预约未保存');
    await submitSr(page, 'WO-DEMO-P', '100001');
    await confirmSr(page, 'WO-DEMO-P');
  }],
  ['SCENE-02', '保养发现问题后二次维修', async page => {
    const original = await read(page, () => quotations.find(q => q.id === 'QT-DEMO-M'));
    assert(original.status === '已中單', 'M 合同未中单');
    await submitSr(page, 'WO-DEMO-M-01', '100002', true);
    assert(await read(page, () => quotations.filter(q => q.sourceSrNo === '100002' && q.status === '待報價').length === 1), '本次 SR 未产生唯一二次维修报价');
    assert(await read(page, () => tickets.find(t => t.id === 'WO-DEMO-M-01').quotationId === 'QT-DEMO-M'), '原 M 合同链接丢失');
    await confirmSr(page, 'WO-DEMO-M-01');
    assert(await read(page, () => ecRemediation.maintenancePlans.find(p => p.quotationId === 'QT-DEMO-M').visits.length === 4), '整期保养计划被二次报价影响');
  }],
  ['SCENE-03', '现场即时维修', async page => {
    await submitSr(page, 'WO-DEMO-INSTANT', '100003', true);
    assert(await read(page, () => quotations.some(q => q.sourceSrNo === '100003')), '即时维修未产生后续报价任务');
    await confirmSr(page, 'WO-DEMO-INSTANT');
    await setRole(page, 'CS', 'workorder');
    await page.locator('[data-rem-call="WO-DEMO-CM"]').first().click();
    await page.locator('[data-request-quotation-ticket="WO-DEMO-CM"]').click();
    assert(await read(page, () => ecRemediation.quoteRequests.some(r => r.ticketId === 'WO-DEMO-CM' && r.status === '待轉交')), 'CS 报价需求未进入 CR/TL 队列');
    assert(await read(page, () => !quotations.some(q => q.sourceTicketId === 'WO-DEMO-CM')), 'CS 绕过 CR/TL 直接创建报价');
    await setRole(page, 'CR', 'workorder');
    await page.locator('[data-rem-forward-quote]').click();
    assert(await read(page, () => ecRemediation.quoteRequests.some(r => r.ticketId === 'WO-DEMO-CM' && r.status === '已轉交')), 'CR 未记录转交');
    assert(await read(page, () => quotations.some(q => q.sourceTicketId === 'WO-DEMO-CM' && q.status === '待報價')), 'QUO 待报价任务未创建');
  }],
  ['SCENE-04', '周期保养', async page => {
    const plan = await read(page, () => ecRemediation.maintenancePlans.find(p => p.quotationId === 'QT-DEMO-M'));
    assert(plan.visits.length === 4, `M 整期应为 4 次，实际 ${plan.visits.length}`);
    await setRole(page, 'CR', 'maintenance');
    await page.locator(`[data-rem-create-visit="${plan.id}"][data-visit="${plan.visits[1].id}"]`).click();
    await page.waitForFunction(id => !!ecRemediation.maintenancePlans.find(p => p.id === id).visits[1].ticketId, plan.id);
    const next = await read(page, id => ecRemediation.maintenancePlans.find(p => p.id === id).visits[1].ticketId, plan.id);
    assert(next, '第二期 CALL 未创建');
    await submitSr(page, next, '100004');
    await confirmSr(page, next);
    assert(await read(page, id => {
      const p = ecRemediation.maintenancePlans.find(x => x.id === id);
      return p.visits[1].status === '已完成' && p.visits[2].status === '待排期';
    }, plan.id), '各期进度未独立');
    assert(await read(page, id => ecRemediation.maintenancePlans.find(p => p.id === id).serviceEveryMonths === 3, plan.id), '服务周期被财务周期覆盖');
  }],
  ['SCENE-05', 'M+P 独立推进', async page => {
    const plan = await read(page, () => ecRemediation.maintenancePlans.find(p => p.quotationId === 'QT-DEMO-MP'));
    const mr = await read(page, () => ecRemediation.materialRequests.find(m => m.quotationId === 'QT-DEMO-MP'));
    assert(plan?.visits.length === 2 && mr?.status === '待備貨', 'M+P 双支初始状态错误');
    await setRole(page, 'CR', 'maintenance');
    await page.locator(`[data-rem-create-visit="${plan.id}"][data-visit="${plan.visits[0].id}"]`).click();
    await page.waitForFunction(id => !!ecRemediation.maintenancePlans.find(p => p.id === id).visits[0].ticketId, plan.id);
    const visitId = await read(page, id => ecRemediation.maintenancePlans.find(p => p.id === id).visits[0].ticketId, plan.id);
    await submitSr(page, visitId, '100005');
    await confirmSr(page, visitId);
    assert(await read(page, id => ecRemediation.materialRequests.find(m => m.id === id).status === '待備貨', mr.id), 'M 完成错误推进 P');
    await prepareMaterial(page, 'QT-DEMO-MP');
    assert(await read(page, id => ecRemediation.maintenancePlans.find(p => p.id === id).visits[0].status === '已完成', plan.id), 'P 就绪错误改写 M');
    await submitSr(page, 'WO-DEMO-MP-P', '100007');
    await confirmSr(page, 'WO-DEMO-MP-P');
    assert(await read(page, id => ecRemediation.maintenancePlans.find(p => p.id === id).visits[1].status === '待排期', plan.id), 'P 完工错误推进未执行的 M 期次');
  }],
  ['SCENE-06', 'CM', async page => {
    await setRole(page, 'CR', 'dispatch');
    await page.locator('[data-dispatch-open="WO-DEMO-CM"]').click();
    const master = page.locator('[data-dispatch-master]:not([disabled])').first();
    assert(await master.count() > 0, 'CM 无可分派师傅');
    const masterName = await master.getAttribute('data-dispatch-master');
    await master.click();
    await page.locator('[data-dispatch-confirm]').click();
    assert(await read(page, () => tickets.find(t => t.id === 'WO-DEMO-CM').status === '待確認'), 'CM 未进入师傅确认');
    await setRole(page, 'MASTER', 'workorder', 'mobile', masterName);
    assert(await page.locator('[data-mobile-accept-cm]').count() === 0, '仍有 CM 自动释放 PM 入口');
    const pmBefore = await read(page, () => tickets.filter(t => /保養/.test(t.type)).map(t => `${t.id}:${t.status}`).join('|'));
    await page.locator('[data-mobile-take="WO-DEMO-CM"]').first().click();
    const pmAfter = await read(page, () => tickets.filter(t => /保養/.test(t.type)).map(t => `${t.id}:${t.status}`).join('|'));
    assert(pmBefore === pmAfter, 'CM 接单触发 PM 副作用');
    await submitSr(page, 'WO-DEMO-CM', '100006');
    await confirmSr(page, 'WO-DEMO-CM');
  }],
  ['SCENE-07', 'Tender', async page => {
    await setRole(page, 'TENDER', 'tender');
    for (const [id, category] of [['TD-DEMO-2026', 'P'], ['TD-DEMO-M', 'M'], ['TD-DEMO-MP', 'M+P']]) {
      await page.locator(`[data-tender-view="${id}"]`).first().click();
      await page.locator(`[data-tender-mark-won="${id}"]`).click();
      const outcome = await read(page, id => {
        const t = tenders.find(x => x.id === id), q = quotations.find(x => x.id === t.relatedQuotationId);
        return { tenderStatus: t.status, quoteStatus: q?.status, category: q?.category, hasMr: ecRemediation.materialRequests.some(m => m.quotationId === q?.id), hasPlan: ecRemediation.maintenancePlans.some(p => p.quotationId === q?.id) };
      }, id);
      assert(outcome.tenderStatus === '已中標' && outcome.quoteStatus === '待報價' && outcome.category === category, `${id} 中标后分流错误：${JSON.stringify(outcome)}`);
      assert(!outcome.hasMr && !outcome.hasPlan, `${id} 未经客户接受即启动下游`);
      const quoteId = await read(page, id => tenders.find(t => t.id === id).relatedQuotationId, id);
      await page.evaluate(({ quoteId, category }) => {
        const q = quotations.find(item => item.id === quoteId);
        const material = { name: '標書物料', spec: '演示', qty: 2, unit: '件', unitPrice: 500, amount: 1000, itemType: '物料' };
        const service = { name: '標書服務', spec: '演示', qty: 1, unit: '項', unitPrice: 3000, amount: 3000, itemType: '服務' };
        q.items = category === 'M' ? [service] : category === 'P' ? [material] : [material, service];
        q.amount = q.items.reduce((sum, item) => sum + item.amount, 0);
        q.totalAmount = q.amount;
        if (category.includes('M')) { q.serviceEveryMonths = 3; q.contractStart = '2026-10-01'; q.contractEnd = '2027-09-30'; }
        saveDataToLocalStorage();
      }, { quoteId, category });
      await winQuote(page, quoteId);
      const downstream = await read(page, id => ({
        mr: ecRemediation.materialRequests.some(m => m.quotationId === id),
        plan: ecRemediation.maintenancePlans.some(p => p.quotationId === id)
      }), quoteId);
      assert(downstream.mr === category.includes('P') && downstream.plan === category.includes('M'), `${id} 客户接受后支线错误：${JSON.stringify(downstream)}`);
      await setRole(page, 'TENDER', 'tender');
    }
  }]
];

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const results = [];
  for (const [id, name, run] of scenarios) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    page.on('dialog', dialog => dialog.dismiss());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let status = 'PASS', detail = '';
    try {
      await page.goto(base, { waitUntil: 'load' });
      await page.waitForFunction(() => !!window.ecRemediation);
      await run(page);
      assert(errors.length === 0, `页面脚本异常：${errors.join('; ')}`);
    } catch (error) { status = 'FAIL'; detail = String(error.stack || error); }
    await page.screenshot({ path: path.join(evidence, `${id}.png`), fullPage: true }).catch(() => {});
    results.push({ id, name, status, detail, pageErrors: errors });
    console.log(`${id} ${status}${detail ? `: ${detail.split('\n')[0]}` : ''}`);
    await context.close();
  }
  await browser.close();
  const report = { executed: results.length, total: scenarios.length, coveragePercent: Math.round(results.length / scenarios.length * 100), passed: results.filter(r => r.status === 'PASS').length, failed: results.filter(r => r.status === 'FAIL').length, results };
  fs.writeFileSync(path.join(__dirname, 'evidence', 'regression-results.json'), JSON.stringify(report, null, 2));
  process.exitCode = report.failed ? 1 : 0;
})().catch(error => { console.error(error); process.exitCode = 2; });
