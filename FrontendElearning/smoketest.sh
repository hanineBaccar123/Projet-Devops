@echo off
echo Testing FRONTEND...

for /f %%i in ('curl -s -o NUL -w "%%{http_code}" http://localhost:5173') do set FRONT=%%i

echo Frontend status: %FRONT%

if NOT "%FRONT%"=="200" (
    echo ❌ FRONTEND FAILED
    exit /b 1
)

echo ✅ FRONTEND PASSED
