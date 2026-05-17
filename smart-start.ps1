# More robust startup script
$ErrorActionPreference = "Stop"

Write-Host "Starting Vite dev server..."
cd "F:\Outside-We-Stand-Eternally-Official-Website"

# Kill any existing node processes on port 3000
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { 
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue 
}
Start-Sleep -Seconds 1

# Start the server
$serverJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    & node node_modules/vite/bin/vite.js --port 3000 --host
} -ArgumentList "F:\Outside-We-Stand-Eternally-Official-Website"

# Wait for server
Start-Sleep -Seconds 5

# Check if server is responding
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host "Server responding with status: $($response.StatusCode)"
} catch {
    Write-Host "Server may not be ready yet"
}

# Try different browsers
$browsers = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Mozilla Firefox\firefox.exe"
)

$browserOpened = $false
foreach ($browser in $browsers) {
    if (Test-Path $browser) {
        Write-Host "Opening with: $browser"
        try {
            Start-Process -FilePath $browser -ArgumentList "http://localhost:3000","--new-window" -ErrorAction Stop
            $browserOpened = $true
            break
        } catch {
            Write-Host "Could not open: $browser"
        }
    }
}

if (-not $browserOpened) {
    Write-Host ""
    Write-Host "====================================="
    Write-Host "SERVER IS RUNNING!"
    Write-Host "Please open your browser manually:"
    Write-Host "http://localhost:3000"
    Write-Host "====================================="
    Write-Host ""
}

# Wait and keep checking
while ($true) {
    Start-Sleep -Seconds 5
    $conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $conn) {
        Write-Host "Server stopped. Exiting."
        break
    }
}