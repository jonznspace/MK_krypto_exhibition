# Station 03 · Leibniz-Rechenmaschine

Startscreen mit Leseansicht von links, Aktion „Dein Name in Binär“ / „Binär entschlüsseln“.

## Leseansicht ohne Infobox (2026-10-01)

- Der letzte Absatz („Dieses Prinzip ist heute grundlegend …“ / „Today, this principle is fundamental …“) steht nicht mehr
  in der blauen Infobox „Auf den Punkt gebracht“ / „Key takeaway“, sondern als normaler Absatz am Ende. Text unverändert.
- `index.html`: `station-03.js?v=24`.

## Bitstrom statt Namensverlauf (2026-10-01)

Rechts neben der Übersetzung („Dein Name in Binär“) stand ein Verlauf früherer Namen, der in 4er-Blöcken ein- und
ausgeblendet wurde. Die Bytegrenzen fehlten, die Zeilen brachen mitten im Byte um, lange Namen wurden abgeschnitten,
und jeder Tastendruck speicherte einen Zwischenstand (L, LE, LEI …) im Verlauf.

- **Jetzt:** Rechts steht der eingegebene Name so, wie der Rechner ihn speichert: ein durchgehender Strom aus Bytes,
  ohne Buchstaben. Links die Erklärung Buchstabe für Buchstabe, rechts das Ergebnis.
- **Schreiben:** Ziffer für Ziffer (45 ms je Ziffer) mit blinkender Schreibmarke. Bytes stehen als 8er-Gruppen und
  brechen nie in der Mitte um. Beim Tippen schreibt sich das neue Byte dazu, beim Löschen verschwindet es sofort.
  Beim Öffnen der Aktion schreibt sich der Name im Eingabefeld (Start: LEIBNIZ) neu.
- **Leeres Eingabefeld:** Block leer, keine Schreibmarke, keine Animation. (Eine erste Fassung ließ hier
  Beispielnamen durchlaufen; das verwirrte, weil nichts eingetragen war, und ist wieder entfernt.)
- **Kein Verlauf mehr:** Eingaben werden nicht gespeichert, niemand sieht die Namen früherer Besucher.
  Der alte Eintrag im Browserspeicher (`mk-krypto-station-03-binary-names`) wird beim Laden gelöscht.
- Reduzierte Bewegung: Bitstrom steht sofort vollständig, keine blinkende Marke.
- Der Block ist rein visuell (`aria-hidden`), die Übersetzung links bleibt die lesbare Fassung. Keine neuen Texte.
- `index.html`: `station-03.css?v=12`, `station-03.js?v=26`.

## Binärcodes größer (2026-10-01)

- Die Codes unter den Buchstaben waren mit `--font-size-caption-s` (12 px) kaum lesbar. Jetzt `--font-size-body-m`
  (20 px) in beiden Tabellen:
  - **Binär entschlüsseln** (Buchstabentabelle A–Z): 6 statt 7 Spalten, dadurch 5 Zeilen; Codes in Primärfarbe.
    Passt auf dem Tablet quer, die Buttons enden 69 px über der Unterkante.
  - **Dein Name in Binär** (Übersetzung links): Zellen mindestens 120 px breit (vorher 92), 6 Buchstaben pro Zeile.
- `index.html`: `station-03.css?v=12`.

## Binär entschlüsseln: ohne Tastatur (2026-10-01)

- Eingabe der Lösung ausschließlich über die Buchstabenfelder rechts (A–Z). Die Bildschirmtastatur unter der Bitfolge
  ist entfernt (Markup, Aufbau, Stile). Das Lösungsfeld ist `readonly` mit `inputmode="none"`: Antippen öffnet weder
  die eigene noch die System-Tastatur.
- „Löschen“ / „Delete“ (vorhandener Text) steht jetzt als Button zwischen „Prüfen“ und „Neue Folge“; „Fertig“ entfällt hier.
- Die Rückmeldung („Richtig entschlüsselt.“ / „Noch nicht …“) steht jetzt links direkt unter der Bitfolge, wo vorher
  die Tastatur aufging. Unten wurde sie seit den größeren Codes abgeschnitten.
- Nebenbei: „Löschen“ und „Fertig“ der Namens-Tastatur („Dein Name in Binär“) schalten jetzt auf die vorhandenen
  EN-Texte „Delete“ / „Done“ um.
