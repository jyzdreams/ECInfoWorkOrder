import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const require=createRequire(import.meta.url);
const {loadWorkRegister,assertNoCustomerFeedback}=require('./work-register.js');
const w=loadWorkRegister(root);
// Resolve only the public package entry from the workspace runtime selected by the caller.
const runtimeRequire=process.env.EC_WORKSPACE_NODE_MODULES?createRequire(path.join(process.env.EC_WORKSPACE_NODE_MODULES,'../ec-export-loader.cjs')):require;
const {Workbook,SpreadsheetFile,FileBlob}=await import(pathToFileURL(runtimeRequire.resolve('@oai/artifact-tool')).href);
const output=path.join(root,w.clientExport.path);
try {
  await fs.access(output);
  const prior=await SpreadsheetFile.importXlsx(await FileBlob.load(output));
  assertNoCustomerFeedback(prior,w);
} catch(error) {if(error.code!=='ENOENT')throw error;}
const book=Workbook.create();
const home=book.worksheets.add('项目总览'),milestones=book.worksheets.add('业务里程碑'),questions=book.worksheets.add('客户待确认');
const ink='#263B54', pale='#EFF3F8', amber='#FFF2CC';
function base(sheet,lastCol,lastRow,widths){
 sheet.showGridLines=false;
 const r=sheet.getRange(`A1:${lastCol}${lastRow}`);
 r.format.font={name:'Arial',size:11,color:'#233247'};r.format.verticalAlignment='center';
 r.format.rowHeight=24;
 widths.forEach((width,i)=>sheet.getRangeByIndexes(0,i,lastRow,1).format.columnWidth=width);
}
function title(sheet,text,note){sheet.getRange('A2').values=[[text]];sheet.getRange('A2').format.font={name:'Arial',size:16,bold:true,color:ink};sheet.getRange('A3').values=[[note]];sheet.getRange('A3').format.font={name:'Arial',size:10,color:'#667085'};}
function header(sheet,range){const r=sheet.getRange(range);r.format.fill=ink;r.format.font={name:'Arial',size:11,bold:true,color:'#FFFFFF'};r.format.horizontalAlignment='center';r.format.rowHeight=30;}
function rows(sheet,range){sheet.getRange(range).format.wrapText=true;sheet.getRange(range).format.verticalAlignment='top';}
base(home,'D',27,[16,25,62,62]);
base(milestones,'I',15,[9,22,13,14,16,42,26,17,30]);
base(questions,'H',16,[11,73,23,38,17,15,17,22]);
title(home,'EC 业务推进与确认','2026-10-19 · 客户评审草案，尚未发出');
const summaries=[['当前阶段',w.project.stage],['当前目标','先完成内部核对与可演示流程，再集中确认需求和验收'],['本期范围',w.project.scopeApproval],['下一次交付',w.clientExport.nextDelivery]];
summaries.forEach(([label,value],i)=>{const r=i+5;home.getRange('A'+r).values=[[label]];home.mergeCells(`B${r}:D${r}`);home.getRange('B'+r).values=[[value]];home.getRange(`A${r}:D${r}`).format.rowHeight=31;});
home.getRange('A11:D12').values=[['业务批次',null,'客户待确认主题',null],['维修整链',w.project.wholeChain,'已冻结批次',w.project.frozenBatches]];
home.getRange('B11').formulas=[[`=COUNTA('业务里程碑'!A6:A${5+w.milestones.length})`]];
home.getRange('D11').formulas=[[`=COUNTA('客户待确认'!A6:A${5+w.clientQuestions.length})`]];
home.getRange('A11:D12').format.fill=pale;
home.getRange('B11:D12').format.horizontalAlignment='left';
home.getRange('A15').values=[['双方下一步']];home.getRange('A15').format.font={name:'Arial',size:13,bold:true,color:ink};
home.getRange('A17:D20').values=[['事项','责任方','要做什么','完成条件'],
 ['内部准备','项目团队','整理报价、维修、保养等业务，解决已明确的原型差异','对应岗位能完成操作和交接，明确列出未决问题'],
 ['业务核实','项目负责人协调客户岗位','按客户待确认页集中核实；已回答的基本规则不重复询问','答复包含实际做法、确认岗位和适用范围，由团队复核'],
 ['集中评审','双方业务岗位（待排期）','准备成熟后逐流程演示，再确认范围与业务规则','需求确认、原型演示与业务验收分别记录']];
