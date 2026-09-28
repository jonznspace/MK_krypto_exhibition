#!/bin/bash
# ============================================================
#  kiosk-setup.sh  -  EIN Script fuer alle Raspberries
#
#  1. raeumt alle alten Kiosk/Chromium-Autostarts weg
#     (nichts wird geloescht, alles landet in ~/kiosk-backup-DATUM)
#  2. richtet EINEN sauberen Autostart ein:
#     Chromium im Vollbild, ohne Scrollbalken und ohne Maus
#
#  Benutzung (auf dem Pi, als normaler User - NICHT mit sudo):
#     bash kiosk-setup.sh https://mempool.space/de/mempool-block/0
#
#  Optional Zoom (z.B. 80%):
#     bash kiosk-setup.sh https://timechainmap.com/map/ 0.8
#
#  Optional ein paar Pixel runterscrollen (3. Wert, Zoom dann 1 = normal):
#     bash kiosk-setup.sh https://timechainmap.com/map/ 1 150
# ============================================================
set -u

URL="${1:-}"
ZOOM="${2:-1}"
SCROLL="${3:-0}"

if [ -z "$URL" ]; then
    echo "FEHLER: Keine URL angegeben."
    echo "Beispiel: bash $0 https://mempool.space/de/mempool-block/0"
    exit 1
fi
ZOOM="${ZOOM/,/.}"   # 0,8 -> 0.8
case "$ZOOM" in
    ''|*[!0-9.]*|*.*.*|.) echo "FEHLER: Zoom muss eine Zahl sein, z.B. 0.8 (= 80 %)"; exit 1 ;;
esac
case "$SCROLL" in
    ''|*[!0-9]*) echo "FEHLER: Scroll-Wert muss eine Zahl sein (Pixel), z.B. 150"; exit 1 ;;
esac
if [ "$(id -u)" = "0" ]; then
    echo "FEHLER: Bitte NICHT mit sudo starten, sondern als normaler User (z.B. admin)."
    exit 1
fi

# Ausgabe zusaetzlich als Log neben das Script (z.B. auf den USB-Stick) schreiben
LOGFILE="$(cd "$(dirname "$0")" && pwd)/setup-log-$(hostname).txt"
exec > >(tee "$LOGFILE") 2>&1

H="$HOME"
BACKUP="$H/kiosk-backup-$(date +%Y%m%d-%H%M%S)"
PATTERN='chromium|kiosk|scrollbar'
mkdir -p "$BACKUP"

echo "=============================================="
echo " Kiosk-Setup auf $(hostname)"
echo " URL:  $URL"
echo " Zoom: $ZOOM"
echo " Runterscrollen: $SCROLL Pixel"
echo " Backup alter Dateien: $BACKUP"
echo "=============================================="

# ------------------------------------------------------------
# 0. Laufende Browser/Kiosk-Scripte beenden
# ------------------------------------------------------------
pkill -f '/kiosk\.sh|kiosk/start\.sh|kiosk/helper\.py' 2>/dev/null
pkill -f chromium 2>/dev/null
sleep 1

# Hilfsfunktion: Datei ins Backup verschieben
stash() {
    [ -e "$1" ] || return 0
    local target="$BACKUP$(dirname "$1")"
    mkdir -p "$target"
    mv "$1" "$target/"
    echo "  weggeraeumt: $1"
}

# Hilfsfunktion: Zeilen mit chromium/kiosk aus einer Datei entfernen (Backup vorher)
strip_lines() {
    [ -f "$1" ] || return 0
    grep -qiE "$PATTERN" "$1" || return 0
    mkdir -p "$BACKUP$(dirname "$1")"
    cp "$1" "$BACKUP$1"
    grep -viE "$PATTERN" "$BACKUP$1" > "$1"
    echo "  bereinigt:   $1"
}

echo
echo "[1/4] Alte Autostarts aufraeumen..."

