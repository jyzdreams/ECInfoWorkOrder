# EC 工单系统项目导航

本仓库用于 EC 工单系统的需求澄清、业务流程梳理、HTML 原型评审及 POC 准备。当前仍处于原型与客户确认阶段，未进入生产开发。

## 先看这里

| 目的 | 入口 |
| --- | --- |
| 了解文件写入和目录规则 | [FILE-WRITING-RULES.md](FILE-WRITING-RULES.md) |
| 查看当前项目结构 | [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) |
| 了解项目原则 | [.specify/memory/constitution.md](.specify/memory/constitution.md) |
| 查看当前 2.0 原型 | [prototype/](prototype/) |
| 查看 1.0 归档原型 | [archive/prototype-1.0/](archive/prototype-1.0/) |
| 查看客户评审合订文档 | [outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/00-最终交付/](outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/00-最终交付/) |
| 查看纯 SOP 流程图 | [outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/02-SOP流程图/纯SOP版/](outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/02-SOP流程图/纯SOP版/) |
| 查看本轮全业务流程效果图（12 组 / 16 图，含仓库通边界） | [业务流程图册 · 2026-09-26 评审草案](outputs/2026-09-26-business-flow-atlas-v1/index.html) |
| 查看项目文档和评审记录 | [docs/](docs/) |
| 查看原始及历史材料 | [materials/](materials/)、[materials/raw/](materials/raw/) |
| 查看交付批次索引 | [outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/文件索引.md](outputs/019fb6ef-a630-7810-adc9-c8fd4cb24432/文件索引.md) |

## 目录约定

- `prototype/`：当前 2.0 原型入口，作为后续展示和评审的主原型。
- `archive/prototype-1.0/`：原 `ui-prototype/`，定位为 1.0 归档版本，只读参考。
- `docs/`：分析、评审、流程与设计记录。
- `materials/inbox/`：新收到、尚未整理的输入资料。
- `materials/raw/`：已归档的旧材料、旧需求文档和历史原型，不直接等同于当前需求。
- `materials/`：会议纪要、纸质表单、参考文档和其他原始输入材料。
- `outputs/`：生成的交付产物，按交付、需求、SOP、推进资料和历史版本分类。
- `store/`：用户临时放置、尚未归类的文件，不作为正式来源。
- `.codex/`、`.agents/`、`.specify/`、`.tools/`：工具、技能与项目治理文件，不参与业务交付整理。

## 当前判断

当前最新的原型入口是 `prototype/`，定位为 2.0 版本；它沿用了 1.0 的页面和交互逻辑，视觉表现已升级。业务流程、字段和状态仍需以客户确认结果为准。客户评审优先使用 `outputs/.../00-最终交付/` 下的合订文档，所有需求默认保持“待确认”。`materials/raw/prototype/` 仍是更早的历史快照，不作为当前基线。
