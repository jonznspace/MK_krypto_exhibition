# Station 01 Optimization · Änderungsprotokoll

## 2026-09-30 · Leseansicht als globale Komponente

Die Leseansicht (Off-Canvas „Weiterlesen“) ist jetzt die Shared-Komponente
`station-offcanvas`, damit alle Stationen denselben Aufbau nutzen. Gestaltung und
Verhalten sind unverändert; Screenshots vorher/nachher (DE/EN, geschlossen, offen,
gescrollt, 1563 × 864) sind pixelgleich.

| Datei | Änderung |
| --- | --- |
| `shared/css/station-offcanvas.css` | neu: Styles aus `optimization.css` und `vertiefung.css`, ohne `.station-optimization`-Scope |
| `shared/js/station-offcanvas.js` | neu: Markup, Öffnen/Schließen, Fokus, Scroll-Indikator, DE/EN |
| `shared/README.md` | neu: Einbau und Content-Format |
| `index.html` | Dialog-Markup entfernt; Button heißt `station-offcanvas-trigger`; Komponente eingebunden |
| `optimization.css` | `.reading-*`-Regeln entfernt, nur der Abstand des Buttons bleibt |
| `vertiefung.css` | Scroll-Indikator-Regeln entfernt |
| `station-01.js` | `renderReading`, `initScrollIndicator`, `initReadingOverlay` entfernt; Text als `start.reading` (`lead`, `sections`, `highlight`) |

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
cd 04_exploration/station-01
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

## 2026-09-30 · Modus-Tabs im Stil des DE/EN-Umschalters

- `vertiefung.css`: Die Tabs Verschlüsseln/Entschlüsseln haben jetzt die Optik
  des DE/EN-Umschalters:
  - bündig ohne Rahmen und Zwischenabstand,
  - inaktiv grau gefüllt (`--layer-surface-elevated`), beim Hover `--color-neutral-800`,
  - aktiv mit oranger Schrift und Unterkante auf `--state-selected-surface`,
  - 52 px hoch, DM Mono 16 px.
- `index.html`: `vertiefung.css?v=3`.
- Rückgängig: den Block „Mode tabs share the DE/EN switch style“ in
  `vertiefung.css` entfernen.

## 2026-09-30 · Fix: Abwickel-Animation wiederhergestellt

- **Ursache (Fehler aus v2):** Der neue Umschalter rief nach `setWrapped()` auch
  `skytaleRender()` auf. `setData()` → `build()` setzte `wrapAmount` sofort auf
  0 oder 1, die Animation (1,7 s) sprang dadurch ans Ende.
- **Behebung in `station-01.js`:**
  - `build()` behält den laufenden `wrapAmount`.
  - `setData()` baut bei unverändertem Inhalt gar nicht neu.
- `index.html`: `station-01.js?v=16`.

## 2026-09-30 · Abstände der Schritte, Wert unter der Überschrift

- `vertiefung.css`:
  - **Abstand:** Die nummerierten Schritte haben 48 px Abstand zueinander statt
    24 px (Panel-Gap + `margin-top: --space-5`). Der erste Schritt nach der
    Aufgabe bleibt bei 24 px.
  - **Wert unter der Überschrift:** „n Buchstaben pro Umdrehung“ steht in einer
    eigenen Zeile unter der Überschrift von Schritt 2 und ist bündig mit dem
    Überschriftentext. Die Überschrift bricht dadurch nicht mehr um.
  - **Bei offener Tastatur:** Die Schritte haben dann nur 32 px Abstand, und der
    Hinweis „Wickle den Streifen ab …“ ist ausgeblendet. So passt das Panel ohne
    Scrollen auf den Screen.
- `index.html`: `vertiefung.css?v=5`.

## 2026-09-30 · Modus-Tabs als Kopf des Panels

- `vertiefung.css`: Die Tabs laufen über die volle Panelbreite, bündig oben,
  links und rechts:
  - Negativer Außenabstand von −24 px gleicht den Innenabstand des Panels aus.
  - Der Inhalt darunter ist unverändert und beginnt 24 px unter den Tabs.
  - Die Tabs bleiben oben stehen (`position: sticky`, `top: −24px`), falls das
    Panel einmal scrollt.
- `index.html`: `vertiefung.css?v=7`.

## 2026-09-30 · Screen-Überschrift als H2