# XDG-Autostart des Users
for f in "$H"/.config/autostart/*.desktop; do
    [ -f "$f" ] && grep -qiE "$PATTERN" "$f" && stash "$f"
done

# Alte Scripte, Erweiterungen, Profile von vorher
for f in "$H"/kiosk*.sh "$H"/start*kiosk*.sh "$H"/chromium*.sh "$H"/chromium-autostart.desktop \
         "$H"/hide-scrollbar "$H"/kiosk-profile "$H"/kiosk; do
    [ "$(basename "$f")" = "kiosk-setup.sh" ] && continue
    stash "$f"
done

# Desktop-spezifische Autostarts (labwc / wayfire / LXDE)
strip_lines "$H/.config/labwc/autostart"
strip_lines "$H/.config/wayfire.ini"
strip_lines "$H/.config/lxsession/LXDE-pi/autostart"
strip_lines "$H/.bashrc"
strip_lines "$H/.profile"
strip_lines "$H/.bash_profile"

# Crontab
if crontab -l 2>/dev/null | grep -qiE "$PATTERN"; then
    crontab -l > "$BACKUP/crontab.txt"
    grep -viE "$PATTERN" "$BACKUP/crontab.txt" | crontab -
    echo "  bereinigt:   crontab"
fi

# systemd User-Services
for f in "$H"/.config/systemd/user/*.service; do
    [ -f "$f" ] || continue
    if grep -qiE "$PATTERN" "$f" || echo "$f" | grep -qiE "$PATTERN"; then
        systemctl --user disable --now "$(basename "$f")" 2>/dev/null
        stash "$f"
    fi
done

# Systemweite Sachen (nur wenn sudo ohne Passwort geht)
if sudo -n true 2>/dev/null; then
    for f in /etc/systemd/system/*.service /etc/xdg/autostart/*.desktop; do
        [ -f "$f" ] || continue
        if echo "$f" | grep -qiE "$PATTERN" || grep -qiE -- "--kiosk|kiosk\.sh" "$f"; then
            sudo systemctl disable --now "$(basename "$f")" 2>/dev/null
            sudo mkdir -p "$BACKUP$(dirname "$f")"
            sudo mv "$f" "$BACKUP$(dirname "$f")/" && echo "  weggeraeumt: $f"
        fi
    done
    for f in /etc/xdg/lxsession/LXDE-pi/autostart /etc/rc.local; do
        [ -f "$f" ] && grep -qiE -- "--kiosk|kiosk\.sh" "$f" || continue
        sudo mkdir -p "$BACKUP$(dirname "$f")"
        sudo cp "$f" "$BACKUP$f"
        sudo sed -i -E '/--kiosk|kiosk\.sh/d' "$f"
        echo "  bereinigt:   $f"
    done
    sudo systemctl daemon-reload
else
    echo "  (sudo braucht Passwort -> systemweite Dateien uebersprungen)"
fi

# ------------------------------------------------------------
# 2. Neues, sauberes Kiosk-Setup in ~/kiosk
# ------------------------------------------------------------
echo
echo "[2/4] Neues Kiosk-Setup in $H/kiosk ..."

K="$H/kiosk"
mkdir -p "$K"

# Helfer: versteckt Scrollbalken + Maus, oeffnet die Website nach dem Start nochmal,
# und erneut bei weisser/leerer Seite oder Fehlerseite (steuert Chromium ueber Port 9222)
cat > "$K/helper.py" <<'PYEOF'
#!/usr/bin/env python3
# Kiosk-Helfer: steuert Chromium ueber die DevTools-Schnittstelle (Port 9222)
#  - versteckt Scrollbalken + Mauszeiger auf jeder Seite
#  - oeffnet kurz nach dem Start die Website nochmal (falls sie beim Start verloren ging)
#  - oeffnet sie erneut, wenn die Seite weiss/leer bleibt oder eine Fehlerseite zeigt
#  - scrollt optional ein paar Pixel nach unten
# Benutzung: python3 helper.py https://example.com [PIXEL_RUNTER]
import base64, json, os, socket, struct, sys, time, urllib.request

URL = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("KIOSK_URL", "")
try:
    SCROLL = int(sys.argv[2]) if len(sys.argv) > 2 else 0
except ValueError:
    SCROLL = 0
PORT = int(os.environ.get("KIOSK_PORT", "9222"))
FIRST_RELOAD = int(os.environ.get("KIOSK_FIRST_RELOAD", "15"))  # Sekunden
CHECK_EVERY = int(os.environ.get("KIOSK_CHECK_EVERY", "15"))     # Sekunden

INJECT = r"""(function(){
  var css='*{scrollbar-width:none!important;cursor:none!important}'+
          '::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}';
  function add(){
    if(!document.documentElement||document.getElementById('__kiosk'))return;
    var s=document.createElement('style');s.id='__kiosk';s.textContent=css;
    (document.head||document.documentElement).appendChild(s);
  }
  add();document.addEventListener('DOMContentLoaded',add);
  var y=__SCROLL__;
  if(y>0){
    var go=function(){window.scrollTo(0,y);};
    window.addEventListener('load',function(){
      go();[500,1500,3000,6000,10000].forEach(function(t){setTimeout(go,t);});
    });
    if(document.readyState==='complete')go();
  }
})();""".replace("__SCROLL__", str(SCROLL))

STATE = r"""(function(){
  var h=location.href;
  if(h.indexOf('chrome-error')===0)return 'error';
  if(!h||h==='about:blank')return 'empty';
  var b=document.body;if(!b)return 'blank';
  if(b.innerText.trim().length<3&&!document.querySelector('canvas,svg,img,video,iframe'))return 'blank';
  return 'ok';
})()"""


def log(*a):
    print(time.strftime("%H:%M:%S"), *a, flush=True)


class WS:
    def __init__(self, url):
        rest = url.split("://", 1)[1]
        hostport, path = rest.split("/", 1)
        host, port = hostport.rsplit(":", 1)
        self.s = socket.create_connection((host, int(port)), timeout=10)
        key = base64.b64encode(os.urandom(16)).decode()
        self.s.sendall((
            "GET /%s HTTP/1.1\r\nHost: %s\r\nUpgrade: websocket\r\n"
            "Connection: Upgrade\r\nSec-WebSocket-Key: %s\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n" % (path, hostport, key)).encode())
        head = b""
        while b"\r\n\r\n" not in head:
            chunk = self.s.recv(1)
            if not chunk:
                raise IOError("handshake closed")
            head += chunk
        if b" 101 " not in head.split(b"\r\n", 1)[0]:
            raise IOError("handshake failed: %r" % head[:80])
        self.n = 0

    def _read(self, n):
        buf = b""
        while len(buf) < n:
            chunk = self.s.recv(n - len(buf))
            if not chunk:
                raise IOError("connection closed")
            buf += chunk
        return buf

    def _send(self, opcode, data):
        mask = os.urandom(4)
        n = len(data)
        if n < 126:
            hdr = struct.pack("!BB", 0x80 | opcode, 0x80 | n)
        elif n < 65536:
            hdr = struct.pack("!BBH", 0x80 | opcode, 0x80 | 126, n)
        else:
            hdr = struct.pack("!BBQ", 0x80 | opcode, 0x80 | 127, n)
        self.s.sendall(hdr + mask + bytes(b ^ mask[i % 4] for i, b in enumerate(data)))

    def recv(self):
        msg = b""
        while True:
            b1, b2 = self._read(2)
            op, n = b1 & 0x0F, b2 & 0x7F
            if n == 126:
                n = struct.unpack("!H", self._read(2))[0]
            elif n == 127:
                n = struct.unpack("!Q", self._read(8))[0]
            if b2 & 0x80:
                m = self._read(4)
                data = bytes(b ^ m[i % 4] for i, b in enumerate(self._read(n)))
            else:
                data = self._read(n)
            if op == 8:
                raise IOError("closed by browser")
            if op == 9:
                self._send(10, data)
                continue
            if op in (0, 1, 2):
                msg += data
                if b1 & 0x80:
                    return json.loads(msg.decode("utf-8", "replace"))

    def call(self, method, **params):
        self.n += 1
        my = self.n
        self._send(1, json.dumps({"id": my, "method": method, "params": params}).encode())
        while True:
            r = self.recv()
            if r.get("id") == my:
                return r.get("result", {})


def find_page():
    with urllib.request.urlopen("http://127.0.0.1:%d/json" % PORT, timeout=3) as f:
        for t in json.load(f):
            if t.get("type") == "page" and t.get("webSocketDebuggerUrl"):
                return t["webSocketDebuggerUrl"]
    return None


def session(url):
    ws = WS(url)
    ws.call("Page.enable")
    ws.call("Page.addScriptToEvaluateOnNewDocument", source=INJECT)
    ws.call("Runtime.evaluate", expression=INJECT)
    log("verbunden, CSS aktiv")

    def open_url(why):
        if URL:
            ws.call("Page.navigate", url=URL)
        else:
            ws.call("Page.reload", ignoreCache=True)
        log("Website neu geoeffnet (%s)" % why)

    time.sleep(FIRST_RELOAD)
    open_url("Start")

    bad = 0
    while True:
        time.sleep(CHECK_EVERY)
        r = ws.call("Runtime.evaluate", expression=STATE, returnByValue=True)
        state = r.get("result", {}).get("value", "blank")
        if state == "ok":
            bad = 0
            if SCROLL > 0:
                ws.call("Runtime.evaluate", expression=
                        "if(Math.abs(window.scrollY-%d)>2)window.scrollTo(0,%d)" % (SCROLL, SCROLL))
            continue
        bad += 1
        log("Seite:", state, "(%dx)" % bad)
        if state in ("error", "empty") or bad >= 2:
            open_url(state)
            bad = 0


def main():
    log("Kiosk-Helfer gestartet, URL:", URL or "(keine)", "Scroll:", SCROLL)
    while True:
        try:
            url = find_page()
            if url:
                session(url)
        except Exception as e:
            log("warte auf Chromium ...", type(e).__name__, e)
        time.sleep(3)


if __name__ == "__main__":
    main()
PYEOF

# Unsichtbarer Mauszeiger fuer den ganzen Bildschirm
cat > "$K/cursor.py" <<'PYEOF'
# Erzeugt ein unsichtbares Mauszeiger-Theme "kiosk-blank"
import os, struct, sys
base = os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~/.local/share/icons/kiosk-blank")
cur = os.path.join(base, "cursors")
os.makedirs(cur, exist_ok=True)
sizes = [16, 24, 32, 48, 64, 96]
chunks = [struct.pack("<9I", 36, 0xfffd0002, s, 1, 1, 1, 0, 0, 0) + b"\0\0\0\0" for s in sizes]
data = struct.pack("<4sIII", b"Xcur", 16, 0x10000, len(sizes))
pos = 16 + 12 * len(sizes)
for s, c in zip(sizes, chunks):
    data += struct.pack("<III", 0xfffd0002, s, pos)
    pos += len(c)
data += b"".join(chunks)
with open(os.path.join(cur, "default"), "wb") as f:
    f.write(data)
names = """left_ptr arrow top_left_arrow pointer hand hand1 hand2 pointing_hand text xterm ibeam
watch wait progress left_ptr_watch half-busy crosshair cross tcross move fleur all-scroll grab grabbing
openhand closedhand dnd-move dnd-none not-allowed no-drop forbidden help question_arrow context-menu
cell copy alias col-resize row-resize ew-resize ns-resize nesw-resize nwse-resize n-resize s-resize
e-resize w-resize ne-resize nw-resize se-resize sw-resize sb_h_double_arrow sb_v_double_arrow
h_double_arrow v_double_arrow size_hor size_ver size_bdiag size_fdiag size_all top_side bottom_side
left_side right_side top_left_corner top_right_corner bottom_left_corner bottom_right_corner
vertical-text zoom-in zoom-out X_cursor pirate right_ptr center_ptr draft pencil plus dotbox""".split()
for n in names:
    p = os.path.join(cur, n)
    if os.path.lexists(p):
        os.remove(p)
    try:
        os.symlink("default", p)
    except OSError:
        with open(p, "wb") as f:
            f.write(data)
with open(os.path.join(base, "index.theme"), "w") as f:
    f.write("[Icon Theme]\nName=kiosk-blank\nComment=Unsichtbarer Mauszeiger\n")
print("Unsichtbarer Mauszeiger erstellt:", base)
PYEOF
python3 "$K/cursor.py"
mkdir -p "$H/.config/labwc" "$H/.icons/default" "$H/.config/gtk-3.0"
ENVF="$H/.config/labwc/environment"
if [ -f "$ENVF" ]; then
    mkdir -p "$BACKUP$H/.config/labwc"; cp "$ENVF" "$BACKUP$ENVF"
    sed -i '/^XCURSOR_THEME=/d' "$ENVF"
fi
echo "XCURSOR_THEME=kiosk-blank" >> "$ENVF"
printf '[Icon Theme]\nInherits=kiosk-blank\n' > "$H/.icons/default/index.theme"
GTKF="$H/.config/gtk-3.0/settings.ini"
if [ -f "$GTKF" ]; then
    mkdir -p "$BACKUP$H/.config/gtk-3.0"; cp "$GTKF" "$BACKUP$GTKF"
    if grep -q '^gtk-cursor-theme-name' "$GTKF"; then
        sed -i 's/^gtk-cursor-theme-name.*/gtk-cursor-theme-name=kiosk-blank/' "$GTKF"
    elif grep -q '^\[Settings\]' "$GTKF"; then
        sed -i '/^\[Settings\]/a gtk-cursor-theme-name=kiosk-blank' "$GTKF"
    else
        printf '[Settings]\ngtk-cursor-theme-name=kiosk-blank\n' >> "$GTKF"
    fi
