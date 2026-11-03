# 本地原型后续更新记录

日期：2026-11-03

## 基线与采用范围

- GitHub `main` 基线：`d56124a74ec999003f6988518c1be47c1af1912e`。
- 本地候选来自 `/Users/xiaoxiangruanjian/Documents/AICoding/ec-workorder` 的当前 `prototype/index.html`。Git blob：`9a6886b4ef4d2e52c4e0bf864d7a0fa56cb8a7a7`。
- 用户明确要求提交最新原型到 `main`。本轮仅更新 `prototype/index.html`；`prototype/ui-upgrade.css` 与 GitHub 基线相同，不重复提交。
- 相对基线净变化：234 行新增、92 行删除。

## 改动摘要

- 派工列表调整客户筛选和已分派任务的列布局。
- 财务待开票页增加按日期、客户、类别和金额范围筛选，并显示 EC Contract No 与欠缺文件。
- 财务客户页增加搜索；补充 M、P、M+P 会计示例数据，并以一次性标记迁移到本地演示数据。

## 检查与边界

- 候选文件与本次同步工作区的 Git blob 一致；`git diff --check` 通过。
- 未运行浏览器回归或业务验收；不表示客户确认或 UAT 通过。
- 未修改推进记录、知识资料或客户表；未触发 GitHub Pages 发布。
