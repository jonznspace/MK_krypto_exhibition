'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const set = (id, value) => { const element = $(id); if (element) element.textContent = value; };

  const bitcoinSections = [
    { kicker: '00', title: 'Was ist Bitcoin?', body: 'Bitcoin wurde 2008 in einem veröffentlichten Konzept vorgestellt; 2009 nahm das Netzwerk seinen Betrieb auf. Der Begriff bezeichnet sowohl ein digitales Zahlungssystem als auch dessen Werteinheit. Bitcoin ermöglicht es, Werte über das Internet zu übertragen, ohne dass dafür eine Bank als zentrale Buchungsstelle erforderlich ist. Börsen und andere Dienstleister können bei der praktischen Nutzung dennoch eine vermittelnde Rolle übernehmen. <br> Bitcoin gilt als erster erfolgreicher dezentraler Kryptowert und als Ausgangspunkt des heutigen Kryptomarkts. Inzwischen existieren zahlreiche unterschiedliche Kryptowerte, darunter Token und Stablecoins. Sie folgen nicht alle denselben technischen Prinzipien. Bitcoin steht jedoch am Anfang dieser Entwicklung, besteht bis heute und ist weiterhin der bekannteste Kryptowert. <br>Viele vernetzte Rechner führen und prüfen eine gemeinsame Transaktionsgeschichte. Digitale Schlüssel weisen nach, wer über Bitcoin verfügen darf. Miner fassen Transaktionen zu Blöcken zusammen und sichern deren Aufnahme in die Blockchain durch Rechenarbeit. Dabei gelangen zugleich neue Bitcoin in Umlauf. Wer Bitcoin hält, empfängt oder versendet, muss jedoch nicht selbst Mining betreiben.<br> Bitcoin ist so konzipiert, dass keine zentrale Stelle das gesamte System verwaltet. An ihre Stelle treten öffentlich einsehbare Regeln, kryptografische Prüfungen und das Zusammenwirken vieler voneinander unabhängiger Rechner. Die folgenden Kapitel erklären das gemeinsame Kontobuch, digitale Schlüssel, Mining, die Sicherung der Blockchain und die Entwicklung der Mining-Geräte.' },
    { kicker: '01', title: 'Ein Kontobuch, das allen gehört', body: 'Wer Geld auf einem Bankkonto hält, lagert dort nicht bestimmte Geldscheine. Die Bank hält in ihrer Datenbank fest, wie hoch das Guthaben auf einem Konto ist und welche Buchungen erfolgt sind. Sie führt dieses Kontobuch zentral und bestätigt, welche Zahlungen gültig sind. <br>Bitcoin geht einen anderen Weg. Es gibt kein einzelnes, zentrales Kontobuch. Stattdessen führen zahlreiche unabhängig betriebene Rechner, sogenannte Nodes oder Knotenpunkte, die Transaktionsgeschichte gemeinsam. Sie prüfen neue Transaktionen und Blöcke nach denselben Regeln. <br>Neue Transaktionen werden zu sogenannten Blöcken zusammengefasst. Ein solcher Block lässt sich mit einer neuen Seite in einem gemeinsamen „Kontobuch“ vergleichen. Durchschnittlich etwa alle zehn Minuten kommt ein weiterer Block hinzu.<br>Die Blöcke mit den aufgetretenen Transaktionen sind miteinander verbunden, denn jeder neue Block enthält einen digitalen Verweis auf den vorherigen. Aus den aufeinanderfolgenden Blöcken entsteht so eine Kette – die Blockchain. Wird ein älterer Block nachträglich verändert, passt demzufolge sein „digitaler Fingerabdruck“ nicht mehr zu den folgenden Blöcken. Eine Veränderung oder Manipulation von vorherigen Transaktionen wird dadurch erkennbar.', deepDives: [{ label: 'Vertiefung', title: 'Wie ein Block mit dem vorherigen verbunden ist – Hash-Funktionen', paragraphs: ['Der Verweis auf den vorherigen Block ist kein einfacher Verweis wie eine Seitenzahl. Er ist ein sogenannter Hashwert, ein digitaler Fingerabdruck. Eine Hash-Funktion ist ein Rechenverfahren, das Daten beliebiger Länge in eine Zeichenfolge fester Länge umwandelt. Bei Bitcoin wird dafür SHA-256 verwendet. Beim Hashen eines Blockkopfs, des sogenannten Block Headers, wird SHA-256 zweimal hintereinander ausgeführt. Das Ergebnis umfasst 256 Bit und wird üblicherweise als Folge von 64 Hexadezimalzeichen dargestellt.<br>Zwei Eigenschaften machen Hash-Funktionen für die Blockchain unverzichtbar: Zum einen reagieren sie extrem empfindlich. Ändert man an den Ausgangsdaten nur ein einziges Zeichen, sieht der Hashwert völlig anders aus. Zum anderen läuft die Funktion praktisch nur in eine Richtung: Aus dem Hashwert lassen sich die ursprünglichen Daten nicht rekonstruieren.<br>Jeder Block Header enthält den Hashwert des vorherigen Block Headers. Würde jemand einen alten Block verändern, änderte sich dessen Hashwert und der Verweis im nächsten Block passte nicht mehr. Um die Veränderung zu verbergen, müssten auch alle folgenden Blöcke und die zugehörigen Arbeitsnachweise neu berechnet werden.'] }] },
    { kicker: '02', title: 'Die digitale Unterschrift: Mein Schlüssel, dein Schloss', body: 'Bei herkömmlichen Zahlungstransaktionen prüft die Bank, ob ein Konto über ausreichendes Guthaben verfügt und ob eine Zahlung berechtigt ist. Zur Identifikation dienen etwa PIN, Passwort oder Unterschrift. Bei Bitcoin gibt es keine Bank, die diese Prüfung übernimmt. Stattdessen kontrolliert das Netzwerk anhand digitaler Schlüssel, ob jemand über bestimmte Bitcoin verfügen darf. <br>Wer Bitcoin halten, empfangen oder versenden möchte, muss nicht selbst Mining betreiben. Für die Nutzung werden eine Wallet („Hot“ oder „Cold“) und die zugehörigen digitalen Schlüssel benötigt. Aber auch „Self Custody“ oder ein „Custodial Wallet“ (über eine Kryptobörse) ist möglich.<br>Beim Einrichten einer eigenen Wallet erzeugt deren Software einen privaten und einen öffentlichen Schlüssel. Der private Schlüssel wird geheim verwahrt. Bei Cold Storage bleibt er offline oder von einem vernetzten Computer abgeschirmt, etwa auf einer Hardware-Wallet. Bei einer Kryptobörse kontrolliert dagegen meist der Anbieter die Schlüssel. Die Bitcoin selbst liegen nicht in der Wallet, sondern sind als Einträge in der Blockchain verzeichnet.<br>Mit dem privaten Schlüssel unterschreibt die Wallet eine Zahlung digital. Der öffentliche Schlüssel ermöglicht es dem Netzwerk, diese Unterschrift zu prüfen, ohne den privaten Schlüssel offenzulegen.<br>Aus dem öffentlichen Schlüssel kann die Wallet eine öffentlich sichtbare Bitcoin-Adresse ableiten. Sie enthält weder Namen noch Anschrift. Bitcoin ist deshalb pseudonym, aber nicht anonym: Die Zahlungsbewegungen einer Adresse sind öffentlich nachvollziehbar. Wird die Adresse etwa durch eine Kryptobörse einer Person zugeordnet, können auch deren Transaktionen zugeordnet werden.<br>Die eigene Kontrolle über die Schlüssel bringt Verantwortung mit sich. Geht der private Schlüssel verloren, bleiben die damit kontrollierten Bitcoin unzugänglich. Wird der Schlüssel gestohlen, können andere darüber verfügen. Es gibt keine Bank oder zentrale Servicestelle, die den Zugang wiederherstellen kann.', deepDives: [{ label: 'Vertiefung', title: 'Wie ein Schlüsselpaar mathematisch funktioniert', paragraphs: ['Die Schlüsselpaare bei Bitcoin beruhen auf einem mathematischen Verfahren namens Elliptische-Kurven-Kryptografie. Bitcoin verwendet eine bestimmte Kurve mit dem technischen Namen secp256k1. Der private Schlüssel ist eine zufällig erzeugte Zahl aus einem festgelegten Zahlenraum. In dezimaler Schreibweise kann sie bis zu 77 Stellen umfassen. Aus ihr berechnet das Verfahren den öffentlichen Schlüssel. <br>Diese Berechnung funktioniert praktisch wie eine Einbahnstraße: Vom privaten zum öffentlichen Schlüssel zu gelangen, ist mit wenigen Rechenschritten möglich. Den privaten Schlüssel aus dem öffentlichen Schlüssel zurückzurechnen, ist mit heutigen Computern praktisch nicht zu bewältigen. Ein ausreichend leistungsfähiger, fehlerkorrigierter Quantencomputer könnte diese Absicherung künftig gefährden. Ein solcher Computer existiert bislang jedoch nicht. <br>Eine digitale Unterschrift entsteht, indem der private Schlüssel mit den Daten der zu unterschreibenden Transaktion verrechnet wird. Das Ergebnis ist eine Zahlenfolge, die mathematisch an diese Transaktion gebunden ist. Für klassische Bitcoin-Transaktionen wird dazu ECDSA verwendet, der Elliptic Curve Digital Signature Algorithm. Bei Taproot-Transaktionen kommen außerdem Schnorr-Signaturen zum Einsatz. Aus dem öffentlichen Schlüssel kann schließlich eine Bitcoin-Adresse abgeleitet werden – eine kürzere Zeichenfolge, die andere verwenden können, um Bitcoin an diese Adresse zu senden.'] }] },
    { kicker: '03', title: 'Die Einigung durch Rechenarbeit - Mining: Wettbewerb um den nächsten Block', body: 'Die Nodes können prüfen, ob eine Transaktion die Regeln des Bitcoin-Systems erfüllt. Doch eine weitere Frage bleibt: Wer stellt den nächsten Block zusammen und legt damit die Reihenfolge neuer Transaktionen in der Blockchain fest? <br> Hier kommt das Bitcoin-Mining ins Spiel. Miner wählen ausstehende Transaktionen aus und fassen sie zu möglichen neuen Blöcken zusammen. Spezialisierte Rechner treten anschließend ununterbrochen in einem Wettbewerb gegeneinander an. Sie führen enorme Mengen von Rechenversuchen durch, bis einer von ihnen ein Ergebnis findet, das die vorgegebenen Bedingungen erfüllt. <br> Wer ein solches Ergebnis zuerst findet, übermittelt seinen Block an das Netzwerk. Die Nodes prüfen unabhängig voneinander, ob der Block und der dafür erbrachte Arbeitsnachweis den Regeln entsprechen. Ist das der Fall, nehmen sie ihn in ihre Blockchain auf.<br> Dieses Verfahren heißt Proof-of-Work – oder Arbeitsnachweis. Ein gültiges Ergebnis zu finden, erfordert sehr viele Versuche. Es zu überprüfen, benötigt dagegen nur wenig Rechenaufwand.<br>Die Einnahmen des erfolgreichen Miners oder Mining-Pools bestehen aus zwei Teilen: den mit dem Block neu ausgegebenen Bitcoin und den Transaktionsgebühren der darin enthaltenen Zahlungen. Danach beginnt der Wettbewerb um den nächsten Block.' , deepDives: [{ label: 'Vertiefung 01', title: 'Was die Miner genau berechnen – Nonce und Zielwert', paragraphs: ['Miner berechnen den Hashwert des Block Headers, indem sie SHA-256 zweimal hintereinander ausführen. Der Block Header enthält unter anderem einen zusammenfassenden Hashwert der Transaktionen, den Hashwert des vorherigen Blocks, einen Zeitstempel, den Zielwert und die Nonce. Das Ergebnis der Hashberechnung ist eine 256-Bit-Zahl. Sie muss kleiner oder gleich dem vorgegebenen Zielwert sein. <br> Die Nonce, von englisch „number used once“, ist ein 32-Bit-Feld im Block Header, das die Miner verändern können. Jede Veränderung erzeugt einen anderen Hashwert. Ist der mögliche Wertebereich der Nonce ausgeschöpft, verändern die Miner weitere Daten des Blockkandidaten, etwa eine zusätzliche Zahl, die sogenannte ExtraNonce, in der Coinbase-Transaktion. Dadurch ändert sich der zusammenfassende Hashwert der Transaktionen, und die Suche kann mit neuen Block-Headern fortgesetzt werden. Die Mining-Geräte prüfen so Milliarden oder Billionen von Varianten pro Sekunde, bis zufällig ein gültiger Hashwert entsteht.'] }], deepDives: [{ label: 'Vertiefung', title: 'Wie sich die Schwierigkeit an die Rechenleistung anpasst – Difficulty Adjustment', paragraphs: ['Das Bitcoin-System ist so eingerichtet, dass durchschnittlich etwa alle zehn Minuten ein neuer Block entsteht. Alle 2016 Blöcke, rechnerisch etwa zwei Wochen, wird nach festgelegten Regeln ermittelt, wie lange die Erzeugung der letzten 2016 Blöcke gedauert hat. Ging es schneller als vorgesehen, wird der Zielwert abgesenkt und die Aufgabe schwieriger. Dauerte es länger, wird der Zielwert angehoben und die Aufgabe leichter. Dieser Mechanismus heißt Difficulty Adjustment. Er sorgt nicht dafür, dass jeder einzelne Block nach genau zehn Minuten entsteht, sondern hält den langfristigen Durchschnitt in der Nähe dieses Werts.'] }], deepDives: [{ label: 'Vertiefung', title: 'Wie die Ausgabe neuer Bitcoin festgelegt ist – Block Subsidy und Halving', paragraphs: ['Die Menge der neu erzeugten Bitcoin, die ein Miner für einen gefundenen Block beanspruchen darf, ist im Bitcoin-System festgelegt. Dieser Teil der Belohnung heißt Block Subsidy. Hinzu kommen die Transaktionsgebühren, deren Höhe nicht fest vorgegeben ist. <br>Alle 210.000 Blöcke, etwa alle vier Jahre, wird die Block Subsidy halbiert. Als Bitcoin 2009 startete, lag sie bei 50 Bitcoin pro Block. 2012 sank sie auf 25, 2016 auf 12,5, 2020 auf 6,25 und 2024 auf 3,125 Bitcoin. Dadurch ist in den Regeln festgelegt, dass insgesamt nie mehr als knapp 21 Millionen Bitcoin erzeugt werden.'] }] },
    { kicker: '04', title: 'Die Kette wächst: Sicherheit durch Anhäufung', body: 'Die Rechenarbeit des Minings bestimmt nicht nur, wie neue Blöcke entstehen. Sie trägt zugleich dazu bei, bereits eingetragene Transaktionen zu sichern. <br> Jeder neue Block baut auf dem vorherigen auf. Wer eine ältere Transaktion nachträglich verändern wollte, müsste deshalb eine abweichende Blockchain erzeugen. Dafür müssten der betroffene Block und alle darauffolgenden Blöcke mitsamt ihren Arbeitsnachweisen neu berechnet werden, während das übrige Netzwerk die gültige Blockchain weiter verlängert. <br>Jeder weitere Block gilt deshalb als zusätzliche Bestätigung der früheren Transaktionen. Je tiefer ein Eintrag in der Blockchain liegt, desto mehr Rechenarbeit hat sich seitdem über ihm angesammelt und desto aufwendiger wäre eine nachträgliche Veränderung. <br>An die Stelle einer zentralen Buchungsstelle treten bei Bitcoin somit gemeinsame Regeln, kryptografische Prüfungen und öffentlich überprüfbare Arbeitsnachweise. Eine bereits bestätigte Zahlung kann daher nicht von einer zentralen Stelle zurückgebucht werden. Bei einer Fehlüberweisung müsste die empfangende Person die Bitcoin in einer neuen Transaktion zurücksenden.' },
    { kicker: '05', title: 'Bitcoin-Mining-Geräte', body: 'Bitcoin-Mining-Geräte sind spezialisierte Computer, die ununterbrochen Hashwerte von möglichen Block Headern berechnen. Im Inneren arbeiten hochspezialisierte Chips aus Silizium. Auf ihnen befinden sich Milliarden winziger elektronischer Schalter, die mit den Zuständen 0 und 1 rechnen. <br>Über Software und das Internet sind die Mining-Geräte mit dem Bitcoin-Netzwerk oder einem Mining-Pool verbunden. 2009 konnten Bitcoin noch mit dem Prozessor eines gewöhnlichen Computers geschürft werden. Ab 2010 kamen leistungsfähigere Grafikkarten zum Einsatz; 2011/12 folgten programmierbare Spezialchips, sogenannte FPGAs. <br>Eine entscheidende Zäsur begann 2013 mit den ASICs: Chips, die eigens für die von Bitcoin verwendeten SHA-256-Berechnungen entwickelt wurden. Sie waren wesentlich schneller und effizienter, aber auch teurer. Damit wurde Mining auf Heimcomputern zunehmend unrentabel. <br>Schon zuvor wurde Mining auch gewinnorientiert betrieben. Mit den ASICs entwickelte es sich jedoch zunehmend zu einem industriellen Geschäft. Seit etwa 2013/14 betreiben Unternehmen große Anlagen mit Tausenden Geräten, aufwendiger Kühlung und möglichst günstigem Strom. Viele Miner schließen sich außerdem zu Mining-Pools zusammen. Aus einem zunächst dezentralen Experiment wurde so ein kapitalintensiver, globaler Wettbewerb um Einnahmen aus Blocksubventionen und Transaktionsgebühren.' }
  ];

  const deviceSections = [
    { kicker: '01', title: 'Wallet', body: '[Hier erklaeren, was eine Wallet verwaltet und warum sie nicht einfach ein Konto ist.]' },
    { kicker: '02', title: 'Private Key', body: '[Hier erklaeren, was der Private Key ist und warum er geheim bleiben muss.]' },
    { kicker: '03', title: 'Public Key und Adresse', body: '[Hier erklaeren, wie aus kryptografischen Schluesseln eine empfangbare Adresse entsteht.]' },
    { kicker: '04', title: 'Nodes', body: '[Hier beschreiben, welche Rolle vollstaendige und leichte Netzwerkknoten spielen.]' },
    { kicker: '05', title: 'Miner', body: '[Hier erklaeren, welche Aufgabe Miner uebernehmen und wie sie dafuer belohnt werden.]' }
  ];

  const deepDives = [
    { kicker: 'Vertiefung 1', title: '[Titel der Vertiefung]', paragraphs: ['[Hier einen zusaetzlichen Absatz einfuegen.]', '[Hier einen zweiten Absatz einfuegen.]'] },
    { kicker: 'Vertiefung 2', title: '[Titel der Vertiefung]', paragraphs: ['[Hier die naechste Vertiefung einfuegen.]'] },
    { kicker: 'Vertiefung 3', title: '[Titel der Vertiefung]', paragraphs: ['[Hier weitere Hintergrundinformationen einfuegen.]'] }
  ];

  document.title = 'Station 7 · Wie funktioniert Bitcoin?';
  $('frame').setAttribute('aria-label', 'Station 7 - Wie funktioniert Bitcoin?');
  set('actionEyebrow', 'Bitcoin verstehen');
  set('actionTitle', 'Bitcoin');

  function appendSections(container, sections) {
    container.innerHTML = '';
    sections.forEach(section => {
      const article = document.createElement('article');
      article.className = 'article-section';
      const kicker = document.createElement('span');
      kicker.className = 'article-kicker';
      kicker.textContent = section.kicker;
      const heading = document.createElement('h2');
      heading.textContent = section.title;
      const paragraph = document.createElement('p');
      paragraph.innerHTML = section.body;
      article.append(kicker, heading, paragraph);
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
          detailParagraph.textContent = text;
          body.appendChild(detailParagraph);
        });
        expansion.append(summary, body);
        article.appendChild(expansion);
      });
      container.appendChild(article);
    });
  }

  function appendDeepDives(container) {
    container.innerHTML = '';
    deepDives.forEach(section => {
      const item = document.createElement('section');
      item.className = 'deepdive-item';
      const heading = document.createElement('h3');
      heading.className = 'deepdive-title';
      heading.innerHTML = `<span>${section.kicker}</span><strong>${section.title}</strong>`;
      const body = document.createElement('div');
      body.className = 'deepdive-body';
      section.paragraphs.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        body.appendChild(paragraph);
      });
      item.append(heading, body);
      container.appendChild(item);
    });
  }

  appendSections($('bitcoinContent'), bitcoinSections);
  appendSections($('devicesContent'), deviceSections);
  appendDeepDives($('deepdiveList'));
  appendDeepDives($('deviceDeepdiveList'));
});
