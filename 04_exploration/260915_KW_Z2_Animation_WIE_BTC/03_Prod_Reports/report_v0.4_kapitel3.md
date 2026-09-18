# Report Schritt 4, Kapitel 3 "Wie funktioniert Mining?" (v0.4)

Ist-Dauer: 85,0 bis 135,0 s, letzter Cue k3-zahlen-weg bei 134,6, Titel blendet bei 133,8 aus. Gesamt weiterhin 185,0 s. Verifiziert: seek, Konsole leer, drei Fenstergrößen plus Letterbox, Kontaktbogen mit 12 Frames, Kapitel 2 nach der Kettenänderung nochmals gerendert und geprüft.

## Cues nach "Sehen:"-Schritten

- Wartebereich (85,0 bis 90,5): Fokus Wartebereich, vier unterschriebene Zettel erscheinen im Sekundenabstand neben dem Transaktionspunkt.
- Bündeln (91,0 bis 104,5): Fokus Wartebereich plus Kette, Zettel fahren linear zum nächsten Block, der Block zeichnet sich (2 s), Punkt fährt in den Block, Zettel verschwinden, Blockinhalt und Label "Block" erscheinen, Begriff Block, Text 1, Fokus Netzwerk, Begriff Miner.
- Würfeln (105,0 bis 124,5): auf allen acht Kopien laufen sechsstellige Zahlen, deterministisch aus Kopie und Frame, drei Textzeilen. Treffer bei 120,0: alle Zahlen frieren ein, der Gewinner (Kopie 7, rechts oben, der Kette am nächsten) zeigt "0000D2" und leuchtet orange.
- Gewinner (125,0 bis 134,6): Fokus Netzwerk plus Kette, Linie vom Gewinner zum Block zeichnet sich, Begriff Transaktionsgebühr, Münze erscheint am Gewinner, Text 3, ab 133,0 würfeln alle von vorn, Linie und Münze verschwinden, Zahlen bei 134,6.

| Cue | Start | Stehzeit | Wörter | Lesezeit | Soll | Abweichung |
|---|---|---|---|---|---|---|
| k3-begriff-block | 92,5 | 3,0 | 4 | 1,6 | 2,0 | +1,0 |
| k3-text-1 | 94,0 | 6,0 | 13 | 5,2 | 5,0 | +1,0 |
| k3-begriff-miner | 100,5 | 4,0 | 9 | 3,6 | 3,5 | +0,5 |
| k3-text-2a | 105,5 | 6,0 | 13 | 5,2 | (17 gesamt) | |
| k3-text-2b | 112,0 | 3,5 | 8 | 3,2 | | |
| k3-text-2c | 116,0 | 8,5 | 21 | 8,4 | | 18,0 gegen 17,0: +1,0 |
| k3-begriff-gebuehr | 125,5 | 2,5 | 4 | 1,6 | 2,0 | +0,5 |
| k3-text-3 | 127,0 | 7,0 | 16 | 6,4 | 6,5 | +0,5 |

Summe Stehzeiten 40,5 s gegen ca. 36 s im Konzept, alle über Soll.

## Abweichungen und Entscheidungen

- Fundament-Änderung: Die Kette ist senkrecht gestapelt, jeder Block mit Zahn unten und Kerbe oben, sie wächst nach oben. Grund ist der Wortlaut von Kapitel 4 ("unten eine verzahnte Kante", "oben schneller neue Blöcke anhängen", "die Hand unten"). Der nächste Block liegt auf der Fahrbahn, der Wartebereich darüber ist um 32 px nach unten gerückt.
- Der Anker "right" des Transaktionspunkts ist die Mitte des nächsten Blocks; die Reise der Transaktion endet dort.
- Die Kopien des Buches sind die "Rechner", die würfeln. Kein Label dafür, der Begriff Miner deckt es.
- "Leuchtet auf" ist die orange Kontur der Gewinnerkopie (aktiver Zustand, IX2), ohne Glow. "Glänzende Münze" ist Line-Art aus zwei Kreisen ohne Glanz und ohne Währungszeichen; das Tabler-Icon "coin" trägt ein Dollarzeichen und ist deshalb nicht verwendet.
- Objektlabels nach neuer Regel: "Block". Keine Labels für Rechner und Münze.

Korrigierte Artefakte: Text 3 "Der Rechner, der die Aufgabe am schnellsten löst, erhält ..." (zwei Kommata ergänzt). Begriff Miner mit Schlusspunkt.

Gemeldet (inzwischen entschieden, siehe Entscheidungsprotokoll): " - " in Text 2a; "(Proof of work)" in Text 1; "Bitcoin" als Belohnung in Text 3 (kein Widerspruch, Hinweis).

Offene Fragen an die Kuratorin: Gewinnerzahl "0000D2" mit vier führenden Nullen; vier Zettel im Wartebereich.
