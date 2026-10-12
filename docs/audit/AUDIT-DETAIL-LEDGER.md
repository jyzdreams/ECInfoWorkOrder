# 审计明细台账

日期：2026-10-07。此为主报告的计算底稿；不是修改需求、流程或事实源。C/A/X/M/O/P 的完整含义在列内逐项写出。指标均为定版审计口径，不是生产实现率。

## FLOW 逐项需求审计 1

| FLOW | 业务规则 | 角色 | 状态 | 字段 | 必填规则 | 操作权限 | 数据权限 | 按钮 | 通知 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FLOW-CALL | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | ASSUMPTION |
| FLOW-DISPATCH | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-ONSITE | CONFIRMED | CONFIRMED | ASSUMPTION | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-CLOSE | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-QUOTE | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | ASSUMPTION |
| FLOW-MR | CONFLICT | CONFLICT | CONFLICT | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | ASSUMPTION |
| FLOW-P | ASSUMPTION | CONFIRMED | ASSUMPTION | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-M | ASSUMPTION | CONFIRMED | ASSUMPTION | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-MP | ASSUMPTION | CONFIRMED | ASSUMPTION | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | MISSING |
| FLOW-MAINT-ISSUE | CONFIRMED | CONFIRMED | ASSUMPTION | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-INSTANT | ASSUMPTION | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | MISSING |
| FLOW-SR | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | ASSUMPTION |
| FLOW-CM | ASSUMPTION | CONFIRMED | PENDING_CUSTOMER | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-TENDER | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED |
| FLOW-FINANCE | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | ASSUMPTION |
| FLOW-MASTER | CONFIRMED | CONFIRMED | CONFLICT | CONFIRMED | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | ASSUMPTION |

## FLOW 逐项需求审计 2

| FLOW | 附件 | 异常处理 | 退回 | 取消 | 修改 | 重开 | 历史记录 | 审计记录 | 关联业务对象 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FLOW-CALL | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-DISPATCH | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-ONSITE | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-CLOSE | CONFIRMED | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-QUOTE | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-MR | CONFIRMED | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-P | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-M | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-MP | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-MAINT-ISSUE | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-INSTANT | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-SR | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFLICT | CONFIRMED |
| FLOW-CM | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-TENDER | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-FINANCE | CONFIRMED | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |
| FLOW-MASTER | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | ASSUMPTION | CONFIRMED | CONFIRMED |

## 原始证据追溯清单

