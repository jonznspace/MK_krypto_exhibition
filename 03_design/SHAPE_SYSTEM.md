# SHAPE SYSTEM — Geometrie & Form

> Form- und Geometrie-Ebene. Werte aus Tokens. Format wie DESIGN_DNA (`ID [LEVEL]`).

## 1. Grundhaltung der Form

Rechtwinklig, technisch, präzise. Formen wirken **gebaut**, nicht gezeichnet. Kein Radius,
harte Kanten, feine Linien. Rundungen kommen ausschließlich über Bildsprache (Foto/Illustration),
nie über `border-radius`/`CORNER_RADIUS` (siehe SH12).

- **SH1 [MUST]** Scharfe Kante auf jeder Ebene: alle `radius/*`-Tokens (`none|sm|md|lg|full`)
  sind `0`, ohne Ausnahme. Kein Element erhält einen abgerundeten `border-radius`. ·
  Technischer, konstruierter Charakter.
- **SH2 [MUST]** Linienstärken sind fein und einheitlich (Haarlinien für Line-Art, 1px für
  UI-Borders via `layer-border`). · Präzision, keine grafische Schwere.

## 2. Dither / Raster

Die Abstraktionssprache für **Objekte** und für das **Key-Visual**.

- **SH3 [MUST]** Objektabbildungen auf Screens sind **monochrom** gedithert und treten
  hinter Information/Interaktion zurück (reduzierte Opazität, kein Vollkontrast). · DNA10.
- **SH4 [MUST]** Der Dither greift die Ästhetik des Key-Visuals auf: harte Pixel/Raster,
  keine weichen Verläufe. · Ein durchgängiger digitaler Charakter.
- **SH5 [MUST NOT]** Kein Blur, kein Weichzeichner, kein Glow auf Dither. · Zerstört das
  Raster (DNA6).
- **Anwendungsstufen:** Key-Visual/Kampagne = expressiv, Blau **und** Orange, großflächig.
  Screen-Objektbild = monochrom, zurücktretend.

## 3. Line-Art / Explosionszeichnung

Die Erklärsprache für **Funktion und Aufbau**.

- **SH6 [MUST]** Technische Zusammenhänge werden über feine, präzise **Linien auf Schwarz**
  erklärt (Explosionszeichnungen, Funktionsdarstellungen), nicht fotografisch. · DNA9.
- **SH7 [MUST]** Line-Art ist beschriftet (Bauteil-Labels, Mono) und lebt typischerweise
  auf **LAYER/400** (Vertiefungs-Overlay). · Beispiel: Umkehrwalze-Explosionszeichnung.
- **SH8 [MUST NOT]** Keine Flächenfüllung, kein Schatten, keine Materialtextur. · Erklärung
  statt Reproduktion.

## 4. Icons

- **SH9 [MUST]** Ausschließlich **Outline-Icons aus Tabler.io** (https://tabler.io/icons).
  Keine andere Quelle, kein Mischen von Icon-Sets. · Einheitliche, technische Bildsprache.
- **SH10 [MUST]** Einheitlich dünne Linienstärke, funktional und aufs Wesentliche
  reduziert. Größen aus `size/icon/sm|md|lg` (16/20/24). · Konsistenz und Ruhe.
- **SH11 [MUST NOT]** Keine gefüllten, mehrfarbigen oder illustrativen Icons. · Bricht die
  Outline-Sprache.

## 5. Rundung & Metapher

- **SH12 [MUST NOT]** Seit 2026-07-24 keine Rundung mehr über `border-radius`/`CORNER_RADIUS`
  — auch nicht als skeuomorphes Zitat (ehemals: runde Enigma-Tasten). Soll ein reales rundes
  Bedienelement referenziert werden, geschieht das ausschließlich über Bildmaterial
  (Foto/Illustration/Icon), nie über einen abgerundeten Rahmen. · SH1 gilt ausnahmslos.

## 6. Typografie als Form

- **SH13 [MUST]** Display/Headlines sind schwere, kondensierte, versale Großformen
  (Display-Font) — sie tragen die Screens optisch. Mono (`DM Mono`) trägt Labels, Codes,
  Metadaten (der „Maschinen-Ableser"-Ton) und steht **immer in Versalien** (`text-transform:
  uppercase`), nie lower-/mixed-case. · Kontrast aus massiver Headline und technischem
  Mono ist Teil der Identität.
- Werte/Skala: siehe [VISUAL_LANGUAGE §Typografie](VISUAL_LANGUAGE.md).
