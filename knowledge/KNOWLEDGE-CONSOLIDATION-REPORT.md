# EC 项目知识库目录收口报告 V1

**完成日期**：2026-09-27
**执行范围**：知识目录收口、Business Baseline 建立、索引与缺口报告
**执行边界**：未修改 Project Hub UI、Prototype、PRD、SDD、TDD、Test、业务代码或客户原始资料。

## 1. 本轮结论

本轮建立了新的 `knowledge/` 聚合层，并将当前有效业务知识、来源入口、决策入口、需求入口和待确认事项放到可维护的 Markdown 入口中。原始文件没有被复制、移动或删除；Project Hub 仍然是现有 JSON / UI 的机器索引与浏览入口。

目录现在分为：

```text
knowledge/
├── README.md
├── 01-source/SOURCE-INDEX.md
├── 02-decisions/DECISION-INDEX.md
├── 03-business/EC-REAL-BUSINESS-BASELINE.md
├── 04-requirements/REQUIREMENT-INDEX.md
├── 05-pending/OPEN-QUESTIONS.md
├── KNOWLEDGE-CONSOLIDATION-REPORT.md
└── decisions/DEC-20260927-真实业务流程讨论.md   # 原始决策文档，保留原路径
```

## 2. 新增与保留文件

### 新增文件

1. `knowledge/README.md`：知识库读法、目录语义、状态与维护规则。
2. `knowledge/01-source/SOURCE-INDEX.md`：Source 入口与原始资料索引说明。
3. `knowledge/02-decisions/DECISION-INDEX.md`：Confirmed / Pending / Rejected / Change 决策索引。
4. `knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md`：EC 真实业务基线 V1。
5. `knowledge/04-requirements/REQUIREMENT-INDEX.md`：80 条 REQ 与交付链现状入口。
6. `knowledge/05-pending/OPEN-QUESTIONS.md`：24 条未决事项（19 OPEN、3 CONFLICT、2 PENDING Decision）。
7. `knowledge/KNOWLEDGE-CONSOLIDATION-REPORT.md`：本报告。

### 未移动 / 未删除

- `knowledge/decisions/DEC-20260927-真实业务流程讨论.md` 保留原路径，以兼容 Project Hub 当前 `decisionPath` 和现有引用。
- `materials/`、`docs/`、`prototype/`、`project-hub/`、历史目录及所有客户原始资料保持原位置。
- `knowledge-base/` 作为旧版聚合层继续保留，明确标记为 `LEGACY KNOWLEDGE`，不与新的 `knowledge/` 入口混为同一事实源。

## 3. 扫描规模

| 对象 | 数量 | 口径 |
| --- | ---: | --- |
| Project Hub 文件索引 | 479 | `project-hub/data/file-index.json` |
| 原始 Source | 78 | `Original Source` |
| 历史 Source | 37 | `Legacy Source` |
| Source Reference | 3 | 对外部 / 辅助资料的引用 |
| Fact | 45 | `project-hub/data/facts.json` |
| Decision 记录 | 20 | `project-hub/data/decisions.json`，另有 2 条 Change |
| 业务 Flow | 7 | `project-hub/data/flows.json` |
| REQ | 80 | `project-hub/data/requirements.json` |
| Prototype PAGE | 17 | `project-hub/data/requirements.json` |
| Trace | 80 | `project-hub/data/traceability.json` |
| Trace edge | 477 | `project-hub/data/traceability.json` |

旧版 `knowledge-base/data/knowledge-base.json` 仍包含 228 sources、28 rules、80 requirements、17 pages、22 questions、12 roles，作为 Legacy 资料对照，不在本轮复制其全文。

## 4. Business Baseline V1 盘点

Baseline 沿用了已有事实、Decision、Flow 和 Source 引用，没有新增业务规则。当前有效决策文档中有 17 条 `CONFIRMED`、2 条 `PENDING`、1 条 `REJECTED`；Baseline 对报价、中单 Gate、P / M / M+P、MR、SR、维护问题二次报价、CM、Tender、完工与收款分离等内容均保留状态边界。

