# ECInfoWorkOrder 当前状态与 Session 交接

更新时间：2026-11-01

本文件是供新 Session 使用的短期交接快照，不替代唯一内部工作记录、业务知识源或逐页推进表。当前整理只读取状态和 Git；未修改原型、Hub、推进主记录，也未运行测试。

## 当前项目位置

以 [内部工作记录](../../review/project-work/WORK-REGISTER.json) 为任务状态源：

- 项目仍在**业务流程确认阶段**。当前记录写明 04-03～11 已完成人工评审，04-12 待评审；04 未整体冻结，一期范围未批准，维修整链尚未全部检查通过，正式定稿为 0 批。
- TASK-052（核对全部业务流程与规则）、TASK-051（处理未明确业务问题）、TASK-040（按角色走通同一单维修）仍在进行中。C-04 仍为阻塞；C-10 及其他客户问题仍待客户正式核实。局部检查结果不能代表整链通过。
- 同一工作记录存在需先核对的当前位置差异：`project.currentBatch` 写 04-12 待评审，但 `userAction` 指向用户评审 04-04 CALL。新 Session 不应自行推断哪项是当前下一步。
- [逐页推进表](../../review/2026-10-31-prototype-plan/原型逐页验证与修改推进表.md)记录 V012（新增 CALL）为 P1、等待人工决定；其余 127 页为 P0。该表明确禁止把旧的 22 页批量修改建议当作授权。
- [V012 页面 Gate](../../review/2026-10-31-prototype-plan/Page-Gate-V012-新增CALL.md)的结尾仍写“等待人工决定”，没有修改原型或进入下一页的授权记录。

## Git 与文件状态（本次读取时）

- 仓库：`/Users/xiaoxiangruanjian/Documents/AICoding/ec-workorder`；分支 `main`，HEAD 为 `2ef0f0b`（`docs: record adopted tzz prototype sync`）。本地 `origin/main` 比 HEAD 超前 1 个提交：`53d6def`（`feat: adopt approved tzz prototype updates`）。本次没有拉取、合并或改动 Git 历史。
- 暂存区为空。工作区有 33 个已跟踪文件的未提交改动，`git diff --stat` 约为 15,808 行新增、2,391 行删除；另有多组未跟踪文件。
- 作为状态源的 `docs/review/project-work/WORK-REGISTER.json` 位于未跟踪目录 `docs/review/project-work/` 中，目前只存在于本地工作区，尚未包含在提交里。
- 改动涉及 `prototype/`、`project-hub/`、`docs/`、`materials/` 与 `outputs/`。`prototype/index.html` 当前相对提交有大范围差异，和 10/31 推进表记录的原型基线不同；这些变动的来源、对应批准范围及验证状态尚未在本次整理中逐项归属。
- 本地存在未跟踪文件 `outputs/2026-11-01-prototype-qa/EC工單系統_原型完整測試報告_20261101.xlsx`。本次未读取该工作簿，不能据文件存在推定它对应当前原型版本或代表验收通过。
- 保留所有本地改动。不要用 `pull`、`reset`、`clean`、覆盖、提交、推送或发布来“整理”这份工作区；先只读核对差异和来源。

## 长 Session 可确认的结论

- 引用的 ChatGPT 对话明确建议：以仓库实际内容、Git、现有项目文档和当前 Session 已确认内容整理；区分已确认、待确认、历史方案；只保留新 Session 继续工作所需的信息；不要把临时进度写进 `AGENTS.md`。
- 可读取到的旧 Codex Session「修改原型细节」最近处于中断状态。其进度文字提到只处理分派中心两个显示文案，但没有完成消息、准确目标文案或验证结果。因此这项小改也不能标为完成；恢复前应检查原始要求和当前 diff。
- 项目规则要求分别记录客户确认、原型修改、业务验收。原型已修改、局部检查通过或生成测试报告，都不能自动改写客户批准和业务验收状态。

## 新 Session 最少读取

先按 [AGENTS.md](../../../AGENTS.md) 和 [README.md](../../../README.md) 执行项目入口规则；其中规定必须读取以下治理文件：

- `docs/governance/FILE-WRITING-RULES.md`
- `docs/governance/TEAM-COLLABORATION.md`
- `docs/governance/GITHUB-SUBMISSION-RULES.md`
- `docs/governance/FORMAL-VERSION-WORKFLOW.md`
- `docs/governance/WORK-AND-CLIENT-VIEWS.md`

然后读取本交接文件和 `docs/review/project-work/WORK-REGISTER.json`。只有选定下一项具体工作后，再读取那一页对应的 Gate、来源和代码；不要重扫整个知识库或全量原型。

## 新 Session 启动提示词

```text
继续 ECInfoWorkOrder。先按 AGENTS.md、README.md 和其规定的治理文件开工，再读 docs/history/2026-11/01-session-handoff.md 与 docs/review/project-work/WORK-REGISTER.json。

本轮先只读核对：列出当前 main 相对 origin/main 的提交差异、暂存区、所有未提交改动，并判断哪些改动与现有推进记录及 V012 Gate 冲突。保留全部本地文件，不拉取/合并、不清理/重置、不提交/推送/发布，不修改原型或 Hub，不运行大范围测试。

请先给出改动归属与状态冲突清单。特别核实：工作记录中“04-12 待评审”和“待用户评审 04-04 CALL”的下一步差异；10/31 原型基线与当前 prototype/index.html 的差异；2026-11-01 测试报告对应的原型版本。不要把未完成或未验证事项写成已完成，不自行挑选业务基线。完成核对后停下，等我确定下一项工作。
```
