# Station 4 Scaffold

Diese Station dient ab jetzt als wiederverwendbares Grundgeruest fuer weitere Medienstationen.

## Prinzip

- `index.html` ist die stabile UI-Huelle.
- `station-04.css` enthaelt das visuelle System der Station.
- `station-04.js` enthaelt die Inhalte in `STATION_CONTENT` und rendert die UI.

## Fuer die naechste AI-Session

1. Wenn eine neue Station nur andere Inhalte braucht, zuerst `STATION_CONTENT` anpassen.
2. Wenn ein neues Modul gebraucht wird, die HTML-Huelle moeglichst allgemein halten und den Inhalt ebenfalls aus JavaScript rendern.
3. Tokens weiter nur aus `../../00_design-system/tokens/tokens.css` beziehen.
4. Das Layout bleibt fluid. Neue Module muessen ohne globale Skalierung von Mobile bis Kiosk funktionieren.

## Responsive Basis

- `#frame` nutzt die volle Breite und mindestens die sichtbare Viewport-Hoehe.
- Lange Inhalte duerfen die Seite vertikal erweitern und bleiben scrollbar.
- Die Aktionsansicht wechselt von vier Spalten ueber drei Spalten zu einer mobilen Reihenfolge.
- Breite interaktive Module duerfen auf kleinen Displays intern horizontal scrollen.

## Copy-Strategie

Fuer eine neue, aehnliche Station kann dieser Ordner dupliziert werden. Danach sollten in der Regel nur diese Stellen zuerst geaendert werden:

- `STATION_CONTENT.meta`
- `STATION_CONTENT.start`
- `STATION_CONTENT.action`
- Bilddateien in `img/`

Erst wenn das nicht reicht, sollte die Struktur erweitert werden.
