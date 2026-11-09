/* PC role workbenches. Read-only projections; all writes stay in existing business modules. */
(() => {
  const e = value => escapeHtml(String(value ?? ""));
  let customerQuery = "";
  let showAllInvoices = false;
  const terminal = t => ["已完成", "已取消"].includes(t.status);
  const person = () => currentRole().name;
  const own = name => Boolean(name) && name === person() && users.filter(u => u.name === name && isEnabled(u.status)).length === 1;
  const readableQuotes = () => quotations.filter(canReadQuotationRecord);
  const route = (label, target, style = "wb-link") => `<button type="button" class="${style}" data-wb-route="${e(JSON.stringify(target))}">${e(label)}</button>`;
  const empty = text => `<div class="wb-empty">${e(text || "暫無符合條件的工作")}</div>`;
  const note = text => `<p class="wb-note">${e(text)}</p>`;
  const tbd = (title, text) => `<div class="wb-boundary"><strong>${e(title)}</strong><p>${e(text)}</p></div>`;
  const number = n => Number(n || 0).toLocaleString("zh-HK");
  const money = n => `HKD ${number(n)}`;
  const customerFor = t => customers.find(c => c.id === t.customerId) || customers.find(c => c.nameZh === (t.customer || t.customerName));
  const identity = t => [t.contractNo || t.ecContractNo || customerFor(t)?.contractNo, t.customer || t.customerName || t.projectName || t.title].filter(Boolean).join(" · ");
  const group = (title, subtitle, content, extra = "", cls = "") => `<section class="wb-panel ${cls}"><header class="wb-panel-head"><div><h2>${e(title)}</h2>${subtitle ? `<p>${e(subtitle)}</p>` : ""}</div>${extra}</header>${content}</section>`;
  const stats = items => `<div class="wb-summary">${items.map(([label, count, hint, target]) => `<div class="wb-summary-item">${target ? route(label, target) : `<span>${e(label)}</span>`}<strong>${number(count)}</strong><small>${e(hint)}</small></div>`).join("")}</div>`;
  const tools = items => `<div class="wb-tools">${items.filter(x => !x[1].page || hasPagePermission(state.role, x[1].page)).map(([label, target]) => route(label, target, "wb-tool")).join("")}</div>`;
  const badge = status => `<span class="wb-status">${e(status || "未設定狀態")}</span>`;
  const sortDate = value => {
    const s = String(value || "");
    return /^\d{4}-\d{2}-\d{2}/.test(s) && Number.isFinite(Date.parse(s.replace(" ", "T"))) ? Date.parse(s.replace(" ", "T")) : 0;
  };
  const dateKey = value => /^\d{4}-\d{2}-\d{2}/.test(String(value || "")) ? String(value).slice(0, 10) : "";
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const byUpdate = list => [...list].sort((a, b) => sortDate(b.updatedAt || b.createdAt) - sortDate(a.updatedAt || a.createdAt));
  const taskTarget = t => ({ kind: "task", id: t.id, direct: Boolean(t.isDirectDispatchTask) });
  const taskRows = (list, { mode = "call", limit = 6, action = "查看詳情" } = {}) => list.length ? `<div class="wb-task-list">${list.slice(0, limit).map(t => {
    const target = mode === "task" ? taskTarget(t) : { kind: mode, id: t.id };
    const footer = mode === "task" && state.role === "TL" && t.tl === person() && t.status === "待完工確認"
      ? `<div class="wb-original-actions">${actionButtons(t)}</div>`
      : mode === "task" && state.role === "TL" && t.tl === person() && t.status === "待分派" && !t.isDirectDispatchTask
        ? route("安排分派", { kind: "processTask", id: t.id }) : route(action, target);
    return `<article class="wb-task"><div class="wb-task-top">${route(t.taskNo || t.id, target)}${badge(t.status)}${t.urgent ? '<span class="wb-urgent">緊急</span>' : ""}</div><h3>${e(identity(t) || t.id)}</h3><p>${e(t.rejectReason || t.desc || t.notes || t.title || "查看原業務資料")}</p><div class="wb-task-foot"><span>${e([t.area, t.master || t.tl || t.owner, t.updatedAt || t.createdAt].filter(Boolean).join(" · "))}</span>${footer}</div></article>`;
  }).join("")}${list.length > limit ? `<div class="wb-list-note">顯示 ${limit} 項，共 ${list.length} 項；其餘請到對應業務列表查看。</div>` : ""}</div>` : empty();
  const activity = (objects, targetFor, field = "records") => {
    const entries = objects.flatMap(t => (Array.isArray(t[field]) ? t[field] : []).map((r, index) => ({ t, r, index })));
    entries.sort((a, b) => sortDate(b.r.time || b.r.at || b.t.updatedAt) - sortDate(a.r.time || a.r.at || a.t.updatedAt) || b.index - a.index);
    return group("業務動態", "目前工作範圍內的原始操作記錄", entries.length ? `<div class="wb-activity">${entries.slice(0, 4).map(({ t, r }) => `<article><span class="wb-dot"></span><div><strong>${route(t.taskNo || t.id, targetFor(t))}<span>${e(r.actor || r.operator || "操作人未記錄")}</span></strong><p>${e(r.text || r.changes || r.action || "查看原記錄")}</p></div><time>${e(r.time || r.at || "時間未記錄")}</time></article>`).join("")}</div>` : empty("暫無相關操作記錄"), "", "wb-dynamics");
  };
  const reminders = () => {
    const rows = getUserNotifications().filter(n => !n.isRead).slice(0, 4);
    return group("系統提醒", "已讀與業務辦結分開記錄", rows.length ? `<div class="wb-reminders">${rows.map(n => `<article><strong>${e(n.title)}</strong><p>${e(n.subContent || n.content)}</p></article>`).join("")}</div>` : empty("暫無未讀提醒"), route("通知中心", { kind: "notifications" }));
  };
  const quoteRows = (list, limit = 6) => list.length ? `<div class="wb-table-wrap"><table class="wb-table"><thead><tr><th>報價／客戶</th><th>版本與狀態</th><th>金額</th><th>負責人</th><th>操作</th></tr></thead><tbody>${list.slice(0, limit).map(q => `<tr><td>${route(q.id, { kind: "quote", id: q.id })}<strong>${e(identity(q) || q.title)}</strong><small>${e(quotationSourceLabel(q))}${q.isSupplementary ? " · 後補記錄" : ""}</small></td><td><strong>R${e(Number(q.revision || 0))}</strong>${badge(quotationStatusLabel(q.status))}</td><td>${money(q.totalAmount || q.amount)}</td><td>${e(q.owner || "未指定")}</td><td>${route("查看報價", { kind: "quote", id: q.id })}</td></tr>`).join("")}</tbody></table>${list.length > limit ? `<p class="wb-list-note">顯示前 ${limit} 項，共 ${list.length} 項。</p>` : ""}</div>` : empty("暫無符合此範圍的報價");

  function customerMatches() {
    if (!customerQuery) return "";
    const matches = customers.filter(c => `${c.contractNo || ""} ${c.nameZh || ""} ${c.nameEn || ""}`.toLocaleLowerCase().includes(customerQuery.toLocaleLowerCase()));
    return `<div class="wb-search-results">${matches.length ? matches.slice(0, 6).map(c => `<div>${route(c.contractNo || c.id, { kind: "customer", page: "workorder", id: c.id })}<strong>${e(c.nameZh || c.nameEn)}</strong></div>`).join("") : empty("找不到符合的客戶或合同")}</div>`;
  }

  function cs() {
    const all = currentVisibleTickets(), open = all.filter(t => !terminal(t));
    const handed = t => isValidSupervisorName(t.tl) || Boolean(t.master || t.quotationRequested || t.quotationId || t.needsQuotation);
    const mine = open.filter(t => own(t.owner) && !handed(t) && !["已解决", "已解決"].includes(t.handlingMethod));
    const follow = open.filter(handed), urgent = open.filter(t => t.urgent);
    const logs = currentVisibleCallLogs();
    return `<div class="wb-intake"><div><h2>先受理，再交接</h2><p>以合同與客戶定位需求，讓每次來電都有去向。</p></div>${route("新增 CALL", { kind: "newCall", page: "workorder" }, "wb-primary")}</div>
      ${stats([["本人待跟進", mine.length, "依現有負責人標註"], ["已交接跟蹤", follow.length, "由主管、師傅或報價接續"], ["緊急 CALL", urgent.length, "工作範圍內的未結記錄"]])}
      <div class="wb-grid wb-cs-main"><div>${group("我的待跟進", "僅列本人標註且尚未交接的 CALL", taskRows(mine), route("CALL 列表", { page: "workorder", view: "calls" }))}${group("已交接工作", "業務跟蹤，不計入本人待辦", taskRows(byUpdate(follow), { limit: 3 }), route("查看全部", { page: "workorder", view: "calls" }))}</div>
      <aside>${group("客戶與合同", "查閱現有客戶資料與歷史 CALL", `<form class="wb-search" data-wb-customer-search><label for="wbCustomerQuery">合同編號或客戶名稱</label><input id="wbCustomerQuery" name="query" value="${e(customerQuery)}" placeholder="輸入合同編號或客戶名稱"><button class="wb-primary" type="submit">查詢客戶</button></form>${customerMatches()}${tools([["客戶列表", { page: "workorder", view: "customers" }], ["全部來電記錄", { kind: "callLogs" }]])}`)}${tbd("待客戶回覆 · TBD", "目前沒有可獨立核算的回覆狀態，請在原 CALL 資料中跟進。")}
      ${group("最近來電", "保留來電決策與原始記錄", logs.length ? `<div class="wb-call-log">${logs.slice(0, 4).map(l => `<article>${badge(l.decision)}<strong>${e(l.customer || "來電")}</strong><p>${e(l.content || "無補充內容")}</p><small>${e(l.time || "時間未記錄")}</small></article>`).join("")}</div>` : empty("暫無來電記錄"), route("全部來電", { kind: "callLogs" }))}</aside></div>${activity([...mine, ...follow].filter(t => own(t.owner)), t => ({ kind: "call", id: t.id }))}`;
  }

  function supervisor() {
    const b = getDispatchBuckets(false);
    const scope = t => t.tl === person();
    const pending = b.pending.filter(scope), approval = b.pendingApproval.filter(scope), completion = b.pendingCompletion.filter(scope);
    const pool = [...b.pending, ...b.pendingApproval, ...b.pendingCompletion].filter(t => !scope(t));
    const mine = [...completion, ...approval, ...pending];
    const abnormal = b.all.filter(t => !terminal(t) && (t.urgent || (t.rejectReason && t.status === "待分派")));
    return `${stats([["我的待處理", mine.length, "分派、申請及完工核對"], ["本區待認領", pool.length, "未指定有效主管的區域任務"], ["相關異常", abnormal.length, "緊急或退回待重新分派"]])}
      <div class="wb-grid wb-supervisor-main"><div>${group("我的待辦", `${completion.length} 項完工核對 · ${approval.length} 項接單申請 · ${pending.length} 項待分派`, taskRows(mine, { mode: "task" }), route("分派中心", { page: "dispatch", tab: "all" }))}
      ${pool.length ? group("本區待認領", "團隊範圍，查看不等於認領", taskRows(pool, { mode: "task", limit: 3 })) : note("本區暫無未指定主管的待認領任務。")}${abnormal.length ? group("異常關注", "異常可能與待辦重疊", taskRows(abnormal, { mode: "task", limit: 2 })) : ""}</div>
      <aside>${group("團隊調度", "已分派任務由師傅執行", `<div class="wb-team-count"><strong>${b.assigned.length}</strong><span>項執行中任務</span></div>${tools([["安排分派", { page: "dispatch", tab: "pending" }], ["完工核對", { page: "dispatch", tab: "pendingCompletion" }], ["團隊執行進度", { page: "dispatch", tab: "assigned" }], ["服務記錄", { page: "srFolder" }]])}${taskRows(b.assigned, { mode: "task", limit: 2 })}`)}</aside></div>
      ${activity(b.all, taskTarget)}`;
  }

  function quotes() {
    const all = readableQuotes();
    const source = q => !q.isSupplementary && !q.sourceTenderId && !q.tenderNo
      && !/自主|tender|標書|标书|邀標|邀标/i.test(String(q.source || ""))
      && Boolean(q.sourceCallId || q.sourceSrNo || ((q.sourceTicketId || q.ticketId)
        && /^(CS指派|CS請求|CALL轉入|工單轉入|CALL|工單|電話|WhatsApp|Email|主管指派|Service Report|SR)$/.test(String(q.source || ""))));
    const pool = all.filter(q => q.status === "待報價" && !q.owner && source(q));
    const mine = all.filter(q => !q.isSupplementary && own(q.owner) && ["待報價", "報價中", "需修訂"].includes(q.status));
    const supplementary = all.filter(q => q.isSupplementary);
    const department = all.filter(q => ["待報價", "報價中", "需修訂"].includes(q.status) && !q.isSupplementary);
    const work = mine.length ? mine : department;
    return `<div class="wb-quote-banner"><div><h2>需求有來源，報價有版本</h2><p>公共需求與本人負責的報價分開查看。</p></div>${tools([["新增報價", { kind: "newQuote", page: "quotations" }], ["報價管理", { page: "quotations" }]])}</div>
      ${stats([["公共待報價", pool.length, "CALL／SR來源，未指定負責人"], ["本人待報價", mine.filter(q => q.status === "待報價").length, "按現有負責人標註"], ["本人修訂中", mine.filter(q => q.status !== "待報價").length, "沿用原合併狀態口徑"]])}
      <div class="wb-grid wb-quote-main ${pool.length ? "" : "wb-quote-no-pool"}"><aside>${group("公共報價需求", "共用需求，不計入個人待辦", pool.length ? pool.slice(0, 5).map(q => `<article class="wb-pool-item">${route(q.id, { kind: "quote", id: q.id })}<h3>${e(identity(q))}</h3><p>${e(q.remark || q.title)}</p>${badge("待報價")}</article>`).join("") : empty("暫無未指定負責人的 CALL／SR 報價需求"))}${tbd("接手辦理 · TBD", "現有接手機制尚未閉環；保留查閱及原報價管理，首頁不自動更改負責人。")}</aside>
      <div>${group(mine.length ? "本人報價工作" : "部門報價跟進", mine.length ? "依現有負責人標註；查看版本與跟進記錄" : "目前沒有本人在辦報價；以下是部門可見業務，不計個人待辦", quoteRows(work), route("全部報價", { page: "quotations" }))}${activity(work, q => ({ kind: "quote", id: q.id }), "history")}</div></div>
      ${mine.length ? group("部門報價跟進", "部門可見業務，不計入個人待辦", quoteRows(department, 5)) : ""}${supplementary.length ? group("後補報價記錄", "已存在的後補標記；不重走接受、中單或收款", quoteRows(supplementary, 3)) : note("目前沒有後補報價記錄；後補不重走接受、中單或收款。")}`;
  }

  function tender() {
    const mine = tenders.filter(t => own(t.owner) && t.status === "待投標");
    const pending = tenders.filter(t => t.status === "待投標");
    const submitted = tenders.filter(t => t.status === "已投標");
    const deadlineRows = [...pending].sort((a, b) => (sortDate(a.deadline) || Infinity) - (sortDate(b.deadline) || Infinity));
    const table = deadlineRows.length ? `<div class="wb-table-wrap"><table class="wb-table wb-deadline-table"><thead><tr><th>截止日期</th><th>標書／項目</th><th>負責人</th><th>狀態</th></tr></thead><tbody>${deadlineRows.slice(0, 6).map(t => `<tr><td><strong>${e(dateKey(t.deadline) || "時間待確認")}</strong><small>${e(dateKey(t.deadline) ? (dateKey(t.deadline) < today() ? "已過截止日" : "依原截止日期跟進") : "不推算逾期")}</small></td><td>${route(t.id, { kind: "tender", id: t.id })}<strong>${e(t.projectName)}</strong><small>${e(t.client)}</small></td><td>${e(t.owner || "未指定")}</td><td>${badge(t.status)}</td></tr>`).join("")}</tbody></table></div>` : empty("暫無待投標項目");
    return `<div class="wb-section-title"><h2>期限與提交事項</h2>${tools([["新建標書", { kind: "newTender", page: "tender" }], ["標書管理", { page: "tender" }], ["報價查閱", { page: "quotations" }]])}</div>
      ${stats([["本人待處理", mine.length, "本人負責的待投標標書"], ["部門待投標", pending.length, "含未指派及其他負責人"], ["已投標跟蹤", submitted.length, "等待原業務結果更新"]])}
      ${group("標書期限清單", "有完整來源日期才顯示期限", table)}<div class="wb-grid">${group("本人標書任務", "製作進度沿用標書原狀態", taskRows(mine, { mode: "tender", limit: 3 }))}${group("結果跟蹤", "已投標不等於已中標", taskRows(submitted, { mode: "tender", limit: 3 }))}</div>
      ${tbd("正式回標與回執 · TBD", "目前列表未開放正式回標按鈕；請沿用原標書詳情及線下交付安排。")}${activity(tenders.filter(t => own(t.owner)), t => ({ kind: "tender", id: t.id }), "history")}`;
  }

  function master() {
    const mine = tickets.filter(t => own(t.master) || own(t.owner));
    const active = mine.filter(t => ["待確認", "待處理", "處理中"].includes(t.status));
    const scheduled = t => t.scheduleDate || t.scheduledDate || t.plannedDate || t.estimatedArrival || "";
    const todayRows = active.filter(t => dateKey(scheduled(t)) === today());
    const next = [...active].sort((a, b) => (sortDate(scheduled(a)) || Infinity) - (sortDate(scheduled(b)) || Infinity))[0];
    return `<div class="wb-field-hero"><div><span>下一項現場工作</span><h2>${e(next ? (next.customer || "現場任務") : "暫無待執行任務")}</h2><p>${e(next ? next.address || "地址請查看任務資料" : "已分派的工作會顯示在這裡")}</p><small>${e(next ? `${next.id} · ${scheduled(next) || "時間待確認"}` : "")}</small></div>${next ? route("查看任務", { kind: "masterTask", id: next.id }, "wb-primary") : ""}</div>
      ${stats([["待確認", active.filter(t => t.status === "待確認").length, "本人待接單任務"], ["現場執行中", active.filter(t => t.status !== "待確認").length, "待處理及處理中"], ["已交待核對", mine.filter(t => t.status === "待完工確認").length, "交主管接續，不是本人待做"]])}
      <div class="wb-grid wb-master-main">${group("今日工作", "只依現有完整排程日期", taskRows(todayRows, { mode: "masterTask" }), tools([["現場執行入口", { kind: "mobile" }]]))}
      ${group("本人現場任務", "包含時間待確認的已分派工作", taskRows(active, { mode: "masterTask", limit: 4 }), route("服務記錄", { page: "srFolder" }))}</div>
      ${note("請在現場執行入口接單、填寫或提交 SR／CP；已交待核對的任務由主管接續。")}${activity(mine, t => ({ kind: "masterTask", id: t.id }))}`;
  }

  const readContracts = () => { try { return JSON.parse(localStorage.getItem("ecinfo_maintenance_contracts")) || DEFAULT_MAINTENANCE_CONTRACTS; } catch { return DEFAULT_MAINTENANCE_CONTRACTS; } };
  function financialData() {
    const overrides = getBillingOverrides();
    const periods = readContracts().flatMap(generateContractBillingItems).filter(i => !invoices.some(inv => inv.contractId === i.contractId && inv.billingPeriod === i.billingPeriod)).map(i => { const ov = overrides[`${i.contractId}::${i.billingPeriod}`] || {}; return { ...i, ...ov, tenderAmount: ov.amount ?? i.tenderAmount }; }).filter(i => !i.cancelled);
    const pending = [...getFinancePendingQuotations(), ...periods];
    const unpaid = invoices.filter(i => i.status === "已開具");
    const docs = getFinancePendingQuotations().map(q => ({ q, missing: getQuotationMissingDocs(q) })).filter(x => x.missing.length);
    return { pending, unpaid, docs };
  }
  function finance() {
    const { pending, unpaid, docs } = financialData();
    const table = pending.length ? `<div class="wb-table-wrap"><table class="wb-table"><thead><tr><th>待開票事項／客戶</th><th>類別</th><th>金額</th><th>原操作</th></tr></thead><tbody>${(showAllInvoices ? pending : pending.slice(0, 8)).map(q => `<tr><td><strong>${e(q.id)}</strong><span>${e(q.customerName || q.title)}</span><small>${e(q.billingPeriod || q.title || "")}</small></td><td>${e(q.isMaintenance ? "合約帳期" : q.category || "報價")}</td><td>${money(q.tenderAmount ?? q.totalAmount ?? q.amount)}</td><td>${route("開票表單", { kind: "invoiceForm", id: q.id })}</td></tr>`).join("")}</tbody></table>${pending.length > 8 && !showAllInvoices ? `<div class="wb-list-note">顯示前 8 項，共 ${pending.length} 項。${route("展開完整清單", { kind: "allInvoices" })}</div>` : ""}</div>` : empty("暫無可列入原開票清單的事項");
    return `<div class="wb-finance-head"><h2>票款與業務完成分開跟進</h2>${tools([["發票管理", { page: "finance", tab: "invoices" }], ["收款記錄", { page: "finance", tab: "payments" }], ["登記收款", { kind: "paymentForm", page: "finance" }]])}</div>
      ${stats([["部門待開票", pending.length, "報價與未開票合約帳期"], ["待收款發票", unpaid.length, "沿用已開具狀態，非欠款金額推算"], ["資料欠件提示", docs.length, "原模組口徑，可能與待開票重疊"]])}
      <div class="wb-grid wb-finance-main"><div>${group("待開票工作清單", "部門工作，未新增個人核對狀態", table)}${group("待收款", "點擊進入原發票管理", unpaid.length ? `<div class="wb-receivables">${unpaid.slice(0, 4).map(i => `<article><div>${route(i.invoiceNo || i.id, { page: "finance", tab: "invoices" })}<strong>${e(i.customerName)}</strong></div><strong>${money(i.amount)}</strong><span>${e(i.dueDate || "到期日未記錄")}</span>${badge(i.status)}</article>`).join("")}</div>` : empty("暫無已開具而未標記收款的發票"))}</div>
      <aside>${group("待核對資料", "原開票欠件提示，不代表業務未完成", docs.length ? docs.slice(0, 4).map(({ q, missing }) => `<article class="wb-doc-item"><strong>${e(q.id)}</strong><p>${e(q.customerName)}</p><span>${e(missing.join("、"))}</span></article>`).join("") : empty("原清單暫無欠件提示"))}${tbd("財務原頁既有問題", "原待開票列表有既有載入問題；此處可查清單並開啟原開票表單。特殊票款與獨立核對流程仍待確認。")}</aside></div>
      ${group("最近收款記錄", "沿用現有收款資料，不代替對帳", payments.length ? `<div class="wb-receivables">${payments.slice(0, 4).map(p => `<article><div>${route(p.receiptNo || p.id, { page: "finance", tab: "payments" })}<strong>${e(p.customerName || p.invoiceId)}</strong></div><strong>${money(p.amount)}</strong><span>${e(p.paymentDate || p.date || "時間未記錄")}</span></article>`).join("")}</div>` : empty("暫無收款記錄"))}${reminders()}`;
  }

  function procurement() {
    const pending = purchaseOrders.filter(p => p.status === "待下單"), tracking = purchaseOrders.filter(p => ["已下單", "已發貨"].includes(p.status)), arrival = purchaseOrders.filter(p => ["已到貨", "已入庫"].includes(p.status));
    const orders = list => list.length ? `<div class="wb-table-wrap"><table class="wb-table"><thead><tr><th>採購單／供應商</th><th>狀態</th><th>預計到貨</th><th>金額</th><th>原業務</th></tr></thead><tbody>${list.slice(0, 6).map(p => { const sp = stockPreparations.find(s => s.id === p.spId || s.id === p.stockPreparationId || (s.poIds || []).includes(p.id)); return `<tr><td><strong>${e(p.id)}</strong><small>${e(p.supplierName || "供應商未記錄")}</small></td><td>${badge(p.status)}</td><td>${e(p.expectedDate || "時間待確認")}</td><td>${money(p.totalAmount)}</td><td>${route("查看採購資料", sp ? { kind: "sp", id: sp.id } : { page: "procurement" })}</td></tr>`; }).join("")}</tbody></table></div>` : empty();
    return `<div class="wb-section-title"><div><h2>從下單到到貨，逐項跟進</h2><p>採購 PO 與備貨 SP 分別記錄</p></div>${tools([["備貨管理", { page: "procurement" }], ["統計報表", { page: "report" }]])}</div>
      ${stats([["待下單 PO", pending.length, "部門採購工作"], ["採購跟進 PO", tracking.length, "已下單及已發貨"], ["到貨事項 PO", arrival.length, "已到貨及已入庫"]])}
      ${group("待採購", "進入備貨詳情，沿用原採購單動作", orders(pending))}<div class="wb-grid">${group("採購進度", "既有供應商與原狀態", orders(tracking))}${group("到貨事項", "到貨不等於施工放行", orders(arrival))}</div>
      ${group("材料與備貨背景", "SP 與 MR 分開；收到知會不自動變成採購待辦", stockPreparations.length ? `<div class="wb-stock-strip">${stockPreparations.slice(0, 4).map(s => `<article>${route(s.id, { kind: "sp", id: s.id })}<strong>${e(s.customerName)}</strong>${badge(s.status)}</article>`).join("")}</div>` : empty("暫無備貨單"))}${tbd("階段供料 · TBD", "本次材料可供施工的確認責任與憑據仍未定；不新增倉庫角色或首頁放行操作。")}${activity(purchaseOrders, p => ({ page: "procurement" }), "history")}`;
  }

  function cr() {
    const all = currentVisibleTickets(), active = all.filter(t => !terminal(t));
    const plans = (window.ecRemediation?.maintenancePlans || []).filter(p => p.area === currentRole().area);
    const ownQuotes = readableQuotes().filter(q => isOwnQuotation(q));
    const visits = plans.flatMap(p => (p.visits || []).map(v => ({ p, v })));
    return `<div class="wb-cr-banner"><div><h2>${e(currentRole().area || "未設定區域")} 客戶與履約協調</h2><p>本次服務、整期保養與新維修分開跟進。</p></div>${tools([["客戶與 CALL", { page: "workorder", view: "customers" }], ["保養計劃", { page: "maintenance" }]])}</div>
      ${stats([["區域未結 CALL", active.length, "區域業務跟蹤，非全部本人辦理"], ["保養期次", visits.length, "目前區域計劃的既有期次"], ["本人相關報價", ownQuotes.length, "本人建立／提交的既有可讀例外"]])}
      <div class="wb-grid wb-cr-main"><div>${group("區域協調工作", "查看客戶、當前主管與師傅", taskRows(byUpdate(active)), route("區域 CALL", { page: "workorder", view: "calls" }))}${group("本人相關報價", "保留原可見例外，不擴全域", quoteRows(ownQuotes, 3))}</div>
      <aside>${group("保養期次安排", "一次上門完成不等於整個 M 完成", visits.length ? visits.slice(0, 5).map(({ p, v }) => `<article class="wb-visit"><strong>${e(p.customerName)}</strong><span>${e(v.dateTime || v.dueDate || "時間待確認")}</span><small>${e(v.master || "尚未安排師傅")} · ${e(v.status)}</small>${route(v.ticketId || "查看計劃", v.ticketId ? { kind: "call", id: v.ticketId } : { page: "maintenance" })}</article>`).join("") : empty("目前區域暫無保養期次"))}${group("常用操作", "沿用區域與單據權限", tools([["分派中心", { page: "dispatch", tab: "all" }], ["服務記錄", { page: "srFolder" }], ["報價管理", { page: "quotations" }], ["備貨查閱", { page: "procurement" }]]))}</aside></div>${activity(all, t => ({ kind: "call", id: t.id }))}`;
  }

  function management(admin) {
    const calls = currentVisibleTickets().filter(t => !terminal(t));
    const qs = readableQuotes().filter(q => ["待報價", "報價中", "需修訂"].includes(q.status));
    const pos = purchaseOrders.filter(p => !["已驗收", "已取消"].includes(p.status));
    const unconfirmed = tickets.filter(t => t.status === "待完工確認");
    const groups = [["CALL 交接", "受理及客戶工作", calls.length, { page: "workorder", view: "calls" }], ["任務核對", "待主管核對完工", unconfirmed.length, { page: "dispatch", tab: "pendingCompletion" }], ["報價工作", "待報價及修訂中", qs.length, { page: "quotations" }], ["標書進度", "待投標項目", tenders.filter(t => t.status === "待投標").length, { page: "tender" }], ["材料採購", "未驗收／未取消 PO", pos.length, { page: "procurement" }], ["票款跟進", "已開具的待收款發票", invoices.filter(i => i.status === "已開具").length, { page: "finance", tab: "invoices" }]];
    const abnormal = calls.filter(t => t.urgent || (t.rejectReason && t.status === "待分派"));
    const overview = `<div class="wb-overview">${groups.map(([title, sub, n, target]) => `<article><div><h3>${e(title)}</h3><p>${e(sub)}</p></div><strong>${number(n)}</strong>${route("查看工作", target)}</article>`).join("")}</div>`;
    return `<div class="wb-management-title"><div><h2>${admin ? "全局業務與系統工作" : "業務進展與關鍵關注"}</h2><p>按業務對象分組查看，數量不合併為個人待辦。</p></div>${route("統計報表", { page: "report" }, "wb-primary")}</div>
      ${stats([["未結 CALL", calls.length, "業務統計"], ["報價在辦", qs.length, "待報價及修訂中"], ["緊急關注", abnormal.length, "未結的原異常標記"]])}
      <div class="wb-grid ${admin ? "wb-admin-main" : "wb-boss-main"}"><div>${admin ? group("各業務工作概覽", "逐項進入原業務模組", overview) : group("需要關注的客戶工作", "保留原優先級與業務負責人", taskRows(byUpdate(abnormal), { limit: 4 }))}${admin ? group("管理工具", "原有設置與資料入口", tools([["基礎設置", { page: "settings" }], ["用戶管理", { page: "settings", settings: "user" }], ["客戶資料", { page: "workorder", view: "customers" }]])) : group("跨業務進度", "不同對象分別計數", overview)}</div>
      <aside>${admin ? group("異常事項", "原有緊急與退回待分派記錄", taskRows(abnormal, { limit: 3 })) : reminders()}${admin ? reminders() : group("常用查閱", "不新增管理層審批流程", tools([["全部 CALL", { page: "workorder", view: "calls" }], ["報價管理", { page: "quotations" }], ["發票資料", { page: "finance", tab: "invoices" }]]))}</aside></div>${activity(calls, t => ({ kind: "call", id: t.id }))}`;
  }

  // Retain the old homepage's usable queries in a collapsed utility, never as the main dashboard.
  function legacyQueries() {
    const list = currentVisibleTickets();
    return `<details class="wb-legacy"><summary>CALL 與來電查詢 <span>保留原首頁查詢功能</span></summary><div class="wb-legacy-body"><div>${["全部", ...STATUSES].map(s => `<button type="button" class="wb-legacy-query" data-dashboard-metric="${e(s)}">${e(s === "全部" ? "全部 CALL" : s)} <strong>${s === "全部" ? list.length : list.filter(t => t.status === s).length}</strong></button>`).join("")}</div><button type="button" class="wb-tool" data-call-log-all>全部來電記錄</button></div></details>`;
  }

  let lastIdentity = "";
  const layouts = { CS: cs, TL: supervisor, QUO: quotes, TENDER: tender, MASTER: master, PUR: procurement, FIN: finance, CR: cr, ADMIN: () => management(true), BOSS: () => management(false) };
  renderDashboard = function () {
    const role = currentRole();
    const identityKey = `${state.role}:${state.currentPerson?.id || role.name}`;
    if (identityKey !== lastIdentity) { customerQuery = ""; showAllInvoices = false; lastIdentity = identityKey; }
    return `<section class="page active wb-workbench wb-role-${e(state.role)}" data-wb-role="${e(state.role)}"><header class="wb-heading"><div><h1>我的工作台</h1><p>${e(role.name)}，${e({ CS: "受理客戶需求，跟進每次交接。", TL: "安排團隊工作，核對每次完工。", QUO: "從需求到版本，推進負責的報價。", TENDER: "掌握期限與投標事項。", MASTER: "查看現場安排與本人的執行任務。", PUR: "按採購與到貨事項逐項跟進。", FIN: "獨立核對票款與業務資料。", CR: "協調區域客戶與保養服務。", ADMIN: "查看各業務工作與系統提醒。", BOSS: "關注關鍵客戶與業務進展。" }[state.role] || "查看目前業務工作。")}</p></div><div class="wb-identity">${appIcon("user", 18)}<span>${e(role.label)}<small>${e(currentUserArea() || role.dept || "")}</small></span></div></header>${(layouts[state.role] || (() => empty("此身份暫無工作台資料")))()}${legacyQueries()}${renderCallLogModal()}${renderDashboardMetricModal()}</section>`;
  };
  const originalShell = renderShell;
  renderShell = function () { originalShell(); if (state.view === "pc" && state.page === "dashboard") document.querySelector("#pageTitle").textContent = "我的工作台"; };

  function navigate(target) {
    const kind = target.kind;
    if (kind !== "notifications") closeNotificationPanel();
    if (kind === "allInvoices") { showAllInvoices = true; render(); return; }
    if (kind === "notifications") { if (!notificationState.panelOpen) toggleNotificationPanel(); return; }
    if (kind === "callLogs") { state.callLogModal = true; render(); return; }
    if (kind === "mobile") { openMobileWorkspace(); return; }
    if (kind === "masterTask") {
      const t = tickets.find(t => t.id === target.id && (own(t.master) || own(t.owner)));
      if (t && state.role === "MASTER") showDispatchTaskDrawer(t);
      return;
    }
    if (kind === "invoiceForm") {
      if (["FIN", "ADMIN", "BOSS"].includes(state.role) && financialData().pending.some(x => x.id === target.id)) createInvoice(target.id);
      return;
    }
    let page = target.page || ({ call: "workorder", task: "dispatch", quote: "quotations", processTask: "dispatch", tender: "tender", sp: "procurement" })[kind];
    if (!page || !hasPagePermission(state.role, page)) { toast("目前身份沒有此業務頁面的權限", "error"); return; }
    if (page === "dispatch") { state.dispatchTab = target.tab || "all"; state.dispatchFilters = { area: "全部", customer: "全部", source: "全部", assignedBy: "全部", master: "全部" }; state.dispatchPage = 1; }
    if (page === "workorder") { workOrderState.viewMode = target.view || (kind === "customer" ? "customers" : "calls"); workOrderState.selectedCustomerId = null; workOrderState.callFilters = { status: "全部", type: "全部", area: "全部", owner: "全部" }; workOrderState.currentPage = 1; workOrderState.callPage = 1; }
    if (page === "quotations") { quotationState.statusFilter = target.status || "全部"; quotationState.selectedQuotationId = null; quotationState.editMode = false; quotationState.revisionMode = false; }
    if (page === "finance") state.finTab = target.tab || "invoices";
    if (page === "tender") { state.tenderTab = "all"; state.selectedTenderId = kind === "tender" ? target.id : null; }
    if (page === "settings" && target.settings) state.settingsTab = target.settings;
    setPage(page);
    if (kind === "customer" && customers.some(c => c.id === target.id)) { workOrderState.selectedCustomerId = target.id; workOrderState.customerDrawerView = "info"; render(); }
    if (kind === "call") { const t = currentVisibleTickets().find(t => t.id === target.id); if (t) openCallDetail(t.id); }
    if (kind === "processTask") { const t = getDispatchBuckets(false).pending.find(t => t.id === target.id && t.tl === person()); if (t) openDispatchTaskProcessModal(t.id); }
    if (kind === "task") { const t = getDispatchBuckets(false).all.find(t => t.id === target.id && Boolean(t.isDirectDispatchTask) === target.direct); if (t) showDispatchTaskDrawer(t); }
    if (kind === "quote" && readableQuotes().some(q => q.id === target.id)) openQuotationDrawer(target.id);
    if (kind === "sp" && stockPreparations.some(s => s.id === target.id)) showSpDrawer(target.id);
    if (kind === "newCall") openCreateWorkOrderModal();
    if (kind === "newQuote") openCreateQuotation();
    if (kind === "newTender") openTenderModal();
    if (kind === "paymentForm") document.querySelector("[data-record-payment]")?.click();
  }
  document.addEventListener("click", event => {
    const button = event.target.closest(".wb-workbench [data-wb-route]");
    if (!button) return;
    event.stopImmediatePropagation();
    navigate(JSON.parse(button.dataset.wbRoute));
  });
  document.addEventListener("submit", event => {
    const form = event.target.closest("[data-wb-customer-search]");
    if (!form) return;
    event.preventDefault();
    customerQuery = String(new FormData(form).get("query") || "").trim();
    render();
  });
})();
