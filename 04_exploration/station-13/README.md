# Station 13 · Free-Banking-Era (Station 11 in der Ausstellung)

Startscreen mit Leseansicht von links und drei Vertiefungen von rechts. Keine Aktion.

## Startscreen wie Station 03, 10, 11 und 12 (2026-10-01)

Maße, Abstände, Farben und Typografie wie der Startscreen von Station 12 (Basis Station 03).
Alle Werte kommen aus `tokens.css`, es gibt keine lokale Typo-Skala. `station-13.bundle.css` ist durch
`station-13.css` ersetzt, `station-13.js` ist neu aufgebaut (Texte unverändert übernommen).

- **Titel:** `--font-size-h1`, Zeilenhöhe 1,1, Laufweite −0,035em, Wortabstand 0,3em. Keine feste Trennung nötig.
  Die alte Sondergröße (64 px) und die Längenklassen `title--medium` / `title--long` sind entfernt.
- **Start:** nur Absatz 1 (`--font-size-body-l`, weiß), Textspalte 820 px. Darunter „Weiterlesen“ / „Read more“
  mit `--space-8` Abstand. Absatz 2 bis 4 sind zu lang für den Start. Der Scrollbereich der alten Fassung ist entfernt.
  Tablet quer (1563 × 864): „Weiterlesen“ endet bei DE 782 px, EN 746 px, links vom CTA ohne Überschneidung.
- **Leseansicht** (`shared/…/station-offcanvas.*`, von links): Eyebrow „Hintergrund“ (Standard), Titel der Station,
  Absatz 1 als Lead, Absatz 2 bis 4 darunter ohne Zwischenüberschrift. Keine „Auf den Punkt gebracht“-Box.
- **Vertiefung:** CTA unten rechts wie in Station 10 bis 12 (blau, `--size-control-lg`), Label „Vertiefung“ / „Deep dive“
  (vorher „Vertiefungen“, ohne freigegebene EN-Fassung), Icon Glühbirne (`00_design-system/symbols/bulb.svg`).
  Öffnet dieselbe Leseansicht **von rechts** (`side: 'right'`, id `stationDeepDive`). Eyebrow und Region-Label
  „Vertiefung“ / „Deep dive“, Titel der Station. Die drei Vertiefungen stehen untereinander, jede mit ihrem Titel
  als Zwischenüberschrift (`station-offcanvas__section-title`); die Kicker „Vertiefung 1–3“ entfallen.
  Der alte Aktionsscreen mit Akkordeon und ✕ ist entfernt.
- **Bild:** Drei-Dollar-Note der Bank of Washtenaw (`dither-output.png`) rechts unten wie Station 10 und 11:
  Breite 1180 px, max. 1020 px hoch, ragt 160 px über den rechten Rand, Deckkraft .28.
  `dither-output_old.png` ist nicht eingebunden.
- `index.html`: `station-13.css?v=1`, `station-13.js?v=1`.

## Fester Umbruch im Titel (2026-10-01)

- **Titel (DE):** Umbruch nach „sogenannte“ und vor der Jahreszahl, also „Die sogenannte“ / „„Free-Banking Era““ / „(1837–1863)“.
  Im Text steht dafür `\n`, `setTitle` macht daraus ein `<br>`. In den Leseansichten wird es zum Leerzeichen.
  Der englische Titel ist unverändert.
- `index.html`: `station-13.js?v=3`.

## Banknote zentriert, größer, weiter rechts (2026-10-01)

- **Bild:** vertikal zentriert (`align-items: center`, `object-position: center right`, oben und unten bündig mit dem Screen).
  20 % größer: Breite 1416 px (vorher 1180), max. 1224 px hoch (vorher 1020).
  20 % der Bildbreite nach rechts versetzt (`transform: translateX(20%)`, rund 283 px), zusätzlich zu den 160 px Überstand.
  Deckkraft unverändert .28.
- Lage der Note (1416 × 603 px): Tablet quer (1563 × 864) von y 130 bis 734, x ab 590;
  Tablet hochkant (864 × 1563) y 480 bis 1083; Stele (1080 × 1920) y 658 bis 1262.
- `index.html`: `station-13.css?v=2`.

## Vertiefungen als blaue Accordions, Banknote tiefer (2026-10-01)

