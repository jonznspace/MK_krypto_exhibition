# Timeline — rechte Wand

Statische HTML-Umsetzung des Figma-Artboards [timeline-rechts, 1357:13367](https://www.figma.com/design/xdc82fp188ssSV45Y7LKhz/SKD-Krypto----Design?node-id=1357-13367), ausgelesen am 24.09.2026. Figma wurde ausschließlich gelesen.

## Öffnen

`index.html` direkt im Browser öffnen oder über den vorhandenen Projektserver unter `http://127.0.0.1:8080/05_timeline/` aufrufen. Kein Build und keine Installation nötig. Für den Maßstabsvergleich den Browser auf 100 % Zoom stellen.

Das Artboard ist fest **1920 × 1200 CSS-Pixel** groß. Kleinere Fenster scrollen; es gibt keine responsive Anpassung oder automatische Skalierung.

## Dateien

- `index.html`: Texte, sieben Ereignisse, separate Quadratmarker und originale SVG-Ebenen.
- `timeline.css`: exakte Artboard-Geometrie und Typografie.
- `timeline.js`: Einstiegspunkt für die folgenden Animationen; aktuell vollständig statisch.
- `assets/`: zehn unveränderte SVG-Exporte aus Figma, in zwölf Ebenen eingesetzt.
- `reference/figma.png`: Originalreferenz in 1920 × 1200.
- `reference/html.png`: geprüfter Chromium-Screenshot in 1920 × 1200.

## Fonts und Design-System

Die bestehenden lokalen WOFF2-Dateien werden über `../00_design-system/tokens/tokens.css` eingebunden: **Panchang 800**, **DM Mono 500**, **Switzer 400 und 700**. Es gibt keine externen Font- oder Asset-Requests. Beim Kopieren dieser Umsetzung muss `00_design-system/` im übergeordneten Projekt erhalten bleiben.

Farben und passende Basiswerte verwenden die vorhandenen Tokens. Artboard-spezifische Positionen, Textgrößen und Zeilenhöhen folgen ausdrücklich der verlinkten Figma-Vorlage. Der Titel bleibt auch bei kleineren Browserfenstern gleich groß. Die Switzer-Baseline ist um einen Pixel an den Figma-Render angeglichen.

## Animation vorbereiten

Jeder Punkt ist ein eigenständiges `.timeline__dot`-Element mit stabiler ID, Figma-Node-ID und einem festen Layout-Wrapper. `window.timeline.dots` enthält die Elemente unter `speculation`, `ethereum`, `markets`, `bans`, `crime`, `regulation` und `outlook`. `window.timeline.ready` wartet auf die Fonts. Künftige Transformationen und Opazitätsänderungen können direkt auf den Punkten erfolgen, ohne die Texte zu verschieben.

## Prüfung

Chromium-Abgleich mit der Figma-Referenz: Artboard-Maße, alle sieben Punktpositionen, Textumbrüche, Schriftfamilien und -gewichte sowie alle zwölf SVG-Ebenen geprüft. Keine JavaScript- oder Ladefehler. Zusätzlich bei 800 × 600 geprüft, dass Artboard und Schriftgrößen unverändert bleiben. Geringfügige Unterschiede in Kantenglättung und Verlaufsrasterung zwischen Figma und Browser sind rendererabhängig.
