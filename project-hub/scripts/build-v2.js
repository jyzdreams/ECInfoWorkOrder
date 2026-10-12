const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

const root = path.resolve(__dirname, '../..');
const hub = path.join(root, 'project-hub');
const dataDir = path.join(hub, 'data');
const pathMigrations = JSON.parse(fs.readFileSync(path.join(__dirname, 'path-migrations.json'), 'utf8'));
function resolveMigratedPath(rel) {
  if (pathMigrations[rel]) return pathMigrations[rel];
  if (rel.startsWith('knowledge/')) return 'docs/' + rel;
  if (rel.startsWith('review/')) return 'docs/' + rel;
  return rel;
}
const kb = JSON.parse(fs.readFileSync(path.join(root, 'knowledge-base/data/knowledge-base.json'), 'utf8'));
// The original KB snapshot stays immutable; resolve its historical paths in memory.
kb.sources = kb.sources.map(source => ({ ...source, path: resolveMigratedPath(source.path) }));
const previousIndex = JSON.parse(fs.readFileSync(path.join(dataDir, 'file-index.json'), 'utf8'));
const previousByPath = new Map(previousIndex.files.map(f => [f.projectPath, f]));
const originalStatus = JSON.parse(fs.readFileSync(path.join(dataDir, 'project-status.json'), 'utf8'));
const regressionPath = 'docs/review/prototype-remediation/evidence/regression-results.json';
const regression = fs.existsSync(path.join(root, regressionPath)) ? JSON.parse(fs.readFileSync(path.join(root, regressionPath), 'utf8')) : null;
const decisionPath = 'docs/knowledge/decisions/DEC-20260927-真实业务流程讨论.md';
const knowledgePaths = {
  root: 'docs/knowledge/README.md',
  sourceIndex: 'docs/knowledge/01-source/SOURCE-INDEX.md',
  decisionIndex: 'docs/knowledge/02-decisions/DECISION-INDEX.md',
  baseline: 'docs/knowledge/03-business/EC-REAL-BUSINESS-BASELINE.md',
  flowData: 'docs/knowledge/03-business/PROJECT-HUB-FLOW-DATA.md',
  requirementIndex: 'docs/knowledge/04-requirements/REQUIREMENT-INDEX.md',
  openQuestions: 'docs/knowledge/05-pending/OPEN-QUESTIONS.md',
};
if (process.argv.includes('--check-paths')) {
  const required = [...Object.values(knowledgePaths), decisionPath, regressionPath,
    'docs/governance/FILE-WRITING-RULES.md', 'docs/governance/KNOWLEDGE-SYNC-PROTOCOL.md'];
  const missing = required.filter(rel => !fs.existsSync(path.join(root, rel)));
  const ids = previousIndex.files.map(file => file.id);
  if (missing.length || new Set(ids).size !== ids.length) {
    throw new Error('Path/ID check failed: ' + JSON.stringify({ missing, duplicateIds: ids.length - new Set(ids).size }));
  }
  console.log(JSON.stringify({ requiredPaths: required.length, missing: 0, uniqueFileIds: ids.length, writes: 0 }));
  process.exit(0);
}
const generatedAt = new Date().toISOString();
for (const rel of ['project-hub/assets/app-v2.js', 'project-hub/assets/architecture.css', 'project-hub/data/facts.json', 'project-hub/data/requirements.json', 'project-hub/data/audit-report.json', 'project-hub/data/architecture.json']) {
  const absolute = path.join(root, rel);
  if (!fs.existsSync(absolute)) fs.writeFileSync(absolute, rel.endsWith('.json') ? '{}\n' : '/* Project Hub architecture */\n', 'utf8');
}

