---

description: "功能实施任务清单模板"
---

# 任务: [FEATURE NAME]

**输入（Input）**: 来自 `/specs/[###-feature-name]/` 的设计文档

**前置条件（Prerequisites）**: plan.md（必需）、spec.md（用户故事必需）、research.md、data-model.md、contracts/

**测试（Tests）**: 下方示例包含测试任务。测试是 OPTIONAL（可选）的，只有当功能规格明确要求时才包含。

**组织方式（Organization）**: 任务按用户故事分组，以便每个故事可以独立实施和独立测试。

## 格式: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行，通常表示不同文件且无依赖。
- **[Story]**: 任务所属用户故事，例如 US1、US2、US3。
- 任务描述中必须包含准确文件路径。

## 路径约定

- **单项目（Single project）**: 仓库根目录下的 `src/`、`tests/`
- **Web 应用（Web app）**: `backend/src/`、`frontend/src/`
- **移动端（Mobile）**: `api/src/`、`ios/src/` 或 `android/src/`
- 下方路径默认按单项目展示，请根据 plan.md 中的结构调整。

<!--
  ============================================================================
  IMPORTANT（重要）: 下方任务只是示例。

  /speckit-tasks 命令必须基于以下内容替换为真实任务：
  - spec.md 中的用户故事及其优先级 P1、P2、P3...
  - plan.md 中的功能需求
  - data-model.md 中的实体
  - contracts/ 中的接口或契约

  任务必须按用户故事组织，使每个故事可以：
  - 独立实施
  - 独立测试
  - 作为 MVP 增量交付

  不要在生成的 tasks.md 中保留下方示例任务。
  ============================================================================
-->

## Phase 1: Setup（共享基础设施）

**目的（Purpose）**: 项目初始化和基础结构