| Requirement | Business Rule | Fact Source/Section | Source Level | Confidence | Prototype Mapping | Status |
| --- | --- | --- | --- | --- | --- | --- |
| AUD-R001 | 电话/WhatsApp/现场/邮件人工受理 | S04 p6-8;S02 p7 | L1 | 中 | FLOW-CALL / 来电记录 | CONFIRMED |
| AUD-R002 | CS 答疑解决或转交现场工单 | S08 SOP01 A1/A2/A3 | L3 | 中 | FLOW-CALL / 当前CALL抽屉缺正常答疑出口 | ASSUMPTION |
| AUD-R003 | 客户资料可中英文检索 | S02 p7 00:11:07;S06 P37 | L1 | 高 | FLOW-MASTER / 客户列表已支持，人员缺英文 | CONFIRMED |
| AUD-R004 | 客户可有多份合约、客户记录可重复 | S05 P14/P17 | L1 | 中 | FLOW-MASTER / 客户单合约字段 | CONFIRMED |
| AUD-R005 | JNO 与客户无关、CALL 输入 JNO | S05 P14 | L1 | 中 | FLOW-CALL / JNO仍从客户带出且政府才显示 | CONFIRMED |
| AUD-R006 | CS/Sales/报价/Tender 可新建客户 | S05 P16 | L1 | 中 | FLOW-MASTER / Sales缺角色，Tender缺主档入口 | CONFIRMED |
| AUD-R007 | 客户来电可追溯历史及区域 | S04 p6-8;S01 第二份编号讨论 | L1 | 中 | FLOW-CALL / 客户历史CALL可见 | CONFIRMED |
| AUD-R008 | 人员独立账号及动作留痕 | S03 p4-5 | L1 | 高 | FLOW-MASTER / 快速切角色仅演示 | CONFIRMED |
| AUD-R009 | CR 只看对应区域数据 | S06 P40 | L1 | 中 | FLOW-MASTER / CR实测见1/2/3区 | CONFIRMED |
| AUD-R010 | 指定夜班组长可看全区CALL | S06 P41 | L1 | 中 | FLOW-MASTER / 无夜班范围配置 | CONFIRMED |
| AUD-R011 | 区域人工分派与团队申请审核 | S02 p7 00:28:42;S03 p4 | L2 | 高 | FLOW-DISPATCH / 主干存在 | CONFIRMED |
| AUD-R012 | 同区最低负载推荐、负载3为忙碌 | 原型 getMasters 与旧F016/F018 | L4 | 低 | FLOW-DISPATCH / 阈值和推荐无客户依据 | ASSUMPTION |
| AUD-R013 | 师傅收到指派后一律不得拒绝 | 原型 actionButtons 注释;S08存在选择分支 | L4 | 低 | FLOW-DISPATCH / 缺拒单但未见客户确认 | CONFLICT |
| AUD-R014 | 接单申请审批用独立对象 | S08衍生建议;旧Q005 | L3 | 低 | FLOW-DISPATCH / 待审批仍主状态 | ASSUMPTION |
| AUD-R015 | 现场签到/Before/After/客户签章 | S02 p6-7;S13 SR/照片/CP | L2 | 高 | FLOW-ONSITE / 主干可见 | CONFIRMED |
| AUD-R016 | 不可拍照客户不强制照片 | S03 p4/7 00:46:09 | L1 | 高 | FLOW-ONSITE / 提交无条件Before/After | CONFIRMED |
| AUD-R017 | Before/After 上限各10张 | S02有关照片段;旧流程每类9张 | L1 | 中 | FLOW-ONSITE / 上限口径冲突 | CONFLICT |
| AUD-R018 | SR 编号来自预印纸、师傅录入 | S01 第一份供应方六位介绍与第三份客户00:14:25七位示例；S13 No栏 | L1 | 高 | FLOW-SR / 六位字段与客户七位示例0486580冲突 | CONFIRMED |
| AUD-R019 | 已交SR可编辑及重交 | S01 第二份00:32:05-00:34:23 L1792-1846 | L1 | 高 | FLOW-SR / 已完成编辑入口但会重开状态 | CONFIRMED |
| AUD-R020 | 报价来源可关联2-3个SR或电话/email | S01 第三份00:14:47-00:15:44 L2972-3005 | L1 | 高 | FLOW-SR/QUOTE / 只有单个srNo/sourceSrNo | CONFIRMED |
| AUD-R021 | SR 提交后 CR/主管简单确认才完工 | S07 CONFIRMED-010;S02 p7主管审核；S01早期语义不同 | L3 | 中 | FLOW-CLOSE / 当前工作基线采用，需保留确认出处 | CONFLICT |
| AUD-R022 | SR“需要报价”自动产生任务 | S07 CONFIRMED-009;S08 SOP02 N1-N4 | L3 | 中 | FLOW-MAINT-ISSUE / 第二次提交被旧needQuotation门槛抑制 | ASSUMPTION |
| AUD-R023 | SR 增加保固选项并直接通知采购 | S06 P23 | L1 | 中 | FLOW-ONSITE/MR / 缺选项和通知 | CONFIRMED |
| AUD-R024 | 师傅可脱离CALL自主新建SR | S06 P25“能否” | L1 | 中 | FLOW-SR / 这是请求讨论，不是已批准独立业务 | PENDING_CUSTOMER |
| AUD-R025 | SR 文案需要中文 | S06 P21;S13双语纸样 | L1 | 中 | FLOW-SR / System/Objective仍英语选项 | CONFIRMED |
| AUD-R026 | 报告管理增加Objective筛选 | S06 P34 | L1 | 中 | FLOW-SR / 只有关键词覆盖目的 | CONFIRMED |
| AUD-R027 | 报价版本历史及确认后不改原版 | S02 p7 00:38:40;S13多版报价 | L2 | 高 | FLOW-QUOTE / R快照有；纯文字不升版为额外规则 | CONFIRMED |
| AUD-R028 | 报价组负责完整生命周期及中单 | S07 CONFIRMED-008 | L3 | 中 | FLOW-QUOTE / owner选项仍TL/ADMIN | ASSUMPTION |
| AUD-R029 | 四个报价入口（CS经CR/TL/CR/Tender/SR） | S07 CONFIRMED-009 | L3 | 中 | FLOW-QUOTE / CS队列已无渲染、Tender仅中标后建任务 | ASSUMPTION |
| AUD-R030 | 成交报价自动生成MR | S07 CONFIRMED-006/007 | L3 | 中 | FLOW-MR / 自动函数有，无材料不会产生MR | ASSUMPTION |
| AUD-R031 | 无报价中标时采购手填MR | S05 P10;S02 p6 00:05:00 walk-in | L1 | 中 | FLOW-TENDER/MR / 全部强制新报价 | CONFIRMED |
| AUD-R032 | 仓管能自主新增MR | S06 P31 | L1 | 中 | FLOW-MR / 仓管角色和表单缺失 | CONFIRMED |
| AUD-R033 | MR状况已完成/已取消/处理中 | S06 P28/P29 | L1 | 中 | FLOW-MR / 实际内部待备货/备货中/材料就绪 | CONFIRMED |
| AUD-R034 | 采购单在仓库通创建 | S11 §2所记2026-09-30用户说明 | L3 | 中 | FLOW-MR / EC新建PO已移除，读写其他字段仍需核对 | ASSUMPTION |
| AUD-R035 | 收货/备货后再交现场施工 | S02 p6 00:02:00;S13 CP与照片 | L2 | 高 | FLOW-P / MR到正式时间断点 | CONFIRMED |
| AUD-R036 | 预排不是正式时间、材料好再由CR确认 | S07 CONFIRMED-004/005 | L3 | 中 | FLOW-P / 分日期但门槛只控制预约，不控制开工 | ASSUMPTION |
| AUD-R037 | M报价约定周期、中单生成整期计划 | S07 CONFIRMED-011/012 | L3 | 中 | FLOW-M / 月步进与首期日期规则未获L1支持 | ASSUMPTION |
| AUD-R038 | M+P 两支可独立推进 | S07 CONFIRMED-013/REJECTED-001 | L3 | 中 | FLOW-MP / 与旧SOP P后M冲突，按当前工作决策留并行 | CONFLICT |
| AUD-R039 | CM 存在且通常由CR/主管直派 | S03 p3-4;S07 CONFIRMED-014/015 | L2 | 高 | FLOW-CM / 无固定自动重排 | CONFIRMED |
| AUD-R040 | CM 与 PM 冲突如何重排/拒绝 | S07 PENDING-002;S08 SOP01 C1/C2 | L3 | 低 | FLOW-CM / 仍待客户规则 | PENDING_CUSTOMER |
| AUD-R041 | 现场收款后登记/交款/对账 | S07 PENDING-001 | L3 | 低 | FLOW-INSTANT/FINANCE / 没有交接规则 | PENDING_CUSTOMER |
| AUD-R042 | 完工与收款独立 | S07 CONFIRMED-017;S01报价/财务分离讨论 | L2 | 高 | FLOW-CLOSE/FINANCE / 数据对象分开 | CONFIRMED |
| AUD-R043 | Tender 六状态字典 | S05 P7 | L1 | 中 | FLOW-TENDER / 字典已补齐，Tab筛选不完整 | CONFIRMED |
| AUD-R044 | Tender负责人不必填/截止默认17:00 | S05 P4 | L1 | 中 | FLOW-TENDER / 新建部分已修，旧日期文案不一致 | CONFIRMED |
| AUD-R045 | 邀请报价无需邀请结果且可关联标书中标 | S05 P21/P23/P24 | L1 | 中 | FLOW-TENDER/QUOTE / 旧编辑仍有inviteResult | CONFIRMED |
| AUD-R046 | 报价保修默认1年、有效60/90天 | S05 P22 | L1 | 中 | FLOW-QUOTE / 保修1年已带出、有效仍30天 | CONFIRMED |
| AUD-R047 | 折扣和只列材料不列价格、手填总价 | S06 P2/P3;S13 IMG_190316含discount | L2 | 高 | FLOW-QUOTE / 无discount、总价为明细合计 | CONFIRMED |
| AUD-R048 | Delivery 默认30天/天周/范围可手填 | S06 P5-P8;S13报价条款 | L2 | 高 | FLOW-QUOTE / 新建无完整交期控件 | CONFIRMED |
| AUD-R049 | 保修改保固/签名历史/盖章/OurRef版本001 | S06 P12/P14/P15 | L1 | 中 | FLOW-QUOTE / 仍保修/R编号，未见签名主档 | CONFIRMED |
| AUD-R050 | 私人续保按时长比例提醒CR/主管 | S05 P27/P28 | L1 | 中 | FLOW-M / 续保触发和政府差别未完整定义 | CONFIRMED |
| AUD-R051 | 开票需CP/照片/客户确认PO，缺则欠文件 | S05 P33;S02 p6 00:03:00 | L2 | 高 | FLOW-FINANCE / 普通成交漏入队列；字符串/任意附件判据且豁免取任意地址 | CONFIRMED |
| AUD-R052 | 特殊开票须写原因 | S05 P34 | L1 | 中 | FLOW-FINANCE / 欠文件只有禁用按钮 | CONFIRMED |
| AUD-R053 | 财务不需要税率 | S05 P35 | L1 | 中 | FLOW-FINANCE/QUOTE / 新合计去税，旧Mock10%仍保留 | CONFIRMED |
| AUD-R054 | 开票/到期日都默认当前日 | S05 P36 | L1 | 中 | FLOW-FINANCE / 单笔+30天、批量到期空 | CONFIRMED |
| AUD-R055 | 发票编号每月清零 | S05 P37“年日+递增（每月清零）” | L1 | 中 | FLOW-FINANCE / 实现按日计数；正式前缀仍需澄清 | CONFIRMED |
| AUD-R056 | 发票描述合同/PO/PM period | S05 P38;S13发票样张 | L2 | 高 | FLOW-FINANCE / 合约链分开且描述仅标题 | CONFIRMED |
| AUD-R057 | 低于报价总额须填原因 | S05 P39 | L1 | 中 | FLOW-FINANCE / 单/批部分实现但修改金额可绕过 | CONFIRMED |
| AUD-R058 | M合约按月/按期多次开票 | S01 第三份财务账单/保养讨论 | L1 | 中 | FLOW-FINANCE / 独立Mock合约，不接成交M | CONFIRMED |
| AUD-R059 | 2027-01-01生效/一月并行/一周代理 | 原型用户管理交接说明；未找到原始出处 | L4 | 低 | FLOW-MASTER / 不能视为客户承诺 | ASSUMPTION |
| AUD-R060 | 借用系统/升降机申请 | S05 P42 | L1 | 低 | FLOW-MASTER / 仅一句诉求，不擅自纳入工单一期 | PENDING_CUSTOMER |

