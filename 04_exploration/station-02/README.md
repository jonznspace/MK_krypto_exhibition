# Station 2 — Zirkel & Permutationsscheibe (Draft)

Interaktives Tablet für Station 2, im immersiven Design-System. Fix **1920×1080**,
skaliert automatisch auf das Browserfenster.

## Starten

`index.html` im Browser öffnen. Falls die Fonts über `file://` nicht laden, kurz einen
lokalen Server starten und `http://localhost:8000/04_exploration/station-02/` öffnen:

```bash
# im Repo-Root:
python3 -m http.server 8000
```

## Enthalten

- Drehbare Scheibe (Ziehen mit dem Finger/Maus, rastet auf Buchstaben; ◀ ▶ zum Steppen)
- **Verschlüsseln**: Vorgabe-Wörter oder A–Z antippen, Mapping-Animation, Chiffre live
- **Knacken**: abgefangene Botschaft aufdrehen, bis ein Wort erscheint → „geknackt“
- **Vertiefung** (blau): schwarze Kammern + Permutationsscheibe (26 vs. 26! Schlüssel)
- Attract-Mode (60 s Leerlauf), Cue-Sounds, reduced-motion, Touch-Targets ≥ 44px

## Werte

Alles aus `../../00_design-system/tokens/` (`tokens.css` inkl. Fonts). Kein CDN.

## Startscreen auf Tokens (2026-09-30)

Maße, Abstände und Typografie des Startscreens entsprechen Station 01
(Referenz: `../station-01/`). Alle Werte kommen aus `tokens.css`, es gibt keine
lokale Typo-Skala. Aktions-Screen und Vertiefungs-Overlay folgen als nächste Schritte.

| Element | vorher | jetzt |
| --- | --- | --- |
| Außenabstand | `clamp(40–88 / 24–72px)` | `--space-6` (32) |
| Stations-Tag | 15 px, 32 × 14 px, `#ed8003` | `--font-size-caption-m`, `--space-6` hoch, `--space-3` innen, `--immersive-accent` |
| DE/EN | 13 px, 32 px hoch, orange gefüllt | `--font-size-label`, 52 × 52, orange Schrift + Unterkante auf `--state-selected-surface` |
| Eyebrow | fehlte | „Verschlüsseln mit System“, `--font-size-label` |
| Titel (H1) | 108/88/68 px je Länge | `--font-size-h1`, Zeilenhöhe 1,1, Laufweite −0,035em, Wortabstand 0,3em |
| Einführung | 3 Absätze, 24 px, scrollbar | nur Absatz 1, `--font-size-body-l`, weiß, 820 px breit |
| Weiterlesen | – | geteilte Leseansicht `shared/…/station-offcanvas.*`, `--space-8` Abstand |
| Ausprobieren | Panchang 22 px, grau + blaues Icon, 68 px | durchgehend blau, DM Mono `--font-size-label`, 52 px, Icon 24 px |

- **Leseansicht:** Absatz 1 als Lead, Absatz 2 unter „Der kryptografische Zirkel“,
  Absatz 3 unter „Die „Permutationsmaschine““. Keine „Das Wichtigste“-Box.
  EN-Zwischenüberschriften („The cryptographic dividers“, „The “permutation machine”“)
  sind aus dem vorhandenen EN-Text abgeleitet und **noch nicht freigegeben**.
- **Bildposition** (Scheibe rechts unten) bleibt stationsspezifisch. Bild auf 150 % vergrößert
  (1920 × 1440 statt 1280 × 960); die linke Kante bleibt, es wächst nach rechts und unten und sitzt 20 % der
  Screenhöhe (`20vh`) höher als vorher.
- Dateien: `index.html` (Eyebrow, `hero-summary`, Trigger, Off-Canvas eingebunden,
  `station-02.css?v=6`, `station-02.js?v=9`), `station-02.css` (Block „Startbildschirm“,
  `#000` → `--immersive-bg`), `station-02.js` (Eyebrow, Kurztext, `StationOffcanvas.create`).

## Aktions-Screen: Typografie auf Tokens (2026-09-30)

Nur Schrift, Layout und Abstände folgen im nächsten Schritt.

| Rolle | vorher | jetzt |
| --- | --- | --- |
| Screen-Titel | `<h1>`, 68 / 58 px | `<h2>`, `--font-size-h3`, Panchang 800, Zeilenhöhe 1,2, Wortabstand .3em (wie Station 01) |
| Schließen | „✕“ in Arial | Tabler-X als SVG, 24 px |
| Hinweis/Aufgabe | 19 px, grau | `--font-size-body-m` / 1,45, weiß |
| Feldbeschriftungen, „Schlüssel“ | 12–13 px, .16–.18em, `--immersive-muted` | `--font-size-caption-m`, .06em, `--immersive-body`; Labelspalte 128 px |
| Buttons, Tabs, Chips, A–Z | `label`, .06–.1em | `--font-size-label` / 1,4, .04em |
| Buchstaben-Kacheln, Schlüssel A → X | 26 / 30 px | `--font-size-h4` (28), DM Mono 500 |
| Status „Knacken“ | DM Mono 20, gelöst orange | wie Ergebnisfeld Station 01: offen gestrichelt (Switzer `label`), gelöst grüner Rahmen + Haken (DM Mono `body-m`); Klartext-Kacheln grün umrandet |
| Leerlauf-Hinweis, Toast | 18 px | `--font-size-label` |
| Scheibe (SVG) | 20 Einheiten ≈ 13 px | bewusst unverändert, Grafik außerhalb der Typo-Skala |

