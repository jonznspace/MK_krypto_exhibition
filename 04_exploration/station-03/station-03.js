'use strict';
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 3  ·  Leibniz-Rechenmaschine',
      ariaLabel: 'Station 3 – Die Leibniz-Rechenmaschine'
    },
    start: {
      eyebrow: 'Die Maschine rechnet',
      title: 'Die Leibniz-Rechenmaschine',
      // Zeilenumbruch in der H1 des Startscreens nach diesem Wortteil (Text bleibt unverändert).
      titleBreakAfter: 'Leibniz-',
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
  // Früher gespeicherter Namensverlauf (localStorage); wird nicht mehr verwendet und einmal gelöscht.
  const LEGACY_HISTORY_KEY = 'mk-krypto-station-03-binary-names';
  // Bitstrom rechts: Ziffer für Ziffer, in Bytes gruppiert.
  const STREAM_DIGIT_DELAY = 45;     // ms pro Ziffer

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
      keysTitle: 'Buchstaben auswählen',
      solutionLabel: 'Deine Lösung',
      check: 'Prüfen',
      next: 'Neue Folge',
      delete: 'Löschen',
      done: 'Fertig',
      correct: 'Richtig entschlüsselt.',
      wrong: 'Noch nicht. Versuch es weiter.'
    },
    en: {
      startTitle: 'The Leibniz Calculating Machine',
      startIntro: [
        'In the 17th century, scholars in several European countries explored whether calculations could be mechanized. One of them was Gottfried Wilhelm Leibniz (1646–1716), who was born in Leipzig. His mechanical calculating machine ranks among the most significant early examples of its kind because it could perform all four basic arithmetic operations: addition, subtraction, multiplication, and division. At its heart was the so-called stepped drum, part of a mechanism of interlocking gears that performed calculations mechanically.',
        'Leibniz took an early interest in the binary number system and was among the first to describe it systematically in writing. This way of representing numbers uses only two digits: 0 and 1. Unlike the decimal system, which uses ten digits, the binary system allows information to be represented using just two states, like a switch that is either on or off.',
        'Today, this principle is fundamental to digital technology. Computers process information internally using binary states. Every photo, every message, and every transaction is represented by sequences of zeros and ones.'
      ],
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
      // EN-Fassung vom Kunden für dieses Label freigegeben (2026-10-01).
      keysTitle: 'Select letters',
      solutionLabel: 'Your answer',
      check: 'Check',
      next: 'New sequence',
      delete: 'Delete',
      done: 'Done',
      correct: 'Correctly decoded.',
      wrong: 'Not yet. Keep trying.'
    }
  };
  let challengeIndex = 0;
  let binaryMode = 'names';
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

  // breakAfter (optional): Wortteil, nach dem die Überschrift umbricht (<br>).
  function setTitle(id, value, breakAfter) {
    const title = $(id);
    const characterCount = value.replace(/\s/g, '').length;
    title.classList.toggle('title--medium', id === 'startTitle' && characterCount >= 20 && characterCount < 39);
    title.classList.toggle('title--long', id === 'startTitle' && characterCount >= 39);
    const words = value.split(' ');
    title.innerHTML = '';

    const appendWord = text => {
      const wordNode = document.createElement('span');
      wordNode.className = 'title-word';
      wordNode.textContent = text;
      title.appendChild(wordNode);
    };

    words.forEach((word, index) => {
      const breakIndex = breakAfter ? word.indexOf(breakAfter) : -1;
      const splitAt = breakIndex + (breakAfter || '').length;
      if (breakIndex >= 0 && splitAt < word.length) {
        appendWord(word.slice(0, splitAt));
        title.appendChild(document.createElement('br'));
        appendWord(word.slice(splitAt));
      } else {
        appendWord(word);
      }
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
    setTitle('startTitle', content.start.title, content.start.titleBreakAfter);
    // Start zeigt nur den ersten Absatz; der volle Text steht in der Leseansicht.
    renderParagraphs('startIntro', content.start.intro.slice(0, 1));
    setText('tryLabel', content.start.ctaLabel);

    const startImage = $('startImage');
    startImage.src = content.start.image.src;
    startImage.alt = content.start.image.alt;

    setTitle('actionTitle', content.action.title);
    setText('actionDescription', content.action.description);
    $('btnClose').setAttribute('aria-label', content.action.closeLabel);
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
    clearFeedback();
  }

  // Rückmeldung zur Lösung: steht 5 s, blendet dann langsam aus (CSS .is-fading) und verschwindet.
  const FEEDBACK_HOLD_DELAY = 5000;
  let feedbackTimer = null;

  function clearFeedback() {
    window.clearTimeout(feedbackTimer);
    feedbackTimer = null;
    const feedback = $('challengeFeedback');
    feedback.textContent = '';
    feedback.className = 'challenge-feedback';
  }

  function showFeedback(text, state) {
    clearFeedback();
    const feedback = $('challengeFeedback');
    // Sofort voll sichtbar, auch wenn die vorige Meldung gerade ausblendete.
    feedback.style.transition = 'none';
    feedback.textContent = text;
    feedback.className = `challenge-feedback ${state}`;
    void feedback.offsetWidth;
    feedback.style.transition = '';
    feedbackTimer = window.setTimeout(() => {
      feedback.classList.add('is-fading');
      const duration = parseFloat(getComputedStyle(feedback).transitionDuration) * 1000 || 0;
      feedbackTimer = window.setTimeout(clearFeedback, duration);
    }, FEEDBACK_HOLD_DELAY);
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

  try {
    localStorage.removeItem(LEGACY_HISTORY_KEY);
  } catch (error) {
    // Kein Speicherzugriff: nichts zu löschen.
  }

  /* Bitstrom rechts neben der Übersetzung: zeigt den eingegebenen Namen so, wie der Rechner
     ihn speichert, als durchgehende Folge von Bytes ohne Buchstaben. Jede Ziffer wird einzeln
     geschrieben; Bytes brechen nie in der Mitte um. Ohne Eingabe bleibt der Block leer. */
  const stream = (() => {
    const element = $('binaryHistory');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cursor = document.createElement('span');
    cursor.className = 'signal-cursor';
    let bytes = [];          // Ziel: Bytes als Strings ('01001100')
    let written = 0;         // geschriebene Ziffern
    let timer = null;

    const toBytes = text => Array.from(text, character => {
      const codePoint = character.codePointAt(0);
      return codePoint.toString(2).padStart(codePoint > 255 ? 16 : 8, '0');
    });
    const digitCount = list => list.reduce((sum, byte) => sum + byte.length, 0);

    // Baut den Block bis zur Ziffer `count` neu auf (nur bei Änderungen, nicht pro Ziffer).
    function draw(count) {
      element.replaceChildren();
      let left = count;
      for (const byte of bytes) {
        if (left <= 0) break;
        const group = document.createElement('span');
        group.className = 'signal-byte';
        group.textContent = byte.slice(0, left);
        element.appendChild(group);
        left -= byte.length;
      }
      element.appendChild(cursor);
    }

    // Eine Ziffer anhängen; ein neues Byte beginnt eine neue Gruppe.
    function appendDigit() {
      let left = written;
      let index = 0;
      while (left >= bytes[index].length) {
        left -= bytes[index].length;
        index += 1;
      }
      let group = cursor.previousElementSibling;
      if (left === 0 || !group) {
        group = document.createElement('span');
        group.className = 'signal-byte';
        element.insertBefore(group, cursor);
      }
      group.textContent += bytes[index][left];
      written += 1;
    }

    function stop() {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    }

    function tick() {
      timer = null;
      if (written >= digitCount(bytes)) return;
      appendDigit();
      timer = window.setTimeout(tick, STREAM_DIGIT_DELAY);
    }

    // Zeigt den Namen aus dem Eingabefeld. `restart`: von vorn schreiben (z. B. beim Öffnen).
    function show(text, restart = false) {
      // Leeres Eingabefeld: leerer Block, keine Schreibmarke, keine Animation.
      if (!text) {
        stop();
        bytes = [];
        written = 0;
        element.replaceChildren();
        return;
      }
      const next = toBytes(text);
      if (restart) {
        stop();
        written = 0;
      } else {
        // Der unveränderte Anfang bleibt stehen; ab der ersten Abweichung wird neu geschrieben.
        let index = 0;
        let prefix = 0;
        while (index < bytes.length && index < next.length && bytes[index] === next[index]) {
          prefix += bytes[index].length;
          index += 1;
        }
        written = Math.min(written, prefix);
      }
      bytes = next;
      if (reduced) written = digitCount(bytes);
      draw(written);
      if (timer === null) timer = window.setTimeout(tick, STREAM_DIGIT_DELAY);
    }

    return { show };
  })();

  function checkChallenge() {
    const input = normalizeName($('challengeInput').value);
    const copy = ACTION_COPY[currentLanguage()];
    if (input === currentChallenges()[challengeIndex]) {
      showFeedback(copy.correct, 'is-correct');
    } else {
      showFeedback(copy.wrong, 'is-wrong');
    }
  }

  function applyActionLanguage() {
    const language = currentLanguage();
    const copy = ACTION_COPY[language];
    setText('startEyebrow', language === 'en' ? copy.eyebrow : STATION_CONTENT.start.eyebrow);
    if (language === 'en') setTitle('startTitle', copy.startTitle);
    else setTitle('startTitle', STATION_CONTENT.start.title, STATION_CONTENT.start.titleBreakAfter);
    renderParagraphs('startIntro', (language === 'en' ? copy.startIntro : STATION_CONTENT.start.intro).slice(0, 1));
    updateActionTitle();
    setText('tabNames', copy.namesTab);
    setText('tabDecode', copy.decodeTab);
    setText('actionDescription', copy.description);
    setText('binaryLabel', copy.binaryLabel);
    document.querySelector('.binary-challenge h3').textContent = copy.question;
    setText('decodeKeysTitle', copy.keysTitle);
    document.querySelector('label[for="challengeInput"]').textContent = copy.solutionLabel;
    setText('challengeCheck', copy.check);
    setText('challengeNext', copy.next);
    setText('btnChallengeBackspace', copy.delete);
    setText('btnBinaryBackspace', copy.delete);
    setText('btnBinaryDone', copy.done);
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
      stream.show('');
      return;
    }
    renderBinary();
    stream.show(normalized);
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

  // Eingabe nur über die Buchstabenfelder: Zeichen hinten anhängen, ohne das Feld zu fokussieren
  // (sonst öffnet sich eine Tastatur).
  function typeChallengeCharacter(character) {
    const input = $('challengeInput');
    if (input.value.length >= Number(input.maxLength)) return;
    input.value += character;
    handleChallengeInput();
  }

  function handleChallengeInput() {
    const input = $('challengeInput');
    const normalized = normalizeName(input.value);
    input.value = normalized;
    clearFeedback();
  }

  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
    // Beim Öffnen schreibt sich der Name im Eingabefeld neu.
    stream.show(normalizeName($('binaryInput').value), true);
  });

  $('btnClose').addEventListener('click', () => {
    // Zurück zum Startzustand, damit der nächste Besuch nicht die vorige Eingabe sieht:
    // Startname, Tab „Dein Name in Binär“, erste Folge, leere Lösung ohne Rückmeldung.
    const input = $('binaryInput');
    input.value = STATION_CONTENT.action.binary.initialValue;
    input.blur();
    $('binaryKeyboard').classList.add('hidden');
    renderBinary();
    setBinaryMode('names');
    challengeIndex = 0;
    renderChallenge();
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });

  // Die Headline zeigt den Titel des aktiven Tabs.
  function updateActionTitle() {
    const copy = ACTION_COPY[currentLanguage()];
    setTitle('actionTitle', binaryMode === 'names' ? copy.namesTab : copy.decodeTab);
  }

  function setBinaryMode(mode) {
    binaryMode = mode;
    updateActionTitle();
    const isNames = mode === 'names';
    $('binaryTestPanel').classList.toggle('hidden', !isNames);
    $('binaryDecodePanel').classList.toggle('hidden', isNames);
    $('tabNames').classList.toggle('active', isNames);
    $('tabDecode').classList.toggle('active', !isNames);
    $('tabNames').setAttribute('aria-selected', String(isNames));
    $('tabDecode').setAttribute('aria-selected', String(!isNames));
  }

  renderStation(STATION_CONTENT);
  // Geteilte Leseansicht (shared/js/station-offcanvas.js): Absatz 1 als Lead,
  // alle weiteren Absätze unverändert darunter, ohne Zwischenüberschrift und ohne Infobox.
  const readingContent = (title, intro) => ({
    title,
    lead: intro[0],
    sections: [{ text: intro.slice(1) }]
  });
  StationOffcanvas.create({
    trigger: $('btnReadMore'),
    content: {
      de: readingContent(STATION_CONTENT.start.title, STATION_CONTENT.start.intro),
      en: readingContent(ACTION_COPY.en.startTitle, ACTION_COPY.en.startIntro)
    }
  });
  stream.show(normalizeName($('binaryInput').value), true);
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
    challengeIndex = (challengeIndex + 1) % currentChallenges().length;
    renderChallenge();
  });
  // Löschen entfernt das letzte Zeichen der Lösung.
  $('btnChallengeBackspace').addEventListener('click', () => {
    const input = $('challengeInput');
    input.value = input.value.slice(0, -1);
    handleChallengeInput();
  });
  // The shared language switch re-sets data-language after every DOM change,
  // so only re-render when the language actually changed (otherwise the input gets cleared).
  let appliedLanguage = currentLanguage();
  new MutationObserver(() => {
    const language = currentLanguage();
    if (language === appliedLanguage) return;
    appliedLanguage = language;
    applyActionLanguage();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
  applyActionLanguage();
  handleBinaryInput();
})();
