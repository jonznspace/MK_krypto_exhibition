/*
  Krypto, was? – Onepager-Inhalte
  ==================================================================
  Einzige Quelle für alle Texte des Onepagers. Die Texte wurden wörtlich
  aus den Medienstationen übernommen (04_exploration/station-XX).

  Mehrsprachigkeit
  - Jeder Text ist ein Paar { de, en }. Absätze sind Listen: { de: [...], en: [...] }.
  - Leeres "en" = Übersetzung fehlt noch; die Seite zeigt dann den deutschen Text.
  - Vorschau Englisch: index.html?lang=en · fehlende Übersetzungen markieren:
    index.html?lang=en&review=1

  Nummerierung
  - Stationsnummern stehen NUR in "stations" (nr). Abschnitte verweisen über
    den Schlüssel ("station": "skytale"). Neue Station: Eintrag in "stations"
    + Abschnitt in "sections" an der gewünschten Stelle.

  Entwürfe
  - "draft": true markiert Texte, die (noch) nicht von der Kuration stammen.
    Sichtbar machen: index.html?review=1

  Bilder
  - "image": null = Bild fehlt noch. Einfach { "src": "...", "alt": {...} } eintragen.
  - "site.heroLayers": großes Bild ganz oben aus zwei Ebenen (Hintergrund + freigestellter
    Text darüber), die beim Scrollen leicht gegeneinander verschoben werden (Parallax).

  Förderer
  - "site.sponsors.items": { name, logo (Bildpfad), url }. Leeres logo = Platzhalterfeld.
    Logos werden im Footer weiß dargestellt.

  Footer-Logo
  - "site.logo": Logo der SKD, mittig im Footer. { src, alt, url }.

  Impressum
  - "site.imprint": Titel + Blöcke { heading, text }. Zeilenumbrüche im Text mit \n.
    Öffnet sich als Fenster über den Link "Impressum" im Footer.

  Glossar
  - "ui.glossaryGroups": Übersetzung der Kategorien aus assets/glossar/daten.json (Feld "gruppe").
    Neue Kategorie in daten.json = hier ergänzen, sonst erscheint sie auch im Englischen deutsch.

  Navigation
  - Beim Überfahren eines Navigationspunkts erscheint der volle Titel des Ausstellungsbereichs
    ("title" des jeweiligen opener-Abschnitts).

  Ausblenden
  - "hidden": true an einem Abschnitt blendet ihn aus, ohne Inhalte zu löschen.

  Schalter
  - "site.justifyText": Blocksatz für Fließtexte (true/false).
  - "site.showActions": false blendet alle „Ausprobieren“-Buttons (Overlays) aus.
    Die Einträge "action" in den Abschnitten bleiben erhalten.
  - "site.showLanguageSwitch": DE/EN-Umschalter in der Navigation.
  - "site.showImprint": false blendet den Link „Impressum“ im Footer aus (Inhalt bleibt erhalten).\n*/
