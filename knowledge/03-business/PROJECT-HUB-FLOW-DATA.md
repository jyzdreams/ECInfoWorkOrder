# Project Hub Flow Data｜业务流程结构化接线数据

> 本文件是 `EC-REAL-BUSINESS-BASELINE.md` 的结构化展示投影，供 `build-v2.js` 读取。它不新增业务规则，不替代原始 Source、Fact 或 Decision。
> 修改流程内容时，必须先更新 Business Baseline / Decision，再同步本表；所有节点必须保留 Decision ID 与证据状态。

- 数据状态：CURRENT STRUCTURED PROJECTION
- 业务基线：`EC-REAL-BUSINESS-BASELINE.md`
- Decision 索引：`../02-decisions/DECISION-INDEX.md`
- 禁止行为：关键词推断新节点、自动升级状态、自动关闭 Pending

## FLOW-MAIN

- 名称：00 真实业务总流程
- 状态：CONFIRMED
- 摘要：客户需求经报价生命周期和中单判断进入 M、P 或 M+P；工单完工与收款完成分离。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MAIN-01 | 客户需求 | 客户 | 提出需求 | 待受理 | CS / CR | CONFIRMED | CONFIRMED-001 |  |
| MAIN-02 | CS / CR | CS / CR | 识别并发起报价任务 | 待报价 | 报价组 | CONFIRMED | CONFIRMED-009 |  |
| MAIN-03 | 报价组 | 报价组 | 制作并维护报价版本 | 报价沟通中 | 客户 | CONFIRMED | CONFIRMED-008 |  |
| MAIN-04 | 客户确认 | 客户 | 接受最终报价 | 待中单 | 报价组 | CONFIRMED | CONFIRMED-007、CONFIRMED-008 |  |
| MAIN-05 | 中单 | 报价组 | 确认中单并锁定最终报价 | 已中单 | 系统 / 业务团队 | CONFIRMED | CONFIRMED-007、CONFIRMED-008、CONFIRMED-011 | P 自动生成 MR；M 生成整期保养计划；M+P 分别进入 M/P。 |
| MAIN-06 | M / P / M+P | 系统 / 业务团队 | 按报价阶段确定的业务类型分流 | 准备中 | CR / 主管 | CONFIRMED | CONFIRMED-011、CONFIRMED-013 |  |
| MAIN-07 | 排期与服务 | CR / 主管、师傅 | 安排时间并执行服务 | 处理中 | 客户 / CR | CONFIRMED | CONFIRMED-004、CONFIRMED-005、CONFIRMED-012 |  |
| MAIN-08 | Service Report | 师傅 / 客户 | 提交并签名确认 | 待确认 | CR / 主管 | CONFIRMED | CONFIRMED-010 |  |
| MAIN-09 | 完工 | CR / 主管 | 简单确认 | 已完工 | 报价 / 财务 | CONFIRMED | CONFIRMED-010、CONFIRMED-017 | 完工不等于收款完成。 |
| MAIN-10 | 收款（独立状态） | 财务 / 现场师傅 | 记录与报价关联的收款；现场收款交接待确认 | 收款独立跟踪 | 财务 | PARTIAL | CONFIRMED-017、PENDING-001 | 展示财务后续，不代表完工自动触发收款或现场交款规则已确认。 |

## FLOW-P

