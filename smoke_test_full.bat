@echo off
echo Testing BACKEND...

for /f %%i in ('curl -s -o NUL -w "%%{http_code}" http://localhost:5001') do set BACK=%%i

echo Backend status: %BACK%

if NOT "%BACK%"=="200" (
    echo BACKEND FAILED
    exit /b 1
)

echo  BACKEND PASSED