## 角色逐项权限审计

| 角色 | 职责依据 | 登录可见 | 创建 | 修改 | 确认/退回 | 取消/关闭 | 数据范围 | 下一责任人 | 实际入口/问题 | 下一责任人 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CS | CONFIRMED | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 受理/主档与全部CALL；详情正常取消/答疑出口缺失 | 报价需求交CR/TL；队列入口缺失 |
| CR | CONFIRMED | CONFIRMED | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 受理/报价/派工/保养；PC全区数据与0930冲突 | QUO/师傅/财务 |
| TL/Super | CONFIRMED | PENDING_CUSTOMER | CONFIRMED | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 分派、保养与确认；列表仍可看全区，派工按姓名 | 师傅/CR/财务 |
| 夜班组长 | PENDING_CUSTOMER | MISSING | MISSING | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | MISSING | 未配置全区例外身份，不能复制普通TL当作完成 | 跨区域CS/师傅 |
| MASTER | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 本人移动任务；PC首页/报告可能显示非本人记录 | CR/TL/报价；保固采购缺失 |
| QUO | CONFIRMED | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 报价/保养，负责人候选排除其他QUO；无CALL页面 | 仓务/采购/CR/财务 |
| TENDER | CONFIRMED | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 标书/报价；缺正常回标/导出和主档客户入口 | QUO/Project/CR/采购 |
| PUR | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 备货/报表；无手填MR，SP状态任意修改 | 仓务/CR/Project |
| WAREHOUSE | CONFIRMED | MISSING | MISSING | MISSING | MISSING | MISSING | PENDING_CUSTOMER | CONFIRMED | 事实存在，未建立角色、MR录入与物料交接入口 | PUR/师傅/CR/Project |
| PROJECT | CONFIRMED | PENDING_CUSTOMER | MISSING | MISSING | MISSING | MISSING | PENDING_CUSTOMER | CONFIRMED | SOP中的P负责部门，TL代替没有确认依据 | 仓务/师傅/CR |
| FIN | CONFIRMED | CONFIRMED | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 发票/收款/独立客户合约主档；正常和特殊开票不完整 | 客户/报价/现场交款人待定 |
| ADMIN | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 全页面；配置/临时业务兜底没有逐动作批准矩阵 | 各业务负责人 |
| BOSS | ASSUMPTION | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | PENDING_CUSTOMER | CONFIRMED | 全页面及开票按钮；管理层只读/审批/操作职责未确定 | 业务主管/财务 |
| SALES | CONFIRMED | MISSING | MISSING | MISSING | MISSING | MISSING | PENDING_CUSTOMER | CONFIRMED | 0928指明可新建客户；当前无Sales身份 | CR/报价 |

