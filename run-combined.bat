@echo off
echo Building Homework Assistant...
echo.

echo [1/3] Installing dependencies...
call npm install
echo.

echo [2/3] Building backend...
call npm run build:backend
echo.

echo [3/3] Building frontend...
call npm run build:frontend
echo.

echo ✅ Build complete!
echo.
echo Starting combined server...
call npm start
