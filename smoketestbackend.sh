#!/bin/bash

echo "Testing backend..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5001)

if [ "$BACKEND_STATUS" -ne 200 ]; then
    echo "Backend smoke test FAILED ❌ (status: $BACKEND_STATUS)"
    exit 1
else
    echo "Backend smoke test PASSED ✅"
fi
