# EC 工单系统原型 · 业务流程走查测试报告

> 测试日期：2026-10-13
> 测试对象：当前原型 `prototype/index.html` + `prototype/remediation.js` + `prototype/ui-upgrade.css`
> 依据：Project Hub「02 业务流程」的 7 条流程（`project-hub/data/flows.json`）与决策（`project-hub/data/decisions.json`）中对应的 CONFIRMED / PENDING 条目
> 结论状态：等待人工确认；本报告仅为测试与缺口记录，不修改原型、知识、Fact、Decision、REQ 或 Flow 数据

***

## 0. 测试方法与边界

1. **主要方法**：对当前原型做代码级走查，逐条比对业务流程的「参与角色 → 动作 → 状态 → 下一角色」，并对关键「可达性」结论用全文检索复核（如某按钮是否真有渲染入口）。
2. **动态确认**：原型本地服务在线，`http://localhost:18766/index.html` 返回 HTTP 200（约 1.47MB，且已引用 `remediation.js`）。本轮未完成完整的浏览器端到端点击回归（自动化工具未返回结果），已在第 8 节列为后续动作。
3. **重要结构事实（影响所有判断）**：`remediation.js` 在 `index.html` 之后加载，会**覆盖（monkey-patch）主文件中的一批同名核心函数**：`markQuotationWon`、`updateQuotationStatus`、`updateTenderStatus`、`requestQuotationFromCall`、`renderQuotationDrawer`、`renderWorkOrderDrawer`、`updateTicket`、`resolvePaperTypeByMaterial`、`saveDataToLocalStorage`。因此读代码时**必须以后加载的整改层为准**，主文件中同名函数已成不会被执行的死代码。
4. **判断口径**：
   - `已实现`：流程步骤在当前原型中有可走通、可点到的页面/按钮/函数；
   - `部分实现`：数据或逻辑存在，但入口缺失、主链未接线或仍依赖人工补录；
   - `缺失`：原型无对应实现；
   - `合规缺失`：业务规则本身为 PENDING，原型**有意不实现**（属正确处理，非缺陷）。

***

## 1. 总体结论

| #  | 流程                | 状态      | 一句话结论                                            |
| -- | ----------------- | ------- | ------------------------------------------------ |
| 00 | 真实业务总流程           | 部分实现    | 报价→中单→MR/备货→SR→完工→收款主干可走，但分流后的保养计划、排期入口、MR 独立页缺失 |
| 01 | 普通报价维修            | 部分实现    | 与 00 同链；MR 自动生成、正式时间确认存在，但 MR 无独立页、库存判定靠人工       |
| 02 | 保养发现问题后二次维修       | 部分实现    | SR「需要报价」回流报价已实现；但前置保养计划模块被隐藏，MR 可达性脆弱            |
| 03 | 现场即时维修            | 缺失（主干）  | 除可复用通用现场处理+SR 外，现场报价确认、现场收款、补正式记录基本缺失            |
| 04 | 周期保养              | 缺失（主干）  | 保养计划 UI 被隐藏、中单未接线生成计划、周期自动建单链未接通                 |
| 05 | CM                | 已实现（主链） | 用「糾正維修」建单→CR/TL 直派→SR→完工可走；时间冲突按 PENDING 正确保留未实现 |
| 06 | Government Tender | 部分实现    | 取得/处理/结果/中标后建报价存在；回标与导出入口被人为关闭，中标后不直接中单（合规）      |

**一句话总览**：原型对「报价、中单、备货、SR、完工、财务」这条**主干基本打通**；缺口集中在**保养/周期计划、排期入口、MR 独立管理、现场即时维修、CS 报价需求流转**，以及若干**因按钮未被渲染而不可达的死代码**。

***

## 2. 跨流程的结构性问题（优先处理）

