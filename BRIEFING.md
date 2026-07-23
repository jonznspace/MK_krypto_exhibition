# Design-Briefing — „Krypto, was?" (SKD Münzkabinett)

**Dies ist der Einstiegspunkt. Lies diese Datei zuerst — sie ist die Verfassung des Design-Systems.**
Sie ist für Menschen *und* für KI-Agenten geschrieben, die daraus Screens, Komponenten
und Ableitungen erzeugen. Regeln sind imperativ (`MUST` / `MUST NOT`), messbar und an
Tokens gebunden. Werte stehen nie hier, sondern immer in `00_design-system/tokens/`.

---

## 1. Das Projekt in einem Absatz

„Krypto, was?" ist eine Ausstellung der **Staatlichen Kunstsammlungen Dresden** im
**Münzkabinett** (Residenzschloss, 03.10.2026 – 29.08.2027). Sie führt zwei Geschichten
zusammen — die **Geschichte der Kryptografie** (Mathematik, Verschlüsselung, Binärcode)
und die **Geschichte des Geldes und seines Werts** — und mündet in **Kryptowährungen**.
Bitcoin dient als *ein* Beispiel, nie als Held. Das Design-System speist **ausschließlich
digitale Endpunkte** (Beamer, Tablets, Touchscreen) in einem weißen, klinischen
Ausstellungsraum. Details: [01_project/PROJECT.md](01_project/PROJECT.md).

---

## 2. Die drei Säulen (alles leitet sich hieraus ab)

1. **Maschine** — Die Enigma ist eine Maschine. Bewegung ist *mechanisch*: linear, ohne
   Bounce, ohne Overshoot. Präzision statt Organik.
2. **Ethik** — Die Enigma war Werkzeug eines Vernichtungskriegs. *„Kryptografie ist nie
   nur Technik."* Das Design ästhetisiert nichts, glorifiziert nichts: **Reduktion statt
   Reproduktion, Präzision statt Dekoration.**
3. **Pädagogik** — Der Stoff ist abstrakt. Das Design **erklärt und abstrahiert**; das
   reale Objekt tritt bewusst hinter Information und Interaktion zurück.

Ausführlich: [03_design/DESIGN_DNA.md](03_design/DESIGN_DNA.md).

---

## 3. Nicht verhandelbare Kernregeln (Index)

Diese sechs entscheiden im Zweifel. Jede hat eine ausführliche Fassung im verlinkten File.

- **G1 [MUST]** Werte kommen ausschließlich aus den Tokens. Nie Hex/px hart schreiben.
  → `00_design-system/tokens/`
- **C1 [MUST]** *Neutral trägt, Farbe bedeutet.* Orange = **Action**, Blau = **Information**.
  Farbe ist nie dekorativ. → [VISUAL_LANGUAGE §Farbe](03_design/VISUAL_LANGUAGE.md)
- **D1 [MUST]** *Tiefe nur über Opazität.* Kein Blur, kein Schatten, kein `scale > 1.0`.
  → [VISUAL_LANGUAGE §Motion](03_design/VISUAL_LANGUAGE.md)
- **M1 [MUST]** Keine Animation ohne Zustandsänderung. Bewegung ist mechanisch, nie Dekor.
  → [VISUAL_LANGUAGE §Motion](03_design/VISUAL_LANGUAGE.md)
- **B1 [MUST]** Objektbilder sind monochromer Dither und treten zurück; Erklärung läuft
  über Line-Art / Explosionszeichnung. → [SHAPE_SYSTEM](03_design/SHAPE_SYSTEM.md)
- **A1 [MUST]** Bedienbar für **alle** (inkl. Jugendliche): Touch-Target ≥ `size/touch/min`
  (44px), Klartext, Ton nie alleiniger Träger. → [CUSTOMER](02_research/CUSTOMER.md)

---

## 4. Dateikarte — wo was steht

