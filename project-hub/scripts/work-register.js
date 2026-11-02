const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const registerPath = 'docs/review/project-work/WORK-REGISTER.json';
function normalizedStatus(status) {
  if (['已完成', '进行中', '待确认', '受阻'].includes(status)) return status;
  if (['待前置确认', '待用户确认', '待客户确认'].includes(status)) return '待确认';
  return '待处理';
}
function groupStatus(items, completionCheck = {}) {
  const states = items.map(t => normalizedStatus(t.status));
  if (states.length && states.every(s => s === '已完成')) {
    return completionCheck.status === '通过' && completionCheck.checkedBy && completionCheck.checkedAt && completionCheck.evidence?.length ? '已完成' : '待确认';
  }
  if (states.some(s => s === '进行中' || s === '已完成')) return '进行中';
  if (states.length && states.every(s => s === '待确认' || s === '受阻')) return states.includes('待确认') ? '待确认' : '受阻';
  return '待处理';
}
function workItemMap(work) {
  const items = new Map();
  for (const task of work.tasks) {
    if (items.has(task.id)) throw new Error(`Duplicate work item ${task.id}`);
    items.set(task.id, {...task, parentTaskId:null});
    for (const sub of task.subtasks || []) {
      if (!sub.id.startsWith(task.id + '/') || items.has(sub.id)) throw new Error(`Invalid/duplicate subtask ${sub.id}`);
      items.set(sub.id, {...sub, parentTaskId:task.id});
    }
  }
  return items;
}
function loadWorkRegister(root) {
  const text = fs.readFileSync(path.join(root, registerPath), 'utf8');
  const work = JSON.parse(text);
  if (work.schemaVersion !== 1) throw new Error('Unsupported internal work register');
  for (const key of ['tasks', 'milestones', 'acceptanceRecords', 'clientQuestions']) {
    const ids = work[key].map(item => item.id);
    if (!ids.length || ids.some(id => !id) || new Set(ids).size !== ids.length) throw new Error(`Missing/duplicate ${key} IDs`);
  }
  for (const id of work.focusTaskIds) if (!work.tasks.some(t => t.id === id)) throw new Error(`Unknown focus task ${id}`);
  if (work.taskTree) {
    if (work.taskTree.version === 2) {
      const items = workItemMap(work), groups = work.taskTree.groups;
      if (!groups.length || new Set(groups.map(g => g.id)).size !== groups.length) throw new Error('Missing/duplicate task groups');
      for (const group of groups) {
        if (!group.completionCheck) throw new Error(`Missing completion check ${group.id}`);
        const c = group.completionCheck;
        if (c.status === '通过' && !(c.checkedBy && c.checkedAt && c.evidence?.length)) throw new Error(`Goal completed without evidence ${group.id}`);
      }
      const ids = groups.flatMap(g => g.itemIds);
      if (new Set(ids).size !== ids.length) throw new Error('Work item placed in multiple groups');
      if (!ids.includes(work.taskTree.focus.taskId)) throw new Error('Current work is not an active work item');
      for (const id of ids) {
        const item = items.get(id);
        if (!item || item.archived || !item.doneWhen || !item.nextDeliverable || !(item.executionOwner || item.owner)) throw new Error(`Incomplete work item ${id}`);
        for (const ref of item.referenceTaskIds || []) if (!items.has(ref)) throw new Error(`Unknown task reference ${ref}`);
        for (const dep of item.prerequisites || []) for (const ref of dep.itemIds) if (!items.has(ref)) throw new Error(`Unknown prerequisite ${ref}`);
        if (item.status === '已完成' && !(item.result && item.evidence)) throw new Error(`Completed work item without evidence ${id}`);
      }
      const visiting = new Set(), visited = new Set();
      function visit(id) {
        if (visiting.has(id)) throw new Error(`Circular task prerequisite ${id}`);
        if (visited.has(id)) return;
        visiting.add(id);
        for (const dep of items.get(id).prerequisites || []) for (const ref of dep.itemIds) visit(ref);
        visiting.delete(id); visited.add(id);
      }
      ids.forEach(visit);
    } else {
    const taskIds = new Set(work.tasks.map(t => t.id));
    const groups = work.taskTree.groups;
    if (!groups.length || new Set(groups.map(g => g.id)).size !== groups.length) throw new Error('Missing/duplicate task tree groups');
    const placements = groups.flatMap(g => g.taskIds);
    if (new Set(placements).size !== placements.length) throw new Error('Task appears in multiple groups');
    for (const id of [...placements, ...groups.map(g => g.statusTaskId), work.taskTree.focus.taskId]) {
      if (!taskIds.has(id)) throw new Error(`Unknown task tree reference ${id}`);
    }
    for (const group of groups) if (!group.taskIds.includes(group.statusTaskId)) throw new Error(`Status source outside group ${group.id}`);
    for (const task of work.tasks.filter(t => t.checklist)) {
      const ids = task.checklist.map(c => c.id);
      if (new Set(ids).size !== ids.length || ids.some(id => !id.startsWith(task.id + '/'))) throw new Error(`Invalid checklist IDs ${task.id}`);
    }
    }
  }
  const questionDoc = fs.readFileSync(path.join(root, 'docs/knowledge/05-pending/OPEN-QUESTIONS.md'), 'utf8').split('## 本轮业务核对补充')[0];
  const questionIds = [...questionDoc.matchAll(/^\|\s*(C-\d{2})\s*\|/gm)].map(x => x[1]);
  for (const q of work.clientQuestions) {
    if (!questionIds.includes(q.id)) throw new Error(`Unknown customer question ${q.id}`);
    if (q.status === '已确认' && !(q.confirmedBy && q.confirmedAt && q.decision)) throw new Error(`Unsubstantiated approval ${q.id}`);
  }
  for (const file of [work.legacyBaseline.path, ...work.tasks.filter(t => t.id <= 'TASK-045').map(t => t.evidence).filter(e => /^(docs|materials|outputs|prototype)\/[^；;]+\.md$/.test(e))]) {
    if (!fs.existsSync(path.join(root, file))) throw new Error(`Work source missing: ${file}`);
  }
  let workView;
  if (work.taskTree?.version === 2) {
    const items = workItemMap(work);
    const ids = work.taskTree.groups.flatMap(g => g.itemIds);
    for (const id of ids) for (const q of items.get(id).questionIds || []) if (!questionIds.includes(q)) throw new Error(`Unknown work question ${q}`);
    workView = {
      items:ids.map(id => ({...items.get(id), viewStatus:normalizedStatus(items.get(id).status)})),
      groups:work.taskTree.groups.map(g => ({...g, status:groupStatus(g.itemIds.map(id => items.get(id)), g.completionCheck)})),
    };
  }
  return {...work, ...(workView ? {workView} : {}), sourcePath:registerPath, sourceHash:crypto.createHash('sha256').update(text).digest('hex')};
}
function assertNoCustomerFeedback(book, work) {
  const replies=book.worksheets.getItem('客户待确认').getRange(`D6:G${5+work.clientQuestions.length}`).values;
  const comments=book.worksheets.getItem('业务里程碑').getRange(`I6:I${5+work.milestones.length}`).values;
  if([...replies.flat(),...comments.flat()].some(v=>v!==null&&v!==''&&v!==undefined))throw new Error('客户已填写内容：保留原文件，先复核回填并另建版本，禁止覆盖。');
}
module.exports = {registerPath, loadWorkRegister, assertNoCustomerFeedback, normalizedStatus, groupStatus, workItemMap};
