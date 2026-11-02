# Requirement Index｜需求索引

## 当前批次｜04-12 编号、附件、通知与验收规则

唯一源为[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`commonRules`；Hub仅投影，PARTIAL／评审中。本轮10项公共行为、8项待执行AC、12条原域AC引用、13项只读映射、25条旧REQ追溯。编号算法、附件标准和通知渠道未补答案。

04-11人工评审PASS已记内部记录；04-03～11正文保持不变，其87项原AC全部仍待执行。C-09政府编号、C-15交付／回执日期、C-06现场款归口保持。业务事实、Prototype、客户Excel不改；不执行04整体Gate或进入05。

## 04-11 PARTIAL范围轮记录｜2026-10-29

唯一维护源为[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`partialScopes`，Hub仅投影。PARTIAL／评审中；CM归P、Tender为来源，已有事实、PARTIAL与OPEN分层，不补完整业务链或一期批准。

本批12项边界行为、AC-PART-01～10全部待执行、10项Prototype只读检查、15项旧REQ追溯。保留CM派工岗位冲突、Tender日期／递交及交接未决、PO直单／walk-in与无CALL等适用边界。04-10人工评审PASS已记内部记录，其原正文PARTIAL和财务OPEN保持。未修改04-03～10、业务事实、Prototype或客户Excel；未开始04-12。

## 04-10财务需求轮记录｜2026-10-29

唯一维护源为[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`financeHandoff`，Hub仅投影。PARTIAL／评审中，业务结果、财务资料、开票、收款分别表达，资料与票款不自动确认或取消业务完成。

本批12项行为、AC-FIN-01～12全部待执行、16项Prototype只读映射、17项旧REQ引用。即时维修后补前已收款，不再接受／中单／收款；费用与签署分开，Taxi收据仅限已确认范围。资料清单／交接、开票触发及基数、现场登记／交款／对账、部分与多次款、金额分配及整体结束仍OPEN。

04-09人工评审PASS已记入WORK-REGISTER，原业务域PARTIAL、C-04 BLOCKED及材料变化OPEN保留。04-03～09正文、01／02／03、业务事实、Prototype、Decision和客户Excel未改；本轮不开始04-11。

## 04-09材料需求轮记录｜2026-10-29

唯一需求表达在[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`materialSupply`，Hub仅投影。页面PARTIAL／评审中，C-04阶段施工接口BLOCKED，OPEN-10-26-01成交后材料变化无结论。

本批12项行为、AC-MR-01～12全部待执行、14项Prototype只读映射、10项旧REQ追溯；普通成交报价一MR、一MR多采购PO、分批材料能力与真实阶段施工放行分开。不定义拆PO算法、完整WMS状态机或成交变更方案。

04-08已获项目用户人工评审PASS，原业务域PARTIAL及整体结束／复杂金额OPEN保留。04-03～08正文、业务事实、Decision、FLOW、OPEN答案、Prototype和客户Excel未改；本轮不开始04-10。

## 04-08组合需求轮记录｜2026-10-29

当前表达在[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`mpControl`，Hub只投影。本页**PARTIAL／评审中**，只定义M+P分类、M/P引用关联、独立进度和整体视图，不复制第三套履约链。

本批12项行为、AC-MP-01～11（全部待执行）、18项Prototype只读映射及15项旧REQ引用。M引用04-07，P引用04-06；不固定先后，不用单一状态覆盖两部分。M整体结束及M+P整体完成、复杂金额、基数、编号与权限仍OPEN；P的对应阶段接口继续C-04 BLOCKED，不由组合绕过。

04-07页面已获项目用户人工评审PASS，业务域PARTIAL、M整体结束OPEN保留。04 IA、04-03～07、01／02／03、其他需求域、Prototype及业务事实未改，未编写04-09；任务和批准记录仍以WORK-REGISTER为准。

## 04-07 M需求轮记录｜2026-10-29

当前表达在[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`mService`，Hub只投影。本页**PARTIAL／评审中**：M、计划／期次、本次任务、实际上门及SR按逻辑分层，不决定数据库表或未知数量关系。

本批12项行为、AC-M-01～11（全部待执行）、16项Prototype只读映射及22项旧REQ引用。CR按已有说明定师傅及时间；一次实际M上门一SR；主管确认本次工单，不自动结束M。SR维修需求交公共池，产生新P与原M独立，不自动变M+P。整体结束、首尾期、到期补做、续保及无CALL任务模型继续原OPEN。

04-06已获项目用户人工评审PASS，但业务成熟度PARTIAL、C-04 BLOCKED保留。04 IA、04-03～06、01／02／03、其他需求域、Prototype及业务事实未改；不编写04-08。下方批次保留历史身份，任务／批准记录仍以WORK-REGISTER为准。

## 04-06 P需求轮记录｜2026-10-29

当前表达在[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`pFulfillment`，Hub只投影。本页**PARTIAL／评审中**，材料供给→正式阶段施工之间明确**C-04 BLOCKED**；页面需求可评审不等于阶段放行规则已解决。

本批12项行为、AC-P-01～11（全部待执行）、13项Prototype只读映射、27项旧REQ引用。普通P引用04-05成交输出，支持阶段施工，最终CP交主管确认P完成；即时P只后补记录、不重复接受／中单／收款。P／现场任务基数与建立、CP公共例外、票款及变更仍保留原OPEN。

04-05已获项目用户人工评审PASS，记录在WORK-REGISTER；不是客户签批。04 IA、04-03／04／05、其他Hub页面、原型及业务事实不改，未编写04-07。下方各轮按历史批次身份保留。

## 04-05 报价需求轮记录｜2026-10-29

当前表达维护在[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`quotation`，Hub只做投影。本批九项行为、AC-QUOTE-01～08、十项Prototype只读映射及15项旧REQ追溯；**READY for requirement definition／评审中**，验收全部待执行。

普通报价按公共池→接手责任→版本→客户接受→负责报价员中单→最终成交版本／正常成交一MR表达；即时维修只后补报价记录，不重复接受／中单／收款。成交后材料变化仍OPEN-10-26-01／C-13，完整编号、权限、金额、接受凭据及补录操作保留原OPEN，不以当前需求代答。

04-03、04-04人工评审通过的依据在WORK-REGISTER，原正文／页面不改；不是客户正式签批。04 IA及119条旧REQ不改，04-06以后未编写，Prototype未修改。下方旧批次段落保留原时间身份。

## 04-04 CALL需求轮记录｜2026-10-29

当前需求表达继续维护在[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)的`callIntake`中，Hub为生成投影。04整体IA、04-03正文、旧119条REQ及原始来源保持不变。

本批整理CALL七项需求行为、AC-CALL-01～06、十项原型只读映射及CALL相关旧REQ引用；状态为**READY for requirement definition／评审中**，验收条件全部待执行。三方向不是状态机；报价只定义到公共待办，上门任务基数、建立方式及编号继续挂C-07／C-11／C-09，状态与授权挂C-02／C-03。

04-03样板已获项目用户人工评审通过，记录在WORK-REGISTER；不是客户签批或产品验收。本轮不修改04-03页面，不编写04-05，不修改Prototype。下方“第一轮”段落为当时记录，不能覆盖本批进度。

## 04 V1入口及第一轮记录｜2026-10-29

[SYSTEM-REQUIREMENTS-V1.json](SYSTEM-REQUIREMENTS-V1.json)维护当前04 V1需求表达，Project Hub「04 系统需求」为展示投影。业务事实仍引用原Decision／Source／业务基线；任务与评审状态只维护WORK-REGISTER，不在本索引另建台账。

本轮只建立00需求总览、01对象关系、02状态权限框架及03客户与合同识别样板；04-04及以后只建目录，未编写需求。样板为**评审中／待人工评审**，不是客户签批。READY仅指具备需求定义依据；AC-01～06均待执行。项目仍处业务流程确认阶段，维修整链未通过、0批业务定稿；C-04阶段材料交接仍阻塞对应出口。

原119条（80条旧REQ＋39条UPD）编号、原状态及记录保留。本轮只为REQ-008／067／073／079、REQ-UPD-001／003／004关联当前04-03表达，不全量迁移或维护第二套答案。下方80条规模表保留历史统计身份，不代表当前V1需求批准数量。

> **用途**：把 Project Hub 当前的需求机器索引收口到 `docs/knowledge/04-requirements/` 的人工可读入口。
>
> **原则**：本文件不替代原始 PRD、功能清单、Prototype、SDD、TDD 或 Test；不改变任何需求状态，也不把 Prototype 的实现反向提升为业务事实。

## 1. 当前规模与边界

需求机器索引位于 [`project-hub/data/requirements.json`](../../../project-hub/data/requirements.json)，当前包含：

| 指标 | 数量 | 说明 |
| --- | ---: | --- |
| REQ | 80 | 当前 Project Hub 索引的全部需求条目 |
| PAGE | 17 | 当前索引关联的原型页面 |
| 已关联业务流程的 REQ | 30 | 至少有一条 FLOW 关联 |
| 尚未关联业务流程的 REQ | 50 | 在追溯链中标记为 UNLINKED / 仅有交付物映射 |
| 直接关联 Decision 的 REQ | 约 30 | 以当前 JSON 中的 decisionIds 为准，不能视为已批准需求 |
| 直接关联 SDD/TDD/Test 的 REQ | 0 | 当前索引未形成完整交付链 |

**状态说明**：当前 80 条 REQ 的“已进入索引”不等于“已批准”。需求审批仍以对应的正式 PRD / 决策记录和项目 Gate 为准。

## 2. 模块盘点

| 模块 | REQ 数量 | 主要编号范围 | 已有 FLOW 关联 | 已有 Decision 关联 | 业务知识备注 |
| --- | ---: | --- | ---: | ---: | --- |
| 首页与通知 | 5 | REQ-001..005 | 0 | 0 | 交付层内容，尚未挂到业务主流程 |
| CALL 受理与工单管理 | 8 | REQ-006..013 | 7 | 7 | 覆盖受理、工单主对象与核心闭环 |
| 分派与调度 | 10 | REQ-014..023 | 2 | 2 | 分派权限、调度和接单边界仍有 Pending |
| 移动端现场执行 | 11 | REQ-024..034 | 4 | 4 | 到场、照片、SR、完工证据等现场能力 |
| 报告与文档 | 5 | REQ-035..039 | 0 | 0 | 交付物能力，暂未完成业务流程映射 |
| 报价管理 | 6 | REQ-040..045 | 4 | 4 | 报价、版本、客户确认、中单 Gate |
| 标书管理 | 5 | REQ-046..050 | 5 | 5 | Tender 为 PARTIAL，完整投标边界待确认 |
| 备货与采购 | 6 | REQ-051..056 | 3 | 3 | P 分支的 MR、库存 / 采购、材料就绪 |
| 会计与外部接口 | 6 | REQ-057..062 | 4 | 4 | 完工与收款分离；财务同步细节仍不完整 |
| 统计、客户和基础设置 | 10 | REQ-063..072 | 0 | 0 | 支撑模块，暂无完整业务链映射 |
| 原需求补充与上线约束 | 8 | REQ-073..080 | 1 | 1 | 补充约束；不能覆盖原始事实 |
| **合计** | **80** | — | **30** | **约 30** | 以 Project Hub JSON 为当前机器索引口径 |

## 3. 与 Business Baseline 的关键挂接

以下是当前应优先从业务流程下钻到需求的集合。编号仅引用现有索引，不表示本轮新增需求：

| 业务节点 / 场景 | 相关 REQ | 当前说明 |
| --- | --- | --- |
| 报价、版本、客户确认、中单 | REQ-040..045 | 对应报价生命周期与 CONFIRMED-008/009 |
| P：MR、库存 / 采购、材料就绪 | REQ-051..056 | 对应 CONFIRMED-006/007；采购主数据仍有 Q-007 |
| M：整期保养计划与维护周期 | REQ-061、REQ-073..080（按当前索引） | 需求映射不完整，不能把需求文字视为新增业务规则 |
| Service Report、完工证据 | REQ-027、REQ-030、REQ-031、REQ-033 | 对应 CONFIRMED-009/010；SR 回流报价仍需显式建链 |
| 现场即时维修 / 收款 | REQ-057..062 | Q-20260927-001 仍为现场收款登记与对账 Pending |
| CM | REQ-078 及其现有关联 | 对应 CONFIRMED-014/015；PM/CM 冲突规则为 PENDING-002 |
| Government Tender | REQ-046..050 | 当前为 PARTIAL；Q-018 覆盖导出、正式回标及中标后进入 M/P/M+P |

## 4. 追溯现状

当前 Project Hub 已有 80 条 trace、477 条 edge 和 7 条 legacy trace。它适合继续作为机器关系索引，但尚未达到严格的：

`Fact → Decision → Business Flow → Requirement → PRD → Prototype → SDD → TDD → Test`

全链路完成状态。当前应按以下规则读取：

- 有 `flowId`：表示需求已被挂到某条业务流程，不代表流程细节已完整。
- 有 `decisionId`：表示存在相关决策引用，不代表该 REQ 已完成验收或审批。
- 有 `pageId` / Prototype 关联：表示有设计落点，不代表业务事实正确；Prototype 冲突必须保留为 Conflict。
- 没有来源事实、流程或决策的条目：标记 `UNLINKED`，进入后续补链，不得自行推导。
- 没有 SDD、TDD、Test 关联的条目：标记 `MISSING DELIVERY LINK`，不修改原交付物。

## 5. 原始交付物入口

- 功能需求与 PRD：通过 `project-hub/data/requirements.json` 的 `sourcePath`、`prdPath` 和 `documentIds` 进入；原文件保持原目录。
- Prototype：通过 `pageId` / `prototypePath` 进入；原型保持原目录，不在本索引中复制。
- SDD / TDD / Test：通过 Project Hub 文件索引和 Traceability 进入；目前仅保留机器索引关系。
- 历史需求：保留其 Legacy 状态，不用新 Baseline 覆盖旧文本。

## 6. 本轮不做的事情

1. 不批准 80 条 REQ。
2. 不把 REQ 文案转换成新的 RULE 或业务流程。
3. 不修改 PRD、Prototype、SDD、TDD、Test。
4. 不删除或移动现有交付物。
5. 不因缺少链路而自行补充 Fact / Decision。

## 7. 后续补链顺序

1. 先为六类正式业务场景补齐 `FLOW → REQ` 的显式关系，尤其是 M+P、SR 回报价、CM 和 Tender。
2. 再逐条核对 `REQ → PRD → Prototype`，把 Prototype Conflict 独立标记。
3. 最后补 `SDD → TDD → Test`，以交付物实际存在为准。

## 10/12增量要求

原80个REQ/F编号保留，批准状态不自动改变。新增39项用UPD-001～039／REQ-UPD-001～039关联[最新要求矩阵](../03-business/LATEST-REQUIREMENTS-20261012.md)，逐项原文位置明确。旧REQ关联是具体内容主题对应，不表示旧条目中全部设计细则已批准。

客户范围选择、实际责任人和验收结果维护在根README指定主台账；客户评审材料是同编号导出，不在本索引另维护进度。

## 10/14单据分流与完工确认增量

SOURCE-022三次项目用户说明：成交维修需CP、保养/CALL上门用SR；维修CP先交主管，由主管确认更新维修状态，其他角色按权限查看，财务独立。关联REQ-021/027/032/033/057及UPD-032，原编号和批准身份保留；旧CONFIRMED-010统一SR解释与最新维修CP说明的冲突见业务基线，不据页面按钮自动批准。

SOURCE-028最新记录002 CP维修清单/提交→主管阅读确认→CR/财务共享状态子项通过；旧001只有SR重列通用技术证据，不算报价维修验收。完整材料/正式预约/打印链、CP退回/缺签/多报告及客户签收仍未完成。C-08收口已回答的基本分流/确认职责，保留打印/交付/补证细则；财务资料核对及票款独立，状态和验收只回填同一Excel。

同日派工说明增量关联REQ-019：主管在派工备注写约定时间与事项，通常电话沟通，见SOURCE-022原话。复用已有备注与分派状态，不增加独立预约日期/审批，不能仅以formalAppointmentAt为空判交接失败。原预排/材料就绪顺序保持；移动备注保存及师傅读取局部复测见SOURCE-028，材料003/打印领单与全链未通过。
