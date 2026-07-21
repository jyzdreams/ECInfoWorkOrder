import { useEffect, useMemo, useState } from "react";

const APP_TITLE = "ECInfo 工單系統";
const PRIMARY_ORDER = "WO-20260715-001";
const STORAGE_KEY = "ecinfo-v2-complete-flow";

const USERS = [
  { id: "u-cs", role: "CS", name: "陳小姐", title: "客戶服務", short: "陳" },
  { id: "u-tl-li", role: "TL", name: "李組長", title: "九龍 Team Leader", short: "李" },
  { id: "u-tl-wong", role: "TL", name: "王組長", title: "港島 Team Leader", short: "王" },
  { id: "u-master-chow", role: "MASTER", name: "周師傅", title: "外勤師傅", short: "周" },
  { id: "u-master-leung", role: "MASTER", name: "梁師傅", title: "安裝師傅", short: "梁" },
  { id: "u-quo", role: "QUO", name: "鄒小姐", title: "報價組", short: "鄒" },
  { id: "u-pur", role: "PUR", name: "張採購", title: "採購與物流", short: "張" },
  { id: "u-fin", role: "FIN", name: "陳會計", title: "會計部", short: "會" },
  { id: "u-admin", role: "ADMIN", name: "林主管", title: "主管 / 管理員", short: "林" },
  { id: "u-boss", role: "BOSS", name: "黃老闆", title: "管理部", short: "黃" },
];

const ROLES = [
  ["CS", "CS"], ["TL", "Team Leader"], ["MASTER", "師傅"], ["QUO", "報價組"],
  ["PUR", "採購部"], ["FIN", "會計部"], ["ADMIN", "主管 / 管理員"], ["BOSS", "老闆"],
];

const NAV = {
  CS: [["dashboard", "首頁"], ["orders", "工單管理"], ["create", "新建工單"]],
  TL: [["dashboard", "團隊總覽"], ["dispatch", "分派中心"], ["orders", "工單管理"]],
  MASTER: [["mobile", "我的待辦"], ["orders", "我的工單"]],
  QUO: [["dashboard", "報價總覽"], ["quote", "報價工作台"], ["orders", "關聯工單"]],
  PUR: [["dashboard", "採購總覽"], ["purchase", "採購與物流"], ["orders", "關聯工單"]],
  FIN: [["dashboard", "財務總覽"], ["finance", "開票與收款"], ["orders", "關聯工單"]],
  ADMIN: [["dashboard", "全鏈路看板"], ["audit", "操作審計"], ["users", "用戶與規則"]],
  BOSS: [["dashboard", "經營總覽"], ["boss", "項目履約"], ["orders", "只讀工單"]],
};

