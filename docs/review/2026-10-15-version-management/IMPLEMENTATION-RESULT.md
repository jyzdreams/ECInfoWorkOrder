# 正式维护版与工作副本管理实施记录

日期：2026-10-15。依据：用户明确要求执行《正式版与同事工作副本管理计划》。

## 范围与当前业务位置

本批仅处理成果保存、正式分支、GitHub权限、手动发布和协作规范；用户已授权本次提交推送及远端配置，没有授权原型发布。
当前恢复内部业务核对，既有17组局部回归不重新计为本批新增；维修整链未通过、0批冻结。Hub/Excel仍需与原型逐项对齐，客户确认、原型修改、业务验收状态保持原样。

## 保存的基线

- 本地开始分支：`codex/github-integration-20261014`，提交 `247c608e621f7be5519805224007a21624ac18e3`。
- 开始时远端main：`f17aca30121ec398df25894644b4c9f216d9e924`。该提交已在本地历史中，不重新采用此前排除的远端业务改动。
- 保存835个已跟踪/未忽略的共享文件，共369,121,949字节，包括当时未提交的知识、Hub、两份Excel、正式评审及证据和新增纸样。原件入库不代表业务已核对或批准。
- 本地保存点：`.codex/official-version-20261015/20261015-222141/`；包含工作文件压缩包、逐文件SHA-256、所有Git分支/标签历史bundle、起始状态、远端原设置。忽略的缓存、依赖和旧备份留在原处，不上传。
- 正式维护版建立后仍使用同一个Excel、prototype/、project-hub/；不创建正式/范本双文件，也不新增任务台账。

## 已配置的远端保护

| 项目 | 结果 | 证据 |
| --- | --- | --- |
| main创建/更新 | 规则25166977，active，仅User ID 5178732（jyzdreams）可绕过 | [规则](evidence/owner-only-rule.json) |
| main历史 | 规则25166991，active，禁止删除和非快进，无绕过者 | [历史规则](evidence/history-rule.json) |
| 正式分支有效规则 | creation/update/deletion/non_fast_forward全部生效 | [main有效规则](evidence/main-effective-rules.json) |
| 同事工作分支 | 不匹配上述规则，现有同事保留write，无新增管理员或凭据共享 | [工作分支](evidence/work-effective-rules.json)、[权限](evidence/collaborator-roles.json) |
| 发布环境 | 仅main分支；移除gh-pages分支放行；jyzdreams审批，禁止管理员绕过 | [环境](evidence/pages-environment.json)、[分支策略](evidence/pages-branch-policy.json) |
| 发布触发 | Pages移除push，仅workflow_dispatch；检查仓库/main/actor/triggering_actor | [发布条件场景](evidence/release-guard-scenarios.json) |

设置期间旧Pages工作流暂时停用，避免基线推送触发旧自动发布。正式基线已按快进推送至main，基线提交为 `859834d46a984a54738f01cea923370d3ad049d0`（完整成果保存提交为 `77b2b04`，随后补充历史证据检查说明）。已核对远端main及Pages文件与本地相同，再恢复手动工作流为active；该基线没有触发Actions运行。本批不dispatch、不审批部署、不发布网站。收尾证据见[远端验证](evidence/final-remote-verification.json)，其后的本记录/证据提交只补充交接信息。

main规则是服务器端限制；同事仍能在自己的本地副本改文件。没有获取或冒用同事账号进行拒绝推送测试，权限结论来自已生效规则、唯一绕过用户和实际协作者角色。发布条件的反例是本地表达式检查，不是实际部署运行。

## 规范与交接

- 新增[正式版与工作副本规范](../../governance/FORMAL-VERSION-WORKFLOW.md)，规定固定提交→三方差异→用户分组采用→选择性整合→验证→正式回填。
- README/AGENTS、团队协作、文件规则、GitHub提交规范、目录职责、知识同步协议及两个应用README共同引用新规范；清理当前入口中的旧暂停/未推送描述歧义，历史报告保留。
- PR模板补充基线、候选提交、用户采用依据、Excel原编号/字段旧新值及底层知识变化。
- 未改变业务事实、需求状态、原型逻辑、Hub机器数据或Excel内容；此前未提交业务成果作为本次保存输入，不冒充本批新增整改。

## 验证

| 检查 | 结果与边界 |
| --- | --- |
| 原始成果保留 | 835个文件中823个内容不变；仅12个规范/README/发布配置文件修改，新规范与本批记录另计；[保留核对](evidence/preservation.json) |
| Excel | 两份工作簿SHA-256不变、ZIP完整性通过，保留原编号/公式/链接；未编辑工作簿 |
| 原型/Hub入口 | 本地18814均HTTP 200，响应与原文件逐字节一致；[入口](evidence/entrypoints.json) |
| Hub路径 | build-v2.js --check-paths：requiredPaths=20、missing=0、uniqueFileIds=786、writes=0；未重建业务数据 |
| 发布YAML | Ruby Psych解析通过；6个本地条件场景通过：仅本人main手动满足条件，同事、工作分支、push、同事重跑、fork均不满足；没有实际dispatch |
| 小批次差异演练 | 隔离仓库两个候选改动，只同步示例获准的措辞，未采纳“待客户→已批准”；[演练说明](SYNC-REVIEW-EXAMPLE.md)、[技术证据](evidence/rehearsal.json) |
| Git/备份 | 本批治理文件git diff --cached --check通过；存量报告/DOM证据含原有行尾空格，保留字节，不改历史证据，见[检查边界](evidence/whitespace-check.json)；压缩包逐文件哈希及Git bundle校验见[备份验证](evidence/backup-validation.json) |

上述演练不是同事真实提交，也不是用户或客户实际批准业务状态。业务17组回归是之前版本的现有证据，本批不重复宣称全链验收通过。

## 中断恢复与完成结论

初次收尾暂存时遇到本机磁盘空间不足，完整成果提交77b2b04已保存，报告修订及一个检查JSON当时仍待暂存。用户随后说明电脑自动关机；恢复后核对835个起始共享文件，未发现意外内容变化，保存点、原Git历史和远端规则均保留，没有清理其他人的文件。
恢复后补交检查说明，完成正式main推送；本地目录切换到main并跟踪origin/main。两个预览入口在原18814端口恢复HTTP 200，Hub只读路径检查仍为20项必需路径无缺失、写入0。
结论：版本管理本批实施完成。三入口业务内容本轮无变化，已有完整成果进入同一个受保护正式基线；这不等于三入口业务内容已全部对齐，也不等于客户定稿。后续同事内容仍须先差异审查、用户采用再同步。

## 后续动作与回退

下一批先按用户逐项核对Hub真实流程，AI分别核原型和主表，说明已对齐/未对齐；同事新成果按新规则先出差异，未经用户采用不进入main。
本次配置的原值和工作文件均在本地保存点。需要撤回内容时由用户授权AI做反向提交；不删除main、不force-push。规则/发布保护若需调整，先记录用户决定并保留原设置，不自动恢复旧自动发布。
