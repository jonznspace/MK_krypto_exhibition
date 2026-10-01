# Station 10 · Scheitern ohne Regeln (Station 8 in der Ausstellung)

Startscreen mit Leseansicht von links und Vertiefung von rechts. Keine Aktion.

## Startscreen wie Station 03 und 09 (2026-10-01)

Maße, Abstände, Farben und Typografie wie der Startscreen von Station 09 (Basis Station 03).
Alle Werte kommen aus `tokens.css`, es gibt keine lokale Typo-Skala. Das Template-Bundle
(`station-10.bundle.css/.js`) ist durch `station-10.css` und `station-10.js` ersetzt.

- **Titel:** `--font-size-h1`, Zeilenhöhe 1,1, Laufweite −0,035em, Wortabstand 0,3em. Keine feste Trennung nötig.
- **Start:** nur Absatz 1 (`--font-size-body-l`, weiß), Textspalte 820 px. Darunter „Weiterlesen“ / „Read more“
  mit `--space-8` Abstand. Der Scrollbereich der alten Fassung ist entfernt.
- **Leseansicht** (`shared/…/station-offcanvas.*`, von links): Eyebrow „Hintergrund“ (Standard), Titel der Station,
  Absatz 1 als Lead, Absatz 2–4 darunter ohne Zwischenüberschrift. Keine „Auf den Punkt gebracht“-Box.
- **Vertiefung:** CTA unten rechts wie in Station 03 (blau, `--size-control-lg`), Label „Vertiefung“ / „Deep dive“,
  Icon Glühbirne (`00_design-system/symbols/bulb.svg`). Öffnet dieselbe Leseansicht **von rechts**
  (`side: 'right'`, id `stationDeepDive`, wie die Vertiefung in Station 02). Eyebrow und Region-Label
  „Vertiefung“ / „Deep dive“, Titel „Bank Runs – damals und heute“, drei Absätze. Das alte Overlay (Karte mit ✕) ist entfernt.
- **Bild:** Banknote (`dither-output.png`) rechts unten wie Station 03: Breite 1180 px, max. 1020 px hoch,
  ragt 160 px über den rechten Rand, Deckkraft .28.
- `shared/js/station-offcanvas.js`: Trigger mit eigenem Markup markieren ihr Label mit `data-offcanvas-label`,
  die Komponente schreibt die Beschriftung nur dort hinein und lässt das Icon stehen.
- `index.html`: `station-10.css?v=1`, `station-10.js?v=1`.
