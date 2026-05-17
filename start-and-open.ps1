# Start dev server and wait for it
$ErrorActionPreference = "Stop"

Write-Host "Starting Vite dev server..."

$proc = Start-Process -FilePath "node" -ArgumentList "node_modules/vite/bin/vite.js", "--port", "3000", "--host" -WorkingDirectory "F:\Outside-We-Stand-Eternally-Official-Website" -PassThru -NoNewWindow

# Wait for server to be ready
Start-Sleep -Seconds 5

# Check if running
if ($proc -and -not $proc.HasExited) {
    Write-Host "Server running at http://localhost:3000"
    
    # Try to open browser
    try {
        Start-Process "chrome.exe" -ArgumentList "http://localhost:3000" -ErrorAction Stop
        Write-Host "Browser opened"
    } catch {
        Write-Host "Could not open Chrome automatically"
        Write-Host "Please manually open: http://localhost:3000"
    }
} else {
    Write-Host "Server failed to start"
    exit 1
}

# Keep running
Write-Host "Press Ctrl+C to stop..."
while ($true) { Start-Sleep -Seconds 10 }