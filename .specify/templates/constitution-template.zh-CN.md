# [PROJECT_NAME] 项目宪法（Constitution）
<!-- 示例（Example）: Spec Constitution、TaskFlow Constitution 等 -->

## 核心原则（Core Principles）

### [PRINCIPLE_1_NAME]
<!-- 示例（Example）: I. Library-First（库优先） -->
[PRINCIPLE_1_DESCRIPTION]
<!-- 示例（Example）: 每个功能都从独立库开始；库必须自包含、可独立测试、有文档；必须有清晰目的，不能只为了组织结构而创建库 -->

### [PRINCIPLE_2_NAME]
<!-- 示例（Example）: II. CLI Interface（命令行接口） -->
[PRINCIPLE_2_DESCRIPTION]
<!-- 示例（Example）: 每个库都通过 CLI 暴露功能；文本输入/输出协议：stdin/args -> stdout，错误 -> stderr；支持 JSON 和人类可读格式 -->

### [PRINCIPLE_3_NAME]
<!-- 示例（Example）: III. Test-First (NON-NEGOTIABLE)（测试优先，不可协商） -->
[PRINCIPLE_3_DESCRIPTION]
<!-- 示例（Example）: 强制 TDD：先写测试 -> 用户批准 -> 测试失败 -> 再实施；严格遵循 Red-Green-Refactor（红-绿-重构）循环 -->

### [PRINCIPLE_4_NAME]
<!-- 示例（Example）: IV. Integration Testing（集成测试） -->
[PRINCIPLE_4_DESCRIPTION]
<!-- 示例（Example）: 需要重点做集成测试的范围：新库契约测试、契约变更、服务间通信、共享 schema（数据结构/模式） -->

### [PRINCIPLE_5_NAME]
<!-- 示例（Example）: V. Observability（可观测性）, VI. Versioning & Breaking Changes（版本与破坏性变更）, VII. Simplicity（简单性） -->
[PRINCIPLE_5_DESCRIPTION]
<!-- 示例（Example）: 文本输入/输出便于调试；必须结构化日志；或：MAJOR.MINOR.BUILD 版本格式；或：保持简单，遵循 YAGNI（You Aren't Gonna Need It，避免过早设计）原则 -->

## [SECTION_2_NAME]
<!-- 示例（Example）: Additional Constraints（附加约束）、Security Requirements（安全要求）、Performance Standards（性能标准）等 -->

[SECTION_2_CONTENT]
<!-- 示例（Example）: 技术栈要求、合规标准、部署策略等 -->

## [SECTION_3_NAME]
<!-- 示例（Example）: Development Workflow（开发流程）、Review Process（评审流程）、Quality Gates（质量门禁）等 -->

[SECTION_3_CONTENT]
<!-- 示例（Example）: 代码评审要求、测试门禁、部署审批流程等 -->

## 治理（Governance）
<!-- 示例（Example）: 宪法优先于其他实践；修订必须包含文档记录、批准和迁移计划 -->

[GOVERNANCE_RULES]
<!-- 示例（Example）: 所有 PR/review（拉取请求/评审）必须验证合规性；复杂度必须说明理由；运行时开发指引见 [GUIDANCE_FILE] -->

**版本（Version）**: [CONSTITUTION_VERSION] | **批准日期（Ratified）**: [RATIFICATION_DATE] | **最后修订（Last Amended）**: [LAST_AMENDED_DATE]
<!-- 示例（Example）: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
