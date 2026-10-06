# 现有纸质表单字段到系统字段映射

本文件用于把客户现有纸质/Excel/报价/采购资料映射到一期系统字段，方便客户确认字段，不作为完整ERP、报价、采购、财务系统范围承诺。

## 1. Daily Service Call Form

来源：I4、I14。

| 现有字段 | 系统字段 | 所属数据表 | 一期是否必填 | 备注 |
|---|---|---|---|---|
| Client | customer_id / customer_name_tc | work_order / customer | 是 | 从客户档案选择；新客户可临时录入后补档。 |
| Contact Person | contact_name | work_order | 是 | 来电联系人。 |
| Contact Number | contact_phone | work_order | 是 | 来电电话。 |
| Date & Time of Call | call_time | work_order | 是 | 来电时间。 |
| Call received by | created_by | work_order | 是 | 系统自动记录CS账号。 |
| Call Code | call_code | work_order | 否 | 保留现有分类码，具体枚举待确认。 |
| Call Content | problem_description | work_order | 是 | 问题描述。 |
| Contractor | external_contractor / remark | work_order_event | 否 | 一期可放备注或后续外判字段。 |
| Time of Calling | call_time | work_order | 是 | 与来电时间合并。 |
| Maintenance Team | assigned_team_id | work_order | 否 | 派单后生成。 |
| Colleague Arrived | assignee_id | work_order | 否 | 师傅接单/到场后生成。 |
| Arrival Date | arrived_at | work_order | 否 | 到场记录生成，P0。 |
| Remarks | remark | work_order_event | 否 | 流转备注。 |

## 2. Service Report

来源：I16。

| 现有字段 | 系统字段 | 所属数据表 | 一期是否必填 | 备注 |
|---|---|---|---|---|
| Customer No. | customer_id / external_customer_no | customer | 否 | 若客户已有编号则导入。 |
| Account No. | account_no | customer / project_contract | 否 | 一期可作为客户/项目扩展字段。 |
| Customer | customer_id | work_order | 是 | 从客户档案选择。 |
| Address | address_id / full_address | work_order / address_area | 是 | 标准地址。 |
| Contact Person | contact_name | work_order | 是 | 可从客户档案带出后修改。 |
| System | system_type | work_order | 否 | 如CCTV、门禁、公共广播等，建议P0字段。 |
| Objective | problem_description / work_objective | work_order | 是 | 可与问题描述合并，或设为处理目标。 |
| Technician Notes | result_description | work_order_event | 是 | 师傅处理结果。 |
| Completion Date / Time | submitted_at / completed_at | work_order | 是 | 师傅提交和完成时间。 |
| Spare Parts Required | need_purchase / material_description | work_order / purchase_record | 否 | 需要材料时填写。 |
| Customer Signature | customer_signature_required / attachment | work_order / work_order_attachment | 否 | 是否强制需客户签名待确认。 |
| Technician Signature | submitted_by / attachment | work_order_event / attachment | 否 | 一期用个人账号替代签名，必要时可上传照片。 |

## 3. Job Completion

来源：I10、I8。

| 现有字段 | 系统字段 | 所属数据表 | 一期是否必填 | 备注 |
|---|---|---|---|---|
| Job / Project / Quotation reference | work_order_no / project_no / quote_no | work_order / project_contract / quotation_record | 是 | 一期以工单号为主，项目/报价可选关联。 |
| Completion Date | completed_at / confirmed_at | work_order | 是 | Leader确认后写入完成/确认时间。 |
| Job Completion Content | result_description | work_order_event | 是 | 处理结果。 |
| Customer Confirmation | customer_signature_required / customer_confirm_status | work_order | 否 | 是否需要客户确认需客户确定。 |
| Company Chop / Signature | completion_attachment | work_order_attachment | 否 | 可上传完成确认文件。 |
| Before / After Photos | attachment_type | work_order_attachment | 是/条件必填 | 可拍照客户建议必填；不可拍照客户豁免。 |