| 编号 | 问题                               | 证据                                                                                                                                                                                                                                                                                                                                                                                                     | 影响                    |
| -- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| S1 | 核心函数被整改层覆盖，主文件同名函数成死代码，易「改一处不生效」 | [remediation.js 覆盖点](file:///d:/ec-workorder/prototype/remediation.js#L284-L333)，主文件 [updateQuotationStatus](file:///d:/ec-workorder/prototype/index.html#L17216-L17241)、[requestQuotationFromCall](file:///d:/ec-workorder/prototype/index.html#L16966) 不再执行                                                                                                                                          | 高风险隐性回归源              |
| S2 | 一批 `data-rem-*` 按钮只写了事件处理、从未渲染   | 处理逻辑在 [remediation.js#L442-L502](file:///d:/ec-workorder/prototype/remediation.js#L442-L502)，全仓检索这些属性**仅出现在 remediation.js**，index.html 无渲染                                                                                                                                                                                                                                                            | MR 备货、计划页、CS 转交均不可达   |
| S3 | 保养计划模块被整体隐藏                      | [remediation.js#L384](file:///d:/ec-workorder/prototype/remediation.js#L384)「保養計劃模組暫時隱藏」；`index.html` 检索 `maintenancePlan/serviceEveryMonths/contractStart` **0 命中**                                                                                                                                                                                                                                   | 流程 02/04 前置不可用        |
| S4 | 排程弹窗触发按钮未渲染，周期排程不可达              | `data-open-schedule-panel` 仅出现在绑定 [index.html#L10547](file:///d:/ec-workorder/prototype/index.html#L10547)、[#L19017](file:///d:/ec-workorder/prototype/index.html#L19017)，**无任何模板渲染**；`openTicketScheduleModal` [定义在 #L18847](file:///d:/ec-workorder/prototype/index.html#L18847) 却无入口                                                                                                                | 每天/每周/每月重复排程只能在代码层存在  |
| S5 | MR（材料申请单）无独立列表/详情页               | `materialRequests` 仅在 [remediation.js#L12](file:///d:/ec-workorder/prototype/remediation.js#L12)；`index.html` 0 命中；备货页 [renderProcurement](file:///d:/ec-workorder/prototype/index.html#L18144) 只渲染备货单                                                                                                                                                                                                 | MR 只在报价抽屉/工单抽屉以一行显示   |
| S6 | CS 发起的「待轉交」报价需求无 UI              | 数据 `quoteRequests` 在 [remediation.js#L319-L333](file:///d:/ec-workorder/prototype/remediation.js#L319-L333) 写入，但无渲染；`待轉交` 在 index.html 0 命中                                                                                                                                                                                                                                                            | CS 提交后 CR/TL 看不到、无法转交 |
| S7 | 周期自动建单链未接通                       | `convertMrToTicket` [定义 #L21013](file:///d:/ec-workorder/prototype/index.html#L21013)，全仓**仅被以** **`mr=null`** **调用一次** [#L21113](file:///d:/ec-workorder/prototype/index.html#L21113)；注释 [#L21098](file:///d:/ec-workorder/prototype/index.html#L21098) 提到的 `verifyMr` 函数**不存在**；`processRecurringSchedules` [#L21099](file:///d:/ec-workorder/prototype/index.html#L21099) 要求 `firstRunDone=true` 才推进 | 「備貨驗收後自動派發/周期建单」未兑现   |

***

## 3. 流程 00 · 真实业务总流程

| 步骤                       | 原型实现证据                                                                                                                                                                                                                              | 判断   | 说明                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------------------------------- |
| 客户需求 → CS/CR 发起报价任务      | [requestQuotationFromCall](file:///d:/ec-workorder/prototype/index.html#L16966)（建「待報價」并通知报价组）；CR 由工单建报价                                                                                                                             | 部分实现 | CS 侧的「先转交 CR/TL」是半成品（见 S6）         |
| 报价组维护 R1/R2/R3 版本        | [createQuotationRevision](file:///d:/ec-workorder/prototype/index.html#L17714)、[saveQuotationEdit](file:///d:/ec-workorder/prototype/index.html#L15505)、[openQuotationHistory](file:///d:/ec-workorder/prototype/index.html#L15759) | 已实现  | 版本历史 + 快照 + 升版规则齐全                 |
| 客户接受最终报价 → 报价组确认中单       | 整改层 [confirmWon](file:///d:/ec-workorder/prototype/remediation.js#L206-L238) / [markQuotationWon](file:///d:/ec-workorder/prototype/remediation.js#L240-L283)                                                                       | 已实现  | 记录客户接受日期/依据，锁定成交版本与类别              |
| 按 M/P/M+P 分流             | [confirmWon 类别校验](file:///d:/ec-workorder/prototype/remediation.js#L209)；[createMaintenancePlan](file:///d:/ec-workorder/prototype/remediation.js#L184-L204)                                                                        | 部分实现 | M 线计划函数存在但**中单不调用**，且计划 UI 被隐藏（S3） |
| 排期与服务                    | 工单详情展示预排/正式时间；[确认正式时间处理](file:///d:/ec-workorder/prototype/remediation.js#L455-L461)                                                                                                                                                | 部分实现 | 区分预排与正式时间；但排程弹窗入口不可达（S4）           |
| Service Report 提交 + 客户签名 | 移动端 SR 提交 [performAction("submitResult")](file:///d:/ec-workorder/prototype/index.html#L8881)、客户电子签名 canvas                                                                                                                         | 已实现  | 含 Before/After 照片、SR 6 位编号、缺席签收分支  |
| CR/主管简单确认完工              | [confirmClose](file:///d:/ec-workorder/prototype/index.html#L9090)；整改层按钮 `data-rem-confirm`                                                                                                                                         | 已实现  | 待完工确认 → 已完成，记 confirmedBy/At       |
| 收款为独立状态（与完工分离）           | [renderFinance](file:///d:/ec-workorder/prototype/index.html#L19024)、[createInvoice](file:///d:/ec-workorder/prototype/index.html#L23064)、[markAsPaid](file:///d:/ec-workorder/prototype/index.html#L23206)                         | 已实现  | 完工不触发收款；收款基于发票独立登记                 |

***

## 4. 流程 01 · 普通报价维修

| 步骤                  | 原型实现证据                                                                                                                                                                                                               | 判断       | 说明                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------- |
| P-01 报价任务（CS/CR 发起） | 同流程 00 步骤 1                                                                                                                                                                                                          | 部分实现     | CS 转交 UI 缺失（S6）                                   |
| P-02 版本沟通 R1/R2/R3  | [saveQuotationEdit](file:///d:/ec-workorder/prototype/index.html#L15505) 等                                                                                                                                           | 已实现      | 仅「价格变动」升版                                         |
| P-03 中单             | [confirmWon](file:///d:/ec-workorder/prototype/remediation.js#L206-L238)                                                                                                                                             | 已实现      | 强制 QUO/ADMIN、类别 M/P/M+P、逐项标物料/服务                  |
| P-04 自动生成 MR        | [createMr](file:///d:/ec-workorder/prototype/remediation.js#L153-L182)，由中单调用 [#L225](file:///d:/ec-workorder/prototype/remediation.js#L225)                                                                          | 已实现（有条件） | 仅当明细含「物料」行才生成，否则 `materialReadiness="無需物料"`       |
| P-05 备货 / 采购        | [createSpFromQuotation](file:///d:/ec-workorder/prototype/index.html#L18124)、[备货管理页](file:///d:/ec-workorder/prototype/index.html#L18144)；整改层 [createMr→建备货单](file:///d:/ec-workorder/prototype/remediation.js#L177) | 部分实现     | 备货单/采购单/流转齐全；「库存不足→采购」为**人工判定**，非系统分支；MR 无独立页（S5） |
| P-06 CR/主管确认正式时间    | [整改层处理](file:///d:/ec-workorder/prototype/remediation.js#L455-L461)                                                                                                                                                  | 已实现      | 需 MR「材料就緒」，否则仅可预排                                 |
| P-07 现场施工           | [performAction("startWork")](file:///d:/ec-workorder/prototype/index.html#L9104)、移动端任务台                                                                                                                              | 已实现      | 接单/到达/开始处理闭环                                      |
| P-08 SR 提交 + 客户签名   | 同流程 00 步骤 6                                                                                                                                                                                                          | 已实现      | —                                                 |
| P-09 CR/主管确认完工      | 同流程 00 步骤 7                                                                                                                                                                                                          | 已实现      | —                                                 |

> 附带发现：中单走整改层后**不再经过**主文件的 [createSpFromQuotationAndNotify](file:///d:/ec-workorder/prototype/index.html#L17196)，备货单改由 `createMr` 顺带创建，因此**纯服务类（无物料）报价中单后不会产生备货单**。是否与业务预期一致需确认。

***

## 5. 流程 02 · 保养发现问题后二次维修

| 步骤                 | 原型实现证据                                                                                                                                                                         | 判断   | 说明                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------ |
| MI-01 上门保养（按保养计划）  | [createMaintenancePlan](file:///d:/ec-workorder/prototype/remediation.js#L184-L204)（仅种子数据生成）；[remediation.js#L384](file:///d:/ec-workorder/prototype/remediation.js#L384) 隐藏模块 | 部分实现 | 计划页不可达（S3/S2）                                                                                                      |
| MI-02 发现问题         | SR「需跟進事項」文本字段                                                                                                                                                                  | 部分实现 | 无结构化「无法当场完成」判定节点                                                                                                   |
| MI-03 SR 选择「需要报价」  | SR 表单「是否需要報價」单选；[打开表单时重置](file:///d:/ec-workorder/prototype/index.html#L24091)、[必选校验](file:///d:/ec-workorder/prototype/index.html#L8917)                                      | 已实现  | 见第 7 节「默认值」偏差                                                                                                      |
| MI-04 报价与中单（SR 回流） | SR 提交自动建「待報價」报价并通知报价组/主管 [performAction("submitResult")](file:///d:/ec-workorder/prototype/index.html#L8881)                                                                   | 已实现  | 自动建的报价无明细、无类别，需报价组补齐                                                                                               |
| MI-05 MR 与备货       | [createMr](file:///d:/ec-workorder/prototype/remediation.js#L153-L182)                                                                                                         | 部分实现 | MR 可达性脆弱：自动报价无明细→`createMr` 返回 null（[#L160](file:///d:/ec-workorder/prototype/remediation.js#L160)），须人工补物料并逐项标「物料」 |
| MI-06 二次上门         | 工单详情「确认正式时间」；移动端显示正式时间                                                                                                                                                         | 部分实现 | 「二次上门」与首次上门共用同一工单模式，**无来源标识**                                                                                      |
| MI-07 SR 与完工       | 同流程 00 步骤 6/7                                                                                                                                                                  | 已实现  | —                                                                                                                  |

***

## 6. 流程 03 · 现场即时维修

| 步骤                   | 原型实现证据                                                                                                                                                            | 判断      | 说明                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------ |
| IR-01 现场发现问题         | 通用移动端现场处理（签到→处理→报告）                                                                                                                                               | 缺失（专路径） | 无「可用现有材料当场处理」的判定/快捷路径                |
| IR-02 确认价格（联系报价组）    | 全仓检索无相关实现                                                                                                                                                         | 缺失      | 无现场实时报价确认                            |
| IR-03 客户接受现场报价       | 无                                                                                                                                                                 | 缺失      | 无「现场报价金额 + 客户接受」节点                   |
| IR-04 当场维修           | 复用通用现场处理                                                                                                                                                          | 部分实现    | 可施工/记录，但无 IR 专属语义                    |
| IR-05 当场收款           | 移动端/现场无收款入口；`PENDING-001` 在 index.html 0 命中                                                                                                                       | 合规缺失    | 登记/交款/对账未确认，原型有意不实现                  |
| IR-06 SR 提交 + 签名     | 同流程 00 步骤 6                                                                                                                                                       | 已实现     | —                                    |
| IR-07 补正式记录（后补报价/归档） | 报价「後補報價」展示 [示例](file:///d:/ec-workorder/prototype/index.html#L14857-L14877)；但触发字段 [srIsSupplementary 固定 null](file:///d:/ec-workorder/prototype/index.html#L7835) | 部分实现    | 数据模型与展示存在，触发条件（CONFLICT-004）未确认，暂缓启用 |

**结论**：流程 03 当前只能借道「通用现场处理 + SR」，缺少现场报价确认、现场收款与「先施工后补报价」的完整闭环。

***

## 7. 流程 04 · 周期保养

| 步骤                 | 原型实现证据                                                                                                                                 | 判断      | 说明                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| M-01 报价确定保养周期      | `serviceEveryMonths/contractStart/contractEnd` 仅存在于 [remediation.js](file:///d:/ec-workorder/prototype/remediation.js#L184-L189) 与演示种子 | 缺失（录入）  | 报价表单**无保养周期/合同期输入控件**                                                                           |
| M-02 中单            | [confirmWon](file:///d:/ec-workorder/prototype/remediation.js#L206-L238)                                                               | 已实现     | —                                                                                               |
| M-03 生成整期保养计划      | [createMaintenancePlan](file:///d:/ec-workorder/prototype/remediation.js#L184-L204)                                                    | 部分实现    | 算法存在，但**中单主链未调用**（[#L225](file:///d:/ec-workorder/prototype/remediation.js#L225) 只建 MR），仅演示种子生成 |
| M-04 到期排期（师傅+日期）   | 计划页入口不可达；排程弹窗入口不可达                                                                                                                     | 缺失（不可达） | 见 S2/S4                                                                                         |
| M-05 上门保养          | 通用移动端任务台                                                                                                                               | 已实现     | 不区分 PM/CM/M                                                                                     |
| M-06 SR 提交 + 签名    | 同流程 00 步骤 6                                                                                                                            | 已实现     | —                                                                                               |
| M-07 本次完成 / 需要报价回流 | [confirmClose](file:///d:/ec-workorder/prototype/index.html#L9090) + SR 回流                                                             | 已实现     | —                                                                                               |

> 状态一致性问题：`docs/review/prototype-remediation/REMEDIATION-TRACE.md` 将 R-09（保养计划）标为 FIXED，但代码里模块被隐藏、中单未接线，**文档结论与当前代码不一致**，建议复核。

***

## 8. 流程 05 · CM

| 步骤                | 原型实现证据                                                                                         | 判断   | 说明                                   |
| ----------------- | ---------------------------------------------------------------------------------------------- | ---- | ------------------------------------ |
| CM-01 登记 CM 任务    | CALL 类型「糾正維修」                                                                                  | 部分实现 | 可登记到「待分派」；无独立 CM 实体/来源标识             |
| CM-02 CR/主管直接指定师傅 | [performAction("assign")](file:///d:/ec-workorder/prototype/index.html#L8858)、CR「分派給師傅」/TL「分派」 | 已实现  | 直派符合 CONFIRMED-015                   |
| CM-03 时间冲突处理      | 未实现；代码注释明确「待人工確認」                                                                              | 合规缺失 | 未把「接受/拒绝 CM→PM 自动重排」当作已确认规则，**处理正确** |
| CM-04 现场服务        | 通用移动端任务台                                                                                       | 已实现  | —                                    |
| CM-05 SR 与完工      | 同流程 00 步骤 6/7                                                                                  | 已实现  | —                                    |

***

## 9. 流程 06 · Government Tender

| 步骤                 | 原型实现证据                                                                                                                                                                  | 判断       | 说明                                                                                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-01 取得标书          | [renderTender](file:///d:/ec-workorder/prototype/index.html#L20535)、匯入/新建标书                                                                                             | 已实现      | —                                                                                                                                                                                                                    |
| T-02 Tender 处理     | 附件 + 描述/备注字段                                                                                                                                                            | 部分实现     | 无应标材料清单/内部准备/审批工作流                                                                                                                                                                                                   |
| T-03 报价/回标         | `submitTender`/`exportTenderPdf` 函数存在，但按钮被 `${false ? …}` 恒假隐藏                                                                                                          | 部分实现     | 列表 [回標占位 #L20681](file:///d:/ec-workorder/prototype/index.html#L20681)、详情 [匯出 #L20861](file:///d:/ec-workorder/prototype/index.html#L20861)；绑定 [存在](file:///d:/ec-workorder/prototype/index.html#L22122-L22123) 但无渲染 |
| T-04 结果（中标/未中标）    | 详情「標記中標」；状态更新弹窗                                                                                                                                                         | 已实现      | 「揭曉日期」由中标动作自动写当天，表单无录入项                                                                                                                                                                                              |
| T-05 中标后分流 M/P/M+P | 整改层 [updateTenderStatus](file:///d:/ec-workorder/prototype/remediation.js#L291-L317) / [createQuotationFromTender](file:///d:/ec-workorder/prototype/index.html#L22227) | 部分实现（合规） | 中标只**建立/关联报价任务（待報價）**，需报价组走客户接受+中单，**不直接中单**，符合 CONFIRMED-016/009；备货单在报价中单后才产生                                                                                                                                       |

***

## 10. 缺口清单（按优先级）

**高**

- G1 保养计划模块整体隐藏且中单未接线：`remediation.js#L384`、`remediation.js#L225`（阻断流程 02/04）。
- G2 周期保养前置数据无录入 UI：报价表单缺 `serviceEveryMonths/contractStart/contractEnd`（阻断 M-01）。
- G3 排程弹窗与周期排程入口不可达：`data-open-schedule-panel`/`data-tender-schedule` 未渲染（S4）。
- G4 周期自动建单链未接通：`convertMrToTicket` 仅 `null` 调用、`verifyMr` 不存在（S7）。
- G5 现场即时维修主链缺失：IR-02/03/05/07（流程 03）。
- G6 CS 报价需求「待轉交」无 UI：`quoteRequests` 有数据无渲染（S6）。

**中**

- G7 MR 无独立列表/详情页，仅在报价/工单抽屉一行显示（S5）。
- G8 MR 备货交接（`preparedQty` 登记、材料就绪）按钮未渲染（S2）。
- G9 中单走整改层后不再经原备货单创建逻辑，纯服务报价不产生备货单，口径待确认。
- G10 Tender 回标/导出按钮被人为关闭（`${false ? …}`）。
- G11 二次上门/现场即时维修无来源标识，无法与普通工单区分。

**低**

- G12 财务客户档案与 settings 客户管理可能为两套数据源（待复核）。
- G13 SR「是否需要報價」无默认值、强制自选（与既有约定可能有出入，见第 11 节）。
- G14 完工确认与开票/收款在界面上无显式联动提示。

***

## 11. 与既有约定的偏差（需业务/团队确认，勿按记忆强改）

| 项           | 既有约定（记忆/文档）                | 当前原型实现                                                                                                                                              | 建议                          |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 标书状态取值      | 限定「待投標 / 不投標」两项            | 实际为 6 态：`待投標 / 已投標 / 已中標 / 未中標 / 已取消 / 不投標`（[字典 #L5916-L5923](file:///d:/ec-workorder/prototype/index.html#L5916-L5923)）                            | 由客户裁决后统一字典/Tab/表单/配色，避免长期打架 |
| 「是否需要報價」默认值 | 默认为「否」且必填                  | 打开 SR 时重置为 `null`、强制自选（[#L24091](file:///d:/ec-workorder/prototype/index.html#L24091)、[#L8917](file:///d:/ec-workorder/prototype/index.html#L8917)） | 确认以哪一条为准                    |
| M+P 顺序      | 不设固定先 P 后 M（CONFIRMED-013） | 原型未强加顺序（合规）                                                                                                                                         | 保持                          |
| CM 时间冲突     | PENDING-002，不得当已确认规则       | 原型未实现自动重排（合规）                                                                                                                                       | 保持，后续如需演示须标「待确认」隔离          |

***

## 12. 优化建议

1. **消除函数双写**：把 `remediation.js` 对主文件同名函数的覆盖正式合并回主原型，删除死代码，避免维护时改错版本（S1）。
2. **打通保养/周期闭环**：在 `confirmWon` 中对 M/M+P 调用 `createMaintenancePlan`，并恢复保养计划页面注册与渲染；补报价表单的周期/合同期录入控件。
3. **修复排程入口**：恢复工单/标书排程按钮渲染，或明确移除已不可达的 `openTicketScheduleModal/renderTenderScheduleModal` 及周期字段，消除「看似有功能实不可用」。
4. **接通周期自动建单**：实现或移除「备货验收 → `convertMrToTicket`」触发，使 `firstRunDone` 能置真、`processRecurringSchedules` 方能按期建单；否则删除相关承诺文案。
5. **新增 MR 独立页**：在采购模块提供 MR 列表与详情（材料行、备货进度、就绪状态、仓库通同步状态），并渲染 `data-rem-mr*` 备货交接按钮。
6. **补齐现场即时维修路径**：在移动端现场处理中增加「现场报价确认 → 客户接受 → 当场维修 → 当场收款（PENDING 占位）」分支，并与 SR「需要报价=否 + 后补报价」衔接。
7. **补齐 CS→CR/TL 报价需求面板**：渲染 `quoteRequests` 列表与「轉交」按钮，复用已写好的处理逻辑。
8. **统一 MR 编号口径**：本地 `MR-${q.id}` 与仓库通 `MR-DEMO-*` 两套并存，建议统一或明确映射。
9. **强化完工→收款提示**：完工确认后给出「已通知财务开票/待收款」的显式提示或一键入口。
10. **清理僵尸分支**：如标书「投標中」旧值等（迁移后不再产生）。

***

## 13. 本次未覆盖 / 后续验证动作

- 未完成浏览器端到端点击回归（自动化工具未返回结果）。建议后续按角色走查：报价组→中单、CR/主管→确认正式时间与完工、师傅移动端→SR 提交与签名、采购部→MR 备货、Tender→中标建报价。
- 未验证 mr-bridge 代理（仓库通真实写入）链路；本轮关注点为业务流程可达性。
- 财务两套客户主数据是否重复，仅列为待复核，未深查。

***

## 14. 变更声明

本轮**仅新增本测试报告文件**；未修改原型 HTML/CSS/JS、Project Hub 页面与数据、Fact、Decision、REQ、Flow、推进 Excel 或知识基线。报告中所有「已实现/部分实现/缺失」判断均附原型文件与行号证据；涉及 `remediation.js` 覆盖的结论均以后加载的整改层为准。
