# EC Knowledge → Project Hub 数据接线设计与实施报告

- 完成日期：2026-09-27
- 实施范围：知识上游接线、SOURCE ID 映射、构建脚本最小改造、索引与搜索验证
- 未实施：业务全景改版、Prototype / PRD / SDD / TDD / Test 修改、业务规则或状态修改

## 1. 当前数据生成链（改造前）

改造前 `build-v2.js` 并不是完全由事实源生成数据：

| 输出 | 改造前来源 | 判断 |
| --- | --- | --- |
| `file-index.json` | 全目录扫描 + 上一次 `file-index.json` 的 Git 状态字段 | 基本可自动生成 |
| `facts.json` | 当前 `decisions.json` 派生 17 条 Fact + `knowledge-base` 28 条 Legacy Rule | 当前 Decision 存在自读 JSON；Legacy 依赖明确 |
| `decisions.json` | 上一次 `decisions.json` + 脚本中的标题数组 | 自身既是输入又是输出，存在双写 |
| `flows.json` | 上一次 `flows.json` + 脚本补充节点和展示元数据 | 自身既是输入又是输出，存在双写 |
| `requirements.json` | `knowledge-base` 的 Requirement / PAGE + 脚本硬编码 `requirementFlowMap` | 可生成，但仍依赖 Legacy 与人工审阅映射 |
| `traceability.json` | 本轮生成的 Fact / Decision / Flow / REQ 关系 + 上一次 trace 的历史归档 | 主关系自动生成；历史归档自读保留 |
| `project-status.json` | 上一次 `project-status.json` + 当前审计结果覆盖 | 项目管理状态仍有自读输入 |
| `architecture.json` | 构建脚本中的 IA、状态字典与说明 | 自动生成，但配置写在脚本中 |

主要风险是 `decisions.json` 和 `flows.json` 的修改可能被下一次构建继续沿用，无法判断修改来自 Markdown 事实源还是人工改 JSON。

## 2. 修改后的数据生成链

```text
客户原始资料 / 当前项目文件
        ↓
knowledge/01-source/SOURCE-INDEX.md
knowledge/decisions/DEC-20260927-真实业务流程讨论.md
knowledge/02-decisions/DECISION-INDEX.md
knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md
knowledge/03-business/PROJECT-HUB-FLOW-DATA.md
knowledge/05-pending/OPEN-QUESTIONS.md
knowledge-base/data/knowledge-base.json（LEGACY，仅历史追溯）
        ↓
.codex/project-hub-build/build-v2.js
        ↓
project-hub/data/*.json + project-hub/index.html
        ↓
Project Hub UI
```

新的责任关系为：

- Decision 内容：来自原始 Decision Markdown。
- Decision 标题、Flow 关联和 Change：来自 Decision Index 的显式表格。
- Flow 结构：来自 `PROJECT-HUB-FLOW-DATA.md` 的显式表格，并回链 Business Baseline 和 Decision。
- Open Question：来自 `OPEN-QUESTIONS.md` 的显式表格。
- SOURCE 别名：来自 `SOURCE-INDEX.md` 的显式表格。
- Fact：由现有 Decision 派生当前 Fact；Legacy Fact 继续来自旧知识库，不升级状态。
- JSON：仅作为构建输出，不再作为 Decision / Flow 的当前业务上游。

## 3. `build-v2.js` 修改内容

1. 移除对 `project-hub/data/decisions.json` 和 `project-hub/data/flows.json` 的上游读取。
2. 增加 Markdown 解析器，只读取明确 ID、表格字段和状态，不做关键词推断。
3. Decision 构建改为读取：
   - `knowledge/decisions/DEC-20260927-真实业务流程讨论.md`
   - `knowledge/02-decisions/DECISION-INDEX.md`
