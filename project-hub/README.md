# EC Project Hub · 项目知识中心

正式维护版仅指main，由用户及其授权AI更新；同事工作副本使用同路径，先审查底层知识差异、用户确认后再同步和按需生成。见[正式版规范](../docs/governance/FORMAL-VERSION-WORKFLOW.md)。10/15为版本保护历史批次；10/19已接入内部工作记录并生成推进首页，业务规则未随工具整理改变。

更新日期：2026-10-19。默认首页为“当前推进”；用户先看本轮三件事、责任和下一步，再按菜单进入业务知识。这里是三个日常入口之一，用于查看业务全景、流程、需求、待确认问题及来源追溯。推进以[根README](../README.md)指定内部工作记录为准，客户Excel仅导出业务里程碑与待确认事项，原型见[prototype](../prototype/index.html)。

## 打开

直接打开[index.html](index.html)，数据内嵌，可搜索和查看关联详情。也可从项目根目录启动静态服务器访问。
文件详情可打开来源；浏览器不支持Office预览时使用复制路径在本机打开。

## 资料和维护

- 底层业务资料：[docs/knowledge](../docs/knowledge/README.md)。
- 分析/检查报告：[docs/review/project-hub](../docs/review/project-hub/)。
- 文档分类：[目录职责](../docs/governance/PROJECT-STRUCTURE.md)。
- 更新规则：[知识同步协议](../docs/governance/KNOWLEDGE-SYNC-PROTOCOL.md)。
- 同事分工与交接：[团队协作规范](../docs/governance/TEAM-COLLABORATION.md)。

2026-10-12已逐条接入39项0928/0930工作副本要求，当前16个客户关键决策沿用审计C编号并缩小提问。原80REQ、17条9/27讨论结论、旧Q定位和原编号保留；新增REQ-UPD与原文段落对应，不自动批准一期范围。
新增MR和财务核对视角均为PARTIAL评审骨架，系统分工和授权待客户确认。主台账/客户材料入口见首页；任务进度仅维护在WORK-REGISTER.json，不在Hub生成数据或客户表另写；旧Excel停止维护，见[新分工规范](../docs/governance/WORK-AND-CLIENT-VIEWS.md)。
当前原型与10/07审计代码不同，本轮验证Objective子项、报价字段和欠件入口，完整正常/异常和角色UAT仍未执行。历史7/7记录不能计当前PASS。

后续已核对知识需要展示时使用scripts/build-v2.js；从项目根目录执行node project-hub/scripts/build-v2.js --check-paths可只读检查路径和编号。脚本仅依赖Node.js内置模块和Git，脚本与路径映射都可随项目版本管理。
10/11目录批次只适配工具地址；10/19已按核对记录生成推进视图，旧.codex入口仅兼容转发，旧build.js已禁用。
data/*.json和index.html内嵌模型是生成的查看数据，机器完整率不代替Excel进度，也不反向批准业务规则。

## QA 測試管理（2026-11-07）

從主導航「08 QA 测试管理」或 [QA 管理頁](qa.html) 打開，提供測試總覽、逐 Sheet 頁面用例、問題清單，以及原始 PNG 縮圖／放大檢視。保留 Excel 頁面、用例、BUG 編號及原文。Excel 是測試紀錄來源，Hub 不回寫結果；執行覆蓋率為 `(PASS + FAIL) / 全部用例`，不代表客戶批准或整鏈驗收。34 個 Excel 分組不等於已核實有34個可達獨立頁面。

本次來源為 `outputs/2026-11-06-new-ui-qa/` 的新版基線 v1.1、20261106 完整截圖版執行報告及其 screenshots/。資料由 `scripts/import-qa.py` 唯讀提取，生成 `data/qa-tests.json` 和供本機直接打開使用的 `data/qa-tests.js`；截圖直接引用原 PNG，不另複製一份。來源路徑、SHA-256 和原始備註保留在資料及頁面中。原有業務模型構建不覆蓋此 QA 快照。

Excel 更新保存後，用包含 openpyxl、Pillow 的 Python 執行 `python3 project-hub/scripts/import-qa.py` 重新匯入。也可用 `--report`、`--baseline` 指定同一版本的來源；更換原型測試批次時，同時核對匯入腳本內的版本、測試日期與識別依據，不能只替換檔名。匯入會檢查分組／用例ID、結果值、原圖對應及未執行用例不可帶圖。資料是可重建的展示快照，請勿手工維護第二套結果。
