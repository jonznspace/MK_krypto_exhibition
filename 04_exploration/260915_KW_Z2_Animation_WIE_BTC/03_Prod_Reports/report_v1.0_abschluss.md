# Erklärfilm „Wie funktioniert Bitcoin?“, Abschlussreport v1.0

Ausstellung „Krypto, was?“, SKD Münzkabinett, Bereich 2. Stand 15.09.2026.

## 1. Gesamtabnahme

| Prüfung | Ergebnis |
|---|---|
| Gesamtdauer | 185,0 s = 3:05, Soll 3:05 |
| Kapitel 1 „Kein Zentrum“ | 0,0 bis 45,0 s (45 s, Soll 45), letzter Cue endet 40,5 s |
| Kapitel 2 „Wie funktioniert eine Transaktion?“ | 45,0 bis 85,0 s (40 s, Soll 40), letzter Cue endet 84,0 s |
| Kapitel 3 „Wie funktioniert Mining?“ | 85,0 bis 135,0 s (50 s, Soll 50), letzter Cue endet 134,6 s |
| Kapitel 4 „Wie ist die Blockchain abgesichert?“ | 135,0 bis 185,0 s (50 s, Soll 50), letzter Cue endet 180,0 s |
| seek(t) | in 0,5-s-Schritten über die gesamte Länge geprüft, jeder Punkt erreichbar |
| Konsole | leer, in allen Durchläufen |
| Bühne | 1920x1080, 1280x720, 3840x2160 füllen das Fenster exakt; 1600x1200 Letterbox 150 px oben und unten auf Schwarz |
| Loop-Naht | Pixelvergleich letzter Frame (184,96 s) gegen Frame 0: einziger Unterschied ist die Fortschrittsanzeige (Punkt 4 aktiv gegen Punkt 1 aktiv), Bereich 1728 bis 1824 x 70 bis 82 px. Karte, Kamera, Fokus, Texte identisch. |
| Export | 4625 Frames über seek(t), 25 fps, 1920x1080, H.264, yuv420p, Dev-Modus aus |

Kontaktbögen: je Kapitel 12 Frames, Gesamtbogen ein Frame alle 5 Sekunden (37 Frames).

## 2. Cue-Tabelle, Stehzeiten gegen Soll

Stehzeit = Zeit vom Cue-Start bis zum Beginn der Ausblendung. Ein- und Ausblendung je 1,2 s (duration-6). Lesezeit = Wörter / 2,5.

| Cue | Start | Stehzeit | Wörter | Lesezeit | Soll | Abweichung |
|---|---|---|---|---|---|---|
| k1-text-1 | 10,5 | 6,0 | 10 | 4,0 | 5,0 | +1,0 |
| k1-text-2 | 19,5 | 7,0 | 11 | 4,4 | 6,5 | +0,5 |
| k1-text-3 | 28,0 | 4,5 | 8 | 3,2 | 3,0 | +1,5 |
| k1-text-4 | 36,5 | 4,0 | 6 | 2,4 | 2,5 | +1,5 |
| k2-begriff-pk | 47,5 | 3,5 | 5 | 2,0 | 3,0 | +0,5 |
| k2-begriff-wallet | 52,2 | 3,0 | 5 | 2,0 | 1,5 | +1,5 |
| k2-text-1 | 53,0 | 5,0 | 10 | 4,0 | 4,0 | +1,0 |
| k2-begriff-pubkey | 63,0 | 3,5 | 5 | 2,0 | 3,0 | +0,5 |
| k2-text-2 | 64,0 | 7,0 | 16 | 6,4 | 6,5 | +0,5 |
| k2-text-3 | 72,2 | 6,5 | 15 | 6,0 | 6,0 | +0,5 |
| k2-text-4 | 80,0 | 4,0 | 5 | 2,0 | 3,5 | +0,5 |
| k3-begriff-block | 92,5 | 3,0 | 4 | 1,6 | 2,0 | +1,0 |
| k3-text-1 | 94,0 | 6,0 | 10 | 4,0 | 5,0 | +1,0 |
| k3-begriff-miner | 100,5 | 4,0 | 9 | 3,6 | 3,5 | +0,5 |
| k3-text-2a | 105,5 | 6,0 | 13 | 5,2 | 17,0 gesamt | |
| k3-text-2b | 112,0 | 3,5 | 8 | 3,2 | | |
| k3-text-2c | 116,0 | 8,5 | 21 | 8,4 | | 18,0 gegen 17,0: +1,0 |
| k3-begriff-gebuehr | 125,5 | 2,5 | 4 | 1,6 | 2,0 | +0,5 |
| k3-text-3 | 127,0 | 7,0 | 16 | 6,4 | 6,5 | +0,5 |
| k4-text-1 | 137,5 | 5,0 | 11 | 4,4 | 4,0 | +1,0 |
| k4-begriff-blockchain | 143,0 | 5,5 | 12 | 4,8 | 5,0 | +0,5 |
| k4-text-2 | 152,5 | 7,0 | 15 | 6,0 | 6,0 | +1,0 |
| k4-text-3a | 161,0 | 5,0 | 11 | 4,4 | 7,0 gesamt | |
| k4-text-3b | 167,0 | 3,5 | 7 | 2,8 | | 8,5 gegen 7,0: +1,5 |

