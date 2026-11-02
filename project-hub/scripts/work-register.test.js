const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const {groupStatus, loadWorkRegister, workItemMap} = require('./work-register');

const tasks = (...states) => states.map(status => ({status}));
const checked = {status:'通过', checkedBy:'test-reviewer', checkedAt:'2026-10-23', evidence:['test-fixture']};
assert.equal(groupStatus(tasks('已完成', '已完成'), checked), '已完成');
assert.equal(groupStatus(tasks('已完成', '已完成')), '待确认', 'completed leaf work cannot substitute goal acceptance');
assert.equal(groupStatus(tasks('已完成'), {status:'通过'}), '待确认', 'a label without evidence is not acceptance');
assert.equal(groupStatus(tasks('已完成', '待处理')), '进行中');
assert.equal(groupStatus(tasks('待处理', '进行中')), '进行中');
assert.equal(groupStatus(tasks('待确认', '待处理')), '待处理', 'one pending decision must not block independent work');
assert.equal(groupStatus(tasks('待确认', '受阻')), '待确认');
assert.equal(groupStatus(tasks('受阻', '受阻')), '受阻');
assert.equal(groupStatus([]), '待处理', 'an empty goal is never completed');
assert.equal(groupStatus(tasks('历史记录待复核')), '待处理', 'history does not imply current completion');

const work = loadWorkRegister(path.resolve(__dirname, '../..'));
assert.equal(work.workView.groups.length, 5);
assert.equal(work.workView.items.length, 33);
const map = workItemMap(work);
assert.equal(map.get('TASK-052/01').parentTaskId, 'TASK-052');
assert.equal(map.get('TASK-052/07').archived, true, 'old combined checklist item stays addressable');
assert(!work.workView.items.some(t => t.id === 'TASK-052/07'));
for (const group of work.workView.groups) {
  const items = group.itemIds.map(id => map.get(id));
  assert.equal(group.status, groupStatus(items, group.completionCheck));
  assert(!('statusTaskId' in group));
}
// Updating any independent child must contribute to its parent status.
const waiting = tasks('待处理', '待处理');
assert.equal(groupStatus(waiting), '待处理');
waiting[1].status = '进行中';
assert.equal(groupStatus(waiting), '进行中');
waiting[1].status = '已完成';
assert.equal(groupStatus(waiting), '进行中');
// Malformed future updates must fail before replacing the Hub snapshot.
const root = path.resolve(__dirname, '../..');
const sourceFile = path.join(root, 'docs/review/project-work/WORK-REGISTER.json');
const read = fs.readFileSync;
function candidate(change) {
  const copy = JSON.parse(read(sourceFile, 'utf8'));
  change(copy);
  fs.readFileSync = (file, ...args) => String(file) === sourceFile ? JSON.stringify(copy) : read(file, ...args);
  try { return loadWorkRegister(root); } finally { fs.readFileSync = read; }
}
assert.throws(() => candidate(w => w.taskTree.groups[0].itemIds.push('TASK-052/01')), /multiple groups/);
assert.throws(() => candidate(w => w.taskTree.groups[0].itemIds[0] = 'TASK-MISSING'), /Incomplete work item/);
assert.throws(() => candidate(w => {
  w.tasks.find(t => t.id === 'TASK-052').subtasks.find(t => t.id === 'TASK-052/01').prerequisites = [{itemIds:['TASK-052/01']}];
}), /Circular/);
assert.throws(() => candidate(w => {w.taskTree.groups[0].completionCheck = {status:'通过'};}), /without evidence/);
console.log('PASS: aggregate state, independent work, stable sub-items, history and 33-item projection.');
