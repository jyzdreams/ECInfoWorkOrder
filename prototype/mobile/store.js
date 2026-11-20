export const KEY='ecinfo_mobile_review_v1';
export const LINK_KEY='ecinfo_mobile_link';
export const roles={MASTER:['師傅','周師傅'],CS:['CS','陳小姐'],CR:['CR','何關係'],TL:['主管','李組長'],QUO:['報價組','鄒組長'],TENDER:['標書組','郭標書'],WAREHOUSE:['倉庫（邊界）','外部系統'],PUR:['採購','張採購'],FIN:['財務','陳會計'],ADMIN:['管理員','林主管'],BOSS:['管理層','黃老闆']};
export const access={MASTER:['tasks','reports','materials'],CS:['calls','tasks','dispatch','reports'],CR:['calls','tasks','dispatch','reports','quotes','materials'],TL:['calls','tasks','dispatch','reports','approvals'],QUO:['quotes'],TENDER:['quotes','tender'],WAREHOUSE:['warehouse'],PUR:['materials'],FIN:['finance'],ADMIN:['calls','tasks','dispatch','reports','quotes','materials','finance','tender'],BOSS:['calls','tasks','dispatch','reports','quotes','materials','finance','tender']};
export const modules={tasks:['現場任務','task'],calls:['CALL 跟進','phone'],dispatch:['派工排期','calendar'],reports:['SR / CP','file'],approvals:['主管待辦','check'],quotes:['報價查閱','file'],materials:['材料記錄','box'],finance:['財務資料','file'],tender:['標書','file'],warehouse:['倉庫通邊界','box']};
export let db, initial, storageProblem='', linkMode=localStorage.getItem(LINK_KEY)==='1';
const PC_TICKETS='ecinfo_tickets',PC_CUSTOMERS='ecinfo_customers',PC_QUOTATIONS='ecinfo_quotations';
const readJSON=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key)||'null');return value??fallback;}catch{return fallback;}};
export const isLinkMode=()=>linkMode;
const PC_ROLE_MAP={MASTER:'MASTER',CS:'CS',CR:'CR',TL:'TL',QUO:'QUO',TENDER:'TENDER',PUR:'PUR',FIN:'FIN',ADMIN:'ADMIN',BOSS:'BOSS'};
export const MOBILE_ROLES=['MASTER','TL','CR'];
// 評審身份清單：以 PC 用戶管理（ecinfo_users）為準，按部門分類，補上固定演示身份作保底
const IDENTITY_GROUPS={TL:[1,1],MASTER:[1,2],CS:[2,1],CR:[2,2],QUO:[3,1],TENDER:[3,2],PUR:[4,1],FIN:[4,2],ADMIN:[5,1],BOSS:[5,2],WAREHOUSE:[6,1]};
export function identityOptions(){
  const seen=new Set(),options=[];
  let pcUsers=[];
  try{pcUsers=JSON.parse(localStorage.getItem('ecinfo_users')||'[]');}catch{}
  (Array.isArray(pcUsers)?pcUsers:[]).filter(u=>['啓用','启用'].includes(u.status)&&PC_ROLE_MAP[u.role]&&MOBILE_ROLES.includes(PC_ROLE_MAP[u.role])).forEach(u=>{
    const role=PC_ROLE_MAP[u.role],person=String(u.name||'').trim();
    if(!person)return;
    const key=role+'::'+person;
    if(seen.has(key))return;
    seen.add(key);
    const [groupOrder,roleOrder]=IDENTITY_GROUPS[role]||[9,9];
    options.push({role,person,area:u.area||'',groupOrder,roleOrder});
  });
  Object.entries(roles).forEach(([role,value])=>{
    if(!MOBILE_ROLES.includes(role))return;
    const key=role+'::'+value[1];
    if(seen.has(key))return;
    seen.add(key);
    const [groupOrder,roleOrder]=IDENTITY_GROUPS[role]||[9,9];
    options.push({role,person:value[1],groupOrder,roleOrder,demo:true});
  });
  return options.sort((a,b)=>a.groupOrder-b.groupOrder||a.roleOrder-b.roleOrder||String(a.person).localeCompare(String(b.person),'zh-Hant'));
}
export function setIdentity(role,person){
  if(!roles[role]||!person)return;
  roles[role][1]=person;
  if(!db.persons||typeof db.persons!=='object')db.persons={};
  db.persons[role]=person;
}
export function setLinkMode(on){linkMode=Boolean(on);try{localStorage.setItem(LINK_KEY,linkMode?'1':'0');}catch{}return linkMode;}
const LINK_SCENARIO='聯調模式：工單資料來自 PC，操作會寫回 PC；照片、簽名與草稿只保存在手機端。';
function quotationFor(t,quotations){return quotations.find(q=>q.id===t.quotationId||q.id===t.sourceQuotationId||q.ticketId===t.id||q.sourceTicketId===t.id||q.generatedTicketId===t.id)||null;}
function categoryFor(t,customer,quotation){
  if(['M','P','M+P'].includes(quotation?.category))return quotation.category;
  if(['M','P','M+P'].includes(customer?.businessCategory))return customer.businessCategory;
  const contract=String(customer?.contractNo||'');
  if(contract.includes('M+P'))return 'M+P';
  if(/M/.test(contract))return 'M';
  return 'P';
}
function mapPcTicket(t,ctx,overlay){
  const customer=ctx.customers.find(c=>c.id===t.customerId)||ctx.customers.find(c=>c.nameZh===t.customer);
  const quotation=quotationFor(t,ctx.quotations);
  const category=categoryFor(t,customer,quotation);
  const mapped={...t,
    category,
    contractNo:customer?.contractNo||'',
    scenario:LINK_SCENARIO,
    schedule:t.scheduleDate?`${t.scheduleDate}T10:00`:'',
    reportKind:category.startsWith('M')?'SR':'CP',
    submitted:Boolean(t.cpNo||t.serviceReportNo||t.submitted),
    invoiceStatus:t.invoiceStatus||'未核對',
    paymentStatus:t.paymentStatus||'未核對',
    phaseReady:t.status==='待分派'
  };
  // 手機端獨有欄位（現場表單、照片、簽名）在重新同步時保留
  const keep=['arrivedAt','report','submitted','completedWork','faultResult','transportFee','beforeServicePhotos','afterServicePhotos','cpNo','cpSignature','cpSourceImage','cpStatus','cpSubmittedAt','srSystems','srObjectives','signature','schedule'];
  if(overlay)keep.forEach(key=>{if(overlay[key]!==undefined&&mapped[key]===undefined)mapped[key]=overlay[key];});
  if(overlay?.report&&!mapped.report)mapped.report=overlay.report;
  return mapped;
}
function linkContext(){return {customers:readJSON(PC_CUSTOMERS,[]),quotations:readJSON(PC_QUOTATIONS,[])};}
function applyLinkTickets(){
  const ctx=linkContext();
  const previous=Array.isArray(db?.tickets)?db.tickets:[];
  const pcTickets=readJSON(PC_TICKETS,[]);
  db.tickets=pcTickets.map(t=>mapPcTicket(t,ctx,previous.find(x=>x.id===t.id)));
  db.quotes=readJSON(PC_QUOTATIONS,[]).map(q=>({id:q.id,customerName:q.customerName,status:q.status,revision:q.revision,owner:q.owner,category:q.category,totalAmount:q.totalAmount,items:q.items||[]}));
}
export async function load(){
  const response=await fetch('fixtures.json');
  if(!response.ok)throw Error('資料讀取失敗');
  initial=await response.json();
  let saved;
  try{saved=JSON.parse(localStorage.getItem(KEY));}catch{storageProblem='本機資料無法讀取，已載入演示初始資料。';}
  const savedRole=saved?.role in roles?saved.role:'MASTER';
  if(saved?.version===1&&saved.link===linkMode){
    db=structuredClone(saved);
    db.role=savedRole;
  }else{
    // 切換模式時只保留角色／消息／草稿，工單回到目前模式的資料源
    db={...structuredClone(initial),version:1,role:savedRole,messages:saved?.messages||[],drafts:saved?.drafts||{},callNotes:saved?.callNotes||{},quoteRequests:saved?.quoteRequests||[]};
  }
  if(!(db.role in roles)||!MOBILE_ROLES.includes(db.role))db.role='MASTER';
  if(db.persons&&typeof db.persons==='object')Object.keys(db.persons).forEach(role=>{if(roles[role]&&db.persons[role])roles[role][1]=db.persons[role];});
  if(linkMode)applyLinkTickets();
}
function syncDirtyToPC(){
  const pc=readJSON(PC_TICKETS,null);
  if(!Array.isArray(pc))return;
  let changed=false;
  db.tickets.filter(t=>t.__dirty).forEach(t=>{
    const target=pc.find(x=>x.id===t.id);
    if(!target)return;
    ['status','master','tl','records','updatedAt','cpNo','serviceReportNo','serviceDate','completedWork','faultResult','transportFee','arrivedAt','confirmedAt','confirmedBy','submitted','cpCompletionDate'].forEach(key=>{if(t[key]!==undefined)target[key]=t[key];});
    if(t.schedule)target.scheduleDate=String(t.schedule).slice(0,10);
    changed=true;
    delete t.__dirty;
  });
  if(changed){try{localStorage.setItem(PC_TICKETS,JSON.stringify(pc));}catch{storageProblem='寫回 PC 工單失敗：本機儲存空間不足或瀏覽器禁止儲存。';}}
}
export function save(){
  if(linkMode)syncDirtyToPC();
  const tickets=db.tickets.map(t=>{const{__dirty,...rest}=t;return rest;});
  try{localStorage.setItem(KEY,JSON.stringify({...db,tickets,link:linkMode}));storageProblem='';return true;}catch{storageProblem='本機儲存空間不足或瀏覽器禁止儲存。資料尚在本頁，請勿重新整理。';return false;}
}
export function reloadFromPC(){if(!linkMode)return false;applyLinkTickets();return true;}
export function reset(){
  if(linkMode){Object.assign(db,{messages:[],drafts:{},callNotes:{},quoteRequests:[]});applyLinkTickets();save();return;}
  Object.assign(db,structuredClone(initial),{version:1,role:db.role,messages:[],drafts:{},callNotes:{},quoteRequests:[]});save();
}
export const visible=()=>db.tickets.filter(t=>db.role==='MASTER'?t.master===roles.MASTER[1]:db.role==='TL'?t.tl===roles.TL[1]:true);
export const allowed=m=>['home','me','messages'].includes(m)||access[db.role].includes(m);
export const editable=t=>db.role==='MASTER'&&t.master===roles.MASTER[1]&&['待處理','處理中'].includes(t.status);
export function log(t,text){t.records.push({time:new Date().toLocaleString('zh-HK'),actor:roles[db.role][1],text});t.__dirty=true;db.messages.unshift({text:`${t.id}：${text}`,read:false});save();}