Summen der Stehzeiten: Kapitel 1 21,5 s (Konzept ca. 22), Kapitel 2 32,5 s (ca. 26,5), Kapitel 3 40,5 s (ca. 36), Kapitel 4 26,0 s (ca. 22). Keine Stehzeit unter Soll, keine unter der errechneten Lesezeit.

## 3. Abweichungen vom Design-System (alle entschieden und dokumentiert)

1. tokens.css ist inline übernommen; @import fonts.css ersetzt durch eingebettete Fonts (Switzer Variable, DM Mono 400/500, Base64), die responsiven Typo-Skalen unter 1440 px Fensterbreite sind entfernt, weil die Bühne fix 1920x1080 ist und als Ganzes skaliert. Der Reduced-Motion-Block der Tokens ist erhalten; am Kiosk-Rechner ist Reduced Motion abzuschalten (Entscheidung 15.09.).
2. Drei film-lokale Werte, kommentiert im Token-Block: Bühne 1920x1080, Haarlinie 1 px (SHAPE SH2), Zonenbreite als calc aus Rand (space-9) und Zwischenraum (space-7). Sonst kein Hex, kein px im Film-Code.
3. Bühnenskalierung per transform: Einpassen der festen Bühne ins Fenster, keine Animation, keine Tiefe. Bei 4K Faktor 2,0.
4. Kapiteltitel in Switzer 700 versal statt Display-Font (T1), weil Panchang ausgeschlossen ist. Der Titel steht das ganze Kapitel und blendet einen Frame vor Kapitelende vollständig aus.
5. Adressen, Kürzel und Buchzeilen in DM Mono mit gemischter Schreibweise: dokumentierte Ausnahme von T3, weil versale Adressen inhaltlich falsch wären.
6. Fortschrittspunkte als Quadrate (SH1, kein border-radius); Transaktionspunkt als Kreis in der Line-Art, ohne Glow.
7. Orange nur für Aktion und aktiven Zustand: Transaktionspunkt, aktiver Fortschrittspunkt, Gewinnerkopie beim Mining (IX2), Bruch in der Kette (C5, statt Rot). Blau nur für Begriffskarten (Information).
8. Erzählerische Einblendungen mit duration-6, alle Fahrten und Wanderungen linear (ease-mechanical), freigegebene Ausnahme. Keine weiteren Kurven, kein scale über 1,0; die Kamera ist im Code auf 1,0 begrenzt.
9. Icons ausschließlich Tabler.io Outline: key, user, device-mobile, building-bank, wallet, check, hand-finger. Die Münze ist eigene Line-Art (zwei Kreise), weil das Tabler-Icon „coin“ ein Dollarzeichen trägt.
10. Objektlabels (DM Mono, muted) nur für Objekte, die im Konzept unter „Sehen“ genannt sind: Bank, Public Key, Wartebereich, Block. Keine Zonenlabels.
11. Die Kette ist senkrecht gestapelt (Zahn unten, Kerbe oben, wächst nach oben), abgeleitet aus dem Wortlaut von Kapitel 4.
12. Der Fokus-Baustein dimmt inaktive Zonen auf dimmed-opacity mit duration-6; Textzeile, Begriffskarte, Titel, Fortschritt und Punkt sind ausgenommen.

## 4. Korrigierte Artefakte des PDF-Exports (im Film korrigiert)

1. Kapitel 1, Text 1: „Eine Bank als zentrale Institution prüft, welche Transaktionen gültig sind.“ (Komma versetzt)
2. Kapitel 1, Text 2: „… ohne eine Bank durchzuführen.“ (Schlusspunkt ergänzt)
3. Kapitel 1, Text 3: „gemeinsame Transaktionsgeschichte“ (Leerzeichen ergänzt)
4. Kapitel 2, Text 3: „Geht dieser Private Key verloren, ist der Zugang …“ (Komma ergänzt)
5. Kapitel 3, Text 2a: „… in eine Zahl. Immer gleich, kein Zufall.“ (Bindestrich mit Leerzeichen durch Punkt ersetzt)
6. Kapitel 3, Text 3: „Der Rechner, der die Aufgabe am schnellsten löst, erhält …“ (zwei Kommata ergänzt)
7. Kapitel 3, Begriff Miner: Schlusspunkt ergänzt.
8. Kapitel 4, Text 2: „… zu den folgenden Blöcken.“ (Schlusspunkt ergänzt)
9. Kapitel 2, Text 3: öffnendes Anführungszeichen ohne schließendes aus dem Konzept nicht übernommen.

