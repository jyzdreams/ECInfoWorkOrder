# EC 工单系统「项目知识库 → UI 原型全量业务一致性审查」

审查日期：2026-09-27  
目标原型：当前 prototype/（通过本地服务启动，按真实页面导航和可见入口操作）  
审查性质：业务一致性与可达性审查；不是 UI 美术验收，也不是生产系统/UAT 验收。  
状态含义：PASS = 有可见证据符合当前基线；PARTIAL = 仅部分覆盖或无法证明闭环；FAIL = 缺失关键步骤或与当前确认决定冲突；BLOCKED = 已实际尝试入口但页面不可达。

## 1. 业务场景矩阵

| 场景 | 知识状态 | 原型覆盖 | 闭环断点 | 结果 |
|---|---|---|---|---|
| SCENE-01 普通报价维修 | CONFIRMED | 有客户详情内的新建 CALL、报价列表/详情/标记中单、备货/采购、派工、师傅端完工单 | 没有独立 CALL 工作队列；中单后不会默认生成可见 MR；材料就绪后的正式客户预约没有区分；师傅提交完工单会直接完成 CALL，没有 CR/主管确认 | FAIL |
| SCENE-02 保养发现问题后二次维修 | CONFIRMED | 有移动端任务/服务记录步骤、SR 历史查看、报价来源中的 Service Report 选项 | SR 页面是历史只读列表；没有师傅提交 SR 时的“需要报价”入口，也没有该选择自动建报价任务的可验证路径 | PARTIAL |
| SCENE-03 现场即时维修 | PARTIAL；现场收款交款/对账为 PENDING | 移动端有现场处理、拍照、完工单及财务发票收款页面 | 未观察到联系报价组、客户接受报价、现场收费与正式报价/商务记录补录的串联；不将待确认的收款内部流程判作错误 | PARTIAL |
| SCENE-04 周期保养 | CONFIRMED | 报价创建/编辑支持 M；会计保养合约按月/季度产生账单期 | 报价没有可见保养周期字段；没有中单后生成整期保养服务计划/到期上门任务。会计账单周期不等于服务计划 | FAIL |
| SCENE-05 M+P | CONFIRMED | 报价可选择 M+P；未发现强制“先 P 后 M”的操作门槛 | 未展示中单后 M 与 P 两条独立任务/计划分流及各自闭环 | PARTIAL |
| SCENE-06 CM | PARTIAL | 分派弹窗有“特殊任务”技能筛选，可直接选师傅 | 未见显式 CM 任务类型及 CR/主管直接指定后的 CM→SR→确认流程；不推断 CM 与 PM 冲突的处理规则 | PARTIAL |
| SCENE-07 Tender | PARTIAL | 有标书列表、详情、新建、模拟扫描导入、中标/未中标/不投标操作及 M/P/M+P 字段 | 详情页标记中标后未见业务类型分流；标书正式回标闭环未证实。Tender 内部流程仍待确认 | PARTIAL |

## 2. 覆盖结论

| 覆盖对象 | 总数 | 已审/已核对 | BLOCKED | 未审 | 覆盖率 |
|---|---:|---:|---:|---:|---:|
| 页面、标签、抽屉、弹窗和流程步骤 | 46 | 45 | 1 | 0 | 100%（BLOCKED 计入覆盖） |
| 业务场景 | 7 | 7 | 0 | 0 | 100% |
| Prototype 实际角色 | 10 | 10 | 0 | 0 | 100% |
| 当前 CONFIRMED Decision | 17 | 17 | 0 | 0 | 100% |

46 个页面/界面状态的统计口径：15 个 PC 主视图、4 个会计标签视图、4 个移动端主视图、4 个师傅端详情/处理步骤、16 个报价/标书/分派/采购/SR/收款/字典交互面板、客户详情与新建 CALL 表单，以及 1 个已尝试但被角色限制阻断的 CR 移动端入口。所有可达界面均标记 REVIEWED；CR 移动端入口标记 BLOCKED 并计入覆盖，未审页面为 0。

审查期间使用隔离的浏览器上下文进行可见交互和模拟状态操作；没有保存任何业务记录到原型的持久数据。没有修改原型代码、PRD、Decision 或业务规则。截图目录现有 67 张 PNG。

### 事实来源及边界

- 当前优先基线：[DEC-20260927 真实业务流程讨论](../../knowledge/decisions/DEC-20260927-真实业务流程讨论.md)，含 17 条 CONFIRMED、2 条 PENDING、1 条 REJECTED。
- 知识库冲突与未确认清单：[CONFLICTS_AND_UNCONFIRMED.md](../../knowledge-base/CONFLICTS_AND_UNCONFIRMED.md)、[OPEN_QUESTIONS.md](../../knowledge-base/OPEN_QUESTIONS.md)。
- 最新需求材料：[12-requirements-latest-20260919.md](../../materials/raw/ec-workorder/12-requirements-latest-20260919.md)。
- 客户需求确认表：[EC工单系统客户需求对接确认表（基于当前原型）.xlsx](../../outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/01-需求确认资料/EC工单系统客户需求对接确认表（基于当前原型）.xlsx)。审查时可见的功能、流程、表单字段和角色权限行均为“待确认”，不能当作客户已签字基线。
- 旧对齐审计：[08-sop-prototype-requirements-alignment-audit.md](../../docs/08-sop-prototype-requirements-alignment-audit.md) 仅作历史冲突线索，不覆盖 2026-09-27 当前 Decision。
- 业务数据均为 Prototype 演示数据。结论仅说明界面当前呈现/操作结果，不代表生产数据、接口或后端权限已实现。

## 3. Prototype 页面与交互面审查矩阵

每行包含可见入口/路由、适用角色、已检查字段/操作及上下游。除最后一行外，均为 REVIEWED。页面结果反映与本轮知识基线的业务一致程度，不代表视觉质量分数。

