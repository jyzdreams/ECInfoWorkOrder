# Prototype 整改逐项追踪

- 整改前基线 Commit：`d7ebc14e9b8e2492ab0c8c80820bf2add054638f`
- Tag：`prototype-before-remediation-2026-09-27`，指向同一提交。
- 备份：`backups/prototype-before-remediation-20260927/`；原型 5 个文件、原审查目录 69 个文件、整改计划 1 个文件及 Decision 1 个文件逐文件 SHA-256 一致。**BACKUP VERIFIED = YES**。
- 原始 `review/prototype-knowledge-audit/` 及其截图保持不变；2026-09-27 末轮逐文件 SHA-256 复核：原审查 69/69、Decision 1/1、原整改计划 1/1 与备份一致。
- Playwright 在隔离浏览器上下文中逐项执行 SCENE-01～07，最终 **7/7 PASS，执行覆盖率 100%**。脚本及七张末轮截图见 `regression.playwright.cjs`、`evidence/`；详细结论见 `REMEDIATION-RESULT.md`。

| R-ID | 修改文件 | 修改页面 | 修改内容 | Decision 依据 | 影响场景 | 当前结果 |
|---|---|---|---|---|---|---|
| R-01 | `prototype/index.html`、`prototype/remediation.js` | 师傅移动端 SR/CP、报告管理、CALL 详情、CR/TL 待确认 | SR 提交进入待完工确认，CR/TL 确认后完成；CP 不直接关单；报告状态可筛选 | CONFIRMED-010/015 | SCENE-01/02/03/04/06 | **FIXED**；对应场景 PASS；CP/SR 完整映射仍 PENDING |
| R-03 | `prototype/remediation.js` | 报价中单弹窗、报价详情 | 客户接受最终版本及 QUO 中单统一入口，按成交版物料行建唯一 MR | CONFIRMED-003/006/007/008 | SCENE-01/05/07 | **FIXED**；普通 P 及 Tender 三类成交支线 PASS |
| R-04 | `prototype/remediation.js`、`prototype/index.html` | 备货管理 MR 列表/详情 | 展示 MR→SP/PO→材料就绪与逐行缺量；就绪只作演示交接信号，旧同步来源文案标为待确认 | CONFIRMED-006/007 | SCENE-01/05/07 | **FIXED（可见关系）**；仓储主系统仍 PENDING |
| R-06 | `prototype/index.html`、`prototype/remediation.js` | CALL 详情、移动端、排程 | 区分预排与正式客户时间；MR 未就绪阻止确认正式时间；师傅可见正式时间 | CONFIRMED-004/005 | SCENE-01/05/07 | **FIXED**；缺料阻断与就绪后确认 PASS |
| R-07 | `prototype/remediation.js`；沿用 `prototype/index.html` 原有版本功能 | 报价编辑/历史/成交 | 保留 R0/R1/R2 快照，成交锁定版本、物料及 M 服务周期快照；显示版本交接 | CONFIRMED-008 | SCENE-01/02/07 | **FIXED**；R2 Mock 与成交版 MR/计划走查 PASS |
| R-11 | `prototype/remediation.js` | 报价中单弹窗 | 普通报价不强制、不生成 Tender No；Tender 来源显示真实编号 | CONFIRMED-002/003/016 | SCENE-01/07 | **FIXED**；普通报价无伪 Tender No、Tender 来源可追 |
| R-08 | `prototype/index.html`、`prototype/remediation.js` | 师傅 SR、报价详情 | 已报价任务仍可提交 SR；需要报价按本次 SR 生成维修报价，保留 M 合同链接 | CONFIRMED-002/009/010 | SCENE-02/03 | **FIXED**；二次报价与现场即时维修 PASS；CP/SR 完整映射仍 PENDING |
| R-09 | `prototype/remediation.js` | 报价编辑、保养计划、各期 CALL | 成交 M 按服务周期及合同期建整期计划；每期 CALL、SR、确认独立回写 | CONFIRMED-011/012/010 | SCENE-02/04/05 | **FIXED**；四期计划与第二期独立完工 PASS；Billing Cycle 未参与 |
| R-13 | `prototype/remediation.js` | M+P 报价详情、保养计划、MR | M 和 P 各有对象与进度，无固定先后门槛 | CONFIRMED-011/012/013；REJECTED-001 | SCENE-05/07 | **FIXED**；P 缺料时 M 可完工，P 完工不推进其余 M 期次 |
| R-02 | `prototype/remediation.js` | CALL 工作队列、客户主档、报价需求 | CALL 独立筛选/详情；CS 交 CR/TL，再转 QUO；CR 可直接发起 | CONFIRMED-001/002/009 | SCENE-01/03 | **FIXED（已确认入口）**；CS→CR/TL→QUO 实测 PASS；完整权限矩阵仍 PENDING |
| R-10 | `prototype/remediation.js` | Tender 详情、中标、关联报价 | Tender 中标后保留 M/P/M+P 类别与来源，报价仍待客户接受，成交后分别生成 MR/计划 | CONFIRMED-016/011/013 | SCENE-07/05 | **FIXED**；三类 Tender 分流与成交后对象 PASS；内部审批/OCR/回标仍 PENDING |
| R-14 | `prototype/index.html`、`prototype/remediation.js` | CM CALL、分派、师傅端、SR | CM 走 CR/TL 直派→SR→确认；不执行自动释放 PM/重排 | CONFIRMED-014/015；PENDING-002 | SCENE-06/04 | **FIXED（已确认主链）**；CM 场景 PASS；CM/PM 冲突仍 PENDING |
| R-15 | `prototype/remediation.js`、`prototype/README.md` | 报价/版本、MR、保养计划、CALL、Tender、CM | 原始种子浏览器增加 P/M/M+P、SR/CM/Tender 样例；保留历史缺证据数据；更新原型说明 | CONFIRMED-001～017 | SCENE-01～07 | **FIXED**；七场景 7/7 PASS，隔离浏览器种子不覆盖已有本地数据 |

## 回归中发现并处理

- 首轮 7/7 场景均执行，4 PASS、3 FAIL。其中两项为脚本切换角色后详情抽屉遮挡操作；已修正回归脚本。另一项是两份种子 M 计划在同一毫秒生成重复 ID，导致第二期 CALL 无法建立；已改为按报价 ID 唯一标识，同时 MR 按报价 ID 唯一标识。
- 修复后完整重跑；增强了 CS 转交、普通报价无伪 Tender、Tender 三类成交分流及 M/P 互不推进的断言。最终 7/7 PASS，执行覆盖率 100%。
- 复核 Tender 时发现旧报价详情按 `bidStatus=已中標` 隐藏“标记中单”，令中标后尚未客户接受的报价无法走 QUO 中单。已改按报价 `status` 判断按钮可见；末轮场景通过真实按钮完成中单。
- R-05、R-12 保持 PENDING，不阻塞已确认整改；没有实现仓储主系统归属、完整角色矩阵、CP/SR 完整映射、CM/PM 冲突及现场收款交接规则。
