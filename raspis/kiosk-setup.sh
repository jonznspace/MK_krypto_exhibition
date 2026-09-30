#!/bin/bash
# ============================================================
#  kiosk-setup.sh  -  EIN Script fuer alle Raspberries
#
#  1. raeumt alle alten Kiosk/Chromium-Autostarts weg
#     (nichts wird geloescht, alles landet in ~/kiosk-backup-DATUM)
#  2. richtet EINEN sauberen Autostart ein:
#     Chromium im Vollbild, ohne Scrollbalken und ohne Maus
#  3. stellt das LAN (eth0) auf DHCP (Internet ueber Kabel)
#
#  Benutzung (auf dem Pi, als normaler User - NICHT mit sudo):
#     bash kiosk-setup.sh 1
#  Die Nummer waehlt eine Datei im Ordner kiosk-seiten/ neben diesem Script
#  (z.B. kiosk-seiten/1-mempool-block.css). Darin steht die URL
#  (Zeile "URL: https://...") und das CSS, das auf der Seite eingefuegt wird.
#
#  Alternativ direkt eine URL (dann ohne eigenes CSS):
#     bash kiosk-setup.sh https://mempool.space/de/mempool-block/0
#
#  Optional Zoom (z.B. 80%):
#     bash kiosk-setup.sh 2 0.8
#
#  Optional ein paar Pixel runterscrollen (3. Wert, Zoom dann 1 = normal):
#     bash kiosk-setup.sh 2 1 150
# ============================================================
set -u

URL="${1:-}"
ZOOM="${2:-1}"
SCROLL="${3:-0}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SEITEN="$SCRIPT_DIR/kiosk-seiten"
CSSFILE=""

if [ -z "$URL" ]; then
    echo "FEHLER: Keine Nummer oder URL angegeben."
    echo "Beispiel: bash $0 1"
    exit 1
fi

# Nummer statt URL -> passende Datei aus kiosk-seiten/ nehmen
if [[ "$URL" =~ ^[0-9]+$ ]]; then
    NR="$URL"
    CSSFILE="$(ls "$SEITEN/$NR"-*.css "$SEITEN/$NR.css" 2>/dev/null | head -n1)"
    if [ -z "$CSSFILE" ]; then
        echo "FEHLER: Keine Datei fuer Nummer $NR in $SEITEN gefunden."
        echo "Vorhanden:"; ls "$SEITEN" 2>/dev/null || echo "  (Ordner kiosk-seiten fehlt neben dem Script)"
        exit 1
    fi
    URL="$(grep -m1 -oE 'URL:[[:space:]]*[^[:space:]*]+' "$CSSFILE" | sed -E 's/^URL:[[:space:]]*//' | tr -d '\r')"
    if [ -z "$URL" ]; then
        echo "FEHLER: In $(basename "$CSSFILE") ist noch keine URL eingetragen (Zeile 'URL: https://...')."
        exit 1
    fi
fi
# Zugangsdaten in der URL (https://benutzer:passwort@...) nie anzeigen oder loggen
URL_SHOW="$(printf '%s' "$URL" | sed -E 's#://[^[:space:]]*@#://***:***@#')"
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
LOGFILE="$SCRIPT_DIR/setup-log-$(hostname).txt"
exec > >(tee "$LOGFILE") 2>&1

H="$HOME"
BACKUP="$H/kiosk-backup-$(date +%Y%m%d-%H%M%S)"
PATTERN='chromium|kiosk|scrollbar'
mkdir -p "$BACKUP"

echo "=============================================="
echo " Kiosk-Setup auf $(hostname)"
echo " URL:  $URL_SHOW"
if [ -n "$CSSFILE" ]; then echo " CSS:  $(basename "$CSSFILE")"; else echo " CSS:  keins"; fi
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
echo "[1/5] Alte Autostarts aufraeumen..."

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
echo "[2/5] Neues Kiosk-Setup in $H/kiosk ..."

K="$H/kiosk"
mkdir -p "$K"

