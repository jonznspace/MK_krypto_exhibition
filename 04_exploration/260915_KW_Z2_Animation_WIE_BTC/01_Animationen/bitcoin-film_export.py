#!/usr/bin/env python3
"""
Export des Erklärfilms als MP4.

Aufruf:
    python3 bitcoin-film_export.py bitcoin-film_v1.0.html bitcoin-film_v1.0.mp4

Voraussetzungen (einmalig):
    pip install playwright
    python3 -m playwright install chromium
    ffmpeg muss im Pfad liegen.

Ablauf: Die HTML-Datei wird ohne Autoplay und ohne Dev-Modus geöffnet, jeder Frame
wird über film.seek(t) deterministisch angesprungen (25 fps, 1920 x 1080) und als
PNG direkt an ffmpeg übergeben, das daraus ein H.264-MP4 (yuv420p) baut.
Dauer und Bildrate kommen aus dem SCRIPT der HTML-Datei.
"""
import pathlib
import subprocess
import sys

from playwright.sync_api import sync_playwright

html = pathlib.Path(sys.argv[1]).resolve()
out = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else html.with_suffix(".mp4"))
url = html.as_uri() + "?autoplay=0"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(url)
    page.wait_for_function("window.film && true")
    page.evaluate("film.ready")
    fps = page.evaluate("film.SCRIPT.fps")
    total = page.evaluate("film.total")
    n = round(total * fps)
    ff = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-vcodec", "png", "-r", str(fps), "-i", "-",
         "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out)],
        stdin=subprocess.PIPE,
    )
    for i in range(n):
        page.evaluate("t => film.seek(t)", i / fps)
        ff.stdin.write(page.screenshot(type="png"))
        if i % (fps * 10) == 0:
            print(f"{i}/{n} Frames ({i / fps:.0f} s)", flush=True)
    ff.stdin.close()
    ff.wait()
    browser.close()

print(f"fertig: {out} ({n} Frames, {total:.2f} s, {fps} fps)")
if errors:
    print("Konsolenfehler:", *errors, sep="\n  ")
    sys.exit(1)
