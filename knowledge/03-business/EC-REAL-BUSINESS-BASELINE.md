# EC 真实业务基线 V1

- 基线状态：当前有效业务知识
- 编制日期：2026-09-27
- 事实边界：只整理当前 Source、Fact 和人工确认 Decision；不替代 PRD、Prototype、SDD、TDD 或 Test
- 当前主要 Decision：`SOURCE-001` / `knowledge/decisions/DEC-20260927-真实业务流程讨论.md`
- 需求批准状态：80 条历史功能需求仍为待确认，不能由本基线推定已批准

## 0. 阅读规则

本文件回答“截至当前，EC 真实业务如何运行”。

- `CONFIRMED`：当前 Decision 已明确确认。
- `PARTIAL`：业务主干有依据，但细节不足，不能扩展为完整规则。
- `PENDING`：客户或项目方尚未确认。
- `CONFLICT`：不同资料存在冲突，等待确认。
- `REJECTED`：历史结论被新结论推翻，只保留用于追溯。

每个重要结论只保留引用，不复制证据正文：

- Decision：`CONFIRMED-xxx` / `PENDING-xxx`
- Fact：`FACT-xxx`
- Source：`SOURCE-xxx` 和原文件路径
- Flow：`FLOW-xxx`

---

## 1. 核心业务对象

### 1.1 CALL / 客户需求受理

客户需求是业务入口，进入 CS / CR 的受理与报价判断。CALL 的具体分类、编号、状态字典、PM/CM 与 CALL 分类映射仍有历史差异，不能在本基线中补成统一规则。

状态：`PARTIAL / OPEN`

Decision：`CONFIRMED-001`、`CONFIRMED-009`

Fact：`FACT-001`、`FACT-009`、`FACT-LEGACY-004`、`FACT-LEGACY-015`

Source：`SOURCE-001`；历史背景见 `SOURCE-005`、`SOURCE-006`、`SOURCE-002`

### 1.2 报价

报价由报价组负责完整生命周期，包含 R1/R2/R3 等版本历史。客户接受最终报价后，由报价组确认中单。报价任务有四个主要入口：CS 经 CR/主管、CR 直接发起、Tender、Service Report 选择需要报价。

状态：`CONFIRMED`

Decision：`CONFIRMED-008`、`CONFIRMED-009`

Fact：`FACT-008`、`FACT-009`

Source：`SOURCE-001`；相关历史背景见 `SOURCE-002`、`SOURCE-004`、`SOURCE-005`

### 1.3 MR / 材料申请单

MR 是材料申请单。客户确认报价、报价组确认中单后，系统按最终成交报价中的材料信息自动生成 MR，不再由 CR 人工制作；报价完成但尚未中单时不生成 MR。

状态：`CONFIRMED`

Decision：`CONFIRMED-006`、`CONFIRMED-007`

Fact：`FACT-006`、`FACT-007`

Source：`SOURCE-001`

### 1.4 Service Report / SR

施工或保养完成后，客户确认或签名，师傅提交 Service Report，CR / 主管进行简单确认后正式完工或完成本次保养。SR 还可以选择“需要报价”，从而回流报价任务。

状态：主干 `CONFIRMED`；回流与部分字段 `PARTIAL`

Decision：`CONFIRMED-009`、`CONFIRMED-010`

Fact：`FACT-009`、`FACT-010`

Source：`SOURCE-001`；SR 纸张、编号和多 SR 历史背景见 `SOURCE-002`

### 1.5 Maintenance Plan / 整期保养计划

报价包含 M 时，报价阶段确定保养周期；客户确认并中单后，系统按保养周期和合同周期生成整期 Maintenance Plan。每个到期周期再进行排期、上门保养和 SR 确认。

状态：`CONFIRMED`（具体计划字段和开票细节仍可能为 `PARTIAL`）

Decision：`CONFIRMED-011`、`CONFIRMED-012`

Fact：`FACT-011`、`FACT-012`

Source：`SOURCE-001`；历史维护背景见 `SOURCE-002`、`SOURCE-004`

### 1.6 CM

CM 业务真实存在。通常由 CR / 主管直接指定师傅，现场服务后提交 SR，并由 CR / 主管确认完成。CM 与原 PM / 其他任务发生时间冲突时的处理规则尚未确认。