## 状态迁移审计

COMPLETE 要求事实、角色、前置条件、动作、结果与记录可以相互对应；仅按钮存在为 PARTIAL。

| ID | Transition | FLOW | 审计结果 | 证据/缺口 |
| --- | --- | --- | --- | --- |
| ST-01 | 来电登记→仅答疑完成 | FLOW-CALL | BLOCKED | 代码有旧表单但当前正常入口不可达 |
| ST-02 | 来电→现场CALL | FLOW-CALL | PARTIAL | 新CALL能建，来电记录保全和合同/JNO冲突 |
| ST-03 | CS报价需求→CR/TL转交→待报价 | FLOW-QUOTE | BLOCKED | quoteRequests存储及监听存在，转交组件未生成 |
| ST-04 | 待分派→指定师傅→待确认 | FLOW-DISPATCH | PARTIAL | 主干有，预排/正式门槛与区域按用户不完整 |
| ST-05 | 待确认→收到→待处理 | FLOW-DISPATCH | COMPLETE | 本人师傅入口和到场时间弹窗、动作记录可追 |
| ST-06 | 团队申请→待审批→通过/退回 | FLOW-DISPATCH | PARTIAL | 有操作，独立申请对象/取消申请规则未定 |
| ST-07 | 待处理→签到→处理中 | FLOW-ONSITE | COMPLETE | 本轮点击签到后处理中且保留时间记录 |
| ST-08 | 处理中→SR→待完工确认 | FLOW-CLOSE | PARTIAL | 有主干但不可拍照、多SR和附件条件缺失 |
| ST-09 | 待完工确认→CR/TL确认→已完成 | FLOW-CLOSE | PARTIAL | 动作有，逐记录权限及证据核验不完整 |
| ST-10 | 待完工确认→退回→处理中 | FLOW-CLOSE | PARTIAL | 返回无结构化退回原因/旧SR快照 |
| ST-11 | 报价中→修订→R版本沟通 | FLOW-QUOTE | PARTIAL | R历史有，事实要求的非价格变更历史与成交冻结不完整 |
| ST-12 | 客户接受→QUO中单→锁定成交 | FLOW-QUOTE | PARTIAL | 函数有日期依据、角色检查，正式出处和新报价链未完整验证；本轮普通成交成功但不进入财务队列 |
| ST-13 | 中单物料→自动MR | FLOW-MR | PARTIAL | 函数有唯一ID，真实写入本轮未执行 |
| ST-14 | MR→材料就绪→CR正式预约 | FLOW-MR/P | BLOCKED | MR处理组件缺失；SP已验收不回写MR |
| ST-15 | M中单→整期计划 | FLOW-M | PARTIAL | 已有种子计划；新增报价缺周期控件且计划规则未确认 |
| ST-16 | M期次→本期CALL→本期完工 | FLOW-M | PARTIAL | 可以建立和回写，但联系/地址/后续动作有缺口 |
| ST-17 | M+P→独立M/P出口 | FLOW-MP | BLOCKED | M可独立建CALL，P卡在MR就绪且客户来源决策未完整归档 |
| ST-18 | SR需要报价→再次报价 | FLOW-MAINT-ISSUE | PARTIAL | 首次有；第二份SR受到!t.needQuotation抑制 |
| ST-19 | CM直派→现场SR→确认 | FLOW-CM | PARTIAL | 主干保留，时间冲突规则待定 |
| ST-20 | Tender待投标→已投标→结果 | FLOW-TENDER | PARTIAL | 六态可选，正式回标动作无入口且合法迁移未定义 |
| ST-21 | 无报价中标→手填MR→施工 | FLOW-TENDER/MR | BLOCKED | 0928明确入口，当前一律新建报价 |
| ST-22 | 完整资料→正常发票 | FLOW-FINANCE | PARTIAL | 有门槛但照片/CP真实性、金额和到期日期不一致；普通成交status与财务bidStatus筛选错配 |
| ST-23 | 欠文件→特殊开票+原因 | FLOW-FINANCE | BLOCKED | 缺特殊出口 |
| ST-24 | 开票→收款记录→财务独立完成 | FLOW-FINANCE | PARTIAL | 演示单据独立，部分/超额/冲销/现场对账规则未定 |

