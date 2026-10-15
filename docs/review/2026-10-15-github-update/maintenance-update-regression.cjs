// Disposable local-only regression; no real warehouse calls and no customer data.
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/Users/xiaoxiangruanjian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const url = process.env.EC_TEST_URL || 'http://127.0.0.1:51792/index.html';
assert(['127.0.0.1','localhost'].includes(new URL(url).hostname));
const output = process.env.EC_TEST_EVIDENCE || '.codex/github-update/2026-10-15-f17aca3/maintenance-regression';
fs.mkdirSync(output,{recursive:true});
const results = [];
async function capture(p, name) {
  if (name.includes('detail') || name.includes('won-plan')) {
    const card=p.locator('.wo-drawer .wo-detail-card').filter({has:p.locator('h4', {hasText:'保養排期'})});
    if(await card.count()) await card.first().scrollIntoViewIfNeeded();
  }
  await p.waitForTimeout(300);
  await p.screenshot({path:path.join(output,name+'.png')});
  fs.writeFileSync(path.join(output,name+'.txt'),await p.locator('body').innerText());
}
(async()=>{
  const browser = await chromium.launch({headless:true,executablePath:process.env.EC_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  async function run(id, test) {
    const context=await browser.newContext({viewport:{width:1280,height:800}});
    const p=await context.newPage(); const errors=[],writes=[];
    p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.dismiss());
    await p.route('**/*',route=>{
      const u=new URL(route.request().url());
      if(!['127.0.0.1','localhost'].includes(u.hostname))return route.abort();
      if(u.pathname.startsWith('/api/')) {
        if(route.request().method()==='POST')writes.push(u.pathname);
        return route.fulfill({contentType:'application/json',body:JSON.stringify({success:false,products:[],message:'OFFLINE TEST'})});
      }
      return route.continue();
    });
    try{
      await p.goto(url); await p.waitForFunction(()=>Boolean(window.ecRemediation));
      await p.locator('[data-login-role="QUO"]').click();await p.locator('[data-login-user]').filter({hasText:'鄒組長'}).first().click();
      await test(p);assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);
      results.push({id,status:'PASS',realWarehouseWrites:0});
    }catch(e){results.push({id,status:'FAIL',message:e.message,errors,writes});await capture(p,'FAIL-'+id).catch(()=>{});}
    await context.close();
  }
  async function fixture(p) {
    await p.evaluate(()=>{
      const q=structuredClone(quotations.find(q=>q.id==='QT-DEMO-P'));
      Object.assign(q,{id:'TEST-M-UPDATE',ourRef:'TEST-M-UPDATE',category:'M',status:'報價中',ticketId:'',sourceTicketId:'',owner:'鄒組長',serviceEveryMonths:4,contractStart:'2026-01-31',contractEnd:'2027-01-31',items:[{name:'測試保養服務',qty:1,unit:'項',itemType:'服務'}]});
      quotations.unshift(q);saveDataToLocalStorage();render();
    });
  }
  await run('M1-category-scoped-single-fields',async p=>{
    await p.locator('[data-create-quotation]').click();
    const card=p.locator('[data-maintenance-schedule-fields]');assert.equal(await card.count(),1);assert.equal(await card.isVisible(),false);
    await p.locator('#qf-category').selectOption('M',{force:true});assert(await card.isVisible());
    assert.equal(await p.locator('[name="contractStart"]').count(),1);
    await p.locator('#qf-serviceEveryMonths').fill('4');
    await p.locator('#qf-category').selectOption('M+P',{force:true});assert(await card.isVisible());assert.equal(await p.locator('#qf-serviceEveryMonths').inputValue(),'4');
    await capture(p,'maintenance-new-form');
    await p.locator('#qf-category').selectOption('P',{force:true});assert.equal(await card.isVisible(),false);
    assert.equal(await p.locator('#qf-serviceEveryMonths').isDisabled(),true);
    assert.equal(await p.locator('#createQuotationForm').evaluate(f=>new FormData(f).has('serviceEveryMonths')),false);
    await p.locator('.qf-close').click();
    await p.locator('[data-edit-quotation-drawer="QT-DEMO-P"]').click();
    await p.locator('#quotationEditForm [name="category"]').selectOption('M',{force:true});
    assert(await p.locator('#quotationEditForm [data-maintenance-schedule-fields]').isVisible());
    assert.equal(await p.locator('#quotationEditForm [name="serviceEveryMonths"]').count(),1);
    await p.locator('#quotationEditForm [name="category"]').selectOption('P',{force:true});
    assert.equal(await p.locator('#quotationEditForm').evaluate(f=>new FormData(f).has('serviceEveryMonths')),false);
  });
  await run('M2-new-quote-periods-persist',async p=>{
    // Function-level fixture validates the new-save path; it is not a full customer create-quote UAT.
    const q=await p.evaluate(()=>{
      const f=new FormData();Object.entries({id:'TEST-NEW-M',title:'測試保養報價',category:'M+P',customerName:'九龍國際廣場',area:'2區',owner:'鄒組長',amount:'100',contractStart:'2026-01-31',contractEnd:'2027-01-31',serviceEveryMonths:'4',items:'[]'}).forEach(([k,v])=>f.set(k,v));saveQuotation(f);
      return quotations.find(q=>q.id==='TEST-NEW-M');
    });
    assert.equal(q.serviceEveryMonths,4);assert.equal(q.contractStart,'2026-01-31');assert.equal(q.contractEnd,'2027-01-31');
    assert.equal(await p.evaluate(()=>ecRemediation.maintenancePlans.some(p=>p.quotationId==='TEST-NEW-M')),false);
  });
  await run('M3-edit-cycle-and-detail',async p=>{
    await fixture(p);await p.locator('[data-edit-quotation-drawer="TEST-M-UPDATE"]').click();
    assert.equal(await p.locator('#quotationEditForm [name="serviceEveryMonths"]').count(),1);
    assert.equal(await p.locator('[name="serviceEveryMonths"]').inputValue(),'4');
    await p.locator('[name="serviceEveryMonths"]').fill('5');await p.locator('[name="contractEnd"]').fill('2027-04-30');
    await p.locator('button[form="quotationEditForm"]').click();
    const q=await p.evaluate(()=>quotations.find(q=>q.id==='TEST-M-UPDATE'));assert.equal(q.serviceEveryMonths,5);assert.equal(q.contractEnd,'2027-04-30');
    await p.locator('[data-view-quotation="TEST-M-UPDATE"]').first().click();
    assert((await p.locator('.wo-drawer').innerText()).includes('每 5 個月'));await capture(p,'maintenance-detail');
  });
  await run('M4-clearing-cycle-blocks-won',async p=>{
    await fixture(p);await p.locator('[data-edit-quotation-drawer="TEST-M-UPDATE"]').click();
    await p.locator('[name="contractStart"]').fill('');await p.locator('button[form="quotationEditForm"]').click();
    assert.equal(await p.evaluate(()=>quotations.find(q=>q.id==='TEST-M-UPDATE').contractStart),'');
    await p.locator('[data-view-quotation="TEST-M-UPDATE"]').first().click();await p.locator('[data-mark-won="TEST-M-UPDATE"]').click();
    await p.locator('[name="acceptanceNote"]').fill('隔離測試：缺少起日應拒絕');await p.locator('[data-rem-won-form] button[type="submit"]').click();
    assert.equal(await p.evaluate(()=>quotations.find(q=>q.id==='TEST-M-UPDATE').status),'報價中');assert.equal(await p.evaluate(()=>ecRemediation.maintenancePlans.some(p=>p.quotationId==='TEST-M-UPDATE')),false);
  });
  await run('M5-won-single-plan-no-auto-CALL',async p=>{
    await fixture(p);const before=await p.evaluate(()=>({tickets:tickets.length,plans:ecRemediation.maintenancePlans.length,invoices:invoices.length,payments:payments.length}));
    await p.locator('[data-view-quotation="TEST-M-UPDATE"]').first().click();await p.locator('[data-mark-won="TEST-M-UPDATE"]').click();
    await p.locator('[name="acceptanceNote"]').fill('隔離測試：按現有週期生成計劃');await p.locator('[data-rem-won-form] button[type="submit"]').click();
    const state=await p.evaluate(()=>{
      const q=quotations.find(q=>q.id==='TEST-M-UPDATE');const plan=ecRemediation.findPlan(q.maintenancePlanId);ecRemediation.createMaintenancePlan(q);render();render();
      return {q,plan,tickets:tickets.length,plans:ecRemediation.maintenancePlans.length,invoices:invoices.length,payments:payments.length};
    });
    assert.equal(state.q.status,'已中單');assert.equal(state.plans,before.plans+1);assert.equal(state.tickets,before.tickets);assert.equal(state.invoices,before.invoices);assert.equal(state.payments,before.payments);
    assert.deepEqual(state.plan.visits.map(v=>v.dueDate),['2026-01-31','2026-05-31','2026-09-30','2027-01-31']);assert(state.plan.visits.every(v=>!v.ticketId));
    await p.locator('[data-view-quotation="TEST-M-UPDATE"]').first().click();assert((await p.locator('.wo-drawer').innerText()).includes('共 4 期'));await capture(p,'maintenance-won-plan');
  });
  await run('M6-existing-types-dictionaries-preserved',async p=>{
    assert.equal(await p.evaluate(()=>typeof processMaintenanceVisits),'undefined');
    assert.equal(await p.evaluate(()=>localStorage.getItem('ecinfo_ticket_type_migrated_v1')),null);
    assert.equal(await p.evaluate(()=>ticketById('WO-DEMO-CM').type),'糾正維修');
    await p.evaluate(()=>{dictData['工單類型'].push({id:'TEST-CUSTOM',name:'測試自訂類型',code:'CUSTOM',status:'啓用'});localStorage.setItem('ecinfo_dict_data',JSON.stringify(dictData));saveDataToLocalStorage();});
    await p.reload();await p.waitForFunction(()=>Boolean(window.ecRemediation));
    assert(await p.evaluate(()=>dictData['工單類型'].some(t=>t.id==='TEST-CUSTOM')));assert.equal(await p.evaluate(()=>ticketById('WO-DEMO-CM').type),'糾正維修');
  });
  await browser.close();fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
  console.log(results.map(r=>`${r.id}: ${r.status}${r.message?' '+r.message:''}`).join('\n'));if(results.some(r=>r.status!=='PASS'))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
