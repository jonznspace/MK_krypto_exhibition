# Station 4 Scaffold

Diese Station dient ab jetzt als wiederverwendbares Grundgeruest fuer weitere Medienstationen.

## Prinzip

- `index.html` ist die stabile UI-Huelle.
- `station-04.css` enthaelt das visuelle System der Station.
- `station-04.js` enthaelt die Inhalte in `STATION_CONTENT` und rendert die UI.

## Fuer die naechste AI-Session

1. Wenn eine neue Station nur andere Inhalte braucht, zuerst `STATION_CONTENT` anpassen.
2. Wenn ein neues Modul gebraucht wird, die HTML-Huelle moeglichst allgemein halten und den Inhalt ebenfalls aus JavaScript rendern.
3. Tokens weiter nur aus `../../00_design-system/tokens/tokens.css` beziehen.
4. Das Layout bleibt fluid. Neue Module muessen ohne globale Skalierung von Mobile bis Kiosk funktionieren.

## Responsive Basis

- `#frame` nutzt die volle Breite und mindestens die sichtbare Viewport-Hoehe.
- Lange Inhalte duerfen die Seite vertikal erweitern und bleiben scrollbar.
- Die Aktionsansicht wechselt von vier Spalten ueber drei Spalten zu einer mobilen Reihenfolge.
- Breite interaktive Module duerfen auf kleinen Displays intern horizontal scrollen.

## Copy-Strategie

Fuer eine neue, aehnliche Station kann dieser Ordner dupliziert werden. Danach sollten in der Regel nur diese Stellen zuerst geaendert werden:

- `STATION_CONTENT.meta`
- `STATION_CONTENT.start`
- `STATION_CONTENT.action`
- Bilddateien in `img/`

Erst wenn das nicht reicht, sollte die Struktur erweitert werden.

## Startscreen auf Tokens (2026-09-30)

Maße, Abstände und Typografie des Startscreens entsprechen Station 01–03
(Referenz: `../station-03/`). Alle Werte kommen aus `tokens.css`, es gibt keine
lokale Typo-Skala. Der Aktions-Screen folgt als nächster Schritt und sieht bis dahin aus wie vorher.

| Element | vorher | jetzt |
| --- | --- | --- |
| Außenabstand | `clamp(40–88 / 24–72px)` | `--space-6` (32) |
| Stations-Tag | 15 px, 32 × 14 px, `#ed8003` | `--font-size-caption-m`, `--space-6` hoch, `--space-3` innen, `--immersive-accent` |
| DE/EN | 13 px, 32 px hoch | `--font-size-label`, 52 × 52, orange Schrift + Unterkante auf `--state-selected-surface` |
| Eyebrow | im Inhalt vorhanden, nicht angezeigt | „Maschinen verschlüsseln“, `--font-size-label` |
| Titel (H1) | 108/88/68 px je Länge | `--font-size-h1`, Zeilenhöhe 1,1, Laufweite −0,035em, Wortabstand 0,3em |
| Einführung | 4 Absätze, 24 px, scrollbar | nur Absatz 1, `--font-size-body-l`, weiß, 820 px breit |
| Weiterlesen | – | geteilte Leseansicht `shared/…/station-offcanvas.*`, `--space-8` Abstand |
| Ausprobieren | Panchang 22 px, grau + blaues Icon, 68 px | durchgehend blau, DM Mono `--font-size-label`, 52 px, Icon 24 px |

- **Leseansicht:** Absatz 1 als Lead, Absätze 2–4 als Fließtext. Keine Zwischenüberschriften und
  keine „Das Wichtigste“-Box, weil der Ausstellungstext (DT/ENG final) keine vorsieht.
- **Bildposition** (Enigma rechts, `.start-visual`) bleibt stationsspezifisch, auch die Breite `65vw` bis 1600 px.
- Start-Regeln in den Media-Queries (Titelgrößen, Umbau ≤ 1100 / ≤ 760 px) entfernt, wie in Station 03.
  Die Regeln für den Aktions-Screen bleiben; `.title--compact` behält vorerst seine alten Werte.