## 异常流程审计

COMPLETE 要求包括入口、处理责任、结果、回流和记录；暂无任何一项在当前全资料中满足此口径。PARTIAL 不计入完整度。

| ID | Scenario | FLOW | 审计结果 | 事实/现状 |
| --- | --- | --- | --- | --- |
| EX-01 | 不可拍照客户/地点 | FLOW-ONSITE | FAIL | S03明确豁免；当前无条件至少各一张 |
| EX-02 | 客户不在场/不能签名 | FLOW-CLOSE | PARTIAL | checkbox放行；谁补签/何时确认未定义 |
| EX-03 | 货品错误/数量不足 | FLOW-MR | PARTIAL | 旧PO有rejectGoods；MR逐行缺量页面缺失 |
| EX-04 | 完全无材料的施工 | FLOW-P | PARTIAL | 可无MR；可正式预约对象及依据待明确 |
| EX-05 | 无报价中标或walk-in | FLOW-TENDER/MR | FAIL | 原始资料已有，当前路径缺失 |
| EX-06 | MR取消/处理后完成 | FLOW-MR | FAIL | 0930三状态未展示、取消联动未定义 |
| EX-07 | 报价未接受/丢单 | FLOW-QUOTE | PARTIAL | 丢单可选，任务/计划/MR是否撤销未定义 |
| EX-08 | 报价多次修订 | FLOW-QUOTE | PARTIAL | 有快照但内容变更不全、001输出缺失 |
| EX-09 | 成交后变更物料/范围 | FLOW-QUOTE | PENDING | 新版本重新接受及MR补差/撤回规则未定 |
| EX-10 | CM与PM时间冲突 | FLOW-CM | PENDING | 客户仍需决定，未硬编码自动重排是正确 |
| EX-11 | 接单拒绝/未接单 | FLOW-DISPATCH | PENDING | 私有任务只收到，原SOP选择权与工作决策不清 |
| EX-12 | 无同区师傅/请假 | FLOW-DISPATCH | PARTIAL | 候选为空、请假置灰有，跨区支援/负载阈值未定 |
| EX-13 | 接单申请被驳回 | FLOW-DISPATCH | PARTIAL | 有返回待分派，通知与独立申请历史未完整 |
| EX-14 | 确认不通过退回补充 | FLOW-CLOSE | PARTIAL | 动作有，原因/撤回既有财务及新SR历史缺失 |
| EX-15 | 已完成SR修改/重交 | FLOW-SR | FAIL | 会重新待完工确认且单对象覆盖，闭环语义未冻结 |
| EX-16 | 一业务关联多个SR | FLOW-SR/QUOTE | FAIL | 主对象只有单SR字段，不能归档多份结构化报告 |
| EX-17 | 现场收款交款/对账异常 | FLOW-INSTANT | PENDING | PENDING-001未决 |
| EX-18 | 欠文件特殊开票 | FLOW-FINANCE | FAIL | 只有禁用正常开票 |
| EX-19 | 低于报价开票原因 | FLOW-FINANCE | PARTIAL | 单/批有原因，改金额的入口未同一门槛 |
| EX-20 | 部分收款/超额/冲销 | FLOW-FINANCE | PENDING | 无已确认分配/核销规则 |
| EX-21 | 弱网恢复与冲突重试 | FLOW-ONSITE | FAIL | 模拟回放未复制完整SR/客户签名/确认字段 |
| EX-22 | 任务取消/重开/终止 | 各FLOW | PENDING | 需分对象定义授权、理由和衍生对象处理 |
| EX-23 | 禁用离职账号/长期代理 | FLOW-MASTER | PARTIAL | 禁用信息有、代理只文案且日期阈值无出处 |
| EX-24 | 通知到达但接收人无页权限 | FLOW-QUOTE/SR | FAIL | QUO通知目标workorder，ROLE_PAGES不允许 |

## 指标计算

| 指标 | 分子 | 分母 | 结果 |
| --- | --- | --- | --- |
| requirementCompleteness | 94 | 288 | 32.6% |
| prototypeBusinessCoverage | 0 | 16 | 0.0% |
| factTraceability | 44 | 60 | 73.3% |
| rolePermissionCompleteness | 34 | 112 | 30.4% |
| stateCompleteness | 2 | 24 | 8.3% |
| exceptionCompleteness | 0 | 24 | 0.0% |