## 4. Quotation

来源：I21-I28、I30。

| 现有字段 | 系统字段 | 所属数据表 | 一期是否必填 | 备注 |
|---|---|---|---|---|
| Date | quote_date | quotation_record | 否 | P2预留/二期启用。 |
| Our Ref. | quote_no | quotation_record | 否 | 一期仅预留报价编号。 |
| To | customer_id | quotation_record | 否 | 与客户档案关联。 |
| Site | address_id / project_id | quotation_record | 否 | 与地址/项目关联。 |
| Attn | quote_contact_name | quotation_record | 否 | 报价联系人。 |
| Fax / Tel / Email | quote_contact_info | quotation_record | 否 | 联系方式。 |
| S/R No. | service_report_no / sr_no | work_order / quotation_record | 否 | 支持按S/R检索。 |
| Description | quote_description | quotation_record | 否 | 二期报价明细字段。 |
| Qty | quote_qty | quotation_record_detail | 否 | 二期明细行。 |
| Unit Price | quote_unit_price | quotation_record_detail | 否 | 二期明细行。 |
| Amount / Total | amount | quotation_record | 否 | 一期可手填总额，非必填。 |
| Terms & Conditions | quote_terms | quotation_record | 否 | 二期报价模板。 |
| Prepared / Checked / Signature | quote_owner_id / attachment | quotation_record | 否 | 一期只记录负责人和附件。 |

## 5. Purchase Order

来源：I29、I31。

| 现有字段 | 系统字段 | 所属数据表 | 一期是否必填 | 备注 |
|---|---|---|---|---|
| Supplier | supplier | purchase_record | 否 | P2预留，二期可做供应商档案。 |
| Site | project_id / address_id | purchase_record | 否 | 与项目/地址关联。 |
| PO No. | po_no | purchase_record | 否 | P2预留字段。 |
| Item | purchase_item | purchase_record | 否 | 简版可放材料说明。 |
| Description | material_description | purchase_record | 否 | 需要材料时填写。 |
| Quantity | purchase_qty | purchase_record | 否 | 二期可做明细。 |
| Price | amount | purchase_record | 否 | 默认HKD。 |
| Total | amount | purchase_record | 否 | 一期非必填。 |
| Terms and Conditions | purchase_terms | purchase_record | 否 | 二期模板。 |
| Commencement / Completion | expected_arrival_date / actual_arrival_date | purchase_record | 否 | 一期只做预计/实际到货状态字段。 |
| ML No. | ml_no | purchase_record | 否 | P2预留字段。 |

## 6. Outstanding Project List

来源：I5、I6、I18、I31。

| 现有字段 | 系统字段 | 所属数据表 | 一期是否必填 | 备注 |
|---|---|---|---|---|
| Project Code | project_no | project_contract | 否 | 若工单关联项目则填写。 |
| Name of Site | address_id / estate_name_tc | address_area | 是 | 工单必须有地址/地点。 |
| Project Description | problem_description / project_description | work_order / project_contract | 是 | 工单问题描述或项目说明。 |
| Date Received | call_time / created_at | work_order | 是 | 用于工单创建时间。 |
| Project Period | project_period | project_contract | 否 | 二期项目管理字段。 |
| Schedule / Due Date | expected_arrival_time / due_date | work_order | 否 | 可用于超时提醒。 |
| Expected Completion | expected_completion_date | work_order | 否 | P1看板可用。 |
| Completion Date | completed_at | work_order | 否 | 完成后生成。 |
| Status | current_status | work_order | 是 | 一期核心状态字段。 |
| Team / Person in Charge | assigned_team_id / assignee_id | work_order | 否 | 派单后生成。 |
| Outstanding Reason | outstanding_reason | work_order | 否 | P1看板字段。 |
| Project Cost / Amount | project_cost / amount | project_contract / quotation_record | 否 | 一期不做完整成本核算。 |