- `html`, `body`, `#scaler`: `#000` → `--immersive-bg`.
- Dateien: `index.html` (Eyebrow, `hero-summary`, Trigger, Off-Canvas eingebunden,
  `station-04.css?v=5`, `station-04.js?v=5`), `station-04.css` (Block „Startbildschirm“),
  `station-04.js` (Eyebrow, Kurztext, `StationOffcanvas.create`).

## Aktions-Screen: Enigma nach Figma (2026-09-30)

Der interaktive Teil folgt dem Figma-Screen „enigma-2“
(`xdc82fp188ssSV45Y7LKhz`, Node `608:3949`), mit Werten aus `tokens.css`.
Headline, Schließen-Button und Hintergrundbild sind unverändert.

| Element | vorher | jetzt (Figma, Tokens) |
| --- | --- | --- |
| Raster | feste Spalten, Inline-`grid-row`, Linien per Gradient (bei 1563 × 864 aus) | `grid-template-areas` Beschriftung / Maschine / Seite, Bühne vertikal mittig |
| Trennlinien | 2 px `--immersive-body`, teils ausgeblendet | 1 px `--immersive-ink` links jeder Zeile + vor dem Walzen-Hinweis |
| Orange L-Verbinder | vorhanden | entfernt (nicht in Figma) |
| Zeilenbeschriftung, Hinweis | 14 px, `--immersive-muted` | `--font-size-caption-m`, .06em, `--immersive-ink` |
| Walzen | 144 × 176, Wert 34 px | Kontur `--color-neutral-700`, Wert `--font-size-caption-l`; **aktive Walze** Kontur `--color-neutral-400` |
| Tasten | 62 px, 20 px, Versatz Reihe 2 | Ø 64 (`--space-8`), Abstand `--space-4`, `--font-size-caption-l`, Reihen zentriert |
| Lampenfeld | `--immersive-muted` | aus `--color-neutral-800`/`-600`, an `--color-primary-200`/`-900`; keine Buttons mehr (`span`) |
| Tastatur | gedrückt nie sichtbar | `--color-primary-50`/`-800`, gedrückt `--color-primary-600`/`-900`, bleibt bis zum nächsten Druck |
| Ausgabe/Eingabe | Label links mit Doppelpunkt, weiße Kontur | Label oben (`--font-size-caption-s`, `--color-primary-200`), Wert `--font-size-label`, Kontur `--color-primary-200`, 272 breit |
| Zurücksetzen | 64 hoch | `--size-control-lg`, `--color-neutral-800`, Label-Textstyle |

- **Aktive Walze:** hervorgehoben sind die Walzen, die beim letzten Tastendruck weitergedreht
  haben; vor dem ersten Druck Walze III (wie in Figma).
- **Tablet quer (≤ 900 px hoch):** Maschine auf ca. 80 %: Tasten `--size-control-lg` (52),
  Abstand `--space-3`, Zeilen `--space-6`, Walzenfenster 92 px, Seite 240 px.
- **Hochformat (≤ 1100 px breit):** eine Spalte, Beschriftung über der Zeile, keine Trennlinien.
- Bauteilmaße ohne Token (Walzenfenster, Seitenbreite) als `--enigma-*` oben im Block.
- Vertiefung: gibt es für diese Station nicht.
- Dateien: `index.html` (Raster ohne Inline-Styles und Verbinder, `?v=6`), `station-04.css`
  (Block „Enigma“ + Media-Queries), `station-04.js` (Labels ohne Doppelpunkt, aktive Walze,
  gedrückte Taste, Lampen als `span`).

## Schließen-Button wie Station 01–03 (2026-09-30)

- 52 × 52 (`--size-control-lg`) statt 80 × 80, Fläche `--layer-surface-elevated`, Kontur
  1 px `--layer-border`, Tabler-X 24 px (`--size-icon-lg`) statt „✕“. Hover (nur echte Zeiger)
  und gedrückt: Kontur `--color-neutral-500`. Die Sonderregel 60 × 60 unter 760 px ist entfernt.
- Vertikal mittig zur Headline (`.action-hdr` mit `align-items: center`). Die Headline selbst ist unverändert.
- `index.html`: SVG im Button, `station-04.css?v=7`.

