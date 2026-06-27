@echo off
echo Avvio del server Python HTTP su http://localhost:8000...
start "PythonHTTPServer" /min python -m http.server 8000
echo Server avviato! Apri http://localhost:8000 nel tuo browser.
