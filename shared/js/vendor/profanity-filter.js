'use strict';

/**
 * Lightweight, dependency-free multi-language profanity filter for kiosk
 * text inputs (e.g. names typed into public displays). Normalizes leetspeak
 * substitutions and repeated characters before matching against curated
 * word lists so simple obfuscation attempts are still caught.
 */
(function (global) {
  const WORD_LISTS = {
    de: [
      'arsch', 'arschloch', 'scheiss', 'scheisse', 'hurensohn', 'wichser',
      'fotze', 'nazi', 'kanake', 'zigeuner', 'schwuchtel', 'neger', 'hitler'
    ],
    en: [
      'fuck', 'fucking', 'shit', 'bitch', 'bastard', 'cunt', 'dickhead',
      'faggot', 'retard', 'nigger', 'whore', 'asshole', 'hitler', 'nazi'
    ],
    fr: [
      'merde', 'putain', 'connard', 'salope', 'encule', 'pute'
    ],
    es: [
      'puta', 'puto', 'mierda', 'cono', 'maricon', 'gilipollas', 'cabron'
    ],
    it: [
      'cazzo', 'merda', 'puttana', 'stronzo', 'vaffanculo', 'coglione'
    ],
    nl: [
      'kanker', 'tering', 'hoer', 'klootzak', 'kutwijf'
    ],
    pt: [
      'merda', 'puta', 'caralho', 'foda-se', 'cabrao'
    ],
    tr: [
      'siktir', 'orospu', 'yarrak', 'piç', 'amcik'
    ]
  };

  const ALL_TERMS = Object.values(WORD_LISTS).flat();

  const LEET_MAP = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's' };

  function normalize(value) {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[0134578@$]/g, character => LEET_MAP[character] || character)
      .replace(/(.)\1{2,}/g, '$1$1');
  }

  function test(value) {
    if (!value) return false;
    const normalized = normalize(value);
    return ALL_TERMS.some(term => normalized.includes(term));
  }

  function clean(value, replacement) {
    if (!value) return value;
    return test(value) ? (replacement !== undefined ? replacement : '') : value;
  }

  global.ProfanityFilter = { test, clean, normalize, WORD_LISTS };
})(window);