const stamp = () => new Date().toLocaleString("zh-HK", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replaceAll("/", "-");
const deepCopy = (value) => JSON.parse(JSON.stringify(value));

const initialData = () => ({
  orders: [
    {
      id: PRIMARY_ORDER, projectRef: "1P260018", customer: "九龍屋苑管理處", contact: "何小姐", phone: "+852 6123 9800",
      address: "九龍灣宏照道 16 號停車場中控室", area: "2P 九龍", type: "PM 維修", source: "WhatsApp",
      status: "待分派", tl: "李組長", master: "", priority: "緊急", photoAllowed: true,
      desc: "停車場入口閘機開合速度變慢，客戶要求本週完成檢查。", createdAt: "07-15 09:10", srIds: [], needsQuote: false, cancelled: false,
    },
    {
      id: "ECA-20260714-008", projectRef: "1P260011", customer: "香港政府大樓", contact: "劉先生", phone: "+852 9456 7890",
      address: "金鐘添馬艦政府總部", area: "1P 香港", type: "政府合約維修", source: "電話", status: "處理中",
      tl: "王組長", master: "周師傅", priority: "普通", photoAllowed: false, desc: "CCTV 線路檢查，現場限制拍照。", createdAt: "07-14 10:22", srIds: [], needsQuote: false,
    },
    {
      id: "WO-20260713-006", projectRef: "2P260014", customer: "灣仔商業大廈", contact: "林小姐", phone: "+852 9222 1000",
      address: "灣仔告士打道 55 號", area: "1P 香港", type: "CM 特別任務", source: "郵件", status: "已完成",
      tl: "李組長", master: "梁師傅", priority: "普通", photoAllowed: true, desc: "完成門禁控制器例行保養。", createdAt: "07-13 14:10", srIds: ["SR-250315"], needsQuote: false,
    },
  ],
  cases: [{
    id: "FC-260018", orderId: PRIMARY_ORDER, projectRef: "1P260018", stage: "現場勘查中", quoteStatus: "未建立", procurementStatus: "未開始", completionPaper: "未產生", archived: false,
  }],
  tasks: [],
  reports: [{ id: "SR-250315", orderId: "WO-20260713-006", phase: "維修", master: "梁師傅", status: "已提交", beforePhoto: true, afterPhoto: true, content: "完成門禁控制器例行保養。", submittedAt: "07-13 16:40" }],
  quotations: [{ id: "Q-1P-260017", orderId: "WO-20260713-006", projectRef: "2P260014", customer: "灣仔商業大廈", amount: 6800, status: "已確認", source: "Service Report", revision: 0, needsMaterial: false, immutable: true }],
  purchases: [{ id: "PO-202607-012", orderId: "WO-20260713-006", projectRef: "2P260014", material: "門禁控制器", status: "已到貨", logistics: "已簽收", completionPaper: "已確認" }],
  invoices: [{ id: "INV-202607-006", orderId: "WO-20260713-006", projectRef: "2P260014", amount: 6800, status: "已收款", issuedAt: "07-14", paidAt: "07-15" }],
  // 會計部待開票清單：Job Code = 報價編號（XPXXXXXX）；type 区分一次性工程 / M 類保養月結
  pendingInvoices: [
    { id: "PI-001", jobCode: "1P260018", customer: "九龍屋苑管理處", desc: "停車場閘機控制板維修", amount: 12800, type: "工程", billingPeriod: "", status: "待開票", createdAt: "07-15", attachments: { photos: true, completionPaper: "已確認", sr: "SR-250401", confirmation: "已確認" } },
    { id: "PI-002", jobCode: "2P260014", customer: "灣仔商業大廈", desc: "門禁控制器例行保養", amount: 6800, type: "工程", billingPeriod: "", status: "待開票", createdAt: "07-13", attachments: { photos: true, completionPaper: "已確認", sr: "SR-250315", confirmation: "已確認" } },
    { id: "PI-003", jobCode: "4M123456", customer: "海栢花園管理處", desc: "7 月保養合約月結", amount: 4500, type: "M類保養", billingPeriod: "2026-07", status: "待開票", createdAt: "07-01", attachments: { photos: false, completionPaper: "合約", sr: "", confirmation: "合約" } },
    { id: "PI-004", jobCode: "4M123457", customer: "高衛物業管理", desc: "7 月保養合約月結", amount: 5800, type: "M類保養", billingPeriod: "2026-07", status: "待開票", createdAt: "07-01", attachments: { photos: false, completionPaper: "合約", sr: "", confirmation: "合約" } },
    { id: "PI-005", jobCode: "1P260019", customer: "香港政府大樓", desc: "CCTV 線路檢查工程", amount: 9300, type: "工程", billingPeriod: "", status: "待開票", createdAt: "07-14", attachments: { photos: false, completionPaper: "已確認", sr: "SR-250402", confirmation: "已確認" } },
  ],
  // 發票管理：第二欄位已改為 Job ID；含客戶數期、到期日、金額變更原因、重印選項
  invoicesMgmt: [
    { id: "INV-202607-006", jobId: "2P260014", customer: "灣仔商業大廈", amount: 6800, issuedAt: "07-14", dueAt: "08-13", paymentTerms: "30 天", status: "已收款", amountChanged: false, changeReason: "" },
    { id: "INV-202607-018", jobId: "1P260018", customer: "九龍屋苑管理處", amount: 12800, issuedAt: "07-15", dueAt: "08-14", paymentTerms: "30 天", status: "已開具", amountChanged: false, changeReason: "" },
    { id: "INV-202606-021", jobId: "4M123456", customer: "海栢花園管理處", amount: 4500, issuedAt: "06-30", dueAt: "07-30", paymentTerms: "30 天", status: "已收款", amountChanged: true, changeReason: "客戶要求折扣 500 元" },
  ],
  // 收款記錄：收據編號自動生成為 EC + invoice no（如 EC26060127）
  receipts: [
    { id: "EC26060127", invoiceNo: "INV-202606-021", jobId: "4M123456", customer: "高衛物業管理有限公司", amount: 2950, payMethod: "Cash", chequeNo: "", receivedAt: "06-27", forJob: "6P2606664" },
    { id: "EC26070150", invoiceNo: "INV-202607-006", jobId: "2P260014", customer: "灣仔商業大廈", amount: 6800, payMethod: "Cheque", chequeNo: "123456", receivedAt: "07-15", forJob: "2P260014" },
  ],
  // 會計客戶檔案：獨立於 CS/報價組，含 billing address、收件人、數期
  acctCustomers: [
    { id: "AC-001", name: "九龍屋苑管理處", contact: "何小姐", phone: "+852 6123 9800", billingAddress: "九龍灣宏照道 16 號停車場中控室", recipient: "管理處收件處", paymentTerms: "30 天", attn: "何小姐" },
    { id: "AC-002", name: "灣仔商業大廈", contact: "林小姐", phone: "+852 9222 1000", billingAddress: "灣仔告士打道 55 號 10 樓", recipient: "林小姐", paymentTerms: "30 天", attn: "林小姐" },
    { id: "AC-003", name: "高衛物業管理有限公司", contact: "海栢花園管理處", phone: "+852 2500 1234", billingAddress: "沙田海栢花園管理處", recipient: "海栢花園管理處", paymentTerms: "45 天", attn: "T4-25/F 電話槽房" },
    { id: "AC-004", name: "香港政府大樓", contact: "劉先生", phone: "+852 9456 7890", billingAddress: "金鐘添馬艦政府總部", recipient: "劉先生", paymentTerms: "60 天", attn: "劉先生" },
  ],
  // M 類保養合約：根據開始/結束日期與開單頻率自動生成每月待開發票
  maintenanceContracts: [
    { id: "MC-001", jobCode: "4M123456", customer: "海栢花園管理處", amount: 4500, startDate: "2026-06-01", endDate: "2027-05-31", frequency: "每月", billingDay: 1, status: "生效中" },
    { id: "MC-002", jobCode: "4M123457", customer: "高衛物業管理", amount: 5800, startDate: "2026-06-01", endDate: "2027-05-31", frequency: "每月", billingDay: 1, status: "生效中" },
    { id: "MC-003", jobCode: "4M123458", customer: "九龍屋苑管理處", amount: 12000, startDate: "2026-01-01", endDate: "2026-12-31", frequency: "每季", billingDay: 1, status: "生效中" },
  ],
  // 發票模版設定：模版內容可修改（公司 Logo、地址、電話等）
  invoiceTemplate: {
    companyName: "EC InfoTech Limited",
    companyAddress: "Unit D, 3/Fl., Block 2, Camel Paint Building, 62 Hoi Yuen Road, Kwun Tong, Kowloon, Hong Kong",
    companyPhone: "2876 2990",
    companyFax: "3101 0616",
    displayMode: "detail", // "summary" = 工程內容+總金額；"detail" = 多項內容+單價+總金額
  },
  events: [
    { id: "e1", time: "07-15 09:10", actor: "陳小姐", type: "建立工單", text: "WhatsApp 服務要求已建立，等待 Team Leader 分派。", orderId: PRIMARY_ORDER },
    { id: "e2", time: "07-13 16:40", actor: "梁師傅", type: "完成 SR", text: "WO-20260713-006 已提交服務報告。", orderId: "WO-20260713-006" },
  ],
  notifications: [
    { id: "n1", recipient: "李組長", title: "新工單待分派", body: `${PRIMARY_ORDER} · 九龍屋苑管理處`, target: "dispatch", orderId: PRIMARY_ORDER, read: false, time: "07-15 09:10" },
    { id: "n2", recipient: "黃老闆", title: "本週收款更新", body: "已收款 1 筆，HKD 6,800", target: "boss", orderId: "WO-20260713-006", read: false, time: "07-15 08:30" },
  ],
});

function Status({ children }) { return <span className={`status status-${String(children).replaceAll(" ", "-")}`}>{children}</span>; }
function Avatar({ user }) { return <span className="avatar" aria-label={user.name}>{user.short}</span>; }

export function App() {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialData(); } catch { return initialData(); }
  });
  const [currentUserId, setCurrentUserId] = useState("u-cs");
  const [page, setPage] = useState("dashboard");
  const [selectedOrderId, setSelectedOrderId] = useState(PRIMARY_ORDER);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [notice, setNotice] = useState("已載入完整流程演示資料。");

  const user = USERS.find((item) => item.id === currentUserId) || USERS[0];
  const selectedOrder = data.orders.find((item) => item.id === selectedOrderId) || data.orders[0];
  const currentCase = data.cases.find((item) => item.orderId === PRIMARY_ORDER);
  const unread = data.notifications.filter((item) => item.recipient === user.name && !item.read);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)), [data]);

  const mutate = (updater, message) => {
    setData((previous) => {
      const next = deepCopy(previous);
      updater(next);
      return next;
    });
    if (message) setNotice(message);
  };

  const addEvent = (target, actor, type, text, orderId = PRIMARY_ORDER) => {
    target.events.unshift({ id: `e-${Date.now()}-${Math.random()}`, time: stamp(), actor, type, text, orderId });
  };
  const notify = (target, recipient, title, body, targetPage, orderId = PRIMARY_ORDER) => {
    target.notifications.unshift({ id: `n-${Date.now()}-${Math.random()}`, recipient, title, body, target: targetPage, orderId, read: false, time: stamp() });
  };
  const updateOrder = (target, id, patch) => Object.assign(target.orders.find((item) => item.id === id), patch);

  const chooseRole = (role) => {
    const next = USERS.find((item) => item.role === role);
    setCurrentUserId(next.id);
    setPage(NAV[role][0][0]);
    setNotificationsOpen(false);
  };
  const chooseUser = (id) => {
    const next = USERS.find((item) => item.id === id);
    setCurrentUserId(id);
    setPage(NAV[next.role][0][0]);
    setNotificationsOpen(false);
  };
  const reset = () => { setData(initialData()); setCurrentUserId("u-cs"); setPage("dashboard"); setSelectedOrderId(PRIMARY_ORDER); setNotice("演示資料已重置，可從 CS 建單開始重走流程。"); };

  const createWorkOrder = (form) => {
    const id = `WO-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${String(data.orders.length + 1).padStart(3, "0")}`;
    mutate((next) => {
      next.orders.unshift({ id, projectRef: form.projectRef || "1P260019", customer: form.customer || "新客戶", contact: form.contact || "聯絡人", phone: form.phone || "", address: form.address || "待補地址", area: "2P 九龍", type: "PM 維修", source: "電話", status: "待分派", tl: "李組長", master: "", priority: "普通", photoAllowed: true, desc: form.desc || "待補充問題描述", createdAt: stamp(), srIds: [], needsQuote: false });
      next.cases.unshift({ id: `FC-${Date.now()}`, orderId: id, projectRef: form.projectRef || "1P260019", stage: "待分派", quoteStatus: "未建立", procurementStatus: "未開始", completionPaper: "未產生", archived: false });
      addEvent(next, user.name, "建立工單", `${id} 已建立並推薦李組長。`, id);
      notify(next, "李組長", "新工單待分派", `${id} · ${form.customer || "新客戶"}`, "dispatch", id);
    }, "工單已建立，李組長已收到待分派消息。");
    setSelectedOrderId(id); setCreateOpen(false); setPage("orders");
  };

  const cancelOrder = (id) => mutate((next) => {
    const order = next.orders.find((item) => item.id === id);
    if (!order || ["已完成", "已取消"].includes(order.status)) return;
    updateOrder(next, id, { status: "已取消" });
    const flow = next.cases.find((item) => item.orderId === id);
    if (flow) { flow.stage = "已取消"; flow.archived = false; }
    addEvent(next, user.name, "取消工單", "CS 已取消工單，後續派單與履約任務停止。", id);
    notify(next, order.tl || "李組長", "工單已取消", `${id} · CS 已取消本次服務`, "orders", id);
  }, "工單已取消，Team Leader 已收到停止處理提醒。");

  const dispatch = (master = "周師傅") => mutate((next) => {
    updateOrder(next, PRIMARY_ORDER, { status: "待接單", master, tl: "李組長" });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "等待師傅接單";
    addEvent(next, "李組長", "分派工單", `已分派 ${PRIMARY_ORDER} 給 ${master}。`);
    notify(next, master, "新工單待接單", `${PRIMARY_ORDER} · 請確認接單與預計到達時間`, "mobile");
  }, `已分派給 ${master}，對方收到待接單提醒。`);

  const reject = () => mutate((next) => {
    updateOrder(next, PRIMARY_ORDER, { status: "待分派", master: "" });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "拒單待重派";
    addEvent(next, user.name, "拒絕接單", "拒單原因：現場任務未完成，無法準時到場。");
    notify(next, "李組長", "工單被拒單", `${PRIMARY_ORDER} · 請重新安排師傅`, "dispatch");
  }, "拒單已記錄，工單退回待分派並通知李組長。\n");

  const accept = () => mutate((next) => {
    updateOrder(next, PRIMARY_ORDER, { status: "待處理", master: user.name });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "等待到場";
    addEvent(next, user.name, "確認接單", "已接單，預計 30 分鐘到達現場。");
    notify(next, "李組長", "師傅已接單", `${PRIMARY_ORDER} · ${user.name} 預計 30 分鐘到場`, "dispatch");
  }, "已接單，請到場打卡並上傳現場前照片。\n");

  const checkIn = () => mutate((next) => {
    updateOrder(next, PRIMARY_ORDER, { status: "處理中" });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "現場勘查中";
    addEvent(next, user.name, "到場打卡", "已完成 GPS 打卡並上傳現場前照片。");
    notify(next, "李組長", "師傅已到場", `${PRIMARY_ORDER} · 已打卡並上傳現場前照片`, "orders");
  }, "到場記錄已完成，現在可填寫初檢 Service Report。\n");

  const submitSurvey = (needsQuote) => mutate((next) => {
    const report = { id: `SR-${String(next.reports.length + 250401)}`, orderId: PRIMARY_ORDER, phase: "初檢", master: user.name, status: "已提交", beforePhoto: true, afterPhoto: true, content: needsQuote ? "確認閘機控制板損壞，需要更換零件並報價。" : "完成現場調校，無需後續報價。", submittedAt: stamp() };
    next.reports.unshift(report);
    updateOrder(next, PRIMARY_ORDER, { status: "已完成", needsQuote });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER);
    flow.stage = needsQuote ? "待報價" : "待開票"; flow.quoteStatus = needsQuote ? "待報價" : "不適用";
    addEvent(next, user.name, "提交初檢 SR", needsQuote ? "完成初檢 SR，已標記需要報價與材料。" : "完成初檢 SR，無需報價。\n");
    notify(next, "李組長", "工單已完成", `${PRIMARY_ORDER} · 初檢 SR 已提交`, "orders");
    if (needsQuote) notify(next, "鄒小姐", "工單需要報價", `${PRIMARY_ORDER} · 請根據 SR 建立報價`, "quote");
    else notify(next, "陳會計", "工單待開票", `${PRIMARY_ORDER} · 現場服務已完成`, "finance");
  }, needsQuote ? "初檢 SR 已完成，工單已完成，報價組收到並行報價提醒。" : "工單與 SR 已完成，財務已收到開票提醒。");

  const prepareQuote = () => mutate((next) => {
    const found = next.quotations.find((item) => item.orderId === PRIMARY_ORDER);
    if (found) found.status = "待客戶確認";
    else next.quotations.unshift({ id: "Q-1P-260018", orderId: PRIMARY_ORDER, projectRef: "1P260018", customer: "九龍屋苑管理處", amount: 12800, status: "待客戶確認", source: "Service Report", revision: 0, needsMaterial: true, immutable: false });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "等待客戶確認報價"; flow.quoteStatus = "待客戶確認";
    addEvent(next, user.name, "發出報價", "報價 Q-1P-260018 已發送客戶確認。");
    notify(next, "陳小姐", "報價待客戶確認", `Q-1P-260018 · 請跟進客戶回覆`, "quote");
    notify(next, "李組長", "報價已發出", `${PRIMARY_ORDER} · 等待客戶確認`, "orders");
  }, "報價已發出，等待客戶確認。\n");

  const confirmQuote = (needsMaterial = true) => mutate((next) => {
    const quote = next.quotations.find((item) => item.orderId === PRIMARY_ORDER); quote.status = "已確認"; quote.immutable = true; quote.needsMaterial = needsMaterial;
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.quoteStatus = "已確認"; flow.stage = needsMaterial ? "待採購" : "待開票";
    addEvent(next, "客戶", "確認報價", needsMaterial ? "客戶確認報價，需要採購控制板與感應器。" : "客戶確認報價，無需採購材料。\n");
    notify(next, needsMaterial ? "張採購" : "陳會計", needsMaterial ? "已確認報價待採購" : "已確認報價待開票", `${PRIMARY_ORDER} · Project Reference 1P260018`, needsMaterial ? "purchase" : "finance");
  }, needsMaterial ? "報價已確認且鎖定，採購部收到材料申請。" : "報價已確認且鎖定，財務收到開票提醒。");

  const declineQuote = () => mutate((next) => {
    const quote = next.quotations.find((item) => item.orderId === PRIMARY_ORDER);
    if (quote) { quote.status = "未中標"; quote.immutable = true; }
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER);
    flow.quoteStatus = "未中標"; flow.stage = "報價未中標";
    addEvent(next, "客戶", "報價未中標", "客戶未接受本次報價，履約流程停止，不建立採購單。");
    ["陳小姐", "李組長"].forEach((recipient) => notify(next, recipient, "報價未中標", `${PRIMARY_ORDER} · 客戶未採納報價`, "orders"));
  }, "已記錄報價未中標，CS 與 Team Leader 已收到結果通知。");

  const startPurchase = () => mutate((next) => {
    next.purchases.unshift({ id: "PO-202607-018", orderId: PRIMARY_ORDER, projectRef: "1P260018", material: "閘機控制板、感應器", status: "已下單", logistics: "備貨中", completionPaper: "待製作" });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "採購與物流中"; flow.procurementStatus = "已下單";
    addEvent(next, user.name, "建立採購單", "PO-202607-018 已建立並提交供應商備貨。\n");
    notify(next, "李組長", "材料採購已啟動", `${PRIMARY_ORDER} · 等待物流到貨`, "dispatch");
  }, "採購單已建立，等待物流到貨。\n");

  const markArrived = () => mutate((next) => {
    const po = next.purchases.find((item) => item.orderId === PRIMARY_ORDER); po.status = "已到貨"; po.logistics = "物流已確認";
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "到貨待派安裝"; flow.procurementStatus = "已到貨";
    addEvent(next, user.name, "物流確認到貨", "材料已到貨，待 Team Leader 重新分派安裝任務。\n");
    notify(next, "李組長", "材料已到貨待派安裝", `${PRIMARY_ORDER} · 請建立關聯執行任務`, "dispatch");
  }, "物流已確認到貨，李組長可重新分派安裝任務。\n");

  const dispatchInstallation = () => mutate((next) => {
    next.tasks.unshift({ id: "ET-260018-01", orderId: PRIMARY_ORDER, projectRef: "1P260018", title: "閘機控制板安裝", master: "梁師傅", status: "待接單", material: "閘機控制板、感應器", completionPaper: "待領取", srId: "" });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "等待安裝師傅接單";
    addEvent(next, "李組長", "重新分派安裝任務", "已建立關聯執行任務 ET-260018-01，派給梁師傅。\n");
    notify(next, "梁師傅", "新的安裝任務待接單", `${PRIMARY_ORDER} · 已附材料與完工單`, "mobile");
  }, "已建立關聯執行任務，梁師傅收到材料與完工單提醒。\n");

  const acceptInstallation = () => mutate((next) => {
    const task = next.tasks.find((item) => item.orderId === PRIMARY_ORDER); task.status = "待處理";
    addEvent(next, user.name, "接單安裝任務", "已接收材料與完工單，預計下午到場。\n");
    notify(next, "李組長", "安裝師傅已接單", `${PRIMARY_ORDER} · 梁師傅將執行安裝`, "dispatch");
  }, "安裝任務已接單，請到場安裝並提交第二份 SR。\n");

  const startInstallation = () => mutate((next) => {
    const task = next.tasks.find((item) => item.orderId === PRIMARY_ORDER); task.status = "處理中";
    addEvent(next, user.name, "安裝到場打卡", "已打卡並確認材料及完工單。\n");
  }, "已到場，現在可提交安裝 SR 與完工單。\n");

  const finishInstallation = () => mutate((next) => {
    const task = next.tasks.find((item) => item.orderId === PRIMARY_ORDER); task.status = "已完成"; task.completionPaper = "已上傳"; task.srId = "SR-250402";
    next.reports.unshift({ id: "SR-250402", orderId: PRIMARY_ORDER, phase: "安裝", master: user.name, status: "已提交", beforePhoto: true, afterPhoto: true, content: "已更換閘機控制板及感應器，設備測試正常。", submittedAt: stamp() });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "待採購確認完工單"; flow.completionPaper = "已上傳";
    addEvent(next, user.name, "提交安裝 SR", "安裝 SR 與完工單已上傳，等待採購確認。\n");
    notify(next, "張採購", "完工單待確認", `${PRIMARY_ORDER} · 安裝 SR 與完工單已提交`, "purchase");
  }, "安裝資料已提交，採購部收到完工單確認提醒。\n");

  const confirmPaper = () => mutate((next) => {
    const po = next.purchases.find((item) => item.orderId === PRIMARY_ORDER); po.completionPaper = "已確認";
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "待開票"; flow.completionPaper = "已確認";
    addEvent(next, user.name, "確認完工單", "物流、材料與完工單已確認，允許開具單次發票。\n");
    notify(next, "陳會計", "項目待開票", `${PRIMARY_ORDER} · 採購與完工單已確認`, "finance");
  }, "採購與完工單已確認，財務已收到開票提醒。\n");

  const issueInvoice = () => mutate((next) => {
    next.invoices.unshift({ id: "INV-202607-018", orderId: PRIMARY_ORDER, projectRef: "1P260018", amount: 12800, status: "已開具", issuedAt: stamp(), paidAt: "" });
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "待收款";
    addEvent(next, user.name, "開具發票", "INV-202607-018 已開具，等待客戶付款。\n");
    notify(next, "陳小姐", "發票已開具待收款", `${PRIMARY_ORDER} · INV-202607-018`, "finance");
    notify(next, "黃老闆", "新增待收款", `${PRIMARY_ORDER} · HKD 12,800`, "boss");
  }, "單次發票已開具，等待收款登記。\n");

  const receivePayment = () => mutate((next) => {
    const invoice = next.invoices.find((item) => item.orderId === PRIMARY_ORDER); invoice.status = "已收款"; invoice.paidAt = stamp();
    const flow = next.cases.find((item) => item.orderId === PRIMARY_ORDER); flow.stage = "已歸檔"; flow.archived = true;
    addEvent(next, user.name, "登記收款並歸檔", "客戶款項 HKD 12,800 已收妥，履約流程已歸檔。\n");
    ["陳小姐", "李組長", "黃老闆"].forEach((recipient) => notify(next, recipient, "項目已收款歸檔", `${PRIMARY_ORDER} · HKD 12,800`, "orders"));
  }, "已完成單次收款登記，完整履約流程已歸檔。\n");

  const gotoMessage = (message) => {
    mutate((next) => { const target = next.notifications.find((item) => item.id === message.id); target.read = true; }, "已開啟消息關聯記錄。");
    setSelectedOrderId(message.orderId); setPage(message.target); setNotificationsOpen(false);
  };

  const rolePages = NAV[user.role];
  const metrics = useMemo(() => ({
    pending: data.orders.filter((item) => ["待分派", "待接單", "待處理", "處理中"].includes(item.status)).length,
    complete: data.orders.filter((item) => item.status === "已完成").length,
    quote: data.cases.filter((item) => item.stage.includes("報價")).length,
    money: data.invoices.filter((item) => item.status === "已收款").reduce((sum, item) => sum + item.amount, 0),
  }), [data]);

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><img src="/ecinfo-logo.svg" alt="ECInfo" onError={(e) => { e.currentTarget.style.display = "none"; }} /><div><strong>ECInfo 工單系統</strong><span>全鏈路流程原型 v2</span></div></div>
      <nav>{rolePages.map(([key, label]) => <button key={key} className={page === key ? "nav-item active" : "nav-item"} onClick={() => setPage(key)}>{label}</button>)}<button className={page === "flows" ? "nav-item active" : "nav-item"} onClick={() => setPage("flows")}>流程確認包</button></nav>
      <div className="sidebar-footer"><button className="reset-link" onClick={reset}>重置演示資料</button><span>本地模擬 · 無外部整合</span></div>
    </aside>
    <main className="workspace">
      <header className="topbar">
        <div className="role-switch">{ROLES.map(([key, label]) => <button key={key} className={user.role === key ? "role active" : "role"} onClick={() => chooseRole(key)}>{label}</button>)}</div>
        <div className="top-actions"><span className="hint">當前用戶</span><select value={currentUserId} onChange={(e) => chooseUser(e.target.value)}>{USERS.filter((item) => item.role === user.role).map((item) => <option key={item.id} value={item.id}>{item.name} · {item.title}</option>)}</select><button className="bell" onClick={() => setNotificationsOpen(!notificationsOpen)}>消息提醒 {unread.length > 0 && <b>{unread.length}</b>}</button><div className="user-chip"><Avatar user={user} /><span><strong>{user.name}</strong><small>{user.title}</small></span></div></div>
        {notificationsOpen && <NotificationPane items={data.notifications.filter((item) => item.recipient === user.name)} onOpen={gotoMessage} />}
      </header>
      <div className="notice-bar">{notice}</div>
      <section className="page-body">
        {page === "dashboard" && <Dashboard user={user} metrics={metrics} data={data} currentCase={currentCase} onGo={setPage} />}
        {page === "orders" && <Orders user={user} orders={data.orders} selected={selectedOrder} events={data.events} onSelect={setSelectedOrderId} onPage={setPage} onCancel={cancelOrder} />}
        {page === "create" && <CreateWorkOrder onCreate={createWorkOrder} />}
        {page === "dispatch" && <Dispatch currentCase={currentCase} order={data.orders.find((item) => item.id === PRIMARY_ORDER)} tasks={data.tasks} onDispatch={dispatch} onInstallation={dispatchInstallation} />}
        {page === "mobile" && <MasterMobile user={user} order={data.orders.find((item) => item.id === PRIMARY_ORDER)} task={data.tasks.find((item) => item.orderId === PRIMARY_ORDER)} onAccept={accept} onReject={reject} onCheckIn={checkIn} onSubmitSurvey={submitSurvey} onAcceptInstallation={acceptInstallation} onStartInstallation={startInstallation} onFinishInstallation={finishInstallation} />}
        {page === "quote" && <Quotation currentCase={currentCase} quote={data.quotations.find((item) => item.orderId === PRIMARY_ORDER)} onPrepare={prepareQuote} onConfirm={confirmQuote} onDecline={declineQuote} />}
        {page === "purchase" && <Purchase currentCase={currentCase} purchase={data.purchases.find((item) => item.orderId === PRIMARY_ORDER)} task={data.tasks.find((item) => item.orderId === PRIMARY_ORDER)} onStart={startPurchase} onArrived={markArrived} onConfirm={confirmPaper} />}
        {page === "finance" && <Finance currentCase={currentCase} invoice={data.invoices.find((item) => item.orderId === PRIMARY_ORDER)} onIssue={issueInvoice} onPay={receivePayment} />}
        {page === "audit" && <Audit events={data.events} />}
        {page === "users" && <UserRules />}
        {page === "boss" && <Boss metrics={metrics} data={data} currentCase={currentCase} />}
        {page === "flows" && <Flows />}
      </section>
    </main>
    {createOpen && <CreateModal onClose={() => setCreateOpen(false)} onCreate={createWorkOrder} />}
    {user.role === "CS" && page !== "create" && <button className="floating-create" onClick={() => setCreateOpen(true)}>新建工單</button>}
  </div>;
}

