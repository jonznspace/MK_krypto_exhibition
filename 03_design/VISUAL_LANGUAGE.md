# VISUAL LANGUAGE — Das System

> Systemregeln. Präzedenz unter DESIGN_DNA, über SHAPE_SYSTEM (BRIEFING §5).
> **Werte kommen ausschließlich aus den Tokens** (`00_design-system/tokens/`). Dieses File
> referenziert Tokens per Name, nie per Rohwert. Screen-Kontext = **dark/immersive**.
> Regelformat: `ID [MUST/MUST NOT/SHOULD]`.

Inhalt: [Farbe](#1-farbe) · [Surfaces](#2-surfaces) · [Layer](#3-layer-system) ·
[Motion](#4-motion) · [Typografie](#5-typografie) · [Grid & Spacing](#6-grid--spacing) ·
[Icons](#7-icons) · [Bildsprache](#8-bildsprache) · [Interaktion](#9-interaktions-elemente) ·
[Sound](#10-sound) · [Tokens](#11-token-referenz)

---

## 1. Farbe

**Neutral trägt die Ausstellung. Farbe trägt Bedeutung.** (DNA4)

- **C1 [MUST]** Neutral (Schwarz/Grau/Weiß) trägt Inhalt und Struktur.
  → `immersive/bg`, `immersive/ink`, `immersive/body`, `immersive/muted`
- **C2 [MUST]** **Orange = Action.** Nur für: CTAs, aktive Eingabe, aktive Auswahl,
  aktive Navigation, aktive Zustände, Stations-Tag. → `immersive/accent` (`primary/400`)
- **C3 [MUST]** **Blau = Information.** Nur für: Vertiefung, Kontext, „Mehr erfahren",
  Wissens-Interaktionen. → `secondary/500` (Fokusring: `immersive/focus`)
- **C4 [MUST NOT]** Orange/Blau nie dekorativ, nie zur Einfärbung der Bildwelt. (DNA5)
- **C5 [MUST]** Fehlerzustand nutzt im Immersive-Kontext **Orange** (`state/accent`), nicht
  Rot — immer zusätzlich visuell + `sound/error`. Für Standard-UI außerhalb der Station
  gelten die roten `color/feedback/error`-Tokens.

### Immersive-Palette (Screens, dark)

| Token | Primitive | Rolle |
|-------|-----------|-------|
| `immersive/bg` | `neutral/900` #000000 | Grundfläche der Screens |
| `immersive/ink` | `neutral/0` #FFFFFF | Primärtext, Headlines |
| `immersive/body` | `neutral/300` #C7CBD3 | Fließtext |
| `immersive/muted` | `neutral/500` #7D8290 | Mono-Labels, Meta, dezent |
| `layer-surface-raised` | `neutral/850` #0A0A0A | erhöhte Fläche (Contained/Overlay) |
| `layer-border` | `neutral/800` #292C33 | Trennlinien, 1px |
| `immersive/accent` | `primary/400` #F79530 | **Action** (Orange) |
| `immersive/focus` | `secondary/500` #264EFF | **Information** / Fokusring (Blau) |

### Warm = „aktiv", nicht „eleviert"

- **C6 [MUST]** Wärme (`primary/800/900`) signalisiert **Zustand** (aktiv/ausgewählt),
  niemals Ebene. Elevierte Flächen bleiben neutral. · Vermeidet Doppelbelegung.

| Token | Primitive | Zustand |
|-------|-----------|---------|
| `state/pressed-surface` | `primary/800` #1F1000 | pressed / hover-aktiv |
| `state/selected-surface` | `primary/900` #0F0800 | selected |
| `state/accent` | `primary/400` #F79530 | selected / error / attract (Border/Akzent) |

---

## 2. Surfaces

Dreistufige visuelle Hierarchie einer Fläche **innerhalb** einer Layer. Getrennt vom
Layer-System (§3). Auf schwarzem Grund wird Elevation **nicht über Helligkeit**, sondern
über Border, Fläche und Rolle gezeigt (DNA6).

| Surface | Rolle | Fläche | Trennung |
|---------|-------|--------|----------|
| **01 Elevated** | hervorgehobene Info, zentrale Interaktion, fokussierter Inhalt, wichtige Overlays | `layer-surface-raised` | Border + i. d. R. höhere Layer + ggf. Akzent |
| **02 Contained** | Cards, Module, Controls, Inhaltsgruppen, normale UI-Flächen | `layer-surface-raised` | `layer-border` (1px) |
| **03 Subtle** | sekundäre Info, passive Bereiche, technische Gruppierungen, Hintergrund | `layer-surface-base` (Grund) | nur Abstand / feine Linie |

- **S1 [MUST]** Elevation wird über Border + Layer + Opazität gezeigt, nie über Blur,
  Schatten oder Helligkeitssprung. (DNA6)
- **S2 [SHOULD]** Pro View eine klare Surface-Hierarchie: ein Elevated-Fokus, darum
  Contained-Module, dahinter Subtle-Kontext.

---

## 3. Layer-System

Ein Layer = **Stapelreihenfolge (z-Index) + Rolle + erlaubte Bewegung**. Die `layer/*`-Tokens
sind z-Index-Werte einer stations-lokalen Skala (0–500), **keine Farben**.

| Layer | Rolle | z | Fläche | Inhalt (Beispiele) | Bewegung |
|-------|-------|---|--------|--------------------|----------|
| **LAYER/0** | Grundfläche | 0 | `layer-surface-base` | Schwarz | unbewegt |
| **LAYER/100** | Objektebene | 100 | transparent | Video, Dither-Bild | Ambient (nur hier), linear |
| **LAYER/200** | Information | 200 | Base + Border | Typografie, Inhalt | `duration/3–4` |
| **LAYER/300** | Struktur | 300 | Base + Border | Navigation, Timeline | `duration/3`, Timeline separat |
| **LAYER/400** | Overlay | 400 | `layer-surface-raised` + Border | Detailpanel, Explosionszeichnung, interaktive Module | `duration/4`, nur **eine** gleichzeitig |
| **LAYER/500** | System | 500 | `layer-surface-raised` + Border | Attract-Mode, Reset-Hinweis, Fehler | `duration/2`, darf ungefragt erscheinen |

- **L1 [MUST]** Ebenen-Trennung über **Border + 40 % Dim** (`dimmed-opacity`) + Motion —
  nie über Blur. Beim Öffnen wird der Hintergrund gedimmt, nicht weichgezeichnet. (DNA6)
- **L2 [MUST]** **Vertiefung** öffnet i. d. R. ein LAYER/400-Overlay und ist **blau**
  markiert (C3). Inhalt dort meist Line-Art/Explosionszeichnung (SHAPE §3).
- **L3 [MUST]** Bridge zur App-z-Skala nur bei Einbettung: LAYER/400 ≈ `z/modal` (1400),
  LAYER/500 ≈ `z/toast` (1500).

---

## 4. Motion

Basis-Dauer 80 ms. Vollständig — keine weiteren Kurven. Bewegung ist mechanisch (DNA8).

### Prinzipien
- **M1 [MUST]** Keine Animation ohne Zustandsänderung, kein Auto-Play ohne Anlass. (DNA7)
- **M2 [MUST]** Mechanisch: kein Overshoot, kein Bounce; nur die vier EASE-Tokens. (DNA8)
- **M3 [MUST]** Ambient und Reaktiv sind getrennt: Ambient ≥ 45 s linear, Reaktiv ≤ 640 ms.
  Dazwischen liegt nichts.
- **M4 [MUST]** Ein Fokus pro Zeitpunkt: max. **1** aktive Transition auf LAYER/200+.
- **M5 [MUST]** Tiefe nur über Opazität — kein Blur, kein Schatten, kein `scale > 1.0`. (DNA6)
- **M6 [MUST]** `prefers-reduced-motion` → alles auf `duration/1`, Ambient stoppt. (A5)

### Dauer
| Token | Wert | Einsatz |
|-------|------|---------|
| `duration/1` | 80 ms | Micro-Feedback (Press, Hover, Toggle) |
| `duration/2` | 160 ms | State-Wechsel kleiner Elemente |
| `duration/3` | 240 ms | Standard-Transition (Panels, Karten) |
| `duration/4` | 400 ms | Ebenenwechsel, Overlay öffnen |
| `duration/5` | 640 ms | Timeline-Sprung, große Layer |
| `duration/6` | 1200 ms | erzählerische Einblendung |
| `duration/ambient` | 45 s | Objekt-Loop (z. B. Enigma-Rotation 360°) |

### Easing
| Token | Kurve | Einsatz |
|-------|-------|---------|
| `ease/standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default, präzises Ausklingen |
| `ease/entrance` | `cubic-bezier(0, 0, 0, 1)` | Element kommt herein |
| `ease/exit` | `cubic-bezier(0.4, 0, 1, 1)` | Element verlässt die Bühne |
| `ease/mechanical` | `linear` | Rotation, Rotoren, Scrubbing |

### Regelwerte
`stagger` 40 ms · `dimmed-opacity` 0.4 · `rotation-ambient` 8 deg/s · `friction` 0.94.

> Rotation ist keine Transition, sondern kontinuierlich → immer `linear`. Trägheit ist
> Physik ohne Zielwert → über Reibung, nicht über Kurve. Ein Objekt, das nach einer Geste
> abrupt stoppt, wird als Absturz gelesen — es rollt aus und kehrt in den Ambient-Loop zurück.

### Animation States
Jede interaktive Komponente durchläuft dieselben neun Zustände:

| State | Dauer | Easing | Sound | Anmerkung |
|-------|-------|--------|-------|-----------|
| default | – | – | – | Grundzustand |
| attract | 2400 ms Loop | standard | – | nach 60 s Inaktivität, lockt an |
| hover | `duration/1` | standard | – | nur Pointer, entfällt bei Touch |
| pressed | `duration/1` | standard | `sound/tap` | sofort |
| focus | ohne | – | – | immer sichtbar (A3) |
| selected | `duration/2` | standard | `sound/confirm` | Akzent Orange |
| loading | ambient | mechanical | – | endlos, kein Fortschrittsversprechen |
| disabled | `duration/2` | standard | – | 40 % Opazität (`dimmed-opacity`) |
| error | `duration/2` | standard | `sound/error` | immer zusätzlich visuell (C5) |

---

## 5. Typografie

Schriften aus Tokens: **Switzer** (Body), **Panchang** / **Baton Turbo** (Display),
**DM Mono** (Mono/Labels). Skala responsiv (Desktop/Tablet/Phone) über die Typography-Tokens.

Die Fonts sind **self-hosted** in `00_design-system/fonts/` (woff2) und werden über
`tokens.css` (`@import fonts.css`) eingebunden — kein CDN, wichtig für Offline-Kioske.
Switzer/Panchang sind Variable Fonts, DM Mono statisch. **Baton Turbo** ist aktuell nur im
Token referenziert, aber noch nicht als Font hinterlegt (nicht als Display-Font einsetzen,
solange keine Datei vorliegt). Details: [tokens/README](../00_design-system/tokens/README.md).

| Rolle | Token | Desktop |
|-------|-------|---------|
| Display | `font-size/display` | 96 |
| Headline 1 | `font-size/h1` | 64 |
| Headline 2 | `font-size/h2` | 48 |
| Headline 3 | `font-size/h3` | 32 |
| Headline 4 | `font-size/h4` | 26 |
| Headline 5 | `font-size/h5` | 22 |
| Body L / M / S | `font-size/body-l|m|s` | 24 / 20 / 15 |
| Label | `font-size/label` | 19 |
| Caption L / M / S | `font-size/caption-l|m|s` | 24 / 15 / 12 |

- **T1 [MUST]** Headlines sind versal, schwer, kondensiert (Display-Font). Mono (`DM Mono`)
  trägt Labels, Codes, Metadaten (Stations-Tag, „ANZEIGE DES…", Walzen-Werte). (SHAPE SH13)
- **T2 [MUST NOT]** Keine Fremd-Fonts. Die Google-Fonts im Motion-Artefakt (Archivo/Inter/
  JetBrains Mono) sind **Demo-Platzhalter** und werden durch die Token-Fonts ersetzt.

---

## 6. Grid & Spacing

- **G1 [MUST]** Grid: **24 Spalten** auf Tablet & Desktop, **12 Spalten** auf Phone.
  · 24 Spalten geben größeren Screens Flexibilität.
- **G2 [MUST]** Spacing folgt der 4-px-Basis: `space/1`=4 … `space/9`=96. Abstände,
  Paddings, Gutters ausschließlich aus dieser Skala.
- **G3 [SHOULD]** Layout atmet — Reduktion heißt auch großzügiger Negativraum auf Schwarz.
- Breakpoints: `viewport/phone` 375 · `viewport/tablet` 768 · `viewport/desktop` 1440.

---

## 7. Icons

- **I1 [MUST]** Ausschließlich **Outline-Icons aus Tabler.io**; einheitlich dünne Linie;
  Größen `size/icon/sm|md|lg` (16/20/24). Details & Verbote: [SHAPE §4](SHAPE_SYSTEM.md).

---

## 8. Bildsprache

- **B1 [MUST]** Objektbilder = monochromer **Dither**, treten hinter Information zurück.
- **B2 [MUST]** Funktion/Aufbau = **Line-Art / Explosionszeichnung**, feine Linien auf Schwarz.
- Regeln, Verbote und Anwendungsstufen: [SHAPE §2–3](SHAPE_SYSTEM.md). Bezug: DNA9/DNA10.

---

## 9. Interaktions-Elemente

Zwei Familien × drei Stufen. Bedeutung folgt der Farb-Semantik (§1).

| Familie | primary | secondary | tertiary |
|---------|---------|-----------|----------|
| **Action** | Orange, gefüllt/prominent — die eine zentrale Handlung | Orange-Kontur / dezenter | Text-Only, minimal |
| **Navigation** | aktuelle/aktive Navigation Orange markiert | neutrale Navigationsstruktur | dezente/tertiäre Sprünge |

- **IX1 [MUST]** Genau **eine** Action-primary (Orange-CTA) pro View. (DNA11, M4)
- **IX2 [MUST]** Aktive/ausgewählte Elemente tragen Orange (`state/accent` + ggf.
  `state/selected-surface`); passive Struktur bleibt neutral.
- **IX3 [MUST]** Vertiefungs-Affordanzen sind **blau** (C3) und führen in LAYER/400 (L2).
- **IX4 [MUST]** Touch-Target ≥ `size/touch/min` (44px). (A1)

---

## 10. Sound

Grundzustand = **Stille**. Square-Wave, High-Pass ab 500 Hz (kein Bass), jeder Cue < 300 ms,
immer mit sichtbarer Entsprechung (A6). Ambient-Soundscape siehe [SITE_VISIT §Sound](../02_research/SITE_VISIT.md).

| Token | Anlass | Frequenz | Länge | Pegel |
|-------|--------|----------|-------|-------|
| `sound/tap` | Berührung | 2200 Hz | 35 ms | −24 dBFS |
| `sound/confirm` | Auswahl bestätigt | 1800 Hz | 60 ms | −20 dBFS |
| `sound/open` | Overlay öffnet | 1400 Hz | 90 ms | −20 dBFS |
| `sound/close` | Overlay schließt | 900 Hz | 70 ms | −22 dBFS |
| `sound/timeline-snap` | Playhead rastet ein | 3000 Hz | 30 ms | −20 dBFS |
| `sound/error` | Fehlerfall | 700 Hz | 120 ms | −18 dBFS |

---

## 11. Token-Referenz

- Quelle: `00_design-system/tokens/tokens.json` + `tokens.css`.
- Relevante Collections: `Primitives`, `Semantic`, `Typography`, `Motion`, `Sound`,
  `Immersive`.
- Neu ggü. Figma-Export: Primitive `neutral/850` (#0A0A0A) + Collections `Motion`, `Sound`,
  `Immersive` (authored, Farben als Alias auf die Primitives).
- Diese sind auch als **Figma-Variablen** in der Datei angelegt (Code-Syntax `var(--…)`).