## Enigma-Screen: Hintergrundbild wie Startscreen (2026-09-30)

- Der Aktions-Screen zeigt dasselbe Bild wie der Start (`dither-output.png`) in derselben
  Position und Deckkraft: gleiche Markup-Klasse `.start-visual`, Bildquelle aus `STATION_CONTENT.start.image`.
  Gemessen bei 1563 × 864: beide Bilder bei x 647, y −156, 1016 × 1020.
- Das alte `::before` mit `img/eknigma01.png` ist entfernt (Datei bleibt im Ordner, wird nicht mehr genutzt).
- Deckkraft auf dem Enigma-Screen `.08` statt `.28` (Start bleibt `.28`), damit das Bild nicht ablenkt.
- `index.html`: `#actionImage`, `station-04.css?v=10`, `station-04.js?v=7`.

## Schließen setzt die Maschine zurück (2026-09-30)

- × auf dem Enigma-Screen ruft `resetMachine()` auf: Eingabe und Ausgabe leer, Walzen auf
  Startstellung, keine Lampe/Taste aktiv. Der nächste Besuch sieht nichts vom vorherigen.
- `index.html`: `station-04.js?v=8`.

## Eingabe startet leer (2026-09-30)

- Das Platzhalterwort „Auto“ / „Ready“ im Eingabefeld ist entfernt (`emptyInput`), ebenso die
  Demo-Werte „XLWS“ / Lampe „H“ im Inhaltsobjekt. Vor dem ersten Tastendruck sind Eingabe und
  Ausgabe leer; die Felder behalten ihre Höhe (`.io-val` mit `min-height`).
- `index.html`: `station-04.js?v=9`.

## Enigma-Screen: Headline und Rand wie Station 01–03 (2026-09-30)

| Element | vorher | jetzt (wie `../station-03/`) |
| --- | --- | --- |
| Außenabstand | `clamp(24–40px)`, ≤ 900 px hoch `32px 40px` | `--space-6` (32) ringsum |
| Headline | 68 px, Zeilenhöhe .92, `margin-top` 10 px, −0,01em / Wortabstand .24em | `--font-size-h3`, Zeilenhöhe 1,2, −0,035em, Wortabstand .3em, `.title-word` ohne Abstand rechts |
| Headline ≤ 760 px | `clamp(38–56px)`, jedes Wort eine Zeile | entfernt, Größe nur über das Token |
| Kopfzeile | 73 px hoch, × bei 42 / 40 vom Rand | 52 px hoch, × bündig bei 32 / 32 |

- Gemessen bei 1563 × 864: identisch mit Station 03 (Titel x 32 / y 36, × x 1479 / y 32).
- `.action-hdr-copy { flex: 1; min-width: 0; }` wie Station 03.
- `index.html`: `station-04.css?v=11`.

## Enigma größer und zentriert (2026-10-01)

- Tablet quer (Regel `max-height: 900px`): Maschine größer, ca. 94 % der Figma-Fläche statt 80 %.
  Tasten 60 px (vorher 52), Tastenabstand 14 px (12), Walzenfenster 104 px (92), Zeilen- und Spaltenabstand 36 px (32),
  Seitenspalte 260 px (240).
- Panel horizontal und vertikal mittig (`justify-content: center`; vorher linksbündig). Auf dem Tablet quer hat der
  Aktionsscreen unten keinen Innenabstand mehr, damit das Panel genau zwischen Headline und Unterkante sitzt:
  je 63 px (≈ `--space-8`) oben und unten, je 179 px links und rechts.
- `index.html`: `station-04.css?v=12`.

## Enigma-Screen ohne Hintergrundbild (2026-10-01)

- Auf dem Aktionsscreen (Walzen, Lampenfeld, Tastatur) gibt es kein Hintergrundbild mehr (vorher das Startbild mit
  Deckkraft .08). Markup, Bildzuweisung in `station-04.js` und die Regel `.screen-action .start-visual` sind entfernt.
  Der Startscreen behält sein Bild.
- `index.html`: `station-04.css?v=13`, `station-04.js?v=10`.
- Geprüft: Schließen setzt Eingabe, Ausgabe und Walzen zurück (`resetMachine`, bestand schon).
