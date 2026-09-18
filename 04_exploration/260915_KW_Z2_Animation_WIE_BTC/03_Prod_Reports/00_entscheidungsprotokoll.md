# Erklärfilm "Wie funktioniert Bitcoin?", Entscheidungsprotokoll

Bereich 2, Ausstellung "Krypto, was?", SKD Münzkabinett. Stand 15.09.2026, v1.0.

Grundlage: Medienkonzept Bereich 2, 4-Kapitel-Fassung mit Ablauf (Bianca Schubert, August 2026). Design: Repo jonznspace/MK_krypto_exhibition (tokens.css als einzige Wertquelle, BRIEFING, VISUAL_LANGUAGE, SHAPE_SYSTEM).

Rollen: Konzept und Regie Bianca Schubert. Creative Direction und Freigabe Steve Johnson-Wozowiecki. Umsetzung Claude (Fable 5.1) in fünf Schritten, jeweils mit Kontaktbogen und Report.

## 1. Rahmen (Bianca, 15.09.)

- Ausgabe auf einem 16:9-Monitor unterhalb der Wandprojektion, nicht mehr per Beamer. Monitorauflösung noch offen, daher responsiv mit Basis 1920 x 1080.
- Loop nach dem letzten Kapitel.
- Kapitel 1 mit allgemeiner Währung, Formulierung "sendet Geld", keine Währungszeichen.
- Personen Carola und Albert (nach zwei Gemälden in der Nähe, Wunsch von Sylvia Karges).
- Motion-Ausnahme für den Film freigegeben: Einblendungen mit duration-6, Fahrten linear. Alle anderen Werte aus den Tokens.

## 2. Arbeitsweise (Steve, 15.09.)

- Eine einzige HTML-Datei, Fonts eingebettet, kein Build, keine externen Adressen.
- Alle Zeiten, Texte und Stehzeiten im SCRIPT-Objekt am Dateianfang.
- Ausstellungstexte wortgleich aus dem Konzept. Ergänzung nach Kapitel 1: Leerzeichen- und Satzzeichenartefakte des PDF-Exports werden korrigiert und gelistet, Wortänderungen nur nach Freigabe der Kuratorin.
- Lesezeit 2,5 Wörter pro Sekunde, Stehzeiten mindestens wie im Konzept.
- Verifikation vor jeder Lieferung in Playwright, Kontaktbogen je Kapitel.

## 3. Bild und Design (Steve als Creative Director, 15.09.)

- Adressen und Kürzel behalten die gemischte Schreibweise in DM Mono (Ausnahme von T3, weil versale Adressen inhaltlich falsch wären).
- Kapiteltitel bleibt das ganze Kapitel über oben links stehen.
- Keine Zonenlabels ("Signieren", "Das Buch", "Die Kette") im Bild. Der Film erklärt nur über Ausstellungstexte und Begriffskarten.
- Objektlabels nur für Objekte, die im Konzept unter "Sehen" genannt sind (Bank, Public Key, Wartebereich, Block), klein, DM Mono, sie erscheinen und verschwinden mit dem Objekt.
- Die mittlere Zone ist ein Ring aus acht gleichwertigen Kopien ohne Zentrum. Ein Stern mit Mittelknoten wäre das Bild der Bank.
- Fokus-Baustein: die aktive Zone bleibt voll sichtbar, die anderen gehen auf dimmed-opacity. Kein Zoom, nur eine Zoom-Ebene, wie im Konzept.
- Der Bruch in Kapitel 4 ist orange (C5), nicht rot.
- Die Kette steht senkrecht und wächst nach oben (Vorschlag Claude in v0.4, bestätigt), abgeleitet aus dem Wortlaut von Kapitel 4.
- Text 2 in Kapitel 3 (47 Wörter) wortgleich auf drei Einblendungen, Schnitte nach "kein Zufall." und "andere Zahl.". Text 3 in Kapitel 4 auf zwei Einblendungen, Schnitt nach "Transaktionen." (Vorschlag Claude, Bestätigung durch Kuratorin offen).
- Schriftgrößen (Textzeile 48 px, Begriffskarte 24 px) bleiben, bis die Monitordaten vorliegen.
- Reduced Motion am Kiosk-Rechner abschalten.

## 4. Textentscheidungen (Steve, 15.09.)

- Korrigierte Artefakte im Film: vollständige Liste in report_v1.0_abschluss.md, Abschnitt 4.
- "(Proof of work)" aus der Einblendung in Kapitel 3 entfernt, als Wortänderung an die Kuratorin gemeldet.
- " - " in Kapitel 3, Text 2a, durch einen Punkt ersetzt.
- Wortgleich belassen und gemeldet: "verändert werden wollen" (Kapitel 4, Text 2), "Dass bedeutet, das" (Kapitel 4, Text 3), "verwahrt privat und Public Key" (Kapitel 2, Begriff Wallet).

## 5. Offen, Entscheidung Kuratorin (Sylvia Karges / Bianca Schubert)

- Die gemeldeten Wortänderungen aus Abschnitt 4.
- Teilung von Text 3 in Kapitel 4 bestätigen.
- Rückbindung in Kapitel 4: die Hand ändert die Transaktion aus Kapitel 1 ("1A2b...: 3" zu "8"). Erwünscht oder beliebige Zahl?
- Carola wird zu Beginn von Kapitel 2 ebenfalls zum Kürzel ("3Cq8..."), Kapitel 1 schreibt nur Albert um. Passt das zur Erzählung?
- Gewinnerzahl "0000D2" mit vier führenden Nullen als Bild für "ganz viele Nullen".
- Schriftgrößen nach Vorliegen der Monitordaten.
- Sichtbarkeit des Bruchs in Kapitel 4: derzeit eine dünne orange Kante mit versetzter Kerbe. Nach Sichtung auf dem echten Monitor entscheiden, ob die Kante kräftiger werden soll.

## 6. Versionen

- v0.1 Fundament (Bühne, Karte, Zeitachse, Bausteine, Dev-Modus)
- v0.2 Kapitel 1
- v0.3 Kapitel 2
- v0.3.1 Fundament-Korrektur (Ring statt Stern, Labels entfernt)
- v0.3.2 Fokus-Baustein, Textartefakte
- v0.4 Kapitel 3, senkrechte Kette
- v1.0 Kapitel 4, Gesamtabnahme, MP4-Export, Exportskript

Reports zu v0.2 und v0.3 liegen nicht in diesem Ordner; ihr Inhalt ist durch v0.3.1 und v0.3.2 vollständig überholt.
