# Report Schritt 1, Fundament (v0.1)

Ist-Dauer gegen Soll: 185,0 s = 3:05 (Kapitelraster 45 / 40 / 50 / 50 wie im Konzept). Kapitel sind angelegt mit Titel, Startzeit, Dauer und Fortschrittspunkt, noch ohne Inhalt.

Verifiziert in Playwright (Chromium 141): seek(t) in 0,5-s-Schritten über die gesamte Länge korrekt, Konsole leer, Bühne füllt 1920x1080, 1280x720 und 3840x2160 exakt, bei 1600x1200 Letterbox oben und unten je 150 px auf Schwarz. Loop-Naht: Pixelvergleich letzter Frame gegen Frame 0, einziger Unterschied ist der Fortschrittspunkt (4 aktiv gegen 1 aktiv), sonst identisch. Dev-Modus mit Taste D, Kapitelsprung 3 landet auf 85,0 s.

## Cues im Fundament (alle mit demo: true markiert, in Schritt 2 entfernt)

| t | Cue | Aktion | Wörter | Lesezeit | Stehzeit |
|---|---|---|---|---|---|
| 1 | demo-karte | Karte einblenden | | | |
| 5 | demo-textzeile | Textzeile | 8 | 3,2 s | 6 s |
| 8 | demo-punkt-an | Punkt einblenden | | | |
| 9 | demo-punkt-1 | Punkt links nach Mitte, 6 s linear | | | |
| 13 | demo-begriff | Begriffskarte, Mitte | 11 | 4,4 s | 6 s |
| 16 | demo-punkt-2 | Punkt Mitte nach rechts, 6 s linear | | | |
| 23 | demo-punkt-aus | Punkt ausblenden | | | |
| 25 | demo-kamera-aus | Kamera auf 0,6 | | | |
| 27 | demo-kamera-zu | Kamera 0,6 auf 1,0 in 5 s linear | | | |
| 34 | demo-textzeile-2 | Textzeile | 13 | 5,2 s | 7 s |
| 183 | demo-karte-aus | Karte ausblenden (für saubere Naht) | | | |

Stehzeit ist definiert als Zeit vom Cue-Start bis zum Beginn der Ausblendung; Ein- und Ausblendung dauern je 1200 ms (duration-6).

## Abweichungen vom Design-System, jeweils entschieden und gemeldet

- tokens.css ist inline übernommen, mit zwei Eingriffen: @import fonts.css ersetzt durch eingebettete Fonts, und die beiden responsiven Typo-Skalen (unter 1440 px Fensterbreite) entfernt. Grund: sie hätten die Schrift bei 1280x720 unabhängig von der Bühnenskalierung verkleinert. Reduced-Motion-Block bleibt erhalten.
- Drei film-lokale Werte, kommentiert: Bühne 1920x1080, Haarlinie 1px (SHAPE SH2), Zonenbreite als calc aus Rand und Zwischenraum. Sonst kein Hex und kein px im Film-Code, geprüft per Suche.
- Kapiteltitel in Switzer 700 versal statt Display-Font (T1), weil Panchang ausgeschlossen ist.
- Fortschrittspunkte als Quadrate (SH1, kein border-radius), Transaktionspunkt als Kreis in der Line-Art, ohne Glow.
- Transaktionspunkt in Orange, da er die einzige Aktion auf der Karte ist. Begriffskarte in Blau (Information).
- Bühnenskalierung per transform: kein Zoom, keine Tiefe, sondern das Einpassen der festen Bühne. Bei 4K Faktor 2,0.
- Alle Fahrten linear, alle Einblendungen duration-6 mit entrance/exit-Kurven. Keine weiteren Kurven, kein scale über 1,0 (Kamera ist im Code auf 1,0 begrenzt und warnt).
- Schlüssel als Tabler-Icon "key" (Outline).

## Offene Fragen (Stand v0.1, inzwischen entschieden, siehe Entscheidungsprotokoll)

- Kürzel "1A2b..." enthält Kleinbuchstaben, T3 verlangt DM Mono versal.
- "Roter Bruch" (Kapitel 4) widerspricht C5: Fehler im Immersive-Kontext sind Orange.
- Der lange Text in Kapitel 3 (47 Wörter) wird bei 48 px fünf Zeilen hoch. Vorschlag: drei Textzeilen nacheinander.
- Textzeile 48 px, Begriffskarte 24 px: Monitorgröße und Betrachtungsabstand entscheiden.
- Kapiteltitel 4 s oder das ganze Kapitel.
- Reduced Motion: am Kiosk abschalten, für den MP4-Export ohne Belang.