else
    printf '[Settings]\ngtk-cursor-theme-name=kiosk-blank\n' > "$GTKF"
fi
gsettings set org.gnome.desktop.interface cursor-theme kiosk-blank 2>/dev/null
echo "  Mauszeiger: unsichtbar (ab dem naechsten Neustart)"

# Browser-Einstellungen vor jedem Start: Zoom + "sauber beendet"
cat > "$K/prefs.py" <<'PYEOF'
# Setzt in Chromium-Preferences: sauber beendet + Standard-Zoom
import json, math, os, sys
pref, zoom = sys.argv[1], float(sys.argv[2])
os.makedirs(os.path.dirname(pref), exist_ok=True)
try:
    with open(pref) as f:
        d = json.load(f)
except Exception:
    d = {}
p = d.setdefault("profile", {})
p["exited_cleanly"] = True
p["exit_type"] = "Normal"
z = d.setdefault("partition", {}).setdefault("default_zoom_level", {})
if abs(zoom - 1) < 1e-6:
    z.pop("x", None)
else:
    z["x"] = math.log(zoom) / math.log(1.2)
with open(pref, "w") as f:
    json.dump(d, f)
PYEOF

# Browser finden
BROWSER="$(command -v chromium || command -v chromium-browser)"
if [ -z "$BROWSER" ]; then
    echo "FEHLER: chromium nicht gefunden (sudo apt install chromium)"
    exit 1
