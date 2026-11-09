export const KEY='ecinfo_mobile_review_v1';
export const roles={MASTER:['師傅','周師傅'],CS:['CS','陳小姐'],CR:['CR','何關係'],TL:['主管','李組長'],QUO:['報價組','鄒組長'],TENDER:['標書組','郭標書'],WAREHOUSE:['倉庫（邊界）','外部系統'],PUR:['採購','張採購'],FIN:['財務','陳會計'],ADMIN:['管理員','林主管']};
export const access={MASTER:['tasks','reports','materials'],CS:['calls','tasks','dispatch','reports'],CR:['calls','tasks','dispatch','reports','quotes','materials'],TL:['calls','tasks','dispatch','reports','approvals'],QUO:['quotes'],TENDER:['quotes','tender'],WAREHOUSE:['warehouse'],PUR:['materials'],FIN:['finance'],ADMIN:['calls','tasks','dispatch','reports','quotes','materials','finance','tender']};
export const modules={tasks:['現場任務','task'],calls:['CALL 跟進','phone'],dispatch:['派工排期','calendar'],reports:['SR / CP','file'],approvals:['主管待辦','check'],quotes:['報價查閱','file'],materials:['材料記錄','box'],finance:['財務資料','file'],tender:['標書','file'],warehouse:['倉庫通邊界','box']};
export let db, initial, storageProblem='';
export async function load(){const r=await fetch('fixtures.json');if(!r.ok)throw Error('資料讀取失敗');initial=await r.json();let saved;try{saved=JSON.parse(localStorage.getItem(KEY));}catch{storageProblem='本機資料無法讀取，已載入演示初始資料。';}db=saved?.version===1&&Array.isArray(saved.tickets)&&saved.role in roles?saved:{...structuredClone(initial),version:1,role:'MASTER',messages:[],drafts:{},callNotes:{},quoteRequests:[]};}
export function save(){try{localStorage.setItem(KEY,JSON.stringify(db));storageProblem='';return true;}catch{storageProblem='本機儲存空間不足或瀏覽器禁止儲存。資料尚在本頁，請勿重新整理。';return false;}}
export function reset(){Object.assign(db,structuredClone(initial),{version:1,role:db.role,messages:[],drafts:{},callNotes:{},quoteRequests:[]});save();}
export const visible=()=>db.tickets.filter(t=>db.role==='MASTER'?t.master===roles.MASTER[1]:db.role==='TL'?t.tl===roles.TL[1]:true);
export const allowed=m=>['home','me','messages'].includes(m)||access[db.role].includes(m);
export const editable=t=>db.role==='MASTER'&&t.master===roles.MASTER[1]&&['待處理','處理中'].includes(t.status);
export function log(t,text){t.records.push({time:new Date().toLocaleString('zh-HK'),actor:roles[db.role][1],text});db.messages.unshift({text:`${t.id}：${text}`,read:false});save();}
