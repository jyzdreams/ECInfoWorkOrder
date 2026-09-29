# EC Project Hub 业务知识呈现改版计划

- 计划状态：待人工确认
- 编制日期：2026-09-27
- 本轮范围：只分析现状并形成实施计划
- 本轮未执行：Project Hub 页面修改、数据修改、Prototype 修改、PRD/SDD/TDD 修改、业务规则新增

## 0. 结论摘要与分析边界

本轮建议不改变 Project Hub 的一级导航、整体视觉、搜索、抽屉详情和追溯能力，只调整一级页面内部的知识呈现顺序：默认先讲业务，再通过“查看依据”下钻 Fact、Decision、Source、REQ 和 Prototype。

当前主要问题不是资料不足，而是业务结构仍被压缩成线性流程，且证据 ID 在业务阅读层暴露过多：

1. `00 真实业务总流程` 当前是 10 个节点的单线流程，没有把报价入口、报价生命周期、中单 Gate、M/P/M+P 分叉、SR 回流报价、CM 和 Tender 的关系呈现为分支或回路。
2. 当前只有 6 个场景页面；M+P 只存在于总流程文字、Fact 和 Decision 中，没有独立场景页面。
3. 业务流程详情直接铺出 `FACT-xxx`、`CONFIRMED-xxx`，业务人员需要先理解证据编号，才能理解规则。
4. 一些流程节点的细节强于现有 Decision 的明确程度，尤其是现场即时维修与 Tender 内部步骤；这些内容应继续保持 `PARTIAL`，不能因为改版变成 `CONFIRMED`。
5. 用户指定的 `knowledge/business/EC-REAL-BUSINESS-BASELINE.md` 当前不存在。项目当前明确可用的人工讨论基线是 `knowledge/decisions/DEC-20260927-真实业务流程讨论.md`。因此本计划只能依据现有 Decision、Fact、REQ 和用户本轮列明的检查项评估，不能声称已完成对缺失基线文件的逐条比对。

缺失基线的处理要求：后续实施前先确认该文件是否应由其他位置恢复或由人工提供；在文件出现前，将其标记为 `MISSING SOURCE`，不得根据文件名自行补写内容。

---

## 1. 当前结构评估

### 1.1 当前页面与导航结构

当前实际渲染的一级导航为：

| 一级导航 | 当前内部内容 | 评估 |
| --- | --- | --- |
| 01 业务全景 | 主流程、6 个场景、角色地图、关键问题、交付状态、治理指标 | 结构基本合理；主流程过于线性，场景少 M+P |
| 02 业务流程 | 00 总流程 + 01～06 场景 | 一级入口正确；内容层把业务与证据 ID 并列展示 |
| 03 系统需求 | 功能清单 + 11 个模块 | 保持；80 条 REQ 全部仍为 OPEN |
| 04 原型与设计 | PRD、Prototype、SDD、TDD、Testing | 保持；交付状态与事实状态已分离 |
| 05 待确认问题 | 影响业务流程、范围、角色边界的问题 | 保持；需要统一数量口径和场景关联 |
| 06 项目状态 | Gate、模块关联进度、阻塞、自动检查 | 保持；部分统计与数据文件口径不一致 |
| A 证据与追溯 | Source、Fact、Decision、Change、Traceability | 保持；应继续作为证据层而非业务第一入口 |

一级导航已经符合本轮要求，不建议改名、增删或调整顺序。

### 1.2 当前数据来源

Project Hub 当前采用“外部 JSON 数据文件 + `index.html` 内嵌同一份 `window.HUB_DATA`”的方式运行。实际前台由 `assets/app-v2.js` 渲染，`assets/app.js` 是未被当前入口引用的旧版脚本。

主要数据来源：

- `data/file-index.json`：全项目文件索引。
- `data/facts.json`：当前确认事实与历史规则映射。
- `data/decisions.json`：Decision、Pending、Rejected 和 Change。
- `data/flows.json`：总流程与场景流程。
- `data/requirements.json`：REQ 和 PAGE。
- `data/traceability.json`：逐需求链路和显式关系边。
- `data/audit-report.json`：覆盖率、检查项和缺口。
- `data/project-status.json`：项目阶段、Gate、问题和交付状态。
- `data/architecture.json`：IA 与状态字典。
- `knowledge/decisions/DEC-20260927-真实业务流程讨论.md`：当前人工确认讨论基线。
- `knowledge-base/data/knowledge-base.json`：历史知识库底座，由构建脚本读取，不能自动升级为当前确认事实。

