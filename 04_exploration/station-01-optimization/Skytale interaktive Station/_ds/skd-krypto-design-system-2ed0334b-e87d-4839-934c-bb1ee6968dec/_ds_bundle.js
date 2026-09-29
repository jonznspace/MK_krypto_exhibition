/* @ds-bundle: {"format":4,"namespace":"SKDKryptoDesignSystem_2ed033","components":[{"name":"CoreAlert","sourcePath":"components/core/CoreAlert.jsx"},{"name":"CoreButton","sourcePath":"components/core/CoreButton.jsx"},{"name":"CoreCard","sourcePath":"components/core/CoreCard.jsx"},{"name":"CoreFormField","sourcePath":"components/core/CoreFormField.jsx"},{"name":"CoreLink","sourcePath":"components/core/CoreLink.jsx"},{"name":"DeepDiveCard","sourcePath":"components/exhibition/DeepDiveCard.jsx"},{"name":"EnigmaKey","sourcePath":"components/exhibition/EnigmaKey.jsx"},{"name":"ExhibitButton","sourcePath":"components/exhibition/ExhibitButton.jsx"},{"name":"IOField","sourcePath":"components/exhibition/IOField.jsx"},{"name":"Icon","sourcePath":"components/exhibition/Icon.jsx"},{"name":"IconButton","sourcePath":"components/exhibition/IconButton.jsx"},{"name":"RotorDisplay","sourcePath":"components/exhibition/RotorDisplay.jsx"},{"name":"ScreenHeader","sourcePath":"components/exhibition/ScreenHeader.jsx"},{"name":"StationTag","sourcePath":"components/exhibition/StationTag.jsx"},{"name":"Surface","sourcePath":"components/exhibition/Surface.jsx"}],"sourceHashes":{"components/core/CoreAlert.jsx":"8fc5e743c6ae","components/core/CoreButton.jsx":"d496d3d24ceb","components/core/CoreCard.jsx":"3f5d8e742db2","components/core/CoreFormField.jsx":"2e08ee80c0c6","components/core/CoreLink.jsx":"eda99aac1ad3","components/exhibition/DeepDiveCard.jsx":"56c206872ca4","components/exhibition/EnigmaKey.jsx":"504172b69fa2","components/exhibition/ExhibitButton.jsx":"19fa6fd640ce","components/exhibition/IOField.jsx":"a96b099ff563","components/exhibition/Icon.jsx":"32b7b9e4a5cf","components/exhibition/IconButton.jsx":"39da5b0f8c31","components/exhibition/RotorDisplay.jsx":"d622b7a711d3","components/exhibition/ScreenHeader.jsx":"8846e5cb22f1","components/exhibition/StationTag.jsx":"df3ccf34549a","components/exhibition/Surface.jsx":"199e78b4c7ed","ui_kits/exhibition_station/DeepDiveOverlay.jsx":"493fce02dc03","ui_kits/exhibition_station/EnigmaModule.jsx":"b24d536dea65","ui_kits/exhibition_station/StationIntro.jsx":"0674561357ec"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SKDKryptoDesignSystem_2ed033 = window.SKDKryptoDesignSystem_2ed033 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/CoreAlert.jsx
try { (() => {
/* Core/Alert — 4 tones. Colour is never the only carrier: always dot + text. */
function CoreAlert({
  tone = "info",
  children,
  style
}) {
  const map = {
    info: {
      bg: "var(--color-feedback-info-bg)",
      line: "var(--color-feedback-info)"
    },
    success: {
      bg: "var(--color-feedback-success-bg)",
      line: "var(--color-feedback-success)"
    },
    warning: {
      bg: "var(--color-feedback-warning-bg)",
      line: "var(--color-feedback-warning)"
    },
    error: {
      bg: "var(--color-feedback-error-bg)",
      line: "var(--color-feedback-error)"
    }
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 360,
      boxSizing: "border-box",
      borderRadius: "var(--radius-md-px)",
      background: map.bg,
      boxShadow: "inset 0 0 0 1px " + map.line,
      display: "flex",
      flexDirection: "row",
      gap: "var(--space-3-px)",
      alignItems: "center",
      padding: "var(--space-3-px) var(--space-4-px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: map.line,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: "var(--font-ui)",
      fontSize: 16,
      lineHeight: 1.25,
      color: "var(--color-text-primary)"
    }
  }, children));
}
Object.assign(__ds_scope, { CoreAlert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CoreAlert.jsx", error: String((e && e.message) || e) }); }

// components/core/CoreButton.jsx
try { (() => {
/* Core/Button — the light UI (screen/web) button set. 44px tall, 8px radius. */
function CoreButton({
  children = "Button",
  type = "primary",
  state = "default",
  onClick,
  style
}) {
  const skins = {
    primary: {
      background: "var(--color-primary-700)",
      color: "var(--color-neutral-0)",
      boxShadow: "none"
    },
    secondary: {
      background: "transparent",
      color: "var(--color-secondary-600)",
      boxShadow: "inset 0 0 0 1px var(--color-secondary-600)"
    }
  };
  const focusRing = type === "primary" ? "var(--color-primary-700)" : "var(--color-secondary-600)";
  const skin = skins[type];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: state === "disabled",
    style: {
      height: 44,
      minWidth: 140,
      padding: "0 var(--space-5-px)",
      border: 0,
      borderRadius: "var(--radius-md-px)",
      cursor: state === "disabled" ? "default" : "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2-px)",
      fontFamily: "var(--font-ui)",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "100%",
      opacity: state === "disabled" ? 0.5 : 1,
      transition: "background var(--duration-2) var(--ease-standard)",
      ...skin,
      boxShadow: state === "focus" ? [skin.boxShadow, "0 0 0 2px " + focusRing].filter(s => s !== "none").join(", ") : skin.boxShadow,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { CoreButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CoreButton.jsx", error: String((e && e.message) || e) }); }

// components/core/CoreCard.jsx
try { (() => {
/* Core/Card — static (hairline + soft shadow) or interactive (2px primary edge). */
function CoreCard({
  variant = "static",
  title = "Card title",
  children,
  onClick,
  style
}) {
  const skins = {
    static: "inset 0 0 0 1px var(--color-neutral-300), 0px 1px 3px 0px rgba(0,0,0,0.08)",
    interactive: "inset 0 0 0 2px var(--color-primary-700), 0px 4px 12px 0px rgba(0,0,0,0.12)"
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      minWidth: 280,
      boxSizing: "border-box",
      borderRadius: "var(--radius-lg-px)",
      background: "var(--color-bg-surface)",
      boxShadow: skins[variant],
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3-px)",
      padding: "var(--space-5-px)",
      cursor: variant === "interactive" ? "pointer" : "default",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "100%",
      color: "var(--color-text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 16,
      lineHeight: 1.4,
      color: "var(--color-text-secondary)"
    }
  }, children));
}
Object.assign(__ds_scope, { CoreCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CoreCard.jsx", error: String((e && e.message) || e) }); }

// components/core/CoreFormField.jsx
try { (() => {
/* Core/Form Field — label, 44px input, hint or error line. */
function CoreFormField({
  label = "E-mail address *",
  placeholder = "you@example.com",
  value,
  hint = "We'll never share your address.",
  error,
  state = "default",
  onChange,
  style
}) {
  const s = error ? "error" : state;
  const ring = {
    default: "inset 0 0 0 1px var(--color-neutral-500)",
    focus: "inset 0 0 0 2px var(--color-border-focus)",
    error: "inset 0 0 0 2px var(--color-feedback-error)"
  }[s];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 320,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2-px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "100%",
      color: "var(--color-text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      boxSizing: "border-box",
      overflow: "hidden",
      borderRadius: "var(--radius-md-px)",
      background: "var(--color-bg-surface)",
      boxShadow: ring,
      display: "flex",
      alignItems: "center",
      padding: "0 var(--space-3-px)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    style: {
      border: 0,
      outline: "none",
      background: "transparent",
      width: "100%",
      fontFamily: "var(--font-ui)",
      fontSize: 16,
      color: "var(--color-text-primary)"
    }
  })), s === "error" ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-1-px)",
      fontFamily: "var(--font-ui)",
      fontSize: 13,
      color: "var(--color-feedback-error)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: "var(--color-feedback-error)",
      flexShrink: 0
    }
  }), error || "Please enter a valid e-mail address") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 13,
      color: "var(--color-text-secondary)"
    }
  }, hint));
}
Object.assign(__ds_scope, { CoreFormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CoreFormField.jsx", error: String((e && e.message) || e) }); }

// components/core/CoreLink.jsx
try { (() => {
/* Core/Link — underlined, primary-700, 2px focus ring on a 4px radius. */
function CoreLink({
  children = "Link text",
  href = "#",
  state = "default",
  style
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: "inline-flex",
      padding: 2,
      borderRadius: "var(--radius-sm-px)",
      boxShadow: state === "focus" ? "0 0 0 2px var(--color-primary-700)" : "none",
      fontFamily: "var(--font-ui)",
      fontSize: 16,
      lineHeight: "100%",
      color: "var(--color-primary-700)",
      textDecoration: "underline",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { CoreLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CoreLink.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/EnigmaKey.jsx
try { (() => {
/* 64px round keycap. The only round element in the exhibition layer. */
function EnigmaKey({
  letter = "Q",
  state = "live",
  onClick,
  style
}) {
  const skins = {
    idle: {
      background: "var(--key-idle-bg)",
      color: "var(--key-idle-ink)"
    },
    live: {
      background: "var(--key-live-bg)",
      color: "var(--key-live-ink)"
    },
    active: {
      background: "var(--key-active-bg)",
      color: "var(--key-live-ink)"
    },
    lit: {
      background: "var(--key-lit-bg)",
      color: "var(--key-live-ink)"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: 64,
      height: 64,
      borderRadius: 100,
      border: 0,
      flexShrink: 0,
      cursor: state === "idle" ? "default" : "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-caption-l)",
      lineHeight: "100%",
      textAlign: "center",
      transition: "background var(--duration-1) var(--ease-standard), color var(--duration-1) var(--ease-standard)",
      ...skins[state],
      ...style
    }
  }, letter);
}
Object.assign(__ds_scope, { EnigmaKey });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/EnigmaKey.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/ExhibitButton.jsx
try { (() => {
/* Square 1:1-corner touch button for the exhibition layer.
   tone "action" = blue (#0040FF), tone "navigation" = orange (#ED8003).
   Label is always DM Mono 500 / 19px, uppercase, 0.1em tracking. */
function ExhibitButton({
  children,
  tone = "action",
  variant = "primary",
  onClick,
  disabled,
  style
}) {
  const accent = tone === "navigation" ? "var(--color-primary-600)" : "var(--color-secondary-600)";
  const onAccent = tone === "navigation" ? "var(--color-neutral-900)" : "var(--color-neutral-0)";
  const fills = {
    primary: {
      background: accent,
      color: onAccent,
      boxShadow: "none"
    },
    secondary: {
      background: "transparent",
      color: accent,
      boxShadow: "inset 0 0 0 1px " + accent
    },
    tertiary: {
      background: "transparent",
      color: accent,
      boxShadow: "none"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    style: {
      border: 0,
      borderRadius: 0,
      cursor: disabled ? "default" : "pointer",
      minHeight: 90,
      padding: "32px 48px 33px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2-px)",
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-label)",
      lineHeight: "100%",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      opacity: disabled ? 0.5 : 1,
      transition: "background var(--duration-2) var(--ease-standard), color var(--duration-2) var(--ease-standard)",
      ...fills[variant],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ExhibitButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/ExhibitButton.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/IOField.jsx
try { (() => {
/* Ausgabe / Eingabe read-out: primary-200 hairline, small mono caption, mono value. */
function IOField({
  label = "Ausgabe",
  value = "XLWS",
  width = 272,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      minHeight: 64,
      boxSizing: "border-box",
      boxShadow: "inset 0 0 0 1px var(--color-primary-200)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2-px)",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      padding: "var(--space-2-px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-caption-s)",
      lineHeight: "100%",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      color: "var(--color-primary-200)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-label)",
      lineHeight: "100%",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      color: "var(--immersive-ink)",
      minHeight: 19
    }
  }, value));
}
Object.assign(__ds_scope, { IOField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/IOField.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/Icon.jsx
try { (() => {
/* Tabler outline icons — the only icon source the design system allows.
   Load once per page:
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css"> */
function Icon({
  name,
  size = 24,
  color = "currentColor",
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    className: "ti ti-" + name,
    "aria-hidden": "true",
    style: {
      fontSize: size,
      lineHeight: 1,
      color,
      display: "inline-block",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/Icon.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/IconButton.jsx
try { (() => {
/* Square icon target. 56px blue = deep-dive trigger, 80px neutral = close/system. */
function IconButton({
  name = "bulb",
  size = 56,
  tone = "action",
  onClick,
  label,
  style
}) {
  const bg = tone === "neutral" ? "var(--color-neutral-800)" : "var(--color-secondary-600)";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": label || name,
    style: {
      width: size,
      height: size,
      border: 0,
      borderRadius: 0,
      cursor: "pointer",
      background: bg,
      color: "var(--color-neutral-0)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-5-px)",
      flexShrink: 0,
      transition: "background var(--duration-2) var(--ease-standard)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size >= 80 ? 40 : 24
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/DeepDiveCard.jsx
try { (() => {
/* "Vertiefung" — the blue deep-dive panel. The only glowing element in the system. */
function DeepDiveCard({
  label = "Vertiefung",
  question,
  icon = "bulb",
  onOpen,
  width = 448,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      minHeight: 163,
      boxSizing: "border-box",
      background: "var(--vertiefung-bg)",
      boxShadow: "inset 0 0 0 1px var(--vertiefung-border), var(--vertiefung-glow)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "var(--space-4-px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-body-s)",
      lineHeight: "100%",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      color: "var(--immersive-ink)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: "var(--space-7-px)",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: "var(--font-body)",
      fontSize: "var(--type-body-m)",
      lineHeight: "var(--leading-body)",
      color: "var(--immersive-ink)"
    }
  }, question), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: icon,
    size: 56,
    onClick: onOpen,
    label: label
  })));
}
Object.assign(__ds_scope, { DeepDiveCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/DeepDiveCard.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/RotorDisplay.jsx
try { (() => {
/* Walze (rotor) read-out: hairline frame, mono label, black value well. */
function RotorDisplay({
  label = "Walze I",
  value = "06",
  width = 147,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      minHeight: 176,
      boxSizing: "border-box",
      boxShadow: "inset 0 0 0 1px var(--immersive-hairline)",
      display: "flex",
      flexDirection: "column",
      gap: 9,
      padding: "var(--space-4-px)",
      alignItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: "stretch",
      textAlign: "center",
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-body-s)",
      lineHeight: "100%",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      color: "var(--immersive-ink)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "stretch",
      flex: 1,
      minHeight: 115,
      boxSizing: "border-box",
      background: "var(--color-neutral-900)",
      boxShadow: "inset 0 0 0 1px var(--immersive-hairline)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-2-px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-caption-l)",
      lineHeight: "100%",
      letterSpacing: "var(--tracking-mono)",
      textAlign: "center",
      color: "var(--immersive-ink)"
    }
  }, value)));
}
Object.assign(__ds_scope, { RotorDisplay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/RotorDisplay.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/ScreenHeader.jsx
try { (() => {
/* Eyebrow (mono, uppercase) + display headline (Panchang extrabold, uppercase).
   The standing header of every exhibition screen and briefing board. */
function ScreenHeader({
  eyebrow,
  title,
  size = "h1",
  style
}) {
  const px = {
    display: "var(--type-display)",
    h1: "var(--type-h1)",
    h2: "var(--type-h2)"
  }[size] || "var(--type-h1)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1-px)",
      alignItems: "flex-start",
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: "var(--type-body-s)",
      lineHeight: "100%",
      letterSpacing: "var(--tracking-mono)",
      textTransform: "uppercase",
      color: "var(--immersive-ink)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--font-display-weight)",
      fontStretch: "var(--font-display-stretch)",
      fontSize: px,
      lineHeight: "100%",
      textTransform: "uppercase",
      color: "var(--immersive-ink)"
    }
  }, title));
}
Object.assign(__ds_scope, { ScreenHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/ScreenHeader.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/StationTag.jsx
try { (() => {
/* Two-segment station tag from the exhibition station header.
   Orange segment = station number, dark-brown segment = topic. */
function StationTag({
  station = "Station 4",
  topic = "Kryptografie",
  style
}) {
  const seg = {
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2-px)",
    padding: "4px 12px",
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    fontSize: "var(--type-body-s)",
    lineHeight: "100%",
    letterSpacing: "var(--tracking-mono)",
    textTransform: "uppercase",
    color: "var(--color-neutral-0)",
    whiteSpace: "nowrap"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...seg,
      background: "var(--color-primary-600)"
    }
  }, station), topic ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...seg,
      background: "var(--color-primary-800)"
    }
  }, topic) : null);
}
Object.assign(__ds_scope, { StationTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/StationTag.jsx", error: String((e && e.message) || e) }); }

// components/exhibition/Surface.jsx
try { (() => {
/* The three exhibition surface hierarchies: 01 Elevated, 02 Contained, 03 Subtle. */
function Surface({
  level = "contained",
  hairline = true,
  children,
  style
}) {
  const bg = {
    elevated: "var(--immersive-surface-elevated)",
    contained: "var(--immersive-surface-contained)",
    subtle: "var(--immersive-surface-subtle)"
  }[level];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 0,
      boxSizing: "border-box",
      boxShadow: hairline ? "inset 0 0 0 1px var(--immersive-layer-border)" : "none",
      padding: "var(--space-4-px)",
      color: "var(--immersive-ink)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Surface });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exhibition/Surface.jsx", error: String((e && e.message) || e) }); }

// ui_kits/exhibition_station/DeepDiveOverlay.jsx
try { (() => {
const {
  IconButton
} = window.SKDKryptoDesignSystem_2ed033;

/* LAYER/400 overlay — the "Vertiefung" answer panel, right-hand column. */
function DeepDiveOverlay({
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 400
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.6)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      width: 640,
      height: 1080,
      background: "var(--immersive-surface-elevated)",
      boxShadow: "inset 1px 0 0 0 var(--immersive-layer-border)",
      padding: 40,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 40,
      animation: "krypto-enter var(--duration-4) var(--ease-entrance) both"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "x",
    size: 80,
    tone: "neutral",
    label: "Schlie\xDFen",
    onClick: onClose,
    style: {
      alignSelf: "flex-end"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: "var(--type-h4)",
      lineHeight: "1.35",
      color: "var(--immersive-ink)"
    }
  }, "Warum verschl\xFCsselt und entschl\xFCsselt dieselbe Maschine?"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/enigma-exploded-technical.png",
    alt: "Explosionszeichnung der Enigma",
    style: {
      width: "100%",
      filter: "invert(1) grayscale(1)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: "var(--type-h6)",
      color: "var(--immersive-ink)"
    }
  }, "Die Umkehrwalze"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--type-body-s)",
      lineHeight: "var(--leading-body)",
      color: "var(--immersive-body)"
    }
  }, "Am Ende des Stromwegs sitzt die Umkehrwalze. Sie schickt das Signal durch die Walzen zur\xFCck. Dadurch gilt: Wird aus A ein S, wird bei gleicher Stellung aus S wieder ein A. Sender und Empf\xE4nger brauchten nur dieselbe Grundeinstellung. Probiere es aus: Tippe das Ergebnis nach einem Reset erneut ein."))));
}
Object.assign(window, {
  DeepDiveOverlay
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/exhibition_station/DeepDiveOverlay.jsx", error: String((e && e.message) || e) }); }

// ui_kits/exhibition_station/EnigmaModule.jsx
try { (() => {
const {
  ScreenHeader,
  ExhibitButton,
  IconButton,
  RotorDisplay,
  IOField,
  EnigmaKey,
  DeepDiveCard
} = window.SKDKryptoDesignSystem_2ed033;
const ROWS = ["QWERTZUIO", "ASDFGHJK", "PYXCVBNML"];

/* A deliberately simple reciprocal cipher: enough to behave like the real
   machine (same setting encodes and decodes, letter never maps to itself,
   rotors step on every keypress) without being a real Enigma. */
function pairMap(offset) {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const map = {};
  for (let i = 0; i < 13; i++) {
    const a = A[(i + offset) % 26];
    const b = A[(25 - i + offset * 3) % 26];
    map[a] = b === a ? A[(A.indexOf(b) + 1) % 26] : b;
    map[map[a]] = a;
  }
  A.forEach(l => {
    if (!map[l]) map[l] = A[(A.indexOf(l) + 13) % 26];
  });
  return map;
}
function EnigmaModule({
  onClose,
  onDeepDive
}) {
  const [rotors, setRotors] = React.useState([6, 19, 3]);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [pressed, setPressed] = React.useState(null);
  const [lamp, setLamp] = React.useState(null);
  function press(letter) {
    const next = [...rotors];
    next[2] = (next[2] + 1) % 26;
    if (next[2] === 0) next[1] = (next[1] + 1) % 26;
    if (next[1] === 0 && next[2] === 0) next[0] = (next[0] + 1) % 26;
    const enc = pairMap(next[0] + next[1] + next[2])[letter] || letter;
    setRotors(next);
    setInput(s => (s + letter).slice(-14));
    setOutput(s => (s + enc).slice(-14));
    setPressed(letter);
    setLamp(enc);
    window.setTimeout(() => setPressed(null), 160);
  }
  function reset() {
    setRotors([6, 19, 3]);
    setInput("");
    setOutput("");
    setLamp(null);
    setPressed(null);
  }
  const pad = n => String(n).padStart(2, "0");
  const hair = {
    position: "absolute",
    width: 1,
    background: "var(--immersive-hairline)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--immersive-bg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      width: 900,
      height: 1080,
      opacity: 0.34,
      background: "url(../../assets/imagery/enigma-dither-detail.png) center / cover no-repeat"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(96deg, rgba(0,0,0,0.95) 52%, rgba(0,0,0,0.7) 71%, rgba(0,0,0,0.2) 100%)"
    }
  }), /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Maschinen verschl\xFCsseln",
    title: "Die Enigma",
    size: "h1",
    style: {
      position: "absolute",
      left: 40,
      top: 40
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    name: "x",
    size: 80,
    tone: "neutral",
    label: "Schlie\xDFen",
    onClick: onClose,
    style: {
      position: "absolute",
      left: 1800,
      top: 40
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "krypto-mono",
    style: {
      position: "absolute",
      left: 86,
      top: 275,
      width: 300,
      textAlign: "right",
      fontSize: "var(--type-body-s)",
      color: "var(--immersive-ink)"
    }
  }, "Walzen m\xFCssen korrekt eingesetzt und kalibriert werden"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...hair,
      left: 391,
      top: 256,
      height: 176
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 431,
      top: 256,
      display: "flex",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(RotorDisplay, {
    label: "Walze I",
    value: pad(rotors[0])
  }), /*#__PURE__*/React.createElement(RotorDisplay, {
    label: "Walze II",
    value: pad(rotors[1])
  }), /*#__PURE__*/React.createElement(RotorDisplay, {
    label: "Walze III",
    value: pad(rotors[2])
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...hair,
      left: 845,
      top: 256,
      height: 176
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "krypto-mono",
    style: {
      position: "absolute",
      left: 865,
      top: 275,
      width: 260,
      fontSize: "var(--type-body-s)",
      color: "var(--immersive-ink)"
    }
  }, "Bei jedem Tastendruck dreht die rechte Walze weiter"), /*#__PURE__*/React.createElement("span", {
    className: "krypto-mono",
    style: {
      position: "absolute",
      left: 86,
      top: 582,
      width: 173,
      textAlign: "right",
      fontSize: "var(--type-body-s)",
      color: "var(--immersive-ink)"
    }
  }, "Anzege des unverschl\xFCsselten Ergebnis"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...hair,
      left: 391,
      top: 500,
      height: 224
    }
  }), /*#__PURE__*/React.createElement(Keyboard, {
    top: 500,
    render: l => /*#__PURE__*/React.createElement(EnigmaKey, {
      key: l,
      letter: l,
      state: lamp === l ? "lit" : "idle"
    })
  }), /*#__PURE__*/React.createElement(IOField, {
    label: "Ausgabe",
    value: output || "—",
    style: {
      position: "absolute",
      left: 1067,
      top: 589
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "krypto-mono",
    style: {
      position: "absolute",
      left: 86,
      top: 846,
      width: 173,
      textAlign: "right",
      fontSize: "var(--type-body-s)",
      color: "var(--immersive-ink)"
    }
  }, "Eingabe der verschl\xFCsselten Buchstaben"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...hair,
      left: 391,
      top: 764,
      height: 224
    }
  }), /*#__PURE__*/React.createElement(Keyboard, {
    top: 764,
    render: l => /*#__PURE__*/React.createElement(EnigmaKey, {
      key: l,
      letter: l,
      state: pressed === l ? "active" : "live",
      onClick: () => press(l)
    })
  }), /*#__PURE__*/React.createElement(IOField, {
    label: "Eingabe",
    value: input || "AUTO",
    style: {
      position: "absolute",
      left: 1067,
      top: 825
    }
  }), /*#__PURE__*/React.createElement(ExhibitButton, {
    tone: "action",
    variant: "secondary",
    onClick: reset,
    style: {
      position: "absolute",
      left: 1067,
      top: 913,
      minHeight: 64,
      padding: "20px 24px",
      width: 272
    }
  }, "Zur\xFCcksetzen"), /*#__PURE__*/React.createElement(DeepDiveCard, {
    question: "Warum verschl\xFCsselt und entschl\xFCsselt dieselbe Maschine?",
    onOpen: onDeepDive,
    style: {
      position: "absolute",
      left: 1432,
      top: 825
    }
  }));
}
function Keyboard({
  top,
  render
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 323,
      top,
      width: 704,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      alignItems: "center"
    }
  }, ROWS.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center"
    }
  }, row.split("").map(render))));
}
Object.assign(window, {
  EnigmaModule,
  Keyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/exhibition_station/EnigmaModule.jsx", error: String((e && e.message) || e) }); }

// ui_kits/exhibition_station/StationIntro.jsx
try { (() => {
const {
  StationTag,
  ScreenHeader,
  ExhibitButton
} = window.SKDKryptoDesignSystem_2ed033;

/* enigma-1 — the station's opening screen. 1920×1080, LAYER/100 dither behind. */
function StationIntro({
  onStart
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--immersive-bg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 333,
      top: 30,
      width: 1739,
      height: 978,
      opacity: 0.6,
      background: "url(../../assets/imagery/enigma-dither-grey.png) center / cover no-repeat"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(96deg, rgba(0,0,0,1) 34%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.15) 100%)"
    }
  }), /*#__PURE__*/React.createElement(StationTag, {
    style: {
      position: "absolute",
      left: 40,
      top: 40
    }
  }), /*#__PURE__*/React.createElement(ScreenHeader, {
    eyebrow: "Maschinen verschl\xFCsseln",
    title: "Die Enigma",
    size: "display",
    style: {
      position: "absolute",
      left: 40,
      top: 245
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "absolute",
      left: 40,
      top: 420,
      width: 680,
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--type-body-l)",
      lineHeight: "var(--leading-body)",
      color: "var(--immersive-ink)"
    }
  }, "Mit dem kryptografischen Zirkel lie\xDFen sich einige Dutzend Verschl\xFCsselungen erzeugen. Die Enigma erzeugte mehr Einstellungsm\xF6glichkeiten, als es Sterne in unserer Galaxie gibt, bei der milit\xE4rischen Standardausf\xFChrung \xFCber 150 Trillionen. Sie ver\xE4ndert die Buchstabenzuordnung bei jedem einzelnen Tastendruck."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 40,
      top: 732,
      width: 912,
      display: "flex",
      flexDirection: "row",
      gap: 40,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      flex: 1,
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--type-body-m)",
      lineHeight: "var(--leading-body)",
      color: "var(--immersive-ink)"
    }
  }, "Entwickelt wurde sie Anfang des 20. Jahrhunderts vom deutschen Ingenieur Arthur Scherbius, urspr\xFCnglich als kommerzielles Produkt. Sp\xE4ter \xFCbernahm das Milit\xE4r die Technik. Im Zweiten Weltkrieg war die Enigma Teil der Infrastruktur eines menschenverachtenden Krieges, der Abermillionen Opfer forderte. Kryptografie ist nie nur Technik, sie ist in politische und milit\xE4rische Machtverh\xE4ltnisse eingebunden."), /*#__PURE__*/React.createElement("p", {
    style: {
      flex: 1,
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--type-body-m)",
      lineHeight: "var(--leading-body)",
      color: "var(--immersive-ink)"
    }
  }, "Schon in den 1930er Jahren analysierten polnische Mathematiker um Marian Rejewski ihre Funktionsweise. Auf dieser Grundlage bauten britische Kryptologen in Bletchley Park unter Alan Turing und Gordon Welchman elektromechanische Entschl\xFCsselungsmaschinen. Die Entzifferung mit der Turing-Welchman-Bombe ab 1940 gilt als Meilenstein der Kryptografiegeschichte.")), /*#__PURE__*/React.createElement(ExhibitButton, {
    tone: "navigation",
    onClick: onStart,
    style: {
      position: "absolute",
      left: 1533,
      top: 942,
      width: 347
    }
  }, "Enigma ausprobieren"));
}
Object.assign(window, {
  StationIntro
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/exhibition_station/StationIntro.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CoreAlert = __ds_scope.CoreAlert;

__ds_ns.CoreButton = __ds_scope.CoreButton;

__ds_ns.CoreCard = __ds_scope.CoreCard;

__ds_ns.CoreFormField = __ds_scope.CoreFormField;

__ds_ns.CoreLink = __ds_scope.CoreLink;

__ds_ns.DeepDiveCard = __ds_scope.DeepDiveCard;

__ds_ns.EnigmaKey = __ds_scope.EnigmaKey;

__ds_ns.ExhibitButton = __ds_scope.ExhibitButton;

__ds_ns.IOField = __ds_scope.IOField;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.RotorDisplay = __ds_scope.RotorDisplay;

__ds_ns.ScreenHeader = __ds_scope.ScreenHeader;

__ds_ns.StationTag = __ds_scope.StationTag;

__ds_ns.Surface = __ds_scope.Surface;

})();
