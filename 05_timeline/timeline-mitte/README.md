# Timeline — mittlere Wand

HTML-Umsetzung des Figma-Artboards [timeline-mitte, 1357:13668](https://www.figma.com/design/xdc82fp188ssSV45Y7LKhz/SKD-Krypto----Design?node-id=1357-13668), ausgelesen am 28.09.2026. Figma wurde ausschließlich gelesen. Aufbau und Animation entsprechen `../timeline-rechts/`, Inhalte, Positionen und Farben folgen dem Mitte-Artboard.

Die Timeline wird im Ausstellungsraum per Beamer auf eine weiße Wand projiziert und läuft als Endlosschleife. Es gibt keine Bedienung und keine Anpassung an Nutzereinstellungen.

## Öffnen

`index.html` direkt im Browser öffnen oder über den vorhandenen Projektserver unter `http://127.0.0.1:8080/05_timeline/timeline-mitte/` aufrufen. Kein Build und keine Installation nötig. Für den Maßstabsvergleich den Browser auf 100 % Zoom stellen.

Das Artboard ist fest **1920 × 1200 CSS-Pixel** groß. Kleinere Fenster scrollen; es gibt keine responsive Anpassung oder automatische Skalierung. Achtung: Die Stationen werden beim Start einmalig vermessen. Ein späteres Skalieren des Artboards per CSS-`transform` würde Pfad und Punkte gegeneinander verschieben.

## Dateien

- `index.html`: Titel, sechs Ereignisse, Linienebene für die Spur und originale SVG-Ebenen.
- `timeline.css`: exakte Artboard-Geometrie, Typografie und Bewegungspfad.
- `timeline.js`: eine gemeinsame Animationsuhr für Fahrt, Spur, Puls, Punktzustände und Loop-Ende.
- `assets/`: SVG-Exporte aus Figma (Bänder, Linien, Kurve, orange Pfeile) sowie die drei grauen Pfeile aus der rechten Timeline für den Ausgangszustand. Die vier Linien-Exporte sind per CSS ausgeblendet (siehe Spur).
- `assets/icons/`: 13 Timeline-Piktogramme v3 (24 × 24, `stroke="currentColor"`), Quelle `downloads.jonzn.space/pikto2.html`. Im Mitte-Artboard sind derzeit keine Piktogramme gesetzt; CSS und JS unterstützen sie weiterhin (`.event__icon`).
- `reference/figma.png`: Originalreferenz in 1920 × 1200.
- `reference/html.png`: Chromium-Screenshot des Ausgangszustands (Timeline komplett grau).

## Fonts und Design-System

Die bestehenden lokalen WOFF2-Dateien werden über `../../00_design-system/tokens/tokens.css` eingebunden: **Panchang 800**, **DM Mono 500**, **Switzer 400 und 700**. Es gibt keine externen Font- oder Asset-Requests. Beim Kopieren dieser Umsetzung muss `00_design-system/` im übergeordneten Projekt erhalten bleiben.

Farben verwenden die vorhandenen Tokens: Labels `--color-primary-600` (#ED8003) mit schwarzer Schrift, Timeline grau `--color-neutral-500`, abgefahrene Spur, Pfeile und Punkte orange `--color-primary-600`. Artboard-spezifische Positionen, Textgrößen und Zeilenhöhen folgen der verlinkten Figma-Vorlage. Die Switzer-Baseline ist um einen Pixel an den Figma-Render angeglichen.

## Animation

Alle Zeiten stehen zentral in `timing` in `timeline.js`.

**Spur.** Die Timeline startet komplett grau. Ein weißes Quadrat (16 × 16 px) fährt auf den originalen Bézierkurven aus `assets/47829.svg` und hinterlässt eine orange Spur, die immer genau bis zu seiner Mitte reicht. Dafür ersetzt ein eigener SVG-Pfad mit identischer Geometrie die vier Linien-Exporte. Jeder der sechs Pfeile bekommt beim Start eine orange Kopie, die eingeblendet wird, sobald das Quadrat ihn passiert. Das Quadrat dreht sich tangential zur Fahrtrichtung und liegt beim Halt deckungsgleich auf dem Stationspunkt.

**Fahrt.** Konstante Durchschnittsgeschwindigkeit `speed: 75` px/s mit weichem Anfahren und Abbremsen je Strecke (`cubic-bezier(0.42, 0, 0.58, 1)`). Die Überleitung von der oberen zur unteren Zeile (`hashcash` → `bmoney`) hat eine feste Dauer von `transfer: 9536` ms.

**Station.** 600 ms Halt, dann vier Herzschlag-Pulse in 4.800 ms: Jeder Schlag ist 0,7-mal so lang wie der vorige (Weiß → Orange → Weiß; `pulse`, `beats`, `beatRatio`). Nach der Abfahrt färbt sich der Stationspunkt in 480 ms orange (`settle`). Gesetzte Piktogramme blenden danach in 4.000 ms ein (`reveal`).

**Loop-Ende.** Nach der Ausfahrt bleibt das fertige Bild 8 s stehen (`rest`), blendet in 4 s zurück auf Grau bzw. Weiß (`fade`), nach 3 s leerer Timeline (`idle`) fährt das Quadrat neu herein. Loop-Dauer rund **100 s** (85 s Fahrt, 15 s Loop-Ende).

`window.timeline` stellt `dots`, `traveler`, `ready`, `timing`, `duration`, `travelEnd`, `segments` und die Stopps bereit; `pause()`, `play()` und `seek(milliseconds)` erlauben die gezielte Vorschau.

## Hinweis

In Figma liegt der Block „Ein erster Entwurf“ 2 px tiefer als die beiden anderen der unteren Zeile (top 771 statt 769). Das ist übernommen; der Punkt sitzt dadurch 1,5 px unter der Linie, das fahrende Quadrat gleicht das beim Halt aus.
