# GitHub 配置入口

- workflows/pages.yml：仅用户jyzdreams从main手动触发并通过github-pages环境审批后发布；推送/合并不触发发布。工作流校验触发和重新运行账号，环境限制main。
- main保护：用户账号专属更新规则与禁止删除/非快进规则，由GitHub仓库设置实施；本目录文字或CODEOWNERS不替代服务器权限。
- pull_request_template.md：填写变更依据、范围、验证结果和发布影响，不代替推进Excel。

完整规则见[正式版与工作副本规范](../docs/governance/FORMAL-VERSION-WORKFLOW.md)和[GitHub提交规范](../docs/governance/GITHUB-SUBMISSION-RULES.md)。这里不放客户资料、审计报告或Codex过程产物。
