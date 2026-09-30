# 数据模型

## 1. 工单主表 `work_order`

| 字段 | 类型 | 必填 | 说明 | 来源 |
|---|---|---:|---|---|
| work_order_id | 文本/自动编号 | 是 | 系统内部ID。 | M6 |
| work_order_no | 文本 | 是 | 业务工单编号，小区/政府规则不同。 | M6 |
| order_type | 单选 | 是 | PM、CM、投诉、其他。 | M6 |
| business_type | 单选 | 是 | 小区类、政府合约类、商业/私营、待确认。 | M6 |
| source_channel | 单选 | 是 | 电话、WhatsApp、系统录入、其他。 | M6、I4 |
| call_time | 日期时间 | 是 | 来电/接单时间。 | I4 |
| call_code | 文本 | 否 | 纸质来电单字段。 | I4、I14 |
| customer_id | 关联 | 是 | 客户档案。 | M4、I16 |
| contact_name | 文本 | 是 | 联系人。 | I4、I16 |
| contact_phone | 文本 | 是 | 联系电话。 | I4 |
| address_id | 关联 | 是 | 标准地址/屋苑。 | M4 |
| area_code | 单选/关联 | 是 | 1P/2P/4P/5P/6P/7P等。 | M4、I19 |
| problem_description | 长文本 | 是 | Call Content/问题描述。 | I4 |
| priority | 单选 | 否 | 普通、紧急、待确认。 | I1 |
| current_status | 单选 | 是 | 待处理、已接单、处理中等。 | M5 |
| processing_sub_status | 单选 | 否 | 处理中子状态。 | M5 |
| assigned_team_id | 关联 | 否 | 分派团队。 | M6 |
| assigned_leader_id | 关联 | 否 | Team Leader。 | M6 |
| assignee_id | 关联 | 否 | 当前师傅。 | M5 |
| can_take_photo | 布尔 | 是 | 从客户档案带出，可覆盖。 | M5 |
| no_photo_reason | 文本 | 否 | 不可拍照或未拍照原因。 | M5 |
| need_quote | 布尔 | 否 | 是否需要报价。 | M4、M5 |
| need_purchase | 布尔 | 否 | 是否需要采购/材料。 | M4、M6 |
| need_reimbursement | 布尔 | 否 | 是否有报销关联。 | M4、M5 |
| expected_arrival_time | 日期时间 | 否 | 期望到场。 | I18 |
| arrived_at | 日期时间 | 否 | 师傅到场时间。 | M2、M4、M6、I16 |
| started_at | 日期时间 | 否 | 开始处理时间，可由师傅点击开始或到场后自动带出。 | M5 |
| submitted_at | 日期时间 | 否 | 师傅提交处理结果时间。 | M5、I16 |
| confirmed_at | 日期时间 | 否 | Leader确认完成时间。 | M4、M5 |
| completed_at | 日期时间 | 否 | 完成时间。 | I16 |
| archived_at | 日期时间 | 否 | 归档时间。 | I9 |
| cancel_reason | 文本 | 否 | 取消原因。 | M5 |
| latest_reject_reason | 文本 | 否 | 最近一次师傅/团队拒单原因。 | M5、M6 |
| outstanding_reason | 单选 | 否 | 未完成原因，如等待报价、等待材料、等待客户确认、施工中、待主管确认。 | M5、I5、I6 |
| service_report_no | 文本 | 否 | S/R编号或Service Report No.。 | I21-I28 |
| customer_signature_required | 布尔 | 否 | 是否需要客户签名/确认。 | I10、I16 |
| photo_required | 布尔 | 是 | 是否强制上传照片，由客户拍照策略和工单类型决定。 | M5、I11、I12 |
| external_reference_no | 文本 | 否 | 外部Reference No.，用于WhatsApp、客户来文、政府/供应商资料关联。 | I13、M4 |
| created_by/created_at | 系统字段 | 是 | 创建人/时间。 | M5 |
| updated_by/updated_at | 系统字段 | 是 | 更新人/时间。 | M5 |

## 2. 工单流转记录表 `work_order_event`

| 字段 | 类型 | 说明 |
|---|---|---|
| event_id | 自动编号 | 记录ID。 |
| work_order_id | 关联 | 所属工单。 |
| event_type | 单选 | 创建、派单、接单、拒单、到场、拍照、状态变更、退回、完成、取消、归档。 |
| from_status | 文本 | 变更前状态。 |
| to_status | 文本 | 变更后状态。 |
| operator_id | 关联 | 操作人，必须个人ID。 |
| operated_at | 日期时间 | 操作时间。 |
| remark | 长文本 | 备注/拒单原因/退回原因。 |
| location_text | 文本 | 到场地点文字。 |
| geo_point | 地理位置 | 打卡选点，非实时定位。 |

来源：M5、M6。

## 3. 照片附件表 `work_order_attachment`

| 字段 | 类型 | 说明 |
|---|---|---|
| attachment_id | 自动编号 | 附件ID。 |
| work_order_id | 关联 | 所属工单。 |
| attachment_type | 单选 | 现场前、现场后、故障细节、材料设备、员工纸、Job Completion、报价/PO、其他。 |
| file | 附件 | 图片/PDF/其他。 |
| uploaded_by | 关联 | 上传人。 |
| uploaded_at | 日期时间 | 上传时间。 |
| photo_time | 日期时间 | 拍摄时间，能获取则记录。 |
| geo_point | 地理位置 | 拍照/上传位置，能获取则记录。 |
| is_required | 布尔 | 是否必填。 |
| remark | 文本 | 说明。 |

来源：M1、M4、M5、I8、I11、I12、I16。