- `index.html`: `#actionTitle` ist ein `<h2>` statt `<h1>`. `vertiefung.css?v=8`.
- `vertiefung.css`: Die Überschrift hat die H2-Stufe des Tablet-Masters:
  - 36 px statt 48 px,
  - Panchang 700 statt 800, Zeilenhöhe 1,2, Laufweite −0,035em,
  - Wortabstand +0,3em.

  Die Kopfzeile bleibt 52 px hoch (Schließen-Button), der Rest des Layouts
  bleibt unverändert.
- Hinweis: Auf dem Aktions-Screen gibt es jetzt keine sichtbare H1 mehr, die H1
  des Startscreens ist dort ausgeblendet.

## 2026-09-30 · Screen-Überschrift fett

- `vertiefung.css`: `#actionTitle` in Panchang 800 (Extrabold, der kräftigste
  Schnitt der variablen Schrift) statt 700. Das entspricht dem Starttitel.
  Größe (36 px) und Wortabstand bleiben. `vertiefung.css?v=9`.

## 2026-09-30 · Ein Button statt Schritt 3

- **Schritt 3 entfällt** (Überschrift „Streifen abwickeln“ + Umschalter
  Aufgewickelt | Abgewickelt). Stattdessen gibt es einen großen, orange
  gefüllten Button über die volle Breite (72 px, DM Mono 20 px). Seine
  Beschriftung nennt immer den nächsten Schritt: „Streifen abwickeln“ bzw.
  „Wieder aufwickeln“. EN: „Unwrap the strip“ / „Wrap it back“. Den aktuellen
  Zustand zeigt weiter die Überschrift auf der Bühne.
- **Das Ergebnis „Geheimtext auf dem Streifen“ erscheint erst nach dem
  Abwickeln.** Das Platzhalterfeld „Wickle den Streifen ab …“ ist nicht mehr
  sichtbar.
- Dateien:
  - `index.html`: Markup, `vertiefung.css?v=10`, `station-01.js?v=17`.
  - `station-01.js`: `btnUnwrap`, Texte `unwrapAction` und `rewrapAction`.
  - `vertiefung.css`: `.unwrap-button`; Umschalter-Styles entfernt.

## 2026-09-30 · Mehr Abstand um den Aufgabentext

- `vertiefung.css`: `.panel-task` bekommt oben und unten zusätzlich 16 px
  (`margin-block: --space-4`). Das ergibt 40 px zu den Tabs und zum ersten
  Schritt, in beiden Modi. Mit offener Tastatur passt das Panel weiterhin ohne
  Scrollen. `vertiefung.css?v=11`.

## 2026-09-30 · Entschlüsseln: Abstand zum blauen Kasten

- `vertiefung.css`: Beim Entschlüsseln hält Schritt 2 (Lesung, Hinweis,
  „Nächster Streifen“) mindestens 56 px Abstand zum Merksatz-Kasten
  (24 px Gap + 32 px `margin-bottom`). Ist mehr Platz da, schiebt `margin-top: auto`
  den Kasten weiterhin ganz nach unten. `vertiefung.css?v=12`.

## 2026-09-30 · Oranger Scroll-Indikator wie in der Original-Station

- **Leseansicht („Weiterlesen“):**
  - Die graue System-Scrollbar ist ausgeblendet. Stattdessen gibt es eine 8 px
    breite Spur mit orangem Anfasser (`--immersive-accent`, mindestens 40 px),
    wie in `station-01`.
  - Scrollen bleibt nativ (Wischen, Mausrad). Der Anfasser läuft mit, lässt
    sich ziehen, und Tippen auf die Spur springt an die Stelle.
  - Die Trefferfläche ist 44 px breit statt 8 px. Beim Ziehen wird der
    Anfasser heller.
  - Ohne Überlauf ist die Spur ausgeblendet (z. B. EN-Text bei 1920×1080).
- **Aufgaben-Panel:** orange, schmale System-Scrollbar (`scrollbar-color`),
  falls es auf kürzeren Screens scrollt.
- Dateien:
  - `index.html`: `.reading-scroll`-Wrapper mit `#readingScrollbar`;
    `vertiefung.css?v=13`, `station-01.js?v=18`.
  - `station-01.js`: `initScrollIndicator()`, aktualisiert sich über
    ResizeObserver und beim Öffnen.
  - `vertiefung.css`: Block „Orange scroll indicator“.
