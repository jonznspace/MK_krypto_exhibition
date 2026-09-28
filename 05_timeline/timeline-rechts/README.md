# Timeline — rechte Wand

HTML-Umsetzung des Figma-Artboards [timeline-rechts, 1357:13367](https://www.figma.com/design/xdc82fp188ssSV45Y7LKhz/SKD-Krypto----Design?node-id=1357-13367), ausgelesen am 24.09.2026. Figma wurde ausschließlich gelesen.

Die Timeline wird im Ausstellungsraum per Beamer auf eine weiße Wand projiziert und läuft als Endlosschleife. Es gibt keine Bedienung und keine Anpassung an Nutzereinstellungen.

## Öffnen

`index.html` direkt im Browser öffnen oder über den vorhandenen Projektserver unter `http://127.0.0.1:8080/05_timeline/timeline-rechts/` aufrufen. Kein Build und keine Installation nötig. Für den Maßstabsvergleich den Browser auf 100 % Zoom stellen.

Das Artboard ist fest **1920 × 1200 CSS-Pixel** groß. Kleinere Fenster scrollen; es gibt keine responsive Anpassung oder automatische Skalierung. Achtung: Die Stationen werden beim Start einmalig vermessen. Ein späteres Skalieren des Artboards per CSS-`transform` würde Pfad und Punkte gegeneinander verschieben.

## Dateien

- `index.html`: Texte, sieben Ereignisse, vier Piktogramme (inline), Linienebene für die Spur und originale SVG-Ebenen.
- `timeline.css`: exakte Artboard-Geometrie, Typografie, Piktogramm-Position und Bewegungspfad.
- `timeline.js`: eine gemeinsame Animationsuhr für Fahrt, Spur, Puls, Punktzustände, Piktogramme und Loop-Ende.
- `assets/`: zehn unveränderte SVG-Exporte aus Figma, in zwölf Ebenen eingesetzt. Die vier Linien-Exporte sind per CSS ausgeblendet (siehe Spur).
- `assets/neue-icons/`: 7 Timeline-Piktogramme (24 × 24, `stroke="currentColor"`); vier davon sind inline in `index.html` übernommen.
- `reference/figma.png`: Originalreferenz in 1920 × 1200.
- `reference/html.png`: Chromium-Screenshot des statischen Layouts vor Spur und Piktogrammen.

## Fonts und Design-System

Die bestehenden lokalen WOFF2-Dateien werden über `../../00_design-system/tokens/tokens.css` eingebunden: **Panchang 800**, **DM Mono 500**, **Switzer 400 und 700**. Es gibt keine externen Font- oder Asset-Requests. Beim Kopieren dieser Umsetzung muss `00_design-system/` im übergeordneten Projekt erhalten bleiben.

Farben und passende Basiswerte verwenden die vorhandenen Tokens. Artboard-spezifische Positionen, Textgrößen und Zeilenhöhen folgen ausdrücklich der verlinkten Figma-Vorlage. Die Switzer-Baseline ist um einen Pixel an den Figma-Render angeglichen.

## Piktogramme

Vier Ereignisse tragen ein Piktogramm aus `assets/neue-icons/`: Spekulation (01), Verbote (04), Regulierung (06) und Ausblick (07). Sie stehen rechts neben dem blauen Label, beim Ausblick neben der Datumszeile, und stehen mit der Unterkante ihrer Zeichnung bündig auf der Unterkante des blauen Labels.

Größe 86,45 px, Linienstärke 1 (im 24er-Raster, ergibt rund 3,6 px). Stellschrauben im Block `.event__icon` in `timeline.css`: `--icon-size`, `--icon-lift`, `--icon-line` (Höhe, beim ersten Piktogramm 8 px und beim Ausblick 16 px tiefer) und `stroke-width`.

## Animation

Alle Zeiten stehen zentral in `timing` in `timeline.js`.

**Spur.** Die Timeline startet komplett grau (`--color-neutral-500`). Ein weißes Quadrat (16 × 16 px) fährt auf den originalen Bézierkurven aus `assets/ffcb5.svg` und hinterlässt eine blaue Spur (`--color-secondary-600`), die immer genau bis zu seiner Mitte reicht. Dafür ersetzt ein eigener SVG-Pfad mit identischer Geometrie die vier Linien-Exporte. Jeder der sechs Pfeile bekommt beim Start eine blaue Kopie, die eingeblendet wird, sobald das Quadrat ihn passiert. Das Quadrat dreht sich tangential zur Fahrtrichtung; eine Korrektur von rund einem halben Pixel sorgt dafür, dass es beim Halt deckungsgleich auf dem Stationspunkt liegt.

**Fahrt.** Konstante Durchschnittsgeschwindigkeit `speed: 75` px/s. Jede Strecke zwischen zwei Stationen fährt weich an und bremst weich ab (`cubic-bezier(0.42, 0, 0.58, 1)`); die Einfahrt bremst nur, die Ausfahrt beschleunigt nur. Die Überleitung von der oberen zur unteren Zeile (`bans` → `crime`) hat eine feste Dauer von `transfer: 9536` ms.

**Station.** 600 ms Halt, dann vier Herzschlag-Pulse in 4.800 ms: Jeder Schlag ist 0,7-mal so lang wie der vorige (rund 1.900, 1.320, 920, 660 ms), steigt schnell auf Blau und klingt weich auf Weiß ab (`pulse`, `beats`, `beatRatio`). Nach der Abfahrt färbt sich der Stationspunkt in 480 ms blau (`settle`). Danach blendet das Piktogramm in 4.000 ms ein und wächst dabei von 90 auf 100 % (`reveal`).

**Loop-Ende.** Nach der Ausfahrt bleibt das fertige Bild 8 s stehen (`rest`). Dann blenden Spur, Pfeile, Punkte und Piktogramme gemeinsam in 4 s zurück auf Grau bzw. Weiß, die Piktogramme schrumpfen dabei auf 90 % (`fade`). Nach 3 s leerer Timeline (`idle`) fährt das Quadrat neu herein.

Die Loop-Dauer ergibt sich aus diesen Werten und beträgt rund **105 s** (90 s Fahrt, 15 s Loop-Ende).

`window.timeline` stellt `dots`, `traveler`, `ready`, `timing`, `duration`, `travelEnd`, `segments` und die Stopps mit Ankunfts- und Abfahrtszeiten bereit. `pause()`, `play()` und `seek(milliseconds)` erlauben die gezielte Vorschau einzelner Momente. Die sieben Ereignispunkte besitzen stabile IDs und Figma-Node-IDs.

## Prüfung

Statisches Layout: Chromium-Abgleich mit der Figma-Referenz für Artboard-Maße, alle sieben Punktpositionen, Textumbrüche, Schriftfamilien und -gewichte sowie alle SVG-Ebenen. Geringfügige Unterschiede in Kantenglättung und Verlaufsrasterung zwischen Figma und Browser sind rendererabhängig.

Animation in Chromium über `seek()` geprüft: Spur endet ohne Lücke unter dem Quadrat und schließt an Kurven und Pfeilen sauber an; Halt an allen sieben Stationen ohne Sprung; Pulsverlauf in 40-ms-Schritten gemessen; Piktogramme blenden nach dem Blaufärben ein, das letzte ist vor der Ausfahrt vollständig sichtbar; Ruhe-, Ausblend- und Leerlaufphase sowie Neustart.