header(home,'A17:D17');rows(home,'A18:D20');home.getRange('A18:D20').format.rowHeight=63;
home.mergeCells('A23:D23');home.getRange('A23').values=[['看表顺序：项目总览 → 业务里程碑 → 客户待确认。客户答复后，团队按原编号复核回填。']];
home.mergeCells('A25:D25');home.getRange('A25').values=[['依据：原业务批次及验收记录、0928/0930沟通资料、10月16日业务核对。未填写客户结论或确认日期。']];
home.getRange('A23:D25').format.font={name:'Arial',size:10,color:'#667085'};
title(milestones,'业务流程与里程碑','按原B01～B07编号；三个状态分别记录。本期范围、实际确认人及评审日期尚未确定。');
milestones.getRange(`A5:I${5+w.milestones.length}`).values=[['批次','业务流程','需求确认','原型准备','业务验收','下一交付／动作','责任方','计划评审日期','客户意见'],...w.milestones.map(m=>[m.id,m.name,m.requirementConfirmation,m.prototypeChange,m.businessAcceptance,m.next,m.owner,m.plannedFinish,m.customerFeedback])];
header(milestones,'A5:I5');rows(milestones,`A6:I${5+w.milestones.length}`);milestones.getRange(`A6:I${5+w.milestones.length}`).format.rowHeight=52;
milestones.getRange(`H6:H${5+w.milestones.length}`).setNumberFormat('yyyy-mm-dd');
milestones.getRange(`I6:I${5+w.milestones.length}`).format.fill=amber;
milestones.tables.add(`A5:I${5+w.milestones.length}`,true,'ClientMilestones').style='TableStyleLight1';milestones.freezePanes.freezeRows(5);
milestones.getRange(`A6:I${5+w.milestones.length}`).format.fill='#FFFFFF';
milestones.getRange(`I6:I${5+w.milestones.length}`).format.fill=amber;
title(questions,'客户待确认问题',`当前准备核实${w.clientQuestions.length}个主题，未发出。黄色区域供填写，团队复核后才更新正式结论。`);
questions.getRange(`A5:H${5+w.clientQuestions.length}`).values=[['问题编号','需要确认的问题与已有信息','影响业务','客户回复／选择','确认结论','确认人','确认日期','反馈状态'],...w.clientQuestions.map(q=>[q.id,`${q.topic}\n${q.question}\n已有信息：${q.known}\n建议：${q.suggestion}`,q.impact,q.customerResponse,q.decision,q.confirmedBy,q.confirmedAt,null])];
header(questions,'A5:H5');rows(questions,`A6:H${5+w.clientQuestions.length}`);questions.getRange(`A6:H${5+w.clientQuestions.length}`).format.rowHeight=104;
questions.getRange(`D6:G${5+w.clientQuestions.length}`).format.fill=amber;
questions.getRange(`E6:E${5+w.clientQuestions.length}`).dataValidation={rule:{type:'list',values:['同意建议','选择其他方案','待讨论','暂缓']}};
questions.getRange(`G6:G${5+w.clientQuestions.length}`).setNumberFormat('yyyy-mm-dd');
for(let r=6;r<6+w.clientQuestions.length;r++)questions.getRange('H'+r).formulas=[[`=IF(D${r}="","待回复",IF(AND(E${r}<>"",F${r}<>"",G${r}<>""),"待团队复核","待补确认信息"))`]];
questions.tables.add(`A5:H${5+w.clientQuestions.length}`,true,'ClientQuestions').style='TableStyleLight1';questions.freezePanes.freezeRows(5);questions.freezePanes.freezeColumns(2);
questions.getRange(`A6:H${5+w.clientQuestions.length}`).format.fill='#FFFFFF';
questions.getRange(`D6:G${5+w.clientQuestions.length}`).format.fill=amber;
// Verify response workflow without treating a filled row as an approved business rule.
const originalResponse=questions.getRange('D6:G6').values;
questions.getRange('D6:G6').values=[['临时验证回复','','',null]];book.recalculate();
if(questions.getRange('H6').values[0][0]!=='待补确认信息')throw new Error('Missing signoff must remain visible');
questions.getRange('E6:G6').values=[['待讨论','临时验证人',new Date('2026-10-19T00:00:00Z')]];book.recalculate();
if(questions.getRange('H6').values[0][0]!=='待团队复核')throw new Error('Do not auto approve client response');
questions.getRange('D6:G6').values=originalResponse;
book.recalculate();
if(JSON.stringify(questions.getRange('D6:G6').values)!==JSON.stringify(originalResponse))throw new Error('Temporary response not restored');
if(home.getRange('B11').values[0][0]!==w.milestones.length||home.getRange('D11').values[0][0]!==w.clientQuestions.length)throw new Error('Summary count mismatch');
const errors=await book.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME[?]',options:{useRegex:true,maxResults:10},maxChars:1000});
console.log(errors.ndjson);
const previewDir=process.env.EC_PREVIEW_DIR;
if(previewDir){await fs.mkdir(previewDir,{recursive:true});for(const [sheetName,range,name] of [['项目总览','A1:D26','client-home'],['业务里程碑','A1:I13','client-milestones'],['客户待确认','A1:H9','client-questions'],['客户待确认','A10:H13','client-questions-bottom']]){const b=await book.render({sheetName,range,scale:1,format:'png'});await fs.writeFile(path.join(previewDir,name+'.png'),new Uint8Array(await b.arrayBuffer()));}}
await fs.mkdir(path.dirname(output),{recursive:true});await(await SpreadsheetFile.exportXlsx(book)).save(output);
if(previewDir){try{await fs.rename(output+'.inspect.ndjson',path.join(previewDir,'client-export.inspect.ndjson'));}catch(e){if(e.code!=='ENOENT')throw e;}await fs.writeFile(path.join(previewDir,'client-export-source.json'),JSON.stringify({sourcePath:w.sourcePath,sourceHash:w.sourceHash,revision:w.revision,output:w.clientExport.path,milestones:7,questions:8},null,2));}
console.log('Client workbook exported: 3 sheets, 7 original milestones, 8 customer topics; response fields blank.');
