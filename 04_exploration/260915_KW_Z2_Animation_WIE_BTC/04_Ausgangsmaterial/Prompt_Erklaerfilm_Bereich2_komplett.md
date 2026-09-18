# Kompletter Prompt: Erklärfilm "Wie funktioniert Bitcoin?" (Bereich 2)

Anhänge für den ersten Turn (alle auf einmal):
- `2026_08_31_neuerKonzeptEntwurf.pdf`
- `00_design-system/tokens/tokens.css`
- `00_design-system/fonts/` als ZIP (inkl. fonts.css; Switzer, DM Mono, Panchang)
- `BRIEFING.md`, `03_design/VISUAL_LANGUAGE.md`, `03_design/SHAPE_SYSTEM.md`
- optional `04_exploration/station-08/` als ZIP (Code-Referenz)

Modell: Claude Fable 5.1. Ein Chat für alles. Nach jeder Lieferung schreibst du "weiter" oder gibst Biancas Feedback weiter.

---

```
Auftrag: Erklärfilm "Wie funktioniert Bitcoin?" für Bereich 2 der Ausstellung "Krypto, was?" (SKD Münzkabinett). Ausgabe auf einem 16:9-Monitor unterhalb einer Wandprojektion, stumm, ca. 3:05, Endlosloop nach dem letzten Kapitel. Umsetzung als HTML/CSS/JS-Animation, die das Team selbst anpassen kann und die am Ende auch als MP4 gerendert wird.

Ich bin Operator, nicht Programmierer. Du lieferst fertige, lauffähige Dateien, keine Code-Schnipsel, keine Build-Anleitungen, keine Erklärungen zum Code.

QUELLEN UND RANGFOLGE
1. Das angehängte Medienkonzept (PDF, 4-Kapitel-Fassung) ist die einzige inhaltliche Wahrheit. Alle "Text:"-Sätze sind Ausstellungstext und werden wortgleich übernommen, auch mit Tippfehlern. Tippfehler werden nicht korrigiert, sondern in einer Liste gemeldet.
2. tokens.css ist die einzige Wahrheit für Farben, Maße, Dauern, Kurven. Kein Hex, kein px hart im Code, alles var(--token).
3. BRIEFING.md, VISUAL_LANGUAGE.md, SHAPE_SYSTEM.md sind das Regelwerk. Schwarz ist der Raum, Weiß und Grau tragen Objekt und Information, Blau ist Information, Orange ist Aktion. Line-Art mit feinen Linien, kein Blur, kein Schatten, kein scale über 1.0, keine Bounce- oder Overshoot-Kurven.
4. Freigegebene Ausnahme für den Film: erzählerische Einblendungen mit --duration-6, alle Fahrten und Wanderungen linear (--ease-mechanical). Jede weitere Abweichung von einer MUST-Regel wird nicht umgesetzt, sondern gemeldet.

ENTSCHIEDENE PUNKTE
- Format: 16:9, Design-Basis 1920 x 1080, responsiv: die Bühne skaliert verlustfrei auf jede Fenstergröße, bei abweichendem Seitenverhältnis Letterbox auf Schwarz. Die tatsächliche Monitorauflösung ist noch offen, nichts darf von 1920 x 1080 abhängen.
- Loop: nach Kapitel 4 nahtlos zurück zum Anfang von Kapitel 1.
- Kapitel 1, Schritt 1: allgemeine Währung, Formulierung "sendet Geld". Keine Euro-, Dollar- oder Bitcoin-Zeichen.
- Personen: Carola und Albert (Namen sind Vorgabe der Kuratorin, nicht ändern).
- Stumm, keine direkte Ansprache, keine Gedankenstriche in Texten.
- Lesezeiten: 2,5 Wörter pro Sekunde, im Zweifel länger. Stehzeiten mindestens wie im Konzept angegeben.

ARCHITEKTUR (gilt für alle Schritte)
- Eine einzige HTML-Datei, alles inline. Fonts aus dem angehängten Ordner per @font-face: Switzer für Text, DM Mono für Adressen, Kürzel und Zahlen, Panchang nie. Keine externen CDNs, kein Build-Schritt.
- Die Karte nach Konzept Abschnitt 3: drei Zonen nebeneinander, links Signieren, Mitte das Buch (Netzwerk aus identischen Kopien), rechts die Kette. Nur eine Zoom-Ebene. Einzige Ausnahme ist der Zoom aus der Gegenüberstellung zentral/dezentral in die Karte hinein (Kapitel 1). Dazu der leuchtende Transaktionspunkt, der von links nach rechts wandert.
- Wiederverwendbare Bausteine: Textzeile (Ausstellungstext, unten mittig), Begriffskarte (Fachwort plus Kurzerklärung, blau markiert, jeder Begriff nur einmal im ganzen Film), Fortschrittsanzeige mit vier Punkten, Kapiteltitel.
- Eine deterministische Zeitachse: ein SCRIPT-Objekt ganz oben in der Datei mit allen Cues (Zeit in Sekunden, Kapitel, Aktion, Text, Stehzeit). Keine verschachtelten setTimeouts. seek(t) springt jeden Zeitpunkt direkt an, play() läuft von dort weiter. Alles, was das Team später ändern will (Zeiten, Texte, Stehzeiten), steht nur dort.
- Dev-Modus per Taste D: Scrubber, Zeitanzeige, Kapitelsprung mit Tasten 1 bis 4, Cue-Name im Bild. In Produktion unsichtbar.

ARBEITSWEISE
Du arbeitest in fünf Schritten. Nach jedem Schritt lieferst du und wartest auf "weiter" oder Feedback. Du fängst nicht mit dem nächsten Schritt an, bevor ich es sage.

Schritt 1, Fundament: Bühne, Karte mit drei Zonen, Transaktionspunkt, alle Bausteine, Zeitachse, Dev-Modus, Loop-Mechanik. Noch kein Kapitel. Datei: bitcoin-film_v0.1_fundament.html.

Schritt 2, Kapitel 1 "Kein Zentrum", 45 Sekunden. Datei: bitcoin-film_v0.2.html.
Schritt 3, Kapitel 2 "Wie funktioniert eine Transaktion?", 40 Sekunden. Datei: bitcoin-film_v0.3.html.
Schritt 4, Kapitel 3 "Wie funktioniert Mining?", 50 Sekunden. Datei: bitcoin-film_v0.4.html.
Schritt 5, Kapitel 4 "Wie ist die Blockchain abgesichert?", 50 Sekunden, danach Gesamtabnahme und Export. Dateien: bitcoin-film_v1.0.html und bitcoin-film_v1.0.mp4.

Regeln für jedes Kapitel: Quelle ist ausschließlich der Abschnitt dieses Kapitels im Konzept. Jeder "Sehen:"-Schritt wird zu einem oder mehreren Cues, Reihenfolge und Inhalt exakt wie im Konzept, nichts hinzufügen, nichts weglassen. "Text:"-Sätze wortgleich, "Begriff:"-Einblendungen als Begriffskarte. Alles spielt auf der bestehenden Karte mit den bestehenden Bausteinen, neue Grafiken nur als Line-Art im Token-System. Vorherige Kapitel bleiben unverändert, Änderungen nur im Block des aktuellen Kapitels. Fortschrittsanzeige zeigt den aktuellen Punkt aktiv.

VERIFIKATION VOR JEDER LIEFERUNG
Datei in Playwright öffnen, Frames rendern und als Kontaktbogen (PNG) ausgeben: im Fundament mindestens sechs Zeitpunkte, in Kapiteln ein Frame je "Sehen:"-Schritt. Prüfen: seek(t) springt an jeden Punkt, keine Konsolenfehler, Bühne skaliert korrekt bei drei Fenstergrößen (1920x1080, 1280x720, 3840x2160). Für jedes Kapitel eine Tabelle: Cue, Startzeit, Stehzeit, Wortzahl, errechnete Lesezeit, Soll laut Konzept, Abweichung.

Gesamtabnahme in Schritt 5: Gesamtdauer gegen 3:05, alle vier Kapitel gegen ihre Soll-Dauern, Loop-Naht ohne Sprung, Konsole leer. Export: Frames deterministisch über seek(t) mit Playwright rendern, 25 fps, 1920 x 1080, Dev-Modus aus, mit ffmpeg zu H.264 MP4. Kontaktbogen des ganzen Films, ein Frame alle 5 Sekunden.

LIEFERUNG JE SCHRITT
Die komplette HTML-Datei (immer der Gesamtstand, nicht nur das Kapitel), Kontaktbogen PNG, kurzer Report: Ist-Dauer gegen Soll, Liste der Cues, Abweichungen vom Design-System, gemeldete Tippfehler im Ausstellungstext, offene Fragen an die Kuratorin. Sonst nichts.

Beginne mit Schritt 1.
```