function NotificationPane({ items, onOpen }) { return <aside className="notification-pane"><div className="panel-heading"><strong>我的消息</strong><span>{items.filter((item) => !item.read).length} 未讀</span></div>{items.length ? items.map((item) => <button className={item.read ? "message" : "message unread"} onClick={() => onOpen(item)} key={item.id}><small>{item.time}</small><strong>{item.title}</strong><span>{item.body}</span></button>) : <p className="empty">暫無待處理消息</p>}</aside>; }
function PageHead({ eyebrow, title, text, children }) { return <div className="page-head"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div>{children && <div className="head-actions">{children}</div>}</div>; }
function Metric({ label, value, note }) { return <article className="metric"><span>{label}</span><strong>{value}</strong><small>{note}</small></article>; }

function Dashboard({ user, metrics, data, currentCase, onGo }) {
  const roleCopy = { CS: ["服務工作台", "快速建立、追蹤及催辦客戶服務工單。"], TL: ["團隊分派中心", "聚焦待分派、待接單及到貨後安裝任務。"], MASTER: ["師傅任務總覽", "請切換至『我的待辦』完成現場操作。"], QUO: ["報價工作台", "報價可獨立於工單，在任意階段建立與追蹤。"], PUR: ["採購與物流", "確認到貨、完工單與材料交接。"], FIN: ["會計工作台", "僅在採購與完工單確認後開立單次發票。"], ADMIN: ["全鏈路看板", "同時檢視工單、履約、消息與操作審計。"], BOSS: ["經營總覽", "掌握項目風險、收款與未結事項。"] }[user.role];
  return <><PageHead eyebrow={user.title} title={roleCopy[0]} text={roleCopy[1]}><button className="secondary" onClick={() => onGo("flows")}>查看流程確認包</button></PageHead><div className="metrics"><Metric label="現場待辦" value={metrics.pending} note="待分派至處理中" /><Metric label="已完成工單" value={metrics.complete} note="已提交 Service Report" /><Metric label="報價 / 履約中" value={metrics.quote || 1} note="商務軌獨立追蹤" /><Metric label="已收款" value={`HKD ${metrics.money.toLocaleString()}`} note="單次收款" /></div><div className="dashboard-grid"><section className="card span-2"><div className="card-head"><div><h2>Project Reference 1P260018</h2><p>{PRIMARY_ORDER} · 九龍屋苑管理處</p></div><Status>{currentCase.stage}</Status></div><FlowRail current={currentCase.stage} /><div className="detail-grid"><Info label="主工單" value="已由師傅完成初檢 SR 後關閉" /><Info label="履約軌" value={currentCase.stage} /><Info label="採購狀態" value={currentCase.procurementStatus} /><Info label="完工單" value={currentCase.completionPaper} /></div></section><section className="card"><div className="card-head"><h2>角色待辦</h2><button className="link" onClick={() => onGo(user.role === "TL" ? "dispatch" : user.role === "MASTER" ? "mobile" : "orders")}>查看</button></div><TaskList role={user.role} stage={currentCase.stage} /></section><section className="card span-2"><div className="card-head"><h2>最近操作</h2><span className="soft-label">可追溯</span></div><Timeline events={data.events.slice(0, 5)} /></section><section className="card"><div className="card-head"><h2>流程门禁</h2></div><ul className="rule-list"><li>打卡 + 現場前照片後才可進入「處理中」</li><li>確認報價後不可修改</li><li>到貨後才可重新分派安裝任務</li><li>採購確認完工單後才可開票</li></ul></section></div></>;
}
function Info({ label, value }) { return <div className="info"><span>{label}</span><strong>{value}</strong></div>; }
function Timeline({ events }) { return <div className="timeline">{events.map((event) => <div className="timeline-row" key={event.id}><span className="dot" /><div><small>{event.time} · {event.actor}</small><strong>{event.type}</strong><p>{event.text}</p></div></div>)}</div>; }
function TaskList({ role, stage }) { const text = { CS: "跟進客戶報價與服務結果", TL: stage === "到貨待派安裝" ? "材料已到貨，建立關聯安裝任務" : "處理待分派及待接單工單", MASTER: "在移動端處理現場任務", QUO: "依 SR 建立或修訂報價", PUR: "更新 PO、物流與完工單", FIN: "處理已確認履約的單次開票", ADMIN: "檢查流程、權限與消息", BOSS: "查看收款與履約風險" }[role]; return <div className="task-highlight"><strong>{text}</strong><span>所有待辦均由動作消息觸發</span></div>; }

