# EC 工单系统目录职责

更新日期：2026-10-12。日常只使用根README指定的推进Excel、prototype/和project-hub/三个入口。

## docs 六类文档

| 目录 | 职责 |
| --- | --- |
| [knowledge](../knowledge/README.md) | Hub底层知识：来源、规则、业务流程、决定、需求关联与待确认项；保留原内部结构 |
| [analysis](../analysis/) | 专题分析、草案、Demo；flow-reference/保留三个旧流程说明和对应SOP数据 |
| [audit](../audit/) | 定版前审计及证据；9/26审计按日期子目录保留，10/07审计原批次不动 |
| [review](../review/) | 原型评审、整改和回归；保留各批次；project-hub/收拢Hub分析与检查报告 |
| governance/ | 本文件、文件规则、知识同步规则和搬移记录 |
| [history](../history/) | 按2026-06、2026-06-29、2026-07、2026-08等版本保存旧PRD/设计/演示/交接；旧Knowledge Base说明在knowledge-base/ |

历史演示稿和配套logo、截图共同保留在history/2026-06/，不复制成当前原型。
历史分类用于版本定位，不表示整份内容已失效；具体条目有效性看来源和替代决定。

## docs之外

| 位置 | 职责 |
| --- | --- |
| [根README](../../README.md)、AGENTS.md、必要配置 | 项目入口和执行指引；详细治理文档在docs/governance/ |
| prototype/ | 唯一当前原型代码、配套资源及简短使用说明 |
| project-hub/ | 日常知识中心页面、生成数据、样式和简短使用说明；scripts/保存可随项目版本管理的必要生成工具和路径映射 |
| materials/ | 客户原件、听记、沟通笔记、纸样和参考附件；原名原位置 |
| outputs/ | 指定内部推进Excel、客户确认材料和历史交付批次；原位置保留 |
| knowledge-base/ | 历史知识界面与原始数据；独立报告移入docs/history/knowledge-base/ |
| archive/、backups/ | 历史原型和完整快照；不拆分、不改内容 |
| mr-bridge/ | 仓库接口工具代码 |
| store/、.codex/及工具缓存 | 临时收件、解析/生成/验证工具；不当需求批准或交付完成证据 |
| .agents/、.specify/、.github/ | 必要Agent/规格/CI配置；正式开发尚未开始 |

## Excel职责

唯一内部维护源仍为outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/03-项目推进资料/EC工单系统项目推进总表.xlsx。
结构化客户确认表是升级底稿，按主台账编号/版本输出并复核回填，不双维护。
其他客户版、按原型梳理版、历史版本均保留身份，不凭文件名判批准，不沿用旧完成度。

## 本次完成与仍待完成

完成：143个文档及配套文件归类搬移，链接和Hub路径适配；详见[搬移记录](DOCUMENT-MIGRATION-20261011.md)。
未完成：最新业务知识整合、Excel内容升级、原型整改、客户确认与业务验收。本次没有改变业务批准状态。

新文件遵循[文件写入规则](FILE-WRITING-RULES.md)，知识更新遵循[同步协议](KNOWLEDGE-SYNC-PROTOCOL.md)。

团队分工与交接遵循[协作规范](TEAM-COLLABORATION.md)。新客户文件从materials/inbox/收件；新临时检查产物放.codex/；原outputs历史检查资料保留，不继续混入新交付批次。

GitHub共享范围见[提交规范](GITHUB-SUBMISSION-RULES.md)。backups/仅本地保存；正式历史原型archive/和审计/验收证据仍随项目保存。.github/只放发布工作流、PR模板及简短配置说明。
