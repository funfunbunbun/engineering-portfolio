param([switch]$Preview, [ValidateSet('portfolio','pwm','plc')][string]$Demo = 'portfolio')
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
if (Test-Path -LiteralPath '.tools\node-path.txt') {
    $runtimePath = (Get-Content -LiteralPath '.tools\node-path.txt' -Raw).Trim()
    if (Test-Path -LiteralPath (Join-Path $runtimePath 'node.exe')) { $env:PATH = "$runtimePath;$env:PATH" }
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Node.js is required. Install a supported Node.js LTS release and reopen your terminal.' }
if ($Demo -eq 'pwm') { & node (Join-Path $PSScriptRoot 'projects\fpga-pwm-fan-controller\serve.mjs'); exit $LASTEXITCODE }
if ($Demo -eq 'plc') { & node (Join-Path $PSScriptRoot 'projects\plc-hmi-sorting-machine\serve.mjs'); exit $LASTEXITCODE }
if (-not (Test-Path -LiteralPath 'node_modules')) { & npm.cmd ci; if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed' } }
if ($Preview) { & npm.cmd run preview } else { & npm.cmd run dev }
