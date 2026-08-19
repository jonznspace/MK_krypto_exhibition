'use strict';
/* =========================================================================
   Station 4 — Die Enigma
   Reusable media-station scaffold.
   Future stations should keep the UI shell and swap the STATION_CONTENT object
   before adding bespoke modules. Content lives here, structure stays in HTML/CSS.
   ========================================================================= */
(function () {
  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'],
    ['P', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'L']
  ];

  const STATION_CONTENT = {
    meta: {
      title: 'Station 4 · Die Enigma',
      ariaLabel: 'Station 4 – Die Enigma'
    },
    start: {
      eyebrow: 'Maschinen verschlüsseln',
      title: 'Die Enigma',
      intro: [
        'Mit dem kryptografischen Zirkel ließen sich einige Dutzend Verschlüsselungen erzeugen. Die Enigma erzeugte mehr Einstellungsmöglichkeiten, als es Sterne in unserer Galaxie gibt, bei der militärischen Standardausführung über 150 Trillionen. Sie verändert die Buchstabenzuordnung bei jedem einzelnen Tastendruck.',
        'Entwickelt wurde sie Anfang des 20. Jahrhunderts vom deutschen Ingenieur Arthur Scherbius, ursprünglich als kommerzielles Produkt. Später übernahm das Militär die Technik. Im Zweiten Weltkrieg war die Enigma Teil der Infrastruktur eines menschenverachtenden Krieges, der Abermillionen Opfer forderte. Kryptografie ist nie nur Technik, sie ist in politische und militärische Machtverhältnisse eingebunden.',
        'Schon in den 1930er Jahren analysierten polnische Mathematiker um Marian Rejewski ihre Funktionsweise. Auf dieser Grundlage bauten britische Kryptologen in Bletchley Park unter Alan Turing und Gordon Welchman elektromechanische Entschlüsselungsmaschinen. Die Entzifferung mit der Turing-Welchman-Bombe ab 1940 gilt als Meilenstein der Kryptografiegeschichte.'
      ],
      image: {
        src: 'img/eknigma02.png',
        alt: ''
      },
      ctaLabel: 'Enigma ausprobieren'
    },
    action: {
      eyebrow: 'Maschinen verschlüsseln',
      title: 'Die Enigma',
      rotorRowLabel: 'Walzen müssen korrekt eingesetzt und kalibriert werden',
      rotors: [
        { label: 'Walze I', value: '06' },
        { label: 'Walze II', value: '19' },
        { label: 'Walze III', value: '03' }
      ],
      rotorNote: 'Bei jedem Tastendruck dreht die rechte Walze weiter',
      output: {
        rowLabel: 'Anzeige des unverschlüsselten Ergebnisses',
        boxLabel: 'Ausgabe:',
        value: 'XLWS',
        activeLetter: 'H'
      },
      input: {
        rowLabel: 'Eingabe der verschlüsselten Buchstaben',
        boxLabel: 'Eingabe:',
        value: 'Auto',
        activeLetter: 'S'
      },
      resetLabel: 'Zurücksetzen',
      info: {
        tag: 'Vertiefung',
        text: 'Warum verschlüsselt und entschlüsselt dieselbe Maschine?'
      }
    }
  };

  const $ = id => document.getElementById(id);
  const screenStart = $('screenStart');
  const screenAction = $('screenAction');
  const frame = $('frame');

  function setText(id, value) {
    $(id).textContent = value;
  }

  function setTitle(id, value) {
    const [firstWord, ...remainingWords] = value.split(' ');
    const title = $(id);
    title.innerHTML = '';

    const firstWordNode = document.createElement('span');
    firstWordNode.className = 'title-word';
    firstWordNode.textContent = firstWord;
    title.appendChild(firstWordNode);
    title.appendChild(document.createTextNode(remainingWords.join(' ')));
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

  function renderRotors(rotors) {
    const container = $('rotorList');
    container.innerHTML = '';

    rotors.forEach(rotor => {
      const rotorNode = document.createElement('div');
      rotorNode.className = 'rotor';
      rotorNode.innerHTML =
        '<span class="rotor-lbl"></span>' +
        '<div class="rotor-box"></div>';

      rotorNode.querySelector('.rotor-lbl').textContent = rotor.label;
      rotorNode.querySelector('.rotor-box').textContent = rotor.value;
      container.appendChild(rotorNode);
    });
  }

  function renderKeyboard(id, variant, activeLetter) {
    const container = $(id);
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard ' + variant;

    KEYBOARD_ROWS.forEach((row, rowIndex) => {
      const rowNode = document.createElement('div');
      rowNode.className = rowIndex === 1 ? 'key-row key-row--offset' : 'key-row';

      row.forEach(letter => {
        const key = document.createElement('button');
        key.className = 'key';
        key.type = 'button';
        key.textContent = letter;

        if (letter === activeLetter) {
          key.classList.add(variant === 'keyboard--lamp' ? 'key--lit' : 'key--pressed');
        }

        rowNode.appendChild(key);
      });

      keyboard.appendChild(rowNode);
    });

    container.innerHTML = '';
    container.appendChild(keyboard);
  }

  function renderStation(content) {
    document.title = content.meta.title;
    frame.setAttribute('aria-label', content.meta.ariaLabel);

    setText('startEyebrow', content.start.eyebrow);
    setTitle('startTitle', content.start.title);
    renderParagraphs('startIntro', content.start.intro);
    setText('tryLabel', content.start.ctaLabel);

    const startImage = $('startImage');
    startImage.src = content.start.image.src;
    startImage.alt = content.start.image.alt;

    setText('actionEyebrow', content.action.eyebrow);
    setTitle('actionTitle', content.action.title);
    setText('rotorRowLabel', content.action.rotorRowLabel);
    setText('rotorNote', content.action.rotorNote);
    renderRotors(content.action.rotors);

    setText('outputRowLabel', content.action.output.rowLabel);
    setText('outputBoxLabel', content.action.output.boxLabel);
    setText('outputValue', content.action.output.value);
    renderKeyboard('lampKeyboard', 'keyboard--lamp', content.action.output.activeLetter);

    setText('inputRowLabel', content.action.input.rowLabel);
    setText('inputBoxLabel', content.action.input.boxLabel);
    setText('inputValue', content.action.input.value);
    renderKeyboard('inputKeyboard', 'keyboard--input', content.action.input.activeLetter);

    setText('resetButton', content.action.resetLabel);
    setText('infoTag', content.action.info.tag);
    setText('infoText', content.action.info.text);
  }

  renderStation(STATION_CONTENT);

  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
  });

  $('btnClose').addEventListener('click', () => {
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });

  function fit() {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    frame.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', fit);
  fit();
})();
