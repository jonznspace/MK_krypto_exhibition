'use strict';

// Every size token from the shared typography scale gets a rendered specimen.
// The sizes themselves have one source of truth: .tablet-master in the local CSS.
const TEXT_STYLES = [
  { key: 'display', name: 'Display', font: 'Panchang', sample: 'Krypto, was?', use: 'Startscreen / große Titel' },
  { key: 'h1', name: 'Headline 1', font: 'Panchang', sample: 'Die Enigma', use: 'Stationstitel' },
  { key: 'h2', name: 'Headline 2', font: 'Panchang', sample: 'Geheime Zeichen', use: 'Abschnitte / Dialogtitel' },
  { key: 'h3', name: 'Headline 3', font: 'Panchang', sample: 'Nachrichten lesen', use: 'Modultitel' },
  { key: 'h4', name: 'Headline 4', font: 'Panchang', sample: 'Der passende Schlüssel', use: 'Unterüberschriften' },
  { key: 'h5', name: 'Headline 5', font: 'Panchang', sample: 'Buchstabe für Buchstabe', use: 'Kleine Überschriften' },
  { key: 'body-l', name: 'Body L', font: 'Switzer', sample: 'Wie wird aus einer Nachricht ein Geheimnis? Ein Schlüssel verändert, was wir lesen können.', use: 'Einführung / kurze Lesetexte' },
  { key: 'body-m', name: 'Body M', font: 'Switzer', sample: 'Drehe die Scheibe und beobachte die Buchstaben. Jeder Schritt verändert die Zuordnung. Mit dem richtigen Schlüssel wird die Nachricht wieder lesbar.', use: 'Fließtext / Anleitungen' },
  { key: 'body-s', name: 'Body S', font: 'Switzer', sample: 'Wähle ein Beispielwort oder gib deine eigene Nachricht ein. Leerzeichen bleiben erhalten.', use: 'Hilfstexte / ergänzende Hinweise' },
  { key: 'label', name: 'Label', font: 'DM Mono', sample: 'Ausprobieren / Zurück / Weiter', use: 'Buttons / Tabs / Auswahl' },
  { key: 'caption-l', name: 'Caption L', font: 'DM Mono', sample: 'Schlüssel 03 / A → D / 01001011', use: 'Code / technische Werte' },
  { key: 'caption-m', name: 'Caption M', font: 'DM Mono', sample: 'Station 04 / Maschinen verschlüsseln', use: 'Eyebrows / Beschriftungen' },
  { key: 'caption-s', name: 'Caption S', font: 'DM Mono', sample: 'Objekt 04 · Sammlung Münzkabinett · Beispiel', use: 'Bildunterschriften / Metadaten' }
];

const root = document.body;
const $ = id => document.getElementById(id);
const defaults = new Map();

for (const style of TEXT_STYLES) {
  const size = parseFloat(getComputedStyle(root).getPropertyValue(`--tablet-${style.key}`));
  defaults.set(style.key, size);
  const row = document.createElement('article');
  row.className = 'type-row';
  row.innerHTML = `<div class="meta"><span class="type-name">${style.name}</span><span>${style.font}</span><br><span class="spec-metrics"></span><br><span>${style.use}</span></div><p class="type-sample type-${style.key}">${style.sample}</p><label class="size-control meta" for="size-${style.key}">Größe / px<input type="number" id="size-${style.key}" data-size="${style.key}" min="12" max="120" step="1" value="${size}" aria-label="${style.name}: Schriftgröße in Pixeln"></label>`;
  $('typeSpecimens').append(row);
}

function updateMetrics() {
  document.querySelectorAll('.type-row').forEach(row => {
    const computed = getComputedStyle(row.querySelector('.type-sample'));
    row.querySelector('.spec-metrics').textContent = `${parseFloat(computed.fontSize)} px / ${Math.round(parseFloat(computed.lineHeight) * 10) / 10} px · ${computed.fontWeight}`;
  });
}
updateMetrics();
document.fonts.ready.then(updateMetrics);

