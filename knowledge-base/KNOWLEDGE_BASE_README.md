# EC 工单系统项目知识库

更新时间：2026-09-26

## 定位

本目录是现有资料之上的聚合与追溯层，不替代客户原始资料、PRD、当前原型或未来开发规格。知识条目使用 `Confirmed / Derived / Pending / Conflict / Deprecated` 五种状态；`Derived` 不等同于客户批准。

## 打开方式

直接打开 `knowledge-base/index.html`。页面数据已内嵌，因此使用 `file://` 直接打开也可搜索、筛选和查看关联详情。`data/knowledge-base.json` 与 `data/source-inventory.json` 供后续脚本、PRD、测试或导入工具复用。

## 数据模型

`SRC → RULE / SCENE → FLOW → REQ → PAGE → Test`。当前未发现正式测试用例库，因此 Test 端统一标记为缺口，不伪造测试覆盖。

## 审计口径

- 扫描项目事实目录、当前/归档原型、客户交付目录与治理文件；排除 `.git`、工具运行时、依赖缓存及 Agent 技能文件。
- 共登记 228 个物理文件，按 SHA-256 归并为 172 份唯一内容，识别 55 个重复组。
- Word、Excel、PDF、Markdown、HTML、SVG 和文本文件做内容提取；图片逐张登记并通过联系表人工复核；二进制预览、临时锁文件只记元数据。
- 客户确认 Excel 中 80 项功能的确认栏仍为“待确认”，因此 REQ 状态不提升为 Confirmed。

## 目录

- `index.html`：独立知识库站点。
- `data/knowledge-base.json`：角色、规则、流程、场景、需求、页面、问题与决策。
- `data/source-inventory.json`：完整事实源库存与重复文件信息。
- `OPEN_QUESTIONS.md`：待确认与冲突清单。
- `TRACEABILITY_MATRIX.md`：80 项需求追溯矩阵。
- `SCANNED_SOURCES.md`：扫描过的物理文件清单。
- `CONFLICTS_AND_UNCONFIRMED.md`：冲突与证据不足汇总。

## 维护规则

1. 新增结论先登记 `SRC`，再创建或更新规则/场景。
2. 客户书面确认后才把相应条目从 Pending/Conflict 更新为 Confirmed，并新增 `DEC`。
3. 原型变化只更新 `PAGE` 与关联，不自动改变业务规则状态。
4. 建立正式测试用例后，用稳定测试 ID 回填 `testRefs`。
