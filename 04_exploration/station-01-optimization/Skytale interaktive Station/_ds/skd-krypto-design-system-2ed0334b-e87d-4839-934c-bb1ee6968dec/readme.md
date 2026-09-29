# SKD Krypto — Design System

A design system for an **exhibition about cryptography and digital currencies** — working
title "Krypto". The material is German-language museum work: interactive touch stations,
projections, room graphics, posters and signage, plus an internal design-briefing deck that
documents the rules. The station recreated in this system is **Station 4 · Kryptografie**,
whose centrepiece is an interactive Enigma module.

The system has two distinct layers, and they look nothing alike on purpose:

1. **The immersive / exhibition layer** — black ground, Panchang extrabold uppercase display
   type, DM Mono technical labels, square corners, orange = action, blue = knowledge. This is
   what visitors touch. It is the dominant layer, and the one you should reach for by default.
2. **The core / light UI layer** — the `Core/*` component set drawn in the file: white surfaces,
   Inter, 8px radii, 44px controls. Screen-and-web furniture (admin views, forms, web pages).

## Sources given to me

* **Figma file:** `SKD Krypto __ Design.fig`, mounted read-only. No share URL was provided —
  if you have the file, the relevant pages are `Design-Principles` (15 frames), `Foundations`,
  and `Components`. Nodes referenced below use Figma node ids from that file.
  * `Design-Principles / Design-Briefing` (node `480:1069`) — the full briefing: motion
    principles, timing, raster, spacing, Bildsprache, icon system, animation states, layer
    system, depth & elevation, colour semantics, functional interaction elements, typography.
  * `Design-Principles / Enigma` (node `608:3734`) and `Enigma-Module` — the station screens.
  * `Foundations / Foundations` (node `293:415`) — colour scales, semantic colours, WCAG
    contrast table, font families, type scale, spacing scale.
  * `Components` — the five `Core/*` component sets with their variant axes.
  * Figma Variables: 178 across 6 collections (Primitives, Semantic, Typography, Motion,
    Immersive, Sound) — all 178 imported.
* Two external artifact links appear in the briefing boards (`claude.ai/public/artifacts/eddb…`)
  for *Animation States* and *Layer System*. I could not open them; if they contain the built
  motion prototypes, they are the missing piece of the motion documentation.
* No codebase, no slide deck, no font binaries were supplied.

## Index

| Path | What |
| --- | --- |
| `styles.css` | Global entry point — `@import`s only. Link this one file. |
| `tokens/fig-tokens.css` | All 178 Figma Variables, incl. dark theme and tablet/phone type modes. |
| `tokens/fonts.css` | Font stacks + the substitution note (see below). |
| `tokens/scale.css` | Unit-resolved aliases (`--space-5-px`, `--type-h1`, `--duration-3`, `--ease-standard`, …). |
| `tokens/immersive.css` | Exhibition surface, Vertiefung and keycap recipes. |
| `tokens/base.css` | Element defaults + `.krypto-display / -body-* / -mono` type roles. |
| `components/exhibition/` | The exhibition layer primitives. |
| `components/core/` | The five `Core/*` families. |
| `ui_kits/exhibition_station/` | Click-through recreation of Station 4 (1920×1080). |
| `slides/` | Three briefing-board layouts, 1920×1080. |
| `guidelines/cards/` | 25 foundation specimen cards (Design System tab). |
| `assets/` | Dither imagery, exploded technical illustration, SKD logo files, key-visual poster. |
| `SKILL.md` | Agent-skill wrapper for use outside this project. |

### Components

**Exhibition** — `StationTag`, `ScreenHeader`, `ExhibitButton`, `IconButton`, `RotorDisplay`,
`IOField`, `EnigmaKey`, `DeepDiveCard`, `Surface`, `Icon`.

**Core** — `CoreButton`, `CoreAlert`, `CoreCard`, `CoreFormField`, `CoreLink` (the five `Core/*`
Figma component sets).

Every component has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when + usage).

#### Intentional additions

Nine components are intentional additions — `DeepDiveCard`, `EnigmaKey`, `ExhibitButton`,
`IOField`, `IconButton`, `RotorDisplay`, `ScreenHeader`, `StationTag`, `Surface`, plus `Icon`.
None of them is a Figma component set; each is a repeated, named element of the in-scope
`Design-Principles` frames, promoted to a component with its values transcribed verbatim.
Renaming them to the `Core/*` vocabulary would misrepresent what they are.

