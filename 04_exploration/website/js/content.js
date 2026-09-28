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

  Ausblenden
  - "hidden": true an einem Abschnitt blendet ihn aus, ohne Inhalte zu löschen.

  Schalter
  - "site.justifyText": Blocksatz für Fließtexte (true/false).
  - "site.showActions": false blendet alle „Ausprobieren“-Buttons (Overlays) aus.
    Die Einträge "action" in den Abschnitten bleiben erhalten.
  - "site.showLanguageSwitch": DE/EN-Umschalter in der Navigation.
*/
window.KW_CONTENT = {
  "site": {
    "title": {
      "de": "Krypto, was?",
      "en": "Krypto, was?"
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
      "start": "01.10.2026",
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
          "en": "Key visual of the exhibition “Krypto, was?”"
        }
      }
    },
    "lede": {
      "draft": true,
      "text": {
        "de": "Eine Ausstellung über die Geschichte der Verschlüsselung und die Geschichte des Geldes – und darüber, wo beide zusammenkommen.",
        "en": ""
      }
    },
    "languages": [
      "de",
      "en"
    ],
    "defaultLanguage": "de",
    "showLanguageSwitch": true,
    "showActions": true,
    "justifyText": true,
    "sponsors": {
      "title": {
        "de": "Mit freundlicher Unterstützung von",
        "en": "With the kind support of"
      },
      "items": [
        {
          "name": "Förderer 1",
          "logo": "",
          "url": ""
        },
        {
          "name": "Förderer 2",
          "logo": "",
          "url": ""
        },
        {
          "name": "Förderer 3",
          "logo": "",
          "url": ""
        },
        {
          "name": "Förderer 4",
          "logo": "",
          "url": ""
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
      "en": "Deep dive"
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
      "de": "Schlossspuren",
      "en": "Traces in the castle"
    },
    "logoPending": {
      "de": "Logo",
      "en": "Logo"
    },
    "glossaryCategories": {
      "de": "Kategorien",
      "en": "Categories"
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
        "en": ""
      }
    },
    "sachsen": {
      "nr": 9,
      "folder": "station-11",
      "topic": {
        "de": "Verordnetes Vertrauen",
        "en": ""
      }
    },
    "voc": {
      "nr": 10,
      "folder": "station-12",
      "topic": {
        "de": "Firmengeld",
        "en": ""
      }
    },
    "freebanking": {
      "nr": 11,
      "folder": "station-13",
      "topic": {
        "de": "Free-Banking-Era",
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
      "type": "opener",
      "id": "teil-1",
      "numeral": "1",
      "nav": {
        "de": "Kryptografie",
        "en": ""
      },
      "title": {
        "de": "Kryptografie, Computergeschichte und digitale Vernetzung",
        "en": ""
      },
      "hinge": {
        "draft": true,
        "text": {
          "de": [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ],
          "en": []
        }
      }
    },
    {
      "type": "object",
      "id": "skytale",
      "station": "skytale",
      "eyebrow": {
        "de": "Geheime Botschaften in der Antike",
        "en": ""
      },
      "title": {
        "de": "Verschlüsseln & versiegeln",
        "en": ""
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
          "In der Menschheit stellte sich wohl schon immer ein zentrales Problem: Wie lassen sich Nachrichten so übermitteln, dass Dritte sie nicht verstehen? Von der Antike ausgehend bestand eine Lösung beispielsweise darin, die Nachricht mit einem Siegel etwa aus Bienenwachs zu „versiegeln“. Ein Siegelbruch bedeutete, dass die Nachricht gelesen wurde. Darüber hinaus entwickelten sich weitere Lösungen: So wurden Texte, also Buchstaben, derart verändert, dass sie nur für die vorgesehenen Empfänger lesbar blieben.",
          "Im antiken Sparta diente für letzteres nachweislich die Skytale. Ein Lederstreifen wurde spiralförmig um einen Holzstab gewickelt, die Nachricht über diese Wicklungen hinweg geschrieben und wurde so nach dem Abnehmen unlesbar. Erst mit einem Stab gleichen Durchmessers ließen sich die Buchstaben wieder richtig anordnen.",
          "Die sogenannte Caesar-Chiffre, deren Erfindung Julius Caesar zugeschrieben wird, funktioniert noch einfacher: Jeder Buchstabe wird im Alphabet um eine festgelegte Anzahl Plätze verschoben. Aus A wird zum Beispiel D, aus B wird E. Wer den „Schlüssel“ kennt – also die Zahl der Verschiebung –, kann die Nachricht dekodieren.",
          "Beide Verfahren sind leicht zu knacken. Sie zeigen jedoch ein Prinzip, das bis heute gilt: Informationen lassen sich so umwandeln, dass sie nur für Eingeweihte verständlich sind. Dieses Prinzip heißt Kryptografie. Es ist die erste von drei Grundlagen, auf denen später digitales Geld aufbauen wird."
        ],
        "en": []
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
        "en": ""
      },
      "title": {
        "de": "kryptografischer Zirkel & Permutationsscheibe",
        "en": ""
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
          "Antike Verfahren hatten einen Nachteil: War ihr Prinzip einmal bekannt, ließen sich Nachrichten oft rasch entschlüsseln. Daraus entstand ein Wettbewerb zwischen dem Verbergen und dem Entziffern von Informationen, der bis heute anhält. Neue Methoden sollen Nachrichten stets sicherer machen, zugleich wird aber ständig nach Wegen gesucht, den Inhalt doch zu entschlüsseln.",
          "Ein Beispiel hierfür ist der kryptografische Zirkel von 1633, der einen simplen Mechanismus aufweist: Jeder Buchstabe des Alphabets konnte zu einer bestimmten Strichlänge umgewandelt werden, deren Abstand über das Gerät eingestellt wurde. Sender und Empfänger brauchten jeweils ein baugleiches Exemplar, denn nur bei identischer Einstellung ließ sich die Nachricht entschlüsseln.",
          "Die Permutationsscheibe aus dem Jahr 1587 besaß mit ursprünglich 24 einzeln drehbaren Messingscheiben dagegen bereits ein deutlich komplexeres Verschlüsselungsverfahren. Jede der Scheiben war mit 24 Buchstaben (J=I, U=V) versehen, sodass jeder Buchstabe eines zu verschlüsselnden Wortes einen eigenen Verschiebungswert aufweisen konnte. Ohne den „Schlüssel“, also die Information zur Positionierung der Scheiben zueinander (= den Verschiebungscode), war eine Nachricht nur schwerlich zu dekodieren. Das Objekt zeigt damit ein frühes mechanisches Verfahren, Sprache systematisch zu verschlüsseln und wieder zu entschlüsseln."
        ],
        "en": []
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "Deep dive"
          },
          "title": {
            "de": "Weitere Verschlüsselungsverfahren",
            "en": ""
          },
          "text": {
            "de": [
              "Weitere Hilfsmittel machten Verschlüsselung komplexer. Dazu gehörten Chiffriertabellen oder Codebücher, sogenannte Nomenklatoren, in denen Namen, Orte oder ganze Wörter durch andere Zeichen ersetzt wurden. Solche Verfahren prägten seit dem 15. Jahrhundert besonders die europäische Diplomatie, die auf dichte Netzwerke reisender Boten und Gesandter angewiesen war. In „schwarzen Kammern“ chiffrierten und dechiffrierten die Höfe abgefangene Nachrichten. Auch am sächsischen Hof gab es eine „schwarze Kammer“, die direkt in der Poststelle untergebracht war, um ein- bzw. ausgehende Schreiben zu kontrollieren. Noch zu DDR-Zeiten, zur Zeit des sogenannten Kalten Krieges, waren diese Verfahren gang und gäbe. In unserer heutigen Verfassung ist das Postgeheimnis klar geregelt, was durch die Digitalisierung und Privatisierung dieses Bereiches allerdings aufgeweicht wird."
            ],
            "en": []
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
        "en": ""
      },
      "title": {
        "de": "Die Leibniz-Rechenmaschine",
        "en": ""
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
        "en": []
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
        "en": ""
      },
      "title": {
        "de": "Die Enigma",
        "en": ""
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
        "en": []
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
        "en": ""
      },
      "title": {
        "de": "Wie funktioniert Bitcoin?",
        "en": "How does Bitcoin work?"
      },
      "hinge": {
        "draft": true,
        "text": {
          "de": [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ],
          "en": []
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
        "de": "Was ist Bitcoin?",
        "en": "What is Bitcoin?"
      },
      "text": {
        "de": [
          "Bitcoin wurde 2008 in einem veröffentlichten Konzept vorgestellt; 2009 nahm das Netzwerk seinen Betrieb auf. Der Begriff bezeichnet sowohl ein digitales Zahlungssystem als auch dessen Werteinheit. Bitcoin ermöglicht es, Werte über das Internet zu übertragen, ohne dass dafür eine Bank als zentrale Buchungsstelle erforderlich ist. Börsen und andere Dienstleister können bei der praktischen Nutzung dennoch eine vermittelnde Rolle übernehmen.",
          "Bitcoin gilt als erster erfolgreicher dezentraler Kryptowert und als Ausgangspunkt des heutigen Kryptomarkts. Inzwischen existieren zahlreiche unterschiedliche Kryptowerte, darunter Token und Stablecoins. Sie folgen nicht alle denselben technischen Prinzipien. Bitcoin steht jedoch am Anfang dieser Entwicklung, besteht bis heute und ist weiterhin der bekannteste Kryptowert.",
          "Viele vernetzte Rechner führen und prüfen eine gemeinsame Transaktionsgeschichte. Digitale Schlüssel weisen nach, wer über Bitcoin verfügen darf. Miner fassen Transaktionen zu Blöcken zusammen und sichern deren Aufnahme in die Blockchain durch Rechenarbeit. Dabei gelangen zugleich neue Bitcoin in Umlauf. Wer Bitcoin hält, empfängt oder versendet, muss jedoch nicht selbst Mining betreiben.",
          "Bitcoin ist so konzipiert, dass keine zentrale Stelle das gesamte System verwaltet. An ihre Stelle treten öffentlich einsehbare Regeln, kryptografische Prüfungen und das Zusammenwirken vieler voneinander unabhängiger Rechner. Die folgenden Kapitel erklären das gemeinsame Kontobuch, digitale Schlüssel, Mining, die Sicherung der Blockchain und die Entwicklung der Mining-Geräte."
        ],
        "en": []
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
        "de": "Erklärfilm · 3:05 · ohne Ton",
        "en": "Explainer film · 3:05 · silent"
      },
      "src": "assets/film/bitcoin-film_v1.0.mp4",
      "chapters": [
        {
          "t": 0,
          "title": {
            "de": "Kein Zentrum",
            "en": ""
          }
        },
        {
          "t": 45,
          "title": {
            "de": "Wie funktioniert eine Transaktion?",
            "en": ""
          }
        },
        {
          "t": 85,
          "title": {
            "de": "Wie funktioniert Mining?",
            "en": ""
          }
        },
        {
          "t": 135,
          "title": {
            "de": "Wie ist die Blockchain abgesichert?",
            "en": ""
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
        "en": ""
      },
      "titleDraft": true,
      "parts": [
        {
          "kicker": "01",
          "title": {
            "de": "Ein Kontobuch, das allen gehört",
            "en": "A ledger that belongs to everyone"
          },
          "text": {
            "de": [
              "Wer Geld auf einem Bankkonto hält, lagert dort nicht bestimmte Geldscheine. Die Bank hält in ihrer Datenbank fest, wie hoch das Guthaben auf einem Konto ist und welche Buchungen erfolgt sind. Sie führt dieses Kontobuch zentral und bestätigt, welche Zahlungen gültig sind.",
              "Bitcoin geht einen anderen Weg. Es gibt kein einzelnes, zentrales Kontobuch. Stattdessen führen zahlreiche unabhängig betriebene Rechner, sogenannte Nodes oder Knotenpunkte, die Transaktionsgeschichte gemeinsam. Sie prüfen neue Transaktionen und Blöcke nach denselben Regeln.",
              "Neue Transaktionen werden zu sogenannten Blöcken zusammengefasst. Ein solcher Block lässt sich mit einer neuen Seite in einem gemeinsamen „Kontobuch“ vergleichen. Durchschnittlich etwa alle zehn Minuten kommt ein weiterer Block hinzu.",
              "Die Blöcke mit den aufgetretenen Transaktionen sind miteinander verbunden, denn jeder neue Block enthält einen digitalen Verweis auf den vorherigen. Aus den aufeinanderfolgenden Blöcken entsteht so eine Kette – die Blockchain. Wird ein älterer Block nachträglich verändert, passt demzufolge sein „digitaler Fingerabdruck“ nicht mehr zu den folgenden Blöcken. Eine Veränderung oder Manipulation von vorherigen Transaktionen wird dadurch erkennbar."
            ],
            "en": []
          },
          "deepDives": [
            {
              "tag": {
                "de": "Vertiefung",
                "en": "Deep dive"
              },
              "title": {
                "de": "Wie ein Block mit dem vorherigen verbunden ist – Hash-Funktionen",
                "en": ""
              },
              "text": {
                "de": [
                  "Der Verweis auf den vorherigen Block ist kein einfacher Verweis wie eine Seitenzahl. Er ist ein sogenannter Hashwert, ein digitaler Fingerabdruck. Eine Hash-Funktion ist ein Rechenverfahren, das Daten beliebiger Länge in eine Zeichenfolge fester Länge umwandelt. Bei Bitcoin wird dafür SHA-256 verwendet. Beim Hashen eines Blockkopfs, des sogenannten Block Headers, wird SHA-256 zweimal hintereinander ausgeführt. Das Ergebnis umfasst 256 Bit und wird üblicherweise als Folge von 64 Hexadezimalzeichen dargestellt.",
                  "Zwei Eigenschaften machen Hash-Funktionen für die Blockchain unverzichtbar: Zum einen reagieren sie extrem empfindlich. Ändert man an den Ausgangsdaten nur ein einziges Zeichen, sieht der Hashwert völlig anders aus. Zum anderen läuft die Funktion praktisch nur in eine Richtung: Aus dem Hashwert lassen sich die ursprünglichen Daten nicht rekonstruieren.",
                  "Jeder Block Header enthält den Hashwert des vorherigen Block Headers. Würde jemand einen alten Block verändern, änderte sich dessen Hashwert und der Verweis im nächsten Block passte nicht mehr. Um die Veränderung zu verbergen, müssten auch alle folgenden Blöcke und die zugehörigen Arbeitsnachweise neu berechnet werden."
                ],
                "en": []
              }
            }
          ]
        },
        {
          "kicker": "02",
          "title": {
            "de": "Die digitale Unterschrift: Mein Schlüssel, dein Schloss",
            "en": "The digital signature: my key, your lock"
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
            "en": []
          },
          "deepDives": [
            {
              "tag": {
                "de": "Vertiefung",
                "en": "Deep dive"
              },
              "title": {
                "de": "Wie ein Schlüsselpaar mathematisch funktioniert",
                "en": ""
              },
              "text": {
                "de": [
                  "Die Schlüsselpaare bei Bitcoin beruhen auf einem mathematischen Verfahren namens Elliptische-Kurven-Kryptografie. Bitcoin verwendet eine bestimmte Kurve mit dem technischen Namen secp256k1. Der private Schlüssel ist eine zufällig erzeugte Zahl aus einem festgelegten Zahlenraum. In dezimaler Schreibweise kann sie bis zu 77 Stellen umfassen. Aus ihr berechnet das Verfahren den öffentlichen Schlüssel.",
                  "Diese Berechnung funktioniert praktisch wie eine Einbahnstraße: Vom privaten zum öffentlichen Schlüssel zu gelangen, ist mit wenigen Rechenschritten möglich. Den privaten Schlüssel aus dem öffentlichen Schlüssel zurückzurechnen, ist mit heutigen Computern praktisch nicht zu bewältigen. Ein ausreichend leistungsfähiger, fehlerkorrigierter Quantencomputer könnte diese Absicherung künftig gefährden. Ein solcher Computer existiert bislang jedoch nicht.",
                  "Eine digitale Unterschrift entsteht, indem der private Schlüssel mit den Daten der zu unterschreibenden Transaktion verrechnet wird. Das Ergebnis ist eine Zahlenfolge, die mathematisch an diese Transaktion gebunden ist. Für klassische Bitcoin-Transaktionen wird dazu ECDSA verwendet, der Elliptic Curve Digital Signature Algorithm. Bei Taproot-Transaktionen kommen außerdem Schnorr-Signaturen zum Einsatz. Aus dem öffentlichen Schlüssel kann schließlich eine Bitcoin-Adresse abgeleitet werden – eine kürzere Zeichenfolge, die andere verwenden können, um Bitcoin an diese Adresse zu senden."
                ],
                "en": []
              }
            }
          ]
        },
        {
          "kicker": "03",
          "title": {
            "de": "Die Einigung durch Rechenarbeit - Mining: Wettbewerb um den nächsten Block",
            "en": "Agreement through computation: mining and the race for the next block"
          },
          "text": {
            "de": [
              "Die Nodes können prüfen, ob eine Transaktion die Regeln des Bitcoin-Systems erfüllt. Doch eine weitere Frage bleibt: Wer stellt den nächsten Block zusammen und legt damit die Reihenfolge neuer Transaktionen in der Blockchain fest?",
              "Hier kommt das Bitcoin-Mining ins Spiel. Miner wählen ausstehende Transaktionen aus und fassen sie zu möglichen neuen Blöcken zusammen. Spezialisierte Rechner treten anschließend ununterbrochen in einem Wettbewerb gegeneinander an. Sie führen enorme Mengen von Rechenversuchen durch, bis einer von ihnen ein Ergebnis findet, das die vorgegebenen Bedingungen erfüllt.",
              "Wer ein solches Ergebnis zuerst findet, übermittelt seinen Block an das Netzwerk. Die Nodes prüfen unabhängig voneinander, ob der Block und der dafür erbrachte Arbeitsnachweis den Regeln entsprechen. Ist das der Fall, nehmen sie ihn in ihre Blockchain auf.",
              "Dieses Verfahren heißt Proof-of-Work – oder Arbeitsnachweis. Ein gültiges Ergebnis zu finden, erfordert sehr viele Versuche. Es zu überprüfen, benötigt dagegen nur wenig Rechenaufwand.",
              "Die Einnahmen des erfolgreichen Miners oder Mining-Pools bestehen aus zwei Teilen: den mit dem Block neu ausgegebenen Bitcoin und den Transaktionsgebühren der darin enthaltenen Zahlungen. Danach beginnt der Wettbewerb um den nächsten Block."
            ],
            "en": []
          },
          "deepDives": [
            {
              "tag": {
                "de": "Vertiefung 01",
                "en": "Deep dive 01"
              },
              "title": {
                "de": "Was die Miner genau berechnen – Nonce und Zielwert",
                "en": ""
              },
              "text": {
                "de": [
                  "Miner berechnen den Hashwert des Block Headers, indem sie SHA-256 zweimal hintereinander ausführen. Der Block Header enthält unter anderem einen zusammenfassenden Hashwert der Transaktionen, den Hashwert des vorherigen Blocks, einen Zeitstempel, den Zielwert und die Nonce. Das Ergebnis der Hashberechnung ist eine 256-Bit-Zahl. Sie muss kleiner oder gleich dem vorgegebenen Zielwert sein.",
                  "Die Nonce, von englisch „number used once“, ist ein 32-Bit-Feld im Block Header, das die Miner verändern können. Jede Veränderung erzeugt einen anderen Hashwert. Ist der mögliche Wertebereich der Nonce ausgeschöpft, verändern die Miner weitere Daten des Blockkandidaten, etwa eine zusätzliche Zahl, die sogenannte ExtraNonce, in der Coinbase-Transaktion. Dadurch ändert sich der zusammenfassende Hashwert der Transaktionen, und die Suche kann mit neuen Block-Headern fortgesetzt werden. Die Mining-Geräte prüfen so Milliarden oder Billionen von Varianten pro Sekunde, bis zufällig ein gültiger Hashwert entsteht."
                ],
                "en": []
              }
            },
            {
              "tag": {
                "de": "Vertiefung 02",
                "en": "Deep dive 02"
              },
              "title": {
                "de": "Wie sich die Schwierigkeit an die Rechenleistung anpasst – Difficulty Adjustment",
                "en": ""
              },
              "text": {
                "de": [
                  "Das Bitcoin-System ist so eingerichtet, dass durchschnittlich etwa alle zehn Minuten ein neuer Block entsteht. Alle 2016 Blöcke, rechnerisch etwa zwei Wochen, wird nach festgelegten Regeln ermittelt, wie lange die Erzeugung der letzten 2016 Blöcke gedauert hat. Ging es schneller als vorgesehen, wird der Zielwert abgesenkt und die Aufgabe schwieriger. Dauerte es länger, wird der Zielwert angehoben und die Aufgabe leichter. Dieser Mechanismus heißt Difficulty Adjustment. Er sorgt nicht dafür, dass jeder einzelne Block nach genau zehn Minuten entsteht, sondern hält den langfristigen Durchschnitt in der Nähe dieses Werts."
                ],
                "en": []
              }
            },
            {
              "tag": {
                "de": "Vertiefung 03",
                "en": "Deep dive 03"
              },
              "title": {
                "de": "Wie die Ausgabe neuer Bitcoin festgelegt ist – Block Subsidy und Halving",
                "en": ""
              },
              "text": {
                "de": [
                  "Die Menge der neu erzeugten Bitcoin, die ein Miner für einen gefundenen Block beanspruchen darf, ist im Bitcoin-System festgelegt. Dieser Teil der Belohnung heißt Block Subsidy. Hinzu kommen die Transaktionsgebühren, deren Höhe nicht fest vorgegeben ist.",
                  "Alle 210.000 Blöcke, etwa alle vier Jahre, wird die Block Subsidy halbiert. Als Bitcoin 2009 startete, lag sie bei 50 Bitcoin pro Block. 2012 sank sie auf 25, 2016 auf 12,5, 2020 auf 6,25 und 2024 auf 3,125 Bitcoin. Dadurch ist in den Regeln festgelegt, dass insgesamt nie mehr als knapp 21 Millionen Bitcoin erzeugt werden."
                ],
                "en": []
              }
            }
          ]
        },
        {
          "kicker": "04",
          "title": {
            "de": "Die Kette wächst: Sicherheit durch Anhäufung",
            "en": "The chain grows: security through accumulation"
          },
          "text": {
            "de": [
              "Die Rechenarbeit des Minings bestimmt nicht nur, wie neue Blöcke entstehen. Sie trägt zugleich dazu bei, bereits eingetragene Transaktionen zu sichern.",
              "Jeder neue Block baut auf dem vorherigen auf. Wer eine ältere Transaktion nachträglich verändern wollte, müsste deshalb eine abweichende Blockchain erzeugen. Dafür müssten der betroffene Block und alle darauffolgenden Blöcke mitsamt ihren Arbeitsnachweisen neu berechnet werden, während das übrige Netzwerk die gültige Blockchain weiter verlängert.",
              "Jeder weitere Block gilt deshalb als zusätzliche Bestätigung der früheren Transaktionen. Je tiefer ein Eintrag in der Blockchain liegt, desto mehr Rechenarbeit hat sich seitdem über ihm angesammelt und desto aufwendiger wäre eine nachträgliche Veränderung.",
              "An die Stelle einer zentralen Buchungsstelle treten bei Bitcoin somit gemeinsame Regeln, kryptografische Prüfungen und öffentlich überprüfbare Arbeitsnachweise. Eine bereits bestätigte Zahlung kann daher nicht von einer zentralen Stelle zurückgebucht werden. Bei einer Fehlüberweisung müsste die empfangende Person die Bitcoin in einer neuen Transaktion zurücksenden."
            ],
            "en": []
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
        "de": "05",
        "en": ""
      },
      "title": {
        "de": "Bitcoin-Mining-Geräte",
        "en": "Bitcoin mining devices"
      },
      "text": {
        "de": [
          "Bitcoin-Mining-Geräte sind spezialisierte Computer, die ununterbrochen Hashwerte von möglichen Block Headern berechnen. Im Inneren arbeiten hochspezialisierte Chips aus Silizium. Auf ihnen befinden sich Milliarden winziger elektronischer Schalter, die mit den Zuständen 0 und 1 rechnen.",
          "Über Software und das Internet sind die Mining-Geräte mit dem Bitcoin-Netzwerk oder einem Mining-Pool verbunden. 2009 konnten Bitcoin noch mit dem Prozessor eines gewöhnlichen Computers geschürft werden. Ab 2010 kamen leistungsfähigere Grafikkarten zum Einsatz; 2011/12 folgten programmierbare Spezialchips, sogenannte FPGAs.",
          "Eine entscheidende Zäsur begann 2013 mit den ASICs: Chips, die eigens für die von Bitcoin verwendeten SHA-256-Berechnungen entwickelt wurden. Sie waren wesentlich schneller und effizienter, aber auch teurer. Damit wurde Mining auf Heimcomputern zunehmend unrentabel.",
          "Schon zuvor wurde Mining auch gewinnorientiert betrieben. Mit den ASICs entwickelte es sich jedoch zunehmend zu einem industriellen Geschäft. Seit etwa 2013/14 betreiben Unternehmen große Anlagen mit Tausenden Geräten, aufwendiger Kühlung und möglichst günstigem Strom. Viele Miner schließen sich außerdem zu Mining-Pools zusammen. Aus einem zunächst dezentralen Experiment wurde so ein kapitalintensiver, globaler Wettbewerb um Einnahmen aus Blocksubventionen und Transaktionsgebühren."
        ],
        "en": []
      },
      "groups": [
        {
          "title": {
            "de": "Mining-Geräte auf dem Sockel",
            "en": "Mining devices on the pedestal"
          },
          "items": [
            {
              "kicker": "01",
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
                  "Im Inneren des BitChimneys steckt eine einzelne Rechenplatine aus einem industriellen Bitcoin-Miner (S19j Pro). Auf dieser sitzen drei Platinen nebeneinander in einem Gehäuse – in industriellen Rechenzentren stehen tausende solcher Miner nebeneinander. Werden diese Geräte ausgemustert, kommt es oft zum Verkauf einzelner Bauteile. Dadurch erhalten sie beispielsweise im BitChimney ein zweites Leben. Die Energie, die der Miner verbraucht, wird fast vollkommen in Wärme umgewandelt und strömt aus dem oberen „Kamin“. Ein handelsüblicher Heizlüfter hätte mit diesen knapp 650 Watt im selben Raum auch Wärme produziert – nur mit dem Unterschied, dass der BitChimney als Nebenprodukt zur Wärme auch Bitcoin schürfen kann. Ob dies ein idealer Umgang mit Strom oder eine geschickte Rechtfertigung für den Ressourcenverbrauch ist, wird kontrovers diskutiert."
                ],
                "en": [
                  "Inside the BitChimney is a single computing board, known as a hashboard, taken from an industrial Bitcoin miner, the S19j Pro. In the original miner, three of these boards sit side by side in one enclosure; industrial mining facilities house thousands of such machines. When these devices are retired, their individual components are often sold, giving them a second life in devices such as the BitChimney. Almost all the electricity consumed by the miner is converted into heat, which flows out through the “chimney” at the top. A conventional fan heater consuming the same 650 watts would also have heated the room, just not mining bitcoin at the same time. Whether this is an ideal use of electricity or a clever justification for consuming energy remains a subject of debate."
                ]
              }
            },
            {
              "kicker": "02",
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
                  "Der Bitaxe Ultra Hex 301 besteht aus sechs ASIC-Chips auf einer Platine und ist das erste Mehrchip-Gerät aus der Bitaxe-Reihe. Hier sind es zwei Gruppen zu je drei Chips, die mit zwölf Volt versorgt werden. Sie sind an ein Netzteil angeschlossen, was sechs Rechenwerke versorgt, statt an sechs einzelne Netzteile. Was in den industriellen Maschinen längst Serienstand war, kam damit erstmals in einem offenen, dokumentierten Entwurf an. Unabhängig davon verfolgte parallel ein anderes Mitglied der Entwicklergemeinschaft das gleiche Konzept mit dem QAxe. Gegen die industriellen Rechenzentren, die heute den Großteil des Schürfens von Bitcoin übernehmen, haben diese Geräte rechnerisch kaum eine Chance. Es gibt jedoch Ausnahmen: Erst im Juli 2026 hat ein Bitaxe den Block 957.382 der Bitcoin-Blockchain hinzugefügt."
                ],
                "en": [
                  "The Bitaxe Ultra Hex 301 has six ASIC chips on a single circuit board and is the first multichip device in the Bitaxe series.",
                  "The chips are arranged in two groups of three, supplied with twelve volts. A single power supply serves all six chips, replacing six separate power supplies.",
                  "A feature that had long been standard in industrial machines thus appeared for the first time in an openly documented design. Independently, another member of the developer community was pursuing the same concept as QAxe.",
                  "In terms of computing power, these devices stand little chance against the industrial mining facilities that now account for most Bitcoin mining. There are exceptions, however: as recently as July 2026, a Bitaxe added block 957,382 to the Bitcoin blockchain."
                ]
              }
            },
            {
              "kicker": "03",
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
                  "Der Antminer S19 führt 95 Billionen Rechenoperationen pro Sekunde durch bei einem Strombedarf von 3.250 Watt. Er kann insgesamt bis zu 16 kg (je nach Ausstattung mit Dashboards) wiegen und ist mit einer Lautstärke von 75 Dezibel lauter als ein Staubsauger. Das Gerät ist für den Dauerbetrieb vorgesehen, weshalb es nicht im Wohnzimmer, sondern in Hallen, zwischen Tausenden baugleicher Geräte, aufgestellt werden sollte. Abgeschaltet wird der Antminer nur, wenn er sich wirtschaftlich nicht mehr rechnet. Alle kleineren, in dieser Ausstellung präsentierten Geräte stammen von ihm ab: Ihre Chips wurden aus ausgemusterten Maschinen wie dieser aufgelötet. Weil es sich um ein kommerzielles Produkt handelte, waren keinerlei Daten über diese Maschinen veröffentlicht. So war es notwendig, die Ansteuerung der Chips zunächst rückzuentwickeln. Selbst die Anzahl an Chips pro Platine musste nachgezählt werden. Als 2020 der Antminer S19 erschien, war er das effizienteste luftgekühlte Gerät seiner Art. Nur sechs Jahre später leistet ein einzelner Chip der neusten Generation ein Vielfaches bei einem Bruchteil des Strombedarfs. Dies ist der Grund, warum Maschinen wie diese heute ausgemustert werden – und warum ihre Bauteile in den Bastelstuben landen, aus denen teilweise auch die übrigen Mining-Geräte dieser Ausstellung hergestellt wurden."
                ],
                "en": [
                  "The Antminer S19 performs 95 trillion calculations per second while consuming 3,250 watts of electricity. Depending on its configuration, including the installed hashboards, it may weigh up to 16 kg. Its noise level of around 75 decibels can make it louder than a household vacuum cleaner. Designed for continuous operation, it is intended for industrial buildings alongside thousands of identical devices. Such machines generally remain in operation for as long as they are profitable to run.",
                  "Several of the smaller devices presented in this exhibition use the same types of specialized chips found in industrial miners. These chips can be recovered by desoldering them from retired machines. Building open-source devices around proprietary chips presented a challenge: where the necessary technical documentation was unavailable, developers had to reverse-engineer the way the chips were controlled. Even basic details, such as the number of chips on each board, could require direct inspection.",
                  "When the Antminer S19 was released in 2020, it was among the most efficient air-cooled devices of its kind. Just six years later, a chip of a newer generation may deliver several times the computing performance of an earlier chip while consuming substantially less electricity for the same amount of computation. Improvements of this kind can make older machines uneconomical to operate. Their components may then find their way into home workshops, where they can be reused in devices such as some of the smaller miners presented here."
                ]
              }
            }
          ]
        },
        {
          "title": {
            "de": "Mining-Geräte in der Gläsernen Münze",
            "en": "Mining devices in the Transparent Coin"
          },
          "items": [
            {
              "kicker": "04",
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
                  "Auf diesem Gerät befinden sich erstmals vier ASIC-Chips auf einer Platine, die zusammen rund 2,4 Billionen Rechenoperationen pro Sekunde ausführen. Bis zu diesem Zeitpunkt trugen offene Geräte (open source) je einen einzigen Chip. Mehrere Chips zu betreiben ist keine Frage des Nebeneinandersetzens: Sie müssen gemeinsam mit Strom versorgt, gekühlt und in der richtigen Reihenfolge angesteuert werden. Statt fünf Volt setzt dieses Gerät auf zwölf Volt aus einem eigenen Netzteil. Ein kleiner Steuerchip auf der Platine übernimmt die Verwaltung, während die Rechenaufgaben selbst noch von einem angeschlossenen Computer geliefert werden. Erst spätere Geräte wurden davon unabhängig. Zeitgleich dazu verfolgte das Projekt zum Bitaxe Ultra Hex 301 den gleichen Gedanken. Es wurden somit zwei Antworten auf dieselbe Frage in derselben offenen Gemeinschaft entwickelt. Aus dieser Platine ging später der NerdQAxe hervor, einer der meistgebauten offenen Miner überhaupt."
                ],
                "en": [
                  "For the first time, this device brings together four ASIC chips on a single circuit board, performing around 2.4 trillion calculations per second. Until then, open-source devices had each used just one chip. Operating multiple chips involves more than placing them side by side: they need a coordinated power supply, cooling, and control signals in the correct sequence. Instead of five volts, this device uses twelve volts from a dedicated power supply. A small controller chip on the board manages the device, while a connected computer still supplies the computational tasks. Only later devices became independent of an external computer.",
                  "Simultaneously, the Bitaxe Ultra Hex 301 project pursued a similar idea. Two answers to the same question were thus developed within the same open-source community. This circuit board later evolved into the NerdQAxe, one of the most widely built open-source miners."
                ]
              }
            },
            {
              "kicker": "05",
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
                  "Der BitForge Nano wurde explizit als Bitcoin-Miner für zu Hause entwickelt. Er besitzt zwei ASIC-Chips, die rund 2,6 Billionen Rechenoperationen pro Sekunde rechnen, einen 12 Volt Eingang und ein Gehäuse. Alle übrigen offenen Miner dieser Ausstellung zeigen, was sie sind: nackte Platinen, sichtbare Kühlkörper, blinkende Anzeigen. Dieses Gerät hingegen verbirgt seine Technik. Es hat kein Display und wird über den Browser oder eine App eingerichtet. Der Bitforge Nano ist dafür gemacht, in einer Wohnung dauerhaft zu laufen, ohne dabei aufzufallen. Damit ergab sich ein Wendepunkt: Die offene Mining-Szene begann, nicht nur an Schaltungen zu arbeiten, sondern auch an der visuellen Gestaltung der Geräte. Eine Sonderausführung dieses Modells, die Ghost Edition, die Aluminiumgehäuse und Rauchglasfenster besitzt, wurde 2026 bei den London Design Awards mit Silber ausgezeichnet. Gestaltet wurde sie von Duncan Coombe, wobei „WantClue“ und „kliA90“ mitwirkten. Das Gerät ist Open Source: Schaltpläne und Firmware stehen unter einer Lizenz, die jede Weitergabe zur erneuten Offenlegung verpflichtet."
                ],
                "en": [
                  "The BitForge Nano was designed specifically as a Bitcoin miner for home use. It has two ASIC chips that perform around 2.6 trillion calculations per second, a 12-volt power input, and an enclosure.",
                  "All the other open-source miners in this exhibition reveal what they are: bare circuit boards, visible heat sinks, and blinking indicators. This device, however, conceals its technology. It has no display and is configured through a web browser or an app. The BitForge Nano is designed to run continuously in a home without drawing attention to itself. This marked a turning point: the open-source mining community began working on the visual design of its devices as well as their circuitry. A special version of this model, the Ghost Edition, with an aluminum enclosure and a smoked-glass window, received a silver award at the 2026 London Design Awards. It was designed by Duncan Coombe, with contributions from “WantClue” and “kliA90.”",
                  "The device is open source: its circuit diagrams and firmware are available under a license that requires any redistribution to be accompanied by a re-disclosure."
                ]
              }
            },
            {
              "kicker": "06",
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
                  "Der ASIC Chip BM1370 ist ein anwendungsspezifischer Chip, der nur eine einzige Rechenoperation ausführen kann. Diese dient dazu, einen sogenannten Block zu vervollständigen, um mit Bitcoin belohnt zu werden. Eine solche Rechenoperation wird ca. eine Billion Mal pro Sekunde durchgeführt. Chips wie dieser stecken beispielsweise in den Maschinen der industriellen Rechenzentren. Sie schürfen heute den Großteil aller neuen Bitcoin: zu Hunderten in einer Maschine, zu Zehntausenden in einer Halle. 2013 leistete ein vergleichbarer Chip ein Zwanzigstel bei gleichem Stromverbrauch. Dieser Innovationswettlauf innerhalb der Chip-Industrie und die Kommerzialisierung des Bitcoin-Systems hat das Bitcoin-Mining aus dem Wohnzimmer in die Industrie verlagert. Über den technischen Aufbau des verwendeten Chips der Herstellerfirma Bitmain ist nichts bekannt, es handelt sich um geschütztes Firmeneigentum. Wer diesen Chip für den Bau eines offenen Miners verwenden wollte, musste erst herausfinden, wie man mit ihm kommunizieren kann."
                ],
                "en": [
                  "The BM1370 ASIC chip is an application-specific chip capable of performing only one type of calculation. This calculation is used to complete a block and earn a Bitcoin reward. The chip performs around one trillion times per second. Chips like these are used in machines at industrial mining facilities, which now mine the vast majority of new bitcoin: hundreds of chips in a single machine, tens of thousands in a single building.",
                  "In 2013, a comparable chip delivered one-twentieth of this performance while consuming the same amount of electricity. This race for innovation within the chip industry, together with the commercialization of the Bitcoin system, moved Bitcoin mining from living rooms into industrial facilities.",
                  "The technical architecture of this chip, made by Bitmain, is undisclosed proprietary information. Anyone wishing to use it to build an open-source miner first had to work out how to communicate with it."
                ]
              }
            },
            {
              "kicker": "07",
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
                  "Der NerdNOS besteht aus zwei aufeinander gesteckten Platinen. Die Platine mit dem Display ist ein NerdMiner – ein Lerngerät mit buntem Display, das zwar mitrechnet, aber so langsam, dass es nur der reinen Anschauung dient. Die zweite Platine trägt einen echten ASIC-Chip und wird so mit einem Handgriff ressourcensparend zu einem Miner, der rund eine Million Mal schneller rechnen kann und nur eine WLAN-Verbindung benötigt. Damit ein gewöhnliches USB-Ladegerät zur Stromversorgung genügt, ist der Chip gezielt in seiner Leistung auf unter acht Watt gedrosselt. Genau so hat Bitcoin-Mining vor über zehn Jahren begonnen – mit einem Stecker in einer USB-Buchse."
                ],
                "en": [
                  "The NerdNOS consists of two circuit boards plugged into one another. The board with the screen is a NerdMiner — an educational device with a colorful display. It participates in mining calculations but does so at such a slow rate that it serves purely as a demonstration.",
                  "The second board carries an actual ASIC chip. Simply plugging it in transforms the educational device into a miner that makes efficient use of existing hardware, performs calculations around a million times faster, and needs only a Wi-Fi connection. The chip’s power consumption is deliberately limited to less than eight watts, allowing an ordinary USB charger to supply power. This recalls the early days of ASIC mining more than ten years ago, when small mining devices could simply be plugged into a USB port."
                ]
              }
            },
            {
              "kicker": "08",
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
                  "Als 2009 der Bitcoin entstand, konnte ihn jeder gewöhnliche Computer schürfen. Innerhalb weniger Jahre wurden diese Computer von spezialisierten Chips (ASICs) abgelöst, die nur noch eine einzige Rechenaufgabe beherrschten. Der Red Fury gehört zur ersten Generation jener Chips, die auch von Privatpersonen gekauft werden konnten. Dieser Stick wurde lediglich in eine USB-Buchse gesteckt und verbrauchte nur 2,5 Watt – weniger als eine Nachttischlampe. Rechnen konnte dieser aber nicht von allein: Ein angeschlossener Computer musste ihn mit Aufgaben versorgen. Der reihenweise Betrieb der USB-Sticks produzierte Abwärme, sodass sie extra gekühlt werden mussten. 2013 kostete dieser Stick rund 100 US-Dollar und war für kurze Zeit eines der schnellsten Geräte seiner Art. Zum Vergleich: Der 12 Jahre später gebaute ASIC Chip BM1370 rechnet ca. 1200-Mal schneller. Der Red Fury ist ein geschlossenes Produkt: das heißt, Chip und Bauplan sind geschütztes Firmeneigentum. Dies rief die ersten Open-Source-Gegenentwürfe der offenen Mining-Szene hervor."
                ],
                "en": [
                  "When Bitcoin launched in 2009, any ordinary computer could mine it. Within a few years, these computers were superseded by specialized chips known as ASICs, which could perform only one type of computational task. The Red Fury belongs to the first generation of ASIC mining devices available for purchase by private individuals.",
                  "This USB stick simply plugs into a USB port and consumes just 2.5 watts, which is less than a bedside lamp. However, it could not perform its calculations independently: a connected computer had to supply tasks. Running groups of these USB sticks generated heat, making additional cooling necessary. In 2013, this stick cost around US$100 and was briefly one of the fastest devices of its kind. By comparison, the BM1370 ASIC chip, made twelve years later, performs calculations around 1,200 times faster. The Red Fury is a closed-source product: both the chip and the circuit board design are proprietary. This prompted the open-source mining community to develop its first alternatives."
                ]
              }
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
        "en": ""
      },
      "title": {
        "de": "Neue Entwicklungen, bekannte Herausforderungen",
        "en": ""
      },
      "hinge": {
        "draft": true,
        "text": {
          "de": [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ],
          "en": []
        }
      }
    },
    {
      "type": "money",
      "id": "geld",
      "station": "geld",
      "eyebrow": {
        "de": "Neue Entwicklungen",
        "en": ""
      },
      "title": {
        "de": "Was ist Geld?",
        "en": ""
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
        "en": []
      },
      "blocks": [
        {
          "kicker": {
            "de": "Fiatgeld",
            "en": ""
          },
          "title": {
            "de": "Fiatgeld",
            "en": ""
          },
          "text": {
            "de": [
              "Unser derzeitiges Geldsystem basiert auf sogenanntem Fiatgeld. Dieser Fachbegriff findet kaum Eingang in die Öffentlichkeit. Er stammt vom lateinischen fiat („es werde\") und bezeichnet Geld, das seinen Wert nicht aus einem Eigenwert oder einer Edelmetalldeckung bezieht, sondern allein aus staatlicher Anordnung und gesellschaftlichem Vertrauen. Ein heutiger 20-Euro-Schein ist in seiner Nutzung als Papier praktisch wertlos und eine 1-Euro-Münze enthält Metall im Wert weniger Cent. Sie funktionieren aber als Geld, weil der Staat sie zum gesetzlichen Zahlungsmittel erklärt hat und die Zentralbank ihre Stabilität sichert."
            ],
            "en": []
          }
        },
        {
          "kicker": {
            "de": "Vertrauen",
            "en": ""
          },
          "title": {
            "de": "Vertrauen",
            "en": ""
          },
          "text": {
            "de": [
              "Wir vertrauen, dass andere unser Geld akzeptieren und dieses Vertrauen wird von Staaten, Notenbanken und Banken garantiert, die Geld ausgeben und Konten verwalten."
            ],
            "en": []
          }
        },
        {
          "kicker": {
            "de": "1944 bis 1971",
            "en": ""
          },
          "title": {
            "de": "Bretton Woods",
            "en": ""
          },
          "text": {
            "de": [
              "Von 1944 bis 1971 existierten mit dem Bretton-Woods-Währungssystem internationale Währungen, die über feste Wechselkurse an den Dollar gebunden waren. Dieser war seinerseits zu einem festen Kurs in Gold einlösbar. Mit der Aufhebung der Einlösbarkeit des Dollars in Gold 1971 durch die amerikanische Nixon-Regierung änderte sich das Währungssystem grundlegend."
            ],
            "en": []
          }
        },
        {
          "kicker": {
            "de": "Seit 1990",
            "en": ""
          },
          "title": {
            "de": "Digitales Geld",
            "en": ""
          },
          "text": {
            "de": [
              "Eine weitere einschneidende Veränderung war die aufkommende Idee von digitalem Geld. Sie entwickelt sich seit den 1990er Jahren mit E-Geld, Online-Banking, Kryptowerten und Stablecoins rapide weiter. Mit China existiert nunmehr das erste Land, welches, neben traditionellen Geldformen, eine Digitalwährung besitzt."
            ],
            "en": []
          }
        }
      ],
      "timeline": {
        "tag": {
          "de": "Vertiefung 1",
          "en": "Deep dive 1"
        },
        "title": {
          "de": "Zäsuren zum Fiatgeld",
          "en": ""
        },
        "intro": {
          "de": "Die wichtigsten Zäsuren auf dem Weg zum modernen reinen Fiatgeld",
          "en": ""
        },
        "items": [
          {
            "date": {
              "de": "1914–1918",
              "en": ""
            },
            "text": {
              "de": "Mit dem Ersten Weltkrieg setzten die meisten europäischen Staaten die Goldeinlösungspflicht ihrer Banknoten aus, um die Kriegsausgaben zu finanzieren. Es kam zu einer vorübergehenden Rückkehr zum Goldstandard in den 1920er Jahren; das endgültige Scheitern trat in der Weltwirtschaftskrise ab 1931 ein.",
              "en": ""
            }
          },
          {
            "date": {
              "de": "1944",
              "en": ""
            },
            "text": {
              "de": "Die Bretton-Woods-Konferenz etablierte ein neues internationales Währungssystem. Der US-Dollar wurde zur Leitwährung und war zu einem festen Kurs (35 Dollar pro Feinunze) in Gold einlösbar. Dies galt aber nur für Zentralbanken anderer Staaten, nicht für Privatpersonen. Alle anderen Währungen waren über feste Wechselkurse an den Dollar gebunden. Es war somit eine indirekte, gestufte Goldbindung vorhanden und es existierte kein voller Goldstandard mehr.",
              "en": ""
            }
          },
          {
            "date": {
              "de": "15. August 1971 („Nixon-Schock\")",
              "en": ""
            },
            "text": {
              "de": "US-Präsident Richard Nixon hob die Goldeinlösbarkeit des Dollars auf. Ab diesem Zeitpunkt sind die wichtigsten Weltwährungen reines Fiatgeld – ohne jede Sachwertbindung. Diese Datierung gilt als Geburtsstunde des modernen Fiat-Geldsystems.",
              "en": ""
            }
          },
          {
            "date": {
              "de": "1973",
              "en": ""
            },
            "text": {
              "de": "Übergang zu flexiblen Wechselkursen zwischen den großen Währungen.",
              "en": ""
            }
          },
          {
            "date": {
              "de": "1971 bis heute",
              "en": ""
            },
            "text": {
              "de": "Alle bedeutenden Währungen weltweit sind Fiatgeld. Ihr Wert beruht auf dem Vertrauen in die ausgebenden Staaten und Zentralbanken, ihre Stabilität auf der Geld-politik (Zinssteuerung, Inflationskontrolle). Diese Epoche dauert nun rund 55 Jahre an – historisch betrachtet eine kurze Phase.",
              "en": ""
            }
          }
        ]
      },
      "forms": {
        "tag": {
          "de": "Vertiefung 2",
          "en": "Deep dive 2"
        },
        "title": {
          "de": "Geldformen",
          "en": ""
        },
        "intro": {
          "de": [
            "Chronologische Übersicht der Geldformen",
            "Jede Geldform lässt sich in zwei Dimensionen beschreiben: ihrer äußeren Gestalt und ihrer Deckungsart."
          ],
          "en": []
        },
        "items": [
          {
            "title": {
              "de": "Warengeld (ab ca. 9000 v. Chr.)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: nutzbare Waren (z. B. Vieh, Getreide, Salz, Kakao, Tabak)",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: Eigenwert – Die Ware ist auch ohne Geldfunktion brauchbar.",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Frühformen ohne Eigennutzen (ab ca. 1200 v. Chr.)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: Kaurimuscheln, Wampum, Rai-Steine",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: gesellschaftliche Übereinkunft und Knappheit, erstmals wird der Wert allein durch Akzeptanz erzeugt",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Edelmetall-Wägegeld (ab ca. 3000 v. Chr.)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: unstandardisierte Silber- oder Goldstücke, vor jeder Transaktion wird gewogen",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: Eigenwert des Edelmetalls",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Vollwertige Münzen (ab ca. 600 v. Chr.)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: geprägte Münzen mit standardisiertem Gewicht und Feingehalt",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: Eigenwert des Edelmetalls",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Edelmetall-gedeckte Banknoten (in China ab 1024, in Europa ab 1661)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: bedrucktes Papier",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: Einlösungsversprechen in Edelmetall – Der Schein selbst ist nahezu wertlos, aber gegen hinterlegtes Gold oder Silber einlösbar.",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Scheidemünzen (zunehmend ab dem 19. Jahrhundert)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: Münzen aus unedlen Metallen oder mit reduziertem Edelmetallgehalt",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: staatliche Anordnung und Vertrauen. Der Materialwert liegt teils deutlich unter dem Nennwert; eine frühe Form des Fiat-Prinzips bei Münzen.",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Goldstandard-Währung (ca. 1870-1914, kurz wiederbelebt 1925-1931)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: Banknoten und Buchgeld",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: feste Goldparität – Währungen sind in Gold einlösbar; Zentralbanken halten Goldreserven.",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Bretton-Woods-Währungen (1944-1971)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: Banknoten und Buchgeld",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: gestufte Goldbindung über den US-Dollar – Dollar einlösbar in Gold (nur für Zentralbanken), andere Währungen fest an den Dollar gebunden",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Fiat-Geld (ab 1971 in voller Reinform)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: Banknoten und Buchgeld",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: staatliche Anordnung und Vertrauen in die Zentralbank; keine Einlösung in einen Sachwert; heute die dominierende Geldform weltweit",
              "en": ""
            }
          },
          {
            "title": {
              "de": "E-Geld (ab den 1990er Jahren)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: elektronisch gespeicherte Werteinheiten bei einem zugelassenen E-Geld-Institut",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: Einlösungsversprechen gegen Fiat-Geld",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Kryptowerte (ab 2009)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: digitale Werteinheiten auf einer Blockchain",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: algorithmische Knappheit ohne Einlösungsversprechen; seitens der EU keine Einstufung als „Geld“",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Stablecoins (ab ca. 2014)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: digitale Token auf einer Blockchain",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: Geldwerte, (Staats-)Anleihen, andere Kryptowerte und Fiat-Geld, Einlösungsversprechen von einem privaten Emittenten",
              "en": ""
            }
          },
          {
            "title": {
              "de": "Digitales Zentralbankgeld / CBDC (in Vorbereitung)",
              "en": ""
            },
            "shape": {
              "de": "Äußere Gestalt: digitale Werteinheiten in einer von der Zentralbank kontrollierten Infrastruktur",
              "en": ""
            },
            "backing": {
              "de": "Deckungsart: Fiat-Geld in neuer technischer Form: Wert beruht auf staatlicher Anordnung – aber ohne Umweg über Geschäftsbanken",
              "en": ""
            }
          }
        ]
      },
      "notMoney": {
        "tag": {
          "de": "Vertiefung 3",
          "en": "Deep dive 3"
        },
        "title": {
          "de": "Keine Geldformen",
          "en": ""
        },
        "text": {
          "de": [
            "Eine Geldform ist eine eigenständige Werteinheit mit eigener rechtlicher und ökonomischer Stellung. Eine bloße Schnittstelle oder Übertragungstechnologie ist keine Geldform, sondern eine Zugriffsform auf bereits bestehendes Geld.",
            "Keine eigenen Geldformen, sondern Zahlungswege oder Zugangstechnologien sind: Wechselbriefe und Schecks (Zahlungsanweisungen auf hinterlegtes Geld), Kreditkarten und Debitkarten (Zugriff auf Buchgeld), Überweisungen und Lastschriften (Übertragungswege für Buchgeld), Online-Banking (digitale Oberfläche für Buchgeld), Apple Pay, Google Pay, Alipay und WeChat Pay (Apps, die auf Karten oder Konten zugreifen), kontaktloses Zahlen und QR-Code-Zahlung (Übertragungstechnologien).",
            "Der Unterschied wird besonders deutlich bei PayPal: Eine Zahlung vom verknüpften Bank-konto über PayPal ist ein Zahlungsweg – das Geld bleibt Buchgeld der Bank. Ein PayPal-Guthaben hingegen ist E-Geld – also tatsächlich eine eigene Geldform."
          ],
          "en": []
        },
        "subtitle": {
          "de": "Was keine Geldformen sind",
          "en": ""
        }
      }
    },
    {
      "type": "lead",
      "id": "entwicklungen",
      "station": "entwicklungen",
      "eyebrow": {
        "de": "Neue Entwicklungen",
        "en": ""
      },
      "title": {
        "de": "Neue Entwicklungen, bekannte Herausforderungen",
        "en": ""
      },
      "text": {
        "de": [
          "Papiergeld war Menschen einmal genauso ungewohnt und suspekt, wie digitale Token es heute für viele sind. Als im 17. Jahrhundert die ersten Geldscheine in Europa auftauchten, war die Skepsis groß: Wie soll ein bedrucktes Stück Papier denselben Wert besitzen wie eine Münze aus Silber oder Kupfer?",
          "Im 21. Jahrhundert kommt ein neues Abstraktionslevel hinzu: Digitale Werte (digitale Token, Stablecoins, Kryptowerte im Allgemeinen) behaupten, als Zahlungsmittel oder Wertträger zu funktionieren. Die Geschichte des Geldes demonstriert, dass es immer wieder zur Entwicklung neuer Zahlungsmittel kam. Vier Beispiele aus drei Jahrhunderten zeigen, unter welchen Bedingungen neue Geldformen entstehen, unter welchen sie gelingen oder scheitern."
        ],
        "en": []
      }
    },
    {
      "type": "case",
      "id": "stockholm",
      "station": "stockholm",
      "deepLayout": "side",
      "eyebrow": {
        "de": "Scheitern ohne Regeln",
        "en": ""
      },
      "title": {
        "de": "Zu viel Papier, zu wenig Vertrauen: Palmstruch und die Stockholms Banco",
        "en": ""
      },
      "image": null,
      "text": {
        "de": [
          "Schweden bezahlte im 17. Jahrhundert mit Kupferplatten. Sie wogen bis zu 20 Kilogramm, was das Problem unmittelbar verdeutlicht: Dieses Geld war schwer, unhandlich und im Alltag kaum zu gebrauchen.",
          "Johan Palmstruch, ein aus Riga stammender Kaufmann, erhielt 1656 vom schwedischen König die Genehmigung, eine Bank zu gründen. Palmstruchs Idee war progressiv: Statt die schweren Platten herumzutragen, sollten Papierscheine deren Wert verbürgen. Wer Kupfer bei der „Stockholms Banco“ einlagerte, bekam dafür einen Kreditzettel. Damit entstand das erste Papiergeld Europas.",
          "Anfangs funktionierte das System. Die Zettel waren viel leichter und handlicher als die Platten. Der Zahlungsverkehr konnte zudem schneller abgewickelt werden. Doch es fehlte als essenzieller Bestandteil eine Regulierung der Emissionen: Niemand kontrollierte, wie viele Scheine die Bank ausgab. Palmstruch ließ mehr Zettel drucken, als durch Einlagen gedeckt waren. Als sich das herumsprach, wollten alle gleichzeitig ihre Scheine gegen Kupfer eintauschen. Die Bank konnte diesen Forderungen nicht nachkommen. 1668 brach sie schließlich zusammen. Palmstruch wurde zunächst zum Tode verurteilt, später aber zu einer Gefängnisstrafe begnadigt.",
          "Aus diesem Scheitern zog Schweden eine Konsequenz: Die Leitung der Nachfolgeeinrichtung der Stockholms Banco, die Riksens Ständers Bank, die heutige Schwedische Nationalbank (Sveriges Riksbank), wurde nicht mehr einem privaten Unternehmer überlassen, sondern unter die Aufsicht des Parlaments gestellt. Sie gilt als älteste noch bestehende Zentralbank der Welt."
        ],
        "en": []
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "Deep dive"
          },
          "title": {
            "de": "Bank Runs – damals und heute",
            "en": ""
          },
          "text": {
            "de": [
              "Was 1668 in Stockholm geschah, hat einen Namen, der bis heute verwendet wird: Bank Run. So bezeichnet man den Ansturm auf eine Bank, wenn das Vertrauen schwindet und zu viele Menschen gleichzeitig ihr Geld abheben wollen. Das Muster wiederholt sich in der Geschichte des Geldes regelmäßig: Immer dann, wenn mehr Geld produziert wird, als gedeckt ist, und wenn dieses Missverhältnis sichtbar wird, bricht das Vertrauen seitens der Gesellschaft zusammen – oft innerhalb von Stunden.",
              "Im Bereich digitaler Token ist dieselbe Dynamik zu beobachten. Im Mai 2022 verlor der sogenannte Stablecoin TerraUSD innerhalb weniger Tage seine Bindung an den US-Dollar. Das System brach zusammen, der zugehörige Token Luna wurde praktisch wertlos. Schätzungen zufolge gingen dabei Vermögenswerte in Höhe von rund 40 Milliarden US-Dollar verloren.",
              "Anders als bei Banken gab es bei TerraUSD keine Einlagensicherung, keine Aufsichtsbehörde, die hätte eingreifen können, keinen Staat, der haftete. Es ist einer der Gründe, warum die Europäische Union mit der MiCA-Verordnung inzwischen versucht, regulatorische Rahmen zu schaffen. Dies ist vergleichbar mit der Konsequenz, die Schweden 1668 zog, als es die Bankaufsicht dem Parlament unterstellte."
            ],
            "en": []
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
        "en": ""
      },
      "title": {
        "de": "Das erste Papiergeld im deutschsprachigen Raum",
        "en": ""
      },
      "image": null,
      "text": {
        "de": [
          "Was in Schweden scheiterte, gelang wenige Jahrzehnte später in Sachsen.",
          "Sachsen gab als erstes deutsches Territorium Papiergeld heraus. Auch hier war die Ausgangslage pragmatisch: Der Staat brauchte Geld, und Münzmetall war knapp. Doch anders als Palmstruch in Stockholm setzte Sachsen nicht allein auf freiwillige Akzeptanz des Geldes seitens der Bevölkerung. Per Verordnung wurde festgelegt, dass bestimmte Zahlungen in der neuen Geldform geleistet werden mussten.",
          "Damit entstand ein Kreislauf. Wer Steuern in Form von Papiergeld zahlen konnte, war auch eher bereit, es als Zahlungsmittel im Handel anzunehmen. Das Vertrauen wuchs nicht aus Begeisterung für die neue Geldform, sondern aus dem alltäglichen Gebrauch und den dahinterstehenden Regeln."
        ],
        "en": []
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "Deep dive"
          },
          "title": {
            "de": "Rahmensetzung als Voraussetzung",
            "en": ""
          },
          "blocks": [
            {
              "type": "p",
              "text": {
                "de": "Was in Sachsen funktionierte, war kein Zufall. Hinter dem Erfolg stand ein Prinzip, das bis heute in der Geldtheorie diskutiert wird: Die sogenannte Steuertheorie des Geldes (auch Chartalismus genannt) argumentiert, dass Geld seinen Wert nicht aus dem Material oder einer inneren Eigenschaft bezieht, sondern aus der Tatsache, dass ein Staat es als Zahlungsmittel für Steuern akzeptiert. Dieses Akzeptanzversprechen schafft die Nachfrage, die dem Geld seinen Wert gibt.",
                "en": ""
              }
            },
            {
              "type": "p",
              "text": {
                "de": "Der kurfürstliche Erlass schuf einen Rahmen, innerhalb dessen das neue Geld funktionieren konnte. Die Form der Rahmensetzung war autoritär, das Prinzip dahinter ist universell: Ohne verbindliche Regeln kein Vertrauen, ohne Vertrauen kein funktionierendes Geld.",
                "en": ""
              }
            },
            {
              "type": "p",
              "text": {
                "de": "In der Gegenwart versuchen drei große Wirtschaftsräume, auf je eigene Weise Rahmenbedingungen für digitale Zahlungsmittel zu schaffen.",
                "en": ""
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
                    "en": ""
                  }
                },
                {
                  "label": {
                    "de": "USA",
                    "en": "USA"
                  },
                  "text": {
                    "de": "Die USA haben 2025 mit dem GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins) ein Gesetz speziell für Stablecoins verabschiedet. Es verlangt unter anderem, dass Herausgeber für jeden ausgegebenen Stablecoin Reserven in Höhe von mindestens einem US-Dollar halten. Zugleich hat die US-Regierung die Entwicklung einer staatlichen Digitalwährung untersagt und setzt stattdessen auf private Anbieter. Die Rahmensetzung beschränkt sich hier bewusst auf den privaten Sektor.",
                    "en": ""
                  }
                },
                {
                  "label": {
                    "de": "China",
                    "en": "China"
                  },
                  "text": {
                    "de": "China geht den Weg, der dem sächsischen Modell des 18. Jahrhunderts strukturell am nächsten kommt. Der digitale Yuan wird seit 2019 vom Staat eingeführt und aktiv in den Alltag eingebettet – über Gehaltszahlungen im öffentlichen Dienst, Integration in staatliche Dienstleistungen und Anreizsysteme. Zugleich ist der Kryptomarkt vollständig verboten. Wie damals in Sachsen schafft der Staat nicht nur den Rahmen, sondern bestimmt auch, welches Zahlungsmittel verwendet wird – und welches nicht. Die Rahmensetzung ist hier umfassend und autoritär.",
                    "en": ""
                  }
                }
              ]
            },
            {
              "type": "p",
              "text": {
                "de": "Drei Ansätze, die unterschiedlicher kaum sein könnten: Demokratisch regulieren (EU), den privaten Markt ordnen (USA), staatlich durchsetzen (China). Was sie verbindet, ist die Einsicht, die schon das sächsische Beispiel zeigt: Neue Geldformen setzen sich nicht von allein durch. Sie brauchen einen Rahmen.",
                "en": ""
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
        "en": ""
      },
      "title": {
        "de": "Die VOC und die Macht der Infrastruktur",
        "en": ""
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
        "en": []
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung",
            "en": "Deep dive"
          },
          "title": {
            "de": "Company Money – von der VOC zu PayPal und Stablecoins",
            "en": ""
          },
          "text": {
            "de": [
              "Das Prinzip des Firmengeldes reicht weit über die VOC hinaus. Im 19. Jahrhundert zahlten Unternehmen in manchen Regionen ihre Arbeiter in eigenen Marken oder Gutscheinen aus (sogenanntes Truck-System oder Scrip), die nur in firmeneigenen Läden eingelöst werden konnten. Diese offensichtliche Form der Abhängigkeit wurde schließlich gesetzlich verboten.",
              "Die Parallele zwischen der VOC und den heutigen Technologie- und Finanzkonzernen: Private Unternehmen schaffen monetäre Infrastrukturen, die so weit verbreitet und so tief in den Alltag eingebettet sind, dass sie faktisch unvermeidlich werden – ohne dass ihre Nutzer auf die Regeln dieser Infrastrukturen Einfluss hätten."
            ],
            "en": []
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
        "en": ""
      },
      "title": {
        "de": "Die „Free-Banking-Era“ (1836–1862)",
        "en": ""
      },
      "image": null,
      "text": {
        "de": [
          "In den USA des 19. Jahrhunderts gab es über weite Strecken keine Zentralbank – und kein einheitliches Papiergeld. Zwischen 1836 und 1863, in der sogenannten Free Banking Era, druckten tausende Banken, Eisenbahngesellschaften, Immobilienfirmen und einzelne Händler eigene Geldscheine. Jeder Schein musste einzeln beurteilt werden: Wer hat ihn ausgegeben? War er gedeckt? Wo konnte er eingelöst werden? Kaufleute brauchten gedruckte Nachschlagewerke, um die Glaubwürdigkeit einzelner Noten zu prüfen.",
          "Die vier ausgewählten Geldscheine zeigen die Bandbreite: Eine Banknote aus dem Baumwollhandel in Georgia, ein Drei-Dollar-Schein aus Michigan, dem Bundesstaat, der zum Inbegriff betrügerischer Bankgründungen wurde, ein Schein einer Immobilienfirma aus Iowa, die nach einem Jahr pleiteging, und ein Händlerschein aus Baltimore, der noch 1871 gedruckt wurde, obwohl ein nationales Gesetz das private Gelddrucken längst hatte beenden sollen.",
          "Erst 1863 schuf der National Banking Act einheitliche Regeln: Banken durften Papiergeld ausgeben, mussten dafür jedoch US-Staatsanleihen als Sicherheit hinterlegen. Zudem waren die Noten nicht mehr nur lokal gültig, sondern konnten überall im Land eingelöst werden.",
          "Die Parallele zur heutigen Kryptowelt liegt in der Vielzahl privater digitaler Geldversprechen. Die Fülle an Stablecoins unterscheidet sich in Herausgeber, Deckung, Einlösbarkeit und Regulierung. Die Geschichte der Free Banking Era zeigt, dass ein unübersichtlicher Geldmarkt früher oder später die Frage nach gemeinsamen Standards und verlässlicher Aufsicht aufwirft."
        ],
        "en": []
      },
      "deepDives": [
        {
          "tag": {
            "de": "Vertiefung 1",
            "en": "Deep dive 1"
          },
          "title": {
            "de": "Wildcat Banking, Stablecoins und die Frage nach der Ordnung",
            "en": ""
          },
          "text": {
            "de": [
              "Zwischen 1836 und 1913 besaßen die Vereinigten Staaten keine Zentralbank. Das war kein Zufall, sondern das Ergebnis eines erbitterten politischen Kampfes. Zweimal hatte der Kongress eine nationale Bank gegründet – 1791 und 1816 –, und beide Male war sie nach 20 Jahren wieder verschwunden.",
              "Anders als in Europa, wo Zentralbanken durch dauerhafte Gesetze errichtet wurden, erhielten die beiden US-Nationalbanken vom Kongress jeweils nur eine befristete Genehmigung über 20 Jahre. Diese Befristung selbst war schon ein politischer Kompromiss, denn die Gegner akzeptierten die Bank nur unter der Bedingung, dass sie automatisch enden würde, wenn die nächste Generation von Parlamentariern nicht erneut zustimmte. Genau das geschah: 1811 und 1836 hatten sich die Machtverhältnisse verschoben und eine Verlängerung scheiterte. Erst 1913, beim dritten Anlauf, wurde die Federal Reserve ohne Ablaufdatum gegründet – und besteht bis heute.",
              "In die Lücke, die der Wegfall der Zentralbank hinterließ, traten hunderte private Banken mit der Ausgabe eigener Geldscheine."
            ],
            "en": []
          },
          "subtitle": {
            "de": "Warum die USA 76 Jahre lang kein einheitliches Papiergeld hatten",
            "en": ""
          }
        },
        {
          "tag": {
            "de": "Vertiefung 2",
            "en": "Deep dive 2"
          },
          "title": {
            "de": "Die Free Banking Era: Tausende verschiedene „Währungen“",
            "en": ""
          },
          "text": {
            "de": [
              "Ab 1837 konnte in vielen Bundesstaaten praktisch jeder eine Bank gründen. Und jede Bank konnte eigene Geldscheine drucken. Aber es blieb nicht nur bei den Banken: Auch Eisenbahngesellschaften, Versicherungen, Immobilienfirmen und einzelne Kaufleute brachten Scheine in Umlauf.",
              "Die Noten sollten durch hinterlegte Sicherheiten gedeckt sein, zumeist durch Staatsanleihen der Einzelstaaten. In der Praxis variierte die Qualität enorm. In Michigan wurden teils illiquide oder bereits im Wert gefallene Anleihen akzeptiert. Im schlimmsten Fall bestanden die „Barreserven“ einer Bank aus Kisten voller Nägel und Glas, die obenauf durch eine dünne Schicht an Silbermünzen getarnt wurden.",
              "Konnte man mit einem Schein einer bestimmten Bank überall bezahlen? Nein. Eine Note der Bank of New York wurde in Philadelphia vielleicht mit 1–2 % Abschlag akzeptiert; die Note einer entlegenen Bank in Michigan konnte 20–50 % unter Nennwert gehandelt werden – oder gar nicht.",
              "Um mit diesem Chaos umzugehen, entstand eine eigene Informationsinfrastruktur, die wiederum einen Spekulationsmarkt entstehen ließ. Sogenannte Banknote Reporters listeten auf, welche Banken noch zahlungsfähig waren und zu welchem Abschlag deren Noten gehandelt wurden. Note Brokers kauften Banknoten unter Nennwert, reisten zur ausgebenden Bank und lösten sie in Gold ein, wenn dieses vorhanden war.",
              "Diese Verzeichnisse und Händler sind das historische Pendant zu heutigen Krypto-Tracking-Websites wie CoinMarketCap oder CoinGecko. Damals wie heute gilt: Wo privates Geld nicht einheitlich vertrauenswürdig ist, entsteht Spekulationshandel.",
              "Etwa ein Drittel aller umlaufenden Banknoten waren überdies Fälschungen."
            ],
            "en": []
          }
        },
        {
          "tag": {
            "de": "Vertiefung 3",
            "en": "Deep dive 3"
          },
          "title": {
            "de": "Der Weg zur Ordnung – und die Parallelen zu heute",
            "en": ""
          },
          "text": {
            "de": [
              "1863 verabschiedete der Kongress den National Banking Act: Es wurden bundesweit lizenzierte Banken mit einheitlicher Deckung durch US-Staatsanleihen durchgesetzt. Eine Strafsteuer von 10 % auf die alten Banknoten machte diese unwirtschaftlich. Ab 1874 konnten die neuen National Bank Notes überall im Land zum vollen Nennwert eingelöst werden. Zum ersten Mal war es egal, welche Bank einen Schein ausgestellt hatte.",
              "Wirtschaftswissenschaftler bezeichnen diesen Zustand als „informationsunempfindlich“: Es muss bei diesem Geld nicht mehr recherchiert werden, wer es herausgegeben hat. Dasselbe Ziel hat die heutige Stablecoin-Regulierung: Ein Stablecoin soll so sicher und austauschbar werden, dass die Frage nach dem Emittenten irrelevant wird.",
              "Die MiCA-Verordnung der EU verfährt dabei ähnlich wie der National Banking Act: Dollar-Stablecoins werden nicht verboten, aber durch Lizenzpflichten und Transaktionsobergrenzen so stark reglementiert, dass nicht-konforme Emittenten aus dem europäischen Markt gedrängt werden. Die Banque de France warnte 2026 vor einer „digitalen Dollarisierung“. Sie sieht es als Gefahr, dass der Zahlungsverkehr auf Blockchains standardmäßig über Dollar-Token läuft und somit der Euro an Bedeutung verliert. Als Gegenmaßnahme entwickeln europäische Banken einen Euro-Stablecoin (Qivalis, geplant Ende 2026). Die EZB treibt parallel den digitalen Euro voran."
            ],
            "en": []
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
