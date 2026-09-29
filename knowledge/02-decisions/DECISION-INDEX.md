# Decision Index

当前 Decision 原文仍保留在：

`../decisions/DEC-20260927-真实业务流程讨论.md`

本索引不复制 Decision 正文，避免形成第二份事实源。Project Hub 当前 JSON 仍引用原路径 `knowledge/decisions/DEC-20260927-真实业务流程讨论.md`。

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
