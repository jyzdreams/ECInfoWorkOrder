# PC → Mobile 評審映射（2026-11-07）

本批由 Codex 單人主寫 prototype/mobile/、prototype/README.md 和本評審目錄；不改 PC 程式、事實源、工作記錄或 Hub 生成檔。技術驗收不代表客戶批准或 UAT。最新入口按根 README 為 prototype/index.html，含 ec-brand.css、remediation.js；prototype-ec-brand-v1 僅對比。現有未提交內容完整保留。

## 依據與優先順序

- docs/knowledge/decisions/DEC-20261025-业务模型确认.md（SOURCE-033）：P/M/M+P、來源與履約分開。
- docs/knowledge/decisions/DEC-20261026-客户业务确认补充.md（SOURCE-038/039）：公共報價池、分階段材料、一次上門一 SR、最終 CP、主管關閉本次工作工單、即時後補不重新接受中單或收款。人工確認不是客戶簽批。
- docs/knowledge/05-pending/OPEN-QUESTIONS.md：C-03/04/06/08/09/10/13/14 未決邊界。
- Project Hub 當前推進與 WORK-REGISTER：業務流程確認中，維修整鏈未通，0 批定稿；TASK-060 客戶清單進行中。
- outputs/2026-10-30-client-requirement-confirmation-v2/EC工單系統業務需求確認及定版表-v2.4_原型頁面錨點版.xlsx：頁面錨點對照；docs/review/2026-10-31-prototype-plan/原型优化修改计划.md 中 V012～V061 字段與未決事項。客戶表不是簽批證明；11/06 報價樣板也不是完整定稿表。
- PC 的 ROLES/ROLE_PAGES、DEFAULT_TICKETS、DEFAULT_QUOTATIONS、customers、現場 SR/CP 表單作字段與顯示參考。與更新知識有差異時遵從已記錄新說明，不改 PC。

## 頁面、字段、操作與角色

| PC 頁面 | Mobile 頁面 | 業務對象／核心字段 | 操作 | 適用角色 | 業務狀態 | 需求確認狀態／依據 | 移動處理 |
|---|---|---|---|---|---|---|---|
| dashboard／masterHome | 工作台 | 任務 id、customer、status、schedule、master | 待辦、快捷入口、提醒 | 各角色按範圍 | 待確認／待處理／處理中／待完工確認 | 頁面參考；角色範圍 C-03 未全定 | 合併，演示身份固定 |
| workorder／V012 CALL | CALL 列表／詳情 | id、contractNo、customer、contact、phone、channel、desc、tl、records | 搜尋、詳情、記錄跟進、需報價轉公共池 | CS、CR、TL；管理員查閱 | 分流方向獨立於工單狀態 | SOURCE-038 05～07；結束規則 C-02/03 待確認 | 簡化，無強制結單／成交 |
| workorder 詳情 | 工單列表／詳情 | id、contractNo、category、address、desc、master、tl | P/M/M+P 篩選、進度、單據關聯 | CS/CR/TL；MASTER 僅本人；ADMIN 查閱 | 待分派→待確認→待處理→處理中→待完工確認→已完成 | PC 狀態參考；主管提交後確認依 SOURCE-038 16 | 保留本次工作狀態，非整個 M/M+P |
| dispatch／crDispatch | 派工／排期 | master、tl、schedule、材料階段、records | 已具階段前提的案例排人排期；本人接單 | TL、CR 排期；MASTER 接單；CS 查閱 | 待分派／待確認／待處理 | 既有派工；C-04 階段放行崗位未定 | 保留；放行前提由標示 Mock fixture 提供，不提供新審批 |
| workRecord | 現場記錄 | arrivedAt、completedWork、faultResult、attachments | 到場時間、工作內容、照片增刪、草稿 | MASTER 本人任務 | 待處理→處理中 | PC 字段；SOURCE-038 13 | 合併進單據編輯，照片僅本機 |
| cr／srFolder SR | SR 編輯／查閱 | serviceReportNo、srSystems、srObjectives、completedWork、faultResult、transportFee、signature | 必填驗證、照片、手寫簽名、提交 | MASTER 編輯；CS/CR/TL 查閱 | 草稿→待完工確認 | SOURCE-038 14/16/19；C-08 缺簽補件未定 | 保留；缺簽只能存草稿 |
| completionPaper／CP | 最終 CP | 完工內容、跟進、施工日期、簽名、照片、車資 | 填寫、提交、查看 | MASTER 本人；TL 確認 | 最終提交→主管確認 | SOURCE-038 15/16；PC CP 清單參考 | 保留；不每日自動完工 |
| srNeedQuotation | 現場需報價明細 | 名稱、型號、位置，多行 | 加減項、轉報價公共池（隨 SR） | MASTER 提交，QUO 查閱池 | 待接手 | SOURCE-038 09/10 | 保留需求交接；正式報價編輯僅 PC |
| quotations／版本 | 報價列表／詳情 | id、revision、category、items、qty、unitPrice、totalAmount、owner、status | 搜尋、版本／金額／明細查閱 | QUO、TENDER、CR、ADMIN | PC 原狀態 | 手機寫權尚未批准；SOURCE-038 07/08 | 簡化只讀；修訂、接受、中單僅 PC |
| procurement／MR | 材料摘要 | quotationId、MR、PO、requestStatus、階段供料 | 申請與使用記錄查閱；現場使用備註 | PUR/CR 查閱；MASTER 僅本人現場備註 | 申請≠到貨≠出庫≠可施工 | SOURCE-038 11/12；C-04/13 | 部分；申請、領料、出庫仍倉庫通／PC |
| TL 完工核對 | 主管待辦／確認 | 單據內容、簽名、工作狀態、確認備註 | 檢查提交、確認本次完成 | TL 且 tl=李組長 | 待完工確認→已完成 | SOURCE-022、038 15/16/20 | 保留；不新增財務審批 |
| tender | 標書摘要 | id、projectName、status、截止資料 | 邊界說明／回 PC | TENDER、ADMIN | 不變 | 手機操作未定 | 僅 PC，明示未實作交易 |
| finance | 財務資料 | 業務完成、開票、收款三維 | 已完成案例查閱 | FIN、ADMIN | 票款不隨工單確認改動 | SOURCE-038 20；C-03/08/14 | 簡化只讀，無開票收款寫入 |
| settings／個人 | 個人中心／消息 | 角色、姓名、任務範圍、演示記錄 | 切換角色、重設本機演示、已讀 | 所有角色 | 非業務狀態 | 演示工具，非正式身份驗證 | 簡化；字典用戶管理僅 PC |
| 倉庫通（非 EC ROLE） | 倉庫邊界說明 | MR／PO 關係 | 說明原系統操作位置 | 倉庫（邊界演示身份） | 無 EC 寫權 | PC 無此角色；C-04 未定 | 待確認，不虛構入庫／放行 |

