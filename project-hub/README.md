# EC 项目事实与交付中心 / Project Hub

更新时间：2026-09-26T17:45:23.963Z

## 定位

Project Hub 是现有资料之上的索引、流程、Decision 与追溯展示层。原始项目文件仍是 Source of Truth；本目录不复制、改写或替代原始资料、PRD、Prototype、SDD、TDD、测试/UAT。

## 打开方式

- 可直接打开 `project-hub/index.html`；核心数据已内嵌，可在 `file://` 下搜索和查看。
- 推荐在项目根目录执行：`python3 -m http.server 18768`，访问 `http://localhost:18768/project-hub/`。
- 文件中心的 Open Source 使用相对路径跳转；浏览器不支持本地格式时可使用 Copy Path 后在系统中打开。

## 当前基线

- 人工确认流程：`knowledge/decisions/DEC-20260927-真实业务流程讨论.md`。
- 当前原型：`prototype/`（2.0 评审入口）。
- 历史知识库：`knowledge-base/`，继续作为旧事实审计与 80 项需求追溯底座。
- 当前仍未进入生产开发；80 项功能需求的原确认栏仍为待确认。

## 数据文件

- `data/file-index.json`：318 个文件索引及 Git 状态。
- `data/flows.json`：1 条真实业务总流程 + 6 个业务场景。
- `data/decisions.json`：17 条 CONFIRMED、2 条 PENDING、1 条 REJECTED。
- `data/traceability.json`：SOURCE 到 TEST/UAT 的双向查询数据。
- `data/project-status.json`：基线、统计、冲突、待确认和 Git 摘要。

## 维护约束

1. 新结论先写入 `knowledge/decisions/`，明确 CONFIRMED / PENDING / REJECTED / ASSUMPTION。
2. PENDING 和 ASSUMPTION 不得提升为 CONFIRMED。
3. File Index 只引用原路径，不复制原文件解决浏览器限制。
4. Prototype 关联表示“有对应展示或历史线索”，不表示已实现或验收。
5. 重新生成：使用 Codex 工作区 Node.js 执行 `.codex/project-hub-build/build.js`。

## 扫描边界

已排除 `.git/` 内部对象、依赖/运行缓存、Agent 技能、Codex 构建中间产物和 `.DS_Store`。详细口径见 `data/project-status.json`。
