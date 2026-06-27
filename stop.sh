#!/bin/bash
echo "Arresto del server Python HTTP..."
if [ -f .server.pid ]; then
    PID=$(cat .server.pid)
    kill $PID > /dev/null 2>&1
    rm .server.pid
    echo "Server fermato (PID $PID)."
else
    # Fallback: cerca il processo occupando la porta 8000
    if command -v lsof &>/dev/null; then
        PID=$(lsof -t -i:8000)
        if [ ! -z "$PID" ]; then
            kill $PID
            echo "Server fermato (PID $PID)."
        else
            echo "Nessun server trovato in esecuzione sulla porta 8000."
        fi
    else
        echo "File .server.pid non trovato e 'lsof' non disponibile per cercare il processo."
    fi
fi