状态：主干 `PARTIAL`；冲突调度 `PENDING`

Decision：`CONFIRMED-014`、`CONFIRMED-015`、`PENDING-002`

Fact：`FACT-014`、`FACT-015`

Source：`SOURCE-001`；冲突背景见 `SOURCE-005`、`SOURCE-006`

### 1.7 Tender / 政府标书

Tender / 标书主要用于政府项目。当前已确认的业务骨架是：Tender → 报价 / 回标 → 结果判断；中标后按业务内容进入 M、P 或 M+P。Tender 内部资料准备、正式回标、责任边界和本期范围没有在当前 Decision 中展开，不得自行补写。

状态：`PARTIAL`

Decision：`CONFIRMED-009`、`CONFIRMED-011`、`CONFIRMED-016`

Fact：`FACT-009`、`FACT-011`、`FACT-016`

Source：`SOURCE-001`；历史 Tender 细节见 `SOURCE-004`、`SOURCE-013`

---

## 2. 真实业务总流程

### 2.1 报价主线

```text
客户需求
→ CS / CR
→ 报价任务
→ 报价组
→ R1 / R2 / R3 等报价版本沟通
→ 客户确认最终报价
→ 报价组确认中单
→ 中单 Gate
```

状态：`CONFIRMED`

Decision：`CONFIRMED-001`、`CONFIRMED-008`、`CONFIRMED-009`

Fact：`FACT-001`、`FACT-008`、`FACT-009`

Flow：`FLOW-MAIN`

### 2.2 中单后的业务类型

业务类型在报价阶段确定：

- `P`：进入 Project / 维修工程履约线。
- `M`：进入 Maintenance / 周期保养线。
- `M+P`：同一报价同时包含 M 与 P；中单后分别进入 M 和 P 两条业务线，独立或并行推进，不设置固定先后顺序。

状态：`CONFIRMED`

Decision：`CONFIRMED-011`、`CONFIRMED-013`

Fact：`FACT-011`、`FACT-013`

Rejected：`REJECTED-001`（“固定先 P 后 M”已被推翻）

---

## 3. P / 普通报价维修流程

```text
客户需求
→ 报价任务
→ 报价组维护报价版本
→ 客户确认最终报价
→ 报价组确认中单
→ 系统按成交报价材料自动生成 MR
→ 库存 / 采购 / 备货
→ 材料就绪
→ CR / 主管与客户确认正式施工时间
→ 师傅施工
→ 客户确认或签名
→ 师傅提交 Service Report
→ CR / 主管简单确认
→ 完工
```

补充边界：中单后可以先预排师傅和预计施工时间，但该时间不是最终与客户确认的正式施工时间。材料准备完成后，才由 CR / 主管与客户确认正式施工时间。

状态：主干 `CONFIRMED`

Decision：`CONFIRMED-001`、`CONFIRMED-003`、`CONFIRMED-004`、`CONFIRMED-005`、`CONFIRMED-006`、`CONFIRMED-007`、`CONFIRMED-008`、`CONFIRMED-009`、`CONFIRMED-010`

Fact：`FACT-001`、`FACT-003`、`FACT-004`、`FACT-005`、`FACT-006`、`FACT-007`、`FACT-008`、`FACT-009`、`FACT-010`

Flow：`FLOW-P`

注意：采购主系统、仓储写入权、采购完成后恢复原工单还是创建新工单等细节仍为 Conflict/Open，不由本流程补全。

---

## 4. M / 周期保养流程

```text
报价包含 M
→ 报价阶段确定保养频率
→ 客户确认并中单
→ 系统生成整期 Maintenance Plan
→ 按到期周期排期
→ 师傅上门保养
→ 客户确认或签名
→ 师傅提交 Service Report
→ CR / 主管简单确认
→ 本期保养完成
→ 下一周期
```

保养过程中如果发现无法当场完成的维修问题，进入“保养发现问题后二次维修”流程，而不是在 M 流程中直接假设已完成维修。

状态：主干 `CONFIRMED`

Decision：`CONFIRMED-010`、`CONFIRMED-011`、`CONFIRMED-012`

