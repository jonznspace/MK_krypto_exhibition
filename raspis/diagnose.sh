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

sec "Laufende Prozesse (Browser/Kiosk/Python/Autostart)"
ps -eo pid,ppid,etime,args | grep -iE 'chrom|kiosk|helper|python|autostart|labwc|wayfire|lxsession|\.sh' | grep -v grep | cut -c1-400

sec "Kiosk-Logs"
ls -la ~/kiosk 2>&1
show ~/kiosk/start.log
show ~/kiosk/helper.log
show ~/kiosk/start.sh

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
} > "$OUT" 2>&1

echo "Fertig. Gespeichert in: $OUT"