4. Flow 构建改为读取 `knowledge/03-business/PROJECT-HUB-FLOW-DATA.md`。
5. Open Question 构建改为读取 `knowledge/05-pending/OPEN-QUESTIONS.md`，保留 19 OPEN、3 CONFLICT、2 PENDING。
6. Source 别名改为读取 `knowledge/01-source/SOURCE-INDEX.md`。
7. 为 Current Knowledge 和 Legacy Knowledge 增加明确的 `knowledgeTier`。
8. 将 Business Baseline 标记为 `CurrentBusinessBaseline`，并生成 `DECISION_TO_BASELINE`、`BASELINE_TO_FLOW` 追溯边。
9. 增加数量和结构校验：Decision 必须为 20、Flow 必须为 7、Open Question 必须为 24；未知 Decision、非法状态或缺失 Source 路径会让构建失败。
10. 全局搜索增加 `aliases / sourceIds / category / sourceType`，文件详情显示 SOURCE ID 和知识层级。

本轮没有修改业务全景的布局、流程画法、场景卡或导航结构。

## 4. Markdown 与 JSON 的责任边界

| 层 | 责任 | 是否人工维护 |
| --- | --- | --- |
| 原始 Source | 客户材料、会议记录、当前项目文件 | 是；原文件不可被构建覆盖 |
| `knowledge/**/*.md` | 当前业务基线、Decision 索引、Flow 结构、Open Question、Source 别名 | 是 |
| `build-v2.js` | 读取、校验、建立显式关系、生成 JSON 和内嵌展示数据 | 是；只维护解析和构建逻辑 |
| `project-hub/data/*.json` | 文件索引、关系、展示数据 | 否；机器生成 |
| `project-hub/index.html` | Project Hub 运行入口和内嵌构建结果 | 否；机器生成 |
| Project Hub UI | 搜索、展示和下钻 | 仅维护展示逻辑，不定义业务事实 |

禁止直接编辑生成 JSON 来修正业务内容。业务变化应先进入 Source / Decision / Baseline，再运行构建。

## 5. SOURCE ↔ FILE 映射方式

`SOURCE-INDEX.md` 的每一行提供：

```text
SOURCE-xxx ↔ 原始路径
```

构建时按稳定路径生成 SHA-1 路径型 `FILE-xxxxxxxxxx`，输出：

```text
SOURCE-xxx ↔ FILE-xxxxxxxxxx ↔ projectPath ↔ ../可打开路径
```

映射同时写入：

- `file-index.json.sourceMappings`
- 每个对应 File 的 `sourceIds` 和 `aliases`
- `traceability.json.sourceMappings`
- `SOURCE_ALIAS_TO_FILE` 显式追溯边

当前共建立 13 条映射。SOURCE ID 可通过 Project Hub 全局搜索定位到对应 File，并从文件抽屉打开原路径。移动原始文件会改变 FILE ID，因此必须先更新 Source Index 并重新构建。

## 6. Business Baseline 与 Legacy 处理

`EC-REAL-BUSINESS-BASELINE.md` 被识别为：

- `category = Business Baseline`
- `sourceType = CurrentBusinessBaseline`
- `knowledgeTier = CURRENT`

Baseline 是当前业务汇总和 Flow 的上游入口，不是原始 Source。构建关系保持：

```text
Source → Fact → Decision → Business Baseline / Flow → REQ → Prototype
```

`knowledge-base/` 继续为：

- `category = Legacy Knowledge Base`
- `sourceType = LegacyReference`
- `knowledgeTier = LEGACY`

Legacy Rule、Requirement、PAGE、Question 和 Role 仅用于历史追溯。本轮没有把任何 Legacy 状态升级为 CURRENT / CONFIRMED。

## 7. 自动生成的数据

当前构建自动生成：

- 全项目文件索引与 Current / Legacy 分类。
- 13 条 SOURCE ↔ FILE ↔ Path 映射。
- 20 条 Decision、2 条 Change。
- 45 条 Fact：17 条当前 Fact + 28 条 Legacy Fact。
- 7 条 Flow 及节点结构。
- 24 条未决问题记录。
- 80 条 REQ、17 个 PAGE。
- Trace、显式 Edge、审计统计、Architecture 和 Project Status 展示数据。
- `project-hub/index.html` 中的 `window.HUB_DATA`。

构建器只接受已有 ID 和显式字段，不自动创建 Fact / Decision，不自动升级 Partial，不自动关闭 Pending。