function Orders({ user, orders, selected, events, onSelect, onPage, onCancel }) { const visible = user.role === "MASTER" ? orders.filter((item) => item.master === user.name || item.id === PRIMARY_ORDER) : orders; return <><PageHead eyebrow="可搜尋與追溯" title="工單管理" text="主工單使用 6 個確認狀態；報價、採購和財務在履約軌獨立追蹤。" /><div className="master-detail"><section className="card list-card"><div className="table-title"><h2>工單列表</h2><span>{visible.length} 筆</span></div>{visible.map((order) => <button key={order.id} className={selected.id === order.id ? "order-row selected" : "order-row"} onClick={() => onSelect(order.id)}><div><strong>{order.id}</strong><span>{order.projectRef} · {order.customer}</span></div><Status>{order.status}</Status></button>)}</section><section className="card detail-card"><div className="card-head"><div><h2>{selected.id}</h2><p>{selected.projectRef} · {selected.type}</p></div><Status>{selected.status}</Status></div><div className="detail-grid"><Info label="客戶 / 聯絡人" value={`${selected.customer} · ${selected.contact}`} /><Info label="地址" value={selected.address} /><Info label="區域 / Team Leader" value={`${selected.area} · ${selected.tl}`} /><Info label="執行師傅" value={selected.master || "尚未分派"} /><Info label="拍照規則" value={selected.photoAllowed ? "可拍照" : "不可拍照，需填替代證明"} /><Info label="問題描述" value={selected.desc} /></div><div className="inline-actions">{user.role === "CS" && <button className="secondary" onClick={() => onPage("dashboard")}>記錄催單</button>}{user.role === "CS" && !["已完成", "已取消"].includes(selected.status) && <button className="danger" onClick={() => onCancel(selected.id)}>取消工單</button>}<button className="secondary" onClick={() => onPage("flows")}>查看關聯流程</button></div><div className="section-divider" /><h3>操作時間線</h3><Timeline events={events.filter((event) => event.orderId === selected.id).slice(0, 6)} /></section></div></>;
}

function CreateWorkOrder({ onCreate }) { const [form, setForm] = useState({ customer: "", contact: "", phone: "", address: "", projectRef: "1P260019", desc: "" }); return <><PageHead eyebrow="CS / 客戶服務" title="新建工單" text="客戶、聯絡方式、地址和問題說明為建單最小資料；系統推薦區域與 Team Leader。" /><form className="card form-grid" onSubmit={(e) => { e.preventDefault(); onCreate(form); }}><Field label="客戶名稱" value={form.customer} onChange={(value) => setForm({ ...form, customer: value })} required /><Field label="聯絡人" value={form.contact} onChange={(value) => setForm({ ...form, contact: value })} required /><Field label="聯絡電話" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required /><Field label="Project Reference" value={form.projectRef} onChange={(value) => setForm({ ...form, projectRef: value })} required /><Field label="服務地址" value={form.address} onChange={(value) => setForm({ ...form, address: value })} required wide /><label className="field wide"><span>問題描述</span><textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} required placeholder="例如：門禁、CCTV、停車場閘機故障與客戶時限" /></label><div className="form-note wide">建單後：狀態進入「待分派」→ 自動通知李組長 → 於分派中心選擇師傅。</div><div className="wide form-actions"><button className="primary" type="submit">建立並通知 Team Leader</button></div></form></> }
function Field({ label, value, onChange, required, wide }) { return <label className={`field${wide ? " wide" : ""}`}><span>{label}{required && <em> *</em>}</span><input value={value} onChange={(e) => onChange(e.target.value)} required={required} /></label>; }
function CreateModal({ onClose, onCreate }) { return <div className="modal-backdrop"><div className="modal"><div className="card-head"><h2>快速新建工單</h2><button className="close" onClick={onClose}>關閉</button></div><CreateWorkOrder onCreate={onCreate} /></div></div>; }

