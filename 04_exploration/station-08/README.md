# Station 08 · Was ist Geld? (Station 6 in der Ausstellung)

Hochkant-Stele, fest **1080 × 1920**. Als hoher Screen (≥ 1000 px breit und ≥ 1700 px hoch)
bekommt sie die **Desktop-Typo** (Regel G4 in `03_design/VISUAL_LANGUAGE.md`, umgesetzt in `tokens.css`).

## Starttitel in `display` (2026-09-30)

Umbau des Startscreens, Schritt 1: Der Titel nutzt `--font-size-display` statt `--font-size-h1`
(auf der Stele 96 statt 64 px). Zeilenhöhe 1,1, Laufweite −0,035em und Wortabstand 0,3em bleiben
wie in Station 03. „Was ist Geld?“ / „What Is Money?“ brechen auf zwei Zeilen um.
`index.html`: `station-08.css?v=2`.

Schritt 2: Einführungstext einheitlich in `--font-size-body-l` (größter Lauftext-Token,
auf der Stele 24 px), Zeilenhöhe 1,45, weiß, 65ch. Kein abgesetzter Lead mehr.
Passt ohne Scrollen auf den Screen. `index.html`: `station-08.css?v=3`.

Schritt 3: Neuer Token `--font-size-body-xl` (Desktop 32, Tablet 28, Phone 24), **nur für
diese Station**. Einführungstext jetzt in `body-xl`, Zeilenhöhe 1,4. Der Text ist auf der Stele
rund 270 px höher als der Scrollbereich; es scrollt, der blaue Indikator erscheint.
Token in `tokens.css`, `tokens.json`, `VISUAL_LANGUAGE.md` (§5). `index.html`: `station-08.css?v=4`.

Schritt 4: Mehr Luft um die Headline: Stations-Tag → Headline `--space-9` (96) statt `--space-8` (64),
Headline → Text `--space-8` (64) statt `--space-5` (24). `index.html`: `station-08.css?v=6`.

Schritt 5: Stations-Tag 1,5-fach: Höhe `--space-7` (48) statt `--space-6` (32), innen `--space-4` (16)
statt `--space-3` (12), Schrift `--font-size-caption-l` (Stele 24) statt `caption-m` (14). `index.html`: `station-08.css?v=7`.

Schritt 6: Bedienelemente 1,5-fach (DE/EN, „Mehr erfahren“, „Schließen“). Kein Control-Token
über 52 px, daher lokal abgeleitet: `--stele-control` = `--size-control-lg` × 1,5 (78),
`--stele-icon` = `--size-icon-lg` × 1,5 (36). Schrift `--font-size-caption-l` statt `label`
(kein größerer Label-Token), Innenabstand DE/EN `--space-5`, Buttons `--space-6`.
Platz unten für die Bedienzeile entsprechend größer. `index.html`: `station-08.css?v=8`.

Schritt 7: Icon im Button „Mehr erfahren“: Glühbirne (`symbols/bulb.svg`, Tabler) statt `brand-apple-arcade.svg`.

Schritt 8: Abstand Inhalt → Bedienzeile `--space-7` (48) statt `--space-6` (32), Start und Vertiefung. `index.html`: `station-08.css?v=9`.

### Vertiefung: Schrift und Größen wie der Startscreen (2026-09-30)

| Element | vorher | jetzt |
| --- | --- | --- |
| Headline | `h3` | `display`, Zeilenhöhe 1,1 (wie Starttitel) |
| Abstand Headline → Liste | `--space-6` | `--space-8` (wie Headline → Text) |
| Abstand zwischen Boxen | `--space-5` | `--space-6` |
| Box-Kopf | 52 hoch, innen `--space-4` / `--space-5` | `--stele-control` (78), innen `--space-5` / `--space-6` |
| Label „Vertiefung 1“ | `caption-m` | `caption-l` (wie Stations-Tag) |
| Box-Titel | Switzer 600 `body-l` | Switzer 600 `h3` (eine Stufe über dem Fließtext) |
| + / − | DM Mono `h4` | DM Mono `h3` |
| Fließtext | `body-m`, 1,5 | `body-xl`, 1,4 (wie Einführung) |
| Zeitleiste | Einzug `--space-6`, Punkt `--space-3`, Titel 600 `body-m` | Einzug `--space-7`, Punkt `--space-4`, Titel 600 `body-xl` |

`index.html`: `station-08.css?v=10`.

- Headline auf derselben Höhe wie der Starttitel (176 px): `margin-top` = `--space-7` (Tag-Höhe) + `--space-9`.
- Hintergrundbild 200 % (`min(144vw, 1800px)` statt `min(72vw, 900px)`), horizontal mittig statt rechts.
  `index.html`: `station-08.css?v=11`.
- Hintergrundbild jetzt 300 % der ursprünglichen Größe (`min(216vw, 2700px)`, auf der Stele ca. 2330 px breit); 400 % war zu groß. `index.html`: `station-08.css?v=13`.
- Hintergrundbild um 10 % der Screenhöhe angehoben (`bottom calc(2% + 10vh)`, Stele 192 px). `index.html`: `station-08.css?v=14`.
- Hintergrundbild auch auf dem Startscreen, gleiche Größe und Position, Deckkraft .08 (Vertiefung bleibt .2). `index.html`: `station-08.css?v=16`.

## Desktop-Typo für hohe Screens (2026-09-30)

Bis dahin bekam die Stele wegen ihrer 1080 px Breite die Tablet-Stufe (H1 48, Fließtext 18).
Jetzt greifen die Desktop-Werte (H1 64, Lead 24, Fließtext 20). Geändert wurden nur
`tokens.css`, `tokens.json` (Notiz) und `VISUAL_LANGUAGE.md`; die Station-CSS bleibt unverändert.

