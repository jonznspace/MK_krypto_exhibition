# Tablet-Master für die Stationen

Separate, scrollbar aufgebaute Arbeitsfläche für die Tablet-Abstimmung. `index.html`
direkt öffnen oder mit dem bestehenden lokalen Server aufrufen:

`http://localhost:8080/04_exploration/station-master-tablet/`

Alternativ im Repository-Root: `python3 -m http.server 8000`, dann dieselbe URL mit Port 8000.

## Inhalt

- Startscreen nach dem Aufbau von Station 04, mit vorhandenem Dither-Bild.
- Drei verfügbare Font-Familien und alle 13 Rollen der zentralen Typografieskala.
- Jede Schriftprobe zeigt Größe, berechnete Zeilenhöhe und Gewicht.
- Pixelwerte lassen sich für die aktuelle Sitzung direkt ändern und zurücksetzen.
- Buttons, Tabs, Wortauswahl, Texteingabe, Checkboxen, Ausgabe und Rückmeldungen.
- Bedienbares Caesar-Beispiel nach Station 02 und modale Vertiefung.
- Farbsemantik, drei Surfaces und statische Zustandsproben.

## Lokale Overrides

`tablet-master.css` definiert die eigenen `--tablet-*`-Werte auf `.tablet-master`
und ordnet sie den vorhandenen `--font-size-*`-Namen zu. Die vorhandenen Fonts und
Farb-Tokens werden nur eingebunden. Alle Selektoren sind auf diesen Master begrenzt.
Keine bestehenden Stationen, Shared-Dateien oder globalen Design-System-Dateien
werden verändert. Die lokalen Werte sind ausdrücklich ein Tablet-Arbeitsstand.

| Textstil | Größe | Schrift / Gewicht |
| --- | --- | --- |
| Display | 64 px | Panchang 800 |
| H1 | 48 px | Panchang 800 |
| H2 | 36 px | Panchang 700 |
| H3 | 28 px | Panchang 700 |
| H4 | 24 px | Panchang 700 |
| H5 | 20 px | Panchang 700 |
| Body L / M / S | 24 / 20 / 18 px | Switzer 400 |
| Label | 16 px | DM Mono 400 |
| Caption L / M / S | 20 / 16 / 14 px | DM Mono 400 |

Die kleinen Werkstatt-Beschriftungen verwenden separat `--tablet-meta` (13 px);
sie sind keine zusätzliche Textrolle für Ausstellungstexte. Baton Turbo ist
nur als Token vorhanden und wird ohne lokale Font-Datei nicht verwendet.

## Tablet-Abstimmung

Solange das konkrete Tablet-Modell noch offen ist, bleiben die Schriftgrößen
in CSS-Pixeln über die Viewports konstant. Das Layout reagiert auf die verfügbare
Breite; es gibt keine globale Skalierung und keine abgeschnittenen festen Screens.
Unter 1001 px stehen interaktive Module untereinander. Unter 761 px rücken auch
Bild und Schriftproben um. Desktop-Browser zeigen denselben Tablet-Master.

Die Kopfzeile zeigt den tatsächlichen CSS-Viewport, Orientierung und Pixeldichte.
Hardware-Pixel sind nicht mit CSS-Pixeln gleichzusetzen. Vorschau bei Browserzoom
100 % auf dem Zielgerät beurteilen. Der finale Maßstab muss am realen Tablet
abgestimmt werden. Touchflächen sind mindestens 52 px hoch; Checkboxen nutzen
ihre gesamte beschriftete Zeile als Touchfläche.

Änderungen in den Eingabefeldern werden nicht gespeichert. Für dauerhafte Änderungen
die `--tablet-*`-Werte am Anfang der CSS-Datei anpassen. Beispieltexte stehen im
HTML, die Schriftproben im Array `TEXT_STYLES` in `tablet-master.js`.

Der Master verwendet weder Idle-Reload noch Attract-Mode, damit die Prüfung nicht
unterbrochen wird. Alle Inhalte sind Arbeitsbeispiele, keine freigegebenen
Ausstellungstexte. Keine vollständige Enigma-Simulation.
