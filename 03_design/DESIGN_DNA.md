# DESIGN DNA — Die Gesetze

> Prinzipien-Ebene. Höhere Präzedenz als VISUAL_LANGUAGE/SHAPE (siehe BRIEFING §5).
> Bei Konflikt gewinnt ein Gesetz hier gegen jede konkrete Ausgestaltung.
> Format: `ID [MUST/MUST NOT] Regel · Rationale`.

## Die drei Säulen

Alle Gesetze leiten sich aus drei Säulen ab. Jede Designentscheidung soll sich mindestens
einer zuordnen lassen.

1. **MASCHINE** — Die Enigma ist eine Maschine; das Design verhält sich mechanisch: präzise,
   linear, ohne organische Weichheit.
2. **ETHIK** — Die Enigma war Werkzeug eines Vernichtungskriegs. Das Design ästhetisiert
   nichts. Reduktion ist Haltung.
3. **PÄDAGOGIK** — Der Stoff ist abstrakt. Das Design erklärt, abstrahiert, macht begreifbar;
   das Objekt tritt hinter die Information zurück.

## Gesetze

### Reduktion & Präzision (Ethik)
- **DNA1 [MUST]** *Reduktion statt Reproduktion.* Nur Elemente, die Inhalt, Struktur oder
  Interaktion tragen. Kein Schmuck. · Die Zurückhaltung ist ethische Haltung, nicht Stil.
- **DNA2 [MUST]** *Präzision statt Dekoration.* Jedes Element hat eine Funktion und eine
  begründbare Position. · Ein historisch belastetes Thema verträgt keine Beliebigkeit.
- **DNA3 [MUST NOT]** Nichts ästhetisieren oder heroisieren — weder die Maschine noch
  Kryptowährungen (Bitcoin nicht hypen). · Faszination und Verantwortung zusammen halten.

### Farbe = Bedeutung
- **DNA4 [MUST]** *Neutral trägt, Farbe bedeutet.* Neutral (Schwarz/Grau/Weiß) trägt alle
  Inhalte; **Orange = Action**, **Blau = Information**. · Farbe wird zur lesbaren Sprache.
- **DNA5 [MUST NOT]** Orange/Blau nie dekorativ, nie zur Einfärbung der Bildwelt. · Sobald
  Farbe schmückt, verliert sie ihre Bedeutung.

### Tiefe & Bewegung (Maschine)
- **DNA6 [MUST]** *Tiefe nur über Opazität.* Kein Blur, kein Schatten, kein `scale > 1.0`.
  · Dither und Line-Art bestehen aus feinen Punkten/Haarlinien — Blur/Schatten zerstören sie.
- **DNA7 [MUST]** *Motion erklärt, sie dekoriert nicht.* Keine Animation ohne
  Zustandsänderung, kein Auto-Play ohne Anlass. · Bewegung ist Information, nicht Effekt.
- **DNA8 [MUST]** *Mechanisch statt organisch.* Kein Overshoot, kein Bounce; nur die vier
  EASE-Tokens. · Die Maschine bewegt sich mechanisch, nicht lebendig.

### Objekt & Erklärung (Pädagogik)
- **DNA9 [MUST]** Das reale Objekt bleibt das Original; die digitale Ebene interpretiert,
  erklärt und erweitert — sie reproduziert nicht. · Der Mehrwert ist Erklärung, nicht Abbild.
- **DNA10 [MUST]** Objektbilder treten hinter Information und Interaktion **zurück**
  (monochromer Dither); Erklärung läuft über Line-Art/Explosionszeichnung. · Wissen vor Bild.

### Zugänglichkeit (Pädagogik)
- **DNA11 [MUST]** Bedienbar für **alle**, ohne Vorwissen. Ein Fokus pro Screen, immer ein
  Weg zurück. · Öffentliche, unbetreute Kurzinteraktion für breites Publikum.
- **DNA12 [MUST]** Kein Kanal ist alleiniger Träger — Farbe, Bewegung und Ton haben immer
  eine zusätzliche, gleichwertige Entsprechung. · Robuste, inklusive Vermittlung.

## Anwendung (Selbsttest für jede Entscheidung)

1. Welcher Säule dient es (Maschine / Ethik / Pädagogik)?
2. Verletzt es ein `MUST NOT`? → verwerfen.
3. Kommen alle Werte aus Tokens? → sonst korrigieren.
4. Trägt Farbe hier *Bedeutung* oder nur *Schmuck*? → bei Schmuck neutral machen.
5. Erklärt Bewegung/Bild etwas, oder dekoriert es nur? → bei Dekoration weglassen.
