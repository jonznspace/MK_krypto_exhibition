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
        src: 'dither-output.png',
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
      }
    }
  };

  const $ = id => document.getElementById(id);
  const HISTORY_KEY = 'mk-krypto-station-03-binary-names';
  const MAX_HISTORY = 8;
  const SIGNAL_BLOCK_SIZE = 4;
  const SIGNAL_REVEAL_DELAY = 1200;
  const SIGNAL_BLOCK_HOLD_DELAY = 2800;
  const SIGNAL_TRANSITION_DELAY = 900;
  const DEFAULT_NAMES = {
    de: ['LEIBNIZ', 'ADA LOVELACE', 'ALAN TURING', 'KATHARINA'],
    en: ['LEIBNIZ', 'ADA LOVELACE', 'ALAN TURING', 'GRACE HOPPER']
  };

  const CHALLENGES = {
    de: ['CODE', 'IDEE', 'NULL', 'BYTE', 'LOGIK'],
    en: ['CODE', 'IDEA', 'ZERO', 'BYTE', 'LOGIC']
  };
  const ACTION_COPY = {
    de: {
      eyebrow: 'Die Maschine rechnet',
      title: 'Dein Name in Binär',
      namesTab: 'Dein Name in Binär',
      decodeTab: 'Binär entschlüsseln',
      tag: 'Binärcode',
      binaryTitle: 'Dein Name in Binär',
      description: 'Gib deinen Namen ein und sieh, wie eine Maschine jedes Zeichen als Folge von Nullen und Einsen speichert.',
      binaryLabel: 'Eingabe (maximal 12 Zeichen)',
      decodeTag: 'Entschlüsseln',
      decodeTitle: 'Binär entschlüsseln',
      question: 'Was steht hier?',
      solutionLabel: 'Deine Lösung',
      check: 'Prüfen',
      next: 'Neue Folge',
      delete: 'Löschen',
      done: 'Fertig',
      correct: 'Richtig entschlüsselt.',
      wrong: 'Noch nicht. Versuch es weiter.'
    },
    en: {
      eyebrow: 'The machine calculates',
      title: 'Your name in binary',
      namesTab: 'Your name in binary',
      decodeTab: 'Decode binary',
      tag: 'Binary code',
      binaryTitle: 'Your name in binary',
      description: 'Enter your name and see how a machine stores each character as a sequence of zeros and ones.',
      binaryLabel: 'Input (maximum 12 characters)',
      decodeTag: 'Decode',
      decodeTitle: 'Decode binary',
      question: 'What does this say?',
      solutionLabel: 'Your answer',
      check: 'Check',
      next: 'New sequence',
      delete: 'Delete',
      done: 'Done',
      correct: 'Correctly decoded.',
      wrong: 'Not yet. Keep trying.'
    }
  };
  let signalIndex = 0;
  let signalTimers = [];
  let signalLines = [];
  let challengeIndex = 0;
  const screenStart = $('screenStart');
  const screenAction = $('screenAction');

  function currentLanguage() {
    return document.documentElement.dataset.language === 'en' ? 'en' : 'de';
  }

  function currentChallenges() {
    return CHALLENGES[currentLanguage()];
  }

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
  }

  function normalizeName(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\s-]/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 12)
      .toUpperCase();
  }

  function isBlocked(name) {
    return window.ProfanityFilter ? window.ProfanityFilter.test(name) : false;
  }

  function encodeName(name) {
    return Array.from(name, character => {
      const width = character.codePointAt(0) > 255 ? 16 : 8;
      return character.codePointAt(0).toString(2).padStart(width, '0');
    }).join(' ');
  }

  function renderChallenge() {
    const challenges = currentChallenges();
    challengeIndex %= challenges.length;
    const answer = challenges[challengeIndex];
    const input = $('challengeInput');
    $('challengeCode').textContent = encodeName(answer);
    input.value = '';
    $('challengeFeedback').textContent = '';
    $('challengeFeedback').className = 'challenge-feedback';
  }

  function renderCharacterMap() {
    const map = $('characterMap');
    map.innerHTML = '';
    Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').forEach(character => {
      const code = character.charCodeAt(0).toString(2).padStart(8, '0');
      const cell = document.createElement('div');
      cell.className = 'character-map__cell';
      cell.innerHTML = `<strong>${character}</strong><span>${code}</span>`;
      cell.style.cursor = 'pointer';
      cell.addEventListener('click', () => typeChallengeCharacter(character));
      map.appendChild(cell);
    });
  }

  function loadHistory() {
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      if (Array.isArray(stored)) {
        const valid = stored
          .map(normalizeName)
          .filter(name => name && !isBlocked(name));
        if (valid.length) return [...new Set(valid)].slice(0, MAX_HISTORY);
      }
    } catch (error) {
      return DEFAULT_NAMES[currentLanguage()];
    }
    return DEFAULT_NAMES[currentLanguage()];
  }

  function saveHistory(history) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      return;
    }
  }

  function createSignalLine(name, slot) {
    const signal = $('binaryHistory');
    const line = document.createElement('div');
    line.className = 'signal-line';
    line.setAttribute('aria-hidden', 'true');
    name.split(' ').filter(Boolean).forEach(word => {
      const wordLine = document.createElement('div');
      wordLine.className = 'signal-word';
      Array.from(encodeName(word)).forEach(character => {
        if (character === ' ') return;
        const bit = document.createElement('span');
        bit.className = 'signal-bit';
        bit.textContent = character;
        wordLine.appendChild(bit);
      });
      line.appendChild(wordLine);
    });
    signal.appendChild(line);
    signalLines.push(line);
  }

  function renderHistory() {
    const history = loadHistory();
    const signal = $('binaryHistory');
    signalTimers.forEach(timer => window.clearTimeout(timer));
    signalTimers = [];
    signal.innerHTML = '';
    signalLines = [];
    signalIndex = 0;

    function showNextBlock() {
      signal.innerHTML = '';
      signalLines = [];
      const block = Array.from({ length: SIGNAL_BLOCK_SIZE }, (_, offset) => history[(signalIndex + offset) % history.length]);

      block.forEach((name, slot) => {
        signalTimers.push(window.setTimeout(() => createSignalLine(name, slot), slot * SIGNAL_REVEAL_DELAY));
      });

      const blockDuration = (SIGNAL_BLOCK_SIZE - 1) * SIGNAL_REVEAL_DELAY + SIGNAL_BLOCK_HOLD_DELAY;
      signalTimers.push(window.setTimeout(() => {
        signalLines.forEach(line => line.classList.add('is-leaving'));
        signalTimers.push(window.setTimeout(() => {
          signalIndex = (signalIndex + SIGNAL_BLOCK_SIZE) % history.length;
          showNextBlock();
        }, SIGNAL_TRANSITION_DELAY));
      }, blockDuration));
    }

    showNextBlock();
  }

  function rememberName(name) {
    if (!name || isBlocked(name)) return;
    const history = [name, ...loadHistory().filter(item => item !== name)].slice(0, MAX_HISTORY);
    saveHistory(history);
    signalIndex = 0;
    renderHistory();
  }

  function checkChallenge() {
    const input = normalizeName($('challengeInput').value);
    const feedback = $('challengeFeedback');
    const copy = ACTION_COPY[currentLanguage()];
    if (input === currentChallenges()[challengeIndex]) {
      feedback.textContent = copy.correct;
      feedback.className = 'challenge-feedback is-correct';
    } else {
      feedback.textContent = copy.wrong;
      feedback.className = 'challenge-feedback is-wrong';
    }
  }

  function applyActionLanguage() {
    const language = currentLanguage();
    const copy = ACTION_COPY[language];
    setText('actionEyebrow', copy.eyebrow);
    setTitle('actionTitle', copy.title);
    setText('tabNames', copy.namesTab);
    setText('tabDecode', copy.decodeTab);
    setText('binaryTag', copy.tag);
    setText('binaryTitle', copy.binaryTitle);
    setText('actionDescription', copy.description);
    setText('binaryLabel', copy.binaryLabel);
    document.querySelector('#binaryDecodePanel .template-tag').textContent = copy.decodeTag;
    setText('challengeTitle', copy.decodeTitle);
    document.querySelector('.binary-challenge h3').textContent = copy.question;
    document.querySelector('label[for="challengeInput"]').textContent = copy.solutionLabel;
    setText('challengeCheck', copy.check);
    setText('challengeNext', copy.next);
    setText('btnChallengeBackspace', copy.delete);
    setText('btnChallengeDone', copy.done);
    renderChallenge();
  }

  function renderBinary(infoMessage = '') {
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

  }

  function handleBinaryInput() {
    const input = $('binaryInput');
    const normalized = normalizeName(input.value);
    input.value = normalized;
    if (isBlocked(normalized)) {
      input.value = '';
      renderBinary('Dieser Name kann nicht verwendet werden.');
      return;
    }
    renderBinary();
    rememberName(normalized);
  }

  function typeOnKeyboard(character) {
    const input = $('binaryInput');
    if (input.value.length >= Number(input.maxLength)) return;
    input.value += character;
    handleBinaryInput();
  }

  function buildKeyboard() {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    rows.forEach((letters, index) => {
      const row = $(['binaryKeyboardRowA', 'binaryKeyboardRowB', 'binaryKeyboardRowC'][index]);
      letters.forEach(letter => {
        const key = document.createElement('button');
        key.className = 'keyboard-key';
        key.type = 'button';
        key.textContent = letter;
        key.setAttribute('aria-label', `Buchstabe ${letter}`);
        key.addEventListener('mousedown', event => event.preventDefault());
        key.addEventListener('click', () => typeOnKeyboard(letter));
        row.appendChild(key);
      });
    });
  }

  function typeChallengeCharacter(character) {
    const input = $('challengeInput');
    input.focus();
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    const nextLength = input.value.length - (end - start) + character.length;
    if (nextLength > Number(input.maxLength)) return;
    input.setRangeText(character, start, end, 'end');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function handleChallengeInput() {
    const input = $('challengeInput');
    $('challengeKeyboard').classList.remove('hidden');
    const normalized = normalizeName(input.value);
    input.value = normalized;
    const feedback = $('challengeFeedback');
    feedback.textContent = '';
    feedback.className = 'challenge-feedback';
  }

  function buildChallengeKeyboard() {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const pressVirtualKey = letter => {
      typeChallengeCharacter(letter);
    };

    rows.forEach((letters, index) => {
      const row = $(['challengeKeyboardRowA', 'challengeKeyboardRowB', 'challengeKeyboardRowC'][index]);
      letters.forEach(letter => {
        const key = document.createElement('button');
        key.className = 'keyboard-key';
        key.type = 'button';
        key.textContent = letter;
        key.setAttribute('aria-label', `Buchstabe ${letter}`);
        key.addEventListener('pointerdown', event => {
          event.preventDefault();
          pressVirtualKey(letter);
        });
        key.addEventListener('click', () => pressVirtualKey(letter));
        row.appendChild(key);
      });
    });
  }

  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
  });

  $('btnClose').addEventListener('click', () => {
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });

  function setBinaryMode(mode) {
    const isNames = mode === 'names';
    $('binaryTestPanel').classList.toggle('hidden', !isNames);
    $('binaryDecodePanel').classList.toggle('hidden', isNames);
    $('tabNames').classList.toggle('active', isNames);
    $('tabDecode').classList.toggle('active', !isNames);
    $('tabNames').setAttribute('aria-selected', String(isNames));
    $('tabDecode').setAttribute('aria-selected', String(!isNames));
  }

  renderStation(STATION_CONTENT);
  renderHistory();
  renderChallenge();
  renderCharacterMap();
  buildKeyboard();
  buildChallengeKeyboard();
  $('binaryInput').addEventListener('input', handleBinaryInput);
  $('binaryInput').addEventListener('focus', () => $('binaryKeyboard').classList.remove('hidden'));
  $('binaryInput').addEventListener('blur', () => $('binaryKeyboard').classList.add('hidden'));
  document.querySelectorAll('#binaryKeyboard .keyboard-key').forEach(key => {
    key.addEventListener('mousedown', event => event.preventDefault());
  });
  $('btnBinarySpace').addEventListener('click', () => typeOnKeyboard(' '));
  $('btnBinaryBackspace').addEventListener('click', () => {
    const input = $('binaryInput');
    input.value = input.value.slice(0, -1);
    handleBinaryInput();
  });
  $('btnBinaryDone').addEventListener('click', () => {
    $('binaryKeyboard').classList.add('hidden');
    $('binaryInput').blur();
  });
  $('tabNames').addEventListener('click', () => setBinaryMode('names'));
  $('tabDecode').addEventListener('click', () => setBinaryMode('decode'));
  $('challengeCheck').addEventListener('click', checkChallenge);
  $('challengeNext').addEventListener('click', () => {
    challengeIndex = (challengeIndex + 1) % currentChallenges().length;
    renderChallenge();
  });
  $('challengeInput').addEventListener('keydown', event => {
    if (event.key === 'Enter') checkChallenge();
    if (event.key === 'Backspace') {
      event.preventDefault();
      const input = $('challengeInput');
      input.value = input.value.slice(0, -1);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    if (event.key === ' ' || /^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
      typeChallengeCharacter(event.key.toUpperCase());
    }
  });
  $('challengeInput').addEventListener('input', handleChallengeInput);
  $('challengeInput').addEventListener('focusin', () => $('challengeKeyboard').classList.remove('hidden'));
  $('challengeInput').addEventListener('click', () => $('challengeKeyboard').classList.remove('hidden'));
  $('challengeInput').addEventListener('blur', () => $('challengeKeyboard').classList.add('hidden'));
  $('btnChallengeBackspace').addEventListener('click', () => {
    const input = $('challengeInput');
    input.value = input.value.slice(0, -1);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  });
  $('btnChallengeDone').addEventListener('click', () => {
    $('challengeKeyboard').classList.add('hidden');
    $('challengeInput').blur();
  });
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'data-language')) {
      applyActionLanguage();
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
  applyActionLanguage();
  handleBinaryInput();
})();
