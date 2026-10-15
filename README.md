# EC 工单系统项目入口

更新日期：2026-10-15。当前阶段：首批内部核对与原型走查，尚未进入生产开发。用户已指定当前AI（Codex）作为项目经理推进；具体业务先逐项向用户核实，用户也无法回答的部分再整理给客户。

## 正式版与同事工作副本（2026-10-15）

**正式维护版为GitHub main，由你（jyzdreams）及你授权的AI维护。同事只在各自克隆的工作分支修改。** 三个入口路径不变，不在目录中复制第二套“正式/范本”文件。先由AI列明同事修改前后、依据和影响，你选择采用/暂缓/不采用，再同步正式版；Excel按原编号回填，Hub先核底层知识再生成。

所有同事及其AI先读[正式版与工作副本规范](docs/governance/FORMAL-VERSION-WORKFLOW.md)、[团队协作规范](docs/governance/TEAM-COLLABORATION.md)和[GitHub提交规范](docs/governance/GITHUB-SUBMISSION-RULES.md)。完整规则适用于任何AI工具。GitHub main更新仅允许你的账号，禁止删除/非快进改写；原型改为你手动发布并经你的环境审批，推送不自动上线。[本批实施与验证](docs/review/2026-10-15-version-management/IMPLEMENTATION-RESULT.md)记录实际设置和边界。

当前已恢复内部需求/流程核对。原型已有17组局部回归通过，维修整链仍未通过、0批冻结；Hub和Excel尚未全量对齐原型最新修改。本轮版本治理不改变业务状态。此前选择性整合和本地Git合并分别见[10/14整合](docs/review/2026-10-14-github-integration/INTEGRATION-RESULT.md)、[10/15更新](docs/review/2026-10-15-github-update/UPDATE-RESULT.md)、[Git合并](docs/review/2026-10-15-git-merge/MERGE-RESULT.md)，其中未推送/暂停等描述只代表当时批次。

## 日常只看三个入口

| 入口 | 打开 | 负责什么 |
| --- | --- | --- |
| 推进 Excel | [内部项目推进总表v2](outputs/2026-10-12-finalization-prep-v1/EC工单系统项目推进总表-v2.xlsx) | 当前唯一内部维护源；原6页和旧编号保留，按七批分别记录确认/修改/验收 |
| 当前原型 | [prototype](prototype/index.html) | 页面、操作、状态和角色交接；唯一当前原型，2.0评审版 |
| 项目知识中心 | [Project Hub](project-hub/index.html) | 业务全景、流程、需求、来源、决定和待确认问题；日常知识查看入口 |

当前请用户审查：[7组局部流程审查清单](docs/review/2026-10-14-user-review/INTERNAL-REVIEW-CHECKLIST.md)，含入口/岗位/样例/操作/判断标准。先看A5派工备注、A6维修完工纸；不是整链或客户签收，意见复核后回填同一Excel。

日常先看推进表的“项目总览”：首页优先展示本轮三件事、责任方、完成条件、排期和入口。状态与日期按任务编号从“推进明细”读取；实际姓名或时间未定时保持待指定/待排期。七批状态在首页下方，其他五页供团队维护与按需追溯。公共基础的材料准备是该批次的当前一步，不表示整个批次已定稿。

[本批客户范围与关键问题确认表](outputs/2026-10-12-finalization-prep-v1/EC工单系统客户范围与关键问题确认表-v1.xlsx)供本期范围和关键规则评审：9个范围项、16个客户决策主题、39项已记录要求。客户选择、结论、确认人和日期留待实际填写，反馈复核后回填主台账，不是另一份需求维护源。