## 5. Gemeldet, Entscheidung Kuratorin

Wortänderungen, im Film wortgleich belassen, außer wo vermerkt:

1. Kapitel 3, Text 1: „(Proof of work)“ aus der Einblendung entfernt (Entscheidung 15.09., Wortänderung).
2. Kapitel 4, Text 2: „Würde ein älterer Block verändert werden wollen, passte er …“, Grammatik („verändert werden wollen“). Wortgleich belassen.
3. Kapitel 4, Text 3: „Dass bedeutet, das bestätigte Transaktionen …“, dass/das vertauscht. Wortgleich belassen.
4. Kapitel 2, Begriff Wallet: „verwahrt privat und Public Key.“, vermutlich „Private und Public Key“. Wortgleich belassen.
5. Kapitel 3, Text 3 nennt „Bitcoin“ als Belohnung, Kapitel 1 vermeidet Währungsbezeichnungen (Entscheidung „sendet Geld“). Kein Widerspruch, Hinweis.

Textaufteilungen, wortgleich, aus Platzgründen (Textzeile maximal zwei Zeilen bei 48 px):

6. Kapitel 3, Text 2 in drei Einblendungen (Schnitte nach „kein Zufall.“ und „andere Zahl.“), Entscheidung 15.09.
7. Kapitel 4, Text 3 in zwei Einblendungen (Schnitt nach „Transaktionen.“). Von mir entschieden, bitte bestätigen.

Offene Fragen:

8. Kapitel 1 schreibt nur „Albert“ in ein Kürzel um, Kapitel 2 setzt beide als Kürzel voraus; Carola wird deshalb zu Beginn von Kapitel 2 umgeschrieben („3Cq8…“). Passt das zur Erzählung?
9. Kapitel 4: Die Hand ändert im ältesten Block die Zahl „1A2b…: 3“ zu „1A2b…: 8“, also die Transaktion aus Kapitel 1. Ist die Rückbindung erwünscht oder soll es eine beliebige Zahl sein?
10. Schriftgrößen (Textzeile 48 px, Begriffskarte 24 px, Labels 24 px) bleiben bis die Monitordaten vorliegen.
11. Die Icon-Pfade (Tabler) sind aus dem Gedächtnis gesetzt und sollten gegen tabler.io geprüft werden, insbesondere hand-finger.

## 6. Übergabe an das Team

Datei: bitcoin-film_v1.0.html, eine Datei, alles inline, kein Server nötig. Im Browser (Chrome, Edge, Firefox, Safari) öffnen, der Film startet und läuft endlos. Die Bühne passt sich jeder Fenstergröße an, bei abweichendem Seitenverhältnis Letterbox auf Schwarz.

Zeiten, Texte, Stehzeiten ändern: ganz oben in der Datei steht das Objekt `SCRIPT`. Darüber eine Legende aller Felder und Aktionen. Jede Zeile in `cues` ist ein Ereignis mit `t` (Startzeit in Sekunden), `ch` (Kapitel), `name` (Kürzel für den Dev-Modus), `action` und den Feldern der Aktion. Bei `text` und `term` steht die Stehzeit in `hold`. Kapiteltitel und Kapitelgrenzen stehen in `chapters`. Alles unterhalb von `SCRIPT` (Stil, Engine, Bühne) bleibt unberührt. Nach einer Änderung Datei speichern und im Browser neu laden.

Dev-Modus: im laufenden Film Taste D. Unten erscheint eine Leiste mit Play/Pause, Zeitanzeige, Kapitel, Cue-Name und Scrubber. Leertaste Play/Pause, Tasten 1 bis 4 springen an den Kapitelanfang, Pfeiltasten links/rechts eine Sekunde, mit Shift ein Frame. Der aktuelle Cue-Name steht oben mittig im Bild. Taste D wieder aus. Alternativ die Datei mit `?dev=1` hinter dem Dateinamen öffnen. In der Auslieferung ist der Dev-Modus aus.

Export wiederholen: bitcoin-film_export.py neben die HTML-Datei legen und ausführen:

    python3 bitcoin-film_export.py bitcoin-film_v1.0.html bitcoin-film_v1.0.mp4

Voraussetzungen einmalig: `pip install playwright`, `python3 -m playwright install chromium`, ffmpeg installiert. Der Export rendert jeden Frame deterministisch über seek(t), 25 fps, 1920x1080, und schreibt H.264 mit yuv420p. Dauer etwa 10 Minuten. Das Skript meldet Konsolenfehler, falls welche auftreten.

Fonts: Switzer und DM Mono sind eingebettet. Panchang wird nicht verwendet. Externe Verbindungen gibt es keine.
