@echo off
cd /d "%~dp0"
echo ===================================================
echo    Bangaaramuuuu Birthday Surprise Website
echo ===================================================
echo.
echo 1. Starting local server...
echo 2. Opening your browser at http://localhost:8000 ...
echo.
start "" "http://localhost:8000"
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Notice: Python server exited or was not found.
    echo Opening index.html directly in your default browser...
    start "" "index.html"
)
pause
