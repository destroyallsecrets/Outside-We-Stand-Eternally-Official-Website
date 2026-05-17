$ErrorActionPreference = "SilentlyContinue"

# Kill any existing processes on port 3000
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { 
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue 
}

# Wait a moment
Start-Sleep -Seconds 1

# Start vite dev server
$Process = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "F:\Outside-We-Stand-Eternally-Official-Website" -NoNewWindow -PassThru

# Wait for server to be ready
Start-Sleep -Seconds 5

# Open browser
Start-Process "chrome.exe" -ArgumentList "http://localhost:3000"

Write-Host "Server should be running at http://localhost:3000"
Write-Host "If page is blank, press F12 to check console for errors"