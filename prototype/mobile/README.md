# ECInfo 流動工作台

靜態 HTML、ES modules、CSS，沿用 PC 無建置依賴技術。從項目根目錄執行 `python3 prototype/serve-mock.py 18867`，訪問 http://127.0.0.1:18867/mobile/ 。PC 在同服務根路徑 `/`；不使用 file://。

- 預設周師傅：P 任務 WO-20260612-011 接單→到場→CP→主管待辦→確認；M 任務 WO-20260615-004 到場→SR→本次確認。
- 我的：切換 CS、CR、主管、師傅、報價組、標書組、倉庫邊界、採購、財務、管理員。管理員查閱不代替主管業務確認。
- 現場表單：必填、日期、工作內容、跟進事項、照片增刪、Taxi 收據、手寫簽名、多行名稱／型號／位置、存草稿、刷新恢復。缺簽可存草稿，不擅自放行。
- CS／CR／主管：CALL 跟進；需報價進公共待辦，不指定人。主管／CR 可對已有階段前提的演示 fixture 排期派工；C-04 未具前提案例禁止派工。
- 報價僅查閱及公共池展示；正式版本／中單、倉庫申領出庫、採購、開票收款及投標操作保留 PC／倉庫通。

所有寫入只在 `ecinfo_mobile_review_v1`，不修改 PC 的 ecinfo_* 資料。多角色共享同瀏覽器的演示資料，不跨裝置同步。提供「重設手機演示資料」；照片最多4張、每張2MB，瀏覽器配額不足會報錯。提交後正文只讀。

資料引用 PC 客戶／工單／報價；日期、派工及分類案例是標示清楚的演示覆層。PC 預設客戶分類均為 P，故 M 演示保留原合約編號並標註資料差異，不冒充正式 M 合約。實際編號規則仍待核。

程式分工：`store.js` 權限／狀態與儲存；`components/ui.js` 共用元件；`pages/` 工作台、列表、詳情及表單；`app.js` 路由及事件；`fixtures.json` 隔離 Mock 基線；`styles.css` 設計 Token 與手機版面。

[映射、依據、未決與驗收場景](../../docs/review/2026-11-07-mobile/PC-MOBILE-MAPPING.md) · [交付結果](../../docs/review/2026-11-07-mobile/RESULT.md)

## 統一 Bottom Sheet 交互

所有任務、CALL、派工、SR／CP 查閱、報價、公共報價待辦、財務摘要、材料記錄及範圍說明、消息卡片均在主列表之上開啟共用 Bottom Sheet。主導航、工作台、個人中心與各主列表仍為全頁。

- 預設84%高度；拖指示條向上展開至96%，向下拖關閉；也可用展開／收起及關閉按鈕。
- Esc、遮罩及瀏覽器返回可關閉；未儲存的短表單先確認。人員及普通選項改用字段旁的緊湊 Dropdown；日期使用原生日期控件；業務確認仍在同一 Sheet 內切換。
- 搜索、篩選與列表捲動位置在關閉詳情後保留。篩選、角色切換及表單選擇共用 selects.js 的下拉組件。
- SR／CP 從詳情彈框進全屏；照片整理、附件、簽名保留全屏操作。返回時可繼續編輯、存草稿再離開或放棄本次修改；提交返回來源詳情。
- `components/bottom-sheet.js` 統一處理遮罩、動畫、拖動、焦點、滾動鎖定及安全區；`app.js` 只調用此組件，沒有各模塊獨立彈框。

[全頁面交互盤點](review/bottom-sheet/INVENTORY.md) · [本輪結果與證據](review/bottom-sheet/RESULT.md)。該批次測試與截圖是改造前後的歷史證據；目前版本的可重跑檢查見下方 Dropdown 批次。按本輪限定範圍，技術報告與截圖保存在 mobile/review/，不更新業務知識、Hub 或工作記錄。


## 緊湊篩選與選擇（目前版本）

普通選項不再開 Bottom Sheet 或平鋪大卡片：`components/selects.js` 統一提供 SingleSelect、MultiSelect、SearchableSelect、FilterDropdown、DateRangePicker。字段高46px、選項約40px、選項區最高260px；選項多於等於8項自動提供搜尋。浮層按屏幕可用空間向上／向下展開；Sheet 中的下拉位於獨立內容層，避免被捲動容器裁切。

- 五類工單列表直接顯示「業務分類」與「工單狀態」兩個獨立下拉；選中即套用，以 AND 組合。清除篩選重設兩字段並保留搜尋文字。原單維度選項及結果保留。
- 十身份使用可搜尋 Dropdown；派工師傅、SR／CP所有既有單選欄位共用同一組件。服務日期及預約時間使用可見的原生日期／日期時間控件。
- 搜尋、篩選與捲動按身份／模塊保存到本機 sessionStorage，詳情返回、切換模塊及重新整理可恢復；業務 Mock 儲存格式不變。
- 產品沒有現有多選業務字段或日期範圍篩選，因此不新增業務字段；MultiSelect（勾選／搜尋／清空／確認）及 DateRangePicker（起訖驗證／清空）由獨立組件測試驗證。
- 下拉支持外部點擊、Esc、鍵盤與緊湊禁用／空狀態；Esc先關下拉，再次按下才關詳情Sheet。

[全量排查及結果](review/dropdown/INVENTORY.md) · [測試與截圖](review/dropdown/RESULT.md)。本版測試為 `tests/dropdown.cjs` 與 `tests/dropdown-business.cjs`。上一批 review/bottom-sheet/ 的大卡片選項截圖保留作歷史證據，不是目前交互。