window.KW_CONTENT = {
  "site": {
    "title": {
      "de": "Krypto, was?",
      "en": "Crypto, what?"
    },
    "pageTitle": {
      "de": "Krypto, was? · Münzkabinett Dresden",
      "en": "Crypto, what? · Coin Cabinet Dresden"
    },
    "description": {
      "de": "Krypto, was? Eine Ausstellung im Münzkabinett der Staatlichen Kunstsammlungen Dresden.",
      "en": "Crypto, what? An exhibition at the Coin Cabinet of the Dresden State Art Collections."
    },
    "institution": {
      "de": "Staatliche Kunstsammlungen Dresden",
      "en": "Dresden State Art Collections"
    },
    "venue": {
      "de": "Münzkabinett · Residenzschloss",
      "en": "Coin Cabinet · Residenzschloss"
    },
    "runtime": {
      "start": "03.10.2026",
      "end": "29.08.2027"
    },
    "heroLayers": {
      "background": {
        "src": "img/background.jpg"
      },
      "foreground": {
        "src": "img/text.png",
        "alt": {
          "de": "Key-Visual der Ausstellung „Krypto, was?“",
          "en": "Key visual of the exhibition “Crypto, what?”"
        }
      }
    },
    "languages": [
      "de",
      "en"
    ],
    "defaultLanguage": "de",
    "showLanguageSwitch": true,
    "showActions": true,
    "showImprint": false,
    "justifyText": true,
    "logo": {
      "src": "img/SKD_Logo_oben_S_Korall_sRGB.png",
      "alt": {
        "de": "Staatliche Kunstsammlungen Dresden",
        "en": "Dresden State Art Collections"
      },
      "url": ""
    },
    "sponsors": {
      "title": {
        "de": " ",
        "en": "With the kind support of"
      },
      "items": [
        {
          "name": {
            "de": "Ostsächsische Sparkasse Dresden",
            "en": "Ostsächsische Sparkasse Dresden"
          },
          "logo": "img/logo_sparkasse.svg",
          "url": ""
        }
      ]
    },
    "imprint": {
      "title": {
        "de": "Impressum",
        "en": "Legal notice"
      },
      "blocks": [
        {
          "heading": {
            "de": "Herausgeber",
            "en": "Publisher"
          },
          "text": {
            "de": "Staatliche Kunstsammlungen Dresden\nResidenzschloss\nTaschenberg 2\n01067 Dresden",
            "en": "Dresden State Art Collections\nResidenzschloss\nTaschenberg 2\n01067 Dresden, Germany"
          }
        },
        {
          "heading": {
            "de": "Vertreten durch",
            "en": "Represented by"
          },
          "text": {
            "de": "[Name, Funktion – bitte ergänzen]",
            "en": "[Name, position – to be added]"
          }
        },
        {
          "heading": {
            "de": "Kontakt",
            "en": "Contact"
          },
          "text": {
            "de": "Telefon: [bitte ergänzen]\nE-Mail: [bitte ergänzen]",
            "en": "Phone: [to be added]\nEmail: [to be added]"
          }
        },
        {
          "heading": {
            "de": "Umsatzsteuer-ID",
            "en": "VAT ID"
          },
          "text": {
            "de": "[bitte ergänzen]",
            "en": "[to be added]"
          }
        },
        {
          "heading": {
            "de": "Inhaltlich verantwortlich",
            "en": "Responsible for content"
          },
          "text": {
            "de": "[Name, Anschrift – bitte ergänzen]",
            "en": "[Name, address – to be added]"
          }
        },
        {
          "heading": {
            "de": "Konzeption & Gestaltung",
            "en": "Concept & design"
          },
          "text": {
            "de": "[bitte ergänzen]",
            "en": "[to be added]"
          }
        },
        {
          "heading": {
            "de": "Haftung für Links",
            "en": "Liability for links"
          },
          "text": {
            "de": "Für die Inhalte externer Seiten, auf die verwiesen wird, sind ausschließlich deren Betreiber verantwortlich.",
            "en": "The operators of linked external websites are solely responsible for their content."
          }
        }
      ]
    }
  },
  "ui": {
    "part": {
      "de": "Ausstellungsbereich",
      "en": "Exhibition area"
    },
    "station": {
      "de": "Station",
      "en": "Station"
    },
    "stations": {
      "de": "Stationen",
      "en": "Stations"
    },
    "runtime": {
      "de": "Laufzeit",
      "en": "Dates"
    },
    "venue": {
      "de": "Ort",
      "en": "Venue"
    },
    "deepDive": {
      "de": "Vertiefung",
      "en": "A Closer Look"
    },
    "tryIt": {
      "de": "Ausprobieren",
      "en": "Try it out"
    },
    "close": {
      "de": "Schließen",
      "en": "Close"
    },
    "toTop": {
      "de": "Nach oben",
      "en": "Back to top"
    },
    "chapters": {
      "de": "Kapitel",
      "en": "Chapters"
    },
    "film": {
      "de": "Erklärfilm",
      "en": "Explainer film"
    },
    "live": {
      "de": "Live",
      "en": "Live"
    },
    "glossaryFilterAll": {
      "de": "Alle",
      "en": "All"
    },
    "glossarySeeAlso": {
      "de": "Siehe auch",
      "en": "See also"
    },
    "glossaryMore": {
      "de": "Mehr dazu",
      "en": "More"
    },
    "glossaryError": {
      "de": "Das Glossar konnte nicht geladen werden. Bitte die Seite über den lokalen Server öffnen (server.py).",
      "en": "The glossary could not be loaded. Please open the page via the local server (server.py)."
    },
    "draft": {
      "de": "Entwurf",
      "en": "Draft"
    },
    "skip": {
      "de": "Zum Inhalt springen",
      "en": "Skip to content"
    },
    "stationsOpen": {
      "de": "Stationen anzeigen",
      "en": "Show stations"
    },
    "secret": {
      "de": "Krypto-Spuren",
      "en": "Crypto Traces"
    },
    "logoPending": {
      "de": "Logo",
      "en": "Logo"
    },
    "minersHint": {
      "de": "Auf ein Gerät tippen, um mehr zu erfahren",
      "en": "Tap a device to learn more"
    },
    "glossaryCategories": {
      "de": "Kategorien",
      "en": "Categories"
    },
    "glossaryGroups": {
      "Grundbegriffe": {
        "de": "Grundbegriffe",
        "en": "Basic Concepts"
      },
      "Markt & Psychologie": {
        "de": "Markt & Psychologie",
        "en": "Markets & Psychology"
      },
      "Staat, Regeln, Risiken": {
        "de": "Staat, Regeln, Risiken",
        "en": "State, Rules, Risks"
      },
      "Geldgeschichte": {
        "de": "Geldgeschichte",
        "en": "History of Money"
      },
      "Zukunft": {
        "de": "Zukunft",
        "en": "Future"
      }
    }
  },
  "stations": {
    "skytale": {
      "nr": 1,
      "folder": "station-01",
      "topic": {
        "de": "Kryptografie",
        "en": "Cryptography"
      }
    },
    "zirkel": {
      "nr": 2,
      "folder": "station-02",
      "topic": {
        "de": "Kryptografie",
        "en": "Cryptography"
      }
    },
    "leibniz": {
      "nr": 3,
      "folder": "station-03",
      "topic": {
        "de": "Kryptografie",
        "en": "Cryptography"
      }
    },
    "enigma": {
      "nr": 4,
      "folder": "station-04",
      "topic": {
        "de": "Kryptografie",
        "en": "Cryptography"
      }
    },
    "bitcoin": {
      "nr": 5,
      "folder": "station-07",
      "topic": {
        "de": "Bitcoin",
        "en": "Bitcoin"
      }
    },
    "geld": {
      "nr": 6,
      "folder": "station-08",
      "topic": {
        "de": "Neue Entwicklungen",
        "en": "New developments"
      }
    },
    "entwicklungen": {
      "nr": 7,
      "folder": "station-09",
      "topic": {
        "de": "Neue Entwicklungen",
        "en": "New developments"
      }
    },
    "stockholm": {
      "nr": 8,
      "folder": "station-10",
      "topic": {
        "de": "Scheitern ohne Regeln",
        "en": "Failure Without Rules"
      }
    },
    "sachsen": {
      "nr": 9,
      "folder": "station-11",
      "topic": {
        "de": "Verordnetes Vertrauen",
        "en": "Trust by Decree"
      }
    },
    "voc": {
      "nr": 10,
      "folder": "station-12",
      "topic": {
        "de": "Firmengeld",
        "en": "Company Money"
      }
    },
    "freebanking": {
      "nr": 11,
      "folder": "station-13",
      "topic": {
        "de": "Free-Banking Era",
        "en": "Free Banking Era"
      }
    },
    "glossar": {
      "nr": null,
      "label": {
        "de": "Medientisch",
        "en": "Media table"
      },
      "folder": "station-glossar",
      "topic": {
        "de": "Glossar",
        "en": "Glossary"
      }
    }
  },
  "sections": [
    {
      "type": "hero",
      "id": "top"
    },
    {
      "type": "lead",
      "id": "einfuehrung",
      "title": {
        "de": "Einführung",
        "en": "Introduction"
      },
      "text": {
        "de": [
          "Was hat ein Chiffriergerät aus dem 16. Jahrhundert mit Bitcoin zu tun? Warum hilft die Geschichte des Papiergeldes, heutige Stablecoins einzuordnen? Was verbirgt sich hinter Begriffen wie Blockchain, Public/Private Key, Wallet und Mining? Die Sonderausstellung „Krypto, was?“ beleuchtet die historischen Wurzeln heutiger Kryptowerte in der Kryptografie, Rechentechnik und globalen Vernetzung. Am Beispiel von Bitcoin werden die Grundzüge eines dezentralen Kryptowertes und die Funktionsweise einer Blockchain erläutert. Zugleich werden historische Geldformen mit gegenwärtigen Entwicklungen von Kryptowerten in Beziehung gesetzt. Aus diesen Analogien ergeben sich überraschende Einsichten, die zu sehr grundsätzlichen Fragen rund ums Geld führen: Worauf beruht ein Wert? Welche Regeln gelten? Wie entsteht Vertrauen? Und wer trägt die Risiken?"
        ],
        "en": [
          "What does a 16th-century cipher device have to do with Bitcoin? Why does the history of paper money help us put today’s stablecoins into perspective? What do terms like blockchain, public/private key, wallet, and mining mean? The special exhibition “Crypto, what?” explores the historical roots of today’s crypto assets in cryptography, computing, and global connectivity. Using Bitcoin as an example, it explains the basic principles of a decentralized crypto asset and how a blockchain works. At the same time, historical forms of money are explored in relation to current developments in crypto assets. These analogies yield surprising insights that lead to very basic monetary questions: What determines value? What rules apply? How is trust established? And who bears the risks?"
        ]
      }
    },
    {
      "type": "opener",
      "id": "teil-1",
      "numeral": "1",
      "nav": {
        "de": "Kryptografie",
        "en": "Cryptography"
      },
      "title": {
        "de": "Kryptografie, Computergeschichte und digitale Vernetzung",
        "en": "Cryptography, Computer History, and Digital Networks"
      }
    },
    {
      "type": "object",
      "id": "skytale",
      "station": "skytale",
      "eyebrow": {
        "de": "Geheime Botschaften in der Antike",
        "en": "Secret Messages in Antiquity"
      },
      "title": {
        "de": "Verschlüsseln & versiegeln",
        "en": "Encryption and Seals"
      },
      "image": {
        "src": "stations/station-01/dither-output.png",
        "alt": {
          "de": "",
          "en": ""
        }
      },
      "text": {
        "de": [
          "Wie lassen sich Nachrichten so übermitteln, dass Dritte sie nicht verstehen? Diese Frage stellten sich Menschen wohl schon immer. Von der Antike ausgehend bestand eine Lösung beispielsweise darin, die Nachricht mit einem Siegel aus Bienenwachs zu „versiegeln“. Ein Siegelbruch bedeutete, dass die Nachricht gelesen wurde. Darüber hinaus entwickelten sich weitere Lösungen: So wurden Texte, also Buchstaben, derart verändert, dass sie nur für die vorgesehenen Empfänger lesbar blieben.",
          "Im antiken Sparta diente für letzteres nachweislich die Skytale. Ein Lederstreifen wurde spiralförmig um einen Holzstab gewickelt, die Nachricht über diese Wicklungen hinweg geschrieben und wurde so nach dem Abnehmen unlesbar. Erst mit einem Stab gleichen Durchmessers ließen sich die Buchstaben wieder richtig anordnen.",
          "Die sogenannte Caesar-Chiffre, deren Erfindung Julius Caesar zugeschrieben wird, funktioniert noch einfacher: Jeder Buchstabe wird im Alphabet um eine festgelegte Anzahl Plätze verschoben. Aus A wird zum Beispiel D, aus B wird E. Wer den „Schlüssel“ kennt – also die Zahl der Verschiebung –, kann die Nachricht dekodieren.",
          "Beide Verfahren sind leicht zu knacken. Sie zeigen jedoch ein Prinzip, das bis heute gilt: Informationen lassen sich so umwandeln, dass sie nur für Eingeweihte verständlich sind. Dieses Prinzip heißt Kryptografie. Es ist die erste von drei Grundlagen, auf denen später digitale Bezahlung und digitales Geld aufbauen wird."
        ],
        "en": [
          "How can messages be sent so that others cannot understand them? People have probably always asked this question. In antiquity, one solution was to secure a message with a beeswax seal. A broken seal indicated that the message had been read. Other solutions were also developed: texts, or the letters within them, were altered so that only the intended recipients could read them.",
          "The scytale is a documented example of this approach from ancient Sparta. A strip of leather was wound around a wooden rod in a spiral, and the message was written across the turns of the strip. Once unwound, the message became unreadable. Only by wrapping the strip around a rod of the same diameter could the letters be arranged in the correct order again.",
          "The so-called Caesar cipher, whose invention is attributed to Julius Caesar, works even more simply: each letter is shifted to a fixed number of places in the alphabet. For example, A becomes D, and B becomes E. Anyone who knows the “key”, which means the number of places to shift, can decode the message.",
          "Both methods are easy to crack. Yet they demonstrate a principle that still applies today: information can be transformed so that only those who know how to decode it can understand it. This principle is called cryptography. It is the first of three foundations on which digital payments and digital money would later be built."
        ]
      },
      "deepDives": [],
      "action": {
        "label": {
          "de": "Skytale ausprobieren",
          "en": "Try the skytale"
        },
        "src": "stations/station-01/index.html?embed"
      }
    },
    {
      "type": "object",
      "id": "zirkel",
      "station": "zirkel",
      "flip": true,
      "eyebrow": {
        "de": "Verschlüsseln mit System",
        "en": "Systematic Encryption"
      },
      "title": {
        "de": "Der kryptografische Zirkel und die „Permutationsmaschine“",
        "en": "The Cryptographic Dividers and the “Permutation Machine”"
      },
      "image": {
        "src": "stations/station-02/dither-output.png",
        "alt": {
          "de": "",
          "en": ""
        }
      },
      "text": {
        "de": [
          "Antike Verfahren hatten einen Nachteil: War ihr Prinzip einmal bekannt, ließen sich Nachrichten oft rasch entschlüsseln. Daraus entstand ein Wettbewerb zwischen dem Chiffrieren und dem Dechiffrieren von Informationen, der bis heute anhält. Neue Methoden sollen Nachrichten stets sicherer machen, zugleich wird aber ständig nach Wegen gesucht, den Inhalt doch zu entschlüsseln.",
          "Ein Beispiel hierfür ist der kryptografische Zirkel von 1633, der einen simplen Mechanismus aufweist: Jeder Buchstabe des Alphabets konnte zu einer bestimmten Strichlänge umgewandelt werden, deren Abstand über das Gerät eingestellt wurde. Sender und Empfänger brauchten jeweils ein baugleiches Exemplar, denn nur bei identischer Einstellung ließ sich die Nachricht entschlüsseln.",
          "Die „Permutationsmaschine“ ist ein Chiffriergerät aus dem Jahr 1587. Es besaß mit ursprünglich 24 einzeln drehbaren Messingscheiben bereits ein deutlich komplexeres Verschlüsselungsverfahren. Jede der Scheiben war mit 24 Buchstaben (J=I, U=V) versehen, sodass jeder Buchstabe eines zu verschlüsselnden Wortes einen eigenen Verschiebungswert aufweisen konnte. Ohne den „Schlüssel“, also die Information zur Positionierung der Scheiben zueinander (= den Verschiebungscode), war eine Nachricht nur schwerlich zu dekodieren. Das Objekt zeigt damit ein frühes mechanisches Verfahren, Sprache systematisch zu verschlüsseln und wieder zu entschlüsseln."
        ],
        "en": [
          "Ancient methods had a drawback: once their underlying principle was known, messages could often be deciphered quickly. This gave rise to a contest between encrypting and decrypting information that continues to this day. New methods aim to make messages ever more secure, while others continually seek ways to decipher their contents.",
          "One example is the cryptographic dividers of 1633, which use a simple mechanism: each letter of the alphabet could be converted into a line of a specific length by adjusting the distance between the instrument’s points. Sender and recipient each needed an identical instrument, as the message could only be deciphered if both used the same setting.",
          "The “permutation machine” is a cipher device dating from 1587. Originally equipped with 24 individually rotating brass disks, it used a considerably more complex encryption method. Each disk bore 24 letters (J=I, U=V), allowing each letter in a word to be shifted by a different number of places. Without the “key”, the information specifying the positions of the disks relative to one another, and thus the shifts to apply, a message was difficult to decode. The object demonstrates an early mechanical method for systematically encrypting and decrypting language."
        ]
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "A Closer Look"
          },
          "title": {
            "de": "Weitere Verschlüsselungsverfahren",
            "en": "Other Encryption Methods"
          },
          "text": {
            "de": [
              "Weitere Hilfsmittel machten Verschlüsselung komplexer. Dazu gehörten Chiffriertabellen oder Codebücher, sogenannte Nomenklatoren, in denen Namen, Orte oder ganze Wörter durch andere Zeichen ersetzt wurden. Solche Verfahren prägten seit dem 15. Jahrhundert besonders die europäische Diplomatie, die auf dichte Netzwerke reisender Boten und Gesandter angewiesen war. In „schwarzen Kammern“ chiffrierten und dechiffrierten die Höfe abgefangene Nachrichten. Auch am sächsischen Hof gab es eine „schwarze Kammer“, die direkt in der Poststelle untergebracht war, um ein- bzw. ausgehende Schreiben zu kontrollieren. Noch zu DDR-Zeiten, zur Zeit des sogenannten Kalten Krieges, waren diese Verfahren gang und gäbe. In unserer heutigen Verfassung ist das Postgeheimnis klar geregelt, was durch die Digitalisierung und Privatisierung dieses Bereiches allerdings aufgeweicht wird."
            ],
            "en": [
              "Other tools made encryption more complex. These included cipher tables and codebooks known as nomenclators, in which names, places, or entire words were replaced with other symbols. From the 15th century onward, such methods played a particularly important role in European diplomacy, which relied on extensive networks of traveling couriers and envoys. In “black chambers,” royal courts encrypted messages and deciphered intercepted correspondence. The Saxon court also had a “black chamber,” located within the postal office itself so that incoming and outgoing letters could be monitored. Such practices remained commonplace in East Germany during the Cold War. Today, the privacy of correspondence is explicitly protected by Germany’s constitution, although digitization and the privatization of postal and communications services are weakening that protection."
            ]
          }
        }
      ],
      "action": {
        "label": {
          "de": "Permutationsscheibe ausprobieren",
          "en": "Try the cipher disc"
        },
        "src": "stations/station-02/index.html?embed"
      }
    },
    {
      "type": "object",
      "id": "leibniz",
      "station": "leibniz",
      "eyebrow": {
        "de": "Die Maschine rechnet",
        "en": "A Machine That Calculates"
      },
      "title": {
        "de": "Die Leibniz-Rechenmaschine",
        "en": "The Leibniz Calculating Machine"
      },
      "image": {
        "src": "stations/station-03/dither-output.png",
        "alt": {
          "de": "",
          "en": ""
        }
      },
      "text": {
        "de": [
          "Im 17. Jahrhundert arbeiteten Gelehrte in mehreren Ländern Europas an der Frage, ob sich Rechenvorgänge mechanisieren lassen. Einer von ihnen war der in Leipzig geborene Gottfried Wilhelm Leibniz (1646-1716). Seine mechanische Rechenmaschine zählt zu den bedeutendsten frühen Exemplaren ihrer Art, weil sie alle vier Grundrechenarten ausführen konnte. Ihr Herzstück war die sogenannte Staffelwalze: ein Mechanismus aus ineinandergreifenden Rädern, der Rechenoperationen mechanisch ausführte.",
          "Leibniz beschäftigte sich früh mit dem Binärsystem und schrieb es als einer der Ersten systematisch nieder. Diese Zahlendarstellung verwendet nur zwei Ziffern: 0 und 1. Im Unterschied zum Dezimalsystem mit zehn Ziffern lassen sich Informationen hier mit zwei Zuständen darstellen, etwa wie bei einem Schalter: an oder aus.",
          "Dieses Prinzip ist heute grundlegend für digitale Technik. Computer verarbeiten Informationen intern in binären Zuständen. Jedes Foto, jede Nachricht, jede Transaktion beruht auf Folgen von Nullen und Einsen."
        ],
        "en": [
          "In the 17th century, scholars in several European countries explored whether calculations could be mechanized. One of them was Gottfried Wilhelm Leibniz (1646–1716), who was born in Leipzig. His mechanical calculating machine ranks among the most significant early examples of its kind because it could perform all four basic arithmetic operations: addition, subtraction, multiplication, and division. At its heart was the so-called stepped drum, part of a mechanism of interlocking gears that performed calculations mechanically.",
          "Leibniz took an early interest in the binary number system and was among the first to describe it systematically in writing. This way of representing numbers uses only two digits: 0 and 1. Unlike the decimal system, which uses ten digits, the binary system allows information to be represented using just two states, like a switch that is either on or off.",
          "Today, this principle is fundamental to digital technology. Computers process information internally using binary states. Every photo, every message, and every transaction is represented by sequences of zeros and ones."
        ]
      },
      "deepDives": [],
      "action": {
        "label": {
          "de": "Dein Name in Binär",
          "en": "Your name in binary"
        },
        "src": "stations/station-03/index.html?embed"
      }
    },
    {
      "type": "object",
      "id": "enigma",
      "station": "enigma",
      "flip": true,
      "eyebrow": {
        "de": "Maschinen verschlüsseln",
        "en": "Machines Encrypt"
      },
      "title": {
        "de": "Die Enigma",
        "en": "The Enigma"
      },
      "image": {
        "src": "stations/station-04/dither-output.png",
        "alt": {
          "de": "",
          "en": ""
        }
      },
      "text": {
        "de": [
          "Zu Beginn des 20. Jh. wurde mit der sogenannten Enigma, einer Rotor-Chiffriermaschine, ein enormer Entwicklungssprung in der Verschlüsselung von Nachrichten vollzogen.",
          "Die Enigma erzeugte nun mehr Einstellungsmöglichkeiten, als es Sterne in unserer Galaxie gibt. Bei der militärischen Standardausführung gibt es über 150 Trillionen. Sie wurde vom deutschen Ingenieur Arthur Scherbius ursprünglich als kommerzielles Produkt für Banken und Unternehmen entwickelt, die ihre Kommunikation schützen wollten. Später übernahm das Militär die Technik für seine Zwecke. Die Enigma arbeitete mit rotierenden Walzen, die bei jedem Tastendruck eine neue Zuordnung der Buchstaben erzeugten. Es ist, als würde sich das Schloss nach jedem Buchstaben komplett verändern.",
          "Im Zweiten Weltkrieg (1939–1945) wurde die Enigma für die militärische Kommunikation der deutschen Streitkräfte eingesetzt. Sie war Teil der technischen Infrastruktur eines menschenverachtenden Krieges, der Abermillionen Opfer forderte.",
          "Schon in den 1930er Jahren gelang es polnischen Mathematikern, darunter Marian Rejewski, Jerzy Różycki und Henryk Zygalski, die Funktionsweise der Enigma mathematisch zu analysieren. Auf dieser Grundlage bauten britische Kryptologen in Bletchley Park dann elektromechanische Entschlüsselungsmaschinen. Allen voran entwickelte Alan Turing mit seinem Team die „Turing-Welchman-Bombe“, deren erste Exemplare 1940 in Betrieb gingen und die Technik der Enigma knackten."
        ],
        "en": [
          "In the early 20th century, the Enigma rotor cipher machine marked a major leap forward in message encryption.",
          "The Enigma offered more possible settings than there are stars in our galaxy, over 150 quintillion in the standard military version. German engineer Arthur Scherbius originally developed it as a commercial product for banks and businesses seeking to protect their communications. The military later adopted the technology for its own purposes. The Enigma used rotating wheels, or rotors, that created a new mapping between letters with every keystroke. It was as if a lock changed completely after every letter.",
          "During World War II (1939–1945), the Enigma was used for military communications by the German armed forces. It formed part of the technical infrastructure of a war waged with contempt for human life that claimed countless millions of victims.",
          "As early as the 1930s, Polish mathematicians, including Marian Rejewski, Jerzy Różycki, and Henryk Zygalski, succeeded in mathematically analyzing how the Enigma worked. Building on this foundation, British cryptologists at Bletchley Park constructed electromechanical codebreaking machines. Alan Turing played a leading role, developing the “Turing–Welchman Bombe” with his team. The first machines entered service in 1940 and were used to crack Enigma encryption."
        ]
      },
      "deepDives": [],
      "action": {
        "label": {
          "de": "Enigma ausprobieren",
          "en": "Try the Enigma"
        },
        "src": "stations/station-04/index.html?embed"
      }
    },
    {
      "type": "bridge",
      "id": "bruecke-1",
      "draft": true,
      "text": {
        "de": "Verschlüsseln und Rechnen: Auf diesen Grundlagen baut später digitales Geld auf.",
        "en": ""
      },
      "hidden": true
    },
    {
      "type": "opener",
      "id": "teil-2",
      "numeral": "2",
      "nav": {
        "de": "Bitcoin",
        "en": "Bitcoin"
      },
      "title": {
        "de": "Wie funktioniert Bitcoin?",
        "en": "How Does Bitcoin Work?"
      },
      "hinge": {
        "title": {
          "de": "Vom Ideal zur Industrie",
          "en": "From Ideal to Industry"
        },
        "text": {
          "de": [
            "Als Bitcoin 2009 startete, war das „Mining“ als offener, dezentraler Prozess gedacht: Jede und jeder konnte mit einem Computer am Netzwerk teilnehmen, Transaktionen überprüfen und neue Blöcke erzeugen. Das System versprach Gleichberechtigung – keine zentrale Instanz, keine privilegierten Akteure.",
            "Inzwischen prägen spezialisierte Hochleistungsgeräte und insbesondere industrielle Mining-Farmen das Bild. In riesigen Hallen arbeiten tausende ASIC-Maschinen rund um die Uhr. Der Wettbewerb um Rechenleistung ist zu einem globalen Geschäft geworden, bestimmt von Strompreisen, Standortvorteilen und Investitionskapital. Einzelne Miner haben kaum noch Chancen, profitabel mitzuhalten.",
            "Damit verschiebt sich das Kräfteverhältnis: Aus einer technisch dezentral konzipierten Infrastruktur entstand eine zunehmend ökonomisch konzentrierte Landschaft. Der ursprüngliche Anspruch von Gleichheit trifft auf die Logik von Effizienz, Skalierung und Gewinnmaximierung.",
            "Das Bitcoin-System stellt die bisherige Ordnung unseres globalen kapitalistischen Geld- und Finanzsystems in Frage: Kann ein digitaler Wert als Geld fungieren? Ist dies möglich, sofern er allein von Mathematik, Rechenleistung und einem weltweiten Netzwerk getragen wird und keine zentralen Instanzen wie Staaten und ihre Nationalbanken involviert sind?"
          ],
          "en": [
            "When Bitcoin launched in 2009, “mining” was meant to be an open, decentralized process: Anyone could join the network with a computer, verify transactions, and generate new blocks. The system promised equality – no central authority, no privileged players.",
            "Today, however, the landscape is dominated by specialized high-performance devices and, in particular, industrial mining farms. In massive warehouses, thousands of ASIC machines operate around the clock. The competition for computing power has become a global business, driven by electricity prices, locational advantages, and investment capital. Individual miners now have little chance of keeping up profitably.",
            "Thus, the balance of power shifted: an infrastructure originally designed to be technically decentralized has given rise to an increasingly economically concentrated landscape. The original ideal of equality clashes with the logic of efficiency, scaling, and profit maximization.",
            "The Bitcoin system challenges the existing order of our global capitalist monetary and financial system: Can a digital asset function as money? Is this possible if it is supported solely by mathematics, computing power, and a global network, with no central authorities, such as states and their central banks, involved?"
          ]
        }
      }
    },
    {
      "type": "lead",
      "id": "was-ist-bitcoin",
      "station": "bitcoin",
      "eyebrow": {
        "de": "Wie funktioniert Bitcoin?",
        "en": "How does Bitcoin work?"
      },
      "title": {
        "de": "Überblick über das Bitcoin-System",
        "en": "Bitcoin System Overview"
      },
      "text": {
        "de": [
          "Bitcoin wurde 2008 in einem veröffentlichten Konzept vorgestellt; 2009 nahm das Netzwerk seinen Betrieb auf. Der Begriff bezeichnet sowohl ein digitales Zahlungssystem als auch dessen Werteinheit. Bitcoin ermöglicht es, Werte über das Internet zu übertragen, ohne dass dafür eine Bank als zentrale Buchungsstelle erforderlich ist. Börsen und andere Dienstleister können bei der praktischen Nutzung dennoch eine vermittelnde Rolle übernehmen.",
          "Bitcoin gilt als erster erfolgreicher dezentraler Kryptowert und als Ausgangspunkt des heutigen Kryptomarkts. Inzwischen existieren zahlreiche weitere Kryptowerte, wie Token und Stablecoins. Sie folgen nicht alle denselben technischen Prinzipien. Bitcoin steht jedoch am Anfang dieser Entwicklung, besteht bis heute und ist weiterhin der bekannteste Kryptowert.",
          "Viele vernetzte Rechner führen und prüfen eine gemeinsame Transaktionsgeschichte. Digitale Schlüssel weisen nach, wer über Bitcoin verfügen darf. Miner fassen Transaktionen zu Blöcken zusammen und sichern deren Aufnahme in die Blockchain durch Rechenarbeit. Dabei gelangen zugleich neue Bitcoin in Umlauf. Wer Bitcoin hält, empfängt oder versendet, muss jedoch nicht selbst Mining betreiben.",
          "Bitcoin ist so konzipiert, dass keine zentrale Stelle das gesamte System verwaltet. An ihre Stelle treten öffentlich einsehbare Regeln, kryptografische Prüfungen und das Zusammenwirken vieler voneinander unabhängiger Rechner. Die folgenden Kapitel erklären das gemeinsame Kontobuch, digitale Schlüssel, Mining, die Sicherung der Blockchain und die Entwicklung der Mining-Geräte."
        ],
        "en": [
          "Bitcoin was introduced in a published proposal in 2008; the network began operating in 2009. The term refers both to a digital payment system and to its unit of value. Bitcoin makes it possible to transfer value over the internet without requiring a bank to keep a central record of transactions. Exchanges and other service providers may nevertheless act as intermediaries in its everyday use.",
          "Bitcoin is regarded as the first successful decentralized crypto asset and the starting point of today’s crypto market. Numerous other crypto assets now exist, including tokens and stablecoins. They do not all follow the same technical principles. Bitcoin, however, marks the beginning of this development, remains in operation, and is still the best-known crypto asset.",
          "Many networked computers maintain and verify a shared transaction history. Digital keys provide proof of who is authorized to spend particular bitcoin. Miners group transactions into blocks and perform computational work to secure their addition to the blockchain. This process also brings new bitcoin into circulation. However, anyone holding, receiving, or sending bitcoin does not need to mine it themselves.",
          "Bitcoin is designed so that no central authority manages the entire system. Instead, it relies on publicly accessible rules, cryptographic checks, and the cooperation of many independently operated computers. The following sections explain the shared ledger, digital keys, mining, blockchain security, and the development of mining hardware."
        ]
      }
    },
    {
      "type": "film",
      "id": "erklaerfilm",
      "station": "bitcoin",
      "title": {
        "de": "Wie funktioniert Bitcoin?",
        "en": "How does Bitcoin work?"
      },
      "meta": {
        "de": "Erklärfilm · 3:51 · ohne Ton",
        "en": "Explainer film · 3:51 · silent"
      },
      "src": "assets/film/bitcoin-film_v2.1.mp4",
      "chapters": [
        {
          "t": 0,
          "title": {
            "de": "Durchführung von zentralen und dezentralen Zahlungen",
            "en": "Centralized and Decentralized Payments"
          }
        },
        {
          "t": 56,
          "title": {
            "de": "Wie startet eine Transaktion?",
            "en": "How Does a Transaction Start?"
          }
        },
        {
          "t": 130.3,
          "title": {
            "de": "Wie funktioniert Mining?",
            "en": "How Does Mining Work?"
          }
        },
        {
          "t": 172.1,
          "title": {
            "de": "Wie ist die Blockchain abgesichert?",
            "en": "How Is the Blockchain Secured?"
          }
        }
      ]
    },
    {
      "type": "longread",
      "id": "bitcoin",
      "station": "bitcoin",
      "eyebrow": {
        "de": "Wie funktioniert Bitcoin?",
        "en": "How does Bitcoin work?"
      },
      "title": {
        "de": "Vom Kontobuch zur Kette",
        "en": "From Ledger to Chain"
      },
      "titleDraft": true,
      "parts": [
        {
          "kicker": "5.1",
          "title": {
            "de": "Ein Kontobuch, das allen gehört",
            "en": "A Ledger That Belongs to Everyone"
          },
          "text": {
            "de": [
              "Wer Geld auf einem Bankkonto hält, lagert dort nicht bestimmte Geldscheine. Die Bank hält in ihrer Datenbank fest, wie hoch das Guthaben auf einem Konto ist und welche Buchungen erfolgt sind. Sie führt dieses Kontobuch zentral und bestätigt, welche Zahlungen gültig sind.",
              "Bitcoin geht einen anderen Weg. Es gibt kein einzelnes, zentrales Kontobuch. Stattdessen führen zahlreiche unabhängig betriebene Rechner, sogenannte Nodes oder Knotenpunkte, die Transaktionsgeschichte gemeinsam. Sie prüfen neue Transaktionen und Blöcke nach denselben Regeln.",
              "Neue Transaktionen werden zu sogenannten Blöcken zusammengefasst. Ein solcher Block lässt sich mit einer neuen Seite in einem gemeinsamen „Kontobuch“ vergleichen. Durchschnittlich etwa alle zehn Minuten kommt ein weiterer Block hinzu.",
              "Die Blöcke mit den aufgetretenen Transaktionen sind miteinander verbunden, denn jeder neue Block enthält einen digitalen Verweis auf den vorherigen. Aus den aufeinanderfolgenden Blöcken entsteht so eine Kette – die Blockchain. Wird ein älterer Block nachträglich verändert, passt demzufolge sein „digitaler Fingerabdruck“ nicht mehr zu den folgenden Blöcken. Eine Veränderung oder Manipulation von vorherigen Transaktionen wird dadurch erkennbar."
            ],
            "en": [
              "When you hold money in a bank account, the bank does not set aside particular banknotes for you. Instead, it records your account balance and transactions in its database. The bank maintains this ledger centrally and confirms which payments are valid.",
              "Bitcoin takes a different approach. There is no single, central ledger. Instead, numerous independently operated computers, known as nodes, jointly maintain the transaction history. They check new transactions and blocks against the same rules.",
              "New transactions are grouped into blocks. Each block can be compared to a new page in a shared ledger. On average, another block is added approximately every ten minutes.",
              "The blocks containing these transactions are linked: each new block includes a digital reference to the previous one. These successive blocks form a chain: the blockchain. If an earlier block is altered, its “digital fingerprint” no longer matches the references in the blocks that follow. This makes changes to or manipulation of earlier transactions detectable."
            ]
          },
          "deepDives": [
            {
              "tag": {
                "de": "Vertiefung",
                "en": "A Closer Look"
              },
              "title": {
                "de": "Wie ein Block mit dem vorherigen verbunden ist – Hash-Funktionen",
                "en": "How Blocks Are Linked—Hash Functions"
              },
              "text": {
                "de": [
                  "Der Verweis auf den vorherigen Block ist kein einfacher Verweis wie eine Seitenzahl. Er ist ein sogenannter Hashwert, ein digitaler Fingerabdruck. Eine Hash-Funktion ist ein Rechenverfahren, das Daten beliebiger Länge in eine Zeichenfolge fester Länge umwandelt. Bei Bitcoin wird dafür SHA-256 verwendet. Beim Hashen eines Blockkopfs, des sogenannten Block Headers, wird SHA-256 zweimal hintereinander ausgeführt. Das Ergebnis umfasst 256 Bit und wird üblicherweise als Folge von 64 Hexadezimalzeichen dargestellt.",
                  "Zwei Eigenschaften machen Hash-Funktionen für die Blockchain unverzichtbar: Zum einen reagieren sie extrem empfindlich. Ändert man an den Ausgangsdaten nur ein einziges Zeichen, sieht der Hashwert völlig anders aus. Zum anderen läuft die Funktion praktisch nur in eine Richtung: Aus dem Hashwert lassen sich die ursprünglichen Daten nicht rekonstruieren.",
                  "Jeder Block Header enthält den Hashwert des vorherigen Block Headers. Würde jemand einen alten Block verändern, änderte sich dessen Hashwert und der Verweis im nächsten Block passte nicht mehr. Um die Veränderung zu verbergen, müssten auch alle folgenden Blöcke und die zugehörigen Arbeitsnachweise neu berechnet werden."
                ],
                "en": [
                  "The reference to the previous block is not a simple reference like a page number. It is a hash value, a digital fingerprint. A hash function is a computational procedure that converts data of any length into a fixed-length string. Bitcoin uses SHA-256 for this purpose. When hashing a block header, SHA-256 is applied twice in succession. The result consists of 256 bits and is usually displayed as a sequence of 64 hexadecimal characters.",
                  "Two properties make hash functions essential to the blockchain. First, they are extremely sensitive to changes: alter just one character in the original data, and the hash value looks completely different. Second, the function effectively works in only one direction: the original data cannot be reconstructed from the hash value.",
                  "Each block header contains the hash of the previous block header. If someone altered an old block, its hash would change, and the reference in the next block would no longer match. To conceal the change, all subsequent blocks and their associated proofs of work would also have to be recalculated."
                ]
              }
            }
          ]
        },
        {
          "kicker": "5.2",
          "title": {
            "de": "Die digitale Unterschrift: Mein Schlüssel, dein Schloss",
            "en": "The Digital Signature: My Key, Your Lock"
          },
          "text": {
            "de": [
              "Bei herkömmlichen Zahlungstransaktionen prüft die Bank, ob ein Konto über ausreichendes Guthaben verfügt und ob eine Zahlung berechtigt ist. Zur Identifikation dienen etwa PIN, Passwort oder Unterschrift. Bei Bitcoin gibt es keine Bank, die diese Prüfung übernimmt. Stattdessen kontrolliert das Netzwerk anhand digitaler Schlüssel, ob jemand über bestimmte Bitcoin verfügen darf.",
              "Wer Bitcoin halten, empfangen oder versenden möchte, muss nicht selbst Mining betreiben. Für die Nutzung werden eine Wallet („Hot“ oder „Cold“) und die zugehörigen digitalen Schlüssel benötigt. Aber auch „Self Custody“ oder ein „Custodial Wallet“ (über eine Kryptobörse) ist möglich.",
              "Beim Einrichten einer eigenen Wallet erzeugt deren Software einen privaten und einen öffentlichen Schlüssel. Der private Schlüssel wird geheim verwahrt. Bei Cold Storage bleibt er offline oder von einem vernetzten Computer abgeschirmt, etwa auf einer Hardware-Wallet. Bei einer Kryptobörse kontrolliert dagegen meist der Anbieter die Schlüssel. Die Bitcoin selbst liegen nicht in der Wallet, sondern sind als Einträge in der Blockchain verzeichnet.",
              "Mit dem privaten Schlüssel unterschreibt die Wallet eine Zahlung digital. Der öffentliche Schlüssel ermöglicht es dem Netzwerk, diese Unterschrift zu prüfen, ohne den privaten Schlüssel offenzulegen.",
              "Aus dem öffentlichen Schlüssel kann die Wallet eine öffentlich sichtbare Bitcoin-Adresse ableiten. Sie enthält weder Namen noch Anschrift. Bitcoin ist deshalb pseudonym, aber nicht anonym: Die Zahlungsbewegungen einer Adresse sind öffentlich nachvollziehbar. Wird die Adresse etwa durch eine Kryptobörse einer Person zugeordnet, können auch deren Transaktionen zugeordnet werden.",
              "Die eigene Kontrolle über die Schlüssel bringt Verantwortung mit sich. Geht der private Schlüssel verloren, bleiben die damit kontrollierten Bitcoin unzugänglich. Wird der Schlüssel gestohlen, können andere darüber verfügen. Es gibt keine Bank oder zentrale Servicestelle, die den Zugang wiederherstellen kann."
            ],
            "en": [
              "In conventional payment transactions, the bank checks whether an account has sufficient funds and whether a payment is authorized. A PIN, password, or signature may be used for identification. With Bitcoin, no bank performs this check. Instead, the network uses digital keys to verify whether someone is authorized to spend bitcoin.",
              "You do not need to mine bitcoin to hold, receive, or send it. Using Bitcoin requires a wallet, “hot” or “cold”, and the associated digital keys. Users can manage their keys themselves, known as “self-custody”, or use a “custodial wallet”, for example through a crypto exchange.",
              "When you set up your own wallet, its software generates a private key and a public key. The private key is kept secret. In “cold” storage, it remains offline or isolated from a network-connected computer, for example on a hardware wallet. On a crypto exchange, by contrast, the provider usually controls the keys. The bitcoins themselves are not stored in the wallet. They are recorded as entries in the blockchain.",
              "The wallet uses the private key to digitally sign a payment. The public key allows the network to verify this signature without revealing the private key.",
              "The wallet can derive a publicly visible Bitcoin address from the public key. This address contains neither a name nor a mailing address. Bitcoin is therefore pseudonymous, but not anonymous: the transactions associated with an address are publicly traceable. If an address is linked to a person, for example through a crypto exchange, its transactions can also be linked to that person.",
              "Controlling your own keys comes with responsibility. If a private key is lost, the bitcoins it controls remain inaccessible. If the key is stolen, others can spend them. There is no bank or central help desk that can restore access."
            ]
          },
          "deepDives": [
            {
              "tag": {
                "de": "Vertiefung",
                "en": "A Closer Look"
              },
              "title": {
                "de": "Wie ein Schlüsselpaar mathematisch funktioniert",
                "en": "The Mathematics Behind a Key Pair"
              },
              "text": {
                "de": [
                  "Die Schlüsselpaare bei Bitcoin beruhen auf einem mathematischen Verfahren namens Elliptische-Kurven-Kryptografie. Bitcoin verwendet eine bestimmte Kurve mit dem technischen Namen secp256k1. Der private Schlüssel ist eine zufällig erzeugte Zahl aus einem festgelegten Zahlenraum. In dezimaler Schreibweise kann sie bis zu 77 Stellen umfassen. Aus ihr berechnet das Verfahren den öffentlichen Schlüssel.",
                  "Diese Berechnung funktioniert praktisch wie eine Einbahnstraße: Vom privaten zum öffentlichen Schlüssel zu gelangen, ist mit wenigen Rechenschritten möglich. Den privaten Schlüssel aus dem öffentlichen Schlüssel zurückzurechnen, ist mit heutigen Computern praktisch nicht zu bewältigen. Ein ausreichend leistungsfähiger, fehlerkorrigierter Quantencomputer könnte diese Absicherung künftig gefährden. Ein solcher Computer existiert bislang jedoch nicht.",
                  "Eine digitale Unterschrift entsteht, indem der private Schlüssel mit den Daten der zu unterschreibenden Transaktion verrechnet wird. Das Ergebnis ist eine Zahlenfolge, die mathematisch an diese Transaktion gebunden ist. Für klassische Bitcoin-Transaktionen wird dazu ECDSA verwendet, der Elliptic Curve Digital Signature Algorithm. Bei Taproot-Transaktionen kommen außerdem Schnorr-Signaturen zum Einsatz. Aus dem öffentlichen Schlüssel kann schließlich eine Bitcoin-Adresse abgeleitet werden – eine kürzere Zeichenfolge, die andere verwenden können, um Bitcoin an diese Adresse zu senden."
                ],
                "en": [
                  "Bitcoin key pairs are based on a mathematical method called elliptic curve cryptography. Bitcoin uses a particular curve known by the technical name secp256k1. The private key is a randomly generated number within a specified range. Written in decimal notation, it can be up to 78 digits long. The method calculates the public key from this number.",
                  "This calculation effectively works like a one-way street: deriving the public key from the private key requires relatively little computation. Working backward to calculate the private key from the public key is practically impossible with today’s computers. A sufficiently powerful, error-corrected quantum computer could threaten this protection in the future. No such computer exists yet.",
                  "A digital signature is created by mathematically combining the private key with the data of the transaction being signed. The result is a sequence of numbers mathematically bound to that transaction. Traditional Bitcoin transactions use ECDSA, the Elliptic Curve Digital Signature Algorithm. Taproot transactions use Schnorr signatures. A Bitcoin address can be derived from the public key, a shorter string of characters that others can use to send bitcoin to that address."
                ]
              }
            }
          ]
        },
        {
          "kicker": "5.3",
          "title": {
            "de": "Die Einigung durch Rechenarbeit – Mining: Wettbewerb um den nächsten Block",
            "en": "Reaching Agreement Through Computational Work – Mining: Competing to Add the Next Block"
          },
          "text": {
            "de": [
              "Die Nodes können prüfen, ob eine Transaktion die Regeln des Bitcoin-Systems erfüllt. Doch eine weitere Frage bleibt: Wer stellt den nächsten Block zusammen und legt damit die Reihenfolge neuer Transaktionen in der Blockchain fest?",
              "Hier kommt das Bitcoin-Mining ins Spiel. Miner wählen ausstehende Transaktionen aus und fassen sie zu möglichen neuen Blöcken zusammen. Spezialisierte Rechner treten anschließend ununterbrochen in einem Wettbewerb gegeneinander an. Sie führen enorme Mengen von Rechenversuchen durch, bis einer von ihnen ein Ergebnis findet, das die vorgegebenen Bedingungen erfüllt.",
              "Wer ein solches Ergebnis zuerst findet, übermittelt seinen Block an das Netzwerk. Die Nodes prüfen unabhängig voneinander, ob der Block und der dafür erbrachte Arbeitsnachweis den Regeln entsprechen. Ist das der Fall, nehmen sie ihn in ihre Blockchain auf.",
              "Dieses Verfahren heißt Proof-of-Work – oder Arbeitsnachweis. Ein gültiges Ergebnis zu finden, erfordert sehr viele Versuche. Es zu überprüfen, benötigt dagegen nur wenig Rechenaufwand.",
              "Die Einnahmen des erfolgreichen Miners oder Mining-Pools bestehen aus zwei Teilen: den mit dem Block neu ausgegebenen Bitcoin und den Transaktionsgebühren der darin enthaltenen Zahlungen. Danach beginnt der Wettbewerb um den nächsten Block."
            ],
            "en": [
              "Nodes can check whether a transaction complies with the rules of the Bitcoin system. But another question remains: who assembles the next block and thereby determines the order of new transactions in the blockchain?",
              "This is where Bitcoin mining comes in. Miners select pending transactions and group them into potential new blocks. Specialized computers then compete continuously, performing enormous numbers of computational attempts until one finds a result that meets the required conditions.",
              "The first miner to find such a result sends its block to the network. The nodes independently check whether the block and its proof of work comply with the rules. If they do, the nodes add the block to their copies of the blockchain.",
              "This process is called proof of work. Finding a valid result requires a vast number of attempts. Checking it, however, takes very little computation.",
              "The successful miner’s or mining pool’s revenue consists of two parts: the new bitcoin issued with the block and the transaction fees from the payments it contains. The competition to add the next block then begins."
            ]
          },
          "deepDives": [
            {
              "tag": {
                "de": "Vertiefung 1",
                "en": "A Closer Look 1"
              },
              "title": {
                "de": "Was die Miner genau berechnen – Nonce und Zielwert",
                "en": "What Miners Actually Calculate – Nonce and Target"
              },
              "text": {
                "de": [
                  "Miner berechnen den Hashwert des Block Headers, indem sie SHA-256 zweimal hintereinander ausführen. Der Block Header enthält unter anderem einen zusammenfassenden Hashwert der Transaktionen, den Hashwert des vorherigen Blocks, einen Zeitstempel, den Zielwert und die Nonce. Das Ergebnis der Hashberechnung ist eine 256-Bit-Zahl. Sie muss kleiner oder gleich dem vorgegebenen Zielwert sein.",
                  "Die Nonce, von englisch „number used once“, ist ein 32-Bit-Feld im Block Header, das die Miner verändern können. Jede Veränderung erzeugt einen anderen Hashwert. Ist der mögliche Wertebereich der Nonce ausgeschöpft, verändern die Miner weitere Daten des Blockkandidaten, etwa eine zusätzliche Zahl, die sogenannte ExtraNonce, in der Coinbase-Transaktion. Dadurch ändert sich der zusammenfassende Hashwert der Transaktionen, und die Suche kann mit neuen Block-Headern fortgesetzt werden. Die Mining-Geräte prüfen so Milliarden oder Billionen von Varianten pro Sekunde, bis zufällig ein gültiger Hashwert entsteht."
                ],
                "en": [
                  "Miners calculate the hash of the block header by applying SHA-256 twice in succession. Among other things, the block header contains a hash summarizing the transactions, the hash of the previous block, a timestamp, the target, and the nonce. The result of the hash calculation is a 256-bit number. It must be less than or equal to the specified target.",
                  "The nonce, short for “number used once”, is a 32-bit field in the block header that miners can change. Each change produces a different hash value. Once all possible nonce values have been tried, miners change other data in the candidate block, such as an additional number called the extraNonce in the coinbase transaction. This changes the hash summarizing the transactions, allowing the search to continue with new block headers. Mining devices test billions or trillions of variations per second until a valid hash is found by chance."
                ]
              }
            },
            {
              "tag": {
                "de": "Vertiefung 2",
                "en": "A Closer Look 2"
              },
              "title": {
                "de": "Wie sich die Schwierigkeit an die Rechenleistung anpasst – Difficulty Adjustment",
                "en": "How Difficulty Adapts to Computing Power – Difficulty Adjustment"
              },
              "text": {
                "de": [
                  "Das Bitcoin-System ist so eingerichtet, dass durchschnittlich etwa alle zehn Minuten ein neuer Block entsteht. Alle 2016 Blöcke, rechnerisch etwa zwei Wochen, wird nach festgelegten Regeln ermittelt, wie lange die Erzeugung der letzten 2016 Blöcke gedauert hat. Ging es schneller als vorgesehen, wird der Zielwert abgesenkt und die Aufgabe schwieriger. Dauerte es länger, wird der Zielwert angehoben und die Aufgabe leichter. Dieser Mechanismus heißt Difficulty Adjustment. Er sorgt nicht dafür, dass jeder einzelne Block nach genau zehn Minuten entsteht, sondern hält den langfristigen Durchschnitt in der Nähe dieses Werts."
                ],
                "en": [
                  "The Bitcoin system is designed to produce a new block approximately every ten minutes on average. Every 2,016 blocks, roughly every two weeks, the time taken to produce the preceding 2,016 blocks is assessed according to fixed rules. If they were produced faster than intended, the target is lowered, making the task harder. If they took longer, the target is raised, making the task easier. This mechanism is called difficulty adjustment. It does not ensure that each individual block takes exactly ten minutes; instead, it keeps the long-term average close to that interval."
                ]
              }
            },
            {
              "tag": {
                "de": "Vertiefung 3",
                "en": "A Closer Look 3"
              },
              "title": {
                "de": "Wie die Ausgabe neuer Bitcoin festgelegt ist – Block Subsidy und Halving",
                "en": "How the Issuance of New Bitcoin Is Determined – Block Subsidy and Halving"
              },
              "text": {
                "de": [
                  "Die Menge der neu erzeugten Bitcoin, die ein Miner für einen gefundenen Block beanspruchen darf, ist im Bitcoin-System festgelegt. Dieser Teil der Belohnung heißt Block Subsidy. Hinzu kommen die Transaktionsgebühren, deren Höhe nicht fest vorgegeben ist.",
                  "Alle 210.000 Blöcke, etwa alle vier Jahre, wird die Block Subsidy halbiert. Als Bitcoin 2009 startete, lag sie bei 50 Bitcoin pro Block. 2012 sank sie auf 25, 2016 auf 12,5, 2020 auf 6,25 und 2024 auf 3,125 Bitcoin. Dadurch ist in den Regeln festgelegt, dass insgesamt nie mehr als knapp 21 Millionen Bitcoin erzeugt werden."
                ],
                "en": [
                  "The Bitcoin system specifies the amount of newly created bitcoin that a miner may claim for finding a block. This part of the reward is called the block subsidy. Transaction fees are added to it, and their amounts are not fixed.",
                  "Every 210,000 blocks, approximately every four years, the block subsidy is cut in half. When Bitcoin launched in 2009, it was 50 bitcoin per block. It fell to 25 in 2012, 12.5 in 2016, 6.25 in 2020, and 3.125 in 2024. Under these rules, the total amount of bitcoin that can ever be created is capped at just under 21 million."
                ]
              }
            }
          ]
        },
        {
          "kicker": "5.4",
          "title": {
            "de": "Die Kette wächst: Sicherheit durch Anhäufung",
            "en": "The Chain Grows: Security Through Accumulated Work"
          },
          "text": {
            "de": [
              "Die Rechenarbeit des Minings bestimmt nicht nur, wie neue Blöcke entstehen. Sie trägt zugleich dazu bei, bereits eingetragene Transaktionen zu sichern.",
              "Jeder neue Block baut auf dem vorherigen auf. Wer eine ältere Transaktion nachträglich verändern wollte, müsste deshalb eine abweichende Blockchain erzeugen. Dafür müssten der betroffene Block und alle darauffolgenden Blöcke mitsamt ihren Arbeitsnachweisen neu berechnet werden, während das übrige Netzwerk die gültige Blockchain weiter verlängert.",
              "Jeder weitere Block gilt deshalb als zusätzliche Bestätigung der früheren Transaktionen. Je tiefer ein Eintrag in der Blockchain liegt, desto mehr Rechenarbeit hat sich seitdem über ihm angesammelt und desto aufwendiger wäre eine nachträgliche Veränderung.",
              "An die Stelle einer zentralen Buchungsstelle treten bei Bitcoin somit gemeinsame Regeln, kryptografische Prüfungen und öffentlich überprüfbare Arbeitsnachweise. Eine bereits bestätigte Zahlung kann daher nicht von einer zentralen Stelle zurückgebucht werden. Bei einer Fehlüberweisung müsste die empfangende Person die Bitcoin in einer neuen Transaktion zurücksenden."
            ],
            "en": [
              "The computational work of mining does more than determine how new blocks are created. It also helps secure transactions already recorded in the blockchain.",
              "Each new block builds on the previous one. Anyone attempting to alter an earlier transaction would therefore have to create an alternative blockchain. This would require recalculating the affected block and every subsequent block, together with their proofs of work, while the rest of the network continued to extend the valid blockchain.",
              "Each additional block therefore counts as another confirmation of earlier transactions. The deeper an entry lies in the blockchain, the more computational work has accumulated on top of it, and the more work would be required to change it retroactively.",
              "Bitcoin thus replaces a central recordkeeping authority with shared rules, cryptographic checks, and publicly verifiable proofs of work. A confirmed payment cannot be reversed by a central authority. If bitcoin is sent by mistake, the recipient would have to return it in a new transaction."
            ]
          },
          "deepDives": []
        }
      ]
    },
    {
      "type": "monitors",
      "id": "muenze-live",
      "draft": true,
      "kicker": {
        "de": "Die „Münze“ · 4 Monitore",
        "en": ""
      },
      "title": {
        "de": "Bitcoin live",
        "en": "Bitcoin live"
      },
      "items": [
        {
          "title": {
            "de": "Das lebende Netzwerk",
            "en": ""
          },
          "ref": {
            "de": "zu Kapitel 1",
            "en": ""
          },
          "text": {
            "de": "Eine Live-Karte der vielen Rechner (Nodes) weltweit, kein Zentrum. Macht sichtbar, dass Tausende unabhängige Rechner dieselbe Geschichte führen.",
            "en": ""
          },
          "links": [
            "https://timechainmap.com/map/",
            "https://bitref.com/nodes/map/"
          ]
        },
        {
          "title": {
            "de": "Echte Transaktionen",
            "en": ""
          },
          "ref": {
            "de": "zu Kapitel 2",
            "en": ""
          },
          "text": {
            "de": "Eine reale Transaktion aus der Kette, seziert: Absender-Adresse, Empfänger-Adresse, Betrag, ein Häkchen für die geprüfte Unterschrift.",
            "en": ""
          },
          "links": [
            "https://www.blockchain.com/de/explorer/mempool/btc"
          ]
        },
        {
          "title": {
            "de": "Der Mempool live",
            "en": ""
          },
          "ref": {
            "de": "zu Kapitel 3",
            "en": ""
          },
          "text": {
            "de": "Der Wartebereich in echt. Ausstehende Transaktionen sammeln sich, werden zu Blöcken gebündelt, ein Block wird gefunden.",
            "en": ""
          },
          "links": [
            "https://mempool.space/de/mempool-block/0"
          ]
        },
        {
          "title": {
            "de": "Die wachsende Kette + Knappheit",
            "en": ""
          },
          "ref": {
            "de": "zu Kapitel 4",
            "en": ""
          },
          "text": {
            "de": "Oben die Blockhöhe live, alle rund zehn Minuten rastet ein neuer Block ein. Darunter die Knappheits-Geschichte: die Halving-Treppe (50, 25, 12,5, 6,25, 3,125) und die Grenze von knapp 21 Millionen.",
            "en": ""
          },
          "links": [
            "https://bitcoin.now/bitcoin-supply"
          ]
        }
      ],
      "hidden": true
    },
    {
      "type": "catalog",
      "id": "mining-geraete",
      "station": "bitcoin",
      "eyebrow": {
        "de": "5.5",
        "en": "5.5"
      },
      "title": {
        "de": "Bitcoin-Mining-Geräte",
        "en": "Bitcoin Mining Hardware"
      },
      "text": {
        "de": [
          "Bitcoin-Mining-Geräte sind spezialisierte Computer, die ununterbrochen Hashwerte von möglichen Block Headern berechnen. Im Inneren arbeiten hochspezialisierte Chips aus Silizium. Auf ihnen befinden sich Milliarden winziger elektronischer Schalter, die mit den Zuständen 0 und 1 rechnen.",
          "Über Software und das Internet sind die Mining-Geräte mit dem Bitcoin-Netzwerk oder einem Mining-Pool verbunden. 2009 konnten Bitcoin noch mit dem Prozessor eines gewöhnlichen Computers geschürft werden. Ab 2010 kamen leistungsfähigere Grafikkarten zum Einsatz; 2011/12 folgten programmierbare Spezialchips, sogenannte FPGAs.",
          "Eine entscheidende Zäsur begann 2013 mit den ASICs: Chips, die eigens für die von Bitcoin verwendeten SHA-256-Berechnungen entwickelt wurden. Sie waren wesentlich schneller und effizienter, aber auch teurer. Damit wurde Mining auf Heimcomputern zunehmend unrentabel.",
          "Schon zuvor wurde Mining auch gewinnorientiert betrieben. Mit den ASICs entwickelte es sich jedoch zunehmend zu einem industriellen Geschäft. Seit etwa 2013/14 betreiben Unternehmen große Anlagen mit Tausenden Geräten, aufwendiger Kühlung und möglichst günstigem Strom. Viele Miner schließen sich außerdem zu Mining-Pools zusammen. Aus einem zunächst dezentralen Experiment wurde so ein kapitalintensiver, globaler Wettbewerb um Einnahmen aus Blocksubventionen und Transaktionsgebühren."
        ],
        "en": [
          "Bitcoin mining devices are specialized computers that continuously calculate hashes of potential block headers. Inside them are highly specialized silicon chips containing billions of tiny electronic switches that perform calculations using the states 0 and 1.",
          "Through software and the internet, mining devices connect to the Bitcoin network or a mining pool. In 2009, bitcoin could still be mined using the processor of an ordinary computer. More powerful graphics cards began to be used in 2010, followed in 2011–2012 by programmable chips known as FPGAs.",
          "A major turning point came in 2013 with ASICs: chips designed specifically for the SHA-256 calculations used by Bitcoin. They were much faster and more efficient, but also more expensive. This made mining with home computers increasingly unprofitable.",
          "Mining had already been pursued for profit before then. With the introduction of ASICs, however, it increasingly became an industrial business. Since around 2013–2014, companies have operated large facilities with thousands of devices, extensive cooling systems, and access to electricity at the lowest possible cost. Many miners also join mining pools. What began as a decentralized experiment thus became a capital-intensive global competition for revenue from block subsidies and transaction fees."
        ]
      },
      "groups": [
        {
          "title": {
            "de": "Mining-Geräte in der Gläsernen Münze",
            "en": "Mining devices in the Transparent Coin"
          },
          "items": [
            {
              "kicker": "01",
              "title": {
                "de": "QAxe",
                "en": "QAxe"
              },
              "museumLabel": {
                "de": [
                  "Gläserne Münze I",
                  "2024, off. Entwurf von „Pmaxuw“ (Pseudonym)"
                ],
                "en": [
                  "Transparent Coin I",
                  "2024, open-source design by “Pmaxuw” (pseudonym)"
                ]
              },
              "museumDetails": {
                "de": [
                  "Zusammenbau: „Pmaxuw“ (Pseudonym)",
                  "Leihgeber: „WantClue” (Pseudonym)"
                ],
                "en": [
                  "Assembled by: “Pmaxuw” (pseudonym)",
                  "Lender: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": null,
              "text": {
                "de": [
                  "Auf diesem Gerät befinden sich erstmals vier ASIC-Chips auf einer Platine, die zusammen rund 2,4 Billionen Rechenoperationen pro Sekunde ausführen. Bis zu diesem Zeitpunkt trugen die open source, also offene Geräte je einen einzigen Chip. Mehrere Chips zu betreiben ist keine Frage des Nebeneinandersetzens: Sie müssen gemeinsam mit Strom versorgt, gekühlt und in der richtigen Reihenfolge angesteuert werden. Statt fünf Volt setzt dieses Gerät auf zwölf Volt aus einem eigenen Netzteil. Ein kleiner Steuerchip auf der Platine übernimmt die Verwaltung, während die Rechenaufgaben selbst noch von einem angeschlossenen Computer geliefert werden. Erst spätere Geräte wurden davon unabhängig.",
                  "Zeitgleich dazu verfolgte das Projekt zum Bitaxe Ultra Hex 301 den gleichen Gedanken. Es wurden somit zwei Antworten auf dieselbe Frage in derselben offenen Gemeinschaft entwickelt. Aus dieser Platine ging später der NerdQAxe hervor, einer der meistgebauten offenen Miner überhaupt."
                ],
                "en": [
                  "For the first time, this device brings together four ASIC chips on a single circuit board, performing around 2.4 trillion calculations per second. Until then, open-source devices had each used just one chip. Operating multiple chips involves more than placing them side by side: they need a coordinated power supply, cooling, and control signals in the correct sequence. Instead of five volts, this device uses twelve volts from a dedicated power supply. A small controller chip on the board manages the device, while a connected computer still supplies the computational tasks. Only later devices became independent of an external computer.",
                  "Simultaneously, the Bitaxe Ultra Hex 301 project pursued a similar idea. Two answers to the same question were thus developed within the same open-source community. This circuit board later evolved into the NerdQAxe, one of the most widely built open-source miners."
                ]
              },
              "nr": "I"
            },
            {
              "kicker": "02",
              "title": {
                "de": "BitForge Nano (IIa mit, IIb ohne Kühlkörper)",
                "en": "BitForge Nano (IIa with heat sink, IIb without heat sink)"
              },
              "museumLabel": {
                "de": [
                  "Gläserne Münze IIa & IIb",
                  "2025, off. Entwurf von „WantClue” (Pseudonym) und „kliA90“ (Pseudonym)"
                ],
                "en": [
                  "Transparent Coin IIa & IIb",
                  "2025, open-source design by “WantClue” (pseudonym) and “kliA90” (pseudonym)"
                ]
              },
              "museumDetails": {
                "de": [
                  "Zusammenbau: DTV Electronics",
                  "Leihgeber: „WantClue” (Pseudonym)"
                ],
                "en": [
                  "Assembled by: DTV Electronics",
                  "Lender: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": null,
              "text": {
                "de": [
                  "Der BitForge Nano wurde explizit als Bitcoin-Miner für zu Hause entwickelt. Er besitzt zwei ASIC-Chips, die rund 2,6 Billionen Rechenoperationen pro Sekunde rechnen, einen 12 Volt Eingang und ein Gehäuse.",
                  "Alle übrigen offenen Miner dieser Ausstellung zeigen, was sie sind: nackte Platinen, sichtbare Kühlkörper, blinkende Anzeigen. Dieses Gerät hingegen verbirgt seine Technik. Es hat kein Display und wird über den Browser oder eine App eingerichtet. Der Bitforge Nano ist dafür gemacht, in einer Wohnung dauerhaft zu laufen, ohne dabei aufzufallen. Damit ergab sich ein Wendepunkt: Die offene Mining-Szene begann, nicht nur an Schaltungen zu arbeiten, sondern auch an der visuellen Gestaltung der Geräte. Eine Sonderausführung dieses Modells, die Ghost Edition, die Aluminiumgehäuse und Rauchglasfenster besitzt, wurde 2026 bei den London Design Awards mit Silber ausgezeichnet. Gestaltet wurde sie von Duncan Coombe, wobei „WantClue“ und „kliA90“ mitwirkten.",
                  "Das Gerät ist Open Source: Schaltpläne und Firmware stehen unter einer Lizenz, die jede Weitergabe zur erneuten Offenlegung verpflichtet."
                ],
                "en": [
                  "The BitForge Nano was designed specifically as a Bitcoin miner for home use. It has two ASIC chips that perform around 2.6 trillion calculations per second, a 12-volt power input, and an enclosure.",
                  "All the other open-source miners in this exhibition reveal what they are: bare circuit boards, visible heat sinks, and blinking indicators. This device, however, conceals its technology. It has no display and is configured through a web browser or an app. The BitForge Nano is designed to run continuously in a home without drawing attention to itself. This marked a turning point: the open-source mining community began working on the visual design of its devices as well as their circuitry. A special version of this model, the Ghost Edition, with an aluminum enclosure and a smoked-glass window, received a silver award at the 2026 London Design Awards. It was designed by Duncan Coombe, with contributions from “WantClue” and “kliA90.”",
                  "The device is open source: its circuit diagrams and firmware are available under a license that requires any redistribution to be accompanied by a re-disclosure."
                ]
              },
              "nr": "IIa & IIb"
            },
            {
              "kicker": "03",
              "title": {
                "de": "ASIC Chip BM1370",
                "en": "BM1370 ASIC chip"
              },
              "museumLabel": {
                "de": [
                  "Gläserne Münze III",
                  "Volksrepublik China, ASIC Chip BM1370 (Application Specific Integrated Circuit, 5-nm Fertigung)",
                  "2024, Bitmain Technologies"
                ],
                "en": [
                  "Transparent Coin III",
                  "People’s Republic of China",
                  "BM1370 ASIC chip (Application-Specific Integrated Circuit, 5 nm manufacturing process)",
                  "2024, Bitmain Technologies"
                ]
              },
              "museumDetails": {
                "de": [
                  "Leihgeber: „WantClue” (Pseudonym)"
                ],
                "en": [
                  "Lender: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": null,
              "text": {
                "de": [
                  "Der ASIC Chip BM1370 ist ein anwendungsspezifischer Chip, der nur eine einzige Rechenoperation ausführen kann. Diese dient dazu, einen sogenannten Block zu vervollständigen, um mit Bitcoin belohnt zu werden. Eine solche Rechenoperation wird ca. eine Billion Mal pro Sekunde durchgeführt. Der Chip steckt beispielsweise in den Maschinen der industriellen Rechenzentren. Sie schürfen heute den Großteil aller neuen Bitcoin: zu Hunderten in einer Maschine, zu Zehntausenden in einer Halle.",
                  "2013 leistete ein vergleichbarer Chip ein Zwanzigstel bei gleichem Stromverbrauch. Dieser Innovationswettlauf innerhalb der Chip-Industrie und die Kommerzialisierung des Bitcoin-Systems hat das Bitcoin-Mining aus dem Wohnzimmer in die Industrie verlagert.",
                  "Über den technischen Aufbau des verwendeten Chips der Herstellerfirma Bitmain ist nichts bekannt, es handelt sich um geschütztes Firmeneigentum. Wer diesen Chip für den Bau eines offenen Miners verwenden wollte, musste erst herausfinden, wie man mit ihm kommunizieren kann."
                ],
                "en": [
                  "The BM1370 ASIC chip is an application-specific chip capable of performing only one type of calculation. This calculation is used to complete a block and earn a Bitcoin reward. The chip performs around one trillion times per second. Chips like these are used in machines at industrial mining facilities, which now mine the vast majority of new bitcoin: hundreds of chips in a single machine, tens of thousands in a single building.",
                  "In 2013, a comparable chip delivered one-twentieth of this performance while consuming the same amount of electricity. This race for innovation within the chip industry, together with the commercialization of the Bitcoin system, moved Bitcoin mining from living rooms into industrial facilities.",
                  "The technical architecture of this chip, made by Bitmain, is undisclosed proprietary information. Anyone wishing to use it to build an open-source miner first had to work out how to communicate with it."
                ]
              },
              "nr": "III"
            },
            {
              "kicker": "04",
              "title": {
                "de": "NerdNOS",
                "en": "NerdNOS"
              },
              "museumLabel": {
                "de": [
                  "Gläserne Münze IV",
                  "OSMU-Gemeinschaft (Open Source Miners United, weltweit)"
                ],
                "en": [
                  "Transparent Coin IV",
                  "OSMU community (Open Source Miners United, worldwide)"
                ]
              },
              "museumDetails": {
                "de": [
                  "2024, off. Entwurf von Benjamin Wilson, „Pmaxuw” (Pseudonym) und „WantClue“ (Pseudonym)",
                  "Zusammenbau und Leihgeber: „WantClue“ (Pseudonym)"
                ],
                "en": [
                  "2024, open-source design by Benjamin Wilson, “Pmaxuw” (pseudonym), and “WantClue” (pseudonym)",
                  "Assembled and lent by: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": null,
              "text": {
                "de": [
                  "Der NerdNOS besteht aus zwei aufeinandergesteckten Platinen. Die Platine mit dem Display ist ein NerdMiner – ein Lerngerät mit buntem Display, das zwar mitrechnet, aber so langsam, dass es nur der reinen Anschauung dient.",
                  "Die zweite Platine trägt einen echten ASIC-Chip und wird so mit einem Handgriff ressourcensparend zu einem Miner, der rund eine Million Mal schneller rechnen kann und nur eine WLAN-Verbindung benötigt. Damit ein gewöhnliches USB-Ladegerät zur Stromversorgung genügt, ist der Chip gezielt in seiner Leistung auf unter acht Watt gedrosselt. Genau so hat Bitcoin-Mining vor über zehn Jahren begonnen – mit einem Stecker in einer USB-Buchse."
                ],
                "en": [
                  "The NerdNOS consists of two circuit boards plugged into one another. The board with the screen is a NerdMiner — an educational device with a colorful display. It participates in mining calculations but does so at such a slow rate that it serves purely as a demonstration.",
                  "The second board carries an actual ASIC chip. Simply plugging it in transforms the educational device into a miner that makes efficient use of existing hardware, performs calculations around a million times faster, and needs only a Wi-Fi connection. The chip’s power consumption is deliberately limited to less than eight watts, allowing an ordinary USB charger to supply power. This recalls the early days of ASIC mining more than ten years ago, when small mining devices could simply be plugged into a USB port."
                ]
              },
              "nr": "IV"
            },
            {
              "kicker": "05",
              "title": {
                "de": "Bitfury BF1 „Red Fury”",
                "en": "Bitfury BF1 “Red Fury”"
              },
              "museumLabel": {
                "de": [
                  "Gläserne Münze V",
                  "Vereinigte Staaten von Amerika, Bitfury BF1 „Red Fury”",
                  "2013, Chip: Bitfury (55 nm), Platine: Big Picture Mining Company"
                ],
                "en": [
                  "Transparent Coin V",
                  "United States of America",
                  "Bitfury BF1 “Red Fury”",
                  "2013, chip: Bitfury (55 nm); circuit board: Big Picture Mining Company"
                ]
              },
              "museumDetails": {
                "de": [
                  "Leihgeber: „WantClue” (Pseudonym)"
                ],
                "en": [
                  "Lender: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": null,
              "text": {
                "de": [
                  "Als 2009 der Bitcoin entstand, konnte ihn jeder gewöhnliche Computer schürfen. Innerhalb weniger Jahre wurden diese Computer von spezialisierten Chips (ASICs) abgelöst, die nur noch eine einzige Rechenaufgabe beherrschten. Der Red Fury gehört zur ersten Generation jener Chips, die auch von Privatpersonen gekauft werden konnten.",
                  "Dieser Stick wurde lediglich in eine USB-Buchse gesteckt und verbrauchte nur 2,5 Watt – weniger als eine Nachttischlampe. Rechnen konnte dieser aber nicht von allein: Ein angeschlossener Computer musste ihn mit Aufgaben versorgen. Der reihenweise Betrieb der USB-Sticks produzierte Abwärme, sodass sie extra gekühlt werden mussten. 2013 kostete dieser Stick rund 100 US-Dollar und war für kurze Zeit eines der schnellsten Geräte seiner Art. Zum Vergleich: Der 12 Jahre später gebaute ASIC Chip BM1370 rechnet ca. 1200-Mal schneller. Der Red Fury ist ein geschlossenes Produkt: das heißt, Chip und Bauplan sind geschütztes Firmeneigentum. Dies rief die ersten Open-Source-Gegenentwürfe der offenen Mining-Szene hervor."
                ],
                "en": [
                  "When Bitcoin launched in 2009, any ordinary computer could mine it. Within a few years, these computers were superseded by specialized chips known as ASICs, which could perform only one type of computational task. The Red Fury belongs to the first generation of ASIC mining devices available for purchase by private individuals.",
                  "This USB stick simply plugs into a USB port and consumes just 2.5 watts, which is less than a bedside lamp. However, it could not perform its calculations independently: a connected computer had to supply tasks. Running groups of these USB sticks generated heat, making additional cooling necessary. In 2013, this stick cost around US$100 and was briefly one of the fastest devices of its kind. By comparison, the BM1370 ASIC chip, made twelve years later, performs calculations around 1,200 times faster. The Red Fury is a closed-source product: both the chip and the circuit board design are proprietary. This prompted the open-source mining community to develop its first alternatives."
                ]
              },
              "nr": "V"
            }
          ]
        },
        {
          "title": {
            "de": "Mining-Geräte auf dem Sockel",
            "en": "Mining devices on the pedestal"
          },
          "items": [
            {
              "kicker": "06",
              "title": {
                "de": "BitChimney mit Antminer-S19j-Pro_Hashboard",
                "en": "BitChimney with Antminer S19j Pro hashboard"
              },
              "museumLabel": {
                "de": [
                  "Sockel links",
                  "Vereinigte Staaten von Amerika",
                  "ab 2024"
                ],
                "en": [
                  "Left Pedestal",
                  "United States of America",
                  "BitChimney with Antminer S19j Pro hashboard",
                  "2024 onward"
                ]
              },
              "museumDetails": {
                "de": [
                  "Gehäuseentwurf: Altair Technology, Vereinigte Staaten von Amerika (Creative Commons, nichtkommerziell)",
                  "Leihgeber: „WantClue“ (Pseudonym)"
                ],
                "en": [
                  "Enclosure design: Altair Technology, United States of America (Creative Commons, noncommercial)",
                  "Lender: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": {
                "de": "Ein Ofen, der rechnet.",
                "en": "A heater that computes."
              },
              "text": {
                "de": [
                  "Im Inneren des BitChimneys steckt eine einzelne Rechenplatine aus einem industriellen Bitcoin-Miner (S19j Pro). Auf dieser sitzen drei Platinen nebeneinander in einem Gehäuse – in industriellen Rechenzentren stehen tausende solcher Miner nebeneinander. Werden diese Geräte ausgemustert, kommt es oft zum Verkauf einzelner Bauteile. Dadurch erhalten sie beispielsweise im BitChimney ein zweites Leben. Die Energie, die der Miner verbraucht, wird fast vollkommen in Wärme umgewandelt und strömt aus dem oberen „Kamin“. Ein handelsüblicher Heizlüfter hätte mit diesen knapp 650 Watt im selben Raum auch Wärme produziert – nur mit dem Unterschied, dass der BitChimney als Nebenprodukt zur Wärme auch Bitcoin schürfen kann. Ob dies ein idealer Umgang mit Strom oder eine geschickte Rechtfertigung ist, wird kontrovers diskutiert."
                ],
                "en": [
                  "Inside the BitChimney is a single computing board, known as a hashboard, taken from an industrial Bitcoin miner, the S19j Pro. In the original miner, three of these boards sit side by side in one enclosure; industrial mining facilities house thousands of such machines. When these devices are retired, their individual components are often sold, giving them a second life in devices such as the BitChimney. Almost all the electricity consumed by the miner is converted into heat, which flows out through the “chimney” at the top. A conventional fan heater consuming the same 650 watts would also have heated the room, just not mining bitcoin at the same time. Whether this is an ideal use of electricity or a clever justification for consuming energy remains a subject of debate."
                ]
              },
              "nr": null
            },
            {
              "kicker": "07",
              "title": {
                "de": "Bitaxe Ultra Hex 301, 2024",
                "en": "Bitaxe Ultra Hex 301, 2024"
              },
              "museumLabel": {
                "de": [
                  "Sockel Mitte",
                  "OSMU-Gemeinschaft (Open Source Miners United, Vereinigte Staaten von Amerika)"
                ],
                "en": [
                  "Center Pedestal",
                  "OSMU community (Open Source Miners United, United States of America)",
                  "Bitaxe Ultra Hex 301, 2024"
                ]
              },
              "museumDetails": {
                "de": [
                  "off. Entwurf von „Skot” (Pseudonym) und „macphyter” (Pseudonym)",
                  "Zusammenbau: OSMU, Vereinigte Staaten von Amerika",
                  "Leihgeber: „WantClue” (Pseudonym)"
                ],
                "en": [
                  "Open-source design by “Skot” (pseudonym) and “macphyter” (pseudonym)",
                  "Assembled by: OSMU, United States of America",
                  "Lender: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": null,
              "text": {
                "de": [
                  "Der Bitaxe Ultra Hex 301 besteht aus sechs ASIC-Chips auf einer Platine und ist das erste Mehrchip-Gerät aus der Bitaxe-Reihe.",
                  "Hier sind es zwei Gruppen zu je drei Chips, die mit zwölf Volt versorgt werden. Sie sind an ein Netzteil angeschlossen, was sechs Rechenwerke versorgt, statt an sechs einzelne Netzteile.",
                  "Was in den industriellen Maschinen längst Serienstand war, kam damit erstmals in einem offenen, dokumentierten Entwurf an. Unabhängig davon verfolgte parallel ein anderes Mitglied der Entwicklergemeinschaft das gleiche Konzept mit dem QAxe.",
                  "Gegen die industriellen Rechenzentren, die heute den Großteil des Schürfens von Bitcoin übernehmen, haben diese Geräte rechnerisch kaum eine Chance. Es gibt jedoch Ausnahmen: Erst im Juli 2026 hat ein Bitaxe den Block 957.382 der Bitcoin-Blockchain hinzugefügt."
                ],
                "en": [
                  "The Bitaxe Ultra Hex 301 has six ASIC chips on a single circuit board and is the first multichip device in the Bitaxe series.",
                  "The chips are arranged in two groups of three, supplied with twelve volts. A single power supply serves all six chips, replacing six separate power supplies.",
                  "A feature that had long been standard in industrial machines thus appeared for the first time in an openly documented design. Independently, another member of the developer community was pursuing the same concept as QAxe.",
                  "In terms of computing power, these devices stand little chance against the industrial mining facilities that now account for most Bitcoin mining. There are exceptions, however: as recently as July 2026, a Bitaxe added block 957,382 to the Bitcoin blockchain."
                ]
              },
              "nr": null
            },
            {
              "kicker": "08",
              "title": {
                "de": "Antminer S19",
                "en": "Antminer S19"
              },
              "museumLabel": {
                "de": [
                  "Sockel rechts",
                  "Volksrepublik China",
                  "2020"
                ],
                "en": [
                  "Right Pedestal",
                  "People’s Republic of China",
                  "Antminer S19",
                  "2020"
                ]
              },
              "museumDetails": {
                "de": [
                  "Bitmain Technologies",
                  "Leihgeber: „WantClue” (Pseudonym)"
                ],
                "en": [
                  "Bitmain Technologies",
                  "Lender: “WantClue” (pseudonym)"
                ]
              },
              "storyTitle": null,
              "text": {
                "de": [
                  "Der Antminer S19 führt 95 Billionen Rechenoperationen pro Sekunde durch bei einem Strombedarf von 3.250 Watt. Er kann insgesamt bis zu 16 kg (je nach Ausstattung mit Dashboards) wiegen und ist mit einer Lautstärke von 75 Dezibel lauter als ein Staubsauger. Das Gerät ist für den Dauerbetrieb vorgesehen, weshalb es nicht im Wohnzimmer, sondern in Hallen, zwischen Tausenden baugleicher Geräte, aufgestellt werden sollte. Abgeschaltet wird der Antminer nur, wenn er sich wirtschaftlich nicht mehr rechnet.",
                  "Alle kleineren, in dieser Ausstellung präsentierten Geräte stammen von ihm ab: Ihre Chips wurden aus ausgemusterten Maschinen wie dieser aufgelötet. Weil es sich um ein kommerzielles Produkt handelte, waren keinerlei Daten über diese Maschinen veröffentlicht. So war es notwendig, die Ansteuerung der Chips zunächst rückzuentwickeln. Selbst die Anzahl an Chips pro Platine musste nachgezählt werden.",
                  "Als 2020 der Antminer S19 erschien, war er das effizienteste luftgekühlte Gerät seiner Art. Nur sechs Jahre später leistet ein einzelner Chip der neusten Generation ein Vielfaches bei einem Bruchteil des Strombedarfs. Dies ist der Grund, warum Maschinen wie diese heute ausgemustert werden – und warum ihre Bauteile in den Bastelstuben landen, aus denen teilweise auch die übrigen Mining-Geräte dieser Ausstellung hergestellt wurden."
                ],
                "en": [
                  "The Antminer S19 performs 95 trillion calculations per second while consuming 3,250 watts of electricity. Depending on its configuration, including the installed hashboards, it may weigh up to 16 kg. Its noise level of around 75 decibels can make it louder than a household vacuum cleaner. Designed for continuous operation, it is intended for industrial buildings alongside thousands of identical devices. Such machines generally remain in operation for as long as they are profitable to run.",
                  "Several of the smaller devices presented in this exhibition use the same types of specialized chips found in industrial miners. These chips can be recovered by desoldering them from retired machines. Building open-source devices around proprietary chips presented a challenge: where the necessary technical documentation was unavailable, developers had to reverse-engineer the way the chips were controlled. Even basic details, such as the number of chips on each board, could require direct inspection.",
                  "When the Antminer S19 was released in 2020, it was among the most efficient air-cooled devices of its kind. Just six years later, a chip of a newer generation may deliver several times the computing performance of an earlier chip while consuming substantially less electricity for the same amount of computation. Improvements of this kind can make older machines uneconomical to operate. Their components may then find their way into home workshops, where they can be reused in devices such as some of the smaller miners presented here."
                ]
              },
              "nr": null
            }
          ]
        }
      ]
    },
    {
      "type": "bridge",
      "id": "bruecke-2",
      "draft": true,
      "text": {
        "de": "Doch was davon ist eigentlich Geld?",
        "en": ""
      },
      "hidden": true
    },
    {
      "type": "opener",
      "id": "teil-3",
      "numeral": "3",
      "nav": {
        "de": "Neue Entwicklungen",
        "en": "New Developments"
      },
      "title": {
        "de": "Neue Entwicklungen, bekannte Herausforderungen",
        "en": "New Developments, Familiar Challenges"
      },
      "hinge": {
        "text": {
          "de": [
            "Ob Bitcoin tatsächlich Geld ist, bleibt umstritten. Die Europäische Zentralbank verlangt von Geld drei Funktionen: Tauschmittel, Recheneinheit, Wertaufbewahrung. Bitcoin erfüllt sie nur eingeschränkt und gilt der EZB als Krypto-Vermögenswert, nicht als Währung. Wer Bitcoin kauft, erwirbt weder einen Unternehmensanteil noch einen Anspruch auf Dividende oder Gegenleistung.",
            "Bitcoin ist zudem nicht allein geblieben: zehntausende weitere digitale Token sind entstanden. Mit dieser Kommerzialisierung kamen Betrug und Missbrauch. Gefälschte Handelsplattformen, wertlose Token, Schneeballsysteme im digitalen Gewand: ein Wilder Westen. Die Europäische Union hat mit der MiCA-Verordnung (Markets in Crypto-Assets-Regulation) 2023 einen ersten umfassenden Rechtsrahmen geschaffen, die USA mit dem GENIUS Act 2025 ein Gesetz speziell für Stablecoins. Weltweit bleibt die Regulierung fragmentiert, wie bei anderen digitalen Technologien auch, etwa bei sozialen Medien oder Künstlicher Intelligenz, deren gesellschaftliche Auswirkungen erst mit großer Verzögerung regulatorisch eingeholt werden.",
            "Zugleich verschiebt sich die Infrastruktur des alltäglichen Zahlens. Private Dienste, wie Apps, Karten und Plattformen, schieben sich zwischen Nutzer und staatliches Geld. Inzwischen geben einige dieser Unternehmen sogar eigene digitale Werte heraus, die an staatliches Geld gekoppelt sind, sogenannte private Stablecoins.",
            "Neue Geldformen brauchen Zeit, um sich gesellschaftlich zu verankern. Dies ist von einer Vielzahl von Faktoren abhängig, die etwa in der politischen und gesellschaftlichen Situation einer Gesellschaft zu finden sind, der herrschenden Wirtschaftsordnung und den bestehenden Abhängigkeiten. Ohne diese Einbettungen scheiterten bisher neue Geldformen und richteten in der Gesellschaft Schäden für die Mehrzahl der Verbrauchenden an, selbst wenn die Idee bestechend war. In der Geldgeschichte lässt sich ablesen, dass mit gesellschaftlichen Rahmenbedingungen, die bei allgemeingültigen Standards beginnen, neue Geldformen etabliert werden konnten und Jahrhunderte überdauern."
          ],
          "en": [
            "Whether Bitcoin is actually money remains a matter of debate. The European Central Bank requires money to fulfill three functions: a medium of exchange, a unit of account, and a store of value. Bitcoin fulfills these functions only to a limited extent and is considered by the ECB to be a crypto asset, not a currency. Anyone who buys Bitcoin acquires neither a stake in a company nor a claim to dividends or consideration.",
            "Bitcoin has not remained alone: tens of thousands of other digital tokens have emerged. This commercialization brought with it fraud and abuse. Fake trading platforms, worthless tokens, pyramid schemes in digital guise: a Wild West. The European Union created its first comprehensive legal framework with the MiCA Regulation (Markets in Crypto-Assets Regulation) in 2023, while the U.S. passed the GENIUS Act in 2025, a law specifically targeting stablecoins. Globally, regulation remains fragmented, as is the case with other digital technologies, such as social media or artificial intelligence, whose societal impacts are only addressed by regulators after a significant delay.",
            "At the same time, the infrastructure of everyday payments is shifting. Private services, such as apps, cards, and platforms, are inserting themselves between users and government-issued currency. Some of these companies started issuing their own digital assets pegged to government-issued currency, so-called private stablecoins.",
            "New forms of money take time to become established in society. This depends on a variety of factors, such as a society’s political and social situation, the prevailing economic system, and existing interdependencies. Without these foundational elements, new forms of money have failed in the past and caused harm to the majority of consumers in society, even when the idea itself was compelling. The history of money shows that new forms of currency can be established and endure for centuries when supported by a social framework that begins with universally accepted standards."
          ]
        }
      }
    },
    {
      "type": "money",
      "id": "geld",
      "station": "geld",
      "eyebrow": {
        "de": "Neue Entwicklungen",
        "en": "New Developments"
      },
      "title": {
        "de": "Was ist Geld?",
        "en": "What Is Money?"
      },
      "image": {
        "src": "assets/img/stations/station-06.png",
        "alt": {
          "de": "",
          "en": ""
        }
      },
      "text": {
        "de": [
          "Geld ist ein Versprechen, das drei Funktionen erfüllen soll: Es dient als Tauschmittel, als Recheneinheit zum Vergleich von Waren und als Wertspeicher zur Erhaltung von Kaufkraft über die Zeit. Diese Funktion kann Geld nur erfüllen, wenn es im Alltag angenommen wird, ohne dass Herausgeber, Deckung oder Einlösbarkeit bei jedem Tausch/Transfer überprüft werden müssen – ein Zustand, der Regeln, Institutionen und Vertrauen voraussetzt. Die Formen des Geldes haben sich über Jahrhunderte verändert, von Muscheln, Münzen über Papierscheine und Buchgeld zum modernen Fiatgeld. Die Fragen, die es aufwirft, sind aber immer dieselben: Wer garantiert den Wert, wer trägt das Risiko, und wer bestimmt die Regeln?"
        ],
        "en": [
          "Money is a promise intended to fulfill three functions: it serves as a medium of exchange, a unit of account for comparing goods, and a store of value for preserving purchasing power over time. Money can fulfill these functions only if it is accepted in everyday life without people having to check its issuer, backing, or redeemability every time it changes hands—a situation that requires rules, institutions, and trust. The forms of money have changed over the centuries, from shells and coins to paper banknotes, bank deposits, and modern fiat money. Yet the questions it raises remain the same: Who guarantees its value, who bears the risk, and who sets the rules?"
        ]
      },
      "blocks": [
        {
          "kicker": {
            "de": "Fiatgeld",
            "en": "Fiat Money"
          },
          "title": {
            "de": "Fiatgeld",
            "en": "Fiat Money"
          },
          "text": {
            "de": [
              "Unser derzeitiges Geldsystem basiert auf sogenanntem Fiatgeld. Dieser Fachbegriff findet kaum Eingang in die Öffentlichkeit. Er stammt vom lateinischen fiat („es werde\") und bezeichnet Geld, das seinen Wert nicht aus einem Eigenwert oder einer Edelmetalldeckung bezieht, sondern allein aus staatlicher Anordnung und gesellschaftlichem Vertrauen. Ein heutiger 20-Euro-Schein ist in seiner Nutzung als Papier praktisch wertlos und eine 1-Euro-Münze enthält Metall im Wert weniger Cent. Sie funktionieren aber als Geld, weil der Staat sie zum gesetzlichen Zahlungsmittel erklärt hat und die Zentralbank ihre Stabilität sichert."
            ],
            "en": [
              "Our current monetary system is based on what is known as fiat money. This technical term is rarely used outside specialist circles. It comes from the Latin fiat (“let it be”) and refers to money whose value derives not from any intrinsic worth or precious-metal backing, but solely from government decree and society’s trust. The paper in a modern 20-euro banknote is worth next to nothing, and a 1-euro coin contains only a few cents’ worth of metal. Yet they function as money because the government has declared them legal tender and the central bank safeguards their stability."
            ]
          }
        },
        {
          "kicker": {
            "de": "Vertrauen",
            "en": "Trust"
          },
          "title": {
            "de": "Vertrauen",
            "en": "Trust"
          },
          "text": {
            "de": [
              "Wir vertrauen, dass andere unser Geld akzeptieren und dieses Vertrauen wird von Staaten, Notenbanken und Banken garantiert, die Geld ausgeben und Konten verwalten."
            ],
            "en": [
              "We trust that others will accept our money. This trust is guaranteed by governments, central banks, and commercial banks, which issue money and manage accounts."
            ]
          }
        },
        {
          "kicker": {
            "de": "1944 bis 1971",
            "en": "1944 to 1971"
          },
          "title": {
            "de": "Bretton Woods",
            "en": "Bretton Woods"
          },
          "text": {
            "de": [
              "Von 1944 bis 1971 existierten mit dem Bretton-Woods-Währungssystem internationale Währungen, die über feste Wechselkurse an den Dollar gebunden waren. Dieser war seinerseits zu einem festen Kurs in Gold einlösbar. Mit der Aufhebung der Einlösbarkeit des Dollars in Gold 1971 durch die amerikanische Nixon-Regierung änderte sich das Währungssystem grundlegend."
            ],
            "en": [
              "From 1944 to 1971, the Bretton Woods monetary system linked participating countries’ currencies to the US dollar through fixed exchange rates. The dollar, in turn, was convertible into gold at a fixed rate. When the US administration under President Nixon ended the dollar’s convertibility into gold in 1971, the monetary system changed fundamentally."
            ]
          }
        },
        {
          "kicker": {
            "de": "Seit 1990",
            "en": "Since 1990"
          },
          "title": {
            "de": "Digitales Geld",
            "en": "Digital Money"
          },
          "text": {
            "de": [
              "Eine weitere einschneidende Veränderung war die aufkommende Idee von digitalem Geld. Sie entwickelt sich seit den 1990er Jahren mit E-Geld, Online-Banking, Kryptowerten und Stablecoins rapide weiter. Mit China existiert nunmehr das erste Land, welches, neben traditionellen Geldformen, eine Digitalwährung besitzt."
            ],
            "en": [
              "Another major shift came with the emerging idea of digital money. Since the 1990s, it has developed rapidly through electronic money, online banking, crypto assets, and stablecoins. China has now become the first country to have a digital currency alongside traditional forms of money."
            ]
          }
        }
      ],
      "timeline": {
        "tag": {
          "de": "Vertiefung 1",
          "en": "A Closer Look 1"
        },
        "title": {
          "de": "Zäsuren zum Fiatgeld",
          "en": "Turning Points Toward Fiat Money"
        },
        "intro": {
          "de": "Die wichtigsten Zäsuren auf dem Weg zum modernen reinen Fiatgeld",
          "en": "Key Turning Points on the Path to Modern Fiat Money"
        },
        "items": [
          {
            "date": {
              "de": "1914–1918",
              "en": "1914–1918"
            },
            "text": {
              "de": "Mit dem Ersten Weltkrieg setzten die meisten europäischen Staaten die Goldeinlösungspflicht ihrer Banknoten aus, um die Kriegsausgaben zu finanzieren. Es kam zu einer vorübergehenden Rückkehr zum Goldstandard in den 1920er Jahren; das endgültige Scheitern trat in der Weltwirtschaftskrise ab 1931 ein.",
              "en": "During World War I, most European countries suspended the obligation to redeem their banknotes in gold to finance wartime spending. A temporary return to the gold standard followed in the 1920s; its final collapse came during the Great Depression, beginning in 1931."
            }
          },
          {
            "date": {
              "de": "1944",
              "en": "1944"
            },
            "text": {
              "de": "Die Bretton-Woods-Konferenz etablierte ein neues internationales Währungssystem. Der US-Dollar wurde zur Leitwährung und war zu einem festen Kurs (35 Dollar pro Feinunze) in Gold einlösbar. Dies galt aber nur für Zentralbanken anderer Staaten, nicht für Privatpersonen. Alle anderen Währungen waren über feste Wechselkurse an den Dollar gebunden. Es war somit eine indirekte, gestufte Goldbindung vorhanden und es existierte kein voller Goldstandard mehr.",
              "en": "The Bretton Woods Conference established a new international monetary system. The US dollar became the anchor currency and was redeemable in gold at a fixed rate of $35 per troy ounce. However, this applied only to other countries’ central banks, not to private individuals. All other currencies were pegged to the dollar at fixed exchange rates. This created an indirect, two-tier link to gold rather than a full gold standard."
            }
          },
          {
            "date": {
              "de": "15. August 1971 („Nixon-Schock\")",
              "en": "August 15, 1971 (“Nixon Shock”)"
            },
            "text": {
              "de": "US-Präsident Richard Nixon hob die Goldeinlösbarkeit des Dollars auf. Ab diesem Zeitpunkt sind die wichtigsten Weltwährungen reines Fiatgeld – ohne jede Sachwertbindung. Diese Datierung gilt als Geburtsstunde des modernen Fiat-Geldsystems.",
              "en": "US President Richard Nixon ended the dollar’s convertibility into gold. From this point onward, the world’s major currencies became pure fiat money, with no link to any tangible asset. This date is regarded as the birth of the modern fiat monetary system."
            }
          },
          {
            "date": {
              "de": "1973",
              "en": "1973"
            },
            "text": {
              "de": "Übergang zu flexiblen Wechselkursen zwischen den großen Währungen.",
              "en": "The major currencies moved to floating exchange rates."
            }
          },
          {
            "date": {
              "de": "1971 bis heute",
              "en": "1971 to the present"
            },
            "text": {
              "de": "Alle bedeutenden Währungen weltweit sind Fiatgeld. Ihr Wert beruht auf dem Vertrauen in die ausgebenden Staaten und Zentralbanken, ihre Stabilität auf der Geldpolitik (Zinssteuerung, Inflationskontrolle). Diese Epoche dauert nun rund 55 Jahre an – historisch betrachtet eine kurze Phase.",
              "en": "All major currencies worldwide are fiat money. Their value rests on trust in the issuing governments and central banks, while their stability depends on monetary policy, including interest rate adjustments and inflation control. This era has now lasted approximately 55 years, a short period in historical terms."
            }
          }
        ]
      },
      "forms": {
        "tag": {
          "de": "Vertiefung 2",
          "en": "A Closer Look 2"
        },
        "title": {
          "de": "Geldformen",
          "en": "Forms of Money"
        },
        "intro": {
          "de": [
            "Chronologische Übersicht der Geldformen",
            "Jede Geldform lässt sich in zwei Dimensionen beschreiben: in ihrer äußeren Gestalt und ihrer Deckungsart."
          ],
          "en": [
            "A Chronological Overview of Forms of Money",
            "Each form of money can be described in two dimensions: the form it takes and what backs its value."
          ]
        },
        "items": [
          {
            "title": {
              "de": "Warengeld (ab ca. 9000 v. Chr.)",
              "en": "Commodity Money (from c. 9000 BCE)"
            },
            "shape": {
              "de": "Äußere Gestalt: nutzbare Waren (z. B. Vieh, Getreide, Salz, Kakao, Tabak)",
              "en": "Form: Useful commodities, such as livestock, grain, salt, cocoa, and tobacco."
            },
            "backing": {
              "de": "Deckungsart: Eigenwert – Die Ware ist auch ohne Geldfunktion brauchbar.",
              "en": "Backing: Intrinsic value—the commodity remains useful even when it is not used as money."
            }
          },
          {
            "title": {
              "de": "Frühformen ohne Eigennutzen (ab ca. 1200 v. Chr.)",
              "en": "Early Forms Without Intrinsic Utility (from c. 1200 BCE)"
            },
            "shape": {
              "de": "Äußere Gestalt: Kaurimuscheln, Wampum, Rai-Steine",
              "en": "Form: Cowrie shells, wampum, and rai stones."
            },
            "backing": {
              "de": "Deckungsart: gesellschaftliche Übereinkunft und Knappheit, erstmals wird der Wert allein durch Akzeptanz erzeugt",
              "en": "Backing: Social agreement and scarcity; for the first time, value is created solely through acceptance."
            }
          },
          {
            "title": {
              "de": "Edelmetall-Wägegeld (ab ca. 3000 v. Chr.)",
              "en": "Precious Metal Money Measured by Weight (from c. 3000 BCE)"
            },
            "shape": {
              "de": "Äußere Gestalt: unstandardisierte Silber- oder Goldstücke, vor jeder Transaktion wird gewogen",
              "en": "Form: Nonstandardized pieces of silver or gold, weighed before each transaction."
            },
            "backing": {
              "de": "Deckungsart: Eigenwert des Edelmetalls",
              "en": "Backing: The intrinsic value of the precious metal."
            }
          },
          {
            "title": {
              "de": "Vollwertige Münzen (ab ca. 600 v. Chr.)",
              "en": "Full-Bodied Coins (from c. 600 BCE)"
            },
            "shape": {
              "de": "Äußere Gestalt: geprägte Münzen mit standardisiertem Gewicht und Feingehalt",
              "en": "Form: Minted coins with standardized weight and precious metal content."
            },
            "backing": {
              "de": "Deckungsart: Eigenwert des Edelmetalls",
              "en": "Backing: The intrinsic value of the precious metal."
            }
          },
          {
            "title": {
              "de": "Edelmetall-gedeckte Banknoten (in China ab 1024, in Europa ab 1661)",
              "en": "Banknotes Backed by Precious Metals (from 1024 in China and 1661 in Europe)"
            },
            "shape": {
              "de": "Äußere Gestalt: bedrucktes Papier",
              "en": "Form: Printed paper."
            },
            "backing": {
              "de": "Deckungsart: Einlösungsversprechen in Edelmetall – Der Schein selbst ist nahezu wertlos, aber gegen hinterlegtes Gold oder Silber einlösbar.",
              "en": "Backing: A promise of redemption in precious metal. The note itself is almost worthless, but it can be exchanged for gold or silver held in reserve."
            }
          },
          {
            "title": {
              "de": "Scheidemünzen (zunehmend ab dem 19. Jahrhundert)",
              "en": "Token Coinage (increasingly common from the 19th century)"
            },
            "shape": {
              "de": "Äußere Gestalt: Münzen aus unedlen Metallen oder mit reduziertem Edelmetallgehalt",
              "en": "Form: Coins made from base metals or with reduced precious metal content."
            },
            "backing": {
              "de": "Deckungsart: staatliche Anordnung und Vertrauen. Der Materialwert liegt teils deutlich unter dem Nennwert; eine frühe Form des Fiat-Prinzips bei Münzen.",
              "en": "Backing: Government decree and trust. The material value is sometimes considerably lower than the face value, an early application of the fiat principle to coins."
            }
          },
          {
            "title": {
              "de": "Goldstandard-Währung (ca. 1870-1914, kurz wiederbelebt 1925-1931)",
              "en": "Gold Standard Currencies (c. 1870–1914, briefly revived in 1925–1931)"
            },
            "shape": {
              "de": "Äußere Gestalt: Banknoten und Buchgeld",
              "en": "Form: Banknotes and bank deposits."
            },
            "backing": {
              "de": "Deckungsart: feste Goldparität – Währungen sind in Gold einlösbar; Zentralbanken halten Goldreserven.",
              "en": "Backing: A fixed gold parity. Currencies are redeemable in gold, and central banks hold gold reserves."
            }
          },
          {
            "title": {
              "de": "Bretton-Woods-Währungen (1944-1971)",
              "en": "Bretton Woods Currencies (1944–1971)"
            },
            "shape": {
              "de": "Äußere Gestalt: Banknoten und Buchgeld",
              "en": "Form: Banknotes and bank deposits."
            },
            "backing": {
              "de": "Deckungsart: gestufte Goldbindung über den US-Dollar – Dollar einlösbar in Gold (nur für Zentralbanken), andere Währungen fest an den Dollar gebunden",
              "en": "Backing: An indirect link to gold through the US dollar—the dollar is redeemable in gold, but only by central banks, while other currencies are pegged to the dollar."
            }
          },
          {
            "title": {
              "de": "Fiat-Geld (ab 1971 in voller Reinform)",
              "en": "Fiat Money (in its fully unbacked form from 1971)"
            },
            "shape": {
              "de": "Äußere Gestalt: Banknoten und Buchgeld",
              "en": "Form: Banknotes and bank deposits."
            },
            "backing": {
              "de": "Deckungsart: staatliche Anordnung und Vertrauen in die Zentralbank; keine Einlösung in einen Sachwert; heute die dominierende Geldform weltweit",
              "en": "Backing: Government decree and trust in the central bank; no redemption in a tangible asset. Today, this is the dominant form of money worldwide."
            }
          },
          {
            "title": {
              "de": "E-Geld (ab den 1990er Jahren)",
              "en": "Electronic Money / E-Money (from the 1990s)"
            },
            "shape": {
              "de": "Äußere Gestalt: elektronisch gespeicherte Werteinheiten bei einem zugelassenen E-Geld-Institut",
              "en": "Form: Electronically stored units of value held with an authorized electronic money institution."
            },
            "backing": {
              "de": "Deckungsart: Einlösungsversprechen gegen Fiat-Geld",
              "en": "Backing: A promise of redemption in fiat money."
            }
          },
          {
            "title": {
              "de": "Kryptowerte (ab 2009)",
              "en": "Crypto Assets (from 2009)"
            },
            "shape": {
              "de": "Äußere Gestalt: digitale Werteinheiten auf einer Blockchain",
              "en": "Form: Digital units of value on a blockchain."
            },
            "backing": {
              "de": "Deckungsart: algorithmische Knappheit ohne Einlösungsversprechen; seitens der EU keine Einstufung als „Geld“",
              "en": "Backing: Algorithmic scarcity without a promise of redemption; not classified as “money” by the EU."
            }
          },
          {
            "title": {
              "de": "Stablecoins (ab ca. 2014)",
              "en": "Stablecoins (from c. 2014)"
            },
            "shape": {
              "de": "Äußere Gestalt: digitale Token auf einer Blockchain",
              "en": "Form: Digital tokens on a blockchain."
            },
            "backing": {
              "de": "Deckungsart: Geldwerte, (Staats-)Anleihen, andere Kryptowerte und Fiat-Geld, Einlösungsversprechen von einem privaten Emittenten",
              "en": "Backing: Monetary assets, bonds—including government bonds—other crypto assets, and fiat money, with a promise of redemption from a private issuer."
            }
          },
          {
            "title": {
              "de": "Digitales Zentralbankgeld / CBDC (in Vorbereitung)",
              "en": "Central Bank Digital Currency / CBDC (in preparation)"
            },
            "shape": {
              "de": "Äußere Gestalt: digitale Werteinheiten in einer von der Zentralbank kontrollierten Infrastruktur",
              "en": "Form: Digital units of value within an infrastructure controlled by the central bank."
            },
            "backing": {
              "de": "Deckungsart: Der Wert beruht auf staatlicher Anordnung, ohne Umweg über Geschäftsbanken",
              "en": "Backing: Its value rests on government decrees, without commercial banks as intermediaries."
            }
          }
        ]
      },
      "notMoney": {
        "tag": {
          "de": "Vertiefung 3",
          "en": "A Closer Look 3"
        },
        "title": {
          "de": "Keine Geldformen",
          "en": "Not Forms of Money"
        },
        "text": {
          "de": [
            "Eine Geldform ist eine eigenständige Werteinheit mit eigener rechtlicher und ökonomischer Stellung. Eine bloße Schnittstelle oder Übertragungstechnologie ist keine Geldform, sondern eine Zugriffsform auf bereits bestehendes Geld.",
            "Keine eigenen Geldformen, sondern Zahlungswege oder Zugangstechnologien sind: Wechselbriefe und Schecks (Zahlungsanweisungen auf hinterlegtes Geld), Kreditkarten und Debitkarten (Zugriff auf Buchgeld), Überweisungen und Lastschriften (Übertragungswege für Buchgeld), Online-Banking (digitale Oberfläche für Buchgeld), Apple Pay, Google Pay, Alipay und WeChat Pay (Apps, die auf Karten oder Konten zugreifen), kontaktloses Zahlen und QR-Code-Zahlung (Übertragungstechnologien).",
            "Der Unterschied wird besonders deutlich bei PayPal: Eine Zahlung vom verknüpften Bankkonto über PayPal ist ein Zahlungsweg. Das Geld bleibt Buchgeld der Bank. Ein PayPal-Guthaben hingegen ist E-Geld. Also tatsächlich eine eigene Geldform."
          ],
          "en": [
            "A form of money is a distinct unit of value with its own legal and economic status. An interface or transfer technology alone is not a form of money; it provides access to money that already exists.",
            "The following are payment methods or access technologies rather than distinct forms of money: bills of exchange and checks (instructions to pay from deposited funds); credit and debit cards (access to bank deposits); bank transfers and direct debits (ways of transferring bank deposits); online banking (a digital interface for bank deposits); Apple Pay, Google Pay, Alipay, and WeChat Pay (apps that access cards or accounts); and contactless and QR-code payments (technologies for transmitting payment information).",
            "PayPal makes the distinction particularly clear: a payment through PayPal from a linked bank account is a payment method. The money remains a bank deposit. A PayPal balance, however, is e-money and thus a distinct form of money."
          ]
        },
        "subtitle": {
          "de": "Was keine Geldformen sind",
          "en": "What Does Not Count as a Form of Money?"
        }
      }
    },
    {
      "type": "lead",
      "id": "entwicklungen",
      "station": "entwicklungen",
      "eyebrow": {
        "de": "Neue Entwicklungen",
        "en": "New Developments"
      },
      "title": {
        "de": "Neue Entwicklungen, bekannte Herausforderungen",
        "en": "New Developments, Familiar Challenges"
      },
      "text": {
        "de": [
          "Papiergeld war in der Vergangenheit für Menschen einmal genauso ungewohnt und suspekt, wie es digitale Token heutzutage sind. Als im 17. Jahrhundert die ersten Geldscheine in Europa auftauchten (Einführung während der Song Dynastie in China bereits im 11. Jh.), war die Skepsis groß: Wie soll ein bedrucktes Stück Papier denselben Wert besitzen wie eine Münze aus Silber oder Kupfer?",
          "Im 21. Jahrhundert kommt ein neues Abstraktionslevel hinzu: Digitale Werte (digitale Token, Stablecoins, Kryptowerte im Allgemeinen) werden mit dem Anspruch angeboten, als Zahlungsmittel oder Wertträger zu dienen.",
          "Die Geschichte des Geldes demonstriert, dass es immer wieder zur Entwicklung neuer Zahlungsmittel kam. Vier Beispiele aus drei Jahrhunderten zeigen, unter welchen Bedingungen neue Geldformen entstehen, unter welchen sie gelingen oder scheitern."
        ],
        "en": [
          "In the past, paper money was just as unfamiliar and suspicious to people as digital tokens are today. When the first banknotes appeared in Europe in the 17th century (introduced in Song dynasty China during the 11th century), scepticism ran high: How could a printed piece of paper have the same value as a silver or copper coin?",
          "In the 21st century, a new level of abstraction has emerged: Digital assets (such as digital tokens, stablecoins, and crypto assets in general) are offered with the claim that they serve as a means of payment or a store of value.",
          "The history of money demonstrates that new forms of payment have emerged time and time again. Four examples spanning three centuries illustrate the conditions under which new forms of money emerge, and under which they succeed or fail."
        ]
      }
    },
    {
      "type": "case",
      "id": "stockholm",
      "station": "stockholm",
      "deepLayout": "side",
      "eyebrow": {
        "de": "Scheitern ohne Regeln",
        "en": "Failure Without Rules"
      },
      "title": {
        "de": "Palmstruch und die Stockholms Banco",
        "en": "Palmstruch and Stockholms Banco"
      },
      "image": null,
      "text": {
        "de": [
          "Schweden bezahlte im 17. Jahrhundert mit Kupferplatten. Sie wogen bis zu 20 Kilogramm, was das Problem unmittelbar verdeutlicht: Dieses Geld war schwer, unhandlich und im Alltag kaum zu gebrauchen.",
          "Johan Palmstruch (1611-1671), ein aus Riga stammender Kaufmann, erhielt 1656 vom schwedischen König die Genehmigung, eine Bank zu gründen. Ab 1661 gab die Stockholm Banco sogenannte Kreditzettel aus, die ersten Banknoten Europas. Sie erleichterten Zahlungen, ohne dass die schweren Kupferplatten bei jedem Geschäft transportiert und übergeben werden mussten. Die Scheine waren nicht an eine bestimmte Kupfereinlage gebunden, sondern wurden als Kredite ausgegeben. Die Bank versprach, sie auf Verlangen in Münzgeld einzulösen. Damit entstand das erste Papiergeld Europas.",
          "Anfangs funktionierte das System. Die Zettel waren viel leichter und handlicher als die Platten. Der Zahlungsverkehr konnte zudem schneller abgewickelt werden. Doch es fehlte als essenzieller Bestandteil eine Regulierung der Emissionen: Niemand kontrollierte, wie viele Scheine die Bank ausgab. Palmstruch ließ mehr drucken, als durch Einlagen gedeckt waren. Als sich das herumsprach und das Vertrauen in die Einlösbarkeit schwand, verlangten viele Menschen gleichzeitig Münzgeld für ihre Scheine zurück. Diesen Forderungen konnte die Bank nicht nachkommen. Bereits 1664 ordnete die Regierung an, die ausgegebenen Kredite zurückzufordern und die Banknoten einzuziehen. Palmstruch wurde zunächst zum Tode verurteilt, später aber zu einer Gefängnisstrafe begnadigt.",
          "Aus diesem Scheitern zog Schweden eine Konsequenz: Die Leitung der Nachfolgeeinrichtung der Stockholms Banco, die Riksens Ständers Bank, die heutige Schwedische Nationalbank (Sveriges Riksbank), wurde nicht mehr einem privaten Unternehmer überlassen, sondern unter die Aufsicht des Parlaments gestellt. Sie gilt als älteste noch bestehende Zentralbank der Welt."
        ],
        "en": [
          "In the 17th century, Sweden used copper plates as money. They weighed up to 20 kilograms, making the problem immediately apparent: this money was heavy, cumbersome, and barely practical for everyday use.",
          "In 1656, Johan Palmstruch, a merchant from Riga, received permission from the Swedish king to establish a bank. From 1661, Stockholms Banco issued what were known as credit notes; Europe’s first banknotes. They made payments easier, removing the need to transport and hand over heavy copper plates with every transaction. The notes were not tied to a specific copper deposit but were issued as loans. The bank promised to redeem them in coins on demand. This marked the beginning of paper money in Europe.",
          "At first, the system worked. The notes were much lighter and easier to handle than the plates. Payments could also be processed more quickly. But an essential safeguard was missing: regulation of the issuance of banknotes. No one controlled how many notes the bank issued. Palmstruch had printed more than were backed by deposits. When word spread and confidence in their redeemability declined, many people demanded coins for their notes at the same time. The bank could not meet these demands. As early as 1664, the government ordered the bank to call in its loans and withdraw its banknotes from circulation. Palmstruch was initially sentenced to death, but his sentence was later commuted to imprisonment.",
          "Sweden drew a lesson from this failure: the management of Stockholms Banco’s successor, Riksens Ständers Bank, today Sweden’s central bank, Sveriges Riksbank, was placed under parliamentary oversight rather than entrusted to a private entrepreneur. It is regarded as the world’s oldest surviving central bank."
        ]
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "A Closer Look"
          },
          "title": {
            "de": "Bank Runs – damals und heute",
            "en": "Bank Runs—Then and Now"
          },
          "text": {
            "de": [
              "Was in den 1660ern in Stockholm geschah, hat einen Namen, der bis heute verwendet wird: Bank Run. So bezeichnet man den Ansturm auf eine Bank, wenn das Vertrauen schwindet und zu viele Menschen gleichzeitig ihr Geld abheben wollen. Kann die Bank die Forderungen nicht schnell genug erfüllen, verstärkt dies die Verunsicherung.",
              "Im Bereich digitaler Token ist dieselbe Dynamik zu beobachten. Im Mai 2022 verlor der sogenannte Stablecoin TerraUSD innerhalb weniger Tage seine Bindung an den US-Dollar. Das System brach zusammen, der zugehörige Token Luna wurde praktisch wertlos. Schätzungen zufolge gingen dabei Vermögenswerte in Höhe von rund 45 Milliarden US-Dollar verloren.",
              "Anders als bei Banken gab es bei TerraUSD jedoch keine Einlagensicherung, keine Aufsichtsbehörde, die hätte eingreifen können, keinen Staat, der haftete. Es ist einer der Gründe, warum die Europäische Union mit der MiCA-Verordnung Regulierungsstrukturen schafft. Dies ist vergleichbar mit der Konsequenz, die Schweden 1668 zog, als es die Bankaufsicht dem Parlament unterstellte."
            ],
            "en": [
              "What happened in Stockholm in the 1660s has a name still used today: a bank run. This occurs when confidence in a bank declines and too many people try to withdraw their money at the same time. If the bank cannot meet these demands quickly enough, uncertainty intensifies.",
              "The same dynamic can be observed with digital tokens. In May 2022, the stablecoin TerraUSD lost its peg to the US dollar within a matter of days. The system collapsed, and its associated token, Luna, became virtually worthless. An estimated $45 billion in asset value was lost.",
              "Unlike banks, however, TerraUSD had no deposit insurance, no supervisory authority that could have intervened, and no government liable for the losses. This is one reason why the European Union is establishing a regulatory framework through its Markets in Crypto-Assets Regulation (MiCA). A parallel can be drawn with Sweden’s response in 1668, when it placed bank oversight under parliament."
            ]
          }
        }
      ]
    },
    {
      "type": "case",
      "id": "sachsen",
      "station": "sachsen",
      "deepLayout": "below",
      "eyebrow": {
        "de": "Verordnetes Vertrauen",
        "en": "Trust by Decree"
      },
      "title": {
        "de": "Das erste Papiergeld im deutschsprachigen Raum",
        "en": "The First Paper Money in the German-Speaking World"
      },
      "image": null,
      "text": {
        "de": [
          "Was in Schweden scheiterte, gelang wenige Jahrzehnte später in Sachsen.",
          "Sachsen gab als erstes deutsches Territorium Papiergeld heraus. Auch hier war die Ausgangslage pragmatisch: Der Staat brauchte Geld, und Münzmetall war knapp. Doch anders als Palmstruch in Stockholm setzte Sachsen nicht allein auf freiwillige Akzeptanz des Geldes seitens der Bevölkerung. Per Verordnung wurde festgelegt, dass bestimmte Zahlungen in der neuen Geldform geleistet werden mussten.",
          "Damit entstand ein Kreislauf. Wer Steuern in Form von Papiergeld zahlen konnte, war auch eher bereit, es als Zahlungsmittel im Handel anzunehmen. Das Vertrauen wuchs nicht aus Begeisterung für die neue Geldform, sondern aus dem alltäglichen Gebrauch und den dahinterstehenden Regeln."
        ],
        "en": [
          "What failed in Sweden succeeded a few decades later in Saxony.",
          "Saxony was the first German territory to issue paper money. Here, too, the reasons were practical: the state needed money, and metal for minting coins was scarce. Unlike Palmstruch in Stockholm, however, Saxony did not rely solely on the public’s voluntary acceptance of the new money. A decree required certain payments to be made in this new form.",
          "This created a cycle. People who could pay their taxes with paper money were also more willing to accept it as payment in trade. Trust grew through everyday use and the rules supporting it, rather than enthusiasm for the new form of money."
        ]
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "A Closer Look"
          },
          "title": {
            "de": "Rahmensetzung als Voraussetzung",
            "en": "A Framework as a Prerequisite"
          },
          "blocks": [
            {
              "type": "p",
              "text": {
                "de": "Was in Sachsen funktionierte, war kein Zufall. Hinter dem Erfolg stand ein Prinzip, das bis heute in der Geldtheorie diskutiert wird: Die sogenannte Steuertheorie des Geldes (auch Chartalismus genannt) argumentiert, dass Geld seinen Wert nicht aus dem Material oder einer inneren Eigenschaft bezieht, sondern aus der Tatsache, dass ein Staat es als Zahlungsmittel für Steuern akzeptiert. Dieses Akzeptanzversprechen schafft die Nachfrage, die dem Geld seinen Wert gibt.",
                "en": "The success of paper money in Saxony was no coincidence. Behind it lay a principle still debated in monetary theory today: the tax theory of money, also known as chartalism, argues that money derives its value not from its material or any intrinsic property, but from the fact that a government accepts it as payment for taxes. This commitment to accept it creates the demand that gives money its value."
              }
            },
            {
              "type": "p",
              "text": {
                "de": "Der kurfürstliche Erlass schuf einen Rahmen, innerhalb dessen das neue Geld funktionieren konnte. Die Form der Rahmensetzung war autoritär, das Prinzip dahinter ist universell: Ohne verbindliche Regeln kein Vertrauen, ohne Vertrauen kein funktionierendes Geld.",
                "en": "The electoral decree established a framework within which the new money could function. The way this framework was imposed was authoritarian, but the underlying principle is universal: without binding rules, there is no trust; without trust, money cannot function."
              }
            },
            {
              "type": "p",
              "text": {
                "de": "In der Gegenwart versuchen drei große Wirtschaftsräume, auf je eigene Weise Rahmenbedingungen für digitale Zahlungsmittel zu schaffen.",
                "en": "Today, three major economic regions are each taking their own approach to establishing frameworks for digital means of payment."
              }
            },
            {
              "type": "columns",
              "items": [
                {
                  "label": {
                    "de": "EU",
                    "en": "EU"
                  },
                  "text": {
                    "de": "Die Europäische Union hat 2023 mit der MiCA-Verordnung (Markets in Crypto-Assets) den weltweit ersten umfassenden Rechtsrahmen für Kryptowerte verabschiedet. MiCA unterscheidet zwischen verschiedenen Kategorien digitaler Token und verlangt von deren Herausgebern unter anderem Reservenachweise, Offenlegungspflichten und eine Zulassung durch Aufsichtsbehörden. Die Rahmensetzung geschieht hier durch demokratische Gesetzgebung im Europäischen Parlament und Rat.",
                    "en": "In 2023, the European Union adopted the world’s first comprehensive legal framework for crypto assets through its Markets in Crypto-Assets Regulation (MiCA). MiCA distinguishes between different categories of digital tokens and requires their issuers, among other things, to provide evidence of reserves, meet disclosure obligations, and obtain authorization from supervisory authorities. Here, the framework is established through democratic lawmaking in the European Parliament and the Council of the European Union."
                  }
                },
                {
                  "label": {
                    "de": "USA",
                    "en": "USA"
                  },
                  "text": {
                    "de": "Die USA haben 2025 mit dem GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins) ein Gesetz speziell für Stablecoins verabschiedet. Es verlangt unter anderem, dass Herausgeber für jeden ausgegebenen Stablecoin Reserven in Höhe von mindestens einem US-Dollar halten. Zugleich hat die US-Regierung die Entwicklung einer staatlichen Digitalwährung untersagt und setzt stattdessen auf private Anbieter. Die Rahmensetzung beschränkt sich hier bewusst auf den privaten Sektor.",
                    "en": "In 2025, the United States passed the GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins), legislation specifically addressing stablecoins. Among other requirements, it stipulates that issuers must hold reserves of at least one US dollar for every stablecoin issued. At the same time, the US government has prohibited the development of a government-issued digital currency, opting instead to rely on private providers. Here, the framework is deliberately confined to the private sector."
                  }
                },
                {
                  "label": {
                    "de": "China",
                    "en": "China"
                  },
                  "text": {
                    "de": "China geht den Weg, der dem sächsischen Modell des 18. Jahrhunderts strukturell am nächsten kommt. Der digitale Yuan wird seit 2019 vom Staat eingeführt und aktiv in den Alltag eingebettet – über Gehaltszahlungen im öffentlichen Dienst, Integration in staatliche Dienstleistungen und Anreizsysteme. Zugleich ist der Kryptomarkt vollständig verboten. Wie damals in Sachsen schafft der Staat nicht nur den Rahmen, sondern bestimmt auch, welches Zahlungsmittel verwendet wird – und welches nicht. Die Rahmensetzung ist hier umfassend und autoritär.",
                    "en": "China is following the approach that most closely resembles the structure of Saxony’s 18th-century model. Since 2019, the government has been introducing the digital yuan and actively embedding it in everyday life through public-sector salary payments, integration into government services, and incentive programs. At the same time, the crypto market is entirely prohibited. As in Saxony centuries earlier, the government not only establishes the framework but also determines which means of payment are used—and which are not. Here, the framework is comprehensive and authoritarian."
                  }
                }
              ]
            },
            {
              "type": "p",
              "text": {
                "de": "Drei Ansätze, die unterschiedlicher kaum sein könnten: Demokratisch regulieren (EU), den privaten Markt ordnen (USA), staatlich durchsetzen (China). Was sie verbindet, ist die Einsicht, die schon das sächsische Beispiel zeigt: Neue Geldformen setzen sich nicht von allein durch. Sie brauchen einen Rahmen.",
                "en": "These three approaches could hardly be more different: democratic regulation in the EU, rules for the private market in the United States, and state-directed implementation in China. What they share is an insight already illustrated by the Saxon example: new forms of money do not gain acceptance on their own. They need a framework."
              }
            }
          ]
        }
      ]
    },
    {
      "type": "case",
      "id": "voc",
      "station": "voc",
      "deepLayout": "side",
      "eyebrow": {
        "de": "Firmengeld",
        "en": "Company Money"
      },
      "title": {
        "de": "Die VOC und die Macht der Infrastruktur",
        "en": "The VOC and the Power of Infrastructure"
      },
      "image": {
        "src": "assets/img/stations/station-10.png",
        "alt": {
          "de": "",
          "en": ""
        }
      },
      "text": {
        "de": [
          "Die Vereinigte Ostindische Compagnie (VOC), gegründet 1602 in den Niederlanden, war mehr als ein Handelsunternehmen. Sie unterhielt eigene Armeen, verwaltete Territorien in Südostasien, schloss Verträge mit ausländischen Herrschern und sie gab eigenes Geld aus.",
          "Dieses umfasst Münzen verschiedener Nominale, verschiedener Metalle, aus verschiedenen Jahrzehnten. Sie zeigen, dass die VOC nicht gelegentlich Geld prägte, sondern dass sie ein eigenes monetäres System betrieb. In ihren Handelsgebieten zirkulierten diese Münzen als gängiges Zahlungsmittel. Die VOC hatte damit etwas geschaffen, das über den reinen Handel hinausging und bisher eine staatliche Verantwortung darstellte: eine monetäre Infrastruktur. Im VOC-Netzwerk zu arbeiten, zu handeln oder zu leben, bedeutete somit, sich in einem privaten Ökosystem zu bewegen, das Vorteile bot, aber auch Abhängigkeiten schuf.",
          "Im 21. Jahrhundert ist eine strukturell ähnliche Dynamik festzustellen. Große Technologie- und Finanzkonzerne errichten eigene Zahlungsinfrastrukturen. PayPal, Apple Pay, Google Pay, Alipay etc. sind bequem und weit verbreitet. Neben den monetären Infrastrukturen, die bereits sehr weit verbreitet und tief in den Alltag vieler Menschen eingebettet sind, geben einige der Unternehmen nun private Stablecoins heraus. Bei ihnen handelt es sich um digitale Token, die an staatliches Geld gekoppelt sind. Ihre Deckung basiert allein auf den Versprechen der jeweiligen Unternehmen, dass entsprechende Rücklagen (zumeist Staatsanleihen und Bargeld) zur Einlösung in staatliches Geld zur Verfügung stehen."
        ],
        "en": [
          "The Dutch East India Company (VOC), founded in the Netherlands in 1602, was more than a trading company. It maintained its own armies, administered territories in Southeast Asia, concluded treaties with foreign rulers, and issued its own money.",
          "This money includes coins of various denominations and metals, dating from different decades. They show that the VOC did not merely mint coins occasionally but operated a monetary system of its own. These coins circulated as commonly accepted means of payment in the regions where it traded. The VOC had thus created something that went beyond trade and had previously been a responsibility of the state: a monetary infrastructure. Working, trading, or living within the VOC’s network therefore meant participating in a private ecosystem that offered benefits but also created dependencies.",
          "A structurally similar dynamic can be observed in the 21st century. Large technology and financial corporations are building their own payment infrastructures. Services such as PayPal, Apple Pay, Google Pay, and Alipay are convenient and widely used. In addition to these monetary infrastructures, already widespread and deeply embedded in many people’s daily lives, some companies are now issuing private stablecoins. These are digital tokens pegged to government-issued money. Their backing rests solely on the issuing companies’ promises that sufficient reserves, usually government bonds and cash, are available to redeem the tokens for government-issued money."
        ]
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "A Closer Look"
          },
          "title": {
            "de": "Company Money – von der VOC zu PayPal und Stablecoins",
            "en": "Company Money—from the VOC to PayPal and Stablecoins"
          },
          "text": {
            "de": [
              "Das Prinzip des Firmengeldes reicht weit über die VOC hinaus. Im 19. Jahrhundert zahlten Unternehmen in manchen Regionen ihre Arbeiter in eigenen Marken oder Gutscheinen aus (sogenanntes Truck-System oder Scrip), die nur in firmeneigenen Läden eingelöst werden konnten. Diese offensichtliche Form der Abhängigkeit wurde schließlich gesetzlich verboten.",
              "Die Parallele zwischen der VOC und den heutigen Technologie- und Finanzkonzernen: Private Unternehmen schaffen monetäre Infrastrukturen, die so weit verbreitet und so tief in den Alltag eingebettet sind, dass sie faktisch unvermeidlich werden – ohne dass ihre Nutzer auf die Regeln dieser Infrastrukturen Einfluss hätten."
            ],
            "en": [
              "The principle of company money extends far beyond the VOC. In the 19th century, companies in some regions paid their workers in company-issued tokens or vouchers that could be redeemed only at company stores. This practice is known as the truck system or payment in scrip. This overt form of dependence was eventually outlawed.",
              "The parallel between the VOC and today’s technology and financial corporations is this: private companies create monetary infrastructures that become so widespread and so deeply embedded in everyday life that they are effectively unavoidable, yet their users have no say in the rules governing them."
            ]
          }
        }
      ]
    },
    {
      "type": "case",
      "id": "freebanking",
      "station": "freebanking",
      "deepLayout": "below",
      "eyebrow": {
        "de": "Als jeder sein eigenes Geld druckte",
        "en": "When Everyone Printed Their Own Money"
      },
      "title": {
        "de": "Die sogenannte „Free-Banking Era“ (1837–1863)",
        "en": "The “Free-Banking Era” (1837–1863)"
      },
      "image": null,
      "text": {
        "de": [
          "In den USA des 19. Jahrhunderts gab es über weite Strecken keine Zentralbank und kein einheitliches Papiergeld. Zwischen 1837 und 1863, in der sogenannten „Free-Banking Era“, druckten tausende Banken, Eisenbahngesellschaften, Immobilienfirmen und einzelne Händler eigene Geldscheine. Jeder Schein musste einzeln beurteilt werden: Wer hat ihn ausgegeben? War er gedeckt? Wo konnte er eingelöst werden? Kaufleute brauchten gedruckte Nachschlagewerke, um die Glaubwürdigkeit einzelner Noten zu prüfen.",
          "Die vier ausgewählten Geldscheine zeigen die Bandbreite: Eine Banknote aus dem Baumwollhandel in Georgia, ein Drei-Dollar-Schein aus Michigan, dem Bundesstaat, der zum Inbegriff betrügerischer Bankgründungen wurde, ein Schein einer Immobilienfirma aus Iowa, die nach einem Jahr pleiteging, und ein Händlerschein aus Baltimore, der noch 1871 gedruckt wurde, obwohl ein nationales Gesetz das private Gelddrucken längst hatte beenden sollen.",
          "Die National Banking Acts 1863 und 1864 schufen einen bundeseinheitlichen Rahmen für die Ausgabe von Banknoten. Privatbanken mit einer Zulassung der Bundesregierung durften Noten ausgeben, die durch hinterlegte US-Staatsanleihen gedeckt waren. Eine 1865 beschlossene und ab 1866 wirksame hohe Steuer verdrängte die Noten der von den einzelnen Bundesstaaten zugelassenen Banken weitgehend aus dem Umlauf. 1874 wurden die Einlösungsmöglichkeiten erweitert: Die Noten der zugelassenen Banken konnten bei Dienststellen des US-Schatzamtes im ganzen Land eingelöst werden.",
          "Die Parallele zur heutigen Kryptowelt liegt in der Vielzahl privater digitaler Geldversprechen. Die Fülle an Stablecoins unterscheidet sich in Herausgeber, Deckung, Einlösbarkeit und Regulierung. Die Geschichte der „Free-Banking Era“ zeigt, dass ein unübersichtlicher Geldmarkt früher oder später die Frage nach gemeinsamen Standards und verlässlicher Aufsicht aufwirft."
        ],
        "en": [
          "For much of the 19th century, the United States had no central bank, and no uniform paper currency. During the period commonly known as the “Free-Banking Era”, from 1837 to 1863, thousands of banks, railroad companies, real estate firms, and individual merchants issued their own notes. Each note had to be assessed individually: Who had issued it? Was it backed by assets? Where could it be redeemed? Merchants needed printed reference guides to check the reliability of individual notes. “Free banking” meant that banks could be established under general legal requirements without a special legislative charter. Not that they operated without any regulation.",
          "The four selected notes illustrate this variety: a banknote associated with the cotton trade in Georgia; a three-dollar note from Michigan, the state that became synonymous with fraudulent banking ventures; a note issued by an Iowa real estate company that went bankrupt after just one year; and a merchant’s note from Baltimore, printed as late as 1871, showing that private monetary instruments persisted beyond the era’s conventional end.",
          "The National Banking Acts of 1863 and 1864 established a federal framework for note issuance. Privately owned banks with federal charters could issue notes backed by U.S. government bonds deposited as collateral. A heavy tax enacted in 1865 and effective from 1866 largely drove state-bank notes out of circulation. Private banknote issuance thus continued, but increasingly under uniform federal rules. Redemption arrangements were expanded in 1874, allowing national banknotes to be redeemed at Treasury offices across the country.",
          "The parallel with today’s crypto world lies in the multitude of privately issued digital promises of money. The many stablecoins differ in their issuers, backing, redemption terms, and regulation. The history of the “Free-Banking Era” shows that a monetary landscape that is difficult to navigate sooner or later raises questions about common standards and reliable oversight."
        ]
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung 1",
            "en": "A Closer Look 1"
          },
          "title": {
            "de": "Wildcat Banking, Stablecoins und die Frage nach der Ordnung",
            "en": "Wildcat Banking, Stablecoins, and the Question of Rules"
          },
          "text": {
            "de": [
              "Zwischen 1836 und 1913 besaßen die Vereinigten Staaten keine Zentralbank. Das war kein Zufall, sondern das Ergebnis eines erbitterten politischen Kampfes. Zweimal hatte der Kongress eine nationale Bank gegründet, 1791 und 1816, und beide Male war sie nach 20 Jahren wieder verschwunden.",
              "Anders als in Europa, wo Zentralbanken durch dauerhafte Gesetze errichtet wurden, erhielten die beiden US-Nationalbanken vom Kongress jeweils nur eine befristete Genehmigung über 20 Jahre. Diese Befristung selbst war schon ein politischer Kompromiss, denn die Gegner akzeptierten die Bank nur unter der Bedingung, dass sie automatisch enden würde, wenn die nächste Generation von Parlamentariern nicht erneut zustimmte. Genau das geschah: 1811 und 1836 hatten sich die Machtverhältnisse verschoben und eine Verlängerung scheiterte. Erst 1913, beim dritten Anlauf, wurde die Federal Reserve ohne Ablaufdatum gegründet und besteht bis heute.",
              "In die Lücke, die der Wegfall der Zentralbank hinterließ, traten hunderte privater Banken mit der Ausgabe eigener Geldscheine."
            ],
            "en": [
              "Between 1836 and 1913, the United States had no central bank. This was no accident but the outcome of a bitter political struggle. Congress had twice established a national bank, in 1791 and 1816, and in both cases its federal charter expired after 20 years.",
              "Congress granted each bank a charter limited to 20 years. Their continued existence as national institutions therefore depended on renewed political approval. In 1811 and again in 1836, opposition prevented renewal.",
              "Only in 1913, on the third attempt, was the Federal Reserve established. Even then, the Federal Reserve Banks initially received 20-year charters. Congress removed that time limit in 1927, and the system continues to operate today.",
              "In the absence of a central bank, hundreds of private banks issued their own notes. From the 1860s onward, federal legislation gradually established a more uniform paper currency, even though the country still lacked a central bank."
            ]
          },
          "subtitle": {
            "de": "Warum die USA 76 Jahre lang kein einheitliches Papiergeld hatten",
            "en": "Why the United States Went Decades Without a Central Bank"
          }
        },
        {
          "tag": {
            "de": "Vertiefung 2",
            "en": "A Closer Look 2"
          },
          "title": {
            "de": "Die „Free-Banking Era“: Tausende verschiedene „Währungen“",
            "en": "The Free-Banking Era—Thousands of Different “Currencies”"
          },
          "text": {
            "de": [
              "Ab 1837 konnte in vielen Bundesstaaten praktisch jeder eine Bank gründen. Und jede Bank konnte eigene Geldscheine drucken. Aber es blieb nicht nur bei den Banken: Auch Eisenbahngesellschaften, Versicherungen, Immobilienfirmen und einzelne Kaufleute brachten Scheine in Umlauf.",
              "Die Noten sollten durch hinterlegte Sicherheiten gedeckt sein, zumeist durch Staatsanleihen der Einzelstaaten. In der Praxis variierte die Qualität enorm. In Michigan wurden teils illiquide oder bereits im Wert gefallene Anleihen akzeptiert. Im schlimmsten Fall bestanden die „Barreserven“ einer Bank aus Kisten voller Nägel und Glas, die obenauf durch eine dünne Schicht an Silbermünzen getarnt wurden.",
              "Konnte man mit einem Schein einer bestimmten Bank überall bezahlen? Nein. Eine Note der Bank of New York wurde in Philadelphia vielleicht mit 1–2 % Abschlag akzeptiert; die Note einer entlegenen Bank in Michigan konnte 20–50 % unter Nennwert gehandelt werden – oder gar nicht.",
              "Um mit diesem Chaos umzugehen, entstand eine eigene Informationsinfrastruktur, die wiederum einen Spekulationsmarkt entstehen ließ. Sogenannte Banknote Reporters listeten auf, welche Banken noch zahlungsfähig waren und zu welchem Abschlag deren Noten gehandelt wurden. Note Brokers kauften Banknoten unter Nennwert, reisten zur ausgebenden Bank und lösten sie in Gold ein, wenn dieses vorhanden war.",
              "Diese Verzeichnisse und Händler sind das historische Pendant zu heutigen Krypto-Tracking-Websites wie CoinMarketCap oder CoinGecko. Damals wie heute gilt: Wo privates Geld nicht einheitlich vertrauenswürdig ist, entsteht Spekulationshandel."
            ],
            "en": [
              "Beginning in 1837, a growing number of states adopted laws allowing anyone who met specified requirements to establish a bank. Each bank could issue its own notes. But banks were not the only issuers: railroad companies, insurance companies, real estate firms, and individual merchants also put notes into circulation.",
              "Banknotes were supposed to be backed by deposited collateral, often bonds issued by individual states. In practice, the quality of this backing varied enormously. Some assets were difficult to sell or had fallen in value. Fraud could also extend to a bank’s supposed cash reserves: in one documented Michigan case, boxes contained nails, lead, and broken glass concealed beneath a thin layer of silver coins.",
              "Could a note issued by a particular bank be used to pay anywhere? No. Notes from a trusted New York bank might be accepted in Philadelphia at close to face value, while those from a remote Michigan bank could trade at a substantial discount, or not be accepted at all.",
              "An information network developed to help people navigate this confusing market, while also supporting speculative trading. Publications known as banknote reporters listed which banks were still solvent and the discounts at which their notes traded. Note brokers bought banknotes below face value, traveled to the issuing bank, and redeemed them for gold or silver if available.",
              "These reference guides offer a historical parallel to today’s crypto-tracking websites, such as CoinMarketCap and CoinGecko. Then as now, differences in trust and access to information created opportunities for trading and speculation."
            ]
          }
        },
        {
          "tag": {
            "de": "Vertiefung 3",
            "en": "A Closer Look 3"
          },
          "title": {
            "de": "Der Weg zur Ordnung – und die Parallelen zu heute",
            "en": "Establishing Common Rules and the Parallels with Today"
          },
          "text": {
            "de": [
              "1863 verabschiedete der Kongress den National Banking Act: Es wurden bundesweit lizenzierte Banken mit einheitlicher Deckung durch US-Staatsanleihen durchgesetzt. Eine Strafsteuer von 10 % auf die alten Banknoten machte diese unwirtschaftlich. Ab 1874 konnten die neuen National Bank Notes überall im Land zum vollen Nennwert eingelöst werden. Zum ersten Mal war es egal, welche Bank einen Schein ausgestellt hatte.",
              "Wirtschaftswissenschaftler bezeichnen diesen Zustand als „informationsunempfindlich“: Es muss bei diesem Geld nicht mehr recherchiert werden, wer es herausgegeben hat. Dasselbe Ziel hat die heutige Stablecoin-Regulierung: Ein Stablecoin soll so sicher und austauschbar werden, dass die Frage nach dem Emittenten irrelevant wird.",
              "Die MiCA-Verordnung der EU verfährt dabei ähnlich wie der National Banking Act: Dollar-Stablecoins werden nicht verboten, aber durch Lizenzpflichten und Transaktionsobergrenzen so stark reglementiert, dass nicht-konforme Emittenten aus dem europäischen Markt gedrängt werden. Die Banque de France warnte 2026 vor einer „digitalen Dollarisierung“. Sie sieht es als Gefahr, dass der Zahlungsverkehr auf Blockchains standardmäßig über Dollar-Token läuft und somit der Euro an Bedeutung verliert. Als Gegenmaßnahme entwickeln europäische Banken einen Euro-Stablecoin (Qivalis, geplant Ende 2026). Die EZB treibt parallel den digitalen Euro voran."
            ],
            "en": [
              "The National Banking Acts of 1863 and 1864 established a system of federally chartered banks whose notes were backed by U.S. government bonds. A 10 percent tax on state-bank notes, enacted in 1865 and effective from 1866, made their continued circulation uneconomical. In 1874, redemption arrangements were expanded, allowing national banknotes to be redeemed at face value at Treasury offices across the country. The identity of the issuing bank became far less important to those using its notes.",
              "Economists describe money of this kind as “information-insensitive”: people do not need to investigate the issuer before accepting it. Stablecoin regulation seeks a comparable degree of confidence through requirements governing reserves, redemption, and supervision. This does not, however, make all stablecoins equally safe or interchangeable.",
              "The European Union’s Markets in Crypto-Assets Regulation (MiCA) offers a parallel: access to the market depends on compliance with common rules. Dollar-denominated stablecoins are not prohibited, but their issuers must meet authorization and other regulatory requirements. Additional restrictions apply to their large-scale use as a means of exchange.",
              "In 2026, the Banque de France warned of the risk of digital dollarization: if dollar tokens became the default means of payment on blockchains, the euro’s role could diminish. European banks are developing a euro-denominated stablecoin through their joint venture Qivalis, with a launch planned for the second half of 2026, subject to regulatory approval. In parallel, the European Central Bank is advancing its work on a digital euro."
            ]
          }
        }
      ]
    },
    {
      "type": "glossary",
      "id": "glossar",
      "station": "glossar",
      "nav": {
        "de": "Glossar",
        "en": "Glossary"
      },
      "eyebrow": {
        "de": "Glossar & Ausblick",
        "en": "Glossary & outlook"
      },
      "title": {
        "de": "Krypto-Glossar",
        "en": "Crypto glossary"
      },
      "source": "assets/glossar/daten.json"
    }
  ]
};
