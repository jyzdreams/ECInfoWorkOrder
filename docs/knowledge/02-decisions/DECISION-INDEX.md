# Decision Index

## 最新即时维修确认（2026-10-27）

[SOURCE-039／CONFIRM-10-27-01](../decisions/DEC-20261026-客户业务确认补充.md#instant-followup-20261027)：Michael最新人工确认，进入即时维修后补报价时已经完成现场收款；报价组补齐报价记录，不重新等待客户接受、不重新中单、不再次收款。已收款不代表已开票；不设定必须先收钱才能维修。

本次替代旧“报价组协助补录只是候选／后补时是否已收款未明”的解释，未改旧Decision原文或编号。C-06／PENDING-001仍保留登记、交款、对账、权限及具体系统操作等未答部分；不是客户正式签批，不改变0批业务定稿状态。

## 当前业务确认补充（2026-10-26，10/27入库）

[SOURCE-038｜客户会议与Michael会后人工确认补充](../decisions/DEC-20261026-客户业务确认补充.md)保存CONFIRM-10-26-01～20完整原文、会议定位及旧结论适用边界。确认身份是项目负责人Michael根据现场沟通进行的人工复盘，不是客户正式签字；原始会议为SOURCE-034～036，AI纪要为SOURCE-037，Codex审计推断另行标识。

本次明确客户／合同识别、CALL主管及报价公共池、接手报价员跟进版本／中单、普通成交一MR与多PO分阶段施工、SR／CP与单次工单／整体业务完成、车资及票款独立。四项错误解释和现场车资推断的纠正见原文，旧Decision不删除、不改编号。

中单后材料变更**没有结论**，OPEN-10-26-01作为原C-13的P0子项维护于[待确认清单](../05-pending/OPEN-QUESTIONS.md#open-10-26-01)。CM、M整体／M+P整体结束、财务交接、特殊票款及其他未答项不关闭；CONFLICT-007/008不自动解决。10/25模型未被推翻的部分继续有效，下方17／2等统计仅为9/27快照，不表示本轮只有17项或新增20项客户签批。

仅知识回灌，不批准REQ、FLOW、原型或UAT，不改变业务流程确认阶段、维修整链未通过及0批业务定稿状态；本轮未同步Hub展示。

## 当前模型确认版本（2026-10-25）

[DEC-20261025｜业务模型确认](../decisions/DEC-20261025-业务模型确认.md)，来源SOURCE-033，保留用户CONFIRM-01～08标识。身份为项目用户明确确认，不是客户正式签批。

本版本明确P/M/M+P核心分类，以及P内路径、M→P转换、来源和CM归属；具体规则、权限及异常仍逐项确认。原9/27 Decision、17条Confirmed及统计为历史讨论记录，保留原编号和原文，不因本版本自动关闭冲突或提升REQ、原型、UAT状态。新旧对应关系只维护在新版本记录中。

当前 Decision 原文仍保留在：

`../decisions/DEC-20260927-真实业务流程讨论.md`

本索引不复制 Decision 正文，避免形成第二份事实源。Project Hub 当前 JSON 仍引用原路径 `docs/knowledge/decisions/DEC-20260927-真实业务流程讨论.md`。

## 统计

- Confirmed：17 条
- Pending：2 条
- Rejected：1 条
- Change：2 条
- Assumption：0 条
- Decision 原文 Source：`FILE-618C5F54C7`

## Confirmed Decision

| ID | 主题 | 影响流程 |
| --- | --- | --- |
| CONFIRMED-001 | 普通维修主干 | FLOW-MAIN、FLOW-P |
| CONFIRMED-002 | 三种维修情况 | FLOW-P、FLOW-MAINT-ISSUE、FLOW-INSTANT |
| CONFIRMED-003 | 中单后的准备 | FLOW-MAIN、FLOW-P |
| CONFIRMED-004 | 预排与正式时间 | FLOW-P |
| CONFIRMED-005 | 材料完成后确认时间 | FLOW-P、FLOW-MAINT-ISSUE |
| CONFIRMED-006 | MR 自动生成 | FLOW-P、FLOW-MAINT-ISSUE |
| CONFIRMED-007 | MR 生成触发点 | FLOW-MAIN、FLOW-P、FLOW-MAINT-ISSUE |
| CONFIRMED-008 | 报价组生命周期 | FLOW-MAIN、FLOW-P、FLOW-MAINT-ISSUE、FLOW-INSTANT、FLOW-TENDER |
| CONFIRMED-009 | 四个报价入口 | FLOW-MAIN、FLOW-P、FLOW-MAINT-ISSUE、FLOW-TENDER |
| CONFIRMED-010 | SR 与完工确认 | FLOW-P、FLOW-MAINT-ISSUE、FLOW-INSTANT、FLOW-M、FLOW-CM |
| CONFIRMED-011 | 报价阶段确定业务类型 | FLOW-MAIN、FLOW-TENDER |
| CONFIRMED-012 | 整期保养计划 | FLOW-M |
| CONFIRMED-013 | M+P 无固定顺序 | FLOW-MAIN、FLOW-M、FLOW-P |
| CONFIRMED-014 | CM 业务存在 | FLOW-CM |
| CONFIRMED-015 | CM 直接指定师傅 | FLOW-CM |
| CONFIRMED-016 | 政府 Tender 基本链路 | FLOW-TENDER |
| CONFIRMED-017 | 完工与收款分离 | FLOW-MAIN、FLOW-INSTANT |

## Pending / Rejected / Change

| ID | 类型 | 主题 | 内容 | 影响流程 / Decision |
| --- | --- | --- | --- | --- |
| PENDING-001 | Pending | 现场收款内部交接 | 现场即时维修由师傅收款后，如何登记、交款、对账 | FLOW-INSTANT |
| PENDING-002 | Pending | CM 时间冲突处理 | CM 与原 PM / 其他任务发生时间冲突时如何处理 | FLOW-CM |
| REJECTED-001 | Rejected | M+P 固定先 P 后 M | M+P 必须固定先 P 后 M；已被 CONFIRMED-013 推翻 | FLOW-MAIN、FLOW-M、FLOW-P |
| CHG-001 | Change | MR 由手工制作转为中单后自动生成 | 已确认 MR 改为中单后由系统自动生成 | CONFIRMED-006、CONFIRMED-007 |
| CHG-002 | Change | M+P 固定先 P 后 M 被推翻 | 已确认 M 与 P 不设置固定先后顺序 | CONFIRMED-013、REJECTED-001 |

## 使用约束

Decision 不等于 80 条功能需求已批准，也不等于 Prototype 已验收。Confirmed Decision 只能确认业务结论本身；REQ、页面、开发和测试状态仍按各自数据文件保持独立。
