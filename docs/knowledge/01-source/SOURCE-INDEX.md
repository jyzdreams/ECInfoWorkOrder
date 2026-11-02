# Source Index

## 2026-10-27即时维修最新人工确认

| Source ID | 原始记录 | 身份与适用范围 |
| --- | --- | --- |
| SOURCE-039 | [Michael最新确认：即时维修现场收款与后补报价](../decisions/DEC-20261026-客户业务确认补充.md#instant-followup-20261027) | 用户本轮任务PART A转述Michael人工确认，关键原话已保留；CONFIRM-10-27-01。后补报价前已现场收款，报价组只补报价记录，不再接受／中单／收款；登记、交款、对账、权限及具体系统操作未答。非客户签批，不覆盖普通报价维修或原始会议。 |

## 2026-10-26客户会议与会后人工确认（10/27回灌）

| Source ID | 原始记录 | 身份与适用范围 |
| --- | --- | --- |
| SOURCE-034 | [10/26会议全文1](../../../materials/听记纪要/會議錄製_ECInfo工单定版推进会议20261026.md) | 原始会议转写；包含客户、Michael及团队发言。26:22～27:11客户／合同关系含本轮被纠正的转写，34:18～36:51合同编号／政府分类讨论；不将整篇当客户已确认。 |
| SOURCE-035 | [10/26会议全文2](../../../materials/听记纪要/會議錄製_ECInfo工单定版推进会议2026102602.md) | 原始会议转写；CALL交接、主管选择、师傅任务及车资。14:38～15:37报价交接有歧义，43:15～46:41费用／签署为讨论；本轮按SOURCE-038人工复盘解释，原文保留。 |
| SOURCE-036 | [10/26会议全文3](../../../materials/听记纪要/會議錄製_ECInfo工单定版推进会议2026102603.md) | 原始会议转写；现场报价物件、版本、中单、MR／PO、分阶段采购施工及变更讨论。中单后材料变更没有形成结论，不从会议提案补规则。 |
| SOURCE-037 | [AI纪要1](../../../materials/听记纪要/纪要_會議錄製_ECInfo工单定版推进会议20261026.md)、[AI纪要2](../../../materials/听记纪要/纪要_會議錄製_ECInfo工单定版推进会议2026102602.md)、[AI纪要3](../../../materials/听记纪要/纪要_會議錄製_ECInfo工单定版推进会议2026102603.md) | AI生成的辅助摘要，非独立客户确认。全链路数据库主键、所有车资须收据、材料变更必新MR等归纳不得作为当前业务结论。 |
| SOURCE-038 | [10/26 Michael会后人工确认](../decisions/DEC-20261026-客户业务确认补充.md) | 用户提供的2026-10-26会后业务复盘；20项CONFIRM-10-26-01～20及OPEN-10-26-01，项目负责人基于现场沟通确认，不是客户正式签字。分别保存原始表达、AI纪要、Codex推断、人工确认及未决身份。 |

听记可能存在转写／语义误差，当前明确事项按SOURCE-038现场复盘解释处理；[新旧适用边界](../decisions/DEC-20261026-客户业务确认补充.md#legacy-scope)保留旧判断及其出处。只登记知识来源，不改原件、旧FILE／FLOW／REQ编号，不重建Hub或机器索引；下方统计与对应日期描述仍为历史快照，不是当前客户签批或项目进度。

## 2026-10-25业务模型确认增量

| Source ID | 原始记录 | 身份与适用范围 |
| --- | --- | --- |
| SOURCE-033 | [DEC-20261025业务模型确认](../decisions/DEC-20261025-业务模型确认.md) | 项目用户最新明确确认，CONFIRM-01～08；P/M/M+P核心分类、P内路径、M→P转换、来源及CM归属。不是客户签批或业务整链验收；旧Source、Decision和剩余未决保留。Hub仅定向投影到01及内部00，不全量改写其他页面数据。 |

本索引是知识总览的来源下钻入口，不复制原件。2026-10-12逐条核对0928/0930工作副本，39项进入明确记录/待决要求；新范围、客户问题和本轮复核有独立出处。确认身份与一期批准仍待核对。历史统计保留对应快照。

## Source 统计

下表是2026-09-27机器扫描快照，非当前全盘实时统计；新增来源登记不自动改变机器计数。

| Source 类别 | 数量 | 处理方式 |
| --- | ---: | --- |
| Original Source | 78 | 保留原路径，通过本索引和 Project Hub 进入 |
| Legacy Source | 37 | 保留历史路径，状态为 LEGACY KNOWLEDGE / 历史资料 |
| Source Reference | 3 | 保留参考资料路径，不自动升级为业务事实 |
| 合计 | 118 | 本轮未复制、未移动 |

`file-index.json` 的每条记录包含：File ID、文件名、原始路径、类型、类别、修改时间、交付状态、关联 Fact、关联 Decision、关联 Flow、关联 Requirement 和关联 PAGE。它是机器侧完整 Source Index。

## 当前有效业务基线主要来源

下表使用知识层的 `SOURCE-xxx` 别名，同时保留 Project Hub 的原始 `FILE-xxx` ID。别名只用于人类阅读，不替换机器索引中的 File ID。

| Source ID | 原始文件 | 原始路径 | 类型 / 状态 | 关联 Fact / Decision |
| --- | --- | --- | --- | --- |
| SOURCE-001 | 2026-09-27 真实业务流程讨论 | `docs/knowledge/decisions/DEC-20260927-真实业务流程讨论.md` | Decision / READY | FACT-001～017；CONFIRMED-001～017、PENDING-001～002、REJECTED-001 |
| SOURCE-002 | 0702 原始听记 | `materials/听记纪要/0702_original_text.txt` | Original Source / READY | FACT-LEGACY-008、011～013、015、016、021、022；当前流程 Decision 由 SOURCE-001 统一确认 |
| SOURCE-003 | 0702 提取文本 | `materials/听记纪要/0702_extracted.txt` | Original Source / READY | 当前无结构化关联，保留为原始辅助资料 |
| SOURCE-004 | EC 项目沟通与 Demo 演示（2026-01-30） | `materials/听记纪要/纪要_ECInfo-dingtalk項目溝通和demo演示20260130.pdf` | Original Source / READY | 历史区域、照片、MR/采购等规则；关联 FACT-LEGACY-005、008、010、016、018 |
| SOURCE-005 | 报价方案和 POC 反馈沟通（2026-03-26） | `materials/听记纪要/纪要_ECInfo-dingtalk報價方案和POC反饋溝通20260326.pdf` | Original Source / READY | 历史 CALL、PM/CM、照片、编号和权限规则 |
| SOURCE-006 | 报价方案和 POC 反馈沟通（2026-03-26，补充） | `materials/听记纪要/纪要_ECInfo-dingtalk報價方案和POC反饋溝通20260326（2）.pdf` | Original Source / READY | 历史账号、拒单、照片和 PM/CM 冲突规则 |
| SOURCE-007 | EC 方案报价沟通（2026-05-04） | `materials/听记纪要/纪要_20260504 EC方案报价沟通.pdf` | Original Source / READY | 历史 HR / 范围背景，当前未形成 Confirmed Decision |
| SOURCE-008 | ECInfoTech2 沟通 | `materials/听记纪要/纪要_ECInfotech2.pdf` | Original Source / READY | 一线移动端、极简使用等历史事实 |
| SOURCE-009 | ECInfoTech-Dingtalk 沟通 | `materials/听记纪要/纪要_ECInfoTech-Dingtalk溝通.pdf` | Original Source / READY | 图片容量、报告归档等历史事实 |
| SOURCE-010 | 功能字段参考表 | `materials/参考文档/EC工单系统-功能字段一览表.docx` | Source Reference / PARTIAL | 参考字段，不单独确认业务规则 |
| SOURCE-011 | 当前 2.0 Prototype | `prototype/index.html` | Prototype / PARTIAL | 仅为设计交付物和验证证据，不反向定义业务 |
| SOURCE-012 | 9/19历史需求草案 | `materials/歷史原型/ec-workorder/12-requirements-latest-20260919.md` | Legacy PRD / DRAFT | 当前路径校正，80条历史REQ仍待确认，不批准旧内容 |
| SOURCE-013 | 旧流程与原型对齐审计 | `docs/audit/2026-09-26/08-sop-prototype-requirements-alignment-audit.md` | Requirement Reference / DRAFT | 历史冲突、Open Question 和范围审计 |
| SOURCE-014 | CS/报价/会计沟通笔记0928 | `materials/溝通筆記/ec+cs+報價組+會計0928.docx` | 沟通工作副本 / 原文逐项核对，批准未确认 | UPD逐条关联原段落；不新建客户批准Decision，明确诉求与未决细则分开 |
| SOURCE-015 | 原型/仓库/CR沟通笔记0930 | `materials/溝通筆記/ec原型+倉庫+cr0930.docx` | 沟通工作副本 / 原文逐项核对，批准未确认 | UPD逐条关联原段落；“能否自主SR”仍待决定，不当已批准入口 |
| SOURCE-016 | 10/07定版前审计 | `docs/audit/PROTOTYPE-FINALIZATION-AUDIT.md` | 内部审计 / NOT READY | 差异/任务输入，不当客户决定或项目完成率 |
| SOURCE-017 | 指定内部推进总表 | `outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/03-项目推进资料/EC工单系统项目推进总表.xlsx` | 旧内部主台账 / 本轮升级基准 | 旧版原件保留；当前维护入口由README指定新版，不沿用旧完成度 |

| SOURCE-018 | 10/12最新沟通要求逐条核对 | `docs/knowledge/03-business/LATEST-REQUIREMENTS-20261012.md` | 内部整理 / 39项原文核对 | UPD-001～039；沟通副本L3，不替代客户范围批准 |
| SOURCE-019 | 10/12当前原型准备复核 | `docs/review/2026-10-12-finalization-prep/PREPARATION-REVIEW.md` | 当前UI复核 / 有明确验证边界 | 40个审计编号保留；Objective子项验证，不计全链UAT |
| SOURCE-020 | 本批客户范围与关键问题确认表 | `outputs/2026-10-12-finalization-prep-v1/EC工单系统客户范围与关键问题确认表-v1.xlsx` | 客户评审导出 / 未填写客户结论 | SCOPE-01～09、C-01～16、UPD-001～039共用编号；复核后回填 |
| SOURCE-021 | 原内部项目推进总表v2（10/19冻结） | `outputs/2026-10-12-finalization-prep-v1/EC工单系统项目推进总表-v2.xlsx` | 历史内部主表 / 10/19迁移至SOURCE-030，原件冻结 | 保留旧功能/TASK/PEND/UAT编号；三状态和证据分开，不估算百分比 |
| SOURCE-022 | 10/13公共基础与第一维修链内部核对 | `docs/knowledge/03-business/B01-B02-INTERNAL-BASELINE-20261013.md` | 内部核对 / 用户说明与客户批准分开 | 新增成交维修CP、保养/CALL上门SR；CP先交主管，主管确认更新状态、其他角色查看、财务独立三次用户原话。交付/打印C-08、七位+1细则C-09、材料C-04待客户；内部说明非客户签批 |
| SOURCE-023 | 10/13首批实际UI走查 | `docs/review/2026-10-13-b01-b02-internal/INTERNAL-REVIEW.md` | 内部评审 / 未通过 | CS/CR/QUO/PUR等实际入口，材料断点及8项问题；检索子项通过不算全链通过 |
| SOURCE-024 | 10/13明确问题整改与复测 | `docs/review/2026-10-13-b01-b02-internal/REMEDIATION-RESULT.md` | 内部整改 / 限定子项通过 | 普通CR区域、客户联动、CS转交、QUO负责人；完整链与客户验收未通过 |
| SOURCE-025 | C-04材料衔接核对与内部候选 | `docs/review/2026-10-13-b01-b02-internal/MR-DECISION-CANDIDATE.md` | 内部候选 / 备齐岗位与单据待客户 | 已准备C-04小问题；仓管仅出库/出库确认备齐仍未批准，不继续向用户重复追问、不默认出库即备齐或MR完成 |
| SOURCE-026 | 10/13报价条款及交付分页局部整改复测 | `docs/review/2026-10-13-b01-b02-internal/QUOTATION-REMEDIATION-RESULT.md` | 内部整改 / 限定子项通过 | TASK-045进行中；保固承接、截止日期保存清空、两个新增入口默认显示及重绘后分页；编号/有效期细则与完整链未通过 |
| SOURCE-027 | 10/14材料申请/备齐/首次派工核对与整改 | `docs/review/2026-10-14-material-handoff/MATERIAL-HANDOFF-REVIEW.md` | 内部整改 / 限定子项通过 | 追加纸单准备/现场/回交三环节核对与C-08交付岗位客户问句；本轮原型不改，既有局部证据保留；发号/打印/OCR与003整链未通 |
| SOURCE-028 | 10/14 SR往返/正式完工/财务接件走查 | `docs/review/2026-10-14-sr-finance/SR-FINANCE-WALKTHROUGH.md` | 内部整改 / 限定子项通过 | 旧001仅SR重列通用技术证据，不计维修通过；新002 CP维修清单/提交、主管确认及CR/财务共享完成状态局部复测。票款独立，未开票/收款，不替代003/正式预约/打印或客户验收 |
| SOURCE-029 | 10/16业务流程核对用户回答 | `docs/knowledge/03-business/BUSINESS-CLARIFICATIONS-20261016.md` | 用户对话 / L3内部说明及候选，非客户签批 | 17项原话定位；报价分工、自主报价、即时维修、保养、CM与标书组；待客户子问题回既有C编号，原型未改、整链未通过 |

## 历史与 Legacy Knowledge

以下内容不移动、不删除，继续作为历史证据：

- `knowledge-base/data/knowledge-base.json`：228 个历史 Source、28 条历史 Rule、80 条历史 Requirement、17 个 PAGE、22 个历史问题和 12 个角色。
- `knowledge-base/` 下的旧页面和旧数据：状态为 `LEGACY KNOWLEDGE`，不能覆盖 `03-business/` 的当前 Baseline。
- materials/歷史原型/下的旧PRD/原型/项目资料为历史来源；机器索引可能保留materials/raw/失效路径，以当前实际路径为准。
- `backups/`、`docs/review/`、`archive/`：备份、检查证据和归档，不是当前事实源。

## 未移动的文件清单口径

本轮没有移动任何原始 Source、Decision、PRD、Prototype、SDD、TDD 或 Test 文件。原始资料按原路径访问；如果需要从某条业务规则下钻，先使用本索引的 Source 别名，再通过 `project-hub/data/file-index.json` 获取精确 File ID 和路径。

## Source 追溯规则

- 当前 Confirmed 业务基线主要回溯到 `SOURCE-001`。
- 历史资料只作为背景或冲突证据，不能自动替代当前 Decision。
- 没有明确 Source 的业务陈述不得进入当前 Baseline。
- 新增 Source 时先登记原始路径、类型、日期和状态，再挂到 Fact / Decision / Flow。

- SOURCE-014/015文件名含0928/0930，精确会议日期、确认人及范围须回查，不以文件名/登记日期代替客户批准日期。

2026-10-14 SOURCE-022新增主管派工备注/电话沟通原话；SOURCE-028增量记录移动备注保存、师傅读取和刷新保留。旧独立日期为空不作时间未约好的充分证据，未触发客户签批或整链通过。

| SOURCE-030 | 当前内部工作记录 | `docs/review/project-work/WORK-REGISTER.json` | 2026-10-19用户批准的唯一内部推进维护源 | 原45个TASK、7个批次及16个UAT迁入，客户表与Hub投影；不证明业务批准或验收 |
| SOURCE-031 | 客户业务推进与确认表v1 | `outputs/2026-10-19-client-progress-v1/EC工单系统客户业务推进与确认表-v1.xlsx` | 客户草案 / 尚未发出 | 7个业务批次、8个当前客户问题主题，反馈复核后回SOURCE-030及知识，不包含全部内部TASK |
| SOURCE-032 | 10/20定稿前逐轮业务说明 | `docs/knowledge/03-business/BUSINESS-CLARIFICATIONS-20261020.md` | 用户对话 / L3内部说明，非客户签批 | Q5明确M保养（本轮也称保固）、P维修、M+P维修加保养，三类均收费；纠正前几轮返修解释和MR候选。Q6已确认SR原“保固期”选项也指M保养，Q7明确保养发现换电源转P报价→中单MR到仓管→缺货采购→备齐派工，原M含料分流候选撤回；Q8明确采购知会备货状态不一定有办理节点，与缺料实际采购分开；采购含义已说明；Q9首期暂按合同起始月、待客户核实；Q10各次上门时间可自定义，季度4次为本例；Q11到期未完成暂按原合同补做，明确待客户核实，不授权任意增删次数或合同自动延期；不全局替换保固年限。TASK-051/052及原C/REQ/FLOW编号保留 |