当前构建链：`.codex/project-hub-build/build-v2.js` 生成 JSON 和 `project-hub/index.html`。旧的 `.codex/project-hub-build/build.js` 包含较宽泛的自动关联规则，后续不应运行。

### 1.3 当前数量盘点

| 对象 | 当前数量 | 状态与说明 |
| --- | ---: | --- |
| 文件索引 | 479 | 包含当前、历史、备份、评审和治理文件 |
| Source | 118 | Original Source 78、Legacy Source 37、Source Reference 3 |
| Fact | 45 | CONFIRMED 17、PARTIAL 16、OPEN 7、CONFLICT 5 |
| Decision 记录 | 20 | CONFIRMED 17、PENDING 2、REJECTED 1；另有 Change 2 |
| Flow | 7 | 1 条总流程 + 6 个场景流程 |
| Requirement | 80 | 80 条全部为 OPEN / 待确认 |
| Prototype Page | 17 | 17 个全部为 PARTIAL |
| Open Question 数据项 | 23 | 21 OPEN + 2 CONFLICT；当前其他统计字段存在 21/22/23 三种口径 |
| Conflict | 6 | 部分旧状态统计仍显示 5，需要统一口径 |
| 显式追溯边 | 477 | LINKED 144、PARTIAL 333 |

### 1.4 当前追溯关系

当前 477 条边的构成为：

| 关系 | 数量 | 当前关系状态 |
| --- | ---: | --- |
| Source → Fact | 67 | LINKED |
| Fact → Decision | 17 | LINKED |
| Source → Decision | 20 | LINKED |
| Decision → Flow | 40 | LINKED |
| Flow → Requirement | 64 | PARTIAL |
| Requirement → PRD | 80 | PARTIAL |
| Requirement → Page | 172 | PARTIAL |
| Page → Prototype | 17 | PARTIAL |

追溯现状：

- 80 条 REQ 均有直接来源、PRD 和历史 PAGE 映射，但这些关系只代表主题对应，不代表批准、实现或验收。
- 只有 30/80 条 REQ 关联当前业务流程和当前 Decision；50 条仍为 `UNLINKED`。
- 17 个 PAGE 全部关联当前原型文件，16 个 PAGE 可经 REQ 反查 PRD；`PAGE-013 主管首页` 当前没有关联 REQ。
- 自动回归显示 7/7 场景通过，但这不等于 Prototype 已人工验收，所有 PAGE 仍应保持 `PARTIAL`。
- Source → Fact → Decision → Flow → REQ → PRD → Prototype 的覆盖为 30/80，即 38%。
- 含 SDD、TDD、Test 的严格九跳完整链为 0%。

### 1.5 当前数据一致性问题

以下是呈现与统计问题，不是业务事实冲突：

1. `assets/app-v2.js` 硬编码了当前 7 个一级导航，但 `data/architecture.json` 和内嵌 `ia` 仍保留上一版“业务事实库 / 决策中心 / 追溯矩阵”的结构，数据模型与实际 UI 不一致。
2. `file-index.json` 显示 479 个索引文件，`project-status.json.stats.scannedFiles` 仍显示 318。
3. Open Question 在不同字段中出现 21、22、23 三种数量；正确解释应明确区分 21 OPEN 与 2 CONFLICT。
4. Conflict 在旧统计字段中为 5，在当前审计数据中为 6。
5. `README.md` 仍描述“6 个场景”，而 Prototype 回归记录已经使用 7 个场景，其中包含 M+P。

---

## 2. 建议保持不动的部分

以下部分不需要重新设计：

