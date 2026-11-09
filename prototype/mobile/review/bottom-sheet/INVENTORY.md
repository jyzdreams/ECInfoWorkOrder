# 全移動端交互盤點（實作前固定範圍）

本批僅修改 prototype/mobile/。按本次使用者限定，盤點及技術驗證證據也保存於此目錄，未改 docs／Hub／業務台賬。以下是 UI 改造檢查表，不是第二套項目進度台賬。

| 模塊／路由／入口 | 改造前 | 改造後 | Sheet | PC 對象／字段 | 原角色權限 | 完成狀態 |
|---|---|---|---|---|---|---|
| home 工作台、快捷入口、統計 | 主頁／列表跳轉 | 主頁／列表；優先卡詳情彈框 | 卡片是 | dashboard、id/status | 各身份原範圍 | 已改造／實測 |
| tasks 列表與 tasks/:id | 全頁詳情 | 保留列表，詳情彈框 | 是 | workorder、P/M/M+P、contractNo/customer/master/status | MASTER 本人、CS/CR/TL/ADMIN 原範圍 | 已改造／實測 |
| calls、calls/:id | 全頁及內嵌短表單 | 詳情／跟進編輯／報價交接共用彈框 | 是 | CALL、desc/tl/records | CS/CR/TL 操作、ADMIN 查閱 | 已改造／實測 |
| dispatch、dispatch/:id | 全頁，原生 select/date | 詳情、排人排期及確認彈框 | 是 | dispatch、master/schedule/phaseReady | TL/CR 寫、CS/ADMIN 查閱 | 已改造／實測 |
| 接單／到場 | 詳情直接改狀態 | 同容器快捷確認，原操作不變 | 是 | 待確認→待處理→處理中 | MASTER 本人 | 已改造／實測 |
| reports、reports/:id | 全頁單據詳情 | 保留列表，詳情彈框 | 是 | SR/CP、report/cpNo/signature | 原 srFolder 可見身份 | 已改造／實測 |
| edit/:id SR／CP 長表單 | 全屏，完成回 tasks 詳情 | 從詳情進全屏，提交／返回回原詳情及主列表上下文 | 長表單否 | completedWork/faultResult/photos/signature/transportFee/cpNo | MASTER 本人進行中 | 已改造／實測 |
| 照片／收據整理及手寫簽名 | 全屏表單內 | 保留全屏專注區，不縮小畫布 | 否 | beforeServicePhotos/afterServicePhotos/cpSourceImage | 原權限 | 已改造／實測 |
| 所有 select、date/datetime-local | 原生選擇 | 統一選擇彈框，日期仍使用瀏覽器日期控件 | 是 | 系統、目的、交通、報價方向、照片用途、師傅、服務／預約日期 | 原字段及選項不變 | 已改造／實測 |
| 列表搜索／分類與狀態篩選 | 搜索輸入、頁內 chips | 搜索保留；篩選選擇彈框 | 篩選是 | P/M/M+P/status，原選項 | 列表原權限 | 已改造／實測 |
| approvals、approvals/:id | 全頁核對及直接確認 | 核對詳情、備註、確認共用彈框 | 是 | 待完工確認→已完成、confirmedBy/At | TL 本人負責 | 已改造／實測 |
| quotes、quotes/:id | 全頁報價詳情 | 列表保留，報價明細彈框 | 是 | id/revision/items/totalAmount/status | QUO/TENDER/CR/ADMIN | 已改造／實測 |
| 公共報價待辦 | 列表內靜態卡片 | 卡片開需求摘要彈框 | 是 | quoteRequests、ticketId/text | 同 quotes 權限 | 已改造／實測 |
| materials 材料摘要／使用備註 | 主頁內靜態分區 | 主頁保留；邊界及使用記錄開彈框 | 是 | MR/PO 關係、materialUse | MASTER 本人、CR/PUR/ADMIN | 已改造／實測 |
| 材料申請／領料 | 未實作交易 | 保留未開放說明，不新增交易 | 說明是 | C-04/13 | 不新增寫權 | 原邊界保留 |
| finance | 主頁內財務分區 | 主列表；財務記錄彈框 | 是 | status/invoiceStatus/paymentStatus | FIN/ADMIN 只讀 | 已改造／實測 |
| tender／warehouse | 主頁邊界說明 | 主頁入口，範圍說明彈框 | 是 | 原系統邊界，無交易 | TENDER/ADMIN、WAREHOUSE | 已改造／實測 |
| messages | 列表按鈕直接已讀 | 列表→內容彈框→原標記已讀 | 是 | messages.text/read | 原身份共用本機演示記錄 | 已改造／實測 |
| me 主頁／角色切換 | 主頁 role grid 直接切換 | 個人主頁保留；身份選擇彈框 | 選擇是 | 原 roles/access，非登入 | 原十身份 | 已改造／實測 |
| 重設演示 | window.confirm | 同組件確認型彈框 | 是 | 原 reset，僅手機 KEY | 各身份 | 已改造／實測 |
| 操作記錄／備註／狀態 | 全頁詳情內 | 詳情彈框內獨立捲動 | 是 | records/time/actor/text | 不擴權 | 已改造／實測 |
| 主導航／模塊主列表 | 全頁 | 保持全頁，不彈框 | 否 | 原模塊 | 不變 | 已實測 |

統一樣式沿用 ECInfo Token、繁體中文；Sheet 預設 84dvh，最大 96dvh，20px 頂部圓角、遮罩、焦點限制、背景鎖定、內容獨立捲動、底部安全區。拖拽區與展開按鈕提供兩種操作。單一 dialog，選擇／確認替換內容並保留上一層 DOM，最大內部深度受控。關閉／Esc／遮罩／返回遇到未儲存內容先確認；長表單可存草稿再離開或放棄。關閉後恢復列表搜索、篩選、捲動與焦點。

## 實際完成結果

- 十類身份、13 個主入口，138 個角色×卡片入口組合已逐一點擊；每次只有一個 dialog。詳細結果見 test-results.json 的 coverage。
- 主頁／主列表／個人中心未改成彈框；SR／CP 長表單、附件與簽名保持全屏。
- 已驗證搜索／篩選／捲動還原，拖動、展開／收起、遮罩、Esc、瀏覽器返回／前進、短表單退出確認、全屏存草稿／放棄／提交返回來源。
- 原有未開放材料申請、領料、投標、開票收款交易仍未開放；不因 UI 改造定版未決規則。
