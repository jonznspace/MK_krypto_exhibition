'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const set = (id, value) => { const element = $(id); if (element) element.textContent = value; };

  const introSections = [
    {
      kicker: '',
      title: 'Was ist Geld?',
      body: 'Geld ist ein Versprechen, das drei Funktionen erfüllen soll: Es dient als Tauschmittel, als Recheneinheit zum Vergleich von Waren und als Wertspeicher zur Erhaltung von Kaufkraft über die Zeit. Diese Funktion kann Geld nur erfüllen, wenn es im Alltag angenommen wird, ohne dass Herausgeber, Deckung oder Einlösbarkeit bei jedem Tausch/Transfer überprüft werden müssen – ein Zustand, der Regeln, Institutionen und Vertrauen voraussetzt. Die Formen des Geldes haben sich über Jahrhunderte verändert, von Muscheln, Münzen über Papierscheine und Buchgeld zum modernen Fiatgeld. Die Fragen, die es aufwirft, sind aber immer dieselben: Wer garantiert den Wert, wer trägt das Risiko, und wer bestimmt die Regeln?'
    },
    {
      kicker: 'Fiatgeld',
      title: 'Fiatgeld',
      body: 'Unser derzeitiges Geldsystem basiert auf sogenanntem Fiatgeld. Dieser Fachbegriff findet kaum Eingang in die Öffentlichkeit. Er stammt vom lateinischen fiat („es werde") und bezeichnet Geld, das seinen Wert nicht aus einem Eigenwert oder einer Edelmetalldeckung bezieht, sondern allein aus staatlicher Anordnung und gesellschaftlichem Vertrauen. Ein heutiger 20-Euro-Schein ist in seiner Nutzung als Papier praktisch wertlos und eine 1-Euro-Münze enthält Metall im Wert weniger Cent. Sie funktionieren aber als Geld, weil der Staat sie zum gesetzlichen Zahlungsmittel erklärt hat und die Zentralbank ihre Stabilität sichert.'
    },
    {
      kicker: 'Vertrauen',
      title: 'Vertrauen',
      body: 'Wir vertrauen, dass andere unser Geld akzeptieren und dieses Vertrauen wird von Staaten, Notenbanken und Banken garantiert, die Geld ausgeben und Konten verwalten.'
    },
    {
      kicker: '1944 bis 1971',
      title: 'Bretton Woods',
      body: 'Von 1944 bis 1971 existierten mit dem Bretton-Woods-Währungssystem internationale Währungen, die über feste Wechselkurse an den Dollar gebunden waren. Dieser war seinerseits zu einem festen Kurs in Gold einlösbar. Mit der Aufhebung der Einlösbarkeit des Dollars in Gold 1971 durch die amerikanische Nixon-Regierung änderte sich das Währungssystem grundlegend.'
    },
    {
      kicker: 'Seit 1990',
      title: 'Digitales Geld',
      body: 'Eine weitere einschneidende Veränderung war die aufkommende Idee von digitalem Geld. Sie entwickelt sich seit den 1990er Jahren mit E-Geld, Online-Banking, Kryptowerten und Stablecoins rapide weiter. Mit China existiert nunmehr das erste Land, welches, neben traditionellen Geldformen, eine Digitalwährung besitzt.'
    }
  ];

  const deepDives = [
    {
      kicker: 'Vertiefung 1',
      title: 'Zäsuren zum Fiatgeld',
      type: 'timeline',
      intro: 'Die wichtigsten Zäsuren auf dem Weg zum modernen reinen Fiatgeld',
      items: [
        ['1914–1918', 'Mit dem Ersten Weltkrieg setzten die meisten europäischen Staaten die Goldein-lösungspflicht ihrer Banknoten aus, um die Kriegsausgaben zu finanzieren. Es kam zu einer vorübergehenden Rückkehr zum Goldstandard in den 1920er Jahren; das endgültige Schei-tern trat in der Weltwirtschaftskrise ab 1931 ein.'],
        ['1944', 'Die Bretton-Woods-Konferenz etablierte ein neues internationales Währungssystem. Der US-Dollar wurde zur Leitwährung und war zu einem festen Kurs (35 Dollar pro Feinunze) in Gold einlösbar. Dies galt aber nur für Zentralbanken anderer Staaten, nicht für Privatper-sonen. Alle anderen Währungen waren über feste Wechselkurse an den Dollar gebunden. Es war somit eine indirekte, gestufte Goldbindung vorhanden und es existierte kein voller Gold-standard mehr.'],
        ['15. August 1971 („Nixon-Schock")', 'US-Präsident Richard Nixon hob die Goldeinlösbarkeit des Dollars auf. Ab diesem Zeitpunkt sind die wichtigsten Weltwährungen reines Fiatgeld – ohne jede Sachwertbindung. Diese Datierung gilt als Geburtsstunde des modernen Fiat-Geldsystems.'],
        ['1973', 'Übergang zu flexiblen Wechselkursen zwischen den großen Währungen.'],
        ['1971 bis heute', 'Alle bedeutenden Währungen weltweit sind Fiatgeld. Ihr Wert beruht auf dem Vertrauen in die ausgebenden Staaten und Zentralbanken, ihre Stabilität auf der Geld-politik (Zinssteuerung, Inflationskontrolle). Diese Epoche dauert nun rund 55 Jahre an – historisch betrachtet eine kurze Phase.']
      ]
    },
    {
      kicker: 'Vertiefung 2',
      title: 'Geldformen',
      type: 'forms',
      intro: [
        'Chronologische Übersicht der Geldformen',
        'Jede Geldform lässt sich in zwei Dimensionen beschreiben: ihrer äußeren Gestalt und ih-rer Deckungsart.'
      ],
      items: [
        ['Warengeld (ab ca. 9000 v. Chr.)', 'Äußere Gestalt: nutzbare Waren (z. B. Vieh, Getreide, Salz, Kakao, Tabak)', 'Deckungsart: Eigenwert – Die Ware ist auch ohne Geldfunktion brauchbar.'],
        ['Frühformen ohne Eigennutzen (ab ca. 1200 v. Chr.)', 'Äußere Gestalt: Kaurimuscheln, Wampum, Rai-Steine', 'Deckungsart: gesellschaftliche Übereinkunft und Knappheit, erstmals wird der Wert allein durch Akzeptanz erzeugt'],
        ['Edelmetall-Wägegeld (ab ca. 3000 v. Chr.)', 'Äußere Gestalt: unstandardisierte Silber- oder Goldstücke, vor jeder Transaktion wird gewo-gen', 'Deckungsart: Eigenwert des Edelmetalls'],
        ['Vollwertige Münzen (ab ca. 600 v. Chr.)', 'Äußere Gestalt: geprägte Münzen mit standardisiertem Gewicht und Feingehalt', 'Deckungsart: Eigenwert des Edelmetalls'],
        ['Edelmetall-gedeckte Banknoten (in China ab 1024, in Europa ab 1661)', 'Äußere Gestalt: bedrucktes Papier', 'Deckungsart: Einlösungsversprechen in Edelmetall – Der Schein selbst ist nahezu wertlos, aber gegen hinterlegtes Gold oder Silber einlösbar.'],
        ['Scheidemünzen (zunehmend ab dem 19. Jahrhundert)', 'Äußere Gestalt: Münzen aus unedlen Metallen oder mit reduziertem Edelmetallgehalt', 'Deckungsart: staatliche Anordnung und Vertrauen. Der Materialwert liegt teils deutlich un-ter dem Nennwert; eine frühe Form des Fiat-Prinzips bei Münzen.'],
        ['Goldstandard-Währung (ca. 1870-1914, kurz wiederbelebt 1925-1931)', 'Äußere Gestalt: Banknoten und Buchgeld', 'Deckungsart: feste Goldparität – Währungen sind in Gold einlösbar; Zentralbanken halten Goldreserven.'],
        ['Bretton-Woods-Währungen (1944-1971)', 'Äußere Gestalt: Banknoten und Buchgeld', 'Deckungsart: gestufte Goldbindung über den US-Dollar – Dollar einlösbar in Gold (nur für Zentralbanken), andere Währungen fest an den Dollar gebunden'],
        ['Fiat-Geld (ab 1971 in voller Reinform)', 'Äußere Gestalt: Banknoten und Buchgeld', 'Deckungsart: staatliche Anordnung und Vertrauen in die Zentralbank; keine Einlösung in einen Sachwert; heute die dominierende Geldform weltweit'],
        ['E-Geld (ab den 1990er Jahren)', 'Äußere Gestalt: elektronisch gespeicherte Werteinheiten bei einem zugelassenen E-Geld-Institut', 'Deckungsart: Einlösungsversprechen gegen Fiat-Geld'],
        ['Kryptowerte (ab 2009)', 'Äußere Gestalt: digitale Werteinheiten auf einer Blockchain', 'Deckungsart: algorithmische Knappheit ohne Einlösungsversprechen; seitens der EU keine Einstufung als „Geld“'],
        ['Stablecoins (ab ca. 2014)', 'Äußere Gestalt: digitale Token auf einer Blockchain', 'Deckungsart: Geldwerte, (Staats-)Anleihen, andere Kryptowerte und Fiat-Geld, Einlösungs-versprechen von einem privaten Emittenten'],
        ['Digitales Zentralbankgeld / CBDC (in Vorbereitung)', 'Äußere Gestalt: digitale Werteinheiten in einer von der Zentralbank kontrollierten Infrastruk-tur', 'Deckungsart: Fiat-Geld in neuer technischer Form: Wert beruht auf staatlicher Anordnung – aber ohne Umweg über Geschäftsbanken']
      ]
    },
    {
      kicker: 'Vertiefung 3',
      title: 'Keine Geldformen',
      type: 'text',
      paragraphs: [
        'Was keine Geldformen sind',
        'Eine Geldform ist eine eigenständige Werteinheit mit eigener rechtlicher und ökonomischer Stellung. Eine bloße Schnittstelle oder Übertragungstechnologie ist keine Geldform, son-dern eine Zugriffsform auf bereits bestehendes Geld.',
        'Keine eigenen Geldformen, sondern Zahlungswege oder Zugangstechnologien sind: Wech-selbriefe und Schecks (Zahlungsanweisungen auf hinterlegtes Geld), Kreditkarten und De-bitkarten (Zugriff auf Buchgeld), Überweisungen und Lastschriften (Übertragungswege für Buchgeld), Online-Banking (digitale Oberfläche für Buchgeld), Apple Pay, Google Pay, Alipay und WeChat Pay (Apps, die auf Karten oder Konten zugreifen), kontaktloses Zahlen und QR-Code-Zahlung (Übertragungstechnologien).',
        'Der Unterschied wird besonders deutlich bei PayPal: Eine Zahlung vom verknüpften Bank-konto über PayPal ist ein Zahlungsweg – das Geld bleibt Buchgeld der Bank. Ein PayPal-Guthaben hingegen ist E-Geld – also tatsächlich eine eigene Geldform.'
      ]
    }
  ];

  document.title = 'Station 8 · Was ist Geld?';
  $('frame').setAttribute('aria-label', 'Station 8 – Was ist Geld?');
  set('startEyebrow', 'Neue Entwicklungen');
  set('startTitle', 'Was ist Geld?');
  set('tryLabel', 'Mehr erfahren');
  set('actionEyebrow', 'Neue Entwicklungen');
  set('actionTitle', 'Vertiefung');

  const intro = $('startIntro');
  if (intro) {
    intro.innerHTML = '';
    introSections.forEach(section => {
      if (section.kicker) {
        const kicker = document.createElement('span');
        kicker.className = 'hero-text__kicker';
        kicker.textContent = section.kicker;
        intro.append(kicker);
      }
      const paragraph = document.createElement('p');
      paragraph.textContent = section.body;
      intro.append(paragraph);
    });
  }

  function appendText(section, detail) {
    const paragraphs = section.paragraphs || [section.body];
    paragraphs.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      detail.appendChild(paragraph);
    });
  }

  function appendTimeline(section, detail) {
    const intro = document.createElement('p');
    intro.className = 'money-detail__intro';
    intro.textContent = section.intro;
    detail.appendChild(intro);
    const timeline = document.createElement('div');
    timeline.className = 'money-timeline';
    section.items.forEach(([date, text]) => {
      const item = document.createElement('section');
      item.className = 'money-timeline__item';
      const time = document.createElement('strong');
      time.textContent = date;
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      item.append(time, paragraph);
      timeline.appendChild(item);
    });
    detail.appendChild(timeline);
  }

  function appendForms(section, detail) {
    section.intro.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.className = 'money-detail__intro';
      paragraph.textContent = text;
      detail.appendChild(paragraph);
    });
    const grid = document.createElement('div');
    grid.className = 'money-form-grid';
    section.items.forEach(([title, shape, backing]) => {
      const item = document.createElement('section');
      item.className = 'money-form';
      const heading = document.createElement('h3');
      heading.textContent = title;
      const shapeText = document.createElement('p');
      shapeText.textContent = shape;
      const backingText = document.createElement('p');
      backingText.textContent = backing;
      item.append(heading, shapeText, backingText);
      grid.appendChild(item);
    });
    detail.appendChild(grid);
  }

  function fillDeepDiveBody(section, body) {
    if (section.type === 'timeline') appendTimeline(section, body);
    else if (section.type === 'forms') appendForms(section, body);
    else appendText(section, body);
  }

  function toggleDeepDive(index) {
    document.querySelectorAll('.deepdive-item').forEach((item, itemIndex) => {
      const isOpen = itemIndex === index ? item.classList.toggle('open') : item.classList.remove('open');
      item.querySelector('.deepdive-header').setAttribute('aria-expanded', String(isOpen));
    });
  }

  const list = $('deepdiveList');
  list.innerHTML = '';
  deepDives.forEach((section, index) => {
    const item = document.createElement('section');
    item.className = 'deepdive-item';

    const header = document.createElement('button');
    header.className = 'deepdive-header';
    header.type = 'button';
    header.setAttribute('aria-expanded', 'false');
    header.innerHTML = `<span class="deepdive-header-copy"><span>${section.kicker}</span><strong>${section.title}</strong></span><span class="deepdive-chevron">⌄</span>`;
    header.addEventListener('click', () => toggleDeepDive(index));

    const panel = document.createElement('div');
    panel.className = 'deepdive-panel';
    const panelInner = document.createElement('div');
    panelInner.className = 'deepdive-panel-inner';
    const body = document.createElement('div');
    body.className = 'deepdive-body';
    fillDeepDiveBody(section, body);
    panelInner.appendChild(body);
    panel.appendChild(panelInner);

    item.append(header, panel);
    list.appendChild(item);
  });
});