1. 一级导航名称、顺序和层级。
2. 深色侧边栏、浅色内容区、卡片、表格、状态徽标、右侧抽屉的整体视觉语言。
3. 顶部全局搜索以及按 Fact、Decision、Flow、REQ、PAGE、文件路径搜索的能力。
4. 事实状态 `CONFIRMED / PARTIAL / OPEN / CONFLICT`。
5. 交付状态 `MISSING / DRAFT / PARTIAL / READY / VERIFIED`。
6. Source、Fact、Decision、Change、Traceability 的完整审计入口。
7. 历史知识库、当前原型、维护说明和知识同步协议的侧边链接。
8. 现有 17 条 Confirmed、2 条 Pending、1 条 Rejected 和 2 条 Change 的原文、状态与来源。
9. 80 条 REQ 的 OPEN 状态和历史 ID。
10. 17 个 PAGE 的 PARTIAL 状态及现有保守关联。
11. `assets/styles.css` 的基础视觉风格。
12. `assets/app.js` 作为旧版未启用脚本保留，不在本轮后续实施中顺手删除。

---

## 3. 业务全景修改方案

### 3.1 页面目标

业务全景继续作为全局导航和状态入口，但第一屏应让业务人员在不阅读 Fact/Decision ID 的情况下理解 EC 的真实业务骨架。

### 3.2 建议页面结构

1. 顶部状态卡保持不变：已确认 Decision、待确认事项、事实冲突、当前原型版本。
2. “真实业务主流程”从横向单线节点改为分层业务图：
   - 报价入口层。
   - 报价生命周期。
   - 中单 Gate。
   - M / P / M+P 分支层。
   - 服务、SR、确认和完工层。
   - 收款独立跟踪层。
   - CM 和现场即时维修作为旁路场景，不强行塞进报价主线。
3. “主要业务场景”由 6 张卡调整为 7 张卡，顺序固定为 01～07。
4. 场景卡默认只显示场景名称、事实状态、一句业务说明和关键 Open Question 数量。
5. 角色地图保持现有位置和风格，但角色参与场景的计算要包含新 M+P 场景。
6. 当前关键业务问题保持 Top 列表；优先显示与当前流程直接关联的 P0，再显示通用 P0。
7. 交付状态保持 PRD / Prototype / SDD / TDD / Testing 五卡。
8. 治理指标继续放在页面最下方，并视觉降级为 Evidence Layer。

### 3.3 业务全景当前缺口

| 检查项 | 当前呈现 | 建议调整 |
| --- | --- | --- |
| 报价生命周期 | 只有“报价组”单节点 | 展开为报价任务 → R1/R2/R3 版本沟通 → 客户接受 → 报价组确认中单 |
| 中单 Gate | 有节点但没有 Gate 语义 | 将中单标为报价与履约之间的明确 Gate |
| M / P / M+P | 单节点文字 | 变为三个可见分支 |
| P → MR → 材料 → 施工 | 被压缩在“排期与服务” | 展开 MR 自动生成、备货/采购、材料完成、正式施工时间、施工 |
| M → 整期保养计划 | 被压缩在“排期与服务” | 展开报价确定周期、中单生成整期计划、每期排期和保养 |
| M+P 双业务线 | 无独立场景和双线图 | 增加 M+P 场景，展示 M 与 P 分别推进且无固定先后 |
| SR → 需要报价 | 只在子场景中 | 在总图表现为回流报价任务的闭环箭头 |
| SR → CR/主管确认 → 完工 | 有 SR 和完工节点 | 补清“客户签名、师傅提交 SR、CR/主管简单确认”的顺序 |
| CM | 仅场景卡 | 在主业务图旁路入口中展示，不与报价主线混为同一路径 |
| Government Tender | 仅场景卡 | 显示为报价入口之一，中标后进入 M/P/M+P |
| 完工与收款分离 | 当前已说明 | 保留，并用独立泳道或独立状态区表示，不画成完工后的自动状态转换 |

---

## 4. `00 真实业务总流程` 修改方案

### 4.1 当前判断

当前流程仍然过于线性。它把报价、履约分叉、材料准备、周期保养和财务跟踪压缩成一条十节点横线，容易产生以下误读：

- 所有业务都必须按同一路径执行。
- M、P、M+P 在中单后执行方式相同。
- Service Report 只会走向完工，不会回流报价。
- 完工后必然进入收款状态。
- CM 和 Tender 与普通报价维修没有结构差异。

### 4.2 建议的完整流程结构

以下结构只重组现有 Confirmed/Pending 内容，不新增业务规则：

