# CUSTOMER — Zielgruppen & Bedienbarkeit

> Kontext-Datei mit verbindlichen Accessibility-Regeln (A-x). Diese sind `MUST`.

## Zielgruppen

**Alle Besucher der Ausstellung.** Kein exklusives Fachpublikum. Ausdrücklich eingeschlossen:

- **Breites Museumspublikum** — unterschiedlichstes Vorwissen, Alter, Sprache.
- **Jugendliche & Bildung/Vermittlung** — Schulklassen, Vermittlungsformate. Das System
  muss auch hier funktionieren.
- **Gelegenheits-Nutzer ohne Technik-Affinität** — die Bedienung darf nichts voraussetzen.

Kernannahme: Die Interaktion ist **kurz, öffentlich, unbetreut, im Vorbeigehen**. Nutzer
steigen jederzeit ein und aus. Kein Login, kein Tutorial, keine Vorkenntnisse.

## Anforderungen an die Bedienbarkeit

- **Selbsterklärend.** Ein Screen kommuniziert seinen Zweck ohne Anleitung.
- **Ein Fokus pro Screen.** Genau eine primäre Handlung ist klar erkennbar (Orange-CTA).
- **Robust gegen Fehlbedienung.** Immer ein Weg zurück / Reset; kein Sackgassen-Zustand.
- **Attract-Mode.** Nach Inaktivität lockt der Screen sichtbar zurück in den Grundzustand.
- **Klartext.** Kurze Sätze, konkrete Begriffe; Fachbegriffe werden erklärt.

## Accessibility-Regeln (verbindlich)

- **A1 [MUST]** Touch-Targets ≥ `size/touch/min` (44px). Keine kleineren Tap-Flächen.
- **A2 [MUST]** Text-Kontrast erfüllt mindestens WCAG 2.2 AA (Body ≥ 4.5:1, große Typo ≥ 3:1)
  gegen seinen tatsächlichen Untergrund. Gilt auch für Orange/Blau auf Schwarz.
- **A3 [MUST]** Fokus ist immer sichtbar (`immersive/focus`, 2px, Offset) — für Tastatur
  und assistive Bedienung.
- **A4 [MUST]** Farbe ist **nie** alleiniger Informationsträger. Zustand/Bedeutung immer
  zusätzlich über Text, Icon oder Form.
- **A5 [MUST]** Bewegung ist nie alleiniger Träger. `prefers-reduced-motion` → alles auf
  `duration/1`, Ambient stoppt (siehe VISUAL_LANGUAGE §Motion).
- **A6 [MUST]** Ton ist nie alleiniger Träger. Jeder Sound-Cue hat eine sichtbare
  Entsprechung (siehe SITE_VISIT §Sound).
- **A7 [SHOULD]** Sprache einfach halten (Zielniveau: verständlich ab ~Jugendalter).
  Zahlen und abstrakte Konzepte mit konkreten Vergleichen begreifbar machen.
