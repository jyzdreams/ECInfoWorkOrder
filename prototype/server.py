import http.server
import json
import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path
from urllib.parse import urlparse


APP_TYPE = "APP_RGMX9WOCVWT4XNZC1CQD"
FORM_UUID = "FORM-FF9A60A90BD2454CBD0234703EA3462A3DDK"
WORKBENCH_URL = (
    "https://uqdvn6.aliwork.com/APP_RGMX9WOCVWT4XNZC1CQD/"
    "workbench?viewUuid=VIEW-D3669005E3934F4F80AC42309F1C2B1C"
)
REPO_ROOT = Path(__file__).resolve().parent.parent
PROTOTYPE_ROOT = Path(__file__).resolve().parent
MAX_REQUEST_BYTES = 256 * 1024
ANSI_RE = re.compile(r"\x1b\[[0-9;]*m")


def _resolve_node():
    candidates = [
        os.environ.get("OPENYIDA_NODE_BIN"),
        str(Path.home() / ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"),
        shutil.which("node"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            return candidate
    raise RuntimeError("找不到可用的 Node.js；请设置 OPENYIDA_NODE_BIN")


def _resolve_cli():
    configured = os.environ.get("OPENYIDA_CLI_PATH")
    if configured and Path(configured).is_file():
        return configured
    executable = shutil.which("openyida")
    if executable:
        resolved = Path(executable).resolve()
        if resolved.is_file():
            return str(resolved)
    fallback = Path("/opt/homebrew/lib/node_modules/openyida/bin/yida.js")
    if fallback.is_file():
        return str(fallback)
    raise RuntimeError("找不到 OpenYida CLI；请设置 OPENYIDA_CLI_PATH")


def _last_json_object(output):
    clean = ANSI_RE.sub("", output).strip()
    decoder = json.JSONDecoder()
    candidate = None
    for index, character in enumerate(clean):
        if character != "{":
            continue
        try:
            value, _ = decoder.raw_decode(clean[index:])
        except json.JSONDecodeError:
            continue
        if isinstance(value, dict) and "success" in value:
            candidate = value
            break
    if candidate is not None:
        return candidate
    raise RuntimeError("OpenYida 返回内容无法解析")


def _run_openyida(arguments):
    result = subprocess.run(
        [_resolve_node(), _resolve_cli(), *arguments],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        timeout=45,
        check=False,
    )
    combined = "\n".join(part for part in (result.stdout, result.stderr) if part)
    if result.returncode != 0:
        raise RuntimeError(f"OpenYida 调用失败（{result.returncode}）")
    response = _last_json_object(combined)
    if not response.get("success"):
        raise RuntimeError(response.get("errorMsg") or "OpenYida 返回失败")
    return response


def _query_by_mr_number(mr_number):
    search = [{
        "key": "textField_mt84dlj5",
        "value": mr_number,
        "type": "TEXT",
        "operator": "eq",
    }]
    response = _run_openyida([
        "data", "query", "form", APP_TYPE, FORM_UUID,
        "--page", "1", "--size", "20",
        "--search-json", json.dumps(search, ensure_ascii=False),
    ])
    return response.get("data") or []


def _number(value, default=0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _build_yida_record(payload):
    mr_number = str(payload.get("sourceRecordId") or "").strip()
    quotation_id = str(payload.get("quotationId") or "").strip()
    revision = payload.get("quotationRevision", 0)
    lines = []
    for index, material in enumerate(payload.get("materials") or [], start=1):
        quantity = _number(material.get("quantity"))
        unit_price = _number(material.get("unitPrice"))
        amount = _number(material.get("amount"), quantity * unit_price)
        lines.append({
            "textField_mtgp1s29": str(material.get("name") or "演示材料"),
            "textField_mt82hr88": str(material.get("code") or f"DEMO-{quotation_id}-{index}"),
            "numberField_mt82hr8b": quantity,
            "textField_mt84dlj4": str(material.get("unit") or "件"),
            "textField_mt82hr89": str(material.get("specification") or ""),
            "textField_mt84dlj3": str(material.get("category") or "演示材料"),
            "textField_mtgm2fgt": str(material.get("brand") or "Demo"),
            "numberField_mtgm2fgu": unit_price,
            "numberField_mtgm2fgx": amount,
            "textareaField_mtgm2fh3": f"【演示资料】来源报价 {quotation_id} R{revision}",
        })
    customer = str(payload.get("customerName") or "未指定场地")
    if "演示" not in customer:
        customer = f"{customer}（演示）"
    return {
        "textField_mt84dlj5": mr_number,
        "textField_2xpc2qtt5": customer,
        "numberField_2xpd4aqt2": _number(payload.get("contractTotal")),
        "dateField_2xpd8psik": int(time.time() * 1000),
        "textareaField_2xpc330r7": f"【演示】EC 工单报价 {quotation_id} 中单后自动同步",
        "textField_lcmq1gy22": quotation_id,
        "tableField_mt82hr87": lines,
    }


def _sync_material_request(payload):
    mr_number = str(payload.get("sourceRecordId") or "").strip()
    quotation_id = str(payload.get("quotationId") or "").strip()
    materials = payload.get("materials")
    if not mr_number.startswith("MR-DEMO-"):
        raise ValueError("演示代理只允许写入 MR-DEMO-* 记录")
    if not quotation_id:
        raise ValueError("缺少来源报价单号")
    if not isinstance(materials, list) or not materials:
        raise ValueError("至少需要一条物料明细")

    records = _query_by_mr_number(mr_number)
    status = "existing"
    if not records:
        create_response = _run_openyida([
            "data", "create", "form", APP_TYPE, FORM_UUID,
            "--data-json", json.dumps(_build_yida_record(payload), ensure_ascii=False),
        ])
        status = "created"
        records = _query_by_mr_number(mr_number)
        if not records:
            raise RuntimeError("宜搭创建成功后按 MR 号码回查不到记录，请到仓库通核对")
        create_data = create_response.get("data")
        if isinstance(create_data, dict) and create_data.get("formInstId"):
            records[0].setdefault("formInstId", create_data["formInstId"])

    record = records[0]
    form_data = record.get("formData") or {}
    if form_data.get("textField_mt84dlj5") != mr_number:
        raise RuntimeError("宜搭回查记录与本次 MR 号码不一致")
    return {
        "success": True,
        "status": status,
        "mrId": mr_number,
        "formInstId": record.get("formInstId"),
        "appType": APP_TYPE,
        "formUuid": FORM_UUID,
        "workbenchUrl": WORKBENCH_URL,
        "verifiedMaterialCount": len(form_data.get("tableField_mt82hr87") or []),
    }


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def _json_response(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlparse(self.path).path == "/api/warehouse-tong/health":
            self._json_response(200, {
                "success": True,
                "mode": "REAL_DEMO",
                "appType": APP_TYPE,
                "formUuid": FORM_UUID,
            })
            return
        super().do_GET()

    def do_POST(self):
        if urlparse(self.path).path != "/api/warehouse-tong/material-requests":
            self._json_response(404, {"success": False, "message": "Not found"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_REQUEST_BYTES:
                raise ValueError("请求体为空或超过 256 KB")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(payload, dict):
                raise ValueError("请求体必须是 JSON 对象")
            self._json_response(200, _sync_material_request(payload))
        except ValueError as error:
            self._json_response(400, {"success": False, "message": str(error)})
        except subprocess.TimeoutExpired:
            self._json_response(504, {"success": False, "message": "宜搭请求超时"})
        except Exception as error:
            self.log_error("Warehouse Tong sync failed: %s", error)
            self._json_response(502, {"success": False, "message": str(error)})


os.chdir(PROTOTYPE_ROOT)
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
http.server.ThreadingHTTPServer(("localhost", port), NoCacheHandler).serve_forever()
