# 本地原型后续更新记录

日期：2026-11-04

## 基线与采用范围

- GitHub `main` 基线：`2f314b2942bbdf2ff2ebc3ba388d3cd875cd5699`。
- 本地候选来自 `/Users/xiaoxiangruanjian/Documents/AICoding/ec-workorder` 当前 `prototype/`；来源目录的 `main` 位于 `2ef0f0bbc33cbb266899c15123b64325230b4751`，且含其他未提交变更。
- 用户明确要求提交最新原型到 `main`。本轮只同步 `prototype/index.html` 与 `prototype/remediation.js`；未改动其他本地文件。`prototype/ui-upgrade.css` 与 GitHub 基线内容一致。
- 本地候选 Git blob：`index.html` `c32e002f839fca67936f89cea564cb2fe302caa3`；`remediation.js` `0913c8c879dc04f36ad4c510d1c4c5c484091bfc`。
- 相对正式基线，净变化为 360 行新增、291 行删除。

## 改动摘要及影响

- CALL 状态显示归一为“待处理/已安排/已处理”；CALL 选择报价时直接建立待报价记录。
- 派工列表增加来源、分派人、师傅筛选和完工结果列；客户选择器改用单选行。
- 财务待开票和客户列表增加筛选/搜索，显示 EC Contract No 与欠缺文件，并补充 M/P/M+P 会计演示数据。
- `remediation.js` 移除 CS 报价需求转交 CR/TL 的队列逻辑、工单抽屉履约卡片及报价修订提示。这些线上已有交互随本地版本一并替换。

## 检查与边界

- 候选文件与同步工作区的 Git blob 一致；`git diff --check` 通过。
- 本轮未运行浏览器回归或业务验收；现有回归证据未与本轮候选哈希核对，不将其视为本版本验证。
- 未修改推进记录、知识资料或客户表；客户确认、UAT 状态不变。
- 未触发 GitHub Pages 发布。