fi
command -v python3 >/dev/null || echo "WARNUNG: python3 fehlt - Helfer laeuft nicht!"

# Pi 3 und aelter: Grafikchip zu alt fuer aktuelles Chromium -> Software-Grafik
MODEL="$(tr -d '\0' < /proc/device-tree/model 2>/dev/null)"
GPUFLAGS=""
case "$MODEL" in
    *"Pi 3"*|*"Pi 2"*|*"Pi Zero 2"*|*"Pi Model"*|*"Pi Zero W"*)
        GPUFLAGS="--use-angle=swiftshader --enable-unsafe-swiftshader" ;;
esac
echo "  Modell: ${MODEL:-unbekannt}"
[ -n "$GPUFLAGS" ] && echo "  -> Software-Grafik aktiv (verhindert Grafik-Abstuerze)"

# Startscript (ohne Variablen-Ersetzung schreiben, Werte danach einsetzen)
cat > "$K/start.sh" <<'EOF'
#!/bin/bash
URL="__URL__"
ZOOM="__ZOOM__"
BROWSER="__BROWSER__"
GPUFLAGS="__GPU__"
SCROLL="__SCROLL__"
K="__K__"
PROFILE="$K/profile"
exec > "$K/start.log" 2>&1
echo "$(date) Start"

