$r = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
Write-Host "Status Code: $($r.StatusCode)"
Write-Host "Content Length: $($r.Content.Length)"