- 名称：01 普通报价维修
- 状态：CONFIRMED
- 摘要：先报价、中单，再按最终报价材料生成 MR，备货完成后由 CR / 主管确认正式施工时间。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P-01 | 报价任务 | CS / CR | 发起报价任务 | 待报价 | 报价组 | CONFIRMED | CONFIRMED-009 |  |
| P-02 | 版本沟通 | 报价组 | R1 / R2 / R3 迭代 | 沟通中 | 客户 | CONFIRMED | CONFIRMED-008 |  |
| P-03 | 中单 | 报价组 | 确认客户接受最终报价 | 已中单 | 系统 / 仓管 | CONFIRMED | CONFIRMED-003、CONFIRMED-007 |  |
| P-04 | 自动生成 MR | 系统 | 从成交报价提取材料 | 待备货 | 仓管 | CONFIRMED | CONFIRMED-006、CONFIRMED-007 |  |
| P-05 | 备货 / 采购 | 仓管 | 备货；库存不足时采购 | 材料准备中 | CR / 主管 | CONFIRMED | CONFIRMED-003 |  |
| P-06 | 确认正式时间 | CR / 主管 | 材料就绪后与客户确认 | 待施工 | 师傅 | CONFIRMED | CONFIRMED-004、CONFIRMED-005 |  |
| P-07 | 现场施工 | 师傅 | 领料并施工 | 处理中 | 客户 | CONFIRMED | CONFIRMED-001、CONFIRMED-002 |  |
| P-08 | Service Report | 师傅 / 客户 | 提交 SR 并签名 | 待确认 | CR / 主管 | CONFIRMED | CONFIRMED-010 |  |
| P-09 | 正式完工 | CR / 主管 | 简单确认 | 已完工 | 归档 / 财务 | CONFIRMED | CONFIRMED-010、CONFIRMED-017 |  |

## FLOW-MAINT-ISSUE

- 名称：02 保养发现问题后二次维修
- 状态：CONFIRMED
- 摘要：保养 SR 选择需要报价后自动创建报价任务，再进入报价、中单、MR、备货和二次上门链路。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MI-01 | 上门保养 | 师傅 | 按保养计划服务 | 保养中 | 师傅 | CONFIRMED | CONFIRMED-002、CONFIRMED-012 |  |
| MI-02 | 发现问题 | 师傅 | 识别无法当场完成的问题 | 待报价判断 | 系统 | CONFIRMED | CONFIRMED-002 |  |
| MI-03 | SR 需要报价 | 师傅 | 在 Service Report 选择需要报价 | 待报价 | 报价组 | CONFIRMED | CONFIRMED-009 |  |
| MI-04 | 报价与中单 | 报价组 / 客户 | 版本沟通并确认中单 | 已中单 | 系统 | CONFIRMED | CONFIRMED-007、CONFIRMED-008 |  |
| MI-05 | MR 与备货 | 系统 / 仓管 | 自动生成 MR 并备货 | 材料准备中 | CR / 主管 | CONFIRMED | CONFIRMED-006、CONFIRMED-007 |  |
| MI-06 | 二次上门 | CR / 主管、师傅 | 确认时间并施工 | 处理中 | 客户 | CONFIRMED | CONFIRMED-005 |  |
| MI-07 | SR 与完工 | 师傅 / CR | 签名、提交、简单确认 | 已完工 | 归档 | CONFIRMED | CONFIRMED-010 |  |

## FLOW-INSTANT

- 名称：03 现场即时维修
- 状态：PARTIAL
- 摘要：现场有材料时可确认价格、当场维修与收款；回公司补正式商务记录，内部交款对账待确认。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| IR-01 | 现场发现问题 | 师傅 | 确认可用现有材料处理 | 现场判断 | 报价组 | CONFIRMED | CONFIRMED-002 |  |
| IR-02 | 确认价格 | 师傅 / 报价组 | 联系报价组确认价格 | 待客户确认 | 客户 | CONFIRMED | CONFIRMED-002 |  |
| IR-03 | 客户接受 | 客户 | 接受现场报价 | 可维修 | 师傅 | CONFIRMED | CONFIRMED-002 |  |
| IR-04 | 当场维修 | 师傅 | 完成维修 | 已处理 | 客户 | CONFIRMED | CONFIRMED-002 |  |
| IR-05 | 当场收款 | 师傅 | 现场收款 | 已收现场款 | 财务 / 报价组 | PARTIAL | CONFIRMED-017、PENDING-001 | 是否以及如何登记、交款、对账待确认。 |
| IR-06 | Service Report | 师傅 / 客户 | 提交并签名 | 待确认 | CR / 主管 | CONFIRMED | CONFIRMED-010 |  |
| IR-07 | 补正式记录 | 报价组 / 商务 | 补报价与商务记录 | 待归档 | 财务 | CONFIRMED | CONFIRMED-002 |  |

## FLOW-M

