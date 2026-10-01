# Station 07 · Änderungsprotokoll

## 2026-10-01 · Mehr Abstand um die Grafik

Über und unter der Grafik sind jetzt je `--space-7` (48 px) Abstand. Vorher waren es 24 px zu den
Tabs und 32 px zum Objektschild. Das Objektschild ist jetzt etwa 540 px hoch.
`station-07.css`: `.device-panel` mit `margin-top`, Tab A behält seine 24 px; `.device-info` mit `margin-top`.
`index.html`: `css?v=7`.
Zurücknehmen: `margin-top` aus `.device-panel` entfernen und bei `.device-info` wieder `--space-6` setzen.

## 2026-10-01 · Objektschild: mehr Abstand zum Text

Der Abstand zwischen den Schild-Zeilen (Standort, Herkunft, Jahr) und dem Text ist von
`--space-4` (16 px) auf `--space-6` (32 px) gewachsen. Das gilt auch, wenn direkt danach ein
Zwischentitel folgt (BitChimney). `station-07.css`: `.device-meta + p`,
`.device-meta + .story-title`; `index.html`: `css?v=6`.
Zurücknehmen: `.device-meta + p` wieder in die `--space-4`-Regel aufnehmen und die neue Regel löschen.

## 2026-10-01 · Objektschild: Herkunft in Switzer

Die erste Schild-Zeile (Standort, z. B. „Sockel rechts“, „Gläserne Münze III“) bleibt in DM Mono,
versal, mit `--font-size-caption-m` (14 px). Die Zeilen darunter (Herkunft, Jahr) stehen jetzt in
Switzer mit `--font-size-body-s` (15 px auf dem Hochkant-Tablet), normal geschrieben, ohne Sperrung.
Dazu kommen neu `.device-meta span + span` in `station-07.css` und `css?v=5` in `index.html`.
Zurücknehmen: die beiden neuen Regeln unter `.device-meta` löschen.

## 2026-10-01 · Geräte-Karte: Abwählen, 90 %, EN-Hinweis

| Datei | Änderung |
| --- | --- |
| `station-07.bundle.js` | `selectDevice`: Ein erneuter Tap auf das gewählte Gerät hebt die Auswahl auf, danach ist wieder der Startzustand zu sehen; `deviceHint.en` = „Tap a device to learn more“ (freigegeben) |
| `station-07.css` | Grafik auf 90 % der Inhaltsbreite (720 px) und mittig, Objektschild etwa 580 px statt 517 px hoch |
| `index.html` | Cache-Versionen `css?v=4`, `js?v=10` |

Der Sicherungspunkt bleibt `_checkpoint-2026-10-01-vor-geraete-karte/`. Nur diese Runde
zurücknehmen: in `station-07.css` bei `.device-map svg` wieder `width: 100%` ohne
`margin-inline` setzen und in `selectDevice` die erste Zeile durch
`if (index === selectedDevice) return; selectedDevice = index;` ersetzen.

## 2026-10-01 · Mining-Geräte als interaktive Karte

Der Tab „Mining-Geräte“ zeigt die Geräte nicht mehr als Kartenliste. Oben steht jetzt
die Grafik der Website: die Gläserne Münze als Kreis und daneben die drei Sockel.
Darunter steht das Objektschild des angetippten Geräts. Formen und Positionen sind aus
dem Website-Screenshot vermessen (Pixel, Strichmitte, ±1 px). Die Grafik wird
auf 800 px Breite skaliert (Faktor ≈ 1,075). Tab „Wie funktioniert Bitcoin?“ ist unverändert.

**Inhalte unverändert:** `bitcoinSections`, `bitcoinEnglishSections` und `deviceSections`
sind byte-identisch mit dem Stand davor. Im Browser geprüft: Alle 8 Geräte zeigen in
DE und EN jeden Titel, jede Schild-Zeile, jedes Detail und jeden Absatz vollständig.

| Datei | Änderung |
| --- | --- |
| `index.html` | `#moduleB`: neu `#deviceMap` (Karte) und `.device-info` (Objektschild mit Scroller und blauem Indikator); Cache-Versionen `css?v=3`, `js?v=9` |
| `station-07.bundle.js` | neu `deviceMap` (Koordinaten, Tippflächen, Zuordnung Form → Eintrag in `deviceSections`), `renderDeviceMap`, `renderDeviceInfo`, `selectDevice`; `renderContent` rendert Tab B damit statt mit `appendSections` |
| `station-07.css` | Block „Mining-Geräte“ (`.device-group-heading`, `#moduleB .article-section`, `.museum-label`) ersetzt durch Karten- und Objektschild-Styles |

### Verhalten

- **Startzustand:** Nichts ist ausgewählt. Das Objektschild zeigt den Hinweis „Auf ein Gerät tippen,
  um mehr zu erfahren“ und darunter Kapitel 05 „Bitcoin-Mining-Geräte“ aus Tab A, ohne Textänderung.
  Nach dem Idle-Reload ist dieser Zustand wieder da.
- **Auswahl:** Wie auf der Website: Fläche in `--immersive-accent` mit 30 % Deckkraft, orange
  Kontur und orange Beschriftung. Ein Tap auf IIa oder IIb markiert beide (ein Gerät), ebenso die
  zwei Rechtecke bei V. Die gepunkteten Flächen reagieren nicht.
- **Tippflächen:** Jedes Objekt hat eine unsichtbare, vergrößerte Fläche, die die Ziffer einschließt
  (III und IV liegen eng nebeneinander und teilen sich die Fläche an der Mitte).
- **Objektschild:** Ziffer in Orange (nur bei Objekten der Münze), Titel, Schild-Zeilen (`museumLabel`)
  in DM Mono, Zwischentitel, Text, darunter durch eine Linie getrennt `museumDetails`. Beim Wechsel
  springt der Text nach oben und blendet kurz ein.
- **Sprache:** Sockel-Beschriftungen kommen aus `museumLabel[0]` („Sockel links“ / „Left Pedestal“).
  **Offen:** Für den Hinweissatz gibt es noch kein freigegebenes Englisch. Bis zur Freigabe steht er
  auch in EN auf Deutsch (`deviceHint` in `station-07.bundle.js`).

### Sicherungspunkt

Der Stand davor liegt vollständig in `_checkpoint-2026-10-01-vor-geraete-karte/`
(`index.html`, `station-07.css`, `station-07.bundle.js`).

**Komplett zurück:**

```sh
cd 04_exploration/station-07
cp _checkpoint-2026-10-01-vor-geraete-karte/{index.html,station-07.css,station-07.bundle.js} .
```

Danach ist der Tab wieder die Kartenliste. `CHANGELOG.md` und der Checkpoint-Ordner können bleiben.
