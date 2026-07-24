# SKD Krypto Tokens

This folder contains the shared base tokens for the SKD Krypto design system.

## Files

- `tokens.json` is the canonical source for tools, AIs, and future build scripts. It preserves Figma collections, modes, scopes, raw values, and semantic aliases.
- `tokens.css` is the direct CSS Custom Properties output for prototypes and frontend work.

## Source

- Figma file: `xdc82fp188ssSV45Y7LKhz`
- Figma node: `383:408`
- Last export: `2026-07-23T13:47:50.642Z`

## Usage

Import `tokens.css` once near the root of an app or prototype.

```css
@import "./00_design-system/tokens/tokens.css";
```

The default theme is light. Use `[data-theme="dark"]` on a parent element to activate dark semantic colors.

Primitive tokens should stay stable. Semantic tokens should be preferred in UI code because they describe intent.

## Hard rules

- **No rounded corners.** All `radius/*` tokens (`--radius-none|sm|md|lg|full`) are pinned to `0` on every level — no exceptions.
- **DM Mono is uppercase-only.** Any text/font style using `font-family/DM Mono` (`--font-family-dm-mono`) must also apply `text-transform: uppercase` (`--text-transform-dm-mono`). This family is never set lowercase or mixed-case.

## Fonts

Self-hosted webfonts liegen in `../fonts/`. `tokens.css` bindet sie automatisch ein
(`@import "../fonts/fonts.css";`), daher genügt weiterhin ein Import von `tokens.css`.
Die `@font-face`-Family-Namen entsprechen exakt den `--font-family-*` Tokens.

- **Switzer** (Body) — `switzer/Switzer-Variable.woff2` (+ Italic), variable wght 100–900
- **Panchang** (Display) — `panchang/Panchang-Variable.woff2`, variable wght 200–800
- **DM Mono** (Mono/Labels) — `dm-mono/DMMono-*.woff2`, statisch 300/400/500 (+ Italics),
  verlustfrei aus TTF konvertiert
- **Baton Turbo** — im Token referenziert, aber (noch) **nicht** als Font hinterlegt

Voraussetzung: Die relative Ordnerstruktur `00_design-system/{fonts,tokens}/` bleibt erhalten,
damit der `@import`-Pfad auflöst. Für die Figma-Datei müssen die Fonts zusätzlich lokal
installiert sein (Figma nutzt System-Fonts, nicht das Repo).
