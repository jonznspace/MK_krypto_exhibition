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
  const DEFAULT_NAMES = ['LEIBNIZ', 'ADA LOVELACE', 'ALAN TURING', 'KATHARINA'];
  const BLOCKED_TERMS = [
    // Deutsch
    'arsch', 'scheiss', 'scheiße', 'hurensohn', 'wichser', 'idiot',
    'nazi', 'kanake', 'zigeuner', 'schwuchtel',
    // Englisch
    'fuck', 'fucking', 'shit', 'bitch', 'bastard', 'cunt', 'dickhead',
    'faggot', 'retard',
    // Französisch
    'merde', 'putain', 'connard', 'salope',
    // Spanisch
    'puta', 'puto', 'mierda', 'coño', 'maricon',
    // Italienisch
    'cazzo', 'merda', 'puttana', 'stronzo',
    // Niederländisch
    'kanker', 'tering', 'hoer', 'klootzak'
  ];
  const CHALLENGES = ['CODE', 'IDEA', 'ZERO', 'BYTE', 'LOGIC'];
  let signalIndex = 0;
  let signalTimers = [];
  let signalLines = [];
  let challengeIndex = 0;
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
    const normalized = name.toLowerCase();
    return BLOCKED_TERMS.some(term => normalized.includes(term));
  }

  function encodeName(name) {
    return Array.from(name, character => {
      const width = character.codePointAt(0) > 255 ? 16 : 8;
      return character.codePointAt(0).toString(2).padStart(width, '0');
    }).join(' ');
  }

  function renderChallenge() {
    const answer = CHALLENGES[challengeIndex];
    $('challengeCode').textContent = encodeName(answer);
    $('challengeInput').value = '';
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
      return DEFAULT_NAMES;
    }
    return DEFAULT_NAMES;
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
    if (input === CHALLENGES[challengeIndex]) {
      feedback.textContent = 'Richtig entschlüsselt.';
      feedback.className = 'challenge-feedback is-correct';
    } else {
      feedback.textContent = 'Noch nicht. Versuch es weiter.';
      feedback.className = 'challenge-feedback is-wrong';
    }
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
    challengeIndex = (challengeIndex + 1) % CHALLENGES.length;
    renderChallenge();
  });
  $('challengeInput').addEventListener('keydown', event => {
    if (event.key === 'Enter') checkChallenge();
  });
  handleBinaryInput();
})();
