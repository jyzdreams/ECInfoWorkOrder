<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

## 项目执行前置规则（处理 EC 项目前必读）

处理 EC 项目前，必须读取项目 `README.md`，以及 `docs/governance/` 下的：

- `FILE-WRITING-RULES.md`
- `TEAM-COLLABORATION.md`
- `GITHUB-SUBMISSION-RULES.md`

所有文件修改、协作、提交和交接必须遵循这些规则。
无法读取时明确说明，不得声称已经遵守。

## 当前项目文件规则

本项目当前以 `docs/governance/FILE-WRITING-RULES.md` 作为文件写入和目录归类规则。开始创建、移动或生成文件前，必须先读取该文件；如果历史路径与当前目录结构冲突，以用户当前目录和该规则为准，不自动恢复已移动或删除的历史文件。

## 工作流程规范

### 三个日常工作入口与文档分类（2026-10-11用户确定）

1. 先读README.md和docs/governance/FILE-WRITING-RULES.md，从指定入口选当前文件，不因名字“最新/最终”另选基线。
2. 推进使用README指定的内部Excel主台账，不新建平行ai-delivery-board.md、第二套任务总表或手工JSON进度。客户版按编号/版本导出，意见复核后回填。
3. 当前原型只有prototype/，历史原型只对比；修改必须有需求/决定和验收场景，页面存在不反向批准需求。
4. 日常知识入口为project-hub/index.html；底层业务资料在docs/knowledge/。整理文档按docs/knowledge、analysis、audit、review、governance、history六类维护，应用目录仅保留必要简短说明。客户原件materials/、交付文件outputs/和完整备份保留原位置。
5. 分开客户确认、原型修改、业务验收，不以旧表估算或机器完整率替代项目进度。
6. 原件与历史不删除/静默覆盖；无必要不移动。确需移动先核对源/目标/引用，再验路径/哈希，不恢复materials/raw/或旧specs/。
7. 目录整理仅更新位置、引用和Hub路径，不改变业务编号/状态；Excel内容升级、最新规则整合、原型整改仍待完成，不标为Done。Hub旧快照/机器完整率不是实时项目进度。

### 多人协作（2026-10-11）

开始前阅读docs/governance/TEAM-COLLABORATION.md，约定批次、编号、负责文件和整合人。推进Excel每批一人统一回填；同一原型文件和Hub生成文件每批一人主写，保留同事未提交修改，不自行回滚或覆盖。新客户资料统一materials/inbox/，原名原内容；新检查/预览中间产物放.codex/，正式审计/验收证据放docs对应批次，交付材料放outputs/。Hub必要脚本和路径映射唯一维护源为project-hub/scripts/，先运行node project-hub/scripts/build-v2.js --check-paths；本轮目录/治理收尾不运行业务重建。

当前未进入正式开发，没有当前有效开发plan.md；历史计划仅追溯，不为上方历史SpecKit提示恢复旧规格目录。正式开发另按获批准范围和项目宪法建立计划。

### GitHub共享与过程产物（2026-10-12）

提交前读取docs/governance/GITHUB-SUBMISSION-RULES.md。Codex临时产物、工具缓存、本地backups、审计提取缓存、inspect记录和锁文件不提交；正式报告及其引用证据、可复用测试源码和Hub必要工具保留。停止跟踪只处理准确清单，保留本地文件与同事暂存修改，不全目录清空索引。目录/治理任务不擅自创建提交、推送或触发发布。.github/仅维护GitHub配置，业务规范放docs/governance/。

### 任务完成后的交接流程

每次工作结束后，必须执行以下流程：

1. **任务完成确认**：明确告知用户当前任务已完成，并简要总结完成的工作内容
2. **主动询问新任务**：使用 AskUserQuestion 工具弹出对话框，询问用户是否有新的工作任务
3. **保持流程连续性**：通过对话框收集新任务需求，确保任务之间的无缝衔接，不中断当前执行流程

**示例流程**：
- 完成当前任务 → 总结工作内容 → 弹出对话框询问"是否有新的工作任务需要处理？" → 接收新任务 → 继续执行

这样可以确保工作流程的连续性，让用户能够持续下达指令，而不需要重新开始对话或中断当前的工作上下文。
