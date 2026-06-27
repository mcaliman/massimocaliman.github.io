#!/bin/bash
echo "Avvio del server Python HTTP su http://localhost:8000..."
# Cerca python3 o python
if command -v python3 &>/dev/null; then
    python3 -m http.server 8000 > /dev/null 2>&1 &
    PID=$!
elif command -v python &>/dev/null; then
    python -m http.server 8000 > /dev/null 2>&1 &
    PID=$!
else
    echo "Errore: Python non è installato."
    exit 1
fi

echo $PID > .server.pid
echo "Server avviato con PID $PID! Apri http://localhost:8000 nel tuo browser."
