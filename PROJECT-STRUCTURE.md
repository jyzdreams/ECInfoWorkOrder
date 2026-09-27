# EC 工单系统当前项目结构

盘点日期：2026-09-26

## 1. 当前根目录

| 项目 | 当前作用 | 状态 |
| --- | --- | --- |
| `prototype/` | 当前 2.0 原型，承接 1.0 页面和交互并进行视觉升级 | 当前展示/评审版 |
| `archive/prototype-1.0/` | 原 `ui-prototype/`，1.0 原型归档 | 只读历史版 |
| `docs/` | 需求分析、流程分析、评审记录和设计说明 | 当前工作文档 |
| `materials/` | 会议纪要、纸质表单、原始资料、参考文档和历史快照 | 证据资料 |
| `archive/` | 已明确版本定位的历史原型和其他归档文件 | 只读归档 |
| `outputs/` | 客户需求确认书、Excel、SOP 图和项目推进资料 | 正式产物 |
| `store/` | 用户临时放置、尚未归类的文件 | 临时区 |
| `.specify/` | SpecKit 宪法、模板和工作流 | 治理配置 |
| `.agents/` | 项目技能和 Agent 配置 | 工具配置 |
| `.github/` | GitHub Actions 等仓库自动化 | 仓库配置 |
| `.codex/` | 构建脚本、预览图、检查报告和中间产物 | 工具产物，不对客 |
| `.tools/`、`.uv-cache/`、`.uv-tools/` | 本地工具和运行缓存 | 环境文件 |
| `README.md` | 项目入口导航 | 应保留 |
| `AGENTS.md` | Agent 执行规则 | 应保留 |
| `FILE-WRITING-RULES.md` | 文件写入和归类规则 | 应保留 |
| `PROJECT-STRUCTURE.md` | 当前结构盘点 | 应保留 |
| `.gitignore` | Git 忽略规则 | 应保留 |

## 2. `materials/` 内部结构

- `materials/inbox/`：新收到但尚未整理的客户文件。
- `materials/raw/`：用户已转移过来的旧 `abc/`、旧 `specs/`、早期原型和历史材料。只读参考。
- `materials/听记纪要/`：会议纪要及提取文本。
- `materials/纸质材料图片/`：纸质表单、扫描件和现场图片。
- `materials/参考文档/`：功能字段文档、截图等参考资料。

## 3. `outputs/` 当前交付批次

交付批次：`outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/`

- `00-最终交付/`：客户查看的 DOCX 合订文档。
- `01-需求确认资料/`：客户需求确认表和需求进度跟踪表。
- `02-SOP流程图/`：纯 SOP 流程图 PNG/SVG。
- `03-项目推进资料/`：项目推进总表及客户版。
- `90-历史版本/`：早期流程图、旧模板和参考项目表。
- `99-检查记录/`：检查输出和临时锁文件，不对客户发送。
- `文件索引.md`：本批次的交付索引。

## 4. 已转移或不再作为当前基线的内容

旧的 `abc/`、`specs/`、更早的 `materials/raw/prototype/`、旧项目分析资料和旧原始材料已进入 `materials/raw/`。原 `ui-prototype/` 已明确归档为 `archive/prototype-1.0/`；它们都可以用于追溯，但不应直接修改，也不应自动作为当前需求、流程、原型或开发规格。

根目录中不再保留早期临时脚本、临时 DOCX、解压 XML 和单独截图。需要类似工具时，应在 `.codex/` 或明确的工具目录中生成，并将最终结果写入对应业务目录。

## 5. 当前使用入口

1. 先读 [FILE-WRITING-RULES.md](FILE-WRITING-RULES.md)。
2. 需求和流程讨论看 `docs/`。
3. 当前 2.0 原型看 `prototype/`；需要对比 1.0 时看 `archive/prototype-1.0/`。
4. 客户交付看 `outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/00-最终交付/`。
5. 需要追溯旧内容时再进入 `materials/raw/`。
