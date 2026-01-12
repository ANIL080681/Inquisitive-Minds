@echo off
cd /d c:\Users\NIMIT\homework-assistant
set PATH=C:\Program Files\nodejs;%PATH%
echo Compiling frontend server...
call npm run build
echo Starting frontend server...
node dist/backend/frontendServer.js
