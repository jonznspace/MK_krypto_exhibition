/* Bundled JS for Station 09 — concatenation of base + station templates */
/* --- base.js --- */
// Minimal base behaviors for station pages
document.addEventListener('DOMContentLoaded',()=>{
  // Simple content binding helpers for the template
  const bind = (id, value)=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='IMG') el.src=value; else el.textContent=value }
  // Default demo content (override in station-specific script)
  bind('startTitle','Titel der Station 08');
  const intro=document.getElementById('startIntro'); if(intro) intro.innerHTML='<p>Ein einführender Text für Station 08. Ersetze diesen Inhalt mit station-spezifischem JS.</p>';
  // basic UI: toggle screens (no CTA button for this station)
  const screenStart=document.getElementById('screenStart'); const screenAction=document.getElementById('screenAction'); const btnClose=document.getElementById('btnClose');
  if(btnClose && screenStart && screenAction){btnClose.addEventListener('click',()=>{screenAction.classList.add('hidden');screenStart.classList.remove('hidden')})}

  const moduleTabs = [
    ['tabModuleA', 'moduleA'],
    ['tabModuleB', 'moduleB'],
    ['tabModuleC', 'moduleC']
  ];
  moduleTabs.forEach(([tabId, panelId])=>{
    const tab = document.getElementById(tabId);
    if(!tab) return;
    tab.addEventListener('click',()=>{
      moduleTabs.forEach(([otherTabId, otherPanelId])=>{
        const otherTab = document.getElementById(otherTabId);
        const otherPanel = document.getElementById(otherPanelId);
        const active = otherTabId === tabId;
        otherTab.classList.toggle('active', active);
        otherTab.setAttribute('aria-selected', String(active));
        otherPanel.classList.toggle('hidden', !active);
      });
    });
  });
});

/* --- station-01.js (rendering + content) --- */
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 7 · neue Entwicklungen',
      ariaLabel: 'Station 7 – neue Entwicklungen'
    },
    start: {
      eyebrow: 'Geheime Botschaften in der Antike',
      title: 'Verschlüsseln und versiegeln',
      intro: [
        'Diese Station ist eine Blankovorlage auf Basis des gemeinsamen Grundschemas.',
        'Startscreen, Ausprobieren-Ansicht und Schließen sind bereits fertig verdrahtet.',
        'Hier kannst du jetzt die Inhalte und Interaktionen der nächsten Station einbauen.'
      ],
      ctaLabel: 'Ausprobieren'
    },
    action: {
      eyebrow: 'Vorlage',
      title: 'Ausprobieren',
      description: 'Platzhalterbereich ohne Zirkel-Logik. Diesen Bereich kannst du als Basis für neue Stationen nutzen.',
      closeLabel: 'Zur Startansicht',
      deepening: { tag: 'Modul C', title: 'Vertiefung', paragraphs: ['Platzhalter für Zusatzwissen, Quellen oder Kontextkarten.'] }
    }
  };

  const $ = id => document.getElementById(id);
  const screenStart = $('screenStart');
  const screenAction = $('screenAction');

  function setText(id, value) { $(id).textContent = value; }

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

    setTitle('startTitle', content.start.title);
    renderParagraphs('startIntro', content.start.intro);

    setTitle('actionTitle', content.action.title);
    setText('actionDescription', content.action.description);
    $('btnClose').setAttribute('aria-label', content.action.closeLabel);
    setText('deepeningTag', content.action.deepening.tag);
    setText('deepeningTitle', content.action.deepening.title);
    renderParagraphs('deepeningBody', content.action.deepening.paragraphs);
  }

  $('btnClose').addEventListener('click', () => { screenAction.classList.add('hidden'); screenStart.classList.remove('hidden'); });

  renderStation(STATION_CONTENT);
})();

/* --- station-08 + station-09 overrides --- */
document.addEventListener('DOMContentLoaded',()=>{
  const set = (id, value)=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='IMG') el.src=value; else el.textContent=value }
  const START_TEXT = {
    de: {
      title: 'Neue Entwicklungen, bekannte Herausforderungen',
      intro: '<p>Papiergeld war in der Vergangenheit für Menschen einmal genauso ungewohnt und suspekt, wie es digitale Token heutzutage sind. Als im 17. Jahrhundert die ersten Geldscheine in Europa auftauchten (Einführung während der Song Dynastie in China bereits im 11. Jh.), war die Skepsis groß: Wie soll ein bedrucktes Stück Papier denselben Wert besitzen wie eine Münze aus Silber oder Kupfer?</p><p>Im 21. Jahrhundert kommt ein neues Abstraktionslevel hinzu: Digitale Werte (digitale Token, Stablecoins, Kryptowerte im Allgemeinen) werden mit dem Anspruch angeboten, als Zahlungsmittel oder Wertträger zu dienen.</p><p>Die Geschichte des Geldes demonstriert, dass es immer wieder zur Entwicklung neuer Zahlungsmittel kam. Vier Beispiele aus drei Jahrhunderten zeigen, unter welchen Bedingungen neue Geldformen entstehen, unter welchen sie gelingen oder scheitern.</p>'
    },
    en: {
      title: 'New Developments, Familiar Challenges',
      intro: '<p>In the past, paper money was just as unfamiliar and suspicious to people as digital tokens are today. When the first banknotes appeared in Europe in the 17th century (introduced in Song dynasty China during the 11th century), scepticism ran high: How could a printed piece of paper have the same value as a silver or copper coin?</p><p>In the 21st century, a new level of abstraction has emerged: Digital assets (such as digital tokens, stablecoins, and crypto assets in general) are offered with the claim that they serve as a means of payment or a store of value.</p><p>The history of money demonstrates that new forms of payment have emerged time and time again. Four examples spanning three centuries illustrate the conditions under which new forms of money emerge, and under which they succeed or fail.</p>'
    }
  };
  const renderStart = ()=>{
    const text = START_TEXT[document.documentElement.dataset.language === 'en' ? 'en' : 'de'];
    set('startTitle', text.title);
    const intro=document.getElementById('startIntro'); if(intro) intro.innerHTML=text.intro;
  };
  renderStart();
  new MutationObserver(renderStart).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
});
