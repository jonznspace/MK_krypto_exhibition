'use strict';

(function () {
  const STORAGE_KEY = 'mk-station-language';
  const SWITCH_ID = 'stationLanguageSwitch';
  const ROOT = document.documentElement;
  const ATTRIBUTES = ['aria-label', 'title', 'placeholder'];
  const TEXT_TARGET_SELECTOR = [
    'button',
    'label',
    '.cta-label',
    '.field-label',
    '.template-tag',
    '.io-lbl',
    '.keyread-lbl',
    '.crack-status',
    '.skytale-stage__instruction',
    '.skytale-stage__state',
    '.station-marker__topic',
    '.ov-tag',
    '.attract',
    '#skyOut',
    '#toast'
  ].join(', ');

  const EXACT_TRANSLATIONS = {
    'Ausprobieren': 'Try it out',
    'ausprobieren': 'try it out',
    'Schließen': 'Close',
    'Zur Startansicht': 'Back to start',
    'Verschlüsseln': 'Encrypt',
    'Entschlüsseln': 'Decrypt',
    'Knacken': 'Crack',
    'Leeren': 'Clear',
    'Zeichen für Zeichen': 'Step by step',
    'Neue Botschaft': 'New message',
    'Weitere Verschlüsselungsverfahren': 'More cipher methods',
    'Zurücksetzen': 'Reset',
    'Freies Wickeln': 'Free wrap',
    'Leserichtung': 'Reading direction',
    'Streifen abwickeln': 'Unwrap strip',
    'Um den Stab wickeln': 'Wrap around rod',
    'Nächste Skytale': 'Next skytale',
    'Leerzeichen': 'Space',
    'Löschen': 'Delete',
    'Fertig': 'Done',
    'LEERTASTE': 'SPACEBAR',
    'Zum Ausprobieren': 'Try it out',
    'Gefundener Streifen': 'Recovered strip',
    'Lesbare Nachricht': 'Readable message',
    'Abgewickelter Geheimtext': 'Unwrapped ciphertext',
    'Schlüssel': 'Key',
    'Klartext': 'Plaintext',
    'Geheim': 'Ciphertext',
    'Abgefangen': 'Intercepted',
    'Entschlüsselt': 'Decrypted',
    'Schlüssel drehen …': 'Turn the key ...',
    'GEKNACKT': 'CRACKED',
    'Drehe die Scheibe': 'Turn the disc',
    'NOCH NICHT LESBAR': 'NOT READABLE YET',
    'Ziehen zum Drehen': 'Drag to rotate',
    'Gewickelt · lesbar längs des Stabs': 'Wrapped · readable along the rod',
    'Abgewickelt · Buchstabenfolge auf dem Streifen': 'Unwrapped · letter sequence on the strip',
    'Innere Scheibe eine Stellung nach links': 'Inner disc one step left',
    'Innere Scheibe eine Stellung nach rechts': 'Inner disc one step right',
    'Arbeitsmodus': 'Mode',
    'Modul A': 'Module A',
    'Modul B': 'Module B',
    'Modul C': 'Module C',
    'Interaktion': 'Interaction',
    'Vertiefung': 'Deep dive',
    'Botschaft geknackt': 'Message cracked'
  };

  const PATTERN_TRANSLATIONS = [
    {
      matches: value => /^GEKNACKT · Schlüssel A → /.test(value),
      translate: value => value.replace(/^GEKNACKT · Schlüssel A → /, 'CRACKED · Key A → ')
    },
    {
      matches: value => /^Buchstabe [A-Z]$/.test(value),
      translate: value => value.replace(/^Buchstabe /, 'Letter ')
    },
    {
      // "Station 2 – Verschlüsseln mit System", "Station 08 - Scheitern ohne Regeln"
      matches: value => {
        const match = value.match(/^(Station \d+ [–-] )(.+)$/);
        return Boolean(match && EXACT_TRANSLATIONS[match[2]]);
      },
      translate: value => value.replace(/^(Station \d+ [–-] )(.+)$/, (_all, prefix, rest) => prefix + EXACT_TRANSLATIONS[rest])
    },
    {
      matches: value => /^Stabdurchmesser \(Wicklungen\):\s*$/.test(value),
      translate: () => 'Rod diameter (turns): '
    }
  ];

  let observer = null;
  let applying = false;
  let scheduled = false;

  function readStoredLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'de';
    } catch (_error) {
      return 'de';
    }
  }

  function writeStoredLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (_error) {
      // Ignore storage failures in local previews.
    }
  }

  function getLanguage() {
    return ROOT.dataset.language === 'en' ? 'en' : readStoredLanguage();
  }

  function translateGerman(value) {
    if (EXACT_TRANSLATIONS[value]) return EXACT_TRANSLATIONS[value];

    for (const rule of PATTERN_TRANSLATIONS) {
      if (rule.matches(value)) return rule.translate(value);
    }

    return null;
  }

  function isGermanSource(value) {
    return Boolean(value && translateGerman(value));
  }

  function dataKeyFor(attribute) {
    return 'langBase' + attribute.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase()).replace(/^([a-z])/, (_match, letter) => letter.toUpperCase());
  }

  function translateWithWhitespace(value) {
    const match = value.match(/^(\s*)(.*?)(\s*)$/s);
    if (!match || !match[2]) return null;

    const translated = translateGerman(match[2]);
    if (!translated) return null;

    return match[1] + translated + match[3];
  }

  // Returns the German source for a text node or attribute, or null.
  // A value the translator did not write itself (station scripts update
  // results and labels at runtime) replaces the stored source, so a stale
  // German base never overwrites live content.
  function resolveBase(store, baseKey, appliedKey, current) {
    const base = store[baseKey];
    if (base !== undefined && (current === base || current === store[appliedKey])) return base;

    delete store[appliedKey];
    if (isGermanSource(current.trim())) {
      store[baseKey] = current;
      return current;
    }
    delete store[baseKey];
    return null;
  }

  function applyTextNodeTranslation(element, language) {
    Array.from(element.childNodes).forEach((node, index) => {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;

      const baseKey = 'langBaseTextNode' + index;
      const appliedKey = 'langAppliedTextNode' + index;
      const current = node.textContent;
      const base = resolveBase(element.dataset, baseKey, appliedKey, current);
      if (base === null) return;

      const target = language === 'en' ? translateWithWhitespace(base) : base;
      if (!target) return;
      element.dataset[appliedKey] = target;
      if (current !== target) node.textContent = target;
    });
  }

  function applyAttributeTranslation(element, attribute, language) {
    const current = element.getAttribute(attribute);
    if (!current) return;

    const baseKey = dataKeyFor(attribute);
    const appliedKey = baseKey.replace(/^langBase/, 'langApplied');
    const base = resolveBase(element.dataset, baseKey, appliedKey, current);
    if (base === null) return;

    const target = language === 'en' ? translateGerman(base) : base;
    if (!target) return;
    element.dataset[appliedKey] = target;
    if (current !== target) element.setAttribute(attribute, target);
  }

  function updateSwitchUi(language) {
    const switcher = document.getElementById(SWITCH_ID);
    if (!switcher) return;

    switcher.setAttribute('aria-label', language === 'en' ? 'Language switch' : 'Sprachauswahl');
    switcher.querySelectorAll('[data-language-option]').forEach(button => {
      const isActive = button.dataset.languageOption === language;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function applyTranslations() {
    if (!document.body) return;

    applying = true;
    const language = getLanguage();
    ROOT.dataset.language = language;
    ROOT.lang = language;
    updateSwitchUi(language);

    document.querySelectorAll(TEXT_TARGET_SELECTOR).forEach(element => {
      if (element.id === SWITCH_ID || element.closest('#' + SWITCH_ID)) return;

      applyTextNodeTranslation(element, language);

      ATTRIBUTES.forEach(attribute => applyAttributeTranslation(element, attribute, language));
    });

    document.querySelectorAll('body *').forEach(element => {
      if (element.id === SWITCH_ID || element.closest('#' + SWITCH_ID)) return;
      ATTRIBUTES.forEach(attribute => applyAttributeTranslation(element, attribute, language));
    });

    applying = false;
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      applyTranslations();
    });
  }

  function setLanguage(language) {
    ROOT.dataset.language = language === 'en' ? 'en' : 'de';
    writeStoredLanguage(ROOT.dataset.language);
    applyTranslations();
  }

  function mountSwitch() {
    const frame = document.getElementById('frame') || document.body;
    if (document.getElementById(SWITCH_ID)) return;

    const computedPosition = window.getComputedStyle(frame).position;
    if (computedPosition === 'static') {
      frame.style.position = 'relative';
    }

    const switcher = document.createElement('div');
    switcher.id = SWITCH_ID;
    switcher.className = 'station-language-switch';
    switcher.setAttribute('role', 'group');

    ['de', 'en'].forEach(language => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'station-language-switch__button';
      button.dataset.languageOption = language;
      button.textContent = language.toUpperCase();
      button.addEventListener('click', () => setLanguage(language));
      switcher.appendChild(button);
    });

    frame.appendChild(switcher);
    updateSwitchUi(getLanguage());
  }

  function startObserver() {
    if (observer || !document.body) return;

    observer = new MutationObserver(() => {
      if (!applying) scheduleApply();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTES
    });
  }

  function init() {
    mountSwitch();
    startObserver();
    setLanguage(readStoredLanguage());
    window.addEventListener('load', scheduleApply, { once: true });
  }

  window.StationLanguage = {
    getLanguage,
    setLanguage,
    applyTranslations,
    // Next page load starts in German (used before the idle reload).
    resetStoredLanguage: () => writeStoredLanguage('de')
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();