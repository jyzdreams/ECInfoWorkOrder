# EC Project Knowledge Sync Protocol

状态：已纳入项目治理规则

## 目的

Project Hub / Knowledge Base 是 EC 项目的持续事实中心。任何 Codex 工作中产生、且会长期影响业务理解、需求、PRD、Prototype、开发、测试或验收的信息，都必须在任务结束前完成同步检查。

前台始终遵循 **Business Flow First，Evidence Behind**：新知识优先挂到业务场景、流程节点和业务规则，再反查 Decision、Fact、Source，以及 Requirement、PRD、Prototype、SDD、TDD、Test。

## 每次任务结束前的检查

1. **新业务信息**：检查是否新增或改变业务流程、规则、角色职责、状态、场景、字段含义或客户确认结论。需要时更新 Business Flow、Fact、Decision、Requirement。
2. **有价值的沟通结论**：只记录会影响业务理解、需求、设计、开发、测试或验收的确认、否定、纠正或待定结论；普通聊天不入库。
3. **新资源**：客户文件、Excel、Word、PDF、截图、网站、API 文档、PRD、Prototype、测试证据等登记为 Source / Evidence，并尽可能关联业务流程、Fact、Decision、REQ 和交付物。
4. **实质文件修改**：PRD、Prototype、SDD、TDD、代码、数据库或测试发生实质修改时，同步版本、状态、变更说明和追溯关系。
5. **冲突检查**：新信息与旧结论不一致时不得覆盖旧结论，标记 `CONFLICT`，记录旧结论、新信息、来源和影响范围。
6. **Open Question 检查**：用户明确表示“待定”“还没确定”“客户还要确认”“不清楚”或“后面再讨论”时，保持或创建 `OPEN` 问题，不自行补全。

## 来源优先级

客户原始资料 > 用户明确确认的业务 Decision > 已确认 PRD > Prototype > 代码实现。

代码和 Prototype 不能反向定义真实业务。历史结论应保留；用户明确修改结论时，保留历史记录，新增 Change / Decision Version，并更新当前有效规则。

## 任务收尾格式

- 产生长期知识：`Knowledge Sync: UPDATED`，说明新增/修改内容、影响的业务流程，以及是否产生 Open / Conflict。
- 没有产生长期知识：`Knowledge Sync: NO CHANGE`。

本协议是治理规则，不是业务事实；不得把它写成业务 Flow、Fact、Decision 或 Requirement。
