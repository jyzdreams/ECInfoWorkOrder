"""Local static preview with deterministic, memory-only warehouse fixtures.

Never imports server.py, OpenYida, credentials, or remote services.
Use separate ports to isolate each version's browser localStorage.
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial
import argparse
import hashlib
import json


class MockHandler(SimpleHTTPRequestHandler):
    def reply(self, value):
        body = json.dumps(value, ensure_ascii=False).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-EC-Preview', 'isolated-mock')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        # Restrict the preview to its own local assets and mock APIs.
        self.send_header('Content-Security-Policy', "default-src 'self' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; font-src 'self' data:; frame-src 'self' blob:; form-action 'self'")
        super().end_headers()

    def do_GET(self):
        if self.path.split('?')[0] == '/api/warehouse-tong/products':
            self.reply({'success': True, 'products': [], 'mock': True})
        elif self.path.startswith('/api/'):
            self.send_error(404, 'Unknown mock endpoint')
        else:
            super().do_GET()

    def do_POST(self):
        if self.path != '/api/warehouse-tong/material-requests':
            self.send_error(404, 'Unknown mock endpoint')
            return
        size = int(self.headers.get('Content-Length', '0'))
        if size > 256 * 1024:
            self.send_error(413)
            return
        payload = json.loads(self.rfile.read(size) or b'{}')
        key = str(payload.get('idempotencyKey', json.dumps(payload, sort_keys=True)))
        identity = hashlib.sha256(key.encode()).hexdigest()[:12]
        self.reply({'success': True, 'mock': True, 'formInstId': 'MOCK-' + identity,
                    'mrId': 'MR-MOCK-' + identity, 'status': '申請已完成（演示）',
                    'verifiedMaterialCount': len(payload.get('materials', payload.get('items', []))),
                    'workbenchUrl': '#isolated-mock'})


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('port', nargs='?', type=int, default=18861)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent)
    args = parser.parse_args()
    print(f'Isolated MOCK preview: http://127.0.0.1:{args.port}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', args.port), partial(MockHandler, directory=str(args.root.resolve()))).serve_forever()
