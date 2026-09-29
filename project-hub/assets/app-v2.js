(() => {
  const D = window.HUB_DATA;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const byId = name => new Map(D[name].map(item => [item.id, item]));
  const maps = { files: byId('files'), facts: byId('facts'), decisions: byId('decisions'), flows: byId('flows'), requirements: byId('requirements'), pages: byId('pages') };
  const counts = D.audit.counts;
  const primaryIa = [
    { id: 'overview', number: '01', title: '业务全景', children: [] },
    { id: 'flows', number: '02', title: '业务流程', children: D.flows.map(f => f.name) },
    { id: 'requirements', number: '03', title: '系统需求', children: ['功能清单', ...D.moduleNames] },
    { id: 'design', number: '04', title: '原型与设计', children: ['PRD', 'Prototype', 'SDD', 'TDD', 'Testing'] },
    { id: 'questions', number: '05', title: '待确认问题', children: [] },
    { id: 'status', number: '06', title: '项目状态', children: [] },
    { id: 'evidence', number: 'A', title: '证据与追溯', children: ['Source', 'Fact', 'Decision', 'Change', 'Traceability'] },
  ];
  const sections = Object.fromEntries(primaryIa.map(x => [x.id, x]));
  const state = { view: 'overview', sub: '', flow: 'FLOW-MAIN', module: '', factStatus: '', search: '' };
  const statusBadge = (status, delivery = false) => `<span class="badge ${esc(String(status).toLowerCase())} ${delivery ? 'delivery-state' : 'fact-state'}">${esc(status)}</span>`;
  const link = (kind, id, label) => `<button class="inline-link" data-kind="${esc(kind)}" data-id="${esc(id)}">${esc(label ?? id)}</button>`;
  const refs = (kind, ids, empty = 'UNLINKED') => ids?.length ? `<div class="refs">${ids.map(id => link(kind, id, id)).join('')}</div>` : `<span class="empty-ref">${esc(empty)}</span>`;
  const panel = (title, body, note = '') => `<section class="panel"><div class="panel-head"><div><h2>${esc(title)}</h2>${note ? `<p class="sub">${esc(note)}</p>` : ''}</div></div>${body}</section>`;
  const fileAnchor = (id, label) => { const f = maps.files.get(id); return f ? `<a class="file-link" href="${encodeURI(f.path)}" target="_blank" rel="noopener">${esc(label || f.name)} ↗</a>` : '<span class="empty-ref">MISSING SOURCE</span>'; };
  const fileRefList = ids => ids?.length ? `<div class="file-ref-list">${ids.map(id => { const f = maps.files.get(id); return f ? `<div><span>${statusBadge(f.deliveryStatus, true)}</span> ${fileAnchor(id)}<small class="path">${esc(f.projectPath)}</small></div>` : '' }).join('')}</div>` : '<div class="missing-box">MISSING</div>';
  const pendingForFlows = flowIds => D.questions.filter(q => ['OPEN', 'PENDING'].includes(q.status) && q.flowIds?.some(id => flowIds.includes(id))).length;
  const roleAliases = { TL: ['主管'], MASTER: ['师傅'], TENDER: ['tender', '标书'], PUR: ['采购'], WAREHOUSE: ['仓管', '仓务'], FIN: ['财务'] };
  const roleFlows = role => {
    const tokens = [role.code, role.name, ...(roleAliases[role.code] || [])].map(x => String(x).toLowerCase());
    return D.flows.filter(f => f.roles.some(label => tokens.some(token => String(label).toLowerCase().includes(token))));
  };
  const flowNodes = flow => `<div class="flow-strip">${flow.nodes.map((n, index) => `<button class="node" data-kind="node" data-id="${esc(n.id)}"><small>${String(index + 1).padStart(2, '0')} · ${esc(n.actor)}</small><strong>${esc(n.label)}</strong><span class="state">${esc(n.state)}</span><small>→ ${esc(n.nextRole)}</small></button>`).join('')}</div>`;
  const mapNode = ({ title, meta, nodeId = '', flowId = '', tone = '', className = '' }) => {
    const attrs = nodeId ? `data-kind="node" data-id="${esc(nodeId)}"` : flowId ? `data-view="flows" data-flow="${esc(flowId)}"` : '';
    const tag = attrs ? 'button' : 'div';
    return `<${tag} class="business-node ${tone} ${className}" ${attrs}><strong>${esc(title)}</strong>${meta ? `<span>${esc(meta)}</span>` : ''}</${tag}>`;
  };
  const sceneOverviewCard = ({ number, title, status, summary, flowId = '', pending = 0 }) => {
    const tag = flowId ? 'button' : 'div';
    const attrs = flowId ? `data-view="flows" data-flow="${esc(flowId)}"` : 'aria-label="该场景暂无独立详情页"';
    return `<${tag} class="scene-card scene-button overview-scene-card ${flowId ? '' : 'entry-only'}" ${attrs}><div class="scene-card-top"><span class="scene-number">${esc(number)}</span>${statusBadge(status)}</div><h3>${esc(title)}</h3><p>${esc(summary)}</p>${pending ? `<small>待确认 ${pending}</small>` : ''}${!flowId ? '<small>独立入口 · 详情待后续建立</small>' : ''}</${tag}>`;
  };
  const deliveryCard = item => `<button class="delivery-card" data-view="design" data-sub="${esc(item.kind)}"><strong>${esc(item.kind)}</strong>${statusBadge(item.status, true)}<small>${item.count} 个文件 · ${item.status === 'MISSING' ? '缺口' : '待内容核验'}</small></button>`;

  function nav() {
    $('#nav').innerHTML = primaryIa.map(section => `<div class="nav-group ${section.id === 'evidence' ? 'nav-secondary' : ''}"><button class="nav-main ${state.view === section.id ? 'active' : ''}" data-view="${section.id}"><span>${section.number}</span>${esc(section.title)}</button>${state.view === section.id && section.children.length ? `<div class="nav-children">${section.children.map(child => { const module = section.id === 'requirements' && D.moduleNames.includes(child) ? child : ''; return `<button class="nav-child ${state.sub === child ? 'selected' : ''}" data-view="${section.id}" data-sub="${esc(child)}" data-module="${esc(module)}">${esc(child)}</button>`; }).join('')}</div>` : ''}</div>`).join('');
    const sideLinks = $('.side-links');
    if (sideLinks && !sideLinks.querySelector('[data-sync-link]')) sideLinks.insertAdjacentHTML('beforeend', '<a data-sync-link href="../docs/KNOWLEDGE-SYNC-PROTOCOL.md">知识同步协议 ↗</a>');
    $('#view-title').textContent = state.search ? '全局搜索' : sections[state.view].title + (state.sub ? ' / ' + state.sub : '');
  }
  function overview() {
    const flowQuestions = D.questions.filter(q => ['OPEN', 'PENDING', 'CONFLICT'].includes(q.status) && q.flowIds?.length).sort((a, b) => a.priority.localeCompare(b.priority));
    const fallbackQuestions = D.questions.filter(q => ['OPEN', 'PENDING', 'CONFLICT'].includes(q.status) && ['Q-001', 'Q-002', 'Q-003', 'Q-004', 'Q-007', 'Q-008'].includes(q.id));
    const top = [...new Map([...flowQuestions, ...fallbackQuestions].map(q => [q.id, q])).values()].slice(0, 5);
    const governance = `<div class="overview-metrics"><button class="stat ok" data-view="evidence" data-sub="Decision"><strong>${counts.decisions}</strong><span>Confirmed</span></button><button class="stat pending" data-view="questions"><strong>${counts.openQuestions}</strong><span>Pending / Open</span></button><button class="stat conflict" data-view="evidence" data-sub="Fact"><strong>${counts.conflicts}</strong><span>Conflict</span></button><button class="stat base" data-view="requirements"><strong>${counts.requirements}</strong><span>REQ</span></button><button class="stat base" data-view="evidence" data-sub="Traceability"><strong>${counts.sourceToPrototypeCoveragePercent}%</strong><span>Prototype Coverage</span></button><button class="stat base" data-view="design" data-sub="Prototype"><strong>2.0</strong><span>Prototype</span></button></div>`;
    const businessMap = `<div class="business-map-grid"><div class="business-map-main"><div class="loop-back-rail" aria-hidden="true"></div>
      <section class="business-lane quote-lane"><div class="lane-heading"><span>01</span><div><strong>业务入口与报价生命周期</strong><small>客户需求进入报价，客户接受最终版本后，由报价组确认中单</small></div></div><div class="business-sequence quote-sequence">
        ${mapNode({ title: '客户需求', meta: '提出需求', nodeId: 'MAIN-01' })}
        ${mapNode({ title: 'CS / CR', meta: '识别与受理', nodeId: 'MAIN-02' })}
        ${mapNode({ title: '报价任务', meta: '进入报价链路', nodeId: 'P-01', className: 'quote-task-target' })}
        ${mapNode({ title: '报价组', meta: 'R1 / R2 / R3…', nodeId: 'P-02' })}
        ${mapNode({ title: '客户确认', meta: '接受最终报价', nodeId: 'MAIN-04' })}
        ${mapNode({ title: '中单 Gate', meta: '报价组确认中单', nodeId: 'MAIN-05', tone: 'gate' })}
      </div></section>
      <div class="map-down-arrow"><span>中单后按业务类型分流</span></div>
      <section class="business-lane fulfillment-lane"><div class="lane-heading compact-heading"><span>02</span><div><strong>中单后业务分流</strong><small>首页只展示履约骨架，详细节点在业务流程页查看</small></div></div><div class="branch-grid">
        <div class="branch-card branch-p"><button class="branch-title" data-view="flows" data-flow="FLOW-P"><b>P</b><span>Project / 报价维修</span></button><div class="compact-flow"><button data-kind="node" data-id="P-04">自动生成 MR</button><button data-kind="node" data-id="P-05">材料 / 采购</button><button data-kind="node" data-id="P-06">正式服务时间</button><button data-kind="node" data-id="P-07">施工</button></div></div>
        <div class="branch-card branch-m"><button class="branch-title" data-view="flows" data-flow="FLOW-M"><b>M</b><span>Maintenance / 周期保养</span></button><div class="compact-flow"><button data-kind="node" data-id="M-03">整期 Maintenance Plan</button><button data-kind="node" data-id="M-04">周期排期</button><button data-kind="node" data-id="M-05">上门保养</button></div></div>
        <div class="branch-card branch-mp"><div class="branch-title static"><b>M+P</b><span>同一报价 · 中单后双线推进</span></div><div class="mp-origin">同一报价 <i>→</i> 中单 <i>→</i> M + P</div><div class="parallel-lines"><button data-view="flows" data-flow="FLOW-M"><strong>M 线</strong><span>Maintenance</span></button><button data-view="flows" data-flow="FLOW-P"><strong>P 线</strong><span>MR / 材料 / 施工</span></button></div><p>独立或并行推进 · 无固定先后顺序</p></div>
      </div></section>
      <div class="map-merge"><span>P 施工 / M 保养 / M+P 对应业务执行汇合</span></div>
      <section class="business-lane completion-lane"><div class="lane-heading compact-heading"><span>03</span><div><strong>履约汇合与业务完成</strong><small>现场执行结果统一进入客户确认、SR 与完工确认</small></div></div><div class="business-sequence service-sequence">${mapNode({ title: '现场服务', meta: '施工 / 保养', nodeId: 'MAIN-07' })}${mapNode({ title: '客户确认 / 签名', meta: '确认现场结果', nodeId: 'MAIN-08' })}${mapNode({ title: 'Service Report', meta: '师傅提交 SR', nodeId: 'MI-03', tone: 'sr' })}${mapNode({ title: 'CR / 主管确认', meta: '简单确认', nodeId: 'P-09' })}${mapNode({ title: '完成', meta: '工单 / 本次保养完成', nodeId: 'MAIN-09', tone: 'complete' })}</div>
        <div class="sr-decision-row"><div class="decision-label"><span>Service Report</span><strong>需要报价？</strong></div><button class="return-yes" data-kind="node" data-id="P-01"><i>是</i><b>↖ 回到顶部「报价任务」</b><small>重新进入报价生命周期</small></button><div class="return-no"><i>否</i><span>CR / 主管确认</span><b>→</b><span>完成</span></div></div>
      </section>
      <section class="finance-hint"><strong>业务完成 ≠ 收款完成</strong><span>财务独立跟踪</span></section>
    </div><aside class="special-entry-column">
      <section class="special-entry cm-entry"><div class="special-head"><div><span>特殊入口</span><h3>CM</h3></div>${statusBadge('PARTIAL')}</div><div class="special-chain"><span>CM</span><i>→</i><span>指定师傅</span><i>→</i><span>服务</span><i>→</i><span>SR</span><i>→</i><span>完成</span></div><div class="pending-note">时间冲突 ${statusBadge('PENDING')}</div><button data-view="flows" data-flow="FLOW-CM">查看场景 →</button></section>
      <section class="special-entry tender-entry"><div class="special-head"><div><span>特殊入口</span><h3>Government Tender</h3></div>${statusBadge('PARTIAL')}</div><div class="special-chain"><span>Tender</span><i>→</i><span>报价 / 回标</span><i>→</i><span>结果</span></div><div class="tender-result"><span>中标</span><strong>→ M / P / M+P</strong></div><button data-view="flows" data-flow="FLOW-TENDER">查看场景 →</button></section>
    </aside></div>`;
    const sceneCards = [
      { number: '01', title: '普通报价维修', status: 'CONFIRMED', summary: '报价中单后自动生成 MR，材料就绪后确认时间并施工。', flowId: 'FLOW-P', pending: pendingForFlows(['FLOW-P']) },
      { number: '02', title: '保养发现问题后二次维修', status: 'CONFIRMED', summary: '保养 SR 选择需要报价，回到报价、中单、MR 与二次上门。', flowId: 'FLOW-MAINT-ISSUE', pending: pendingForFlows(['FLOW-MAINT-ISSUE']) },
      { number: '03', title: '现场即时维修', status: 'PARTIAL', summary: '现场即时处理真实存在；收款登记、交款和对账仍待确认。', flowId: 'FLOW-INSTANT', pending: pendingForFlows(['FLOW-INSTANT']) },
      { number: '04', title: '周期保养', status: 'CONFIRMED', summary: '中单后生成整期 Maintenance Plan，按周期排期和上门保养。', flowId: 'FLOW-M', pending: pendingForFlows(['FLOW-M']) },
      { number: '05', title: 'M+P', status: 'CONFIRMED', summary: '同一报价下 M 与 P 独立或并行推进，没有固定先后顺序。' },
      { number: '06', title: 'CM', status: 'PARTIAL', summary: 'CR / 主管直接指定师傅；时间冲突处理仍待确认。', flowId: 'FLOW-CM', pending: pendingForFlows(['FLOW-CM']) },
      { number: '07', title: 'Government Tender', status: 'PARTIAL', summary: '报价 / 回标后判断结果，中标后进入 M、P 或 M+P。', flowId: 'FLOW-TENDER', pending: pendingForFlows(['FLOW-TENDER']) },
    ];
    return `<div class="view overview-view"><div class="overview-intro"><p class="eyebrow">EC 工单系统 · Business Flow First</p><h2>EC 真实业务地图</h2><p>客户需求进入报价，经中单 Gate 分流至 M / P / M+P，最终汇合到服务、SR 与完成；点击节点可下钻查看依据。</p></div>
      <section class="overview-map-panel"><div class="map-context">报价生命周期 <b>→</b> 中单 Gate <b>→</b> M / P / M+P <b>→</b> 履约 / SR / 完成</div>${businessMap}</section>
      ${panel('7 个核心业务场景', `<div class="scene-grid overview-scene-grid">${sceneCards.map(sceneOverviewCard).join('')}</div>`, '点击已有入口进入对应业务流程；M+P 暂无独立详情页，仅保留入口状态')}
      ${panel('项目状态摘要', governance, '业务地图之后再看确认、缺口和交付覆盖')}
      ${panel('角色地图', `<div class="role-map">${D.roles.map(r => { const related = roleFlows(r); return `<button data-kind="role" data-id="${r.id}"><strong>${esc(r.code)}</strong><span>${esc(r.name)}</span><small>参与：${esc(related.slice(0, 3).map(f => f.name.replace(/^\d+\s*/, '')).join('、') || '待映射')}</small></button>`; }).join('')}</div>`, '角色职责、负责阶段和参与流程来自现有角色资料与 Flow 关联；待映射表示现有 Flow 未明确该角色')}
      <div class="overview-bottom">${panel('当前关键业务问题', `<div class="compact-list">${top.map(q => `<button data-kind="question" data-id="${q.id}"><b>${esc(q.priority)}</b> ${esc(q.title)}</button>`).join('')}</div><button class="inline-link" data-view="questions">查看全部业务问题 →</button>`)}${panel('项目交付状态', `<div class="delivery-grid">${D.deliverables.map(deliveryCard).join('')}</div>`, '交付状态放在业务理解之后；仅表示资料与追溯核验程度')}</div>
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
    if (sub === '事实条目') return `<div class="view">${panel('事实条目', `<div class="toolbar"><select id="fact-status-filter"><option value="">全部事实状态</option>${['CONFIRMED','PARTIAL','OPEN','CONFLICT'].map(s=>`<option value="${s}" ${state.factStatus===s?'selected':''}>${s}</option>`).join('')}</select><span class="sub">筛选仅作用于事实条目，不改变确认状态</span></div>${factTable(D.facts.filter(f=>!state.factStatus||f.status===state.factStatus))}`, '17 条本轮确认事实 + 28 条带来源的历史规则；历史规则不自动提升为当前确认')}</div>`;
    if (sub === '待确认事项') return `<div class="view">${panel('待确认事项', questionsList(D.questions.filter(q => q.status === 'OPEN')), '业务 Open Question 与历史审计问题分开标识')}</div>`;
    return `<div class="view">${panel('冲突与差异', conflictsList(), '原始资料、讨论结论、PRD 与原型之间的已识别差异')}${panel('历史规则冲突', factTable(D.facts.filter(f => f.status === 'CONFLICT')))}</div>`;
  }
  function findFlowBySub() { return D.flows.find(f => f.name === state.sub) || maps.flows.get(state.flow) || D.flows[0]; }
  function flowsView() {
    const f = findFlowBySub(); state.flow = f.id;
    const reqs = D.requirements.filter(r => r.flowIds.includes(f.id));
    const questionItems = D.questions.filter(q => q.flowIds?.includes(f.id));
    const source = [...new Set([...f.sourceFileIds, ...f.decisionIds.flatMap(id => maps.decisions.get(id)?.sourceFileIds || [])])];
    const prd = [...new Set(reqs.flatMap(r => r.prdFileIds))];
    const pageIds = [...new Set(reqs.flatMap(r => r.pageIds))];
    return `<div class="view">${panel('完整业务流程 · ' + f.name, `<div class="flow-meta"><div><strong>业务目的</strong><p>${esc(f.purpose)}</p></div><div><strong>触发条件</strong><p>${esc(f.trigger)}</p></div><div><strong>事实状态</strong><p>${statusBadge(f.factStatus)}</p></div></div><p class="flow-instruction">按角色 → 动作 → 状态 → 下一角色阅读。点击任一节点，先看业务说明，再看 Decision、Fact、Source 和系统承接。</p>${flowNodes(f)}`, f.summary)}
      <div class="detail-columns">${panel('参与角色与关键状态', `<h3>参与角色</h3><div class="tag-wrap">${f.roles.map(role => `<span class="chip">${esc(role)}</span>`).join('')}</div><h3>关键状态</h3><div class="tag-wrap">${f.keyStates.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>`)}${panel('关键业务规则与 Decision', `<h3>Fact</h3>${refs('fact', f.factIds)}<h3>Decision</h3><div class="ref-stack">${f.decisionIds.map(id => { const d = maps.decisions.get(id); return `<div>${link('decision', id)} ${esc(d?.title || '')}</div>` }).join('')}</div><h3>Open Question</h3>${questionItems.length ? questionsList(questionItems) : '<span class="empty-ref">当前场景无单独登记问题；通用问题见事实库</span>'}${f.openDecisionIds.length ? refs('decision', f.openDecisionIds) : ''}`)}</div>
      <div class="detail-columns">${panel('关联事实来源', fileRefList(source))}${panel('关联需求与设计', `<h3>功能需求 ${reqs.length}</h3>${refs('requirement', reqs.map(r => r.id))}<h3>PRD</h3>${fileRefList(prd)}<h3>原型页面</h3>${refs('page', pageIds)}<p class="sub">关联只表示可追溯的主题对应；原型行为是否对齐当前决策仍待核验。</p>`)}</div>
    </div>`;
  }
  function reqTable(list) { return `<div class="table-wrap"><table><thead><tr><th>REQ</th><th>功能需求</th><th>模块</th><th>状态</th><th>流程</th><th>PRD / 原型</th></tr></thead><tbody>${list.map(r => `<tr><td>${link('requirement', r.id, r.id + ' / ' + r.legacyId)}</td><td>${esc(r.title)}</td><td>${esc(r.module)}</td><td>${statusBadge(r.status)}</td><td>${refs('flow', r.flowIds)}</td><td>${r.prdFileIds.length ? 'PRD ' + r.prdFileIds.length : 'UNLINKED PRD'} · ${r.pages.length ? 'PAGE ' + r.pages.length : 'UNLINKED PROTOTYPE'}</td></tr>`).join('')}</tbody></table></div>`; }
  function designView() {
    const sub = state.sub || '功能清单';
    const toolbar = `<div class="toolbar"><select id="module-filter"><option value="">全部模块</option>${D.moduleNames.map(m => `<option value="${esc(m)}" ${state.module === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select><span class="sub">需求状态 OPEN 表示原确认栏仍待确认</span></div>`;
    if (sub === '功能清单') return `<div class="view">${panel('功能清单', `${toolbar}${reqTable(D.requirements.filter(r => !state.module || r.module === state.module))}`, '80 项历史功能需求，保留原 REQ/F 编号与原确认状态')}</div>`;
    const kind = sub === 'Testing' ? 'Testing' : sub;
    const fs = D.files.filter(f => f.category === kind);
    const overview = D.deliverables.find(d => d.kind === kind);
    return `<div class="view">${panel(kind, `<div class="coverage-intro">${statusBadge(overview.status, true)} <span>${fs.length} 个文件 · ${esc(overview.note)}</span></div>${fs.length ? `<div class="artifact-list">${fs.map(f => `<div>${link('file', f.id, f.name)}<small class="path">${esc(f.projectPath)}</small><span>${statusBadge(f.deliveryStatus, true)}</span></div>`).join('')}</div>` : '<div class="missing-box">MISSING：项目中未识别到正式对应文件。</div>'}`, '资料存在、范围覆盖与验收状态独立记录')}
      ${kind === 'Prototype' ? panel('原型整改与回归', `<p>自动回归 ${D.prototypeRegression?.passed || 0}/${D.prototypeRegression?.total || 0} PASS；人工验收仍待完成，不能标为 VERIFIED。</p>${fileRefList([fileIdByPath('review/prototype-remediation/REMEDIATION-RESULT.md'),fileIdByPath('review/prototype-remediation/evidence/regression-results.json')].filter(Boolean))}`) + panel('原型页面地图', `<div class="page-grid">${D.pages.map(p => `<button data-kind="page" data-id="${p.id}"><strong>${esc(p.id)} · ${esc(p.name)}</strong><small>${esc(p.key)} · ${p.requirementIds.length} 条需求</small></button>`).join('')}</div>`, '点击页面可反查 REQ → Flow → Decision → Fact → Source') : ''}
      ${panel('模块完成度', `<div class="module-grid">${D.moduleNames.map(m => { const items = D.requirements.filter(r => r.module === m); const linked = items.filter(r => r.flowIds.length).length; return `<button class="module-card" data-view="design" data-sub="功能清单" data-module="${esc(m)}"><h3>${esc(m)}</h3><p>${linked}/${items.length} 需求已关联当前场景</p>${statusBadge(linked === items.length ? 'PARTIAL' : 'DRAFT', true)}</button>` }).join('')}</div>`, '仅统计知识关联，不代表功能实现')}</div>`;
  }
  function requirementsView() {
    const selectedModule = D.moduleNames.includes(state.sub) ? state.sub : state.module;
    const list = D.requirements.filter(r => !selectedModule || r.module === selectedModule);
    return `<div class="view">${panel('系统需求', `<div class="requirements-intro"><strong>按真实业务模块查看系统如何承接流程。</strong><span>REQ 状态仍保留原确认栏；业务流程关联不等于需求已批准。</span></div>${reqTable(list)}`, selectedModule ? `当前模块：${selectedModule}` : '从业务流程进入需求，或按模块查看承接范围')}</div>`;
  }
  function questionsView() {
    const business = D.questions.filter(q => ['OPEN', 'PENDING', 'CONFLICT'].includes(q.status) && (q.flowIds?.length || ['Q-001', 'Q-002', 'Q-003', 'Q-004', 'Q-007', 'Q-008'].includes(q.id)));
    return `<div class="view">${panel('待确认问题', questionsList(business), '只显示影响业务流程、范围或角色边界的问题；技术型 UNLINKED 保留在证据与追溯中')}${panel('问题分类', `<div class="question-summary"><div><strong>${business.filter(q => q.priority === 'P0').length}</strong><span>P0 业务阻塞</span></div><div><strong>${business.filter(q => q.priority === 'P1').length}</strong><span>P1 业务边界</span></div><div><strong>${business.filter(q => q.priority === 'P2').length}</strong><span>P2 后续确认</span></div></div>`)}</div>`;
  }
  function evidenceView() {
    const sub = state.sub || 'Source';
    if (sub === 'Source') return `<div class="view">${sourceList()}</div>`;
    if (sub === 'Fact') return `<div class="view">${panel('Fact · 事实与规则', `<div class="toolbar"><select id="fact-status-filter"><option value="">全部事实状态</option>${['CONFIRMED', 'PARTIAL', 'OPEN', 'CONFLICT'].map(s => `<option value="${s}" ${state.factStatus === s ? 'selected' : ''}>${s}</option>`).join('')}</select><span class="sub">证据层入口；事实状态不等同于交付状态</span></div>${factTable(D.facts.filter(f => !state.factStatus || f.status === state.factStatus))}`)}</div>`;
    if (sub === 'Decision') return `<div class="view">${decisionView()}</div>`;
    if (sub === 'Change') return `<div class="view">${panel('Change · 已确认变化', D.changes.map(c => `<button class="decision-row" data-kind="change" data-id="${c.id}"><strong>${esc(c.id)} · ${esc(c.title)}</strong>${statusBadge(c.status)}</button>`).join(''), '保留变更前后的可追溯入口')}</div>`;
    return `<div class="view">${traceView()}</div>`;
  }
  function decisionView() {
    const sub = state.sub || 'Decision';
    if (sub === 'Open Question') return `<div class="view">${panel('Open Question', questionsList(D.questions), 'PENDING 与 CONFLICT 未被提升为已确认 Decision')}</div>`;
    if (sub === 'Change') return `<div class="view">${panel('已确认变化', D.changes.map(c => `<button class="decision-row" data-kind="change" data-id="${c.id}"><strong>${esc(c.id)} · ${esc(c.title)}</strong>${statusBadge(c.status)}</button>`).join(''), '变化与旧结论均保留可追溯入口')}</div>`;
    return `<div class="view">${panel('已确认 Decision', `<div class="decision-list">${D.decisions.filter(d => d.status === 'CONFIRMED').map(d => `<button class="decision-row" data-kind="decision" data-id="${d.id}"><strong>${esc(d.id)} · ${esc(d.title)}</strong><span>${esc(d.content)}</span>${statusBadge(d.status)}</button>`).join('')}</div>`, '17 条已确认结论；每条可查看最终结论、来源、场景、模块与交付关联')}</div>`;
  }
  function traceView() {
    const rows = D.traces.filter(t => !state.module || maps.requirements.get(t.requirementId)?.module === state.module);
    const columns = [ ['sourceFileIds','Fact Source','file'], ['factIds','Fact','fact'], ['decisionIds','Decision','decision'], ['flowIds','Flow','flow'], ['requirementId','Requirement','requirement'], ['prdFileIds','PRD','file'], ['pageIds','Prototype','page'], ['sddFileIds','SDD','file'], ['tddFileIds','TDD','file'], ['testFileIds','Test','file'] ];
    const cell = (t, [key,,kind]) => { const ids = key === 'requirementId' ? [t[key]] : t[key]; return `<td>${ids?.length ? refs(kind, ids) : `<span class="empty-ref">${key === 'sourceFileIds' ? 'MISSING SOURCE' : 'UNLINKED'}</span>`}</td>`; };
    return `<div class="view">${panel('项目追溯矩阵', `<div class="toolbar"><select id="module-filter"><option value="">全部模块</option>${D.moduleNames.map(m => `<option value="${esc(m)}" ${state.module === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select><span class="sub">${counts.explicitTraceEdges} 条显式关联边 · ${counts.unlinkedRequirements} 条需求未关联当前场景</span></div><div class="table-wrap"><table class="trace-table"><thead><tr>${columns.map(c => `<th>${c[1]}</th>`).join('')}<th>标记</th></tr></thead><tbody>${rows.map(t => `<tr>${columns.map(c => cell(t,c)).join('')}<td>${t.flags.map(x => `<span class="trace-flag">${esc(x)}</span>`).join('')}</td></tr>`).join('')}</tbody></table></div>`, '从任意 ID 点击可双向反查；缺少的环节保留空缺标记')}</div>`;
  }
  function statusView() {
    const a = D.audit;
    const gate = D.baseline;
    return `<div class="view">${panel('阶段与 Gate', `<div class="status-grid"><div><strong>事实审计</strong><span>${counts.indexedFiles} 个文件已索引；${counts.sourceFiles} 个原始/历史事实源</span>${statusBadge('PARTIAL',true)}</div><div><strong>业务确认</strong><span>${counts.decisions} 条 Decision 有来源；80 项需求仍待批准</span>${statusBadge('PARTIAL',true)}</div><div><strong>原型对齐</strong><span>当前 2.0；自动回归 ${counts.prototypeRegressionPassed}/${counts.prototypeRegressionTotal} 通过，待人工验收</span>${statusBadge('PARTIAL',true)}</div><div><strong>测试验收</strong><span>正式 Test/UAT 用例缺失</span>${statusBadge('MISSING',true)}</div></div><p class="sub">Gate：客户确认需求范围、原型整改人工验收、测试/UAT 用例建立后再评估开发阶段。</p>`)}
      ${panel('模块关联进度', `<div class="module-grid">${D.moduleNames.map(m => { const reqs = D.requirements.filter(r => r.module === m); const linked = reqs.filter(r => r.flowIds.length).length; return `<div class="module-card"><h3>${esc(m)}</h3><p>当前场景关联 ${linked}/${reqs.length}</p><progress max="${reqs.length}" value="${linked}"></progress></div>` }).join('')}</div>`)}
      ${panel('当前阻塞与下一步', `<ol>${['现场收款登记、交款与对账', 'CM 与 PM 时间冲突处理', '人工验收原型整改结果', '冻结一期范围及 80 项需求批准状态', '建立正式 Test/UAT 用例'].map(x => `<li>${esc(x)}</li>`).join('')}</ol>`)}
      ${panel('全量自动检查', `<div class="audit-grid">${a.checks.map(c => `<div><strong>${esc(c.name)}</strong><span>检查 ${c.checked} · 问题 ${c.issues}</span></div>`).join('')}</div><p class="sub">事实→原型六跳链路：${counts.sourceToPrototypeCoveragePercent}%（${counts.sourceToPrototypeChains}/${counts.requirements}）；严格九跳：${counts.strictChainCompletenessPercent}%；事实源入口：${counts.sourceCoveragePercent}%；Decision 来源：${counts.decisionSourceCoveragePercent}%。</p>`)}
    </div>`;
  }
  function searchView(query) {
    const low = query.toLowerCase(); const hits = [];
    for (const [kind, list, label] of [['fact',D.facts,x=>x.title+' '+x.statement],['decision',D.decisions,x=>x.title+' '+x.content],['flow',D.flows,x=>x.name+' '+x.summary],['requirement',D.requirements,x=>x.title+' '+x.legacyId],['page',D.pages,x=>x.name+' '+x.key],['file',D.files,x=>[x.name,x.projectPath,x.category,x.sourceType,...(x.aliases||[]),...(x.sourceIds||[])].join(' ')]]) {
      for (const item of list) if ((item.id+' '+label(item)).toLowerCase().includes(low)) hits.push({ kind, id:item.id, title:kind==='file'?item.name:item.title||item.name||item.content, note:kind==='file'?item.projectPath:item.status||'' });
    }
    return `<div class="view">${panel('全局搜索', `<p class="sub">“${esc(query)}” · ${hits.length} 条匹配；显示前 100 条</p><div class="search-results">${hits.slice(0,100).map(x => `<button class="search-hit" data-kind="${x.kind}" data-id="${x.id}"><strong>${esc(x.kind.toUpperCase())} · ${x.id}</strong><span>${esc(x.title)}</span><small>${esc(x.note)}</small></button>`).join('') || '<div class="empty-state">没有匹配结果</div>'}</div>`)}</div>`;
  }
  const renderers = { overview, flows: flowsView, requirements: requirementsView, design: designView, questions: questionsView, status: statusView, evidence: evidenceView, facts: factsView, decisions: decisionView, trace: traceView };
  function render() { nav(); $('#content').innerHTML = state.search ? searchView(state.search) : renderers[state.view](); }
  function closeDrawer() { $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true'); }
  function navigate(view, sub = '', flow = '', module = '') { closeDrawer(); state.view = view; state.sub = sub; state.module = module || (view === 'requirements' && D.moduleNames.includes(sub) ? sub : ''); state.factStatus = ''; if (flow) state.flow = flow; state.search = ''; $('#global-search').value = ''; render(); }

  function drawer(html) { $('#drawer-content').innerHTML = html; $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden','false'); }
  function detailRow(label, value) { return `<dt>${esc(label)}</dt><dd>${value ?? '<span class="empty-ref">UNLINKED</span>'}</dd>`; }
  function detail(id, kind) {
    if (kind === 'node') {
      const flow = D.flows.find(f => f.nodes.some(n => n.id === id)); const n = flow?.nodes.find(n => n.id === id); if (!n) return;
      const relReq = D.requirements.filter(r => r.flowIds.includes(flow.id));
      const nodeIndex = flow.nodes.findIndex(x => x.id === id); const previous = nodeIndex > 0 ? flow.nodes[nodeIndex - 1] : null;
      const factIds = [...new Set((n.decisionIds || []).map(x => 'FACT-' + x.slice(-3)).filter(x => maps.facts.has(x)))];
      const openQuestions = D.questions.filter(q => q.status === 'OPEN' && q.flowIds?.includes(flow.id));
      const decisionRows = (n.decisionIds || []).map(did => { const d = maps.decisions.get(did); return `<div class="knowledge-row">${link('decision', did)}<span>${esc(d?.title || d?.content || '')}</span></div>`; }).join('') || '<span class="empty-ref">当前节点没有单独挂载 Decision</span>';
      return drawer(`<div class="drawer-kicker">业务节点 · ${esc(flow.name)}</div><h2>${esc(n.label)}</h2>${statusBadge(n.status)}<section class="node-knowledge"><h3>业务说明</h3><dl class="detail-grid">${detailRow('负责角色', esc(n.actor))}${detailRow('前置条件', esc(previous ? `上一节点「${previous.label}」进入${previous.state}` : flow.trigger))}${detailRow('业务动作', esc(n.action))}${detailRow('输出结果', esc(`进入「${n.state}」，下一步由 ${n.nextRole} 承接`))}${detailRow('关键状态', esc(n.state))}</dl><p>${esc(n.description || '当前资料未提供该节点的额外说明。')}</p></section><h3>业务规则 / Decision</h3><div class="knowledge-list">${decisionRows}</div><h3>Fact</h3>${refs('fact', factIds)}<h3>原始依据</h3>${fileRefList(flow.sourceFileIds)}<h3>系统承接 · Requirement</h3>${refs('requirement', relReq.map(r => r.id))}<h3>PRD</h3>${fileRefList([...new Set(relReq.flatMap(r => r.prdFileIds))])}<h3>Prototype</h3>${refs('page', [...new Set(relReq.flatMap(r => r.pageIds))])}<h3>Open Question</h3>${openQuestions.length ? questionsList(openQuestions) : '<span class="empty-ref">当前节点没有已登记的 Open Question</span>'}`);
    }
    if (kind === 'fact') { const f=maps.facts.get(id); if(!f)return; return drawer(`<h2>${esc(f.id)} · ${esc(f.title)}</h2>${statusBadge(f.status)}<p>${esc(f.statement)}</p><p class="sub">${esc(f.evidenceNote)}</p><h3>Source</h3>${fileRefList(f.sourceFileIds)}<h3>Decision</h3>${refs('decision',f.decisionIds)}${f.supersededByDecisionId?`<h3>较新结论（覆盖此旧差异）</h3>${refs('decision',[f.supersededByDecisionId])}`:''}<h3>Flow</h3>${refs('flow',f.flowIds)}${f.legacyFlowIds?.length?`<h3>Legacy Flow</h3><span class="sub">${esc(f.legacyFlowIds.join(', '))}</span>`:''}`); }
    if (kind === 'decision') { const d=maps.decisions.get(id); if(!d)return; const reqs=D.requirements.filter(r=>r.decisionIds.includes(d.id)); return drawer(`<h2>${esc(d.id)} · ${esc(d.title)}</h2>${statusBadge(d.status)}<p>${esc(d.content)}</p><dl class="detail-grid">${detailRow('类型',esc(d.type))}${detailRow('时间',esc(d.date))}${detailRow('影响模块',esc(d.impactedModules.join('、')))}</dl><h3>来源</h3>${fileRefList(d.sourceFileIds)}<h3>影响场景</h3>${refs('flow',d.flowIds)}<h3>关联需求</h3>${refs('requirement',reqs.map(r=>r.id))}<h3>关联 PRD / Prototype</h3>${fileRefList([...new Set(reqs.flatMap(r=>[...r.prdFileIds,...r.prototypeFileIds]))])}`); }
    if (kind === 'flow') { const f=maps.flows.get(id);if(!f)return;state.flow=f.id;return navigate('flows',f.name,f.id); }
    if (kind === 'requirement') { const r=maps.requirements.get(id);if(!r)return;const t=D.traces.find(t=>t.requirementId===id);return drawer(`<h2>${esc(r.id)} / ${esc(r.legacyId)}</h2>${statusBadge(r.status)}<p>${esc(r.title)}</p><dl class="detail-grid">${detailRow('模块',esc(r.module))}${detailRow('原确认栏',esc(r.approvalStatus))}${detailRow('追溯状态',esc(t.flags.join(' · ')))}</dl><h3>直接来源</h3>${fileRefList(r.sourceFileIds)}<h3>当前 Fact → Decision → Flow</h3>${refs('fact',t.factIds)}${refs('decision',t.decisionIds)}${refs('flow',t.flowIds)}<h3>历史规则（仅供反查）</h3>${refs('fact',r.legacyFactIds)}<h3>PRD</h3>${fileRefList(r.prdFileIds)}<h3>Prototype</h3>${refs('page',r.pageIds)}<h3>SDD / TDD / Testing</h3><span class="empty-ref">UNLINKED / MISSING</span><p class="sub">${esc(r.note)}</p>`); }
    if (kind === 'page') { const p=maps.pages.get(id);if(!p)return;const related=p.requirementIds.map(rid=>maps.requirements.get(rid)).filter(Boolean);return drawer(`<h2>${esc(p.id)} · ${esc(p.name)}</h2>${statusBadge(p.status,true)}<p>原型内部页面键：<code>${esc(p.key)}</code></p><h3>当前原型文件</h3>${fileRefList(p.fileId?[p.fileId]:[])}<h3>PRD</h3>${fileRefList([...new Set(related.flatMap(r=>r.prdFileIds))])}<h3>Requirement</h3>${refs('requirement',p.requirementIds)}<h3>Flow</h3>${refs('flow',[...new Set(related.flatMap(r=>r.flowIds))])}<h3>Decision</h3>${refs('decision',[...new Set(related.flatMap(r=>r.decisionIds))])}<h3>Fact</h3>${refs('fact',[...new Set(related.flatMap(r=>r.decisionIds.map(id=>'FACT-'+id.slice(-3))))].filter(id=>maps.facts.has(id)))}<h3>Source</h3>${fileRefList([...new Set(related.flatMap(r=>r.sourceFileIds))])}<p class="sub">${esc(p.evidenceNote)}</p>`); }
    if (kind === 'file') { const f=maps.files.get(id);if(!f)return;return drawer(`<h2>${esc(f.name)}</h2>${statusBadge(f.deliveryStatus,true)}<div class="path">${esc(f.projectPath)}</div><div class="file-actions">${fileAnchor(id,'Open Source')}<button class="btn" data-copy="${esc(f.projectPath)}">Copy Path</button></div><dl class="detail-grid">${detailRow('File ID',esc(f.id))}${detailRow('SOURCE ID',(f.sourceIds||[]).length?esc(f.sourceIds.join('、')):null)}${detailRow('知识层级',f.knowledgeTier?esc(f.knowledgeTier):null)}${detailRow('类别',esc(f.category))}${detailRow('版本',esc(f.version))}${detailRow('类型',esc(f.type))}${detailRow('修改时间',esc(f.lastModified))}</dl><h3>关联事实</h3>${refs('fact',f.relatedFacts)}<h3>关联需求</h3>${refs('requirement',f.relatedRequirements)}<h3>关联流程</h3>${refs('flow',f.relatedFlows)}<h3>关联 Decision</h3>${refs('decision',f.relatedDecisions)}<h3>关联页面</h3>${refs('page',f.relatedPages)}`); }
    if (kind === 'question') { const q=D.questions.find(x=>x.id===id);if(!q)return;return drawer(`<h2>${esc(q.id)} · ${esc(q.title)}</h2>${statusBadge(q.status)}<p>${esc(q.reason || q.provenance || '')}</p><h3>Decision</h3>${q.decisionId?refs('decision',[q.decisionId]):'<span class="empty-ref">OPEN</span>'}<h3>来源</h3>${fileRefList(q.sourceFileIds)}<h3>影响流程</h3>${refs('flow',q.flowIds)}`); }
    if (kind === 'conflict') { const c=D.conflicts.find(x=>x.id===id);if(!c)return;return drawer(`<h2>${esc(c.id)} · ${esc(c.title)}</h2>${statusBadge(c.status)}<p>${esc(c.kind)}</p><p class="sub">${esc(c.evidenceNote || '')}</p><h3>证据</h3>${fileRefList(c.sourceFileIds)}<h3>Decision</h3>${refs('decision',c.decisionIds)}<h3>Requirement</h3>${refs('requirement',c.requirementIds)}`); }
    if (kind === 'change') { const c=D.changes.find(x=>x.id===id);if(!c)return;return drawer(`<h2>${esc(c.id)} · ${esc(c.title)}</h2>${statusBadge(c.status)}<h3>Decision</h3>${refs('decision',c.decisionIds)}<h3>来源</h3>${fileRefList(c.sourceFileIds)}`); }
    if (kind === 'role') { const r=D.roles.find(x=>x.id===id);if(!r)return;return drawer(`<h2>${esc(r.id)} · ${esc(r.name)}</h2>${statusBadge(r.status)}<dl class="detail-grid">${detailRow('代码',esc(r.code))}${detailRow('职责',esc(r.responsibility))}${detailRow('权限边界',esc(r.boundary))}</dl><h3>来源</h3>${fileRefList(r.sourceFileIds)}<p class="sub">历史角色审计；具体权限仍以客户确认结果为准。</p>`); }
  }
  function fileIdByPath(p){return D.files.find(f=>f.projectPath===p)?.id}
  document.addEventListener('click', event => {
    const copy=event.target.closest('[data-copy]'); if(copy){navigator.clipboard?.writeText(copy.dataset.copy).then(()=>toast('已复制原文件路径')).catch(()=>toast(copy.dataset.copy));return}
    if(event.target.closest('#drawer-close')){closeDrawer();return}
    const target=event.target.closest('[data-kind],[data-view]'); if(!target)return;
    if(target.dataset.kind){detail(target.dataset.id,target.dataset.kind);return}
    if(target.dataset.view)navigate(target.dataset.view,target.dataset.sub||'',target.dataset.flow||'',target.dataset.module||'');
  });
  document.addEventListener('change', event => { if(event.target.id==='module-filter'){state.module=event.target.value;render()} if(event.target.id==='fact-status-filter'){state.factStatus=event.target.value;render()} });
  document.addEventListener('keydown', event => { if(event.key==='Escape')closeDrawer() });
  $('#global-search').addEventListener('input', event => {closeDrawer();state.search=event.target.value.trim();render()});
  function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
  render();
})();