| 页面 | 页面/入口 | 业务模块 | 角色 | 字段/操作与上下游 | 结果 | 审查状态 |
|---|---|---|---|---|---|---|
| PAGE-001 | PC / 首页 | 概览 | CS、CR、TL、QUO、TENDER、PUR、FIN、ADMIN、BOSS | CALL 状态计数、待办、近期记录；通过卡片进入后续模块 | PARTIAL | REVIEWED |
| PAGE-002 | PC / CALL管理 | 客户主档与 CALL 入口 | CS、CR、TL、ADMIN、BOSS | 实际是客户类型/区域/级别筛选和客户清单；可新增客户、查看客户详情；客户详情内另有 CALL 历史和新建 CALL，不是独立 CALL 工作队列 | PARTIAL | REVIEWED |
| PAGE-003 | PC / 分派中心 | 派工 | CR、TL、ADMIN、BOSS | CALL、区域、技能、师傅、负载、领取单据类型、备注；可打开分派弹窗并确认分派；下游为师傅任务 | PARTIAL | REVIEWED |
| PAGE-004 | PC / 报价管理 | 报价 | CR、QUO、TENDER、ADMIN、BOSS | 状态、M/P/M+P、区域、客户、负责人、日期、报价金额；可新建、报价/编辑、查看详情、标记中单 | PARTIAL | REVIEWED |
| PAGE-005 | PC / 标书管理 | Tender | TENDER、ADMIN、BOSS | 标书编号、项目、客户、金额、日期/截止日、负责人、报价编号；查看、新建、模拟导入、标记中标/未中标/不投标 | PARTIAL | REVIEWED |
| PAGE-006 | PC / 备货管理 | 备货与采购 | PUR、CR、ADMIN、BOSS | 备货单/采购单、关联报价、供应商、金额、材料、采购状态；可查看、编辑材料、下单、发货、入库 | PARTIAL | REVIEWED |
| PAGE-007 | PC / 会计管理默认页（待开票） | 财务 | FIN、ADMIN、BOSS | 待开票合同/周期帐单、待收款、金额与发票统计；开具发票、登记收款 | PARTIAL | REVIEWED |
| PAGE-008 | PC / 报告管理 | Service Report 文件夹 | CS、CR、TL、ADMIN、BOSS | SR 记录、CALL 关联、签名/附件、需要报价字段；查看报告、查看 CALL | PARTIAL | REVIEWED |
| PAGE-009 | PC / 统计报表 | 统计 | CR、TL、PUR、FIN、ADMIN、BOSS | 汇总统计和图表入口；没有发现确认 Decision 中的具体业务状态冲突 | PASS | REVIEWED |
| PAGE-010 | 基础设置 > 字典管理 | 系统设置 | ADMIN、BOSS | 字典清单、增加字典项；不属于确认业务主链 | PARTIAL | REVIEWED |
| PAGE-011 | 基础设置 > 客户管理 | 客户主档 | ADMIN、BOSS | 客户新增、筛选、详情；与 PAGE-002 的客户清单重复 | PARTIAL | REVIEWED |
| PAGE-012 | 基础设置 > 用户管理 | 用户/角色 | ADMIN、BOSS | 用户、角色、部门、状态等；原型展示的用户生效日/并行期等配置未见已批准知识依据 | PARTIAL | REVIEWED |
| PAGE-013 | 基础设置 > 服务器空间 | 存储设置 | ADMIN、BOSS | OSS 区域/桶、备份、清理周期等可配置值；目前属于未确认实现设定 | PARTIAL | REVIEWED |
| PAGE-014 | 基础设置 > Excel 导入 | 批量导入 | ADMIN、BOSS | 展示客户、CALL、报价、发票、收据等导入入口/模板说明；没有生产导入证据 | PARTIAL | REVIEWED |
| PAGE-015 | 基础设置 > 组件库 | UI 组件样例 | ADMIN、BOSS | 展示列表、筛选、抽屉和样例按钮；“新建 CALL”样例按钮点击后无表单/页面动作 | PARTIAL | REVIEWED |
| PAGE-016 | 会计管理 > 发票管理标签 | 发票 | FIN、ADMIN、BOSS | 发票号、Job ID、客户、金额、开票/到期日、付款状态、标记收款等 | PASS | REVIEWED |
| PAGE-017 | 会计管理 > 收款记录标签 | 收款 | FIN、ADMIN、BOSS | 收款编号、关联发票、客户、金额、日期、方式；收款状态独立于 CALL 完工状态 | PASS | REVIEWED |
| PAGE-018 | 会计管理 > 客户档案标签 | 财务客户档案 | FIN、ADMIN、BOSS | Billing Address、联系人、收件人、账期、寄送方式；可新增/变更/删除 | PARTIAL | REVIEWED |
| PAGE-019 | 会计管理 > 保养合约标签 | 合约帐单 | FIN、ADMIN、BOSS | 合约、M 类账单周期/月度与季度账期、开票状态；仅能证明账单周期，不证明服务排期计划 | PARTIAL | REVIEWED |
| PAGE-020 | 移动端 / 师傅首页 | 师傅工作台 | MASTER | 个人待办/任务计数、CALL 卡片；演示登录陈师傅为空，另选周师傅后可见任务 | PARTIAL | REVIEWED |
| PAGE-021 | 移动端 / CALL任务列表 | 师傅任务 | MASTER | CALL 编号、客户、区域、类型、状态、描述；可打开详情和处理 | PARTIAL | REVIEWED |
| PAGE-022 | 移动端 / 主管首页 | 团队工作台 | TL | 团队待分派/已分派与任务卡片 | PARTIAL | REVIEWED |
| PAGE-023 | 移动端 / 分派 | 主管派工 | TL | 待分派/已分派标签、区域、类型、CALL 状态；可打开分派操作 | PARTIAL | REVIEWED |
| PAGE-024 | 师傅 / CALL 详情抽屉 | CALL 详情 | MASTER | 客户、联系人、电话、地址、CALL 类型/状态、内容、服务记录；未见报价请求或 CR 确认入口 | PARTIAL | REVIEWED |
| PAGE-025 | 师傅 / 开始处理工作单（签到步骤） | 到场处理 | MASTER | 处理 CALL 的分步表单；需要点击打卡进入处理 | PARTIAL | REVIEWED |
| PAGE-026 | 师傅 / 服务记录步骤 | Service Report/现场记录 | MASTER | 处理记录、Before/After 照片，必填并提供示例照片，下一步进入完工单 | PARTIAL | REVIEWED |
| PAGE-027 | 师傅 / 完工纸提交步骤 | 完工确认/CP | MASTER | 纸张类型、CP 编号、客户签名、服务内容、日期/费用/图片；提交按钮说明提交后会完成 CALL | FAIL | REVIEWED |
| PAGE-028 | PC / 分派 CALL 弹窗 | 派工 | CR、TL、ADMIN、BOSS | 选择师傅、技能、区域/负载、领取单据类型、备注、确认分派；上游 CALL，后续师傅处理 | PARTIAL | REVIEWED |
| PAGE-029 | 报价详情抽屉 | 报价 | CR、QUO、ADMIN、BOSS | 报价状态、类别、CALL/SR、材料明细、金额、条款、备货状态、报价历史/修订/中单 | PARTIAL | REVIEWED |
| PAGE-030 | 修改修订报价抽屉 | 报价版本编辑 | CR、QUO、ADMIN、BOSS | 标题、关联 CALL/客户/SR、M/P/M+P、负责人、日期、材料行；按钮为保存，没有清晰 R1/R2/R3 版本号/创建动作 | PARTIAL | REVIEWED |
| PAGE-031 | 新增报价表单 | 报价 | CR、QUO、ADMIN、BOSS | 类别、报价来源（含 Tender、Service Report）、客户、CALL/SR、材料、价格、条款；提交新报价 | PARTIAL | REVIEWED |
| PAGE-032 | 报价历史弹窗 | 报价版本 | CR、QUO、ADMIN、BOSS | 报价历史表显示共 1 个版本，唯一记录为 R0（当前版本） | PARTIAL | REVIEWED |
| PAGE-033 | 报价历史版本详情弹窗 | 报价版本 | CR、QUO、ADMIN、BOSS | 查看 R0 的材料、类别、日期、状态和金额；演示报价类别为未设定 | PARTIAL | REVIEWED |
| PAGE-034 | 标记中单弹窗 | 报价中单 | QUO、CR、ADMIN、BOSS | 必填客户订单号、系统自动生成且可改的 Tender No、标书金额；“同时启动采购流程”为默认未勾选 | FAIL | REVIEWED |
| PAGE-035 | Tender 详情抽屉 | 标书 | TENDER、ADMIN、BOSS | 客户/地区/负责人/金额/期限/结果/竞争者/报价关联；可编辑、安排排程、标记中标/未中标/不投标、删除 | PARTIAL | REVIEWED |
| PAGE-036 | 新建 Tender 表单 | 标书 | TENDER、ADMIN、BOSS | 项目、客户、区域、负责人、金额、日期、来源/回标方式、业务类别、说明 | PARTIAL | REVIEWED |
| PAGE-037 | 匯入標書上传弹窗 | Tender 导入 | TENDER、ADMIN、BOSS | 图片/PDF 上传区及模拟扫描按钮 | PARTIAL | REVIEWED |
| PAGE-038 | Tender 识别结果预览 | Tender 导入 | TENDER、ADMIN、BOSS | 模拟识别带入编号/项目/客户/责任人/类别/金额/日期/区域；页面明确标注“模拟扫描” | PARTIAL | REVIEWED |
| PAGE-039 | 备货/采购详情抽屉 | 采购 | PUR、ADMIN、BOSS | 关联报价、供应商、采购单金额/状态/材料行；可编辑、标记发货、入库；未显示 MR 对象 | PARTIAL | REVIEWED |
| PAGE-040 | Service Report 详情弹窗 | SR 文件夹 | CR、TL、ADMIN、BOSS | SR/CALL/客户/服务内容/签署/需要报价状态；详情为查看态，无新建/提交/确认操作 | PARTIAL | REVIEWED |
| PAGE-041 | 登记收款步骤 1 | 收款 | FIN、ADMIN、BOSS | 选择待收发票后进入登记；以报价/发票链路为入口 | PASS | REVIEWED |
| PAGE-042 | 登记收款步骤 2 | 收款 | FIN、ADMIN、BOSS | 发票号、客户、金额、日期、方式（含现金）、收据号、备注；确认收款 | PARTIAL | REVIEWED |
| PAGE-043 | 新增字典项弹窗 | 系统设置 | ADMIN、BOSS | 字典项/选项配置保存；业务含义未在本轮确认 | PARTIAL | REVIEWED |
| PAGE-044 | 客户详情抽屉 | 客户与 CALL | CS、CR、TL、ADMIN、BOSS | 客户资料、历史 CALL、+新建报价、+新建 CALL；是本次实际验证到的 CALL 创建入口 | PARTIAL | REVIEWED |
| PAGE-045 | 新建 CALL 弹窗 | 客户来单 | CS、CR、TL、ADMIN、BOSS | 客户类型、客户、区域、主管、联系人/电话、来源、地址、CALL 类型/项目/优先级、描述/附件；可提交 CALL，后续去向未通过保存动作验证 | PARTIAL | REVIEWED |
| PAGE-046 | CR 移动端模式尝试 | CR 移动工作台 | CR | 实际点击“移动端”后提示“移动端工作台仅限主管和师傅使用”，未渲染页面 | BLOCKED | BLOCKED |

