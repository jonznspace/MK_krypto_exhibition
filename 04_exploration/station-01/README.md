# Station 01 — Optimization

Ursprünglich als `station-01-optimization` aus der alten `station-01` kopiert; seit
2026-09-30 ersetzt dieser Ordner die alte Station. Erste visuelle Abstimmung auf
den fest installierten Tablets im Querformat. Einstieg: `index.html`.

Die zusätzliche `optimization.css` wird nach den bisherigen Styles geladen.
Sie ist über die Body-Klasse `station-optimization` lokal begrenzt. Alle
Schriftgrößen kommen aus den globalen `--font-size-*`-Tokens
(`00_design-system/tokens/tokens.css`); es gibt keine lokale Typo-Skala.
Lokal bleiben nur die Linienstärken `--opt-line` (1 px) und `--opt-focus` (2 px).

## Änderungen

- Starttitel: 64 px statt aktuell 88 px, bewusster Umbruch nach „Verschlüsseln“.
- Aktionstitel: 48 px statt 68 px; Zeilenhöhe 1,1 und normale Wortabstände.
- Einführung: drei kurze Sätze in Switzer 24 px, direkt sichtbar ohne Scrollleiste.
- „Weiterlesen“: blauer Outline-Button, DM Mono 16 px, transparente Grundfläche.
- Leseansicht: Off-Canvas von links, bis zu 880 px breit und volle Bildschirmhöhe.
  Ein- und Ausfahrt mit `duration-4` (400 ms), Entrance-/Exit-Easing ohne Bounce.
  Hintergrund wird mit 80 % Schwarz abgedunkelt, ohne Blur oder Schatten.
  Panel-Fläche: `--layer-surface-raised` / `--color-neutral-875` (#0B0B0F),
  ohne farbigen Rahmen. Headline in Switzer Semibold (600), 36 px; Kicker weiß.
  Vollständiger Text in Switzer 20 px / Zeilenhöhe 1,5,
  scrollbar bei feststehendem Kopfbereich.
- Zwischenüberschriften „Skytale“ und „Caesar-Chiffre“ in Switzer Semibold,
  24 px, normale Groß-/Kleinschreibung; englische Entsprechungen vorhanden.
- Letzter Absatz als „Auf den Punkt gebracht“ / „Key takeaway“ in einer Infofläche mit
  24 px Innenabstand und blauer 1-px-Kontur (`--immersive-focus`).
  Vorhandener Token `--color-feedback-info-bg` (Dark: `--color-secondary-900`,
  #0A132E), Info-Label über `--color-feedback-info`.
- Seit 2026-09-30 ist die Leseansicht (inkl. „Weiterlesen“-Button) die globale
  Komponente `shared/css/station-offcanvas.css` + `shared/js/station-offcanvas.js`.
  Nutzung für andere Stationen: `shared/README.md`.
- Schließen über das vorhandene Tabler-Outline-X: 24-px-Icon auf einer
  52-px-Touchfläche, mit deutscher/englischer zugänglicher Beschriftung.
- Schließen per Button, Escape oder Tippen auf den Hintergrund; Fokus kehrt zu
  „Weiterlesen“ zurück. Der darunterliegende Screen ist während des Lesens inaktiv.
- Kurzeinführung, Leseansicht und ihre Bedienung liegen auf Deutsch und Englisch vor.
- Feldbeschriftungen und Modellhinweise: 16 px; kleine Metadaten: 14 px.
- Buttons, Tabs und Sprachauswahl: einheitlich DM Mono, 16 px, versal.
- Stations-Tag: kompakte 32 px Höhe und 12 px horizontaler Innenabstand je Segment.
- Einstieg in die Vertiefung: durchgehend blau, weiße Schrift und weißes 24-px-Icon;
  auch Hover und gedrückter Zustand bleiben blau.
- Zurück-Button: 52-px-Fläche mit Tabler-Outline-X statt Textzeichen.
- Aktive Tabs und Sprache: orange Schrift und Unterkante auf dezenter Fläche.
- DE/EN-Switch: unverändert große Touchflächen und bisheriger Stil.
- Leserichtung: hellblauer Text, blaue Kontur und dunkle blaue Fläche.
- Ergebnisfeld und Modellstatus: neutrale Flächen und Schrift; Erfolg behält einen Haken.
- Außenabstand und Abstand zwischen Modulen: 32 px; Textabstände aus der vorhandenen Skala.
- Startscreen reserviert unterhalb des Lesebereichs Platz für die Hauptaktion.
- Idle-Overlay: Dimmen ohne Blur, Panchang/Switzer/DM Mono und lokale Schriftgrößen.

## Umfang

Das vorhandene Querformat-Grundlayout und der Screenwechsel bleiben erhalten.
Keine neuen Responsive-Breakpoints. Die konkrete Pixelauflösung wird in dieser
Runde nicht neu definiert; der bestehende bildschirmfüllende Rahmen bleibt bestehen.
Skytale-Simulation, Tastatur, Modellbewegung und Idle-Timing sind unverändert übernommen.
Der vollständige deutsche Einführungstext bleibt erhalten und steht jetzt in der
Leseansicht. Die englische Einführung ist lokal übersetzt. Die alte eigene
Startscreen-Scrolllogik wurde durch den Weiterlesen-Ablauf ersetzt. Die Leseansicht
nutzt natives Scrollen und liegt unterhalb der vorhandenen Idle-Warnung.
Auch der historische Unterordner ist unverändert kopiert.

Für weitere visuelle Anpassungen `optimization.css` bearbeiten; Änderungen an der
Leseansicht in `shared/css/station-offcanvas.css` (wirken auf alle Stationen).
Kurz- und Volltext liegen im `STATION_CONTENT` der lokalen `station-01.js`
(`start.summary` bzw. `start.reading`); das Markup der Leseansicht erzeugt die Komponente. „Ausprobieren“ bleibt die blau gefüllte Hauptaktion, „Weiterlesen“
nutzt die zurückhaltendere Outline-Stufe; die Text-only-Stufe bleibt hier unbenutzt.

## Vertiefungsebene v2

Der Skytale-Screen wurde am 2026-09-29 als geführter Ablauf überarbeitet
(`vertiefung.css`, `station-01.js`, `index.html`). Details und Rückweg zum
vorherigen Stand stehen in `CHANGELOG.md`, die Sicherung liegt in
`_checkpoint-2026-09-29-vor-vertiefung/`.

## Leseansicht ohne Infobox (2026-10-01)

- Der letzte Absatz („Beide Verfahren sind leicht zu knacken …“ / „Both methods are easy to crack …“) steht nicht mehr
  in der blauen Infobox „Auf den Punkt gebracht“ / „Key takeaway“, sondern als normaler Absatz am Ende,
  ohne Zwischenüberschrift. Text unverändert, nur die Box-Überschrift entfällt.
- `index.html`: `station-01.js?v=22`.

## Schließen setzt zurück (2026-10-01)

- Schließen der Vertiefung (✕) stellt den Startzustand her: Tab „Verschlüsseln“, Standardnachricht und Stabdicke,
  Streifen aufgewickelt, erstes Rätsel, Tastatur zu, Ansicht des Stabs wie beim Laden (`SkytaleModel.resetView`).
  Vorher blieb die Eingabe des vorigen Besuchers stehen.
- `index.html`: `station-01.js?v=23`.