function Dispatch({ currentCase, order, tasks, onDispatch, onInstallation }) { const canDispatch = order.status === "待分派"; const canInstall = currentCase.stage === "到貨待派安裝" && !tasks.length; return <><PageHead eyebrow="Team Leader" title="分派中心" text="依區域、工作負載與履約階段安排師傅；到貨後的安裝作業會建立為關聯執行任務。" /><div className="dispatch-layout"><section className="card"><div className="card-head"><div><h2>{order.id}</h2><p>{order.customer} · {order.area}</p></div><Status>{order.status}</Status></div><p className="description">{order.desc}</p><div className="assignment"><span>推薦師傅</span><strong>{canDispatch ? "周師傅 · 今日負載 2" : order.master || "梁師傅 · 安裝師傅"}</strong></div>{canDispatch && <div className="inline-actions"><button className="primary" onClick={() => onDispatch("周師傅")}>分派周師傅</button><button className="secondary" onClick={() => onDispatch("梁師傅")}>改派梁師傅</button></div>}{canInstall && <div className="callout"><strong>材料已到貨</strong><p>原工單已保留初檢 SR；請建立關聯安裝任務並交接材料與完工單。</p><button className="primary" onClick={onInstallation}>建立並分派安裝任務</button></div>}{!canDispatch && !canInstall && <p className="muted">目前沒有需要分派的動作。請依右側履約階段繼續處理。</p>}</section><section className="card"><h2>團隊負載</h2><div className="staff-list"><Staff name="周師傅" metric="待辦 2 · 處理中 1" tag="可接單" /><Staff name="梁師傅" metric="待辦 1 · 安裝任務" tag="推薦" /><Staff name="黃師傅" metric="處理中 4" tag="忙碌" /></div><div className="section-divider" /><h3>履約交接</h3><FlowRail current={currentCase.stage} /></section></div></> }
function Staff({ name, metric, tag }) { return <div className="staff"><span>{name}</span><small>{metric}</small><b>{tag}</b></div>; }

function MasterMobile({ user, order, task, onAccept, onReject, onCheckIn, onSubmitSurvey, onAcceptInstallation, onStartInstallation, onFinishInstallation }) { const isInstallationOwner = task?.master === user.name; const viewTask = isInstallationOwner ? task : null; const showSurvey = order.status === "處理中" && user.name === order.master; return <><PageHead eyebrow="師傅移動端 · 390px 優先" title="我的待辦" text="僅展示本人可操作任務：接單、到場、照片、Service Report 與安裝完工。" /><div className="phone-frame"><div className="phone-head"><span>ECInfo 現場任務</span><small>{user.name}</small></div>{viewTask ? <InstallationTask task={viewTask} onAccept={onAcceptInstallation} onStart={onStartInstallation} onFinish={onFinishInstallation} /> : <section className="mobile-card"><span className="task-kind">初檢 / 維修工單</span><h2>{order.customer}</h2><p>{order.address}</p><strong>{order.id}</strong><Status>{order.status}</Status><div className="mobile-section"><span>工作內容</span><p>{order.desc}</p></div><div className="mobile-section"><span>拍照規則</span><p>{order.photoAllowed ? "可拍照：到場後需上傳現場前照片" : "不可拍照：填寫替代證明"}</p></div>{order.status === "待接單" && <div className="mobile-actions"><button className="primary" onClick={onAccept}>接單並填寫 ETA</button><button className="danger" onClick={onReject}>拒單</button></div>}{order.status === "待處理" && <div className="mobile-actions"><button className="primary" onClick={onCheckIn}>到場打卡 + 上傳現場前照片</button></div>}{showSurvey && <Survey onSubmit={onSubmitSurvey} />}{["待分派", "已完成"].includes(order.status) && <p className="muted">此工單目前沒有你的現場操作；請留意新的待接單消息。</p>}</section>}</div></> }
function Survey({ onSubmit }) { return <div className="survey"><h3>初檢 Service Report</h3><label>SR 編號<input defaultValue="250401" /></label><label>處理結果<textarea defaultValue="確認閘機控制板損壞，已上傳現場前後照片。" /></label><div className="photo-grid"><div>現場前照片<br /><small>已上傳</small></div><div>現場後照片<br /><small>已上傳</small></div></div><div className="mobile-actions"><button className="primary" onClick={() => onSubmit(true)}>提交 SR：需要報價 / 材料</button><button className="secondary" onClick={() => onSubmit(false)}>提交 SR：無需報價</button></div></div>; }
function InstallationTask({ task, onAccept, onStart, onFinish }) { return <section className="mobile-card install"><span className="task-kind">關聯安裝任務</span><h2>{task.title}</h2><p>{task.orderId} · {task.projectRef}</p><Status>{task.status}</Status><div className="mobile-section"><span>材料交接</span><p>{task.material}</p></div><div className="mobile-section"><span>完工單</span><p>{task.completionPaper}</p></div>{task.status === "待接單" && <div className="mobile-actions"><button className="primary" onClick={onAccept}>接單並確認材料</button></div>}{task.status === "待處理" && <div className="mobile-actions"><button className="primary" onClick={onStart}>到場打卡開始安裝</button></div>}{task.status === "處理中" && <div className="survey"><h3>安裝 Service Report</h3><label>SR 編號<input defaultValue="250402" /></label><div className="photo-grid"><div>安裝前照片<br /><small>已上傳</small></div><div>安裝後照片<br /><small>已上傳</small></div></div><button className="primary wide-button" onClick={onFinish}>提交安裝 SR + 完工單</button></div>}{task.status === "已完成" && <p className="success-copy">安裝資料已提交，等待採購確認完工單。</p>}</section>; }

function Quotation({ currentCase, quote, onPrepare, onConfirm, onDecline }) { const canPrepare = currentCase.stage === "待報價"; const canConfirm = currentCase.stage === "等待客戶確認報價"; return <><PageHead eyebrow="報價組" title="報價工作台" text="報價編號獨立於工單；來源可為 Service Report、電話或郵件，並以 Project Reference 串聯。" /><div className="master-detail"><section className="card list-card"><h2>報價池</h2><div className="order-row selected"><div><strong>{quote?.id || "待建立"}</strong><span>{PRIMARY_ORDER} · 1P260018</span></div><Status>{quote?.status || "待報價"}</Status></div><div className="order-row"><div><strong>Q-1P-260017</strong><span>WO-20260713-006 · 已確認</span></div><Status>已確認</Status></div></section><section className="card detail-card"><div className="card-head"><div><h2>{quote?.id || "建立報價"}</h2><p>來源：Service Report · 客戶：九龍屋苑管理處</p></div><Status>{quote?.status || currentCase.quoteStatus}</Status></div><div className="detail-grid"><Info label="Project Reference" value="1P260018" /><Info label="報價金額" value={quote ? `HKD ${quote.amount.toLocaleString()}` : "HKD 12,800（建議）"} /><Info label="材料需求" value="閘機控制板、感應器" /><Info label="修訂版" value={quote ? `R${quote.revision}` : "R0"} /></div>{canPrepare && <div className="callout"><strong>初檢 SR 已到達</strong><p>建立報價後會通知 CS 與 Team Leader 跟進客戶確認。</p><button className="primary" onClick={onPrepare}>建立並發出報價</button></div>}{canConfirm && <div className="callout"><strong>模擬客戶決定</strong><p>已確認報價會鎖定，不允許修改。</p><button className="primary" onClick={() => onConfirm(true)}>客戶確認，需要採購</button><button className="secondary" onClick={() => onConfirm(false)}>客戶確認，無需採購</button><button className="danger" onClick={onDecline}>客戶未中標</button></div>}{quote?.immutable && <p className="success-copy">{quote.status === "未中標" ? "已記錄未中標結果，報價不再允許修改。" : "此報價已確認並鎖定，不可修改。"}</p>}{!canPrepare && !canConfirm && !quote?.immutable && <p className="muted">等待師傅提交需要報價的 Service Report。</p>}</section></div></> }

function Purchase({ currentCase, purchase, task, onStart, onArrived, onConfirm }) { const startable = currentCase.stage === "待採購"; const arrived = currentCase.stage === "採購與物流中"; const confirmable = currentCase.stage === "待採購確認完工單"; return <><PageHead eyebrow="採購部" title="採購與物流" text="採購部負責 PO、物流到貨與完工單確認；這三項資料都是財務開票的前置條件。" /><div className="dashboard-grid"><section className="card span-2"><div className="card-head"><div><h2>{purchase?.id || "待建立採購單"}</h2><p>{PRIMARY_ORDER} · 1P260018</p></div><Status>{purchase?.status || currentCase.procurementStatus}</Status></div><div className="detail-grid"><Info label="材料" value={purchase?.material || "閘機控制板、感應器"} /><Info label="物流" value={purchase?.logistics || "待處理"} /><Info label="完工單" value={purchase?.completionPaper || currentCase.completionPaper} /><Info label="關聯安裝任務" value={task?.id || "待到貨後建立"} /></div>{startable && <div className="callout"><strong>客戶已確認報價</strong><p>建立 PO 後會通知 Team Leader 跟進物流與安裝安排。</p><button className="primary" onClick={onStart}>建立 PO 並通知供應商</button></div>}{arrived && <div className="callout"><strong>物流已安排</strong><p>確認到貨後，將通知 Team Leader 建立原工單的關聯安裝任務。</p><button className="primary" onClick={onArrived}>確認物流到貨</button></div>}{confirmable && <div className="callout"><strong>安裝 SR 與完工單已上傳</strong><p>確認後即通知會計部可開立單次發票。</p><button className="primary" onClick={onConfirm}>確認完工單與物流交接</button></div>}{currentCase.stage === "待開票" && <p className="success-copy">採購已確認，財務可進行單次開票。</p>}</section><section className="card"><h2>履約狀態</h2><FlowRail current={currentCase.stage} /><p className="muted">原工單與初檢 SR 保持不變；安裝資料以關聯執行任務保存。</p></section></div></> }