## 4. 客户档案表 `customer`

| 字段 | 类型 | 说明 |
|---|---|---|
| customer_id | 自动编号 | 客户ID。 |
| customer_name_tc | 文本 | 繁体中文标准名称。 |
| customer_name_en | 文本 | 英文别名。 |
| customer_type | 单选 | 住宅/屋苑、商业楼宇、政府、医院/纪律部队、供应商/外判、其他。 |
| default_contact | 文本 | 默认联系人。 |
| default_phone | 文本 | 默认电话。 |
| photo_policy | 单选 | 可拍照、不可拍照、需审批、待确认。 |
| special_notes | 长文本 | 进入限制、合约备注。 |
| active | 布尔 | 是否启用。 |

来源：M4、M5、I16。

## 5. 地址/区域表 `address_area`

| 字段 | 类型 | 说明 |
|---|---|---|
| address_id | 自动编号 | 地址ID。 |
| estate_name_tc | 文本 | 屋苑/地点繁体中文名称。 |
| estate_name_en | 文本 | 英文别名。 |
| full_address | 长文本 | 完整地址。 |
| district | 单选 | 行政区，如大埔、沙田等。 |
| area_code | 单选 | 1P、2P、4P、5P、6P、7P。 |
| default_team_id | 关联 | 默认团队。 |
| default_leader_id | 关联 | 默认Team Leader。 |
| geo_point | 地理位置 | 可选坐标。 |

来源：M4、I19。

## 6. 项目/合约表 `project_contract`

| 字段 | 类型 | 说明 |
|---|---|---|
| project_id | 自动编号 | 项目ID。 |
| project_no | 文本 | 区域码+年份+序列号。 |
| customer_id | 关联 | 客户。 |
| address_id | 关联 | 地点。 |
| contract_type | 单选 | Maintenance Contract、Main Contract、Tender、Walk-in PO、其他。 |
| government_flag | 布尔 | 是否政府/公营项目。 |
| start_date/end_date | 日期 | 合约期。 |
| pm_owner_id | 关联 | PM负责人。 |
| status | 单选 | 进行中、已完成、已取消、已归档。 |

来源：M4、I18、I31。

## 7. 报价记录表 `quotation_record`

| 字段 | 类型 | 说明 |
|---|---|---|
| quote_id | 自动编号 | 报价记录ID。 |
| quote_no | 文本 | Our Ref/报价编号。 |
| work_order_id | 关联 | 来源工单，可为空。 |
| project_id | 关联 | 项目/合约。 |
| sr_no | 文本 | S/R No. |
| quote_status | 单选 | 待报价、已发出、等待客户确认、已确认、需修订、已取消。 |
| version_no | 数字 | 版本号，二期启用。 |
| amount | 金额 | 总金额。 |
| currency | 单选 | 默认HKD。 |
| quote_owner_id | 关联 | 报价负责人。 |
| attachment_id | 关联 | 报价PDF/图片。 |

来源：M4、M5、I21-I28、I30。

## 8. 采购记录表 `purchase_record`

| 字段 | 类型 | 说明 |
|---|---|---|
| purchase_id | 自动编号 | 采购记录ID。 |
| work_order_id | 关联 | 来源工单。 |
| project_id | 关联 | 项目。 |
| po_no | 文本 | PO编号，支持手工/自定义。 |
| ml_no | 文本 | ML号码。 |
| material_description | 长文本 | 物料描述。 |
| supplier | 文本/关联 | 供应商。 |
| expected_arrival_date | 日期 | 预计到货。 |
| actual_arrival_date | 日期 | 实际到货。 |
| purchase_status | 单选 | 待采购、已下单、部分到货、已到货、已领取、已取消。 |
| amount | 金额 | 金额，默认HKD。 |
| attachment_id | 关联 | PO/报价/材料照片。 |

来源：M4、M6、I29、I31。

## 9. 报销记录表 `expense_record`

| 字段 | 类型 | 说明 |
|---|---|---|
| expense_id | 自动编号 | 报销ID。 |
| applicant_id | 关联 | 申请人。 |
| team_leader_id | 关联 | 组长/审批人。 |
| expense_month | 年月 | 报销月份。 |
| related_work_orders | 多关联 | 可关联多个已完成工单。 |
| expense_type | 单选 | 车资、物资、租车、其他。 |
| amount | 金额 | 报销金额。 |
| receipt_attachment | 附件 | 票据/手写单。 |
| ocr_status | 单选 | 未识别、已识别待确认、已确认、识别失败。 |
| approval_status | 单选 | 草稿、已提交、退回、已批准、已驳回、已归档。 |

来源：M4、M5、M6。

## 10. 用户/团队/区域配置表

### `team_config`

| 字段 | 类型 | 说明 |
|---|---|---|
| team_id | 自动编号 | 团队ID。 |
| team_name | 文本 | 团队名称。 |
| area_codes | 多选 | 负责区域码。 |
| leader_id | 关联 | Team Leader。 |
| member_ids | 多关联 | 师傅成员。 |
| skill_tags | 多选 | CCTV、门禁、车闸、公共广播等。 |
| active | 布尔 | 是否启用。 |

### `user_role_config`

| 字段 | 类型 | 说明 |
|---|---|---|
| user_id | 关联钉钉用户 | 用户。 |
| role | 多选 | CS、CR、Leader、师傅、报价、采购、财务、管理层、管理员。 |
| default_team_id | 关联 | 默认团队。 |
| data_scope | 单选 | 本人、本团队、本区域、全公司。 |
| active | 布尔 | 是否启用。 |

来源：M3、M5、M6、I19。
