# Station 11 · Verordnetes Vertrauen (Station 9 in der Ausstellung)

Startscreen mit vollem Text und Vertiefung von rechts. Keine Aktion.

## Startscreen wie Station 03, 09 und 10 (2026-10-01)

Maße, Abstände, Farben und Typografie wie der Startscreen von Station 10 (Basis Station 03).
Alle Werte kommen aus `tokens.css`, es gibt keine lokale Typo-Skala. Das Template-Bundle
(`station-09.bundle.css/.js`) ist durch `station-11.css` und `station-11.js` ersetzt.

- **Titel:** `--font-size-h1`, Zeilenhöhe 1,1, Laufweite −0,035em, Wortabstand 0,3em. Keine feste Trennung nötig.
- **Start:** alle drei Absätze, kein „Weiterlesen“ und keine Leseansicht von links. Der Text ist kurz genug:
  Auf dem Tablet quer (1563 × 864) endet er bei DE 676 px und EN 686 px, ohne Scrollen.
  Absatz 1 ist der Lead (`--font-size-body-l`, weiß), Absatz 2 und 3 in `--font-size-body-m`
  (`--immersive-body`), Abstand `--space-3`, wie Station 03. Textspalte 820 px.
  Tablet hochkant und Stele haben ebenfalls genug Platz.
- **Vertiefung:** CTA unten rechts wie in Station 10 (blau, `--size-control-lg`), Label „Vertiefung“ / „Deep dive“,
  Icon Glühbirne (`00_design-system/symbols/bulb.svg`). Öffnet die geteilte Leseansicht
  (`shared/…/station-offcanvas.*`) **von rechts** (`side: 'right'`, id `stationDeepDive`). Eyebrow und Region-Label
  „Vertiefung“ / „Deep dive“, Titel „Rahmensetzung als Voraussetzung“, sieben Absätze. Das alte Overlay (Karte mit ✕) ist entfernt.
- **Bild:** Kassenbillet 1772 (`dither-output.png`) rechts unten wie Station 10: Breite 1180 px, max. 1020 px hoch,
  ragt 160 px über den rechten Rand, Deckkraft .28.
- `index.html`: `station-11.css?v=1`, `station-11.js?v=1`.

## Alle Absätze wie der Einführungsabsatz (2026-10-01)

- Absatz 2 und 3 jetzt wie Absatz 1: `--font-size-body-l`, Zeilenhöhe 1,45, weiß (`--immersive-ink`). Abstand weiter `--space-3`.
- Passt weiter ohne Scrollen: auf 1563 × 864 endet der Text bei DE 724 px und EN 759 px (unterer Rand bei 832 px).
  Der Text endet links vom CTA, es gibt keine Überschneidung.
- `index.html`: `station-11.css?v=2`.

## Bild wie Station 09 (2026-10-01)

- **Bild:** dieselbe Datei wie Station 09 (Kassenbillet 1772, `dither-output.png` aus `station-09` kopiert).
  Die bisherige Datei liegt als `dither-output_old.png` daneben und ist nicht eingebunden.
- Platzierung und Deckkraft wie Station 09: rechts, vertikal zentriert, Breite `min(1613px, 103.125vw)`,
  rechts 160 px angeschnitten und um 40 % der Bildbreite nach rechts versetzt (`translate(40%, -50%)`), Deckkraft .28.
- `index.html`: `station-11.css?v=3`.