- `index.html`: `station-03.css?v=13`, `station-03.js?v=27`.
- „Neue Folge“ / „New sequence“ steht jetzt links direkt unter der Bitfolge, darunter die Rückmeldung.
  Unten bleiben „Prüfen“ und „Löschen“ (nur Markup in `index.html` verschoben).

## Binär entschlüsseln als Ablauf (2026-10-01)

- Aufbau von oben nach unten, damit der Ablauf klar wird:
  1. **Vorgabe:** „Was steht hier?“, darunter die Bitfolge über die volle Breite, „Neue Folge“ rechts daneben.
  2. **Tasten und Ausgabe** in einer eigenen Zeile (`--space-6` darunter): links die Buchstabenfelder A–Z (6 Spalten),
     rechts „Deine Lösung“ mit Feld, darunter „Prüfen“ und „Löschen“, darunter die Rückmeldung.
- Nur Markup und Layout geändert (`.decode-prompt__row`, `.decode-layout`, `.decode-answer`); IDs und Texte unverändert.
- Tablet quer: Karte endet bei 774 px. Hochformat (`max-width: 1100px`): Tasten und Ausgabe untereinander.
- `index.html`: `station-03.css?v=14`.

## Ausgabefeld wie Enigma, Titel über den Tasten (2026-10-01)

- **Ausgabefeld** „Deine Lösung“ / „Your answer“ im Stil der Enigma-Ausgabe (Station 04, `.io-box`): Label klein in der Box
  (DM Mono, `--font-size-caption-s`, `--color-primary-200`), Rahmen `--color-primary-200`, Wert in `--font-size-label`.
  Das Feld bleibt `readonly` / `inputmode="none"`.
- **Titel über den Buchstabenfeldern:** „Buchstaben auswählen“ / „Select letters“ (Stil wie „Was steht hier?“).
  Die EN-Fassung hat der Kunde für dieses Label ausdrücklich freigegeben (Einzelfall).
  Die Buchstabenfelder sind über `aria-labelledby` mit dem Titel verbunden.
- Tablet quer: Karte endet bei 812 px. Hochformat: Titel, Tasten, Ausgabe untereinander.
- `index.html`: `station-03.css?v=15`, `station-03.js?v=28`.

## „Prüfen“ in DM Mono Medium (2026-10-01)

- Der orange Button „Prüfen“ / „Check“ nutzt jetzt DM Mono Medium (500) statt Regular (400), wie der orange Button
  „Streifen abwickeln“ in Station 01. Dunkle Schrift auf Orange wirkte bei gleichem Schnitt dünner als helle Schrift
  auf dunklen Buttons. „Löschen“ und „Neue Folge“ bleiben Regular.
- `index.html`: `station-03.css?v=16`.
- Lösung im Ausgabefeld eine Stufe größer: `--font-size-body-m` (20 px) statt `--font-size-label` (16 px).
  Das kleine Label „Deine Lösung“ bleibt wie in der Enigma. `index.html`: `station-03.css?v=17`.

## Rückmeldung ohne ✕, blendet aus (2026-10-01)

- „Noch nicht. Versuch es weiter.“ / „Not yet. Keep trying.“ hat kein ✕ mehr: Es sah aus wie ein Schließen-Button,
  ließ sich aber nicht antippen. Der Haken bei „Richtig entschlüsselt.“ bleibt.
- Beide Rückmeldungen stehen 5 s, blenden dann langsam aus (`--duration-6`, 1,2 s, `--ease-exit`) und verschwinden.
  Erneutes Prüfen zeigt die neue Meldung sofort voll und startet die 5 s neu. Tippen, Löschen und „Neue Folge“
  entfernen die Meldung wie bisher sofort. Reduzierte Bewegung: Ausblenden in 80 ms (Tokens).
- `index.html`: `station-03.css?v=19`, `station-03.js?v=30`.

## Schließen setzt zurück (2026-10-01)

- Schließen der Vertiefung (✕) stellt den Startzustand her: Name LEIBNIZ, Tastatur zu, Tab „Dein Name in Binär“,
  erste Folge, leere Lösung ohne Rückmeldung. Vorher blieb die Eingabe des vorigen Besuchers stehen.
- `index.html`: `station-03.js?v=31`.
