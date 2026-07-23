# 移動端工作台重設 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將原型中的移動頁面改為獨立、角色導向的移動工作台，並在 PC 側邊欄底部提供固定入口。

**Architecture:** 維持單一 `ui-prototype/index.html` 及既有 in-memory `tickets` 狀態。以 `openMobileWorkspace()` 作為唯一入口，依目前角色導向師傅或主管首頁；重設 `#mobileShell` 為獨立移動應用畫布，再由既有 `renderMobile*` 函式輸出角色專屬內容與底部抽屜。

**Tech Stack:** 原生 HTML、CSS、JavaScript；無新增依賴；以 Node.js 解析內嵌腳本與瀏覽器手動走查驗證。

## Global Constraints

- 所有客戶可見文案使用香港繁體中文，核心名詞使用 `CALL`、`服務報告`、`師傅`、`主管`。
- 不修改 `tickets` 的狀態 key、既有 PC CALL 管理、服務報告或分派資料結構。
- `移動端` 是唯一固定名稱，並位於 `基礎設置` 後、PC 側邊欄最底部。
- 移動端不呈現 PC 側邊欄、PC 頂部角色列或手機硬體外框；桌面預覽畫布最大寬度為 480px，窄螢幕時寬度填滿。
- 師傅與主管皆只有「首頁 / CALL」兩項底部導覽；角色決定頁面內容，不新增第三個主要入口。
- 所有操作沿用既有 `updateTicket()`、`toast()`、`tickets` 與服務記錄欄位，確保 PC 和移動端同步。

---

### Task 1: 固化移動端入口與角色路由

**Files:**
- Modify: `ui-prototype/index.html:4127-4135` (`MOBILE_WORKSPACE`、`MOBILE_PAGES`)
- Modify: `ui-prototype/index.html:6470-6575` (`renderShell`)
- Modify: `ui-prototype/index.html:16058-16115` (`renderMobile`)
- Modify: `ui-prototype/index.html:16200-16900` (事件委派與角色切換)

**Interfaces:**
- Consumes: `state.role`, `state.view`, `state.mobilePage`, `MOBILE_PAGES` 與 `currentRole()`。
- Produces: `openMobileWorkspace(): void`，以及 `mobilePage` 的角色預設值 `masterHome` 或 `tlHome`。

- [ ] **Step 1: 加入入口結構的靜態驗證指令**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('ui-prototype/index.html', 'utf8');
for (const text of ['label: "移動端"', 'data-mobile-workspace', 'openMobileWorkspace']) {
  if (!html.includes(text)) throw new Error(`Missing ${text}`);
}
console.log('mobile entry structure present');
NODE
```

Expected: 在實作前失敗，因為入口標籤仍為 `移動工作台`。

- [ ] **Step 2: 將側邊欄入口移到最末端**

將常量改為：

```js
const MOBILE_WORKSPACE = {
  key: 'mobileWorkspace',
  label: '移動端',
  icon: '📱',
  sub: '師傅服務與主管分派工作台'
};
```

在 `renderShell()` 分兩段輸出導覽：先輸出完整 `PAGES`（其中 `settings` 仍維持既有子選單），最後單獨輸出 `MOBILE_WORKSPACE`。不要使用 `[...PAGES.slice(0, 1), MOBILE_WORKSPACE, ...PAGES.slice(1)]`，以確保入口固定在 `基礎設置` 後方。

- [ ] **Step 3: 統一移動端開啟邏輯**

實作：

```js
function openMobileWorkspace() {
  if (!['MASTER', 'TL'].includes(state.role)) setRole('MASTER');
  state.view = 'mobile';
  state.mobilePage = state.role === 'TL' ? 'tlHome' : 'masterHome';
  state.mobileDetailTicketId = null;
  state.mobileProcessTicketId = null;
  state.mdDispatchSheetOpen = false;
  render();
}
```

左側入口和頂部「移動端」視圖切換都只呼叫此函式；師傅與主管角色切換時也導向角色對應首頁。保留使用者人物切換，讓原型可展示同一角色下不同人的資料。

- [ ] **Step 4: 重新執行入口驗證**

Run the Step 1 command.

Expected: `mobile entry structure present`。

- [ ] **Step 5: Commit**

```bash
git add ui-prototype/index.html
git commit -m "feat: 固化移動端工作台入口"
```

### Task 2: 建立獨立移動應用殼層與共用組件樣式

**Files:**
- Modify: `ui-prototype/index.html:1315-1365` (舊 `.phone`、`.phone-body`、`.phone-tabs` 樣式)
- Modify: `ui-prototype/index.html:1900-1925` (窄螢幕媒體規則)
- Modify: `ui-prototype/index.html:3717-3721` (`#mobileShell` DOM)
- Modify: `ui-prototype/index.html:6470-6505` (`renderShell` 對 PC 與移動殼層的顯示控制)