- Rückgängig: den Wrapper in `index.html` entfernen, dann `initScrollIndicator`
  und seinen Aufruf in `station-01.js` sowie den CSS-Block löschen.

## 2026-09-30 · H1-Wortabstand, Scroll-Indikator in Blau

- `vertiefung.css`:
  - `#startTitle` (H1, Startscreen) bekommt `word-spacing: .3em`, wie die H2 der
    Vertiefungsebene.
  - Der Anfasser des Scroll-Indikators ist blau statt orange
    (`--immersive-focus`, #264EFF), beim Ziehen `--color-secondary-400`.
  - Die Panel-Scrollbar ist ebenfalls blau.
- `index.html`: `vertiefung.css?v=14`.

## 2026-09-30 · Schriftgrößen aus den globalen Tokens

Die Station hat keine eigene Typo-Skala mehr. Die globale Skala in
`00_design-system/tokens/tokens.css` wurde auf die hier abgestimmten Werte
gesetzt (Desktop: `h3` 36, `h4` 28, `label` 16, `caption-m` 14; Tablet: `label` 16).
Das Tablet quer (1563 px) liegt in der Desktop-Stufe und sieht unverändert aus.
Tablet hoch (864 px) und Stele (1080 px) liegen in der Tablet-Stufe und bekommen
dort die kleineren Token-Werte.

- `optimization.css`: `--opt-*`-Schriftgrößen entfernt und durch Tokens ersetzt
  (`h1`, `h2`, `h3`, `h4`, `body-l`, `body-m`, `label`, `caption-m`).
  `--opt-control`, `--opt-page-inset`, `--opt-info-text` direkt durch
  `--size-control-lg`, `--space-6`, `--color-secondary-200` ersetzt.
  Doppelte `font-size`-Überschreibungen entfernt, die jetzt aus `station-01.css` kommen.
  Lokal bleiben nur `--opt-line` und `--opt-focus`.
- `vertiefung.css`: `--opt-h2` entfernt; `#actionTitle` erbt `h3` von `.title--compact`.
- `station-01.css`: alle hartkodierten Schriftgrößen durch Tokens ersetzt;
  Längenstufen `.title--medium` / `.title--long` ohne eigene Größe;
  ungenutzte Regeln `.station-image-placeholder` und `.template-card` entfernt.
- `index.html`: `station-01.css?v=4`, `optimization.css?v=13`, `vertiefung.css?v=15`.

## 2026-09-30 · Offene Bugs aus dem Review behoben

- **Sprachumschaltung überschreibt Ergebnisse** (`shared/js/station-language-switch.js`,
  gilt für alle Stationen): Das Skript merkt sich jetzt, welchen Text es selbst
  geschrieben hat. Ändert eine Station den Text zur Laufzeit, wird der neue Text
  zur Quelle, statt vom alten deutschen Text überschrieben zu werden.
- **Tasten-Beschriftung für Screenreader** (`station-01.js`): „Buchstabe X“ /
  „Letter X“ kommt aus `UI_COPY` und wechselt mit der Sprache.
- **3D-Streifen** (`station-01.js`): Papier, Orange und Schrift lesen die Farben aus
  den Tokens (`--color-neutral-100`, `--immersive-accent`, `--color-neutral-900`).
- **Hover auf Touch** (`station-01.css`, `optimization.css`, `vertiefung.css`,
  `shared/css/station-language-switch.css`): Hover nur noch unter
  `@media (hover: hover)`; Tabs, Tasten, „Nächster Streifen“, Schließen-Buttons und
  DE/EN haben ein `:active`-Feedback für Touch.
- **Feste Farben** (`station-01.css`, `vertiefung.css`): `#000` → `--immersive-bg`,
  Stations-Tag `#ed8003` → `--immersive-accent` (wie bisher sichtbar),
  `rgba(0,0,0,.2)` → `color-mix` mit `--color-neutral-900`.
- **Ungenutztes CSS entfernt**: `.hero-scroll*`, `.template-tag`, `.module-intro`,
  `.field-label`, `.skytale-actions`, `.wrap-button`, `.read-button`, `.io-block`,
  `.hashline*`.
- `index.html`: `station-01.css?v=5`, `optimization.css?v=14`, `vertiefung.css?v=16`,
  `station-01.js?v=19`.