Fact：`FACT-010`、`FACT-011`、`FACT-012`

Flow：`FLOW-M`

---

## 5. M+P 双业务线

同一商业来源或同一报价同时包含 M 与 P。中单后：

```text
M+P
├─ M → Maintenance Plan → 周期保养业务线
└─ P → Project → MR / 材料 / 施工业务线
```

M 与 P 可以分别推进或并行推进。当前没有证据支持固定“先 P 后 M”、固定“先 M 后 P”或未经确认的统一合流 Gate。

状态：`CONFIRMED`

Decision：`CONFIRMED-011`、`CONFIRMED-012`、`CONFIRMED-013`

Fact：`FACT-011`、`FACT-012`、`FACT-013`

Rejected：`REJECTED-001`

Flow：当前 Project Hub 中 M+P 还没有独立 Flow ID；现有关系分布在 `FLOW-MAIN`、`FLOW-M` 和 `FLOW-P`。后续可建立呈现用 `FLOW-MP`，但不得新增业务规则。

---

## 6. SR 回流报价

现场服务或保养过程中，如果师傅在 Service Report 中选择“需要报价”：

```text
现场服务 / 保养
→ Service Report 选择“需要报价”
→ 自动生成报价任务
→ 重新进入报价生命周期
→ 客户确认报价
→ 报价组确认中单
```

状态：入口和回流主干 `CONFIRMED`；后续报价细节仍按 P/M/P+M 业务类型判断。

Decision：`CONFIRMED-009`、`CONFIRMED-010`

Fact：`FACT-009`、`FACT-010`

Flow：`FLOW-MAINT-ISSUE`、`FLOW-P`、`FLOW-INSTANT`

---

## 7. 保养发现问题后二次维修

```text
按 Maintenance Plan 保养
→ 师傅发现无法当场完成的问题
→ Service Report 选择“需要报价”
→ 自动生成报价任务
→ 报价版本沟通
→ 客户确认并中单
→ 系统自动生成 MR
→ 备货 / 采购
→ CR / 主管确认正式时间
→ 二次上门维修
→ SR / 客户签名
→ CR / 主管确认完工
```

状态：`CONFIRMED`

Decision：`CONFIRMED-002`、`CONFIRMED-005`、`CONFIRMED-006`、`CONFIRMED-007`、`CONFIRMED-008`、`CONFIRMED-009`、`CONFIRMED-010`、`CONFIRMED-012`

Fact：`FACT-002`、`FACT-005`、`FACT-006`、`FACT-007`、`FACT-008`、`FACT-009`、`FACT-010`、`FACT-012`

Flow：`FLOW-MAINT-ISSUE`

---

## 8. 现场即时维修

当前资料确认现场即时维修真实存在，但其现场报价、现场收款和回公司商务补录的细节并未全部被当前 Decision 冻结。

可以确认的业务边界：

- 现场即时维修是三种主要维修情况之一。
- 现场服务结束后仍需要客户确认 / 签名、师傅提交 SR、CR / 主管简单确认。
- 工单完工与收款完成不是同一业务状态。
- 现场收款后的登记、交款、对账方式保持 Pending。

状态：`PARTIAL`

Decision：`CONFIRMED-002`、`CONFIRMED-010`、`CONFIRMED-017`、`PENDING-001`

Fact：`FACT-002`、`FACT-010`、`FACT-017`

Flow：`FLOW-INSTANT`

不得在本基线中写入现场收款自动入账、自动对账、固定交款人或自动完工触发收款等规则。

---

## 9. CM 流程

```text
CM 任务
→ CR / 主管直接指定师傅
→ 师傅现场服务
→ 客户确认 / 师傅提交 Service Report
→ CR / 主管简单确认
→ CM 完成
```

CM 一般无固定插单机制。CM 与原 PM / 其他任务发生时间冲突时如何处理，当前保持 Pending。不得补写“师傅拒绝 CM 后系统自动重排 PM”等规则。

状态：主干 `PARTIAL`；冲突调度 `PENDING`

Decision：`CONFIRMED-010`、`CONFIRMED-014`、`CONFIRMED-015`、`PENDING-002`

Fact：`FACT-010`、`FACT-014`、`FACT-015`