## 4. 角色职责与访问面核对

Prototype 实际提供 10 个角色登录卡。角色页面范围与操作已逐一实际切换查看。客户确认表中的角色权限矩阵仍为“待确认”，因此下面的“可见/操作”是原型现状，不等同已批准权限。

| 角色 | 实际可见模块/页面 | 已观察操作 | 与当前业务基线的审查结果 |
|---|---|---|---|
| CS 客户服务 | 首页、CALL管理（客户清单）、分派中心、报告管理、基础设置；可从客户详情新建 CALL | 新增客户、查看客户历史 CALL、新建 CALL | 可建 CALL，但没有 CS→CR/主管的报价任务动作；报价模块不可见。角色权限仍 PENDING |
| CR 客户关系部 | 首页、CALL管理、分派、报告、报价、备货、统计、设置；切换移动端被拒绝 | 客户/CALL详情、派工、报价等可见 | 报价/派工覆盖部分责任；SR 确认及正式施工时间操作未见。移动端是否需要开放待权限矩阵确认 |
| TL 主管 | 首页、CALL管理、分派、报告、统计、设置；移动端有主管首页/分派 | 查看待派/已派、按区域/技能选择师傅 | 可执行派工；没有材料完成后确认正式客户时间的闭环。移动数据标为九龍团队但卡片含多个区域，数据范围未确认 |
| MASTER 师傅 | 移动首页、CALL任务、详情、签到、服务记录、完工单 | 打卡、填写记录、添加示例照片、继续到完工单 | 师傅可以直接提交完工纸并让 CALL 完成，与 CONFIRMED-010 冲突 |
| QUO 报价组 | 首页、报价管理 | 新建/修改报价、查看历史、标记中单 | 报价角色存在；当前示例历史仅 R0，采购启动是可选项 |
| TENDER 标书角色 | 首页、报价管理、标书管理 | 查看/新建/导入标书、报价关联、中标状态操作 | 标书基础页面存在；中标后 M/P/M+P 路由及正式回标未证实 |
| PUR 仓管/采购 | 首页、备货管理、统计报表 | 备货单/采购单查看、材料维护、下单/发货/入库 | 可处理采购/备货演示记录；无可见 MR 接收或基于 MR 的短缺采购闭环；仓务主系统未确认 |
| FIN 财务 | 首页、会计管理、统计报表 | 开票、登记收款、查看收款记录/客户档案/保养合约 | 发票/收款与 CALL 状态分离，符合 CONFIRMED-017；收款链路是发票/报价链路 |
| ADMIN 管理员 | 全部 PC 模块及设置 | 全页面/大部分管理操作 | 原型全权限，不代表最终管理授权 |
| BOSS 管理层 | 全部 PC 模块 | 全页面可见 | 范围与 ADMIN 接近；当前没有已批准的 BOSS 权限矩阵 |