# 1) Warten bis die Uhrzeit per Internet gestellt ist (max. 60 s)
for i in $(seq 1 60); do
    [ "$(timedatectl show -p NTPSynchronized --value 2>/dev/null)" = "yes" ] && break
    sleep 1
done
echo "$(date) Uhrzeit: $(timedatectl show -p NTPSynchronized --value 2>/dev/null)"

# 2) Warten bis die Website antwortet (max. 60 s)
for i in $(seq 1 20); do
    curl -s -o /dev/null --max-time 3 "$URL" && break
    sleep 1
done
echo "$(date) Netz-Check fertig"
sleep 3

# 3) Helfer starten (Scrollbalken/Maus weg, Website notfalls neu oeffnen)
pkill -f "$K/helper.py" 2>/dev/null
python3 "$K/helper.py" "$URL" "$SCROLL" > "$K/helper.log" 2>&1 &

# 4) Chromium starten - und neu starten, falls er abstuerzt
while true; do
    # Browser-Zoom setzen + "Chromium wurde nicht richtig beendet"-Leiste verhindern
    python3 "$K/prefs.py" "$PROFILE/Default/Preferences" "$ZOOM"

    echo "$(date) Chromium startet"
    "$BROWSER" --kiosk \
        --user-data-dir="$PROFILE" \
        --remote-debugging-port=9222 \
        $GPUFLAGS \
        --hide-scrollbars \
        --noerrdialogs --disable-infobars --disable-session-crashed-bubble \
        --no-first-run --password-store=basic \
        --check-for-update-interval=31536000 \
        "$URL"
    echo "$(date) Chromium beendet (Code $?)"
    sleep 5
