# EC Project Hub · 项目知识中心

更新日期：2026-10-11。这里是三个日常入口之一，用于查看业务全景、流程、需求、待确认问题及来源追溯。推进以[根README](../README.md)指定Excel为准，原型见[prototype](../prototype/index.html)。

## 打开

直接打开[index.html](index.html)，数据内嵌，可搜索和查看关联详情。也可从项目根目录启动静态服务器访问。
文件详情可打开来源；浏览器不支持Office预览时使用复制路径在本机打开。

## 资料和维护

- 底层业务资料：[docs/knowledge](../docs/knowledge/README.md)。
- 分析/检查报告：[docs/review/project-hub](../docs/review/project-hub/)。
- 文档分类：[目录职责](../docs/governance/PROJECT-STRUCTURE.md)。
- 更新规则：[知识同步协议](../docs/governance/KNOWLEDGE-SYNC-PROTOCOL.md)。
- 同事分工与交接：[团队协作规范](../docs/governance/TEAM-COLLABORATION.md)。

核心业务数据仍为9/27快照，最新反馈及10/07审计未完整整合。本次只修复搬移路径，保留已有编号、关系、业务状态和统计日期，不把目录更新当知识更新或客户批准。旧7场景PASS只证明当时版本，不代表当前定版。

后续已核对知识需要展示时使用scripts/build-v2.js；从项目根目录执行node project-hub/scripts/build-v2.js --check-paths可只读检查路径和编号。脚本仅依赖Node.js内置模块和Git，脚本与路径映射都可随项目版本管理。
本轮只适配工具地址，没有运行业务重建；旧.codex入口仅兼容转发，旧build.js已禁用。
data/*.json和index.html内嵌模型是生成的查看数据，机器完整率不代替Excel进度，也不反向批准业务规则。
