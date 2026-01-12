@echo off
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%
set GEMINI_API_KEY=AIzaSyDDJEvvBlRzCmuO8ZzDOfaMjpw7nyOIqyA
echo.
echo ========================================
echo   HOMEWORK ASSISTANT SERVER
echo ========================================
echo.
echo Starting server...
echo.
node dist/backend/index.js
pause