额外入口核验：组件库的两个“+新建 CALL”样例按钮点击后没有打开表单或路由；实际 CALL 创建入口在客户详情抽屉中。CR 点击移动端切换会被限制；该限制可能是原型设计，但目前没有批准权限矩阵支持它。

## 5. CONFIRMED Decision 逐条核对

当前唯一 Decision 文件中的 CONFIRMED 项共 17 条，全部已映射并核对。下表中的 PASS/PARTIAL/FAIL 仅描述 Prototype 对当前 Decision 的支持程度。

| Decision | 当前确认规则 | Prototype 位置 | 覆盖情况 / 冲突 | 结果 |
|---|---|---|---|---|
| CONFIRMED-001 | 普通维修/工程为基本业务主干 | PAGE-002/003/004/006/020-027 | 客户内可建 CALL，但独立 CALL 列表和关键下游流程缺口 | PARTIAL |
| CONFIRMED-002 | 先报价、保养发现后二次维修、现场即时维修三种情况 | PAGE-002/004/008/020-027 | 页面有相关字段/步骤，缺少二次报价触发和现场报价串联 | PARTIAL |
| CONFIRMED-003 | 客户接受报价并中单后进入材料及施工准备 | PAGE-029/034/039 | 中单之后可不勾采购流程，确认后仍显示未建备货单 | PARTIAL |
| CONFIRMED-004 | 中单后可预排师傅/预计时间，但不是正式客户预约 | PAGE-003/028 | 有派工，未区分预排时间和正式客户时间 | PARTIAL |
| CONFIRMED-005 | 材料准备好后由 CR/主管和客户确认正式施工时间 | PAGE-003/006/028/039 | 没有材料就绪→CR/TL 正式预约动作 | FAIL |
| CONFIRMED-006 | 系统按成交报价材料自动生成 MR | PAGE-004/006/029/034/039 | 无 MR 对象/自动生成证据；采购启动需手动勾选 | FAIL |
| CONFIRMED-007 | 客户确认且报价组中单后才生成 MR | PAGE-029/034 | 可标记中单，但没有客户接受步骤与自动 MR 条件链 | PARTIAL |
| CONFIRMED-008 | 报价组负责完整报价生命周期及 R1/R2/R3 历史 | PAGE-004/029-034 | QUO 角色和修订入口存在；示例仅 R0，修改表单未见明确版本生成 | PARTIAL |
| CONFIRMED-009 | 报价任务有 CS 经 CR/TL、CR 直接、Tender、SR 需报价四个入口 | PAGE-002/004/005/008/031/044/045 | 可选报价来源包含 Tender/SR；没有 CS→CR/TL 发起、SR 选需报价并自动建任务的完整入口 | PARTIAL |
| CONFIRMED-010 | 师傅提交 Service Report 后由 CR/TL 简单确认再正式完工 | PAGE-026/027/040 | 师傅端使用完工纸提交，底部说明提交后完成 CALL；无 CR/TL 确认 | FAIL |
| CONFIRMED-011 | M/P/M+P 在报价阶段确定 | PAGE-004/030/031 | 表单提供三个选项，但演示记录多为未设定，无法验证后续动作 | PARTIAL |
| CONFIRMED-012 | M 报价确定保养周期，中单生成全周期保养计划 | PAGE-019/030/031 | 账单周期可见，报价没有服务周期，未生成上门计划 | FAIL |
| CONFIRMED-013 | M+P 的 M 与 P 分别推进，不强制先后 | PAGE-004/030/031/035 | 未发现 P→M 强制门槛；但也未观察到两条独立流程 | PARTIAL |
| CONFIRMED-014 | CM 业务真实存在 | PAGE-003/023/028 | 仅见通用“特殊任务”技能选项，没有明确 CM 任务记录 | PARTIAL |
| CONFIRMED-015 | CM 一般由 CR/TL 指定师傅；现场后 SR 并确认完工 | PAGE-003/008/023/028/040 | CR/TL 可派工，SR 列表可查看；CM 类型及确认链缺失 | PARTIAL |
| CONFIRMED-016 | Tender 主要为政府项目；中标后按 M/P/M+P 进入业务 | PAGE-005/035-038 | 政府类标书记录和分类字段可见；中标详情没有清晰类别路由 | PARTIAL |
| CONFIRMED-017 | 正常发票/收款主要关联报价；CALL 完工与收款不是同状态 | PAGE-007/016-019/041/042 | 发票和收款在独立会计视图，状态独立，符合确认规则 | PASS |

核对计数：CONFIRMED 总数 17；已核对 17；未核对 0；覆盖率 100%。另有 PENDING-001/002 和 REJECTED-001 已作为边界核验：没有把现场交款/对账或 CM 冲突规则当成已确认，也未发现 Prototype 强制固定先 P 后 M。

## 6. 用户指定逐项检查清单（28 项）

