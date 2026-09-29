# Open Questions｜待确认与冲突清单

> 本清单集中展示当前机器索引中的 24 条未决记录：19 条 `OPEN`、3 条 `CONFLICT`，以及 2 条直接 Pending Decision。本文件不关闭、不改写问题；问题的原始描述和历史记录仍以 `knowledge-base/data/knowledge-base.json`、`project-hub/data/decisions.json`、现有事实资料和 Project Hub 页面为准。

## 状态与处理原则

- `OPEN`：证据不足或客户尚未确认，不能在 Baseline、PRD 或 Prototype 中写成确定规则。
- `CONFLICT`：已有资料、讨论、Prototype 或 PRD 之间存在差异；保留旧结论和新信息，等待明确 Change / Decision。
- `PENDING`：已在当前决策文档中明确列为待定，但尚未形成最终 Decision。
- `P0 / P1 / P2`：沿用当前项目优先级，不代表本轮新增排序。
- 直接决策 Pending：`PENDING-001`（现场即时维修收款交接）和 `PENDING-002`（CM 与 PM/其他任务时间冲突）。

## 清单

| ID | 优先级 | 状态 | 问题 | 影响流程 / 范围 | 当前处理 |
| --- | --- | --- | --- | --- | --- |
| Q-20260927-001 | P0 | PENDING | 现场即时维修的收款登记、交款与对账由谁负责、何时完成？ | FLOW-INSTANT、FLOW-MAIN；完工与收款 | 对应 PENDING-001，不补规则 |
| Q-20260927-002 | P0 | PENDING | CM 与 PM / 其他任务发生时间冲突时如何处理？ | FLOW-CM | 对应 PENDING-002，不补规则 |
| Q-001 | P0 | OPEN | 旧 SOP 历史版本是否正式废弃？ | 全局基线、Legacy Source | 以当前 Baseline 为有效呈现，正式废弃仍需项目确认 |
| Q-002 | P0 | OPEN | 一期边界是否只包含 CALL 核心闭环，还是包含报价、标书、采购、会计？ | FLOW-MAIN、一期范围 | 保持范围问题，不从 REQ 数量推断 |
| Q-003 | P0 | CONFLICT | 工单采用六态、早期七态、当前原型七态，还是“主状态 + 业务卡点”模型？ | 主状态、全部场景 | 资料存在差异，不能将任一模型写成最终规则 |
| Q-004 | P0 | CONFLICT | 师傅提交完整 SR / 完工单后直接完成，还是进入独立待完工确认？ | FLOW-P、FLOW-M、完工确认 | 资料存在差异，不能将任一方案写成最终规则 |
| Q-005 | P0 | OPEN | 接单申请是否为独立对象或子状态？ | 分派、接单、FLOW-MAIN | 等待业务对象和状态确认 |
| Q-006 | P0 | OPEN | Project 主管与仓务部是否为独立角色？ | P 分支、采购、权限 | 暂按现有角色证据引用，不新增权限边界 |
| Q-007 | P0 | CONFLICT | 仓库通与本系统谁是采购 / 库存主数据源？ | FLOW-P、采购、外部接口 | 冲突待确认，不能由 Prototype 决定主数据源 |
| Q-008 | P0 | OPEN | CM 抢占 PM 时师傅是否始终可以拒绝？ | FLOW-CM、派单 | 等待 CM 冲突处理决策 |
| Q-009 | P0 | OPEN | 不可拍照客户 / 地点清单、豁免人及替代证明是什么？ | 现场执行、SR、验收 | 现场证据要求未闭合 |
| Q-010 | P0 | OPEN | 普通、政府、CALL、任务、项目、报价、J Number 的正式编号关系是什么？ | 对象模型、追溯、接口 | 等待编号规则确认 |
| Q-011 | P0 | OPEN | SR / 完工纸自动判定表是什么？ | FLOW-P、FLOW-M、FLOW-INSTANT | 继续沿用已确认的角色节点，不扩写自动判定表 |
| Q-012 | P0 | OPEN | 分派权限如何在 CS、CR、TL、ADMIN 之间区分，谁可以首次分派、CM 重分派和跨区处理？ | FLOW-MAIN、FLOW-CM | 等待权限矩阵 |
| Q-013 | P1 | OPEN | 同区最低负载推荐是否为系统规则，计算口径是什么？ | 调度、派单 | 无明确规则前不写入 Baseline |
| Q-014 | P1 | OPEN | 现场照片最多 9 / 10 张，文件大小、归档和补传规则是什么？ | 移动端、SR、验收 | Prototype / 资料存在差异，待确认 |
| Q-015 | P1 | OPEN | 一工单可有多少个 SR，SR 是否可编辑、重开或归档？ | FLOW-P、FLOW-M、完工 | 业务边界未确认 |
| Q-016 | P1 | OPEN | 报价责任人是谁，客户已确认后的报价能否修订及如何留痕？ | 报价生命周期、中单 Gate | 已有报价规则不覆盖此权限细节 |
| Q-017 | P1 | OPEN | 采购完成后回到原工单，还是生成新工单 / 新任务？ | FLOW-P、MR、采购 | 等待对象关系确认 |
| Q-018 | P1 | OPEN | 标书导出、正式回标，以及中标后进入 M / P / M+P 是否纳入本期？ | FLOW-TENDER | 当前 Tender 仅 PARTIAL |
| Q-019 | P1 | OPEN | 通知渠道和通知节点是什么？ | 首页、通知、调度、客户沟通 | 未形成确认决策 |
| Q-020 | P1 | OPEN | 试点区域、真实账号、主数据和样例工单何时提供？ | 验证、UAT、上线 | 交付准备问题 |
| Q-021 | P2 | OPEN | Peachtree 与 OCS 的版本、同步方向和责任边界是什么？ | 财务 / 外部接口 | 仅保留为接口待确认 |
| Q-022 | P2 | OPEN | OCR、语音、WhatsApp、AI 能力属于哪一期？ | 范围、上线约束 | 不因 Prototype 存在而默认纳入本期 |

## 来源与追溯

- 机器主索引：[`project-hub/data/decisions.json`](../../project-hub/data/decisions.json)。
- 直接 Pending Decision：[`knowledge/02-decisions/DECISION-INDEX.md`](../02-decisions/DECISION-INDEX.md) → 原始决策文档 [`knowledge/decisions/DEC-20260927-真实业务流程讨论.md`](../decisions/DEC-20260927-真实业务流程讨论.md)。
- 项目事实与业务场景：[`knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md`](../03-business/EC-REAL-BUSINESS-BASELINE.md)。
- 其他原始资料：通过 [`knowledge/01-source/SOURCE-INDEX.md`](../01-source/SOURCE-INDEX.md) 和 `project-hub/data/file-index.json` 反查。

## 关闭条件

只有在客户或项目负责人形成明确 Decision / Change，并可回链 Source、Fact 或会议记录后，才可把问题从 `OPEN` / `CONFLICT` 迁移到已确认知识。关闭问题时必须保留原记录、更新时间、影响的 FLOW / REQ / Prototype 和变更原因。
