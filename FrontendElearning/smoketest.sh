#!/bin/bash

echo "Testing frontend..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173)

if [ "$FRONTEND_STATUS" -ne 200 ]; then
    echo "Frontend smoke test FAILED ❌ (status: $FRONTEND_STATUS)"
    exit 1
else
    echo "Frontend smoke test PASSED ✅"
fi