# Station 2 — Zirkel & Permutationsscheibe (Draft)

Interaktives Tablet für Station 2, im immersiven Design-System. Fix **1920×1080**,
skaliert automatisch auf das Browserfenster.

## Starten

`index.html` im Browser öffnen. Falls die Fonts über `file://` nicht laden, kurz einen
lokalen Server starten und `http://localhost:8000/04_exploration/station-02/` öffnen:

```bash
# im Repo-Root:
python3 -m http.server 8000
```

## Enthalten

- Drehbare Scheibe (Ziehen mit dem Finger/Maus, rastet auf Buchstaben; ◀ ▶ zum Steppen)
- **Verschlüsseln**: Vorgabe-Wörter oder A–Z antippen, Mapping-Animation, Chiffre live
- **Knacken**: abgefangene Botschaft aufdrehen, bis ein Wort erscheint → „geknackt“
- **Vertiefung** (blau): schwarze Kammern + Permutationsscheibe (26 vs. 26! Schlüssel)
- Attract-Mode (60 s Leerlauf), Cue-Sounds, reduced-motion, Touch-Targets ≥ 44px

## Werte

Alles aus `../../00_design-system/tokens/` (`tokens.css` inkl. Fonts). Kein CDN.