The .fig defines five formal component sets (`Core/Alert`, `Core/Button`, `Core/Card`,
`Core/Form Field`, `Core/Link`). Those ship here under their kit names — `CoreAlert`,
`CoreButton`, `CoreCard`, `CoreFormField`, `CoreLink`.

Provenance of each addition:

* `ExhibitButton`, `IconButton` — the "Interaktions-elemente / Funktional" board (Action and
  Navigation levels, 56px icon target) plus the station CTAs.
* `StationTag`, `ScreenHeader` — the standing header of every station screen and briefing board.
* `RotorDisplay`, `IOField`, `EnigmaKey` — the Enigma module (Walze read-out, Ausgabe/Eingabe
  fields, 64px keycaps).
* `DeepDiveCard` — the blue "Vertiefung" panel.
* `Surface` — the 01 Elevated / 02 Contained / 03 Subtle hierarchy from the depth & elevation
  board.
* `Icon` — a thin wrapper over the Tabler webfont. The file names Tabler as the only permitted
  icon source but contains no icon component; the wrapper exists so nobody hand-draws a glyph.

`timeline-marker` is the one source symbol not built — it lives on the out-of-scope `Timeline`
page.

## Content fundamentals

**Language is German.** All visitor-facing copy, all labels, all component text. Keep it German
unless you are told otherwise; English appears only in the `Core/*` demo strings that the file
itself shipped in English ("Card title", "you@example.com").

