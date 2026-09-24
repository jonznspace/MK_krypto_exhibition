'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const set = (id, value) => { const element = $(id); if (element) element.textContent = value; };

  const bitcoinSections = [
    { kicker: '00', title: 'Was ist Bitcoin?', body: 'Bitcoin wurde 2008 in einem veröffentlichten Konzept vorgestellt; 2009 nahm das Netzwerk seinen Betrieb auf. Der Begriff bezeichnet sowohl ein digitales Zahlungssystem als auch dessen Werteinheit. Bitcoin ermöglicht es, Werte über das Internet zu übertragen, ohne dass dafür eine Bank als zentrale Buchungsstelle erforderlich ist. Börsen und andere Dienstleister können bei der praktischen Nutzung dennoch eine vermittelnde Rolle übernehmen. <br> Bitcoin gilt als erster erfolgreicher dezentraler Kryptowert und als Ausgangspunkt des heutigen Kryptomarkts. Inzwischen existieren zahlreiche unterschiedliche Kryptowerte, darunter Token und Stablecoins. Sie folgen nicht alle denselben technischen Prinzipien. Bitcoin steht jedoch am Anfang dieser Entwicklung, besteht bis heute und ist weiterhin der bekannteste Kryptowert. <br>Viele vernetzte Rechner führen und prüfen eine gemeinsame Transaktionsgeschichte. Digitale Schlüssel weisen nach, wer über Bitcoin verfügen darf. Miner fassen Transaktionen zu Blöcken zusammen und sichern deren Aufnahme in die Blockchain durch Rechenarbeit. Dabei gelangen zugleich neue Bitcoin in Umlauf. Wer Bitcoin hält, empfängt oder versendet, muss jedoch nicht selbst Mining betreiben.<br> Bitcoin ist so konzipiert, dass keine zentrale Stelle das gesamte System verwaltet. An ihre Stelle treten öffentlich einsehbare Regeln, kryptografische Prüfungen und das Zusammenwirken vieler voneinander unabhängiger Rechner. Die folgenden Kapitel erklären das gemeinsame Kontobuch, digitale Schlüssel, Mining, die Sicherung der Blockchain und die Entwicklung der Mining-Geräte.' },
    { kicker: '01', title: 'Ein Kontobuch, das allen gehört', body: 'Wer Geld auf einem Bankkonto hält, lagert dort nicht bestimmte Geldscheine. Die Bank hält in ihrer Datenbank fest, wie hoch das Guthaben auf einem Konto ist und welche Buchungen erfolgt sind. Sie führt dieses Kontobuch zentral und bestätigt, welche Zahlungen gültig sind. <br>Bitcoin geht einen anderen Weg. Es gibt kein einzelnes, zentrales Kontobuch. Stattdessen führen zahlreiche unabhängig betriebene Rechner, sogenannte Nodes oder Knotenpunkte, die Transaktionsgeschichte gemeinsam. Sie prüfen neue Transaktionen und Blöcke nach denselben Regeln. <br>Neue Transaktionen werden zu sogenannten Blöcken zusammengefasst. Ein solcher Block lässt sich mit einer neuen Seite in einem gemeinsamen „Kontobuch“ vergleichen. Durchschnittlich etwa alle zehn Minuten kommt ein weiterer Block hinzu.<br>Die Blöcke mit den aufgetretenen Transaktionen sind miteinander verbunden, denn jeder neue Block enthält einen digitalen Verweis auf den vorherigen. Aus den aufeinanderfolgenden Blöcken entsteht so eine Kette – die Blockchain. Wird ein älterer Block nachträglich verändert, passt demzufolge sein „digitaler Fingerabdruck“ nicht mehr zu den folgenden Blöcken. Eine Veränderung oder Manipulation von vorherigen Transaktionen wird dadurch erkennbar.', deepDives: [{ label: 'Vertiefung', title: 'Wie ein Block mit dem vorherigen verbunden ist – Hash-Funktionen', paragraphs: ['Der Verweis auf den vorherigen Block ist kein einfacher Verweis wie eine Seitenzahl. Er ist ein sogenannter Hashwert, ein digitaler Fingerabdruck. Eine Hash-Funktion ist ein Rechenverfahren, das Daten beliebiger Länge in eine Zeichenfolge fester Länge umwandelt. Bei Bitcoin wird dafür SHA-256 verwendet. Beim Hashen eines Blockkopfs, des sogenannten Block Headers, wird SHA-256 zweimal hintereinander ausgeführt. Das Ergebnis umfasst 256 Bit und wird üblicherweise als Folge von 64 Hexadezimalzeichen dargestellt.<br>Zwei Eigenschaften machen Hash-Funktionen für die Blockchain unverzichtbar: Zum einen reagieren sie extrem empfindlich. Ändert man an den Ausgangsdaten nur ein einziges Zeichen, sieht der Hashwert völlig anders aus. Zum anderen läuft die Funktion praktisch nur in eine Richtung: Aus dem Hashwert lassen sich die ursprünglichen Daten nicht rekonstruieren.<br>Jeder Block Header enthält den Hashwert des vorherigen Block Headers. Würde jemand einen alten Block verändern, änderte sich dessen Hashwert und der Verweis im nächsten Block passte nicht mehr. Um die Veränderung zu verbergen, müssten auch alle folgenden Blöcke und die zugehörigen Arbeitsnachweise neu berechnet werden.'] }] },
    { kicker: '02', title: 'Die digitale Unterschrift: Mein Schlüssel, dein Schloss', body: 'Bei herkömmlichen Zahlungstransaktionen prüft die Bank, ob ein Konto über ausreichendes Guthaben verfügt und ob eine Zahlung berechtigt ist. Zur Identifikation dienen etwa PIN, Passwort oder Unterschrift. Bei Bitcoin gibt es keine Bank, die diese Prüfung übernimmt. Stattdessen kontrolliert das Netzwerk anhand digitaler Schlüssel, ob jemand über bestimmte Bitcoin verfügen darf. <br>Wer Bitcoin halten, empfangen oder versenden möchte, muss nicht selbst Mining betreiben. Für die Nutzung werden eine Wallet („Hot“ oder „Cold“) und die zugehörigen digitalen Schlüssel benötigt. Aber auch „Self Custody“ oder ein „Custodial Wallet“ (über eine Kryptobörse) ist möglich.<br>Beim Einrichten einer eigenen Wallet erzeugt deren Software einen privaten und einen öffentlichen Schlüssel. Der private Schlüssel wird geheim verwahrt. Bei Cold Storage bleibt er offline oder von einem vernetzten Computer abgeschirmt, etwa auf einer Hardware-Wallet. Bei einer Kryptobörse kontrolliert dagegen meist der Anbieter die Schlüssel. Die Bitcoin selbst liegen nicht in der Wallet, sondern sind als Einträge in der Blockchain verzeichnet.<br>Mit dem privaten Schlüssel unterschreibt die Wallet eine Zahlung digital. Der öffentliche Schlüssel ermöglicht es dem Netzwerk, diese Unterschrift zu prüfen, ohne den privaten Schlüssel offenzulegen.<br>Aus dem öffentlichen Schlüssel kann die Wallet eine öffentlich sichtbare Bitcoin-Adresse ableiten. Sie enthält weder Namen noch Anschrift. Bitcoin ist deshalb pseudonym, aber nicht anonym: Die Zahlungsbewegungen einer Adresse sind öffentlich nachvollziehbar. Wird die Adresse etwa durch eine Kryptobörse einer Person zugeordnet, können auch deren Transaktionen zugeordnet werden.<br>Die eigene Kontrolle über die Schlüssel bringt Verantwortung mit sich. Geht der private Schlüssel verloren, bleiben die damit kontrollierten Bitcoin unzugänglich. Wird der Schlüssel gestohlen, können andere darüber verfügen. Es gibt keine Bank oder zentrale Servicestelle, die den Zugang wiederherstellen kann.', deepDives: [{ label: 'Vertiefung', title: 'Wie ein Schlüsselpaar mathematisch funktioniert', paragraphs: ['Die Schlüsselpaare bei Bitcoin beruhen auf einem mathematischen Verfahren namens Elliptische-Kurven-Kryptografie. Bitcoin verwendet eine bestimmte Kurve mit dem technischen Namen secp256k1. Der private Schlüssel ist eine zufällig erzeugte Zahl aus einem festgelegten Zahlenraum. In dezimaler Schreibweise kann sie bis zu 77 Stellen umfassen. Aus ihr berechnet das Verfahren den öffentlichen Schlüssel. <br>Diese Berechnung funktioniert praktisch wie eine Einbahnstraße: Vom privaten zum öffentlichen Schlüssel zu gelangen, ist mit wenigen Rechenschritten möglich. Den privaten Schlüssel aus dem öffentlichen Schlüssel zurückzurechnen, ist mit heutigen Computern praktisch nicht zu bewältigen. Ein ausreichend leistungsfähiger, fehlerkorrigierter Quantencomputer könnte diese Absicherung künftig gefährden. Ein solcher Computer existiert bislang jedoch nicht. <br>Eine digitale Unterschrift entsteht, indem der private Schlüssel mit den Daten der zu unterschreibenden Transaktion verrechnet wird. Das Ergebnis ist eine Zahlenfolge, die mathematisch an diese Transaktion gebunden ist. Für klassische Bitcoin-Transaktionen wird dazu ECDSA verwendet, der Elliptic Curve Digital Signature Algorithm. Bei Taproot-Transaktionen kommen außerdem Schnorr-Signaturen zum Einsatz. Aus dem öffentlichen Schlüssel kann schließlich eine Bitcoin-Adresse abgeleitet werden – eine kürzere Zeichenfolge, die andere verwenden können, um Bitcoin an diese Adresse zu senden.'] }] },
    { kicker: '03', title: 'Die Einigung durch Rechenarbeit - Mining: Wettbewerb um den nächsten Block', body: 'Die Nodes können prüfen, ob eine Transaktion die Regeln des Bitcoin-Systems erfüllt. Doch eine weitere Frage bleibt: Wer stellt den nächsten Block zusammen und legt damit die Reihenfolge neuer Transaktionen in der Blockchain fest? <br> Hier kommt das Bitcoin-Mining ins Spiel. Miner wählen ausstehende Transaktionen aus und fassen sie zu möglichen neuen Blöcken zusammen. Spezialisierte Rechner treten anschließend ununterbrochen in einem Wettbewerb gegeneinander an. Sie führen enorme Mengen von Rechenversuchen durch, bis einer von ihnen ein Ergebnis findet, das die vorgegebenen Bedingungen erfüllt. <br> Wer ein solches Ergebnis zuerst findet, übermittelt seinen Block an das Netzwerk. Die Nodes prüfen unabhängig voneinander, ob der Block und der dafür erbrachte Arbeitsnachweis den Regeln entsprechen. Ist das der Fall, nehmen sie ihn in ihre Blockchain auf.<br> Dieses Verfahren heißt Proof-of-Work – oder Arbeitsnachweis. Ein gültiges Ergebnis zu finden, erfordert sehr viele Versuche. Es zu überprüfen, benötigt dagegen nur wenig Rechenaufwand.<br>Die Einnahmen des erfolgreichen Miners oder Mining-Pools bestehen aus zwei Teilen: den mit dem Block neu ausgegebenen Bitcoin und den Transaktionsgebühren der darin enthaltenen Zahlungen. Danach beginnt der Wettbewerb um den nächsten Block.' , deepDives: [{ label: 'Vertiefung 01', title: 'Was die Miner genau berechnen – Nonce und Zielwert', paragraphs: ['Miner berechnen den Hashwert des Block Headers, indem sie SHA-256 zweimal hintereinander ausführen. Der Block Header enthält unter anderem einen zusammenfassenden Hashwert der Transaktionen, den Hashwert des vorherigen Blocks, einen Zeitstempel, den Zielwert und die Nonce. Das Ergebnis der Hashberechnung ist eine 256-Bit-Zahl. Sie muss kleiner oder gleich dem vorgegebenen Zielwert sein. <br> Die Nonce, von englisch „number used once“, ist ein 32-Bit-Feld im Block Header, das die Miner verändern können. Jede Veränderung erzeugt einen anderen Hashwert. Ist der mögliche Wertebereich der Nonce ausgeschöpft, verändern die Miner weitere Daten des Blockkandidaten, etwa eine zusätzliche Zahl, die sogenannte ExtraNonce, in der Coinbase-Transaktion. Dadurch ändert sich der zusammenfassende Hashwert der Transaktionen, und die Suche kann mit neuen Block-Headern fortgesetzt werden. Die Mining-Geräte prüfen so Milliarden oder Billionen von Varianten pro Sekunde, bis zufällig ein gültiger Hashwert entsteht.'] }, { label: 'Vertiefung 02', title: 'Wie sich die Schwierigkeit an die Rechenleistung anpasst – Difficulty Adjustment', paragraphs: ['Das Bitcoin-System ist so eingerichtet, dass durchschnittlich etwa alle zehn Minuten ein neuer Block entsteht. Alle 2016 Blöcke, rechnerisch etwa zwei Wochen, wird nach festgelegten Regeln ermittelt, wie lange die Erzeugung der letzten 2016 Blöcke gedauert hat. Ging es schneller als vorgesehen, wird der Zielwert abgesenkt und die Aufgabe schwieriger. Dauerte es länger, wird der Zielwert angehoben und die Aufgabe leichter. Dieser Mechanismus heißt Difficulty Adjustment. Er sorgt nicht dafür, dass jeder einzelne Block nach genau zehn Minuten entsteht, sondern hält den langfristigen Durchschnitt in der Nähe dieses Werts.'] }, { label: 'Vertiefung 03', title: 'Wie die Ausgabe neuer Bitcoin festgelegt ist – Block Subsidy und Halving', paragraphs: ['Die Menge der neu erzeugten Bitcoin, die ein Miner für einen gefundenen Block beanspruchen darf, ist im Bitcoin-System festgelegt. Dieser Teil der Belohnung heißt Block Subsidy. Hinzu kommen die Transaktionsgebühren, deren Höhe nicht fest vorgegeben ist. <br>Alle 210.000 Blöcke, etwa alle vier Jahre, wird die Block Subsidy halbiert. Als Bitcoin 2009 startete, lag sie bei 50 Bitcoin pro Block. 2012 sank sie auf 25, 2016 auf 12,5, 2020 auf 6,25 und 2024 auf 3,125 Bitcoin. Dadurch ist in den Regeln festgelegt, dass insgesamt nie mehr als knapp 21 Millionen Bitcoin erzeugt werden.'] }] },
    { kicker: '04', title: 'Die Kette wächst: Sicherheit durch Anhäufung', body: 'Die Rechenarbeit des Minings bestimmt nicht nur, wie neue Blöcke entstehen. Sie trägt zugleich dazu bei, bereits eingetragene Transaktionen zu sichern. <br> Jeder neue Block baut auf dem vorherigen auf. Wer eine ältere Transaktion nachträglich verändern wollte, müsste deshalb eine abweichende Blockchain erzeugen. Dafür müssten der betroffene Block und alle darauffolgenden Blöcke mitsamt ihren Arbeitsnachweisen neu berechnet werden, während das übrige Netzwerk die gültige Blockchain weiter verlängert. <br>Jeder weitere Block gilt deshalb als zusätzliche Bestätigung der früheren Transaktionen. Je tiefer ein Eintrag in der Blockchain liegt, desto mehr Rechenarbeit hat sich seitdem über ihm angesammelt und desto aufwendiger wäre eine nachträgliche Veränderung. <br>An die Stelle einer zentralen Buchungsstelle treten bei Bitcoin somit gemeinsame Regeln, kryptografische Prüfungen und öffentlich überprüfbare Arbeitsnachweise. Eine bereits bestätigte Zahlung kann daher nicht von einer zentralen Stelle zurückgebucht werden. Bei einer Fehlüberweisung müsste die empfangende Person die Bitcoin in einer neuen Transaktion zurücksenden.' },
    { kicker: '05', title: 'Bitcoin-Mining-Geräte', body: 'Bitcoin-Mining-Geräte sind spezialisierte Computer, die ununterbrochen Hashwerte von möglichen Block Headern berechnen. Im Inneren arbeiten hochspezialisierte Chips aus Silizium. Auf ihnen befinden sich Milliarden winziger elektronischer Schalter, die mit den Zuständen 0 und 1 rechnen. <br>Über Software und das Internet sind die Mining-Geräte mit dem Bitcoin-Netzwerk oder einem Mining-Pool verbunden. 2009 konnten Bitcoin noch mit dem Prozessor eines gewöhnlichen Computers geschürft werden. Ab 2010 kamen leistungsfähigere Grafikkarten zum Einsatz; 2011/12 folgten programmierbare Spezialchips, sogenannte FPGAs. <br>Eine entscheidende Zäsur begann 2013 mit den ASICs: Chips, die eigens für die von Bitcoin verwendeten SHA-256-Berechnungen entwickelt wurden. Sie waren wesentlich schneller und effizienter, aber auch teurer. Damit wurde Mining auf Heimcomputern zunehmend unrentabel. <br>Schon zuvor wurde Mining auch gewinnorientiert betrieben. Mit den ASICs entwickelte es sich jedoch zunehmend zu einem industriellen Geschäft. Seit etwa 2013/14 betreiben Unternehmen große Anlagen mit Tausenden Geräten, aufwendiger Kühlung und möglichst günstigem Strom. Viele Miner schließen sich außerdem zu Mining-Pools zusammen. Aus einem zunächst dezentralen Experiment wurde so ein kapitalintensiver, globaler Wettbewerb um Einnahmen aus Blocksubventionen und Transaktionsgebühren.' }
  ];

  const deviceSections = [
    {
      kicker: '01',
      group: 'Mining-Geräte auf dem Sockel',
      title: 'BitChimney mit Antminer-S19j-Pro_Hashboard',
      museumLabel: ['Sockel links', 'Vereinigte Staaten von Amerika', 'ab 2024'],
      museumDetails: [
        'Gehäuseentwurf: Altair Technology, Vereinigte Staaten von Amerika (Creative Commons, nichtkommerziell)',
        'Leihgeber: „WantClue“ (Pseudonym)'
      ],
      storyTitle: 'Ein Ofen, der rechnet.',
      body: 'Im Inneren des BitChimneys steckt eine einzelne Rechenplatine aus einem industriellen Bitcoin-Miner (S19j Pro). Auf dieser sitzen drei Platinen nebeneinander in einem Gehäuse – in industriellen Rechenzentren stehen tausende solcher Miner nebeneinander. Werden diese Geräte ausgemustert, kommt es oft zum Verkauf einzelner Bauteile. Dadurch erhalten sie beispielsweise im BitChimney ein zweites Leben. Die Energie, die der Miner verbraucht, wird fast vollkommen in Wärme umgewandelt und strömt aus dem oberen „Kamin“. Ein handelsüblicher Heizlüfter hätte mit diesen knapp 650 Watt im selben Raum auch Wärme produziert – nur mit dem Unterschied, dass der BitChimney als Nebenprodukt zur Wärme auch Bitcoin schürfen kann. Ob dies ein idealer Umgang mit Strom oder eine geschickte Rechtfertigung für den Ressourcenverbrauch ist, wird kontrovers diskutiert.',
      english: {
        museumLabel: ['Left Pedestal', 'United States of America', 'BitChimney with Antminer S19j Pro hashboard', '2024 onward'],
        museumDetails: ['Enclosure design: Altair Technology, United States of America (Creative Commons, noncommercial)', 'Lender: “WantClue” (pseudonym)'],
        title: 'BitChimney with Antminer S19j Pro hashboard',
        storyTitle: 'A heater that computes.',
        body: 'Inside the BitChimney is a single computing board, known as a hashboard, taken from an industrial Bitcoin miner, the S19j Pro. In the original miner, three of these boards sit side by side in one enclosure; industrial mining facilities house thousands of such machines. When these devices are retired, their individual components are often sold, giving them a second life in devices such as the BitChimney. Almost all the electricity consumed by the miner is converted into heat, which flows out through the “chimney” at the top. A conventional fan heater consuming the same 650 watts would also have heated the room, just not mining bitcoin at the same time. Whether this is an ideal use of electricity or a clever justification for consuming energy remains a subject of debate.'
      }
    },
    {
      kicker: '02',
      group: 'Mining-Geräte auf dem Sockel',
      title: 'Bitaxe Ultra Hex 301, 2024',
      museumLabel: ['Sockel Mitte', 'OSMU-Gemeinschaft (Open Source Miners United, Vereinigte Staaten von Amerika)'],
      museumDetails: [
        'off. Entwurf von „Skot” (Pseudonym) und „macphyter” (Pseudonym)',
        'Zusammenbau: OSMU, Vereinigte Staaten von Amerika',
        'Leihgeber: „WantClue” (Pseudonym)'
      ],
      body: 'Der Bitaxe Ultra Hex 301 besteht aus sechs ASIC-Chips auf einer Platine und ist das erste Mehrchip-Gerät aus der Bitaxe-Reihe. Hier sind es zwei Gruppen zu je drei Chips, die mit zwölf Volt versorgt werden. Sie sind an ein Netzteil angeschlossen, was sechs Rechenwerke versorgt, statt an sechs einzelne Netzteile. Was in den industriellen Maschinen längst Serienstand war, kam damit erstmals in einem offenen, dokumentierten Entwurf an. Unabhängig davon verfolgte parallel ein anderes Mitglied der Entwicklergemeinschaft das gleiche Konzept mit dem QAxe. Gegen die industriellen Rechenzentren, die heute den Großteil des Schürfens von Bitcoin übernehmen, haben diese Geräte rechnerisch kaum eine Chance. Es gibt jedoch Ausnahmen: Erst im Juli 2026 hat ein Bitaxe den Block 957.382 der Bitcoin-Blockchain hinzugefügt.',
      english: {
        museumLabel: ['Center Pedestal', 'OSMU community (Open Source Miners United, United States of America)', 'Bitaxe Ultra Hex 301, 2024'],
        museumDetails: ['Open-source design by “Skot” (pseudonym) and “macphyter” (pseudonym)', 'Assembled by: OSMU, United States of America', 'Lender: “WantClue” (pseudonym)'],
        title: 'Bitaxe Ultra Hex 301, 2024',
        body: 'The Bitaxe Ultra Hex 301 has six ASIC chips on a single circuit board and is the first multichip device in the Bitaxe series.<br>The chips are arranged in two groups of three, supplied with twelve volts. A single power supply serves all six chips, replacing six separate power supplies.<br>A feature that had long been standard in industrial machines thus appeared for the first time in an openly documented design. Independently, another member of the developer community was pursuing the same concept as QAxe.<br>In terms of computing power, these devices stand little chance against the industrial mining facilities that now account for most Bitcoin mining. There are exceptions, however: as recently as July 2026, a Bitaxe added block 957,382 to the Bitcoin blockchain.'
      }
    },
    {
      kicker: '03',
      group: 'Mining-Geräte auf dem Sockel',
      title: 'Antminer S19',
      museumLabel: ['Sockel rechts', 'Volksrepublik China', '2020'],
      museumDetails: [
        'Bitmain Technologies',
        'Leihgeber: „WantClue” (Pseudonym)'
      ],
      body: 'Der Antminer S19 führt 95 Billionen Rechenoperationen pro Sekunde durch bei einem Strombedarf von 3.250 Watt. Er kann insgesamt bis zu 16 kg (je nach Ausstattung mit Dashboards) wiegen und ist mit einer Lautstärke von 75 Dezibel lauter als ein Staubsauger. Das Gerät ist für den Dauerbetrieb vorgesehen, weshalb es nicht im Wohnzimmer, sondern in Hallen, zwischen Tausenden baugleicher Geräte, aufgestellt werden sollte. Abgeschaltet wird der Antminer nur, wenn er sich wirtschaftlich nicht mehr rechnet. Alle kleineren, in dieser Ausstellung präsentierten Geräte stammen von ihm ab: Ihre Chips wurden aus ausgemusterten Maschinen wie dieser aufgelötet. Weil es sich um ein kommerzielles Produkt handelte, waren keinerlei Daten über diese Maschinen veröffentlicht. So war es notwendig, die Ansteuerung der Chips zunächst rückzuentwickeln. Selbst die Anzahl an Chips pro Platine musste nachgezählt werden. Als 2020 der Antminer S19 erschien, war er das effizienteste luftgekühlte Gerät seiner Art. Nur sechs Jahre später leistet ein einzelner Chip der neusten Generation ein Vielfaches bei einem Bruchteil des Strombedarfs. Dies ist der Grund, warum Maschinen wie diese heute ausgemustert werden – und warum ihre Bauteile in den Bastelstuben landen, aus denen teilweise auch die übrigen Mining-Geräte dieser Ausstellung hergestellt wurden.',
      english: {
        museumLabel: ['Right Pedestal', 'People’s Republic of China', 'Antminer S19', '2020'],
        museumDetails: ['Bitmain Technologies', 'Lender: “WantClue” (pseudonym)'],
        title: 'Antminer S19',
        body: 'The Antminer S19 performs 95 trillion calculations per second while consuming 3,250 watts of electricity. Depending on its configuration, including the installed hashboards, it may weigh up to 16 kg. Its noise level of around 75 decibels can make it louder than a household vacuum cleaner. Designed for continuous operation, it is intended for industrial buildings alongside thousands of identical devices. Such machines generally remain in operation for as long as they are profitable to run.<br>Several of the smaller devices presented in this exhibition use the same types of specialized chips found in industrial miners. These chips can be recovered by desoldering them from retired machines. Building open-source devices around proprietary chips presented a challenge: where the necessary technical documentation was unavailable, developers had to reverse-engineer the way the chips were controlled. Even basic details, such as the number of chips on each board, could require direct inspection.<br>When the Antminer S19 was released in 2020, it was among the most efficient air-cooled devices of its kind. Just six years later, a chip of a newer generation may deliver several times the computing performance of an earlier chip while consuming substantially less electricity for the same amount of computation. Improvements of this kind can make older machines uneconomical to operate. Their components may then find their way into home workshops, where they can be reused in devices such as some of the smaller miners presented here.'
      }
    },
    {
      kicker: '04',
      group: 'Mining-Geräte in der Gläsernen Münze',
      title: 'QAxe',
      museumLabel: ['Gläserne Münze I', '2024, off. Entwurf von „Pmaxuw“ (Pseudonym)'],
      museumDetails: [
        'Zusammenbau: „Pmaxuw“ (Pseudonym)',
        'Leihgeber: „WantClue” (Pseudonym)'
      ],
      body: 'Auf diesem Gerät befinden sich erstmals vier ASIC-Chips auf einer Platine, die zusammen rund 2,4 Billionen Rechenoperationen pro Sekunde ausführen. Bis zu diesem Zeitpunkt trugen offene Geräte (open source) je einen einzigen Chip. Mehrere Chips zu betreiben ist keine Frage des Nebeneinandersetzens: Sie müssen gemeinsam mit Strom versorgt, gekühlt und in der richtigen Reihenfolge angesteuert werden. Statt fünf Volt setzt dieses Gerät auf zwölf Volt aus einem eigenen Netzteil. Ein kleiner Steuerchip auf der Platine übernimmt die Verwaltung, während die Rechenaufgaben selbst noch von einem angeschlossenen Computer geliefert werden. Erst spätere Geräte wurden davon unabhängig. Zeitgleich dazu verfolgte das Projekt zum Bitaxe Ultra Hex 301 den gleichen Gedanken. Es wurden somit zwei Antworten auf dieselbe Frage in derselben offenen Gemeinschaft entwickelt. Aus dieser Platine ging später der NerdQAxe hervor, einer der meistgebauten offenen Miner überhaupt.',
      english: {
        museumLabel: ['Transparent Coin I', '2024, open-source design by “Pmaxuw” (pseudonym)'],
        museumDetails: ['Assembled by: “Pmaxuw” (pseudonym)', 'Lender: “WantClue” (pseudonym)'],
        title: 'QAxe',
        body: 'For the first time, this device brings together four ASIC chips on a single circuit board, performing around 2.4 trillion calculations per second. Until then, open-source devices had each used just one chip. Operating multiple chips involves more than placing them side by side: they need a coordinated power supply, cooling, and control signals in the correct sequence. Instead of five volts, this device uses twelve volts from a dedicated power supply. A small controller chip on the board manages the device, while a connected computer still supplies the computational tasks. Only later devices became independent of an external computer.<br>Simultaneously, the Bitaxe Ultra Hex 301 project pursued a similar idea. Two answers to the same question were thus developed within the same open-source community. This circuit board later evolved into the NerdQAxe, one of the most widely built open-source miners.'
      }
    },
    {
      kicker: '05',
      group: 'Mining-Geräte in der Gläsernen Münze',
      title: 'BitForge Nano (IIa mit, IIb ohne Kühlkörper)',
      museumLabel: ['Gläserne Münze IIa & IIb', '2025, off. Entwurf von „WantClue” (Pseudonym) und „kliA90“ (Pseudonym)'],
      museumDetails: [
        'Zusammenbau: DTV Electronics',
        'Leihgeber: „WantClue” (Pseudonym)'
      ],
      body: 'Der BitForge Nano wurde explizit als Bitcoin-Miner für zu Hause entwickelt. Er besitzt zwei ASIC-Chips, die rund 2,6 Billionen Rechenoperationen pro Sekunde rechnen, einen 12 Volt Eingang und ein Gehäuse. Alle übrigen offenen Miner dieser Ausstellung zeigen, was sie sind: nackte Platinen, sichtbare Kühlkörper, blinkende Anzeigen. Dieses Gerät hingegen verbirgt seine Technik. Es hat kein Display und wird über den Browser oder eine App eingerichtet. Der Bitforge Nano ist dafür gemacht, in einer Wohnung dauerhaft zu laufen, ohne dabei aufzufallen. Damit ergab sich ein Wendepunkt: Die offene Mining-Szene begann, nicht nur an Schaltungen zu arbeiten, sondern auch an der visuellen Gestaltung der Geräte. Eine Sonderausführung dieses Modells, die Ghost Edition, die Aluminiumgehäuse und Rauchglasfenster besitzt, wurde 2026 bei den London Design Awards mit Silber ausgezeichnet. Gestaltet wurde sie von Duncan Coombe, wobei „WantClue“ und „kliA90“ mitwirkten. Das Gerät ist Open Source: Schaltpläne und Firmware stehen unter einer Lizenz, die jede Weitergabe zur erneuten Offenlegung verpflichtet.',
      english: {
        museumLabel: ['Transparent Coin IIa & IIb', '2025, open-source design by “WantClue” (pseudonym) and “kliA90” (pseudonym)'],
        museumDetails: ['Assembled by: DTV Electronics', 'Lender: “WantClue” (pseudonym)'],
        title: 'BitForge Nano (IIa with heat sink, IIb without heat sink)',
        body: 'The BitForge Nano was designed specifically as a Bitcoin miner for home use. It has two ASIC chips that perform around 2.6 trillion calculations per second, a 12-volt power input, and an enclosure.<br>All the other open-source miners in this exhibition reveal what they are: bare circuit boards, visible heat sinks, and blinking indicators. This device, however, conceals its technology. It has no display and is configured through a web browser or an app. The BitForge Nano is designed to run continuously in a home without drawing attention to itself. This marked a turning point: the open-source mining community began working on the visual design of its devices as well as their circuitry. A special version of this model, the Ghost Edition, with an aluminum enclosure and a smoked-glass window, received a silver award at the 2026 London Design Awards. It was designed by Duncan Coombe, with contributions from “WantClue” and “kliA90.”<br>The device is open source: its circuit diagrams and firmware are available under a license that requires any redistribution to be accompanied by a re-disclosure.'
      }
    },
    {
      kicker: '06',
      group: 'Mining-Geräte in der Gläsernen Münze',
      title: 'ASIC Chip BM1370',
      museumLabel: ['Gläserne Münze III', 'Volksrepublik China, ASIC Chip BM1370 (Application Specific Integrated Circuit, 5-nm Fertigung)', '2024, Bitmain Technologies'],
      museumDetails: ['Leihgeber: „WantClue” (Pseudonym)'],
      body: 'Der ASIC Chip BM1370 ist ein anwendungsspezifischer Chip, der nur eine einzige Rechenoperation ausführen kann. Diese dient dazu, einen sogenannten Block zu vervollständigen, um mit Bitcoin belohnt zu werden. Eine solche Rechenoperation wird ca. eine Billion Mal pro Sekunde durchgeführt. Chips wie dieser stecken beispielsweise in den Maschinen der industriellen Rechenzentren. Sie schürfen heute den Großteil aller neuen Bitcoin: zu Hunderten in einer Maschine, zu Zehntausenden in einer Halle. 2013 leistete ein vergleichbarer Chip ein Zwanzigstel bei gleichem Stromverbrauch. Dieser Innovationswettlauf innerhalb der Chip-Industrie und die Kommerzialisierung des Bitcoin-Systems hat das Bitcoin-Mining aus dem Wohnzimmer in die Industrie verlagert. Über den technischen Aufbau des verwendeten Chips der Herstellerfirma Bitmain ist nichts bekannt, es handelt sich um geschütztes Firmeneigentum. Wer diesen Chip für den Bau eines offenen Miners verwenden wollte, musste erst herausfinden, wie man mit ihm kommunizieren kann.',
      english: {
        museumLabel: ['Transparent Coin III', 'People’s Republic of China', 'BM1370 ASIC chip (Application-Specific Integrated Circuit, 5 nm manufacturing process)', '2024, Bitmain Technologies'],
        museumDetails: ['Lender: “WantClue” (pseudonym)'],
        title: 'BM1370 ASIC chip',
        body: 'The BM1370 ASIC chip is an application-specific chip capable of performing only one type of calculation. This calculation is used to complete a block and earn a Bitcoin reward. The chip performs around one trillion times per second. Chips like these are used in machines at industrial mining facilities, which now mine the vast majority of new bitcoin: hundreds of chips in a single machine, tens of thousands in a single building.<br>In 2013, a comparable chip delivered one-twentieth of this performance while consuming the same amount of electricity. This race for innovation within the chip industry, together with the commercialization of the Bitcoin system, moved Bitcoin mining from living rooms into industrial facilities.<br>The technical architecture of this chip, made by Bitmain, is undisclosed proprietary information. Anyone wishing to use it to build an open-source miner first had to work out how to communicate with it.'
      }
    },
    {
      kicker: '07',
      group: 'Mining-Geräte in der Gläsernen Münze',
      title: 'NerdNOS',
      museumLabel: ['Gläserne Münze IV', 'OSMU-Gemeinschaft (Open Source Miners United, weltweit)'],
      museumDetails: [
        '2024, off. Entwurf von Benjamin Wilson, „Pmaxuw” (Pseudonym) und „WantClue“ (Pseudonym)',
        'Zusammenbau und Leihgeber: „WantClue“ (Pseudonym)'
      ],
      body: 'Der NerdNOS besteht aus zwei aufeinander gesteckten Platinen. Die Platine mit dem Display ist ein NerdMiner – ein Lerngerät mit buntem Display, das zwar mitrechnet, aber so langsam, dass es nur der reinen Anschauung dient. Die zweite Platine trägt einen echten ASIC-Chip und wird so mit einem Handgriff ressourcensparend zu einem Miner, der rund eine Million Mal schneller rechnen kann und nur eine WLAN-Verbindung benötigt. Damit ein gewöhnliches USB-Ladegerät zur Stromversorgung genügt, ist der Chip gezielt in seiner Leistung auf unter acht Watt gedrosselt. Genau so hat Bitcoin-Mining vor über zehn Jahren begonnen – mit einem Stecker in einer USB-Buchse.',
      english: {
        museumLabel: ['Transparent Coin IV', 'OSMU community (Open Source Miners United, worldwide)'],
        museumDetails: ['2024, open-source design by Benjamin Wilson, “Pmaxuw” (pseudonym), and “WantClue” (pseudonym)', 'Assembled and lent by: “WantClue” (pseudonym)'],
        title: 'NerdNOS',
        body: 'The NerdNOS consists of two circuit boards plugged into one another. The board with the screen is a NerdMiner — an educational device with a colorful display. It participates in mining calculations but does so at such a slow rate that it serves purely as a demonstration.<br>The second board carries an actual ASIC chip. Simply plugging it in transforms the educational device into a miner that makes efficient use of existing hardware, performs calculations around a million times faster, and needs only a Wi-Fi connection. The chip’s power consumption is deliberately limited to less than eight watts, allowing an ordinary USB charger to supply power. This recalls the early days of ASIC mining more than ten years ago, when small mining devices could simply be plugged into a USB port.'
      }
    },
    {
      kicker: '08',
      group: 'Mining-Geräte in der Gläsernen Münze',
      title: 'Bitfury BF1 „Red Fury”',
      museumLabel: ['Gläserne Münze V', 'Vereinigte Staaten von Amerika, Bitfury BF1 „Red Fury”', '2013, Chip: Bitfury (55 nm), Platine: Big Picture Mining Company'],
      museumDetails: ['Leihgeber: „WantClue” (Pseudonym)'],
      body: 'Als 2009 der Bitcoin entstand, konnte ihn jeder gewöhnliche Computer schürfen. Innerhalb weniger Jahre wurden diese Computer von spezialisierten Chips (ASICs) abgelöst, die nur noch eine einzige Rechenaufgabe beherrschten. Der Red Fury gehört zur ersten Generation jener Chips, die auch von Privatpersonen gekauft werden konnten. Dieser Stick wurde lediglich in eine USB-Buchse gesteckt und verbrauchte nur 2,5 Watt – weniger als eine Nachttischlampe. Rechnen konnte dieser aber nicht von allein: Ein angeschlossener Computer musste ihn mit Aufgaben versorgen. Der reihenweise Betrieb der USB-Sticks produzierte Abwärme, sodass sie extra gekühlt werden mussten. 2013 kostete dieser Stick rund 100 US-Dollar und war für kurze Zeit eines der schnellsten Geräte seiner Art. Zum Vergleich: Der 12 Jahre später gebaute ASIC Chip BM1370 rechnet ca. 1200-Mal schneller. Der Red Fury ist ein geschlossenes Produkt: das heißt, Chip und Bauplan sind geschütztes Firmeneigentum. Dies rief die ersten Open-Source-Gegenentwürfe der offenen Mining-Szene hervor.',
      english: {
        museumLabel: ['Transparent Coin V', 'United States of America', 'Bitfury BF1 “Red Fury”', '2013, chip: Bitfury (55 nm); circuit board: Big Picture Mining Company'],
        museumDetails: ['Lender: “WantClue” (pseudonym)'],
        title: 'Bitfury BF1 “Red Fury”',
        body: 'When Bitcoin launched in 2009, any ordinary computer could mine it. Within a few years, these computers were superseded by specialized chips known as ASICs, which could perform only one type of computational task. The Red Fury belongs to the first generation of ASIC mining devices available for purchase by private individuals.<br>This USB stick simply plugs into a USB port and consumes just 2.5 watts, which is less than a bedside lamp. However, it could not perform its calculations independently: a connected computer had to supply tasks. Running groups of these USB sticks generated heat, making additional cooling necessary. In 2013, this stick cost around US$100 and was briefly one of the fastest devices of its kind. By comparison, the BM1370 ASIC chip, made twelve years later, performs calculations around 1,200 times faster. The Red Fury is a closed-source product: both the chip and the circuit board design are proprietary. This prompted the open-source mining community to develop its first alternatives.'
      }
    }
  ];

  document.title = 'Station 7 · Wie funktioniert Bitcoin?';
  $('frame').setAttribute('aria-label', 'Station 7 - Wie funktioniert Bitcoin?');
  set('actionEyebrow', '');
  set('actionTitle', 'Wie funktioniert Bitcoin?');

  const uiTranslations = {
    actionTitle: 'How does Bitcoin work?',
    tabModuleA: 'How does Bitcoin work?',
    tabModuleB: 'Mining devices',
    'Mining-Geräte auf dem Sockel': 'Mining devices on the pedestal',
    'Mining-Geräte in der Gläsernen Münze': 'Mining devices in the Transparent Coin'
  };

  const bitcoinTitleTranslations = {
    'Was ist Bitcoin?': 'What is Bitcoin?',
    'Ein Kontobuch, das allen gehört': 'A ledger that belongs to everyone',
    'Die digitale Unterschrift: Mein Schlüssel, dein Schloss': 'The digital signature: my key, your lock',
    'Die Einigung durch Rechenarbeit - Mining: Wettbewerb um den nächsten Block': 'Agreement through computation: mining and the race for the next block',
    'Die Kette wächst: Sicherheit durch Anhäufung': 'The chain grows: security through accumulation',
    'Bitcoin-Mining-Geräte': 'Bitcoin mining devices'
  };

  function appendSections(container, sections, language = 'de') {
    container.innerHTML = '';
    let currentGroup = '';
    sections.forEach(section => {
      const english = language === 'en' && section.english && section.english.title
        ? { ...section, ...section.english, group: section.group }
        : section;
      if (english.group && english.group !== currentGroup) {
        const groupHeading = document.createElement('h3');
        groupHeading.className = 'device-group-heading';
        groupHeading.textContent = language === 'en'
          ? uiTranslations[english.group] || english.group
          : english.group;
        container.appendChild(groupHeading);
        currentGroup = english.group;
      }
      const article = document.createElement('article');
      article.className = 'article-section';
      const kicker = document.createElement('span');
      kicker.className = 'article-kicker';
      kicker.textContent = english.kicker;
      if (english.museumLabel || english.museumDetails) {
        const museumLabel = document.createElement('div');
        museumLabel.className = 'museum-label';
        (english.museumLabel || []).forEach(text => {
          const line = document.createElement('span');
          line.textContent = text;
          museumLabel.appendChild(line);
        });
        (english.museumDetails || []).forEach(text => {
          const detail = document.createElement('p');
          detail.textContent = text;
          museumLabel.appendChild(detail);
        });
        article.appendChild(museumLabel);
      }
      const heading = document.createElement('h2');
      heading.textContent = language === 'en'
        ? bitcoinTitleTranslations[english.title] || english.title
        : english.title;
      const paragraph = document.createElement('p');
      paragraph.innerHTML = english.body;
      article.append(kicker, heading);
      if (english.storyTitle) {
        const storyHeading = document.createElement('h3');
        storyHeading.className = 'story-title';
        storyHeading.textContent = english.storyTitle;
        article.append(storyHeading);
      }
      article.append(paragraph);
      const sectionDeepDives = Array.isArray(section.deepDives)
        ? section.deepDives
        : section.deepDives
          ? [section.deepDives]
          : [];
      sectionDeepDives.forEach(detail => {
        const expansion = document.createElement('details');
        expansion.className = 'inline-deepdive';
        const summary = document.createElement('summary');
        summary.innerHTML = `<span>${detail.label || 'Vertiefung'}</span><strong>${detail.title}</strong>`;
        const body = document.createElement('div');
        body.className = 'inline-deepdive-body';
        (detail.paragraphs || []).forEach(text => {
          const detailParagraph = document.createElement('p');
          detailParagraph.innerHTML = text;
          body.appendChild(detailParagraph);
        });
        expansion.append(summary, body);
        article.appendChild(expansion);
      });
      container.appendChild(article);
    });
  }

  function renderContent(language) {
    set('actionTitle', language === 'en' ? uiTranslations.actionTitle : 'Wie funktioniert Bitcoin?');
    $('tabModuleA').textContent = language === 'en' ? uiTranslations.tabModuleA : 'Wie funktioniert Bitcoin?';
    $('tabModuleB').textContent = language === 'en' ? uiTranslations.tabModuleB : 'Mining-Geräte';
    appendSections($('bitcoinContent'), bitcoinSections, language);
    appendSections($('devicesContent'), deviceSections, language);
  }

  renderContent(document.documentElement.dataset.language === 'en' ? 'en' : 'de');
  document.querySelectorAll('.station-language-switch__button').forEach(button => {
    button.addEventListener('click', () => {
      window.requestAnimationFrame(() => {
        renderContent(button.dataset.languageOption === 'en' ? 'en' : 'de');
      });
    });
  });
});
