# Onepager „Krypto, was?“

Zusammenhängende Scroll-Website aus den Inhalten der Medienstationen.
Design und Werte kommen aus `00_design-system/tokens/` (siehe `BRIEFING.md`).

## Starten

Das Glossar wird per `fetch` geladen, deshalb über einen Server öffnen:

```
python server.py
```

→ http://127.0.0.1:8080/04_exploration/website/

## Hochladen

Der Ordner ist eigenständig: alle Tokens, Schriften, Bilder, der Film, das Glossar und die
Mitmach-Stationen liegen hier drin. Zum Veröffentlichen genügt es, **diesen Ordner** auf den
Server zu kopieren (ohne den Ordner „erster Entwurf von Claude …“, das ist nur eine Sicherung).

Lokal testen: im Website-Ordner `python -m http.server` starten → http://127.0.0.1:8000/

## Dateien

| Datei | Inhalt |
|---|---|
| `js/content.js` | **Alle Texte**, Stationsnummern, Reihenfolge der Kapitel. Hier wird gepflegt. |
| `js/app.js` | Renderer: baut Navigation, Kapitel, Overlay aus `content.js`. Enthält keine Texte. |
| `css/website.css` | Layouts und Komponenten, nur Token-Werte. |
| `assets/` | Kopien aus dem Repo: Design-System (Tokens, Schriften, Icons), gemeinsame Stations-Skripte, Film, Glossar-Daten, Stationsbilder. |
| `stations/` | Kopien der Stationen 01–04 für die Mitmach-Overlays, dazu `embed.js`/`embed.css`. |
| `img/` | Bilder für den Hero (Parallax-Ebenen). |

**Wichtig:** Änderungen an den Originalen (`04_exploration/station-0X`, `00_design-system`,
`station-glossar/daten.json`) werden nicht automatisch übernommen – die Kopien hier müssen
dann erneut aktualisiert werden.

## Häufige Änderungen

- **Stationsnummer ändern / Station ergänzen:** in `content.js` → `stations`. Abschnitte verweisen
  über den Schlüssel (`"station": "skytale"`), Navigation, Station-Tags und Übersichten nummerieren sich automatisch.
- **Englische Texte eintragen:** jedes Textfeld ist ein Paar `{ "de": …, "en": … }`, Absätze als Listen.
  Leeres `en` zeigt den deutschen Text. Der DE/EN-Umschalter oben rechts merkt sich die Wahl im Browser
  (`site.showLanguageSwitch`).
- **Bilder nachtragen:** `"image": null` durch `{ "src": "…", "alt": { "de": "…", "en": "" } }` ersetzen.
- **Großes Bild oben:** `site.heroLayers` mit Hintergrund (`img/background.jpg`) und freigestelltem
  Text (`img/text.png`), beide 3:1. Beim Scrollen verschieben sie sich unterschiedlich stark (Parallax,
  Stärke über `data-depth` in app.js); bei „Bewegung reduzieren“ steht das Bild still.
- **„Ausprobieren“-Buttons:** derzeit ausgeblendet über `site.showActions: false`; auf `true` setzen,
  dann öffnen sie wieder die Stationen im Overlay.
- **Laufzeit:** `site.runtime`.
- **Ausstellungsbereiche:** Abschnitte vom Typ `opener` erzeugen den Kapitel-Banner; der Scharniertext
  steht in `hinge` und erscheint im Banner unter der Überschrift (aktuell Platzhalter „Lorem ipsum“).
- **Abschnitt ausblenden:** `"hidden": true` (z. B. Mining-Geräte, Monitore) – Inhalt bleibt erhalten.
- **Förderer im Footer:** `site.sponsors.items` mit { name, logo, url }; leeres logo = Platzhalterfeld.
- **Schlossspuren (versteckt):** Inhalte in `js/spuren.js`. Aufruf `index.html?spuren` bzw. direkt
  `index.html?spur=3`. Erreichbar nur über den kleinen Link im Footer.
- **Stationen:** aufklappbares Menü unten rechts, Einträge automatisch aus `stations`.
- **Blocksatz:** `site.justifyText` (auf dem Smartphone automatisch linksbündig).

## Prüfmodi

- `?review=1` markiert Entwurfstexte (orange gestrichelt, noch nicht von der Kuration) und
  fehlende Übersetzungen (blau gestrichelt, in Kombination mit `?lang=en`).

## Abschnittstypen (`sections[].type`)

`hero` · `opener` (Kapitel-Banner Ausstellungsbereich 1–3 + Scharniertext) · `object` (Station mit Objektbild) · `bridge` (Überleitung) ·
`film` (Erklärfilm mit Kapitelsprüngen) · `longread` (Text mit Kapitelindex) · `monitors` ·
`catalog` (Objekt-Katalog) · `money` (Definitionen, Zeitleiste, Geldformen) · `lead` ·
`case` (Fallbeispiel, Vertiefung seitlich oder darunter) · `glossary`

## Mitmach-Overlays (Stationen 01–04)

„Ausprobieren“ öffnet die Station als Overlay (LAYER/400, iframe, skaliert auf 1536 × 864) über
`stations/station-0X/index.html?embed`. Der Einbettungsmodus (`stations/embed.js`) öffnet direkt
die Mitmach-Ansicht, blendet Startseite und eigenes Schließen der Station aus, übernimmt die
Sprache der Website und schließt das Overlay mit Esc. Ohne Inaktivitäts-Neustart.
Ein-/ausschalten für alle: `site.showActions`.
