# 文档目录搬移记录

日期：2026-10-11。依据：用户批准的六类文档方案。

## 结果与边界

- 三个日常入口：推进Excel、prototype/、project-hub/。
- 143个文档及配套文件已搬移，目标无冲突；初次搬移时逐文件完整SHA-256均一致。
- 搬移后31个文件仅修复引用或更新入口/治理说明，下表区分最终哈希是否一致。业务基线仅改变来源路径，9/27业务决定逐字不变。
- 客户原件、交付批次、历史原型、备份、原型代码、既有10/07审计和旧KB数据均未改；494个受保护文件哈希一致。
- Hub保留已有编号、业务状态、关系、统计数和生成日期，仅适配路径；没有运行业务重建。
- 额外修复112条先前失效的materials/raw/索引，逐条映射到已经存在的materials/歷史原型/文件；本轮没有移动这些文件。
- 原有知识库维护说明另以KNOWLEDGE_BASE_README-20260926.md保留在docs/history/knowledge-base/。
- 历史记录中的原路径是原版本证据，不静默改写既有10/07审计。以本清单查现址。
- 最新业务整合、Excel升级、原型整改、客户确认和业务验收仍待完成。

## 验证

- Hub七个主栏目、五个证据子栏目、全局搜索、文件详情及来源链接正常；490个索引文件现址全部存在。
- 当前原型及历史知识页面正常显示；历史演示稿24个图片元素加载正常。
- 浏览器无脚本错误；验证使用隔离上下文，阻断外部请求，没有运行仓库同步或业务操作。
- build-v2.js路径检查无写入且通过；未来按现址保留已有FILE编号，原KB来源路径在内存中解析迁移映射。
- 旧build.js入口禁用，避免覆盖当前知识文档/界面。

技术记录、脚本、截图和完整哈希保存在.codex/doc-migration/2026-10-11/；路径兼容映射在.codex/project-hub-build/path-migrations.json，仅用于文件寻址，不是项目进度台账。

## 原位置与现位置

哈希列为完整SHA-256的前12位，完整值保存在技术验证记录中。引用修复与治理调整会使最终哈希变化；搬移动作本身已确认字节一致。