```text
【报价入口】
CS 经 CR/主管 ─┐
CR 直接发起 ───┼→ 报价任务
Tender ────────┤
SR 选择需要报价 ┘

【报价生命周期】
报价任务
→ 报价组负责
→ R1 / R2 / R3 等版本沟通
→ 客户接受最终报价
→ 报价组确认中单
→ 中单 Gate

【中单后分流】
中单 Gate
├─ P
│  → 系统按最终成交报价自动生成 MR
│  → 备货 / 库存不足时采购
│  → 材料完成
│  → CR / 主管与客户确认正式施工时间
│  → 师傅施工
│
├─ M
│  → 报价阶段已确定保养周期
│  → 系统按周期和合同期生成整期保养计划
│  → 每期到期排期
│  → 师傅上门保养
│
└─ M+P
   ├─ 进入 P 业务线
   └─ 进入 M 业务线
   （分别推进，不设置固定先后顺序）

【服务结果】
现场服务 / 保养
→ 客户确认或签名
→ 师傅提交 Service Report
├─ SR 选择“需要报价” → 回流“报价任务”
└─ 无需回流报价 → CR / 主管简单确认 → 正式完工 / 本次保养完成

【独立场景】
CM → CR / 主管直接指定师傅 → 现场服务 → SR → CR / 主管确认 → 完工
    时间冲突处理保持 OPEN

现场即时维修 → 保留为 PARTIAL 场景
    现场收款登记、交款、对账保持 OPEN

【财务跟踪】
完工状态 ≠ 收款完成
正常发票和收款主要关联报价业务，独立展示，不画成工单完工状态的自动后继。
```

### 4.3 总流程数据表达要求

后续实施时，流程数据不能继续只用数组顺序表示。建议在不破坏现有节点字段的前提下增加展示关系：

- `nextNodeIds`：支持一个节点指向多个分支。
- `branchKey`：标识 M、P、M+P、CM、Tender、即时维修等展示分组。
- `relationType`：`NEXT`、`BRANCH`、`LOOP_BACK`、`PARALLEL`、`INDEPENDENT_TRACK`。
- `displayGroup`：报价入口、报价生命周期、中单 Gate、履约分支、SR/完工、财务跟踪。
- `evidenceStatus`：仅用于提示该节点的依据强度，不改变 Fact/Decision 状态。

不得通过节点顺序隐含未确认的业务规则。

---

## 5. `01～07` 业务场景调整方案

### 5.1 场景审计总表

| 场景 | 当前是否存在 | 当前是否正确 | 需要补充或调整 | 主要 Fact | 主要 Decision | Pending / Conflict |
| --- | --- | --- | --- | --- | --- | --- |
| 00 真实业务总流程 | 存在 | 部分正确，过于线性 | 报价四入口、完整报价生命周期、中单 Gate、M/P/M+P 分支、P 材料链、M 整期计划、SR 回流、独立收款 | FACT-001、003～013、017 | CONFIRMED-001、003～013、017 | PENDING-001；基线文件 MISSING SOURCE |
| 01 普通报价维修 | 存在 | 主干基本正确 | 强化报价版本生命周期和中单 Gate；把“预排时间”与“正式施工时间”区分；将采购主系统冲突作为证据层提示 | FACT-001～009、010、017 | CONFIRMED-001～010、017 | 无直接 Pending；关联 CONFLICT-005、Q-007、Q-017 |
| 02 保养发现问题后二次维修 | 存在 | 主干正确 | 用回路表现“SR 需要报价 → 报价任务 → 中单 → MR → 二次上门”，不要重复堆一条孤立线 | FACT-002、005～010、012 | CONFIRMED-002、005～010、012 | 无直接 Pending；后补报价阈值仍有 CONFLICT-004，但不得代替已确认的 SR 报价入口 |
| 03 现场即时维修 | 存在 | PARTIAL；部分节点细节强于明确 Decision | 默认只确认场景存在、SR/完工确认和完工/收款分离；现场报价确认、现场收款和回公司补记录的具体步骤继续标 PARTIAL | FACT-002、010、017 | CONFIRMED-002、010、017 | PENDING-001；现场交款对账不得补全 |
| 04 周期保养 | 存在 | 主干正确 | 展开“报价阶段确定周期 → 中单生成整期计划 → 每期排期 → 保养 → SR → 本次完成 → 下一周期”；SR 需要报价时回流报价 | FACT-010、011、012 | CONFIRMED-010、011、012 | 无直接 Pending；周期性开票仅是历史 PARTIAL，不并入已确认主流程 |
| 05 M+P | 不存在独立页面 | 当前仅散落在总流程、M/P 场景和事实中 | 新增独立呈现场景，显示同一报价包含 M 与 P；中单后两条业务线分别推进，无固定先后；不设置未经确认的统一合流 Gate | FACT-011、012、013 | CONFIRMED-011、012、013；REJECTED-001 作为变更历史 | 无直接 Pending；不得恢复“先 P 后 M” |
| 06 CM | 当前为 05 CM | PARTIAL | 改编号；保留 CR/主管直接指定师傅、服务、SR、确认完工；时间冲突节点明确标 OPEN，不展示自动重排 | FACT-010、014、015 | CONFIRMED-010、014、015 | PENDING-002；CONFLICT-002、Q-008 |
| 07 Government Tender | 当前为 06 | PARTIAL | 改编号；明确其是报价入口之一，中标后按内容进入 M/P/M+P；Tender 内部准备细节继续 PARTIAL | FACT-009、011、016 | CONFIRMED-009、011、016 | Q-018；内部回标和责任边界不得补写 |

