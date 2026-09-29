# Source Index

本索引是知识入口，不是原始资料副本。全部客户原始文件继续保留在原位置；Project Hub 的完整逐文件索引仍以 `project-hub/data/file-index.json` 为准。

## Source 统计

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
| SOURCE-001 | 2026-09-27 真实业务流程讨论 | `knowledge/decisions/DEC-20260927-真实业务流程讨论.md` | Decision / READY | FACT-001～017；CONFIRMED-001～017、PENDING-001～002、REJECTED-001 |
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
| SOURCE-012 | 当前需求草案 | `materials/raw/ec-workorder/12-requirements-latest-20260919.md` | PRD / DRAFT | 80 条历史 REQ 的主要关联文档，全部仍待确认 |
| SOURCE-013 | 旧流程与原型对齐审计 | `docs/08-sop-prototype-requirements-alignment-audit.md` | Requirement Reference / DRAFT | 历史冲突、Open Question 和范围审计 |

## 历史与 Legacy Knowledge

以下内容不移动、不删除，继续作为历史证据：

- `knowledge-base/data/knowledge-base.json`：228 个历史 Source、28 条历史 Rule、80 条历史 Requirement、17 个 PAGE、22 个历史问题和 12 个角色。
- `knowledge-base/` 下的旧页面和旧数据：状态为 `LEGACY KNOWLEDGE`，不能覆盖 `03-business/` 的当前 Baseline。
- `materials/raw/` 下的早期会议、PRD、原型和旧项目资料：状态按 Project Hub 文件索引保留为 Legacy Source / 历史资料。
- `backups/`、`review/`、`archive/`：备份、检查证据和归档，不是当前事实源。

## 未移动的文件清单口径

本轮没有移动任何原始 Source、Decision、PRD、Prototype、SDD、TDD 或 Test 文件。原始资料按原路径访问；如果需要从某条业务规则下钻，先使用本索引的 Source 别名，再通过 `project-hub/data/file-index.json` 获取精确 File ID 和路径。

## Source 追溯规则

- 当前 Confirmed 业务基线主要回溯到 `SOURCE-001`。
- 历史资料只作为背景或冲突证据，不能自动替代当前 Decision。
- 没有明确 Source 的业务陈述不得进入当前 Baseline。
- 新增 Source 时先登记原始路径、类型、日期和状态，再挂到 Fact / Decision / Flow。