| # | 检查项 | 页面证据 | 结果 | 说明 |
|---:|---|---|---|---|
| 1 | 报价组负责报价生命周期 | PAGE-004/029/030 | PARTIAL | QUO 角色与报价操作存在，版本化不充分 |
| 2 | 报价支持多个 R1/R2/R3 版本 | PAGE-032/033 | PARTIAL | 实际打开报价历史只有 R0 |
| 3 | 客户接受最终报价后由报价组中单 | PAGE-034 | PARTIAL | 可由 QUO 标记中单；没有可见的客户接受凭据/状态 |
| 4 | 报价包含材料信息 | PAGE-029/031/033 | PASS | 明细含材料/服务名、数量、价格、备注 |
| 5 | 只有中单后才生成 MR | PAGE-034/039 | FAIL | 未见 MR；中单时可不启动采购，预置中单报价也有未建备货单 |
| 6 | MR 来自最终成交报价材料 | PAGE-029/034/039 | FAIL | 未见 MR 对象或最终版本材料自动转入 |
| 7 | MR 名称/含义为材料申请单 | PAGE-006/039 | FAIL | 备货/采购页未显示 MR；本轮不能将 SP/备货单假定为 MR |
| 8 | 仓管根据 MR 备货 | PAGE-006/039 | PARTIAL | 有仓管/采购处理界面，但没有基于 MR 收单的字段/操作 |
| 9 | 库存不足进入采购 | PAGE-006/039 | PARTIAL | 有采购单及供应商操作，未看到从 MR 短缺行转 PO 的操作 |
| 10 | 中单后可预排师傅/预计施工时间 | PAGE-003/028 | PARTIAL | 可以分派师傅，未看到与中单/材料阶段绑定的预排日期 |
| 11 | 预计时间不是正式客户预约时间 | PAGE-003/028 | FAIL | 没有同时呈现预排与客户确认两种不同日期/状态 |
| 12 | 材料准备好后 CR/TL 确认正式施工时间 | PAGE-003/006/028/039 | FAIL | 未见准备完成后的 CR/TL 预约动作 |
| 13 | Service Report 可选择“需要报价” | PAGE-008/040 | FAIL | SR 详情只有查看态；创建/提交表单无该选择入口 |
| 14 | SR 需要报价后产生报价任务 | PAGE-004/008/031/040 | FAIL | 报价来源有 Service Report，未看到 SR 触发创建任务 |
| 15 | 师傅提交 SR 不能直接算正式完工 | PAGE-026/027 | FAIL | 完工纸表单说明提交报告后会完成 CALL |
| 16 | CR/TL 确认后才正式完工 | PAGE-027/040 | FAIL | 师傅端未出现 CR/TL 待确认节点 |
| 17 | 报价阶段选择 M/P/M+P | PAGE-030/031 | PASS | 创建/编辑报价提供 M、P、M+P 三选项 |
| 18 | M 可设置保养周期 | PAGE-030/031 | FAIL | 未看到周期字段 |
| 19 | M 中单生成整期保养计划 | PAGE-019/034 | FAIL | 有周期账单；没有服务计划/到期 CALL |
| 20 | M+P 不强制先 P 后 M | PAGE-030/031/035 | PASS | 未发现固定顺序门槛；两条流程本身仍未展示 |
| 21 | CM 真实存在 | PAGE-003/028 | PARTIAL | 有“特殊任务”标签，无显式 CM 记录/类型 |
| 22 | CM 通常由 CR/TL 直接指定师傅 | PAGE-003/028 | PARTIAL | 角色可分派，不能证明该动作专用于 CM |
| 23 | CM 冲突处理仍 PENDING | PAGE-003/028 | PASS | 未发现师傅接受/拒绝并自动重排 PM 的具体规则 |
| 24 | Tender 主要用于政府项目 | PAGE-005/035/038 | PARTIAL | 多条政府标书示例，但也有非政府项目；“主要”不能由样例数量定案 |
| 25 | Tender 中标后进入 M/P/M+P | PAGE-035/036/038 | PARTIAL | 类别字段存在，详情中标操作未显示下游业务路由 |
| 26 | 工单完工与收款完成不是同一状态 | PAGE-016/017/027/041/042 | PASS | 会计发票/收款状态与 CALL 完工分别维护 |
| 27 | 现场即时维修可以存在现场收款 | PAGE-027/042 | PARTIAL | 财务收款方式含“现金”，但只证实发票收款页，不等于现场即时收款路径 |
| 28 | 现场收款后登记/交款/对账仍 PENDING | PAGE-041/042 | PASS | 没有发现 Prototype 固化师傅交款/对账规则；PENDING 边界未被替代 |

## 7. 问题清单

### P0

#### P0-01｜师傅提交完工纸后直接完成 CALL，缺少 CR/主管确认

- 类型：WRONG、INCOMPLETE
- 模块/页面：移动端师傅处理；PAGE-026、PAGE-027
- 知识依据：CONFIRMED-010 要求师傅提交 Service Report 后，由 CR/主管简单确认，再正式完工。
- Prototype 当前行为：关联报价的工单在分派时系统选定“完工单”；师傅打卡、填写现场记录并上传 Before/After 后进入 CP；表单底部直接写明“提交报告後會完成 CALL”。未见 CR/TL 的待确认队列/确认动作。
- 影响：完工责任人错误，报告类型和状态转移与当前确认流程不一致，直接影响 SCENE-01/02/03/04/06 的施工闭环。
- 截图：[mobile-zhou-check-in.png](screenshots/mobile-zhou-check-in.png)、[mobile-zhou-report.png](screenshots/mobile-zhou-report.png)、[mobile-zhou-call-detail.png](screenshots/mobile-zhou-call-detail.png)
- 建议方向：按确认的 SR→CR/TL 确认→完工补出单据/状态节点；分别确认 SR 与 CP 的选择条件。

### P1

#### P1-01｜CALL 管理主视图实际是客户清单，CALL 工作队列入口藏在客户详情

