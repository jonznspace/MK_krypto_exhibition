/*
  Krypto, was? – Schlossspuren (versteckter Bereich)
  ==================================================================
  Spuren im ganzen Residenzschloss, die etwas mit Krypto zu tun haben.
  Nicht in der Navigation; erreichbar nur über den kleinen Link im Footer.

  Aufruf
  - Übersicht:            index.html?spuren
  - Direkt zu einer Spur: index.html?spur=<nr>   (siehe Kommentar an jeder Spur)
  - Englisch zusätzlich:  &lang=en

  Aufbau je Spur
  - title        Titel
  - description  Objektbeschreibung, zwei bis drei Zeilen
  - images       ein oder mehrere Bilder: { src, alt }; leeres src = Platzhalter
  - text         Fließtext, Absätze als Liste
  Alle Texte als { de, en } wie in content.js. Leeres en = deutscher Text wird gezeigt.

  Platzhalter („Lorem ipsum“) sind als Entwurf markiert: index.html?spuren&review=1
*/
(function () {
  const LOREM_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.';
  const LOREM_TEXT = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  ];
  const image = () => ({ src: '', alt: { de: '', en: '' } });

  window.KW_SPUREN = {
    eyebrow: { de: 'Versteckter Bereich', en: 'Hidden section' },
    title: { de: 'Schlossspuren', en: 'Traces in the castle' },
    intro: { draft: true, text: { de: LOREM_TEXT, en: [] } },
    ui: {
      trace: { de: 'Spur', en: 'Trace' },
      back: { de: 'Zur Ausstellung', en: 'Back to the exhibition' },
      imagePending: { de: 'Bild folgt', en: 'Image to follow' },
      overview: { de: 'Alle Spuren', en: 'All traces' }
    },

    items: [
      { // → index.html?spur=1
        nr: 1, draft: true,
        title: { de: 'Spur 1 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image()],
        text: { de: LOREM_TEXT, en: [] }
      },
      { // → index.html?spur=2
        nr: 2, draft: true,
        title: { de: 'Spur 2 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image()],
        text: { de: LOREM_TEXT, en: [] }
      },
      { // → index.html?spur=3
        nr: 3, draft: true,
        title: { de: 'Spur 3 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image()],
        text: { de: LOREM_TEXT, en: [] }
      },
      { // → index.html?spur=4 · Beispiel mit zwei Bildern (bei Bedarf zur richtigen Spur verschieben)
        nr: 4, draft: true,
        title: { de: 'Spur 4 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image(), image()],
        text: { de: LOREM_TEXT, en: [] }
      },
      { // → index.html?spur=5
        nr: 5, draft: true,
        title: { de: 'Spur 5 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image()],
        text: { de: LOREM_TEXT, en: [] }
      },
      { // → index.html?spur=6
        nr: 6, draft: true,
        title: { de: 'Spur 6 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image()],
        text: { de: LOREM_TEXT, en: [] }
      },
      { // → index.html?spur=7
        nr: 7, draft: true,
        title: { de: 'Spur 7 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image()],
        text: { de: LOREM_TEXT, en: [] }
      },
      { // → index.html?spur=8
        nr: 8, draft: true,
        title: { de: 'Spur 8 · Titel folgt', en: '' },
        description: { de: LOREM_SHORT, en: '' },
        images: [image()],
        text: { de: LOREM_TEXT, en: [] }
      }
    ]
  };
})();