| 原位置 | 现位置 | 搬移前哈希 | 整理后哈希 | 最终字节一致 |
| --- | --- | --- | --- | --- |
| knowledge/.DS_Store | [docs/knowledge/.DS_Store](../knowledge/.DS_Store) | 4577add489ce | 4577add489ce | Y |
| knowledge/01-source/SOURCE-INDEX.md | [docs/knowledge/01-source/SOURCE-INDEX.md](../knowledge/01-source/SOURCE-INDEX.md) | 60b471481add | be3fd41a29b2 | 引用/治理调整 |
| knowledge/02-decisions/DECISION-INDEX.md | [docs/knowledge/02-decisions/DECISION-INDEX.md](../knowledge/02-decisions/DECISION-INDEX.md) | cd692e349641 | 412f467cf5e3 | 引用/治理调整 |
| knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md | [docs/knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md](../knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md) | 22f75522a786 | dd03ccf2f0b4 | 引用/治理调整 |
| knowledge/03-business/PROJECT-HUB-FLOW-DATA.md | [docs/knowledge/03-business/PROJECT-HUB-FLOW-DATA.md](../knowledge/03-business/PROJECT-HUB-FLOW-DATA.md) | f8d0fade488c | f8d0fade488c | Y |
| knowledge/04-requirements/REQUIREMENT-INDEX.md | [docs/knowledge/04-requirements/REQUIREMENT-INDEX.md](../knowledge/04-requirements/REQUIREMENT-INDEX.md) | 60552c69b9c6 | e353ace3a894 | 引用/治理调整 |
| knowledge/05-pending/OPEN-QUESTIONS.md | [docs/knowledge/05-pending/OPEN-QUESTIONS.md](../knowledge/05-pending/OPEN-QUESTIONS.md) | 064b9cd67326 | cd4f1276e663 | 引用/治理调整 |
| knowledge/KNOWLEDGE-CONSOLIDATION-REPORT.md | [docs/knowledge/KNOWLEDGE-CONSOLIDATION-REPORT.md](../knowledge/KNOWLEDGE-CONSOLIDATION-REPORT.md) | 977d40a6e266 | 3e5ee4366b98 | 引用/治理调整 |
| knowledge/PROJECT-HUB-KNOWLEDGE-INTEGRATION.md | [docs/knowledge/PROJECT-HUB-KNOWLEDGE-INTEGRATION.md](../knowledge/PROJECT-HUB-KNOWLEDGE-INTEGRATION.md) | fe1d7d96f6a7 | 5425b2efa04f | 引用/治理调整 |
| knowledge/README.md | [docs/knowledge/README.md](../knowledge/README.md) | 1d29d6671ee1 | 99b1ea5c7104 | 引用/治理调整 |
| knowledge/decisions/DEC-20260927-真实业务流程讨论.md | [docs/knowledge/decisions/DEC-20260927-真实业务流程讨论.md](../knowledge/decisions/DEC-20260927-真实业务流程讨论.md) | 3573cc552d36 | 3573cc552d36 | Y |
| review/.DS_Store | [docs/review/.DS_Store](../review/.DS_Store) | b7ad9d5a1d3c | b7ad9d5a1d3c | Y |
| review/prototype-knowledge-audit/.DS_Store | [docs/review/prototype-knowledge-audit/.DS_Store](../review/prototype-knowledge-audit/.DS_Store) | 097435000304 | 097435000304 | Y |
| review/prototype-knowledge-audit/PROTOTYPE-KNOWLEDGE-AUDIT.md | [docs/review/prototype-knowledge-audit/PROTOTYPE-KNOWLEDGE-AUDIT.md](../review/prototype-knowledge-audit/PROTOTYPE-KNOWLEDGE-AUDIT.md) | 24823a51bfcd | 446296aff29d | 引用/治理调整 |
| review/prototype-knowledge-audit/screenshots/00-initial.png | [docs/review/prototype-knowledge-audit/screenshots/00-initial.png](../review/prototype-knowledge-audit/screenshots/00-initial.png) | c9af5f4b6e8c | c9af5f4b6e8c | Y |
| review/prototype-knowledge-audit/screenshots/01-admin-dashboard.png | [docs/review/prototype-knowledge-audit/screenshots/01-admin-dashboard.png](../review/prototype-knowledge-audit/screenshots/01-admin-dashboard.png) | 9a10e1fb77ff | 9a10e1fb77ff | Y |
| review/prototype-knowledge-audit/screenshots/01-dashboard-admin.png | [docs/review/prototype-knowledge-audit/screenshots/01-dashboard-admin.png](../review/prototype-knowledge-audit/screenshots/01-dashboard-admin.png) | e9b897d6e230 | e9b897d6e230 | Y |
| review/prototype-knowledge-audit/screenshots/02-workorder-admin.png | [docs/review/prototype-knowledge-audit/screenshots/02-workorder-admin.png](../review/prototype-knowledge-audit/screenshots/02-workorder-admin.png) | 3c215ce475a9 | 3c215ce475a9 | Y |
| review/prototype-knowledge-audit/screenshots/03-dispatch-admin.png | [docs/review/prototype-knowledge-audit/screenshots/03-dispatch-admin.png](../review/prototype-knowledge-audit/screenshots/03-dispatch-admin.png) | 4a88139da151 | 4a88139da151 | Y |
| review/prototype-knowledge-audit/screenshots/04-quotations-admin.png | [docs/review/prototype-knowledge-audit/screenshots/04-quotations-admin.png](../review/prototype-knowledge-audit/screenshots/04-quotations-admin.png) | e0dee373eddc | e0dee373eddc | Y |
| review/prototype-knowledge-audit/screenshots/05-tender-admin.png | [docs/review/prototype-knowledge-audit/screenshots/05-tender-admin.png](../review/prototype-knowledge-audit/screenshots/05-tender-admin.png) | c496e7c3a4d0 | c496e7c3a4d0 | Y |
| review/prototype-knowledge-audit/screenshots/06-procurement-admin.png | [docs/review/prototype-knowledge-audit/screenshots/06-procurement-admin.png](../review/prototype-knowledge-audit/screenshots/06-procurement-admin.png) | 9066d7bc0e50 | 9066d7bc0e50 | Y |
| review/prototype-knowledge-audit/screenshots/07-finance-admin.png | [docs/review/prototype-knowledge-audit/screenshots/07-finance-admin.png](../review/prototype-knowledge-audit/screenshots/07-finance-admin.png) | d5c63fa38384 | d5c63fa38384 | Y |
| review/prototype-knowledge-audit/screenshots/08-srfolder-admin.png | [docs/review/prototype-knowledge-audit/screenshots/08-srfolder-admin.png](../review/prototype-knowledge-audit/screenshots/08-srfolder-admin.png) | cce8af341601 | cce8af341601 | Y |
| review/prototype-knowledge-audit/screenshots/09-report-admin.png | [docs/review/prototype-knowledge-audit/screenshots/09-report-admin.png](../review/prototype-knowledge-audit/screenshots/09-report-admin.png) | 2fffcb57c186 | 2fffcb57c186 | Y |
| review/prototype-knowledge-audit/screenshots/10-settings-admin.png | [docs/review/prototype-knowledge-audit/screenshots/10-settings-admin.png](../review/prototype-knowledge-audit/screenshots/10-settings-admin.png) | a4e155695690 | a4e155695690 | Y |
| review/prototype-knowledge-audit/screenshots/action-dispatch-assign.png | [docs/review/prototype-knowledge-audit/screenshots/action-dispatch-assign.png](../review/prototype-knowledge-audit/screenshots/action-dispatch-assign.png) | 3e2437ca3b6b | 3e2437ca3b6b | Y |
| review/prototype-knowledge-audit/screenshots/action-finance-contracts.png | [docs/review/prototype-knowledge-audit/screenshots/action-finance-contracts.png](../review/prototype-knowledge-audit/screenshots/action-finance-contracts.png) | e6adba7b6048 | e6adba7b6048 | Y |
| review/prototype-knowledge-audit/screenshots/action-finance-customer-archive.png | [docs/review/prototype-knowledge-audit/screenshots/action-finance-customer-archive.png](../review/prototype-knowledge-audit/screenshots/action-finance-customer-archive.png) | 7d46e834afa8 | 7d46e834afa8 | Y |
| review/prototype-knowledge-audit/screenshots/action-finance-invoices.png | [docs/review/prototype-knowledge-audit/screenshots/action-finance-invoices.png](../review/prototype-knowledge-audit/screenshots/action-finance-invoices.png) | acca5913048b | acca5913048b | Y |
| review/prototype-knowledge-audit/screenshots/action-finance-receipts.png | [docs/review/prototype-knowledge-audit/screenshots/action-finance-receipts.png](../review/prototype-knowledge-audit/screenshots/action-finance-receipts.png) | 5223bab5b7d2 | 5223bab5b7d2 | Y |
| review/prototype-knowledge-audit/screenshots/action-finance-register-receipt-step2.png | [docs/review/prototype-knowledge-audit/screenshots/action-finance-register-receipt-step2.png](../review/prototype-knowledge-audit/screenshots/action-finance-register-receipt-step2.png) | 52e5ffb1181f | 52e5ffb1181f | Y |
| review/prototype-knowledge-audit/screenshots/action-finance-register-receipt.png | [docs/review/prototype-knowledge-audit/screenshots/action-finance-register-receipt.png](../review/prototype-knowledge-audit/screenshots/action-finance-register-receipt.png) | 75431ecf2045 | 75431ecf2045 | Y |
| review/prototype-knowledge-audit/screenshots/action-procurement-detail.png | [docs/review/prototype-knowledge-audit/screenshots/action-procurement-detail.png](../review/prototype-knowledge-audit/screenshots/action-procurement-detail.png) | 3b876a92a97e | 3b876a92a97e | Y |
| review/prototype-knowledge-audit/screenshots/action-quotation-detail.png | [docs/review/prototype-knowledge-audit/screenshots/action-quotation-detail.png](../review/prototype-knowledge-audit/screenshots/action-quotation-detail.png) | 9ceb00044c9a | 9ceb00044c9a | Y |
| review/prototype-knowledge-audit/screenshots/action-quotation-edit.png | [docs/review/prototype-knowledge-audit/screenshots/action-quotation-edit.png](../review/prototype-knowledge-audit/screenshots/action-quotation-edit.png) | 1ae48216aa74 | 1ae48216aa74 | Y |
| review/prototype-knowledge-audit/screenshots/action-quotation-new.png | [docs/review/prototype-knowledge-audit/screenshots/action-quotation-new.png](../review/prototype-knowledge-audit/screenshots/action-quotation-new.png) | 3619bcf4417f | 3619bcf4417f | Y |
| review/prototype-knowledge-audit/screenshots/action-settings-dictionary-create.png | [docs/review/prototype-knowledge-audit/screenshots/action-settings-dictionary-create.png](../review/prototype-knowledge-audit/screenshots/action-settings-dictionary-create.png) | 7b9904f11cb8 | 7b9904f11cb8 | Y |
| review/prototype-knowledge-audit/screenshots/action-sr-report-detail.png | [docs/review/prototype-knowledge-audit/screenshots/action-sr-report-detail.png](../review/prototype-knowledge-audit/screenshots/action-sr-report-detail.png) | 06399a2f0ebe | 06399a2f0ebe | Y |
| review/prototype-knowledge-audit/screenshots/action-tender-detail.png | [docs/review/prototype-knowledge-audit/screenshots/action-tender-detail.png](../review/prototype-knowledge-audit/screenshots/action-tender-detail.png) | 2a109039004e | 2a109039004e | Y |
| review/prototype-knowledge-audit/screenshots/action-tender-import.png | [docs/review/prototype-knowledge-audit/screenshots/action-tender-import.png](../review/prototype-knowledge-audit/screenshots/action-tender-import.png) | 0d076f32ff68 | 0d076f32ff68 | Y |
| review/prototype-knowledge-audit/screenshots/action-tender-new.png | [docs/review/prototype-knowledge-audit/screenshots/action-tender-new.png](../review/prototype-knowledge-audit/screenshots/action-tender-new.png) | 63fbc3b85f83 | 63fbc3b85f83 | Y |
| review/prototype-knowledge-audit/screenshots/extra-component-new-call.png | [docs/review/prototype-knowledge-audit/screenshots/extra-component-new-call.png](../review/prototype-knowledge-audit/screenshots/extra-component-new-call.png) | 95f59c6a97e6 | 95f59c6a97e6 | Y |
| review/prototype-knowledge-audit/screenshots/extra-component.png | [docs/review/prototype-knowledge-audit/screenshots/extra-component.png](../review/prototype-knowledge-audit/screenshots/extra-component.png) | 4411b5661c81 | 4411b5661c81 | Y |
| review/prototype-knowledge-audit/screenshots/extra-customer-new-call.png | [docs/review/prototype-knowledge-audit/screenshots/extra-customer-new-call.png](../review/prototype-knowledge-audit/screenshots/extra-customer-new-call.png) | 2503a10c35be | 2503a10c35be | Y |
| review/prototype-knowledge-audit/screenshots/extra-history-detail.png | [docs/review/prototype-knowledge-audit/screenshots/extra-history-detail.png](../review/prototype-knowledge-audit/screenshots/extra-history-detail.png) | 171002eec8ff | 171002eec8ff | Y |
| review/prototype-knowledge-audit/screenshots/extra-history.png | [docs/review/prototype-knowledge-audit/screenshots/extra-history.png](../review/prototype-knowledge-audit/screenshots/extra-history.png) | 535a9b216e78 | 535a9b216e78 | Y |
| review/prototype-knowledge-audit/screenshots/extra-tender-import-recognized.png | [docs/review/prototype-knowledge-audit/screenshots/extra-tender-import-recognized.png](../review/prototype-knowledge-audit/screenshots/extra-tender-import-recognized.png) | 538da3ea63e3 | 538da3ea63e3 | Y |
| review/prototype-knowledge-audit/screenshots/extra-win-confirmed-isolated.png | [docs/review/prototype-knowledge-audit/screenshots/extra-win-confirmed-isolated.png](../review/prototype-knowledge-audit/screenshots/extra-win-confirmed-isolated.png) | b512c39ce6a7 | b512c39ce6a7 | Y |
| review/prototype-knowledge-audit/screenshots/extra-win.png | [docs/review/prototype-knowledge-audit/screenshots/extra-win.png](../review/prototype-knowledge-audit/screenshots/extra-win.png) | b877eb7cfe52 | b877eb7cfe52 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-master-home.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-master-home.png](../review/prototype-knowledge-audit/screenshots/mobile-master-home.png) | 35d064631aa2 | 35d064631aa2 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-tl-dispatch.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-tl-dispatch.png](../review/prototype-knowledge-audit/screenshots/mobile-tl-dispatch.png) | 909a988aa529 | 909a988aa529 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-tl-tlHome.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-tl-tlHome.png](../review/prototype-knowledge-audit/screenshots/mobile-tl-tlHome.png) | bd4a8babbaf1 | bd4a8babbaf1 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-call-detail.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-call-detail.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-call-detail.png) | 6f5a66c6a017 | 6f5a66c6a017 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-call-list.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-call-list.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-call-list.png) | f4579822dc66 | f4579822dc66 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-check-in.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-check-in.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-check-in.png) | 88092b088433 | 88092b088433 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-home.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-home.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-home.png) | f98c6df1ea00 | f98c6df1ea00 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-processing.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-processing.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-processing.png) | 88092b088433 | 88092b088433 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-report.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-report.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-report.png) | 80c554c42472 | 80c554c42472 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-start-modal.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-start-modal.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-start-modal.png) | 8ab013a2cf87 | 8ab013a2cf87 | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-tasks.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-tasks.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-tasks.png) | 9d43e157068f | 9d43e157068f | Y |
| review/prototype-knowledge-audit/screenshots/mobile-zhou-work-record.png | [docs/review/prototype-knowledge-audit/screenshots/mobile-zhou-work-record.png](../review/prototype-knowledge-audit/screenshots/mobile-zhou-work-record.png) | 8ab013a2cf87 | 8ab013a2cf87 | Y |
| review/prototype-knowledge-audit/screenshots/quote-detail-current.png | [docs/review/prototype-knowledge-audit/screenshots/quote-detail-current.png](../review/prototype-knowledge-audit/screenshots/quote-detail-current.png) | 3c2cb930e94f | 3c2cb930e94f | Y |
| review/prototype-knowledge-audit/screenshots/quote-revision.png | [docs/review/prototype-knowledge-audit/screenshots/quote-revision.png](../review/prototype-knowledge-audit/screenshots/quote-revision.png) | df9d92a3613f | df9d92a3613f | Y |
| review/prototype-knowledge-audit/screenshots/role-admin.png | [docs/review/prototype-knowledge-audit/screenshots/role-admin.png](../review/prototype-knowledge-audit/screenshots/role-admin.png) | 9a10e1fb77ff | 9a10e1fb77ff | Y |
| review/prototype-knowledge-audit/screenshots/role-boss.png | [docs/review/prototype-knowledge-audit/screenshots/role-boss.png](../review/prototype-knowledge-audit/screenshots/role-boss.png) | 83ca36945d11 | 83ca36945d11 | Y |
| review/prototype-knowledge-audit/screenshots/role-cr-mobile.png | [docs/review/prototype-knowledge-audit/screenshots/role-cr-mobile.png](../review/prototype-knowledge-audit/screenshots/role-cr-mobile.png) | 2ff4dcb4e215 | 2ff4dcb4e215 | Y |
| review/prototype-knowledge-audit/screenshots/role-cr.png | [docs/review/prototype-knowledge-audit/screenshots/role-cr.png](../review/prototype-knowledge-audit/screenshots/role-cr.png) | 4c9dd002f102 | 4c9dd002f102 | Y |
| review/prototype-knowledge-audit/screenshots/role-cs.png | [docs/review/prototype-knowledge-audit/screenshots/role-cs.png](../review/prototype-knowledge-audit/screenshots/role-cs.png) | af59b5ee42b3 | af59b5ee42b3 | Y |
| review/prototype-knowledge-audit/screenshots/role-fin.png | [docs/review/prototype-knowledge-audit/screenshots/role-fin.png](../review/prototype-knowledge-audit/screenshots/role-fin.png) | a1f6d734365d | a1f6d734365d | Y |
| review/prototype-knowledge-audit/screenshots/role-master.png | [docs/review/prototype-knowledge-audit/screenshots/role-master.png](../review/prototype-knowledge-audit/screenshots/role-master.png) | 78a73f8ffeae | 78a73f8ffeae | Y |
| review/prototype-knowledge-audit/screenshots/role-pur.png | [docs/review/prototype-knowledge-audit/screenshots/role-pur.png](../review/prototype-knowledge-audit/screenshots/role-pur.png) | 1752ee9919cf | 1752ee9919cf | Y |
| review/prototype-knowledge-audit/screenshots/role-quo.png | [docs/review/prototype-knowledge-audit/screenshots/role-quo.png](../review/prototype-knowledge-audit/screenshots/role-quo.png) | 55b9e81dc860 | 55b9e81dc860 | Y |
| review/prototype-knowledge-audit/screenshots/role-tender.png | [docs/review/prototype-knowledge-audit/screenshots/role-tender.png](../review/prototype-knowledge-audit/screenshots/role-tender.png) | 198e7b327865 | 198e7b327865 | Y |
| review/prototype-knowledge-audit/screenshots/role-tl.png | [docs/review/prototype-knowledge-audit/screenshots/role-tl.png](../review/prototype-knowledge-audit/screenshots/role-tl.png) | 1fc811bb4c70 | 1fc811bb4c70 | Y |
| review/prototype-knowledge-audit/screenshots/settings-components.png | [docs/review/prototype-knowledge-audit/screenshots/settings-components.png](../review/prototype-knowledge-audit/screenshots/settings-components.png) | b95201cceac5 | b95201cceac5 | Y |
| review/prototype-knowledge-audit/screenshots/settings-customer.png | [docs/review/prototype-knowledge-audit/screenshots/settings-customer.png](../review/prototype-knowledge-audit/screenshots/settings-customer.png) | 48b92fa96d5d | 48b92fa96d5d | Y |
| review/prototype-knowledge-audit/screenshots/settings-dictionary.png | [docs/review/prototype-knowledge-audit/screenshots/settings-dictionary.png](../review/prototype-knowledge-audit/screenshots/settings-dictionary.png) | 6ddf921f1560 | 6ddf921f1560 | Y |
| review/prototype-knowledge-audit/screenshots/settings-excelImport.png | [docs/review/prototype-knowledge-audit/screenshots/settings-excelImport.png](../review/prototype-knowledge-audit/screenshots/settings-excelImport.png) | 9f803ecb3d0b | 9f803ecb3d0b | Y |
| review/prototype-knowledge-audit/screenshots/settings-server.png | [docs/review/prototype-knowledge-audit/screenshots/settings-server.png](../review/prototype-knowledge-audit/screenshots/settings-server.png) | 006dd3ada996 | 006dd3ada996 | Y |
| review/prototype-knowledge-audit/screenshots/settings-user.png | [docs/review/prototype-knowledge-audit/screenshots/settings-user.png](../review/prototype-knowledge-audit/screenshots/settings-user.png) | 0219c5fddbda | 0219c5fddbda | Y |
| review/prototype-remediation/REMEDIATION-PLAN.md | [docs/review/prototype-remediation/REMEDIATION-PLAN.md](../review/prototype-remediation/REMEDIATION-PLAN.md) | 39d23632917c | 6f3415aa103e | 引用/治理调整 |
| review/prototype-remediation/REMEDIATION-RESULT.md | [docs/review/prototype-remediation/REMEDIATION-RESULT.md](../review/prototype-remediation/REMEDIATION-RESULT.md) | 4afd5898aa3a | ea24cb2731d5 | 引用/治理调整 |
| review/prototype-remediation/REMEDIATION-TRACE.md | [docs/review/prototype-remediation/REMEDIATION-TRACE.md](../review/prototype-remediation/REMEDIATION-TRACE.md) | 4ef146784063 | 8c70722c118c | 引用/治理调整 |
| review/prototype-remediation/evidence/SCENE-01.png | [docs/review/prototype-remediation/evidence/SCENE-01.png](../review/prototype-remediation/evidence/SCENE-01.png) | 0a0168703307 | 0a0168703307 | Y |
| review/prototype-remediation/evidence/SCENE-02.png | [docs/review/prototype-remediation/evidence/SCENE-02.png](../review/prototype-remediation/evidence/SCENE-02.png) | 4bea425d9c6f | 4bea425d9c6f | Y |
| review/prototype-remediation/evidence/SCENE-03.png | [docs/review/prototype-remediation/evidence/SCENE-03.png](../review/prototype-remediation/evidence/SCENE-03.png) | 012617dbadc7 | 012617dbadc7 | Y |
| review/prototype-remediation/evidence/SCENE-04.png | [docs/review/prototype-remediation/evidence/SCENE-04.png](../review/prototype-remediation/evidence/SCENE-04.png) | 0c52ddb4325a | 0c52ddb4325a | Y |
| review/prototype-remediation/evidence/SCENE-05.png | [docs/review/prototype-remediation/evidence/SCENE-05.png](../review/prototype-remediation/evidence/SCENE-05.png) | c08703b7fed4 | c08703b7fed4 | Y |
| review/prototype-remediation/evidence/SCENE-06.png | [docs/review/prototype-remediation/evidence/SCENE-06.png](../review/prototype-remediation/evidence/SCENE-06.png) | 249ee233d8c2 | 249ee233d8c2 | Y |
| review/prototype-remediation/evidence/SCENE-07.png | [docs/review/prototype-remediation/evidence/SCENE-07.png](../review/prototype-remediation/evidence/SCENE-07.png) | cc31c62a74dc | cc31c62a74dc | Y |
| review/prototype-remediation/evidence/WAREHOUSE-SYNC-DEMO.png | [docs/review/prototype-remediation/evidence/WAREHOUSE-SYNC-DEMO.png](../review/prototype-remediation/evidence/WAREHOUSE-SYNC-DEMO.png) | cd89141c0403 | cd89141c0403 | Y |
| review/prototype-remediation/evidence/regression-results.json | [docs/review/prototype-remediation/evidence/regression-results.json](../review/prototype-remediation/evidence/regression-results.json) | 591043776ae6 | 591043776ae6 | Y |
| review/prototype-remediation/regression.playwright.cjs | [docs/review/prototype-remediation/regression.playwright.cjs](../review/prototype-remediation/regression.playwright.cjs) | 5c2267d10865 | 5c2267d10865 | Y |
| review/prototype-remediation/warehouse-sync-demo.playwright.cjs | [docs/review/prototype-remediation/warehouse-sync-demo.playwright.cjs](../review/prototype-remediation/warehouse-sync-demo.playwright.cjs) | 8171894aa95e | 8171894aa95e | Y |
| docs/superpowers/.DS_Store | [docs/history/2026-07/superpowers/.DS_Store](../history/2026-07/superpowers/.DS_Store) | cf969c5529b1 | cf969c5529b1 | Y |
| docs/superpowers/plans/2026-07-22-mobile-workspace-redesign.md | [docs/history/2026-07/superpowers/plans/2026-07-22-mobile-workspace-redesign.md](../history/2026-07/superpowers/plans/2026-07-22-mobile-workspace-redesign.md) | 936a47df9385 | 936a47df9385 | Y |
| docs/superpowers/specs/2026-07-22-mobile-workspace-redesign-design.md | [docs/history/2026-07/superpowers/specs/2026-07-22-mobile-workspace-redesign-design.md](../history/2026-07/superpowers/specs/2026-07-22-mobile-workspace-redesign-design.md) | 5221ef1e3d40 | 5221ef1e3d40 | Y |
| docs/assets/ecinfo-logo.svg | [docs/history/2026-06/assets/ecinfo-logo.svg](../history/2026-06/assets/ecinfo-logo.svg) | be263d13c0dc | be263d13c0dc | Y |
| docs/prototype-screenshots/01-dashboard-admin.png | [docs/history/2026-06/prototype-screenshots/01-dashboard-admin.png](../history/2026-06/prototype-screenshots/01-dashboard-admin.png) | 595f5f02e78d | 595f5f02e78d | Y |
| docs/prototype-screenshots/02-ticket-list-admin.png | [docs/history/2026-06/prototype-screenshots/02-ticket-list-admin.png](../history/2026-06/prototype-screenshots/02-ticket-list-admin.png) | 5ade92dab6cd | 5ade92dab6cd | Y |
| docs/prototype-screenshots/03-ticket-create-cs.png | [docs/history/2026-06/prototype-screenshots/03-ticket-create-cs.png](../history/2026-06/prototype-screenshots/03-ticket-create-cs.png) | ab7f9228064d | ab7f9228064d | Y |
| docs/prototype-screenshots/04-ticket-detail-cs.png | [docs/history/2026-06/prototype-screenshots/04-ticket-detail-cs.png](../history/2026-06/prototype-screenshots/04-ticket-detail-cs.png) | 0c27fbcf3376 | 0c27fbcf3376 | Y |
| docs/prototype-screenshots/05-ticket-detail-teamleader.png | [docs/history/2026-06/prototype-screenshots/05-ticket-detail-teamleader.png](../history/2026-06/prototype-screenshots/05-ticket-detail-teamleader.png) | 84cf33cf1c4c | 84cf33cf1c4c | Y |
| docs/prototype-screenshots/06-ticket-detail-master.png | [docs/history/2026-06/prototype-screenshots/06-ticket-detail-master.png](../history/2026-06/prototype-screenshots/06-ticket-detail-master.png) | 1a355fe3be6e | 1a355fe3be6e | Y |
| docs/prototype-screenshots/07-dispatch-teamleader.png | [docs/history/2026-06/prototype-screenshots/07-dispatch-teamleader.png](../history/2026-06/prototype-screenshots/07-dispatch-teamleader.png) | a34c48c929f1 | a34c48c929f1 | Y |
| docs/prototype-screenshots/08-dispatch-master.png | [docs/history/2026-06/prototype-screenshots/08-dispatch-master.png](../history/2026-06/prototype-screenshots/08-dispatch-master.png) | 362d29f9964c | 362d29f9964c | Y |
| docs/prototype-screenshots/09-report-admin.png | [docs/history/2026-06/prototype-screenshots/09-report-admin.png](../history/2026-06/prototype-screenshots/09-report-admin.png) | b43170a6dbdf | b43170a6dbdf | Y |
| docs/prototype-screenshots/10-settings-admin.png | [docs/history/2026-06/prototype-screenshots/10-settings-admin.png](../history/2026-06/prototype-screenshots/10-settings-admin.png) | c7f2646bf05c | c7f2646bf05c | Y |
| docs/prototype-screenshots/11-mobile-master.png | [docs/history/2026-06/prototype-screenshots/11-mobile-master.png](../history/2026-06/prototype-screenshots/11-mobile-master.png) | 4199cc4b171e | 4199cc4b171e | Y |
| docs/01-requirements-analysis.md | [docs/history/2026-06/01-requirements-analysis.md](../history/2026-06/01-requirements-analysis.md) | 3ae1225995c7 | 6801855ac56d | 引用/治理调整 |
| docs/01-requirements-clarification.md | [docs/history/2026-06/01-requirements-clarification.md](../history/2026-06/01-requirements-clarification.md) | a20983fc67e0 | a909362ab475 | 引用/治理调整 |
| docs/01-requirements-spec.md | [docs/history/2026-06/01-requirements-spec.md](../history/2026-06/01-requirements-spec.md) | b343eea3c0b0 | dc9214b51d3e | 引用/治理调整 |
| docs/02-ticket-flow-analysis.md | [docs/history/2026-06/02-ticket-flow-analysis.md](../history/2026-06/02-ticket-flow-analysis.md) | 1d1ff076ea41 | 1636c06a1b26 | 引用/治理调整 |
| docs/03-feasibility.md | [docs/history/2026-06/03-feasibility.md](../history/2026-06/03-feasibility.md) | 3ec7fdcc2eb3 | e4d5292530d6 | 引用/治理调整 |
| docs/04-prototype-structure.md | [docs/history/2026-06/04-prototype-structure.md](../history/2026-06/04-prototype-structure.md) | 75387cfc92a9 | 73ced1ced817 | 引用/治理调整 |
| docs/05-prototype-review.md | [docs/history/2026-06/05-prototype-review.md](../history/2026-06/05-prototype-review.md) | 86b8e9d57621 | cb88b1563001 | 引用/治理调整 |
| docs/06-customer-presentation.html | [docs/history/2026-06/06-customer-presentation.html](../history/2026-06/06-customer-presentation.html) | c4a411a1baa2 | c4a411a1baa2 | Y |
| docs/07-complete-workflow.md | [docs/history/2026-06-29/07-complete-workflow.md](../history/2026-06-29/07-complete-workflow.md) | 47b3778f6036 | 47b3778f6036 | Y |
| docs/09-session-handoff.md | [docs/history/2026-08/09-session-handoff.md](../history/2026-08/09-session-handoff.md) | 883291b3f689 | 23a46086aaf3 | 引用/治理调整 |
| docs/08-prototype-flow-consistency.md | [docs/review/2026-08/08-prototype-flow-consistency.md](../review/2026-08/08-prototype-flow-consistency.md) | 476115c23086 | 79e8af58f2b8 | 引用/治理调整 |
| docs/08-sop-prototype-requirements-alignment-audit.md | [docs/audit/2026-09-26/08-sop-prototype-requirements-alignment-audit.md](../audit/2026-09-26/08-sop-prototype-requirements-alignment-audit.md) | 56d1664937cf | 56d1664937cf | Y |
| docs/0702-listening-notes-analysis.md | [docs/analysis/0702-listening-notes-analysis.md](../analysis/0702-listening-notes-analysis.md) | 6e30b6ab056e | 6e30b6ab056e | Y |
| docs/09-warehouse-tong-sync-demo.md | [docs/analysis/09-warehouse-tong-sync-demo.md](../analysis/09-warehouse-tong-sync-demo.md) | c69c63507d46 | 3638a17e214a | 引用/治理调整 |
| docs/2026-09-26-business-flow-atlas-draft.md | [docs/analysis/2026-09-26-business-flow-atlas-draft.md](../analysis/2026-09-26-business-flow-atlas-draft.md) | c50b1cedfa35 | 515cf5f488f8 | 引用/治理调整 |
| other_flows.md | [docs/analysis/flow-reference/other_flows.md](../analysis/flow-reference/other_flows.md) | 5219f0735e8f | 5219f0735e8f | Y |
| quotation_flow_readable.md | [docs/analysis/flow-reference/quotation_flow_readable.md](../analysis/flow-reference/quotation_flow_readable.md) | dce74a57631b | dce74a57631b | Y |
| tender_flow_readable.md | [docs/analysis/flow-reference/tender_flow_readable.md](../analysis/flow-reference/tender_flow_readable.md) | 391855880d31 | 391855880d31 | Y |
| sop_connectors.json | [docs/analysis/flow-reference/sop_connectors.json](../analysis/flow-reference/sop_connectors.json) | 16dc34c9a877 | 16dc34c9a877 | Y |
| sop_flow_groups.json | [docs/analysis/flow-reference/sop_flow_groups.json](../analysis/flow-reference/sop_flow_groups.json) | d9ebfaf65b5c | d9ebfaf65b5c | Y |
| sop_nodes.json | [docs/analysis/flow-reference/sop_nodes.json](../analysis/flow-reference/sop_nodes.json) | 55835ce3afb6 | 55835ce3afb6 | Y |
| FILE-WRITING-RULES.md | [docs/governance/FILE-WRITING-RULES.md](FILE-WRITING-RULES.md) | bae5213ae2b4 | ff1acbb710be | 引用/治理调整 |
| PROJECT-STRUCTURE.md | [docs/governance/PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) | 6ad7fcb34405 | 5c29e9f89ad1 | 引用/治理调整 |
| docs/00-project-constitution.md | [docs/governance/00-project-constitution.md](00-project-constitution.md) | b466858d8ad0 | b466858d8ad0 | Y |
| docs/KNOWLEDGE-SYNC-PROTOCOL.md | [docs/governance/KNOWLEDGE-SYNC-PROTOCOL.md](KNOWLEDGE-SYNC-PROTOCOL.md) | 1b5421de0bdb | 3978e1812aa4 | 引用/治理调整 |
| project-hub/00-REAL-BUSINESS-FLOW-REVIEW.md | [docs/review/project-hub/00-REAL-BUSINESS-FLOW-REVIEW.md](../review/project-hub/00-REAL-BUSINESS-FLOW-REVIEW.md) | 7efa0beed140 | 2a262277f71f | 引用/治理调整 |
| project-hub/ISSUES_AND_GAPS.md | [docs/review/project-hub/ISSUES_AND_GAPS.md](../review/project-hub/ISSUES_AND_GAPS.md) | aae517bee367 | 72d42c1c24ea | 引用/治理调整 |
| project-hub/PROJECT-HUB-IMPROVEMENT-PLAN.md | [docs/review/project-hub/PROJECT-HUB-IMPROVEMENT-PLAN.md](../review/project-hub/PROJECT-HUB-IMPROVEMENT-PLAN.md) | 358b6c6d51c7 | 0239a2c9a5f4 | 引用/治理调整 |
| project-hub/QA_REPORT.md | [docs/review/project-hub/QA_REPORT.md](../review/project-hub/QA_REPORT.md) | 099310e2093e | 12e444d97fda | 引用/治理调整 |
| knowledge-base/OPEN_QUESTIONS.md | [docs/history/knowledge-base/OPEN_QUESTIONS.md](../history/knowledge-base/OPEN_QUESTIONS.md) | 946c64864081 | 946c64864081 | Y |
| knowledge-base/TRACEABILITY_MATRIX.md | [docs/history/knowledge-base/TRACEABILITY_MATRIX.md](../history/knowledge-base/TRACEABILITY_MATRIX.md) | e43b151c5949 | e43b151c5949 | Y |
| knowledge-base/SCANNED_SOURCES.md | [docs/history/knowledge-base/SCANNED_SOURCES.md](../history/knowledge-base/SCANNED_SOURCES.md) | e3607c57b96d | 7a69b0edb34d | 引用/治理调整 |
| knowledge-base/CONFLICTS_AND_UNCONFIRMED.md | [docs/history/knowledge-base/CONFLICTS_AND_UNCONFIRMED.md](../history/knowledge-base/CONFLICTS_AND_UNCONFIRMED.md) | 95979a45c9c2 | 95979a45c9c2 | Y |