# Eigenes CSS der gewaehlten Seite (Windows-Zeilenenden entfernen)
if [ -n "$CSSFILE" ]; then
    tr -d '\r' < "$CSSFILE" | sed -E '/URL:/s#://[^[:space:]]*@#://***:***@#' > "$K/custom.css"
    echo "  Eigenes CSS: $(basename "$CSSFILE") -> $K/custom.css"
else
    rm -f "$K/custom.css"
fi

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
import base64, json, os, socket, struct, subprocess, sys, time, urllib.parse, urllib.request

URL = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("KIOSK_URL", "")
# URL mit Zugangsdaten (https://benutzer:passwort@...): CLEAN ist dieselbe Adresse ohne sie
_p = urllib.parse.urlsplit(URL)
HAS_LOGIN = "@" in _p.netloc
CLEAN = urllib.parse.urlunsplit(_p._replace(netloc=_p.netloc.rsplit("@", 1)[-1])) if HAS_LOGIN else URL
LOGIN_WAIT = int(os.environ.get("KIOSK_LOGIN_WAIT", "3"))        # Sekunden
try:
    SCROLL = int(sys.argv[2]) if len(sys.argv) > 2 else 0
except ValueError:
    SCROLL = 0
PORT = int(os.environ.get("KIOSK_PORT", "9222"))
FIRST_RELOAD = int(os.environ.get("KIOSK_FIRST_RELOAD", "15"))  # Sekunden
CHECK_EVERY = int(os.environ.get("KIOSK_CHECK_EVERY", "15"))     # Sekunden
CALL_TIMEOUT = int(os.environ.get("KIOSK_CALL_TIMEOUT", "90"))   # Sekunden
FREEZE_LIMIT = int(os.environ.get("KIOSK_FREEZE_LIMIT", "6"))    # Timeouts in Folge
started = False  # Start-Neuladen nur einmal pro Chromium-Start, nicht bei jeder Neuverbindung
frozen = 0       # Timeouts in Folge: Chromium laeuft, antwortet aber nicht mehr

# Eigenes CSS der Seite (von kiosk-setup.sh aus kiosk-seiten/ kopiert)
CSS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "custom.css")
try:
    with open(CSS_FILE, encoding="utf-8") as f:
        EXTRA_CSS = f.read()
except OSError:
    EXTRA_CSS = ""

INJECT = r"""(function(){
  var css='*{scrollbar-width:none!important;cursor:none!important}'+
          '::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}'+
          __EXTRA__;
  function add(){
    if(!document.documentElement||document.getElementById('__kiosk'))return;
    var s=document.createElement('style');s.id='__kiosk';s.textContent=css;
    (document.head||document.documentElement).appendChild(s);
  }
  add();document.addEventListener('DOMContentLoaded',add);
  setInterval(add,2000);
  var y=__SCROLL__;
  if(y>0){
    var go=function(){window.scrollTo(0,y);};
    window.addEventListener('load',function(){
      go();[500,1500,3000,6000,10000].forEach(function(t){setTimeout(go,t);});
    });
    if(document.readyState==='complete')go();
  }
})();""".replace("__SCROLL__", str(SCROLL)).replace("__EXTRA__", json.dumps(EXTRA_CSS))

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
        # Langsame Pis brauchen fuer Antworten (z.B. Page.navigate) oft laenger
        self.s.settimeout(CALL_TIMEOUT)
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
    with urllib.request.urlopen("http://127.0.0.1:%d/json" % PORT, timeout=10) as f:
        for t in json.load(f):
            if t.get("type") == "page" and t.get("webSocketDebuggerUrl"):
                return t["webSocketDebuggerUrl"]
    return None


