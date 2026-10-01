# Station 12 · Firmengeld (Station 10 in der Ausstellung)

Startscreen mit Leseansicht von links und Vertiefung von rechts. Keine Aktion.

## Startscreen wie Station 03, 10 und 11 (2026-10-01)

Maße, Abstände, Farben und Typografie wie der Startscreen von Station 10 (Basis Station 03).
Alle Werte kommen aus `tokens.css`, es gibt keine lokale Typo-Skala. Das Template-Bundle
(`station-09.bundle.css/.js`) ist durch `station-12.css` und `station-12.js` ersetzt.

- **Titel:** `--font-size-h1`, Zeilenhöhe 1,1, Laufweite −0,035em, Wortabstand 0,3em. Keine feste Trennung nötig.
- **Start:** nur Absatz 1 (`--font-size-body-l`, weiß), Textspalte 820 px. Darunter „Weiterlesen“ / „Read more“
  mit `--space-8` Abstand. Absatz 2 und 3 sind zu lang für den Start (anders als Station 11).
  Der Scrollbereich der alten Fassung ist entfernt.
- **Leseansicht** (`shared/…/station-offcanvas.*`, von links): Eyebrow „Hintergrund“ (Standard), Titel der Station,
  Absatz 1 als Lead, Absatz 2 und 3 darunter ohne Zwischenüberschrift. Keine „Auf den Punkt gebracht“-Box.
- **Vertiefung:** CTA unten rechts wie in Station 10 (blau, `--size-control-lg`), Label „Vertiefung“ / „Deep dive“,
  Icon Glühbirne (`00_design-system/symbols/bulb.svg`). Öffnet dieselbe Leseansicht **von rechts**
  (`side: 'right'`, id `stationDeepDive`). Eyebrow und Region-Label „Vertiefung“ / „Deep dive“,
  Titel „Company Money – von der VOC zu PayPal und Stablecoins“, zwei Absätze. Das alte Overlay (Karte mit ✕) ist entfernt.
- **Bild:** VOC-Münze (Duit 1735, `dither-output.png`) rechts unten wie Station 10: Breite 1180 px, max. 1020 px hoch,
  ragt 160 px über den rechten Rand, Deckkraft .28. `dither-output (2).png` ist das Originalfoto, nicht eingebunden.
- `index.html`: `station-12.css?v=1`, `station-12.js?v=1`.

## Bild kleiner, Leseansicht ohne Absatz 1 (2026-10-01)

- **Bild:** 10 % kleiner, Breite 1062 px, max. 918 px hoch. Platzierung unverändert (rechts unten, 160 px angeschnitten).
- **Leseansicht** (links): Absatz 1 entfällt, er steht schon auf dem Start. Sie zeigt nur noch Absatz 2 und 3, ohne Lead.
- `index.html`: `station-12.css?v=2`, `station-12.js?v=2`.
- Zurückgenommen: Die Leseansicht zeigt wieder Absatz 1 als Lead, darunter Absatz 2 und 3 (wie Station 10).
  `index.html`: `station-12.js?v=3`.

## Feste Umbrüche im Titel (2026-10-01)

- **Titel (DE):** Umbruch nach „Firmengeld:“ und vor „der“, also
  „Firmengeld:“ / „Die VOC und die Macht“ / „der Infrastruktur“ (Tablet quer).
  Im Text steht dafür `\n`, `setTitle` macht daraus ein `<br>` (wie Station 13). In den Leseansichten wird es
  zum Leerzeichen. Der englische Titel ist unverändert.
- `index.html`: `station-12.js?v=5`.