### 5.2 场景状态建议

| 场景 | 建议事实状态 | 依据 |
| --- | --- | --- |
| 00 真实业务总流程 | PARTIAL | 主干已确认，但现场收款与缺失业务基线仍有缺口 |
| 01 普通报价维修 | CONFIRMED | 主链由多条明确 Decision 支撑；相关采购系统冲突在证据层单列 |
| 02 保养发现问题后二次维修 | CONFIRMED | SR 回流报价及后续主干已有明确依据 |
| 03 现场即时维修 | PARTIAL | 场景存在，但现场收款内部交接未确认，详细步骤依据不足 |
| 04 周期保养 | CONFIRMED | 周期、整期计划和 SR 完工确认已有明确依据 |
| 05 M+P | CONFIRMED | 业务类型、双线含义和无固定顺序均有明确 Decision |
| 06 CM | PARTIAL | CM 存在且直接指定已确认，时间冲突处理未确认 |
| 07 Government Tender | PARTIAL | 政府 Tender 基本链路确认，内部细节和本期边界未完整确认 |

这里的 `CONFIRMED` 只表示场景主干有明确事实依据，不表示对应 REQ、Prototype 或交付物已批准或验收。

---

## 6. Business Rule 展示方案

### 6.1 默认业务层

业务流程页不再默认显示一排 Fact ID 和 Decision ID。每条规则先展示：

| 字段 | 展示规则 |
| --- | --- |
| 业务规则名称 | 使用现有 Fact/Decision 标题，例如“MR 生成触发点” |
| 业务说明 | 使用现有 Fact statement / Decision content，不改写事实含义 |
| 状态 | CONFIRMED、PARTIAL、OPEN 或 CONFLICT |
| 责任角色 | 只显示当前 Flow 节点中有明确依据的角色；没有明确依据则显示“未明确 / 待确认” |
| 操作 | `查看依据` |

默认卡片示意：

```text
MR 生成触发点                         CONFIRMED
客户确认报价、报价组确认中单后，系统才按最终成交报价材料生成 MR。
责任角色：报价组 / 系统
[查看依据]
```

### 6.2 规则数据原则

1. 不新建新的业务 Rule 事实源。
2. “业务规则卡片”只是 Fact/Decision 的呈现投影，不改变现有 ID、内容、状态或来源。
3. 一个卡片可以引用一个或多个 Fact/Decision，但必须保留反查关系。
4. 责任角色不能由页面设计者主观补充；只能来自已确认 Flow 节点或 Decision。证据不足时显示待确认。
5. 历史 Fact 默认不与当前 Confirmed Fact 混排；仅在“查看依据”中作为历史或冲突信息出现。
6. `FACT-xxx` 和 `CONFIRMED-xxx` 仍可搜索、复制和在详情中查看，但不作为默认阅读标题。

---

## 7. Fact / Decision 下钻方案

点击“查看依据”后，在现有右侧抽屉中按以下顺序展示：

