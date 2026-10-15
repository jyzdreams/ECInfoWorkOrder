# Project Hub Flow Data｜业务流程结构化接线数据

> 本文件是 `EC-REAL-BUSINESS-BASELINE.md` 的结构化展示投影，供 `build-v2.js` 读取。它不新增业务规则，不替代原始 Source、Fact 或 Decision。
> 修改流程内容时，必须先更新 Business Baseline / Decision，再同步本表；所有节点必须保留 Decision ID 与证据状态。

- 数据状态：CURRENT STRUCTURED PROJECTION
- 业务基线：`EC-REAL-BUSINESS-BASELINE.md`
- Decision 索引：`../02-decisions/DECISION-INDEX.md`
- 禁止行为：关键词推断新节点、自动升级状态、自动关闭 Pending

## FLOW-MAIN

- 名称：00 真实业务总流程
- 状态：PARTIAL
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
| MAIN-08 | SR / 维修完工纸CP | 师傅 / 客户 | 保养或CALL上门交SR；报价中单维修交CP | 待确认 | 按业务分支交接 | CONFLICT | CONFIRMED-010 | SOURCE-022最新用户分流取代内部统一SR解释；SOURCE-001旧原文保留，不代表客户已批准新规则。 |
| MAIN-09 | 完工状态共享 | 按分支确认岗位 | 维修由主管核对CP并更新完工状态；按权限可查 | 已完工 | 有权限的查看角色 | PARTIAL | CONFIRMED-010、CONFIRMED-017 | SOURCE-022最新用户说明；不创建财务任务、发票或收款，财务独立核资料。 |
| MAIN-10 | 收款（独立状态） | 财务 / 现场师傅 | 记录与报价关联的收款；现场收款交接待确认 | 收款独立跟踪 | 财务 | PARTIAL | CONFIRMED-017、PENDING-001 | 展示财务后续，不代表完工自动触发收款或现场交款规则已确认。 |

## FLOW-P

- 名称：01 普通报价维修
- 状态：PARTIAL
- 摘要：先报价、中单，再按最终报价材料生成 MR，备货完成后由 CR / 主管确认正式施工时间。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P-01 | 报价任务 | CS / CR | 发起报价任务 | 待报价 | 报价组 | CONFIRMED | CONFIRMED-009 |  |
| P-02 | 版本沟通 | 报价组 | R1 / R2 / R3 迭代 | 沟通中 | 客户 | CONFIRMED | CONFIRMED-008 |  |
| P-03 | 中单 | 报价组 | 确认客户接受最终报价 | 已中单 | 系统 / 仓管 | CONFIRMED | CONFIRMED-003、CONFIRMED-007 |  |
| P-04 | 自动生成 MR | 系统 | 从成交报价提取材料 | 待备货 | 仓管 | CONFIRMED | CONFIRMED-006、CONFIRMED-007 |  |
| P-05 | 备货 / 采购 | 仓管 | 备货；库存不足时采购 | 材料准备中 | CR / 主管 | CONFIRMED | CONFIRMED-003 |  |
| P-06 | 派工时间与事项交接 | 主管 | 材料就绪后派工，在备注记录时间与事项，通常电话沟通 | 待师傅接单 | 师傅 | PARTIAL | CONFIRMED-004、CONFIRMED-005 | SOURCE-022最新用户说明；业务顺序保留，不要求独立预约日期/审批或从备注抽取时间；客户签批未取得。 |
| P-07 | 现场施工 | 师傅 | 领料并施工 | 处理中 | 客户 | CONFIRMED | CONFIRMED-001、CONFIRMED-002 |  |
| P-08 | 维修完工纸CP | 师傅 / 客户 | 交回维修清单与完工纸 | 待主管收件/核对 | 主管 | CONFLICT | CONFIRMED-010 | SOURCE-022最新用户说明；按成交维修阶段而非有无材料分流，旧统一SR原文保留。 |
| P-09 | 主管确认维修完工 | 主管 | 核对完工纸、更新维修已完工状态，其他角色按权限查看 | 已完工 | 有权限的查看角色 | PARTIAL | CONFIRMED-010、CONFIRMED-017 | SOURCE-022后续用户明确主管确认；不自动财务接件/开票/收款，SOURCE-014 P33在独立财务流程核对。 |

## FLOW-MAINT-ISSUE

- 名称：02 保养发现问题后二次维修
- 状态：PARTIAL
- 摘要：保养 SR 选择需要报价后自动创建报价任务，再进入报价、中单、MR、备货和二次上门链路。

