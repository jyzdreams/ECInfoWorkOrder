const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const requirementsV1Path = 'docs/knowledge/04-requirements/SYSTEM-REQUIREMENTS-V1.json';

// Knowledge owns requirement wording; progress is projected from the existing work register.
function readRequirementsV1(root, work) {
  const raw = fs.readFileSync(path.join(root, requirementsV1Path), 'utf8');
  const source = JSON.parse(raw);
  const assert = (condition, message) => { if (!condition) throw new Error('Requirements V1: ' + message); };
  assert(source.schemaVersion === 1 && source.reviewStatus === '评审中', 'unexpected schema or approval');
  assert(source.pages.length === 13 && source.pages.every((p, i) => p.id === String(i).padStart(2, '0')), '00–12 directory changed');
  assert(source.pages.filter(p => p.prepared).map(p => p.id).join(',') === (source.commonRules ? '00,01,02,03,04,05,06,07,08,09,10,11,12' : source.partialScopes ? '00,01,02,03,04,05,06,07,08,09,10,11' : source.financeHandoff ? '00,01,02,03,04,05,06,07,08,09,10' : source.materialSupply ? '00,01,02,03,04,05,06,07,08,09' : source.mpControl ? '00,01,02,03,04,05,06,07,08' : source.mService ? '00,01,02,03,04,05,06,07' : source.pFulfillment ? '00,01,02,03,04,05,06' : source.quotation ? '00,01,02,03,04,05' : source.callIntake ? '00,01,02,03,04' : '00,01,02,03'), 'unapproved business domain prepared');
  assert(source.pages.every(p => ['READY', 'PARTIAL', 'BLOCKED', 'LATER'].includes(p.maturity)), 'invalid maturity');
  const sample = source.customerContract;
  assert(sample.behaviors.length === 6 && sample.behaviors.every((b, i) => b.id === '04-03-' + String.fromCharCode(65 + i)), 'preserve six local behavior units');
  assert(sample.acceptance.length === 6 && sample.acceptance.every((a, i) => a.id === 'AC-' + String(i + 1).padStart(2, '0') && a.status === '待执行'), 'ACs cannot be marked tested');
  const legacy = JSON.parse(fs.readFileSync(path.join(root, 'project-hub/data/requirements.json'), 'utf8')).requirements;
  const legacyIds = new Set(legacy.map(r => r.id));
  assert(legacy.length === 119 && sample.legacyMappings.length === 7, 'legacy index or focused mapping changed');
  assert(sample.legacyMappings.every(m => legacyIds.has(m.id)), 'unknown legacy REQ');
  const behaviorIds = new Set(sample.behaviors.map(b => b.id));
  const acIds = new Set(sample.acceptance.map(a => a.id));
  const questions = fs.readFileSync(path.join(root, 'docs/knowledge/05-pending/OPEN-QUESTIONS.md'), 'utf8');
  const confirmation = fs.readFileSync(path.join(root, 'docs/knowledge/decisions/DEC-20261026-客户业务确认补充.md'), 'utf8');
  for (const b of sample.behaviors) {
    assert(b.acceptanceIds.every(id => acIds.has(id)), 'unknown acceptance unit');
    assert(b.openIds.every(id => questions.includes('| ' + id + ' |')), 'unknown question');
    assert(b.basis.every(n => confirmation.includes('CONFIRM-10-26-' + String(n).padStart(2, '0'))), 'unknown confirmation');
  }
  for (const m of sample.legacyMappings) assert(m.targets.every(id => behaviorIds.has(id) || questions.includes('| ' + id + ' |')), 'unknown mapping target');
  for (const s of source.sources) {
    assert(fs.existsSync(path.join(root, s.path)), 'missing source ' + s.path);
    if (s.anchor) assert(fs.readFileSync(path.join(root, s.path), 'utf8').includes('id="' + s.anchor + '"'), 'missing source anchor');
  }
  for (const p of sample.prototype) assert(fs.existsSync(path.join(root, p.path)), 'missing prototype mapping');
  if (source.callIntake) {
    const call = source.callIntake;
    assert(call.reviewStatus === '评审中' && call.maturity === 'READY', 'CALL must remain in review');
    assert(call.behaviors.length === 7 && call.behaviors.every((b, i) => b.id === '04-04-' + String.fromCharCode(65 + i)), 'preserve seven CALL behavior units');
    assert(call.acceptance.length === 6 && call.acceptance.every((a, i) => a.id === 'AC-CALL-' + String(i + 1).padStart(2, '0') && a.status === '待执行'), 'CALL ACs must remain unexecuted');
    const callAcIds = new Set(call.acceptance.map(a => a.id));
    const targetIds = new Set([...behaviorIds, ...call.behaviors.map(b => b.id)]);
    for (const b of call.behaviors) {
      assert(b.acceptanceIds.every(id => callAcIds.has(id)), 'unknown CALL acceptance unit');
      assert(b.openIds.every(id => questions.includes('| ' + id + ' |')), 'unknown CALL OPEN');
      assert(b.basis.every(n => confirmation.includes('CONFIRM-10-26-' + String(n).padStart(2, '0'))), 'unknown CALL confirmation');
    }
    assert(call.legacyMappings.every(m => legacyIds.has(m.id) && m.targets.every(id => targetIds.has(id) || questions.includes('| ' + id + ' |'))), 'invalid CALL legacy mapping');
    assert(call.prototype.length === 10 && call.prototype.every(p => ['MATCH','PARTIAL','CONFLICT','MISSING'].includes(p.status) && fs.existsSync(path.join(root,p.path))), 'invalid CALL prototype mapping');
    assert(call.opens.every(o => o.ids.every(id => questions.includes('| ' + id + ' |'))), 'unknown CALL question');
  }
  if (source.quotation) {
    const quote = source.quotation;
    assert(quote.reviewStatus === '评审中' && quote.maturity === 'READY', 'quotation must remain in review');
    assert(quote.behaviors.length === 9 && quote.behaviors.every((b,i) => b.id === '04-05-' + String.fromCharCode(65+i)), 'nine quotation behavior units');
    assert(quote.acceptance.length === 8 && quote.acceptance.every((a,i) => a.id === 'AC-QUOTE-' + String(i+1).padStart(2,'0') && a.status === '待执行'), 'quotation ACs must remain unexecuted');
    const quoteAcIds = new Set(quote.acceptance.map(a=>a.id));
    const targetIds = new Set(quote.behaviors.map(b=>b.id));
    for (const b of quote.behaviors) {
      assert(b.acceptanceIds.every(id=>quoteAcIds.has(id)), 'unknown quotation AC');
      assert(b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown quotation OPEN');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0'))), 'unknown quotation confirmation');
    }
    assert(quote.legacyMappings.length === 15 && quote.legacyMappings.every(m=>legacyIds.has(m.id) && m.targets.every(id=>targetIds.has(id)||questions.includes('| '+id+' |'))), 'invalid focused quotation REQ mapping');
    assert(quote.prototype.length === 10 && quote.prototype.every(p=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(p.status) && fs.existsSync(path.join(root,p.path))), 'invalid quotation prototype mapping');
    assert(quote.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |'))) && questions.includes('OPEN-10-26-01'), 'unknown quotation question');
    for (const s of quote.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing quotation source');
      if (s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing quotation source anchor');
    }
    assert(quote.pathComparison.length === 2 && quote.relations.some(r=>r.from === 'Quotation' && r.cardinality === '1 : N'), 'quote version and path boundaries');
  }
  if (source.pFulfillment) {
    const p = source.pFulfillment;
    assert(p.maturity === 'PARTIAL' && p.reviewStatus === '评审中', 'P domain remains partial/in review');
    assert(p.behaviors.length === 12 && p.behaviors.every((b,i)=>b.id==='04-06-'+String.fromCharCode(65+i)), 'twelve P local units');
    assert(p.acceptance.length === 11 && p.acceptance.every((a,i)=>a.id==='AC-P-'+String(i+1).padStart(2,'0')&&a.status==='待执行'), 'P ACs must remain pending');
    const acs = new Set(p.acceptance.map(a=>a.id)), units = new Set(p.behaviors.map(b=>b.id));
    for (const b of p.behaviors) {
      assert(b.acceptanceIds.every(id=>acs.has(id)), 'unknown P AC');
      assert(b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown P question');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0'))), 'unknown P confirmation');
    }
    assert(p.normalFlow.blocker.id === 'C-04' && p.normalFlow.blocker.status === 'BLOCKED', 'C-04 cannot be promoted');
    assert(p.relations.some(r=>r.from==='P业务' && r.cardinality.includes('OPEN')), 'P task cardinality must remain open');
    assert(p.prototype.length === 13 && p.prototype.every(x=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(x.status)&&fs.existsSync(path.join(root,x.path))), 'thirteen read-only P prototype mappings');
    assert(p.pathComparison.length === 9 && p.legacyMappings.length === 27, 'focused P mappings and path comparison');
    assert(p.legacyMappings.every(m=>legacyIds.has(m.id)&&m.targets.every(id=>units.has(id)||questions.includes('| '+id+' |'))), 'unknown P legacy mapping');
    assert(p.reviewedLegacyNotAdopted.every(m=>legacyIds.has(m.id)), 'unknown reviewed legacy reference');
    assert(p.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |'))), 'unknown P OPEN');
    for (const s of p.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing P source');
      if(s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing P source anchor');
    }
  }
  if (source.mService) {
    const m = source.mService;
    assert(m.maturity === 'PARTIAL' && m.reviewStatus === '评审中', 'M remains partial/in review');
    assert(m.behaviors.length === 12 && m.behaviors.every((b,i)=>b.id==='04-07-'+String.fromCharCode(65+i)), 'twelve M local units');
    assert(m.acceptance.length === 11 && m.acceptance.every((a,i)=>a.id==='AC-M-'+String(i+1).padStart(2,'0')&&a.status==='待执行'), 'M ACs remain pending');
    const acs = new Set(m.acceptance.map(a=>a.id)), units = new Set(m.behaviors.map(b=>b.id)), sources = new Set(m.sources.map(s=>s.id));
    for (const b of m.behaviors) {
      assert(b.acceptanceIds.every(id=>acs.has(id)) && b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown M AC/question');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0'))), 'unknown M confirmation');
      assert(b.sourceRefs.every(id=>sources.has(id)), 'unknown M source identity');
    }
    assert(m.hierarchy.length===6 && m.discoveryBranches.length===3, 'M hierarchy and repair reference structure');
    assert(m.relations.some(r=>r.from==='一次M实际上门'&&r.cardinality.startsWith('一次实际上门')) && m.relations.filter(r=>r.from!=='一次M实际上门').every(r=>!r.cardinality.includes('1 : N')&&!r.cardinality.includes('1:1')), 'do not invent M cardinalities');
    assert(m.prototype.length===16 && m.prototype.every(x=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(x.status)&&fs.existsSync(path.join(root,x.path))), 'sixteen read-only M prototype checks');
    assert(m.legacyMappings.length===22 && m.legacyMappings.every(x=>legacyIds.has(x.id)&&x.targets.every(id=>units.has(id)||questions.includes('| '+id+' |'))), 'focused M REQ mappings');
    assert(m.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |'))) && m.reviewedLegacyNotAdopted.every(x=>legacyIds.has(x.id)), 'unknown M OPEN or reviewed REQ');
    for (const s of m.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing M source');
      if(s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing M source anchor');
    }
  }
  if (source.mpControl) {
    const m = source.mpControl;
    assert(m.maturity==='PARTIAL' && m.reviewStatus==='评审中', 'MP remains partial/in review');
    assert(m.behaviors.length===12 && m.behaviors.every((b,i)=>b.id==='04-08-'+String.fromCharCode(65+i)), 'twelve MP local units');
    assert(m.acceptance.length===11 && m.acceptance.every((a,i)=>a.id==='AC-MP-'+String(i+1).padStart(2,'0')&&a.status==='待执行'), 'MP ACs remain pending');
    const acs=new Set(m.acceptance.map(a=>a.id)), units=new Set(m.behaviors.map(b=>b.id)), sources=new Set(m.sources.map(s=>s.id));
    for (const b of m.behaviors) {
      assert(b.acceptanceIds.every(id=>acs.has(id))&&b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown MP AC/question');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0'))), 'unknown MP confirmation');
      assert(b.sourceRefs.every(id=>sources.has(id)), 'unknown MP source');
    }
    assert(m.dualModel.parts.map(p=>p.reference).join(',')==='07,06'&&m.progressTracks.length===2, 'MP must reference existing M/P domains');
    assert(m.prototype.length===18&&m.prototype.every(x=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(x.status)&&fs.existsSync(path.join(root,x.path))), 'eighteen read-only MP checks');
    assert(m.legacyMappings.length===15&&m.legacyMappings.every(x=>legacyIds.has(x.id)&&x.targets.every(id=>units.has(id)||questions.includes('| '+id+' |'))), 'focused MP REQ mappings');
    assert(m.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |')))&&m.reviewedLegacyNotAdopted.every(x=>legacyIds.has(x.id)), 'unknown MP OPEN/REQ');
    for(const s of m.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing MP source');
      if(s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing MP source anchor');
    }
  }
  if (source.materialSupply) {
    const m=source.materialSupply;
    assert(m.maturity==='PARTIAL'&&m.reviewStatus==='评审中', 'MR remains partial/in review');
    assert(m.behaviors.length===12&&m.behaviors.every((b,i)=>b.id==='04-09-'+String.fromCharCode(65+i)), 'twelve MR local units');
    assert(m.acceptance.length===12&&m.acceptance.every((a,i)=>a.id==='AC-MR-'+String(i+1).padStart(2,'0')&&a.status==='待执行'), 'MR ACs remain pending');
    const acs=new Set(m.acceptance.map(a=>a.id)), units=new Set(m.behaviors.map(b=>b.id)), sources=new Set(m.sources.map(s=>s.id));
    for(const b of m.behaviors) {
      assert(b.acceptanceIds.every(id=>acs.has(id))&&b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown MR AC/question');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0')))&&b.sourceRefs.every(id=>sources.has(id)), 'unknown MR basis/source');
    }
    assert(m.materialModel.blocker.id==='C-04'&&m.materialModel.blocker.status==='BLOCKED', 'MR cannot close C-04');
    assert(m.changeBoundary.includes('OPEN')&&questions.includes('OPEN-10-26-01'), 'material change remains unresolved');
    assert(m.relations.some(r=>r.from==='普通成交报价'&&r.cardinality.startsWith('1 : 1'))&&m.relations.some(r=>r.from==='MR'&&r.cardinality.startsWith('1 : N')), 'normal deal one MR, MR multiple POs');
    assert(m.prototype.length===14&&m.prototype.every(x=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(x.status)&&fs.existsSync(path.join(root,x.path))), 'fourteen read-only MR checks');
    assert(m.legacyMappings.length===10&&m.legacyMappings.every(x=>legacyIds.has(x.id)&&x.targets.every(id=>units.has(id)||questions.includes('| '+id+' |'))), 'focused MR mappings');
    assert(m.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |')))&&m.reviewedLegacyNotAdopted.every(x=>legacyIds.has(x.id)), 'unknown MR OPEN/REQ');
    for(const s of m.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing MR source');
      if(s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing MR source anchor');
    }
  }
  if (source.financeHandoff) {
    const f=source.financeHandoff;
    assert(f.maturity==='PARTIAL'&&f.reviewStatus==='评审中', 'finance remains partial/in review');
    assert(f.behaviors.length===12&&f.behaviors.every((b,i)=>b.id==='04-10-'+String.fromCharCode(65+i)), 'twelve finance local units');
    assert(f.acceptance.length===12&&f.acceptance.every((a,i)=>a.id==='AC-FIN-'+String(i+1).padStart(2,'0')&&a.status==='待执行'), 'finance ACs remain pending');
    const acs=new Set(f.acceptance.map(a=>a.id)), units=new Set(f.behaviors.map(b=>b.id)), sources=new Set(f.sources.map(s=>s.id));
    for(const b of f.behaviors) {
      assert(b.acceptanceIds.every(id=>acs.has(id))&&b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown finance AC/question');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0')))&&b.sourceRefs.every(id=>sources.has(id)), 'unknown finance basis/source');
    }
    assert(f.financeModel.axes.map(a=>a.key).join(',')==='docs,invoice,payment'&&f.financeModel.independence.length===4, 'independent finance dimensions');
    assert(f.relations.every(r=>!/^1\s*:\s*1/.test(r.cardinality)), 'unknown finance cardinalities cannot be fixed');
    assert(f.prototype.length===16&&f.prototype.every(x=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(x.status)&&fs.existsSync(path.join(root,x.path))), 'sixteen read-only finance checks');
    assert(f.legacyMappings.length===17&&f.legacyMappings.every(x=>legacyIds.has(x.id)&&x.targets.every(id=>units.has(id)||questions.includes('| '+id+' |'))), 'focused finance mappings');
    assert(f.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |')))&&f.reviewedLegacyNotAdopted.every(x=>legacyIds.has(x.id)), 'unknown finance OPEN/REQ');
    for(const s of f.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing finance source');
      if(s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing finance source anchor');
    }
  }
  if (source.partialScopes) {
    const f=source.partialScopes;
    assert(f.maturity==='PARTIAL'&&f.reviewStatus==='评审中', 'partial remains partial/in review');
    assert(f.behaviors.length===12&&f.behaviors.every((b,i)=>b.id==='04-11-'+String.fromCharCode(65+i)), 'twelve partial local units');
    assert(f.acceptance.length===10&&f.acceptance.every((a,i)=>a.id==='AC-PART-'+String(i+1).padStart(2,'0')&&a.status==='待执行'), 'partial ACs remain pending');
    const acs=new Set(f.acceptance.map(a=>a.id)), units=new Set(f.behaviors.map(b=>b.id)), sources=new Set(f.sources.map(s=>s.id));
    for(const b of f.behaviors) {
      assert(b.acceptanceIds.every(id=>acs.has(id))&&b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown partial AC/question');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0')))&&b.sourceRefs.every(id=>sources.has(id)), 'unknown partial basis/source');
    }
    assert(f.boundaryGroups.length===2&&f.cmAudit.length===10&&f.tenderAudit.length===8, 'partial boundary audits');
    assert(f.prototype.length===10&&f.prototype.every(x=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(x.status)&&fs.existsSync(path.join(root,x.path))), 'sixteen read-only partial checks');
    assert(f.legacyMappings.length===15&&f.legacyMappings.every(x=>legacyIds.has(x.id)&&x.targets.every(id=>units.has(id)||questions.includes('| '+id+' |'))), 'focused partial mappings');
    assert(f.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |')))&&f.reviewedLegacyNotAdopted.every(x=>legacyIds.has(x.id)), 'unknown partial OPEN/REQ');
    for(const s of f.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing partial source');
      if(s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing partial source anchor');
    }
  }
  if (source.commonRules) {
    const f=source.commonRules;
    assert(f.maturity==='PARTIAL'&&f.reviewStatus==='评审中', 'common rules remain partial/in review');
    assert(f.behaviors.length===10&&f.behaviors.every((b,i)=>b.id==='04-12-'+String.fromCharCode(65+i)), 'ten common local units');
    assert(f.acceptance.length===8&&f.acceptance.every((a,i)=>a.id==='AC-COM-'+String(i+1).padStart(2,'0')&&a.status==='待执行'), 'common ACs remain pending');
    const acs=new Set(f.acceptance.map(a=>a.id)), units=new Set(f.behaviors.map(b=>b.id)), sources=new Set(f.sources.map(s=>s.id));
    for(const b of f.behaviors) {
      assert(b.acceptanceIds.every(id=>acs.has(id))&&b.openIds.every(id=>questions.includes('| '+id+' |')), 'unknown common AC/question');
      assert(b.basis.every(n=>confirmation.includes('CONFIRM-10-26-'+String(n).padStart(2,'0')))&&b.sourceRefs.every(id=>sources.has(id)), 'unknown common basis/source');
    }
    const pageModule={'03':'customerContract','04':'callIntake','05':'quotation','06':'pFulfillment','07':'mService','08':'mpControl','09':'materialSupply','10':'financeHandoff','11':'partialScopes'};
    assert(f.acceptanceReferences.length===12&&f.acceptanceReferences.every(r=>source[pageModule[r.reference]]?.acceptance.some(a=>a.id===r.acceptanceId&&a.status==='待执行')), 'common AC references must point to pending original ACs');
    assert(f.prototype.length===13&&f.prototype.every(x=>['MATCH','PARTIAL','CONFLICT','MISSING'].includes(x.status)&&fs.existsSync(path.join(root,x.path))), 'thirteen read-only common checks');
    assert(f.legacyMappings.length===25&&f.legacyMappings.every(x=>legacyIds.has(x.id)&&x.targets.every(id=>units.has(id)||questions.includes('| '+id+' |'))), 'focused common mappings');
    assert(f.opens.every(o=>o.ids.every(id=>questions.includes('| '+id+' |')))&&f.reviewedLegacyNotAdopted.every(x=>legacyIds.has(x.id)), 'unknown common OPEN/REQ');
    for(const s of f.sources) {
      assert(fs.existsSync(path.join(root,s.path)), 'missing common source');
      if(s.anchor) assert(fs.readFileSync(path.join(root,s.path),'utf8').includes('id="'+s.anchor+'"'), 'missing common source anchor');
    }
  }
  assert(work.requirementsV1?.status === '待确认', 'work must remain pending human review');
  assert(work.gateReviews?.business03?.conclusion === 'CONDITIONAL PASS', '03 Gate must not be promoted');
  assert(work.project.frozenBatches === 0 && /未批准/.test(work.project.scopeApproval), 'project approval must stay unchanged');
  return {
    ...source, sourcePath: requirementsV1Path,
    sourceHash: crypto.createHash('sha256').update(raw).digest('hex'),
    workReview: { ...work.requirementsV1, sourcePath: work.sourcePath, sourceHash: work.sourceHash },
    projectContext: { stage: work.project.stage, wholeChain: work.project.wholeChain,
      frozenBatches: work.project.frozenBatches, scopeApproval: work.project.scopeApproval,
      businessGate: work.gateReviews.business03.conclusion, blocker: 'C-04：阶段材料可供施工的确认责任、凭据及交接方式' },
  };
}

module.exports = {requirementsV1Path, readRequirementsV1};
