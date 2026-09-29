# Requirement Index｜需求索引

> **用途**：把 Project Hub 当前的需求机器索引收口到 `knowledge/04-requirements/` 的人工可读入口。
>
> **原则**：本文件不替代原始 PRD、功能清单、Prototype、SDD、TDD 或 Test；不改变任何需求状态，也不把 Prototype 的实现反向提升为业务事实。

## 1. 当前规模与边界

需求机器索引位于 [`project-hub/data/requirements.json`](../../project-hub/data/requirements.json)，当前包含：

| 指标 | 数量 | 说明 |
| --- | ---: | --- |
| REQ | 80 | 当前 Project Hub 索引的全部需求条目 |
| PAGE | 17 | 当前索引关联的原型页面 |
| 已关联业务流程的 REQ | 30 | 至少有一条 FLOW 关联 |
| 尚未关联业务流程的 REQ | 50 | 在追溯链中标记为 UNLINKED / 仅有交付物映射 |
| 直接关联 Decision 的 REQ | 约 30 | 以当前 JSON 中的 decisionIds 为准，不能视为已批准需求 |
| 直接关联 SDD/TDD/Test 的 REQ | 0 | 当前索引未形成完整交付链 |

**状态说明**：当前 80 条 REQ 的“已进入索引”不等于“已批准”。需求审批仍以对应的正式 PRD / 决策记录和项目 Gate 为准。

## 2. 模块盘点

| 模块 | REQ 数量 | 主要编号范围 | 已有 FLOW 关联 | 已有 Decision 关联 | 业务知识备注 |
| --- | ---: | --- | ---: | ---: | --- |
| 首页与通知 | 5 | REQ-001..005 | 0 | 0 | 交付层内容，尚未挂到业务主流程 |
| CALL 受理与工单管理 | 8 | REQ-006..013 | 7 | 7 | 覆盖受理、工单主对象与核心闭环 |
| 分派与调度 | 10 | REQ-014..023 | 2 | 2 | 分派权限、调度和接单边界仍有 Pending |
| 移动端现场执行 | 11 | REQ-024..034 | 4 | 4 | 到场、照片、SR、完工证据等现场能力 |
| 报告与文档 | 5 | REQ-035..039 | 0 | 0 | 交付物能力，暂未完成业务流程映射 |
| 报价管理 | 6 | REQ-040..045 | 4 | 4 | 报价、版本、客户确认、中单 Gate |
| 标书管理 | 5 | REQ-046..050 | 5 | 5 | Tender 为 PARTIAL，完整投标边界待确认 |
| 备货与采购 | 6 | REQ-051..056 | 3 | 3 | P 分支的 MR、库存 / 采购、材料就绪 |
| 会计与外部接口 | 6 | REQ-057..062 | 4 | 4 | 完工与收款分离；财务同步细节仍不完整 |
| 统计、客户和基础设置 | 10 | REQ-063..072 | 0 | 0 | 支撑模块，暂无完整业务链映射 |
| 原需求补充与上线约束 | 8 | REQ-073..080 | 1 | 1 | 补充约束；不能覆盖原始事实 |
| **合计** | **80** | — | **30** | **约 30** | 以 Project Hub JSON 为当前机器索引口径 |

## 3. 与 Business Baseline 的关键挂接

以下是当前应优先从业务流程下钻到需求的集合。编号仅引用现有索引，不表示本轮新增需求：

| 业务节点 / 场景 | 相关 REQ | 当前说明 |
| --- | --- | --- |
| 报价、版本、客户确认、中单 | REQ-040..045 | 对应报价生命周期与 CONFIRMED-008/009 |
| P：MR、库存 / 采购、材料就绪 | REQ-051..056 | 对应 CONFIRMED-006/007；采购主数据仍有 Q-007 |
| M：整期保养计划与维护周期 | REQ-061、REQ-073..080（按当前索引） | 需求映射不完整，不能把需求文字视为新增业务规则 |
| Service Report、完工证据 | REQ-027、REQ-030、REQ-031、REQ-033 | 对应 CONFIRMED-009/010；SR 回流报价仍需显式建链 |
| 现场即时维修 / 收款 | REQ-057..062 | Q-20260927-001 仍为现场收款登记与对账 Pending |
| CM | REQ-078 及其现有关联 | 对应 CONFIRMED-014/015；PM/CM 冲突规则为 PENDING-002 |
| Government Tender | REQ-046..050 | 当前为 PARTIAL；Q-018 覆盖导出、正式回标及中标后进入 M/P/M+P |

## 4. 追溯现状

当前 Project Hub 已有 80 条 trace、477 条 edge 和 7 条 legacy trace。它适合继续作为机器关系索引，但尚未达到严格的：

`Fact → Decision → Business Flow → Requirement → PRD → Prototype → SDD → TDD → Test`

全链路完成状态。当前应按以下规则读取：

- 有 `flowId`：表示需求已被挂到某条业务流程，不代表流程细节已完整。
- 有 `decisionId`：表示存在相关决策引用，不代表该 REQ 已完成验收或审批。
- 有 `pageId` / Prototype 关联：表示有设计落点，不代表业务事实正确；Prototype 冲突必须保留为 Conflict。
- 没有来源事实、流程或决策的条目：标记 `UNLINKED`，进入后续补链，不得自行推导。
- 没有 SDD、TDD、Test 关联的条目：标记 `MISSING DELIVERY LINK`，不修改原交付物。

## 5. 原始交付物入口

- 功能需求与 PRD：通过 `project-hub/data/requirements.json` 的 `sourcePath`、`prdPath` 和 `documentIds` 进入；原文件保持原目录。
- Prototype：通过 `pageId` / `prototypePath` 进入；原型保持原目录，不在本索引中复制。
- SDD / TDD / Test：通过 Project Hub 文件索引和 Traceability 进入；目前仅保留机器索引关系。
- 历史需求：保留其 Legacy 状态，不用新 Baseline 覆盖旧文本。

## 6. 本轮不做的事情

1. 不批准 80 条 REQ。
2. 不把 REQ 文案转换成新的 RULE 或业务流程。
3. 不修改 PRD、Prototype、SDD、TDD、Test。
4. 不删除或移动现有交付物。
5. 不因缺少链路而自行补充 Fact / Decision。

## 7. 后续补链顺序

1. 先为六类正式业务场景补齐 `FLOW → REQ` 的显式关系，尤其是 M+P、SR 回报价、CM 和 Tender。
2. 再逐条核对 `REQ → PRD → Prototype`，把 Prototype Conflict 独立标记。
3. 最后补 `SDD → TDD → Test`，以交付物实际存在为准。
