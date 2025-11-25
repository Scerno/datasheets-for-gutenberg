@echo off
REM -----------------------------------------
REM Datasheets for Gutenberg build + package
REM -----------------------------------------

REM Switch to the drive and directory where this .bat file is located
%~d0
cd "%~p0"

REM Run build
echo Building Gutenberg blocks...
call npm run build

REM Define plugin name and output file
set PLUGIN_NAME=datasheets-for-gutenberg
set ZIP_NAME=%PLUGIN_NAME%.zip

REM Define temporary staging folder
set STAGE=dist
set TEMP_ROOT=%TEMP%\%PLUGIN_NAME%

REM Clean up any previous build folder or zip
if exist "%STAGE%" rmdir /s /q "%STAGE%"
if exist "%ZIP_NAME%" del "%ZIP_NAME%"
if exist "%TEMP_ROOT%" rmdir /s /q "%TEMP_ROOT%"

REM Create staging and temp structure
mkdir "%STAGE%"
mkdir "%TEMP_ROOT%"
mkdir "%TEMP_ROOT%\%PLUGIN_NAME%"

REM Copy essential plugin files and folders into proper folder tree
echo Copying plugin files...
xcopy /E /I /Y build "%TEMP_ROOT%\%PLUGIN_NAME%\build" >nul
xcopy /E /I /Y includes "%TEMP_ROOT%\%PLUGIN_NAME%\includes" >nul
xcopy /E /I /Y languages "%TEMP_ROOT%\%PLUGIN_NAME%\languages" >nul 2>&1
copy datasheets-for-gutenberg.php "%TEMP_ROOT%\%PLUGIN_NAME%\" >nul
copy package.json "%TEMP_ROOT%\%PLUGIN_NAME%\" >nul 2>&1
copy readme.txt "%TEMP_ROOT%\%PLUGIN_NAME%\" >nul 2>&1

REM Remove dev-only files if accidentally included
if exist "%TEMP_ROOT%\%PLUGIN_NAME%\node_modules" rmdir /s /q "%TEMP_ROOT%\%PLUGIN_NAME%\node_modules"
if exist "%TEMP_ROOT%\%PLUGIN_NAME%\src" rmdir /s /q "%TEMP_ROOT%\%PLUGIN_NAME%\src"

REM Create zip using 7-Zip
echo Creating zip file...
"C:\Program Files\7-Zip\7z.exe" a -r "%ZIP_NAME%" "%TEMP_ROOT%\%PLUGIN_NAME%" >nul

REM Clean up staging and temp folders
rmdir /s /q "%STAGE%"
rmdir /s /q "%TEMP_ROOT%"

echo.
echo ✅ Build and packaging complete!
echo Created: %ZIP_NAME%
pause
