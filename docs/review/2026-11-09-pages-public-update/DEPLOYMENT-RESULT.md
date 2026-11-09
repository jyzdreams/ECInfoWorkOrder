# 2026-11-09 GitHub Pages 原型发布记录

## 发布结果

- 用户明确指令：修复并发布。
- `main` 原型提交：`94604b1`。
- Pages 打包配置提交：`2b65896ad375b0489fcb9f3ee2f7030e3bcd98d3`。
- 手动发布运行：[Actions run 42553618566](https://github.com/jyzdreams/ECInfoWorkOrder/actions/runs/42553618566)，结论 `success`。
- 公开地址：<https://jyzdreams.github.io/ECInfoWorkOrder/>。
- Pages 在 2026-11-09 02:57:51 UTC 返回新页面；部署步骤在 `github-pages` 环境经本次授权审批后完成。

## 变更

此前 Pages 工作流只复制 `index.html`、`ui-upgrade.css`、`remediation.js` 和旧 Logo；新版页面所需的 `ec-brand.css`、`workbench.css`、`workbench.js`、官方 Logo 资源及 Mobile 文件未进入发布包。

更新 [.github/workflows/pages.yml](../../../.github/workflows/pages.yml) 后，发布包包含：

- 桌面原型入口和全部运行时样式、脚本及 Logo；
- 独立 Mobile 入口、样式、脚本、fixtures、组件和页面模块；
- 根路径和兼容路径 `/prototype/` 两份静态入口。

不发布测试、截图、评审材料、Mock 服务端程序、README 或项目其他文件。保留 `workflow_dispatch` 手动触发、main/仓库/触发账号校验及 `github-pages` 环境审批；push 仍不会自动发布。

## 验证

- GitHub Actions：checkout、静态文件打包、Pages artifact 上传和部署均通过。
- 对公开地址执行 HTTP 检查：根页、品牌样式、工作台脚本、官方 Logo、Mobile 入口及其 app/fixtures 均返回 200；兼容路径的页面及相应资源也返回 200。
- 公开首页包含 `ec-brand.css`、`workbench.css` 和 `workbench.js` 引用。
- 本轮没有运行浏览器业务回归；既有业务确认、UAT 与项目进度状态不变。

## 边界

本轮只修正发布包并发布 `main` 当前原型，不改原型业务代码、推进表、知识库或 Hub。旧发布为 2026-10-29 的 `53d6def`；此次公开版已更新到 `2b65896` 对应的原型内容。