| Viewport | Stufe |
| --- | --- |
| 1080 × 1920 (Stele) | Desktop |
| 864 × 1563 (Tablet hochkant) | Tablet |
| 1563 × 864 (Tablet quer) | Desktop |
| 1024 × 1366, 999 × 1920, 1080 × 1699 | Tablet |

## Auf Tokens umgestellt (2026-09-30)

Maße, Abstände, Farben und Typografie wie Station 03 (Startscreen) und Station 07
(Hochkant, Scroll-Indikator, Vertiefungs-Box). Alle Werte kommen aus `tokens.css`,
es gibt keine lokale Typo-Skala. `station-08.bundle.css` (Template + Overrides) ist
durch `station-08.css` ersetzt.

**Sonderfall Stele:** Die Bedienelemente stehen unten. DE/EN sitzt unten links, der große
Button unten rechts, beide mit `--space-6` Abstand zum Rand.

### Startscreen

| Element | vorher | jetzt |
| --- | --- | --- |
| Hintergrund | 72-px-Raster über `--immersive-bg` | `--immersive-bg`, kein Raster |
| Außenabstand | 72 / 64 / 88 px | `--space-6` (32), unten zusätzlich Platz für die Bedienzeile |
| Stations-Tag | 15 px, 32 × 14 px, `#ed8003` | `--font-size-caption-m`, `--space-6` hoch, `--space-3` innen, `--immersive-accent` |
| Titel (H1) | `clamp(80–132px)`, max. 9ch, 180 px Abstand | `--font-size-h1` (inzwischen `display`, s. o.), Zeilenhöhe 1,1, Laufweite −0,035em, Wortabstand 0,3em, `--space-8` unter dem Tag |
| Einführung | 31 px, Blocksatz, Silbentrennung, `--immersive-body` | Leseansicht-Typo: Absatz 1 `--font-size-body-l`, Rest `--font-size-body-m`, alles weiß, linksbündig, 65ch |
| Scrollen | dünner nativer Balken (orange) | blauer Scroll-Indikator (`StationOffcanvas.scrollIndicator`), blendet sich aus, wenn alles passt |
| DE/EN | 13 px, 32 px hoch | wie Station 03: 52 × 52, `--font-size-label`, orange Schrift + Unterkante auf `--state-selected-surface` |
| Mehr erfahren | Panchang 22 px, grau + blaues Icon, 68 px | wie Station 03: durchgehend blau, DM Mono `--font-size-label`, 52 px, Icon 24 px |

- Alle fünf Absätze bleiben auf dem Startscreen, es gibt keine „Weiterlesen“-Ansicht. Die
  Leseansicht wäre auf 1080 px Breite nur 540 px breit.

### Vertiefung

| Element | vorher | jetzt |
| --- | --- | --- |
| Headline | Panchang `clamp(52–92px)` | wie Station 03: `--font-size-h3`, Zeilenhöhe 1,2 |
| Schließen | 80 × 80, „✕“, unten rechts | **großer grauer Button** in Form und Position von „Mehr erfahren“: Label „Schließen“ + Tabler-X, `--color-neutral-800`, Trennlinie `--color-neutral-600`, gedrückt/Hover `--color-neutral-700` |
| Aufklapper | Panchang-Titel, orange Zeitleiste außen, orange Fläche offen, „⌄“ | wie Station 07: blaue Box (`--immersive-focus`, `--color-feedback-info-bg`), Label DM Mono `--font-size-caption-m` in `--color-feedback-info`, Titel Switzer 600 `--font-size-body-l`, +/− rechts |
| Inhalt | Karten in der Box, 13–34 px gemischt | `--font-size-body-m`, weiß, 65ch; Zäsuren und Geldformen als Zeitleiste (Linie `--color-secondary-700`, Punkte `--color-feedback-info`), Einträge mit Titel Switzer 600 `--font-size-body-m` |
| Scrollen | dünner nativer Balken, Liste vertikal zentriert | blauer Scroll-Indikator, Liste beginnt oben |

- Immer nur eine Vertiefung offen. Die geöffnete rückt an den Anfang des Scrollbereichs.
- **Schließen setzt zurück:** Alle Vertiefungen werden zugeklappt und die Liste springt nach oben.
- Das Hintergrundbild (`dither-output.png`, Deckkraft .2) bleibt stationsspezifisch.
- „Schließen“ wird im EN-Modus über den Sprachumschalter zu „Close“.

### Dateien

- `index.html`: Scrollbereiche mit Indikator-Markup, grauer Schließen-Button, Off-Canvas-CSS/JS
  für den Indikator, `station-08.css?v=1` (jetzt `v=2`), `station-08.bundle.js?v=4`.
- `station-08.css`: neu, ersetzt `station-08.bundle.css`.
- `station-08.bundle.js`: toter Template-Block (Tabs, Demo-Texte) entfernt. Neu: Screen-Wechsel
  mit Zurücksetzen, Vertiefungs-Markup ohne `innerHTML`, eine Zeitleisten-Funktion für
  Zäsuren und Geldformen, Scroll-Indikatoren. Inhalte unverändert.

### Offen

- **Nicht übersetzt:** Das Stations-Thema „Neue Entwicklungen“ bleibt im EN-Modus deutsch
  (Vorschlag „New developments“ auf der Freigabe-Seite, noch offen).
- „Mehr erfahren“ → „Learn more“ (2026-09-30, auf Anweisung; Vorschlag der Freigabe-Seite),
  eingetragen in `shared/js/station-language-switch.js` (`EXACT_TRANSLATIONS`).
