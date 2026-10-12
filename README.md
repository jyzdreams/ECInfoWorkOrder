# EC 工单系统项目入口

更新日期：2026-10-12。当前阶段：需求与原型定版准备，尚未进入生产开发。

同事接手先读[团队协作规范](docs/governance/TEAM-COLLABORATION.md)：约定负责批次和文件，推进Excel统一回填，同一共享文件一人主写。

提交到GitHub前按[提交规范](docs/governance/GITHUB-SUBMISSION-RULES.md)区分正式成果与本地过程文件；.github/只维护PR模板和发布配置。

## 日常只看三个入口

| 入口 | 打开 | 负责什么 |
| --- | --- | --- |
| 推进 Excel | [内部项目推进总表](outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/03-项目推进资料/EC工单系统项目推进总表.xlsx) | 需求、任务、责任、阻塞、客户确认和验收；唯一内部推进维护源 |
| 当前原型 | [prototype](prototype/index.html) | 页面、操作、状态和角色交接；唯一当前原型，2.0评审版 |
| 项目知识中心 | [Project Hub](project-hub/index.html) | 业务全景、流程、需求、来源、决定和待确认问题；日常知识查看入口 |

[客户需求确认表](outputs/2026-09-27-customer-requirements-review-v2/EC工单系统客户需求确认表（客户评审版-结构化）.xlsx)是升级底稿，内容和字段预填仍待校正，不能原样作为定版签字稿。客户版按主台账编号和版本导出，反馈复核后回填。

## docs 六类资料

| 目录 | 存放什么 | 什么时候看 |
| --- | --- | --- |
| [knowledge](docs/knowledge/README.md) | 来源、业务规则、流程、决定和待确认项 | 从 Hub 追溯业务依据；这是底层资料，不是第四个日常入口 |
| [analysis](docs/analysis/) | 专题分析、方案草案、流程参考、Demo说明 | 讨论对应问题时 |
| [audit](docs/audit/PROTOTYPE-FINALIZATION-AUDIT.md) | 定版前审计报告及证据 | 排整改任务、查问题依据时 |
| [review](docs/review/) | 原型评审、整改、回归及验收记录 | 验证对应版本时 |
| [governance](docs/governance/PROJECT-STRUCTURE.md) | 目录职责、文件规则、知识同步规则 | 新建文件或调整维护方式时 |
| [history](docs/history/) | 旧PRD、旧流程、设计和交接资料 | 对比和追溯时，不直接作为当前批准范围 |

客户原件保留在 materials/，Excel/PDF等交付批次保留在 outputs/，历史原型和备份保留在 archive/、backups/。knowledge-base/ 是历史知识界面，工具和缓存保留原位置。

## 当前实际状态

- 目录整理已完成：整理文档集中到docs，Hub来源路径和生成脚本已适配；需求、来源编号和业务状态不因搬移改变。
- 推进Excel内容基于2026-08-31，最新反馈和审计仍待接入，不沿用旧完成度。
- Hub核心业务数据仍为9/27快照；9/28、9/30资料登记不等于逐条整合，目录修复不表示知识内容升级。
- [10/07定版前审计](docs/audit/PROTOTYPE-FINALIZATION-AUDIT.md)为NOT READY；原型整改、客户确认和真实业务验收仍待完成。
- 历史文件中的原路径和旧结论保留版本身份，查现址见[搬移记录](docs/governance/DOCUMENT-MIGRATION-20261011.md)。

## 后续推进顺序

每批按业务流程推进：核对原始依据 → 更新底层知识和推进表 → 客户确认真正未决项 → 修改原型 → 角色走查 → 记录并冻结版本。
分别记录客户确认、原型修改、业务验收，不能互相代替；Hub项目状态展示不另维护一套Excel进度。

开始写文件前阅读[文件写入规则](docs/governance/FILE-WRITING-RULES.md)。正式开发另按批准范围和[项目宪法](.specify/memory/constitution.md)建立计划，不恢复失效的materials/raw/或旧specs/。

新客户资料先放materials/inbox/；新检查中间产物放.codex/，正式交付仍在outputs/。Hub必要脚本及路径映射在project-hub/scripts/，可随项目版本管理；旧.codex入口仅兼容转发。当前工作区尚未提交，团队交接应同步完整目录调整和必要脚本。
