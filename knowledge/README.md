# EC 项目知识库

本目录是 EC 项目的当前有效业务知识入口。它是人类可维护的知识层，不复制客户原始文件，也不替代 Project Hub、PRD、Prototype、SDD、TDD 或 Test。

## 推荐读取顺序

1. `03-business/EC-REAL-BUSINESS-BASELINE.md`：当前真实业务基线。
2. `03-business/PROJECT-HUB-FLOW-DATA.md`：Baseline 的结构化流程投影，供构建脚本读取；不是新的事实源。
3. `02-decisions/DECISION-INDEX.md`：业务为什么这样确定，哪些结论仍 Pending 或 Rejected。
4. `01-source/SOURCE-INDEX.md`：客户原始资料和会议记录入口。
5. `04-requirements/REQUIREMENT-INDEX.md`：业务如何被系统需求承接。
6. `05-pending/OPEN-QUESTIONS.md`：当前尚未确认的问题。

## 目录语义

| 目录 | 作用 |
| --- | --- |
| `01-source/` | Source 入口和索引；原文件仍保留在 `materials/`、`docs/` 或其他原路径 |
| `02-decisions/` | Decision、Pending、Rejected 的索引；当前 Decision 原文为兼容路径保留在 `knowledge/decisions/` |
| `03-business/` | 当前有效业务基线，以及由其明确投影出的结构化流程数据 |
| `04-requirements/` | 从业务知识推导出的需求索引；不复制 PRD |
| `05-pending/` | Open Questions、Conflict 和待客户确认内容 |
| `decisions/` | 既有 Decision 原文目录，本轮不移动，以避免破坏 Project Hub 路径关联 |

## 知识状态

- `CONFIRMED`：有明确人工确认或当前 Decision 支持。
- `PARTIAL`：主题或主干有证据，但细节未完整确认。
- `PENDING / OPEN`：尚未确认，不得自行补全。
- `CONFLICT`：资料之间存在冲突，不能覆盖旧结论。
- `REJECTED`：历史结论已被推翻，仅用于追溯。
- `LEGACY KNOWLEDGE`：历史知识库内容，不能自动提升为当前事实。

## 来源优先级

客户原始资料 > 明确人工确认的 Decision > 已确认 PRD > Prototype > 开发实现。

本轮建立的 Baseline 只引用当前 Source、当前 Fact、Confirmed Decision，以及明确标记为 Partial/Pending 的内容。没有证据的内容不进入当前业务基线。

## 与 Project Hub 的关系

Project Hub 是知识展示、搜索和追溯层，不是业务事实的第二套来源。JSON 是机器索引和关系数据；Markdown 是人类可维护知识。两者不应长期人工双维护。

当前数据链固定为：

```text
knowledge/ 与原始项目文件（人工维护）
→ .codex/project-hub-build/build-v2.js（解析、校验、构建）
→ project-hub/data/*.json（机器生成，禁止人工维护业务内容）
→ Project Hub UI（展示）
```

`SOURCE-INDEX.md` 提供 `SOURCE-xxx ↔ 原始路径`；构建脚本生成 `SOURCE-xxx ↔ FILE-xxx ↔ 原始路径` 映射。`EC-REAL-BUSINESS-BASELINE.md` 被识别为 `CURRENT BUSINESS BASELINE`，但不替代原始 Source → Fact → Decision 链路。

## 历史知识库

`knowledge-base/` 保留为 `LEGACY KNOWLEDGE`。其中的 228 个 Source、28 条历史 Rule、80 条历史 Requirement、17 个 PAGE 和 22 个历史问题可用于追溯，但不能覆盖当前 Baseline 或 Confirmed Decision。
