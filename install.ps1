# Windows PowerShell install script for URL Shortener
# Usage: Right-click -> Run with PowerShell OR run: powershell -ExecutionPolicy Bypass -File .\install.ps1

function Ensure-Command($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Write-Error "'$name' is not installed or not on PATH. Please install it and retry." -ErrorAction Stop
  }
}

Write-Host "Checking prerequisites..." -ForegroundColor Cyan
Ensure-Command node
Ensure-Command npm

Write-Host "\nInstalling root/backend dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed at project root" -ErrorAction Stop }

Write-Host "\nInstalling frontend dependencies..." -ForegroundColor Cyan
Push-Location frontend
npm install
$code = $LASTEXITCODE
Pop-Location
if ($code -ne 0) { Write-Error "npm install failed in frontend" -ErrorAction Stop }

Write-Host "\nAll dependencies installed successfully." -ForegroundColor Green
Write-Host "\nNext steps:" -ForegroundColor Yellow
Write-Host "  1) Start MongoDB locally (e.g., 'net start MongoDB' if installed as a service)"
Write-Host "  2) In one terminal: node backend/server.js (runs API at http://localhost:3000)"
Write-Host "  3) In another terminal: cd frontend; npm start (runs UI at http://localhost:3001 if 3000 is busy)"
