# EC InfoTech 品牌視覺版 v1 交付與驗證

本輪完成獨立視覺候選 `prototype-ec-brand-v1/`。原 `prototype/` 保持本輪開始時的原貌。未提交、推送或發布。此報告是 UI 對照證據，不是另一套工作台帳，不更新客戶批准或業務 UAT。

## 基準與範圍

- Git 分支：main；HEAD：`2ef0f0bbc33cbb266899c15123b64325230b4751`。
- 基準為 README 指定的 `prototype/index.html`，連同正在使用的 `remediation.js`、`ui-upgrade.css`、Logo、server.py 與 README 完整複製。
- 本地原型三個檔案在本輪前已存在未提交修改；採用其當前實際內容，沒有以 HEAD 或歷史原型覆蓋。原工作區其他既有未提交修改保持。
- [SHA-256 清單](baseline-manifest.json)記錄原型與新版本；本輪開始前的 760 個既有原型、docs、Hub、outputs、GitHub 配置、根入口檔案檢查未發現內容變化。
- 原 index.html 與副本移除唯一新增的 `ec-brand.css` 引用後逐字一致；remediation.js、ui-upgrade.css、server.py、原 Logo 逐字一致。所有 Mock seed、角色/權限、狀態、字段、事件處理、接口呼叫保留。

## 品牌來源與設計

