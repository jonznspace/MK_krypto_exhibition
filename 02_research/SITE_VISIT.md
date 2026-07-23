# SITE_VISIT — Raum, Endpunkte, Sound

> Kontext-Datei. Der physische Kontext, in dem die Screens leben.

## Der Raum

Münzkabinett im Residenzschloss Dresden. Der Ausstellungsraum ist **klinisch weiß** —
hell, ruhig, museal. Die digitalen Endpunkte setzen sich davon bewusst als **schwarze,
technische Flächen** ab: Fenster in die digitale/verschlüsselte Innenwelt.

**Gestalterische Konsequenz:** Der Screen-Kontext ist immer **dark**. Der Kontrast
Weiß (Raum) ↔ Schwarz (Screen) ist gewollt und wird nicht aufgeweicht (keine grauen oder
hellen Screen-Hintergründe).

## Endpunkt-Kontexte

Unterschiedliche Hardware = unterschiedliche Interaktions- und Leseabstände. Ein System,
mehrere Bühnen:

| Endpunkt | Nutzung | Design-Konsequenz |
|----------|---------|-------------------|
| **Beamer** (4, große Wand) | Passiv, aus Distanz, meist nicht-interaktiv | Große Typo, ambiente Motion, kein Feintext; keine Touch-Ziele nötig |
| **Große Tablets** (9) | Interaktiv, Touch, nah, einzeln | Volles Interaktions-System, Touch-Targets, Vertiefungen |
| **Großer Touchscreen** (1) | Interaktiv, ggf. mehrere Personen | Wie Tablet, robustere Ziele, mehrere Fokuspunkte möglich |
| **Kleine Tablets** (4) | Interaktiv, Touch, kompakt | Kompaktere Layouts, gleiche Regeln, Grid greift enger |

Responsivität folgt den Viewport-Tokens (`viewport/phone|tablet|desktop`) und dem Grid
(siehe VISUAL_LANGUAGE §Grid).

## Sound-Design

Zwei Ebenen, beide leise und unaufdringlich:

### Ambient-Soundscape (Raumebene)
Ein subtiler, kontinuierlicher Klangteppich, der dem Raum ein technisches **Raumgefühl**
gibt — ganz leise unter allem:

- feine **Lüftergeräusche**
- **Rechen-/Mining-Geräusche** (Andeutung einer Mining-Farm)
- vereinzelte, sehr leise **Piepser**

Der Soundscape ist Atmosphäre, nie Information. (Noch in Ausarbeitung.)

### Cue-Sounds (Interaktionsebene)
Kurze, funktionale Rückmeldungen auf Interaktion — Square-Wave, High-Pass ab 500 Hz
(kein Bass, verschmiert sonst im Raum), jeder Cue < 300 ms. Definiert als Tokens
(`sound/*`, siehe VISUAL_LANGUAGE §Sound).

### Sound-Regeln
- **SND1 [MUST]** Grundzustand ist Stille. Kein Dauerton auf Interaktionsebene.
- **SND2 [MUST]** Jeder Cue hat eine sichtbare Entsprechung — Ton nie alleiniger Träger (A6).
- **SND3 [MUST]** Ambient-Soundscape und Cue-Sounds bleiben leise; sie dürfen die
  Ausstellungsatmosphäre und Gespräche nicht überlagern.
