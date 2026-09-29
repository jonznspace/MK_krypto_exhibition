'use strict';
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 1 · Vorlage',
      ariaLabel: 'Station 1 – Vorlage'
    },
    start: {
      eyebrow: 'Geheime Botschaften in der Antike',
      title: 'Verschlüsseln & versiegeln',
      intro: [
        'Diese Station ist eine Blankovorlage auf Basis des gemeinsamen Grundschemas.',
        'Startscreen, Ausprobieren-Ansicht und Schließen sind bereits fertig verdrahtet.',
        'Hier kannst du jetzt die Inhalte und Interaktionen der nächsten Station einbauen.'
      ],
      image: {
        src: '../station-04/img/eknigma02.png',
        alt: ''
      },
      ctaLabel: 'Ausprobieren'
    },
    action: {
      eyebrow: 'Vorlage',
      title: 'Skytale ausprobieren',
      description: 'Wickle den Lederstreifen gedanklich um einen Stab. Beim Abwickeln wird aus derselben Nachricht eine neue Buchstabenfolge.',
      skytaleDefaultText: 'TREFFEN BEI MONDLICHT',
      skytaleDefaultCols: 5,
      closeLabel: 'Zur Startansicht',
      deepening: {
        tag: 'Vertiefung',
        title: 'Prinzip',
        paragraphs: [
          'Die Skytale verschlüsselt nicht durch neue Buchstaben, sondern durch eine neue Reihenfolge.',
          'Nur mit einem Stab gleichen Durchmessers lässt sich die Nachricht wieder richtig anordnen.'
        ]
      }
    }
  };

  const $ = id => document.getElementById(id);
  const screenStart = $('screenStart');
  const screenAction = $('screenAction');

  function setText(id, value) {
    $(id).textContent = value;
  }

  function setTitle(id, value) {
    const title = $(id);
    const characterCount = value.replace(/\s/g, '').length;
    title.classList.toggle('title--medium', id === 'startTitle' && characterCount >= 20 && characterCount < 39);
    title.classList.toggle('title--long', id === 'startTitle' && characterCount >= 39);
    const words = value.split(' ');
    title.innerHTML = '';

    words.forEach((word, index) => {
      const wordNode = document.createElement('span');
      wordNode.className = 'title-word';
      wordNode.textContent = word;
      title.appendChild(wordNode);
      if (index < words.length - 1) {
        title.appendChild(document.createTextNode(' '));
      }
    });
  }

  function renderParagraphs(id, paragraphs) {
    const container = $(id);
    container.innerHTML = '';
    paragraphs.forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      container.appendChild(paragraph);
    });
  }

  function renderStation(content) {
    document.title = content.meta.title;
    $('frame').setAttribute('aria-label', content.meta.ariaLabel);

    setText('startEyebrow', content.start.eyebrow);
    setTitle('startTitle', content.start.title);
    renderParagraphs('startIntro', content.start.intro);
    setText('tryLabel', content.start.ctaLabel);

    const startImage = $('startImage');
    startImage.src = content.start.image.src;
    startImage.alt = content.start.image.alt;

    setText('actionEyebrow', content.action.eyebrow);
    setTitle('actionTitle', content.action.title);
    setText('actionDescription', content.action.description);
    $('skyIn').value = content.action.skytaleDefaultText;
    $('skyCols').value = String(content.action.skytaleDefaultCols);
    $('btnClose').setAttribute('aria-label', content.action.closeLabel);
    setText('deepeningTag', content.action.deepening.tag);
    setText('deepeningTitle', content.action.deepening.title);
    renderParagraphs('deepeningBody', content.action.deepening.paragraphs);
  }

  function normUp(value) {
    return value
      .toUpperCase()
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE')
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS');
  }

  function skytaleRender() {
    const raw = normUp($('skyIn').value).replace(/[^A-Z]/g, '');
    const cols = Number($('skyCols').value);
    $('skyColsVal').textContent = String(cols);

    const rows = Math.max(1, Math.ceil(raw.length / cols));
    let padded = raw;
    while (padded.length < rows * cols) padded += '·';

    const grid = $('skyGrid');
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.innerHTML = '';

    for (let i = 0; i < padded.length; i++) {
      const cell = document.createElement('span');
      cell.textContent = padded.charAt(i);
      grid.appendChild(cell);
    }

    let out = '';
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        out += padded.charAt(r * cols + c);
      }
    }
    $('skyOut').textContent = out || '...';
  }

  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
  });

  $('btnClose').addEventListener('click', () => {
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });

  $('skyIn').addEventListener('input', skytaleRender);
  $('skyCols').addEventListener('input', skytaleRender);

  renderStation(STATION_CONTENT);
  skytaleRender();
})();
