# 报价中单后同步仓库通 Demo 说明

- 状态：草案 / 原型演示
- 日期：2026-09-28
- 适用范围：`prototype/`
- 目标系统：仓库通（宜搭应用）

## 1. 演示目标

报价组确认客户接受最终报价并执行“中单”后：

1. EC 原型按成交版本中的物料行生成唯一材料申请单 MR。
2. 系统通过本地同源代理调用 OpenYida，把演示数据写入真实仓库通 `MR表單`。
3. 报价详情和备货管理页展示同步状态、仓库通记录 ID、同步时间与幂等键。
4. 重复执行同步时沿用同一幂等键和外部记录 ID，避免重复材料申请。

## 2. 当前 Demo 边界

本 Demo 会真实写入宜搭，但仍是受限的联调链路，不是生产集成：

- 目标应用：`APP_RGMX9WOCVWT4XNZC1CQD`（仓库通）。
- 目标表单：`MR表單`，`FORM-FF9A60A90BD2454CBD0234703EA3462A3DDK`。
- 原型中新建的报价也允许触发演示同步，但远端 MR 号码强制使用 `MR-DEMO-*`；非演示 MR 编号会被拒绝。
- 每次创建前按 `MR號碼` 查询；已存在时直接返回原 `formInstId`，不重复建单。
- 浏览器不持有宜搭 Cookie 或密钥；本地 Python 代理复用已登录的 OpenYida 会话。
- `Q-007` 的采购 / 库存主数据归属仍待确认，因此这里只验证 EC → 仓库通单向创建。
- 2026-09-30 用户明确：采购单在仓库通建立；EC 原型不提供手工新建采购单入口。该范围说明不等同于采购状态、编辑权限及完整同步方向已确认。

## 3. Demo 字段映射

| EC 原型字段 | 仓库通目标语义 | 说明 |
| --- | --- | --- |
| `MR.remoteMrId` | `textField_mt84dlj5`（MR號碼） | 固定为 `MR-DEMO-*` |
| `quotationId` | 成交报价单号 | 追溯来源报价 |
| `acceptedRevision` | 成交报价版本 | 必须取中单时冻结版本 |
| `ticketId` | 来源 CALL / 工单 | 允许为空 |
| `spId` | EC 备货单号 | 允许为空 |
| `customerName` | `textField_2xpc2qtt5`（場地） | 追加“演示”标识 |
| `contractTotal` | `numberField_2xpd4aqt2`（合同總價） | 取成交报价总额 |
| `requestedAt` | `dateField_2xpd8psik`（日期） | 代理提交时间 |
| `quotationId` | `textField_lcmq1gy22` | 来源报价单号 |
| `lines[].name` | `textField_mtgp1s29` | 物料名称 |
| `lines[].code` | `textField_mt82hr88` | 演示物料编码 |
| `lines[].specification` | `textField_mt82hr89` | 规格 |
| `lines[].unit` | `textField_mt84dlj4` | 单位 |
| `lines[].quantity` | `numberField_mt82hr8b` | 预算数量 |
| `lines[].unitPrice` | `numberField_mtgm2fgu` | 预算单价 |
| `lines[].amount` | `numberField_mtgm2fgx` | 预算金额 |
| `EC-MR:<MR.id>` | 幂等键 | 重试不得重复建单 |

## 4. 演示运行方式

1. 保持当前宜搭登录有效。
2. 在项目根目录运行 `python3 prototype/server.py 18766`。
3. 打开 `http://localhost:18766`，以报价组身份进入报价管理。
4. 打开 `QT-DEMO-P`，点击“标记中单”，填写客户接受依据后提交。
5. 等待界面状态变为“已同步”，并显示真实 `FINST-*`。
6. 打开仓库通工作台，在 `MR表單` 中按远端 MR 号码查询。

必须通过 `server.py` 打开；直接双击 `index.html` 无法调用本地代理。

## 5. 验收口径

- P 或 M+P 报价中单后，且成交版本存在物料行，生成且只生成一张 MR。
- MR 载荷只包含成交版本中标记为“物料”的行。
- 页面显示目标应用、同步状态、真实宜搭 `formInstId`、远端 MR 号码、同步时间和幂等键。
- 对同一 MR 重试同步，不增加第二条宜搭记录，不改变 `formInstId`。
- M 报价无物料时，不生成 MR，也不触发仓库通同步。

## 6. 本轮验证结果

- 已读取仓库通真实 Schema，并完成一条线上创建及回查。
- 验证远端 MR：`MR-DEMO-QT-DEMO-P-20260928`。
- 验证宜搭实例：`FINST-JCD66ZC1K6L9Z0Z5O48UP6DS1TSU35Z1C3KUMIP`。
- 已验证主表字段、1 条物料子表、成交版物料过滤和按 MR 号码幂等回查。
- 聚焦浏览器回归通过，并在强制重试后仍返回同一 `formInstId`、成功日志仍为 1 条。
- 联调期间另保留一条带 `20260927` 后缀的演示记录（`FINST-JCI66IB1C7L9QKUHKYIGLD7UK6CT3G1FP3KUM2C`）；两条记录均有 `MR-DEMO-*` 和“演示”标识，未触碰正式 MR。
- 视觉证据：`review/prototype-remediation/evidence/WAREHOUSE-SYNC-DEMO.png`。
- 既有七场景回归在本轮修改前后均会停在旧的 CALL 客户视图定位器；这属于现有回归脚本与当前 UI 的偏差，不是本轮仓库通同步失败。聚焦回归已独立覆盖本轮链路。
