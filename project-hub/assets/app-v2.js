(() => {
  const D = window.HUB_DATA;
  const U = D.businessUpdate1026;
  // Current display projects the knowledge supplement; original embedded records stay immutable.
  const activeQuestions = D.questions.map(q => {
    const update = U?.questionUpdates.find(x => x.id === q.id);
    return update ? {...q,...update,previousRecord:q,confirmationSource:U.sourceId} : q;
  }).concat(U && !D.questions.some(q=>q.id===U.open.id) ? [{...U.open,confirmationSource:U.sourceId}] : []);
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const byId = name => new Map(D[name].map(item => [item.id, item]));
  const maps = { files: byId('files'), facts: byId('facts'), decisions: byId('decisions'), flows: byId('flows'), requirements: byId('requirements'), pages: byId('pages') };
  const counts = D.audit.counts;
  const primaryIa = [
    { id: 'progress', number: '01', title: '当前推进', children: [] },
    { id: 'overview', number: '02', title: '业务全景', children: [] },
    { id: 'flows', number: '03', title: '业务流程', children: [] },
    { id: 'requirements', number: '04', title: '系统需求', children: [] },
    { id: 'design', number: '05', title: '原型与设计', children: ['PRD', 'Prototype', 'SDD', 'TDD', 'Testing'] },
    { id: 'questions', number: '06', title: '待确认问题', children: [] },
    { id: 'status', number: '07', title: '项目状态', children: [] },
    { id: 'evidence', number: 'A', title: '证据与追溯', children: ['Source', 'Fact', 'Decision', 'Change', 'Traceability'] },
  ];
  const sections = Object.fromEntries(primaryIa.map(x => [x.id, x]));
  const state = { view: 'progress', sub: '', flow: 'FLOW-MAIN', module: '', factStatus: '', search: '' };
  const statusBadge = (status, delivery = false) => `<span class="badge ${esc(String(status).toLowerCase())} ${delivery ? 'delivery-state' : 'fact-state'}">${esc(status)}</span>`;
  const link = (kind, id, label) => `<button class="inline-link" data-kind="${esc(kind)}" data-id="${esc(id)}">${esc(label ?? id)}</button>`;
  const refs = (kind, ids, empty = 'UNLINKED') => ids?.length ? `<div class="refs">${ids.map(id => link(kind, id, id)).join('')}</div>` : `<span class="empty-ref">${esc(empty)}</span>`;
  const panel = (title, body, note = '') => `<section class="panel"><div class="panel-head"><div><h2>${esc(title)}</h2>${note ? `<p class="sub">${esc(note)}</p>` : ''}</div></div>${body}</section>`;
  const fileAnchor = (id, label) => { const f = maps.files.get(id); return f ? `<a class="file-link" href="${encodeURI(f.path)}" target="_blank" rel="noopener">${esc(label || f.name)} ↗</a>` : '<span class="empty-ref">MISSING SOURCE</span>'; };
  const fileRefList = ids => ids?.length ? `<div class="file-ref-list">${ids.map(id => { const f = maps.files.get(id); return f ? `<div><span>${statusBadge(f.deliveryStatus, true)}</span> ${fileAnchor(id)}<small class="path">${esc(f.projectPath)}</small></div>` : '' }).join('')}</div>` : '<div class="missing-box">MISSING</div>';
  const roleAliases = { TL: ['主管'], MASTER: ['师傅'], TENDER: ['tender', '标书'], PUR: ['采购'], WAREHOUSE: ['仓管', '仓务'], FIN: ['财务'] };
  const roleFlows = role => {
    const tokens = [role.code, role.name, ...(roleAliases[role.code] || [])].map(x => String(x).toLowerCase());
    return D.flows.filter(f => f.roles.some(label => tokens.some(token => String(label).toLowerCase().includes(token))));
  };
  const flowNodes = (flow, startIndex = 0) => `<div class="flow-strip">${flow.nodes.map((n, index) => `<button class="node" data-kind="${n.confirmationIds ? 'current-node' : 'node'}" data-id="${esc(n.id)}"><small>${String(index + startIndex + 1).padStart(2, '0')} · ${esc(n.actor)}</small><strong>${esc(n.label)}</strong><span class="state">${esc(n.state)}</span><small>→ ${esc(n.nextRole)}</small></button>`).join('')}</div>`;
  const confirmationRef = (numbers, label = '') => U ? `<div class="sync-refs">${numbers.map(n=>{const id='CONFIRM-10-26-'+String(n).padStart(2,'0');return link('confirmation1026',id,label || U.confirmations.find(c=>c.id===id)?.title || id)}).join('')}</div>` : '';
  const latestSourceLink = (label = '10/26确认原文与适用边界') => U ? `<a class="file-link" href="${encodeURI('../'+U.sourcePath)}" target="_blank" rel="noopener">${esc(label)} ↗</a>` : '';
  function latestNotice() {
    return U ? `<div class="sync-notice"><strong>10/26最新知识已同步</strong><span>客户会议及Michael会后20项人工确认已入库，事实回灌Gate通过；人工确认不是客户签批。</span>${latestSourceLink()}<small>业务流程确认中 · 维修整链未通过 · 0批业务正式定稿</small></div>` : '';
  }
  function testChainPanel() {
    return U ? `<section class="sync-test-chain" aria-label="第一批部门测试链"><div class="sync-test-heading"><h2>第一批部门测试链</h2><strong>目标测试链 · 尚未通过</strong></div><p>下一阶段：把第一条完整业务链梳理、整改到可供部门测试；目前不表示已具备测试条件。</p><div class="sync-chain">${U.direction.steps.map((s,i)=>`<span>${esc(s)}</span>${i<U.direction.steps.length-1?'<i aria-hidden="true">→</i>':''}`).join('')}</div><small>参与：${esc(U.direction.roles.join(' → '))}。阶段材料交接、变更与未决细则须确认；本条为选定测试路径，不是所有业务必经流程。</small><button class="inline-link" data-kind="question" data-id="OPEN-10-26-01">中单后材料变更仍为OPEN／P0 →</button></section>` : '';
  }
  function displayFlow(f) {
    if (!U || !f || ['FLOW-MAIN','FLOW-MAINT-ISSUE'].includes(f.id)) return f;
    // Display corrections cite existing confirmations; no new FLOW/node IDs or approved state dictionary.
    const changes = {
      'P-01':['报价组／接手报价员','报价公共池与接手','CALL／SR报价需求进入全组可见公共待办；接手报价员负责报价及跟进','待接手／报价中',[7,9,10]],
      'P-02':['接手报价员','报价版本沟通','维护V1、V2、V3等版本，保留历史','报价沟通中',[8]],
      'P-03':['接手报价员','接受与中单','客户接受某一版本后，由该报价员确认中单；成交版本作为下游依据','已中单',[8]],
      'P-04':['系统','成交报价生成1张MR','普通成交报价按最终成交版本生成1张MR；不据此决定中单后变更规则','材料申请',[11]],
      'P-05':['仓库／采购','多PO与分阶段供料','一MR可多采购PO、分供应商、分阶段采购及到货，不要求所有材料一次齐套','分阶段供料',[11,12]],
      'P-06':['主管；材料确认岗位待明确','阶段材料与派工交接','按本次／本阶段供料安排施工；材料确认岗位、单据和回EC口径仍待C-04；既有派工备注／电话交接说明保留','阶段供料确认待明确',[12,13]],
      'P-07':['师傅','分阶段／多日施工','按供料阶段施工，可连续多日；不要求每天形成独立完工结果','施工中',[12,15]],
      'P-08':['师傅','最终完工单CP','最终施工完成后提交最终完工单，交主管核对','待主管确认',[15]],
      'P-09':['主管','主管确认P业务完成','主管确认最终完工单并更新完成；业务完成与开票、收款独立','P业务完成',[15,16,20]],
      'IR-01':['师傅','现场发现维修问题','上门发现维修问题，判断是否能现场处理','现场判断',[9,17]],
      'IR-02':['师傅／客户','现场沟通','与客户沟通现场可处理的维修；不强制先联系报价组制作正式报价','沟通确认',[9]],
      'IR-03':['客户','客户同意现场维修','现场可处理且取得客户同意后直接维修','客户同意',[9,17]],
      'IR-04':['师傅','当场维修','现场直接维修，后续补报价','已处理',[9]],
      'IR-05':['师傅；交款岗位待确认','现场收款（适用时）','保留既有现场收款事实；接款、登记及对账仍待C-06，不作为业务完成统一前置','现场款交接待明确',[20]],
      'IR-06':['师傅／客户','提交现场资料','现场服务记录保留；即时维修SR／CP特例仍待C-08，费用可现场填并后补改','单据特例待明确',[14,15,19]],
      'IR-07':['后补手续完整归口待确认','后补报价','先维修后补报价；后补手续责任与现场收款细则仍待确认','后补手续待明确',[9]],
      'M-06':['师傅／客户','本次上门SR','每次M上门一份SR，同一M多次上门可多份SR','待本次工作确认',[14]],
      'M-07':['主管','本次工作工单关闭','提交本次现场资料后主管确认关闭本次工单；不代表整个M完成，发现P另行推进','本次工单关闭',[16,17]],
      'MR-01':['系统；特殊入口按原未决保留','普通成交报价生成MR','普通成交报价对应1张MR；历史无报价手工／自主申请入口的适用细则仍按原问题保留','材料申请',[11]],
      'MR-02':['仓库／采购','一MR多PO、分阶段供料','允许分供应商采购、多PO、分阶段到货及施工；不以全项目一次齐套为唯一门槛','分阶段供料',[11,12]],
      'MR-03':['确认岗位待明确','阶段材料进度交接','阶段可供施工由谁、在哪张单据确认及怎样回EC仍待C-04；中单后变化如何改报价／MR／PO仍OPEN','阶段确认口径待定',[12]],
      'FIN-04':['财务；现场交款岗位待确认','收款与对账独立跟踪','P／M完成、开票、收款独立；不以收款阻止工单或业务关闭；交款、对账及特殊票款规则仍未决','独立财务状态',[20]],
    };
    const summaries = {
      'FLOW-P':'普通报价维修：报价公共池→接手报价员→版本／接受／中单→1MR多PO→分阶段施工→最终CP→主管确认；业务与票款独立。细则及整链仍未确认完成。',
      'FLOW-INSTANT':'现场可处理且客户同意可先维修、后补报价；不把先制正式报价或现场收款设为全部业务的前置。补单、单据及款项细则仍待确认。',
      'FLOW-M':'合同周期保养沿用既有计划／排期；每次上门一SR，由主管确认关闭本次工作工单，整个M的结束条件仍待确认。',
      'FLOW-MR':'普通成交报价1MR，可多采购PO与分阶段采购、到货及施工。阶段供料交接待C-04，中单后材料变更待OPEN-10-26-01。',
      'FLOW-FINANCE':'资料核对／补件、开票、收款分别记录；P／M业务完成不等于开票或收款。具体交接、特殊票款仍待确认。',
    };
    const nodes=f.nodes.map(n=>{
      const nextRoles={'P-01':'接手报价员','P-02':'客户／接手报价员','P-03':'系统／仓库供料','P-04':'仓库／采购','P-05':'主管；材料确认岗位待明确','P-06':'师傅','P-07':'师傅（最终完工单）','P-08':'主管','P-09':'业务完成；财务独立跟进','M-06':'主管','M-07':'后续保养；原M分别推进','MR-03':'主管；阶段供料责任待明确'};
      const row=changes[n.id];return row?{...n,actor:row[0],label:row[1],action:row[2],state:row[3],nextRole:nextRoles[n.id]||n.nextRole,confirmationIds:row[4],previousRecord:n}:n;
    });
    return summaries[f.id] ? {...f,summary:summaries[f.id],factStatus:'PARTIAL',nodes,
      roles:[...new Set(nodes.map(n=>n.actor))],keyStates:[...new Set(nodes.map(n=>n.state))]} : f;
  }
  const mapNode = ({ title, meta, nodeId = '', flowId = '', tone = '', className = '' }) => {
    const attrs = nodeId ? `data-kind="node" data-id="${esc(nodeId)}"` : flowId ? `data-view="flows" data-flow="${esc(flowId)}"` : '';
    const tag = attrs ? 'button' : 'div';
    return `<${tag} class="business-node ${tone} ${className}" ${attrs}><strong>${esc(title)}</strong>${meta ? `<span>${esc(meta)}</span>` : ''}</${tag}>`;
  };
  const sceneOverviewCard = ({ number, title, status, summary, flowId = '' }) => {
    const tag = flowId ? 'button' : 'div';
    const attrs = flowId ? `data-view="flows" data-flow="${esc(flowId)}"` : 'aria-label="该场景暂无独立详情页"';
    return `<${tag} class="scene-card scene-button overview-scene-card ${flowId ? '' : 'entry-only'}" ${attrs}><div class="scene-card-top"><span class="scene-number">${esc(number)}</span>${statusBadge(status)}</div><h3>${esc(title)}</h3><p>${esc(summary)}</p>${!flowId ? '<small>独立入口 · 详情待后续建立</small>' : ''}</${tag}>`;
  };
  const deliveryCard = item => `<button class="delivery-card" data-view="design" data-sub="${esc(item.kind)}"><strong>${esc(item.kind)}</strong>${statusBadge(item.status, true)}<small>${item.count} 个文件 · ${item.status === 'MISSING' ? '缺口' : '待内容核验'}</small></button>`;

  function nav() {
    $('#nav').innerHTML = primaryIa.map(section => `<div class="nav-group ${section.id === 'evidence' ? 'nav-secondary' : ''}"><button class="nav-main ${state.view === section.id ? 'active' : ''}" data-view="${section.id}"><span>${section.number}</span>${esc(section.title)}</button>${state.view === section.id && section.children.length ? `<div class="nav-children">${section.children.map(child => { const module = section.id === 'requirements' && D.moduleNames.includes(child) ? child : ''; return `<button class="nav-child ${state.sub === child ? 'selected' : ''}" data-view="${section.id}" data-sub="${esc(child)}" data-module="${esc(module)}">${esc(child)}</button>`; }).join('')}</div>` : ''}</div>`).join('');
    const sideLinks = $('.side-links');
    if (sideLinks && !sideLinks.querySelector('[data-sync-link]')) sideLinks.insertAdjacentHTML('beforeend', '<a data-sync-link href="../docs/governance/KNOWLEDGE-SYNC-PROTOCOL.md">知识同步协议 ↗</a>');
    const requirementPage = state.view === 'requirements' && D.requirementsV1?.pages.find(p => state.sub === 'v1:' + p.id);
    const subtitle = state.view === 'flows' ? flowPageLabel() : requirementPage ? '04-' + requirementPage.id + ' ' + requirementPage.title : state.sub;
    $('#view-title').textContent = state.search ? '全局搜索' : sections[state.view].title + (subtitle ? ' / ' + subtitle : '');
  }
  function progressView({ showOverview = false } = {}) {
    // Read-only progress summary of existing records; no business data is written here.
    // IA frozen V1 (2026-10-25): seven stages only. Update states/current stage or fix links; keep business details in the on-demand overview.
    const w = D.workRegister;
    const businessModel = D.currentBusinessModel;
    const modelSource = (label = 'SOURCE-033 · 用户业务模型确认') => businessModel
      ? `<a class="file-link" href="${encodeURI('../' + businessModel.sourcePath)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`
      : '<span class="empty-ref">业务模型确认尚未投影，请按知识源定向生成</span>';
    const focus = w.workView?.items.find(t => t.id === w.taskTree?.focus?.taskId);
    const clientById = new Map(w.clientQuestions.map(q => [q.id, q]));
    const pending = q => !['CLOSED', 'RESOLVED'].includes(q.status);
    const hasCustomerEvidence = q => Boolean(q?.decision && q.confirmedBy && q.confirmedAt);
    const recordLabel = text => /暂定|待客户|待核|规则未定|未说明/.test(text || '')
      ? '待核实' : /SOURCE-029|SOURCE-032/.test(text || '') ? '用户已说明' : '待核实';
    const evidenceTag = (label, note = '') => `<span class="convergence-tag" title="${esc(note)}">${esc(label)}</span>`;
    const flowConflicts = f => D.conflicts.filter(c => c.status === 'CONFLICT' && c.flowIds?.includes(f.id));
    const flowState = (f, qs) => {
      if (f.status === 'CONFLICT' || flowConflicts(f).length || qs.some(q => q.status === 'CONFLICT')) return '存在冲突';
      // A historical CONFIRMED label is not evidence of project/customer approval.
      if (!qs.length && f.approvalStatus === '已批准' && f.confirmedBy && f.confirmedAt) return '已确认';
      if (qs.some(q => {
        const c = clientById.get(q.id);
        return c?.status === '待确认' && !hasCustomerEvidence(c);
      })) return '待客户确认';
      if (f.status === 'PARTIAL' || f.nodes.some(n => /SOURCE-029|SOURCE-032/.test(n.description || ''))) return '梳理中';
      return '待梳理';
    };
    const taskActive = id => w.tasks.some(t => t.id === id && t.status === '进行中');
    const phases = [
      {title: '需求事实梳理', status: taskActive('TASK-051') || taskActive('TASK-052') ? '进行中' : '待进入', note: '已有用户说明，仍需核对；没有完成记录'},
      {title: '业务流程确认', status: /逐组业务确认/.test(w.project.stage) ? '进行中' : '待进入', note: w.project.stage},
      {title: '系统需求确认', status: /未批准|待确认/.test(w.project.scopeApproval || '') ? '阻塞' : '待进入', note: w.project.scopeApproval || '阶段启动情况待核实'},
      {title: '原型定版', status: /未通过|还没全部检查通过/.test(w.project.wholeChain || '') ? '阻塞' : taskActive('TASK-064') ? '进行中' : '待进入', note: `${w.project.frozenBatches}批定稿；${w.project.wholeChain || '整链结果待核实'}`},
    ];
    // C numbers may cover different subquestions across snapshots; keep the flow's own title.
    const questionName = q => q.title;
    const flowDetails = (f, qs) => {
      const userNodes = f.nodes.filter(n => /SOURCE-029|SOURCE-032/.test(n.description || ''));
      return `<details class="convergence-detail"><summary>已有说明与依据</summary><div class="convergence-detail-body">
        <p class="sub">原流程状态：${esc(f.status)}；事实标签：${esc(f.factStatus || '待核实')}。这些标签不等于客户批准。</p>
        ${flowConflicts(f).length ? `<h4>已记录冲突（未裁定）</h4>${flowConflicts(f).map(c => `<article><h4>${link('conflict', c.id, c.title)}</h4><small>${esc(c.id)} · ${esc((c.questionIds || []).join('、'))}</small><p>${esc(c.evidenceNote)}</p></article>`).join('')}` : ''}
        ${userNodes.length ? userNodes.map(n => `<article><h4>${esc(n.label)} ${evidenceTag(recordLabel(n.description))}</h4><p>${esc(n.description)}</p>${link('node', n.id, '查看原节点与关联')}</article>`).join('') : `<p>${evidenceTag('待核实')} ${esc(f.summary)}</p><p class="sub">本流程暂无已标注SOURCE-029／032的节点说明；原流程标签不代表客户已确认。</p>`}
        ${qs.length ? `<h4>本流程已关联的未决问题</h4>${qs.map(q => {
          const c = clientById.get(q.id);
          return `<article><h4>${link('question', q.id, q.title)} ${evidenceTag(hasCustomerEvidence(c) ? '客户已确认' : '待确认')}</h4><small>${esc(q.id)}</small>${(q.clarifications || []).map(x => `<p>${esc(x.title)}<br><small>${esc(x.audience)}</small></p>`).join('')}${q.options ? `<p><strong>原记录候选方案（待确认）：</strong>${esc(q.options)}</p>` : ''}</article>`;
        }).join('')}` : '<p>现有关联未列出未决问题，完整性待核实；不表示没有阻塞。</p>'}
        <button class="inline-link" data-view="flows" data-flow="${esc(f.id)}">查看原业务流程 →</button>
      </div></details>`;
    };
    const legacyMainOverview = (f, qs) => {
      // Presentation summaries of existing records only; no business state is written here.
      const userSources = [
        ['SOURCE-022', 'docs/knowledge/03-business/B01-B02-INTERNAL-BASELINE-20261013.md'],
        ['SOURCE-029', 'docs/knowledge/03-business/BUSINESS-CLARIFICATIONS-20261016.md'],
        ['SOURCE-032', 'docs/knowledge/03-business/BUSINESS-CLARIFICATIONS-20261020.md'],
      ];
      const rules = [
        ['M是保养，P是维修，M+P是维修加保养，三类均收费。', 'SOURCE-032 Q5；MAIN-06', false],
        ['CS记录CALL并填写主管；主管和负责区域的CR可自行报价，自主报价不必补建CALL。', 'SOURCE-029 第01、02、04项', true],
        ['SR提出需要报价，由报价组处理；标书组可以制作标书报价。', 'SOURCE-029 第05、06项', true],
        ['客户接受报价后，由实际报价人确认中单。', 'SOURCE-029 第03项', true],
        ['正常周期保养不另建CALL；CR排师傅和时间，本期完成可由CR或主管确认。', 'SOURCE-029 第12～15项', false],
        ['报价中单维修用完工纸CP，交主管核对并确认完工；保养或CALL上门使用SR。', 'SOURCE-022「报价中单维修用完工纸」「主管确认状态」；MAIN-08/09', true],
        ['维修完工与收款分别记录，主管确认完工不代表财务已收款。', 'SOURCE-022「主管确认状态，财务独立」；MAIN-09/10；CONFIRMED-017', false],
      ];
      const chain = [
        ['MAIN-01', '客户需求', ''], ['MAIN-03', '报价及修订', '职责有差异'],
        ['MAIN-04', '客户接受报价', ''], ['MAIN-05', '确认中单', '职责有差异'],
        ['MAIN-06', 'M / P / M+P分流', ''], ['MAIN-07', '排期与服务', ''],
        ['MAIN-08', '对应单据确认', '旧记录有差异'], ['MAIN-09', '完工状态共享', ''],
      ].filter(([id]) => f.nodes.some(n => n.id === id));
      const sourceIds = [...new Set([
        ...f.sourceFileIds, ...(f.knowledgeFileIds || []), f.baselineFileId,
        ...userSources.map(([, path]) => fileIdByPath(path)),
        ...f.decisionIds.flatMap(id => maps.decisions.get(id)?.sourceFileIds || []),
      ].filter(Boolean))];
      const keyQuestions = qs.filter(q => !/^N\b/.test(q.blocking || ''));
      const section = (number, title, body) => `<section class="main-overview-section"><h3><span>${number}</span>${title}</h3>${body}</section>`;
      return `<div class="main-overview" id="main-overview-panel">
        <p class="main-overview-intro">全局业务总览 · 先看已说明的规则，再看主链与分支；具体操作在对应子流程查看。</p>
        ${section('A', '已明确的业务规则', `<p class="main-overview-note">以下为用户已说明的内容；与旧记录不同的地方仍保留差异，不作为最终裁定。</p><ol class="main-core-rules">${rules.map(([text, , different]) => `<li><span>${esc(text)}</span><div>${evidenceTag('用户已说明')}${different ? evidenceTag('旧记录有差异') : ''}</div></li>`).join('')}</ol><p class="main-overview-note">客户已确认：本组尚未核到可将上述用户说明标为客户正式确认的记录。</p>`)}
        ${section('B', '当前业务流程', `<p class="main-overview-label">已报价业务主链</p><div class="main-overview-chain" aria-label="已报价业务主链">${chain.map(([id, text, note]) => `<div>${link('node', id, text)}${note ? `<small>${esc(note)}</small>` : ''}</div>`).join('<span aria-hidden="true">→</span>')}</div><div class="main-overview-branches"><p><strong>P 维修</strong><span>材料及施工准备 → 现场维修 → 完工确认</span><small>材料备齐的确认岗位、单据待确认。</small></p><p><strong>M 保养</strong><span>整期计划与排期 → 周期服务 → 每期完成</span></p><p><strong>M+P</strong><span>同一报价包含M与P；原讨论记录两线分别推进，无固定先后顺序。</span><small>原讨论已记录；客户正式确认情况待核实。</small></p></div><p class="main-overview-boundary"><strong>已有例外：</strong>现场即时维修可先修、当场收款、后补报价；补单归口及现场款交接仍待确认。不能把全部业务都套入先报价的主链。</p><p class="main-overview-boundary"><strong>独立跟进：</strong>完工、开票与收款分别记录；完工不代表自动开票或收款完成。</p>`)}
        ${section('C', '未确认／冲突', `<div class="main-overview-conflicts">${flowConflicts(f).map(c => c.id === 'CONFLICT-007' ? `<article><h4>${link('conflict', c.id, '报价制作和中单确认的职责不一致')}</h4><p><strong>旧流程：</strong>统一由报价组制作报价、确认中单。</p><p><strong>后续用户说明：</strong>主管／CR、报价组、标书组按来源报价，由实际报价人确认中单。</p><small>差异尚未统一；${esc(c.id)}，原证据全文见下方。</small></article>` : `<article><h4>${link('conflict', c.id, c.title)}</h4><p>具体差异待核实；完整证据保留在下方。</p><small>${esc(c.id)}</small></article>`).join('')}${f.nodes.find(n => n.id === 'MAIN-08')?.status === 'CONFLICT' ? `<article><h4>${link('node', 'MAIN-08', '完工单据的旧记录与后续说明不同')}</h4><p><strong>旧记录：</strong>服务完成后统一描述为提交SR，由CR／主管确认。</p><p><strong>后续用户说明：</strong>保养／CALL上门用SR；报价中单维修用CP，由主管确认完工。</p><small>保留原记录及后续说明；单据特例、打印交付与补证仍待确认。</small></article>` : ''}</div><h4 class="main-overview-label">影响总流程的未决问题</h4><ul class="main-overview-pending">${keyQuestions.map(q => `<li>${link('question', q.id, q.title)}<small>${esc(q.id)} · 待确认</small></li>`).join('')}</ul>`)}
        <details class="main-overview-history"><summary><span>D</span>依据与历史记录 <small>原文、来源与内部标签</small></summary><div class="main-overview-history-body"><h4>核心规则的依据</h4><ol class="main-rule-sources">${rules.map(([text, locator]) => `<li><strong>${esc(text)}</strong><p>${esc(locator)}</p></li>`).join('')}</ol><h4>本轮用户说明原文</h4><div class="refs">${userSources.map(([id, path]) => fileAnchor(fileIdByPath(path), id)).join('')}</div><h4>原展开内容与完整差异证据</h4>${flowDetails(f, qs)}<h4>全部原节点与内部标签</h4>${f.nodes.map(n => `<article><h4>${link('node', n.id, n.label)}</h4><small>${esc(n.id)} · ${esc(n.status)}</small><p>${esc(n.actor)} → ${esc(n.action)} → ${esc(n.state)} → ${esc(n.nextRole)}</p>${n.description ? `<p>${esc(n.description)}</p>` : ''}${refs('decision', n.decisionIds)}</article>`).join('')}<h4>Decision与未决讨论</h4>${refs('decision', [...f.decisionIds, ...f.openDecisionIds])}<h4>关联Fact</h4>${refs('fact', f.factIds)}<h4>原始资料与知识文件</h4>${fileRefList(sourceIds)}<button class="inline-link" data-view="flows" data-flow="${esc(f.id)}">查看原业务流程 →</button></div></details>
      </div>`;
    };
    const mainOverview = (f, qs) => {
      if (!businessModel) return legacyMainOverview(f, qs);
      const section = (letter, title, body) => `<section class="main-overview-section"><h3><span>${letter}</span>${title}</h3>${body}</section>`;
      const relation = key => businessModel.relations.find(r => r.key === key);
      const relationRow = key => { const r = relation(key); return `<p><strong>${esc(r.title)}</strong><span>${esc(r.text)}</span><small>${esc(r.basis)}</small></p>`; };
      const groups = [...new Set(businessModel.items.map(i => i.group))];
      const oldBody = legacyMainOverview(f, qs).replace('id="main-overview-panel"', 'id="main-overview-legacy-panel"');
      return `<div class="main-overview" id="main-overview-panel" data-business-model="${esc(businessModel.version)}">${latestNotice()}${U ? '<p class="main-overview-note">下方保留模型结构；具体流程按10/26确认展示，原始来源、旧解释和未决事项继续可追溯。</p>' : ''}
        <p class="main-overview-intro">核心业务分类及模型骨架已明确，具体业务流程规则仍逐项确认中。${modelSource()}</p>
        ${section('A', '已明确的业务模型', `<p class="main-overview-note">以下8项为项目用户明确确认；不是客户正式签批，也不代表维修整链通过。</p><ol class="main-core-rules">${businessModel.confirmations.map(c => `<li><span>${esc(c.summary)}</span><div>${evidenceTag('用户已确认模型', c.id)}<small>${esc(c.id)}</small></div></li>`).join('')}</ol>`)}
        ${section('B', '总体业务关系', `<p class="main-overview-label">业务来源／取得方式</p><div class="tag-wrap">${businessModel.items.filter(i => i.group === '业务来源／取得方式').map(i => `<span class="chip">${esc(i.title)}${i.key === 'po-direct' ? '〔当前适用性待核〕' : ''}</span>`).join('')}</div>
          <p class="main-overview-boundary">${esc(relation('entry').text)}。不是每种来源都进入每种类型，也不是每个CALL都必须报价或施工。</p>
          <div class="main-overview-branches">${groups.filter(g => ['P｜维修', 'M｜保养', 'M+P｜组合业务'].includes(g)).map(g => `<p><strong>${esc(g)}</strong><span>${businessModel.items.filter(i => i.group === g).map(i => i.flowId ? link('flow', i.flowId, i.title) : esc(i.title)).join(' ／ ')}</span><small>${g.startsWith('M+P') ? esc(relation('mp').text) : g.startsWith('P') ? '普通、即时、CM为P内路径／环节；工程安装新装归P，具体操作不自动等同普通维修。' : '合同周期服务；排程及每期确认按已有说明，首期与到期细则仍待核。'}</small></p>`).join('')}</div>
          <div class="main-overview-branches">${relationRow('p-quote')}${relationRow('m')}${relationRow('m-to-p-a')}${relationRow('m-to-p-b')}</div>
          <p class="main-overview-boundary">${esc(relation('result').text)}。${esc(relation('result').basis)}</p>
          <details class="convergence-detail"><summary>按实际需要引用的公共业务过程</summary><div class="convergence-detail-body"><p>各业务是否经过、顺序、责任和完成条件以对应事实为准，不是全部必经节点。</p><div class="tag-wrap">${businessModel.processes.map(p => `<span class="chip">${esc(p)}</span>`).join('')}</div>${directoryTable(commonDirectories, '公共业务过程已有引用')}<details class="knowledge-original-records"><summary>原07／08完整记录</summary>${flowTable(flowRow('FLOW-MR') + flowRow('FLOW-FINANCE'), '原MR及财务记录')}</details></div></details>
          <details class="convergence-detail"><summary>辅助单据与既有角色引用</summary><div class="convergence-detail-body"><p>对象和单据承载数据，不是核心业务类型；角色职责不在此重新定义。</p><div class="tag-wrap">${businessModel.objects.map(o => `<span class="chip">${esc(o)}</span>`).join('')}</div>${directoryTable(objectDirectories, '业务对象与单据已有引用')}<div class="knowledge-role-refs">${D.roles.map(r => `<div>${link('role', r.id, r.name)}<small>${esc(r.code)} · ${esc(r.id)}</small></div>`).join('')}</div></div></details>`)}
        ${section('C', '仍待确认／历史差异', `<ul class="main-overview-pending">${businessModel.unresolved.map(q => `<li><span>${esc(U && q.questionIds.includes('C-04') ? U.questionUpdates.find(x=>x.id==='C-04').title : q.text)}</span><small>${q.questionIds.map(id => link('question', id)).join(' ')}</small></li>`).join('')}</ul><p class="main-overview-note">归属已明确的CM不再重复问性质；未决细则及原冲突不自动关闭。无依据的状态、权限、金额和异常规则保持待确认。</p><div class="refs">${flowConflicts(f).map(c => link('conflict', c.id, c.title)).join('')}${link('node', 'MAIN-08', '单据旧记录及差异')}</div>`)}
        <details class="main-overview-history"><summary><span>D</span>依据与历史记录 <small>确认原文、旧判断与原FLOW</small></summary><div class="main-overview-history-body">
          <h4>本次确认原文与适用边界</h4>${modelSource()}${businessModel.confirmations.map(c => `<article><h4>${esc(c.id)} · ${esc(c.title)}</h4><p>${esc(c.summary)}</p><p class="sub">${esc(c.boundary)}</p></article>`).join('')}
          <h4>旧判断 → 用户最新确认</h4>${businessModel.history.map(h => `<article><h4>${esc(h.before)}</h4><p>${esc(h.basis)}：${esc(h.boundary)}</p></article>`).join('')}
          <details class="convergence-detail"><summary>旧00完整正文与全部追溯〔历史版本〕</summary><p class="sub">下方保留原展示正文，包括旧分类及旧未定判断；当前模型以SOURCE-033为准。旧Decision、节点和冲突仍可打开，未据本次模型批准整链。</p>${oldBody}</details>
        </div></details>
      </div>`;
    };
    const flowRow = (id, displayName = '', displayState = '', modelItem = null) => {
      const f = maps.flows.get(id);
      const qs = activeQuestions.filter(q => q.flowIds?.includes(f.id) && pending(q));
      const issues = [...flowConflicts(f).map(c => ({kind: 'conflict', id: c.id, title: c.title})), ...qs.map(q => ({kind: 'question', id: q.id, title: questionName(q)}))];
      const visible = issues.slice(0, 2);
      const isMain = f.id === 'FLOW-MAIN';
      return `<tr data-progress-flow="${esc(f.id)}"><td><strong class="convergence-flow-name">${esc(displayName || f.name)}</strong>${!isMain ? `<small class="knowledge-origin">${displayName && displayName !== f.name ? esc(f.name) + ' · ' : ''}${esc(f.id)}</small>` : ''}${modelItem ? `<small>${evidenceTag('用户已确认归属')} ${esc(modelItem.known)}</small>${modelItem.key === 'm-to-p' ? `<div class="refs">${link('flow', 'FLOW-INSTANT', '现场直接处理 → P即时维修')}${link('flow', 'FLOW-P', '先报价中单 → P普通报价维修')}</div>` : ''}<p class="sub">原FLOW详情及旧判断保留，当前分类以${modelSource('SOURCE-033')}为准。</p>` : ''}${displayState ? '<small>原记录保留用于追溯，业务性质待核实。</small>' : ''}${isMain ? '<div class="convergence-detail"><button class="main-overview-toggle" data-main-overview-toggle aria-expanded="false" aria-controls="main-overview-panel"><span aria-hidden="true">▸</span> 已有说明与依据</button></div>' : flowDetails(f, qs)}</td>
        <td><strong class="convergence-state">${esc(displayState || flowState(f, qs))}</strong></td>
        <td>${modelItem ? `<p>${esc(modelItem.pending)}</p>` : ''}${visible.length ? visible.map(q => `<div class="convergence-question">${link(q.kind, q.id, q.title)}<small class="convergence-reference">${esc(q.id)}</small></div>`).join('') + (issues.length > visible.length ? `<small>其余${issues.length - visible.length}项见「已有说明与依据」</small>` : '') : '<span>待核实：未找到关联问题记录</span>'}</td>
        <td>${nextSteps[f.id] ? nextStep(f.id) : isMain && focus?.nextDeliverable ? `<span>${esc(focus.nextDeliverable)}</span><small>当前内部安排</small>` : '<span>待确认</span><small>现有记录未指定本流程下一步；不从问题编号推断安排。</small>'}</td></tr>${isMain ? `<tr class="main-overview-row" hidden><td colspan="4">${mainOverview(f, qs)}</td></tr>` : ''}`;
    };
    const flowTable = (body, label) => `<div class="convergence-table-scroll" role="region" aria-label="${esc(label)}" tabindex="0"><table class="convergence-table"><caption class="sr-only">${esc(label)}；保留原FLOW及证据关联</caption><thead><tr><th scope="col">当前事项</th><th scope="col">状态</th><th scope="col">阻塞或待确认</th><th scope="col">下一步</th></tr></thead><tbody>${body}</tbody></table></div>`;
    const sourceRef = id => {
      const s = D.sourceMappings.find(s => s.sourceId === id);
      return s ? fileAnchor(s.fileId, id) : '<span class="empty-ref">来源待定位</span>';
    };
    // User-authorized follow-up actions, projected only for this page; not business answers or task-state writes.
    const nextSteps = {
      'FLOW-P': ['核对报价及中单职责差异，并按同一维修单验证完整链路。', `${link('conflict', 'CONFLICT-007', '报价职责差异')}${link('question', 'C-04', '材料交接未决项')}${sourceRef('SOURCE-022')}`],
      'FLOW-MAINT-ISSUE': ['核对保养SR转P报价、二次施工的关联与交接，已说明的报价归口不重复问。', `${link('question', 'C-07', '后续施工关联')}${link('question', 'C-11', '报告与任务关联')}${sourceRef('SOURCE-032')}`],
      'FLOW-INSTANT': ['确认现场款交接、后补报价及单据补录规则，保留先修后补报价的已有说明。', `${link('question', 'C-06', '现场款及后补报价')}${link('question', 'C-08', '即时维修单据特例')}${sourceRef('SOURCE-029')}`],
      'FLOW-M': ['按已说明职责核对每期完成，确认到期补做及续保细则，保留现有状态差异。', `${link('conflict', 'CONFLICT-008', '保养状态差异')}${link('question', 'C-10', '到期及续保未决项')}${sourceRef('SOURCE-032')}`],
      'mp': ['梳理M／P两线衔接、整体完成条件及票款分配等未决规则。', `${refs('decision', ['CONFIRMED-011', 'CONFIRMED-013'])}${link('question', 'C-02', '状态与结束条件')}${link('question', 'C-14', 'M+P票款分配')}`],
      'customer-service': ['梳理答疑、投诉、无需报价上门的分流及结束条件。', `${sourceRef('SOURCE-005')}${sourceRef('SOURCE-022')}${link('question', 'C-02', '状态与结束条件')}`],
      'FLOW-TENDER': ['核对中标后责任交接，以及进入M／P／M+P履约的规则。', `${sourceRef('SOURCE-029')}${refs('decision', ['CONFIRMED-016'])}${link('question', 'C-15', '标书交接未决项')}`],
      'FLOW-CM': ['核实紧急维修的入口与结束细则，CM归P的性质已由用户确认，不再重复问。', `${modelSource()}${link('question', 'C-02', 'CM入口与结束细则')}${link('question', 'C-05', 'CM排程冲突')}`],
      'walk-in': ['核实客户PO直接下单业务当前是否仍存在，以及是否纳入一期。', `${sourceRef('SOURCE-004')}${link('question', 'C-01', '本期业务范围')}`],
    };
    const nextStep = key => {
      const item = businessModel?.items.find(i => i.key === key || i.flowId === key);
      return `<span data-progress-next="${esc(key)}">${esc(item?.next || nextSteps[key][0])}</span><details class="convergence-detail"><summary>推进依据</summary><div class="convergence-detail-body">${item ? modelSource() : ''}${nextSteps[key]?.[1] || ''}<p class="sub">仅安排核对动作，不代填业务答案；先核已有资料，真正未明的部分再确认。</p></div></details>`;
    };
    const placeholderRow = (key, title, status, references, note) => `<tr data-knowledge-placeholder="${esc(key)}"><td><strong class="convergence-flow-name">${esc(title)}</strong><small class="knowledge-origin">待建立完整流程 · 未建立独立FLOW</small><details class="convergence-detail"><summary>已有资料引用</summary><div class="convergence-detail-body">${references}</div></details></td><td><strong class="convergence-state">${esc(status)}</strong></td><td>${esc(note)}</td><td>${nextStep(key)}</td></tr>`;
    const directoryTable = (items, label) => `<div class="convergence-table-scroll" role="region" aria-label="${esc(label)}" tabindex="0"><table class="knowledge-directory-table"><thead><tr><th scope="col">目录项</th><th scope="col">已有资料引用</th></tr></thead><tbody>${items.map(([title, references]) => `<tr><td>${esc(title)}</td><td>${references}</td></tr>`).join('')}</tbody></table></div>`;
    const group = (id, title, note, body, open = true) => `<details class="knowledge-map-group${['objects', 'roles'].includes(id) ? ' knowledge-support' : ''}" data-knowledge-group="${esc(id)}"${open ? ' open' : ''}><summary><strong>${esc(title)}</strong><small>${esc(note)}</small></summary><div class="knowledge-map-group-body">${body}</div></details>`;

    // User-approved 2026-10-24: one knowledge skeleton for subsequent Hub page reviews.
    // Mount only inside 01 current-progress / convergence-business, as authorized this round.
    // Left-navigation 02 / overview() is independent and unchanged. No business approval changes.
    // 01 layout internally frozen V1 after this round's verification; future work follows business facts.
    const commonDirectories = [
      ['CALL受理与分流', `${link('node', 'MAIN-01', '客户需求')}${link('node', 'MAIN-02', '受理原节点')}${sourceRef('SOURCE-029')}`],
      ['报价、修订及客户接受', `${link('node', 'P-02', '报价版本原节点')}${link('node', 'MAIN-04', '客户接受原节点')}${sourceRef('SOURCE-029')}`],
      ['中单确认与履约衔接', `${link('node', 'MAIN-05', '中单原节点')}${link('node', 'MAIN-06', '类型分流原节点')}`],
      ['MR材料申请及供料交接', link('flow', 'FLOW-MR', '原07完整记录')],
      ['排期、派工与接单', `${link('node', 'P-06', '维修派工原节点')}${link('node', 'M-04', '保养排期原节点')}`],
      ['现场服务记录与客户签认', `${link('node', 'MAIN-07', '现场服务原节点')}${link('node', 'MAIN-08', '现场单据原节点')}`],
      ['服务结果核对与业务完工确认', `${link('node', 'P-09', '维修完工原节点')}${link('node', 'M-07', '保养完成原节点')}`],
      ['财务资料核对与补件', `${link('node', 'FIN-01', '资料核对原节点')}${link('node', 'FIN-02', '补件／例外原节点')}${link('flow', 'FLOW-FINANCE', '原08完整记录')}`],
      ['开票及例外处理', `${link('node', 'FIN-03', '开票原节点')}${link('node', 'FIN-02', '例外原节点')}${link('flow', 'FLOW-FINANCE', '原08完整记录')}`],
      ['收款登记与对账', `${link('node', 'FIN-04', '收款对账原节点')}${link('flow', 'FLOW-FINANCE', '原08完整记录')}`],
    ];
    const objectDirectories = [
      ['客户', sourceRef('SOURCE-014')], ['合同', sourceRef('SOURCE-014')],
      ['CALL', `${link('node', 'MAIN-01', '原客户需求记录')}${sourceRef('SOURCE-029')}`],
      ['报价单及修订版本', link('node', 'P-02', '报价原记录')],
      ['标书记录', link('flow', 'FLOW-TENDER', '原06完整记录')],
      ['MR', link('flow', 'FLOW-MR', '原07完整记录')],
      ['保养计划及每期服务记录', `${link('node', 'M-03', '计划原记录')}${link('node', 'M-06', '本期服务原记录')}`],
      ['SR', `${link('node', 'MAIN-08', '单据原记录')}${sourceRef('SOURCE-022')}`],
      ['CP', `${link('node', 'P-08', '完工纸原记录')}${sourceRef('SOURCE-022')}`],
      ['附件及签署资料', `${link('node', 'MAIN-08', '单据原记录')}${sourceRef('SOURCE-014')}`],
      ['发票', link('node', 'FIN-03', '发票原记录')],
      ['收款记录', link('node', 'FIN-04', '收款原记录')],
      ['PO', `${link('node', 'FIN-01', '资料原记录')}${sourceRef('SOURCE-014')}${sourceRef('SOURCE-004')}`],
    ];
    const modelItemRow = item => {
      if (item.flowId) return flowRow(item.flowId, item.title, '', item);
      const origins = {
        mp: `${refs('decision', ['CONFIRMED-011', 'CONFIRMED-013'])}${link('flow', 'FLOW-M', '引用M履约')}${link('flow', 'FLOW-P', '引用P履约')}`,
        call: `${sourceRef('SOURCE-005')}${sourceRef('SOURCE-029')}${link('node', 'MAIN-02', '原受理记录')}`,
        'direct-quote': sourceRef('SOURCE-029'), 'invited-quote': sourceRef('SOURCE-014'),
        'po-direct': sourceRef('SOURCE-004'),
        'p-engineering': `${sourceRef('SOURCE-004')}${refs('decision', ['CONFIRMED-001'])}`,
      };
      const relationOnly = ['mp', 'call', 'direct-quote', 'invited-quote', 'po-direct'].includes(item.key);
      return `<tr data-business-item="${esc(item.key)}"><td><strong class="convergence-flow-name">${esc(item.title)}</strong><small>${evidenceTag('用户已确认归属')} ${esc(item.known)}</small><small class="knowledge-origin">${relationOnly ? '来源／组合关系引用 · 不新建独立FLOW' : '具体履约待梳理 · 无独立完整FLOW'}</small><details class="convergence-detail"><summary>已有资料与确认依据</summary><div class="convergence-detail-body">${modelSource()}<p>${esc(item.confirmationIds.join('、'))}</p>${origins[item.key] || ''}</div></details></td>
        <td><strong class="convergence-state">${item.key === 'po-direct' ? '待核实' : '梳理中'}</strong><small>分类已明确；具体规则未定稿</small></td><td>${esc(item.pending)}</td><td>${nextStep(item.key)}</td></tr>`;
    };
    // User-selected work order, not a new taxonomy or a rewrite of recorded task/business states.
    const progressBusiness = () => {
      if (!businessModel) return '<p class="knowledge-map-note">业务模型尚未投影，请先核对知识源。</p>';
      const item = key => businessModel.items.find(i => i.key === key);
      const priority = item('p-quote');
      const repairTask = w.tasks.find(t => t.id === 'TASK-040');
      const quoteTask = w.tasks.find(t => t.id === 'TASK-052')?.subtasks?.find(t => t.id === 'TASK-052/01');
      const processing = repairTask?.status === '进行中' || quoteTask?.status === '进行中';
      const detail = (i, title = '查看已有进展、问题与依据') => `<details class="progress-item-detail"><summary>${esc(title)}</summary>${flowTable(modelItemRow(i), i.title)}</details>`;
      const later = [['p-instant', 'P｜即时维修'], ['p-cm', 'P｜CM紧急维修'], ['m-contract', 'M｜合同周期保养'], ['mp', 'M+P']];
      const sourceNames = {call:'CALL', 'direct-quote':'自主询价', 'invited-quote':'邀请报价', tender:'Tender', 'po-direct':'PO直单待核'};
      return `<div class="progress-business-body">
        <section class="progress-current" aria-labelledby="progress-current-title"><h3 id="progress-current-title">当前优先</h3>
          <div class="progress-current-title"><strong>P｜${esc(priority.title)}</strong><span class="convergence-phase-state" title="按既有维修整链／报价核对任务记录展示">${processing ? '当前处理中' : '进度待核实'}</span></div>
          <p><strong>阻塞：</strong>${esc(priority.pending)}。</p>
          <p><strong>下一步：</strong>梳理完整真实业务链。</p>
          ${detail(priority)}
        </section>
        <section class="progress-later" aria-labelledby="progress-later-title"><h3 id="progress-later-title">后续业务</h3>
          <ul>${later.map(([key, title]) => `<li><details class="progress-item-detail"><summary>${esc(title)}</summary>${flowTable(modelItemRow(item(key)), title)}</details></li>`).join('')}</ul>
        </section>
        <section class="progress-relationship" aria-labelledby="progress-relationship-title"><h3 id="progress-relationship-title">业务关系</h3><strong>M→P</strong>
          <p>现场直接维修 → ${link('flow', 'FLOW-INSTANT', '即时维修')}</p><p>需要报价 → ${link('flow', 'FLOW-P', '普通报价维修')}</p>
          ${detail(item('m-to-p'), '查看转换记录与待确认项')}
        </section>
        <section class="progress-sources" aria-labelledby="progress-sources-title"><h3 id="progress-sources-title">业务来源</h3>
          <p>${Object.entries(sourceNames).map(([key, title]) => `<span data-progress-source="${esc(key)}">${esc(title)}</span>`).join('<span aria-hidden="true">｜</span>')}</p>
          <details class="progress-item-detail"><summary>查看来源说明与待核事项</summary>${flowTable(businessModel.items.filter(i => i.group === '业务来源／取得方式').map(modelItemRow).join(''), '业务来源说明')}</details>
        </section>
      </div>`;
    };
    const entryLinks = `<div class="convergence-links"><a class="btn btn-secondary" href="../prototype/index.html">当前原型</a><a class="btn btn-secondary" href="${encodeURI('../' + w.clientExport.path)}">客户推进表 · ${esc(w.clientExport.asOf)}快照</a><button class="btn btn-secondary" data-view="questions">待确认问题</button></div>`;
    const changeAndTaskHistory = `<details class="work-details task-history"><summary>内部执行与历史记录</summary>${entryLinks}${panel('本轮变化', `<div class="change-grid">${w.changes.map(c => `<article><h3>${esc(c.area)}</h3><p>${esc(c.summary)}</p></article>`).join('')}</div>`)}${panel('原任务与历史记录', `<div class="task-list">${w.tasks.slice().reverse().map(t => `<button data-kind="work-task" data-id="${esc(t.id)}"><span>${esc(t.title)}</span><small>${esc(t.id)} · ${esc(t.status)}</small></button>`).join('')}</div>`, '保留原编号和对应版本的结果；任务拆分不新增业务批准，历史检查不代表当前整链已通过。')}</details>`;
    if (showOverview) return `<div class="convergence-view progress-overview-detail"><h2>00 真实业务总流程</h2>${mainOverview(maps.flows.get('FLOW-MAIN'), activeQuestions.filter(q => q.flowIds?.includes('FLOW-MAIN') && pending(q)))}</div>`;
    // Map existing records to the four homepage states; prototype checks do not start production testing/UAT.
    const homepageStatus = status => ['进行中', '阻塞', '已完成'].includes(status) ? status : '未开始';
    const laterStatus = id => homepageStatus(w.tasks.find(t => t.id === id)?.status);
    const stages = [
      { title: '需求事实梳理', status: homepageStatus(phases[0].status), target: 'data-view="evidence"' },
      { title: '业务流程确认', status: homepageStatus(phases[1].status), target: 'data-kind="current-business-overview"', current: true },
      { title: '系统需求确认', status: homepageStatus(phases[2].status), target: 'data-view="requirements"' },
      { title: '原型确认', status: homepageStatus(phases[3].status), target: 'data-view="design" data-sub="Prototype"' },
      { title: '开发', status: laterStatus('TASK-021') },
      { title: '测试 / UAT', status: laterStatus('TASK-023') },
      { title: '上线', status: laterStatus('TASK-025') },
    ];
    return `<div class="view progress-view progress-summary-view" data-ia-version="frozen-v1">
      <p class="progress-current-stage">当前阶段：业务流程确认</p>
      ${U ? `<div class="sync-progress-note"><p>最新进展：2026-10-26完成新一轮客户业务沟通及会后事实整理，业务流程确认继续推进。</p><p>维修整链未通过 · 0批业务正式定稿</p></div>` : ''}
      <ol class="progress-stage-list" aria-label="项目推进阶段">${stages.map((stage, index) => {
        const tag = stage.target ? 'button' : 'div';
        return `<li><${tag} class="progress-stage-row${stage.current ? ' is-current' : ''}" data-stage="${index + 1}" ${stage.target || ''}${stage.current ? ' aria-current="step"' : ''}><span class="progress-stage-number">${String(index + 1).padStart(2, '0')}</span><span class="progress-stage-name">${esc(stage.title)}</span><span class="progress-stage-status" data-status="${esc(stage.status)}">${esc(stage.status)}</span><span class="progress-stage-arrow" aria-hidden="true">${stage.target ? '→' : ''}</span></${tag}></li>`;
      }).join('')}</ol>
    </div>`;
  }
  function overview() {
    // 02 is a read-only flowchart projection. References reuse existing FLOWs.
    const model = D.currentBusinessModel;
    if (!model) return '<div class="view overview-flowchart"><p>业务模型资料尚未载入，请先核对知识源。</p></div>';
    const target = key => {
      const item = model.items.find(i => i.key === key);
      return item?.flowId && maps.flows.has(item.flowId) ? ` data-kind="flow" data-id="${esc(item.flowId)}"` : '';
    };
    const diagram = mobile => {
      const prefix = mobile ? 'ec-map-narrow' : 'ec-map-wide';
      const nodes = [], edges = [], labels = [];
      const n = (id, x, y, w, h, text, tone = '', key = '', shape = 'rect') => {
        if (['service-question','service-result','visit-result','acquisition-result','po','cm','emergency','existing-m'].includes(id)) tone += ' fc-secondary';
        const action = key === '?' ? ' data-view="questions"' : target(key);
        nodes.push(`<g class="fc-node ${tone}${action ? ' fc-action' : ''}" data-node="${id}" data-box="${x-w/2},${y-h/2},${w},${h}"${action}${action ? ' role="button" tabindex="0"' : ''}><title>${esc(action ? key === '?' ? '查看待确认问题' : '进入已有流程查看；不代表流程已确认' : text.replaceAll('|','；'))}</title>${shape === 'diamond' ? `<polygon points="${x},${y-h/2} ${x+w/2},${y} ${x},${y+h/2} ${x-w/2},${y}"/>` : `<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="${tone.includes('result') ? 20 : 8}"/>`}<text x="${x}" y="${y}" text-anchor="middle">${text.split('|').map((line,i,a) => `<tspan x="${x}" dy="${i ? 23 : -(a.length-1)*11.5+(tone.includes('core') ? 10 : 6)}">${esc(line)}</tspan>`).join('')}</text></g>`);
      };
      const e = (from, to, d, tone = '') => {
        // A small bridge distinguishes the return to P from the existing P result line.
        if (tone.includes('fc-bridge')) edges.push(`<path class="fc-line-clearance" d="${d}"/>`);
        edges.push(`<path class="fc-edge ${tone}" data-from="${from}" data-to="${to}" d="${d}" marker-end="url(#${prefix}-${tone.includes('fc-transfer') ? 'transfer-arrow' : tone.includes('fc-main') ? 'main-arrow' : 'arrow'})"${from === 'p' && to === 'repair' ? ' aria-label="已有中单，引用维修履约"' : ''}/>`);
      };
      const t = (x,y,text,tone='') => {
        const pending = /待核|待确认|待进一步确认/.test(text);
        labels.push(`<text class="fc-label ${tone}${pending ? ' fc-action' : ''}" x="${x}" y="${y}" text-anchor="middle"${pending ? ' data-view="questions" role="button" tabindex="0"' : ''}>${esc(text)}</text>`);
      };
      if (!mobile) {
        // Keep the three source columns and P/M/M+P centre; omit execution steps.
        t(255,22,'客户服务入口','fc-heading'); t(715,22,'商务取得','fc-heading'); t(1195,22,'既有业务触发','fc-heading');
        n('call',255,66,150,40,'CALL','entry');
        n('service-result',160,160,200,48,'客服处理结果','result');
        e('call','service-result','M255 86 V112 H160 V136');
        e('call','identify','M330 66 H480 V328 H525');
        t(390,193,'有实际业务需求','fc-quiet');
        n('direct-quote',680,60,210,36,'自主询价／自主报价','entry');
        n('renewal',680,109,210,36,'EC主动续保报价','entry');
        n('invitation',680,158,210,36,'邀请报价','entry');
        n('tender',680,217,180,40,'Tender','entry','tender');
        n('po',680,276,210,36,'PO直接下单〔待核〕','pending','?');
        ['direct-quote','renewal','invitation'].forEach((id,i)=>e(id,'identify',`M785 ${60+i*49} H815 V328 H755`));
        n('acquisition-result',1178,217,265,56,'商务取得结果|未中标／取消／不投标','result');
        e('tender','acquisition-result','M770 217 H1045');
        e('tender','identify','M770 217 H924 V328 H755'); t(924,290,'中标后按业务内容分流','fc-quiet');
        t(680,250,'邀请报价与Tender边界待核','fc-quiet');
        n('existing',1195,65,260,46,'合同／保养计划／周期','entry');
        n('existing-m',1195,139,260,54,'直达M保养履约 ↗|含M+P中的M部分','m reference','m-contract');
        e('existing','existing-m','M1195 88 V112'); t(1195,181,'既有履约，不重新取得业务','fc-quiet');
        n('identify',640,328,230,58,'业务识别／分流','hub');
        e('identify','p','M640 357 V373 H290 V390','fc-main'); e('identify','m','M640 357 V373 H790 V390','fc-main'); e('identify','mp','M640 357 V373 H1180 V390','fc-main');
        n('p',290,423,245,66,'P｜维修|维修／工程／安装／新装','p core');
        n('m',790,423,245,66,'M｜保养|合同周期保养','m core','m-contract');
        n('mp',1180,423,290,66,'M+P｜维修＋保养','mp core');
        n('normal',260,501,174,42,'普通报价维修','p','p-quote'); n('instant',490,501,160,42,'即时维修','p','p-instant');
        e('p','normal','M290 456 V469 H260 V480'); e('p','instant','M290 456 V469 H490 V480');
        n('cm',78,501,110,36,'CM紧急维修','p pending','p-cm'); e('p','cm','M167.5 423 H78 V483','fc-dashed');
        t(100,553,'CM详细规则待确认','fc-quiet');
        n('discovery',790,522,200,64,'保养发现维修需求','m');
        e('m','discovery','M790 456 V490');
        e('discovery','instant','M690 522 H630 V501 H570','fc-transfer');
        t(623,556,'现场可处理＋客户同意','fc-quiet');
        e('discovery','normal','M790 554 V590 H385 V501 H347','fc-transfer');
        t(640,581,'需要报价','fc-quiet');
        t(710,650,'原M与新P分别推进，不自动变成M+P','fc-quiet');
        n('mp-m',1105,506,130,36,'M部分','mp'); n('mp-p',1275,506,130,36,'P部分','mp');
        e('mp','mp-m','M1180 456 V472 H1105 V488'); e('mp','mp-p','M1180 456 V472 H1275 V488');
        n('mp-ref-m',1105,565,130,38,'引用M履约 ↗','m reference','m-contract'); n('mp-ref-p',1275,565,130,38,'引用P履约 ↗','p reference','p-quote');
        e('mp-m','mp-ref-m','M1105 524 V546'); e('mp-p','mp-ref-p','M1275 524 V546');
        t(1190,604,'业务开始可定义为M+P','fc-quiet'); t(1190,624,'不固定先P后M','fc-quiet'); t(1190,646,'整体结束规则待确认','fc-quiet');
      } else {
        // The same relationships in the existing narrow-screen vertical layout.
        t(200,26,'客户服务入口','fc-heading'); n('call',200,66,200,42,'CALL','entry');
        n('service-result',200,130,260,42,'客服处理结果','result'); e('call','service-result','M200 87 V109');
        e('call','identify','M300 66 H385 V800 H320'); t(200,180,'有实际业务需求 → 分流','fc-quiet');
        t(200,202,'商务取得','fc-heading');
        n('direct-quote',200,244,290,40,'自主询价／自主报价','entry'); n('renewal',200,298,290,40,'EC主动续保报价','entry'); n('invitation',200,352,290,40,'邀请报价','entry');
        ['direct-quote','renewal','invitation'].forEach((id,i)=>e(id,'identify',`M345 ${244+i*54} H385 V800 H320`));
        n('tender',200,406,290,40,'Tender','entry','tender'); n('acquisition-result',200,468,290,50,'商务取得结果|未中标／取消／不投标','result');
        e('tender','acquisition-result','M200 426 V443'); e('tender','identify','M345 406 H385 V800 H320'); t(330,436,'中标 →','fc-quiet');
        n('po',200,544,290,40,'PO直接下单〔待核〕','pending','?'); t(200,585,'邀请报价与Tender边界待核','fc-quiet');
        t(200,618,'既有业务触发','fc-heading'); n('existing',200,661,290,40,'合同／保养计划／周期','entry');
        n('existing-m',200,720,300,46,'直达M保养履约 ↗|含M+P中的M部分','m reference','m-contract'); e('existing','existing-m','M200 681 V697');
        n('identify',200,800,240,54,'业务识别／分流','hub');
        n('p',200,900,290,68,'P｜维修|维修／工程／安装／新装','p core');
        n('m',200,1160,290,64,'M｜保养|合同周期保养','m core','m-contract');
        n('mp',200,1510,300,64,'M+P｜维修＋保养','mp core');
        e('identify','p','M200 827 V866','fc-main'); e('identify','m','M80 800 H10 V1160 H55','fc-main'); e('identify','mp','M80 800 H10 V1510 H50','fc-main');
        n('normal',110,1000,170,44,'普通报价维修','p','p-quote'); n('instant',300,1000,160,44,'即时维修','p','p-instant');
        e('p','normal','M200 934 V960 H110 V978'); e('p','instant','M200 934 V960 H300 V978');
        n('cm',300,1068,170,44,'CM紧急维修','p pending','p-cm'); e('p','cm','M345 900 H390 V1068 H385','fc-dashed'); t(200,1115,'CM详细规则待确认','fc-quiet');
        n('discovery',200,1240,260,48,'保养发现维修需求','m'); e('m','discovery','M200 1192 V1216');
        t(200,1290,'原M与新P分别推进','fc-quiet');
        n('to-instant',110,1370,170,54,'现场可处理＋客户同意|→P即时维修 ↗','p reference small','p-instant');
        n('to-normal',300,1370,170,54,'需要报价|→P普通报价维修 ↗','p reference small','p-quote');
        e('discovery','to-instant','M200 1264 V1310 H110 V1343','fc-transfer'); e('discovery','to-normal','M200 1264 V1310 H300 V1343','fc-transfer');
        t(200,1430,'不自动变成M+P','fc-quiet');
        n('mp-m',110,1595,170,40,'M部分','mp'); n('mp-p',300,1595,170,40,'P部分','mp');
        e('mp','mp-m','M200 1542 V1560 H110 V1575'); e('mp','mp-p','M200 1542 V1560 H300 V1575');
        n('mp-ref-m',110,1660,170,44,'引用M履约 ↗','m reference','m-contract'); n('mp-ref-p',300,1660,170,44,'引用P履约 ↗','p reference','p-quote');
        e('mp-m','mp-ref-m','M110 1615 V1638'); e('mp-p','mp-ref-p','M300 1615 V1638');
        t(200,1707,'业务开始可定义为M+P','fc-quiet'); t(200,1730,'不固定先P后M','fc-quiet'); t(200,1752,'整体结束规则待确认','fc-quiet');
      }
      return `<svg class="fc-diagram fc-${mobile ? 'narrow' : 'wide'}" viewBox="0 0 ${mobile ? '400 1780' : '1360 680'}" role="group" aria-label="EC业务全景流程图${mobile ? '，纵向版' : ''}"><defs><marker id="${prefix}-arrow" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto" markerUnits="strokeWidth"><path d="M0 0 L7 3.5 L0 7 Z" fill="#8899a3"/></marker><marker id="${prefix}-main-arrow" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#284d65"/></marker><marker id="${prefix}-transfer-arrow" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#608a9f"/></marker></defs>${mobile ? '' : '<path class="fc-separator" d="M1025 476 V660"/>'}<g class="fc-edges">${edges.join('')}</g><g>${nodes.join('')}</g><g class="fc-labels">${labels.join('')}</g></svg>`;
    };
    const capabilities = [
      [['报价', '报价修订'], '报价／修订'], [['MR／材料申请', '仓库供料', '采购', '材料准备'], 'MR／材料'],
      [['排期', '派工', '接单'], '排期／派工'], [['现场服务'], '现场服务'],
      [['服务记录与客户签认'], 'SR／CP'], [['业务完工确认'], '完工确认'],
      [['财务资料核对', '补件'], '财务资料'], [['开票'], '开票'], [['收款'], '收款'],
    ].filter(([origins]) => origins.every(p => model.processes.includes(p)));
    return `<div class="view overview-view overview-flowchart" data-ia-version="flowchart-v1" data-model-version="${esc(model.version)}">
      ${U ? `<div class="sync-contract"><strong>业务识别基础：客户 → 合同编号＋客户名称 → 业务识别</strong><span>一客多合同、一合同一客户，客户名称可重复；政府ECA／ECB等编号或分类另列。</span></div>` : ''}<div class="fc-map">${diagram(false)}${diagram(true)}</div>
      <section class="fc-capabilities" aria-label="公共业务能力"><strong>公共业务能力</strong><div>${capabilities.map(([origins,label])=>`<span data-process-refs="${esc(origins.join('、'))}">${esc(label)}</span>`).join('')}</div><p>按实际业务调用，不代表统一执行顺序。</p></section>
      <section class="fc-results" aria-label="业务及财务结果"><h2>业务／财务结果</h2><div><span>客服处理结果</span><span>商务取得结果</span><span>维修履约结果</span><span>本期保养结果</span><span>财务结果</span></div><strong>业务完工 ≠ 已开票 ≠ 已收款</strong><footer><span>M合同整体结束／M+P整单结束规则待确认</span><button class="inline-link" data-view="questions">查看待确认问题 →</button></footer></section>
    </div>`;
  }
  function factTable(list) {
    return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>事实 / 规则</th><th>状态</th><th>来源</th><th>关联流程</th></tr></thead><tbody>${list.map(f => `<tr><td>${link('fact', f.id)}</td><td>${esc(f.title)}<div class="table-note">${esc(f.statement)}</div></td><td>${statusBadge(f.status)}</td><td>${f.sourceFileIds.length ? refs('file', f.sourceFileIds) : '<span class="empty-ref">MISSING SOURCE</span>'}</td><td>${refs('flow', f.flowIds, f.legacyFlowIds?.length ? 'LEGACY ONLY' : 'UNLINKED')}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function sourceList() {
    const sourceFiles = D.files.filter(f => ['Original Source', 'Legacy Source', 'Source Reference'].includes(f.category));
    const subtypes = [
      ['客户访谈 / 听记', f => f.projectPath.includes('听记') || f.projectPath.includes('纪要')],
      ['客户提供文件', f => /\.docx$|\.pdf$/i.test(f.name) && !f.projectPath.includes('听记')],
      ['Excel / 表单', f => /\.xlsx$/i.test(f.name) || f.projectPath.includes('纸质材料')],
      ['截图 / 旧系统', f => /\.png$|\.jpg$/i.test(f.name) || f.projectPath.includes('prototype')],
      ['其他事实源', f => !/听记|纪要|纸质材料|prototype|\.docx$|\.pdf$|\.xlsx$|\.png$|\.jpg$/i.test(f.projectPath)],
    ];
    return `${panel('原始资料', `<p class="sub">${sourceFiles.length} 个原始或历史事实源。每个入口指向原路径；旧资料保留版本身份。</p><div class="source-groups">${subtypes.map(([title, filter]) => { const fs = sourceFiles.filter(filter); return `<details><summary>${esc(title)} <span>${fs.length}</span></summary>${fs.map(f => `<div class="source-item">${link('file', f.id, f.name)}<small class="path">${esc(f.projectPath)}</small></div>`).join('')}</details>` }).join('')}</div>`)}`;
  }
  function questionsList(items) { return `<div class="question-list">${items.map(q => `<button data-kind="question" data-id="${q.id}"><span class="priority">${esc(q.priority)}</span><span><strong>${esc(q.id)} · ${esc(q.title)}</strong><small>${esc(q.reason || q.provenance || '')}</small></span>${statusBadge(q.status)}</button>`).join('')}</div>`; }
  function conflictsList() { return D.conflicts.map(c => `<button class="conflict-row" data-kind="conflict" data-id="${c.id}"><strong>${esc(c.id)} · ${esc(c.title)}</strong><span>${esc(c.kind)}</span>${statusBadge(c.status)}</button>`).join(''); }
  function factsView() {
    const sub = state.sub || '原始资料';
    if (sub === '原始资料') return `<div class="view">${sourceList()}</div>`;
    if (sub === '事实条目') return `<div class="view">${panel('事实条目', `<div class="toolbar"><select id="fact-status-filter"><option value="">全部事实状态</option>${['CONFIRMED','PARTIAL','OPEN','CONFLICT'].map(s=>`<option value="${s}" ${state.factStatus===s?'selected':''}>${s}</option>`).join('')}</select><span class="sub">筛选仅作用于事实条目，不改变确认状态</span></div>${factTable(D.facts.filter(f=>!state.factStatus||f.status===state.factStatus))}`, '历史工作方案、旧规则和本轮沟通记录分层；原文表达不等于客户一期批准')}</div>`;
    if (sub === '待确认事项') return `<div class="view">${panel('待确认事项', questionsList(activeQuestions.filter(q => ['OPEN','PENDING','CONFLICT'].includes(q.status))), '含未决与冲突；客户问题和先向用户核实的问题分别记录')}</div>`;
    return `<div class="view">${panel('冲突与差异', conflictsList(), '原始资料、讨论结论、PRD 与原型之间的已识别差异')}${panel('历史规则冲突', factTable(D.facts.filter(f => f.status === 'CONFLICT')))}</div>`;
  }
  // 03 navigation projection only: never add these presentation entries to D.flows.
  function flowGroups() {
    return [
      { key: 'p', title: 'A｜P 维修', entries: [
        { flowId: 'FLOW-P', title: '03-01 普通报价维修' },
        { flowId: 'FLOW-INSTANT', title: '03-02 即时维修' },
        { flowId: 'FLOW-CM', title: '03-03 CM紧急维修' },
      ] },
      { key: 'm', title: 'B｜M 保养', entries: [{ flowId: 'FLOW-M', title: '03-04 合同周期保养' }] },
      { key: 'mp', title: 'C｜M+P', entries: [{ structure: 'mp', title: '03-05 M+P组合控制' }] },
      { key: 'call', title: 'D｜客户服务', entries: [{ structure: 'call', title: '03-06 CALL受理与分流' }] },
      { key: 'acquisition', title: 'E｜商务取得', entries: [{ flowId: 'FLOW-TENDER', title: '03-07 Tender办理' }] },
      { key: 'shared', title: 'F｜公共子流程', entries: [
        { flowId: 'FLOW-MR', title: 'MR／材料供给' },
        { flowId: 'FLOW-FINANCE', title: '财务处理' },
      ] },
    ];
  }
  function flowDisplayName(flow) {
    return flowGroups().flatMap(g => g.entries).find(e => e.flowId === flow?.id)?.title || flow?.name || '';
  }
  function findFlowBySub() { return D.flows.find(f => f.name === state.sub) || maps.flows.get(state.flow); }
  function flowPageLabel() {
    if (state.sub.startsWith('structure:')) return ({ mp: '03-05 M+P组合控制', call: '03-06 CALL受理与分流', sources: '商务取得／其他取得方式' })[state.sub.slice(10)] || '业务流程';
    if (state.sub.startsWith('group:')) return flowGroups().find(g => g.key === state.sub.slice(6))?.title || '';
    const f = findFlowBySub();
    return f ? (['FLOW-MAIN', 'FLOW-MAINT-ISSUE'].includes(f.id) ? '历史追溯／' + f.name : flowDisplayName(f)) : '';
  }
  function flowEntryRow(entry, selected = '') {
    const key = entry.flowId || 'structure:' + entry.structure;
    const action = entry.flowId ? `data-kind="flow" data-id="${esc(entry.flowId)}"` : `data-view="flows" data-sub="structure:${esc(entry.structure)}"`;
    const status = entry.flowId ? maps.flows.get(entry.flowId)?.factStatus : 'PARTIAL';
    return `<button class="flows-entry ${selected === key ? 'is-selected' : ''}" ${action}${selected === key ? ' aria-current="page"' : ''}><span>${esc(entry.title)}</span>${statusBadge(status || 'PARTIAL')}</button>`;
  }
  function sourceMethodList(interactive = true) {
    return `<ul class="flows-methods">${[
      ['客户直接询价／独立报价', '业务入口'], ['EC主动续保报价', 'M商务衔接'],
      ['邀请报价', '是否独立FLOW待确认'], ['PO直接下单', '当前适用性待核'],
    ].map(([title,note]) => `<li>${interactive ? `<button class="inline-link" data-view="flows" data-sub="structure:sources">${esc(title)}</button>` : `<span>${esc(title)}</span>`}<small>${esc(note)}</small></li>`).join('')}</ul>`;
  }
  function flowGroupRelations(group) {
    if (group.key === 'p') return '<p class="flows-group-note">CM与普通报价／即时维修的完整关系待确认。</p>';
    if (group.key === 'm') return `<div class="flows-group-relations"><span>发现维修需求</span><div>→ ${link('flow','FLOW-INSTANT','03-02 即时维修')}</div><div>→ ${link('flow','FLOW-P','03-01 普通报价维修')}</div></div>`;
    if (group.key === 'mp') return '<p class="flows-group-note">M部分引用M，P部分引用对应P流程；整体关系／结束条件待确认。</p>';
    if (group.key === 'call') return '<p class="flows-group-note">客服处理结果 · 上门查看／服务结果 · 后续报价／实际业务交接</p>';
    if (group.key === 'acquisition') return sourceMethodList();
    return '<p class="flows-group-note">财务处理内分资料核对／补件、开票、收款；不是三条新FLOW。</p>';
  }
  function flowDirectoryCards(groups) {
    return `<div class="flows-directory-grid">${groups.map(g => `<section class="flows-group" data-group="${g.key}"><h2>${esc(g.title)}</h2>${g.entries.map(e => flowEntryRow(e)).join('')}${flowGroupRelations(g)}</section>`).join('')}</div>`;
  }
  function flowSideDirectory(selected) {
    return `<nav class="flows-local-nav" aria-label="业务流程分组"><button class="flows-directory-home" data-view="flows">全部流程分组</button>${flowGroups().map(g => `<section data-flow-group="${g.key}"><button class="flows-nav-heading" data-view="flows" data-sub="group:${g.key}">${esc(g.title)}</button>${g.entries.map(e => flowEntryRow(e,selected)).join('')}${g.key === 'acquisition' ? '<button class="flows-nav-extra" data-view="flows" data-sub="structure:sources">其他取得方式</button>' : ''}</section>`).join('')}${flowHistoryLinks()}</nav>`;
  }
  function flowHistoryLinks() {
    return `<details class="flows-history"><summary>历史FLOW与追溯</summary><div>${link('flow','FLOW-MAIN','旧FLOW-MAIN｜历史总流程')}${link('flow','FLOW-MAINT-ISSUE','FLOW-MAINT-ISSUE｜M→P转换关系／历史追溯')}</div><p>原FLOW、节点、Decision及证据保留；上述记录不作为当前平级主流程。</p></details>`;
  }
  function flowStructureView(kind) {
    const sourcePath = D.currentBusinessModel?.sourcePath;
    const evidence = `<div class="flows-structure-source">依据：${sourcePath ? `<a class="file-link" href="${encodeURI('../' + sourcePath)}" target="_blank" rel="noopener">SOURCE-033／用户业务模型确认 ↗</a>` : '<span>现有业务模型确认记录</span>'}。结构已明确不等于流程定稿。</div>`;
    if (kind === 'mp') return `${panel('03-05 M+P组合控制', `${statusBadge('PARTIAL')}<p class="flows-boundary">结构入口；没有独立完整履约FLOW。${U?'M+P可在业务开始时定义；M产生P不自动变成M+P。':''}</p><div class="flows-structure-branches"><section><h3>M部分</h3>${link('flow','FLOW-M','引用03-04 合同周期保养')}</section><section><h3>P部分</h3><button class="inline-link" data-view="flows" data-sub="group:p">查看对应P维修流程 →</button></section><section><h3>整体关系</h3><p>不固定先P后M</p><p>整体结束条件待确认</p>${refs('decision',['CONFIRMED-013'])}</section></div>${confirmationRef([17,18])}${evidence}`)}`;
    if (kind === 'call') return `${panel('03-06 CALL受理与分流', `${statusBadge('PARTIAL')}<p class="flows-boundary">结构入口；业务方向已说明，完整状态机、投诉及各分流结束细则仍待确认。</p>${U?`<div class="sync-chain"><span>CS建CALL</span><i>→</i><span>合同编号＋客户名称模糊查询</span><i>→</i><span>选择主管名称（区域）</span><i>→</i><span>主管处理</span></div><p>一合同可多CALL；主管候选可搜索所有区域／项目，区域只辅助展示，不推定所有账号跨区数据可见。</p><ul class="flows-structure-list"><li>自己解决 → 客服受理结果（具体结束细则待确认）</li><li>需要报价 → 报价组公共待办 → 报价员接手</li><li>需要上门 → 主管派师傅 → SR／服务结果；需报价时填写名称／型号／位置，再进公共待办</li></ul>${confirmationRef([1,2,4,5,6,7,9,10,13,14])}`:'<ul class="flows-structure-list"><li>客服处理结果</li><li>上门查看／服务结果</li><li>后续报价／实际业务分流</li></ul>'}${evidence}`)}`;
    return `${panel('商务取得／其他取得方式', `<p class="flows-boundary">取得方式分组，不合并为一条大FLOW，不为以下入口创建完整流程。</p>${sourceMethodList(false)}<div class="flows-group-relations">${link('flow','FLOW-M','查看M合同周期保养衔接 →')}<button class="inline-link" data-view="flows">查看业务流程分组 →</button></div><div class="flows-group-relations">Tender已有独立办理记录：${link('flow','FLOW-TENDER','03-07 Tender办理')}</div>${evidence}`)}`;
  }
  function flowRelationNotice(f) {
    if (f.id === 'FLOW-M') return `<section class="flows-relation-panel"><h2>发现维修需求：引用P流程</h2><div>→ ${link('flow','FLOW-INSTANT','03-02 即时维修')}</div><div>→ ${link('flow','FLOW-P','03-01 普通报价维修')}</div><small>原M与新P分别推进；具体转换关联待确认。旧转换记录保留在历史追溯中。</small></section>`;
    if (f.id === 'FLOW-CM') return '<p class="flows-boundary">CM归P紧急维修；与普通报价／即时维修的完整关系待确认，尚不能认定独立完整履约链。</p>';
    if (f.id === 'FLOW-TENDER') return '<p class="flows-boundary">政府项目有事实实例，但Tender不限定为政府业务。以下内部记录保留原历史表述，本轮未校正节点。</p>';
    if (['FLOW-MAIN','FLOW-MAINT-ISSUE'].includes(f.id)) return `<section class="flows-legacy-notice"><strong>历史追溯记录</strong><p>${f.id === 'FLOW-MAIN' ? '这不是当前最新版00，不作为当前业务总模型。' : '此记录保留原MI节点和证据，不再作为独立当前主流程；现行M→P通过M引用P表达。'}</p><button class="inline-link" data-kind="current-business-overview">查看最新版00 →</button> · <button class="inline-link" data-view="flows" data-sub="group:m">查看M保养分组 →</button></section>`;
    return '';
  }
  function financeConfirmationUnits(f) {
    const units = [ ['资料核对／补件',['FIN-01','FIN-02']], ['开票',['FIN-03']], ['收款',['FIN-04']] ];
    return `<p class="flows-boundary">三个确认单元分别记录，不等于固定顺序或全部业务必经。以下均引用原FIN节点，未新增FLOW。</p><div class="flows-finance-units">${units.map(([title,ids]) => `<section><h3>${esc(title)}</h3>${ids.map(id => { const node = f.nodes.find(n => n.id === id); return node ? flowNodes({nodes:[node]}, f.nodes.findIndex(n => n.id === id)) : ''; }).join('')}</section>`).join('')}</div>`;
  }
  function ordinaryQuoteWorkbench(f) {
    // 03-01 presentation only. The original FLOW and full evidence body remain below.
    const steps = [
      ['报价需求'], ['进入报价公共池'], ['报价员接手'], ['报价版本沟通','V1 → V2 → V3…'],
      ['客户接受最终版本'], ['报价员确认中单'], ['按最终成交报价','生成1张MR'], ['MR可产生多个','采购PO'],
      ['允许分阶段','采购／到货／施工'], ['最终完工单'], ['主管确认'], ['P业务完成'],
    ];
    const processDiagram = narrow => {
      const prefix = 'p-quote-' + (narrow ? 'narrow' : 'wide');
      const positions = steps.map((_,i) => narrow ? {x:165,y:42+i*96} : {x:[130,375,620,865][Math.floor(i/4)===1?3-i%4:i%4],y:[65,190,360][Math.floor(i/4)]});
      const width=narrow?260:205, height=narrow?58:64;
      const arrows=positions.slice(0,-1).map((p,i)=>{
        const next=positions[i+1],dx=Math.sign(next.x-p.x);
        const d=p.y===next.y?`M${p.x+dx*width/2} ${p.y} H${next.x-dx*width/2}`:`M${p.x} ${p.y+height/2} V${next.y-height/2}`;
        return `<path class="p-quote-arrow" d="${d}" marker-end="url(#${prefix}-arrow)"/>`;
      }).join('');
      const nodes=steps.map((lines,i)=>{const p=positions[i];return `<g class="p-quote-step${i===11?' is-result':''}" data-quote-step="${i+1}"><rect x="${p.x-width/2}" y="${p.y-height/2}" width="${width}" height="${height}" rx="7"/><text class="p-quote-step-number" x="${p.x-width/2+10}" y="${p.y-height/2+15}">${String(i+1).padStart(2,'0')}</text><text class="p-quote-step-label" x="${p.x}" y="${p.y}" text-anchor="middle">${lines.map((line,j)=>`<tspan x="${p.x}" dy="${j?23:lines.length>1?-4:6}">${esc(line)}</tspan>`).join('')}</text></g>`;}).join('');
      const open=narrow?`<path class="p-quote-open-line" d="M295 618 H304"/><a href="#p-quote-open" class="p-quote-open-marker" aria-label="查看下方中单后材料变更OPEN／P0"><rect x="304" y="593" width="100" height="50" rx="5"/><text x="354" y="614" text-anchor="middle">OPEN／P0<tspan x="354" dy="18">材料变更</tspan></text></a>`:`<path class="p-quote-open-line" d="M375 222 V248"/><a href="#p-quote-open" class="p-quote-open-marker" aria-label="查看下方中单后材料变更OPEN／P0"><rect x="225" y="248" width="300" height="34" rx="5"/><text x="375" y="270" text-anchor="middle">OPEN／P0 · 中单后材料变更 ↘</text></a>`;
      return `<svg class="p-quote-diagram p-quote-diagram-${narrow?'narrow':'wide'}" viewBox="0 0 ${narrow?'414 1130':'1000 416'}" role="group" aria-label="普通报价维修业务流程${narrow?'，纵向版':''}"><defs><marker id="${prefix}-arrow" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#8095a4"/></marker></defs>${narrow?'':'<g class="p-quote-phase"><text x="28" y="14">报价准备</text><text x="28" y="134">中单后材料申请</text><text x="28" y="308">施工与完工</text></g>'}${arrows}${nodes}${open}</svg>`;
    };
    const conclusions = [
      'CALL／SR报价需求进入报价组公共待办，不提前指定具体报价人。',
      '谁接手报价，谁负责该报价及后续跟进。',
      '报价支持V1／V2／V3等版本并保留历史；客户最终接受的版本作为成交版本。',
      '客户接受后由该报价员确认中单，按最终成交报价生成1张MR。',
      '一张MR可对应多个采购PO，允许分阶段采购、到货及施工。',
      'P维修可以连续多日施工，最终提交完工单，由主管确认P业务完成。',
      'P业务完成、开票、收款分别记录，不以收款阻止业务完成。',
    ];
    return `<div class="p-quote-workbench">
      <section class="p-quote-process" aria-label="普通报价维修业务流程"><header><h2>普通报价维修｜业务流程</h2><p>本流程属于第一批部门测试整链　<button class="inline-link" data-kind="p-quote-test-chain">查看完整测试链 →</button></p></header>${processDiagram(false)}${processDiagram(true)}<p class="p-quote-completion">P业务完成不等于已开票／已收款，票款状态独立。</p></section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">Michael 10/26会后人工确认，非客户正式签批；流程整体仍PARTIAL，维修整链未通过。</p><ul>${conclusions.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="p-quote-open" tabindex="-1"><h3>B. 当前待确认</h3><div class="p-quote-open-heading"><strong>中单后材料发生变化，报价／MR／PO如何修改和同步？</strong><span>OPEN／P0</span></div><small>OPEN-10-26-01 · 原C-13下的具体子问题</small><ul class="p-quote-open-items">${(U?.open.items||[]).map(t=>`<li>${esc(t)}？</li>`).join('')}</ul><p>当前没有结论，未选择任何处理方案。${link('question','OPEN-10-26-01','查看问题原记录 →')}</p><p class="p-quote-related-open">阶段材料可供施工由谁、在哪张单据确认及如何回EC，仍待明确。${link('question','C-04','查看C-04 →')}</p></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>参与角色</dt><dd>报价组 · 报价员 · 仓库／采购 · 师傅 · 主管</dd><dt>主要业务单据</dt><dd>报价及版本 · MR · 采购PO · 完工单</dd><dt>关联流程</dt><dd><button class="inline-link" data-view="flows" data-sub="structure:call">03-06 CALL受理与分流 →</button>${link('flow','FLOW-MR','MR／材料供给 →')}${link('flow','FLOW-FINANCE','财务处理（独立关联）→')}</dd></dl></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>保留原节点、Fact、Decision、Source、REQ、PAGE及全部历史入口；按需展开，不以旧记录覆盖10/26确认。</p>${flowRecordBody(f)}</details>
      </section>
    </div>`;
  }
  function instantRepairWorkbench(f) {
    // 03-02 presentation only; reuse the approved 03-01 workbench styles and preserve all original evidence.
    const followup=U?.instantFollowup;
    const followupSource=followup ? `<a class="file-link" href="${encodeURI('../'+followup.sourcePath)}#${esc(followup.anchor)}" target="_blank" rel="noopener">SOURCE-039／Michael最新确认 ↗</a>` : '';
    const steps = [
      ['现场发现维修需求'], ['与客户沟通'], ['客户是否同意','即时维修？'], ['现场即时维修','完成现场收款'],
      ['记录实际维修内容'], ['报价组后补报价','（补齐报价记录）'], ['最终完工单'], ['主管确认'], ['P业务完成'],
    ];
    const processDiagram = narrow => {
      const prefix = 'p-instant-' + (narrow ? 'narrow' : 'wide');
      const positions = steps.map((_,i) => narrow ? {x:155,y:42+i*96} : {x:[130,375,620,865][Math.floor(i/4)===1?3-i%4:i%4],y:[65,190,360][Math.floor(i/4)]});
      const width=narrow?260:205, height=narrow?58:64;
      const arrows=positions.slice(0,-1).map((p,i)=>{
        const next=positions[i+1],dx=Math.sign(next.x-p.x);
        const d=p.y===next.y?`M${p.x+dx*width/2} ${p.y} H${next.x-dx*width/2}`:`M${p.x} ${p.y+height/2} V${next.y-height/2}`;
        return `<path class="p-quote-arrow" d="${d}" marker-end="url(#${prefix}-arrow)"/>`;
      }).join('');
      const nodes=steps.map((lines,i)=>{const p=positions[i];return `<g class="p-quote-step${i===8?' is-result':''}${i===2?' p-instant-decision':''}" data-instant-step="${i+1}"><rect x="${p.x-width/2}" y="${p.y-height/2}" width="${width}" height="${height}" rx="7"/><text class="p-quote-step-number" x="${p.x-width/2+10}" y="${p.y-height/2+15}">${String(i+1).padStart(2,'0')}</text><text class="p-quote-step-label" x="${p.x}" y="${p.y}" text-anchor="middle">${lines.map((line,j)=>`<tspan x="${p.x}" dy="${j?23:lines.length>1?-4:6}">${esc(line)}</tspan>`).join('')}</text></g>`;}).join('');
      const declined=narrow?`<path class="p-quote-arrow" d="M285 234 H301" marker-end="url(#${prefix}-arrow)"/><text class="p-instant-branch-label" x="291" y="222">否</text><g class="p-instant-declined"><rect x="303" y="205" width="105" height="58" rx="7"/><text x="355.5" y="230" text-anchor="middle">不进入<tspan x="355.5" dy="19">即时维修</tspan></text></g><text class="p-instant-branch-label" x="167" y="287">是</text>`:`<path class="p-quote-arrow" d="M620 97 V113" marker-end="url(#${prefix}-arrow)"/><text class="p-instant-branch-label" x="632" y="109">否</text><g class="p-instant-declined"><rect x="535" y="116" width="170" height="32" rx="7"/><text x="620" y="137" text-anchor="middle">不进入即时维修</text></g><text class="p-instant-branch-label" x="741" y="54">是</text>`;
      const open=narrow?`<path class="p-quote-open-line" d="M285 522 H304"/><a href="#p-instant-open" class="p-quote-open-marker" aria-label="查看登记交款对账及后补操作未决C-06"><rect x="304" y="497" width="100" height="50" rx="5"/><text x="354" y="518" text-anchor="middle">待确认<tspan x="354" dy="18">登记／对账</tspan></text></a><path class="p-quote-open-line" d="M285 618 H304"/><a href="#p-instant-open" class="p-quote-open-marker" aria-label="查看单据公共未决C-08"><rect x="304" y="593" width="100" height="50" rx="5"/><text x="354" y="614" text-anchor="middle">待确认<tspan x="354" dy="18">单据细则</tspan></text></a>`:`<path class="p-quote-open-line" d="M620 222 V248"/><a href="#p-instant-open" class="p-quote-open-marker" aria-label="查看登记交款对账及后补操作未决C-06"><rect x="500" y="248" width="240" height="34" rx="5"/><text x="620" y="270" text-anchor="middle">待确认 · 登记／交款／对账 ↘</text></a><path class="p-quote-open-line" d="M375 222 V248"/><a href="#p-instant-open" class="p-quote-open-marker" aria-label="查看单据公共未决C-08"><rect x="255" y="248" width="240" height="34" rx="5"/><text x="375" y="270" text-anchor="middle">待确认 · 单据细则 ↘</text></a>`;
      return `<svg class="p-quote-diagram p-quote-diagram-${narrow?'narrow':'wide'}" viewBox="0 0 ${narrow?'414 870':'1000 416'}" role="group" aria-label="即时维修业务流程${narrow?'，纵向版':''}"><defs><marker id="${prefix}-arrow" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#8095a4"/></marker></defs>${narrow?'':'<g class="p-quote-phase"><text x="28" y="14">现场沟通与维修</text><text x="28" y="134">维修记录、后补报价与完工</text><text x="28" y="308">业务完成</text></g>'}${arrows}${nodes}${declined}${open}</svg>`;
    };
    const conclusions = [
      '即时维修属于P；师傅在现场工作／保养时发现维修需求，现场可处理且客户同意后，可直接维修。',
      ...(followup?.rules || []),
      'P即时维修最终提交完工单，主管确认后P业务完成；即使涉及多天上门，本轮不展开每天上门过程。',
      'M过程中产生即时维修P，不代表原M自动变成M+P；原M与新P分别推进。',
      '车资关联师傅工作工单，可在SR或完工单现场填写，后续可补充／修改具体明细；Taxi必须有收据，未确认其他交通方式同样要求。',
    ];
    return `<div class="p-quote-workbench p-instant-workbench">
      <section class="p-quote-process" aria-label="即时维修业务流程"><header><h2>即时维修｜业务流程</h2><p>客户现场同意 → 即时维修／现场收款 → 报价组补报价记录；不再接受、中单或收款。</p></header>${processDiagram(false)}${processDiagram(true)}<p class="p-quote-completion">进入后补报价前已完成现场收款；后补报价只补记录，已收款不代表已开票。</p></section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">依据Michael 10/27最新人工确认及10/26确认，非客户正式签批；流程整体仍PARTIAL，维修整链未通过。</p><ul>${conclusions.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="p-instant-open" tabindex="-1"><h3>B. 当前待确认</h3><div class="p-quote-open-heading"><strong>现场款登记、权限、交款、对账及后补记录具体操作</strong><span>PENDING／P0</span></div><p>已明确报价组补记录、补录前已现场收款；这些已答子项不再提问。</p><ul>${(followup?.pending||[]).slice(0,2).map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p>${link('instant-followup','C-06','查看C-06最新已答／未答边界 →')}</p><p class="p-quote-related-open">本页按P最终完工单展示；单据打印／交付、缺签及补件等公共细则仍待确认。${link('question','C-08','查看C-08原记录 →')}</p></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>参与角色</dt><dd>师傅 · 客户 · 主管 · 报价组／报价员（组内操作人与权限待确认）</dd><dt>主要业务单据</dt><dd>完工单 · 后补报价记录</dd><dt>SR边界</dt><dd>可属于上游保养／上门检修记录，不作为即时维修必备完成单据。</dd><dt>关联流程</dt><dd>${link('flow','FLOW-P','03-01 普通报价维修（仅报价参考，不重新进入）→')}${link('flow','FLOW-M','03-04 合同周期保养（M现场触发时）→')}${link('flow','FLOW-FINANCE','财务处理（独立关联）→')}</dd></dl></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>最新收款／后补范围以本轮人工确认为准；下方原流程投影、Fact、Decision、Source、REQ、PAGE及旧未决全文保留历史身份，不覆盖本页最新结论。</p><p>${followupSource}　${link('instant-followup','CONFIRM-10-27-01','CONFIRM-10-27-01／最新规则与边界 →')}</p>${confirmationRef([9,14,15,16,17,19,20])}<p>${latestSourceLink('SOURCE-038／10月26日确认原文与边界')}</p>${flowRecordBody(f)}</details>
      </section>
    </div>`;
  }
  function emergencyRepairWorkbench(f) {
    // CM presentation only: preserve the original FLOW and qualified historical Decisions below.
    const sourceLink = (path,label) => `<a class="file-link" href="${encodeURI('../'+path)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
    const modelSource = sourceLink('docs/knowledge/decisions/DEC-20261025-业务模型确认.md','SOURCE-033／用户业务模型确认');
    const marchSource = sourceLink('materials/听记纪要/纪要_ECInfo-dingtalk報價方案和POC反饋溝通20260326.pdf','SOURCE-005／3月26日原始沟通（P3、P8）');
    const laterSource = sourceLink('docs/knowledge/03-business/BUSINESS-CLARIFICATIONS-20261016.md','SOURCE-029／10月16日用户说明（第16项）');
    const audit = [
      ['什么场景触发CM？','PARTIAL','紧急／临时任务的性质已说明；具体触发事件、入口和建单条件仍未明确。','SOURCE-029第16项；SOURCE-033 CONFIRM-08','C-02'],
      ['CM是否经过CALL？','OPEN','3月资料在CALL类型及调度语境中讨论CM；用户后来说明“不是CALL”。不能据此认定必经或永不经过CALL。','SOURCE-005 P3／P8；SOURCE-029第16项','C-02'],
      ['谁判断这是CM？','OPEN','归属P已明确；判定岗位、标准与权限没有当前明确结论。','SOURCE-033 CONFIRM-08；10/26保留边界','C-02'],
      ['谁派师傅？','CONFLICT','3月资料提CS／CR指定、另一处写CS指定；9月Decision写“通常由CR／主管指定”。适用范围和当前派工责任待核，不裁定。','SOURCE-005 P3／P8；CONFIRMED-015','C-03'],
      ['是否需要立即上门？','NO EVIDENCE','未找到CM专属的立即上门要求或响应时限；“紧急”不能代替具体规则。','当前已核CM资料未明确','C-02'],
      ['CM是否需要报价？','OPEN','CM完整报价路径仍明确保留待确认；不从普通报价或即时维修推定。','10/26保留边界','C-02'],
      ['报价在维修前还是后？','NO EVIDENCE','没有CM专属的报价时点结论，不能套用先报价或后补报价。','当前已核CM资料未明确','C-02'],
      ['是否可能现场收款？','NO EVIDENCE','现有现场收款确认针对即时维修，不能扩展为CM收费或收款规则。','SOURCE-039适用范围为即时维修','C-02'],
      ['现场用SR、CP或其他单据？','PARTIAL','9月Decision有现场后交SR的描述；最新仍保留CM完整规则待核。本页不指定CM必用SR或CP。','CONFIRMED-015；SOURCE-033；10/26保留边界','C-08'],
      ['谁确认本次CM完成？','PARTIAL','旧基线写CR／主管确认，Decision写现场后提交SR并确认完工；当前CM确认岗位与条件仍待核。','旧基线§9；CONFIRMED-010／015；SOURCE-033','C-02'],
      ['CM完成是否直接代表P完成？','OPEN','未明确本次紧急处理结束与P整项业务完成的对应关系。','SOURCE-033；10/26保留边界','C-02'],
      ['业务完成与开票／收款是否独立？','CONFIRMED','已有P业务通用原则：业务完成不等于已开票／已收款。CM具体票款操作并未因此确认。','CONFIRM-10-26-20',''],
      ['与普通报价／即时维修是什么关系？','PARTIAL','同属P已明确；是否互斥、能否衔接及何时引用仍待确认，不能画成三条互斥完整路径。','SOURCE-033 CONFIRM-08；现有CM关系边界','C-02'],
      ['还有哪些规则没有依据？','OPEN','与原PM／其他任务冲突时谁协调、可否拒绝、怎样重排仍未定；不采用自动释放或重排政策。','PENDING-002；C-05；原SOP仅作历史','C-05'],
    ];
    return `<div class="p-quote-workbench cm-workbench">
      <section class="p-quote-process" aria-label="CM紧急维修业务流程"><header><h2>CM紧急维修｜业务流程</h2><p>PARTIAL · 仅展示已明确的业务性质与待确认断点，不代表完整流程或业务定稿。</p></header>
        <div class="cm-fragment" role="group" aria-label="CM已确认部分及OPEN断点">
          <div class="cm-fragment-node"><small>已明确归属</small><strong>CM｜P中的紧急维修</strong><span>不是第四类核心业务</span></div><span class="cm-fragment-arrow" aria-hidden="true">→</span>
          <div class="cm-fragment-node"><small>业务含义</small><strong>紧急处理</strong><span>具体执行方式待确认</span></div><span class="cm-fragment-arrow" aria-hidden="true">⇢</span>
          <a class="cm-fragment-node cm-fragment-open" href="#cm-open"><small>OPEN断点</small><strong>入口／派工／单据／完成</strong><span>查看下方待确认 ↓</span></a>
        </div><p class="cm-fragment-boundary">CM当前业务事实不足，页面为PARTIAL，不代表流程定稿。不能自动套用普通报价维修或即时维修链。</p>
      </section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">区分原始沟通、已确认Decision与用户后续说明；本次审查不新增客户批准或完整流程结论。</p><ul>
          <li>CM业务真实存在。〔9/27已确认Decision：CONFIRMED-014〕</li>
          <li>CM是P中的紧急维修独立环节，不与P／M／M+P平级；完整规则仍待确认。〔SOURCE-033／用户明确确认〕</li>
          <li>P业务完成与开票、收款分别记录。〔10/26人工确认的通用原则；不据此补CM票款细则〕</li>
        </ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="cm-open" tabindex="-1"><h3>B. 当前待确认</h3><p>沿用既有C-02／C-05及相关岗位、单据主题；未创建新OPEN，未关闭任何问题。先由Michael核实，无法确定或已要求客户核实的再请客户。</p>
          <div class="cm-audit-list">${audit.map(([title,status,answer,source,question],i)=>`<section class="cm-audit-item" data-cm-check="${i+1}"><div class="cm-audit-heading"><h4>${String(i+1).padStart(2,'0')} ${esc(title)}</h4>${statusBadge(status)}</div><p>${esc(answer)}</p><small>依据／边界：${esc(source)}${question?' · '+link('question',question,'查看'+question+' →'):''}</small></section>`).join('')}</div>
        </section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related">
          <dt>业务归属</dt><dd>P｜维修；紧急维修环节的完整关系待确认。</dd>
          <dt>历史提及角色</dt><dd>CS · CR · 主管 · 师傅 · 客户；派工及完工职责按上方差异保留待核。</dd>
          <dt>单据边界</dt><dd>旧记录提SR；当前CM使用SR／CP及其他凭据的规则未定。</dd>
          <dt>相关流程</dt><dd>${link('flow','FLOW-P','03-01 普通报价维修（仅对照，非自动衔接）→')}${link('flow','FLOW-INSTANT','03-02 即时维修（仅对照，非自动衔接）→')}</dd>
          <dt>相关未决</dt><dd>${link('question','C-02','入口、对象与完成关系 →')}${link('question','C-05','CM／原任务冲突 →')}${link('decision','PENDING-002','冲突原记录 →')}</dd>
        </dl></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary>
          <h4>当前归属与未决边界</h4><p>${modelSource}　${laterSource}　${latestSourceLink('SOURCE-038／10月26日确认及保留边界')}</p>${confirmationRef([20])}<p>${link('decision','CONFIRMED-014','CM存在的原Decision →')}　${link('decision','CONFIRMED-015','通常派工及SR的原Decision →')}　${link('decision','PENDING-002','冲突政策仍待确认 →')}</p>
          <h4>原始沟通与历史差异</h4><p>${marchSource}</p><p>3月沟通提CS／CR或CS指定；9月Decision描述“通常由CR／主管直接指定，现场后提交SR并确认完工”。两者适用范围待核；不把“通常”升级为唯一派工或整链完成规则。</p>
          <p>${sourceLink('docs/knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md','业务基线（含CM旧链与当前适用边界）')}　${sourceLink('docs/knowledge/05-pending/OPEN-QUESTIONS.md','既有待确认原文')}</p>
          <p>${sourceLink('outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/02-SOP流程图/纯SOP版/SOP-01-来电与CM调度流程图.svg','历史SOP调度图（非当前批准政策）')}</p>
          <h4>Prototype现状〔仅设计参照，不是业务依据〕</h4><p>原型存在“糾正維修”类型、一般接收动作及冲突待确认说明，演示CM工单无报价。不能据此认定CM无需报价、可拒单或自动重排PM。</p><p>${sourceLink('prototype/index.html','当前原型源码（只读核对）')}　${sourceLink('prototype/remediation.js','演示CM记录（只读核对）')}</p>
          <h4>原FLOW-CM、节点及全部追溯〔原样保留〕</h4><p>下方保留原节点、Fact、Decision、SOURCE、REQ、PAGE及历史标签。旧记录中的CONFIRMED标签只表示对应记录，不等于当前CM完整流程已确认。</p>${flowRecordBody(f)}
        </details>
      </section>
    </div>`;
  }
  function maintenanceWorkbench(f) {
    // 03-04 display only. Reuse the approved workbench; do not create or mutate FLOW nodes.
    const steps=[['合同／保养计划','周期触发'],['产生本期保养工作'],['安排本次上门'],['师傅上门'],['填写本次SR'],['主管确认'],['本次工单关闭'],['本次保养工作完成'],['是否还有后续','保养工作？'],['M整体完成','〔完成操作待确认〕']];
    const processDiagram=narrow=>{
      const prefix='m-contract-'+(narrow?'narrow':'wide');
      const positions=narrow?steps.map((_,i)=>({x:150,y:42+i*96})):[{x:140,y:55},{x:390,y:55},{x:390,y:155},{x:140,y:155},{x:140,y:285},{x:390,y:285},{x:390,y:385},{x:140,y:385},{x:140,y:495},{x:390,y:495}];
      const width=narrow?250:205,height=narrow?58:64;
      const arrows=positions.slice(0,-1).map((p,i)=>{const next=positions[i+1],dx=Math.sign(next.x-p.x),d=p.y===next.y?`M${p.x+dx*width/2} ${p.y} H${next.x-dx*width/2}`:`M${p.x} ${p.y+height/2} V${next.y-height/2}`;return `<path class="p-quote-arrow" d="${d}" marker-end="url(#${prefix}-arrow)"/>`;}).join('');
      const nodes=steps.map((lines,i)=>{const p=positions[i];return `<g class="p-quote-step${i===7?' is-result':''}${i===8?' m-contract-decision':''}" data-maintenance-step="${i+1}"><rect x="${p.x-width/2}" y="${p.y-height/2}" width="${width}" height="${height}" rx="7"/><text class="p-quote-step-number" x="${p.x-width/2+10}" y="${p.y-height/2+15}">${String(i+1).padStart(2,'0')}</text><text class="p-quote-step-label" x="${p.x}" y="${p.y}" text-anchor="middle">${lines.map((line,j)=>`<tspan x="${p.x}" dy="${j?23:lines.length>1?-4:6}">${esc(line)}</tspan>`).join('')}</text></g>`;}).join('');
      const loop=narrow?`<path class="m-contract-loop" d="M275 810 H399 V234 H275" marker-end="url(#${prefix}-arrow)"/><text class="m-contract-note" x="288" y="798">有</text><text class="m-contract-note" x="304" y="420">下一次<tspan x="304" dy="20">上门</tspan></text><text class="m-contract-note" x="165" y="863">没有</text>`:`<path class="m-contract-loop" d="M37.5 495 H18 V110 H390 V123" marker-end="url(#${prefix}-arrow)"/><text class="m-contract-note" x="23" y="483">有</text><text class="m-contract-note" x="28" y="103">下一次上门</text><text class="m-contract-note" x="253" y="483">没有</text>`;
      const open=narrow?`<path class="p-quote-open-line" d="M150 935 V968"/><a href="#m-contract-open" class="p-quote-open-marker" aria-label="查看M整体完成及计划变更未决"><rect x="25" y="970" width="305" height="38" rx="5"/><text x="177.5" y="994" text-anchor="middle">待确认 · 整体完成的触发与确认方式 ↘</text></a>`:`<path class="p-quote-open-line" d="M390 527 V548"/><a href="#m-contract-open" class="p-quote-open-marker" aria-label="查看M整体完成及计划变更未决"><rect x="270" y="550" width="240" height="34" rx="5"/><text x="390" y="572" text-anchor="middle">待确认 · M整体完成操作 ↘</text></a>`;
      const branches=narrow?`<text class="m-contract-note" x="25" y="1050">现场发现维修需求时，另见下方M→P分流。</text>`:`<path class="m-contract-branch" d="M242.5 155 V215 H525 V155 H555" marker-end="url(#${prefix}-branch-arrow)"/><g class="m-contract-branch-title"><rect x="555" y="123" width="400" height="64" rx="7"/><text x="755" y="162" text-anchor="middle">发现维修需求？</text></g><text class="m-contract-note" x="540" y="231">否：继续左侧M主线</text><path class="m-contract-branch" d="M755 187 V242" marker-end="url(#${prefix}-branch-arrow)"/><g class="m-contract-reference" data-kind="flow" data-id="FLOW-INSTANT" role="button" tabindex="0" aria-label="进入03-02即时维修"><rect x="555" y="242" width="400" height="96" rx="7"/><text x="755" y="267" text-anchor="middle">现场可处理＋客户同意<tspan x="755" dy="24">即时维修／完成现场收款</tspan><tspan x="755" dy="24">新P即时维修 → 03-02 ↗</tspan></text></g><path class="m-contract-branch" d="M955 155 H980 V445 H955" marker-end="url(#${prefix}-branch-arrow)"/><g class="m-contract-reference" data-kind="flow" data-id="FLOW-P" role="button" tabindex="0" aria-label="进入03-01普通报价维修"><rect x="555" y="371" width="400" height="148" rx="7"/><text x="755" y="397" text-anchor="middle">需要报价<tspan x="755" dy="24">本次SR勾选「需要报价」</tspan><tspan x="755" dy="24">填写名称／型号／位置（可多行）</tspan><tspan x="755" dy="24">报价公共池 → 报价员接手</tspan><tspan x="755" dy="24">新P普通报价维修 → 03-01 ↗</tspan></text></g><text class="m-contract-note" x="555" y="545">SR阶段不指定报价员；原M继续，不等待新P。</text><text class="m-contract-note" x="555" y="570">原M与新P分别推进，不自动变成M+P。</text>`;
      return `<svg class="p-quote-diagram p-quote-diagram-${narrow?'narrow':'wide'}" viewBox="0 0 ${narrow?'414 1080':'1000 610'}" role="group" aria-label="合同周期保养业务流程${narrow?'，纵向版':''}"><defs><marker id="${prefix}-arrow" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#8095a4"/></marker><marker id="${prefix}-branch-arrow" markerWidth="7" markerHeight="7" refX="6.5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#6b8fa5"/></marker></defs>${arrows}${loop}${nodes}${branches}${open}</svg>`;
    };
    const conclusions=[
      'M为合同周期保养，由合同／保养计划／周期触发；同一M可有多次上门，不把每次上门重建为新的M。',
      '一次上门一份SR，记录本次现场工作；一个M可有多份SR，不合成一张。',
      '师傅提交现场资料后，主管确认关闭本次工作工单；本次保养工作完成不等于整个M完成。',
      '须完成该M应做的全部保养工作，才是M整体完成；谁触发、如何判定与确认仍未明确。',
      '现场发现维修需求且客户同意直接处理时，可产生新P即时维修／完成现场收款，引用03-02；不在M中重复维护P流程。',
      '需要报价时，在本次SR勾选「需要报价」，填写货品名称、型号、位置，支持多行；SR阶段不指定报价员，需求进入报价组公共池，谁接手谁跟进。',
      '原M与新P分别推进，M产生P不自动变成M+P；M+P可以从业务开始定义。',
      'M业务完成不代表已开票或已收款，票款状态独立。',
      '车资关联本次工作工单，可在SR现场填写并后补明细；Taxi必须有收据，未确认其他交通方式同样要求。',
    ];
    return `<div class="p-quote-workbench m-contract-workbench">
      <section class="p-quote-process" aria-label="合同周期保养业务流程"><header><h2>合同周期保养｜业务流程</h2><p>同一M可多次上门，一次上门一份SR；本次工作完成与整个M完成分别看。</p></header>${processDiagram(false)}${processDiagram(true)}<div class="m-contract-narrow-relations"><h3>现场发现维修需求</h3><p>未发现：继续本次SR与M主线。</p><p>现场可处理＋客户同意 → 即时维修／完成现场收款 → 新P ${link('flow','FLOW-INSTANT','03-02 即时维修 →')}</p><p>需要报价 → 本次SR勾选「需要报价」→ 名称／型号／位置（多行）→ 报价公共池 → 报价员接手 → 新P ${link('flow','FLOW-P','03-01 普通报价维修 →')}</p><small>SR阶段不指定报价员；原M继续，新P单独推进，不自动变成M+P。</small></div><p class="p-quote-completion">M业务完成不等于已开票／已收款，票款状态独立。</p></section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">依据已有人工确认及本轮明确说明，非客户正式签批；整体仍PARTIAL，M整体完成的操作规则未确认。</p><ul>${conclusions.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="m-contract-open" tabindex="-1"><h3>B. 当前待确认</h3><div class="p-quote-open-heading"><strong>M整体完成怎样触发、判定和确认？</strong><span>PENDING／P0</span></div><ul><li>谁触发M整体完成，系统自动还是人工确认？</li><li>是否需要主管再次确认？</li><li>保养计划次数发生变化怎样处理？</li></ul><p>沿用既有C-02对象终态、C-10合同周期／次数及整体完成未答范围，不新建OPEN、不选处理方案。${link('question','C-02','对象终态未决 →')} ${link('question','C-10','合同周期与次数未决 →')}</p><p class="p-quote-related-open">首期／尾期、到期补做等原未决仍保留；M+P整体完成不由M主链代答，见<button class="inline-link" data-view="flows" data-sub="structure:mp">03-05组合控制 →</button>。</p></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>参与角色</dt><dd>师傅 · 主管 · 客户 · CR（既有排程说明）· 报价组／报价员（产生P时）</dd><dt>主要业务单据</dt><dd>本次SR · 报价需求（需要维修报价时）</dd><dt>关联流程</dt><dd>${link('flow','FLOW-INSTANT','03-02 即时维修 →')}${link('flow','FLOW-P','03-01 普通报价维修 →')}<button class="inline-link" data-view="flows" data-sub="structure:mp">03-05 M+P组合控制（关系参考）→</button>${link('flow','FLOW-FINANCE','财务处理（独立关联）→')}</dd></dl></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>当前多次上门、单次关闭、M→P、车资与票款边界见人工确认；原FLOW节点、Fact、Decision、Source、REQ、PAGE及全部历史记录继续保留。M整体完成操作未因本次展示而定案。</p>${confirmationRef([7,9,10,14,16,17,18,19,20])}<p>${latestSourceLink('SOURCE-038／10月26日人工确认')}　<a class="file-link" href="${encodeURI('../'+U.sourcePath)}#instant-followup-20261027" target="_blank" rel="noopener">SOURCE-039／即时维修收款与后补报价 ↗</a></p>${flowRelationNotice(f)}${flowRecordBody(f)}</details>
      </section>
    </div>`;
  }
  function callWorkbench() {
    // 03-06 display projection only; retain the original structure entry and all source records below.
    const box=(body,extra='')=>`<div class="call-box ${extra}">${body}</div>`;
    const down='<span class="call-down" aria-hidden="true">↓</span>';
    const oldEntry=flowStructureView('call');
    const conclusions=[
      'CALL是客户服务受理与分流入口，不是P／M／M+P之外的第四种核心业务，也不必然派师傅或产生SR。',
      '通过一个文本框模糊查询合同编号＋客户名称，选择对应客户／合同；不先选客户再单独选合同，不把合同编号解释为数据库主键。',
      '一客可多合同，一合同只属于一个客户；客户名称可能重复，一合同可有多个CALL，每个CALL保留合同编号＋客户名称的业务识别。',
      'CALL选择主管负责，可模糊查询所有区域／项目主管，显示主管名称（区域）；区域不硬锁候选，不据此推定全员跨区数据权限。',
      '主管有自行解决、需要报价、需要上门三种主要处理方向；自行解决后可结束CALL，不强制派工或报价，关闭细则仍待确认。',
      'CALL／SR需要报价时均进入报价组公共待办，报价组有权限人员可见，不提前指定具体报价员；谁接手，谁负责报价及后续跟进。',
      '需要上门由主管派师傅；基础工作信息包括合同编号、客户名称、地址、联系人／电话及工作内容，特殊要求可写工作内容。',
      '正常上门检修使用SR；现场工作提交后由主管确认关闭本次工作工单，不代表整个合同业务完成。',
      '现场需另行报价时，SR勾选「需要报价」，填写货品名称、型号、位置，支持多行；师傅不选具体报价员。',
      '现场可处理且客户同意直接维修时，可产生P即时维修，引用03-02；其收款、后补及完工规则在对应流程维护。',
    ];
    return `<div class="p-quote-workbench call-workbench">
      <section class="p-quote-process" aria-label="CALL受理与分流业务流程"><header><h2>CALL受理与分流｜业务流程</h2><p>先受理、再由主管分流；CALL不等于派工，也不是所有业务的唯一入口。</p></header>
        <div class="call-intake" aria-label="CALL受理主链">${[
          ['客户来电／CALL','CS受理'],['查询并选择合同／客户','合同编号＋客户名称'],['记录CALL问题／需求',''],['选择主管','主管名称（区域）'],['主管处理',''],['判断处理方向','三方向分流'],
        ].map(([title,note],i)=>box(`<small>${String(i+1).padStart(2,'0')}</small><strong>${title}</strong>${note?`<span>${note}</span>`:''}`,i===5?'call-choice':'')).join('')}</div>
        <div class="call-routing" aria-label="主管三方向分流">
          <section><h3>自行解决</h3>${down}${box('问题解决')}${down}${box('CALL结束','call-result')}<small>不必派工、报价或产生SR；具体关闭规则待确认。</small></section>
          <section><h3>需要报价</h3>${down}${box('报价组公共待办')}${down}${box('报价员接手')}${down}${link('flow','FLOW-P','后续报价 → 03-01 ↗')}<small>CALL不指定报价员；谁接手谁跟进。</small></section>
          <section><h3>需要上门</h3>${down}${box('主管派师傅')}${down}${box('师傅上门 → 现场处理')}<span class="call-down">↓ 仅此分支继续下方现场处理</span></section>
        </div>
        <div class="call-onsite" aria-label="需要上门后的现场处理"><h3>上门后的处理</h3><div class="call-onsite-branches">
          <section><h4>正常检修／处理</h4>${box('完成现场工作 → 本次SR')}${down}${box('主管确认 → 本次工单关闭','call-result')}<small>关闭本次工作，不等于整个合同业务完成。</small></section>
          <section><h4>发现需要另行报价</h4>${box('本次SR勾选「需要报价」<span>货品名称／型号／位置，可多行</span>')}${down}${box('报价公共池 → 报价员接手')}${down}${link('flow','FLOW-P','后续普通报价维修 → 03-01 ↗')}<small>SR不指定报价员。</small></section>
          <section><h4>发现可即时处理的维修需求</h4>${box('现场可处理＋客户同意')}${down}${box('产生P即时维修')}${down}${link('flow','FLOW-INSTANT','进入03-02 即时维修 ↗')}<small>引用对应P流程，不在CALL中重复展开。</small></section>
        </div></div><p class="p-quote-completion">CALL是受理记录，SR是实际上门后的服务记录；两者不等同。</p>
      </section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">依据现有业务模型及Michael 10/26人工确认，非客户正式签批；CALL仍PARTIAL，完整关闭、权限及关联细则未定。</p><ul>${conclusions.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="p-quote-fact-group" data-quote-group="b"><h3>B. 当前待确认</h3><ul><li>后续施工恢复原CALL还是建立新CALL，关联／编号怎样体现？${link('question','C-07','C-07 →')}</li><li>SR与CALL／工作任务怎样关联，无CALL独立新增SR及已交修改边界是什么？${link('question','C-11','C-11 →')}</li><li>CALL各分流、投诉及关闭的具体条件和终态仍未完整确认。${link('question','C-02','C-02 →')}</li><li>主管候选可跨区，不等于所有人员均获跨区操作权限；具体授权与名单仍待核实。${link('question','C-03','C-03 →')}</li></ul><p class="p-quote-related-open">只引用现有问题，不新增OPEN、不补关闭或关联方案；CALL与本次工作工单分别看。</p></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>参与角色</dt><dd>CS／客服 · 主管 · 师傅 · 报价组／报价员 · 客户</dd><dt>主要业务对象</dt><dd>CALL · 工作工单 · SR · 报价需求</dd><dt>关联流程</dt><dd>${link('flow','FLOW-P','03-01 普通报价维修 →')}${link('flow','FLOW-INSTANT','03-02 即时维修 →')}</dd></dl><small>CALL查询保养或分流涉及M时，按具体业务关联；本页不强制所有CALL转P或M。</small></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>引用SOURCE-033及10/26现有确认；原CALL结构入口完整保留。本页未新增完整CALL FLOW、Fact、REQ或PAGE，也不以主题相关冒充已验证映射。</p>${confirmationRef([1,2,4,5,6,7,9,10,13,14,16])}<p>${latestSourceLink()}</p><h4>原结构入口与依据</h4>${oldEntry}<h4>已有主流程的Fact／Decision／REQ／PAGE追溯</h4><p>后续报价及即时维修的既有追溯保留在${link('flow','FLOW-P','03-01证据区')}与${link('flow','FLOW-INSTANT','03-02证据区')}；CALL目前没有独立完整FLOW，不创建虚假编号。</p></details>
      </section>
    </div>`;
  }
  function combinationWorkbench() {
    // 03-05 projection only: references and unresolved aggregate control, not a new FLOW.
    const conclusions=[
      'M+P是EC核心业务分类之一，可以在业务开始时定义，包含M部分与P部分。',
      'M部分引用M履约，P部分按实际业务类型引用对应P履约，不复制第三套履约流程。',
      'M与P按实际业务分别推进，没有固定先M后P或先P后M，不规定统一的并行／串行方式。',
      'M部分可能多次上门，每次上门一份SR；主管确认关闭本次工单，不等于整个M完成。',
      '原M执行中发现新的P需求，原M继续、新P单独推进，不自动变成M+P。',
      'M整体与M+P整体完成仍需分别判断；具体触发／确认规则尚未明确，不自动按两部分状态结束整单。',
      '业务完成不等于已开票／已收款，票款状态独立；M+P金额、折扣及收款分配规则未决。',
    ];
    const basisPath=D.currentBusinessModel?.sourcePath;
    return `<div class="p-quote-workbench mp-workbench">
      <section class="p-quote-process" aria-label="M+P组合控制业务流程"><header><h2>M+P组合控制｜业务流程</h2><p>M／P分别推进，无固定先后；整体完成规则仍OPEN。当前PARTIAL，不代表业务定稿。</p></header>
        <div class="mp-map" role="group" aria-label="M+P分别引用M与P，汇看状态后整体完成判断仍待确认">
          <div class="mp-origin">M+P业务<small>可在业务开始时定义</small></div><div class="mp-split" aria-hidden="true"></div>
          <div class="mp-parts">
            <section><h3>M部分</h3><span class="mp-arrow" aria-hidden="true">↓</span><div class="mp-reference">${link('flow','FLOW-M','引用03-04 合同周期保养 ↗')}</div><span class="mp-arrow" aria-hidden="true">↓</span><div class="mp-state">M部分状态<small>跟进整个M；单次工单关闭 ≠ M完成</small></div></section>
            <section><h3>P部分</h3><span class="mp-arrow" aria-hidden="true">↓</span><div class="mp-reference"><strong>按实际P业务类型引用对应流程</strong><div>${link('flow','FLOW-P','普通报价维修 → 03-01 ↗')}${link('flow','FLOW-INSTANT','即时维修 → 03-02 ↗')}</div><small>以上为已有流程参考，不是P类型的穷举。</small></div><span class="mp-arrow" aria-hidden="true">↓</span><div class="mp-state">P部分状态<small>按所引用P流程分别跟进</small></div></section>
          </div><div class="mp-merge" aria-hidden="true"></div><span class="mp-arrow" aria-hidden="true">↓</span>
          <a class="mp-open-gate" href="#mp-open"><strong>M+P整体完成判断〔待确认规则〕</strong><span>↓</span><b>OPEN</b><small>谁触发、自动或人工、是否再次确认，均未定。</small></a>
        </div><p class="mp-boundary">M执行中新增P：原M继续＋新P单独推进，不自动变成M+P。</p>
      </section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">9/27 Decision、SOURCE-033用户模型及Michael 10/26人工确认；非客户正式签批。下列未决边界不是已确认的完成规则。</p><ul>${conclusions.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="mp-open" tabindex="-1"><h3>B. 当前待确认</h3><h4>M+P整体完成</h4><p>谁触发、自动还是人工、是否需主管再次确认？M和P完成是否足以结束整单、是否有额外审核动作，均未定。</p><p>${link('question','C-02','C-02：对象状态与终态 →')}</p><h4>金额与财务关系</h4><p>M／P金额、折扣、部分收款和冲销怎样分配，单据／票款怎样关联，仍保持OPEN；没有采用比例或计算方案。</p><p>${link('question','C-14','C-14：组合金额与票款分配 →')}</p><small>沿用SOURCE-033中C-02／C-14的组合未决边界，不新增OPEN，不自动关闭任何主题。</small></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>参与角色</dt><dd>按M／P引用流程参与：CR、主管、师傅、报价组／报价员；组合整体确认责任待明确。</dd><dt>关联流程</dt><dd>${link('flow','FLOW-M','03-04 合同周期保养 →')}${link('flow','FLOW-P','03-01 普通报价维修 →')}${link('flow','FLOW-INSTANT','03-02 即时维修 →')}${link('flow','FLOW-FINANCE','财务处理（独立关联）→')}</dd></dl></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>保留原结构入口及真实依据；M+P没有独立完整FLOW，不新造FLOW／FACT／REQ／PAGE，也不把引用当作已完成的系统映射。</p>${basisPath?`<p><a class="file-link" href="${encodeURI('../'+basisPath)}" target="_blank" rel="noopener">SOURCE-033／核心分类与组合关系 ↗</a></p>`:''}<h4>本页结论对应依据</h4><ul><li>核心分类与分别引用M／P：SOURCE-033 CONFIRM-01、CONFIRMED-011。</li><li>不固定先后：CONFIRMED-013；不规定所有业务统一并行或串行。</li><li>M上门SR及单次关闭边界：CONFIRM-10-26-14／16，引用03-04，不复制其履约节点。</li><li>M新增P不自动变M+P、开始时可定义M+P、整体结束仍未决：CONFIRM-10-26-17／18。</li><li>业务与财务状态独立：CONFIRM-10-26-20；组合金额及票款关系仍见C-14。</li></ul>${confirmationRef([14,16,17,18,20])}<p>${latestSourceLink('SOURCE-038／人工确认原文与适用边界')}</p><p>10/27即时维修确认仅适用于03-02：后补报价前已现场收款、报价组只补记录；不能扩展为M+P整单收款或统一完成条件。<a class="file-link" href="${encodeURI('../'+U.sourcePath)}#instant-followup-20261027" target="_blank" rel="noopener">SOURCE-039／即时维修适用边界 ↗</a></p><h4>既有Fact与Decision</h4>${refs('fact',['FACT-011','FACT-012','FACT-013'].filter(id=>maps.facts.has(id)))}${refs('decision',['CONFIRMED-011','CONFIRMED-012','CONFIRMED-013','CONFIRMED-017'].filter(id=>maps.decisions.has(id)))}<h4>原结构入口〔保留〕</h4>${flowStructureView('mp')}<p>既有REQ／PAGE及其历史对应，按所引用${link('flow','FLOW-M','M流程证据区')}、${link('flow','FLOW-P','普通报价维修证据区')}、${link('flow','FLOW-INSTANT','即时维修证据区')}追溯；本页未建立新的专属映射。</p></details>
      </section>
    </div>`;
  }
  function materialSupplyWorkbench(f) {
    // FLOW-MR display only: confirmed supply relationships, not warehouse integration or new FLOW nodes.
    const down = '<span class="mr-down" aria-hidden="true">↓</span>';
    const conclusions = [
      '普通报价维修中，报价员确认中单后，按最终成交报价中的材料需求生成1张MR。',
      '一张MR可以对应多张采购PO，不是MR与采购PO一对一。',
      '材料可分供应商、分阶段采购，并分阶段到货。',
      '满足本次／本阶段施工需要时，可以进行对应阶段施工；不要求全项目材料一次齐套。',
      '剩余材料可继续采购、到货，材料供给与施工按实际阶段推进。',
      'MR／材料供给是公共子流程；本页聚焦03-01普通成交报价后的材料供给关系。',
      '中单后材料变化如何处理仍无结论；一成交报价一MR，不代表已经确定变更时修改或新建MR的方案。',
      '当前不假设仓库通与工单系统已经自动打通；库存、出入库及状态回写的实现方式不在本页确定。',
    ];
    return `<div class="p-quote-workbench mr-workbench">
      <section class="p-quote-process" aria-label="MR材料供给业务流程"><header><h2>MR／材料供给｜业务流程</h2><p>中单后的材料供给关系：1张MR可对应多个采购PO，按阶段采购、到货和施工。</p></header>
        <div class="mr-map" role="group" aria-label="最终成交报价中单后生成1张MR，可多采购PO并分阶段供料施工">
          <div class="mr-upstream">${link('flow','FLOW-P','上游：03-01 普通报价维修 ↗')}</div>${down}
          <div class="mr-node mr-origin"><strong>最终成交报价／中单</strong><small>报价员确认中单，承接成交材料需求</small></div>${down}
          <div class="mr-mr-row"><div class="mr-node mr-origin mr-primary"><strong>生成1张MR</strong></div><a class="mr-open-link" href="#mr-material-open"><strong>中单后材料变更</strong><span>OPEN／P0</span></a></div>${down}
          <div class="mr-supply"><h3>材料供给</h3><small>按实际需要产生多个采购PO</small><div class="mr-po-split" aria-hidden="true"></div><div class="mr-po-list"><div class="mr-node">采购PO-01</div><div class="mr-node">采购PO-02</div><div class="mr-node">采购PO-03…</div></div></div>${down}
          <div class="mr-node mr-origin"><strong>分阶段采购／到货</strong><small>不等全部PO材料到齐才安排施工</small></div>${down}
          <div class="mr-stage"><div class="mr-node">满足当前阶段施工需要</div><span aria-hidden="true">→</span><div class="mr-node">对应阶段施工</div></div>${down}
          <div class="mr-continuing">剩余材料继续采购／到货</div>
        </div><p class="p-quote-completion">阶段可供施工的确认岗位、凭据仍待C-04；MR本身的关闭条件未定，本页不画关闭节点。</p>
      </section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">依据10/26会议及Michael会后人工确认，非客户正式签批；材料供给流程仍PARTIAL。</p><ul>${conclusions.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="mr-material-open" tabindex="-1"><h3>B. 当前待确认</h3><div class="p-quote-open-heading"><strong>中单后材料变更怎么办？</strong><span>OPEN／P0</span></div><small>OPEN-10-26-01 · 既有C-13下的具体子问题</small><ul>${(U?.open.items||[]).map(t=>`<li>${esc(t)}？</li>`).join('')}</ul><p>未采购、已采购材料及变更审批责任同样尚未明确；没有选择改原单、重建MR或处理既有PO的方案。${link('question','OPEN-10-26-01','查看既有OPEN原记录 →')}</p><p class="p-quote-related-open">本次／本阶段材料由谁、在哪张单据确认可供施工，怎样将进度交给EC？${link('question','C-04','查看C-04 →')} MR关闭条件及系统衔接方式不由本页补齐。</p></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>上游流程</dt><dd>${link('flow','FLOW-P','03-01 普通报价维修 →')}</dd><dt>下游／关联</dt><dd>采购 · 仓库／材料供给 · 现场施工（只表达业务关系）</dd><dt>主要角色</dt><dd>报价员 · 采购 · 仓库 · 施工／师傅；阶段确认及变更审批职责待明确。</dd><dt>主要业务单据</dt><dd>最终成交报价 · MR · 采购PO</dd></dl></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>保留原FLOW-MR、节点、Fact、Decision、Source、REQ、PAGE及历史记录。原系统方案或旧齐料说法不作为已实现集成或全项目开工门槛；本页未修改任何底层业务记录。</p>${confirmationRef([11,12])}<p>${latestSourceLink('SOURCE-038／Michael会后确认')}　<a class="file-link" href="${encodeURI('../materials/听记纪要/會議錄製_ECInfo工单定版推进会议2026102603.md')}" target="_blank" rel="noopener">SOURCE-036／会议全文3 ↗</a></p><h4>原流程记录与全部追溯〔保留〕</h4>${flowRecordBody(f)}</details>
      </section>
    </div>`;
  }
  function tenderWorkbench(f) {
    // Tender display only: acquisition skeleton, not another fulfillment FLOW.
    const audits = [
      ['什么情况进入Tender？','PARTIAL','存在标书／投标取得项目；具体准入仍待核。1/30 P3写过“5万以上工程”，保留历史原话，不据此设当前金额门槛。','SOURCE-004 P3；CONFIRMED-016'],
      ['政府还是其他客户？','PARTIAL','Decision为“主要用于政府”，不是“仅政府”；其他客户的实际实例未找到。','CONFIRMED-016；SOURCE-033 CONFIRM-05'],
      ['谁创建／登记？','OPEN','有新建标书诉求，但没有已确认的唯一登记岗位及授权。','SOURCE-014 P4；C-03'],
      ['谁负责跟进？','PARTIAL','标书组跨部门组成且兼本职；中标后暂拟由标书组负责，用户明确要求客户核实。','SOURCE-029第17项；C-03／15'],
      ['相邻取得方式？','CONFIRMED','邀请报价、自主询价／报价、续保报价等来源已存在；PO直单当前适用性仍待核。','SOURCE-033；冻结02；SOURCE-038'],
      ['哪些核心信息有依据？','PARTIAL','负责人可非必填、日期／具体时间、投标状态及邀请报价关联已有诉求；完整字段、必填与映射未定。','SOURCE-014 P4／7／21／24；C-15'],
      ['截止／递交日期？','PARTIAL','原文要求具体时间、截止时间默认17:00；日期重命名表达需核对，不把投标日期与结果日期混用。','SOURCE-014 P4；C-15'],
      ['是否记录递交结果？','PARTIAL','“已投标”状态及回标骨架有依据；实际递交方式、回执和责任仍OPEN。','SOURCE-014 P6／7；CONFIRMED-016；C-15'],
      ['Tender结果有哪些？','CONFIRMED','工作副本明确待投标、已投标、已中标、未中标、已取消、不投标六种名称；合法转换未因此确认。','SOURCE-014 P7（明确诉求，非客户签批）'],
      ['中标后怎样进入业务？','PARTIAL','按内容进入P／M／M+P；人员、对象与单据交接仍待核，不直接接MR施工。','CONFIRMED-016；C-03／15'],
      ['是否重新判断P/M/M+P？','OPEN','按实际内容进入对应类型已明确；不等于必须中标后重新分类，也未禁止前期已记录类型。','CONFIRMED-011／016；C-02'],
      ['与普通报价的关系？','PARTIAL','Tender可产生报价，标书组可报价；不等于套用03-01全链或统一进CALL／SR公共池。','CONFIRMED-009；SOURCE-029第06项；10/26适用边界'],
      ['与邀请报价的关系？','PARTIAL','原文要求邀请报价关联／生成标书、两边可标中标；不是同义词，双对象同步与办理边界仍未定。','SOURCE-014 P21／24；SOURCE-033'],
      ['与合同的关系？','PARTIAL','合同编号＋客户名称是全局识别基础；Tender何时关联／建立合同、数量关系未明确。','CONFIRM-10-26-01～03；C-07／09／11'],
      ['是否涉及ECA/ECB？','PARTIAL','政府项目存在另列编号／分类；不是客户主键，不替代合同编号；Tender绑定时点未定。','CONFIRM-10-26-03；C-09'],
      ['未中标／取消怎样结束？','PARTIAL','存在未中标、取消、不投标结果；本次未取得业务。系统关闭、重开、资料留存及关联影响未明确。','SOURCE-014 P7；C-02／13／15'],
      ['原型有哪些偏差？','CONFLICT','自动分类把“维修”关键词归M，与P维修的分类语义有冲突；区域TL默认指派及中标自动改报价／通知开票无完整依据。','prototype/index.html：autoAssignTender／updateTenderStatus'],
      ['其他缺依据的规则？','OPEN','一期范围、正式回标、权限、双对象同步、无报价中标与手工MR关联、结束／重开及编号规则仍未定。','C-01／02／03／09／13／15；Q-018'],
    ];
    const proto = [
      ['Tender登记','PARTIAL','有新建／编辑、客户、金额、附件与类型选项；完整必填规则尚无确认。'],
      ['负责人','PARTIAL','owner非必填符合P4诉求；区域TL筛选／自动选首人仅为实现选择，不能视为标书组责任确认。'],
      ['截止／递交信息','PARTIAL','datetime-local截止时间默认17:00、submittedDate及resultDate；结果更新时补投标日期，不能证明真实递交。'],
      ['投标结果','PARTIAL','六种状态可选；转换限制、回执与关闭机制未验证为业务规则，导出入口被隐藏。'],
      ['中标后业务识别','CONFLICT','autoAssignTender按名称关键词选M/P，含“维修”即偏向M；不是已确认识别算法。'],
      ['P/M/M+P承接','PARTIAL','有tenderCategory；中标沿用关联报价或提示建报价，自动置中单并通知财务；未证明三类完整履约交接。'],
      ['ECA/ECB','NO EVIDENCE','客户／工单代码存在政府前缀；本次未发现Tender专属绑定时点或合同编号映射闭环。'],
    ];
    const src=(path,label)=>`<a class="file-link" href="${encodeURI('../'+path)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
    return `<div class="p-quote-workbench tender-workbench">
      <section class="p-quote-process" aria-label="Tender办理业务流程"><header><h2>Tender办理｜业务流程</h2><p>商务取得方式，不是第四类核心业务。当前PARTIAL；仅展示有依据的主干，办理细则仍待确认。</p></header>
        <div class="tender-map" role="group" aria-label="Tender取得结果，中标后按内容引用P、M或M+P履约">
          <div class="tender-node">Tender机会／标书</div><span class="tender-down" aria-hidden="true">↓</span><div class="tender-node">报价／回标办理<small>办理责任、正式递交及回执待确认</small></div><span class="tender-down" aria-hidden="true">↓</span><div class="tender-node">商务取得结果</div>
          <div class="tender-branches"><section><span class="tender-down">↓</span><strong>未中标／取消／不投标</strong><div class="tender-node">本次未取得业务<small>关闭及关联处理规则待核</small></div></section><section><span class="tender-down">↓</span><strong>中标</strong><div class="tender-node">按实际内容识别／衔接<small>不预设必须重新分类；交接细则OPEN</small></div><span class="tender-down">↓</span><div class="tender-refs">${link('flow','FLOW-P','P → 对应维修流程')}${link('flow','FLOW-M','M → 03-04')}<button class="inline-link" data-view="flows" data-sub="structure:mp">M+P → 03-05</button></div></section></div>
        </div><p class="tender-boundary">P链接为已有普通报价路径参考，不代表所有中标项目都走03-01。<a href="#tender-open">查看未决边界 ↓</a></p>
      </section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">来源身份分开：已确认Decision、用户说明、客户沟通工作副本诉求；均不等于本次客户正式签批。</p><ul><li>Tender属于业务取得方式；核心业务仍为P／M／M+P。〔SOURCE-033〕</li><li>Tender主要用于政府项目；中标后按业务内容进入M、P或M+P。〔CONFIRMED-016〕</li><li>Tender是报价来源之一；标书组可以制作标书报价。〔CONFIRMED-009；SOURCE-029第06项用户说明〕</li><li>0928工作副本要求负责人非必填、具体截止时间默认17:00、六种投标状态；状态转换与完整字段映射未定。〔SOURCE-014 P4／6／7〕</li><li>邀请报价有关联／生成标书及中标标记诉求；两者不作为同义词。〔SOURCE-014 P21／24〕</li><li>政府ECA／ECB等编号或分类另列；不能取代合同编号＋客户名称的业务识别基础。〔10/26人工确认〕</li></ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="tender-open" tabindex="-1"><h3>B. 当前待确认</h3><p>正式回标、日期字段映射、邀请报价／标书同步与中标后交接：${link('question','C-15','C-15 →')} ${link('question','C-03','岗位授权 →')}；政府编号及合同绑定：${link('question','C-09','C-09 →')}；入口／终态与无报价中标关联：${link('question','C-02','C-02 →')}。一期范围仍见${link('question','C-01','C-01 →')}，未新建或关闭问题。</p><p>历史1/30原文有“5万以上工程”及“中标后新单号”描述；现行适用范围／编号尚未核定，保留追溯，不转成统一准入算法。标书组履约责任是用户候选，待客户核实。</p><details class="tender-audit"><summary>18项事实审查：已知、未决与差异</summary>${audits.map(([q,status,a,source],i)=>`<section data-tender-check="${i+1}"><h4>${String(i+1).padStart(2,'0')} ${esc(q)} ${statusBadge(status)}</h4><p>${esc(a)}</p><small>${esc(source)}</small></section>`).join('')}</details></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>角色边界</dt><dd>标书组（可报价，跨部门兼本职）；登记授权、中标后责任及履约交接待确认。</dd><dt>关联页面</dt><dd><button class="inline-link" data-view="overview">02业务全景 →</button>${link('flow','FLOW-P','03-01 普通报价维修（参考）→')}${link('flow','FLOW-M','03-04 合同周期保养 →')}<button class="inline-link" data-view="flows" data-sub="structure:mp">03-05 M+P →</button><button class="inline-link" data-view="flows" data-sub="structure:sources">其他商务取得方式 →</button></dd></dl><details class="tender-audit"><summary>Prototype映射差异〔只读代码核对，非业务确认〕</summary><div class="table-wrap"><table><thead><tr><th>能力</th><th>状态</th><th>当前实现／边界</th></tr></thead><tbody>${proto.map(([a,b,c])=>`<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}</tbody></table></div></details></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>原FLOW-TENDER、节点、Fact、Decision、REQ、PAGE及历史记录原样保留；旧“Government”名称和节点不代表仅限政府或当前整链已确认。</p><p>${src('materials/溝通筆記/ec+cs+報價組+會計0928.docx','SOURCE-014／P4、6、7、10、21、24原文')}　${src('materials/听记纪要/纪要_ECInfo-dingtalk項目溝通和demo演示20260130.pdf','SOURCE-004／P3历史标书、门槛及编号描述')}　${src('docs/knowledge/03-business/BUSINESS-CLARIFICATIONS-20261016.md','SOURCE-029／第06、07、17项用户说明')}　${src('docs/knowledge/decisions/DEC-20261025-业务模型确认.md','SOURCE-033／取得方式')}</p>${confirmationRef([1,2,3])}<p>${latestSourceLink()}　${src('prototype/index.html','Prototype源码（仅设计参照）')}</p><p>原型核对位置：openTenderModal、autoAssignTender、updateTenderStatus、createQuotationFromTender；未将实现选择升级为业务结论。</p>${flowRecordBody(f)}</details>
      </section></div>`;
  }
  function financeWorkbench(f) {
    // FLOW-FINANCE projection only. No invoice/payment operations or new business policy.
    const audit=[
      ['什么状态进入财务？','PARTIAL','存在资料核对、待开票／欠文件诉求；不是主管完工后的统一后置审批。各业务进入条件及交接责任未齐。','SOURCE-014 P33；CONFIRM-10-26-20'],
      ['必须业务完成后才能开票？','OPEN','普通资料齐备要求与特殊开票诉求均存在；没有全部业务都必须整项完成后开票的统一结论。','SOURCE-014 P33／34；C-03／08'],
      ['未完全完成但已开票？','NO EVIDENCE','本次未找到足够明确的当前业务实例；特殊开票不直接等于允许未完成开票，原型周期账单也不是事实。','SOURCE-014 P34；C-03／14'],
      ['谁发起开票？','PARTIAL','会计部开票有原始描述；工单系统中的申请、审批及特殊授权岗位未完整确认。','SOURCE-004 P4；C-03'],
      ['开票依据什么资料？','PARTIAL','0928列完工纸、照片、客户确认PO；1/30列报价、员工纸、员工相。各业务适用清单与例外仍待核，不能合并为全业务必备包。','SOURCE-014 P33；SOURCE-004 P4；C-08'],
      ['财务需要看什么？','PARTIAL','履约结果、关联报价及相关凭据有依据；完整可见字段、清单、交接和补件责任未定。','CONFIRMED-017；SOURCE-014 P33／38；C-03／08'],
      ['收款怎样记录？','PARTIAL','收款应与业务完成、开票分别跟踪；登记人、字段、权限及账务操作未确认。','CONFIRM-10-26-20；C-06'],
      ['是否允许部分收款？','OPEN','已有部分收款及分配未决主题，没有已选择的处理方案。','C-14'],
      ['是否存在分次收款？','OPEN','分次登记、分配与核销规则未明确；不能从部分收款主题推出完整分次收款制度。','C-06／14'],
      ['M+P金额怎样对应M/P？','OPEN','组合分类与分别履约已明确；金额拆分、单据、票款对应仍未决。','SOURCE-033；C-14'],
      ['折扣怎样处理？','PARTIAL','需要discount已明确，金额还是百分比及组合分摊未确认。','SOURCE-015 P2；C-14'],
      ['冲销怎样处理？','OPEN','冲销／分配及取消、更正对票款的影响未决，没有自动核销或冲销规则。','C-13／14'],
      ['即时维修现场款怎样登记？','PARTIAL','后补报价前已完成现场收款；登记操作及权限仍未决，报价组补记录不等于财务入账。','SOURCE-039；C-06'],
      ['现场款怎样交公司？','OPEN','未确认接款岗位、交款时间、凭据与交接方式。','PENDING-001；C-06'],
      ['怎样对账？','OPEN','对账责任、核对依据、差异及异常处理未确认。','PENDING-001；C-06／14'],
      ['发票关联哪个对象？','PARTIAL','正常发票主要关联报价；描述需合同编号、PO、PM period。并不定义唯一外键或全业务对象基数。','CONFIRMED-017；SOURCE-014 P38'],
      ['收款关联哪个对象？','PARTIAL','正常收款主要关联报价业务；如何对应发票、合同、工单及部分款项未完整确认。','CONFIRMED-017；C-06／14'],
      ['CP/SR/PO/报价哪些交财务？','PARTIAL','有CP、照片、客户确认PO及历史报价／员工纸／照片依据；SR按上游业务保留，不据此指定全部财务必需件。客户PO不等同采购PO。','SOURCE-014 P33；SOURCE-004 P4；C-08'],
      ['车资／费用怎样进资料？','PARTIAL','费用关联工作工单，可在SR／CP现场填并后补改，Taxi必须收据；报销、入账、财务交接和其他交通收据规则未定。','CONFIRM-10-26-19；C-06／08／13'],
      ['财务影响P/M/M+P完成吗？','CONFIRMED','业务、开票、收款独立；不以票款作为统一完工条件或反向阻止主管确认。M／M+P整体完成本身仍有未决。','CONFIRMED-017；CONFIRM-10-26-20；SOURCE-033'],
    ];
    const proto=[
      ['业务完成状态','PARTIAL','工单有完成与主管确认；requiresCompletionPaper把成交M/P/M+P一律用CP，与M每次SR范围不符。'],
      ['开票状态','PARTIAL','有发票、普通待开票与合同周期账单；+30天到期默认与0928两日期默认当天不符。'],
      ['收款状态','PARTIAL','markAsPaid按发票全额建收款记录；不是已经确认的全额／核销政策。'],
      ['三者是否独立','CONFLICT','工单状态、发票和收款记录分开存在，但invoice.status从已开具改成已收款，票款语义混用；不能认作三套状态闭环。'],
      ['财务资料交接','PARTIAL','getQuotationMissingDocs有CP／PO／照片检查；照片以任意附件判断，免拍及全业务CP门槛没有完整适用确认。'],
      ['现场收款','PARTIAL','通用登记要求先选已开具发票；未见与03-02已现场收款的专属登记闭环，存在重复登记／收款风险，不认定已发生重复收款。'],
      ['部分／分次收款','MISSING','当前markAsPaid金额只读、按整张发票金额登记并标已收款；未见该入口部分／分次余额处理。'],
      ['M+P金额关系','NO EVIDENCE','未找到已核定的M/P组合金额映射；现有金额实现不能替代C-14业务决定。'],
      ['车资／收据','PARTIAL','SR／CP有transportFee，部分文案供HR报销；未证明Taxi收据与财务交接、后补明细闭环。'],
    ];
    const src=(path,label)=>`<a class="file-link" href="${encodeURI('../'+path)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
    return `<div class="p-quote-workbench finance-workbench">
      <section class="p-quote-process" aria-label="财务处理业务关系"><header><h2>财务处理｜业务关系</h2><p>公共子流程，当前PARTIAL。展示已知关系，不定义完整财务审批流。</p></header>
        <div class="finance-map" role="group" aria-label="业务资料交接与业务、开票、收款三套独立状态">
          <div class="finance-handoff"><div>业务履约结果／已有业务资料</div><span aria-hidden="true">→</span><div>财务资料交接／核对<small>具体清单、岗位及例外待确认</small></div></div>
          <h3>三套状态分别记录</h3><div class="finance-states"><section><h4>业务状态</h4><p>P完成由主管确认；M单次工单与整体完成区分。</p><small>M／M+P整体结束规则仍待确认</small></section><section><h4>开票状态</h4><p>独立记录。</p><small>开票条件、资料例外与授权待确认</small></section><section><h4>收款状态</h4><p>独立记录。</p><small>登记、交款、对账及权限待确认</small></section></div>
          <strong class="finance-principle">业务完成 ≠ 已开票 ≠ 已收款</strong><p class="finance-map-note">不是固定顺序，不规定必须先整项完工才能开票，也不以票款反向阻止业务完成。</p>
        </div><p class="finance-instant">${link('flow','FLOW-INSTANT','03-02即时维修 →')} 已现场收款 → 报价组补报价记录；不再次收款。登记／交款／对账仍${link('question','C-06','待C-06确认 →')}。</p>
      </section>
      <section class="p-quote-knowledge" aria-label="相关事实与结论"><h2>相关事实与结论</h2>
        <section class="p-quote-fact-group" data-quote-group="a"><h3>A. 已确认业务结论</h3><p class="p-quote-authority">已确认Decision、Michael人工确认与客户沟通工作副本分开标识；不提升为客户正式签批。</p><ul><li>业务完成与开票、收款独立，票款状态分别跟踪，不用收款阻止工单或业务完成。〔CONFIRMED-017；10/26-20〕</li><li>正常发票和收款主要关联报价业务；这不是全业务唯一关联模型。〔CONFIRMED-017〕</li><li>0928提出CP、照片、客户确认PO齐备才待开票，否则欠文件；特殊开票、低额开票需要原因。各业务适用及授权仍待确认。〔SOURCE-014 P33／34／39〕</li><li>即时维修后补报价前已完成现场收款；报价组补记录不再接受、中单或收款，已收款不等于已开票。〔SOURCE-039〕</li><li>车资关联工作工单，可在SR／CP填写并后补明细；Taxi必须收据，不扩为所有交通方式。〔CONFIRM-10-26-19〕</li><li>M+P分别引用M／P履约，整体结束仍OPEN；不从票款推导整单业务完成。〔SOURCE-033；现有03-05边界〕</li></ul></section>
        <section class="p-quote-fact-group" data-quote-group="b" id="finance-open" tabindex="-1"><h3>B. 当前待确认</h3><ul><li>现场款登记、交款、对账和权限：${link('question','C-06','C-06 →')} ${link('decision','PENDING-001','原Pending →')}</li><li>各业务资料清单、补件与交付：${link('question','C-08','C-08 →')}；特殊开票授权：${link('question','C-03','C-03 →')}。</li><li>M+P金额、折扣、部分／分次款及冲销：${link('question','C-14','C-14 →')}；重开／变更对票款影响：${link('question','C-13','C-13 →')}。</li></ul><p>1/30原记录由采购部专人整理报价／员工纸／员工相交会计；现行资料交接责任和0928客户PO等适用清单尚未统一。保留两处依据，不擅自选择统一责任人或必备资料包。</p><details class="finance-audit"><summary>20项事实审查：已知与未决</summary>${audit.map(([q,status,a,source],i)=>`<section data-finance-check="${i+1}"><h4>${String(i+1).padStart(2,'0')} ${esc(q)} ${statusBadge(status)}</h4><p>${esc(a)}</p><small>${esc(source)}</small></section>`).join('')}</details></section>
        <section class="p-quote-fact-group" data-quote-group="c"><h3>C. 关联信息</h3><dl class="p-quote-related"><dt>角色边界</dt><dd>主管确认业务结果；财务独立跟踪票款；师傅涉及现场资料／款项，报价组涉及即时维修后补记录。交款接收、资料交接及例外批准岗位未定。</dd><dt>资料边界</dt><dd>CP／照片／客户确认PO、历史报价及员工纸相片有依据；合同／客户识别、SR、现场款和费用资料按业务关联，完整财务清单待核。</dd><dt>关联流程</dt><dd>${link('flow','FLOW-P','03-01 普通报价维修 →')}${link('flow','FLOW-INSTANT','03-02 即时维修 →')}${link('flow','FLOW-M','03-04 合同周期保养 →')}<button class="inline-link" data-view="flows" data-sub="structure:mp">03-05 M+P →</button></dd></dl><details class="finance-audit"><summary>Prototype差异〔只读代码审查〕</summary><div class="table-wrap"><table><thead><tr><th>能力</th><th>状态</th><th>当前实现及边界</th></tr></thead><tbody>${proto.map(([a,b,c])=>`<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}</tbody></table></div></details></section>
        <details class="p-quote-fact-group p-quote-evidence" data-quote-group="d"><summary>D. 证据与追溯</summary><p>保留原FLOW-FINANCE、FIN节点、Fact、Decision、REQ、PAGE与历史记录；原四节点顺序不代表所有业务必须同序或主管完工后自动开票收款。</p>${confirmationRef([15,16,19,20])}<p>${latestSourceLink()}　${src('docs/knowledge/decisions/DEC-20261026-客户业务确认补充.md#instant-followup-20261027','SOURCE-039／即时维修已答与未答边界')}　${src('materials/溝通筆記/ec+cs+報價組+會計0928.docx','SOURCE-014／P33～39会计原文')}　${src('materials/溝通筆記/ec原型+倉庫+cr0930.docx','SOURCE-015／P2折扣诉求')}　${src('materials/听记纪要/纪要_ECInfo-dingtalk項目溝通和demo演示20260130.pdf','SOURCE-004／P4历史资料交接')}　${src('prototype/index.html','Prototype源码（仅设计参照）')}</p><p>原型核对：requiresCompletionPaper、getFinancePendingQuotations、getQuotationMissingDocs、generateContractBillingItems、createInvoice、markAsPaid。未操作原型、未验证实际账务或外部同步。</p>${flowRecordBody(f)}</details>
      </section></div>`;
  }
  function flowsView() {
    const structure = state.sub.startsWith('structure:') ? state.sub.slice(10) : '';
    const f = structure ? null : findFlowBySub() || maps.flows.get('FLOW-P');
    const selected = structure ? 'structure:' + structure : f?.id || '';
    const header = `<header class="flows-page-header"><p>本页按冻结02业务模型组织具体业务流程；跨业务关系通过引用连接，不重复维护相同履约链。</p><div><button class="inline-link" data-kind="current-business-overview">最新版00 →</button><button class="inline-link" data-view="overview">02业务全景 →</button></div></header>`;
    let body;
    if (structure) body = structure === 'call' ? callWorkbench() : structure === 'mp' ? combinationWorkbench() : flowStructureView(structure);
    else if (f) { state.flow = f.id; body = f.id === 'FLOW-P' ? ordinaryQuoteWorkbench(f) : f.id === 'FLOW-INSTANT' ? instantRepairWorkbench(f) : f.id === 'FLOW-CM' ? emergencyRepairWorkbench(f) : f.id === 'FLOW-M' ? maintenanceWorkbench(f) : f.id === 'FLOW-MR' ? materialSupplyWorkbench(f) : f.id === 'FLOW-TENDER' ? tenderWorkbench(f) : f.id === 'FLOW-FINANCE' ? financeWorkbench(f) : flowRelationNotice(f) + flowRecordBody(f); }
    return `<div class="view flows-workspace">${header}<div class="flows-layout">${flowSideDirectory(selected)}<div class="flows-detail">${body}</div></div></div>`;
  }
  function flowRecordBody(f) {
    const original = f;
    f = displayFlow(f);
    const reqs = D.requirements.filter(r => r.flowIds.includes(f.id));
    const questionItems = activeQuestions.filter(q => q.flowIds?.includes(f.id));
    const source = [...new Set([...f.sourceFileIds, ...f.decisionIds.flatMap(id => maps.decisions.get(id)?.sourceFileIds || [])])];
    const prd = [...new Set(reqs.flatMap(r => r.prdFileIds))];
    const pageIds = [...new Set(reqs.flatMap(r => r.pageIds))];
    return `<div class="flows-record">${panel('现有流程记录 · ' + flowDisplayName(f), `<div class="flow-meta"><div><strong>业务目的</strong><p>${esc(f.purpose)}</p></div><div><strong>触发条件</strong><p>${esc(f.trigger)}</p></div><div><strong>事实状态</strong><p>${statusBadge(f.factStatus)}</p></div></div>${f!==original?`<p class="sync-inline-note">按10/26人工确认修正当前展示，整体仍PARTIAL；下列处理标签不是批准的完整状态字典。${latestSourceLink()}</p>${['FLOW-P','FLOW-M','FLOW-INSTANT'].includes(f.id)?`<p class="sync-inline-note">现场任务：合同编号、客户名称、地址、联系人／电话、工作内容；特殊要求写工作内容。车资关联本次工单，可在SR／CP现场填写、后续补改；Taxi必须收据，其他交通未确认同样要求。</p>`:''}`:''}<p class="flow-instruction">按角色 → 动作 → 状态 → 下一角色阅读。点击节点可查看当前确认依据及原历史记录。</p>${f.id === 'FLOW-FINANCE' ? financeConfirmationUnits(f) : flowNodes(f)}`, f.summary)}
      <div class="detail-columns">${panel('参与角色与关键阶段', `<h3>参与角色</h3><div class="tag-wrap">${f.roles.map(role => `<span class="chip">${esc(role)}</span>`).join('')}</div><h3>阶段描述${f!==original?'（非批准状态字典）':''}</h3><div class="tag-wrap">${f.keyStates.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>`)}${panel('业务依据与待确认', `${f!==original?`<h3>当前10/26人工确认</h3>${confirmationRef([...new Set(f.nodes.flatMap(n=>n.confirmationIds||[]))])}<p class="sub">下面保留旧Fact／Decision，不自动覆盖最新确认或关闭冲突。</p>`:''}<h3>原Fact</h3>${refs('fact', f.factIds)}<h3>原Decision</h3><div class="ref-stack">${f.decisionIds.map(id => { const d = maps.decisions.get(id); return `<div>${link('decision', id)} ${esc(d?.title || '')}</div>` }).join('')}</div><h3>Open Question</h3>${questionItems.length ? questionsList(questionItems) : '<span class="empty-ref">当前场景无单独登记问题；通用问题见事实库</span>'}${f.openDecisionIds.length ? refs('decision', f.openDecisionIds) : ''}`)}</div>
      <div class="detail-columns">${panel('关联事实来源', (f!==original?`<p>${latestSourceLink('SOURCE-038／Michael会后人工确认')}</p><p class="sub">原始三份全文与三份AI纪要可从该文件或A证据页追溯；下方为原历史来源。</p>`:'')+fileRefList(source))}${panel('关联需求与设计', `<h3>功能需求 ${reqs.length}</h3>${refs('requirement', reqs.map(r => r.id))}<h3>PRD</h3>${fileRefList(prd)}<h3>原型页面</h3>${refs('page', pageIds)}<p class="sub">关联只表示可追溯的主题对应；原型行为是否对齐当前决策仍待核验。</p>`)}</div>
      ${f!==original?`<details class="flows-record-history"><summary>10/26修正前的完整流程记录与节点〔历史〕</summary><p>保留旧FLOW／节点及追溯，不以历史岗位、全料门槛或旧状态标签覆盖本次人工确认。</p><p>${esc(original.summary)}</p>${flowNodes(original)}</details>`:''}<details class="flows-record-history"><summary>历史业务核对记录</summary>${clarificationPanel()}</details>
    </div>`;
  }
  function reqTable(list) { return `<div class="table-wrap"><table><thead><tr><th>REQ</th><th>功能需求</th><th>模块</th><th>状态</th><th>流程</th><th>PRD / 原型</th></tr></thead><tbody>${list.map(r => `<tr><td>${link('requirement', r.id, r.id + ' / ' + r.legacyId)}</td><td>${esc(r.title)}</td><td>${esc(r.module)}</td><td>${statusBadge(r.status)}</td><td>${refs('flow', r.flowIds)}</td><td>${r.prdFileIds.length ? 'PRD ' + r.prdFileIds.length : 'UNLINKED PRD'} · ${r.pages.length ? 'PAGE ' + r.pages.length : 'UNLINKED PROTOTYPE'}</td></tr>`).join('')}</tbody></table></div>`; }
  function designView() {
    const sub = state.sub || '功能清单';
    const toolbar = `<div class="toolbar"><select id="module-filter"><option value="">全部模块</option>${D.moduleNames.map(m => `<option value="${esc(m)}" ${state.module === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select><span class="sub">需求状态 OPEN 表示原确认栏仍待确认</span></div>`;
    if (sub === '功能清单') return `<div class="view">${U?'<p class="sync-inline-note">原型确认仍阻塞；以下为历史功能关联，原型需按10/26事实重新审查。本轮未改原型，历史检查不代表整链通过。</p>':''}${panel('功能清单', `${toolbar}${reqTable(D.requirements.filter(r => !state.module || r.module === state.module))}`, '80 项历史功能需求，保留原 REQ/F 编号与原确认状态')}</div>`;
    const kind = sub === 'Testing' ? 'Testing' : sub;
    const fs = D.files.filter(f => f.category === kind);
    const overview = D.deliverables.find(d => d.kind === kind);
    return `<div class="view">${U && kind === 'Prototype' ? '<p class="sync-inline-note">原型确认仍阻塞；原型需按10/26事实重新审查。本轮未修改原型，也没有整链测试通过记录。</p>' : ''}${panel(kind, `<div class="coverage-intro">${statusBadge(overview.status, true)} <span>${fs.length} 个文件 · ${esc(overview.note)}</span></div>${fs.length ? `<div class="artifact-list">${fs.map(f => `<div>${link('file', f.id, f.name)}<small class="path">${esc(f.projectPath)}</small><span>${statusBadge(f.deliveryStatus, true)}</span></div>`).join('')}</div>` : '<div class="missing-box">MISSING：项目中未识别到正式对应文件。</div>'}`, '资料存在、范围覆盖与验收状态独立记录')}
      ${kind === 'Prototype' ? panel('原型整改与回归', `<p>历史回归记录 ${D.prototypeRegression?.passed || 0}/${D.prototypeRegression?.total || 0}；本轮没有复测全链，不计当前PASS。10/12入口复核和16个UAT草案见本批资料。</p>${fileRefList([fileIdByPath('docs/review/prototype-remediation/REMEDIATION-RESULT.md'),fileIdByPath('docs/review/prototype-remediation/evidence/regression-results.json')].filter(Boolean))}`) + panel('原型页面地图', `<div class="page-grid">${D.pages.map(p => `<button data-kind="page" data-id="${p.id}"><strong>${esc(p.id)} · ${esc(p.name)}</strong><small>${esc(p.key)} · ${p.requirementIds.length} 条需求</small></button>`).join('')}</div>`, '点击页面可反查 REQ → Flow → Decision → Fact → Source') : ''}
      ${panel('模块主题关联', `<div class="module-grid">${D.moduleNames.map(m => { const items = D.requirements.filter(r => r.module === m); const linked = items.filter(r => r.flowIds.length).length; return `<button class="module-card" data-view="design" data-sub="功能清单" data-module="${esc(m)}"><h3>${esc(m)}</h3><p>${linked}/${items.length} 需求已关联当前场景</p>${statusBadge(linked === items.length ? 'PARTIAL' : 'DRAFT', true)}</button>` }).join('')}</div>`, '仅统计知识关联，不代表功能实现')}</div>`;
  }
  // 04 V1 only. Business facts and legacy REQs are read-only references, never rewritten here.
  function requirementV1Badge(value) { return `<span class="req-v1-badge" data-maturity="${esc(value)}">${esc(value)}</span>`; }
  function requirementV1Table(headers, rows) {
    return `<div class="table-wrap req-v1-table"><table><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function requirementV1Basis(numbers) {
    return `<span class="req-v1-basis">${numbers.map(n=>`<a href="${encodeURI('../'+U.sourcePath)}#confirm-10-26-${String(n).padStart(2,'0')}" target="_blank" rel="noopener">10/26-${String(n).padStart(2,'0')}</a>`).join(' · ')}</span>`;
  }
  function requirementV1Questions(ids) { return ids.map(id=>link('question',id)).join(' · '); }
  function requirementV1Section(title, body, id='') { return `<section class="panel req-v1-section"${id?` id="${esc(id)}"`:''}><h3>${esc(title)}</h3>${body}</section>`; }
  function requirementV1Overview(R) {
    const c=R.projectContext;
    return `<h2>需求总览</h2><p class="req-v1-lead">当前阶段：业务流程确认阶段</p>
      <p class="req-v1-boundary">维修整链未正式通过 · ${esc(c.frozenBatches)}批业务正式定稿 · ${esc(c.scopeApproval)}。04 V1已启动，当前需求域及评审状态见下方。</p>
      <p class="req-v1-review">${esc(R.workReview.reviewLabel)}：${esc(R.workReview.currentDomain)}。需求样板评审中，不是客户签批；Prototype尚未整改。</p>
      <div class="req-v1-legend">${Object.entries(R.maturityLegend).map(([k,v])=>`<span>${requirementV1Badge(k)} ${esc(v)}</span>`).join('')}</div>
      ${requirementV1Section('当前需求域',requirementV1Table(['需求域','成熟度','本轮落地'],R.pages.filter(p=>p.id!=='00').map(p=>[
        `<button class="inline-link" data-view="requirements" data-sub="v1:${p.id}">04-${p.id} ${esc(p.title)}</button>`,requirementV1Badge(p.maturity),esc(p.note)])))}
      <p class="req-v1-blocked">${requirementV1Badge('BLOCKED')} ${requirementV1Questions(['C-04'])}：阶段材料确认及施工交接暂不定稿；不阻塞客户／合同、CALL等已明确需求整理。</p>
      <p class="req-v1-links"><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">04 V1需求维护源 ↗</a><a href="../docs/review/project-work/WORK-REGISTER.json" target="_blank" rel="noopener">内部工作记录 ↗</a><button class="inline-link" data-view="requirements" data-sub="legacy">历史REQ／需求追溯（119条） →</button></p>`;
  }
  function requirementV1Objects(R) {
    return `<h2>核心对象与关系</h2><p class="req-v1-boundary">只表达已有依据的逻辑关系，不决定数据库表、技术ID或全表外键。</p>
      <div class="req-v1-relations">${R.objectModel.relations.map(r=>`<div class="req-v1-relation"><strong>${esc(r.from)}</strong><span><b>${esc(r.cardinality)}</b></span><strong>${esc(r.to)}</strong><p>${esc(r.meaning)} ${requirementV1Basis(r.basis)}</p></div>`).join('')}</div>
      ${requirementV1Section('识别原则',`<ul>${R.objectModel.principles.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`)}
      ${requirementV1Section('其他已有关系与未决边界',requirementV1Table(['关系','已有依据','OPEN'],R.objectModel.otherRelations.map(r=>[esc(r.relation),esc(r.known)+'<br>'+requirementV1Basis(r.basis),esc(r.open)])))}
      <button class="inline-link" data-view="requirements" data-sub="v1:03">查看04-03客户与合同识别需求 →</button>`;
  }
  function requirementV1States(R) {
    const S=R.stateAndPermission;
    return `<h2>状态与权限</h2><p class="req-v1-boundary">本轮只建立框架，不定义完整状态枚举，不编写其他业务域需求。</p>
      ${requirementV1Section('状态边界',`<ul>${S.principles.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><div class="req-v1-object-list">${S.objects.map(o=>`<span>${esc(o)}</span>`).join('')}</div><p class="sub">以上对象分别定义状态；旧REQ-001的七状态不是V1基线。${requirementV1Questions(['C-02','C-04'])}</p>`)}
      ${requirementV1Section('权限结构：对象 × 角色 × 动作 × 数据范围',requirementV1Table(['对象','角色／动作','数据范围','依据／OPEN'],S.permissions.map(p=>[esc(p.object),esc(p.role)+'<br>'+esc(p.action),esc(p.scope),esc(p.status)+'<br>'+(p.basis.length?requirementV1Basis(p.basis):requirementV1Questions(['C-03']))])))}
      <p class="sub">${esc(S.boundary)}</p>`;
  }
  function requirementV1Customer(R) {
    const C=R.customerContract;
    const evidence=R.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    return `<h2>客户与合同识别</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)}；不是客户正式签批，也不是原型规则批准。</p><div class="req-v1-links"><button class="inline-link" data-view="flows" data-sub="structure:call">03-06 CALL当前业务基线 →</button><button class="inline-link" data-view="overview">02业务全景 →</button><button class="inline-link" data-kind="current-business-overview">最新版00 →</button></div><details class="req-v1-evidence"><summary>原始沟通、Decision及适用边界</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',requirementV1Table(['行为','角色／前置','系统结果','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result),requirementV1Basis(b.basis)+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">A～F是04-03内部行为单元，不创建新的全局REQ编号。对象关系改变不等于新增维护岗位授权。</p>')}
      ${requirementV1Section('④ 规则、字段与权限',requirementV1Table(['对象／字段','含义及要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>动作授权</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)])))}
      ${requirementV1Section('⑤ 当前OPEN与范围边界',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}</article>`).join('')}</div><p class="sub">C-04只阻塞阶段材料交接，不阻塞本页。完整政府枚举、维护授权及后续任务自动建立不在本轮定案。</p>`)}
      ${requirementV1Section('⑥ Prototype映射与验收',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['能力','只读映射结果','对应行为／验收'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">以下仅完成需求定义，全部待执行。未整改Prototype、未进行产品验收。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div>
        <h4>旧REQ → 当前表达</h4><p class="sub">旧119条数据及状态不改。本页维护当前表达，下列仅为追溯；旧REQ其他范围没有被全部迁移或批准。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
          link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
        ]))+`<p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1Call(R) {
    const C=R.callIntake;
    const evidence=R.sources.filter(s=>['SOURCE-038','SOURCE-035','BASELINE','OPEN'].includes(s.id)).map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(C.sourceHints[s.id]||s.locator||'')}</small></div>`).join('');
    return `<h2>CALL受理与分流</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同搜索与业务上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)} 及03-06业务基线；不是客户正式签批。</p><div class="req-v1-links"><button class="inline-link" data-view="flows" data-sub="structure:call">03-06 CALL受理与分流 →</button><button class="inline-link" data-view="overview">02业务全景 →</button><button class="inline-link" data-view="requirements" data-sub="v1:01">04-01对象关系 →</button><button class="inline-link" data-view="requirements" data-sub="v1:02">04-02状态与权限 →</button></div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 规则与数据',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>业务节点与方向，不是状态枚举</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ 未决与异常',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN；不新增重复CALL自动识别，不默认创建任务，不定义关闭／重开方案。C-04材料交接不阻塞本页受理与接口需求整理。</p>`)}
      ${requirementV1Section('⑥ Prototype映射与验收',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">全部待执行。AC-CALL-06只验追溯接口；具体任务创建及完整关闭规则仍OPEN，未伪造通过条件。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前CALL需求</h4><p class="sub">保留旧编号、来源和原始状态。本页仅承接CALL相关范围，搜索与客户合同规则引用04-03，未迁移全部119条。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):id.startsWith('04-03-')?`<button class="inline-link" data-view="requirements" data-sub="v1:03">${esc(id)} →</button>`:esc(id)).join(' · '),esc(m.note)
      ]))+`<p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1Quotation(R) {
    const C=R.quotation;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    return `<h2>报价、版本与中单</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同搜索与业务上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)} ；即时维修后补适用 <a href="${encodeURI('../'+U.sourcePath)}#instant-followup-20261027" target="_blank" rel="noopener">SOURCE-039／10/27确认</a>。不是客户正式签批。</p><div class="req-v1-links"><button class="inline-link" data-kind="flow" data-id="FLOW-P">03-01普通报价维修 →</button><button class="inline-link" data-kind="flow" data-id="FLOW-INSTANT">03-02即时维修 →</button><button class="inline-link" data-view="flows" data-sub="structure:call">03-06 CALL来源 →</button><button class="inline-link" data-view="requirements" data-sub="v1:04">04-04 CALL接口 →</button><button class="inline-link" data-view="overview">02业务全景 →</button><button class="inline-link" data-view="requirements" data-sub="v1:01">04-01对象关系 →</button><button class="inline-link" data-view="requirements" data-sub="v1:02">04-02状态与权限 →</button></div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>'+`<h4>普通报价 vs 即时维修后补报价</h4>`+requirementV1Table(['路径','进入前提','本页处理','输出','边界'],C.pathComparison.map(p=>[esc(p.path),esc(p.entry),esc(p.handling),esc(p.output),esc(p.boundary)])))}
      ${requirementV1Section('④ 规则与数据',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>业务节点与版本，不是完整状态机</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ 未决与异常',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}${o.ids.includes('C-13')?' · '+link('question','OPEN-10-26-01','OPEN-10-26-01／P0 →'):''}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN；成交后变化不采用改原单、重建或自动同步等任何候选。C-04只限制阶段材料交接，不阻塞本页正常成交输出接口。</p>`)}
      ${requirementV1Section('⑥ Prototype映射与验收',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">AC-QUOTE-01～08全部待执行。AC-QUOTE-07只验后补不重复成交／收款边界；具体补录操作仍C-06。AC-QUOTE-08只验未知变更能力不自动执行，不能替代变更流程确认。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前报价需求</h4><p class="sub">保留旧编号、来源和原始状态。本页仅承接报价相关范围；历史金额、签章及邀请报价诉求不因关联而全部批准，未迁移全部119条。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):id.startsWith('04-03-')?`<button class="inline-link" data-view="requirements" data-sub="v1:03">${esc(id)} →</button>`:esc(id)).join(' · '),esc(m.note)
      ]))+`<p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1P(R) {
    const C=R.pFulfillment;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    const flowRow=(rows,key)=>`<div class="req-p-flow-row" data-p-flow-row="${key}">${rows.map((n,i)=>`${i?'<span class="req-p-flow-arrow" aria-hidden="true">→</span>':''}<div class="req-p-flow-node"><strong>${esc(n.title)}</strong><small>${esc(n.detail)}</small></div>`).join('')}</div>`;
    const f=C.normalFlow;
    const normalFlow=`<h4>普通报价P履约链</h4><div class="req-p-flow" aria-label="普通报价P履约链，C-04阶段材料接口仍阻塞">${flowRow(f.incoming,'incoming')}<div class="req-p-flow-down" aria-hidden="true">↓</div><div class="req-p-flow-blocker" id="req-p-c04">${requirementV1Badge(f.blocker.status)} ${requirementV1Questions(['C-04'])}<strong>${esc(f.blocker.title)}</strong><p>${f.blocker.questions.map(esc).join('　')}</p><small>${esc(f.blocker.boundary)}</small></div><div class="req-p-flow-down" aria-hidden="true">↓</div>${flowRow(f.execution,'execution')}<div class="req-p-flow-down" aria-hidden="true">↓</div>${flowRow(f.completion,'completion')}</div><p class="sub">MR内部采购与供料规则留04-09；此图表达已知节点与未决接口，不代表阶段材料已经获准施工。</p>`;
    return `<h2>P维修履约</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同与客户上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)} ；即时维修后补适用 <a href="${encodeURI('../'+U.sourcePath)}#instant-followup-20261027" target="_blank" rel="noopener">SOURCE-039／10/27确认</a>。不是客户正式签批。</p><div class="req-v1-links"><button class="inline-link" data-kind="flow" data-id="FLOW-P">03-01普通报价维修 →</button><button class="inline-link" data-kind="flow" data-id="FLOW-INSTANT">03-02即时维修 →</button><button class="inline-link" data-kind="flow" data-id="FLOW-MR">MR／材料供给基线 →</button><button class="inline-link" data-view="requirements" data-sub="v1:05">04-05成交输出 →</button><button class="inline-link" data-view="requirements" data-sub="v1:09">04-09材料需求（结构入口）→</button><button class="inline-link" data-view="requirements" data-sub="v1:10">04-10财务需求（结构入口）→</button><button class="inline-link" data-view="overview">02业务全景 →</button><button class="inline-link" data-view="requirements" data-sub="v1:01">04-01对象关系 →</button><button class="inline-link" data-view="requirements" data-sub="v1:02">04-02状态与权限 →</button></div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',normalFlow+`<h4>普通报价维修 vs 即时维修</h4>`+requirementV1Table(['环节','普通报价维修','即时维修'],C.pathComparison.map(p=>[esc(p.step),esc(p.normal),esc(p.instant)]))+`<p class="req-v1-boundary">${esc(C.instantChain)}</p><p class="req-v1-boundary">${esc(C.mToPBoundary)}</p><h4>可验收系统行为</h4>`+requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 规则与数据',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>业务节点，不是完整P状态机</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ 未决与异常',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}${o.ids.includes('C-13')?' · '+link('question','OPEN-10-26-01','OPEN-10-26-01／P0 →'):''}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN。C-04明确阻塞正式阶段材料放行，相关需求可继续整理；不能因此声称P整链已走通。任务建立、CP公共例外及即时P材料接口不补答案。</p>`)}
      ${requirementV1Section('⑥ Prototype映射与验收',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">AC-P-01～11全部待执行。AC-P-02／03只验阶段表达与未知规则保护，正式阶段放行实施验收仍BLOCKED；AC-P-09不验证未确认的自动建任务；不声称已通过产品验收。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前P履约需求</h4><p class="sub">保留旧编号、来源和原始状态。只映射P现场履约／材料接口／CP直接相关范围；旧推荐、自动建单、后缀及统一CP规则不因关联而批准。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
      ]))+`<details class="req-v1-evidence"><summary>已检查但本轮不承接的旧REQ范围</summary><ul>${C.reviewedLegacyNotAdopted.map(m=>`<li>${link('requirement',m.id)}：${esc(m.reason)}</li>`).join('')}</ul></details><p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1M(R) {
    const C=R.mService;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    const sourceRefs=ids=>(ids||[]).map(id=>{const t=C.sources.find(s=>s.id===id);return t?`<a href="${encodeURI('../'+t.path)}" target="_blank" rel="noopener">${esc(id)}</a>`:esc(id);}).join(' · ');
    const row=nodes=>`<div class="req-m-row">${nodes.map((n,i)=>`${i?'<span class="req-m-arrow" aria-hidden="true">→</span>':''}<div class="req-m-node"><strong>${esc(n.title)}</strong><small>${esc(n.detail)}</small></div>`).join('')}</div>`;
    const hierarchy=`<h4>M业务层级：逻辑关联</h4><div class="req-m-hierarchy" aria-label="M计划、本次服务、上门及SR逻辑层次">${row(C.hierarchy.slice(0,3))}<div class="req-m-down" aria-hidden="true">↓</div>${row(C.hierarchy.slice(3))}<p class="sub">${esc(C.hierarchyNote)}</p><div class="req-m-completion" id="req-m-completion"><strong>本次工作完成 ≠ M整体完成</strong><p>${esc(C.completionBoundary)}</p>${requirementV1Questions(['C-02','C-10'])} ${requirementV1Badge('PARTIAL')} 整体结束规则OPEN</div></div>`;
    const branches=`<h4>M现场发现维修</h4><div class="req-m-branches" aria-label="M本次正常完成与新P引用关系">${C.discoveryBranches.map(n=>`<article><strong>${esc(n.title)}</strong><p>${esc(n.chain)}</p><small>${esc(n.boundary)}</small>${n.reference==='03-M'?link('flow','FLOW-M','03-04 M业务基线 →'):`<button class="inline-link" data-view="requirements" data-sub="v1:${n.reference}">引用04-${n.reference} →</button>`}</article>`).join('')}</div><p class="req-m-independence">${esc(C.mToPBoundary)}</p><p class="sub">${esc(C.scheduleBoundary)}</p>`;
    return `<h2>M计划与本次服务</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同与客户上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)} ；CR排程及逐次安排引用 ${sourceRefs(['SOURCE-029','SOURCE-032'])}。不把03示意图或Prototype推断为整体结束算法；不是客户签批。</p><div class="req-v1-links"><button class="inline-link" data-kind="flow" data-id="FLOW-M">03-04合同周期保养 →</button><button class="inline-link" data-view="requirements" data-sub="v1:05">04-05报价接口 →</button><button class="inline-link" data-view="requirements" data-sub="v1:06">04-06 P履约接口 →</button><button class="inline-link" data-view="requirements" data-sub="v1:10">04-10财务需求（结构入口）→</button><button class="inline-link" data-view="overview">02业务全景 →</button><button class="inline-link" data-view="requirements" data-sub="v1:01">04-01对象关系 →</button><button class="inline-link" data-view="requirements" data-sub="v1:02">04-02状态与权限 →</button></div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',hierarchy+branches+`<h4>可验收系统行为</h4>`+requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+(b.sourceRefs?.length?'<br>'+sourceRefs(b.sourceRefs):'')+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 规则与数据',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>业务节点，不是完整M状态机</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ 未决与异常',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN。首期、到期补做保留原内部暂定身份；不把M整体完成、计划生成、任务建立及续保接口包装成已确认的自动规则。P的C-04仍按04-06保持BLOCKED，本页不改变。</p>`)}
      ${requirementV1Section('⑥ Prototype映射与验收',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">AC-M-01～11全部待执行。AC-M-03只验真实后续服务记录，AC-M-07／08只验业务隔离及引用；未知任务建立仍OPEN。AC-M-10只验M整体不被自动结束，不是整体结束流程验收。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前M服务需求</h4><p class="sub">保留旧编号、来源和原始状态，只映射M、SR、排程及续保／财务接口相关范围；旧自动建CALL、统一CP、月结及旧分类不因关联而批准。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
      ]))+`<details class="req-v1-evidence"><summary>已检查但本轮不承接的旧REQ范围</summary><ul>${C.reviewedLegacyNotAdopted.map(m=>`<li>${link('requirement',m.id)}：${esc(m.reason)}</li>`).join('')}</ul></details><p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1MP(R) {
    const C=R.mpControl;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    const sourceRefs=ids=>(ids||[]).map(id=>{const t=C.sources.find(s=>s.id===id);return t?`<a href="${encodeURI('../'+t.path)}" target="_blank" rel="noopener">${esc(id)}</a>`:esc(id);}).join(' · ');
    const dual=`<h4>M+P双轨结构</h4><div class="req-mp-model"><div class="req-mp-origin"><strong>${esc(C.dualModel.origin)}</strong><p>${esc(C.dualModel.meaning)}</p></div><div class="req-mp-dual">${C.dualModel.parts.map(n=>`<article data-mp-part="${n.key}"><strong>${esc(n.title)}</strong><span class="req-mp-down" aria-hidden="true">↓</span><button class="inline-link" data-view="requirements" data-sub="v1:${n.reference}">${esc(n.label)} →</button><p>${esc(n.content)}</p><small>${esc(n.boundary)}</small></article>`).join('')}</div><p class="req-mp-summary">${esc(C.dualModel.summary)}</p></div>`;
    const tracks=`<h4>独立推进示意</h4><div class="req-mp-tracks">${C.progressTracks.map(t=>`<article data-mp-track="${t.key}"><strong>${esc(t.label)}</strong><div class="req-mp-track">${t.items.map(x=>`<span>${esc(x)}</span>`).join('')}</div><small>${esc(t.boundary)}</small></article>`).join('')}</div><p class="req-mp-independence">${esc(C.independence)}</p><p class="sub">示意引用范围，不显示虚构的当前进度；不要求两条轨迹同步。</p>`;
    const aggregate=`<div class="req-mp-aggregate" id="req-mp-aggregate"><strong>M+P整体完成规则 · OPEN</strong><ul>${C.aggregateQuestions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul><p>${esc(C.aggregateBoundary)}</p>${requirementV1Questions(['C-02','C-10','C-14'])}</div><p class="req-mp-independence">${esc(C.mToPBoundary)}</p>`;
    return `<h2>M+P组合控制</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同与客户上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)} ；核心模型引用 ${sourceRefs(['SOURCE-033'])}，无固定先后引用 ${sourceRefs(['SOURCE-001'])}。组合视图及保护要求区分业务事实与本轮系统需求，不代表客户签批。</p><div class="req-v1-links"><button class="inline-link" data-view="flows" data-sub="structure:mp">03-05 M+P业务基线 →</button><button class="inline-link" data-view="requirements" data-sub="v1:07">04-07 M部分 →</button><button class="inline-link" data-view="requirements" data-sub="v1:05">04-05报价接口 →</button><button class="inline-link" data-view="requirements" data-sub="v1:06">04-06 P履约接口 →</button><button class="inline-link" data-view="requirements" data-sub="v1:09">04-09材料需求（结构入口）→</button><button class="inline-link" data-view="requirements" data-sub="v1:10">04-10财务需求（结构入口）→</button><button class="inline-link" data-view="overview">02业务全景 →</button><button class="inline-link" data-view="requirements" data-sub="v1:01">04-01对象关系 →</button><button class="inline-link" data-view="requirements" data-sub="v1:02">04-02状态与权限 →</button></div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',dual+tracks+aggregate+`<h4>可验收系统行为</h4>`+requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+(b.sourceRefs?.length?'<br>'+sourceRefs(b.sourceRefs):'')+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 规则与数据',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>状态边界，不建立完整M+P状态机</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ 未决与异常',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN。整体完成、复杂金额、子业务数量／记录与编号模型不补答案；C-04只保护相关P阶段材料施工接口，不阻塞全部M或无需该接口的P。</p>`)}
      ${requirementV1Section('⑥ Prototype映射与验收',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">AC-MP-01～11全部待执行。整体完成保护不等于批准某种结束算法；权限隔离不代表C-03已确认；C-04保护不构成阶段施工放行验收。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前M+P需求</h4><p class="sub">保留旧编号、来源和原始状态，仅承接组合分类、子流程引用和票款边界；旧统一CP、编号与金额方案不因映射而批准。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
      ]))+`<details class="req-v1-evidence"><summary>已检查但本轮不承接的旧REQ范围</summary><ul>${C.reviewedLegacyNotAdopted.map(m=>`<li>${link('requirement',m.id)}：${esc(m.reason)}</li>`).join('')}</ul></details><p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1MR(R) {
    const C=R.materialSupply;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    const sourceRefs=ids=>(ids||[]).map(id=>{const t=C.sources.find(s=>s.id===id);return t?`<a href="${encodeURI('../'+t.path)}" target="_blank" rel="noopener">${esc(id)}</a>`:esc(id);}).join(' · ');
    const row=(nodes,key)=>`<div class="req-mr-row" data-mr-row="${key}">${nodes.map((n,i)=>`${i?'<span class="req-mr-arrow" aria-hidden="true">→</span>':''}<div class="req-mr-node"><strong>${esc(n.title)}</strong><small>${esc(n.detail)}</small></div>`).join('')}</div>`;
    const f=C.materialModel;
    const graph=`<h4>普通成交报价至阶段施工：业务关系</h4><div class="req-mr-model">${row(f.upstream,'upstream')}<div class="req-mr-down" aria-hidden="true">↓ 1 MR → N采购PO</div><div class="req-mr-orders">${f.orders.map(n=>`<article><strong>${esc(n.title)}</strong><small>${esc(n.detail)}</small></article>`).join('')}</div><div class="req-mr-down" aria-hidden="true">↓</div><div class="req-mr-batches"><strong>${esc(f.batchTitle)}</strong><p>${esc(f.batchBoundary)}</p></div><div class="req-mr-down" aria-hidden="true">↓</div><div class="req-mr-blocker" id="req-mr-c04">${requirementV1Badge(f.blocker.status)} ${requirementV1Questions(['C-04'])}<strong>${esc(f.blocker.title)}</strong><p>${f.blocker.questions.map(esc).join('　')}</p><small>${esc(f.blocker.boundary)}</small></div><div class="req-mr-down" aria-hidden="true">↓〔待业务确认后承接〕</div><button class="inline-link req-mr-output" data-view="requirements" data-sub="v1:06">${esc(f.output)} →</button><p class="sub">${esc(f.note)}</p></div>`;
    const change=`<div class="req-mr-change" id="req-mr-change"><strong>成交后材料变化 · OPEN / P0</strong><p>${esc(C.changeBoundary)}</p>${link('question','OPEN-10-26-01','OPEN-10-26-01 →')} · ${requirementV1Questions(['C-13'])}</div>`;
    return `<h2>MR、采购PO与材料衔接</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><p class="req-mr-key-boundary">${requirementV1Questions(['C-04'])} BLOCKED　·　${link('question','OPEN-10-26-01','成交后材料变化 OPEN →')}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同与客户上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)}。原始会议 ${sourceRefs(['SOURCE-036'])} 中客户分阶段表达与演示／变更提案分开；${sourceRefs(['SOURCE-032','SOURCE-022'])} 只沿有效范围引用，不代表客户签批。</p><div class="req-v1-links"><button class="inline-link" data-kind="flow" data-id="FLOW-MR">03 MR／材料供给基线 →</button><button class="inline-link" data-kind="flow" data-id="FLOW-P">03-01普通报价维修 →</button>${['03','05','06','08','02'].map(id=>`<button class="inline-link" data-view="requirements" data-sub="v1:${id}">引用04-${id} →</button>`).join('')}</div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',graph+change+`<h4>可验收系统行为</h4>`+requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+(b.sourceRefs?.length?'<br>'+sourceRefs(b.sourceRefs):'')+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 对象／状态／权限',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>状态边界，不建立完整MR／PO／仓库状态机</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ 当前OPEN与范围边界',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}${o.ids.includes('C-13')?' · '+link('question','OPEN-10-26-01','成交后材料变化 OPEN／P0 →'):''}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN。C-04与成交后材料变化均未答；不恢复全项目一次齐料，不自动建任务，不从历史手工MR、取消状态诉求或Prototype推导授权及同步规则。</p>`)}
      ${requirementV1Section('⑥ Prototype映射与验收条件／旧REQ追溯',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">AC-MR-01～12全部待执行。分阶段表达不等于某批材料已可施工；C-04及成交后材料变化只验未知规则保护，不替代放行／变更流程确认或产品验收。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前MR／材料接口需求</h4><p class="sub">保留旧编号、来源和原始状态，只承接MR来源、采购引用、供料及未决边界。旧SP、状态枚举、手工MR、自动建任务及采购提醒不因映射而全部批准。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
      ]))+`<details class="req-v1-evidence"><summary>已检查但本轮不承接的旧REQ范围</summary><ul>${C.reviewedLegacyNotAdopted.map(m=>`<li>${link('requirement',m.id)}：${esc(m.reason)}</li>`).join('')}</ul></details><p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1Finance(R) {
    const C=R.financeHandoff;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    const sourceRefs=ids=>(ids||[]).map(id=>{const t=C.sources.find(s=>s.id===id);return t?`<a href="${encodeURI('../'+t.path)}" target="_blank" rel="noopener">${esc(id)}</a>`:esc(id);}).join(' · ');
    const n=C.financeModel;
    const graph=`<h4>业务结果与财务关联：分别记录，不是固定顺序</h4><div class="req-fin-model"><div class="req-fin-origin"><strong>${esc(n.origin)}</strong><p>${esc(n.originBoundary)}</p><div class="req-v1-links">${['06','07','08'].map(id=>`<button class="inline-link" data-view="requirements" data-sub="v1:${id}">引用04-${id} →</button>`).join('')}</div></div><div class="req-fin-down" aria-hidden="true">↓ 同一业务上下文的关联引用</div><div class="req-fin-axes">${n.axes.map(a=>`<article data-fin-axis="${a.key}"><strong>${esc(a.title)}</strong><p>${esc(a.detail)}</p></article>`).join('')}</div><p class="req-fin-context">${esc(n.context)}</p><div class="req-fin-independent">${n.independence.map(t=>`<span>${esc(t)}</span>`).join('')}</div><p class="req-fin-boundary">${esc(n.boundary)}</p></div>`;
    const instant=`<div class="req-fin-instant"><h4>即时维修现场收款例外</h4><div class="req-fin-chain">${C.instantReference.steps.map((t,i)=>`${i?'<span class="req-fin-arrow" aria-hidden="true">→</span>':''}<strong>${esc(t)}</strong>`).join('')}</div><p>${esc(C.instantReference.boundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:05">04-05后补接口 →</button> · <button class="inline-link" data-view="requirements" data-sub="v1:06">04-06即时P接口 →</button> · ${requirementV1Questions(['C-06'])}</div>`;
    const documents=`<h4>资料依据与适用边界</h4>`+requirementV1Table(['已有资料／信息','来源身份','适用边界'],C.documentEvidence.map(d=>['<strong>'+esc(d.material)+'</strong>',esc(d.status)+'<small class="req-v1-code">'+esc(d.basis)+'</small>',esc(d.boundary)]));
    return `<h2>财务资料与票款状态</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同与客户上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>当前采用Michael会后确认 ${requirementV1Basis(C.basis)}，即时维修边界引用 ${sourceRefs(['SOURCE-039'])}。${sourceRefs(['SOURCE-014'])} 保留明确资料／字段诉求与未决适用；${sourceRefs(['SOURCE-004','SOURCE-001'])} 保留历史身份，不等于客户正式签批。</p><div class="req-v1-links"><button class="inline-link" data-kind="flow" data-id="FLOW-FINANCE">03财务处理基线 →</button><button class="inline-link" data-kind="flow" data-id="FLOW-INSTANT">03-02即时维修 →</button>${['03','05','06','07','08','09','02'].map(id=>`<button class="inline-link" data-view="requirements" data-sub="v1:${id}">引用04-${id} →</button>`).join('')}</div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',graph+instant+documents+`<h4>可验收系统行为</h4>`+requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+(b.sourceRefs?.length?'<br>'+sourceRefs(b.sourceRefs):'')+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 对象／状态／权限',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>独立维度，不建立完整财务状态机</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ OPEN与范围边界',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN。资料清单、交接及票款规则不补答案，不新增财务状态机；M及M+P整体结束不由财务完成替代。C-04与成交后材料变化仍按04-09保留，本页不解决。</p>`)}
      ${requirementV1Section('⑥ Prototype映射、AC及旧REQ追溯',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<ul class="sub">${C.prototypeNotes.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><h4>可测试验收条件</h4><p class="sub">AC-FIN-01～12全部待执行。只验独立维度、来源及未知规则保护；不把财务交接、部分／分次款、开票准入或交款对账等OPEN包装成已批准的验收规则。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前财务接口需求</h4><p class="sub">保留旧编号、来源和原始状态，只承接资料与票款接口。原月结、批量开票、重印、收款／收据和外部同步等完整能力不因主题映射全部批准。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
      ]))+`<details class="req-v1-evidence"><summary>已检查但本轮不承接的旧REQ范围</summary><ul>${C.reviewedLegacyNotAdopted.map(m=>`<li>${link('requirement',m.id)}：${esc(m.reason)}</li>`).join('')}</ul></details><p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1Partial(R) {
    const C=R.partialScopes;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    const sourceRefs=ids=>(ids||[]).map(id=>{const t=C.sources.find(s=>s.id===id);return t?`<a href="${encodeURI('../'+t.path)}" target="_blank" rel="noopener">${esc(id)}</a>`:esc(id);}).join(' · ');
    const audit=rows=>requirementV1Table(['核对事项','事实状态','已有依据与未决'],rows.map(a=>[esc(a.title),esc(a.status),esc(a.answer)+'<small class="req-v1-code">'+esc(a.basis)+'</small>']));
    const boundaries=`<p class="req-part-principle">CM ≠ 第四核心业务分类　·　Tender ≠ P／M／M+P　·　来源 ≠ 履约分类</p><div class="req-part-groups">${C.boundaryGroups.map(g=>`<article data-part-group="${g.key}"><header><strong>${esc(g.title)}</strong>${requirementV1Badge(g.maturity)}</header><p>${esc(g.position)}</p><dl><dt>A. 已有明确事实</dt><dd>${esc(g.known)}</dd><dt>B. PARTIAL</dt><dd>${esc(g.partial)}</dd><dt>C. OPEN</dt><dd>${esc(g.open)}</dd></dl>${link('flow',g.reference,'查看既有03流程 →')} ${requirementV1Questions(g.ids)}</article>`).join('')}</div><details class="req-v1-evidence"><summary>CM十项／Tender八项事实核对</summary><h4>CM</h4>${audit(C.cmAudit)}<h4>Tender</h4>${audit(C.tenderAudit)}</details>`;
    const others=`<h4>其他PARTIAL范围：身份与一期边界</h4>`+requirementV1Table(['线索／定位','已知及成熟度','仍不能确定'],C.otherScopes.map(o=>['<strong>'+esc(o.title)+'</strong><br>'+esc(o.kind),esc(o.status)+'<p>'+esc(o.known)+'</p>',esc(o.boundary)+'<br>'+requirementV1Questions(o.openIds)]));
    return `<h2>CM、Tender及其他PARTIAL范围</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同与客户上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>模型按 ${sourceRefs(['SOURCE-033'])}；历史CM岗位差异见 ${sourceRefs(['SOURCE-005','SOURCE-001'])}，Tender明确诉求见 ${sourceRefs(['SOURCE-014'])}。10/26 ${requirementV1Basis(C.basis)} 及SOURCE-039只在各自适用范围引用，不扩成CM完整链或客户一期批准。</p><div class="req-v1-links">${['FLOW-CM','FLOW-TENDER'].map(id=>link('flow',id,id==='FLOW-CM'?'03-03 CM →':'03-07 Tender →')).join('')}${['03','04','05','06','07','08','09','10','02'].map(id=>`<button class="inline-link" data-view="requirements" data-sub="v1:${id}">引用04-${id} →</button>`).join('')}</div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',boundaries+others+`<h4>可验收系统行为</h4>`+requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+(b.sourceRefs?.length?'<br>'+sourceRefs(b.sourceRefs):'')+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 对象／状态／权限',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>来源、归属与处理节点，不是完整状态机</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ OPEN与范围边界',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN。CM已归P不再重复问归属；Tender／邀请报价不是同义词。来源、公共过程、对象与历史线索分别保留，不从已知存在推定一期已纳入。</p>`)}
      ${requirementV1Section('⑥ Prototype映射、AC及旧REQ追溯',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">AC-PART-01～10全部待执行，只验分类、已知片段、引用及未知保护，不是CM／Tender整链、一期批准或产品UAT。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前PARTIAL范围</h4><p class="sub">保留119条原编号、来源与状态；标书登记、日期及结果名称有原文，完整办理、旧分类映射及历史入口不因本轮引用获一期批准。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
      ]))+`<details class="req-v1-evidence"><summary>已检查但本轮不承接的旧REQ范围</summary><ul>${C.reviewedLegacyNotAdopted.map(m=>`<li>${link('requirement',m.id)}：${esc(m.reason)}</li>`).join('')}</ul></details><p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementV1Common(R) {
    const C=R.commonRules;
    const evidence=C.sources.map(s=>`<div class="req-v1-source"><a href="${encodeURI('../'+s.path)}${s.anchor?'#'+s.anchor:''}" target="_blank" rel="noopener">${esc(s.id)} · ${esc(s.title)} ↗</a><small>${esc(s.identity)} ${esc(s.locator||'')}</small></div>`).join('');
    const sourceRefs=ids=>(ids||[]).map(id=>{const t=C.sources.find(s=>s.id===id);return t?`<a href="${encodeURI('../'+t.path)}" target="_blank" rel="noopener">${esc(id)}</a>`:esc(id);}).join(' · ');
    const graph=`<div class="req-common-map"><section><h4>业务记录追溯关系</h4>${C.contextChain.map((t,i)=>`${i?'<span aria-hidden="true">↓</span>':''}<strong>${esc(t)}</strong>`).join('')}</section><aside><h4>交接与通知分别核对</h4>${C.notificationBoundary.map((t,i)=>`${i?'<span aria-hidden="true">↓</span>':''}<strong>${esc(t)}</strong>`).join('')}<p>公共待办 ≠ 自动通知机制<br>责任归属 ≠ 通知渠道</p><a href="../docs/knowledge/05-pending/OPEN-QUESTIONS.md" target="_blank" rel="noopener">通知原问题 Q-019（原清单） ↗</a></aside></div><p class="sub">${esc(C.graphNote)}</p><p class="req-common-principle">页面Gate PASS ≠ 客户业务签批<br>AC已定义 ≠ 已执行通过<br>Prototype MATCH ≠ 需求正式批准</p>`;
    const references=`<h4>跨域验收原则：只引用原需求及AC</h4>`+requirementV1Table(['公共原则','原需求／AC','边界'],C.acceptanceReferences.map(a=>[esc(a.title),`<button class="inline-link" data-kind="requirements-v1-ac" data-id="${a.reference}|${a.acceptanceId}">04-${a.reference} · ${esc(a.acceptanceId)} →</button>`,esc(a.note)]));
    const numbers=`<h4>编号事实与未决边界</h4>`+requirementV1Table(['对象','已有依据','仍不定义'],C.numberRules.map(n=>[esc(n.object),esc(n.known),esc(n.boundary)]));
    const attachments=`<h4>资料按对象引用</h4>`+requirementV1Table(['业务对象','已有资料依据','边界／引用'],C.attachmentRules.map(a=>[esc(a.object),esc(a.known),esc(a.boundary)+`<br><button class="inline-link" data-view="requirements" data-sub="v1:${a.reference}">04-${a.reference} →</button>`]));
    const handoffs=`<h4>业务交接与通知机制</h4>`+requirementV1Table(['交接','已有依据','未决边界'],C.handoffs.map(h=>[esc(h.title),esc(h.known),esc(h.boundary)]));
    return `<h2>编号、附件、通知与验收规则</h2>
      ${requirementV1Section('① 需求摘要',`<p class="req-v1-lead">${esc(C.goal)}</p><p>${requirementV1Badge(C.maturity)} <strong>${esc(C.maturityLabel)}</strong> · ${esc(C.reviewStatus)} · ${esc(C.customerApproval)}</p><p class="sub">${esc(C.factBoundary)}</p><button class="inline-link" data-view="requirements" data-sub="v1:03">合同与客户上下文：引用04-03 →</button>`)}
      ${requirementV1Section('② 业务依据',`<p>Michael人工确认 ${requirementV1Basis(C.basis)}；纸单编号候选见 ${sourceRefs(['SOURCE-022'])}，采购知会边界见 ${sourceRefs(['SOURCE-032'])}。现有需求及工作记录只作为需求／验收表达依据，不代替客户事实。</p><div class="req-v1-links">${['03','04','05','06','07','08','09','10','11','02'].map(id=>`<button class="inline-link" data-view="requirements" data-sub="v1:${id}">引用04-${id} →</button>`).join('')}</div><details class="req-v1-evidence"><summary>原始沟通、Decision及未决依据</summary>${evidence}</details>`)}
      ${requirementV1Section('③ 系统行为',graph+references+numbers+attachments+handoffs+`<h4>可验收系统行为</h4>`+requirementV1Table(['行为','角色／前置','系统结果与边界','依据／验收'],C.behaviors.map(b=>[
        `<strong>${esc(b.id.slice(-1))} · ${esc(b.title)}</strong><p>${esc(b.action)}</p>`,esc(b.role)+'<p>'+esc(b.precondition)+'</p>',esc(b.result)+'<p>'+esc(b.boundary)+'</p>'+(b.requirementOrigin?'<small>'+esc(b.requirementOrigin)+'</small>':''),requirementV1Basis(b.basis)+(b.sourceRefs?.length?'<br>'+sourceRefs(b.sourceRefs):'')+'<br>'+b.acceptanceIds.map(id=>`<a href="#req-v1-${id}">${esc(id)}</a>`).join(' · ')
      ]))+'<p class="sub">'+esc(C.behaviorNote)+'</p>')}
      ${requirementV1Section('④ 规则、对象与权限',`<h4>对象与交接关系</h4>`+requirementV1Table(['对象关系','基数','已有依据／OPEN'],C.relations.map(r=>[
        esc(r.from)+' → '+esc(r.to),esc(r.cardinality),esc(r.meaning)+'<br>'+requirementV1Basis(r.basis)+(r.openIds.length?'<br>'+requirementV1Questions(r.openIds):'')
      ]))+`<h4>业务结果、验收与权限分别表达</h4><p>${esc(C.stateBoundary)}</p><h4>必要数据</h4>`+requirementV1Table(['对象／字段','含义与要求','依据身份'],C.fields.map(f=>[
        '<strong>'+esc(f.object)+'</strong><br>'+esc(f.field),esc(f.meaning)+'<p>'+esc(f.requirement)+'</p>',esc(f.identity)+(f.basis.length?'<br>'+requirementV1Basis(f.basis):'')
      ]))+`<h4>角色 × 动作 × 数据范围</h4>`+requirementV1Table(['角色','动作','边界／OPEN'],C.permissions.map(p=>[
        esc(p.role),esc(p.action)+'<br>'+esc(p.status),esc(p.boundary)+'<br>'+requirementV1Questions(p.openIds)
      ])))}
      ${requirementV1Section('⑤ 当前OPEN与范围边界',`<div class="req-v1-open-list">${C.opens.map(o=>`<article><strong>${esc(o.title)}</strong><p>${esc(o.impact)}</p>${requirementV1Questions(o.ids)}</article>`).join('')}</div><p class="sub">未新增或关闭OPEN。Q-019通知问题、C-09编号和既有资料权限问题继续保留；政府编号不移入C-15，普通接受凭据不误归现场款C-06。</p>`)}
      ${requirementV1Section('⑥ Prototype映射、AC及旧REQ追溯',`<p class="req-v1-boundary">${esc(C.prototypeBoundary)}</p>`+requirementV1Table(['检查项','只读映射结果','需求对应'],C.prototype.map(p=>[
        '<strong>'+esc(p.capability)+'</strong><br>'+esc(p.status),esc(p.current)+'<small class="req-v1-code">'+esc(p.path)+' · '+esc(p.locator)+'</small>',esc(p.target)
      ]))+`<h4>可测试验收条件</h4><p class="sub">AC-COM-01～08全部待执行，只验公共引用、识别、分层和未知保护；原87项AC保持待执行，不在本轮执行04整体Gate或产品验收。</p><div class="req-v1-acceptance">${C.acceptance.map(a=>`<article id="req-v1-${a.id}"><header><strong>${esc(a.id)} ${esc(a.title)}</strong><span>${esc(a.status)}</span></header><dl><dt>Given</dt><dd>${esc(a.given)}</dd><dt>When</dt><dd>${esc(a.when)}</dd><dt>Then</dt><dd>${esc(a.then)}</dd></dl><p class="sub">边界：${esc(a.boundary)}</p></article>`).join('')}</div><h4>旧REQ → 当前公共规则</h4><p class="sub">保留119条原编号、来源和状态；旧通知、后缀、附件、存储与归档诉求只作追溯，不批准未知技术策略或统一业务政策。</p>`+requirementV1Table(['旧REQ','当前行为／OPEN','适用范围'],C.legacyMappings.map(m=>[
        link('requirement',m.id),m.targets.map(id=>id.startsWith('C-')?link('question',id):esc(id)).join(' · '),esc(m.note)
      ]))+`<details class="req-v1-evidence"><summary>已检查但本轮不承接的旧REQ范围</summary><ul>${C.reviewedLegacyNotAdopted.map(m=>`<li>${link('requirement',m.id)}：${esc(m.reason)}</li>`).join('')}</ul></details><p><a href="${encodeURI('../'+R.sourcePath)}" target="_blank" rel="noopener">需求维护原文 ↗</a></p>`)}
    `;
  }
  function requirementsView() {
    const R=D.requirementsV1;
    if (!R) return legacyRequirementsView();
    const pageId=state.sub.startsWith('v1:')?state.sub.slice(3):'00';
    const legacy=!!state.sub&&!state.sub.startsWith('v1:');
    const current=R.pages.find(p=>p.id===pageId)||R.pages[0];
    const groups=[...new Set(R.pages.map(p=>p.group))];
    const navItem=p=>`<button class="${!legacy&&current.id===p.id?'selected':''}" data-view="requirements" data-sub="v1:${p.id}"${!legacy&&current.id===p.id?' aria-current="page"':''}><span>04-${p.id}</span> ${esc(p.title)}</button>`;
    const localNav=`<nav class="req-v1-local-nav" aria-label="系统需求二级目录">${groups.map(g=>`<div><h3>${esc(g)}</h3>${R.pages.filter(p=>p.group===g).map(navItem).join('')}</div>`).join('')}<div><h3>保留追溯</h3><button data-view="requirements" data-sub="legacy" class="${legacy?'selected':''}">历史REQ／需求追溯（119条）</button><button data-view="requirements" data-sub="本轮要求核对">10/12沟通增量（39项）</button></div></nav>`;
    const mobileNav=`<label class="req-v1-mobile-nav">系统需求目录<select id="requirements-v1-page">${R.pages.map(p=>`<option value="v1:${p.id}"${!legacy&&current.id===p.id?' selected':''}>04-${p.id} ${esc(p.title)}</option>`).join('')}<option value="legacy"${legacy?' selected':''}>历史REQ／需求追溯（119条）</option></select></label>`;
    let body;
    if (legacy) body=`<div class="req-v1-legacy-note"><h2>历史REQ／需求追溯</h2><p>119条原编号、来源和待确认状态保留，不作为已批准开发清单。客户／合同的当前表达见 <button class="inline-link" data-view="requirements" data-sub="v1:03">04-03 →</button>。</p></div>`+legacyRequirementsView();
    else if (current.id==='00') body=requirementV1Overview(R);
    else if (current.id==='01') body=requirementV1Objects(R);
    else if (current.id==='02') body=requirementV1States(R);
    else if (current.id==='03') body=requirementV1Customer(R);
    else if (current.id==='04'&&R.callIntake) body=requirementV1Call(R);
    else if (current.id==='05'&&R.quotation) body=requirementV1Quotation(R);
    else if (current.id==='06'&&R.pFulfillment) body=requirementV1P(R);
    else if (current.id==='07'&&R.mService) body=requirementV1M(R);
    else if (current.id==='08'&&R.mpControl) body=requirementV1MP(R);
    else if (current.id==='09'&&R.materialSupply) body=requirementV1MR(R);
    else if (current.id==='10'&&R.financeHandoff) body=requirementV1Finance(R);
    else if (current.id==='11'&&R.partialScopes) body=requirementV1Partial(R);
    else if (current.id==='12'&&R.commonRules) body=requirementV1Common(R);
    else body=`<h2>04-${current.id} ${esc(current.title)}</h2><p>${requirementV1Badge(current.maturity)} ${esc(current.note)}</p><p class="req-v1-boundary">本轮仅建立结构入口，尚未编写本业务域需求，不代表需求批准或功能完成。</p><button class="inline-link" data-view="requirements" data-sub="v1:03">查看本轮客户／合同需求样板 →</button>`;
    return `<div class="view req-v1" data-requirements-version="${esc(R.version)}">${mobileNav}<div class="req-v1-layout">${localNav}<div class="req-v1-content">${body}</div></div></div>`;
  }
  function legacyRequirementsView() {
    if (state.sub === '本轮要求核对') {
      const rows=D.latestRules||[];
      return `<div class="view">${U?'<p class="sync-inline-note">系统需求确认仍阻塞。下方“本轮”保留原10/12批次身份；10/26知识确认不等于这些REQ已批准。</p>':''}${panel('本轮沟通要求核对', `<p class="sub">${esc(D.preparation?.reviewedAt)} · ${rows.length}项。沟通工作副本逐段核对；明确记录与一期批准分开，细则仍待客户确认。</p><div class="table-wrap"><table><thead><tr><th>要求</th><th>原文内容</th><th>来源和位置</th><th>记录状态</th><th>范围建议</th><th>对应需求</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.id)}<br>${esc(r.title)}</td><td>${esc(r.rule)}</td><td>${fileAnchor(r.sourceFileId,r.sourceId)}<br>${esc(r.locator)}<br>${esc(r.sourceLevel)}</td><td>${esc(r.evidenceStatus)}</td><td>${esc(r.scopeProposal)}<br>${esc(r.batch)}</td><td>${link('requirement',r.requirementId)}</td></tr>`).join('')}</tbody></table></div>`, '旧REQ编号保留；新要求以UPD编号关联原文，不默认扩大本期范围。')}</div>`;
    }
    const selectedModule = D.moduleNames.includes(state.sub) ? state.sub : state.module;
    const list = D.requirements.filter(r => !selectedModule || r.module === selectedModule);
    return `<div class="view">${U ? '<p class="sync-inline-note">系统需求确认仍阻塞；现有REQ仅保留原记录，需承接10/26业务确认后逐项核对，本轮未批准或设计新需求。</p>' : ''}${panel('系统需求', `<div class="requirements-intro"><strong>按真实业务模块查看系统如何承接流程。</strong><span>REQ 状态仍保留原确认栏；业务流程关联不等于需求已批准。</span></div>${reqTable(list)}`, selectedModule ? `当前模块：${selectedModule}` : '从业务流程进入需求，或按模块查看承接范围')}</div>`;
  }
  function clarificationPanel() {
    const c=D.userClarifications;
    if(!c)return '';
    return panel('本轮业务核对记录 · 2026-10-16', `<p>${esc(c.note)}</p><div class="file-actions"><a class="btn" href="${encodeURI('../'+c.questionsPath)}">问题清单：C编号及本轮补充</a><a class="btn" href="${encodeURI('../'+c.path)}">17项回答与原话依据</a></div><p>下一项先向用户核实：${esc(D.internalReview?.guidedQuestion || '')}</p>`, '只完成记录和问题同步；客户待决未关闭，原型本轮未改。');
  }
  function questionsView() {
    const business = activeQuestions.filter(q => ['OPEN', 'PENDING', 'CONFLICT'].includes(q.status) && (q.flowIds?.length || ['Q-001', 'Q-002', 'Q-003', 'Q-004', 'Q-007', 'Q-008'].includes(q.id)) && q.id !== U?.open.id);
    const open = U ? panel('中单后材料变更', `<div class="sync-open-priority"><strong>OPEN／P0</strong><small>OPEN-10-26-01 · 原C-13下的子问题，不重复计算为新客户主题</small></div><p>例如成交为摄像头×10，现场后来需要摄像头×8＋门锁×2：以下处理均没有结论。</p><ul>${U.open.items.map(s=>`<li>${esc(s)}？</li>`).join('')}</ul><p>先由Michael核实，无法确定的再问客户；本轮未选择任何修改或同步方案。</p>${latestSourceLink()} · ${link('question','C-13','查看原C-13及其他变更问题')}`,'一成交报价一MR、多采购PO，不回答中单后变更如何处理。') : '';
    return `<div class="view questions-current">${latestNotice()}${open}${panel('仍待确认', '<p>CM完整规则、M／M+P整体结束、阶段供料确认、财务资料交接、特殊开票／收款及其他有效未决继续保留。</p>'+questionsList(business), '原16个C主题状态保留。已答子项不重复问；历史Q编号不作为新增问题。')}${U?`<details class="sync-history"><summary>历史提问与核对记录（不作为当前下一步）</summary>${clarificationPanel()}</details>`:clarificationPanel()}</div>`;
  }
  function evidenceView() {
    const sub = state.sub || 'Source';
    if (sub === 'Source') return `<div class="view">${U?panel('10/26证据身份与追溯',`<p>客户会议原始表达、AI纪要、Codex审计推断、Michael人工确认及OPEN分别记录，不能互相冒充。</p>${U.sources.map(s=>`<div class="sync-source-row"><strong>${esc(s.id)} · ${esc(s.name)}</strong><span>${esc(s.identity)}</span><div>${s.paths.map((p,i)=>`<a class="file-link" href="${encodeURI('../'+p)}" target="_blank" rel="noopener">${esc(s.paths.length>1?'原件'+(i+1):'打开原文')} ↗</a>`).join(' ')}</div></div>`).join('')}${confirmationRef([1,2,7,11,12,14,15,16,19,20])}`):''}${sourceList()}</div>`;
    if (sub === 'Fact') return `<div class="view">${panel('Fact · 事实与规则', `<div class="toolbar"><select id="fact-status-filter"><option value="">全部事实状态</option>${['CONFIRMED', 'PARTIAL', 'OPEN', 'CONFLICT'].map(s => `<option value="${s}" ${state.factStatus === s ? 'selected' : ''}>${s}</option>`).join('')}</select><span class="sub">证据层入口；事实状态不等同于交付状态</span></div>${factTable(D.facts.filter(f => !state.factStatus || f.status === state.factStatus))}`)}</div>`;
    if (sub === 'Decision') return `<div class="view">${decisionView()}</div>`;
    if (sub === 'Change') return `<div class="view">${panel('Change · 已确认变化', D.changes.map(c => `<button class="decision-row" data-kind="change" data-id="${c.id}"><strong>${esc(c.id)} · ${esc(c.title)}</strong>${statusBadge(c.status)}</button>`).join(''), '保留变更前后的可追溯入口')}</div>`;
    return `<div class="view">${traceView()}</div>`;
  }
  function decisionView() {
    const sub = state.sub || 'Decision';
    if (sub === 'Open Question') return `<div class="view">${panel('Open Question', questionsList(activeQuestions), 'PENDING 与 CONFLICT 未被提升为已确认 Decision')}</div>`;
    if (sub === 'Change') return `<div class="view">${panel('已确认变化', D.changes.map(c => `<button class="decision-row" data-kind="change" data-id="${c.id}"><strong>${esc(c.id)} · ${esc(c.title)}</strong>${statusBadge(c.status)}</button>`).join(''), '变化与旧结论均保留可追溯入口')}</div>`;
    return `<div class="view">${U?panel('Michael会后20项人工确认 · 10/26',`<p>项目负责人现场复盘，非客户正式签字；与旧Decision的替代范围见原文，未自动关闭冲突。</p>${confirmationRef(Array.from({length:20},(_,i)=>i+1))}${latestSourceLink()}`):''}${panel('历史 Decision', `<div class="decision-list">${D.decisions.filter(d => d.status === 'CONFIRMED').map(d => `<button class="decision-row" data-kind="decision" data-id="${d.id}"><strong>${esc(d.id)} · ${esc(d.title)}</strong><span>${esc(d.content)}</span>${statusBadge(d.status)}</button>`).join('')}</div>`, '17 条历史讨论结论；原编号及状态保留，需结合最新人工确认的适用边界阅读，不代表当前业务定稿。')}</div>`;
  }
  function traceView() {
    const rows = D.traces.filter(t => !state.module || maps.requirements.get(t.requirementId)?.module === state.module);
    const columns = [ ['sourceFileIds','Fact Source','file'], ['factIds','Fact','fact'], ['decisionIds','Decision','decision'], ['flowIds','Flow','flow'], ['requirementId','Requirement','requirement'], ['prdFileIds','PRD','file'], ['pageIds','Prototype','page'], ['sddFileIds','SDD','file'], ['tddFileIds','TDD','file'], ['testFileIds','Test','file'] ];
    const cell = (t, [key,,kind]) => { const ids = key === 'requirementId' ? [t[key]] : t[key]; return `<td>${ids?.length ? refs(kind, ids) : `<span class="empty-ref">${key === 'sourceFileIds' ? 'MISSING SOURCE' : 'UNLINKED'}</span>`}</td>`; };
    return `<div class="view">${panel('项目追溯矩阵', `<div class="toolbar"><select id="module-filter"><option value="">全部模块</option>${D.moduleNames.map(m => `<option value="${esc(m)}" ${state.module === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select><span class="sub">${counts.explicitTraceEdges} 条显式关联边 · ${counts.unlinkedRequirements} 条需求未关联当前场景</span></div><div class="table-wrap"><table class="trace-table"><thead><tr>${columns.map(c => `<th>${c[1]}</th>`).join('')}<th>标记</th></tr></thead><tbody>${rows.map(t => `<tr>${columns.map(c => cell(t,c)).join('')}<td>${t.flags.map(x => `<span class="trace-flag">${esc(x)}</span>`).join('')}</td></tr>`).join('')}</tbody></table></div>`, '从任意 ID 点击可双向反查；缺少的环节保留空缺标记')}</div>`;
  }
  function internalReviewPanel() {
    const r=D.internalReview;
    if(!r)return '';
    const reviewEntry=r.userReviewPath?panel('请你审查：7组已整改的局部流程', `<p>建议先看派工备注和维修完工纸。清单包含入口、演示人员、样例、操作和判断标准；材料回写、打印发号及整链未通过部分单列。</p><div class="file-actions"><a class="btn" href="${encodeURI('../'+r.userReviewPath)}">打开内部审查清单</a></div><p class="sub">用户意见尚未取得，不自动替代客户签收或完整UAT。</p>`):'';
    const guided=(r.guidedQuestion||r.guidedKnown)?panel(r.guidedQuestion?'先向你核实一个交接问题':'交接说明已记录', `${r.guidedKnown?`<p>已按你的说明记录：${esc(r.guidedKnown)}。</p>`:''}${r.guidedSequence?`<p>业务顺序：${esc(r.guidedSequence)}。</p>`:''}${r.guidedQuestion?`<p><strong>${esc(r.guidedQuestion)}</strong></p>`:''}<p>${esc(r.guidedAudience)}</p>${r.guidedInternalNext?`<p class="sub">下一步：${esc(r.guidedInternalNext)}</p>`:''}<div class="file-actions"><a class="btn" href="${encodeURI('../'+(r.srFinanceReviewPath||r.candidatePath))}">查看例子和依据</a></div>`):'';
    return clarificationPanel()+reviewEntry+guided+panel('首批内部核对与整改复测 · '+esc(r.date), `<p>${esc(r.conclusion)}</p><div class="file-actions"><a class="btn" href="${encodeURI('../'+r.baselinePath)}">需求与流程对照</a><a class="btn" href="${encodeURI('../'+r.reviewPath)}">整改前走查</a><a class="btn" href="${encodeURI('../'+r.resultPath)}">首轮整改证据</a><a class="btn" href="${encodeURI('../'+r.quotationReviewPath)}">报价局部整改证据</a><a class="btn" href="${encodeURI('../'+r.materialReviewPath)}">材料交接整改证据</a>${r.srFinanceReviewPath?`<a class="btn" href="${encodeURI('../'+r.srFinanceReviewPath)}">CP/SR及主管完工证据</a>`:''}<a class="btn" href="${encodeURI('../'+r.candidatePath)}">材料断点候选</a></div><p class="sub">${esc(r.note)} 已实现、内部子项通过、客户批准和业务验收分别记录。</p>`);
  }
  function statusView() {
    const p=D.preparation;
    return `<div class="view">${latestNotice()}${U ? '<p class="sync-inline-note">当前阶段：业务流程确认。需求事实与业务流程均进行中；系统需求与原型确认阻塞；开发、测试／UAT、上线未开始。下一步准备第一批整链，当前尚不可认定部门测试就绪。</p><details class="sync-history"><summary>历史检查、旧推进建议与资料统计（非当前进度）</summary>' : ''}${internalReviewPanel()}${panel('当前阶段与范围', `<p>完整业务分批定稿。Codex负责内部核对、整改、复测与三个入口维护，用户确认具体成果及成熟候选。材料断点和未决规则尚需处理，暂不客户定稿。局部检查不代表全链已走通。</p><div class="file-actions"><a class="btn" href="${encodeURI('../'+p.mainPath)}">推进Excel：查看当前批次与责任</a><a class="btn" href="${encodeURI('../'+p.clientPath)}">客户确认表草案</a></div><p class="sub">${esc(p.progressSource)} 正式评审人和日期按实际记录，不预填签批。</p>`)}
      ${panel('准备成果与下一步', `<ul><li>${p.latestRequests}项沟通要求，逐条有原文位置和范围边界。</li><li>${p.clientQuestions}个客户决策主题；先核对内部依据与原型断点，准备成熟后再评审范围和真正未决项。</li><li>${p.draftUatCount}个UAT场景草案，尚未全链执行或客户签收。</li><li>7/7为历史自动回归记录，不代表当前版本。Objective筛选子项已复核，其他问题按复核记录区分已变化/待动态验证。</li></ul>`)}
      ${panel('项目状态摘要', `<div class="overview-metrics"><button class="stat ok" data-view="evidence" data-sub="Decision"><strong>${counts.decisions}</strong><span>历史讨论记录</span></button><button class="stat pending" data-view="questions"><strong>${counts.openQuestions}</strong><span>待确认问题</span></button><button class="stat conflict" data-view="evidence" data-sub="Fact"><strong>${counts.conflicts}</strong><span>资料冲突</span></button><button class="stat base" data-view="requirements"><strong>${counts.requirements}</strong><span>系统需求条目</span></button><button class="stat base" data-view="evidence" data-sub="Traceability"><strong>${counts.sourceToPrototypeCoveragePercent}%</strong><span>主题关联（非验收）</span></button><button class="stat base" data-view="design" data-sub="Prototype"><strong>2.0</strong><span>原型版本</span></button></div>`, '这些是资料和关联概况，不代表业务验收或定版进度')}
      ${panel('交付资料状态', `<div class="delivery-grid">${D.deliverables.map(deliveryCard).join('')}</div>`, '资料存在、范围覆盖与验收状态分别记录')}
      ${panel('知识主题关联', `<div class="module-grid">${D.moduleNames.map(m=>{const rows=D.requirements.filter(r=>r.module===m);return `<div class="module-card"><h3>${esc(m)}</h3><p>${rows.filter(r=>r.flowIds.length).length}/${rows.length}条有业务主题关联</p></div>`}).join('')}</div>`, '这是资料关联，不是需求批准率、原型完成率或项目进度。')}
    ${U?'</details>':''}</div>`;
  }
  function searchView(query) {
    const low = query.toLowerCase(); const hits = [];
    for (const [kind, list, label] of [['fact',D.facts,x=>x.title+' '+x.statement],['decision',D.decisions,x=>x.title+' '+x.content],['flow',D.flows,x=>x.name+' '+x.summary],['requirement',D.requirements,x=>x.title+' '+x.legacyId],['page',D.pages,x=>x.name+' '+x.key],['file',D.files,x=>[x.name,x.projectPath,x.category,x.sourceType,...(x.aliases||[]),...(x.sourceIds||[])].join(' ')]]) {
      for (const item of list) if ((item.id+' '+label(item)).toLowerCase().includes(low)) hits.push({ kind, id:item.id, title:kind==='file'?item.name:item.title||item.name||item.content, note:kind==='file'?item.projectPath:item.status||'' });
    }
    return `<div class="view">${panel('全局搜索', `<p class="sub">“${esc(query)}” · ${hits.length} 条匹配；显示前 100 条</p><div class="search-results">${hits.slice(0,100).map(x => `<button class="search-hit" data-kind="${x.kind}" data-id="${x.id}"><strong>${esc(x.kind.toUpperCase())} · ${x.id}</strong><span>${esc(x.title)}</span><small>${esc(x.note)}</small></button>`).join('') || '<div class="empty-state">没有匹配结果</div>'}</div>`)}</div>`;
  }
  const renderers = { progress: progressView, overview, flows: flowsView, requirements: requirementsView, design: designView, questions: questionsView, status: statusView, evidence: evidenceView, facts: factsView, decisions: decisionView, trace: traceView };
  function render() { nav(); $('#content').innerHTML = state.search ? searchView(state.search) : renderers[state.view](); }
  function closeDrawer() { $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true'); }
  function navigate(view, sub = '', flow = '', module = '') {
    if (view === 'flows') {
      // No directory landing page: group references select their existing first entry.
      const entry = sub.startsWith('group:') ? flowGroups().find(g => g.key === sub.slice(6))?.entries[0] : null;
      if (entry) { flow = entry.flowId || ''; sub = entry.structure ? 'structure:' + entry.structure : maps.flows.get(flow)?.name || ''; }
      if (!sub && !flow) { flow = 'FLOW-P'; sub = maps.flows.get(flow)?.name || ''; }
    }
    closeDrawer(); state.view = view; state.sub = sub; state.module = module || (view === 'requirements' && D.moduleNames.includes(sub) ? sub : ''); state.factStatus = ''; if (view === 'flows') state.flow = flow || (sub ? D.flows.find(f => f.name === sub)?.id || '' : 'FLOW-P'); else if (flow) state.flow = flow; state.search = ''; $('#global-search').value = ''; render(); window.scrollTo({top:0,behavior:'instant'});
  }

  function drawer(html) { $('#drawer-content').innerHTML = html; $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden','false'); }
  function detailRow(label, value) { return `<dt>${esc(label)}</dt><dd>${value ?? '<span class="empty-ref">UNLINKED</span>'}</dd>`; }
  function detail(id, kind) {
    if (kind === 'requirements-v1-ac') {
      const [page,ac]=String(id).split('|');
      if (!D.requirementsV1?.commonRules?.acceptanceReferences.some(r=>r.reference===page&&r.acceptanceId===ac)) return;
      navigate('requirements','v1:'+page);
      requestAnimationFrame(()=>document.getElementById('req-v1-'+ac)?.scrollIntoView({block:'start'}));
      return;
    }
    if (kind === 'requirements-v1-current') return navigate('requirements',id==='12'?'v1:12':id==='11'?'v1:11':id==='10'?'v1:10':id==='09'?'v1:09':id==='08'?'v1:08':id==='07'?'v1:07':id==='06'?'v1:06':id==='05'?'v1:05':id==='04'?'v1:04':'v1:03');
    if (kind === 'instant-followup') {
      const latest=U?.instantFollowup;if(!latest)return;
      return drawer(`<h2>即时维修：最新已答／未答边界</h2><p class="sync-inline-note">${esc(latest.id)} · ${esc(latest.sourceId)} · ${esc(latest.authority)} · ${esc(latest.date)}</p><h3>已明确</h3><ul>${latest.rules.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><h3>C-06仍PENDING／C-08公共未决保留</h3><ul>${latest.pending.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p><a class="file-link" href="${encodeURI('../'+latest.sourcePath)}#${esc(latest.anchor)}" target="_blank" rel="noopener">最新确认原文与历史替代边界 ↗</a></p><p><a class="file-link" href="../docs/knowledge/05-pending/OPEN-QUESTIONS.md#instant-followup-c06-20261027" target="_blank" rel="noopener">知识库C-06最新范围 ↗</a></p>`);
    }
    if (kind === 'p-quote-test-chain') return drawer(testChainPanel());
    if (kind === 'current-business-overview') return drawer(progressView({ showOverview: true }));
    if (kind === 'confirmation1026') {
      const c=U?.confirmations.find(c=>c.id===id);if(!c)return;
      return drawer(`<h2>${esc(c.title)}</h2><p class="sync-inline-note">${esc(c.id)} · ${esc(U.authority)} · 2026-10-26</p><div class="sync-confirmation-body">${esc(c.body)}</div>${latestSourceLink('查看确认全文、原始材料及新旧解释')}`);
    }
    if (kind === 'current-node') {
      const original=D.flows.find(f=>f.nodes.some(n=>n.id===id));if(!original)return;
      const f=displayFlow(original), n=f.nodes.find(n=>n.id===id);if(!n?.confirmationIds)return;
      return drawer(`<div class="drawer-kicker">当前节点 · ${esc(flowDisplayName(f))}</div><h2>${esc(n.label)}</h2>${statusBadge('PARTIAL')}<p class="sync-inline-note">Michael会后人工确认用于当前展示；业务整链未通过，描述标签不等于已批准状态机。</p><dl class="detail-grid">${detailRow('负责角色',esc(n.actor))}${detailRow('业务动作',esc(n.action))}${detailRow('处理阶段',esc(n.state))}${detailRow('原节点ID',esc(n.id))}</dl><h3>10/26人工确认依据</h3>${confirmationRef(n.confirmationIds)}${latestSourceLink()}<h3>仍待确认</h3>${questionsList(activeQuestions.filter(q=>q.flowIds?.includes(f.id)&&['OPEN','PENDING','CONFLICT'].includes(q.status)))}<details class="sync-history"><summary>修正前的原节点及原始追溯</summary><p>${esc(n.previousRecord.label)} · ${esc(n.previousRecord.actor)}</p><p>${esc(n.previousRecord.action)}</p>${link('node',id,'查看原节点完整记录')}</details>`);
    }
    if (kind === 'work-task') {
      const t = D.workRegister.workView?.items.find(x => x.id === id) || D.workRegister.tasks.find(x => x.id === id); if (!t) return;
      const dependencies = t.prerequisites?.map(d => `<li><strong>${esc(d.kind)}</strong>：${esc(d.condition)}${refs('work-task', d.itemIds)}</li>`).join('');
      const related = [...new Set([t.parentTaskId, ...(t.referenceTaskIds || [])].filter(x => x && x !== t.id))];
      return drawer(`<h2>${esc(t.displayTitle || t.title)}</h2>${statusBadge(t.viewStatus || t.status, true)}<dl class="detail-grid">${detailRow('编号', esc(t.id))}${detailRow('负责人', esc(t.executionOwner || t.owner))}${detailRow('下一份成果', esc(t.nextDeliverable || '见下一步'))}${detailRow('完成条件', esc(t.doneWhen))}${detailRow('已有进展', esc(t.progressNote || ''))}${detailRow('当前结果', esc(t.result || '尚未记录完成结果'))}${detailRow('未完成／阻塞', esc(t.blocker || '未记录单独阻塞'))}${detailRow('前置与衔接', esc(t.dependencyNote || t.dependencies || '按本批实际条件推进'))}${detailRow('下一步', esc(t.next))}${detailRow('客户确认', esc(t.customerConfirmation))}${detailRow('原型修改', esc(t.prototypeChange))}${detailRow('业务验收', esc(t.businessAcceptance))}</dl>${t.steps?.length ? `<h3>核对清单</h3><ul>${t.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}${dependencies ? `<h3>相关前置</h3><ul>${dependencies}</ul>` : ''}${t.questionIds?.length ? `<h3>相关待决主题</h3>${refs('question', t.questionIds)}` : ''}${related.length ? `<h3>原任务与相关记录</h3>${refs('work-task', related)}` : ''}<h3>依据与检查记录</h3><p>${esc(t.evidence)}</p><p class="sub">任务完成、客户确认和业务验收分别记录；历史局部检查不代表当前整链通过。</p>`);
    }
    if (kind === 'node') {
      const flow = D.flows.find(f => f.nodes.some(n => n.id === id)); const n = flow?.nodes.find(n => n.id === id); if (!n) return;
      const current = U && displayFlow(flow).nodes.find(x=>x.id===id)?.confirmationIds;
      const relReq = D.requirements.filter(r => r.flowIds.includes(flow.id));
      const nodeIndex = flow.nodes.findIndex(x => x.id === id); const previous = nodeIndex > 0 ? flow.nodes[nodeIndex - 1] : null;
      const factIds = [...new Set([...(n.decisionIds || []).filter(x=>x.startsWith('CONFIRMED-')).map(x => 'FACT-' + x.slice(-3)).filter(x => maps.facts.has(x)),...(n.latestFactIds||[])])];
      const openQuestions = activeQuestions.filter(q => ['OPEN','PENDING','CONFLICT'].includes(q.status) && q.flowIds?.includes(flow.id));
      const decisionRows = (n.decisionIds || []).map(did => { const d = maps.decisions.get(did); return `<div class="knowledge-row">${link('decision', did)}<span>${esc(d?.title || d?.content || '')}</span></div>`; }).join('') || '<span class="empty-ref">当前节点没有单独挂载 Decision</span>';
      return drawer(`<div class="drawer-kicker">${current?'历史节点原记录':'业务节点'} · ${esc(flow.name)}</div><h2>${esc(n.label)}</h2>${current?`<p class="sync-inline-note">此为10/26修正前原文。${link('current-node',id,'查看当前10/26节点解释 →')}</p>`:''}${statusBadge(n.status)}<section class="node-knowledge"><h3>业务说明</h3><dl class="detail-grid">${detailRow('负责角色', esc(n.actor))}${detailRow('前置条件', esc(previous ? `上一节点「${previous.label}」进入${previous.state}` : flow.trigger))}${detailRow('业务动作', esc(n.action))}${detailRow('输出结果', esc(`进入「${n.state}」，下一步由 ${n.nextRole} 承接`))}${detailRow('关键状态', esc(n.state))}</dl><p>${esc(n.description || '当前资料未提供该节点的额外说明。')}</p></section><h3>业务规则 / Decision</h3><div class="knowledge-list">${decisionRows}</div><h3>Fact</h3>${refs('fact', factIds)}<h3>原始依据</h3>${fileRefList(flow.sourceFileIds)}<h3>系统承接 · Requirement</h3>${refs('requirement', relReq.map(r => r.id))}<h3>PRD</h3>${fileRefList([...new Set(relReq.flatMap(r => r.prdFileIds))])}<h3>Prototype</h3>${refs('page', [...new Set(relReq.flatMap(r => r.pageIds))])}<h3>Open Question</h3>${openQuestions.length ? questionsList(openQuestions) : '<span class="empty-ref">当前节点没有已登记的 Open Question</span>'}`);
    }
    if (kind === 'fact') { const f=maps.facts.get(id); if(!f)return; return drawer(`<h2>${esc(f.id)} · ${esc(f.title)}</h2>${statusBadge(f.status)}<p>${esc(f.statement)}</p><p class="sub">${esc(f.evidenceNote)}</p><dl class="detail-grid">${detailRow('原文位置',esc(f.sourceLocator||''))}${detailRow('来源等级',esc(f.sourceLevel||'原记录层级，确认出处需核对'))}${detailRow('证据状态',esc(f.evidenceStatus||'历史工作方案/旧规则'))}${detailRow('一期批准',esc(f.approvalStatus||'以客户确认记录为准'))}</dl><h3>Source</h3>${fileRefList(f.sourceFileIds)}<h3>Decision</h3>${refs('decision',f.decisionIds)}${f.supersededByDecisionId?`<h3>较新结论（覆盖此旧差异）</h3>${refs('decision',[f.supersededByDecisionId])}`:''}<h3>Flow</h3>${refs('flow',f.flowIds)}${f.legacyFlowIds?.length?`<h3>Legacy Flow</h3><span class="sub">${esc(f.legacyFlowIds.join(', '))}</span>`:''}`); }
    if (kind === 'decision') { const d=maps.decisions.get(id); if(!d)return; const reqs=D.requirements.filter(r=>r.decisionIds.includes(d.id)); return drawer(`<h2>${esc(d.id)} · ${esc(d.title)}</h2>${statusBadge(d.status)}<p>${esc(d.content)}</p><dl class="detail-grid">${detailRow('类型',esc(d.type))}${detailRow('时间',esc(d.date))}${detailRow('影响模块',esc(d.impactedModules.join('、')))}</dl><h3>来源</h3>${fileRefList(d.sourceFileIds)}<h3>影响场景</h3>${refs('flow',d.flowIds)}<h3>关联需求</h3>${refs('requirement',reqs.map(r=>r.id))}<h3>关联 PRD / Prototype</h3>${fileRefList([...new Set(reqs.flatMap(r=>[...r.prdFileIds,...r.prototypeFileIds]))])}`); }
    if (kind === 'flow') { const f=maps.flows.get(id);if(!f)return;state.flow=f.id;return navigate('flows',f.name,f.id); }
    if (kind === 'requirement') { const r=maps.requirements.get(id);if(!r)return;const t=D.traces.find(t=>t.requirementId===id);const current=state.view==='requirements'&&D.requirementsV1?.customerContract.legacyMappings.some(m=>m.id===id)?'<p class="req-v1-current-link">本条客户／合同相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current">04-03客户与合同识别 →</button>；原记录及其他范围保留。</p>':'';const callCurrent=state.view==='requirements'&&(state.sub==='v1:04'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.callIntake?.legacyMappings.some(m=>m.id===id)?'<p>本条CALL相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="04">04-04 CALL受理与分流 →</button>；其他旧范围保持。</p>':'';const quoteCurrent=state.view==='requirements'&&(state.sub==='v1:05'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.quotation?.legacyMappings.some(m=>m.id===id)?'<p>本条报价相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="05">04-05 报价、版本与中单 →</button>；其他旧范围保持。</p>':'';const pCurrent=state.view==='requirements'&&(state.sub==='v1:06'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.pFulfillment?.legacyMappings.some(m=>m.id===id)?'<p>本条P履约相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="06">04-06 P维修履约 →</button>；未决规则及其他旧范围保留。</p>':'';const mCurrent=state.view==='requirements'&&(state.sub==='v1:07'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.mService?.legacyMappings.some(m=>m.id===id)?'<p>本条M服务相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="07">04-07 M计划与本次服务 →</button>；整体结束及其他旧范围仍按原记录。</p>':'';const mpCurrent=state.view==='requirements'&&(state.sub==='v1:08'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.mpControl?.legacyMappings.some(m=>m.id===id)?'<p>本条组合控制相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="08">04-08 M+P组合控制 →</button>；其他旧范围及未决边界保留。</p>':'';const mrCurrent=state.view==='requirements'&&(state.sub==='v1:09'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.materialSupply?.legacyMappings.some(m=>m.id===id)?'<p>本条材料衔接相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="09">04-09 MR、采购PO与材料衔接 →</button>；原状态及其他范围保留。</p>':'';const finCurrent=state.view==='requirements'&&(state.sub==='v1:10'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.financeHandoff?.legacyMappings.some(m=>m.id===id)?'<p>本条财务接口相关范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="10">04-10 财务资料与票款状态 →</button>；原状态及其他范围保留。</p>':'';const partCurrent=state.view==='requirements'&&(state.sub==='v1:11'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.partialScopes?.legacyMappings.some(m=>m.id===id)?'<p>本条PARTIAL范围的当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="11">04-11 CM、Tender及其他PARTIAL范围 →</button>；旧来源、状态及冲突保留。</p>':'';const commonCurrent=state.view==='requirements'&&(state.sub==='v1:12'||state.sub==='legacy'||state.sub==='本轮要求核对')&&D.requirementsV1?.commonRules?.legacyMappings.some(m=>m.id===id)?'<p>本条公共规则范围当前表达：<button class="inline-link" data-kind="requirements-v1-current" data-id="12">04-12 编号、附件、通知与验收规则 →</button>；旧编号与原状态保留。</p>':'';return drawer(`<h2>${esc(r.id)} / ${esc(r.legacyId)}</h2>${current}${callCurrent}${quoteCurrent}${pCurrent}${mCurrent}${mpCurrent}${mrCurrent}${finCurrent}${partCurrent}${commonCurrent}${statusBadge(r.status)}<p>${esc(r.title)}</p><dl class="detail-grid">${detailRow('模块',esc(r.module))}${detailRow('原确认栏',esc(r.approvalStatus))}${detailRow('追溯状态',esc(t.flags.join(' · ')))}</dl><h3>直接来源</h3>${fileRefList(r.sourceFileIds)}<h3>当前 Fact → Decision → Flow</h3>${refs('fact',t.factIds)}${refs('decision',t.decisionIds)}${refs('flow',t.flowIds)}<h3>历史规则（仅供反查）</h3>${refs('fact',r.legacyFactIds)}<h3>PRD</h3>${fileRefList(r.prdFileIds)}<h3>Prototype</h3>${refs('page',r.pageIds)}<h3>SDD / TDD / Testing</h3><span class="empty-ref">UNLINKED / MISSING</span><p class="sub">${esc(r.note)}</p>`); }
    if (kind === 'page') { const p=maps.pages.get(id);if(!p)return;const related=p.requirementIds.map(rid=>maps.requirements.get(rid)).filter(Boolean);return drawer(`<h2>${esc(p.id)} · ${esc(p.name)}</h2>${statusBadge(p.status,true)}<p>原型内部页面键：<code>${esc(p.key)}</code></p><h3>当前原型文件</h3>${fileRefList(p.fileId?[p.fileId]:[])}<h3>PRD</h3>${fileRefList([...new Set(related.flatMap(r=>r.prdFileIds))])}<h3>Requirement</h3>${refs('requirement',p.requirementIds)}<h3>Flow</h3>${refs('flow',[...new Set(related.flatMap(r=>r.flowIds))])}<h3>Decision</h3>${refs('decision',[...new Set(related.flatMap(r=>r.decisionIds))])}<h3>Fact</h3>${refs('fact',[...new Set(related.flatMap(r=>r.decisionIds.map(id=>'FACT-'+id.slice(-3))))].filter(id=>maps.facts.has(id)))}<h3>Source</h3>${fileRefList([...new Set(related.flatMap(r=>r.sourceFileIds))])}<p class="sub">${esc(p.evidenceNote)}</p>`); }
    if (kind === 'file') { const f=maps.files.get(id);if(!f)return;return drawer(`<h2>${esc(f.name)}</h2>${statusBadge(f.deliveryStatus,true)}<div class="path">${esc(f.projectPath)}</div><div class="file-actions">${fileAnchor(id,'Open Source')}<button class="btn" data-copy="${esc(f.projectPath)}">Copy Path</button></div><dl class="detail-grid">${detailRow('File ID',esc(f.id))}${detailRow('SOURCE ID',(f.sourceIds||[]).length?esc(f.sourceIds.join('、')):null)}${detailRow('知识层级',f.knowledgeTier?esc(f.knowledgeTier):null)}${detailRow('类别',esc(f.category))}${detailRow('版本',esc(f.version))}${detailRow('类型',esc(f.type))}${detailRow('修改时间',esc(f.lastModified))}</dl><h3>关联事实</h3>${refs('fact',f.relatedFacts)}<h3>关联需求</h3>${refs('requirement',f.relatedRequirements)}<h3>关联流程</h3>${refs('flow',f.relatedFlows)}<h3>关联 Decision</h3>${refs('decision',f.relatedDecisions)}<h3>关联页面</h3>${refs('page',f.relatedPages)}`); }
    if (kind === 'question') { const q=activeQuestions.find(x=>x.id===id);if(!q)return;return drawer(`<h2>${esc(q.id)} · ${esc(q.title)}</h2>${statusBadge(q.status)}<p>${esc(q.reason || q.provenance || '')}</p>${q.items?`<ul>${q.items.map(s=>`<li>${esc(s)}？</li>`).join('')}</ul><p>本次没有结论；先由Michael核实，无法确定再问客户。${link('question',q.parentId,'查看所属C-13')}</p>`:''}${q.confirmationSource?`<p>${esc(q.basis||'10/26会后明确保留OPEN，不选择方案')}</p>${latestSourceLink()}<p><a class="file-link" href="${encodeURI('../'+U.questionsPath)}" target="_blank" rel="noopener">当前待确认清单 ↗</a></p>`:''}${(q.clarifications||[]).length?`<details class="sync-history"><summary>历史具体问法（按最新已答边界阅读）</summary>${q.clarifications.map(c=>`<h3>原具体问题</h3><p>${esc(c.title)}</p><p>${esc(c.evidence)}</p><p>${esc(c.audience)}</p>`).join('')}</details>`:''}<h3>Decision</h3>${q.decisionId?refs('decision',[q.decisionId]):'<span class="empty-ref">OPEN</span>'}<dl class="detail-grid">${detailRow('对应批次',esc(q.batch||''))}${detailRow('可选方案',esc(q.options||''))}${detailRow('是否阻塞',esc(q.blocking||''))}</dl><h3>原来源追溯</h3>${q.sourceFileIds?.length?fileRefList(q.sourceFileIds):q.confirmationSource?'<p class="sub">原始会议SOURCE-036及Michael复盘SOURCE-038，见上方确认原文中的来源链接。</p>':fileRefList(q.sourceFileIds)}<h3>影响流程</h3>${refs('flow',q.flowIds)}`); }
    if (kind === 'conflict') { const c=D.conflicts.find(x=>x.id===id);if(!c)return;return drawer(`<h2>${esc(c.id)} · ${esc(c.title)}</h2>${statusBadge(c.status)}<p>${esc(c.kind)}</p><p class="sub">${esc(c.evidenceNote || '')}</p><h3>证据</h3>${fileRefList(c.sourceFileIds)}<h3>Decision</h3>${refs('decision',c.decisionIds)}<h3>Requirement</h3>${refs('requirement',c.requirementIds)}`); }
    if (kind === 'change') { const c=D.changes.find(x=>x.id===id);if(!c)return;return drawer(`<h2>${esc(c.id)} · ${esc(c.title)}</h2>${statusBadge(c.status)}<h3>Decision</h3>${refs('decision',c.decisionIds)}<h3>来源</h3>${fileRefList(c.sourceFileIds)}`); }
    if (kind === 'role') { const r=D.roles.find(x=>x.id===id);if(!r)return;return drawer(`<h2>${esc(r.id)} · ${esc(r.name)}</h2>${statusBadge(r.status)}<dl class="detail-grid">${detailRow('代码',esc(r.code))}${detailRow('职责',esc(r.responsibility))}${detailRow('权限边界',esc(r.boundary))}</dl><h3>来源</h3>${fileRefList(r.sourceFileIds)}<p class="sub">历史角色审计；具体权限仍以客户确认结果为准。</p>`); }
  }
  function fileIdByPath(p){return D.files.find(f=>f.projectPath===p)?.id}
  document.addEventListener('click', event => {
    const mainToggle = event.target.closest('[data-main-overview-toggle]');
    if (mainToggle) {
      const open = mainToggle.getAttribute('aria-expanded') !== 'true';
      mainToggle.setAttribute('aria-expanded', String(open));
      mainToggle.querySelector('span').textContent = open ? '▾' : '▸';
      $('#main-overview-panel').closest('tr').hidden = !open;
      return;
    }
    const copy=event.target.closest('[data-copy]'); if(copy){navigator.clipboard?.writeText(copy.dataset.copy).then(()=>toast('已复制原文件路径')).catch(()=>toast(copy.dataset.copy));return}
    if(event.target.closest('#drawer-close')){closeDrawer();return}
    const target=event.target.closest('[data-kind],[data-view]'); if(!target)return;
    if(target.dataset.kind){detail(target.dataset.id,target.dataset.kind);return}
    if(target.dataset.view)navigate(target.dataset.view,target.dataset.sub||'',target.dataset.flow||'',target.dataset.module||'');
  });
  document.addEventListener('change', event => { if(event.target.id==='requirements-v1-page'){navigate('requirements',event.target.value);return} if(event.target.id==='module-filter'){state.module=event.target.value;render()} if(event.target.id==='fact-status-filter'){state.factStatus=event.target.value;render()} });
  document.addEventListener('keydown', event => {
    if(event.key==='Escape')closeDrawer();
    if ((event.key==='Enter' || event.key===' ') && event.target.matches('.overview-flowchart .fc-action')) {
      event.preventDefault(); event.target.dispatchEvent(new MouseEvent('click', {bubbles:true}));
    }
    if ((event.key==='Enter' || event.key===' ') && event.target.matches('.m-contract-workbench .m-contract-reference')) {
      event.preventDefault(); event.target.dispatchEvent(new MouseEvent('click', {bubbles:true}));
    }
  });
  $('#global-search').addEventListener('input', event => {closeDrawer();state.search=event.target.value.trim();render()});
  function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
  render();
})();