9/27结构化客户需求表作为后续字段/页面逐批核对的历史底稿，旧流程与预填错误未作本轮签字材料。旧内部推进总表保留原件，自本批起停止日常维护，不能沿用旧完成度。

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
- 推进Excel以同一v2继续维护，保留80个存量REQ及39项增量要求。TASK-039资料核对、TASK-042/043两组明确整改已完成；TASK-040维修整链仍进行中，TASK-041改为一问一例引导，TASK-044材料归口候选进行中，TASK-045已开始并完成[报价条款/交付分页局部整改](docs/review/2026-10-13-b01-b02-internal/QUOTATION-REMEDIATION-RESULT.md)，整体仍进行中。UAT-02/11/16仍部分执行，UAT-03未通过；客户签收待确认，0批冻结。
- Hub已接入39项0928/0930工作副本要求和16个客户决策主题，保留旧80REQ、17条讨论结论及旧问题定位；一期范围未批准，来源工作副本不擅自升级为客户正式确认。
- 当前原型与10/07审计版本不同；[10/12复核](docs/review/2026-10-12-finalization-prep/PREPARATION-REVIEW.md)为该版本局部结果。10/13按明确依据修改CR读取、客户控件联动和既有报价交接/负责人，限定内部复测通过，仍没有全链或客户UAT签收。
- [10/14材料交接核对与整改](docs/review/2026-10-14-material-handoff/MATERIAL-HANDOFF-REVIEW.md)区分MR申请结果和材料备齐；新MR按用户授权显示申请已完成（演示）、材料待备货。师傅显示、PC/移动首次派工门槛及主管移动查看入口已局部复测，真实审批/备齐回写和出发前服务单未闭环；TASK-044进行中/已修改，UAT-03仍未通过。
- [10/14单据分流与主管完工](docs/review/2026-10-14-sr-finance/SR-FINANCE-WALKTHROUGH.md)：用户明确成交维修CP、保养/CALL上门SR；002 CP清单/提交→指定主管核对确认→CR和财务读取共享完成状态已局部复测，票款独立。旧001仅SR不计报价维修验收，通用技术证据保留。正式预约/打印/材料003整链未通，UAT-03未通过，UAT-12/13部分执行，客户待确认。
- [10/07定版前审计](docs/audit/PROTOTYPE-FINALIZATION-AUDIT.md)为NOT READY；原型整改、客户确认和真实业务验收仍待完成。
- [10/13内部核对](docs/knowledge/03-business/B01-B02-INTERNAL-BASELINE-20261013.md)整理27个检查点；[初查](docs/review/2026-10-13-b01-b02-internal/INTERNAL-REVIEW.md)保留8项记录，[整改复测](docs/review/2026-10-13-b01-b02-internal/REMEDIATION-RESULT.md)保存两组修改、真实UI步骤及未执行边界。姓名检索、主要CR读取、新来源CS→CR→QUO子项通过，MR/正式预约及下游未通过，不能当整链定稿。
- 历史文件中的原路径和旧结论保留版本身份，查现址见[搬移记录](docs/governance/DOCUMENT-MIGRATION-20261011.md)。

## 后续推进顺序

每批先由团队核对需求与流程、走查实际原型，整理断点与候选方案；业务不清楚时先逐项问用户，用户也回答不了或复核后仍有缺口的部分记录后再集中问客户。已明确部分内部整改并复测，形成可解释、可演示的方案后，再请客户确认范围和真正未决的规则。客户选择后补齐受影响的交互，执行业务验收并记录冻结版本。澄清不能称为定稿签收，也不由AI自动对外联系。
分别记录客户确认、原型修改、业务验收，不能互相代替；Hub项目状态展示不另维护一套Excel进度。

开始写文件前阅读[文件写入规则](docs/governance/FILE-WRITING-RULES.md)。正式开发另按批准范围和[项目宪法](.specify/memory/constitution.md)建立计划，不恢复失效的materials/raw/或旧specs/。

新客户资料先放materials/inbox/；新检查中间产物放.codex/，正式交付仍在outputs/。Hub必要脚本及路径映射在project-hub/scripts/，可随项目版本管理；旧.codex入口仅兼容转发。正式基线与交接范围以本批实施记录和Git提交为准；后续本地未提交内容须明确列出，不能直接宣称已进入正式版。

## 现在需要的下一步

用户已确认先内部走通，再客户定稿；业务先逐项问用户，用户也不清楚的才记录问客户。已说明：MR是材料申请，正常仓库通审批通过后结果回EC，演示直接申请已完成不等于备齐；主管在EC可见待安排，材料备齐后派施工；师傅带材料和Service Report去现场。最新“仓管应该仅负责出库，在出库环节确认备齐”是用户倾向，且明确需客户核实，不能继续把仓管承担备货/最终确认描述为已确定规则。原话与替代边界见[SOURCE-022](docs/knowledge/03-business/B01-B02-INTERNAL-BASELINE-20261013.md)。

当前[C-04材料归口](docs/review/2026-10-13-b01-b02-internal/MR-DECISION-CANDIDATE.md#c-04-客户待确认备齐确认的岗位与单据2026-10-14)、[C-09七位+1编号细则](docs/review/2026-10-14-material-handoff/MATERIAL-HANDOFF-REVIEW.md#七位编号候选与纸单回录兼容2026-10-14)均待客户，尚未发送。师傅先到公司领Service Report再去现场已获说明；[CR/主管交付候选及C-08问句](docs/review/2026-10-14-material-handoff/MATERIAL-HANDOFF-REVIEW.md#师傅公司领单与交付岗位候选2026-10-14)留待用户后续客户核实，不从交付岗位推定打印权限。

三问已由用户回答：成交维修用CP，保养/CALL上门用SR；维修CP先交主管，主管确认完工更新状态，其他角色按权限查看，财务独立。不重复问同项；内部说明不是正式客户批准。Codex已局部验证002 CP链，下一步继续同源正式预约、材料003与出发前打印/领单，并修提交回跳及无物料显示。C-04材料归口、C-08打印/交付及补证、C-09发号细则保持待客户；不把独立样例当整链验收。每轮回填同一主表、同步Hub并汇报三入口实际变化；客户版v1保留原批次快照。

2026-10-14最新派工交接：用户明确主管派工备注记录约定时间/事项、通常电话沟通，独立预约日期栏不作为完成条件。移动备注保存及师傅读取/刷新已局部复测；下一步核出发前打印/领单和材料003。前文旧正式预约断点按最新SOURCE-022/028解释，不改变整链未通过或客户批准状态。