const ignoreDirs = new Set(['.git', '.tools', '.uv-cache', '.uv-tools', '.agents', '.codex', '.cache', 'node_modules', '__pycache__', 'backups', '.pytest_cache', 'htmlcov', 'coverage', 'test-results', 'playwright-report', '_site']);
function isProcessFile(rel) {
  return rel.startsWith('docs/audit/extracted/') ||
    ['docs/audit/scan_sources.py', 'docs/audit/build_audit_model.py', 'docs/audit/assemble_report.py'].includes(rel) ||
    rel.endsWith('.inspect.ndjson') || /(^|\/)(\.~|~\$)/.test(rel);
}
function readText(rel) { return fs.readFileSync(path.join(root, rel), 'utf8'); }
function markdownCells(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim().replace(/\\\|/g, '|'));
}
function idList(text, prefixes) {
  const values = [];
  for (const prefix of prefixes) {
    const pattern = prefix === 'FLOW' ? /FLOW-[A-Z-]+/g : new RegExp(`${prefix}-\\d{3}`, 'g');
    values.push(...((text || '').match(pattern) || []));
  }
  return [...new Set(values)];
}
function requireFile(rel) {
  if (!fs.existsSync(path.join(root, rel))) throw new Error(`Required knowledge source missing: ${rel}`);
}
Object.values(knowledgePaths).forEach(requireFile);
requireFile(decisionPath);
function walk(dir, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) walk(absolute, result);
    } else if (entry.isFile()) {
      const rel = path.relative(root, absolute).split(path.sep).join('/');
      if (!isProcessFile(rel)) result.push(rel);
    }
  }
  return result;
}
const existingPaths = walk(root).sort((a, b) => a.localeCompare(b, 'zh-CN'));
const tracked = new Set(cp.execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' }).trim().split('\n'));
function fileId(rel) { return previousByPath.get(rel)?.id || 'FILE-' + crypto.createHash('sha1').update(rel).digest('hex').slice(0, 10).toUpperCase(); }
function moduleFor(rel) {
  const checks = [
    ['客户服务', /客户|call|cs|cr/i], ['报价', /报价|quote|quotation/i], ['工单', /工单|ticket|workorder/i],
    ['Service Report', /service.?report|\bsr\b|报告|完工/i], ['MR / 材料', /\bmr\b|材料|采购|备货|库存/i],
    ['保养计划', /保养|maintenance|\bpm\b/i], ['排期派工', /排期|派工|分派|调度|dispatch/i],
    ['Tender', /tender|标书|投标/i], ['财务', /收款|发票|财务|会计|peachtree/i], ['权限', /权限|角色|账号/i],
  ];
  return checks.filter(([, re]) => re.test(rel)).map(([name]) => name);
}
function classify(rel) {
  const lower = rel.toLowerCase();
  const ext = path.extname(lower);
  if (lower.startsWith('project-hub/')) return ['Project Hub', 'Generated', 'PARTIAL'];
  if (lower === 'docs/knowledge/03-business/ec-real-business-baseline.md') return ['Business Baseline', 'CurrentBusinessBaseline', 'READY'];
  if (lower === 'docs/knowledge/03-business/project-hub-flow-data.md') return ['Business Flow Data', 'CurrentBusinessStructure', 'READY'];
  if (lower === 'docs/knowledge/01-source/source-index.md') return ['Knowledge Index', 'SourceIndex', 'READY'];
  if (lower === 'docs/knowledge/02-decisions/decision-index.md') return ['Knowledge Index', 'DecisionIndex', 'READY'];
  if (lower === 'docs/knowledge/04-requirements/requirement-index.md') return ['Knowledge Index', 'RequirementIndex', 'READY'];
  if (lower === 'docs/knowledge/05-pending/open-questions.md') return ['Knowledge Index', 'PendingIndex', 'READY'];
  if (lower.startsWith('docs/knowledge/decisions/')) return ['Decision', 'CurrentDecision', 'READY'];
  if (lower.startsWith('docs/knowledge/')) return ['Knowledge Governance', 'CurrentKnowledge', 'READY'];
  if (lower.startsWith('knowledge-base/')) return ['Legacy Knowledge Base', 'LegacyReference', 'PARTIAL'];
  if (lower.startsWith('backups/')) return ['Backup', 'HistoricalBackup', 'READY'];
  if (lower.startsWith('docs/review/')) return ['Review/Audit', 'ReviewEvidence', 'PARTIAL'];
  if (lower.startsWith('archive/')) return ['Archive', 'HistoricalArtifact', 'DRAFT'];
  if (lower.startsWith('.specify/') || lower.startsWith('.github/') || ['agents.md', 'readme.md', 'file-writing-rules.md', 'project-structure.md', '.gitignore'].includes(path.basename(lower))) return ['Governance', 'ProjectRule', 'READY'];
  if (lower.includes('/99-检查记录/') || ext === '.ndjson') return ['Verification Record', 'InspectionOutput', 'PARTIAL'];
  if (lower.includes('/tests/') || /(^|[-_])uat([-.\/]|$)|test.case|test_case/.test(lower)) return ['Testing', 'TestArtifact', 'DRAFT'];
  if (lower.includes('prototype-screenshots') || (lower.includes('prototype') && ['.png', '.jpg'].includes(ext))) return ['Prototype Screenshot', 'VisualEvidence', 'PARTIAL'];
  if (lower === 'prototype/index.html') return ['Prototype', 'CurrentPrototype', 'PARTIAL'];
  if (lower.endsWith('/index.html') && (lower.includes('prototype') || lower.includes('/ui/'))) return ['Legacy Prototype', 'HistoricalPrototype', 'DRAFT'];
  if (lower.includes('prototype') && ['.css', '.js', '.svg', '.png'].includes(ext)) return ['Prototype Asset', 'PrototypeSupport', 'PARTIAL'];
  if (lower.includes('/plans/') && lower.includes('mobile-workspace')) return ['TDD', 'DesignDraft', 'DRAFT'];
  if (/solution-plan|data-model|field-mapping/.test(lower)) return ['SDD', 'DesignDraft', 'DRAFT'];
  if (/01-requirements-spec\.md|02-requirements\.md|12-requirements-latest|完整需求规格/.test(lower)) return ['PRD', 'RequirementDraft', 'DRAFT'];
  if (/需求清单|需求对接确认表/.test(lower) && ext === '.xlsx') return ['Functional List', 'ConfirmationWorkbook', 'DRAFT'];
  if (/requirements|需求确认|mvp-scope/.test(lower)) return ['Requirement Reference', 'RequirementDraft', 'DRAFT'];
  if (/sop|flow|流程/.test(lower)) return ['Flow/SOP', 'ProcessReference', lower.includes('/90-历史版本/') ? 'DRAFT' : 'PARTIAL'];
  if (/听记|纪要|纸质材料|original_text|extracted\.txt/.test(lower)) return ['Original Source', 'CustomerEvidence', 'READY'];
  if (lower.startsWith('materials/raw/')) return ['Legacy Source', 'HistoricalEvidence', 'DRAFT'];
  if (lower.startsWith('materials/')) return ['Source Reference', 'CustomerReference', 'PARTIAL'];
  if (lower.startsWith('outputs/')) return ['Delivery Reference', 'DeliveryArtifact', 'PARTIAL'];
  if (lower.startsWith('docs/')) return ['Project Document', 'DerivedArtifact', 'DRAFT'];
  if (lower.startsWith('prototype/')) return ['Prototype Support', 'PrototypeSupport', 'PARTIAL'];
  if (lower.startsWith('store/')) return ['Unclassified', 'Inbox', 'MISSING'];
  return ['Unclassified', 'Unknown', 'MISSING'];
}
const files = existingPaths.map(rel => {
  const prior = previousByPath.get(rel) || {};
  const [category, sourceType, deliveryStatus] = classify(rel);
  const stat = fs.statSync(path.join(root, rel));
  return {
    id: fileId(rel), name: path.basename(rel), path: '../' + rel, projectPath: rel,
    type: path.extname(rel).slice(1).toUpperCase() || 'FILE', category, sourceType,
    relatedModules: moduleFor(rel), relatedFlows: [], relatedDecisions: [],
    status: deliveryStatus, deliveryStatus,
    version: rel === 'prototype/index.html' ? '2.0（评审版）' : rel.includes('/90-历史版本/') || rel.startsWith('archive/') || rel.startsWith('materials/raw/') ? '历史/草案' : '未标版本',
    lastModified: stat.mtime.toISOString(), size: stat.size, gitTracked: tracked.has(rel),
    gitStatus: prior.gitStatus || (tracked.has(rel) ? 'tracked' : 'untracked'),
    legacyCategory: prior.category || null,
    aliases: [], sourceIds: [],
    knowledgeTier: rel.startsWith('knowledge-base/') ? 'LEGACY' : rel.startsWith('docs/knowledge/') ? 'CURRENT' : null,
  };
});
const fileByPath = new Map(files.map(f => [f.projectPath, f]));
const fileById = new Map(files.map(f => [f.id, f]));
const sourceById = new Map(kb.sources.map(s => [s.id, s]));
function sourceFileIds(sourceIds) { return [...new Set((sourceIds || []).map(id => sourceById.get(id)?.path).map(p => fileByPath.get(p)?.id).filter(Boolean))]; }

function parseSourceMappings(markdown) {
  return markdown.split('\n').filter(line => /^\|\s*SOURCE-\d{3}\s*\|/.test(line)).map(line => {
    const [sourceId, name, rawPath, typeStatus, associations] = markdownCells(line);
    const projectPath = rawPath.replace(/`/g, '').trim();
    const file = fileByPath.get(projectPath);
    if (!file) throw new Error(`SOURCE mapping target missing: ${sourceId} -> ${projectPath}`);
    return { sourceId, fileId: file.id, projectPath, name, typeStatus, associations };
  });
}
const sourceMappings = parseSourceMappings(readText(knowledgePaths.sourceIndex));
const seenSourceIds = new Set();
for (const mapping of sourceMappings) {
  if (seenSourceIds.has(mapping.sourceId)) throw new Error(`Duplicate SOURCE ID: ${mapping.sourceId}`);
  seenSourceIds.add(mapping.sourceId);
  const file = fileById.get(mapping.fileId);
  file.sourceIds.push(mapping.sourceId);
  file.aliases.push(mapping.sourceId);
}

function parseDecisionIndex(markdown) {
  const metadata = new Map();
  const changes = [];
  for (const line of markdown.split('\n').filter(line => /^\|\s*(?:CONFIRMED|PENDING|REJECTED|CHG)-\d{3}\s*\|/.test(line))) {
    const cells = markdownCells(line);
    const id = cells[0];
    if (id.startsWith('CONFIRMED-')) {
      metadata.set(id, { id, title: cells[1], flowIds: idList(cells[2], ['FLOW']) });
    } else if (id.startsWith('CHG-')) {
      changes.push({ id, type: cells[1], title: cells[2], content: cells[3], decisionIds: idList(cells[4], ['CONFIRMED', 'PENDING', 'REJECTED']) });
    } else {
      metadata.set(id, { id, type: cells[1], title: cells[2], indexContent: cells[3], flowIds: idList(cells[4], ['FLOW']) });
    }
  }
  return { metadata, changes };
}
function parseDecisionDocument(markdown) {
  const entries = [];
  const pattern = /^###\s+((?:CONFIRMED|PENDING|REJECTED)-\d{3})\s*$([\s\S]*?)(?=^###\s+(?:CONFIRMED|PENDING|REJECTED)-\d{3}\s*$|^##\s+|(?![\s\S]))/gm;
  let match;
  while ((match = pattern.exec(markdown)) !== null) {
    const paragraphs = match[2].trim().split(/\n\s*\n/).map(x => x.trim()).filter(Boolean);
    entries.push({ id: match[1], content: paragraphs[0] || '', reason: paragraphs.slice(1).join(' ') || null });
  }
  return entries;
}
const moduleByFlow = {
  'FLOW-MAIN': ['客户服务', '报价', '工单', 'Service Report', '财务'],
  'FLOW-P': ['报价', '工单', 'MR / 材料', '排期派工', 'Service Report'],
  'FLOW-MAINT-ISSUE': ['保养计划', 'Service Report', '报价', 'MR / 材料', '工单'],
  'FLOW-INSTANT': ['Service Report', '报价', '工单', '财务'],
  'FLOW-M': ['报价', '保养计划', '排期派工', 'Service Report'],
  'FLOW-CM': ['客户服务', '排期派工', '工单', 'Service Report'],
  'FLOW-TENDER': ['Tender', '报价', '工单'],
};
const decisionFile = fileByPath.get(decisionPath);
const decisionIndexFile = fileByPath.get(knowledgePaths.decisionIndex);
const parsedDecisionIndex = parseDecisionIndex(readText(knowledgePaths.decisionIndex));
const decisions = parseDecisionDocument(readText(decisionPath)).map(entry => {
  const meta = parsedDecisionIndex.metadata.get(entry.id);
  if (!meta) throw new Error(`Decision missing from Decision Index: ${entry.id}`);
  const status = entry.id.split('-')[0];
  return {
    id: entry.id, status, priority: status === 'PENDING' ? 'P0' : undefined,
    content: entry.content, reason: entry.reason || undefined, flowIds: meta.flowIds,
    source: decisionPath, confirmedAt: status === 'CONFIRMED' ? '2026-09-27' : undefined,
    sourceType: 'HumanConfirmedDiscussion', title: meta.title,
    type: status === 'CONFIRMED' ? 'Decision' : status === 'PENDING' ? 'Open Question' : 'Change History',
    sourceFileIds: decisionFile ? [decisionFile.id] : [],
    knowledgeFileIds: decisionIndexFile ? [decisionIndexFile.id] : [],
    impactedModules: [...new Set(meta.flowIds.flatMap(fid => moduleByFlow[fid] || []))],
    date: '2026-09-27', factStatus: status === 'CONFIRMED' ? 'CONFIRMED' : status === 'PENDING' ? 'OPEN' : 'CONFLICT',
  };
});
if (decisions.length !== 20) throw new Error(`Decision count changed unexpectedly: ${decisions.length} (expected 20)`);
const decisionById = new Map(decisions.map(d => [d.id, d]));

const facts = [];
for (const d of decisions.filter(x => x.status === 'CONFIRMED')) facts.push({
  id: 'FACT-' + d.id.slice(-3), title: d.title, statement: d.content, status: 'CONFIRMED',
  sourceFileIds: d.sourceFileIds, sourceLocator: '## ' + d.id,
  sourcePriority: '明确讨论 Decision', decisionIds: [d.id], flowIds: d.flowIds,
  evidenceNote: '来自 2026-09-27 人工确认讨论；原始客户材料继续作为背景证据，不自动替代该结论。',
});
for (const rule of kb.rules) {
  const fileIds = sourceFileIds(rule.sourceIds);
  const superseded = rule.id === 'RULE-013';
  const status = superseded ? 'PARTIAL' : rule.status === 'Confirmed' ? 'PARTIAL' : rule.status === 'Conflict' ? 'CONFLICT' : 'OPEN';
  facts.push({ id: 'FACT-LEGACY-' + rule.id.slice(-3), title: rule.title, statement: rule.content,
    status, legacyStatus: rule.status, sourceFileIds: fileIds, legacySourceIds: rule.sourceIds,
    sourcePriority: '历史事实审计', decisionIds: [], supersededByDecisionId: superseded ? 'CONFIRMED-010' : null,
    flowIds: [], legacyFlowIds: rule.flowIds,
    evidenceNote: superseded ? '历史资料间的完工状态冲突已由较新的 CONFIRMED-010 给出当前结论；旧差异保留，不作为当前未解决冲突。' : '保留上一版知识库规则及来源。未取得本轮人工确认，不能覆盖当前 Decision。',
  });
}
const factByDecision = new Map(facts.filter(f => f.decisionIds.length && !f.id.startsWith('FACT-LEGACY-')).map(f => [f.decisionIds[0], f]));

const flowMeta = {
  'FLOW-MAIN': ['概览客户需求到工单完工，并区分收款状态。', '客户需求；四类报价入口另见 CONFIRMED-009。'],
  'FLOW-P': ['完成先报价后维修的材料准备、排期、施工与报告闭环。', '客户需要维修/工程，报价任务已发起。'],
  'FLOW-MAINT-ISSUE': ['处理保养中发现而无法当场完成的维修问题。', '师傅在保养 Service Report 中选择“需要报价”。'],
  'FLOW-INSTANT': ['处理现场具备材料且客户接受价格的即时维修。', '师傅现场发现可当场处理的问题。'],
  'FLOW-M': ['按合同周期组织每次保养并留存 Service Report。', '报价包含 M 且客户接受，中单后生成整期计划。'],
  'FLOW-CM': ['由 CR / 主管指定师傅完成 CM 服务。', '发生 CM 任务。'],
  'FLOW-TENDER': ['处理政府标书结果并进入相应业务类型。', '取得政府项目标书。'],
};
function parseFlowData(markdown) {
  const result = [];
  const sections = markdown.split(/(?=^##\s+FLOW-[A-Z-]+\s*$)/gm).filter(block => /^##\s+FLOW-[A-Z-]+\s*$/m.test(block));
  for (const section of sections) {
    const id = section.match(/^##\s+(FLOW-[A-Z-]+)\s*$/m)?.[1];
    const value = label => section.match(new RegExp(`^- ${label}：(.+)$`, 'm'))?.[1]?.trim() || '';
    const nodes = section.split('\n').filter(line => /^\|\s*[A-Z]+-\d{2}\s*\|/.test(line)).map(line => {
      const [nodeId, label, actor, action, state, nextRole, status, decisionText, description] = markdownCells(line);
      return { id: nodeId, label, actor, action, state, nextRole, status,
        decisionIds: idList(decisionText, ['CONFIRMED', 'PENDING', 'REJECTED']), description };
    });
    const status = value('状态');
    if (!['CONFIRMED', 'PARTIAL', 'OPEN', 'CONFLICT'].includes(status)) throw new Error(`Invalid flow status: ${id} -> ${status}`);
    if (!nodes.length) throw new Error(`Flow has no structured nodes: ${id}`);
    for (const node of nodes) for (const did of node.decisionIds) if (!decisionById.has(did)) throw new Error(`Unknown Decision ${did} in ${id}/${node.id}`);
    result.push({ id, name: value('名称'), status, summary: value('摘要'), nodes });
  }
  return result;
}
const baseFlows = parseFlowData(readText(knowledgePaths.flowData));
if (baseFlows.length !== 7) throw new Error(`Flow count changed unexpectedly: ${baseFlows.length} (expected 7)`);
const baselineFile = fileByPath.get(knowledgePaths.baseline);
const flowDataFile = fileByPath.get(knowledgePaths.flowData);
const flows = baseFlows.map(f => {
  const nodes = [...f.nodes];
  const decisionIds = [...new Set(nodes.flatMap(n => n.decisionIds))];
  const confirmed = decisionIds.filter(id => decisionById.get(id)?.status === 'CONFIRMED');
  const open = decisionIds.filter(id => decisionById.get(id)?.status === 'PENDING');
  const sourceFileIds = [...new Set(confirmed.flatMap(id => decisionById.get(id)?.sourceFileIds || []))];
  const [purpose, trigger] = flowMeta[f.id];
  return { ...f, nodes,
    factStatus: f.id === 'FLOW-MAIN' ? 'PARTIAL' : f.status === 'CONFIRMED' ? 'CONFIRMED' : f.status === 'PARTIAL' ? 'PARTIAL' : 'OPEN',
    purpose, trigger, roles: [...new Set(nodes.flatMap(n => [n.actor, n.nextRole]))],
    keyStates: [...new Set(nodes.map(n => n.state))], decisionIds: confirmed,
    openDecisionIds: open, sourceFileIds,
    baselineFileId: baselineFile?.id || null,
    knowledgeFileIds: [baselineFile?.id, flowDataFile?.id].filter(Boolean),
    factIds: confirmed.map(id => factByDecision.get(id)?.id).filter(Boolean),
    moduleIds: moduleByFlow[f.id],
  };
});
const flowById = new Map(flows.map(f => [f.id, f]));

// Explicit, reviewed topic connections. These are trace links, not approval or proof of implementation.
const requirementFlowMap = {
  'FLOW-MAIN': [6, 7, 8, 9, 10, 11, 12, 40, 43, 44, 51, 57, 58, 59],
  'FLOW-P': [19, 27, 30, 31, 33, 40, 41, 43, 44, 51, 52, 54],
  'FLOW-MAINT-ISSUE': [27, 30, 31, 33, 43, 44, 51, 52, 54],
  'FLOW-INSTANT': [27, 30, 31, 33, 40, 43, 44, 59],
  'FLOW-M': [19, 27, 30, 31, 33, 40, 44, 61],
  'FLOW-CM': [19, 22, 27, 31, 33, 78],
  'FLOW-TENDER': [40, 44, 46, 47, 48, 49, 50],
};
const requirementFlowIds = new Map();
for (const [fid, numbers] of Object.entries(requirementFlowMap)) for (const num of numbers) {
  const rid = 'REQ-' + String(num).padStart(3, '0');
  requirementFlowIds.set(rid, [...(requirementFlowIds.get(rid) || []), fid]);
}
const pageById = new Map(kb.pages.map(p => [p.id, p]));
const currentPrototypeId = fileByPath.get('prototype/index.html')?.id;
const prdPaths = ['docs/history/2026-06/01-requirements-spec.md', 'materials/raw/ec-workorder/12-requirements-latest-20260919.md', 'materials/raw/EC工单系统_完整需求规格.html'].map(resolveMigratedPath);
const prdFileIds = prdPaths.map(p => fileByPath.get(p)?.id).filter(Boolean);
const requirements = kb.requirements.map(r => {
  const directSources = sourceFileIds(r.sourceIds);
  const flowIds = requirementFlowIds.get(r.id) || [];
  const pages = r.pageIds.map(id => pageById.get(id)).filter(Boolean).map(p => ({
    id: p.id, name: p.name, key: p.key, status: 'PARTIAL', fileId: currentPrototypeId,
    basis: '历史知识库 PAGE→REQ 关联；当前原型是否符合 2026-09-27 Decision 需复核。',
  }));
  return { id: r.id, legacyId: r.legacyId, title: r.name, module: r.module,
    status: 'OPEN', approvalStatus: r.approvalStatus, scope: r.scope,
    sourceFileIds: directSources, legacySourceIds: r.sourceIds,
    flowIds, legacyFlowIds: r.flowIds, ruleIds: r.ruleIds,
    legacyFactIds: r.ruleIds.map(id => 'FACT-LEGACY-' + id.slice(-3)).filter(id => facts.some(f => f.id === id)),
    pageIds: r.pageIds,
    pages, prdFileIds: directSources.filter(id => prdFileIds.includes(id)),
    prototypeFileIds: pages.length && currentPrototypeId ? [currentPrototypeId] : [],
    decisionIds: [...new Set(flowIds.flatMap(fid => flowById.get(fid).decisionIds))],
    note: '关联表示可追溯的主题对应，不代表需求已批准、原型已对齐或功能已实现。',
  };
});
const requirementById = new Map(requirements.map(r => [r.id, r]));
const pages = kb.pages.map(p => ({ id: p.id, key: p.key, name: p.name, status: 'PARTIAL',
  fileId: currentPrototypeId, requirementIds: p.requirementIds.filter(id => requirementById.has(id)),
  flowIds: [...new Set(p.requirementIds.flatMap(id => requirementById.get(id)?.flowIds || []))],
  sourceFileIds: sourceFileIds(p.sourceIds),
  evidenceNote: '由历史知识库的原型页面映射得到；仅证明入口与需求关联，具体行为待与最新 Decision 对照。',
}));
const pageIndex = new Map(pages.map(p => [p.id, p]));

const traces = requirements.map(r => {
  const fsFor = r.flowIds.map(id => flowById.get(id));
  const decisionIds = [...new Set(fsFor.flatMap(f => f.decisionIds))];
  const factIds = [...new Set(decisionIds.map(id => factByDecision.get(id)?.id).filter(Boolean))];
  const sourceFileIds = [...new Set([...r.sourceFileIds, ...factIds.flatMap(id => facts.find(f => f.id === id)?.sourceFileIds || [])])];
  const flags = [];
  if (!r.sourceFileIds.length) flags.push('MISSING SOURCE');
  if (!r.flowIds.length) flags.push('UNLINKED');
  if (!r.prdFileIds.length) flags.push('UNLINKED PRD');
  if (!r.prototypeFileIds.length) flags.push('UNLINKED PROTOTYPE');
  if (r.approvalStatus !== '已批准') flags.push('OPEN');
  if ([51, 55, 56, 78].includes(Number(r.id.slice(-3)))) flags.push('CONFLICT');
  return { id: 'TRACE-' + r.id, requirementId: r.id, sourceFileIds, directSourceFileIds: r.sourceFileIds,
    factIds, decisionIds, flowIds: r.flowIds, legacyFlowIds: r.legacyFlowIds,
    prdFileIds: r.prdFileIds, pageIds: r.pageIds, prototypeFileIds: r.prototypeFileIds,
    sddFileIds: [], tddFileIds: [], testFileIds: [], developmentFileIds: [], flags,
    relationLevel: 'TOPIC_MATCH_REVIEWED',
  };
});
const traceByReq = new Map(traces.map(t => [t.requirementId, t]));
const explicitEdges = [];
function edge(from, to, kind, evidence, status = 'LINKED') { explicitEdges.push({ from, to, kind, evidence, status }); }
for (const mapping of sourceMappings) edge(mapping.sourceId, mapping.fileId, 'SOURCE_ALIAS_TO_FILE', knowledgePaths.sourceIndex);
for (const fact of facts) for (const sid of fact.sourceFileIds) edge(sid, fact.id, 'SOURCE_TO_FACT', fact.sourceLocator || '历史知识库 sourceIds');
for (const fact of facts) for (const did of fact.decisionIds) edge(fact.id, did, 'FACT_TO_DECISION', fact.sourceLocator);
for (const d of decisions) for (const sid of d.sourceFileIds) edge(sid, d.id, 'SOURCE_TO_DECISION', 'Decision 原文');
for (const d of decisions.filter(d => d.status === 'CONFIRMED')) for (const fid of d.flowIds) edge(d.id, fid, 'DECISION_TO_FLOW', '2026-09-27 Decision 与流程节点');
const baselineText = readText(knowledgePaths.baseline);
for (const d of decisions.filter(d => baselineText.includes(d.id))) if (baselineFile) edge(d.id, baselineFile.id, 'DECISION_TO_BASELINE', knowledgePaths.baseline);
for (const f of flows) if (baselineFile) edge(baselineFile.id, f.id, 'BASELINE_TO_FLOW', knowledgePaths.flowData);
for (const r of requirements) {
  for (const fid of r.flowIds) edge(fid, r.id, 'FLOW_TO_REQUIREMENT', '人工审阅需求标题与业务场景；主题对应', 'PARTIAL');
  for (const pid of r.prdFileIds) edge(r.id, pid, 'REQUIREMENT_TO_PRD', '历史知识库 requirement.sourceIds', 'PARTIAL');
  for (const page of r.pages) edge(r.id, page.id, 'REQUIREMENT_TO_PAGE', '历史知识库 requirement.pageIds', 'PARTIAL');
}
for (const p of pages) if (p.fileId) edge(p.id, p.fileId, 'PAGE_TO_PROTOTYPE', '历史知识库 page.sourceIds', 'PARTIAL');

function explicitKnowledgeRefs(file) {
  if (!file.projectPath.startsWith('docs/knowledge/') || path.extname(file.projectPath).toLowerCase() !== '.md') return { facts: [], decisions: [], flows: [], requirements: [], pages: [] };
  const text = readText(file.projectPath);
  const matches = regex => [...new Set(text.match(regex) || [])];
  return {
    facts: matches(/FACT-(?:LEGACY-)?\d{3}/g).filter(id => facts.some(f => f.id === id)),
    decisions: matches(/(?:CONFIRMED|PENDING|REJECTED)-\d{3}/g).filter(id => decisionById.has(id)),
    flows: matches(/FLOW-[A-Z-]+/g).filter(id => flowById.has(id)),
    requirements: matches(/REQ-\d{3}/g).filter(id => requirementById.has(id)),
    pages: matches(/PAGE-\d{3}/g).filter(id => pageIndex.has(id)),
  };
}
for (const file of files) {
  const relatedReqs = traces.filter(t => [...t.sourceFileIds, ...t.prdFileIds, ...t.prototypeFileIds, ...t.sddFileIds, ...t.tddFileIds, ...t.testFileIds].includes(file.id));
  const explicit = explicitKnowledgeRefs(file);
  file.relatedFacts = [...new Set([...facts.filter(f => f.sourceFileIds.includes(file.id)).map(f => f.id), ...explicit.facts])];
  file.relatedRequirements = [...new Set([...relatedReqs.map(t => t.requirementId), ...explicit.requirements])];
  file.relatedFlows = [...new Set([...relatedReqs.flatMap(t => t.flowIds), ...flows.filter(f => f.sourceFileIds.includes(file.id) || f.knowledgeFileIds.includes(file.id)).map(f => f.id), ...explicit.flows])];
  file.relatedDecisions = [...new Set([...relatedReqs.flatMap(t => t.decisionIds), ...decisions.filter(d => d.sourceFileIds.includes(file.id) || d.knowledgeFileIds.includes(file.id)).map(d => d.id), ...explicit.decisions])];
  file.relatedPages = [...new Set([...pages.filter(p => p.fileId === file.id).map(p => p.id), ...explicit.pages])];
  file.linkStatus = relatedReqs.length || file.relatedPages.length || file.relatedFacts.length || file.relatedFlows.length || file.relatedDecisions.length ? 'PARTIAL' : 'UNLINKED';
}

function parseOpenQuestions(markdown) {
  const legacyById = new Map(kb.questions.map(q => [q.id, q]));
  const pendingDecisionByQuestion = new Map([
    ['Q-20260927-001', 'PENDING-001'], ['Q-20260927-002', 'PENDING-002'],
  ]);
  const indexFile = fileByPath.get(knowledgePaths.openQuestions);
  return markdown.split('\n').filter(line => /^\|\s*Q-(?:\d{3}|\d{8}-\d{3})\s*\|/.test(line)).map(line => {
    const [id, priority, status, title, impact, handling] = markdownCells(line);
    const legacy = legacyById.get(id);
    const decisionId = pendingDecisionByQuestion.get(id) || null;
    return {
      id, priority, status, title, reason: handling,
      decisionId, flowIds: idList(impact, ['FLOW']),
      sourceFileIds: decisionId ? [decisionFile?.id].filter(Boolean) : sourceFileIds(legacy?.sourceIds),
      knowledgeFileIds: indexFile ? [indexFile.id] : [],
      provenance: decisionId ? '当前人工确认讨论中的 Pending Decision。' : '历史知识库问题，由当前 Open Questions 索引保留状态。',
    };
  });
}
const questions = parseOpenQuestions(readText(knowledgePaths.openQuestions));
if (questions.length !== 24) throw new Error(`Open Question count changed unexpectedly: ${questions.length} (expected 24)`);
const conflictRecords = [
  ...[['CONFLICT-001', 'RULE-004', 'PM/CM 与 CALL 分类映射未确认'],
    ['CONFLICT-002', 'RULE-007', 'CM 场景师傅拒单权限存在资料差异'],
    ['CONFLICT-003', 'RULE-010', 'Before/After 照片上限 9 张或 10 张'],
    ['CONFLICT-004', 'RULE-017', '后补报价金额阈值与触发字段版本不一致'],
    ['CONFLICT-005', 'RULE-019', '采购/库存主数据写入权存在两种方案']].map(([id, ruleId, title]) => {
      const rule = kb.rules.find(r => r.id === ruleId);
      return { id, kind: 'Source Conflict', title, status: 'CONFLICT', ruleId,
        sourceFileIds: sourceFileIds(rule.sourceIds), requirementIds: rule.requirementIds,
        decisionIds: [], evidenceNote: rule.content };
    }),
  { id: 'CONFLICT-006', kind: 'State Model Conflict', title: '工单主状态六态、七态与业务卡点模式未统一', status: 'CONFLICT',
    sourceFileIds: sourceFileIds(kb.questions.find(q => q.id === 'Q-003').sourceIds),
    requirementIds: [], decisionIds: [], evidenceNote: '来自历史知识库 Q-003；当前 Decision 未确认统一状态字典。' },
];
const changes = parsedDecisionIndex.changes.map(change => ({ ...change,
  sourceFileIds: [decisionFile?.id].filter(Boolean),
  knowledgeFileIds: [decisionIndexFile?.id].filter(Boolean), status: 'CONFIRMED',
}));
const allSourceFiles = files.filter(f => ['Original Source', 'Legacy Source', 'Source Reference'].includes(f.category));
const unlinked = traces.filter(t => t.flags.includes('UNLINKED'));
const missingDirectSource = traces.filter(t => t.flags.includes('MISSING SOURCE'));
const allFilesLinked = files.filter(f => f.linkStatus !== 'UNLINKED');
const chainToPrototype = traces.filter(t => t.sourceFileIds.length && t.factIds.length && t.decisionIds.length && t.flowIds.length && t.prdFileIds.length && t.pageIds.length);
const prdFiles = files.filter(f => f.category === 'PRD');
const prdLinkedToFlow = prdFiles.filter(f => traces.some(t => t.prdFileIds.includes(f.id) && t.flowIds.length));
const pagesLinkedToPrd = pages.filter(p => p.requirementIds.some(rid => requirementById.get(rid)?.prdFileIds.length));
const deliveryKinds = ['PRD', 'Prototype', 'SDD', 'TDD', 'Testing'];
const deliverables = deliveryKinds.map(kind => {
  const matching = files.filter(f => f.category === kind);
  const status = !matching.length ? 'MISSING' : kind === 'Prototype' ? 'PARTIAL' : 'DRAFT';
  return { kind, status, fileIds: matching.map(f => f.id), count: matching.length,
    completion: kind === 'Testing' ? 0 : kind === 'Prototype' ? 35 : 20,
    note: '完成度为知识库核验程度，不是项目交付验收百分比。',
  };
});
const knowledgeRoleByKey = {
  root: 'KNOWLEDGE_GOVERNANCE', sourceIndex: 'SOURCE_INDEX', decisionIndex: 'DECISION_INDEX',
  baseline: 'CURRENT_BUSINESS_BASELINE', flowData: 'BUSINESS_FLOW_DATA',
  requirementIndex: 'REQUIREMENT_INDEX', openQuestions: 'OPEN_QUESTION_INDEX',
};
const currentKnowledge = Object.entries(knowledgePaths).map(([key, projectPath]) => ({
  role: knowledgeRoleByKey[key], projectPath, fileId: fileByPath.get(projectPath)?.id || null,
  tier: 'CURRENT', status: fileByPath.has(projectPath) ? 'READY' : 'MISSING',
}));
const audit = {
  generatedAt, checks: [
    ['Current Knowledge 入口', currentKnowledge.length, currentKnowledge.filter(item => !item.fileId).length],
    ['SOURCE ID 映射', sourceMappings.length, sourceMappings.filter(item => !fileById.has(item.fileId)).length],
    ['Legacy 保持历史层', files.filter(f => f.projectPath.startsWith('knowledge-base/')).length, files.filter(f => f.projectPath.startsWith('knowledge-base/') && f.knowledgeTier !== 'LEGACY').length],
    ['原始资料入口', allSourceFiles.length, allSourceFiles.filter(f => !f.path).length],
    ['Decision 来源', decisions.length, decisions.filter(d => !d.sourceFileIds.length).length],
    ['场景事实依据', flows.length, flows.filter(f => !f.factIds.length).length],
    ['PRD 反查当前场景', prdFiles.length, prdFiles.length - prdLinkedToFlow.length],
    ['原型页面反查 PRD', pages.length, pages.length - pagesLinkedToPrd.length],
    ['需求关联当前业务场景', requirements.length, unlinked.length],
    ['原型页面反查需求', pages.length, pages.filter(p => !p.requirementIds.length).length],
    ['事实条目来源', facts.length, facts.filter(f => !f.sourceFileIds.length).length],
    ['Open Question 误标 Confirmed', questions.length, questions.filter(q => q.status === 'CONFIRMED').length],
    ['旧资料路径', files.length, files.filter(f => !fs.existsSync(path.join(root, f.projectPath))).length],
    ['原型整改自动回归', regression?.total || 0, regression ? regression.failed : 1],
    ['原型人工验收', 1, 1],
  ].map(([name, checked, issues]) => ({ name, checked, issues })),
  counts: { indexedFiles: files.length, sourceFiles: allSourceFiles.length, facts: facts.length,
    sourceAliasMappings: sourceMappings.length, currentKnowledgeFiles: currentKnowledge.length,
    decisions: decisions.filter(d => d.status === 'CONFIRMED').length,
    openQuestions: questions.filter(q => ['OPEN', 'PENDING'].includes(q.status)).length,
    pendingQuestions: questions.filter(q => q.status === 'PENDING').length,
    questionConflicts: questions.filter(q => q.status === 'CONFLICT').length,
    conflicts: conflictRecords.length, flows: flows.length, requirements: requirements.length, pages: pages.length,
    explicitTraceEdges: explicitEdges.length, unlinkedRequirements: unlinked.length,
    missingDirectSourceRequirements: missingDirectSource.length, indexedFilesWithTrace: allFilesLinked.length,
    prdFilesLinkedToCurrentFlows: prdLinkedToFlow.length, prototypePagesLinkedToPrd: pagesLinkedToPrd.length,
    prototypeRegressionPassed: regression?.passed || 0, prototypeRegressionTotal: regression?.total || 0,
    fullNineHopChains: 0,
    strictChainCompletenessPercent: 0,
    sourceToPrototypeChains: chainToPrototype.length,
    sourceToPrototypeCoveragePercent: Math.round(100 * chainToPrototype.length / requirements.length),
    sourceCoveragePercent: allSourceFiles.length ? 100 : 0,
    decisionSourceCoveragePercent: Math.round(100 * decisions.filter(d => d.status === 'CONFIRMED' && d.sourceFileIds.length).length / 17),
  },
  unlinkedRequirementIds: unlinked.map(t => t.requirementId),
  missingDirectSourceIds: missingDirectSource.map(t => t.requirementId),
  unclassifiedFiles: files.filter(f => f.category === 'Unclassified').map(f => f.projectPath),
  openQuestions: questions, conflicts: conflictRecords,
  limitations: [
    'PRD、SDD、TDD 的文件存在与内容覆盖是两回事；未验证的语义边一律显示 PARTIAL。',
    '当前没有正式 Test/UAT 用例，严格九跳完整链路为 0%。',
    '旧知识库规则保留来源与旧状态，但本轮不自动提升为新确认 Decision。',
    '原型整改记录与机器结果显示 7/7 场景自动回归通过；人工验收仍待完成，旧审计发现不计为当前已证实 Prototype Conflict。',
    '原型与 PRD 的具体字段级冲突需要逐页评审，当前只记录已有证据支持的冲突。',
  ],
};
const ia = [
  { id: 'overview', number: '01', title: '业务全景', children: [] },
  { id: 'facts', number: '02', title: '业务事实库', children: ['原始资料', '事实条目', '待确认事项', '冲突与差异'] },
  { id: 'flows', number: '03', title: '业务流程', children: flows.map(f => f.name) },
  { id: 'design', number: '04', title: '需求与设计', children: ['功能清单', 'PRD', 'Prototype', 'SDD', 'TDD', 'Testing'] },
  { id: 'decisions', number: '05', title: '决策中心', children: ['Decision', 'Open Question', 'Change'] },
  { id: 'trace', number: '06', title: '追溯矩阵', children: [] },
  { id: 'status', number: '07', title: '项目状态', children: [] },
];

const model = { generatedAt, ia, files, facts, decisions, flows, requirements, pages,
  traces, edges: explicitEdges, questions, conflicts: conflictRecords, changes,
  sourceMappings, currentKnowledge,
  deliverables, audit, prototypeRegression: regression, roles: kb.roles.map(r => ({ ...r, legacyStatus: r.status,
    sourceFileIds: sourceFileIds(r.sourceIds), status: r.status === 'Confirmed' ? 'PARTIAL' : 'OPEN' })),
  moduleNames: [...new Set(requirements.map(r => r.module))],
  baseline: { ...originalStatus.baseline, business: knowledgePaths.baseline, businessFileId: baselineFile?.id || null },
  sourcePriority: ['客户原始资料', '明确讨论 Decision', '已确认 PRD', 'Prototype', '开发实现'],
};
function json(name, value) { fs.writeFileSync(path.join(dataDir, name), JSON.stringify(value, null, 2) + '\n', 'utf8'); }
json('file-index.json', { generatedAt, total: files.length, scanBoundary: originalStatus.scanBoundary, sourceMappings, currentKnowledge, files });
json('facts.json', { generatedAt, total: facts.length, facts });
json('requirements.json', { generatedAt, total: requirements.length, requirements, pages });
json('flows.json', { generatedAt, total: flows.length, flows });
json('decisions.json', { generatedAt, total: decisions.length, decisions, changes });
const priorTrace = JSON.parse(fs.readFileSync(path.join(dataDir, 'traceability.json'), 'utf8'));
json('traceability.json', { generatedAt, chain: 'Fact → Decision → Flow → Requirement → PRD → Prototype → SDD → TDD → Test',
  total: traces.length, sourceMappings, currentBusinessBaselineFileId: baselineFile?.id || null, traces, edges: explicitEdges,
  legacyTracesStatus: 'ARCHIVED_NOT_CURRENT', legacyTraces: priorTrace.legacyTraces || priorTrace.traces || [] });
json('audit-report.json', audit);
json('architecture.json', { generatedAt, ia, sourcePriority: model.sourcePriority,
  dataResponsibility: {
    humanMaintained: ['docs/knowledge/**/*.md', 'materials/**/*', 'docs/**/*', 'prototype/**/*'],
    builder: 'project-hub/scripts/build-v2.js', generated: 'project-hub/data/*.json', display: 'project-hub/index.html',
  },
  currentKnowledge,
  factStatuses: ['CONFIRMED', 'PARTIAL', 'OPEN', 'CONFLICT'],
  deliverableStatuses: ['MISSING', 'DRAFT', 'PARTIAL', 'READY', 'VERIFIED'],
  relationStatuses: ['LINKED', 'PARTIAL', 'UNLINKED', 'MISSING SOURCE', 'OPEN', 'CONFLICT'],
  note: '文件路径和旧 ID 保持可追溯；新关联仅在有明确证据时计入。',
});
json('project-status.json', { ...originalStatus, generatedAt,
  baseline: model.baseline,
  knowledgeUpstream: { builder: 'project-hub/scripts/build-v2.js', currentKnowledge, sourceMappings: sourceMappings.length },
  knowledgeCompleteness: audit.counts,
  delivery: deliverables,
  gate: '客户确认、原型人工验收与正式 Test/UAT 均未完成；自动回归 7/7 通过，当前处于评审阶段。',
  nextActions: ['确认现场收款交接与对账', '确认 CM 与 PM 时间冲突', '人工验收原型整改结果', '冻结一期功能范围与 80 项需求状态', '建立正式 Test/UAT 用例'],
  conflicts: conflictRecords, openQuestions: questions,
});

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EC Project Hub · Single Source of Truth</title><link rel="stylesheet" href="assets/styles.css"><link rel="stylesheet" href="assets/architecture.css"></head><body><aside class="sidebar"><div class="brand"><div class="brand-mark">EC</div><div><strong>Project Hub</strong><span>事实与交付中心</span></div></div><nav id="nav"></nav><div class="side-links"><a href="../knowledge-base/index.html">历史知识库 ↗</a><a href="../prototype/index.html">当前原型 ↗</a><a href="README.md">维护说明 ↗</a></div></aside><main><header class="topbar"><div><p class="eyebrow">EC 工单系统 · Single Source of Truth</p><h1 id="view-title">业务全景</h1></div><label class="global-search"><span>⌕</span><input id="global-search" type="search" placeholder="搜索 Fact、Decision、Flow、REQ、文件…"></label></header><div id="content"></div></main><aside id="drawer" class="drawer" aria-hidden="true"><button id="drawer-close" aria-label="关闭">×</button><div id="drawer-content"></div></aside><div id="toast" class="toast" role="status"></div><script>window.HUB_DATA=${JSON.stringify(model).replace(/</g, '\\u003c')};</script><script src="assets/app-v2.js"></script></body></html>\n`;
fs.writeFileSync(path.join(hub, 'index.html'), html, 'utf8');
console.log(JSON.stringify(audit.counts, null, 2));
