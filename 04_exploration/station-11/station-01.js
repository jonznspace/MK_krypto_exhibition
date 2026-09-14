'use strict';
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 1 · Vorlage',
      ariaLabel: 'Station 1 – Vorlage'
    },
    start: {
      eyebrow: 'Geheime Botschaften in der Antike',
      title: 'Verschlüsseln und versiegeln',
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
      title: 'Ausprobieren',
      description: 'Platzhalterbereich ohne Zirkel-Logik. Diesen Bereich kannst du als Basis für neue Stationen nutzen.',
      closeLabel: 'Zur Startansicht',
      deepening: {
        tag: 'Modul C',
        title: 'Vertiefung',
        paragraphs: ['Platzhalter für Zusatzwissen, Quellen oder Kontextkarten.']
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
    $('btnClose').setAttribute('aria-label', content.action.closeLabel);
    setText('deepeningTag', content.action.deepening.tag);
    setText('deepeningTitle', content.action.deepening.title);
    renderParagraphs('deepeningBody', content.action.deepening.paragraphs);
  }

  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
  });

  $('btnClose').addEventListener('click', () => {
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });

  renderStation(STATION_CONTENT);
})();