1. 当前业务规则名称、说明、状态、责任角色。
2. 适用场景和流程节点。
3. 当前有效依据：Fact → Decision → Source。
4. 系统承接：REQ → PRD → Prototype。
5. 后续交付：SDD → TDD → Test。
6. Open Question / Conflict。
7. 历史结论、Rejected 或 Change。

证据抽屉分组规则：

- `当前有效依据`：当前 Confirmed/Partial 事实及其 Decision。
- `待确认`：PENDING / OPEN，不与 Confirmed 混排。
- `冲突`：CONFLICT，显示冲突双方和来源。
- `历史`：Legacy、Rejected、Deprecated，仅用于追溯。

从 Fact、Decision、REQ、PAGE 和 Source 进入抽屉时，继续提供双向链接。全局搜索仍支持直接搜索 `FACT-xxx`、`CONFIRMED-xxx`、`REQ-xxx` 和文件 ID。

---

## 8. 后续实施需要修改的文件

人工批准本计划后，预计需要修改：

| 文件 | 计划修改内容 |
| --- | --- |
| `.codex/project-hub-build/build-v2.js` | 增加 M+P 场景、非线性流程关系、规则呈现投影、统一统计口径；避免手工改 JSON 后被构建覆盖 |
| `project-hub/data/flows.json` | 总流程分支/回路结构、FLOW-MP、CM/Tender 重新编号和场景关系 |
| `project-hub/data/facts.json` | 只更新现有 Fact 与 FLOW-MP 的关联；不新增业务事实、不改内容和状态 |
| `project-hub/data/decisions.json` | 只更新现有 Decision 与 FLOW-MP 的关联；不改 Decision 原文和状态 |
| `project-hub/data/requirements.json` | 仅在有明确主题依据时增加 FLOW-MP 关联；不改变 80 条 REQ 的 OPEN 状态 |
| `project-hub/data/traceability.json` | 增补或调整 Decision/Fact/Flow/REQ 的显式边，保留 PARTIAL 语义 |
| `project-hub/data/architecture.json` | 同步实际一级导航和新的内部呈现模型 |
| `project-hub/data/audit-report.json` | 重新计算流程数、场景数、追溯边、UNLINKED、OPEN 和 Conflict 口径 |
| `project-hub/data/project-status.json` | 统一 479/318、21/22/23、5/6 等统计差异 |
| `project-hub/assets/app-v2.js` | 业务规则卡、证据下钻、7 场景、非线性总流程渲染 |
| `project-hub/assets/architecture.css` | 在现有视觉体系内增加分支流程、规则卡和折叠证据样式 |
| `project-hub/index.html` | 由构建脚本重新内嵌一致数据；不手工维护双份数据 |
| `project-hub/README.md` | 更新为“总流程 + 7 场景”，说明业务优先和证据下钻 |
| `project-hub/ISSUES_AND_GAPS.md` | 登记缺失业务基线及实施后仍保留的 Pending/Conflict |
| `project-hub/QA_REPORT.md` | 实施后记录页面、搜索、7 场景、反向追溯和 PC 显示检查 |

### 构建链注意事项

当前 `build-v2.js` 会读取 `data/flows.json` 作为 `baseFlows`，再写回同一文件。实施时需要避免“生成结果同时作为下一次构建输入”造成结构漂移。至少要保证：

- FLOW-MP 不会在重复构建时重复生成。
- 总流程新增的关系字段在重复构建后保持稳定。
- 外部 JSON 与 `index.html` 内嵌 HUB_DATA 完全一致。
- 不运行旧的 `.codex/project-hub-build/build.js`。

---

## 9. 后续实施需要新增的数据

只新增呈现和关联数据，不新增业务规则：

1. `FLOW-MP`：M+P 独立场景视图，依据 FACT-011～013 / CONFIRMED-011～013。
2. 非线性流程关系字段：`nextNodeIds`、`relationType`、`branchKey`、`displayGroup`。
3. 业务规则呈现投影：规则标题、说明、状态、责任角色、适用节点和 evidenceRefs；其内容只能引用既有 Fact/Decision。
4. 统一的场景显示顺序：00～07。
5. 每个场景的 `evidenceSummary`：Confirmed、Pending、Conflict 数量，用于场景卡和详情摘要。
6. 缺失基线状态：`knowledge/business/EC-REAL-BUSINESS-BASELINE.md` 在实际文件出现前记录为 `MISSING SOURCE`，不创建虚假 Source。
7. 统一统计定义：
   - `openQuestionCount = 21`
   - `conflictQuestionCount = 2`
   - `questionRecordCount = 23`
   - `conflictRecordCount = 6`
   具体数值必须在实施时根据当时数据重新计算，不能硬编码为永久值。

