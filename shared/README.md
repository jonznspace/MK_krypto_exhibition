# Shared – stationsübergreifende Bausteine

Plain CSS + JS, kein Build-Schritt. Jede Station bindet die Dateien per
`<link>` / `<script>` ein. Werte kommen aus `00_design-system/tokens/tokens.css`,
die Tokens müssen also vorher geladen sein.

| Baustein | Dateien | Aufgabe |
| --- | --- | --- |
| Sprachumschalter | `css/station-language-switch.css`, `js/station-language-switch.js` | DE/EN-Schalter, setzt `data-language` auf `<html>` |
| Idle-Reload | `css/station-idle-reload.css`, `js/station-idle-reload.js` | Warnung + Neustart nach Inaktivität |
| **Off-Canvas** | `css/station-offcanvas.css`, `js/station-offcanvas.js` | Leseansicht „Weiterlesen“ von links |

---

## Off-Canvas (`station-offcanvas`)

Die Leseansicht aus Station 01 als globale Komponente. **Aufbau, Farben,
Typografie und Verhalten sind fest.** Pro Station ändert sich nur der Inhalt.

```
┌─ Panel (880 px, volle Höhe, --layer-surface-raised) ──┐
│ EYEBROW                                         [ × ] │  Header, bleibt stehen
│ Headline                                              │
├───────────────────────────────────────────────────────┤
│ Einführungstext (weiß)                              ▐ │  scrollt nativ,
│                                                     ▐ │  blauer Indikator rechts
│ Zwischenüberschrift                                   │
│ Absatz …                                              │
│ ┌ DAS WICHTIGSTE ───────────────────────────────────┐ │
│ │ Highlight-Box (Info-Blau)                         │ │
│ └───────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
      Rest des Screens: 80 % Schwarz, inaktiv
```

### Einbinden

1. **CSS** nach den Tokens, vor den eigenen Stations-Styles:

   ```html
   <link rel="stylesheet" href="../../shared/css/station-offcanvas.css" />
   ```

2. **Trigger-Button** dort platzieren, wo „Weiterlesen“ stehen soll. Beschriftung,
   `aria-haspopup` und `aria-controls` setzt die Komponente:

   ```html
   <button class="station-offcanvas-trigger" id="btnReadMore" type="button">Weiterlesen</button>
   ```

   Abstände zum umgebenden Layout (z. B. `margin-top`) legt die Station fest.

3. **Script** nach dem Sprachumschalter, vor dem Stations-Script:

   ```html
   <script src="../../shared/js/station-language-switch.js"></script>
   <script src="../../shared/js/station-offcanvas.js"></script>
   <script src="station-XX.js"></script>
   ```

4. **Im Stations-Script** anlegen:

   ```js
   StationOffcanvas.create({
     trigger: document.getElementById('btnReadMore'),
     content: {
       de: {
         title: 'Verschlüsseln & Versiegeln',
         lead: 'Einführungstext …',
         sections: [
           { title: 'Skytale', text: 'Absatz …' },
           { title: 'Caesar-Chiffre', text: ['Absatz 1 …', 'Absatz 2 …'] }
         ],
         highlight: { label: 'Das Wichtigste', text: 'Kernaussage …' }
       },
       en: { /* gleiche Struktur */ }
     }
   });
   ```

   Das Markup des Layers erzeugt die Komponente selbst. Im HTML steht nur der Button.

### Content-Felder

| Feld | Pflicht | Inhalt |
| --- | --- | --- |
| `title` | ja | Headline im Header (Switzer 600, `--font-size-h3`) |
| `lead` | nein | Einführungstext, weiß hervorgehoben. String oder Array von Absätzen |
| `sections` | nein | Liste aus `{ title, text }`. `text` ist String oder Array. Ohne `title` entstehen nur Absätze |
| `highlight` | nein | `{ label, text }` für die blaue Infobox am Ende |
| `eyebrow` | nein | Zeile über der Headline. Default: „Hintergrund“ / „Background“. `''` blendet sie aus |
| `labels` | nein | Überschreibt `{ open, close, region }`. Defaults: „Weiterlesen“ / „Schließen“ / „Vollständiger Einführungstext“ (EN analog) |

Ein einzelnes Objekt ohne `de`/`en` funktioniert auch. Dann gilt es für beide Sprachen.

### Verhalten (eingebaut)

- Öffnen per Trigger; Schließen per ×, Escape oder Tippen auf den abgedunkelten Bereich.
- Ein-/Ausfahrt `--duration-4` mit Entrance-/Exit-Easing, kein Bounce, kein Blur, kein Schatten.
- Der Screen darunter (`#scaler`, sonst `#frame`) ist währenddessen `inert`. Die Idle-Warnung liegt darüber.
- Der Fokus springt auf ×, bleibt im Dialog (Tab-Schleife) und kehrt beim Schließen zum Trigger zurück.
- Sprachwechsel über `data-language` rendert den Inhalt automatisch neu.

### API

`StationOffcanvas.create(options)` gibt `{ element, open(), close(), render(), setContent(content) }` zurück.

| Option | Default | Zweck |
| --- | --- | --- |
| `trigger` | – | Button (Element oder Selektor) |
| `content` | `{}` | siehe oben |
| `background` | `#scaler` → `#frame` | Element, das beim Lesen `inert` wird |
| `id` | `stationOffcanvas` | Id des Layers (bei mehreren Layern pro Station setzen) |

### Anpassen

- **Für alle Stationen:** `css/station-offcanvas.css` bzw. `js/station-offcanvas.js` ändern.
  Schriftgrößen immer in den Tokens ändern, nicht hier.
- **Komponenten-Maße** (Breite, Abdunklung, Linien, Zeilenlänge, Scroll-Indikator) stehen
  als `--station-offcanvas-*` oben in der CSS-Datei.
- Stationen sollen den Aufbau **nicht** lokal überschreiben. Wenn eine Station etwas
  anderes braucht, lieber die Komponente erweitern.

Referenz-Einbau: `04_exploration/station-01/`.
