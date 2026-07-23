# MK_krypto_exhibition

Interactive website and media stations for the crypto exhibition **„Krypto, was?"**
— Staatliche Kunstsammlungen Dresden, Münzkabinett, Residenzschloss (2026–2027).

Dieses Repository enthält die **Creative Direction & das Design-System** für die
digitalen Endpunkte der Ausstellung (Beamer, Tablets, Touchscreen).

## 👉 Zuerst lesen: [BRIEFING.md](BRIEFING.md)

Das **BRIEFING** ist der Einstiegspunkt und die Verfassung des Systems — für Menschen und
für KI-Agenten. Es enthält die Kernregeln, die Präzedenzordnung und die Dateikarte.
Alles Weitere leitet sich daraus ab.

## Struktur

```
BRIEFING.md            ← Einstiegspunkt / Constitution (zuerst lesen)
00_design-system/      ← Tokens (tokens.json, tokens.css) — maschinelle Wahrheit
01_project/            ← Projektfakten + Key-Visual
02_research/           ← Brand, Zielgruppen, Ort & Sound
03_design/             ← Design-DNA, Visual Language, Shape-System
04_exploration/        ← Explorationen / Skizzen
```

## Werte

Alle konkreten Werte (Farben, Maße, Dauern) stammen ausschließlich aus
`00_design-system/tokens/`. Dokumentation referenziert Tokens per Name, nie per Rohwert.
Der Screen-Kontext ist dark; `[data-theme="dark"]` aktiviert die dunklen Semantik-Farben.
