#!/bin/bash
# Schaltet den Google-Uebersetzer in Chromium dauerhaft ab (kein Symbol, keine Meldung).
# Aendert sonst nichts am Kiosk - Seite, Zoom usw. bleiben wie sie sind.
# Benutzung (als normaler User, NICHT mit sudo):
#     bash /media/$USER/*/uebersetzer-aus.sh
# Danach: sudo reboot

# 1) Richtlinie fuer Chromium (gilt fuer jedes Profil, auch nach neuem Einrichten)
for d in /etc/chromium /etc/chromium-browser; do
    [ -d "$d" ] || [ "$d" = /etc/chromium ] || continue
    sudo mkdir -p "$d/policies/managed"
    if echo '{ "TranslateEnabled": false }' | sudo tee "$d/policies/managed/kiosk.json" >/dev/null; then
        echo "Richtlinie geschrieben: $d/policies/managed/kiosk.json"
    else
        echo "FEHLER: konnte Richtlinie in $d nicht schreiben"
    fi
done

# 2) Zusaetzlich im Startscript des Kiosks abschalten
S="$HOME/kiosk/start.sh"
if [ ! -f "$S" ]; then
    echo "Hinweis: $S gibt es nicht (Kiosk noch nicht eingerichtet?)"
elif grep -q -- '--disable-features=Translate' "$S"; then
    echo "Startscript: war schon eingetragen"
else
    sed -i 's/--no-first-run/--no-first-run --disable-features=Translate,TranslateUI/' "$S"
    if grep -q -- '--disable-features=Translate' "$S"; then
        echo "Startscript: eingetragen"
    else
        echo "FEHLER: konnte $S nicht aendern"
    fi
fi

sync
echo
echo "Fertig. Jetzt neu starten:  sudo reboot"