* **Address:** impersonal and factual for exposition ("Die Enigma erzeugte mehr
  Einstellungsmöglichkeiten…"). Direct *du* only where the visitor is asked to act
  ("Probiere es aus: Tippe das Ergebnis nach einem Reset erneut ein."). Never *Sie*, never *wir*
  in visitor copy.
* **Casing:** display headlines are set uppercase via CSS (`DIE ENIGMA`), but the *source text*
  is written in normal sentence case — don't type in caps. Mono labels are uppercase with 0.1em
  tracking (`MASCHINEN VERSCHLÜSSELN`, `AUSGABE`, `VERTIEFUNG`, `SHA-256`).
* **Register:** technical and precise, and unafraid of the hard part. The Enigma text names the
  war it was part of: "Im Zweiten Weltkrieg war die Enigma Teil der Infrastruktur eines
  menschenverachtenden Krieges, der Abermillionen Opfer forderte. Kryptografie ist nie nur
  Technik, sie ist in politische und militärische Machtverhältnisse eingebunden." Historical
  responsibility is part of the voice, not a disclaimer bolted on.
* **Rhythm:** short mono kicker, then a two-to-five-word display headline, then one 3–5 sentence
  explanatory paragraph, then optional two-column depth. Principles are written as imperative
  couplets: "Reduktion statt Reproduktion. Präzision statt Dekoration." / "Motion erklärt, sie
  dekoriert nicht."
* **Numbers stay concrete:** "über 150 Trillionen", "ab 1940", "256 Bit". Named people are named
  (Arthur Scherbius, Marian Rejewski, Alan Turing, Gordon Welchman).
* **No emoji. Ever.** No exclamation marks. No marketing adjectives ("revolutionär",
  "faszinierend"). No futuristic clichés — the briefing rejects them explicitly.
* **Deep-dive copy is phrased as a question:** "Warum verschlüsselt und entschlüsselt dieselbe
  Maschine?" The overlay answers it and ends with an instruction to try it.

## Visual foundations

**Ground.** The exhibition layer is `#000000`, edge to edge, always. Light surfaces belong only
to the `Core/*` layer. Max two background values per screen.

**Colour semantics** (verbatim from the *Farben & Semantik* board):

| Colour | Role | Used for |
| --- | --- | --- |
| Black / grey / white | Neutral — carries the exhibition | Text, lines, technical drawings, icons, neutral controls, passive elements |
| Blue `#0040FF` | Information | Vertiefung, context, extra knowledge |
| Orange `#ED8003` | Action | CTAs, input, active selection, navigation, interactive control, active states |
| Grey / white | System | Technical states, feedback, controls |

"Neutral trägt die Ausstellung. Farbe trägt Bedeutung." Colour is never decoration; the dither
imagery is never tinted orange or blue for looks. Note one inconsistency in the source: the
*Funktional* board fills "Action - primary" blue and "Navigation - primary" orange, while the
station screen's forward CTA ("Enigma ausprobieren") is orange with a **black** label. The kit
follows the station screen.

**Type.** Three roles, no more.
* *Display* — Panchang Extrabold, uppercase, 100% line-height, 96 / 64 / 48 / 32 px.
* *Body* — Switzer Regular, 1.5 line-height, 24 / 20 / 16 / 15 px. Editorial statements at 26px
  with 1.35 line-height.
* *Technical* — DM Mono Medium, uppercase, 0.1em tracking, 19 / 15 / 13 / 12 px. Every label,
  tag, value, button and status.
Baton Turbo appears in the Foundations board as the "Body" specimen and is kept as a token
(`--font-body-alt`); Switzer is what the screens actually use. Inter is the `Core/*` UI face.

**Spacing & layout.** 4px base: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Screen margin is a
flat **40px** on 1920×1080 (not a token multiple — that is the design). 24-column raster on
desktop and tablet (16px gutters, 40/64px padding), 12 columns on phone (8px gutters). Header
block always sits at 40/40. Content columns are 680–912px wide for readable measure.

**Corners.** `radius/none` everywhere in the exhibition layer — buttons, tags, panels, fields,
rotor wells are all hard-cornered. The single exception is the 64px round `EnigmaKey`
(`border-radius: 100px`), because it is a typewriter key. `Core/*` uses 4 / 8 / 12.

**Borders & hairlines.** Depth is drawn, not blurred: 1px inset hairlines in `neutral-700`
(`#41454F`) around rotor displays and value wells, 1px `primary-200` around I/O fields, 1px
white rules under board section labels, 0.707px white rules on raster diagrams. Vertical 1px
lines are used as a navigation/structure device ("Orientierung durch Linien").

**Shadows.** Effectively none in the exhibition layer — "Kein Blur, kein Schatten, kein
Scale > 1.0. Tiefe nur über Opazität." The one sanctioned glow is the Vertiefung panel:
`inset 0 0 0 1px #0040FF, 0 4px 60px rgba(0,64,255,.32)` on `#0A132E`. In `Core/*` there are
exactly two shadows: `0 1px 3px rgba(0,0,0,.08)` (static card) and `0 4px 12px rgba(0,0,0,.12)`
(interactive card).

**Surfaces / elevation.** Three hierarchies: **01 Elevated** `#1A1C23` (focused content, central
interaction, important overlays), **02 Contained** `#0B0B0F` (cards, modules, controls, UI
planes), **03 Subtle** `#000000` (secondary info, passive areas, technical groupings). Six
z-layers: 0 ground · 100 object (video, dither, ambient) · 200 information (type) · 300 structure
(navigation, timeline) · 400 overlay (detail panel, exploded drawing) · 500 system (attract mode,
reset hint, errors).

**Transparency & blur.** Dither imagery sits at 0.34–0.6 opacity behind a black-to-transparent
linear gradient (~96°) so type stays legible — a *protection gradient*, never a blur, never a
frosted capsule. `--motion-dimmed-opacity: 0.4` dims inactive elements.

**Imagery.** Two styles only. (1) *Dither / raster*: objects reduced to monochrome and abstracted
by dithering, echoing the key visual; the motif deliberately recedes behind information and
interaction. (2) *Technical illustration / line art*: exploded views and function diagrams in
fine precise lines on black. Colour vibe: pure black-and-white, high contrast, no warmth, no
grain filter, no photography-as-hero. "Reduktion statt Reproduktion."

**Motion.** Six durations (80 / 160 / 240 / 400 / 640 / 1200 ms) plus ambient 45s. Four easings
and no others: standard `cubic-bezier(.2,0,0,1)`, entrance `cubic-bezier(0,0,0,1)`, exit
`cubic-bezier(.4,0,1,1)`, mechanical `linear` (rotors, scrubbing). Rules: no animation without a
state change; no auto-play without a reason; mechanical, never organic — no overshoot, no bounce;
ambient (≥45s, linear) and reactive (≤640ms) never meet in between; max one active transition at
LAYER/200 or above; motion is never the only carrier — `prefers-reduced-motion` collapses
everything to 80ms and stops ambient.

**States.** Hover is a colour swap, not an opacity fade (orange → `primary-800`, blue →
`secondary-700`); on touch stations hover is largely academic. Press is a *fill* change — the
pressed `EnigmaKey` goes `primary-50` → `primary-500` in 80ms, with no scale (scale > 1.0 is
forbidden). Disabled is `opacity: .5` (`Core/*`) or `neutral-800`/`neutral-600` (idle keys).
Focus is a 2px ring in the element's own accent, plus a 4px radius on links so the ring has a
shape.

**Accessibility.** The Foundations board ships a WCAG 2.2 AA contrast table (light / dark):
body 19.93 : 1 / 21.00 : 1, secondary text 6.29 / 8.59, button label on primary 4.72 / 9.30,
control border vs surface 3.84 / 3.64, focus ring 4.72 / 6.19. Minimum touch target 44px
(`--size-touch-min`); station controls are 56–90px.

**Sound.** The system tokenises UI sound — six events (tap, confirm, open, close, error,
timeline-snap) with frequency, length, gain and level. E.g. tap = 2200 Hz, 35 ms, −24 dB.
No audio assets were in the file; the tokens are the spec.

## Iconography

* **Tabler icons, outline, thin uniform stroke, and nothing else.** The briefing states it
  plainly: "Minimalistische Outline-Icons mit einheitlich dünner Linienstärke… Wir verwenden nur
  Icons aus der Quelle (Tabler.io)". Source noted on the board as `https://tabler.io/icons`.
* The .fig contains flattened per-path vectors of the used icons rather than an icon component,
  so this system links the **Tabler webfont from CDN** and wraps it in `<Icon name="…" />`:
  `https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css`.
  This is a same-source link, not a substitution.
* Icons named in the file: `bulb` (Vertiefung trigger), `x` (close), `arrow-right`,
  `topology-full`, `load-balancer`, `brand-apple-arcade`.
* Sizes come from tokens: 16 / 20 / 24, and 40px inside the 80px system button.
* Icons are always white on the exhibition layer, or the accent colour inside a filled button.
* **No emoji, no unicode glyphs as icons, no icon fonts other than Tabler, no hand-drawn SVG.**

## Brand marks

The file contains **no product/exhibition logo**. The exhibition wordmark is set in type
(Panchang extrabold, uppercase) — that is the mark. The only real logo present is the
**institutional SKD logo** as placed on the poster artwork (`Design-Principles / Frame-79`,
layer `SKD_Logo_unten_S_Weiss_sRGB`), copied verbatim into `assets/logo/` as
`skd-logo-mark.png` + `skd-logo-wordmark.svg`. Nothing was redrawn or reconstructed.
If an exhibition logo exists, it is outside the frames I was given — please supply it.

## Fonts & substitutions

No font binaries ship in the .fig, so three of the five families have **no `@font-face`** and
currently render from the platform sans fallback:

| Source family | Role | Status |
| --- | --- | --- |
| Panchang Extrabold | Display | ⚠ missing — falls back to `system-ui` |
| Switzer | Body | ⚠ missing — falls back to `system-ui` |
| Baton Turbo | Alternate body | ⚠ missing — falls back to `system-ui` |
| DM Mono Medium | Technical labels | ✅ loaded (Google Fonts) |
| Inter | `Core/*` UI | ✅ loaded (Google Fonts) |

No substitute family has been swapped in — the tokens keep naming the real families
(`--font-display: "Panchang", system-ui, …`), so dropping the licensed web files into the
project and adding `@font-face` rules to `tokens/fonts.css` fixes every screen at once.
**Please send the Panchang, Switzer and Baton Turbo web files** (ITF licences) — until then the
display type, which does most of the brand's work, renders in the wrong voice.

## Caveats

* `ExhibitButton` **secondary / tertiary** treatments are inferred. The *Funktional* board labels
  three levels for both Action and Navigation, but the extraction collapsed all three onto the
  primary fill, so secondary = 1px outline and tertiary = label-only, following the `Core/Button`
  secondary pattern. Please confirm or correct.
* `Core/Alert` success / warning tones follow the info/error pattern with their own semantic
  token pairs; only Info and Error variants were readable in the extraction.
* The Enigma cipher in the UI kit is a reciprocal demo, not a historically accurate machine.
* The `timeline-marker` symbol (27 instances) lives on the out-of-scope `Timeline` page and is
  **not** built. Same for the `Key-Visual` (191 frames), `BTC`, `Pitchdeck` and `Archiv` pages —
  say the word and I'll extend the system to cover them.
* Sound tokens have no audio files behind them.