$('typeSpecimens').addEventListener('input', event => {
  const input = event.target.closest('[data-size]');
  if (!input || !input.validity.valid || input.value === '') return;
  root.style.setProperty(`--tablet-${input.dataset.size}`, `${input.valueAsNumber}px`);
  updateMetrics();
  $('typeStatus').textContent = 'Eigene Vorschau aktiv. Größen zurücksetzen stellt die Tablet-Ausgangswerte wieder her.';
});
$('typeSpecimens').addEventListener('change', event => {
  const input = event.target.closest('[data-size]');
  if (input && (!input.validity.valid || input.value === '')) {
    input.value = parseFloat(getComputedStyle(root).getPropertyValue(`--tablet-${input.dataset.size}`));
    $('typeStatus').textContent = 'Bitte eine Größe zwischen 12 und 120 Pixeln verwenden. Der letzte gültige Wert bleibt erhalten.';
  }
});
$('resetType').addEventListener('click', () => {
  for (const [key, value] of defaults) {
    root.style.removeProperty(`--tablet-${key}`);
    $(`size-${key}`).value = value;
  }
  updateMetrics();
  $('typeStatus').textContent = 'Alle 13 Textstile wurden auf die Tablet-Ausgangswerte zurückgesetzt.';
});

function showViewport() {
  $('viewportReadout').textContent = `${window.innerWidth} × ${window.innerHeight} CSS px / ${window.innerWidth >= window.innerHeight ? 'Querformat' : 'Hochformat'} / DPR ${window.devicePixelRatio}`;
}
showViewport();
window.addEventListener('resize', showViewport);

function updateCipher() {
  const value = $('message').value.replace(/[a-z]/g, letter => letter.toUpperCase());
  $('cipher').textContent = value.replace(/[A-Z]/g, letter => String.fromCharCode((letter.charCodeAt(0) - 65 + 3) % 26 + 65)) || '—';
  document.querySelectorAll('[data-word]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.word === value)));
}
$('message').addEventListener('input', updateCipher);
document.querySelectorAll('[data-word]').forEach(button => button.addEventListener('click', () => {
  $('message').value = button.dataset.word;
  updateCipher();
}));
$('clearMessage').addEventListener('click', () => {
  $('message').value = '';
  updateCipher();
  $('message').focus();
});

const tabs = [...document.querySelectorAll('[role=tab]')];
function selectTab(selected) {
  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    $(tab.getAttribute('aria-controls')).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    selectTab(target);
    target.focus();
  });
});

function checkAnswer() {
  const correct = $('answer').value.trim().toLocaleUpperCase('de-DE') === 'HALLO';
  $('answerFeedback').textContent = correct ? '✓ Richtig! Aus KDOOR wird HALLO.' : 'Noch nicht ganz. Gehe von jedem Buchstaben drei Stellen zurück. K wird zu H.';
  $('answerFeedback').dataset.state = correct ? 'success' : 'error';
  $('answer').setAttribute('aria-invalid', String(!correct));
}
$('checkAnswer').addEventListener('click', checkAnswer);
$('answer').addEventListener('keydown', event => { if (event.key === 'Enter') checkAnswer(); });
$('answer').addEventListener('input', () => {
  $('answer').removeAttribute('aria-invalid');
  $('answerFeedback').removeAttribute('data-state');
  $('answerFeedback').textContent = 'Bereit für deinen Versuch.';
});

document.querySelectorAll('[data-open-info]').forEach(button => button.addEventListener('click', () => $('infoDialog').showModal()));
$('closeInfo').addEventListener('click', () => $('infoDialog').close());
$('showFeedback').addEventListener('click', () => { $('buttonFeedback').textContent = '✓ Aktion ausgeführt. So sieht eine kurze Rückmeldung aus.'; });
$('showHints').addEventListener('change', event => { $('hintPreview').hidden = !event.target.checked; });
