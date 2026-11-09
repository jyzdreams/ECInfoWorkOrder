# 全局篩選與選擇排查（2026-11-07）

本批僅修改 mobile；此表是本次 UI 驗證記錄，不維護第二套業務進度。項目仍為業務流程確認階段、維修整鏈未通、0批定稿；本次不改 TASK／UAT／客戶確認。

| 模塊／頁面 | 原交互 | 修改目標 | 業務選項邊界 | 狀態 |
|---|---|---|---|---|
| 工作台／各頁右上身份 | 84% Sheet＋角色網格 | 可搜索的角色 Dropdown | 原十身份原 access 不變 | 已改造／實測通過 |
| 個人中心切換身份 | 同上 | 同一 SearchableSelect | 非正式登入，保留未儲存退出確認 | 已改造／實測通過 |
| tasks／calls／dispatch／reports／approvals 主列表 | 分類與狀態混合大卡片 Sheet | 分類、狀態兩個 FilterDropdown；清除篩選 | 分類 全部/P/M/M+P；狀態 全部/待確認/處理中/已完成，沿用原列表配置，不擴充枚舉 | 已改造／實測通過 |
| 派工詳情 Sheet | 師傅選擇開另一頁 Sheet | 錨定字段的 SingleSelect | 周／吳／黃／梁師傅不變 | 已改造／實測通過 |
| 派工日期時間 | 日期 Sheet | 原生日期時間選擇器，46px控件 | schedule 定義不變 | 已改造／實測通過 |
| SR／CP 系統 | 全高度選項 Sheet | SingleSelect | 原空值/CCTV/Access Control/Alarm/Others不變 | 已改造／實測通過 |
| SR／CP 工作目的 | 同上 | SingleSelect | 原空值/Routine Check/Fault Report/Emergency Call/Others不變 | 已改造／實測通過 |
| SR／CP 照片用途 | 同上 | SingleSelect | Before/After；CP額外CP正本，不增加SR選項 | 已改造／實測通過 |
| SR／CP 交通方式 | 同上 | SingleSelect | 其他/Taxi，Taxi收據規則不變 | 已改造／實測通過 |
| SR／CP 是否需要報價 | 同上 | SingleSelect | 空值/no/yes，公共池交接不變 | 已改造／實測通過 |
| SR／CP 服務日期 | 日期 Sheet | 原生日期選擇器，46px控件 | serviceDate定義不變 | 已改造／實測通過 |
| 動態報價明細 | 文本欄位、增刪行 | 保留文本／增刪，不虛構型號字典 | name/model/location不變 | 已改造／實測通過 |
| 報價／公共池／消息／材料／財務／標書／倉庫 | 沒有業務篩選或選擇字段（共用身份除外） | 全量掃描、保持詳情Sheet與原操作 | 不為改UI新增篩選業務或寫權 | 已改造／實測通過 |
| 多選 | 目前產品沒有 multiple／checkbox 選擇業務字段 | 共用 MultiSelect 支持勾選、搜尋、清空、確認；獨立測試 | 不把原單選改多選 | 已改造／實測通過 |
| 日期範圍 | 目前產品沒有日期範圍篩選 | 共用 DateRangePicker，獨立測試 | 不擅自將日期範圍加到列表 | 已改造／實測通過 |
| 共用組件與詳情／確認Sheet | select自動轉Sheet | 統一 selects.js；只保留真正詳情與業務確認Sheet | 不改狀態與業務字段 | 已改造／實測通過 |

SingleSelect／MultiSelect／SearchableSelect 共用一個緊湊浮層；46px字段，40px選項行、最大260px可捲動、較多選項顯示搜尋。浮層在詳情Sheet內掛載但位於獨立捲動區之外，依可用空間向上或向下展開；不另開Sheet、不增加遮罩。Select原控件保留以支持既有表單序列化及必填驗證。FilterDropdown分開維度後以AND組合，任一單維選擇保留原結果。


## 對應截圖

- 工作台／個人中心及各身份入口：[可搜尋身份下拉](role-dropdown-390.png)。
- CALL：[分類／狀態字段](calls-filters-390.png)；工單：[分類／狀態字段](tasks-filters-390.png)；派工列表：[篩選](dispatch-filters-390.png)；單據：[篩選](reports-filters-390.png)；主管待辦：[篩選](approvals-filters-390.png)。
- 派工詳情：[人員下拉](dispatch-select-390.png)；SR：[系統下拉](sr-select-390.png)；CP：[系統下拉](cp-select-390.png)。照片用途／交通／報價方向使用相同組件，實測記錄按字段列於 test-results.json。
- 共用多選：[勾選、數量與確認](multi-select-390.png)。這是隔離組件測試，不是新增業務表單。
- 報價／公共池／材料／財務／消息／標書／倉庫：已掃描原頁面及詳情，不存在額外業務選擇字段；共用身份入口同上述截圖。