**Interfaces:**
- Consumes: `state.view`、`#mobileShell`、`#mobileBody`、`#mobileTabs`。
- Produces: `.mobile-app-shell`、`.mobile-app-bar`、`.mobile-app-canvas`、`.mobile-bottom-nav` 共用樣式與 DOM。

- [ ] **Step 1: 先加入移動殼層 DOM 結構檢查**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('ui-prototype/index.html', 'utf8');
for (const selector of ['mobile-app-shell', 'mobile-app-bar', 'mobile-bottom-nav']) {
  if (!html.includes(selector)) throw new Error(`Missing ${selector}`);
}
console.log('mobile app shell present');
NODE
```

Expected: 在實作前失敗，因為畫面仍使用 `.phone`。

- [ ] **Step 2: 替換手機外框為移動應用畫布**

將 `#mobileShell` 內部改為：

```html
<section class="mobile-app-shell" aria-label="移動端工作台">
  <header class="mobile-app-bar" id="mobileAppBar"></header>
  <main class="mobile-app-canvas" id="mobileBody"></main>
  <nav class="mobile-bottom-nav" id="mobileTabs" aria-label="移動端導覽"></nav>
</section>
```

刪除或停用 `.phone` 的外框、圓角、深色邊線和硬體預覽高度。`#mobileShell` 在桌面時提供中性預覽背景，`.mobile-app-shell` 最大寬度 480px；在 `max-width: 640px` 時移除最大寬度、陰影和外層留白，填滿視窗高度。

- [ ] **Step 3: 在 `renderMobile()` 輸出應用列與雙項底部導覽**

新增 `renderMobileAppBar()`，內容使用 `currentRole()` 顯示姓名、角色與區域。根據師傅或主管輸出相同標籤的兩個按鈕：

```js
const visiblePages = state.role === 'TL'
  ? MOBILE_PAGES.filter(p => ['tlHome', 'dispatch'].includes(p.key))
  : MOBILE_PAGES.filter(p => ['masterHome', 'tasks'].includes(p.key));
```

不在移動殼層中重新輸出 PC 的 `#topbar`、`#roleSwitch` 或 `#navList`。

- [ ] **Step 4: 重新執行殼層檢查與腳本解析**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('ui-prototype/index.html', 'utf8');
const start = html.indexOf('<script>');
const end = html.lastIndexOf('</script>');
new Function(html.slice(start + 8, end));
console.log('mobile app shell and inline script syntax OK');
NODE
```

Expected: `mobile app shell and inline script syntax OK`。

- [ ] **Step 5: Commit**

```bash
git add ui-prototype/index.html
git commit -m "feat: 重設獨立移動端殼層"
```

### Task 3: 重設師傅與主管的首頁、CALL 清單和共用卡片

**Files:**
- Modify: `ui-prototype/index.html:14750-14974` (`renderMasterHome`)
- Modify: `ui-prototype/index.html:14975-15000` (`renderMobileTasks`)
- Modify: `ui-prototype/index.html:15750-15905` (`renderTlMobileHome`、`renderMobileDispatch`)
- Modify: `ui-prototype/index.html:16058-16115` (`renderMobile`)
- Modify: `ui-prototype/index.html:520-1314` (新增 `.mobile-hero`、`.mobile-summary-card`、`.mobile-call-card`、`.mobile-segmented` 等共用 CSS)

**Interfaces:**
- Consumes: `masterTickets()`, `tickets`, `statusClass()`, `currentRole()`, `state.masterStatus`, `state.mdSelectedTicketId`。
- Produces: `renderMasterHome()`, `renderMobileTasks()`, `renderTlMobileHome()`, `renderMobileDispatch()` 統一以共用卡片組件輸出。

- [ ] **Step 1: 寫入頁面輸出約束檢查**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('ui-prototype/index.html', 'utf8');
for (const name of ['renderMasterHome', 'renderMobileTasks', 'renderTlMobileHome', 'renderMobileDispatch']) {
  if (!html.includes(`function ${name}()`)) throw new Error(`Missing ${name}`);
}
console.log('mobile role page renderers present');
NODE
```

Expected: `mobile role page renderers present`；此步確認重設不會刪除既有角色分頁。

- [ ] **Step 2: 以共用元件縮減師傅首頁與 CALL 清單**

師傅首頁只保留一張當日任務主卡、可點擊摘要和最多三筆優先 CALL。CALL 頁保留四個等寬狀態分段，以 `ticket.status === state.masterStatus` 過濾，並為每種狀態提供對應下一步：`收到`、`開始處理`、`繼續處理`、`查看詳情`。

