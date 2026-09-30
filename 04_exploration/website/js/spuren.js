/*
  Krypto, was? – Krypto-Spuren (versteckter Bereich)
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

  Jede Spur füllt den ganzen Bildschirm. Darunter ein Button zur Ausstellungswebsite
  (Ziel: websiteUrl; leer = diese Website) und ein Pfeil zur nächsten Spur.
  Alle Texte als { de, en } wie in content.js. Leeres en = deutscher Text wird gezeigt.
*/
(function () {
  // Bilder liegen in img/. Ohne Dateiname = Platzhalter „Bild folgt“
  const image = (file = '', de = '', en = '') => ({ src: file ? `img/${file}` : '', alt: { de, en } });

  window.KW_SPUREN = {
    title: { de: 'Krypto-Spuren', en: 'Crypto Traces' },
    // Ziel des Buttons unter jeder Spur. Leer = Startseite dieser Website (Onepager).
    websiteUrl: '',
    ui: {
      trace: { de: 'Spur', en: 'Trace' },
      back: { de: 'Zur Ausstellung', en: 'Back to the exhibition' },
      imagePending: { de: 'Bild folgt', en: 'Image to follow' },
      image: { de: 'Bild', en: 'Image' },
      images: { de: 'Bilder', en: 'Images' },
      overview: { de: 'Alle Spuren', en: 'All traces' },
      website: { de: 'Zur Ausstellung „Krypto, was?“', en: 'Visit the exhibition “Crypto, what?”' },
      next: { de: 'Weitere Spuren', en: 'More traces' },
      toOverview: { de: 'Zur Übersicht', en: 'Back to overview' }
    },

    // description: Objektschild, Zeilen mit \n getrennt.
    // QR-Codes im Schloss: http://www.skd.museum/krypto-was/qr<nr>
    items: [
      { // → index.html?spur=1
        nr: 1,
        title: { de: 'Das Buchstaben­rätsel', en: 'The Letter Puzzle' },
        description: {
          de: 'Englische Treppe\nOriginal: 1895',
          en: 'Englische Treppe\nOriginal: 1895'
        },
        images: [image()],
        text: {
          de: [
            'Schauen Sie nach oben! An den Ecken der Stuckdecke über der englischen Treppe treten zwei vergoldete Zeichen paarweise hervor. Diese Monogramme bestehen jeweils aus zwei fast bis zur Unkenntlichkeit ineinander verschlungenen Buchstaben. Dabei handelt es sich um die Initialen des sächsischen Königpaars Albert und Carola: AR (für Albertus Rex = König Albert) und CR (für Carola Regina = Königin Carola). Unter ihrer Bauherrschaft erhielt die Englische Treppe 1895 eine neobarocke Umgestaltung. Nach den Kriegszerstörungen wurde dieser Zustand zwischen 2005 und 2010 rekonstruiert.',
            'Im Gegensatz zum vorliegenden Fall können Monogramme manchmal als diskreter Nachweis einer Urheberschaft oder als Signatur dienen. Geht jedoch das Wissen um die Auflösung verloren, erscheinen sie uns rätselhaft. Fast wie eine geheime Botschaft, die unkenntlich und nur für Mitwissende bestimmt ist.',
            'Wenn Sie sich für Geheimbotschaften und die Geschichte der Kryptografie bis in unsere digitale Gegenwart interessieren, dann folgen Sie gern dieser Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett. Vielleicht begegnen Ihnen auch dort Carola und Albert?'
          ],
          en: [
            'Look up! At the corners of the stucco ceiling above the “Englische Treppe” (English Staircase), two gilded symbols stand out in pairs. Each of these monograms consists of two letters intertwined almost beyond recognition. They are the initials of the Saxon royal couple, Albert and Carola: AR (for Albertus Rex = King Albert) and CR (for Carola Regina = Queen Carola). Under their patronage, the “Englische Treppe” underwent a Neo-Baroque redesign in 1895. Following the destruction caused by the war, this original state was reconstructed between 2005 and 2010.',
            'In contrast to this case, monograms can sometimes serve as discreet evidence of authorship or as a signature. However, if knowledge of their meaning is lost, they appear enigmatic to us. Almost like a secret message, indecipherable and intended only for those in the know.',
            'If you’re interested in secret messages and the history of cryptography up to our digital present, follow this “Crypto Trace” to the 2nd floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett. Maybe you’ll even run into Carola and Albert there?'
          ]
        }
      },
      { // → index.html?spur=2
        nr: 2,
        title: { de: 'Mit ge­schlossenem „Visier“', en: 'With the “Visor” Closed' },
        description: {
          de: 'Riesensaal\nHelm, sogenannter Rennhut\nSächsisch, letztes Drittel des 16. Jahrhunderts\nRüstkammer, Inv.-Nr. M 0051',
          en: 'Riesensaal\nHelmet, known as a “Rennhut”\nSaxon, last third of the 16th century\nRüstkammer, Inv. No. M 0051'
        },
        images: [image('Kryptospur 2 Harnisch Rennhut.jpg', 'Helm, sogenannter Rennhut', 'Helmet, known as a “Rennhut”')],
        text: {
          de: [
            'Seit der Mensch Metall bearbeiten kann, nutzt er Bronze und Eisen für den Körperschutz im Krieg und beim Turnier. Zur Vermeidung von Kopfverletzungen, die etwa bei dem mit stumpfen Lanzen ausgetragenen Zweikampf des Plankengestechs entstehen konnten, wurden alle Öffnungen dieses Helms minimiert: Das Gesicht wird von einem aufklappbaren Stirnstulp und dem an der Helmglocke angeschraubten Bart geschützt. Mit geschlossenen Klappen ist der Kämpfer verborgen und nur durch äußere Erkennungszeichen identifizierbar – hier am aufgemalten Wappen auf der linken Schulter.',
            'In der Gleichzeitigkeit von Anonymität und Transparenz – die Reiter sind durch die Wappen individuell unterscheidbar, die Menschen in der Rüstung bleiben anonym – ähnelt dieses Prinzip der Logik einer Blockchain. Eine Blockchain ist eine dezentrale, digitale Datenbank, die Informationen sicher und chronologisch speichert. Inhaberinnen und Inhaber der Kryptowerte bleiben innerhalb des Netzwerks pseudonym. Das heißt, sie weisen sich durch verschlüsselte Zeichenketten statt ihrer Klarnamen aus. All ihre Transaktionen sind öffentlich einseh- und nachvollziehbar. Das garantiert ein sogenannter öffentlicher Schlüssel. Dieser wird individuell jedem Teilnehmenden zugeordnet, genau, wie die individuellen Wappen auf den Rüstungen der Reiter.',
            'Diese Verbindung fasziniert Sie? Dann folgen Sie gern unserer Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett. Dort erfahren Sie mehr über die Kryptowerte und ihre Bedeutung in unserer digitalen Gegenwart.'
          ],
          en: [
            'Ever since humans have been able to process metal, they have used bronze and iron for body armor in war and tournaments. To prevent head injuries, which could occur, for example, during the “Plankengestech,” a duel fought with blunted lances, all openings in this helmet were minimized: The face is protected by a flip-up brow guard and a chin guard screwed onto the helmet bowl. With the visor closed, the fighter is concealed and identifiable only by external distinguishing marks – in this case, the coat of arms painted on the left shoulder.',
            'In the coexistence of anonymity and transparency, the riders are individually distinguishable by their coats of arms, while the individuals in armor remain anonymous. This principle resembles the logic of a blockchain. A blockchain is a decentralized, digital database where blocks of information are stored securely and chronologically. Holders of crypto assets remain pseudonymous within the network. This means they identify themselves using encrypted strings of characters instead of their real names. All of their transactions are publicly viewable and traceable. This is guaranteed by what is known as a public key, just like the individual coats of arms on the horsemen’s armor.',
            'Does this connection interest you? Follow our “Crypto Trace” to the 2nd floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett. There, you’ll find out more about crypto assets and their significance in our digital world today.'
          ]
        }
      },
      { // → index.html?spur=3
        nr: 3,
        title: { de: 'Nur für Ein­geweihte', en: 'For Insiders Only' },
        description: {
          de: 'Türkische Kammer\nPallasch\nKlinge Mailand (?), Griff marokkanisch, Montur und Klingendekor Osmanisch\nVor 1577\nInv.-Nr. Y 41',
          en: 'Turkish Chamber\nPallasch\nBlade: Milanese (?), hilt: Moroccan, mountings and blade decoration: Ottoman\nBefore 1577\nInv. No. Y 41'
        },
        images: [
          image('Kryptospur 3 Pallasch Bild 1.jpg', 'Pallasch', 'Pallasch'),
          image('Kryptospur 3 Pallasch Bild 2.jpg', 'Pallasch, Inschrift auf der Klinge', 'Pallasch, inscription on the blade')
        ],
        text: {
          de: [
            'In diese außerordentlich große Klinge hat ein wohl osmanischer Künstler Ornamente und eine geheimnisvolle Inschrift geätzt. Dabei handelt es sich nicht um Worte einer Sprache aus dem östlichen Mittelmeerraum, sondern um eine auf lateinischer Kursivschrift basierende „Geheimsprache“, bei der Buchstaben mal stark vereinfacht, mal gedoppelt bzw. gespiegelt wurden. Die Inschrift lässt sich als „Reyna de las espadas.“ entschlüsseln („Königin unter den Schwertern“).',
            'Die Geschichte der Geheimschrift, der Kryptografie (altgriechisch, kryptós: verborgen, geheim; gráphein: schreiben), von der auch die rätselhafte Inschrift auf der Klinge zeugt, reicht weit zurück. Beispielsweise wickelten die Spartaner zur Übermittlung geheimer Botschaften vor rund 2500 Jahren Lederstreifen um einen Holzstab und beschrieben den Streifen. Abgewickelt war der Text zunächst nicht lesbar. Nur wer den genauen Durchmesser des Holzstabes kannte, konnte die Botschaft der sogenannten Skytale entschlüsseln.',
            'Wenn Sie sich für geheime Botschaften und die Bedeutung der Kryptografie bis in unsere digitale Gegenwart interessieren, dann folgen Sie gerne dieser Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett.'
          ],
          en: [
            'An artist, likely Ottoman, has etched ornaments and a mysterious inscription onto this exceptionally large blade. These are not words from a language of the eastern Mediterranean region, but rather a “secret language” based on Latin cursive script, in which letters are sometimes greatly simplified, sometimes doubled, or sometimes mirrored. The inscription can be deciphered as “Reyna de las espadas.” (“Queen of Swords.”)',
            'The history of secret writing, or cryptography (from Ancient Greek: kryptós, meaning “hidden” or “secret”; gráphein, meaning “to write”), as illustrated by the enigmatic inscription on the blade, stretches far back in time. For example, about 2,500 years ago, the Spartans would wrap strips of leather around a wooden rod and write on them to convey secret messages. When unwrapped, the text was initially illegible. Only those who knew the exact diameter of the wooden rod could decipher the message on the so-called scytale.',
            'If you’re interested in secret messages and the significance of cryptography right up to our digital present, follow this “Crypto Trace” to the 2nd floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett.'
          ]
        }
      },
      { // → index.html?spur=4
        nr: 4,
        title: { de: 'Schild mit Über­raschung', en: 'Shield with a Surprise' },
        description: {
          de: '„Auf dem Weg zur Kurfürstenmacht“\nArmschild mit Schwertklinge\nNorditalienisch, erstes Viertel des 16. Jh.\nInv.-Nr. N 70, XIV 9',
          en: '“On the Way to Electoral Power”\nArm shield with sword blade\nNorthern Italian, first quarter of the 16th century\nInv. No. N 70, XIV 9'
        },
        images: [image('Kryptospur 4 Armschild.jpg', 'Armschild mit Schwertklinge', 'Arm shield with sword blade')],
        text: {
          de: [
            'In dem mit einer antiken römischen Kampfszene bemalten Armschild ist eine 64 cm lange, ausfahrbare Klinge versteckt. Somit ermöglicht die scheinbare Schutzwaffe im Notfall auch den Angriff.',
            'Dieses Beispiel führt zu einer, zunächst vielleicht überraschenden, Parallele zur Blockchain-Technologie. Diese verfügt über aktive und defensive Sicherheitselemente, die zu ihrem Schutz beitragen: eine Verkettung der Blöcke, digitale Signaturen, eine verteilte Speicherung von Informationen sowie Transparenz durch die Transaktionshistorie. Dadurch wird eine einmal bestätigte Transaktion unumkehrbar. Nach Stand der derzeitigen Technologie ist die Blockchain durch diese Mechanismen nicht manipulierbar.',
            'Wenn Sie genauer erfahren wollen, wie eine Blockchain funktioniert und wie sich diese Funktionsweise in die lange Geschichte der Kryptografie einfügt, dann folgen Sie gerne unserer Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett.'
          ],
          en: [
            'Hidden inside this arm shield, which is painted with an ancient Roman battle scene, is a 64-cm-long retractable blade. Thus, what appears to be a defensive weapon, can also be used for attack in an emergency.',
            'This example draws a parallel, perhaps surprising at first glance, to blockchain technology. The Blockchain features both active and defensive security elements that contribute to its protection: a chained structure of blocks, digital signatures, distributed storage of information, and transparency through the transaction history. As a result, once a transaction is confirmed, it becomes irreversible. Based on the current state of technology, these mechanisms ensure that the blockchain cannot be manipulated.',
            'If you’d like to learn more about how a blockchain works and how this functionality fits into the long history of cryptography, follow our “Crypto Trace” to the second floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett.'
          ]
        }
      },
      { // → index.html?spur=5
        nr: 5,
        title: { de: 'Das Geheim­versteck', en: 'The Secret Hide­away' },
        description: {
          de: 'Kunstkammer\nGroßer Schiffersteinschrank\nDresden 1615\nKGM, Inv.-Nr. 47708',
          en: 'Kunstkammer\nLarge Schifferstein Cabinet\nDresden, 1615\nKGM, Inv. No. 47708'
        },
        images: [image('Kryptospur 5 Schiffersteinschrank.jpg', 'Großer Schiffersteinschrank', 'Large Schifferstein Cabinet')],
        text: {
          de: [
            'Kurfürst Johann Georg I. erwarb diesen großen Kabinettschrank 1615 für die enorme Summe von 3000 Gulden von dem Dresdner Tischler Hans Schifferstein. Im Inneren sind 121 Fächer und Schubladen versteckt; zwischen dem Schrankaufsatz und dem Tisch ist außerdem ein ausziehbares Spinett eingearbeitet.',
            'Kunstvoll verzierte Kabinettschränke wie dieser dienten, ähnlich wie heute moderne Tresore, zur Aufbewahrung wertvoller und sensibler Besitztümer. Der komplexe Aufbau solcher Schränke sollte verhindern, dass potenzielle Diebe die Besitztümer fanden. Im Zeitalter von Kryptowerten setzt sich diese Geschichte im Digitalen fort, allerdings mit einer Verschiebung: Aufbewahrt wird nicht mehr der Wert selbst, sondern der Zugang zu ihm. Kryptowerte liegen als Einträge in der Blockchain, der Zugang erfolgt über einen privaten Schlüssel. Die Wallet verwahrt diesen Schlüssel. Aus der Seed-Phrase lässt sich der Schlüssel jederzeit wiederherstellen, weshalb sie das eigentlich Schützenswerte ist, das heutige Geheimfach.',
            'Diese Begriffe haben Sie noch nie gehört? Das macht nichts! Wenn Sie mehr erfahren wollen, dann folgen Sie unserer Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett.'
          ],
          en: [
            'Elector John George I of Saxony acquired this large cabinet in 1615 for the enormous sum of 3,000 guilders from the Dresden cabinetmaker Hans Schifferstein. Hidden inside are 121 compartments and drawers; a pull-out spinet is also built into the space between the cabinet’s top and the table.',
            'Artfully decorated cabinet chests like this one served, much like modern safes today, to store valuable and sensitive possessions. The complex design of such chests was intended to prevent potential thieves from finding the contents. In the age of crypto assets, this story continues in the digital realm, albeit with a shift: it is no longer the value itself that is preserved, but rather access thereto. Crypto assets exist as entries in the blockchain, and access is granted via a private key. The wallet safeguards this key. The key can be recovered at any time using the seed phrase, which is why the seed phrase is what truly needs protecting: today’s secret compartment.',
            'Never heard of these terms before? That’s okay! If you’d like to find out more, follow our “Crypto Trace” to the 2nd floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett.'
          ]
        }
      },
      { // → index.html?spur=6
        nr: 6,
        title: { de: 'Die schie­ßende Axt', en: 'The Shooting Axe' },
        description: {
          de: 'Kunstkammer\nStreitaxt mit Radschlossfeuerwaffe\nVermutlich französisch, Mitte 16. Jh.\nInv.-Nr. T 0075',
          en: 'Kunstkammer\nBattle axe with a wheel-lock firearm\nPresumably French, mid-16th century\nInv. No. T 0075'
        },
        images: [image('Kryptospur 6 Radschlossfeuerwaffe.jpg', 'Streitaxt mit Radschlossfeuerwaffe', 'Battle axe with a wheel-lock firearm')],
        text: {
          de: [
            'In dieser prunkvoll goldtauschierten Streitaxt verbirgt sich eine Radschlossfeuerwaffe. Eine spiralförmige Hauptfeder befindet sich im Griffteil. In der ringförmigen Kapsel darüber sind Pyrit und Reibrad untergebracht. Die seltsame Waffe gehört zu den frühesten Radschlossfeuerwaffen der Rüstkammer. Aber wie funktioniert die Mechanik der versteckten Feuerwaffe im Griff der Streitaxt? Ein Pyritstück reibt gegen ein sich drehendes Stahlrad, die Reibung erzeugt einen Funken, der die Ladung zündet. Aber bevor das passiert, muss die spiralförmige Hauptfeder erst mühsam aufgezogen werden. Kein Funke ohne vorherige Arbeit!',
            'In ihrer Logik ähnelt diese Mechanik dem „Proof of Work“-Prinzip des Bitcoin-Systems. Das Prinzip beschreibt den Umstand, dass jede Transaktion im Netzwerk zunächst von Teilnehmenden unter Einsatz von Rechenleistung bestätigt werden muss. Als Belohnung für den Einsatz der Rechenleistung erhalten die Teilnehmenden neue Bitcoin und Transaktionsgebühren.',
            'Wenn diese technischen Details Ihr Interesse geweckt haben sollten und Sie an der Geschichte der Kryptografie und ihrer digitalen Gegenwart interessiert sind, dann folgen Sie gerne unserer Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett.'
          ],
          en: [
            'This magnificently gold-gilded battle axe conceals a wheel-lock firearm. A spiral-shaped main spring is in the handle. The ring-shaped capsule above it houses pyrite and a friction wheel. This unusual weapon is one of the earliest wheel-lock firearms in the Rüstkammer. But how does the mechanism of the hidden firearm in the battleaxe’s handle work? A piece of pyrite rubs against a rotating steel wheel; the friction generates a spark that ignites the charge. But before that happens, the spiral-shaped main spring must first be manually wound. No spark without prior effort!',
            'In its logic, this mechanism is reminiscent of the “proof of work” principle of the Bitcoin system. This principle describes the fact that every transaction in the network must first be confirmed by participants using computing power. As a reward for providing this processing capacity, participants receive new Bitcoins and transaction fees.',
            'If these technical details have sparked your interest and you’re curious about the history of cryptography and its digital present, follow our “Crypto Trace” to the 2nd floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett.'
          ]
        }
      },
      { // → index.html?spur=7
        nr: 7,
        title: { de: 'Die ver­steckte Signatur', en: 'The Hidden Signature' },
        description: {
          de: 'Gewehrgalerie\nLange Steinschlossflinte\nLauf: Widiewarddene d.Ä. Achari, Sri Lanka\nSchloss: Meister MiW, wohl Sri Lanka\nGesamtlänge: 2,72 m\nUm 1670\nInv.-Nr. G 1548',
          en: 'Firearms Gallery\nLong flintlock shotgun\nBarrel: Widiewarddene the Elder Achari, Sri Lanka\nLock: Master MiW, likely Sri Lanka\nOverall length: 2.72 m\nCirca 1670\nInv. No. G 1548'
        },
        images: [image('Kryptospur 7 Prunkgewehr.jpg', 'Lange Steinschlossflinte', 'Long flintlock shotgun')],
        text: {
          de: [
            'Das beeindruckende Prunkgewehr entstand um 1670 auf Sri Lanka/Ceylon für einen niederländischen Auftraggeber. Die Insel stand damals teilweise unter der Kolonialherrschaft der niederländischen Ostindienkompanie (VOC). Der 2,34 m lange Lauf ist von einem lokalen Künstler flächendeckend mit prächtigen Silbertauschierungen verziert. An der Laufunterseite hat der Künstler in silbertauschierten Kapitalen seine Signatur hinterlassen: DEO[V]DERE WIDIE WARDDENE ACHARI, das heißt, Widiewarddene der Ältere. Der singhalesische Namenszusatz Achari signalisiert Widiewarddenes Zugehörigkeit zur Schmiedekaste. Die Inschrift kann nur gelesen werden, wenn der Lauf demontiert wird. Es handelt sich um eine Art geheime Botschaft für Kollegen.',
            'Wenn Sie sich für geheime Botschaften und die Bedeutung der Kryptografie bis in unsere digitale Gegenwart interessieren, folgen Sie gerne dieser Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett.'
          ],
          en: [
            'This impressive ceremonial rifle was crafted around 1670 in Sri Lanka/Ceylon for a Dutch patron. At that time, the island was partially under the colonial rule of the Dutch East India Company (VOC). The 2.34 m long barrel is entirely decorated with magnificent silver inlay work by a local artist. On the underside of the barrel, the artist has left his signature in silver-inlaid capital letters: DEO[V]DERE WIDIE WARDDENE ACHARI, meaning “Widiewarddene the Elder.” The Sinhalese name suffix “Achari” indicates that Widiewarddene belonged to the blacksmith caste. The inscription can only be read if the barrel is disassembled. It is a kind of secret message for colleagues.',
            'If you’re interested in secret messages and the significance of cryptography right up to our digital present, follow this “Crypto Trace” to the 2nd floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett.'
          ]
        }
      },
      { // → index.html?spur=8
        nr: 8,
        title: { de: 'Schach­matt auf dem Schlacht­feld?', en: 'Check­mate on the Battle­field?' },
        description: {
          de: 'Neues Grünes Gewölbe\nSchachspiel\nElfenbeinschnitzer: Paul Heermann (zugeschrieben)\nGoldschmied: Paul Solanier\nFiguren wohl Dresden, um 1705; Brettschatulle wohl Augsburg, um 1705–1709\nInv.-Nr. DL 2023/1',
          en: 'New Green Vault\nChess Set\nIvory carver: Paul Heermann (attributed)\nGoldsmith: Paul Solanier\nPieces probably Dresden, c. 1705; chessboard case probably Augsburg, c. 1705–1709\nInv. No. DL 2023/1'
        },
        images: [image('Kryptospur 8 Schachspiel.jpg', 'Schachspiel', 'Chess set')],
        text: {
          de: [
            'Dieses erst jüngst aufgetauchte Prunkschach gehört zu den wohl spektakulärsten Meisterwerken europäischer Schatzkunst. Der Silbersockel und die Brettschatulle wurden in Augsburg geschaffen; die Figuren, geschnitzte Miniaturen von größter Individualität, können dem sächsischen Bildhauer Paul Heermann (1673–1732) zugeschrieben werden.',
            'Schach begeistert Menschen seit Jahrhunderten. Aber hätten Sie gedacht, dass Schachspieler den Verlauf des Zweiten Weltkriegs beeinflusst haben? In Bletchley Park, einem Landsitz etwa 70 Kilometer nordwestlich von London, arbeiteten seit 1939 Kryptoanalytiker an der Entschlüsselung des geheimen Funkverkehrs der Deutschen Wehrmacht. Vor allem galt es, Chiffriermaschinen wie die Enigma zu knacken. Dass die alliierten Codebreaker dabei schon 1940 erfolgreich waren, blieb bis in die 1970er Jahre geheim. Zunächst rekrutierte der britische Geheimdienst Akademiker. Später weitete er die Suche aus und sprach gezielt renommierte Schachspieler an, darunter Hugh Alexander, Harry Golombek, Stuart Milner-Barry und James Macrae Aitken. Der Grund: Schach und Kryptoanalyse erfordern dieselben Fähigkeiten: logisches Denken, das Erkennen komplexer Muster und vorausschauendes Planen.',
            'Weckt diese Geschichte Ihr Interesse? Dann folgen Sie gerne unserer Krypto-Spur ins 2. OG des Residenzschlosses und besuchen Sie unsere Ausstellung „Krypto, was?“ im Münzkabinett. Ein Exemplar der Enigma, der deutschen Chiffriermaschine, die 1940 entschlüsselt wurde, können Sie dort im Original betrachten.'
          ],
          en: [
            'This ceremonial chess set, which has only recently come to light, ranks among the most spectacular masterpieces of European treasure art. The silver base and the box were crafted in Augsburg; the pieces, carved miniatures of the utmost individuality, can be attributed to the Saxon sculptor Paul Heermann (1673–1732).',
            'Chess has captivated people for centuries. But would you have thought that chess players influenced the course of World War II? At Bletchley Park, a country estate about 70 kilometres northwest of London, cryptanalysts had been working since 1939 to decode the secret radio communications of the German Wehrmacht. The primary goal was to crack cipher machines such as the Enigma. The fact that the Allied code breakers had already succeeded in doing so as early as 1940 remained a secret until the 1970s. Initially, British secret service recruited academics. Later, it expanded its search and specifically approached renowned chess players, including Hugh Alexander, Harry Golombek, Stuart Milner-Barry, and James Macrae Aitken. The reason: chess and cryptanalysis require the same skills – logical thinking, the ability to recognize complex patterns, and foresight.',
            'Does this story pique your interest? Follow our “Crypto Trace” to the 2nd floor of the Residenzschloss and visit our exhibition “Crypto, what?” in the Münzkabinett. There, you can see an original Enigma, the German encryption machine that was cracked in 1940.'
          ]
        }
      }
    ]
  };
})();
