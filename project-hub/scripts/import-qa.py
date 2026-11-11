#!/usr/bin/env python3
"""Read-only Excel import. Re-run after saving an explicitly selected QA report."""
import argparse
import hashlib
import json
import re
from pathlib import Path
from collections import Counter
from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parents[2]
DEFAULT = ROOT / 'outputs/2026-11-06-new-ui-qa'
p = argparse.ArgumentParser(description=__doc__)
p.add_argument('--report', type=Path, default=DEFAULT/'EC工單系統_新版逐頁面測試執行報告_20261106_完整截圖版.xlsx')
p.add_argument('--baseline', type=Path, default=DEFAULT/'EC工單系統_新版逐頁面測試基線_v1.1.xlsx')
p.add_argument('--report-date', default='2026-11-06')
p.add_argument('--prototype-version', default='EC InfoTech 品牌版（2026-11-06 測試快照）')
p.add_argument('--prototype-entry', default='http://127.0.0.1:18917/')
p.add_argument('--prototype-evidence', default='outputs/2026-11-06-new-ui-qa/新舊原型頁面差異清單.md')
p.add_argument('--review-batch-label', default='')
p.add_argument('--review-issue-ids', nargs='*', default=[])
a = p.parse_args()
report, baseline = a.report.resolve(), a.baseline.resolve()
for f in (report, baseline):
    if not f.is_file(): raise ValueError(f'找不到來源：{f}')
    f.relative_to(ROOT)
wb, base = load_workbook(report), load_workbook(baseline)
assert wb.sheetnames == base.sheetnames, '基線與執行報告分組不同，請先核對版本'
case_re = re.compile(r'^PAGE-\d+_TC-\d+$')
sha = lambda f: hashlib.sha256(f.read_bytes()).hexdigest()
raw = {sha(f): f for f in sorted((report.parent/'screenshots').glob('*.png'))}
def rel(f): return f.relative_to(ROOT).as_posix()
def val(c): return c.value if c.value is not None else ''
def pics(ws, screenshot_col):
    rows = {}
    for im in ws._images:
        digest = hashlib.sha256(im._data()).hexdigest()
        if digest not in raw: raise ValueError(f'{ws.title} 內嵌圖無對應原始PNG')
        rows.setdefault(im.anchor._from.row+1, []).append(rel(raw[digest]))
    # Artifact-tool exports images that WPS renders correctly, but some openpyxl builds
    # do not expose those drawing objects through ws._images. Resolve the existing
    # per-row screenshot cell hyperlink/formula as a fallback; it still points to the
    # authentic PNG beside this selected report.
    for row in range(2, ws.max_row + 1):
        cell = ws.cell(row, screenshot_col)
        target = cell.hyperlink.target if cell.hyperlink else None
        value = str(cell.value or '')
        if not target:
            match = re.match(r'^=HYPERLINK\(\s*"([^"]+)"', value, re.I)
            if match: target = match.group(1)
        if target:
            candidate = (report.parent / target).resolve()
            try: candidate.relative_to(report.parent.resolve())
            except ValueError: raise ValueError(f'{ws.title}!{cell.coordinate} 截圖路徑超出報告目錄')
            if not candidate.is_file(): raise FileNotFoundError(f'{ws.title}!{cell.coordinate} 截圖不存在：{candidate}')
            path = rel(candidate)
            if path not in rows.setdefault(row, []): rows[row].append(path)
    return rows
