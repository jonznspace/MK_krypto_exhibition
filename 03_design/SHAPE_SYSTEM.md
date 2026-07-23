# SHAPE SYSTEM — Geometrie & Form

> Form- und Geometrie-Ebene. Werte aus Tokens. Format wie DESIGN_DNA (`ID [LEVEL]`).

## 1. Grundhaltung der Form

Rechtwinklig, technisch, präzise. Formen wirken **gebaut**, nicht gezeichnet. Wenig Radius,
harte Kanten, feine Linien. Rundungen sind die Ausnahme und semantisch begründet (z. B. die
runden Enigma-Tasten als physisches Tastatur-Zitat).

- **SH1 [MUST]** Default ist die scharfe Kante (`radius/none`). Radius nur, wo ein Element
  es funktional/metaphorisch verlangt. · Technischer, konstruierter Charakter.
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

- **SH12 [SHOULD]** Skeuomorphe Zitate (z. B. runde Enigma-Tasten, cremeweißer Tastenton
  ≈ `primary/50`) sind erlaubt, wo sie ein reales Bedienelement referenzieren und die
  Erklärung stützen — sparsam und klar begrenzt auf das jeweilige Exponat. · Haptik als
  Verständnishilfe, nicht als Deko.

## 6. Typografie als Form

- **SH13 [MUST]** Display/Headlines sind schwere, kondensierte, versale Großformen
  (Display-Font) — sie tragen die Screens optisch. Mono (`DM Mono`) trägt Labels, Codes,
  Metadaten (der „Maschinen-Ableser"-Ton). · Kontrast aus massiver Headline und technischem
  Mono ist Teil der Identität.
- Werte/Skala: siehe [VISUAL_LANGUAGE §Typografie](VISUAL_LANGUAGE.md).
