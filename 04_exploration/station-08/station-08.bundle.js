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

  const englishIntro = [
    'Money is a promise intended to fulfill three functions: it serves as a medium of exchange, a unit of account for comparing goods, and a store of value for preserving purchasing power over time. Money can fulfill these functions only if it is accepted in everyday life without people having to check its issuer, backing, or redeemability every time it changes hands—a situation that requires rules, institutions, and trust. The forms of money have changed over the centuries, from shells and coins to paper banknotes, bank deposits, and modern fiat money. Yet the questions it raises remain the same: Who guarantees its value, who bears the risk, and who sets the rules?',
    'Our current monetary system is based on what is known as fiat money. This technical term is rarely used outside specialist circles. It comes from the Latin fiat (“let it be”) and refers to money whose value derives not from any intrinsic worth or precious-metal backing, but solely from government decree and society’s trust. The paper in a modern 20-euro banknote is worth next to nothing, and a 1-euro coin contains only a few cents’ worth of metal. Yet they function as money because the government has declared them legal tender and the central bank safeguards their stability.',
    'We trust that others will accept our money. This trust is guaranteed by governments, central banks, and commercial banks, which issue money and manage accounts.',
    'From 1944 to 1971, the Bretton Woods monetary system linked participating countries’ currencies to the US dollar through fixed exchange rates. The dollar, in turn, was convertible into gold at a fixed rate. When the US administration under President Nixon ended the dollar’s convertibility into gold in 1971, the monetary system changed fundamentally.',
    'Another major shift came with the emerging idea of digital money. Since the 1990s, it has developed rapidly through electronic money, online banking, crypto assets, and stablecoins. China has now become the first country to have a digital currency alongside traditional forms of money.'
  ];

  const deepDives = [
    {
      kicker: 'Vertiefung 1',
      title: 'Die wichtigsten Zäsuren auf dem Weg zum modernen reinen Fiatgeld',
      type: 'timeline',
      items: [
        ['1914–1918', 'Mit dem Ersten Weltkrieg setzten die meisten europäischen Staaten die Goldeinlösungspflicht ihrer Banknoten aus, um die Kriegsausgaben zu finanzieren. Es kam zu einer vorübergehenden Rückkehr zum Goldstandard in den 1920er Jahren; das endgültige Scheitern trat in der Weltwirtschaftskrise ab 1931 ein.'],
        ['1944', 'Die Bretton-Woods-Konferenz etablierte ein neues internationales Währungssystem. Der US-Dollar wurde zur Leitwährung und war zu einem festen Kurs (35 Dollar pro Feinunze) in Gold einlösbar. Dies galt aber nur für Zentralbanken anderer Staaten, nicht für Privatpersonen. Alle anderen Währungen waren über feste Wechselkurse an den Dollar gebunden. Es war somit eine indirekte, gestufte Goldbindung vorhanden und es existierte kein voller Goldstandard mehr.'],
        ['15. August 1971 („Nixon-Schock")', 'US-Präsident Richard Nixon hob die Goldeinlösbarkeit des Dollars auf. Ab diesem Zeitpunkt sind die wichtigsten Weltwährungen reines Fiatgeld – ohne jede Sachwertbindung. Diese Datierung gilt als Geburtsstunde des modernen Fiat-Geldsystems.'],
        ['1973', 'Übergang zu flexiblen Wechselkursen zwischen den großen Währungen.'],
        ['1971 bis heute', 'Alle bedeutenden Währungen weltweit sind Fiatgeld. Ihr Wert beruht auf dem Vertrauen in die ausgebenden Staaten und Zentralbanken, ihre Stabilität auf der Geldpolitik (Zinssteuerung, Inflationskontrolle). Diese Epoche dauert nun rund 55 Jahre an – historisch betrachtet eine kurze Phase.']
      ]
    },
    {
      kicker: 'Vertiefung 2',
      title: 'Chronologische Übersicht der Geldformen',
      type: 'forms',
      intro: [
        'Jede Geldform lässt sich in zwei Dimensionen beschreiben: in ihrer äußeren Gestalt und ihrer Deckungsart.'
      ],
      items: [
        ['Warengeld (ab ca. 9000 v. Chr.)', 'Äußere Gestalt: nutzbare Waren (z. B. Vieh, Getreide, Salz, Kakao, Tabak)', 'Deckungsart: Eigenwert – Die Ware ist auch ohne Geldfunktion brauchbar.'],
        ['Frühformen ohne Eigennutzen (ab ca. 1200 v. Chr.)', 'Äußere Gestalt: Kaurimuscheln, Wampum, Rai-Steine', 'Deckungsart: gesellschaftliche Übereinkunft und Knappheit, erstmals wird der Wert allein durch Akzeptanz erzeugt'],
        ['Edelmetall-Wägegeld (ab ca. 3000 v. Chr.)', 'Äußere Gestalt: unstandardisierte Silber- oder Goldstücke, vor jeder Transaktion wird gewogen', 'Deckungsart: Eigenwert des Edelmetalls'],
        ['Vollwertige Münzen (ab ca. 600 v. Chr.)', 'Äußere Gestalt: geprägte Münzen mit standardisiertem Gewicht und Feingehalt', 'Deckungsart: Eigenwert des Edelmetalls'],
        ['Edelmetall-gedeckte Banknoten (in China ab 1024, in Europa ab 1661)', 'Äußere Gestalt: bedrucktes Papier', 'Deckungsart: Einlösungsversprechen in Edelmetall – Der Schein selbst ist nahezu wertlos, aber gegen hinterlegtes Gold oder Silber einlösbar.'],
        ['Scheidemünzen (zunehmend ab dem 19. Jahrhundert)', 'Äußere Gestalt: Münzen aus unedlen Metallen oder mit reduziertem Edelmetallgehalt', 'Deckungsart: staatliche Anordnung und Vertrauen. Der Materialwert liegt teils deutlich unter dem Nennwert; eine frühe Form des Fiat-Prinzips bei Münzen.'],
        ['Goldstandard-Währung (ca. 1870-1914, kurz wiederbelebt 1925-1931)', 'Äußere Gestalt: Banknoten und Buchgeld', 'Deckungsart: feste Goldparität – Währungen sind in Gold einlösbar; Zentralbanken halten Goldreserven.'],
        ['Bretton-Woods-Währungen (1944-1971)', 'Äußere Gestalt: Banknoten und Buchgeld', 'Deckungsart: gestufte Goldbindung über den US-Dollar – Dollar einlösbar in Gold (nur für Zentralbanken), andere Währungen fest an den Dollar gebunden'],
        ['Fiat-Geld (ab 1971 in voller Reinform)', 'Äußere Gestalt: Banknoten und Buchgeld', 'Deckungsart: staatliche Anordnung und Vertrauen in die Zentralbank; keine Einlösung in einen Sachwert; heute die dominierende Geldform weltweit'],
        ['E-Geld (ab den 1990er Jahren)', 'Äußere Gestalt: elektronisch gespeicherte Werteinheiten bei einem zugelassenen E-Geld-Institut', 'Deckungsart: Einlösungsversprechen gegen Fiat-Geld'],
        ['Kryptowerte (ab 2009)', 'Äußere Gestalt: digitale Werteinheiten auf einer Blockchain', 'Deckungsart: algorithmische Knappheit ohne Einlösungsversprechen; seitens der EU keine Einstufung als „Geld“'],
        ['Stablecoins (ab ca. 2014)', 'Äußere Gestalt: digitale Token auf einer Blockchain', 'Deckungsart: Geldwerte, (Staats-)Anleihen, andere Kryptowerte und Fiat-Geld, Einlösungsversprechen von einem privaten Emittenten'],
        ['Digitales Zentralbankgeld / CBDC (in Vorbereitung)', 'Äußere Gestalt: digitale Werteinheiten in einer von der Zentralbank kontrollierten Infrastruktur', 'Deckungsart: Der Wert beruht auf staatlicher Anordnung, ohne Umweg über Geschäftsbanken']
      ]
    },
    {
      kicker: 'Vertiefung 3',
      title: 'Was keine Geldformen sind',
      type: 'text',
      paragraphs: [
        'Eine Geldform ist eine eigenständige Werteinheit mit eigener rechtlicher und ökonomischer Stellung. Eine bloße Schnittstelle oder Übertragungstechnologie ist keine Geldform, sondern eine Zugriffsform auf bereits bestehendes Geld.',
        'Keine eigenen Geldformen, sondern Zahlungswege oder Zugangstechnologien sind: Wechselbriefe und Schecks (Zahlungsanweisungen auf hinterlegtes Geld), Kreditkarten und Debitkarten (Zugriff auf Buchgeld), Überweisungen und Lastschriften (Übertragungswege für Buchgeld), Online-Banking (digitale Oberfläche für Buchgeld), Apple Pay, Google Pay, Alipay und WeChat Pay (Apps, die auf Karten oder Konten zugreifen), kontaktloses Zahlen und QR-Code-Zahlung (Übertragungstechnologien).',
        'Der Unterschied wird besonders deutlich bei PayPal: Eine Zahlung vom verknüpften Bankkonto über PayPal ist ein Zahlungsweg. Das Geld bleibt Buchgeld der Bank. Ein PayPal-Guthaben hingegen ist E-Geld. Also tatsächlich eine eigene Geldform.'
      ]
    }
  ];

  const englishDeepDives = [
    {
      kicker: 'Deep dive 1',
      title: 'Key Turning Points on the Path to Modern Fiat Money',
      type: 'timeline',
      items: [
        ['1914–1918', 'During World War I, most European countries suspended the obligation to redeem their banknotes in gold to finance wartime spending. A temporary return to the gold standard followed in the 1920s; its final collapse came during the Great Depression, beginning in 1931.'],
        ['1944', 'The Bretton Woods Conference established a new international monetary system. The US dollar became the anchor currency and was redeemable in gold at a fixed rate of $35 per troy ounce. However, this applied only to other countries’ central banks, not to private individuals. All other currencies were pegged to the dollar at fixed exchange rates. This created an indirect, two-tier link to gold rather than a full gold standard.'],
        ['August 15, 1971 (“Nixon Shock”)', 'US President Richard Nixon ended the dollar’s convertibility into gold. From this point onward, the world’s major currencies became pure fiat money, with no link to any tangible asset. This date is regarded as the birth of the modern fiat monetary system.'],
        ['1973', 'The major currencies moved to floating exchange rates.'],
        ['1971 to the present', 'All major currencies worldwide are fiat money. Their value rests on trust in the issuing governments and central banks, while their stability depends on monetary policy, including interest rate adjustments and inflation control. This era has now lasted approximately 55 years, a short period in historical terms.']
      ]
    },
    {
      kicker: 'Deep dive 2',
      title: 'A Chronological Overview of Forms of Money',
      type: 'forms',
      intro: ['Each form of money can be described in two dimensions: the form it takes and what backs its value.'],
      items: [
        ['Commodity Money (from c. 9000 BCE)', 'Form: Useful commodities, such as livestock, grain, salt, cocoa, and tobacco.', 'Backing: Intrinsic value—the commodity remains useful even when it is not used as money.'],
        ['Early Forms Without Intrinsic Utility (from c. 1200 BCE)', 'Form: Cowrie shells, wampum, and rai stones.', 'Backing: Social agreement and scarcity; for the first time, value is created solely through acceptance.'],
        ['Precious Metal Money Measured by Weight (from c. 3000 BCE)', 'Form: Nonstandardized pieces of silver or gold, weighed before each transaction.', 'Backing: The intrinsic value of the precious metal.'],
        ['Full-Bodied Coins (from c. 600 BCE)', 'Form: Minted coins with standardized weight and precious metal content.', 'Backing: The intrinsic value of the precious metal.'],
        ['Banknotes Backed by Precious Metals (from 1024 in China and 1661 in Europe)', 'Form: Printed paper.', 'Backing: A promise of redemption in precious metal. The note itself is almost worthless, but it can be exchanged for gold or silver held in reserve.'],
        ['Token Coinage (increasingly common from the 19th century)', 'Form: Coins made from base metals or with reduced precious metal content.', 'Backing: Government decree and trust. The material value is sometimes considerably lower than the face value, an early application of the fiat principle to coins.'],
        ['Gold Standard Currencies (c. 1870–1914, briefly revived in 1925–1931)', 'Form: Banknotes and bank deposits.', 'Backing: A fixed gold parity. Currencies are redeemable in gold, and central banks hold gold reserves.'],
        ['Bretton Woods Currencies (1944–1971)', 'Form: Banknotes and bank deposits.', 'Backing: An indirect link to gold through the US dollar—the dollar is redeemable in gold, but only by central banks, while other currencies are pegged to the dollar.'],
        ['Fiat Money (in its fully unbacked form from 1971)', 'Form: Banknotes and bank deposits.', 'Backing: Government decree and trust in the central bank; no redemption in a tangible asset. Today, this is the dominant form of money worldwide.'],
        ['Electronic Money / E-Money (from the 1990s)', 'Form: Electronically stored units of value held with an authorized electronic money institution.', 'Backing: A promise of redemption in fiat money.'],
        ['Crypto Assets (from 2009)', 'Form: Digital units of value on a blockchain.', 'Backing: Algorithmic scarcity without a promise of redemption; not classified as “money” by the EU.'],
        ['Stablecoins (from c. 2014)', 'Form: Digital tokens on a blockchain.', 'Backing: Monetary assets, bonds—including government bonds—other crypto assets, and fiat money, with a promise of redemption from a private issuer.'],
        ['Central Bank Digital Currency / CBDC (in preparation)', 'Form: Digital units of value within an infrastructure controlled by the central bank.', 'Backing: Its value rests on government decrees, without commercial banks as intermediaries.']
      ]
    },
    {
      kicker: 'Deep dive 3',
      title: 'What Does Not Count as a Form of Money?',
      type: 'text',
      paragraphs: [
        'A form of money is a distinct unit of value with its own legal and economic status. An interface or transfer technology alone is not a form of money; it provides access to money that already exists.',
        'The following are payment methods or access technologies rather than distinct forms of money: bills of exchange and checks (instructions to pay from deposited funds); credit and debit cards (access to bank deposits); bank transfers and direct debits (ways of transferring bank deposits); online banking (a digital interface for bank deposits); Apple Pay, Google Pay, Alipay, and WeChat Pay (apps that access cards or accounts); and contactless and QR-code payments (technologies for transmitting payment information).',
        'PayPal makes the distinction particularly clear: a payment through PayPal from a linked bank account is a payment method. The money remains a bank deposit. A PayPal balance, however, is e-money and thus a distinct form of money.'
      ]
    }
  ];

  document.title = 'Station 6 · Was ist Geld?';
  $('frame').setAttribute('aria-label', 'Station 6 – Was ist Geld?');
  set('startTitle', 'Was ist Geld?');

  function renderIntro(language) {
    set('startTitle', language === 'en' ? 'What Is Money?' : 'Was ist Geld?');
    const intro = $('startIntro');
    intro.innerHTML = '';
    const paragraphs = language === 'en' ? englishIntro : introSections.map(section => section.body);
    paragraphs.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
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

  function appendParagraph(parent, text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    parent.appendChild(paragraph);
  }

  // Zäsuren und Geldformen teilen sich eine Zeitleiste: Titel, darunter ein oder mehrere Absätze.
  function appendTimeline(entries, detail) {
    const timeline = document.createElement('div');
    timeline.className = 'money-timeline';
    entries.forEach(([title, ...texts]) => {
      const item = document.createElement('section');
      item.className = 'money-timeline__item';
      const heading = document.createElement('h3');
      heading.className = 'money-timeline__title';
      heading.textContent = title;
      item.appendChild(heading);
      texts.forEach(text => appendParagraph(item, text));
      timeline.appendChild(item);
    });
    detail.appendChild(timeline);
  }

  function fillDeepDiveBody(section, body) {
    if (section.type === 'timeline' || section.type === 'forms') {
      (section.intro || []).forEach(text => appendParagraph(body, text));
      appendTimeline(section.items, body);
    } else {
      appendText(section, body);
    }
  }

  // Immer nur eine Vertiefung offen; die geöffnete rückt an den Anfang des Scrollbereichs.
  function toggleDeepDive(index) {
    const list = $('deepdiveList');
    document.querySelectorAll('.deepdive-item').forEach((item, itemIndex) => {
      const isOpen = itemIndex === index ? item.classList.toggle('open') : item.classList.remove('open');
      item.querySelector('.deepdive-header').setAttribute('aria-expanded', String(isOpen));
      if (isOpen) list.scrollTop = item.offsetTop;
    });
  }

  function closeDeepDives() {
    document.querySelectorAll('.deepdive-item').forEach(item => {
      item.classList.remove('open');
      item.querySelector('.deepdive-header').setAttribute('aria-expanded', 'false');
    });
    $('deepdiveList').scrollTop = 0;
  }

  function renderDeepDives(language) {
    const list = $('deepdiveList');
    list.innerHTML = '';
    const sections = language === 'en' ? englishDeepDives : deepDives;
    sections.forEach((section, index) => {
      const item = document.createElement('section');
      item.className = 'deepdive-item';

      const header = document.createElement('button');
      header.className = 'deepdive-header';
      header.type = 'button';
      header.setAttribute('aria-expanded', 'false');
      const kicker = document.createElement('span');
      kicker.className = 'deepdive-kicker';
      kicker.textContent = section.kicker;
      const title = document.createElement('strong');
      title.className = 'deepdive-title';
      title.textContent = section.title;
      header.append(kicker, title);
      header.addEventListener('click', () => toggleDeepDive(index));

      const panel = document.createElement('div');
      panel.className = 'deepdive-panel';
      const body = document.createElement('div');
      body.className = 'deepdive-body';
      fillDeepDiveBody(section, body);
      panel.appendChild(body);

      item.append(header, panel);
      list.appendChild(item);
    });
  }

  // Start ↔ Vertiefung. Schließen setzt die Vertiefung zurück, damit der nächste Besuch oben beginnt.
  $('btnTry').addEventListener('click', () => {
    $('screenStart').classList.add('hidden');
    $('screenAction').classList.remove('hidden');
  });
  $('btnClose').addEventListener('click', () => {
    closeDeepDives();
    $('screenAction').classList.add('hidden');
    $('screenStart').classList.remove('hidden');
  });

  // Blauer Scroll-Indikator wie in der Leseansicht, je Scrollbereich ein eigener.
  document.querySelectorAll('.scroll-area').forEach(area => {
    const track = area.querySelector('.station-offcanvas__scrollbar');
    window.StationOffcanvas.scrollIndicator(
      area.querySelector('.scroll-area__scroller'),
      track,
      track.querySelector('.station-offcanvas__scrollbar-thumb')
    );
  });

  let appliedLanguage = null;
  function renderContent(language) {
    if (language === appliedLanguage) return;
    appliedLanguage = language;
    renderIntro(language);
    set('tryLabel', 'Mehr erfahren');
    set('actionTitle', language === 'en' ? 'Deep dive' : 'Vertiefung');
    renderDeepDives(language);
  }

  renderContent(document.documentElement.dataset.language === 'en' ? 'en' : 'de');
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'data-language')) {
      renderContent(document.documentElement.dataset.language === 'en' ? 'en' : 'de');
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
});


