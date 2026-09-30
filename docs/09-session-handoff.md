# 会话交接摘要（Context Handoff）

**日期**：2026-08-14
**核心结论**：流程文件八大流程已在原型上全部落地（6 大模块改造），当前处于用户逐步验证阶段（正在验证标书流程）。

## 一、项目背景

- **项目**：ECInfo CALL 工單系統原型（EC 工单系统）
- **权威依据**（用户确认的最新流程文件，修改一律以它为准）：
  - `quotation_flow_readable.md`（报价流程）
  - `tender_flow_readable.md`（标书流程）
  - `other_flows.md`（CS Call / PM / Q2C / Procurement / Special / CM）
- **唯一改动源文件**：`ui-prototype/index.html`（单文件原型，约 22800 行）

## 二、已完成的六大模块改造（本次会话）

| 模块 | 关键改造 |
|---|---|
| ① 工单执行/派单 | 师傅拒单(必填原因)、改派修复、申请接单审批("待審批"状态)、超时/未签到提醒(checkTimeouts+模擬超時)、通知规则4条 |
| ② 报价流程 | 5态含"需修訂"、M/P/M+P类别三叉通知、三态库存判定(inventoryStatus)、发出报价渠道弹窗、后补报价(isSupplementary)、财务闭环修复(bidStatus)、ourRef自动生成、標記中標启用 |
| ③ 标书流程 | 状态统一(投標中→待投標迁移)、**匯入標書独立弹窗(上传+模拟扫描识别+确认汇入)**、自動分配、回標、匯出PDF、中标类别通知、未中標按钮、字典3 tab、描述字段 |
| ④ 采购/备货 | "已入庫"状态流、入庫存/确认货品(CR)/错误回流、备货通知、closeProcurement通知FIN修复、死代码清理、CR采购页权限 |
| ⑤ CM流程 | "糾正維修"类型、接受CM(放弃PM排程)/不接受CM(CR/CS/Super重派) |
| ⑥ Special+CS Call | 實體/電子完工紙切换、取消超时提醒、完工后通知CS+CR；來電單記錄(callLogs)、通知Super、投訴通知CR、首页最近来电卡片；修复"仅答疑无法提交"和"CS无create页权限" |

**顺带修复**：新建标书选客户后**区域自动带出**（含增强下拉显示文本同步，`syncSearchableSelectDisplay`）

## 三、产出文档与证据

- `docs/08-prototype-flow-consistency.md`（v1.5）：全局流程总览 + 6段改造记录 + 八大流程覆盖度 + 剩余缺口
- `gui-test-screenshots/t1~t13`：浏览器实测证据截图
- 本文件 `docs/09-session-handoff.md`

## 四、当前进度（进行中）

- 用户正在**逐步验证标书流程**（①状态统一 ②匯入/自動分配 ③回標 ④匯出 ⑤中標通知 ⑥未中標 ⑦字典 ⑧描述）
- 已验证通过：状态统一✅、匯入標書独立弹窗✅（模拟识别+确认汇入，T-2026-007）、新建标书客户联动区域✅（含显示同步修复✅）
- 未验证：回標 / 匯出標書 / 中標後通知 / 未中標按钮 / 字典3tab / 描述字段

## 五、剩余待办（docs/08 §4.3）

- **P1**：通知规则字典生效化、财务自动开票
- **P2**：MR物料申请单实体、留货/列印完工纸/合并放仓库、三态库存细化至物料级、M+P"?主管"角色确认
- **P3**：团队工单审批角色差异、工单退回补充、标书中标后建执行工单

## 六、技术要点（压缩后必须保留）

1. **语法校验**：`cd ui-prototype && node check_syntax2.js`（必跑）；`check_syntax.js` 为渐进解析
2. **启动服务**：`cd ui-prototype && python server.py 8081` → http://localhost:8081
3. **浏览器测试坑**（IAB 运行时）：
   - `tab.reload()` 后点击偶发失效（actionability 超时）→ 用**新标签页**（`browser.tabs.new()` + goto）或**账号登录**（员工编号即可，如 EMP0026 邹组长 / EMP0001 陈小姐 / EMP0002 李组长 / EMP0009 林主管）
   - 快速登录卡点击也可能失效 → 账号登录兜底
   - 真实文件上传不受支持（IAB）→ 模拟识别/示例数据验证
   - alert/prompt/confirm 弹窗无法自动关闭 → 相关校验测试跳过或代码验证
   - 关键人物：赵组长 U023(1區TL)、李组长 U003(2區TL)、吴师傅 U006、周师傅 U005、冯师傅 U025、邹组长(报价组)、陈小姐(CS)、林主管(ADMIN)、陈关系 U021(1區CR)、张采购(采购部)、陈会计(会计部)
4. **通知基建**：`createNotification({module,level,title,content,subContent,targetPage,targetId,receiverId,receiverRole})`；工单事件走 `triggerNotification` + `NOTIFICATION_RULES`
5. **增强下拉**：select 被 `enhanceSearchableSelects` 包装，程序设值后必须调用 `syncSearchableSelectDisplay(select)` 同步显示文本
6. **git 状态**：`ui-prototype/index.html`（M，+1000 余行）、`docs/08`、`docs/09`、`gui-test-screenshots/`（新增）——**均未提交**（用户未要求提交，可询问）
7. **三线同构**：M/P/M+P 仅执行角色不同（M→CR、P→Project主管、M+P→?主管待确认，均以 TL 占位）