卡片內容固定為 CALL 編號、客戶、區域、類型、狀態及一個主要操作，避免把 PC 表格欄位塞入卡片。

- [ ] **Step 3: 以共用元件重做主管首頁與 CALL 清單**

主管首頁只顯示待分派、已分派、可接單師傅三張可點擊小型摘要卡及最多三筆優先 CALL。主管 CALL 清單展示主管可見的進行中 CALL；待分派 CALL 可開啟分派抽屜，其他狀態只開啟詳情。

每次渲染都由實際資料計算 `pendingCount` 與 `activeTickets.length`，不要硬編碼清單標題或摘要數字。

- [ ] **Step 4: 手動驗證資料與空狀態**

在瀏覽器依序選擇師傅和主管，進入左側 `移動端`：

1. 師傅 CALL 四個分段只顯示對應狀態的個人 CALL。
2. 主管首頁摘要與 CALL 清單的待分派筆數一致。
3. 沒有符合篩選的資料時顯示角色相關的空狀態，不顯示其他狀態資料。

- [ ] **Step 5: Commit**

```bash
git add ui-prototype/index.html
git commit -m "feat: 重設角色導向移動工作台"
```

### Task 4: 串接底部抽屜流程、資料同步與視覺驗證

**Files:**
- Modify: `ui-prototype/index.html:14824-14974` (`renderMobileProcessSheet`)
- Modify: `ui-prototype/index.html:15018-15340` (`renderMobileDetailSheet` 與服務報告區)
- Modify: `ui-prototype/index.html:15906-15960` (`renderMobileDispatchSheet`)
- Modify: `ui-prototype/index.html:16200-17720` (處理、分派、上傳、提交事件)

**Interfaces:**
- Consumes: `state.mobileProcessTicketId`, `state.mobileDetailTicketId`, `state.mdDispatchSheetOpen`, `updateTicket(id, updates, message)`。
- Produces: 師傅服務處理、完整只讀詳情及主管分派，全部透過共用底部抽屜操作並同步 `tickets`。

- [ ] **Step 1: 檢查抽屜入口與提交函式仍存在**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('ui-prototype/index.html', 'utf8');
for (const selector of ['data-mobile-process', 'data-md-submit', 'renderMobileProcessSheet', 'renderMobileDispatchSheet', 'updateTicket(']) {
  if (!html.includes(selector)) throw new Error(`Missing ${selector}`);
}
console.log('mobile flow interfaces present');
NODE
```

Expected: `mobile flow interfaces present`。

- [ ] **Step 2: 使師傅處理抽屜遵守三段導引與必填規則**

保持 `簽到`、`服務中`、`服務報告` 三段切換。`待處理` 提交前強制有打卡時間與至少一張 Before Service 照片；服務報告提交前強制有報告資料、客戶簽名與所需照片。所有輸入、示例上傳和分段切換使用現有狀態保存，重新渲染後保留資料與抽屜捲動位置。

- [ ] **Step 3: 使主管分派抽屜遵守可分派條件**

只在 `t.status === '待分派'` 時開啟 `renderMobileDispatchSheet()`。抽屜提供姓名、技能、區域或可接單狀態篩選；選擇師傅後才啟用「確認分派」。提交後呼叫：

```js
updateTicket(ticketId, {
  status: '待確認',
  owner: selectedMaster.name,
  master: selectedMaster.name,
  dispatchTime: nowText
}, `已分派給${selectedMaster.name}，等待師傅確認。`);
```

再關閉抽屜、清除暫存選擇並重新渲染首頁與 CALL 清單。

- [ ] **Step 4: 執行靜態檢查與完整手動走查**

Run:

```bash
git diff --check
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('ui-prototype/index.html', 'utf8');
const start = html.indexOf('<script>');
const end = html.lastIndexOf('</script>');
new Function(html.slice(start + 8, end));
console.log('inline script syntax OK');
NODE
```

Expected: 沒有 whitespace errors，並輸出 `inline script syntax OK`。

在瀏覽器走查：

1. 左側最末端 `移動端` 可由師傅與主管角色各自開啟正確首頁。
2. 師傅完成收到、開始處理、繼續處理、服務報告提交後，狀態、摘要和 PC CALL 清單同步。
3. 主管可在 CALL 清單選擇待分派 CALL、篩選並選擇師傅、確認分派；已分派項目不出現分派按鈕。
4. 桌面預覽和 390px 寬度下，應用列、CALL 卡、抽屜與雙項底部導覽不重疊、不裁切。

- [ ] **Step 5: Commit**

```bash
git add ui-prototype/index.html
git commit -m "feat: 完成移動端服務與分派流程"
```