| Datei | Verantwortung |
|-------|---------------|
| **BRIEFING.md** *(hier)* | Einstieg, Präzedenz, Glossar, Kernregeln |
| [00_design-system/tokens/](00_design-system/tokens/) | **Maschinelle Wahrheit** — alle Werte (JSON + CSS) |
| [01_project/PROJECT.md](01_project/PROJECT.md) | Fakten: Konzept, Stationen, Endpunkte-Hardware |
| [02_research/BRAND.md](02_research/BRAND.md) | Konzept, Ethik, These, Key-Visual-Sprache, Tonalität |
| [02_research/CUSTOMER.md](02_research/CUSTOMER.md) | Zielgruppen, Usability, Accessibility-Regeln |
| [02_research/SITE_VISIT.md](02_research/SITE_VISIT.md) | Physischer Raum, Endpunkte, Soundscape |
| [03_design/DESIGN_DNA.md](03_design/DESIGN_DNA.md) | Die Design-Gesetze (Prinzipien) |
| [03_design/VISUAL_LANGUAGE.md](03_design/VISUAL_LANGUAGE.md) | Farbe, Surfaces, Layer, Motion, Typo, Grid, Icons, Bildsprache, Interaktion |
| [03_design/SHAPE_SYSTEM.md](03_design/SHAPE_SYSTEM.md) | Geometrie: Dither, Line-Art, Icon-Form, Radius |

---

## 5. Präzedenz & Konfliktauflösung

Bei Widerspruch gilt die höhere Ebene. Deterministisch, in dieser Reihenfolge:

1. **`tokens.json` / `tokens.css`** — jeder konkrete Wert (Farbe, Maß, Dauer).
2. **DESIGN_DNA.md** — Prinzipien schlagen konkrete Ausgestaltung.
3. **VISUAL_LANGUAGE.md** — Systemregeln (Farbe, Surface, Layer, Motion …).
4. **SHAPE_SYSTEM.md** — Geometrie/Form.
5. **BRAND / PROJECT / CUSTOMER / SITE_VISIT** — Kontext; informiert Absicht, überschreibt
   aber keine Werte oder Regeln.

Wenn eine Anforderung gegen eine `MUST`-Regel läuft: **nicht umsetzen, sondern melden.**

---

## 6. Glossar (kanonisches Vokabular)

- **Endpunkt** — ein digitales Ausgabegerät der Ausstellung (Beamer, Tablet, Touchscreen).
- **Station** — inhaltliche Einheit der Ausstellung (z. B. Station 4 = Kryptografie/Enigma).
- **Layer (LAYER/0–500)** — Stapeltiefe + Rolle + erlaubte Bewegung einer Screen-Ebene.
- **Surface (Elevated/Contained/Subtle)** — visuelle Hierarchie einer Fläche *innerhalb* einer Layer.
- **Vertiefung** — vertiefende Wissens-Ebene; immer **blau** markiert, öffnet i. d. R. LAYER/400.
- **Dither / Raster** — monochrom-abstrahierte Objektabbildung (greift das Key-Visual auf).
- **Line-Art / Explosionszeichnung** — erklärende technische Zeichnung, feine Linien auf Schwarz.
- **Immersive** — der Dark-Kontext der Screens (schwarz). Gegensatz: der weiße Raum.

---

## 7. Für KI-Agenten: So arbeitest du mit diesem Repo

1. Lies **BRIEFING → DESIGN_DNA → VISUAL_LANGUAGE / SHAPE_SYSTEM**, bevor du etwas erzeugst.
2. Beziehe **alle Werte** aus den Tokens (`var(--token)` bzw. Figma-Variablen), nie hart kodiert.
3. Prüfe jeden Output gegen die `MUST`/`MUST NOT`-Regeln der jeweiligen Domäne.
4. Screen-Kontext ist standardmäßig **dark/immersive** (schwarzer Endpunkt).
5. Bei Konflikt: Präzedenz aus §5 anwenden; bei `MUST`-Verletzung stoppen und nachfragen.