def session(url):
    global started, frozen
    ws = WS(url)
    ws.call("Page.enable")
    ws.call("Page.addScriptToEvaluateOnNewDocument", source=INJECT)
    ws.call("Runtime.evaluate", expression=INJECT)
    frozen = 0
    log("verbunden, CSS aktiv")

    def open_url(why):
        if URL:
            if HAS_LOGIN:
                # erst mit Zugangsdaten anmelden (Chromium merkt sie sich), danach die
                # Adresse ohne Zugangsdaten oeffnen - sonst kann die Seite ihre Daten
                # nicht nachladen (fetch verweigert Adressen mit Zugangsdaten) -> weiss
                ws.call("Page.navigate", url=URL)
                time.sleep(LOGIN_WAIT)
            ws.call("Page.navigate", url=CLEAN)
        else:
            ws.call("Page.reload", ignoreCache=True)
        log("Website neu geoeffnet (%s)" % why)

    if not started:
        time.sleep(FIRST_RELOAD)
        open_url("Start")
        started = True

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
        # weisse Seite erst nach ca. 1 Minute neu laden - langsame Pis brauchen so lange
        if state in ("error", "empty") or bad >= 4:
            open_url(state)
            bad = 0


def main():
    log("Kiosk-Helfer gestartet, URL:", CLEAN or "(keine)",
        "Zugangsdaten:", "ja" if HAS_LOGIN else "nein", "Scroll:", SCROLL,
        "Eigenes CSS:", "%d Zeichen" % len(EXTRA_CSS) if EXTRA_CSS else "keins")
    global started, frozen
    while True:
        try:
            url = find_page()
            if url:
                session(url)
        except Exception as e:
            log("warte auf Chromium ...", type(e).__name__, e)
            reason = getattr(e, "reason", None)
            if isinstance(reason, ConnectionRefusedError):
                # Chromium laeuft (noch) nicht -> nach dem Start Website wieder neu oeffnen
                started = False
                frozen = 0
            elif isinstance(e, TimeoutError) or isinstance(reason, TimeoutError):
                # Chromium laeuft, antwortet aber nicht: eingefroren (weisser Bildschirm).
                # Hart beenden - start.sh startet ihn dann neu.
                frozen += 1
                if frozen >= FREEZE_LIMIT:
                    log("Chromium eingefroren -> wird beendet und neu gestartet")
                    subprocess.run(["pkill", "-KILL", "-f", "--",
                                    "--remote-debugging-port=%d" % PORT])
                    started = False
                    frozen = 0
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
d.setdefault("translate", {})["enabled"] = False  # nie "Seite uebersetzen?" anbieten
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
K="__K__"
URL="$(cat "$K/url.txt")"
ZOOM="__ZOOM__"
BROWSER="__BROWSER__"
GPUFLAGS="__GPU__"
SCROLL="__SCROLL__"
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

# Grafik-Varianten (nur Pi 3 und aelter): stuerzt Chromium kurz nach dem Start ab
# oder friert ein (der Helfer beendet ihn dann), kommt die naechste Variante dran.
# Die zuletzt benutzte Variante wird gemerkt und gilt auch nach einem Neustart.
if [ -n "$GPUFLAGS" ]; then
    MODES=("$GPUFLAGS" "--disable-gpu" "")
else
    MODES=("")
fi
MODE="$(cat "$K/gpu-mode" 2>/dev/null)"
case "$MODE" in ''|*[!0-9]*) MODE=0 ;; esac
[ "$MODE" -lt "${#MODES[@]}" ] || MODE=0

