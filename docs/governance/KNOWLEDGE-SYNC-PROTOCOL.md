# EC Project Knowledge Sync Protocol

状态：已纳入项目治理规则；2026-10-11按三个日常入口和docs六类文档收口。

## 目的

日常知识从project-hub/index.html进入，底层业务资料维护在docs/knowledge/；推进使用根README指定内部Excel，交互使用prototype/。旧Knowledge Base仅追溯。长期信息同步到拥有其内容的详情，再按需生成Hub展示；不要求每次改全部文档或重建Hub。

前台始终遵循 **Business Flow First，Evidence Behind**：新知识优先挂到业务场景、流程节点和业务规则，再反查 Decision、Fact、Source，以及 Requirement、PRD、Prototype、SDD、TDD、Test。

## 每次任务结束前的检查

1. **新业务信息**：检查是否新增或改变业务流程、规则、角色职责、状态、场景、字段含义或客户确认结论。需要时更新 Business Flow、Fact、Decision、Requirement。
2. **有价值的沟通结论**：只记录会影响业务理解、需求、设计、开发、测试或验收的确认、否定、纠正或待定结论；普通聊天不入库。
3. **新资源**：客户文件、Excel、Word、PDF、截图、网站、API 文档、PRD、Prototype、测试证据等登记为 Source / Evidence，并尽可能关联业务流程、Fact、Decision、REQ 和交付物。
4. **实质文件修改**：PRD、Prototype、SDD、TDD、代码、数据库或测试发生实质修改时，同步版本、状态、变更说明和追溯关系。
5. **冲突检查**：新信息与旧结论不一致时不得覆盖旧结论，标记 `CONFLICT`，记录旧结论、新信息、来源和影响范围。
6. **Open Question 检查**：用户明确表示“待定”“还没确定”“客户还要确认”“不清楚”或“后面再讨论”时，保持或创建 `OPEN` 问题，不自行补全。

## 单一维护职责

- 原始资料保留原件，来源索引登记路径/身份/整合状态，登记不等于批准。
- 知识决定/基线维护规则与出处/冲突；总览定位，机器JSON不另写事实。
- Excel主台账维护范围/需求/任务/责任/依赖/阻塞/客户决定/验收，不新建平行任务板或JSON进度。
- 客户版按稳定编号/版本导出，反馈复核后回填并保存确认人/日期/依据，不独立双维护。
- 原型、审计、回归保留对应版本；旧PASS/机器完整率/页面数不当当前项目进度。
- Excel尚未更新时显式注明待接入本轮变更，治理说明不冒充主台账已更新。
- 已核对知识需要Hub展示时才重建验证；未重建时明确快照，不声称实时同步。
- 目录维护只修复路径；保留FILE/SOURCE/FACT/DEC/FLOW/REQ/PAGE编号、业务关系、批准状态和统计日期。更新路径不表示登记的新资料已被整合。
- Hub生成负责人按批次执行project-hub/scripts/build-v2.js；先运行--check-paths只读检查。原型共享文件、主台账、Hub生成文件各按[团队协作规范](TEAM-COLLABORATION.md)约定主写人。
- 整理文档统一放docs六类目录；客户原件materials/和交付批次outputs/保留原位置。分类为history不直接废弃其中全部规则。

## 来源优先级

客户原始资料 > 用户明确确认的业务 Decision > 已确认 PRD > Prototype > 代码实现。

代码和 Prototype 不能反向定义真实业务。历史结论应保留；用户明确修改结论时，保留历史记录，新增 Change / Decision Version，并更新当前有效规则。

## 任务收尾格式

- 产生长期知识：`Knowledge Sync: UPDATED`，说明新增/修改内容、影响的业务流程，以及是否产生 Open / Conflict。
- 没有产生长期知识：`Knowledge Sync: NO CHANGE`。

本协议是治理规则，不是业务事实；不得把它写成业务 Flow、Fact、Decision 或 Requirement。
