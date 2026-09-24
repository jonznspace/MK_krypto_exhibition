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

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const ROTORS = [
    { wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', notch: 'Q' },
    { wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', notch: 'E' },
    { wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', notch: 'V' }
  ];
  const REFLECTOR = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';
  const INITIAL_POSITIONS = [5, 18, 2];
  let rotorPositions = INITIAL_POSITIONS.slice();
  let inputText = '';
  let outputText = '';
  let appliedLanguage = null;

  const ACTION_COPY = {
    de: {
      eyebrow: 'Maschinen verschlüsseln',
      title: 'Die Enigma',
      close: 'Zur Startansicht',
      rotorRow: 'Walzen müssen korrekt eingesetzt und kalibriert werden',
      rotorLabels: ['Walze I', 'Walze II', 'Walze III'],
      rotorNote: 'Bei jedem Tastendruck dreht die rechte Walze weiter',
      outputRow: 'Anzeige des unverschlüsselten Ergebnisses',
      outputBox: 'Ausgabe:',
      inputRow: 'Eingabe der verschlüsselten Buchstaben',
      inputBox: 'Eingabe:',
      emptyInput: 'Auto',
      reset: 'Zurücksetzen',
      letter: 'Buchstabe'
    },
    en: {
      eyebrow: 'Machine encryption',
      title: 'The Enigma',
      close: 'Back to start',
      rotorRow: 'Rotors must be correctly installed and calibrated',
      rotorLabels: ['Rotor I', 'Rotor II', 'Rotor III'],
      rotorNote: 'The right-hand rotor advances with every keystroke',
      outputRow: 'Display of the unencrypted result',
      outputBox: 'Output:',
      inputRow: 'Input of encrypted letters',
      inputBox: 'Input:',
      emptyInput: 'Ready',
      reset: 'Reset',
      letter: 'Letter'
    }
  };

  const STATION_CONTENT = {
    meta: {
      title: 'Station 4 · Die Enigma',
      ariaLabel: 'Station 4 – Die Enigma'
    },
    start: {
      eyebrow: 'Maschinen verschlüsseln',
      title: 'Die Enigma',
      intro: [
        'Zu Beginn des 20. Jh. wurde mit der sogenannten Enigma, einer Rotor-Chiffriermaschine, ein enormer Entwicklungssprung in der Verschlüsselung von Nachrichten vollzogen.',
        'Die Enigma erzeugte nun mehr Einstellungsmöglichkeiten, als es Sterne in unserer Galaxie gibt. Bei der militärischen Standardausführung gibt es über 150 Trillionen. Sie wurde vom deutschen Ingenieur Arthur Scherbius ursprünglich als kommerzielles Produkt für Banken und Unternehmen entwickelt, die ihre Kommunikation schützen wollten. Später übernahm das Militär die Technik für seine Zwecke. Die Enigma arbeitete mit rotierenden Walzen, die bei jedem Tastendruck eine neue Zuordnung der Buchstaben erzeugten. Es ist, als würde sich das Schloss nach jedem Buchstaben komplett verändern.',
        'Im Zweiten Weltkrieg (1939–1945) wurde die Enigma für die militärische Kommunikation der deutschen Streitkräfte eingesetzt. Sie war Teil der technischen Infrastruktur eines menschenverachtenden Krieges, der Abermillionen Opfer forderte.', 
        'Schon in den 1930er Jahren gelang es polnischen Mathematikern, darunter Marian Rejewski, Jerzy Różycki und Henryk Zygalski, die Funktionsweise der Enigma mathematisch zu analysieren. Auf dieser Grundlage bauten britische Kryptologen in Bletchley Park dann elektromechanische Entschlüsselungsmaschinen. Allen voran entwickelte Alan Turing mit seinem Team die „Turing-Welchman-Bombe“, deren erste Exemplare 1940 in Betrieb gingen und die Technik der Enigma knackten.'
      ],
      image: {
        src: 'dither-output.png',
        alt: ''
      },
      ctaLabel: 'ausprobieren'
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
        activeLetter: ''
      },
      resetLabel: 'Zurücksetzen'
    }
  };

  const $ = id => document.getElementById(id);
  const screenStart = $('screenStart');
  const screenAction = $('screenAction');
  const frame = $('frame');

  function currentLanguage() {
    return document.documentElement.dataset.language === 'en' ? 'en' : 'de';
  }

  function currentCopy() {
    return ACTION_COPY[currentLanguage()];
  }

  function setText(id, value) {
    $(id).textContent = value;
  }

  function setTitle(id, value) {
    const title = $(id);
    const characterCount = value.replace(/\s/g, '').length;
    title.classList.toggle('title--medium', id === 'startTitle' && characterCount >= 20 && characterCount < 39);
    title.classList.toggle('title--long', id === 'startTitle' && characterCount >= 39);
    title.innerHTML = '';

    const words = value.split(' ');
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
      const rotorBox = rotorNode.querySelector('.rotor-box');
      rotorBox.textContent = rotor.value;
      rotorBox.dataset.value = rotor.value;
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

        if (variant === 'keyboard--input') {
          key.addEventListener('click', () => pressKey(letter));
        }

        rowNode.appendChild(key);
      });

      keyboard.appendChild(rowNode);
    });

    container.innerHTML = '';
    container.appendChild(keyboard);
  }

  function passThrough(letter, rotor, reverse) {
    const offset = rotorPositions[rotor];
    const shifted = (ALPHABET.indexOf(letter) + offset + 26) % 26;
    const mapped = reverse
      ? ROTORS[rotor].wiring.indexOf(ALPHABET[shifted])
      : ALPHABET.indexOf(ROTORS[rotor].wiring[shifted]);
    return ALPHABET[(mapped - offset + 26) % 26];
  }

  function stepRotors() {
    const moved = [false, false, false];
    const middleAtNotch = ALPHABET[rotorPositions[1]] === ROTORS[1].notch;
    const rightAtNotch = ALPHABET[rotorPositions[2]] === ROTORS[2].notch;

    if (middleAtNotch) {
      rotorPositions[0] = (rotorPositions[0] + 1) % 26;
      moved[0] = true;
    }
    if (middleAtNotch || rightAtNotch) {
      rotorPositions[1] = (rotorPositions[1] + 1) % 26;
      moved[1] = true;
    }
    rotorPositions[2] = (rotorPositions[2] + 1) % 26;
    moved[2] = true;

    return moved;
  }

  function encrypt(letter) {
    const moved = stepRotors();
    let signal = letter;
    signal = passThrough(signal, 2, false);
    signal = passThrough(signal, 1, false);
    signal = passThrough(signal, 0, false);
    signal = REFLECTOR[ALPHABET.indexOf(signal)];
    signal = passThrough(signal, 0, true);
    signal = passThrough(signal, 1, true);
    return { letter: passThrough(signal, 2, true), moved };
  }

  function animateRotorStep(rotorBox, nextValue) {
    const currentValue = rotorBox.dataset.value || rotorBox.textContent.trim() || nextValue;

    rotorBox.innerHTML =
      '<span class="rotor-roll">' +
        '<span class="rotor-digit rotor-digit--current"></span>' +
        '<span class="rotor-digit rotor-digit--next"></span>' +
      '</span>';

    rotorBox.querySelector('.rotor-digit--current').textContent = currentValue;
    rotorBox.querySelector('.rotor-digit--next').textContent = nextValue;

    rotorBox.classList.remove('spin');
    // Force reflow so the animation reliably restarts on rapid key presses.
    void rotorBox.offsetWidth;
    rotorBox.classList.add('spin');

    rotorBox.onanimationend = () => {
      rotorBox.classList.remove('spin');
      rotorBox.innerHTML = '';
      rotorBox.textContent = nextValue;
      rotorBox.dataset.value = nextValue;
      rotorBox.onanimationend = null;
    };
  }

  function updateMachine(activeLetter, moved = []) {
    const rotorBoxes = document.querySelectorAll('#rotorList .rotor-box');
    rotorBoxes.forEach((box, index) => {
      const nextValue = String(rotorPositions[index] + 1).padStart(2, '0');
      if (moved[index]) {
        animateRotorStep(box, nextValue);
      } else {
        box.textContent = nextValue;
        box.dataset.value = nextValue;
      }
    });

    document.querySelectorAll('#lampKeyboard .key').forEach(key => {
      key.classList.toggle('key--lit', key.textContent === activeLetter);
    });
    setText('inputValue', inputText || currentCopy().emptyInput);
    setText('outputValue', outputText || '');

    $('inputValue').scrollLeft = $('inputValue').scrollWidth;
    $('outputValue').scrollLeft = $('outputValue').scrollWidth;
  }

  function pressKey(letter) {
    if (letter === ' ') {
      inputText += ' ';
      outputText += ' ';
      updateMachine('');
      return;
    }

    const { letter: encrypted, moved } = encrypt(letter);
    inputText += letter;
    outputText += encrypted;
    updateMachine(encrypted, moved);
  }

  function resetMachine() {
    rotorPositions = INITIAL_POSITIONS.slice();
    inputText = '';
    outputText = '';
    updateMachine('');
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
  }

  function applyActionLanguage() {
    const language = currentLanguage();
    if (language === appliedLanguage) return;
    appliedLanguage = language;
    const copy = currentCopy();

    setText('actionEyebrow', copy.eyebrow);
    setTitle('actionTitle', copy.title);
    $('btnClose').setAttribute('aria-label', copy.close);
    setText('rotorRowLabel', copy.rotorRow);
    document.querySelectorAll('#rotorList .rotor-lbl').forEach((label, index) => {
      label.textContent = copy.rotorLabels[index];
    });
    setText('rotorNote', copy.rotorNote);
    setText('outputRowLabel', copy.outputRow);
    setText('outputBoxLabel', copy.outputBox);
    setText('inputRowLabel', copy.inputRow);
    setText('inputBoxLabel', copy.inputBox);
    setText('resetButton', copy.reset);
    document.querySelectorAll('.keyboard--input .key, .keyboard--lamp .key').forEach(key => {
      key.setAttribute('aria-label', `${copy.letter} ${key.textContent}`);
    });
    updateMachine('');
  }

  renderStation(STATION_CONTENT);

  $('resetButton').addEventListener('click', resetMachine);

  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
  });

  $('btnClose').addEventListener('click', () => {
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });

  resetMachine();
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'data-language')) applyActionLanguage();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
  applyActionLanguage();
})();
