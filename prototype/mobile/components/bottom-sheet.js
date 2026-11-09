import { esc } from './ui.js';

// One modal surface for details, short forms, pickers and confirmations.
// Child views retain the parent's live DOM; no nested dialogs or masks.
export class BottomSheet {
  constructor({ onClose }) {
    this.onClose = onClose;
    this.frames = [];
    this.host = document.createElement('div');
    this.host.className = 'sheet-layer';
    this.host.hidden = true;
    this.host.innerHTML = `<div class="sheet-mask"></div><section class="bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabindex="-1"><div class="sheet-grip" aria-label="向上拖動展開，向下拖動關閉"><span></span></div><div class="sheet-heading"><button type="button" class="sheet-back" aria-label="返回上一層">‹</button><h2 id="sheet-title"></h2><button type="button" class="sheet-expand" aria-label="展開彈框">↕</button><button type="button" class="sheet-close" aria-label="關閉彈框">×</button></div><div class="sheet-body"></div><footer class="sheet-footer"></footer></section>`;
    document.body.append(this.host);
    this.panel = this.host.querySelector('.bottom-sheet');
    this.body = this.host.querySelector('.sheet-body');
    this.footer = this.host.querySelector('.sheet-footer');
    this.host.querySelector('.sheet-mask').onclick = () => this.close();
    this.host.querySelector('.sheet-close').onclick = () => this.close();
    this.host.querySelector('.sheet-back').onclick = () => this.back();
    this.host.querySelector('.sheet-expand').onclick = () => this.expand();
    this.host.addEventListener('input', e => { if (!e.target.closest('[data-sheet-control]')) this.dirty = true; });
    document.addEventListener('keydown', e => {
      if (!this.active) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); this.back(); }
      if (e.key === 'Tab') {
        const nodes = [...this.panel.querySelectorAll('button:not(:disabled),a,input,select,textarea,[tabindex="0"]')].filter(n => n.getClientRects().length);
        const first = nodes[0], last = nodes.at(-1);
        if (e.shiftKey && (document.activeElement === first || document.activeElement === this.panel)) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }, true);
    const grip = this.host.querySelector('.sheet-grip');
    grip.onpointerdown = e => { this.drag = { y: e.clientY, height: this.panel.getBoundingClientRect().height }; grip.setPointerCapture(e.pointerId); this.panel.classList.add('dragging'); };
    grip.onpointermove = e => { if (!this.drag) return; const delta = e.clientY - this.drag.y; this.panel.style.height = `${Math.max(180, Math.min(innerHeight * .96, this.drag.height - delta))}px`; };
    const release = e => { if (!this.drag) return; const delta = e.clientY - this.drag.y; this.drag = null; this.panel.classList.remove('dragging'); this.panel.style.height = ''; if (delta > 110) this.close(); else if (delta < -40) this.expand(true); else if (delta > 40) this.expand(false); };
    grip.onpointerup = release;
    grip.onpointercancel = () => { this.drag = null; this.panel.style.height = ''; this.panel.classList.remove('dragging'); };
  }
  get active() { return !this.host.hidden; }
  lock() {
    this.scrollY = window.scrollY;
    this.returnFocus = document.activeElement;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.querySelector('#app').inert = true;
  }
  open({ title, html, footer = '', kind = 'detail', guard = true, nested = false }) {
    if (!this.active) { this.lock(); this.host.hidden = false; }
    if (nested) {
      if (this.frames.length >= 3) return false;
      const content = document.createDocumentFragment(), actions = document.createDocumentFragment();
      content.append(...this.body.childNodes); actions.append(...this.footer.childNodes);
      this.frames.push({ content, actions, title: this.title, kind: this.kind, dirty: this.dirty, guard: this.guard, scroll: this.body.scrollTop, focus: document.activeElement });
    } else this.frames = [];
    this.title = title; this.kind = kind; this.guard = guard; this.dirty = false;
    this.host.querySelector('#sheet-title').textContent = title;
    this.host.querySelector('.sheet-back').hidden = !this.frames.length;
    this.panel.dataset.kind = kind;
    this.body.innerHTML = html;
    this.footer.innerHTML = footer;
    this.footer.hidden = !footer;
    this.body.scrollTop = 0;
    this.panel.focus({ preventScroll: true });
    return true;
  }
  restore() {
    const frame = this.frames.pop();
    if (!frame) return this.close();
    this.body.replaceChildren(frame.content); this.footer.replaceChildren(frame.actions);
    Object.assign(this, { title: frame.title, kind: frame.kind, dirty: frame.dirty, guard: frame.guard });
    this.host.querySelector('#sheet-title').textContent = frame.title;
    this.host.querySelector('.sheet-back').hidden = !this.frames.length;
    this.panel.dataset.kind = frame.kind;
    this.footer.hidden = !this.footer.childNodes.length;
    this.body.scrollTop = frame.scroll;
    if (frame.focus?.isConnected) frame.focus.focus({ preventScroll: true });
    else this.panel.focus({ preventScroll: true });
  }
  ask(title, text, choices = [['leave','離開'],['stay','繼續編輯']]) {
    if (this.pending) return Promise.resolve('stay');
    const nested = this.active;
    return new Promise(resolve => {
      this.pending = resolve;
      this.open({ title, html: `<p>${esc(text)}</p>`, kind: 'confirm', guard: false, nested,
        footer: choices.map(([key,label]) => `<button type="button" class="${key==='stay'?'secondary':'primary'}" data-sheet-answer="${key}">${esc(label)}</button>`).join('') });
      this.host.querySelectorAll('[data-sheet-answer]').forEach(b => b.onclick = e => { e.stopPropagation(); this.answer(b.dataset.sheetAnswer); });
    });
  }
  answer(value) {
    const resolve = this.pending; this.pending = null;
    if (this.frames.length) this.restore(); else this.hide();
    resolve?.(value);
  }
  async mayLeave() {
    if (!this.active || !this.dirty || !this.guard) return true;
    return await this.ask('離開未儲存內容？', '目前修改尚未儲存。離開將放棄本次未儲存內容。') === 'leave';
  }
  async back() { if (this.pending) return this.answer('stay'); if (this.frames.length) { if (await this.mayLeave()) this.restore(); } else this.close(); }
  async close() {
    if (this.pending) return this.answer('stay');
    if (!await this.mayLeave()) return;
    if (this.frames.length) { this.restore(); return; }
    this.onClose?.();
  }
  expand(value) {
    const expanded = typeof value === 'boolean' ? value : !this.panel.classList.contains('expanded');
    this.panel.classList.toggle('expanded', expanded);
    this.host.querySelector('.sheet-expand').setAttribute('aria-label', expanded ? '收起彈框' : '展開彈框');
  }
  hide() {
    if (!this.active) return;
    if (this.pending) { const resolve=this.pending; this.pending=null; resolve('stay'); }
    this.host.hidden = true; this.frames = []; this.dirty = false;
    this.panel.classList.remove('expanded');
    document.body.style.position = ''; document.body.style.top = ''; document.body.style.width = '';
    document.querySelector('#app').inert = false;
    window.scrollTo(0, this.scrollY || 0);
    if (this.returnFocus?.isConnected) this.returnFocus.focus({ preventScroll: true });
  }
}
