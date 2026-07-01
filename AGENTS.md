<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

## 工作流程规范

### 任务完成后的交接流程

每次工作结束后，必须执行以下流程：

1. **任务完成确认**：明确告知用户当前任务已完成，并简要总结完成的工作内容
2. **主动询问新任务**：使用 AskUserQuestion 工具弹出对话框，询问用户是否有新的工作任务
3. **保持流程连续性**：通过对话框收集新任务需求，确保任务之间的无缝衔接，不中断当前执行流程

**示例流程**：
- 完成当前任务 → 总结工作内容 → 弹出对话框询问"是否有新的工作任务需要处理？" → 接收新任务 → 继续执行

这样可以确保工作流程的连续性，让用户能够持续下达指令，而不需要重新开始对话或中断当前的工作上下文。
