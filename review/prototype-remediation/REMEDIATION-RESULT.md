# EC 工单系统 Prototype 整改结果

- 整改日期：2026-09-27
- 整改依据：`REMEDIATION-PLAN.md`、`knowledge/decisions/DEC-20260927-真实业务流程讨论.md`、`review/prototype-knowledge-audit/PROTOTYPE-KNOWLEDGE-AUDIT.md`
- 范围：仅 Prototype、演示 Mock、整改追踪与回归证据；未进入正式系统开发，未修改 Decision、PRD 或原始 Knowledge Audit。
- 整改前基线：Commit `d7ebc14e9b8e2492ab0c8c80820bf2add054638f`；Tag `prototype-before-remediation-2026-09-27` 指向同一提交。
- 备份：`backups/prototype-before-remediation-20260927/`。整改前原型、原审查、计划与 Decision 已保存；末轮复核原审查 69/69、Decision 1/1、原计划 1/1 文件与备份 SHA-256 一致。**BACKUP VERIFIED = YES**。

## 1. 最终状态

| 状态 | 整改项 | 结果 |
|---|---|---|
| **FIXED** | R-01、R-03、R-04、R-06、R-07、R-11；R-08、R-09、R-13；R-02、R-10、R-14；R-15 | 13 项已按用户指定四批顺序实施，逐项内容见 `REMEDIATION-TRACE.md`。R-04 和 R-14 的“完成”只指已确认的业务可见主链。 |
| **PENDING** | R-05 | 仓储/库存主系统、读写与同步责任未获决策；MR→SP/PO→材料就绪只作原型交接演示。 |
| **PENDING** | R-12 | 角色×页面×动作×区域权限矩阵未获人工确认；现有导航不作为正式授权定义。 |
| **BLOCKED** | 无 | 两项 PENDING 未阻塞其他已确认整改。 |
| **NO-CHANGE** | 财务发票/收款与 CALL 完工状态分离 | 保留报价关联的财务链；没有把 SR 完工等同于开票或收款完成，符合 CONFIRMED-017。 |

另有未转为确定实现的决策边界：CP/SR 完整映射；PENDING-001 现场收款后的登记、交款、对账；PENDING-002 CM/PM 冲突；Tender 内部审批、OCR、回标；仓储同步细则、完整权限矩阵。它们均未被写成已确认业务规则。

## 2. 修改前 → 修改后场景结果

“修改前”取原始 Knowledge Audit 第 1 节结论；“修改后”是本轮 Prototype Playwright 回归结果。PASS 只表示已确认范围的原型交接可走通，不表示待决规则、真实外部系统集成或生产验收已完成。

| 场景 | 修改前 | 修改后 | 本轮验证的关键交接 |
|---|---|---|---|
| SCENE-01 普通报价维修 | FAIL | **PASS** | 客户接受最终报价→QUO 中单→成交版物料 MR→仓管材料就绪→CR 正式客户时间→SR→CR 确认完工；普通报价无伪 Tender 编号。 |
| SCENE-02 保养发现问题后二次维修 | PARTIAL | **PASS** | 已成交 M 合同的一次保养仍可提交 SR 并标记需要报价；创建独立维修报价任务，原合同与整期计划保留。 |
| SCENE-03 现场即时维修 | PARTIAL | **PASS（已确认范围）** | 现场 SR 可提出后续报价并由 CR 确认完工；另验证 CS 报价需求先入 CR/TL 队列，再转 QUO。现场现金交接保持 PENDING。 |
| SCENE-04 周期保养 | FAIL | **PASS** | 成交 M 报价的服务周期生成四期计划；第二期独立建 CALL、提交 SR、确认，后续期次保持待排期；未使用 Billing Cycle。 |
| SCENE-05 M+P | PARTIAL | **PASS** | P 缺料时 M 可建期次并完工；P 就绪及施工完工不改写其他 M 期次，双方同源于一张成交报价。 |
| SCENE-06 CM | PARTIAL | **PASS（已确认范围）** | CR/TL 直接指定师傅→通用接单→SR→CR 确认；CM 接单不自动释放或重排 PM。冲突策略保持 PENDING。 |
| SCENE-07 Tender | PARTIAL | **PASS（已确认范围）** | P、M、M+P 标书中标各自建待报价对象；中标本身不建 MR/计划、不代替客户接受；QUO 中单后按类别进入 MR、保养计划或双支。Tender 内部流程保持 PENDING。 |

末轮脚本逐一执行全部 7 个场景，**执行覆盖率 100%（7/7），通过 7/7，失败 0**。脚本在任一场景失败时记录失败并继续其他场景；首轮确曾记录 4 PASS、3 FAIL，问题与修复见 `REMEDIATION-TRACE.md`。末轮机器结果在 `evidence/regression-results.json`，每个场景的末轮页面截图在 `evidence/SCENE-01.png` 至 `evidence/SCENE-07.png`。回归使用相互隔离的浏览器上下文；现场照片/打卡等前置样例由脚本设置，关键业务交接使用原型界面操作与状态断言。

## 3. 交付范围与修改风险

| 对象 | 本轮结果 | 边界或风险 |
|---|---|
| `prototype/index.html` | 新增待完工确认状态和 SR→CR/TL 完工主链；师傅能看到正式客户时间；旧 CM 自动 PM 副作用入口移除；Tender 来源报价中单按钮不再被“标书已中标”误隐藏。 | CP/SR 最终映射仍待决；历史状态不被静默重解释。 |
| `prototype/remediation.js` | 新增 CALL 队列、报价需求移交、客户接受与成交版快照、MR/备货交接、正式预约、整期 M 计划、M/P 独立视图、Tender 分流及演示样例。 | 仓储状态是演示交接，不代表 EC 或仓库通为已确认主系统。数据保存在浏览器 localStorage；已有浏览器资料不被种子覆盖。 |
| `prototype/README.md` | 更新当前原型组成与待决边界。 | 原型没有接入真实库存、采购、财务或通知服务。 |
| `review/prototype-remediation/REMEDIATION-TRACE.md` | 13 项逐项记录修改文件、页面、内容、Decision、场景、结果；R-05/R-12 明确保留。 | 原审查报告和截图保持原样。 |

高风险跨模块交接仍集中在：成交版本与 MR 材料快照、MR 材料就绪与正式预约、M 服务周期与会计 Billing Cycle 隔离、M+P 两支进度、Tender 中标与客户接受的两道门槛，以及 SR 提交与正式完工的分离。上述已在本轮 Prototype 走查通过；真实系统的数据归属、并发、权限和接口行为仍须以待决事项的人工结论为准。

本轮到此停止；等待人工验收 Prototype 整改结果。
