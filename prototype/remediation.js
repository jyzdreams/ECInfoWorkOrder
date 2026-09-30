/* 2026-09-28 Prototype 演示：报价中单后可把演示 MR 写入真实宜搭仓库通。 */
(() => {
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const today = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  };
  const safe = value => escapeHtml(String(value ?? ""));
  let materialRequests = read("ecinfo_material_requests", []);
  let maintenancePlans = read("ecinfo_maintenance_plans", []);
  let quoteRequests = read("ecinfo_quote_requests", []);
  let warehouseSyncLogs = read("ecinfo_warehouse_sync_logs", []);
  const WAREHOUSE_APP = "倉庫通（宜搭）";
  const WAREHOUSE_SYNC_MODE = "REAL · 宜搭線上";
  const originalSave = saveDataToLocalStorage;
  saveDataToLocalStorage = function () {
    originalSave();
    localStorage.setItem("ecinfo_material_requests", JSON.stringify(materialRequests));
    localStorage.setItem("ecinfo_maintenance_plans", JSON.stringify(maintenancePlans));
    localStorage.setItem("ecinfo_quote_requests", JSON.stringify(quoteRequests));
    localStorage.setItem("ecinfo_warehouse_sync_logs", JSON.stringify(warehouseSyncLogs));
  };
  const findQuote = id => quotations.find(q => q.id === id);
  const findMr = id => materialRequests.find(m => m.id === id);
  const findPlan = id => maintenancePlans.find(p => p.id === id);
  const quoteMr = q => materialRequests.find(m => m.quotationId === q.id);
  const quotePlan = q => maintenancePlans.find(p => p.quotationId === q.id);
  const quoteForTicket = t => quotations.find(q => q.id === t.quotationId) || quotations.find(q => q.ticketId === t.id && q.status === "已中單");
  const quoteVersion = q => `R${Number(q.revision || 0)}`;
  const isM = q => q.category === "M" || q.category === "M+P";
  const isP = q => q.category === "P" || q.category === "M+P";
  const datePlusMonths = (date, months) => {
    const d = new Date(`${date}T12:00:00`);
    const originalDay = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + months);
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(originalDay, last));
    return d.toISOString().slice(0, 10);
  };
  const materialLines = q => (q.acceptedItems || q.items || []).filter(item => item.itemType === "物料" && Number(item.qty) > 0);

  function warehousePayload(mr) {
    const remoteMrId = mr.remoteMrId || `MR-DEMO-${mr.quotationId}-${today().replaceAll("-", "")}`;
    return {
      sourceSystem: "EC 工單原型",
      sourceRecordId: remoteMrId,
      idempotencyKey: `EC-MR:${mr.id}`,
      quotationId: mr.quotationId,
      quotationRevision: mr.acceptedRevision,
      ticketId: mr.ticketId || "",
      stockPreparationId: mr.spId || "",
      customerName: mr.customerName || "",
      contractTotal: Number(mr.contractTotal || 0),
      requestStatus: mr.status,
      requestedAt: mr.createdAt,
      materials: mr.lines.map(line => ({
        lineNo: line.id,
        name: line.name,
        specification: line.spec,
        unit: line.unit,
        quantity: line.qty,
        code: line.code || `DEMO-${mr.quotationId}-${line.id}`,
        category: line.category || "演示材料",
        brand: line.brand || "Demo",
        unitPrice: Number(line.unitPrice || 0),
        amount: Number(line.amount || (Number(line.qty) * Number(line.unitPrice || 0)))
      }))
    };
  }

  /*
   * 仓库通适配层通过同源本地代理写入真实宜搭 MR 表单。
   * 代理只写入 MR-DEMO 演示记录，并在创建前按 MR 号码回查去重。
   */
  async function syncMaterialRequestToWarehouseTong(mr, options = {}) {
    if (!mr) return null;
    if (mr.warehouseSync?.status === "已同步" && !options.force) return mr.warehouseSync;
    const payload = warehousePayload(mr);
    const startedAt = new Date().toLocaleString("zh-HK");
    mr.remoteMrId = payload.sourceRecordId;
    mr.warehouseSync = {
      ...(mr.warehouseSync || {}),
      targetApp: WAREHOUSE_APP,
      mode: WAREHOUSE_SYNC_MODE,
      status: "同步中",
      idempotencyKey: payload.idempotencyKey,
      lastAttemptAt: startedAt,
      payload
    };
    saveDataToLocalStorage();
    render();
    try {
      const response = await fetch("/api/warehouse-tong/material-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const receipt = await response.json().catch(() => ({}));
      if (!response.ok || !receipt.success || !receipt.formInstId) {
        throw new Error(receipt.message || `宜搭接口返回 ${response.status}`);
      }
      const syncedAt = new Date().toLocaleString("zh-HK");
      mr.warehouseSync = {
        ...mr.warehouseSync,
        status: "已同步",
        externalRecordId: receipt.formInstId,
        remoteMrId: receipt.mrId,
        remoteStatus: receipt.status,
        verifiedMaterialCount: receipt.verifiedMaterialCount,
        workbenchUrl: receipt.workbenchUrl,
        syncedAt,
        errorMessage: ""
      };
      if (!warehouseSyncLogs.some(log => log.idempotencyKey === payload.idempotencyKey && log.status === "已同步")) {
        warehouseSyncLogs.unshift({
          id: `WS-${Date.now()}-${warehouseSyncLogs.length + 1}`,
          mrId: mr.id,
          remoteMrId: receipt.mrId,
          quotationId: mr.quotationId,
          targetApp: WAREHOUSE_APP,
          mode: WAREHOUSE_SYNC_MODE,
          status: "已同步",
          idempotencyKey: payload.idempotencyKey,
          externalRecordId: receipt.formInstId,
          syncedAt
        });
      }
      saveDataToLocalStorage();
      render();
      toast(`已寫入真實倉庫通：${receipt.formInstId}`, "success");
      return mr.warehouseSync;
    } catch (error) {
      mr.warehouseSync = {
        ...mr.warehouseSync,
        status: "同步失敗",
        errorMessage: error.message || String(error)
      };
      saveDataToLocalStorage();
      render();
      toast(`倉庫通同步失敗：${mr.warehouseSync.errorMessage}`, "error");
      return mr.warehouseSync;
    }
  }
  // SR 是已确认的现场服务主单据；这里只决定主链入口，不判定 CP 是否另需存档。
  resolvePaperTypeByMaterial = function () {
    return { type: "服務報告", reason: "現場服務先提交 SR，CR／主管確認後完工；CP 適用規則待確認" };
  };

  function createMr(q, options = {}) {
    if (quoteMr(q)) {
      const existing = quoteMr(q);
      if (options.sync !== false && existing.warehouseSync?.status !== "已同步") syncMaterialRequestToWarehouseTong(existing);
      return existing;
    }
    const lines = materialLines(q);
    if (!lines.length) return null;
    const mr = {
      id: `MR-${q.id}`,
      quotationId: q.id,
      acceptedRevision: q.acceptedRevision,
      ticketId: q.ticketId || q.sourceTicketId || "",
      customerName: q.customerName || "",
      contractTotal: Number(q.totalAmount || q.amount || 0),
      status: "待備貨",
      createdAt: new Date().toLocaleString("zh-HK"),
      lines: lines.map((item, index) => ({
        id: index + 1, name: item.name || "", spec: item.spec || "", unit: item.unit || "件",
        qty: Number(item.qty), unitPrice: Number(item.unitPrice || 0), amount: Number(item.amount || 0), preparedQty: 0
      }))
    };
    materialRequests.unshift(mr);
    q.mrId = mr.id;
    const sp = createSpFromQuotation(q.id);
    if (sp) { sp.mrId = mr.id; mr.spId = sp.id; }
    saveDataToLocalStorage();
    if (options.sync !== false) syncMaterialRequestToWarehouseTong(mr);
    return mr;
  }

  function createMaintenancePlan(q) {
    if (quotePlan(q)) return quotePlan(q);
    const every = Number(q.acceptedServiceEveryMonths || q.serviceEveryMonths);
    const contractStart = q.acceptedContractStart || q.contractStart;
    const contractEnd = q.acceptedContractEnd || q.contractEnd;
    if (!Number.isInteger(every) || every < 1 || !contractStart || !contractEnd || contractEnd < contractStart) return null;
    const visits = [];
    for (let date = contractStart, i = 1; date <= contractEnd && i <= 120; date = datePlusMonths(contractStart, every * i), i++) {
      visits.push({ id: `${q.id}-M-${String(i).padStart(2, "0")}`, dueDate: date, status: "待排期", ticketId: "" });
    }
    const plan = {
      id: `MP-${q.id}`, quotationId: q.id, acceptedRevision: q.acceptedRevision,
      customerId: q.customerId || "", customerName: q.customerName || "", area: q.area || "",
      serviceEveryMonths: every, contractStart, contractEnd,
      createdAt: today(), visits
    };
    maintenancePlans.unshift(plan);
    q.maintenancePlanId = plan.id;
    saveDataToLocalStorage();
    return plan;
  }

  function confirmWon(q, form) {
    if (state.role !== "QUO" && state.role !== "ADMIN") { toast("由報價組確認中單", "error"); return false; }
    if (q.status === "已中單" && q.customerAcceptedAt) { toast("此成交版本已確認，沒有重複生成", "error"); return false; }
    if (!["M", "P", "M+P"].includes(q.category)) { toast("請先在報價階段設定 M／P／M+P 類別", "error"); return false; }
    const acceptedAt = form.elements.customerAcceptedAt.value;
    const acceptanceNote = form.elements.acceptanceNote.value.trim();
    if (!acceptedAt || !acceptanceNote) { toast("請記錄客戶接受日期及依據", "error"); return false; }
    if (isM(q) && (!Number.isInteger(Number(q.serviceEveryMonths)) || Number(q.serviceEveryMonths) < 1 || !q.contractStart || !q.contractEnd || q.contractEnd < q.contractStart)) {
      toast("M 報價須先設定服務週期及合約期間", "error"); return false;
    }
    const selectors = [...form.querySelectorAll("[data-final-item-type]")];
    if (selectors.some(select => !select.value)) { toast("請逐項區分報價物料與服務", "error"); return false; }
    selectors.forEach(select => { q.items[Number(select.dataset.finalItemType)].itemType = select.value; });
    q.customerAcceptedAt = acceptedAt;
    q.acceptanceNote = acceptanceNote;
    q.acceptedRevision = Number(q.revision || 0);
    q.acceptedItems = clone(q.items || []);
    if (isM(q)) {
      q.acceptedServiceEveryMonths = Number(q.serviceEveryMonths);
      q.acceptedContractStart = q.contractStart;
      q.acceptedContractEnd = q.contractEnd;
    }
    q.acceptedByQuotationTeam = currentRole().name;
    q.wonAt = new Date().toLocaleString("zh-HK");
    q.customerOrder = form.elements.customerOrder.value.trim();
    if (q.sourceTenderId || q.tenderNo) q.bidStatus = "已中標";
    q.status = "已中單";
    if (materialLines(q).length) createMr(q);
    else q.materialReadiness = "無需物料";
    if (isM(q)) createMaintenancePlan(q);
    if (!q.history) q.history = [];
    q.history.push({ action: "客戶接受並中單", time: q.wonAt, actor: currentRole().name,
      changes: `${quoteVersion(q)} · ${q.category} · ${acceptanceNote}` });
    notifyFinForWonQuotation(q);
    notifyQuotationCategory(q, "已確認中單");
    saveDataToLocalStorage();
    const mr = q.mrId ? findMr(q.mrId) : null;
    const syncText = mr ? `，正在同步${WAREHOUSE_APP}` : "";
    toast(`已確認 ${quoteVersion(q)} 中單${q.mrId ? `，MR ${q.mrId}` : ""}${syncText}`, "success");
    render();
    return true;
  }

  markQuotationWon = function (id) {
    const q = findQuote(id);
    if (!q) return;
    const tender = q.sourceTenderId ? tenders.find(t => t.id === q.sourceTenderId) : null;
    const modal = document.createElement("div");
    modal.className = "um-modal-overlay";
    modal.innerHTML = `<div class="um-modal rem-won-modal"><div class="um-modal-head"><div><h2>客戶接受最終報價</h2><p class="rem-modal-sub">${safe(id)} · 請記錄客戶確認資料</p></div><button class="um-modal-close" data-rem-close aria-label="關閉">×</button></div>
      <form data-rem-won-form="${safe(id)}" class="rem-won-form">
        <div class="rem-note"><span>成交版本</span><strong>${quoteVersion(q)}</strong><span>類別</span><strong>${safe(q.category || "未設定")}</strong>${tender ? `<span>標書</span><strong>${safe(tender.id)}</strong>` : ""}</div>
        <div class="rem-won-field-grid">
          <label class="rem-won-field"><span>客戶接受日期</span><input type="date" name="customerAcceptedAt" value="${today()}" required></label>
          <label class="rem-won-field"><span>客戶訂單號（如有）</span><input name="customerOrder" value="${safe(q.customerOrder || "")}" placeholder="可選填"></label>
        </div>
        <label class="rem-won-field rem-won-field-full"><span>客戶接受依據／回覆紀錄</span><textarea name="acceptanceNote" required placeholder="記錄郵件、訂單或確認方式；原型不代替真實憑證"></textarea></label>
        <section class="rem-final-section">
          <div class="rem-final-head"><div><h3>最終成交版明細</h3><p>請逐項標記材料或服務；只有材料行會生成 MR。</p></div><span class="rem-final-badge">${(q.items || []).length} 項</span></div>
          <div class="rem-final-list">
            ${(q.items || []).map((item, i) => `<div class="rem-item"><div class="rem-item-copy"><strong>${safe(item.name || `明細 ${i+1}`)}</strong><span>數量：${safe(item.qty || 1)}${item.unit ? ` · ${safe(item.unit)}` : ""}</span></div><label class="rem-item-select"><span>類型</span><select data-final-item-type="${i}"><option value="">請選擇類型</option><option value="物料" ${item.itemType === "物料" ? "selected" : ""}>物料</option><option value="服務" ${item.itemType === "服務" ? "selected" : ""}>服務／工時</option></select></label></div>`).join("") || '<p class="muted rem-empty-items">此報價無明細，不生成 MR。</p>'}
          </div>
        </section>
        <div class="rem-actions"><button type="submit" class="primary-btn">確認中單</button></div>
      </form></div>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-rem-close]").forEach(button => button.addEventListener("click", () => modal.remove()));
    modal.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      if (confirmWon(q, event.currentTarget)) modal.remove();
    });
  };
  const originalUpdateQuoteStatus = updateQuotationStatus;
  updateQuotationStatus = function (form, id) {
    if (form.get("newStatus") === "已中單") { markQuotationWon(id); return; }
    originalUpdateQuoteStatus(form, id);
  };

  /* 已中标 Tender 只建立/关联后续报价任务；不能代替客户接受及 QUO 中单。 */
  const originalTenderStatus = updateTenderStatus;
  updateTenderStatus = async function (id, newStatus) {
    if (newStatus !== "已中標") return originalTenderStatus(id, newStatus);
    const t = tenders.find(item => item.id === id);
    if (!t) return;
    t.status = "已中標";
    t.resultDate ||= today();
    const existing = findQuote(t.relatedQuotationId);
    if (existing) {
      existing.sourceTenderId ||= id;
      existing.category ||= t.tenderCategory || "";
      existing.tenderNo ||= id;
    } else {
      createQuotationFromTender(t);
    }
    saveDataToLocalStorage();
    state.selectedTenderId = null;
    toast("標書已中標；請由報價組完成客戶接受及中單確認", "success");
    render();
  };

  /* CS 先移交 CR/TL；CR 可沿用现有直接建待报价记录。 */
  const originalRequestQuotation = requestQuotationFromCall;
  requestQuotationFromCall = function (source) {
    if (state.role !== "CS") return originalRequestQuotation(source);
    const key = source.ticketId || source.callLogId;
    if (quoteRequests.some(r => r.sourceId === key && r.status === "待轉交")) { toast("已有待轉交的報價需求", "error"); return; }
    const ticket = source.ticketId ? ticketById(source.ticketId) : null;
    quoteRequests.unshift({ id: `QR-${Date.now()}`, sourceId: key, ticketId: source.ticketId || "", callLogId: source.callLogId || "",
      customerName: ticket?.customer || "", area: ticket?.area || "", requestedAt: new Date().toLocaleString("zh-HK"),
      requestedBy: currentRole().name, status: "待轉交" });
    if (ticket) ticket.quotationRequested = true;
    saveDataToLocalStorage();
    toast("已交 CR／主管審閱報價需求", "success");
    render();
  };

  window.ecRemediation = { get materialRequests() { return materialRequests; }, get maintenancePlans() { return maintenancePlans; },
    get quoteRequests() { return quoteRequests; }, get warehouseSyncLogs() { return warehouseSyncLogs; },
    createMr, createMaintenancePlan, findMr, findPlan, warehousePayload, syncMaterialRequestToWarehouseTong };

  /* 报价阶段维护服务周期；Billing Cycle 仍归财务模块，二者互不读取。 */
  const cycleFields = q => `<div class="rem-card"><h4>M 保養服務週期（M／M+P 填寫）</h4>
    <div class="rem-grid"><label>每幾個月服務一次<input type="number" min="1" max="60" name="serviceEveryMonths" value="${safe(q?.serviceEveryMonths || "")}"></label>
    <label>合約開始<input type="date" name="contractStart" value="${safe(q?.contractStart || "")}"></label>
    <label>合約結束<input type="date" name="contractEnd" value="${safe(q?.contractEnd || "")}"></label></div>
    <p class="muted">這是上門保養週期，不是會計帳單週期。</p></div>`;
  const originalQuoteEditForm = renderQuotationEditForm;
  renderQuotationEditForm = function (q) {
    const next = Number(q.revision || 0) + 1;
    const hint = `<div class="rem-note">當前 R${Number(q.revision || 0)}；手動保存修訂版將生成 R${next}。一般編輯只有價格變動時自動升版，歷史版保留快照。</div>`;
    return originalQuoteEditForm(q).replace("</form>", `${hint}${cycleFields(q)}</form>`);
  };
  function copyCycle(q, form) {
    if (!q || !form.has("serviceEveryMonths")) return;
    q.serviceEveryMonths = Number(form.get("serviceEveryMonths")) || null;
    q.contractStart = form.get("contractStart") || "";
    q.contractEnd = form.get("contractEnd") || "";
    saveDataToLocalStorage();
  }
  const originalSaveQuote = saveQuotation;
  saveQuotation = function (form, isEdit = false, id = null) {
    originalSaveQuote(form, isEdit, id);
    copyCycle(findQuote(id || form.get("id")), form);
    render();
  };
  const originalSaveQuoteEdit = saveQuotationEdit;
  saveQuotationEdit = function (form, id, isRevision) {
    originalSaveQuoteEdit(form, id, isRevision);
    copyCycle(findQuote(id), form);
    render();
  };

  const originalQuoteDrawer = renderQuotationDrawer;
  renderQuotationDrawer = function (q) {
    const html = originalQuoteDrawer(q);
    if (quotationState.editMode) return html;
    const mr = quoteMr(q);
    const customerPanel = `<div class="wo-detail-section"><div class="wo-detail-card"><h4>客戶信息</h4><div class="wo-detail-grid">
      <div class="wo-detail-item"><span class="wo-detail-label">客戶名稱</span><span class="wo-detail-value">${safe(q.customerName || "未設定")}</span></div>
      <div class="wo-detail-item"><span class="wo-detail-label">客戶編號</span><span class="wo-detail-value" style="color:var(--primary);font-weight:600;">${safe(q.customerId || "未設定")}</span></div>
    </div></div></div>`;
    const warehousePanel = mr ? `<div class="wo-detail-section"><div class="wo-detail-card rem-card rem-warehouse-card">
      <div class="wo-detail-card-heading"><h4>倉庫通同步</h4><span class="tag ${mr.warehouseSync?.status === "已同步" ? "success" : "warning"}">${safe(mr.warehouseSync?.status || "待同步")}</span></div>
      <div class="rem-grid">
        <div><span class="rem-label">材料申請單</span><strong>${safe(mr.id)}</strong></div>
        <div><span class="rem-label">倉庫通記錄</span><strong>${safe(mr.warehouseSync?.externalRecordId || "尚未取得")}</strong></div>
        <div><span class="rem-label">同步模式</span><strong>${safe(mr.warehouseSync?.mode || WAREHOUSE_SYNC_MODE)}</strong></div>
        <div><span class="rem-label">同步時間</span><strong>${safe(mr.warehouseSync?.syncedAt || "待同步")}</strong></div>
      </div>
      <p class="muted">此演示会写入真实宜搭「MR表單」；所有远端单号统一使用 MR-DEMO 前缀。</p>
    </div></div>` : "";
    return html
      .replace('<div class="qm-detail-tab-panel active" role="tabpanel" data-qm-detail-panel="quote">', `<div class="qm-detail-tab-panel active" role="tabpanel" data-qm-detail-panel="quote">${customerPanel}${warehousePanel}`)
      .replace('<div class="qm-detail-tab-panel" role="tabpanel" data-qm-detail-panel="delivery">', '<div class="qm-detail-tab-panel" role="tabpanel" data-qm-detail-panel="delivery">');
  };

  const originalWorkOrderDrawer = renderWorkOrderDrawer;
  renderWorkOrderDrawer = function (t) {
    const q = quoteForTicket(t), mr = q ? quoteMr(q) : null;
    const ready = !mr || mr.status === "材料就緒";
    const needsContractPanel = Boolean(q || mr || t.status === "待完工確認" || t.confirmedAt);
    const panel = needsContractPanel ? `<div class="wo-detail-section rem-progress-section">
      <div class="wo-detail-card rem-card rem-contract-card">
        <div class="wo-detail-card-heading"><h4>履約狀態</h4><span class="wo-detail-card-hint">報價、備貨與完工確認</span></div>
        <div class="rem-grid">
          <div><span class="rem-label">材料狀態</span><strong>${mr ? `${safe(mr.id)} · ${safe(mr.status)}` : q?.status === "已中單" ? "無材料申請" : "未關聯成交報價"}</strong></div>
          <div><span class="rem-label">完工確認</span><strong>${t.confirmedAt ? `${safe(t.confirmedBy || "")} · ${safe(t.confirmedAt)}` : "未完成"}</strong></div>
        </div>
        ${["CR", "TL"].includes(state.role) ? `<div class="rem-actions">${t.status === "待完工確認" ? `<button class="primary-btn" data-rem-confirm="${safe(t.id)}">確認 SR 並完工</button><button class="secondary-btn" data-rem-return="${safe(t.id)}">退回補充</button>` : ""}
        ${q && q.status === "已中單" ? `<label>與客戶確認正式時間 <input type="date" data-rem-formal-date="${safe(t.id)}" value="${safe(t.formalAppointmentAt || "")}" ${ready ? "" : "disabled"}></label><button class="primary-btn" data-rem-formal-save="${safe(t.id)}" ${ready ? "" : "disabled"}>確認正式時間</button>` : ""}</div>
        ${mr && !ready ? '<p class="muted rem-warning">材料未就緒，可先預排，但不可確認正式施工時間。</p>' : ""}` : ""}
      </div>
    </div>` : "";
    const html = originalWorkOrderDrawer(t);
    return html.replace('</div>\n          <div class="wo-drawer-footer wo-call-actions">', `${panel}</div>\n          <div class="wo-drawer-footer wo-call-actions">`);
  };

  if (!PAGES.some(p => p.key === "maintenance")) PAGES.splice(3, 0, { key: "maintenance", label: "保養計劃", icon: "📅", sub: "成交 M 報價的整期上門計劃" });
  ["CR", "TL", "QUO"].forEach(role => { if (Array.isArray(ROLE_PAGES[role]) && !ROLE_PAGES[role].includes("maintenance")) ROLE_PAGES[role].push("maintenance"); });
  const originalPc = renderPc;
  renderPc = function () {
    if (state.page !== "maintenance") return originalPc();
    document.querySelector("#pcPages").innerHTML = renderMaintenancePage();
  };
  function renderMaintenancePage() {
    return `<section class="page active"><div class="pc-container"><div class="pc-header"><h1>整期保養計劃</h1></div>
      <p class="muted">服務週期取自成交 M 報價，不取自會計 Billing Cycle。每期可獨立排期、提交 SR 並確認。</p>
      ${maintenancePlans.map(plan => `<div class="rem-card"><h3>${safe(plan.id)} · ${safe(plan.customerName)}</h3>
        <p>成交報價 ${safe(plan.quotationId)} R${safe(plan.acceptedRevision)} · 每 ${safe(plan.serviceEveryMonths)} 個月 · ${safe(plan.contractStart)} 至 ${safe(plan.contractEnd)}</p>
        <div class="pc-table-wrapper"><table class="pc-table"><thead><tr><th>期次</th><th>計劃到訪</th><th>CALL</th><th>狀態</th><th>操作</th></tr></thead><tbody>
        ${plan.visits.map(v => { const t = tickets.find(t => t.id === v.ticketId); return `<tr><td>${safe(v.id)}</td><td>${safe(v.dueDate)}</td><td>${safe(v.ticketId || "未建")}</td><td>${safe(t?.status || v.status)}</td><td>${v.ticketId ? `<button class="wo-view-btn" data-rem-call="${safe(v.ticketId)}">查看 CALL</button>` : ["CR", "TL"].includes(state.role) ? `<button class="primary-btn" data-rem-create-visit="${safe(plan.id)}" data-visit="${safe(v.id)}">建立本期 CALL</button>` : "待 CR／主管排期"}</td></tr>`; }).join("")}</tbody></table></div></div>`).join("") || '<div class="rem-card">尚無成交 M 報價的保養計劃。</div>'}
      </div></section>`;
  }

  const originalUpdateTicket = updateTicket;
  updateTicket = function (id, patch, note) {
    originalUpdateTicket(id, patch, note);
    const ticket = ticketById(id);
    if (ticket?.maintenancePlanId) {
      const plan = findPlan(ticket.maintenancePlanId);
      const visit = plan?.visits.find(v => v.id === ticket.maintenanceVisitId);
      if (visit && patch.status) {
        visit.status = patch.status;
        if (patch.status === "已完成") { visit.confirmedAt = ticket.confirmedAt; visit.serviceReportNo = ticket.serviceReportNo; }
        saveDataToLocalStorage();
      }
    }
  };

  document.head.insertAdjacentHTML("beforeend", `<style>
    .rem-card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px;margin:12px 0;color:var(--text)}
    .rem-card h3,.rem-card h4{margin:0 0 10px}.rem-card p{margin:8px 0}.rem-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    .rem-grid>div{background:var(--panel-soft);border-radius:8px;padding:10px}.rem-label{display:block;color:var(--muted);font-size:11px;margin-bottom:4px}.rem-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:12px}.rem-actions label{font-size:12px;color:var(--muted)}.rem-warning{font-size:12px;color:var(--muted)}
    .rem-tabs{display:flex;gap:8px;margin:12px 0}.rem-tabs button{border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:7px;padding:8px 16px;cursor:pointer}
    .rem-tabs button.active{background:var(--primary);color:white}.rem-toolbar{display:flex;gap:16px;margin:12px 0}.rem-toolbar label,.rem-card label{display:flex;gap:8px;align-items:center}
    .rem-card input,.rem-card select,.rem-toolbar input,.rem-toolbar select{border:1px solid var(--line);border-radius:6px;padding:7px;background:var(--panel);color:var(--text)}
    .rem-item{display:flex;justify-content:space-between;padding:7px;border-bottom:1px solid var(--line)}.rem-note{padding:10px;background:var(--primary-soft);border-radius:7px}
    .rem-won-modal{width:min(680px,calc(100vw - 32px));max-height:min(88vh,760px);padding:0;overflow:hidden;display:flex;flex-direction:column}
    .rem-won-modal .um-modal-head{margin:0;padding:22px 26px 16px;flex:0 0 auto}
    .rem-won-modal .um-modal-head h2{font-size:18px}
    .rem-modal-sub{margin:5px 0 0;color:var(--muted);font-size:12px}
    .rem-won-form{display:grid;gap:18px;padding:20px 26px 24px;overflow-y:auto}
    .rem-won-form .rem-note{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:12px 14px;border:1px solid var(--line);background:var(--primary-soft);color:var(--muted);font-size:13px}
    .rem-won-form .rem-note strong{color:var(--text);font-size:14px}
    .rem-won-field-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .rem-won-field{display:grid!important;align-items:stretch!important;gap:7px!important;color:var(--text)!important;font-size:13px!important}
    .rem-won-field>span{color:var(--muted);font-size:12px;font-weight:600}
    .rem-won-field input,.rem-won-field textarea{width:100%;box-sizing:border-box;min-height:40px;border:1px solid var(--line);border-radius:8px;background:var(--panel);color:var(--text);font:inherit;font-size:13px;padding:9px 11px}
    .rem-won-field input:focus,.rem-won-field textarea:focus{outline:2px solid rgba(30,107,255,.16);border-color:var(--primary)}
    .rem-won-field textarea{min-height:92px;resize:vertical;line-height:1.5}
    .rem-final-section{padding:16px;border:1px solid var(--line);border-radius:10px;background:var(--panel-soft)}
    .rem-final-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px}
    .rem-final-head h3{margin:0;color:var(--text);font-size:15px}
    .rem-final-head p{margin:5px 0 0;color:var(--muted);font-size:12px;line-height:1.45}
    .rem-final-badge{flex:0 0 auto;padding:4px 8px;border-radius:999px;background:var(--panel);color:var(--muted);font-size:11px}
    .rem-final-list{border-top:1px solid var(--line)}
    .rem-final-list .rem-item{display:grid;grid-template-columns:minmax(0,1fr) 160px;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--line)}
    .rem-final-list .rem-item:last-child{border-bottom:0}
    .rem-item-copy{display:grid;gap:4px;min-width:0}
    .rem-item-copy strong{overflow:hidden;color:var(--text);font-size:13px;text-overflow:ellipsis;white-space:nowrap}
    .rem-item-copy span{color:var(--muted);font-size:11px}
    .rem-item-select{display:grid!important;gap:5px!important;align-items:stretch!important;color:var(--muted)!important;font-size:11px!important}
    .rem-item-select select{width:100%;box-sizing:border-box;min-height:34px;border:1px solid var(--line);border-radius:7px;background:var(--panel);color:var(--text);font:inherit;font-size:12px;padding:0 8px}
    .rem-empty-items{margin:12px 0 0}
    .rem-won-form .rem-actions{justify-content:flex-end;margin-top:0;padding-top:16px;border-top:1px solid var(--line)}
    .rem-won-form .rem-actions button{min-width:104px;height:40px}
    .rem-warehouse-card{margin:0}
    @media(max-width:760px){.rem-grid{grid-template-columns:1fr}.rem-toolbar{flex-direction:column}.rem-won-modal{width:calc(100vw - 20px)}.rem-won-modal .um-modal-head{padding:18px 18px 14px}.rem-won-form{padding:16px 18px 18px}.rem-won-field-grid{grid-template-columns:1fr}.rem-final-list .rem-item{grid-template-columns:1fr;gap:9px}}
  </style>`);

  document.addEventListener("click", async event => {
    const target = event.target.closest("[data-rem-call],[data-rem-forward-quote],[data-rem-confirm],[data-rem-return],[data-rem-formal-save],[data-rem-mr],[data-rem-mr-save],[data-rem-mr-ready],[data-rem-warehouse-sync],[data-rem-plan-page],[data-rem-create-visit]");
    if (!target) return;
    if (target.dataset.remCall) { showWorkOrderDrawer(target.dataset.remCall); return; }
    if (target.dataset.remForwardQuote) {
      const request = quoteRequests.find(r => r.id === target.dataset.remForwardQuote);
      if (!request || !["CR", "TL"].includes(state.role)) return;
      request.status = "已轉交"; request.forwardedBy = currentRole().name; request.forwardedAt = new Date().toLocaleString("zh-HK");
      originalRequestQuotation({ ticketId: request.ticketId, callLogId: request.callLogId });
      saveDataToLocalStorage(); render(); return;
    }
    if (target.dataset.remConfirm) { performAction("confirmClose", target.dataset.remConfirm); render(); return; }
    if (target.dataset.remReturn) { performAction("returnWork", target.dataset.remReturn); render(); return; }
    if (target.dataset.remFormalSave) {
      const t = ticketById(target.dataset.remFormalSave), q = quoteForTicket(t), mr = q && quoteMr(q);
      if (!["CR", "TL"].includes(state.role) || !q || q.status !== "已中單" || (mr && mr.status !== "材料就緒")) return;
      const input = document.querySelector(`[data-rem-formal-date="${CSS.escape(t.id)}"]`);
      if (!input?.value) { toast("請選擇已與客戶確認的正式施工日期", "error"); return; }
      updateTicket(t.id, { formalAppointmentAt: input.value, formalConfirmedBy: currentRole().name, formalConfirmedAt: new Date().toLocaleString("zh-HK") }, "CR／主管與客戶確認正式施工時間。");
      hideWorkOrderDrawer(); showWorkOrderDrawer(t.id); toast("正式施工時間已記錄", "success"); return;
    }
    if (target.dataset.remMr) { window.ecRemediation.selectedMrId = target.dataset.remMr; state.page = "procurement"; state.view = "pc"; render(); return; }
    if (target.dataset.remWarehouseSync) {
      const mr = findMr(target.dataset.remWarehouseSync);
      if (!mr) return;
      target.disabled = true;
      await syncMaterialRequestToWarehouseTong(mr, { force: true });
      return;
    }
    if (target.dataset.remMrSave || target.dataset.remMrReady) {
      const id = target.dataset.remMrSave || target.dataset.remMrReady, m = findMr(id);
      if (!m || !["PUR", "ADMIN"].includes(state.role)) { toast("由倉管記錄 MR 交接", "error"); return; }
      document.querySelectorAll(`[data-rem-prepared="${CSS.escape(id)}"]`).forEach(input => {
        const line = m.lines.find(line => line.id === Number(input.dataset.line));
        if (line) line.preparedQty = Math.min(line.qty, Math.max(0, Number(input.value) || 0));
      });
      if (target.dataset.remMrReady && m.lines.every(line => line.preparedQty >= line.qty)) {
        m.status = "材料就緒"; m.readyAt = new Date().toLocaleString("zh-HK"); m.readyBy = currentRole().name;
        const q = findQuote(m.quotationId), t = q && tickets.find(item => item.id === (q.ticketId || q.sourceTicketId));
        if (t) { t.materialReadyAt = m.readyAt; t.sourceMRId = m.id; }
        toast("已記錄材料就緒，CR／主管可確認正式時間", "success");
      } else if (target.dataset.remMrReady) { toast("仍有缺料，不能標記就緒", "error"); }
      else { m.status = "備貨中"; toast("MR 備貨交接已保存", "success"); }
      saveDataToLocalStorage(); render(); return;
    }
    if (target.hasAttribute("data-rem-plan-page")) { state.page = "maintenance"; state.view = "pc"; render(); return; }
    if (target.dataset.remCreateVisit) {
      if (!["CR", "TL"].includes(state.role)) return;
      const plan = findPlan(target.dataset.remCreateVisit), visit = plan?.visits.find(v => v.id === target.dataset.visit);
      if (!visit || visit.ticketId) return;
      const q = findQuote(plan.quotationId), customer = customers.find(c => c.id === plan.customerId) || customers.find(c => c.nameZh === plan.customerName);
      const id = generateWorkOrderId(customer);
      const ticket = { id, customerId: plan.customerId, customer: plan.customerName, type: "DLP 保養維修", contact: "", phone: "", channel: "保養計劃",
        area: plan.area, address: "", status: "待分派", owner: currentRole().name, tl: state.role === "TL" ? currentRole().name : "", master: "",
        quotationId: q.id, maintenancePlanId: plan.id, maintenanceVisitId: visit.id, scheduleDate: visit.dueDate,
        createdAt: new Date().toLocaleString("zh-HK"), updatedAt: new Date().toLocaleString("zh-HK"), desc: `整期保養計劃 ${plan.id} · ${visit.id}`,
        records: [{ time: new Date().toLocaleString("zh-HK"), actor: currentRole().name, text: "由保養計劃建立本期 CALL" }], attachments: [], tags: ["M保養"], urgent: false };
      tickets.unshift(ticket); visit.ticketId = id; visit.status = "待分派";
      saveDataToLocalStorage(); toast(`已建立本期 CALL ${id}`, "success"); render(); return;
    }
  });
  /* R-15：只在原始种子数据的浏览器环境加入可走查样例；不覆盖已有用户数据。 */
  const freshSeed = !localStorage.getItem("ecinfo_remediation_demo_seed_v1") &&
    quotations.length === DEFAULT_QUOTATIONS.length &&
    DEFAULT_QUOTATIONS.every(q => quotations.some(item => item.id === q.id)) &&
    !quotations.some(q => q.id.startsWith("QT-DEMO-"));
  if (freshSeed) {
    const baseQuote = (id, ticketId, category, status, items) => ({
      id, ourRef: id, revision: 0, title: `2026-09-27 ${category} 業務走查樣例`, ticketId,
      customerId: "CUST-0002", customerName: "九龍國際廣場", area: "2區", amount: items.reduce((sum, i) => sum + i.amount, 0),
      taxRate: 0, totalAmount: items.reduce((sum, i) => sum + i.amount, 0),
      status, bidStatus: status === "已中單" ? "已中標" : "待確認", owner: "張報價", srNo: "", category,
      createdAt: "2026-09-27", validUntil: "2026-11-30", source: "工單", sourceTicketId: ticketId,
      customerOrder: "", tenderNo: "", tenderAmount: 0, items: clone(items), revisions: [], history: [{ action: "演示樣例", time: "2026-09-27", actor: "Prototype", changes: "按已確認流程建立" }]
    });
    const material = { name: "門禁讀卡器", spec: "標準型", qty: 2, unit: "件", unitPrice: 620, amount: 1240, itemType: "物料" };
    const service = { name: "現場安裝服務", spec: "上門服務", qty: 1, unit: "項", unitPrice: 1800, amount: 1800, itemType: "服務" };
    const p = baseQuote("QT-DEMO-P", "WO-DEMO-P", "P", "報價中", [material, service]);
    const m = baseQuote("QT-DEMO-M", "WO-DEMO-M-01", "M", "已中單", [{ name: "季度保養服務", spec: "整期合約", qty: 1, unit: "項", unitPrice: 12000, amount: 12000, itemType: "服務" }]);
    Object.assign(m, { revision: 2, customerAcceptedAt: "2026-09-27", acceptanceNote: "演示：客戶確認 R2", acceptedRevision: 2,
      acceptedItems: clone(m.items), acceptedByQuotationTeam: "張報價", wonAt: "2026-09-27", serviceEveryMonths: 3, acceptedServiceEveryMonths: 3,
      acceptedContractStart: "2026-10-01", acceptedContractEnd: "2027-09-30",
      contractStart: "2026-10-01", contractEnd: "2027-09-30", revisions: [
        { rev: 0, date: "2026-09-10", amount: 10000, totalAmount: 10000, items: [{ ...m.items[0], unitPrice: 10000, amount: 10000 }], remark: "初版" },
        { rev: 1, date: "2026-09-20", amount: 11000, totalAmount: 11000, items: [{ ...m.items[0], unitPrice: 11000, amount: 11000 }], remark: "修訂版" }
      ] });
    const mp = baseQuote("QT-DEMO-MP", "WO-DEMO-MP-P", "M+P", "已中單", [material, service]);
    Object.assign(mp, { revision: 1, customerAcceptedAt: "2026-09-27", acceptanceNote: "演示：客戶確認 R1", acceptedRevision: 1,
      acceptedItems: clone(mp.items), acceptedByQuotationTeam: "張報價", wonAt: "2026-09-27", serviceEveryMonths: 6, acceptedServiceEveryMonths: 6,
      acceptedContractStart: "2026-10-01", acceptedContractEnd: "2027-09-30",
      contractStart: "2026-10-01", contractEnd: "2027-09-30" });
    quotations.unshift(p, m, mp);
    const baseTicket = (id, type, status, quoteId, master) => ({ id, customerId: "CUST-0002", customer: "九龍國際廣場", type,
      contact: "陳先生", phone: "+852 9000 0000", channel: "電話", area: "2區", address: "九龍國際廣場", status,
      owner: master || "李組長", tl: "李組長", master: master || "", quotationId: quoteId || "",
      createdAt: "09-27 09:00", updatedAt: "09-27 09:00", desc: `整改走查 ${type}`,
      records: [{ time: "09:00", actor: "Prototype", text: "整改走查樣例" }], attachments: [], tags: ["整改走查"], urgent: false });
    tickets.unshift(baseTicket("WO-DEMO-P", "工程維修", "待分派", p.id, ""));
    tickets.unshift(baseTicket("WO-DEMO-M-01", "DLP 保養維修", "待處理", m.id, "周師傅"));
    tickets.unshift(baseTicket("WO-DEMO-MP-P", "工程維修", "待分派", mp.id, ""));
    tickets.unshift(baseTicket("WO-DEMO-INSTANT", "工程維修", "處理中", "", "周師傅"));
    tickets.unshift(baseTicket("WO-DEMO-CM", "糾正維修", "待分派", "", ""));
    createMaintenancePlan(m);
    createMaintenancePlan(mp);
    const firstVisit = quotePlan(m).visits[0];
    firstVisit.ticketId = "WO-DEMO-M-01";
    firstVisit.status = "待處理";
    Object.assign(tickets.find(t => t.id === "WO-DEMO-M-01"), { maintenancePlanId: quotePlan(m).id, maintenanceVisitId: firstVisit.id });
    createMr(mp, { sync: false });
    tenders.unshift({ id: "TD-DEMO-2026", projectName: "政府門禁工程走查", client: "香港政府大樓", customerId: "CUST-0004", tenderRegion: "2區",
      tenderCategory: "P", tenderValue: 36000, tenderDate: "2026-09-27", deadline: "2026-10-30", status: "待投標",
      relatedQuotationId: "", owner: "李組長", remark: "整改走查：中標後應進 P 報價鏈，不直接中單", history: [] });
    tenders.unshift({ id: "TD-DEMO-M", projectName: "政府保養項目走查", client: "香港政府大樓", customerId: "CUST-0004", tenderRegion: "2區",
      tenderCategory: "M", tenderValue: 48000, tenderDate: "2026-09-27", deadline: "2026-10-30", status: "待投標",
      relatedQuotationId: "", owner: "李組長", remark: "整改走查：M 支線", history: [] });
    tenders.unshift({ id: "TD-DEMO-MP", projectName: "政府保養及工程走查", client: "香港政府大樓", customerId: "CUST-0004", tenderRegion: "2區",
      tenderCategory: "M+P", tenderValue: 84000, tenderDate: "2026-09-27", deadline: "2026-10-30", status: "待投標",
      relatedQuotationId: "", owner: "李組長", remark: "整改走查：M/P 獨立支線", history: [] });
    localStorage.setItem("ecinfo_remediation_demo_seed_v1", "true");
    saveDataToLocalStorage();
  }
  // 旧版浏览器缓存中的模拟回执不能冒充真实宜搭记录；改为待人工点击重试。
  let migratedDemoReceipt = false;
  materialRequests.forEach(mr => {
    if (mr.warehouseSync?.mode === "DEMO" || String(mr.warehouseSync?.externalRecordId || "").startsWith("CKT-")) {
      mr.warehouseSync = {
        targetApp: WAREHOUSE_APP,
        mode: WAREHOUSE_SYNC_MODE,
        status: "待同步",
        idempotencyKey: `EC-MR:${mr.id}`,
        errorMessage: "旧版模拟回执已清除，请点击重试写入真实仓库通"
      };
      migratedDemoReceipt = true;
    }
  });
  if (migratedDemoReceipt) saveDataToLocalStorage();
  render();
})();