function Finance({ currentCase, invoice, onIssue, onPay }) { return <><PageHead eyebrow="會計部" title="開票與收款" text="此原型固定示範單次開票、單次收款；開票前必須取得採購與完工單確認。" /><div className="dashboard-grid"><section className="card span-2"><div className="card-head"><div><h2>{invoice?.id || "待開具單次發票"}</h2><p>{PRIMARY_ORDER} · Project Reference 1P260018</p></div><Status>{invoice?.status || currentCase.stage}</Status></div><div className="detail-grid"><Info label="客戶" value="九龍屋苑管理處" /><Info label="應收金額" value="HKD 12,800" /><Info label="採購 / 完工單" value={currentCase.completionPaper} /><Info label="收款狀態" value={invoice?.status || "未開票"} /></div>{currentCase.stage === "待開票" && <div className="callout"><strong>開票前置已完成</strong><p>採購、物流與完工單均已確認。</p><button className="primary" onClick={onIssue}>開立單次發票 INV-202607-018</button></div>}{currentCase.stage === "待收款" && <div className="callout"><strong>發票已開具</strong><p>收到客戶款項後，登記收款並將履約流程歸檔。</p><button className="primary" onClick={onPay}>登記 HKD 12,800 收款</button></div>}{currentCase.stage === "已歸檔" && <p className="success-copy">單次發票已收款，專案履約流程已歸檔。</p>}</section><section className="card"><h2>發票門禁</h2><ul className="rule-list"><li>報價已確認</li><li>採購 / 物流已確認</li><li>安裝 SR 已提交</li><li>完工單已確認</li></ul></section></div></> }

// ============ 會計部子頁面：待開票 ============
// 待開票頁面：只保留 Job Code（報價編號），支援篩選、全選、批量開票、自動生成發票號
function PendingInvoicePage({ data, mutate }) {
  const [filter, setFilter] = useState({ keyword: "", date: "", type: "" });
  const [selected, setSelected] = useState([]);
  const [batchOpen, setBatchOpen] = useState(false);
  const [firstInvoiceNo, setFirstInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [printTarget, setPrintTarget] = useState(null);

  // 依關鍵字、日期、類型篩選待開票清單
  const filtered = data.pendingInvoices.filter((item) => {
    const matchKeyword = !filter.keyword ||
      item.jobCode.includes(filter.keyword) ||
      item.customer.includes(filter.keyword) ||
      item.desc.includes(filter.keyword);
    const matchDate = !filter.date || item.createdAt === filter.date;
    const matchType = !filter.type || item.type === filter.type;
    return matchKeyword && matchDate && matchType;
  });

  // 全選 / 取消全選
  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((item) => item.id));
  };

  // 切換單筆選中
  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  // 批量開具發票：手動提供第一張發票號，餘下自動順序生成；加完發票號自動彈出列印功能
  const issueBatch = () => {
    if (!firstInvoiceNo || selected.length === 0) return;
    // 解析發票號前綴與數字部分，自動順序生成
    const match = firstInvoiceNo.match(/^(.*?)(\d+)$/);
    const prefix = match ? match[1] : firstInvoiceNo;
    const startNum = match ? parseInt(match[2], 10) : 0;
    const padLen = match ? match[2].length : 3;
    const newInvoiceIds = [];
    mutate((next) => {
      selected.forEach((id, index) => {
        const pi = next.pendingInvoices.find((item) => item.id === id);
        if (pi) {
          const invoiceNo = `${prefix}${String(startNum + index).padStart(padLen, "0")}`;
          newInvoiceIds.push(invoiceNo);
          next.invoicesMgmt.unshift({
            id: invoiceNo, jobId: pi.jobCode, customer: pi.customer, amount: pi.amount,
            issuedAt: invoiceDate.slice(5).replaceAll("-", "-"), dueAt: "", paymentTerms: "30 天",
            status: "已開具", amountChanged: false, changeReason: "",
          });
          pi.status = "已開票";
        }
      });
    }, `已批量開具 ${selected.length} 張發票，自動彈出列印功能。`);
    // 加完發票號，自動彈出列印發票功能
    setPrintTarget({ ids: newInvoiceIds, date: invoiceDate });
    setBatchOpen(false);
    setSelected([]);
    setFirstInvoiceNo("");
  };

  // 單筆開票
  const issueSingle = (id) => {
    setSelected([id]);
    setBatchOpen(true);
  };

  return <><PageHead eyebrow="會計部" title="待開票" text="只需 Job Code（報價編號），名稱跟工單設定；支援篩選、全選、批量開票與自動生成發票號。" />
    <section className="card filter-bar">
      <input placeholder="關鍵字（Job Code / 客戶 / 描述）" value={filter.keyword} onChange={(e) => setFilter({ ...filter, keyword: e.target.value })} />
      <input type="date" value={filter.date} onChange={(e) => setFilter({ ...filter, date: e.target.value })} />
      <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
        <option value="">全部類型</option>
        <option value="工程">工程</option>
        <option value="M類保養">M類保養</option>
      </select>
      <button className="secondary" onClick={() => setFilter({ keyword: "", date: "", type: "" })}>清除</button>
    </section>
    <section className="card batch-toolbar">
      <label className="checkbox-label"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} />全選</label>
      <span className="muted">已選 {selected.length} 筆</span>
      <div className="inline-actions" style={{ margin: 0 }}>
        <button className="primary" disabled={selected.length === 0} onClick={() => setBatchOpen(true)}>批量開具發票</button>
        <button className="secondary" onClick={() => setPrintTarget({ ids: selected, date: invoiceDate })} disabled={selected.length === 0}>列印選取</button>
      </div>
    </section>
    <section className="card">
      <div className="table-title"><h2>待開票清單</h2><span>{filtered.length} 筆</span></div>
      <table className="data-table">
        <thead><tr><th></th><th>Job Code</th><th>客戶</th><th>描述</th><th>金額</th><th>類型</th><th>Billing Period</th><th>附件</th><th>狀態</th><th>操作</th></tr></thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id}>
              <td><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} /></td>
              <td><strong>{item.jobCode}</strong></td>
              <td>{item.customer}</td>
              <td>{item.desc}</td>
              <td>HKD {item.amount.toLocaleString()}</td>
              <td>{item.type}</td>
              <td>{item.billingPeriod || "—"}</td>
              <td><span className="soft-label">{item.attachments.photos ? "相片 " : ""}{item.attachments.completionPaper ? "完工紙 " : ""}{item.attachments.sr ? "SR " : ""}{item.attachments.confirmation ? "確認" : ""}</span></td>
              <td><Status>{item.status}</Status></td>
              <td><button className="link" onClick={() => issueSingle(item.id)}>開票</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    {batchOpen && <div className="modal-backdrop"><div className="modal">
      <div className="card-head"><h2>批量開具發票</h2><button className="close" onClick={() => setBatchOpen(false)}>關閉</button></div>
      <p className="muted">已選 {selected.length} 筆待開票。請輸入第一張發票號，餘下將自動順序生成。發票內容及金額將根據 CS/報價組輸入的資料滙出。</p>
      <div className="form-grid">
        <label className="field"><span>第一張發票號 <em>*</em></span><input value={firstInvoiceNo} onChange={(e) => setFirstInvoiceNo(e.target.value)} placeholder="如 INV-202607-020" /></label>
        <label className="field"><span>發票日期（可手動變更）</span><input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></label>
      </div>
      <p className="form-note">加完發票號後，系統會自動生成發票連同該單工程相關的相片、完工紙、SR 及客戶確認 work order/confirmation，並自動彈出列印發票功能。</p>
      <div className="form-actions"><button className="primary" onClick={issueBatch}>確認開具並列印</button></div>
    </div></div>}
    {printTarget && <PrintModal target={printTarget} data={data} onClose={() => setPrintTarget(null)} />}
  </>;
}

// ============ 會計部子頁面：發票管理 ============
// 發票管理：第二欄位改為 Job ID；客戶數期可變更；金額變更需輸入原因；重印可選擇是否變更發票日期
function InvoiceManagementPage({ data, mutate }) {
  const [editTarget, setEditTarget] = useState(null);
  const [reprintTarget, setReprintTarget] = useState(null);
  const [changeTarget, setChangeTarget] = useState(null);

  // 更新發票的客戶數期
  const updatePaymentTerms = (id, terms) => {
    mutate((next) => {
      const inv = next.invoicesMgmt.find((item) => item.id === id);
      if (inv) inv.paymentTerms = terms;
    }, "客戶數期已更新。");
    setEditTarget(null);
  };

  // 變更發票金額，需輸入變更原因
  const changeAmount = (id, newAmount, reason) => {
    mutate((next) => {
      const inv = next.invoicesMgmt.find((item) => item.id === id);
      if (inv) { inv.amount = newAmount; inv.amountChanged = true; inv.changeReason = reason; }
    }, "發票金額已變更，已記錄變更原因。");
    setChangeTarget(null);
  };

  // 重印發票：可選擇是否變更發票日期（僅影響當次列印，系統保留原始開單日期）
  const reprint = (id, changeDate, newDate) => {
    mutate(() => {}, `已重印發票 ${id}${changeDate ? `（列印日期變更為 ${newDate}，系統保留原始開單日期）` : "（保留原始開單日期）"}。`);
    setReprintTarget(null);
  };

  return <><PageHead eyebrow="會計部" title="發票管理" text="第二欄位為 Job ID（與 CS/報價時一致）；支援客戶數期變更、金額變更原因、重印發票日期選項。" />
    <section className="card">
      <div className="table-title"><h2>發票列表</h2><span>{data.invoicesMgmt.length} 筆</span></div>
      <table className="data-table">
        <thead><tr><th>發票號</th><th>Job ID</th><th>客戶</th><th>金額</th><th>開單日期</th><th>到期日</th><th>客戶數期</th><th>狀態</th><th>操作</th></tr></thead>
        <tbody>
          {data.invoicesMgmt.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.id}</strong></td>
              <td>{item.jobId}</td>
              <td>{item.customer}</td>
              <td>HKD {item.amount.toLocaleString()}{item.amountChanged && <span className="soft-label">（已變更）</span>}</td>
              <td>{item.issuedAt}</td>
              <td>{item.dueAt || "—"}</td>
              <td>{item.paymentTerms}</td>
              <td><Status>{item.status}</Status></td>
              <td>
                <div className="row-actions">
                  <button className="link" onClick={() => setEditTarget(item)}>變更數期</button>
                  <button className="link" onClick={() => setChangeTarget(item)}>變更金額</button>
                  <button className="link" onClick={() => setReprintTarget(item)}>重印</button>
                  <button className="link">列印</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    {editTarget && <PaymentTermsModal invoice={editTarget} onSave={updatePaymentTerms} onClose={() => setEditTarget(null)} />}
    {changeTarget && <ChangeAmountModal invoice={changeTarget} onSave={changeAmount} onClose={() => setChangeTarget(null)} />}
    {reprintTarget && <ReprintModal invoice={reprintTarget} onReprint={reprint} onClose={() => setReprintTarget(null)} />}
  </>;
}

