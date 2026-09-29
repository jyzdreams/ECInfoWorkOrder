# EC Project Hub · 事实与交付中心

Project Hub 是 EC 工单系统的统一入口，组织关系为：事实来源 → Decision → 业务流程 → 功能需求 → PRD → Prototype → SDD → TDD → Testing。它不覆盖客户原件，也不把历史 PRD 或原型反向认定为已确认业务事实。

## 打开

- 直接打开 `project-hub/index.html`。数据内嵌，`file://` 下可使用左侧导航、全局搜索和关联详情。
- 或在项目根目录启动静态服务器：`python3 -m http.server 18768`，访问 `http://localhost:18768/project-hub/`。
- 文件详情的 Open Source 保留原路径；浏览器无法预览某些 Office 文件时，可复制路径后用本机应用打开。

## 信息架构

1. 业务全景：以真实业务主链、6 个场景和角色地图为第一视觉。
2. 业务流程：总业务流程与 6 个场景；节点详情先展示业务动作，再展示证据。
3. 系统需求：按真实业务模块查看 REQ 如何承接业务流程。
4. 原型与设计：PRD、Prototype、SDD、TDD、Testing。
5. 待确认问题：只聚焦影响流程、范围和角色边界的业务问题。
6. 项目状态：Gate、交付阶段、模块进度和当前阻塞。
7. 证据与追溯：Source、Fact、Decision、Change、Traceability 辅助入口，保留全部审计能力。

业务事实状态为 `CONFIRMED / PARTIAL / OPEN / CONFLICT`；交付物状态为 `MISSING / DRAFT / PARTIAL / READY / VERIFIED`。这两套状态不得混用。关联边的 `PARTIAL` 表示已发现主题对应，但尚未做内容级确认。

## 当前基线和优先级

来源优先级：客户原始资料 > 明确讨论 Decision > 已确认 PRD > Prototype > 开发实现。当前人工确认的讨论结论位于 `knowledge/decisions/DEC-20260927-真实业务流程讨论.md`。该文档的 17 条 CONFIRMED、2 条 PENDING 与 1 条 REJECTED 保持原文。`knowledge-base/` 是历史知识库和旧规则审计，仍可通过 Hub 左侧链接访问；旧规则保留来源和旧状态，但不自动升级为新的 CONFIRMED。

当前原型入口为 `prototype/index.html`（2.0 评审版）。`review/prototype-knowledge-audit/` 是整改前审计；`review/prototype-remediation/REMEDIATION-RESULT.md` 与机器结果记录 7/7 场景自动回归通过。因此旧审计中的 MR、CM 等原型偏差不能直接当成当前仍存在的冲突。原型符合性仍为 PARTIAL：自动回归通过不等于客户人工验收或生产验收。

80 项历史功能需求的原确认栏未获统一批准。流程 Decision 不等于批准全部需求；即使在追溯矩阵中有连接，REQ 仍显示 OPEN。

## 数据文件

- `data/file-index.json`：全项目文件入口、类别、版本提示、修改时间和反向关联。
- `data/facts.json`：本轮确认事实及历史规则引用，含来源和证据层级。
- `data/decisions.json`：Decision、Open Question、Change 索引。
- `data/flows.json`：总流程与六个场景；收款作为完工后的独立跟踪，现场交接仍待确认。
- `data/requirements.json`：80 项 REQ、17 个 PAGE 及其保守关联。
- `data/traceability.json`：逐需求链路和显式关系边。
- `data/audit-report.json`：全量检查结果与覆盖率口径。
- `data/architecture.json`：IA、状态字典与关系状态。
- `data/project-status.json`：交付阶段与 Gate。

`data/audit-report.json` 同时记录两种完整度：事实源至原型的六跳覆盖率，以及包含 SDD/TDD/Test 的严格九跳完整率。没有来源或未经过核对的边不会为了提高百分比而自动补齐。

## 更新与约束

当前本轮只调整前台 `assets/app-v2.js` 与 `assets/architecture.css`，不重建底层 JSON。后续若确需数据更新，再使用 `.codex/project-hub-build/build-v2.js`，并先核实原始资料与 Decision；不要运行旧版 `build.js`，它保留为历史构建脚本，含宽泛自动关联逻辑。原 `assets/styles.css` 保留。

每次任务结束前执行 [Knowledge Sync Protocol](../docs/KNOWLEDGE-SYNC-PROTOCOL.md)：有长期价值的业务、沟通、资料或交付变更才更新知识库；没有长期价值信息则记录 `Knowledge Sync: NO CHANGE`。

扫描排除 Git 内部对象、依赖/运行缓存、Agent 技能及 `.codex/` 构建工具。`backups/`、`review/` 和所有旧资料均索引且保持原文件。详见 `ISSUES_AND_GAPS.md`。
