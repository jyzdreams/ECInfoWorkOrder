﻿# mr-bridge 啟動腳本：解密 DPAPI 憑據 → 注入環境變數 → 啟動服務
#
# 憑據來源：config.secret.enc（用 Windows DPAPI / CurrentUser 加密，只有本機當前 Windows 用戶能解開）
# 憑據只在記憶體與子進程環境變數中存在，不落明文檔案。
#
# 用法：powershell -ExecutionPolicy Bypass -File mr-bridge\start.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Security

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$secretFile = Join-Path $root 'config.secret.enc'

if (-not (Test-Path $secretFile)) {
  throw "找不到加密憑據檔：$secretFile（請先產生後再啟動）"
}

# 解密（只有本機當前 Windows 用戶可解）
$encryptedBytes = [Convert]::FromBase64String((Get-Content $secretFile -Raw).Trim())
$plainJson = [Text.Encoding]::UTF8.GetString(
  [Security.Cryptography.ProtectedData]::Unprotect($encryptedBytes, $null, 'CurrentUser')
)
$secrets = $plainJson | ConvertFrom-Json

# 注入環境變數（不寫入任何檔案；子進程 node 繼承）
$env:MR_BRIDGE_MODE = 'openapi'
$env:MR_BRIDGE_APP_KEY = $secrets.appKey
$env:MR_BRIDGE_APP_SECRET = $secrets.appSecret
$env:MR_BRIDGE_SYSTEM_TOKEN = $secrets.systemToken
if ($secrets.defaultUserId) { $env:MR_BRIDGE_USER_ID = $secrets.defaultUserId }

Write-Host '[mr-bridge] 憑據已解密並注入環境變數（來源：DPAPI 加密檔，未落明文）'
Write-Host "[mr-bridge] 啟動模式：$($env:MR_BRIDGE_MODE)"

node (Join-Path $root 'src\server.js')