- 类型：MISSING、INCOMPLETE
- 模块/页面：PAGE-002、PAGE-044、PAGE-045
- 知识依据：CONFIRMED-001/002/009 的来单、维修及报价任务主链。
- Prototype 当前行为：CALL管理主视图显示客户类型/区域/级别及客户记录，没有独立 CALL 清单/状态筛选；通过客户详情的历史 CALL 区才可新建 CALL。创建表单存在并可打开，所以结论不是“完全不能建 CALL”；问题是主视图名称与内容不匹配，CALL 队列和客户内入口分离，提交后的下游未在本次保存验证。
- 影响：CS/CR 难以从工作队列追踪 CALL 生命周期，也难以从队列执行需要的分派/报价动作。
- 截图：[02-workorder-admin.png](screenshots/02-workorder-admin.png)、[extra-customer-new-call.png](screenshots/extra-customer-new-call.png)
- 建议方向：明确 CALL 清单/客户主档的导航边界；让 CALL 创建及历史入口在主业务导航中可发现。

#### P1-02｜中单并不自动生成 MR，采购启动为可选人工动作

- 类型：WRONG、INCOMPLETE
- 模块/页面：PAGE-034、PAGE-039
- 知识依据：CONFIRMED-006/007：客户确认报价且 QUO 确认中单后，系统根据最终成交报价材料自动生成 MR。
- Prototype 当前行为：标记中单弹窗的“同时启动采购流程”默认不勾选。隔离上下文中填写客户订单号并确认中单后，报价显示已中单，但备货状态仍为“未建立备货单”；现有已中单的 QT-20260621-008 也显示未建立备货单。未见 MR 编号或从最终报价材料生成的 MR 行。
- 影响：报价中单与仓管后续之间存在断点，无法保证只有接受的最终报价材料进入材料申请。
- 截图：[extra-win.png](screenshots/extra-win.png)、[extra-win-confirmed-isolated.png](screenshots/extra-win-confirmed-isolated.png)、[action-procurement-detail.png](screenshots/action-procurement-detail.png)
- 建议方向：把“客户接受→QUO 中单→最终版材料生成 MR”的系统链明确呈现；采购/备货不能替代 MR 概念。

#### P1-03｜仓管页面只有备货/采购记录，没有 MR 接收及缺料转采购链

- 类型：MISSING、INCOMPLETE；另有 KNOWLEDGE CONFLICT
- 模块/页面：PAGE-006、PAGE-039
- 知识依据：CONFIRMED-006/007；知识库 RULE-018/RULE-019、Q-007 仍记录备货、采购与数据主系统问题待定/冲突。
- Prototype 当前行为：备货详情以 SP/备货单和手动维护的 PO/供应商/材料/状态为中心；可以入库或更新采购状态，但没有标识 MR、接收 MR、按 MR 物料核对、缺料行转 PO 的闭环。
- 影响：仓管承担的 MR 处理责任无法从 UI 追踪；采购/库存数据的主系统边界仍未解决。
- 截图：[06-procurement-admin.png](screenshots/06-procurement-admin.png)、[action-procurement-detail.png](screenshots/action-procurement-detail.png)
- 建议方向：先基于最新 MR 决策定义 MR、库存检查、缺料 PO、备货完成的数据关系；采购主系统规则须保留为待决事项。

#### P1-04｜预排师傅与正式客户预约没有分开的字段/状态

- 类型：MISSING、INCOMPLETE
- 模块/页面：PAGE-003、PAGE-028、PAGE-039
- 知识依据：CONFIRMED-004/005。
- Prototype 当前行为：分派弹窗可选师傅，并自动判定完工单/服务报告类型；未见“预计施工时间（预排）”与“客户确认正式时间”两组字段，也没有材料已准备→CR/TL 联系客户确认的操作。
- 影响：用户不能区分资源预排和正式客户承诺，材料缺货时也无法显示预约前置条件。
- 截图：[action-dispatch-assign.png](screenshots/action-dispatch-assign.png)、[action-procurement-detail.png](screenshots/action-procurement-detail.png)
- 建议方向：按 CONFIRMED-004/005 显示两个不同时间概念、责任角色和材料就绪门槛。

#### P1-05｜报价版本历史只有 R0，修订入口没有可见版本生成步骤

- 类型：INCOMPLETE
- 模块/页面：PAGE-030、PAGE-032、PAGE-033
- 知识依据：CONFIRMED-008 明确报价组负责 R1/R2/R3 等版本历史。
- Prototype 当前行为：打开报价历史显示“共 1 个版本”，唯一记录为 R0（当前版本）；“修改修订报价”打开普通编辑表单，表单未显示下一版本号、版本沟通状态或新旧版本对比。本轮未保存编辑，因此未推断保存后的内部行为。
- 影响：无法从已呈现界面核对客户收到的 R1/R2/R3 和最终中单版本。
- 截图：[extra-history.png](screenshots/extra-history.png)、[extra-history-detail.png](screenshots/extra-history-detail.png)、[quote-revision.png](screenshots/quote-revision.png)
- 建议方向：明确保存修订时的版本生成、历史快照和最终成交版本追溯。

#### P1-06｜SR“需要报价”无可操作入口，报价来源字段不能证明自动建任务

- 类型：MISSING、INCOMPLETE
- 模块/页面：PAGE-008、PAGE-031、PAGE-040
- 知识依据：CONFIRMED-009；保养发现维修问题时 SR 选择需要报价并自动产生报价任务。
- Prototype 当前行为：SR 文件夹显示报告列表，详情可查看 CALL 和“需要报价”状态，但详情只读；报价新建表单有 Service Report 来源选择。未见师傅提交 SR 时可勾选“需要报价”，也未见选中后自动创建报价任务的交接记录。
- 影响：SCENE-02 的发现问题→二次报价链不能从 SR 页面实际启动。
- 截图：[08-srfolder-admin.png](screenshots/08-srfolder-admin.png)、[action-sr-report-detail.png](screenshots/action-sr-report-detail.png)、[action-quotation-new.png](screenshots/action-quotation-new.png)
- 建议方向：让 SR 提交表单中的需要报价选择与 QUO 任务创建可追踪关联。

#### P1-07｜M 维护报价缺服务周期及整期保养计划

- 类型：MISSING、INCOMPLETE
- 模块/页面：PAGE-019、PAGE-030、PAGE-031
- 知识依据：CONFIRMED-011/012。
- Prototype 当前行为：报价类别支持 M，但报价表单没有月/季/年服务周期字段；会计保养合约页展示月度/季度帐单周期，不是保养到期任务或上门计划。
- 影响：M 类无法支撑按合约周期自动产生整期维护任务，也无法由 CR/TL 逐次排期。
- 截图：[action-quotation-new.png](screenshots/action-quotation-new.png)、[action-finance-contracts.png](screenshots/action-finance-contracts.png)
- 建议方向：将服务周期/合同周期与会计开票周期分开建模并呈现。

