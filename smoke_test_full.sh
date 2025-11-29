#!/bin/bash

echo "Running FULL application smoke test..."

# Test Frontend
FRONT=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173)
# Test Backend
BACK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5001)

echo "Frontend status: $FRONT"
echo "Backend status:  $BACK"

if [ "$FRONT" -ne 200 ]; then
    echo "❌ FRONTEND FAILED"
    exit 1
fi

if [ "$BACK" -ne 200 ]; then
    echo "❌ BACKEND FAILED"
    exit 1
fi

echo "🎉 FULL APPLICATION Smoke Test PASSED!"
