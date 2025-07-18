@echo off
echo Building static site...

:: Create public directory
if exist public rmdir public /s /q
mkdir public

:: Copy main files
copy index.html public\index.html
copy styles.css public\styles.css  
copy script.js public\script.js

:: Copy assets
if exist assets (
    mkdir public\assets
    xcopy assets public\assets\ /E /Q
)

echo Build completed successfully!