- [ ] T001 按实施计划创建项目结构
- [ ] T002 使用 [language] 和 [framework] 依赖初始化项目
- [ ] T003 [P] 配置代码检查和格式化工具
- [ ] TXXX 确认 specs/[###-feature-name]/spec.md 中 MVP 需求的来源追溯清单
- [ ] TXXX 与相关方确认 MVP、二期和不做范围分类

---

## Phase 2: Foundational（阻塞性前置基础）

**目的（Purpose）**: 必须先完成的核心基础设施，完成前不得开始任何用户故事实施。

**⚠️ CRITICAL（关键）**: 本阶段完成前，不得开始用户故事开发。

基础任务示例（按项目实际情况调整）：

- [ ] T004 设置数据库 schema（结构）和迁移框架
- [ ] T005 [P] 实现认证/授权框架
- [ ] T006 [P] 设置 API（Application Programming Interface，应用程序接口）路由和中间件结构
- [ ] T007 创建所有用户故事依赖的基础模型/实体
- [ ] T008 配置错误处理和日志基础设施
- [ ] T009 设置环境配置管理
- [ ] TXXX 根据规格定义流程状态模型、通知节点和验收标准

**检查点（Checkpoint）**: 基础设施已就绪，用户故事实施可以开始并行推进。

---

## Phase 3: User Story 1 - [Title]（优先级: P1）🎯 MVP

**目标（Goal）**: [简要描述该故事交付什么]

**独立测试（Independent Test）**: [说明如何验证该故事可独立工作]

**宪法追溯（Constitution Trace）**: [Customer source + role + trigger + status flow + notification + acceptance standard]（客户来源 + 角色 + 触发条件 + 状态流转 + 通知 + 验收标准）

### 用户故事 1 的测试（OPTIONAL，可选；仅当规格要求测试时包含）⚠️

> **注意（NOTE）: 先编写这些测试，并确认它们在实施前失败。**

- [ ] T010 [P] [US1] 在 tests/contract/test_[name].py 中为 [endpoint] 编写契约测试
- [ ] T011 [P] [US1] 在 tests/integration/test_[name].py 中为 [user journey] 编写集成测试

### 用户故事 1 的实施

- [ ] T012 [P] [US1] 在 src/models/[entity1].py 中创建 [Entity1] 模型
- [ ] T013 [P] [US1] 在 src/models/[entity2].py 中创建 [Entity2] 模型
- [ ] T014 [US1] 在 src/services/[service].py 中实现 [Service]（依赖 T012、T013）
- [ ] T015 [US1] 在 src/[location]/[file].py 中实现 [endpoint/feature]
- [ ] T016 [US1] 增加校验和错误处理
- [ ] T017 [US1] 为用户故事 1 的操作增加日志

**检查点（Checkpoint）**: 此时用户故事 1 应该已经完整可用，并可独立测试。

---

## Phase 4: User Story 2 - [Title]（优先级: P2）

**目标（Goal）**: [简要描述该故事交付什么]

**独立测试（Independent Test）**: [说明如何验证该故事可独立工作]

**宪法追溯（Constitution Trace）**: [Customer source + role + trigger + status flow + notification + acceptance standard]（客户来源 + 角色 + 触发条件 + 状态流转 + 通知 + 验收标准）

### 用户故事 2 的测试（OPTIONAL，可选；仅当规格要求测试时包含）⚠️

- [ ] T018 [P] [US2] 在 tests/contract/test_[name].py 中为 [endpoint] 编写契约测试
- [ ] T019 [P] [US2] 在 tests/integration/test_[name].py 中为 [user journey] 编写集成测试

### 用户故事 2 的实施

- [ ] T020 [P] [US2] 在 src/models/[entity].py 中创建 [Entity] 模型
- [ ] T021 [US2] 在 src/services/[service].py 中实现 [Service]
- [ ] T022 [US2] 在 src/[location]/[file].py 中实现 [endpoint/feature]
- [ ] T023 [US2] 按需与用户故事 1 的组件集成

**检查点（Checkpoint）**: 此时用户故事 1 和 2 都应能独立运行。

---

## Phase 5: User Story 3 - [Title]（优先级: P3）

**目标（Goal）**: [简要描述该故事交付什么]

**独立测试（Independent Test）**: [说明如何验证该故事可独立工作]

**宪法追溯（Constitution Trace）**: [Customer source + role + trigger + status flow + notification + acceptance standard]（客户来源 + 角色 + 触发条件 + 状态流转 + 通知 + 验收标准）

### 用户故事 3 的测试（OPTIONAL，可选；仅当规格要求测试时包含）⚠️

- [ ] T024 [P] [US3] 在 tests/contract/test_[name].py 中为 [endpoint] 编写契约测试
- [ ] T025 [P] [US3] 在 tests/integration/test_[name].py 中为 [user journey] 编写集成测试

### 用户故事 3 的实施

- [ ] T026 [P] [US3] 在 src/models/[entity].py 中创建 [Entity] 模型
- [ ] T027 [US3] 在 src/services/[service].py 中实现 [Service]
- [ ] T028 [US3] 在 src/[location]/[file].py 中实现 [endpoint/feature]

**检查点（Checkpoint）**: 所有用户故事现在都应能独立运行。

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns（打磨与跨故事事项）

**目的（Purpose）**: 影响多个用户故事的改进

- [ ] TXXX [P] 更新 docs/ 中的文档
- [ ] TXXX 代码清理和重构
- [ ] TXXX 优化跨用户故事的性能
- [ ] TXXX [P] 按需在 tests/unit/ 中增加单元测试
- [ ] TXXX 安全加固
- [ ] TXXX 运行 quickstart.md 验证
- [ ] TXXX 校验面向客户的流程图/原型页面是否满足来源追溯和流程完整性要求

---

## 依赖与执行顺序

### 阶段依赖

- **Setup（Phase 1）**: 无依赖，可立即开始。
- **Foundational（Phase 2）**: 依赖 Setup 完成，会阻塞所有用户故事。
- **User Stories（Phase 3+）**: 全部依赖 Foundational 完成。
  - 如人员充足，用户故事可并行推进。
  - 也可按优先级 P1 -> P2 -> P3 顺序推进。
- **Polish（最终阶段）**: 依赖所有目标用户故事完成。

### 用户故事依赖

- **User Story 1（P1）**: Foundational 完成后即可开始，不依赖其他故事。
- **User Story 2（P2）**: Foundational 完成后即可开始，可能与 US1 集成，但应能独立测试。
- **User Story 3（P3）**: Foundational 完成后即可开始，可能与 US1/US2 集成，但应能独立测试。

### 每个用户故事内部

- 如果包含测试，测试必须先写，并在实施前确认失败。
- 先模型，后服务。
- 先服务，后端点。
- 先核心实现，后集成。
- 完成当前故事后，再推进下一优先级故事。

### 并行机会

- 所有标记 [P] 的 Setup 任务可以并行。
- Foundational 中标记 [P] 的任务可以并行。
- Foundational 完成后，如团队能力允许，所有用户故事可以并行启动。
- 一个用户故事中标记 [P] 的测试可以并行。
- 一个用户故事中标记 [P] 的模型任务可以并行。
- 不同用户故事可以由不同成员并行处理。

---

## 并行示例: User Story 1

```bash
# 同时启动用户故事 1 的全部测试（如果规格要求测试）：
Task: "在 tests/contract/test_[name].py 中为 [endpoint] 编写契约测试"
Task: "在 tests/integration/test_[name].py 中为 [user journey] 编写集成测试"

# 同时启动用户故事 1 的全部模型任务：
Task: "在 src/models/[entity1].py 中创建 [Entity1] 模型"
Task: "在 src/models/[entity2].py 中创建 [Entity2] 模型"
```

---

## 实施策略

### MVP First（先做 MVP，仅用户故事 1）

1. 完成 Phase 1: Setup。
2. 完成 Phase 2: Foundational（CRITICAL，会阻塞所有用户故事）。
3. 完成 Phase 3: User Story 1。
4. **STOP and VALIDATE**（停止并验证）: 独立测试 User Story 1。
5. 如果就绪，则部署或演示。

### Incremental Delivery（增量交付）

1. 完成 Setup + Foundational -> 基础能力就绪。
2. 增加 User Story 1 -> 独立测试 -> 部署/演示（MVP）。
3. 增加 User Story 2 -> 独立测试 -> 部署/演示。
4. 增加 User Story 3 -> 独立测试 -> 部署/演示。
5. 每个故事都应增加价值，且不破坏已有故事。

### Parallel Team Strategy（多人并行策略）

多人协作时：

1. 团队共同完成 Setup + Foundational。
2. Foundational 完成后：
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. 各故事独立完成并集成。

---

## 备注

- [P] 表示不同文件、无依赖、可并行。
- [Story] 标签用于把任务映射到具体用户故事，便于追溯。
- 每个用户故事都应能独立完成和测试。
- 实施前确认测试失败。
- 每个任务或逻辑任务组完成后提交。
- 可在任何检查点暂停并独立验证故事。
- 避免：模糊任务、同一文件冲突、破坏独立性的跨故事依赖。
