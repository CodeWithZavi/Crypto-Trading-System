@echo off
echo Starting Crypto Trading System...

start "Crypto Backend" cmd /k "cd server && npm run dev"
timeout /t 5
start "Crypto Frontend" cmd /k "cd client && npm run dev"

echo System started! Checks valid ports 5000 and 5173.