pages=[]; ids=set(); warnings=[]
summary = {r[0]:r for r in wb.worksheets[0].iter_rows(min_row=2, values_only=True) if isinstance(r[0],str) and re.fullmatch(r'PAGE-\d+',r[0])}
fields=['id','category','item','steps','expected','actual','result','bugId','screenshotCell']
for ws in wb.worksheets[2:]:
    images=pics(ws,9); cases=[]
    for row in ws.iter_rows(min_row=2):
        if not case_re.fullmatch(str(row[0].value or '')): continue
        item=dict(zip(fields,[val(c) for c in row[:9]])); cid=item['id']
        assert cid not in ids, f'重複ID：{cid}'
        ids.add(cid)
        assert item['result'] in ('PASS','FAIL','BLOCKED','待确认','待確認','未执行','未執行'), (cid,item['result'])
        item.update(sheet=ws.title,row=row[0].row,screenshots=images.get(row[0].row,[]))
        item['baseline']=[val(c) for c in base[ws.title][row[0].row][:9]]
        assert item['baseline'][0]==cid, f'基線用例位置不同：{cid}'
        if item['result'] in ('未执行','未執行'): assert not item['screenshots'], f'未執行用例包含截圖：{cid}'
        elif not item['screenshots']: warnings.append(f'{cid}：截圖缺失')
        cases.append(item)
    pid=cases[0]['id'].split('_')[0]
    info=summary[pid]
    pages.append(dict(id=pid,name=info[1],module=info[2],sheet=ws.title,cases=cases,sourceOverview=list(info)))
base_ids={str(r[0]) for ws in base.worksheets[2:] for r in ws.iter_rows(min_row=2,values_only=True) if case_re.fullmatch(str(r[0] or ''))}
assert base_ids==ids, '基線與執行報告的用例ID集合不同'
issues=[]; ws=wb.worksheets[1]; images=pics(ws,8)
for row in ws.iter_rows(min_row=2):
    if not str(row[0].value or '').startswith('BUG-'): continue
    names=['id','pageId','pageName','caseId','description','steps','severity','screenshotCell','status','expectedActual','thumbnailCell']
    issue=dict(zip(names,[val(c) for c in row]));issue['screenshots']=images.get(row[0].row,[])
    issue.update(sheet=ws.title,row=row[0].row)
    related_case_ids=[x for x in re.split(r'[、,，;；\s]+',str(issue['caseId']).strip()) if x]
    assert related_case_ids and all(case_id in ids for case_id in related_case_ids),issue
    issue['relatedCaseIds']=related_case_ids
    issue['caseId']=related_case_ids[0]
    issues.append(issue)
assert len({i['id'] for i in issues})==len(issues), '重複問題編號'
meta=dict(schemaVersion=1,report=rel(report),baseline=rel(baseline),reportSha256=sha(report),baselineSha256=sha(baseline),
          reportDate=a.report_date,prototypeVersion=a.prototype_version,
          prototypeEvidence=a.prototype_evidence,
          prototypeEntry=a.prototype_entry,
          scope='34 個 Excel 測試分組；尚未全部核實為可達獨立頁面。此為逐頁 UI 測試紀錄，非業務整鏈驗收。',
          coverageDefinition='執行覆蓋率 = (PASS + FAIL) ÷ 全部用例；BLOCKED、待確認及未執行另列。',
          sourceNotes=[list(r) for r in wb.worksheets[0].values if r[0] and not str(r[0]).startswith('PAGE-')],
          warnings=warnings)
if a.review_batch_label or a.review_issue_ids:
    known_issue_ids={i['id'] for i in issues}
    missing_review_ids=set(a.review_issue_ids)-known_issue_ids
    if missing_review_ids: raise ValueError(f'審核批次含不存在的問題：{sorted(missing_review_ids)}')
    meta['reviewBatch']=dict(label=a.review_batch_label or '本批修改',state='待審核',issueIds=a.review_issue_ids)
data=dict(metadata=meta,pages=pages,issues=issues)
text=json.dumps(data,ensure_ascii=False,indent=2,default=str)+'\n'
(ROOT/'project-hub/data/qa-tests.json').write_text(text)
(ROOT/'project-hub/data/qa-tests.js').write_text('window.EC_QA_DATA='+text.replace('<','\\u003c')+';\n')
print(json.dumps(dict(pages=len(pages),cases=len(ids),results=Counter(c['result'] for page in pages for c in page['cases']),issues=len(issues),warnings=warnings),ensure_ascii=False))