- **Vertiefungen:** Die drei Abschnitte in der Leseansicht von rechts sind jetzt blaue Boxen zum Aufklappen
  wie die Vertiefungen in Station 08: Rahmen `--immersive-focus`, Fläche `--color-feedback-info-bg`,
  Kicker „Vertiefung 1–3“ / „Deep dive 1–3“ (DM Mono, `--font-size-caption-m`, `--color-feedback-info`),
  Titel Switzer 600 `--font-size-body-l` (eine Stufe über dem Fließtext der Leseansicht), Plus/Minus rechts.
  Immer nur eine offen, die geöffnete rückt nach oben. Beim Schließen der Leseansicht klappen alle zu.
- Dafür ist die geteilte Leseansicht erweitert (`collapsible: true` je Abschnitt, optional `kicker`),
  in `shared/js/station-offcanvas.js` und `shared/css/station-offcanvas.css`. Rein additiv:
  Stationen ohne `collapsible` sehen aus wie bisher (Station 12 geprüft).
- **Bild:** zusätzlich um 20 % der Bildhöhe nach unten versetzt (`transform: translateY(20%)` am Bild, rund 121 px).
  Tablet quer: y 251 bis 854; Tablet hochkant: y 600 bis 1204; Stele: y 779 bis 1382.
- `index.html`: `station-13.css?v=3`, `station-13.js?v=4`.

## Accordion animiert (2026-10-01)

- Auf- und Zuklappen der Vertiefungen animiert die Höhe: `--duration-5` (640 ms), `--ease-standard`.
  Bei reduzierter Bewegung kürzen die Tokens auf 80 ms.
- Öffnet man eine Box, während eine andere offen ist, klappt die eine zu und die andere auf; der Scrollbereich
  wandert in derselben Zeit mit, bis die geöffnete Box oben steht.
- Umgesetzt in der geteilten Leseansicht (`shared/js/station-offcanvas.js`, `shared/css/station-offcanvas.css`),
  keine Änderung an Station 13 selbst.

## Boxen ohne Breitensprung (2026-10-01)

- Vorher wurden die Boxen schmaler, sobald eine aufging und der Scroll-Indikator erschien.
  Jetzt reserviert die Leseansicht seinen Platz von Anfang an (unsichtbar, solange nichts zu scrollen ist).
  Breite der Boxen konstant: Tablet quer 686 px, Tablet hochkant 336 px, Stele 444 px.
- Umgesetzt in der geteilten Leseansicht, nur für Ansichten mit `collapsible`-Abschnitten. Station 12 unverändert.

## Banknote 10 % höher (2026-10-01)

- **Bild:** Versatz nach unten von 20 % auf 10 % der Bildhöhe (`translateY(10%)`, rund 60 px), also 10 % nach oben.
  Tablet quer: y 191 bis 794.
- `index.html`: `station-13.css?v=4`.

## Test: rechte Leseansicht heller, Banknote mittig (2026-10-01)

- **Test, nur Station 13:** Die rechte Leseansicht (Vertiefung, `#stationDeepDive`) hat `--layer-surface-elevated`
  (#1A1C23) statt `--layer-surface-raised` (#0B0B0F), also die nächsthellere Fläche. Lokal in `station-13.css`,
  die geteilte Komponente und die linke Leseansicht sind unverändert.
- **Bild:** nochmals 10 % der Bildhöhe nach oben. Damit entfällt der Versatz nach unten, die Note ist genau
  vertikal zentriert. Tablet quer: y 130 bis 734.
- `index.html`: `station-13.css?v=6`.

## Test: linke Leseansicht ebenfalls heller (2026-10-01)

- Auch die linke Leseansicht („Weiterlesen“) hat jetzt `--layer-surface-elevated` (#1A1C23) wie die rechte.
  Weiter nur lokal in `station-13.css`, die geteilte Komponente ist unverändert.
- `index.html`: `station-13.css?v=7`.

## Hellere Leseansicht global (2026-10-01)

- Der Test ist übernommen: `--layer-surface-elevated` gilt jetzt in der geteilten Komponente
  (`shared/css/station-offcanvas.css`) für alle Leseansichten aller Stationen.
  Die lokale Regel in `station-13.css` ist entfernt.
- `index.html`: `station-13.css?v=8`.

## Banknote nochmals 20 % größer (2026-10-01)

- **Bild:** Breite 1699 px (vorher 1416), max. 1469 px hoch (vorher 1224). Weiter vertikal zentriert,
  160 px Überstand rechts plus 20 % der Bildbreite nach rechts (jetzt rund 340 px, wächst mit).
- Lage (1699 × 724 px): Tablet quer y 70 bis 794, x ab 364; Tablet hochkant y 420 bis 1143; Stele y 598 bis 1322.
- `index.html`: `station-13.css?v=9`.