| Node ID | 名称 | 角色 | 动作 | 业务状态 | 下一角色 | 证据状态 | Decision IDs | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MI-01 | 上门保养 | 师傅 | 按保养计划服务 | 保养中 | 师傅 | CONFIRMED | CONFIRMED-002、CONFIRMED-012 |  |
| MI-02 | 发现问题 | 师傅 | 识别无法当场完成的问题 | 待报价判断 | 系统 | CONFIRMED | CONFIRMED-002 |  |
| MI-03 | SR 需要报价 | 师傅 | 在 Service Report 选择需要报价 | 待报价 | 报价组 | CONFIRMED | CONFIRMED-009 |  |
| MI-04 | 报价与中单 | 报价组 / 客户 | 版本沟通并确认中单 | 已中单 | 系统 | CONFIRMED | CONFIRMED-007、CONFIRMED-008 |  |
| MI-05 | MR 与备货 | 系统 / 仓管 | 自动生成 MR 并备货 | 材料准备中 | CR / 主管 | CONFIRMED | CONFIRMED-006、CONFIRMED-007 |  |
| MI-06 | 二次上门 | CR / 主管、师傅 | 确认时间并施工 | 处理中 | 客户 | CONFIRMED | CONFIRMED-005 |  |
| MI-07 | 二次维修完工纸CP | 师傅 / 主管 | 维修清单/完工纸交主管核对并更新完工，保留前期检查SR来源 | 已完工，状态按权限可查 | 有权限的查看角色 | CONFLICT | CONFIRMED-010 | SOURCE-022最新说明；不改前期保养SR，财务流程独立；旧统一SR版本保留。 |

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


## FLOW-MR

- 名称：07 MR申请与仓库交接
- 状态：PARTIAL
- 摘要：材料申请存在自动、无报价手工及仓管自主入口诉求；EC/仓库通写入权、就绪回传及取消联动待确认。

| 节点 | 名称 | 角色 | 动作 | 状态 | 下一角色 | 判定 | Decision | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MR-01 | 提出材料申请 | 报价/采购/仓管 | 成交来源或无报价手工/仓管自主提出MR；系统分工待C-04 | 处理中（进入条件待定） | 采购/仓库通/仓管（授权待定） | PARTIAL | CONFIRMED-003 | UPD-011、UPD-029；不能强造报价来源 |
| MR-02 | 备货与进度交接 | 采购/仓管 | 按原申请备货并保留缺料情况；SP/PO字段与回传按C-04确认 | 备货进度映射待定 | 原申请人/CR/主管 | PARTIAL | CONFIRMED-003 | UPD-028；业务状况与库存进度不能混同 |
| MR-03 | 完成或取消 | 授权岗位待定 | 记录已完成/已取消；后续预约和取消关联须确认 | 已完成/已取消 | CR/主管或原申请人（待定） | PARTIAL | CONFIRMED-004 | UPD-028，C-04/C-07/C-13；不默认自动开工或取消合同 |

## FLOW-FINANCE

- 名称：08 完工资料、开票与收款
- 状态：PARTIAL
- 摘要：按完工资料核对正常/欠件出口；特殊原因、低额原因明确存在，授权、合同账期及核销政策仍待确认。

| 节点 | 名称 | 角色 | 动作 | 状态 | 下一角色 | 判定 | Decision | 说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FIN-01 | 核对完工资料 | 财务/资料提供岗位 | 核对完工纸、照片、客户确认PO；各服务适用清单按C-08确认 | 待开票/欠文件 | 财务/补件岗位 | PARTIAL | CONFIRMED-017 | UPD-032，不用任意附件冒充照片或状态冒充原件 |
| FIN-02 | 补件或说明例外 | 财务/批准岗位待定 | 补件后按正常出口处理；特殊开票写原因，授权按C-03确认 | 开票条件或例外授权待确认 | 财务 | PARTIAL | CONFIRMED-017 | UPD-033，不默认赋予管理员审批权 |
| FIN-03 | 开票与记录 | 财务 | 两日期默认当天，不需要税率；描述合同/PO/PM period；低额写原因 | 已开票（实际规则待逐项确认） | 财务/客户 | PARTIAL | CONFIRMED-017 | UPD-034、UPD-035、UPD-036、UPD-037、UPD-038；编号前缀及金额分配按C-09/C-14 |
| FIN-04 | 收款与对账 | 财务/现场交款岗位待定 | 分别记录开票、收款和服务完成；现场交款与异常核销须明确职责 | 独立收款状态（口径待定） | 财务/业务负责人 | PARTIAL | CONFIRMED-017、PENDING-001 | C-06/C-14，不以工单完工代替收款完成 |
