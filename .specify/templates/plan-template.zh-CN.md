# 实施计划: [FEATURE]

**分支（Branch）**: `[###-feature-name]` | **日期（Date）**: [DATE] | **规格（Spec）**: [link]

**输入（Input）**: 来自 `/specs/[###-feature-name]/spec.md` 的功能规格

**说明（Note）**: 本模板由 `/speckit-plan` 命令填写。执行流程可参考 `.specify/templates/plan-template.md` 英文原版；本文件为本项目优先使用的中文本地化模板。

## 摘要

[从功能规格中提炼：核心需求 + 调研后确定的技术方案]

## 技术上下文

<!--
  ACTION REQUIRED（需要执行）: 用本项目真实技术细节替换本节内容。
  本节结构用于指导迭代过程，可按项目实际情况补充或删减。
-->

**语言/版本（Language/Version）**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**主要依赖（Primary Dependencies）**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**存储（Storage）**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**测试（Testing）**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**目标平台（Target Platform）**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**项目类型（Project Type）**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**性能目标（Performance Goals）**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**约束（Constraints）**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**规模/范围（Scale/Scope）**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## 宪法检查（Constitution Check）

*GATE（门禁）: 必须在 Phase 0 research（第 0 阶段调研）前通过，并在 Phase 1 design（第 1 阶段设计）后重新检查。*

- **需求追溯（Source Traceability）**: 每条计划需求都必须引用客户材料、会议纪要、SOP、样张，或明确标记为澄清项。
- **MVP 分离（MVP Separation）**: MVP、二期候选、不做范围和待澄清项必须在技术设计前分开。
- **业务流程匹配（Business Flow Fit）**: 每个计划页面、集成或数据对象都必须对应业务流程步骤、决策、角色或确认问题。
- **流程定义完整（Complete Flow Definition）**: 每条工作流必须包含角色、触发条件、状态流转、通知节点和验收标准。
- **一线使用简单（Front-Line Simplicity）**: 师傅和 CS 工作流应减少必填输入，保留已确认的人工判断，避免未经确认的自动化或监控能力。
- **语言与交付规范（Language Delivery）**: 正式交付默认使用简体中文；面向客户内容优先使用业务语言；必须使用英文术语时首次说明中文含义。

## 项目结构

### 本功能文档

```text
specs/[###-feature]/
├── plan.md              # 本文件（/speckit-plan 命令输出）
├── research.md          # Phase 0 输出（/speckit-plan 命令）
├── data-model.md        # Phase 1 输出（/speckit-plan 命令）
├── quickstart.md        # Phase 1 输出（/speckit-plan 命令）
├── contracts/           # Phase 1 输出（/speckit-plan 命令）
└── tasks.md             # Phase 2 输出（/speckit-tasks 命令生成；不是 /speckit-plan 输出）
```

### 源代码（仓库根目录）
<!--
  ACTION REQUIRED（需要执行）: 用本功能真实目录结构替换下方占位树。
  删除未使用选项，并用真实路径展开最终结构，例如 apps/admin、packages/something。
  交付的 plan.md 不应保留 Option labels（选项标签）。
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**结构决策（Structure Decision）**: [记录最终选择的结构，并引用上方真实目录]

## 复杂度跟踪

> **仅当 Constitution Check（宪法检查）存在必须解释的违反项时填写**

| 违反项 | 为什么需要 | 为什么拒绝更简单替代方案 |
|--------|------------|--------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