# 4) Chromium starten - und neu starten, falls er abstuerzt
while true; do
    # Browser-Zoom setzen + "Chromium wurde nicht richtig beendet"-Leiste verhindern
    python3 "$K/prefs.py" "$PROFILE/Default/Preferences" "$ZOOM"

    FLAGS="${MODES[$MODE]}"
    echo "$(date) Chromium startet (Grafik-Variante $MODE: ${FLAGS:-Standard})"
    T0="$(date +%s)"
    "$BROWSER" --kiosk \
        --user-data-dir="$PROFILE" \
        --remote-debugging-port=9222 \
        $FLAGS \
        --hide-scrollbars \
        --noerrdialogs --disable-infobars --disable-session-crashed-bubble \
        --no-first-run --password-store=basic \
        --disable-features=Translate,TranslateUI \
        --check-for-update-interval=31536000 \
        "$URL"
    RC=$?
    echo "$(date) Chromium beendet (Code $RC)"
    # Absturz/Einfrieren in den ersten 10 Minuten -> naechste Grafik-Variante
    # (Code 0 = von Hand geschlossen, z.B. Alt+F4 -> Variante bleibt)
    if [ "$RC" -ne 0 ] && [ "${#MODES[@]}" -gt 1 ] && [ $(( $(date +%s) - T0 )) -lt 600 ]; then
        MODE=$(( (MODE + 1) % ${#MODES[@]} ))
        echo "$MODE" > "$K/gpu-mode"
        echo "$(date) lief nur kurz -> naechste Grafik-Variante: $MODE"
    fi
    sleep 5
done
EOF
# URL in eigener Datei: so bleiben Sonderzeichen (z.B. $ im Passwort) unveraendert
# und Zugangsdaten stehen nicht im Startscript
printf '%s' "$URL" > "$K/url.txt"
chmod 600 "$K/url.txt"
sed -i -e "s|__ZOOM__|$ZOOM|" -e "s|__BROWSER__|$BROWSER|" -e "s|__K__|$K|" -e "s|__GPU__|$GPUFLAGS|" -e "s|__SCROLL__|$SCROLL|" "$K/start.sh"
chmod +x "$K/start.sh"

# ------------------------------------------------------------
# 3. EIN Autostart-Eintrag (funktioniert mit labwc, wayfire und X11)
# ------------------------------------------------------------
echo
echo "[3/5] Autostart eintragen..."
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
echo "[4/5] Autologin + Bildschirmschoner aus..."
if sudo -n true 2>/dev/null && command -v raspi-config >/dev/null; then
    sudo raspi-config nonint do_boot_behaviour B4 && echo "  Autologin Desktop: an"
    sudo raspi-config nonint do_blanking 1        && echo "  Bildschirm-Abschaltung: aus"
else
    echo "  uebersprungen (bitte ggf. per 'sudo raspi-config' einstellen)"
fi

# Google-Uebersetzer in Chromium per Richtlinie abschalten (kein Symbol, keine Meldung)
if sudo -n true 2>/dev/null; then
    for d in /etc/chromium /etc/chromium-browser; do
        [ -d "$d" ] || [ "$d" = /etc/chromium ] || continue
        sudo mkdir -p "$d/policies/managed"
        echo '{ "TranslateEnabled": false }' | sudo tee "$d/policies/managed/kiosk.json" >/dev/null
    done
    echo "  Uebersetzer: aus (Richtlinie)"
else
    echo "  Uebersetzer-Richtlinie uebersprungen (sudo braucht Passwort)"
fi

# ------------------------------------------------------------
# 5. LAN (eth0) auf DHCP: IP, Netzmaske, Gateway und DNS kommen automatisch.
#    Die eth0-Profile werden ueber NetworkManager selbst gefunden (per UUID),
#    nie ueber den Namen - der heisst je nach Sprache z.B. "Wired connection 1"
#    oder "Kabelgebundene Verbindung 1". Alte feste IPs werden entfernt.
#    WLAN und Hostname werden nicht angefasst.
# ------------------------------------------------------------
echo
echo "[5/5] LAN (eth0) auf DHCP..."

SUDO=""
sudo -n true 2>/dev/null && SUDO="sudo"
nmc() { $SUDO env LC_ALL=C nmcli "$@"; }

setup_lan() {
    command -v nmcli >/dev/null || { echo "  uebersprungen (nmcli fehlt, kein NetworkManager)"; return; }
    if [ "$(nmc -t -f RUNNING general 2>/dev/null)" != "running" ]; then
        echo "  uebersprungen (NetworkManager laeuft nicht)"; return
    fi
    ip link show eth0 >/dev/null 2>&1 || { echo "  uebersprungen (kein eth0 vorhanden)"; return; }
    nmc device set eth0 managed yes 2>/dev/null

    # eth0-Profile sammeln: das gerade aktive + alle Ethernet-Profile, die an eth0
    # oder an kein bestimmtes Interface gebunden sind (damit beim Booten kein altes
    # Profil mit fester IP gewinnt)
    local ACTIVE UUIDS="" u t ifn
    ACTIVE="$(nmc -g GENERAL.CON-UUID device show eth0 2>/dev/null)"
    [ -n "$ACTIVE" ] && UUIDS="$ACTIVE"
    while IFS=: read -r u t; do
        [ "$t" = "802-3-ethernet" ] && [ "$u" != "$ACTIVE" ] || continue
        ifn="$(nmc -g connection.interface-name connection show uuid "$u")"
        [ -z "$ifn" ] || [ "$ifn" = "eth0" ] || continue
        UUIDS="$UUIDS $u"
    done < <(nmc -g UUID,TYPE connection show)

    # Noch gar kein Profil fuer eth0? Dann eins anlegen
    if [ -z "$UUIDS" ]; then
        if nmc connection add type ethernet ifname eth0 con-name kiosk-lan \
                ipv4.method auto ipv4.never-default no connection.autoconnect yes >/dev/null; then
            UUIDS="$(nmc -g connection.uuid connection show kiosk-lan)"
            echo "  kein eth0-Profil gefunden -> neues Profil 'kiosk-lan' angelegt"
        else
            echo "  FEHLER: konnte kein LAN-Profil anlegen -> Netzwerk unveraendert"; return
        fi
    fi

    # Jedes gefundene Profil auf DHCP stellen, alte feste Werte leeren
    local FIRST=""
    for u in $UUIDS; do
        echo "  Profil: $(nmc -g connection.id connection show uuid "$u")"
        nmc connection show uuid "$u" > "$BACKUP/eth0-vorher-$u.txt" 2>&1
        if nmc connection modify uuid "$u" \
                ipv4.method auto ipv4.addresses "" ipv4.gateway "" ipv4.routes "" \
                ipv4.dns "" ipv4.ignore-auto-dns no ipv4.never-default no \
                connection.autoconnect yes; then
            echo "    -> DHCP (alte feste IP/Gateway/DNS entfernt)"
            [ -z "$FIRST" ] && FIRST="$u"
        else
            echo "    -> FEHLER beim Aendern"
        fi
    done
    [ -z "$FIRST" ] && { echo "  FEHLER: kein Profil geaendert -> Netzwerk unveraendert"; return; }

    # Aktivieren (das bisher aktive Profil, sonst das erste) - wartet auf DHCP
    if ! nmc connection up uuid "${ACTIVE:-$FIRST}" ifname eth0 >/dev/null; then
        echo "  gespeichert, wird aktiv sobald das LAN-Kabel steckt"; return
    fi

    # Kurzer Test ueber eth0 (nur Info, aendert nichts)
    ip -4 -o addr show eth0 | awk '{print "  IP:    " $4}'
    ip -4 route show default dev eth0 | sed 's/^/  Route: /'
    ping -I eth0 -c 2 -W 3 1.1.1.1 >/dev/null 2>&1 && echo "  Test Internet: OK" || echo "  Test Internet: KEINE ANTWORT"
    getent hosts mempool.space >/dev/null          && echo "  Test DNS:      OK" || echo "  Test DNS:      FEHLER"
}
setup_lan

echo
echo "=============================================="
echo " FERTIG auf $(hostname)"
echo "=============================================="
echo " Einziger Autostart:  ~/.config/autostart/kiosk.desktop"
echo " Startscript:         ~/kiosk/start.sh"
echo " Eigenes CSS:         ~/kiosk/custom.css"
echo " Seite aendern:       einfach dieses Script nochmal mit anderer Nummer starten"
echo " Alte Dateien:        $BACKUP"
echo
echo " Jetzt neu starten:   sudo reboot"