## 導航與 UI

390px 為基準，320～430px 單欄；桌面中央手機工作區。頂部 ECInfo Logo、消息與身份切換；底部工作台／任務或業務／單據或待辦／我的。頁面標題與返回固定頂部，詳情主操作在底部導航之上，包含 safe-area；表單底部留足空白。

Token：EC 藍 #2990d0、操作深藍 #1e6592、導航深藍 #122d45、冰藍 #edf6fc、警示琥珀 #fbb000、正文 #20364a。Arial／PingFang HK／Microsoft JhengHei；正文 15px、標題 22～28px、輔助 12～13px。操作區至少 44px。圖標沿用 PC 線性語言。品牌識別集中在工作台深藍任務區，列表保持白底閱讀。候選功能及未決規則用琥珀提示，Mock 身份常駐。

## 驗收場景（先於實作固定）

A：師傅本人 P 任務接單→到場→CP 草稿／必填錯誤→照片與簽名→提交→主管核對確認→CR／財務查看完成，票款不變。
B：M 本期 SR→多行需報價→公共池→主管本次確認；M 整體仍未確認，不自動變 M+P。
C：CS／CR CALL 跟進、搜索空狀態、公共報價交接；不把 CALL 分流當已成交。
D：十類角色導航與越權深連結／操作檢查，倉庫只有邊界說明；採購／財務不獲業務確認權。
E：320、375、390、430px；長內容、簽名、照片增刪、日期、錯誤／載入／草稿恢復、刷新保存、重設隔離；PC 文件哈希不變。

## 表單儲存字段對照

手機用 report／drafts 承載編輯分組，提交時同步相同語義的 PC 字段：completedWork、faultResult、transportFee、beforeServicePhotos、afterServicePhotos；SR 的 srSystems／srObjectives 以陣列儲存（手機一次選一項）、signature；CP 的 cpNo、cpCompletionDate、cpSignature、cpSourceImage、cpStatus=已提交、cpSubmittedAt；主管完成寫 confirmedBy／confirmedAt。本機照片是 data URL，不是已上傳的遠端附件。serviceDate 對應本次服務日期；CP 對應最終完工日期，不推導合同結束日。

CP 紙單編號需手工回填，Before／After／已簽正本三類影像沿用 PC 提交要求。簽名缺席的特殊放行不模擬，C-08 保留；手機不會將未知政策定為正式規則。