---

## 10. 不应该修改的内容

后续实施仍不得修改：

1. `knowledge/decisions/DEC-20260927-真实业务流程讨论.md` 的原文。
2. 客户会议纪要、Word、Excel、PDF、截图和纸质材料图片。
3. 当前 PRD、SDD、TDD。
4. `prototype/` 及原型整改结果。
5. 80 条 REQ 的业务内容和批准状态。
6. 17 条 Confirmed、2 条 Pending、1 条 Rejected 的结论和状态。
7. 历史知识库、备份和归档文件。
8. 一级导航结构。
9. 现有状态体系。
10. 任何证据不足的角色权限、状态转换、编号规则、金额阈值、采购主系统、照片数量或现场收款规则。

---

## 11. Pending 处理方式

### 11.1 展示原则

- Pending 不能隐藏，也不能进入 Confirmed 规则卡。
- 场景主干已确认但存在局部 Pending 时，场景状态使用 `PARTIAL`。
- Pending 节点显示“待确认”，不补默认动作、不补下一状态。
- Conflict 独立显示双方结论和来源，不选边、不覆盖。

### 11.2 当前必须保留的 Pending

1. `PENDING-001`：现场即时维修收款后的登记、交款、对账。
2. `PENDING-002`：CM 与 PM / 其他任务时间冲突的处理。
3. `Q-018`：Government Tender 的正式回标及 M/P/M+P 是否纳入本期。
4. `CONFLICT-002 / Q-008`：CM 场景师傅拒单权限。
5. `CONFLICT-005 / Q-007`：采购/库存主数据写入权。
6. `MISSING SOURCE`：`knowledge/business/EC-REAL-BUSINESS-BASELINE.md` 当前缺失。

### 11.3 对总流程的影响

- 现场收款只能作为独立待确认提示，不能定义财务交接步骤。
- CM 时间冲突节点保持 OPEN，不能画出自动重排、强制接单或拒单后续。
- Tender 内部材料准备和回标细节继续 PARTIAL。
- M+P 只确认双线分别推进，不定义统一完工 Gate、财务合并规则或固定执行顺序。

---

## 12. 建议实施顺序

### 阶段 0：人工确认 Gate

1. 人工确认本计划。
2. 确认缺失的 `EC-REAL-BUSINESS-BASELINE.md` 是否存在于其他位置；如不存在，保持 `MISSING SOURCE`。
3. 确认不修改 PRD、Prototype、SDD、TDD 和业务 Decision。

### 阶段 1：稳定数据模型

1. 调整 `build-v2.js`，消除生成结果自我输入的重复风险。
2. 增加非线性 Flow 关系字段。
3. 增加 `FLOW-MP`，只复用现有事实和 Decision。
4. 统一场景编号为 00～07。

### 阶段 2：重构业务全景与总流程呈现

1. 将总流程拆成入口、报价生命周期、中单 Gate、履约分支、SR/完工、财务跟踪。
2. 显示 P、M、M+P 分支和 SR 回流。
3. 将 CM、Tender、现场即时维修放到正确结构位置。
4. 将首页场景卡从 6 个改为 7 个。

### 阶段 3：业务规则优先、证据下钻

1. 将流程页的 Fact/Decision ID 列表替换为业务规则卡。
2. 默认展示规则名称、说明、状态、责任角色。
3. 点击“查看依据”后再展示 Fact、Decision、Source、REQ、Prototype。
4. 保留 ID 搜索和双向追溯。

### 阶段 4：同步追溯与统计

1. 更新 FLOW-MP 相关 Fact/Decision/REQ 边。
2. 重新生成 Traceability。
3. 统一文件、Open Question、Conflict、Flow 和场景数量。
4. 同步 `architecture.json`、`project-status.json`、`audit-report.json` 和 README。

### 阶段 5：全量验证