#### P1-08｜Tender 中标操作未衔接到 M/P/M+P 业务分流

- 类型：INCOMPLETE；Tender 内部步骤仍 PENDING
- 模块/页面：PAGE-005、PAGE-035-038
- 知识依据：CONFIRMED-016；标书内部流程详细规则仍待确认，知识库 RULE-020/Q-018 未批准正式闭环。
- Prototype 当前行为：Tender 有中标按钮、报价关联和 M/P/M+P 类别字段；标记中标详情没有可见的按类别创建报价/合同/维修流程动作。导入扫描按钮明确为模拟扫描。
- 影响：政府标书胜出后去向不透明，可能将演示状态误当成投标和项目承接闭环。
- 截图：[action-tender-detail.png](screenshots/action-tender-detail.png)、[action-tender-import.png](screenshots/action-tender-import.png)、[extra-tender-import-recognized.png](screenshots/extra-tender-import-recognized.png)
- 建议方向：待业务确认 Tender 内部流程后，再明确中标→M/P/M+P 路由及回标结果记录。

#### P1-09｜普通报价标记中单也强制填写 Tender No/标书金额

- 类型：WRONG
- 模块/页面：PAGE-034
- 知识依据：CONFIRMED-002/003/016 将普通维修报价与 Tender 项目区分；Tender 主要用于政府项目。
- Prototype 当前行为：从普通维修报价 QT-20260621-002 打开“标记中单”，弹窗强制客户订单号、Tender No（自动给出 TD 编号）及标书金额；Tender 信息被统一塞入报价中单表单。
- 影响：普通维修报价被迫填写标书概念，容易产生假的 Tender 编号/金额及混淆报价与标书实体。
- 截图：[extra-win.png](screenshots/extra-win.png)、[quote-detail-current.png](screenshots/quote-detail-current.png)
- 建议方向：只在确属 Tender 的业务链使用 Tender 字段；普通报价继续保留 Customer Order 等必要信息。

#### P1-10｜角色权限基线未批准，当前导航不能被当成正式职责矩阵

- 类型：PENDING
- 模块/页面：PAGE-001-046
- 知识依据：客户确认表角色权限行全部待确认；知识库也明确没有正式角色/权限矩阵及真实账号越权测试。
- Prototype 当前行为：10 个角色导航范围明显不同；CR 无法使用移动端；CS 可从客户详情建 CALL；TL 可见跨多个区域的师傅/工单。未发现已批准权限表为这些边界背书。
- 影响：无法对隐藏/可见按钮作“权限正确/错误”的最终判定，也不能把管理员全权限等同最终授权。
- 截图：[role-cs.png](screenshots/role-cs.png)、[role-cr.png](screenshots/role-cr.png)、[role-tl.png](screenshots/role-tl.png)、[role-master.png](screenshots/role-master.png)、[role-cr-mobile.png](screenshots/role-cr-mobile.png)
- 建议方向：保留当前角色表现为原型现状；客户确认角色矩阵后再验收授权。

### P2

#### P2-01｜Tender 演示数据的所有截止日期均早于当前审查日期

- 类型：UI、数据一致性
- 模块/页面：PAGE-005、PAGE-035-038
- Prototype 当前行为：标书示例截止日期集中于 2026-05 至 2026-08，审查日为 2026-09-27；仍在“待投标”的记录显示已逾期。
- 影响：演示无法反映当前进行中投标的时间状态，容易误读列表指标。
- 截图：[action-tender-detail.png](screenshots/action-tender-detail.png)、[extra-tender-import-recognized.png](screenshots/extra-tender-import-recognized.png)
- 建议方向：展示数据加演示日期说明，或更新可用于走查的有效样例。

#### P2-02｜多个页面首次加载有 favicon.ico 404

- 类型：UI
- 模块/页面：初始页及各导航页
- Prototype 当前行为：Playwright Console 报 Failed to load resource；定位到 http://localhost:18767/favicon.ico，HTTP 404；未观察到相应页面 JavaScript 异常。
- 影响：控制台持续噪声；未见主要业务页面因此无法打开。
- 截图：可结合 [00-initial.png](screenshots/00-initial.png)；错误来源是浏览器网络响应。
- 建议方向：提供 favicon 或移除无效请求。

#### P2-03｜报价类别演示数据未设定，已中单报价备货状态不一致

- 类型：数据一致性、INCOMPLETE
- 模块/页面：PAGE-004、PAGE-029、PAGE-033、PAGE-039
- Prototype 当前行为：查看的 QT-20260621-002 类别为“未设定”；列表多条类别显示“-”；已中单 QT-20260621-008 仍显示“未建立备货单”，而 QT-20260621-004 显示已下单。
- 影响：M/P/M+P 与中单后材料链无法用现有演示数据进行一致走查。
- 截图：[04-quotations-admin.png](screenshots/04-quotations-admin.png)、[quote-detail-current.png](screenshots/quote-detail-current.png)
- 建议方向：统一演示数据中的报价类别、版本和中单/备货状态，避免使用未设定记录验证计划功能。

#### P2-04｜Before/After 必填，但不可拍照地点豁免尚未确认

- 类型：PENDING、EXTRA
- 模块/页面：PAGE-026/027
- 知识依据：知识库 Q-009、RULE-010 对照片例外及数量有待确认/冲突。
- Prototype 当前行为：师傅提交步骤要求 Before/After 照片并提供示例照片；未见不可拍照原因或替代证明入口。
- 影响：在不允许拍照的客户/地点可能无法完成表单；照片数量规则也未从界面证据定案。
- 截图：[mobile-zhou-check-in.png](screenshots/mobile-zhou-check-in.png)
- 建议方向：先确认例外规则，再决定是否增加豁免/替代证明字段。

#### P2-05｜组件库里的 CALL 按钮属于不可用样例，不应视为业务入口

- 类型：UI
- 模块/页面：PAGE-015
- Prototype 当前行为：组件库两个“+ 新建 CALL”按钮点击后没有弹窗或页面动作；实际创建入口在 PAGE-044 客户详情。
- 影响：设计样例与业务入口容易混淆；不是独立 CALL 创建功能。
- 截图：[extra-component-new-call.png](screenshots/extra-component-new-call.png)、[extra-customer-new-call.png](screenshots/extra-customer-new-call.png)
- 建议方向：将样例按钮明确标注为样例，或连接到真实入口。