Flow：`FLOW-CM`

---

## 10. Government Tender 流程

```text
Government Tender
→ 报价 / 回标
→ 中标或未中标结果
→ 中标后按业务内容进入 M / P / M+P
```

当前仅确认以上业务骨架。Tender 内部资料准备、正式回标、附件流转、责任人、导出方式和本期是否纳入仍需确认。

状态：`PARTIAL`

Decision：`CONFIRMED-009`、`CONFIRMED-011`、`CONFIRMED-016`

Fact：`FACT-009`、`FACT-011`、`FACT-016`

Flow：`FLOW-TENDER`

Pending：`Q-018`

---

## 11. 完工与财务

业务完工不等于收款完成。

- 正常发票和收款主要关联报价业务。
- 工单的 `已完工` 与财务的收款状态独立追踪。
- 现场即时维修的现场收款登记、交款、对账方式仍为 Pending。

状态：业务分离关系 `CONFIRMED`；现场交接 `PENDING`

Decision：`CONFIRMED-017`、`PENDING-001`

Fact：`FACT-017`

Flow：`FLOW-MAIN`、`FLOW-INSTANT`

---

## 12. 当前角色职责

以下只写当前资料明确支持的职责；没有足够证据的权限边界保持 Partial/Open。

| 角色 | 当前可确认职责 | 状态 | 依据 |
| --- | --- | --- | --- |
| 客户 | 提出需求、确认报价、确认或签名 | `CONFIRMED` | CONFIRMED-001、007、010 |
| CS / CR | 进入报价任务；CR / 主管参与正式施工时间确认和完工确认 | `CONFIRMED / PARTIAL` | CONFIRMED-005、009、010 |
| 报价组 | 维护报价完整生命周期、R1/R2/R3，客户接受后确认中单 | `CONFIRMED` | CONFIRMED-008 |
| 系统 | 中单后自动生成 MR；M 中单后生成整期计划 | `CONFIRMED` | CONFIRMED-006、007、012 |
| 仓务 / 采购 | 参与材料准备、库存不足时采购和备货；细分责任边界未冻结 | `PARTIAL / OPEN` | FLOW-P；Q-007、Q-017 |
| 师傅 | 现场施工或保养、客户确认、提交 SR | `CONFIRMED` | CONFIRMED-010 |
| CR / 主管 | 材料就绪后与客户确认正式施工时间；CM 直接指定师傅；简单确认 SR | `CONFIRMED` | CONFIRMED-005、010、015 |
| 财务 | 独立跟踪发票和收款；现场收款交接细节未确认 | `PARTIAL / PENDING` | CONFIRMED-017、PENDING-001 |
| Tender 团队 | 处理政府 Tender 的报价 / 回标结果骨架；内部职责未展开 | `PARTIAL` | CONFIRMED-016、Q-018 |

角色权限、区域分派、CM 拒单、Project 主管与仓务是否为独立角色等，统一见 `05-pending/OPEN-QUESTIONS.md`。

---

## 13. 明确不属于当前基线的内容

以下内容不能由本基线推定：

1. 80 条功能需求已经批准。
2. Prototype 已完成客户人工验收。
3. 工单统一使用六态、七态或某一套主状态模型。
4. 仓储系统与 EC 系统的最终主数据写入权。
5. 现场收款自动入账、交款和对账规则。
6. CM 冲突时的拒单、插单或自动重排规则。
7. Tender 的内部完整操作流程。
8. 照片数量、照片豁免、金额阈值、编号关系和通知渠道的最终规则。
9. 未经客户确认的自动调度、AI、OCR、离线和外部接口行为。

---

## 14. 当前 Pending 入口

完整清单见 `../05-pending/OPEN-QUESTIONS.md`。本基线直接受影响的 Pending 至少包括：

- `PENDING-001`：现场收款登记、交款、对账。
- `PENDING-002`：CM 与 PM / 其他任务时间冲突。
- `Q-007`：仓储真实主系统。
- `Q-008`：CM 抢占 PM 时师傅是否可拒绝。
- `Q-018`：Tender 回标与中标后 M/P/M+P 是否纳入本期。
- `Q-003`：工单状态模型冲突。
