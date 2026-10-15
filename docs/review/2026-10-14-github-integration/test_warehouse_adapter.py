"""Offline adapter tests: compile declarations only; never start server or run OpenYida."""
import ast
import json
import os
from pathlib import Path
import tempfile
import types
import unittest
from unittest.mock import patch

source = Path(os.environ.get('EC_SERVER_SOURCE', 'prototype/server.py'))
tree = ast.parse(source.read_text())
tree.body = [n for n in tree.body if isinstance(n, (ast.Import, ast.ImportFrom, ast.Assign, ast.FunctionDef, ast.ClassDef))]
adapter = types.ModuleType('ec_adapter')
adapter.__file__ = str(source.resolve())
exec(compile(tree, str(source), 'exec'), adapter.__dict__)

class WarehouseAdapterTest(unittest.TestCase):
    def payload(self):
        return {'sourceRecordId': 'MR-DEMO-TEST', 'quotationId': 'TEST-Q', 'materials': [
            {'name': '測試電源', 'code': 'CODE-001', 'quantity': 2, 'unitPrice': 5}]}

    def test_products_parse_string_and_skip_missing_code(self):
        record = {'formInstId': 'P1', 'instValue': json.dumps([
            {'fieldId': adapter.PRODUCT_FIELD_CODE, 'fieldData': {'value': 'CODE-001'}},
            {'fieldId': adapter.PRODUCT_FIELD_NAME, 'fieldData': {'value': '測試電源'}}])}
        with patch.object(adapter, '_run_openyida', return_value={'data': [record, {'instValue': []}]}) as cli:
            products = adapter._list_products()
        self.assertEqual([(p['code'], p['name']) for p in products], [('CODE-001', '測試電源')])
        self.assertIn('query', cli.call_args.args[0])

    def test_material_association_uses_code_not_name_and_caches(self):
        payload = self.payload(); payload['materials'] *= 2
        with patch.object(adapter, '_material_name_association', return_value=[{'instanceId': 'PRICE1'}]) as lookup:
            record = adapter._build_yida_record(payload)
        lookup.assert_called_once_with('CODE-001')
        self.assertEqual(len(record['tableField_mt82hr87']), 2)
        self.assertEqual(record['tableField_mt82hr87'][0][adapter.MR_FIELD_MATERIAL_NAME][0]['instanceId'], 'PRICE1')

    def test_missing_price_keeps_other_material_fields(self):
        with patch.object(adapter, '_material_name_association', return_value=None):
            line = adapter._build_yida_record(self.payload())['tableField_mt82hr87'][0]
        self.assertNotIn(adapter.MR_FIELD_MATERIAL_NAME, line)
        self.assertEqual(line['numberField_mt82hr8b'], 2)
        self.assertEqual(line['textField_mt82hr88'], 'CODE-001')

    def test_price_error_does_not_discard_line(self):
        with patch.object(adapter, '_material_name_association', side_effect=RuntimeError('MOCK lookup failed')):
            self.assertEqual(len(adapter._build_yida_record(self.payload())['tableField_mt82hr87']), 1)

    def test_retry_existing_record_does_not_create(self):
        record = {'formInstId': 'EXISTING', 'formData': {'textField_mt84dlj5': 'MR-DEMO-TEST', 'tableField_mt82hr87': [{}]}}
        with patch.object(adapter, '_query_by_mr_number', return_value=[record]), patch.object(adapter, '_run_openyida') as cli:
            result = adapter._sync_material_request(self.payload())
        cli.assert_not_called()
        self.assertEqual(result['status'], 'existing')

    def test_non_demo_number_rejected_before_cli(self):
        payload = self.payload(); payload['sourceRecordId'] = 'MR-PRODUCTION'
        with patch.object(adapter, '_run_openyida') as cli, self.assertRaises(ValueError):
            adapter._sync_material_request(payload)
        cli.assert_not_called()

    def test_windows_wrapper_resolves_javascript_entry(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d); wrapper = root / 'openyida.CMD'; wrapper.write_text('MOCK')
            entry = root / 'node_modules/openyida/bin/yida.js'; entry.parent.mkdir(parents=True); entry.write_text('MOCK')
            with patch.object(adapter.shutil, 'which', return_value=str(wrapper)), patch.dict(os.environ, {'OPENYIDA_CLI_PATH': str(wrapper)}):
                self.assertEqual(Path(adapter._resolve_cli()).resolve(), entry.resolve())

    def test_missing_windows_wrapper_is_not_executed_by_node(self):
        with tempfile.TemporaryDirectory() as d:
            wrapper = Path(d) / 'openyida.CMD'; wrapper.write_text('MOCK')
            with patch.object(adapter.shutil, 'which', return_value=str(wrapper)), patch.dict(os.environ, {'OPENYIDA_CLI_PATH': str(wrapper)}):
                try:
                    resolved = adapter._resolve_cli()
                except RuntimeError:
                    return  # No other installed CLI is also a valid outcome.
            self.assertNotIn(Path(resolved).suffix.lower(), {'.cmd', '.bat', '.ps1'})

if __name__ == '__main__':
    unittest.main()