#### P2-06｜TL 区域范围提示与移动端示例 CALL 区域不一致

- 类型：PENDING、数据/权限风险
- 模块/页面：PAGE-022/023
- 知识依据：正式角色/区域权限矩阵尚未批准。
- Prototype 当前行为：移动端标题显示“九龍團隊”，首页任务卡覆盖 1、2、3 区；不能据此判断是越权还是演示数据。
- 影响：区域数据范围无法作为授权验收证据。
- 截图：[mobile-tl-tlHome.png](screenshots/mobile-tl-tlHome.png)、[mobile-tl-dispatch.png](screenshots/mobile-tl-dispatch.png)
- 建议方向：确认 TL 数据范围后更新演示数据和角色可见范围。

#### P2-07｜存储区域与自动清理周期在原型中已具体化，但无确认依据

- 类型：EXTRA、PENDING
- 模块/页面：PAGE-013
- 知识依据：没有确认的 OSS 区域/保留期限/删除政策；确认表仍待确认。
- Prototype 当前行为：设置页展示香港 OSS endpoint/bucket、每日备份、365 天自动清理等具体配置值。
- 影响：用户可能将示意设置误认为已批准的数据驻留和文件保留政策。
- 截图：[settings-server.png](screenshots/settings-server.png)
- 建议方向：标明演示/待确认，数据保留和部署区域需另行确认。

## 8. 知识源冲突与待确认事项

下列内容必须保留为知识边界，不能因为 Prototype 有某个字段/按钮就把它提升为已确认需求。

| 编号 | 内容 | 来源现状 | 本轮处理 |
|---|---|---|---|
| KNOW-01 | 完工是否直接由师傅提交完成，与是否需要独立确认状态 | 知识库 RULE-013/Q-004 记录早期 SOP、F033、其他资料之间存在冲突；当前 DEC-20260927 CONFIRMED-010 明确采用 CR/TL 简单确认后正式完工 | 当前审查按最新人工 CONFIRMED Decision 对 Prototype 判错；同时保留旧资料冲突记录，不自动改写 PRD |
| KNOW-02 | MR、备货/采购流程及采购/库存数据主系统 | 当前 DEC 已确认 MR 定义及自动生成条件；知识库 RULE-018/RULE-019、Q-007 仍有备货责任与仓库通/本系统可写范围冲突 | MR 规则按当前 Decision 判定；仓务数据主系统边界标 KNOWLEDGE CONFLICT/PENDING |
| KNOW-03 | PM/CM 分类、拒单权、CM 与既有 PM 冲突 | RULE-004/RULE-007 与 PENDING-002 | 不把 Prototype 的技能标签解释成已批准的 CM 冲突机制；不接受“接受/拒绝后自动重排”为既定规则 |
| KNOW-04 | 现场即时维修的现金收款、登记、交款、对账 | DEC PENDING-001 | 财务发票收款页含现金方式，但不把它视作师傅现场交款/对账流程已定 |
| KNOW-05 | 不可拍照例外及照片数量 | Q-009、RULE-010（不同资料出现最多 9 张/10 张） | 记录为 PENDING；本轮仅记录当前 Before/After 必填，不判定上限正确性 |
| KNOW-06 | 标书内部导入、回标和中标分流范围 | RULE-020/Q-018；DEC-20260927 只确认 Tender 主要用于政府项目及中标按 M/P/M+P 进入后续业务 | 只核对已确认的类别分流目标，不替客户决定标书详细流程/一期范围 |
| KNOW-07 | 一期需求/范围与权限 | 客户确认表 80 项功能、47 项流程、36 个表单和 244 个字段及角色权限仍标“待确认”；未发现客户签字的一期范围基线 | 不把现有导航/界面数量解释为正式一期批准范围 |

## 9. 按问题类型索引

| 类型 | 关联问题 | 当前判断 |
|---|---|---|
| MISSING | P1-01、P1-03、P1-04、P1-06、P1-07 | CALL 独立队列、MR 接收/生成、正式客户预约、SR 报价触发、M 服务计划未形成可走通界面 |
| WRONG | P0-01、P1-02、P1-09 | 师傅提交即完成与当前确认规则冲突；采购启动默认可跳过 MR 自动链；普通报价要求 Tender No/标书金额 |
| INCOMPLETE | P1-01 至 P1-08、P2-03 | 多个已有模块只有部分节点，不能单凭页面存在判闭环通过 |
| EXTRA | P2-04、P2-07 | 必填照片策略/存储设置包含未确认的具体验证规则或配置 |
| PENDING | P1-10、P2-04、P2-06、P2-07、KNOW-03/04/05/06/07 | 权限、区域、CM 冲突、现场收款内部流程、照片例外、Tender 内部范围未确认 |
| KNOWLEDGE CONFLICT | P1-03、KNOW-01 至 KNOW-07 | 保留项目知识源冲突，不以 Prototype 状态代替业务决策 |
| UI | P2-02、P2-05 | favicon 404、组件库样例按钮无动作 |

## 10. 审查闭合记录

- 页面/界面状态：46/46 已纳入清单；45 个实际可达界面已操作审查，1 个 CR 移动端尝试结果为 BLOCKED；未审 0。
- 业务场景：7/7 全部给出 PASS/PARTIAL/FAIL/BLOCKED 结果；无 NOT TESTED。
- 角色：Prototype 实际 10/10 角色已切换；权限结论受待确认矩阵限制。
- CONFIRMED Decision：17/17，未核对 0。
- 主要操作证据：查看 CALL/客户详情、新建 CALL 表单、派工、报价新建/修改/历史/中单、Tender 新建/导入模拟扫描/中标操作、备货详情、SR 详情、会计标签、两步登记收款、字典新增、师傅打卡/照片/完工单步骤。
- 浏览器错误：定位到 favicon.ico 404；没有发现阻断本轮主要页面打开的 JavaScript 页面异常。
- 修改范围：仅生成本审计 Markdown 与 screenshots/ 证据图片；未更改 Prototype、PRD、Decision、业务规则或业务代码；隔离上下文中的模拟操作不持久化。