1. 7 个场景均可进入，名称和顺序正确。
2. 总流程存在分支、并行和回流，不再是单线节点。
3. 默认业务页面不再以 Fact/Decision ID 为主要内容。
4. `FACT-xxx`、`CONFIRMED-xxx`、`REQ-xxx` 搜索仍正常。
5. 任一规则可下钻 Fact → Decision → Source → REQ → Prototype。
6. Pending 和 Conflict 未被提升为 Confirmed。
7. 80 条 REQ 状态未被修改。
8. 外部 JSON 与 `index.html` 内嵌数据一致。
9. PC 页面、导航、抽屉和横向/分支流程显示正常。
10. 不产生旧资料断链。

---

## 13. 【修改前 → 修改后】页面结构对照

| 页面 | 修改前 | 修改后 |
| --- | --- | --- |
| 01 业务全景 | 10 节点单线主流程；6 场景；角色、问题、交付、治理指标 | 分层分支主流程；7 场景；其余模块保持，Evidence 指标继续置底 |
| 02 业务流程 / 00 总流程 | 客户需求 → 报价 → 中单 → M/P/M+P → 排期服务 → SR → 完工 → 收款的单线图 | 四类报价入口 → 报价生命周期 → 中单 Gate → P/M/M+P 分支；SR 可回流报价；CM/即时维修旁路；完工与收款独立 |
| 02 业务流程 / 01 普通报价维修 | 线性流程，主干基本完整 | 强化 R1/R2/R3 生命周期、中单 Gate、预排与正式时间、MR/材料/施工链 |
| 02 业务流程 / 02 二次维修 | 独立线性复制报价链 | 以 SR“需要报价”为回流点，复用报价生命周期，再进入 MR 和二次上门 |
| 02 业务流程 / 03 即时维修 | 详细步骤被呈现为接近 Confirmed | 主干业务优先；现场报价、收款、补记录等证据不足部分明确 PARTIAL；PENDING-001 可见 |
| 02 业务流程 / 04 周期保养 | 单次线性流程 | 整期计划 + 每期循环；SR 需要报价时回流报价链 |
| 02 业务流程 / 05 | 当前为 CM | 新增 M+P：M/P 双线分别推进，无固定先后 |
| 02 业务流程 / 06 | 当前为 Government Tender | 改为 CM，保留时间冲突 OPEN |
| 02 业务流程 / 07 | 不存在 | Government Tender；中标后进入 M/P/M+P，内部细节保持 PARTIAL |
| 业务规则 | Fact ID + Decision ID 直接铺开 | 规则名称 + 说明 + 状态 + 责任角色；点击“查看依据”后显示 ID 和证据 |
| 证据与追溯 | 已有完整入口 | 保持入口；作为下钻层承接 Fact、Decision、Source、REQ、Prototype |
| 系统需求 | 80 条 REQ 表格，部分流程关联 | 保持结构和状态；只同步有依据的 FLOW-MP 关联 |
| 原型与设计 | PRD/Prototype/SDD/TDD/Testing 状态和 PAGE 地图 | 保持；不因业务呈现改版改变交付状态或验收结论 |
| 待确认问题 | 业务 Open 与历史问题混合统计 | 页面不重做；统一 OPEN/CONFLICT 数量口径，并强化场景关联 |
| 项目状态 | 统计字段存在历史口径差异 | 保持页面结构，重新计算并统一所有指标 |

---

## 14. 实施验收标准

本计划只有在满足以下条件时才算完成后续实施：

- 一级导航和现有视觉风格未改变。
- 现有业务数据、Decision、Source、REQ、PAGE 和历史资料均保留。
- 总流程准确呈现报价生命周期、中单 Gate、M/P/M+P、P 材料链、M 整期计划、SR 回流、CM、Tender、完工与收款分离。
- 形成 00 + 01～07 共 8 个流程入口，其中 7 个为业务场景。
- M+P 不出现“固定先 P 后 M”的旧结论。
- 默认页面以业务规则和责任角色为主，证据 ID 进入下钻层。
- 所有无法确认的内容继续显示 OPEN、PARTIAL、CONFLICT 或 MISSING SOURCE。
- 不修改 Prototype、PRD、SDD、TDD 或业务代码。

本计划完成后应停止，等待人工确认，再进入实施。
