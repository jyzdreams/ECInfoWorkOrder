# EC 项目 GitHub 提交规范

> 2026-10-15生效：[正式版与工作副本规范](FORMAL-VERSION-WORKFLOW.md)。用户jyzdreams及其授权AI维护main，同事提交工作分支/PR供审查，不自行合并；用户采用后才能进入正式版。本次用户已明确授权保存当前完整基线、提交推送、配置保护，未授权发布原型。

更新日期：2026-10-12。GitHub仓库保存团队共享的项目文件，临时过程文件保留本地。日常三个入口和docs六类目录不变。

## 1. 哪些不提交

| 目录或文件 | 用途 | 处理方式 |
| --- | --- | --- |
| .codex/ | Codex临时脚本、预览、测试截图、解析、检查记录 | 已忽略；必要的共享Hub工具在project-hub/scripts/ |
| .cache/ | 工具登录态、临时配置、Schema缓存 | 已忽略 |
| .tools/、.uv-cache/、.uv-tools/ | 本地运行时和依赖缓存 | 已忽略 |
| backups/ | 本地完整工作快照 | 已忽略，本地保留；正式历史原型仍在archive/ |
| store/中的临时文件 | 用户临时存放 | 忽略内容，保留README说明 |
| docs/audit/extracted/ | 审计过程的提取文本缓存 | 已忽略，不删除本地文件 |
| docs/audit/下scan_sources.py、build_audit_model.py、assemble_report.py | 本轮审计的一次性扫描/拼装脚本 | 已忽略；以后一次性脚本直接放.codex/ |
| node_modules/、Python虚拟环境、__pycache__/ | 依赖和编译缓存 | 已忽略 |
| test-results/、playwright-report/、coverage/、htmlcov/、.pytest_cache/ | 测试运行报告和覆盖率产物 | 已忽略 |
| _site/ | Pages打包中间目录 | 已忽略 |
| *.inspect.ndjson、Office锁文件、日志、.DS_Store | 检查中间输出和编辑器/系统临时文件 | 已忽略 |

不要因为文件是Codex生成的就全部排除：已经作为正式报告或验收证据使用的成果属于下一节。

## 2. 哪些需要随项目保存

| 内容 | 位置与规则 |
| --- | --- |
| 项目入口与维护规则 | README、AGENTS、.gitignore、docs/governance/ |
| 当前原型 | prototype/的页面、样式、脚本和使用说明 |
| 知识中心 | project-hub/页面、样式、业务数据；scripts/必要脚本和路径映射一起提交 |
| 底层知识和整理文档 | docs/knowledge、analysis、history等六类文档 |
| 正式审计与验收 | docs/audit、review中的报告、报告引用的截图/DOM、审计模型/来源清单、正式回归结果 |
| 可复用测试源码与样例 | mr-bridge/test/、docs/review/中已有场景测试脚本和固定样例；测试代码不是运行缓存 |
| 当前共享原件、推进表、客户交付 | materials/、outputs/按既有项目共享范围保留，排除检查/锁文件 |
| 正式历史版本 | archive/及docs/history/，保留版本身份 |
| 执行与CI配置 | .agents/、.specify/、.github/必要文件；不要一律忽略隐藏目录 |

不使用*.png、*.json、*.txt或整个docs/audit/的宽泛忽略规则，避免把业务图、来源数据、客户听记或正式证据漏掉。

## 3. 已被Git跟踪的过程文件

.gitignore只阻止未跟踪文件新增，已经被跟踪的文件需要单独停止跟踪。
本轮已对8个Excel检查记录和2个Office锁文件执行索引移除，本地原文件及内容保留。索引删除已进入暂存区；其他目录整理和规范修改尚未提交。

今后先核对准确清单、同事暂存内容及本地原件，再对明确过程文件使用git rm --cached；不使用git rm删除本地原件，不全目录清空Git索引，不重写历史提交。

## 4. .github/只放GitHub配置

```text
.github/
├── README.md                 配置入口
├── pull_request_template.md  变更、依据、验证和发布影响
└── workflows/
    └── pages.yml             当前原型静态发布
```

Pages只保留workflow_dispatch手动触发；工作流限制仓库、main、触发与重新运行账号为jyzdreams。github-pages环境限制main分支和用户审批，管理员也不能绕过环境保护。任何推送/合并都不自动发布；用户未明确要求该次发布时，AI不得主动触发。
发布包仍只包含原型静态文件，不把docs、materials、outputs、缓存或Hub整体复制到网站。本地规范检查不是远端Actions运行，也不代表客户定版或业务验收通过。

## 5. 同事提交前检查

1. 从[根README](../../README.md)确定当前文件，按[团队协作规范](TEAM-COLLABORATION.md)约定负责批次和文件。
2. 查看工作区和暂存区，只加入自己的完整变更；文件搬移同时提交新位置、旧位置删除和引用修复。
3. 保留别人的未提交修改；Excel由本批维护人统一回填，不自动合并二进制工作簿。
4. 检查是否夹带缓存、锁文件、检查产物；不要强制加入已忽略文件。
5. 检查文档链接和Hub路径；有相关变动时执行node project-hub/scripts/build-v2.js --check-paths。
6. 按PR模板说明范围、依据、实际验证和发布影响；客户确认、原型修改、业务验收分别记录，推进状态回到主台账。

Hub现有文件索引仍是历史快照，包含部分本地备份/检查记录；它们不构成业务依赖，不据此上传本地缓存。生成脚本已排除这些过程目录，本轮没有运行业务重建、改写业务统计或改变编号/批准状态。
上文10/12停止跟踪说明是历史批次记录。2026-10-15正式基线保存、提交推送与保护设置以版本治理实施记录为准；之后每批必须按实际情况说明，不能沿用历史“未提交/未推送”结论。
