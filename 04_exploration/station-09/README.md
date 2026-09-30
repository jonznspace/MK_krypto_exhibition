# Station 09 · Neue Entwicklungen (Station 7 in der Ausstellung)

Nur ein Startscreen, keine Aktion und keine Leseansicht.

## Startscreen wie Station 01–03 (2026-09-30)

Maße, Abstände und Typografie wie der Startscreen von Station 03. Alle Werte kommen aus
`tokens.css`, es gibt keine lokale Typo-Skala. Das Template-Bundle (`station-09.bundle.css/.js`)
ist durch `station-09.css` und `station-09.js` ersetzt.

- **Kein „Weiterlesen“:** alle drei Absätze stehen direkt auf dem Screen. Absatz 1 ist der Lead
  (`--font-size-body-l`, weiß), Absatz 2 und 3 in `--font-size-body-m` (wie Station 03), Abstand `--space-3`.
  Textspalte 820 px wie in Station 03.
- **Überlänge:** Der Text liegt in einem Scrollbereich mit blauem Indikator (wie Station 08,
  `StationOffcanvas.scrollIndicator`). Auf dem Tablet quer (1563 × 864) passt DE und EN ohne Scrollen,
  der Indikator ist dort ausgeblendet.
- **Titel:** `--font-size-h1`. Auf dem Start fest getrennt: „HERAUS-“ `<br>` „FORDERUNGEN“ (`titleBreakAfter` in
  `station-09.js`, wie `titleBreakAfter` in Station 03). Die Leseansicht zeigt den Titel ungetrennt.
- **Bild:** Kassenbillet 1772 (`dither-output.png`) rechts, vertikal zentriert, Deckkraft .28,
  Breite `min(1075px, 68.75vw)` (1,25 × der ersten Fassung). Ragt 160 px über den rechten Rand.
- **Keine CTA:** Die Station hat keinen Aktions-Screen.
- `index.html`: `station-09.css?v=1`, `station-09.js?v=1`.

## Absatz 2 und 3 in die Leseansicht, Bild größer (2026-09-30)

- **Start:** nur Absatz 1 (`--font-size-body-l`, weiß), darunter „Weiterlesen“ / „Read more“ mit
  `--space-8` Abstand, wie Station 03. Der Scrollbereich mit Indikator auf dem Start ist entfernt.
- **Leseansicht** (`shared/…/station-offcanvas.*`, von links): Eyebrow „Hintergrund“ (Standard),
  Titel der Station, Absatz 1 als Lead, Absatz 2 und 3 darunter ohne Zwischenüberschrift.
  Keine „Auf den Punkt gebracht“-Box.
- **Bild:** 1,5 × größer, Breite `min(1613px, 103.125vw)`, weiter vertikal zentriert, rechts 160 px angeschnitten.
  Liegt quer jetzt über fast die ganze Breite hinter Titel und Text.
- `index.html`: `station-09.css?v=2`, `station-09.js?v=2`.
- Bild um 40 % seiner Breite nach rechts versetzt (`transform: translate(40%, -50%)`). Quer beginnt es jetzt
  ab etwa der Mitte, der Text liegt weitgehend frei. `index.html`: `station-09.css?v=3`.
- Titel: feste Trennung „Heraus-“ + `<br>` statt weicher Trennstelle, `hyphens: manual` entfernt.
  `index.html`: `station-09.css?v=4`, `station-09.js?v=3`.