- 名称：04 周期保养
- 状态：CONFIRMED
- 摘要：报价阶段确定保养周期，中单后生成整期计划；到期时再安排具体师傅和日期。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M-01 | 确定周期 | 报价组 | 在报价中确定保养周期 | 报价中 | 客户 | CONFIRMED | CONFIRMED-011、CONFIRMED-012 |  |
| M-02 | 中单 | 报价组 | 确认 M 或 M+P 中的 M | 已中单 | 系统 | CONFIRMED | CONFIRMED-008、CONFIRMED-011 |  |
| M-03 | 整期计划 | 系统 | 按周期和合同期生成计划 | 计划已生成 | CR / 主管 | CONFIRMED | CONFIRMED-012 |  |
| M-04 | 到期排期 | CR / 主管 | 安排具体师傅和日期 | 待保养 | 师傅 | CONFIRMED | CONFIRMED-012 |  |
| M-05 | 上门保养 | 师傅 | 执行保养 | 保养中 | 客户 | CONFIRMED | CONFIRMED-012 |  |
| M-06 | Service Report | 师傅 / 客户 | 提交并签名 | 待确认 | CR / 主管 | CONFIRMED | CONFIRMED-010 |  |
| M-07 | 本次完成 | CR / 主管 | 简单确认 | 本次保养完成 | 下一周期 / 报价组 | CONFIRMED | CONFIRMED-010、CONFIRMED-012 | 若发现维修问题，由 SR 选择需要报价并进入报价链路。 |

## FLOW-CM

- 名称：05 CM
- 状态：PARTIAL
- 摘要：CM 由 CR / 主管直接指定师傅；与原 PM / 其他任务冲突的处理规则待确认。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CM-01 | CM 任务 | CS / CR | 登记 CM 任务 | 待分派 | CR / 主管 | CONFIRMED | CONFIRMED-014 |  |
| CM-02 | 直接指定师傅 | CR / 主管 | 指定服务人员 | 待服务 | 师傅 | CONFIRMED | CONFIRMED-015 |  |
| CM-03 | 时间冲突 | CR / 主管、师傅 | 处理与 PM / 其他任务冲突 | 规则待定 | CR / 主管 | PENDING | PENDING-002 | 不得把“接受/拒绝 CM → PM 自动重排”当作已确认规则。 |
| CM-04 | 现场服务 | 师傅 | 执行服务 | 处理中 | 客户 | CONFIRMED | CONFIRMED-015 |  |
| CM-05 | SR 与完工 | 师傅 / CR | 签名、提交、简单确认 | 已完工 | 归档 | CONFIRMED | CONFIRMED-010、CONFIRMED-015 |  |

## FLOW-TENDER

- 名称：06 Government Tender
- 状态：PARTIAL
- 摘要：政府项目标书经处理、报价/回标和结果判断；中标后进入 M、P 或 M+P，内部细节不扩展。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T-01 | 取得标书 | Tender 负责人 | 接收政府项目标书 | 待处理 | Tender 团队 | CONFIRMED | CONFIRMED-016 |  |
| T-02 | Tender 处理 | Tender 团队 | 准备应标材料 | 处理中 | 报价组 | PARTIAL | CONFIRMED-016 | 内部细节尚未确认。 |
| T-03 | 报价 / 回标 | 报价组 / Tender | 提交报价或回标 | 等待结果 | 客户 / 政府机构 | CONFIRMED | CONFIRMED-009、CONFIRMED-016 |  |
| T-04 | 结果 | 客户 / 政府机构 | 判定中标或未中标 | 已中标 / 未中标 | 业务团队 | CONFIRMED | CONFIRMED-016 |  |
| T-05 | M / P / M+P | 业务团队 | 按中标内容分流 | 准备中 | 对应业务角色 | CONFIRMED | CONFIRMED-011、CONFIRMED-016 |  |

## 构建约束

1. `build-v2.js` 只读取以上显式字段，不根据语义自动补节点或关联。
2. 缺少 Decision ID、非法状态或未知 Flow ID 时构建失败，不静默推断。
3. `project-hub/data/flows.json` 是构建产物，不再作为本文件的上游输入。
