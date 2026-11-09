import { esc } from './ui.js';

// A single anchored popup for every ordinary choice. It never opens a Sheet.
class SelectOverlay {
  constructor() {
    document.addEventListener('pointerdown', e => {
      if (this.popup && !this.popup.contains(e.target) && !this.config.anchor.contains(e.target)) this.close(false);
    }, true);
    document.addEventListener('keydown', e => {
      if (!this.popup) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); this.close(); }
      else if (e.key === 'Tab') this.close(false);
      else if (['ArrowDown','ArrowUp','Enter','Home','End'].includes(e.key) && !e.target.closest('.select-actions')) {
        e.preventDefault(); e.stopImmediatePropagation();
        const rows=[...this.popup.querySelectorAll('[data-choice]:not(:disabled)')];
        if (!rows.length) return;
        const previous=rows.findIndex(r=>r.dataset.active==='true');
        let i=previous<0?0:previous;
        if(e.key==='ArrowDown')i=(previous+1)%rows.length;
        if(e.key==='ArrowUp')i=(previous<=0?rows.length:previous)-1;
        if(e.key==='Home')i=0;if(e.key==='End')i=rows.length-1;
        rows.forEach((r,n)=>r.dataset.active=String(n===i));
        rows[i].scrollIntoView({block:'nearest'});
        this.config.anchor.setAttribute('aria-activedescendant',rows[i].id);
        if(e.key==='Enter')rows[i].click();
      }
    }, true);
    window.addEventListener('resize',()=>this.position());
    window.visualViewport?.addEventListener('resize',()=>this.position());
    document.addEventListener('scroll',e=>{if(this.popup&&!this.popup.contains(e.target))this.position();},true);
  }
  open(config) {
    if(this.popup&&this.config.anchor===config.anchor){this.close();return;}
    this.close(false);this.config=config;
    this.pending=new Set(config.multiple?(config.value||[]):[config.value]);
    this.popup=document.createElement('div');this.popup.className='select-popover';
    this.popup.dataset.sheetControl='select';
    this.popup.innerHTML=`${config.searchable||config.options.length>=8?'<div class="select-search"><input type="search" aria-label="搜尋選項" placeholder="搜尋選項" autocomplete="off"></div>':''}<div class="select-options" role="listbox" id="global-select-options" aria-label="${esc(config.label||'選項')}" ${config.multiple?'aria-multiselectable="true"':''}></div>${config.multiple?'<div class="select-actions"><button type="button" data-select-clear>清空</button><span class="select-count"></span><button type="button" class="primary" data-select-apply>確認</button></div>':''}`;
    // Inside a dialog, use a sibling of the scrolling body to avoid clipping and inert.
    this.parent=config.anchor.closest('.bottom-sheet')||document.body;
    this.parent.append(this.popup);
    config.anchor.setAttribute('aria-expanded','true');
    config.anchor.setAttribute('aria-controls','global-select-options');
    this.popup.querySelector('input')?.addEventListener('input',e=>{e.stopPropagation();this.rows(e.target.value);});
    this.popup.querySelector('[data-select-clear]')?.addEventListener('click',()=>{this.pending.clear();this.rows(this.popup.querySelector('input')?.value||'');});
    this.popup.querySelector('[data-select-apply]')?.addEventListener('click',()=>{const values=config.options.filter(o=>this.pending.has(o.value)).map(o=>o.value);this.close();config.onChange(values);});
    this.rows('');this.position();
    (this.popup.querySelector('input')||this.popup.querySelector('[aria-selected=true]')||this.popup.querySelector('[data-choice]:not(:disabled)'))?.focus({preventScroll:true});
  }
  rows(query) {
    const {config}=this;
    const options=config.options.map((o,i)=>({...o,index:i})).filter(o=>o.label.toLowerCase().includes(query.toLowerCase()));
    this.popup.querySelector('.select-options').innerHTML=options.length?options.map(o=>`<button type="button" role="option" class="select-option" id="select-option-${o.index}" data-choice="${o.index}" data-value="${esc(o.value)}" aria-selected="${this.pending.has(o.value)}" data-active="${!config.multiple&&this.pending.has(o.value)}" ${o.disabled?'disabled aria-disabled="true"':''}><span>${config.multiple?`<span class="select-checkbox" aria-hidden="true">${this.pending.has(o.value)?'✓':''}</span>`:''}${esc(o.label)}</span><span aria-hidden="true">${!config.multiple&&this.pending.has(o.value)?'✓':''}</span></button>`).join(''):'<div class="select-empty" role="status">沒有符合的選項</div>';
    this.popup.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{
      const option=config.options[Number(b.dataset.choice)];
      if(config.multiple){this.pending.has(option.value)?this.pending.delete(option.value):this.pending.add(option.value);this.rows(query);}
      else{this.close();config.onChange(option.value);}
    });
    const count=this.popup.querySelector('.select-count');if(count)count.textContent=`已選 ${this.pending.size} 項`;
    this.position();
  }
  position() {
    if(!this.popup)return;
    const {anchor}=this.config;if(!anchor.isConnected){this.close(false);return;}
    const a=anchor.getBoundingClientRect(),view=window.visualViewport;
    const top=view?.offsetTop||0,height=view?.height||innerHeight,width=view?.width||innerWidth;
    if(a.bottom<top||a.top>top+height){this.close(false);return;}
    const search=this.popup.querySelector('.select-search')?52:0,actions=this.config.multiple?52:0;
    const below=top+height-a.bottom-12,above=a.top-top-12;
    const up=below<180&&above>below;
    const space=Math.max(70,up?above:below);
    const rows=Math.min(260,Math.max(40,space-search-actions-10));
    this.popup.querySelector('.select-options').style.maxHeight=rows+'px';
    const w=Math.min(Math.max(a.width,220),width-24);
    this.popup.style.width=w+'px';
    const h=this.popup.getBoundingClientRect().height;
    const x=Math.max(12,Math.min(a.left,width-w-12));
    const y=Math.max(top+8,Math.min(up?a.top-h-5:a.bottom+5,top+height-h-8));
    const parent=this.parent===document.body?{left:0,top:0}:this.parent.getBoundingClientRect();
    Object.assign(this.popup.style,{position:this.parent===document.body?'fixed':'absolute',left:(x-parent.left)+'px',top:(y-parent.top)+'px'});
    this.popup.dataset.direction=up?'up':'down';
  }
  close(focus=true) {
    if(!this.popup)return;
    const anchor=this.config.anchor;
    this.popup.remove();this.popup=null;
    anchor.setAttribute('aria-expanded','false');anchor.removeAttribute('aria-activedescendant');
    if(focus&&anchor.isConnected)anchor.focus({preventScroll:true});
  }
}
export const selectOverlay=new SelectOverlay();
export class SingleSelect {
  constructor(config){this.config={...config,multiple:false};}
  open(){selectOverlay.open(this.config);}
}
export class SearchableSelect extends SingleSelect {
  constructor(config){super({...config,searchable:true});}
}
export class MultiSelect extends SingleSelect {
  constructor(config){super(config);this.config.multiple=true;}
}
export class FilterDropdown extends SingleSelect {
  static fields(value){const f=normalizeFilter(value);return `<div class="filter-fields"><label>業務分類<select data-filter-field="category">${['全部','P','M','M+P'].map(v=>`<option ${f.category===v?'selected':''}>${v}</option>`).join('')}</select></label><label>工單狀態<select data-filter-field="status">${['全部','待確認','處理中','已完成'].map(v=>`<option ${f.status===v?'selected':''}>${v}</option>`).join('')}</select></label></div><button type="button" class="filter-clear" data-ui="clear-filters">清除篩選</button>`;}
}
export function normalizeFilter(value){return typeof value==='object'&&value?{category:value.category||'全部',status:value.status||'全部'}:{category:['P','M','M+P'].includes(value)?value:'全部',status:['待確認','處理中','已完成'].includes(value)?value:'全部'};}
export class DateRangePicker {
  constructor({element,value={},onChange=()=>{}}){this.element=element;this.onChange=onChange;element.innerHTML=`<div class="date-range"><label>開始日期<input type="date" data-range="start" value="${esc(value.start||'')}"></label><label>結束日期<input type="date" data-range="end" value="${esc(value.end||'')}"></label></div><p class="error" role="alert"></p>`;element.addEventListener('change',()=>this.update());}
  update(){const start=this.element.querySelector('[data-range=start]').value,end=this.element.querySelector('[data-range=end]').value;const error=start&&end&&start>end?'結束日期不可早於開始日期':'';this.element.querySelector('[role=alert]').textContent=error;if(!error)this.onChange({start,end});}
  clear(){this.element.querySelectorAll('input').forEach(i=>i.value='');this.update();}
}
export function enhanceSelects(root=document){root.querySelectorAll('select:not([data-sheet-control])').forEach((control,i)=>{
  if(control.dataset.picker)return;
  control.dataset.picker='select-'+i+'-'+Date.now();control.classList.add('picker-native');control.tabIndex=-1;control.setAttribute('aria-hidden','true');
  const b=document.createElement('button');b.type='button';b.className='picker-trigger compact-select';b.dataset.pickerFor=control.dataset.picker;
  const label=control.closest('label')?.childNodes[0]?.textContent.trim()||'選擇';
  Object.assign(b,{disabled:control.disabled});b.setAttribute('aria-label',label);b.setAttribute('role','combobox');b.setAttribute('aria-haspopup','listbox');b.setAttribute('aria-expanded','false');
  const refresh=()=>{b.innerHTML=`<span>${esc(control.multiple?`已選 ${control.selectedOptions.length} 項`:control.selectedOptions[0]?.textContent||'請選擇')}</span><span aria-hidden="true">⌄</span>`;};refresh();control.after(b);
  b.onclick=()=>{const config={anchor:b,label,value:control.multiple?[...control.selectedOptions].map(o=>o.value):control.value,options:[...control.options].map(o=>({value:o.value,label:o.text,disabled:o.disabled})),onChange:value=>{if(control.multiple)[...control.options].forEach(o=>o.selected=value.includes(o.value));else control.value=value;refresh();control.dispatchEvent(new Event('input',{bubbles:true}));control.dispatchEvent(new Event('change',{bubbles:true}));}};new (control.multiple?MultiSelect:control.dataset.filterField?FilterDropdown:SingleSelect)(config).open();};
  control.addEventListener('change',refresh);control.addEventListener('invalid',e=>{e.preventDefault();b.focus();});
});}