当前业务知识状态摘要：

- **CONFIRMED**：报价生命周期、中单后 M/P/M+P 分叉、P 的 MR → 材料就绪 → 服务、M 的整期保养计划、SR / 完工节点的主要角色关系等。
- **PARTIAL**：CALL 受理对象、SR 回报价的完整回流、CM、Government Tender、财务接口和部分角色边界。
- **PENDING / OPEN**：现场即时维修收款交接、CM 与 PM / 其他任务冲突、一期范围、状态模型、编号关系、采购主数据等。
- **CONFLICT**：当前问题索引中保留 3 条冲突，未用新文本覆盖旧结论。

## 5. Traceability 与路径检查

- Project Hub 当前 479 条文件索引路径均可解析；本轮只新增 `knowledge/` 文件，没有改变已有路径。
- 文件级 `MISSING SOURCE / invalid path` 检查结果：**0**。
- 当前 Traceability 已有 80 条 trace / 477 条 edge，但没有证明每条 REQ 都已经完成 `Fact → Decision → Flow → REQ → PRD → Prototype → SDD → TDD → Test` 九段链路。
- 需求索引明确把 50 条尚未挂到业务流程的 REQ 标为待补链范围，不把缺失关系伪装成已确认。
- 新增 Markdown 暂未写入 Project Hub JSON；这样可以保持本轮不改 Project Hub 的边界。后续如需在 UI 搜索新入口，应单独安排索引生成与回归。

## 6. Project Hub 影响

| 项目 | 结果 |
| --- | --- |
| Project Hub UI | 未修改 |
| Project Hub JSON | 未修改 |
| `build-v2.js` | 未修改、未运行 |
| Prototype / PRD / SDD / TDD / Test | 未修改 |
| 原始 Source | 未移动、未复制、未删除 |
| 旧 `knowledge-base/` | 保留并作为 Legacy |
| 新 `knowledge/` Markdown | 已新增，暂不进入旧 JSON 索引 |

## 7. 仍存在的主要缺口

1. Project Hub 的机器索引与新的 `knowledge/` Markdown 尚未形成自动生成关系，存在未来双维护风险。
2. `knowledge/` 使用 `SOURCE-xxx` 作为人工别名，Project Hub 仍以 `FILE-xxx` 和原始路径为机器主键；两套标识需要后续建立正式映射。
3. 现有 Flow 有 7 条，但 M+P、SR 回报价等业务关系需要在不新增规则的前提下补充显式关联。
4. 80 条 REQ 中有 50 条没有业务流程关联，且 SDD / TDD / Test 级链路尚未完成。
5. Prototype、旧 PRD 和部分资料之间的冲突仍需单独完成确认，不应在本轮通过改写 Baseline 消除。

## 8. 后续建议（不在本轮执行）

1. 先确认 `knowledge/` 与 Project Hub JSON 的单向生成边界，避免 Markdown 与 JSON 长期双写。
2. 由项目负责人确认 Q-001、Q-002、Q-003、Q-007、Q-018 及两条直接 Pending Decision。
3. 逐条补齐业务场景 → Flow → REQ 的显式关系，再处理 Prototype Conflict。
4. 在 SDD / TDD / Test 实际可追溯后，再生成完整交付链指标。
5. 最后再评估是否将 `knowledge/decisions/` 的原始路径正式迁移；迁移前必须同步更新 `build-v2.js` 和全部引用。

## 9. 交付状态

本轮目录收口与 Baseline V1 已完成。没有因为发现 Pending 或 Conflict 而停止扫描，也没有把推测写成 Confirmed。下一轮应先由人工确认上述待确认事项，再决定是否让 Project Hub UI 消费新的 `knowledge/` 入口。