// 變更客戶數期模態框
function PaymentTermsModal({ invoice, onSave, onClose }) {
  const [terms, setTerms] = useState(invoice.paymentTerms);
  return <div className="modal-backdrop"><div className="modal">
    <div className="card-head"><h2>變更客戶數期</h2><button className="close" onClick={onClose}>關閉</button></div>
    <p className="muted">發票 {invoice.id} · {invoice.customer}</p>
    <label className="field"><span>客戶數期</span>
      <select value={terms} onChange={(e) => setTerms(e.target.value)}>
        <option value="15 天">15 天</option><option value="30 天">30 天</option><option value="45 天">45 天</option><option value="60 天">60 天</option><option value="90 天">90 天</option>
      </select>
    </label>
    <div className="form-actions"><button className="primary" onClick={() => onSave(invoice.id, terms)}>儲存</button></div>
  </div></div>;
}

// 變更發票金額模態框（需輸入變更原因）
function ChangeAmountModal({ invoice, onSave, onClose }) {
  const [amount, setAmount] = useState(invoice.amount);
  const [reason, setReason] = useState("");
  return <div className="modal-backdrop"><div className="modal">
    <div className="card-head"><h2>變更發票金額</h2><button className="close" onClick={onClose}>關閉</button></div>
    <p className="muted">發票 {invoice.id} · 原金額 HKD {invoice.amount.toLocaleString()}</p>
    <div className="form-grid">
      <label className="field"><span>新金額 <em>*</em></span><input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></label>
      <label className="field wide"><span>變更原因 <em>*</em></span><textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="請說明金額變更原因" /></label>
    </div>
    <div className="form-actions"><button className="primary" disabled={!reason} onClick={() => onSave(invoice.id, amount, reason)}>確認變更</button></div>
  </div></div>;
}

// 重印發票模態框（可選擇是否變更發票日期）
function ReprintModal({ invoice, onReprint, onClose }) {
  const [changeDate, setChangeDate] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  return <div className="modal-backdrop"><div className="modal">
    <div className="card-head"><h2>重印發票</h2><button className="close" onClick={onClose}>關閉</button></div>
    <p className="muted">發票 {invoice.id} · 原始開單日期 {invoice.issuedAt}（系統保留原始開單日期）</p>
    <label className="checkbox-label"><input type="checkbox" checked={changeDate} onChange={(e) => setChangeDate(e.target.checked)} />是否需要變更發票日期（僅影響當次列印）</label>
    {changeDate && <label className="field"><span>列印用發票日期</span><input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} /></label>}
    <div className="form-actions"><button className="primary" onClick={() => onReprint(invoice.id, changeDate, newDate.slice(5).replaceAll("-", "-"))}>重印</button></div>
  </div></div>;
}

// ============ 會計部子頁面：收款記錄 ============
// 收款記錄：加 Job ID；導入現時收據格式；收據編號自動生成為 EC + invoice no
function ReceiptRecordsPage({ data, mutate }) {
  const [printTarget, setPrintTarget] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ invoiceNo: "", jobId: "", customer: "", amount: 0, payMethod: "Cash", chequeNo: "", forJob: "" });

  // 新增收款記錄：收據編號自動生成為 EC + invoice no
  const addReceipt = () => {
    if (!form.invoiceNo || !form.amount) return;
    const receiptId = `EC${form.invoiceNo.replace(/\D/g, "").slice(-8).padStart(8, "0")}`;
    mutate((next) => {
      next.receipts.unshift({ id: receiptId, ...form, receivedAt: stamp() });
    }, `已新增收款記錄，收據編號自動生成為 ${receiptId}。`);
    setAddOpen(false);
    setForm({ invoiceNo: "", jobId: "", customer: "", amount: 0, payMethod: "Cash", chequeNo: "", forJob: "" });
  };

  return <><PageHead eyebrow="會計部" title="收款記錄" text="加 Job ID（與 CS/報價時一致）；收據編號自動生成為 EC + invoice no；附現時收據格式，可列印收據。" />
    <section className="card batch-toolbar">
      <span className="muted">{data.receipts.length} 筆收款記錄</span>
      <button className="primary" onClick={() => setAddOpen(true)}>新增收款</button>
    </section>
    <section className="card">
      <div className="table-title"><h2>收款列表</h2><span>{data.receipts.length} 筆</span></div>
      <table className="data-table">
        <thead><tr><th>收據編號</th><th>發票號</th><th>Job ID</th><th>客戶</th><th>金額</th><th>付款方式</th><th>支票號</th><th>收款日期</th><th>操作</th></tr></thead>
        <tbody>
          {data.receipts.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.id}</strong></td>
              <td>{item.invoiceNo}</td>
              <td>{item.jobId}</td>
              <td>{item.customer}</td>
              <td>HKD {item.amount.toLocaleString()}</td>
              <td>{item.payMethod}</td>
              <td>{item.chequeNo || "—"}</td>
              <td>{item.receivedAt}</td>
              <td><button className="link" onClick={() => setPrintTarget(item)}>列印收據</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    {addOpen && <div className="modal-backdrop"><div className="modal">
      <div className="card-head"><h2>新增收款記錄</h2><button className="close" onClick={() => setAddOpen(false)}>關閉</button></div>
      <p className="muted">收據編號將自動生成為 EC + invoice no，無需手動輸入。</p>
      <div className="form-grid">
        <label className="field"><span>發票號 <em>*</em></span><input value={form.invoiceNo} onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })} placeholder="如 INV-202607-018" /></label>
        <label className="field"><span>Job ID <em>*</em></span><input value={form.jobId} onChange={(e) => setForm({ ...form, jobId: e.target.value })} placeholder="如 1P260018" /></label>
        <label className="field"><span>客戶</span><input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} /></label>
        <label className="field"><span>金額 <em>*</em></span><input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} /></label>
        <label className="field"><span>付款方式</span><select value={form.payMethod} onChange={(e) => setForm({ ...form, payMethod: e.target.value })}><option value="Cash">Cash</option><option value="Cheque">Cheque</option><option value="Bank Transfer">Bank Transfer</option></select></label>
        <label className="field"><span>支票號</span><input value={form.chequeNo} onChange={(e) => setForm({ ...form, chequeNo: e.target.value })} /></label>
        <label className="field wide"><span>For Payment of（Job ID）</span><input value={form.forJob} onChange={(e) => setForm({ ...form, forJob: e.target.value })} /></label>
      </div>
      <div className="form-actions"><button className="primary" onClick={addReceipt}>確認新增</button></div>
    </div></div>}
    {printTarget && <ReceiptPrintModal receipt={printTarget} onClose={() => setPrintTarget(null)} />}
  </>;
}

// 收據列印模態框（參考 PDF 第 4 頁收據樣式）
function ReceiptPrintModal({ receipt, onClose }) {
  return <div className="modal-backdrop"><div className="modal">
    <div className="card-head"><h2>列印收據</h2><button className="close" onClick={onClose}>關閉</button></div>
    <div className="receipt-preview">
      <div className="receipt-header">
        <strong>EC Infotech Limited</strong>
        <span>Unit D, 3/Fl., Block 2, Camel Paint Building, 62 Hoi Yuen Road, Kwun Tong, Kowloon, Hong Kong</span>
        <span>Tel: 2876 2990 Fax: 3101 0616</span>
      </div>
      <div className="receipt-body">
        <div className="receipt-row"><span>To: {receipt.customer}</span><span>Date: {receipt.receivedAt}</span></div>
        <div className="receipt-row"><span>Receipt Number: {receipt.id}</span><span>For Payment of: {receipt.forJob || receipt.jobId}</span></div>
        <h3>OFFICAL RECEIPT</h3>
        <p>We hereby acknowledge receipt of {receipt.payMethod === "Cheque" ? "cheque" : "cash"} in Hong Kong Dollars from,</p>
        <div className="receipt-row"><span>Received From: {receipt.customer}</span></div>
        <div className="receipt-row"><strong>In the Amount of: HK${receipt.amount.toLocaleString()}</strong></div>
        {receipt.payMethod === "Cheque" && <div className="receipt-row"><span>Cheque No.: {receipt.chequeNo}</span></div>}
        <div className="receipt-row"><span>On Behalf of EC InfoTech Limited</span></div>
      </div>
    </div>
    <div className="form-actions"><button className="primary" onClick={() => window.print()}>列印</button></div>
  </div></div>;
}

