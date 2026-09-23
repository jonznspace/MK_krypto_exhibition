'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const setText = (id, value) => { const element = $(id); if (element) element.textContent = value; };

  const intro = [
    'In den USA des 19. Jahrhunderts gab es über weite Strecken keine Zentralbank – und kein einheitliches Papiergeld. Zwischen 1836 und 1863, in der sogenannten Free Banking Era, druckten tausende Banken, Eisenbahngesellschaften, Immobilienfirmen und einzelne Händler eigene Geldscheine. Jeder Schein musste einzeln beurteilt werden: Wer hat ihn ausgegeben? War er gedeckt? Wo konnte er eingelöst werden? Kaufleute brauchten gedruckte Nachschlagewerke, um die Glaubwürdigkeit einzelner Noten zu prüfen.',
    'Die vier ausgewählten Geldscheine zeigen die Bandbreite: Eine Banknote aus dem Baumwollhandel in Georgia, ein Drei-Dollar-Schein aus Michigan, dem Bundesstaat, der zum Inbegriff betrügerischer Bankgründungen wurde, ein Schein einer Immobilienfirma aus Iowa, die nach einem Jahr pleiteging, und ein Händlerschein aus Baltimore, der noch 1871 gedruckt wurde, obwohl ein nationales Gesetz das private Gelddrucken längst hatte beenden sollen.',
    'Erst 1863 schuf der National Banking Act einheitliche Regeln: Banken durften Papiergeld ausgeben, mussten dafür jedoch US-Staatsanleihen als Sicherheit hinterlegen. Zudem waren die Noten nicht mehr nur lokal gültig, sondern konnten überall im Land eingelöst werden.',
    'Die Parallele zur heutigen Kryptowelt liegt in der Vielzahl privater digitaler Geldversprechen. Die Fülle an Stablecoins unterscheidet sich in Herausgeber, Deckung, Einlösbarkeit und Regulierung. Die Geschichte der Free Banking Era zeigt, dass ein unübersichtlicher Geldmarkt früher oder später die Frage nach gemeinsamen Standards und verlässlicher Aufsicht aufwirft.'
  ];

  const deepDives = [
    {
      kicker: 'Vertiefung 1',
      title: 'Wildcat Banking, Stablecoins und die Frage nach der Ordnung',
      paragraphs: [
        'Warum die USA 76 Jahre lang kein einheitliches Papiergeld hatten',
        'Zwischen 1836 und 1913 besaßen die Vereinigten Staaten keine Zentralbank. Das war kein Zufall, sondern das Ergebnis eines erbitterten politischen Kampfes. Zweimal hatte der Kongress eine nationale Bank gegründet – 1791 und 1816 –, und beide Male war sie nach 20 Jahren wieder verschwunden.',
        'Anders als in Europa, wo Zentralbanken durch dauerhafte Gesetze errichtet wurden, erhielten die beiden US-Nationalbanken vom Kongress jeweils nur eine befristete Genehmigung über 20 Jahre. Diese Befristung selbst war schon ein politischer Kompromiss, denn die Gegner akzeptierten die Bank nur unter der Bedingung, dass sie automatisch enden würde, wenn die nächste Generation von Parlamentariern nicht erneut zustimmte. Genau das geschah: 1811 und 1836 hatten sich die Machtverhältnisse verschoben und eine Verlängerung scheiterte. Erst 1913, beim dritten Anlauf, wurde die Federal Reserve ohne Ablaufdatum gegründet – und besteht bis heute.',
        'In die Lücke, die der Wegfall der Zentralbank hinterließ, traten hunderte private Banken mit der Ausgabe eigener Geldscheine.'
      ]
    },
    {
      kicker: 'Vertiefung 2',
      title: 'Die Free Banking Era: Tausende verschiedene „Währungen“',
      paragraphs: [
        'Ab 1837 konnte in vielen Bundesstaaten praktisch jeder eine Bank gründen. Und jede Bank konnte eigene Geldscheine drucken. Aber es blieb nicht nur bei den Banken: Auch Eisenbahngesellschaften, Versicherungen, Immobilienfirmen und einzelne Kaufleute brachten Scheine in Umlauf.',
        'Die Noten sollten durch hinterlegte Sicherheiten gedeckt sein, zumeist durch Staatsanleihen der Einzelstaaten. In der Praxis variierte die Qualität enorm. In Michigan wurden teils illiquide oder bereits im Wert gefallene Anleihen akzeptiert. Im schlimmsten Fall bestanden die „Barreserven“ einer Bank aus Kisten voller Nägel und Glas, die obenauf durch eine dünne Schicht an Silbermünzen getarnt wurden.',
        'Konnte man mit einem Schein einer bestimmten Bank überall bezahlen? Nein. Eine Note der Bank of New York wurde in Philadelphia vielleicht mit 1–2 % Abschlag akzeptiert; die Note einer entlegenen Bank in Michigan konnte 20–50 % unter Nennwert gehandelt werden – oder gar nicht.',
        'Um mit diesem Chaos umzugehen, entstand eine eigene Informationsinfrastruktur, die wiederum einen Spekulationsmarkt entstehen ließ. Sogenannte Banknote Reporters listeten auf, welche Banken noch zahlungsfähig waren und zu welchem Abschlag deren Noten gehandelt wurden. Note Brokers kauften Banknoten unter Nennwert, reisten zur ausgebenden Bank und lösten sie in Gold ein, wenn dieses vorhanden war.',
        'Diese Verzeichnisse und Händler sind das historische Pendant zu heutigen Krypto-Tracking-Websites wie CoinMarketCap oder CoinGecko. Damals wie heute gilt: Wo privates Geld nicht einheitlich vertrauenswürdig ist, entsteht Spekulationshandel.',
        'Etwa ein Drittel aller umlaufenden Banknoten waren überdies Fälschungen.'
      ]
    },
    {
      kicker: 'Vertiefung 3',
      title: 'Der Weg zur Ordnung – und die Parallelen zu heute',
      paragraphs: [
        '1863 verabschiedete der Kongress den National Banking Act: Es wurden bundesweit lizenzierte Banken mit einheitlicher Deckung durch US-Staatsanleihen durchgesetzt. Eine Strafsteuer von 10 % auf die alten Banknoten machte diese unwirtschaftlich. Ab 1874 konnten die neuen National Bank Notes überall im Land zum vollen Nennwert eingelöst werden. Zum ersten Mal war es egal, welche Bank einen Schein ausgestellt hatte.',
        'Wirtschaftswissenschaftler bezeichnen diesen Zustand als „informationsunempfindlich“: Es muss bei diesem Geld nicht mehr recherchiert werden, wer es herausgegeben hat. Dasselbe Ziel hat die heutige Stablecoin-Regulierung: Ein Stablecoin soll so sicher und austauschbar werden, dass die Frage nach dem Emittenten irrelevant wird.',
        'Die MiCA-Verordnung der EU verfährt dabei ähnlich wie der National Banking Act: Dollar-Stablecoins werden nicht verboten, aber durch Lizenzpflichten und Transaktionsobergrenzen so stark reglementiert, dass nicht-konforme Emittenten aus dem europäischen Markt gedrängt werden. Die Banque de France warnte 2026 vor einer „digitalen Dollarisierung“. Sie sieht es als Gefahr, dass der Zahlungsverkehr auf Blockchains standardmäßig über Dollar-Token läuft und somit der Euro an Bedeutung verliert. Als Gegenmaßnahme entwickeln europäische Banken einen Euro-Stablecoin (Qivalis, geplant Ende 2026). Die EZB treibt parallel den digitalen Euro voran.'
      ]
    }
  ];

  function setTitle(value) {
    const title = $('startTitle');
    const characterCount = value.replace(/\s/g, '').length;
    title.classList.toggle('title--medium', characterCount >= 20 && characterCount < 39);
    title.classList.toggle('title--long', characterCount >= 39);
    title.innerHTML = '';
    value.split(' ').forEach((word, index, words) => {
      const wordNode = document.createElement('span');
      wordNode.className = 'title-word';
      wordNode.textContent = word;
      title.appendChild(wordNode);
      if (index < words.length - 1) title.appendChild(document.createTextNode(' '));
    });
  }

  function renderParagraphs(container, paragraphs) {
    container.innerHTML = '';
    paragraphs.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      container.appendChild(paragraph);
    });
  }

  function toggleDeepDive(index) {
    const list = $('deepdiveList');
    let openItem = null;

    document.querySelectorAll('.deepdive-item').forEach((item, itemIndex) => {
      const isOpen = itemIndex === index ? !item.classList.contains('open') : false;
      item.classList.toggle('open', isOpen);
      item.querySelector('.deepdive-header').setAttribute('aria-expanded', String(isOpen));
      item.querySelector('.deepdive-panel').hidden = !isOpen;
      if (isOpen) openItem = item;
    });

    if (!list) return;
    if (!openItem) {
      list.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    requestAnimationFrame(() => {
      const offset = Math.max(openItem.offsetTop - list.offsetTop - 8, 0);
      list.scrollTo({ top: offset, behavior: 'smooth' });
    });
  }

  function buildDeepDives() {
    const list = $('deepdiveList');
    deepDives.forEach((section, index) => {
      const item = document.createElement('section');
      item.className = 'deepdive-item';

      const header = document.createElement('button');
      header.className = 'deepdive-header';
      header.type = 'button';
      header.setAttribute('aria-expanded', 'false');
      const copy = document.createElement('span');
      copy.className = 'deepdive-header-copy';
      const kicker = document.createElement('span');
      kicker.textContent = section.kicker;
      const title = document.createElement('strong');
      title.textContent = section.title;
      copy.append(kicker, title);
      const chevron = document.createElement('span');
      chevron.className = 'deepdive-chevron';
      chevron.textContent = '⌄';
      header.append(copy, chevron);
      header.addEventListener('click', () => toggleDeepDive(index));

      const panel = document.createElement('div');
      panel.className = 'deepdive-panel';
      panel.hidden = true;
      const panelInner = document.createElement('div');
      panelInner.className = 'deepdive-panel-inner';
      const body = document.createElement('div');
      body.className = 'deepdive-body';
      renderParagraphs(body, section.paragraphs);
      panelInner.appendChild(body);
      panel.appendChild(panelInner);
      item.append(header, panel);
      list.appendChild(item);
    });
  }

  const stationTitle = 'Die „Free-Banking-Era“ (1836–1862)';

  document.title = 'Station 11 · Die Free-Banking-Era';
  $('frame').setAttribute('aria-label', 'Station 11 – Die Free-Banking-Era');
  setText('startEyebrow', 'Als jeder sein eigenes Geld druckte');
  setTitle(stationTitle);
  setText('actionEyebrow', 'Vertiefungen');
  setText('actionTitle', stationTitle);
  const introElement = $('startIntro');
  renderParagraphs(introElement, intro);
  const image = $('startImage');
  image.src = '../station-04/img/eknigma02.png';
  image.alt = '';

  const screenStart = $('screenStart');
  const screenAction = $('screenAction');
  const btnTry = $('btnTry');
  const btnClose = $('btnClose');
  btnTry.addEventListener('click', () => { screenStart.classList.add('hidden'); screenAction.classList.remove('hidden'); });
  btnClose.addEventListener('click', () => { screenAction.classList.add('hidden'); screenStart.classList.remove('hidden'); });
  buildDeepDives();
});
