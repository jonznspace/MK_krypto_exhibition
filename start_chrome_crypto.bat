@echo off

REM Pfad zur lokalen Website
set "WEBSITE=file:///C:/Medienstation/index.html"

REM Google Chrome im Kioskmodus starten
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk "%WEBSITE%"

exit