// ============ 會計部子頁面：會計客戶檔案 ============
// 會計客戶檔案：獨立於 CS/報價組，含 billing address、收件人、數期；可變更功能
function AccountingCustomersPage({ data, mutate }) {
  const [editTarget, setEditTarget] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", phone: "", billingAddress: "", recipient: "", paymentTerms: "30 天", attn: "" });

  // 新增會計客戶檔案
  const addCustomer = () => {
    if (!form.name) return;
    mutate((next) => {
      next.acctCustomers.unshift({ id: `AC-${String(next.acctCustomers.length + 1).padStart(3, "0")}`, ...form });
    }, "已新增會計客戶檔案。");
    setAddOpen(false);
    setForm({ name: "", contact: "", phone: "", billingAddress: "", recipient: "", paymentTerms: "30 天", attn: "" });
  };

  // 更新客戶檔案（含 billing address、收件人、數期）
  const updateCustomer = (id, updates) => {
    mutate((next) => {
      const cust = next.acctCustomers.find((item) => item.id === id);
      if (cust) Object.assign(cust, updates);
    }, "客戶檔案已更新。");
    setEditTarget(null);
  };

  return <><PageHead eyebrow="會計部" title="會計客戶檔案" text="獨立於 CS/報價組的客戶資料，含 billing address、收件人資料、客戶數期；支援可變更功能。" />
    <section className="card batch-toolbar">
      <span className="muted">{data.acctCustomers.length} 個客戶</span>
      <button className="primary" onClick={() => setAddOpen(true)}>新增客戶</button>
    </section>
    <section className="card">
      <div className="table-title"><h2>客戶列表</h2><span>{data.acctCustomers.length} 個</span></div>
      <table className="data-table">
        <thead><tr><th>客戶名稱</th><th>聯絡人</th><th>電話</th><th>Billing Address</th><th>收件人</th><th>客戶數期</th><th>操作</th></tr></thead>
        <tbody>
          {data.acctCustomers.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.name}</strong></td>
              <td>{item.contact}</td>
              <td>{item.phone}</td>
              <td>{item.billingAddress}</td>
              <td>{item.recipient}{item.attn ? ` (${item.attn})` : ""}</td>
              <td>{item.paymentTerms}</td>
              <td><button className="link" onClick={() => setEditTarget(item)}>變更</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    {addOpen && <div className="modal-backdrop"><div className="modal">
      <div className="card-head"><h2>新增會計客戶</h2><button className="close" onClick={() => setAddOpen(false)}>關閉</button></div>
      <div className="form-grid">
        <label className="field"><span>客戶名稱 <em>*</em></span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="field"><span>聯絡人</span><input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
        <label className="field"><span>電話</span><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label className="field"><span>客戶數期</span><select value={form.paymentTerms} onChange={(e) => setForm({ ...form, paymentTerms: e.target.value })}><option value="15 天">15 天</option><option value="30 天">30 天</option><option value="45 天">45 天</option><option value="60 天">60 天</option><option value="90 天">90 天</option></select></label>
        <label className="field wide"><span>Billing Address</span><input value={form.billingAddress} onChange={(e) => setForm({ ...form, billingAddress: e.target.value })} /></label>
        <label className="field"><span>收件人</span><input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} /></label>
        <label className="field"><span>Attn</span><input value={form.attn} onChange={(e) => setForm({ ...form, attn: e.target.value })} /></label>
      </div>
      <div className="form-actions"><button className="primary" onClick={addCustomer}>確認新增</button></div>
    </div></div>}
    {editTarget && <EditCustomerModal customer={editTarget} onSave={updateCustomer} onClose={() => setEditTarget(null)} />}
  </>;
}

// 變更客戶檔案模態框
function EditCustomerModal({ customer, onSave, onClose }) {
  const [form, setForm] = useState({ ...customer });
  return <div className="modal-backdrop"><div className="modal">
    <div className="card-head"><h2>變更客戶檔案</h2><button className="close" onClick={onClose}>關閉</button></div>
    <div className="form-grid">
      <label className="field"><span>客戶名稱</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
      <label className="field"><span>聯絡人</span><input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
      <label className="field"><span>電話</span><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
      <label className="field"><span>客戶數期</span><select value={form.paymentTerms} onChange={(e) => setForm({ ...form, paymentTerms: e.target.value })}><option value="15 天">15 天</option><option value="30 天">30 天</option><option value="45 天">45 天</option><option value="60 天">60 天</option><option value="90 天">90 天</option></select></label>
      <label className="field wide"><span>Billing Address</span><input value={form.billingAddress} onChange={(e) => setForm({ ...form, billingAddress: e.target.value })} /></label>
      <label className="field"><span>收件人</span><input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} /></label>
      <label className="field"><span>Attn</span><input value={form.attn} onChange={(e) => setForm({ ...form, attn: e.target.value })} /></label>
    </div>
    <div className="form-actions"><button className="primary" onClick={() => onSave(customer.id, form)}>儲存變更</button></div>
  </div></div>;
}

// 列印發票模態框（支援單一 / 批次）
function PrintModal({ target, data, onClose }) {
  const invoices = (target.ids || []).map((id) => data.invoicesMgmt.find((item) => item.id === id)).filter(Boolean);
  return <div className="modal-backdrop"><div className="modal">
    <div className="card-head"><h2>列印發票</h2><button className="close" onClick={onClose}>關閉</button></div>
    <p className="muted">即將列印 {invoices.length} 張發票，發票內容及金額根據 CS/報價組輸入的資料滙出。</p>
    <div className="receipt-preview">
      {invoices.map((inv) => (
        <div key={inv.id} className="receipt-body" style={{ borderBottom: "1px solid var(--line)", marginBottom: 12 }}>
          <div className="receipt-header"><strong>EC Infotech Limited</strong><span>發票號: {inv.id}</span></div>
          <div className="receipt-row"><span>To: {inv.customer}</span><span>Date: {target.date}</span></div>
          <div className="receipt-row"><span>Job ID: {inv.jobId}</span><span>金額: HK${inv.amount.toLocaleString()}</span></div>
          <p className="muted">附：相片、完工紙、SR 及客戶確認 work order/confirmation</p>
        </div>
      ))}
    </div>
    <div className="form-actions"><button className="primary" onClick={() => window.print()}>列印全部</button></div>
  </div></div>;
}

function Audit({ events }) { return <><PageHead eyebrow="主管 / 管理員" title="操作審計" text="每一個狀態變更、文件提交、派單和財務動作均保留操作人與時間。" /><section className="card"><div className="card-head"><h2>全鏈路事件</h2><span className="soft-label">不可刪除的演示紀錄</span></div><Timeline events={events} /></section></> }
function UserRules() { return <><PageHead eyebrow="主管 / 管理員" title="用戶與流程規則" text="原型以獨立個人帳戶、資料範圍與消息接收人作為權限演示。" /><div className="dashboard-grid"><section className="card span-2"><h2>角色與資料範圍</h2><div className="permission-table">{ROLES.map(([role, label]) => <div key={role}><strong>{label}</strong><span>{role === "MASTER" ? "僅本人待辦與關聯安裝任務" : role === "BOSS" ? "只讀經營與履約摘要" : "依角色查看、操作或管理相關資料"}</span></div>)}</div></section><section className="card"><h2>關鍵規則</h2><ul className="rule-list"><li>師傅拒單必填原因</li><li>已確認報價不可修改</li><li>完工單確認後才可開票</li><li>所有消息指向關聯資料</li></ul></section></div></> }
function Boss({ metrics, data, currentCase }) { return <><PageHead eyebrow="只讀經營視角" title="項目履約與收款" text="不直接改動現場記錄，只讀取履約風險、報價與收款狀態。" /><div className="metrics"><Metric label="本月已收款" value={`HKD ${metrics.money.toLocaleString()}`} note="單次收款" /><Metric label="待收款" value={data.invoices.filter((item) => item.status === "已開具").length} note="需財務跟進" /><Metric label="履約中" value={currentCase.archived ? 0 : 1} note={currentCase.stage} /><Metric label="已完成工單" value={metrics.complete} note="現場交付" /></div><section className="card"><div className="card-head"><div><h2>1P260018 履約風險</h2><p>九龍屋苑管理處 · {PRIMARY_ORDER}</p></div><Status>{currentCase.stage}</Status></div><FlowRail current={currentCase.stage} /></section></> }

function FlowRail({ current }) { const stages = ["待分派", "等待師傅接單", "現場勘查中", "待報價", "等待客戶確認報價", "待採購", "採購與物流中", "到貨待派安裝", "等待安裝師傅接單", "待採購確認完工單", "待開票", "待收款", "已歸檔"]; const active = Math.max(0, stages.indexOf(current)); return <div className="flow-rail">{stages.map((stage, index) => <div className={index <= active ? "flow-step complete" : "flow-step"} key={stage}><i>{index + 1}</i><span>{stage}</span></div>)}</div>; }

function Flows() { return <><PageHead eyebrow="流程確認包" title="全角色流程與消息事件" text="效果圖與互動原型共用以下狀態、角色、關聯鍵和門禁規則。" /><div className="flow-docs"><section className="card"><h2>01 · 全角色泳道</h2><div className="swimlane"><Lane role="CS" text="建立工單、補充資料、催單" /><Lane role="Team Leader" text="分派、處理拒單、到貨後重新分派" /><Lane role="師傅" text="接單、打卡、照片、初檢 / 安裝 SR" /><Lane role="報價組" text="建立報價、發出、客戶確認" /><Lane role="採購部" text="PO、物流到貨、完工單確認" /><Lane role="會計部" text="單次開票、收款、歸檔" /></div></section><section className="card"><h2>02 · 工單 6 狀態</h2><div className="state-flow"><Status>待分派</Status><b>→ 分派 →</b><Status>待接單</Status><b>→ 接單 →</b><Status>待處理</Status><b>→ 打卡 + 現場前照片 →</b><Status>處理中</Status><b>→ 提交 SR →</b><Status>已完成</Status><span className="branch">拒單：待接單 → 待分派；取消：任意有效節點 → 已取消</span></div></section><section className="card"><h2>03 · 報價、採購、安裝、收款</h2><FlowRail current="已歸檔" /><p className="muted">主工單於初檢 SR 提交後完成；履約軌繼續以原工單號、Project Reference 和關聯執行任務追蹤後續商務與安裝。</p></section><section className="card"><h2>04 · 消息提醒對應表</h2><div className="message-map"><MapRow trigger="CS 建單" receiver="Team Leader" target="待分派工單" /><MapRow trigger="TL 分派 / 改派" receiver="指定師傅" target="師傅移動端待辦" /><MapRow trigger="師傅接單 / 拒單 / 到場" receiver="Team Leader" target="分派中心" /><MapRow trigger="初檢 SR 需要報價" receiver="報價組" target="報價工作台" /><MapRow trigger="客戶確認報價" receiver="採購部 / 會計部" target="採購或財務工作台" /><MapRow trigger="物流到貨" receiver="Team Leader" target="關聯安裝任務" /><MapRow trigger="完工單確認" receiver="會計部" target="待開票發票" /><MapRow trigger="開票 / 收款" receiver="CS、TL、老闆" target="關聯工單與經營看板" /></div></section></div></> }
function Lane({ role, text }) { return <div><strong>{role}</strong><span>{text}</span></div>; }
function MapRow({ trigger, receiver, target }) { return <div><strong>{trigger}</strong><span>通知 {receiver}</span><b>開啟 {target}</b></div>; }
