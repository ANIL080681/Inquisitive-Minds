@echo off
cd /d c:\Users\NIMIT\homework-assistant
set PATH=C:\Program Files\nodejs;%PATH%
set GEMINI_API_KEY=AIzaSyDDJEvvBlRzCmuO8ZzDOfaMjpw7nyOIqyA
echo Compiling TypeScript...
call npm run build
echo Starting server...
node dist/backend/index.js