- **Vertiefung** ist jetzt die geteilte Leseansicht (`station-offcanvas`) **von rechts**
  (neue Option `side: 'right'`, siehe `shared/README.md`). Eyebrow „Vertiefung“ / „Deep dive“,
  Button „Weitere Verschlüsselungsverfahren“ im Stil von „Weiterlesen“ (blaue Outline, ohne Punkt).
  Das alte Overlay (`.overlay`, `.ov-*`) und seine Sounds sind entfernt.
- Ungenutztes CSS entfernt: `.hdr`, `.tag`, `.kicker`, `.intro`, `.mute`, `.perm-*`, `.vert-dot`.
- Dateien: `index.html` (`station-02.css?v=8`, `station-02.js?v=10`), `station-02.css`, `station-02.js`,
  `shared/css/station-offcanvas.css`, `shared/js/station-offcanvas.js`, `shared/README.md`.

## Aktions-Screen: Bühne vertikal zentriert (2026-09-30)

- Scheibe und Panel stehen vertikal mittig zwischen Unterkante der Headline und
  Viewport-Unterseite (`.stage`: `align-content/align-items: center`; `.screen-action`
  unten ohne Padding). Gemessen bei 1563 × 864: je 95 px (Scheibe) bzw. 85 px (Panel) oben und unten.
- Der Schließen-Button liegt absolut rechts oben und bestimmt die Kopfhöhe nicht mehr.
- Beide Modi liegen in `.modes` übereinander, der inaktive ist nur unsichtbar. Das Panel
  ist dadurch immer gleich hoch: Tabs und Vertiefungs-Button springen beim Moduswechsel nicht.
- `index.html`: Wrapper `.modes`, `station-02.css?v=9`.

## Schließen-Button wie Station 01 (2026-09-30)

- 52 × 52 (`--size-control-lg`) statt 80 × 80, Fläche `--layer-surface-elevated`, Kontur
  1 px `--layer-border`, Tabler-X 24 px. Hover (nur echte Zeiger) und gedrückt: Kontur `--color-neutral-500`.
- Vertikal mittig zur Headline, wie im Kopf von Station 01; bleibt absolut positioniert,
  damit die Bühne weiter zur Headline zentriert.
- Abstand zum Rand folgt noch dem alten Screen-Padding (40 px statt 32 px bei 1563 px).
- `index.html`: `station-02.css?v=10`.

## Hintergrundbild dunkler (2026-10-01)

- **Bild:** Deckkraft .12 statt .28. Bei gleicher Deckkraft wirkte die Scheibe deutlich heller als das
  Leibniz-Bild in Station 03, weil ihr Dither-Bild viel dichter ist (rechte Bildschirmhälfte, Tablet quer:
  62 % helle Pixel gegenüber 22 %, mittlere Helligkeit 41,9 gegenüber 12,6).
  Bei .12 liegt die mittlere Helligkeit bei rund 18. Exakt gleich wäre .08, dort ist die Scheibe aber kaum noch erkennbar.
- `index.html`: `station-02.css?v=12`.
- Nachjustiert: Deckkraft .16 (mittlere Helligkeit rechte Hälfte rund 24). `index.html`: `station-02.css?v=14`.

## Vertiefungs-Button unten rechts (2026-10-01)

- „Weitere Verschlüsselungsverfahren“ / EN-Fassung auf dem Aktionsscreen sitzt jetzt unten rechts in der Ecke,
  an derselben Position wie „Ausprobieren“ auf dem Startscreen (`right`/`bottom` je `--space-6`, 32 px).
  Dafür steht der Button nicht mehr in der Panel-Spalte, sondern direkt im Aktionsscreen. Optik unverändert
  (Trigger aus `shared/css/station-offcanvas.css`).
- `index.html`: `station-02.css?v=15`.

## Ohne Sound (2026-10-01)

- Medienstationen arbeiten ohne Sound: Das Sound-Modul (Web Audio, Klick- und Bestätigungstöne) ist aus
  `station-02.js` entfernt, ebenso alle Aufrufe (Scheibe drehen, Wort-Chips, Buchstaben, Leeren, Tabs,
  Neue Botschaft, gelöstes Rätsel, Verschlüsselungs-Animation). Kein Text verändert.
- `index.html`: `station-02.js?v=11`.

## Permutationsscheibe größer (2026-10-01)

- Tablet quer (Regel `max-height: 900px`): Scheibe 560 px statt 500 px. Abstand Headline → Scheibe 65 px
  (≈ `--space-8`), Bedienleiste endet 65 px über der Unterkante.
- Die Regel für höhere Bildschirme (548 px) ist unverändert.
- `index.html`: `station-02.css?v=16`.

## Mehr Luft um den Einleitungstext (2026-10-01)

- Panel der Permutationsscheibe: Tabs → Einleitungstext und Einleitungstext → Inhalt (Wort-Chips bzw. abgefangene
  Botschaft) je `--space-6` (32 px), vorher auf dem Tablet quer 14 bzw. 12 px. Gilt in beiden Tabs und auch auf
  größeren Bildschirmen.
- Tablet quer: Panel jetzt von 187 bis 760 px, 20 px über dem Vertiefungs-Button (der weiter rechts liegt).
- `index.html`: `station-02.css?v=17`.

## Schließen setzt zurück (2026-10-01)

- Schließen der Vertiefung (✕) stellt den Startzustand her (`resetAction`): Schlüssel A → D, erstes Beispielwort,
  Tab „Verschlüsseln“, Knacken-Botschaft verworfen (beim nächsten Öffnen von „Knacken“ neu), Hinweis ausgeblendet.
  Vorher blieb die Eingabe des vorigen Besuchers stehen.
- `index.html`: `station-02.js?v=13`.
