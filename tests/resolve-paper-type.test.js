// resolvePaperTypeByMaterial 單元測試
// 測試對象是 ui-prototype/index.html 內嵌的「領取單據類型判定」函數
// 作法是從原始碼抽取函數本體後注入依賴執行，確保測的是產品程式碼本身而非複製的實作
// 執行方式：node --test tests/resolve-paper-type.test.js

const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const assert = require('node:assert');

const INDEX_HTML = path.join(__dirname, '..', 'ui-prototype', 'index.html');

// 從原始碼抽取指定具名函數：自函數宣告起做括號配對，取到配對的收尾大括號
function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}(`);
  if (start === -1) throw new Error(`原始碼中找不到函數 ${name}`);
  const bodyStart = source.indexOf('{', start);
  let depth = 0;
  for (let i = bodyStart; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`函數 ${name} 的大括號不匹配`);
}

const source = fs.readFileSync(INDEX_HTML, 'utf8');
const fnSource = extractFunction(source, 'resolvePaperTypeByMaterial');

// 以注入的 quotations / purchaseOrders 建立受測函數
function buildResolver({ quotations = [], purchaseOrders = [] } = {}) {
  const factory = new Function(
    'quotations',
    'purchaseOrders',
    `${fnSource}; return resolvePaperTypeByMaterial;`
  );
  return factory(quotations, purchaseOrders);
}

// 建立最小可用的工單物件
function makeTicket(overrides = {}) {
  return { id: 'WO-260915-001', ...overrides };
}

test('無工單（null）→ 服務報告', () => {
  const result = buildResolver()(null);
  assert.strictEqual(result.type, '服務報告');
});

test('純 CALL：無報價、無領料、無物料 → 服務報告', () => {
  const result = buildResolver()(makeTicket());
  assert.strictEqual(result.type, '服務報告');
  assert.match(result.reason, /純 CALL/);
});

test('有領料記錄（sourceMRId）→ 完工單', () => {
  const result = buildResolver()(makeTicket({ sourceMRId: 'MR-001' }));
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /領料記錄（MR）/);
});

test('任務自帶採購單（sourcePOId）→ 完工單', () => {
  const result = buildResolver()(makeTicket({ sourcePOId: 'PO-001' }));
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /採購單記錄/);
});

test('有物料明細（cpMaterials 非空）→ 完工單', () => {
  const result = buildResolver()(makeTicket({ cpMaterials: [{ name: '鏡頭', qty: 2 }] }));
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /物料明細/);
});

test('物料明細為空陣列 → 不因此判完工單', () => {
  const result = buildResolver()(makeTicket({ cpMaterials: [] }));
  assert.strictEqual(result.type, '服務報告');
});

test('報價以 ticketId 關聯本工單 → 完工單', () => {
  const resolve = buildResolver({ quotations: [{ id: 'Q-001', ticketId: 'WO-260915-001' }] });
  const result = resolve(makeTicket());
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /已關聯報價/);
});

test('報價以 sourceTicketId 關聯本工單 → 完工單', () => {
  const resolve = buildResolver({ quotations: [{ id: 'Q-002', sourceTicketId: 'WO-260915-001' }] });
  const result = resolve(makeTicket());
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /已關聯報價/);
});

test('獨立報價（工單帶 sourceQuotationId、報價無 ticketId）→ 完工單', () => {
  const resolve = buildResolver({
    quotations: [{ id: 'Q-003', ticketId: '', sourceTicketId: '' }]
  });
  const result = resolve(makeTicket({ sourceQuotationId: 'Q-003' }));
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /已關聯報價/);
});

test('關聯報價已有採購單 → 完工單（原因為採購單）', () => {
  const resolve = buildResolver({
    quotations: [{ id: 'Q-004', ticketId: 'WO-260915-001' }],
    purchaseOrders: [{ id: 'PO-004', quotationId: 'Q-004' }]
  });
  const result = resolve(makeTicket());
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /採購單記錄/);
});

test('採購單屬其他工單的報價 → 不影響本工單判定', () => {
  const resolve = buildResolver({
    quotations: [{ id: 'Q-005', ticketId: 'WO-260915-999' }],
    purchaseOrders: [{ id: 'PO-005', quotationId: 'Q-005' }]
  });
  const result = resolve(makeTicket());
  assert.strictEqual(result.type, '服務報告');
});

test('判定優先序：領料 > 採購 > 物料 > 報價', () => {
  const resolve = buildResolver({
    quotations: [{ id: 'Q-006', ticketId: 'WO-260915-001' }],
    purchaseOrders: [{ id: 'PO-006', quotationId: 'Q-006' }]
  });
  const result = resolve(makeTicket({
    sourceMRId: 'MR-006',
    sourcePOId: 'PO-006',
    cpMaterials: [{ name: '面板', qty: 1 }],
    sourceQuotationId: 'Q-006'
  }));
  assert.strictEqual(result.type, '完工單');
  assert.match(result.reason, /領料記錄（MR）/);
});

test('迴歸：報價（不關聯工單）→ 採購 → 驗收自動建任務，應判完工單', () => {
  // 修復前此情境會被誤判為服務報告：報價沒有 ticketId，舊邏輯比對不到
  const resolve = buildResolver({
    quotations: [{ id: 'Q-007', ticketId: '', sourceTicketId: '', customerName: 'ABC 公司' }],
    purchaseOrders: [{ id: 'PO-007', quotationId: 'Q-007' }]
  });
  const result = resolve(makeTicket({ sourcePOId: 'PO-007', sourceQuotationId: 'Q-007' }));
  assert.strictEqual(result.type, '完工單');
});

test('迴歸：CALL → 工單 → 報價 → 採購 → 驗收，應判完工單', () => {
  const resolve = buildResolver({
    quotations: [{ id: 'Q-008', ticketId: 'WO-260915-001' }],
    purchaseOrders: [{ id: 'PO-008', quotationId: 'Q-008' }]
  });
  const result = resolve(makeTicket());
  assert.strictEqual(result.type, '完工單');
});