done
EOF
URL_ESC="$(printf '%s' "$URL" | sed 's/[&|\]/\&/g')"
sed -i -e "s|__URL__|$URL_ESC|" -e "s|__ZOOM__|$ZOOM|" -e "s|__BROWSER__|$BROWSER|" -e "s|__K__|$K|" -e "s|__GPU__|$GPUFLAGS|" -e "s|__SCROLL__|$SCROLL|" "$K/start.sh"
chmod +x "$K/start.sh"

# ------------------------------------------------------------
# 3. EIN Autostart-Eintrag (funktioniert mit labwc, wayfire und X11)
# ------------------------------------------------------------
echo
echo "[3/4] Autostart eintragen..."
mkdir -p "$H/.config/autostart"
cat > "$H/.config/autostart/kiosk.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Kiosk
Exec=$K/start.sh
Terminal=false
X-GNOME-Autostart-enabled=true
EOF

# ------------------------------------------------------------
# 4. Autologin in den Desktop + Bildschirm nie schwarz
# ------------------------------------------------------------
echo
echo "[4/4] Autologin + Bildschirmschoner aus..."
if sudo -n true 2>/dev/null && command -v raspi-config >/dev/null; then
    sudo raspi-config nonint do_boot_behaviour B4 && echo "  Autologin Desktop: an"
    sudo raspi-config nonint do_blanking 1        && echo "  Bildschirm-Abschaltung: aus"
else
    echo "  uebersprungen (bitte ggf. per 'sudo raspi-config' einstellen)"
fi

echo
echo "=============================================="
echo " FERTIG auf $(hostname)"
echo "=============================================="
echo " Einziger Autostart:  ~/.config/autostart/kiosk.desktop"
echo " Startscript:         ~/kiosk/start.sh"
echo " URL aendern:         einfach dieses Script nochmal mit neuer URL starten"
echo " Alte Dateien:        $BACKUP"
echo
echo " Jetzt neu starten:   sudo reboot"
