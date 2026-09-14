'use strict';
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 3  ·  Leibniz-Rechenmaschine',
      ariaLabel: 'Station 3 '
    },
    start: {
      eyebrow: 'Die Maschine rechnet',
      title: 'Die\u00a0Leibniz- Rechenmaschine',
      intro: [
        'Im 17. Jahrhundert arbeiteten Gelehrte in mehreren Ländern Europas an der Frage, ob sich Rechenvorgänge mechanisieren lassen. Einer von ihnen war der in Leipzig geborene Gottfried Wilhelm Leibniz (1646-1716). Seine mechanische Rechenmaschine zählt zu den bedeutendsten frühen Exemplaren ihrer Art, weil sie alle vier Grundrechenarten ausführen konnte. Ihr Herzstück war die sogenannte Staffelwalze: ein Mechanismus aus ineinandergreifenden Rädern, der Rechenoperationen mechanisch ausführte.',
        'Leibniz beschäftigte sich früh mit dem Binärsystem und schrieb es als einer der Ersten systematisch nieder. Diese Zahlendarstellung verwendet nur zwei Ziffern: 0 und 1. Im Unterschied zum Dezimalsystem mit zehn Ziffern lassen sich Informationen hier mit zwei Zuständen darstellen, etwa wie bei einem Schalter: an oder aus.',
        'Dieses Prinzip ist heute grundlegend für digitale Technik. Computer verarbeiten Informationen intern in binären Zuständen. Jedes Foto, jede Nachricht, jede Transaktion beruht auf Folgen von Nullen und Einsen.'
      ],
      image: {
        src: '../station-04/img/eknigma02.png',
        alt: ''
      },
      ctaLabel: 'Ausprobieren'
    },
    action: {
      eyebrow: 'Die Maschine rechnet',
      title: 'Dein Name in Binär',
      description: 'Gib deinen Namen ein und sieh, wie eine Maschine jedes Zeichen als Folge von Nullen und Einsen speichert.',
      closeLabel: 'Zur Startansicht',
      binary: {
        tag: 'Binärcode',
        title: 'Dein Name in Binär',
        label: 'Eingabe (maximal 12 Zeichen)',
        initialValue: 'LEIBNIZ',
        emptyMessage: 'Tippe einen Namen ein.',
        resultTemplate: bits => `Das sind ${bits} Schalter, jeder an oder aus. Mehr braucht eine Maschine nicht, um diesen Namen zu speichern.`
      },
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
    setText('binaryTag', content.action.binary.tag);
    setText('binaryTitle', content.action.binary.title);
    setText('binaryLabel', content.action.binary.label);
    $('binaryInput').value = content.action.binary.initialValue;
    setText('deepeningTag', content.action.deepening.tag);
    setText('deepeningTitle', content.action.deepening.title);
    renderParagraphs('deepeningBody', content.action.deepening.paragraphs);
  }

  function renderBinary() {
    const text = $('binaryInput').value.slice(0, 12);
    const grid = $('binaryGrid');
    grid.innerHTML = '';

    let bitCount = 0;
    Array.from(text).forEach(character => {
      const codePoint = character.codePointAt(0);
      const bitWidth = codePoint > 255 ? 16 : 8;
      const binary = codePoint.toString(2).padStart(bitWidth, '0');
      bitCount += bitWidth;

      const cell = document.createElement('div');
      cell.className = 'binary-cell';
      const characterNode = document.createElement('strong');
      characterNode.textContent = character;
      const bitsNode = document.createElement('span');
      bitsNode.textContent = binary;
      cell.append(characterNode, bitsNode);
      grid.appendChild(cell);
    });

    $('binaryInfo').textContent = text
      ? STATION_CONTENT.action.binary.resultTemplate(bitCount)
      : STATION_CONTENT.action.binary.emptyMessage;
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
  $('binaryInput').addEventListener('input', renderBinary);
  renderBinary();
})();
