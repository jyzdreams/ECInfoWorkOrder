# 功能规格: [FEATURE NAME]

**功能分支（Feature Branch）**: `[###-feature-name]`

**创建日期（Created）**: [DATE]

**状态（Status）**: Draft

**输入（Input）**: 用户描述: "$ARGUMENTS"

## 用户场景与测试 *(mandatory，必填)*

<!--
  IMPORTANT（重要）: 用户故事应按重要性排序，形成优先级明确的用户旅程。
  每个用户故事/旅程必须可以独立测试，也就是说，即使只实现其中一个故事，
  也应该能形成有价值的 MVP（Minimum Viable Product，最小可行版本）。

  为每个故事分配优先级（P1、P2、P3 等），其中 P1 是最高优先级。
  每个故事都应是一个可独立交付的功能切片，能够：
  - 独立开发
  - 独立测试
  - 独立部署
  - 独立向用户演示
-->

### 用户故事 1 - [Brief Title]（优先级: P1）

[用业务语言描述该用户旅程]

**为什么是该优先级**: [说明该故事的价值，以及为什么是当前优先级]

**独立测试**: [说明如何独立测试，例如“可通过 [specific action] 完整测试，并交付 [specific value]”]

**验收场景**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### 用户故事 2 - [Brief Title]（优先级: P2）

[用业务语言描述该用户旅程]

**为什么是该优先级**: [说明该故事的价值，以及为什么是当前优先级]

**独立测试**: [说明如何独立测试]

**验收场景**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### 用户故事 3 - [Brief Title]（优先级: P3）

[用业务语言描述该用户旅程]

**为什么是该优先级**: [说明该故事的价值，以及为什么是当前优先级]

**独立测试**: [说明如何独立测试]

**验收场景**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

## 资料来源与需求追溯 *(mandatory，必填)*

<!--
  EC 工单项目的每条需求都必须可追溯到客户资料。
  请引用会议纪要、纸质材料、SOP、客户样张，或将条目标记为 NEEDS CLARIFICATION。
  不得因为某个平台具备某项能力，就把它加入需求，除非客户资料支持该需要。
-->

- **主要来源（Primary sources）**: [meeting/material references]
- **客户已确认事实（Customer-confirmed facts）**: [facts that are explicitly confirmed]
- **假设/问题（Assumptions / questions）**: [items needing customer confirmation]

## 范围分类 *(mandatory，必填)*

- **MVP（Minimum Viable Product，最小可行版本）**: [smallest customer-confirmable workflow slice]
- **二期候选（Phase Two Candidates）**: [later items with prerequisite/trigger]
- **不做范围（Out of Scope）**: [explicit non-goals for this feature]

## 流程定义 *(涉及工作流时 mandatory，必填)*

| 流程 | 角色 | 触发条件 | 状态流转 | 通知节点 | 验收标准 |
|------|------|----------|----------|----------|----------|
| [Flow name] | [Actors] | [Start event] | [States] | [Who is notified when] | [How customer accepts] |

### 边界情况

<!--
  ACTION REQUIRED（需要执行）: 本节内容是占位示例。
  请根据实际需求填写对应边界条件和错误场景。
-->

- 当出现 [boundary condition] 时会发生什么？
- 系统如何处理 [error scenario]？

## 需求 *(mandatory，必填)*

<!--
  ACTION REQUIRED（需要执行）: 本节内容是占位示例。
  请填写真实的功能需求。
-->

### 功能需求

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]（系统必须具备某项能力）
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]（系统必须具备某项能力）
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]（用户必须能够完成某项关键操作）
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]（系统必须满足某项数据要求）
- **FR-005**: System MUST [behavior, e.g., "log all security events"]（系统必须满足某项行为要求）

*不明确需求的标记示例:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### 关键实体 *(功能涉及数据时填写)*

- **[Entity 1]**: [说明该实体代表什么，以及不涉及实现细节的关键属性]
- **[Entity 2]**: [说明该实体与其他实体的关系]

## 成功标准 *(mandatory，必填)*

<!--
  ACTION REQUIRED（需要执行）: 定义可衡量的成功标准。
  这些标准必须与技术无关，并且可以验证。
-->

### 可衡量结果

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]（可衡量指标）
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]（可衡量指标）
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]（用户满意或成功率指标）
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]（业务指标）

## 假设

<!--
  ACTION REQUIRED（需要执行）: 本节内容是占位示例。
  当功能描述没有指定某些细节时，请根据合理默认值填写假设。
-->

- [Assumption about target users, e.g., "Users have stable internet connectivity"]
- [Assumption about scope boundaries, e.g., "Mobile support is out of scope for v1"]
- [Assumption about data/environment, e.g., "Existing authentication system will be reused"]
- [Dependency on existing system/service, e.g., "Requires access to the existing user profile API"]