來源：[EC InfoTech 官網](https://ecinfohk.com/)、[官方 Logo SVG](https://ecinfohk.com/wp-content/uploads/2023/02/logo_ecinfo-02.svg)、[首頁樣式](https://ecinfohk.com/wp-content/uploads/elementor/css/post-43.css)、[官網字體變數](https://ecinfohk.com/wp-content/uploads/the7-css/css-vars.css)。本輪實際讀取 HTML、CSS 與 SVG。

Logo 填色與首頁色碼包含 #2990D0，首頁另用 #1E6592、#FBB000、#F7F7F8；官網使用 Roboto、Open Sans、Arial 等無襯線字體，也有局部 Roboto Slab。原生 Logo 原色保存於 assets/ecinfo-official.svg，放在白底上確保深色字標可讀。

產品設計採用工程服務管理的穩定層級：深藍導航 #122D45 是本輪 UI 衍生色；藍色主操作、琥珀導航選中線、白色內容面板。正文字體 Arial 與香港繁中字體回退，不要求外部字體連線。按鈕採更深的 #1E78B1 改善白字可讀性。顏色、間距、字級、圓角、陰影、焦點和狀態透過 CSS Tokens 統一。

| 對照部位 | 原版 | 品牌版 |
| --- | --- | --- |
| 導航與 Logo | 深青導航、文字 EC 標記 | 深藍導航、官網原生 Logo、琥珀選中線 |
| 首頁 | 青綠主調、較大圓角 | 企業藍、九個狀態卡對齊、較克制的圓角與陰影 |
| 清單與表單 | 青綠操作與選中態 | 藍色操作、淡藍選中態、統一邊框/控件/信息分組 |
| 詳情與公共元件 | 原有抽屜、彈窗和 Tabs | 保留全部內容及操作，統一標題、頁腳、遮罩、焦點 |
| 移動工作台 | 多種漸變和裝飾 | 深藍工作摘要、藍色操作、簡化裝飾；窄屏頂部角色區分行 |

## 完整頁面清單

此原型是單一 HTML 的 state.page/state.mobilePage 視圖，不是多個 URL 路由。實際運行載入 remediation.js 後有 11 個主頁面，並保留原有 renderer 別名 create/list/detail/users/customers，未新增業務頁面。

| Key | 頁面 | 結果 |
| --- | --- | --- |
| dashboard | 首頁 | 已對照 |
| workorder | CALL管理 | 已對照 |
| dispatch | 分派中心 | 已對照 |
| maintenance | 保養計劃 | 已對照 |
| quotations | 報價管理 | 已對照 |
| tender | 標書管理 | 已對照 |
| procurement | 備貨管理 | 已對照 |
| finance | 會計管理 | 已對照 |
| srFolder | 報告管理 | 已對照 |
| report | 統計報表 | 已對照 |
| settings | 基礎設置 | 已對照 |

基礎設置另對照 dictionary/customer/user/server/excelImport/components 六個子頁。移動視圖包括 masterHome、tasks、tlHome、crHome、crCalls、crDispatch、mobileDetail、workRecord、cr、dispatch。角色：CS、CR、TL、MASTER、QUO、TENDER、PUR、FIN、ADMIN、BOSS；按運行時權限逐一檢查其可見頁面與內容。MR、維修、保養及採購依現有關聯詳情/頁面保留，沒有虛構獨立路由。

## 瀏覽器結果與驗證邊界

使用實際 Google Chrome headless 與 Playwright 啟動兩個隔離 browser context，固定測試時鐘。不是只讀原始碼檢查。

- [主要驗證](verification.json)：109 項通過；字段、選項值、required/disabled、按鈕、業務 data-*、頁面內容對照零差異；腳本錯誤零個。
- 實際點擊：快速角色登入/選人、導航、側欄收合、首頁狀態卡篩選、角色切換、通知面板、CALL 搜尋/重置/每頁數/下一頁、報價狀態下拉、表單必填校驗、有效客戶表單本地保存。
- 詳情/表單驗證：CALL、報價詳情、新增報價、新增客戶；既有資料及操作區保留。
- [補充驗證](supplementary.json)：20 個 Tabs 內容對照通過，包含派工、標書、會計及 CALL 詳情；360/390/768/1280/1440 像素寬度的已列場景均沒有整頁橫向溢出。寬表格保留容器內橫向捲動以存取全部欄位。
- 淺色與既有深色主題均保存實際截圖；共 60 張。已人工視察首頁、報價列表、表單、CALL 詳情及師傅/CR 移動工作台截圖。
- 本輪是 UI 一致性與代表性交互檢查，未逐一提交所有業務表單、打印、OCR、簽名或上傳組合，也未宣稱維修整鏈通過或真實權限安全審計。這些業務程式碼逐字保留；既有缺陷不順便修復。

## 隔離與啟動

從專案根目錄分別執行：

```sh
python3 prototype-ec-brand-v1/serve-mock.py 18861
python3 prototype-ec-brand-v1/serve-mock.py 18860 --root prototype
```

新版 http://127.0.0.1:18861 ，原版對照 http://127.0.0.1:18860 。兩個服務目前已啟動。不同端口分開 localStorage；測試使用全新 context，不讀現有使用者資料。

serve-mock.py 是新增的預覽服務，不改原型 server.py 或其接口實現，不匯入真實代理、不讀憑證、不外連；CSP 限制連接，瀏覽器測試亦阻擋外部請求。產品清單回空 Mock，保留原型既有手填回退；MR 回傳 MOCK-* ID，同一幂等鍵重複送出回同一 ID，測試回執在 supplementary.json。原型沿用「真實倉庫通」提示文案沒有改寫，但此服務只回 Mock，沒有真實宜搭讀寫。

## 修改檔案清單

所有原型實作變更只在新副本：

| 新副本檔案 | 相對原型的變化 |
| --- | --- |
| index.html | 僅新增一個 ec-brand.css stylesheet 引用 |
| ec-brand.css | 新增品牌 Tokens、元件外觀、排版與響應式樣式 |
| assets/ecinfo-official.svg | 從客戶官網取得的原生 Logo |
| serve-mock.py | 新增安全隔離的本地預覽服務 |
| README.md | 改為獨立版本身份與啟動說明 |
| remediation.js / ui-upgrade.css / server.py / logo_ecinfo.svg | 完整複製，內容不變 |

本目錄新增 RESULT.md、baseline-manifest.json、verification.json、supplementary.json、screenshots/ 與 gallery.html，供本批對照與交接。臨時腳本/網站提取/完整保護清單留在 .codex/verification/2026-11-06-ec-brand-v1/，不混入業務原型或交付主台帳。

## 目前整體推進位置

內部工作記錄保持：業務流程逐組確認，04 V1 的 04-12 待人工評審；04 未整體定稿、C-04 BLOCKED；维修整鏈未全部通過，0 批定稿。本輪品牌視覺候選完成，不改這些狀態。下一步由使用者檢視品牌候選視覺；業務仍按既有內部記錄推進。