## 8. 仍需人工维护的数据

以下内容尚未适合自动推断，继续要求人工维护：

1. 客户原始资料和 Source Index 的路径登记。
2. Decision 原文及 Decision Index 的标题、Flow 关联和 Change。
3. Business Baseline 的业务说明。
4. `PROJECT-HUB-FLOW-DATA.md` 的节点、角色、动作、状态和 Decision ID。
5. Open Question 的状态和关闭依据。
6. 80 条 Requirement / 17 个 PAGE 的主体内容仍来自 Legacy Knowledge；尚未迁入新的 Requirement Markdown 数据源。
7. `requirementFlowMap` 仍是脚本内的人工审阅映射，不能自动按相似文本生成。
8. `conflictRecords`、角色历史审计和部分项目状态配置仍保留在脚本 / Legacy 数据中。
9. `project-status.json` 的非知识管理字段仍被作为稳定项目状态种子读取；本轮未扩展到项目管理数据迁移。

## 9. 构建验证结果

| 检查项 | 结果 |
| --- | --- |
| Project Hub 打开 | PASS；本地 HTTP 验证正常 |
| Fact 数量 | PASS；45 → 45 |
| Decision 数量 | PASS；20 → 20，其中 17 CONFIRMED、2 PENDING、1 REJECTED |
| Flow 数量 | PASS；7 → 7 |
| REQ 数量 | PASS；80 → 80 |
| PAGE 数量 | PASS；17 → 17 |
| 原有索引路径 | PASS；构建后 0 个失效路径 |
| 新 knowledge 文件索引 | PASS；均为 CURRENT，可按文件名 / 路径搜索 |
| Business Baseline | PASS；分类为 CurrentBusinessBaseline，可搜索和打开 |
| SOURCE ID 搜索 | PASS；`SOURCE-001` 命中 `FILE-618C5F54C7` 及原始 Decision 路径 |
| SOURCE 映射 | PASS；13/13 有效 |
| Legacy 分层 | PASS；0 个 `knowledge-base/` 文件被标为 CURRENT |
| 新增虚假 Fact / Decision / Flow / REQ | PASS；核心对象数量未变化 |
| Prototype / PRD / SDD / TDD / Test | PASS；本轮未修改 |

最终构建统计：490 个文件、118 个原始 / 历史 Source、517 条显式追溯边、50 条 REQ 仍未关联当前 Flow、严格九跳完整链仍为 0%。

## 10. 剩余风险

1. Requirement 与 PAGE 仍依赖 `knowledge-base/data/knowledge-base.json`；迁移前必须保留 Legacy 身份，不能自动升级。
2. `requirementFlowMap` 是显式人工映射，需后续迁移到新的 Requirement 上游格式。
3. Business Baseline 的叙述与 Flow Data 的结构化表格存在同目录双表达；构建可以校验 ID 和数量，但不能判断自然语言语义是否漂移。
4. `project-status.json` 和 `traceability.json` 仍分别保留项目状态种子与 Legacy Trace 归档读取，这是项目管理 / 历史兼容，不是当前业务事实上游。
5. FILE ID 基于路径生成；移动文件会改变 FILE ID，需要通过 Source Index 和重建同步。
6. 当前系统 `node` 可执行文件缺少旧 ICU 动态库；本轮使用 Codex bundled Node 完成构建。项目后续应修复本机 Node，或在项目脚本中固定可用运行时。
7. Markdown 表格是显式契约；表头可调整，但数据列结构变化时必须同步更新解析器并重新验证。

## 11. 本轮修改文件

- `.codex/project-hub-build/build-v2.js`
- `project-hub/assets/app-v2.js`（仅搜索别名、问题状态筛选和文件详情字段）
- `knowledge/README.md`
- `knowledge/02-decisions/DECISION-INDEX.md`
- `knowledge/03-business/PROJECT-HUB-FLOW-DATA.md`（新增）
- `knowledge/PROJECT-HUB-KNOWLEDGE-INTEGRATION.md`（新增）
- `project-hub/data/*.json` 与 `project-hub/index.html`（构建产物）

本轮没有开始业务全景页面改版。
