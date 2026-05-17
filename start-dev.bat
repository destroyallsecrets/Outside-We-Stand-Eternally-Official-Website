@echo off
cd /d F:\Outside-We-Stand-Eternally-Official-Website
start "Vite Server" cmd /c "npx vite preview --port 3000 --host"
timeout /t 3 /nobreak >nul
start http://localhost:3000