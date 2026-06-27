@echo off
echo Arresto del server Python HTTP...
taskkill /FI "WINDOWTITLE eq PythonHTTPServer*" /T /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo Server fermato con successo.
