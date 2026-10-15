# Source Index

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
| SOURCE-021 | 当前项目推进总表v2 | `outputs/2026-10-12-finalization-prep-v1/EC工单系统项目推进总表-v2.xlsx` | 当前内部唯一主台账 / 原6页升级 | 保留旧功能/TASK/PEND/UAT编号；三状态和证据分开，不估算百分比 |
| SOURCE-022 | 10/13公共基础与第一维修链内部核对 | `docs/knowledge/03-business/B01-B02-INTERNAL-BASELINE-20261013.md` | 内部核对 / 用户说明与客户批准分开 | 新增成交维修CP、保养/CALL上门SR；CP先交主管，主管确认更新状态、其他角色查看、财务独立三次用户原话。交付/打印C-08、七位+1细则C-09、材料C-04待客户；内部说明非客户签批 |
| SOURCE-023 | 10/13首批实际UI走查 | `docs/review/2026-10-13-b01-b02-internal/INTERNAL-REVIEW.md` | 内部评审 / 未通过 | CS/CR/QUO/PUR等实际入口，材料断点及8项问题；检索子项通过不算全链通过 |
| SOURCE-024 | 10/13明确问题整改与复测 | `docs/review/2026-10-13-b01-b02-internal/REMEDIATION-RESULT.md` | 内部整改 / 限定子项通过 | 普通CR区域、客户联动、CS转交、QUO负责人；完整链与客户验收未通过 |
| SOURCE-025 | C-04材料衔接核对与内部候选 | `docs/review/2026-10-13-b01-b02-internal/MR-DECISION-CANDIDATE.md` | 内部候选 / 备齐岗位与单据待客户 | 已准备C-04小问题；仓管仅出库/出库确认备齐仍未批准，不继续向用户重复追问、不默认出库即备齐或MR完成 |
| SOURCE-026 | 10/13报价条款及交付分页局部整改复测 | `docs/review/2026-10-13-b01-b02-internal/QUOTATION-REMEDIATION-RESULT.md` | 内部整改 / 限定子项通过 | TASK-045进行中；保固承接、截止日期保存清空、两个新增入口默认显示及重绘后分页；编号/有效期细则与完整链未通过 |
| SOURCE-027 | 10/14材料申请/备齐/首次派工核对与整改 | `docs/review/2026-10-14-material-handoff/MATERIAL-HANDOFF-REVIEW.md` | 内部整改 / 限定子项通过 | 追加纸单准备/现场/回交三环节核对与C-08交付岗位客户问句；本轮原型不改，既有局部证据保留；发号/打印/OCR与003整链未通 |
| SOURCE-028 | 10/14 SR往返/正式完工/财务接件走查 | `docs/review/2026-10-14-sr-finance/SR-FINANCE-WALKTHROUGH.md` | 内部整改 / 限定子项通过 | 旧001仅SR重列通用技术证据，不计维修通过；新002 CP维修清单/提交、主管确认及CR/财务共享完成状态局部复测。票款独立，未开票/收款，不替代003/正式预约/打印或客户验收 |

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
