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
