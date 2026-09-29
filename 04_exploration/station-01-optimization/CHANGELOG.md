# Station 01 Optimization · Änderungsprotokoll

## 2026-09-29 · Vertiefungsebene v2 (Skytale ausprobieren)

Ziel: Besucher sollen verstehen, was auf dem Skytale-Screen passiert. Das
Grundprinzip bleibt: 3D-Skytale links, Steuerung rechts, Verschlüsseln und
Entschlüsseln, Abwickeln, Stabdicke als Regler. Alle Änderungen liegen nur in
diesem Ordner. `shared/`, das Design-System und die anderen Stationen sind unverändert.

### Sicherungspunkt

Der Stand davor liegt vollständig in `_checkpoint-2026-09-29-vor-vertiefung/`
(`index.html`, `station-01.js`, `optimization.css`, `station-01.css`, `README.md`).

**Komplett zurück:**

```sh
cd 04_exploration/station-01-optimization
cp _checkpoint-2026-09-29-vor-vertiefung/{index.html,station-01.js,optimization.css,station-01.css,README.md} .
rm vertiefung.css CHANGELOG.md
```

**Nur die Gestaltung abschalten:** den `<link>` auf `vertiefung.css` in `index.html`
entfernen. Das Markup braucht die Styles aber. Für einen sauberen Stand deshalb
lieber komplett zurückgehen.

### Geänderte Dateien

| Datei | Änderung |
| --- | --- |
| `index.html` | Aktions-Screen neu gegliedert, `vertiefung.css` eingebunden, `station-01.js?v=15` |
| `station-01.js` | Texte (DE/EN), geführter Ablauf, Modell-Rahmen, aufrechte Buchstaben, Fehlerbehebungen |
| `vertiefung.css` | **neu:** alle Styles der Vertiefungsebene v2 |
| `optimization.css`, `station-01.css` | unverändert |

### Aufbau und Inhalt

- **Aufgabe statt Tag:** „Zum Ausprobieren“ entfällt. Stattdessen steht oben im
  Panel je Modus eine konkrete Aufgabe.
- **Verschlüsseln in drei nummerierten Schritten:**
  1. Nachricht schreiben
  2. Schlüssel wählen: Stabdicke
  3. Streifen abwickeln

  Danach folgt das Ergebnis „Geheimtext auf dem Streifen“. Es erscheint erst,
  wenn der Streifen abgewickelt ist. Vorher steht dort ein Hinweis.
- **Entschlüsseln:**
  - Der gefundene Streifen ist fest vorgegeben und nicht mehr bearbeitbar. Er
    sieht aus wie der Streifen im Modell.
  - Schritt 1: Schlüssel wählen.
  - Schritt 2: „Längs des Stabs gelesen“ zeigt live, was auf dem Stab steht.
  - Richtig gelöst: grüner Rahmen mit Haken, Erklärung und „Nächster Streifen“.
- **Schlüssel = Stabdicke:** Der Regler heißt jetzt „Schlüssel wählen: Stabdicke“
  und zeigt „n Buchstaben pro Umdrehung“ statt „Stabdurchmesser (Wicklungen)“.
  Die Werte 2–7 stehen darunter und lassen sich antippen. Der Anfasser ist
  größer (32 px).
- **Abwickeln als Umschalter:** Aufgewickelt | Abgewickelt, statt eines Buttons
  mit wechselnder Beschriftung.
- **„Leserichtung“ entfällt:** Die orange Zeile ist immer sichtbar. Eine Legende
  auf der Bühne erklärt sie, je nach Zustand unterschiedlich.
- **Orange ist überall dieselbe Zeile:**
  - auf dem Modell,
  - im gefundenen Streifen,
  - im Geheimtext (erster Buchstabe jeder Umdrehung),
  - in der Lesung längs des Stabs (erste Gruppe).
- **Merksatz** unten im Panel: „Der Schlüssel ist die Stabdicke. Nur wer sie
  kennt, kann die Nachricht lesen.“ Er wird ausgeblendet, solange die Tastatur
  offen ist.
- **Moduswechsel** startet immer aufgewickelt mit den Startwerten des Modus.

### Bühne

- **Zustand als Überschrift** oben mittig, zum Beispiel „Aufgewickelt: längs des
  Stabs lesbar“ oder „Falscher Stab: die Zeilen ergeben keinen Sinn“. Wenn das
  Rätsel gelöst ist, wird sie grün.
- **Unten** stehen links die Legende und rechts „Ziehen zum Drehen“. Der
  Drehhinweis erscheint nur im aufgewickelten Zustand.
- **Das Modell ist deutlich größer.** Der Stab nimmt etwa zwei Drittel der
  Bühnenbreite ein (`updateCameraFrame`).
- **Abgewickelt stehen die Buchstaben aufrecht.** Die Textur wird am Ende des
  Abwickelns umgestellt. Die Kamera rückt auf den Streifen.

### Fehler behoben (lokal)

- **Sprach-Skript setzte Texte zurück (kritisch):** `shared/js/station-language-switch.js`
  hat Ergebnisfeld und Labels auf alte Texte zurückgesetzt. Folgen: Die Lösung
  wurde nie angezeigt, und nach „Entschlüsseln“ blieb auch „Verschlüsseln“ auf
  „NOCH NICHT LESBAR“. Umgangen, ohne `shared/` zu ändern: Wechselnde Texte
  stehen jetzt in eigenen `span`-Elementen, die das Skript nicht anfasst.
- **„SCHLUESSEL“:** Die Lösung zeigt jetzt „SCHLÜSSEL“. Auf dem Streifen steht
  weiterhin UE.
- **„·“ doppelt belegt:** Leerzeichen werden vor dem Wickeln entfernt, wie beim
  Rätsel. „·“ bedeutet nur noch Füllzeichen.
- **Doppelte Tastatur:** Das Eingabefeld ist `readonly` + `inputmode="none"`. Es
  öffnet nur die Stationstastatur, und die nur beim Verschlüsseln.
- **Tastatur-Position:** Die Tastatur liegt im Fluss direkt unter dem Feld statt
  absolut bei `top: 237px`. Das Ergebnis wird nicht mehr verdeckt.
- **Streifentextur:** Sie wird neu gezeichnet, sobald DM Mono geladen ist.

### Bewusst nicht geändert

- **Tab-Beschriftung:** „Entschlüsseln“ bleibt. Die Alternative „Rätsel lösen“
  steht noch zur Abstimmung.
- **Übrige Bereiche:** Startscreen, Leseansicht, Idle-Verhalten, Tastatur-Optik
  und Modellbewegung.
- **Weitere offene Punkte** der Station-01-Liste, zum Beispiel `en.start` und
  die Sprachumschalter-Höhe.
