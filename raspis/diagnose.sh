#!/bin/bash
# Sammelt alle Infos zum Kiosk und schreibt sie neben dieses Script (USB-Stick).
# Benutzung:  bash /media/admin/*/diagnose.sh
OUT="$(cd "$(dirname "$0")" && pwd)/diagnose-$(hostname).txt"

sec() { echo; echo "===================== $1"; }
show() { [ -e "$1" ] && { echo "--- $1"; cat "$1"; } ; }

{
sec "Allgemein"
date; hostname; uptime
grep PRETTY /etc/os-release
echo "User: $(id -un)  Session: ${XDG_SESSION_TYPE:-?}  Desktop: ${XDG_CURRENT_DESKTOP:-?}"
ls /usr/bin/labwc /usr/bin/wayfire /usr/bin/startlxde-pi 2>/dev/null
command -v chromium chromium-browser python3
chromium --version 2>/dev/null || chromium-browser --version 2>/dev/null
echo "Modell: $(tr -d '\0' < /proc/device-tree/model 2>/dev/null)"
free -m
echo "Stromversorgung/Temperatur: $(vcgencmd get_throttled 2>/dev/null) $(vcgencmd measure_temp 2>/dev/null)"
echo "Grafik-Variante: $(cat ~/kiosk/gpu-mode 2>/dev/null || echo 0)"
journalctl -k -b --no-pager 2>/dev/null | grep -iE 'oom|killed process|under-?voltage|segfault' | tail -n 15

sec "Laufende Prozesse (Browser/Kiosk/Python/Autostart)"
ps -eo pid,ppid,etime,args | grep -iE 'chrom|kiosk|helper|python|autostart|labwc|wayfire|lxsession|\.sh' | grep -v grep | cut -c1-400

sec "Kiosk-Logs"
ls -la ~/kiosk 2>&1
show ~/kiosk/start.log
show ~/kiosk/helper.log
show ~/kiosk/start.sh
tail -n 30 ~/.xsession-errors 2>/dev/null

sec "Kiosk-Website (Zugangsdaten werden in dieser Datei durch *** ersetzt)"
KURL="$(cat ~/kiosk/url.txt 2>/dev/null)"
[ -z "$KURL" ] && KURL="$(sed -n 's/^URL="\(.*\)"$/\1/p' ~/kiosk/start.sh 2>/dev/null | head -n1)"
if [ -z "$KURL" ]; then
    echo "keine URL gefunden"
else
    echo "URL: $KURL"
    NOLOGIN="$(printf '%s' "$KURL" | sed -E 's#://[^/[:space:]]*@#://#')"
    if [ "$NOLOGIN" = "$KURL" ]; then
        echo "Zugangsdaten in der URL: nein"
        case "$KURL" in *@*) echo "ACHTUNG: @ gefunden, aber nicht vor dem ersten / -> Sonderzeichen (/ ? #) im Passwort?" ;; esac
    else
        echo "Zugangsdaten in der URL: ja"
        LOGIN="${KURL#*://}"; LOGIN="${LOGIN%@*}"
        case "$LOGIN" in
            *:*) ;;
            *) echo "ACHTUNG: kein ':' zwischen Benutzer und Passwort" ;;
        esac
        case "$LOGIN" in
            *[\$\`\"\\\#\?/@\ ]*) echo "ACHTUNG: Benutzer/Passwort enthaelt Sonderzeichen, die in einer URL kodiert sein muessen (z.B. @ -> %40, # -> %23)" ;;
            *) echo "Sonderzeichen in Benutzer/Passwort: unauffaellig" ;;
        esac
        echo "-- Abruf OHNE Zugangsdaten (erwartet: 401 + www-authenticate: Basic):"
        curl -s -o /dev/null -D - --max-time 10 "$NOLOGIN" | tr -d '\r' | grep -iE '^(HTTP|www-authenticate|location|content-type)' || echo "keine Antwort"
    fi
    echo "-- Abruf wie im Kiosk (erwartet: HTTP 200):"
    TMP="$(mktemp)"
    curl -s -L -o "$TMP" -w "HTTP %{http_code}, %{size_download} Bytes, %{content_type}, %{time_total}s, Weiterleitungen: %{num_redirects}\n" --max-time 15 "$KURL" || echo "curl-Fehler $?"
    echo "Titel: $(grep -o -m1 '<title>[^<]*' "$TMP" | sed 's/<title>//')"
    echo "script-Tags: $(grep -o '<script' "$TMP" | wc -l)   iframes: $(grep -o '<iframe' "$TMP" | wc -l)"
    rm -f "$TMP"
fi

sec "Chromium DevTools (Port 9222)"
curl -s --max-time 3 http://127.0.0.1:9222/json || echo "NICHT ERREICHBAR"

sec "Autostart-Dateien"
ls -la ~/.config/autostart 2>&1
for f in ~/.config/autostart/*.desktop; do show "$f"; done
show ~/.config/labwc/autostart
show /etc/xdg/labwc/autostart
show ~/.config/wayfire.ini
show /etc/xdg/lxsession/LXDE-pi/autostart
show ~/.config/lxsession/LXDE-pi/autostart
show /etc/rc.local
ls -la /etc/xdg/autostart

sec "Wo steht sonst noch chromium/kiosk drin?"
grep -rIilE 'chromium|kiosk' ~/.config ~/.bashrc ~/.profile ~/.bash_profile ~/*.sh \
    /etc/xdg /etc/systemd /etc/rc.local /etc/profile.d /etc/lightdm 2>/dev/null \
    --exclude-dir=chromium --exclude-dir=profile --exclude-dir=Default | head -50

sec "crontab / systemd"
crontab -l 2>&1
systemctl --user list-units --all 2>/dev/null | grep -iE 'kiosk|chrom'
systemctl list-units --all 2>/dev/null | grep -iE 'kiosk|chrom'

sec "Home-Verzeichnis"
ls -la ~

sec "Netz / Zeit"
timedatectl
ip -4 addr | grep inet
ip route
curl -s -o /dev/null -w "HTTP %{http_code} in %{time_total}s\n" --max-time 10 https://mempool.space/ || echo "Website nicht erreichbar"
} 2>&1 | sed -E 's#(https?://)[^[:space:]"]*@#\1***:***@#g' > "$OUT"

echo "Fertig. Gespeichert in: $OUT"
