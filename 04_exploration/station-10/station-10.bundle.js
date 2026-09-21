/* Bundled JS for Station 09 — concatenation of base + station templates */
/* --- base.js --- */
// Minimal base behaviors for station pages
document.addEventListener('DOMContentLoaded',()=>{
  // Simple content binding helpers for the template
  const bind = (id, value)=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='IMG') el.src=value; else el.textContent=value }
  // Default demo content (override in station-specific script)
  bind('startEyebrow',' ');
  bind('startTitle','Titel der Station 10');
  const intro=document.getElementById('startIntro'); if(intro) intro.innerHTML='<p>Ein einführender Text für Station 08. Ersetze diesen Inhalt mit station-spezifischem JS.</p>';
});

/* --- station-01.js (rendering + content) --- */
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 10 · Scheitern ohne Regeln',
      ariaLabel: 'Station 10 – Scheitern ohne Regeln'
    },
    start: {
      eyebrow: 'Scheitern ohne Regeln',
      title: 'Tablet 8 [Station 10] – Zu viel Papier, zu wenig Vertrauen: Palmstruch und die Stockholms Banco',
      intro: [
        'Schweden bezahlte im 17. Jahrhundert mit Kupferplatten. Sie wogen bis zu 20 Kilogramm, was das Problem unmittelbar verdeutlicht: Dieses Geld war schwer, unhandlich und im Alltag kaum zu gebrauchen.',
        'Johan Palmstruch, ein aus Riga stammender Kaufmann, erhielt 1656 vom schwedischen König die Genehmigung, eine Bank zu gründen. Palmstruchs Idee war progressiv: Statt die schweren Platten herumzutragen, sollten Papierscheine deren Wert verbürgen. Wer Kupfer bei der „Stockholms Banco“ einlagerte, bekam dafür einen Kreditzettel. Damit entstand das erste Papiergeld Europas.',
        'Anfangs funktionierte das System. Die Zettel waren viel leichter und handlicher als die Platten. Der Zahlungsverkehr konnte zudem schneller abgewickelt werden. Doch es fehlte als essenzieller Bestandteil eine Regulierung der Emissionen: Niemand kontrollierte, wie viele Scheine die Bank ausgab. Palmstruch ließ mehr Zettel drucken, als durch Einlagen gedeckt waren. Als sich das herumsprach, wollten alle gleichzeitig ihre Scheine gegen Kupfer eintauschen. Die Bank konnte diesen Forderungen nicht nachkommen. 1668 brach sie schließlich zusammen. Palmstruch wurde zunächst zum Tode verurteilt, später aber zu einer Gefängnisstrafe begnadigt.',
        'Aus diesem Scheitern zog Schweden eine Konsequenz: Die Leitung der Nachfolgeeinrichtung der Stockholms Banco, die Riksens Ständers Bank, die heutige Schwedische Nationalbank (Sveriges Riksbank), wurde nicht mehr einem privaten Unternehmer überlassen, sondern unter die Aufsicht des Parlaments gestellt. Sie gilt als älteste noch bestehende Zentralbank der Welt.'
      ],
      image: { src: '../station-04/img/eknigma02.png', alt: '' }
    },
    action: {
      eyebrow: 'Vorlage',
      title: 'Ausprobieren',
      description: 'Platzhalterbereich ohne Zirkel-Logik. Diesen Bereich kannst du als Basis für neue Stationen nutzen.',
      closeLabel: 'Zur Startansicht',
      deepening: { tag: 'Vertiefung', title: 'Bank Runs – damals und heute', paragraphs: ['Was 1668 in Stockholm geschah, hat einen Namen, der bis heute verwendet wird: Bank Run. So bezeichnet man den Ansturm auf eine Bank, wenn das Vertrauen schwindet und zu viele Menschen gleichzeitig ihr Geld abheben wollen. Das Muster wiederholt sich in der Geschichte des Geldes regelmäßig: Immer dann, wenn mehr Geld produziert wird, als gedeckt ist, und wenn dieses Missverhältnis sichtbar wird, bricht das Vertrauen seitens der Gesellschaft zusammen – oft innerhalb von Stunden.', 'Im Bereich digitaler Token ist dieselbe Dynamik zu beobachten. Im Mai 2022 verlor der sogenannte Stablecoin TerraUSD innerhalb weniger Tage seine Bindung an den US-Dollar. Das System brach zusammen, der zugehörige Token Luna wurde praktisch wertlos. Schätzungen zufolge gingen dabei Vermögenswerte in Höhe von rund 40 Milliarden US-Dollar verloren.', 'Anders als bei Banken gab es bei TerraUSD keine Einlagensicherung, keine Aufsichtsbehörde, die hätte eingreifen können, keinen Staat, der haftete. Es ist einer der Gründe, warum die Europäische Union mit der MiCA-Verordnung inzwischen versucht, regulatorische Rahmen zu schaffen. Dies ist vergleichbar mit der Konsequenz, die Schweden 1668 zog, als es die Bankaufsicht dem Parlament unterstellte.'] }
    }
  };

  const $ = id => document.getElementById(id);

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

    setText('startEyebrow', content.start.eyebrow);
    setTitle('startTitle', content.start.title);
    renderParagraphs('startIntro', content.start.intro);

    const startImage = $('startImage');
    startImage.src = content.start.image.src;
    startImage.alt = content.start.image.alt;

    // also populate overlay content
    const ovTag = document.getElementById('ovTag'); if(ovTag) ovTag.textContent = content.action.deepening.tag;
    const ovTitle = document.getElementById('ovTitle'); if(ovTitle) ovTitle.textContent = content.action.deepening.title;
    const ovBody = document.getElementById('ovBody'); if(ovBody) { ovBody.innerHTML = ''; content.action.deepening.paragraphs.forEach(p=>{ const el=document.createElement('p'); el.textContent=p; ovBody.appendChild(el); }); }
  }

  // Deepen button opens the overlay directly over the start screen
  const btnDeepen = document.getElementById('btnDeepen');
    const openDeepeningOverlay = ()=>{
      const overlay = document.getElementById('overlay'); if(!overlay) return; overlay.setAttribute('aria-hidden','false'); overlay.style.display='flex'; document.body.classList.add('overlay-open');
    };
    if(btnDeepen){ btnDeepen.addEventListener('click', openDeepeningOverlay); }
    const ovClose = document.getElementById('ovClose'); if(ovClose){ ovClose.addEventListener('click', ()=>{ const overlay=document.getElementById('overlay'); if(!overlay) return; overlay.setAttribute('aria-hidden','true'); overlay.style.display='none'; document.body.classList.remove('overlay-open'); }); }
    const overlay = document.getElementById('overlay');
    if(overlay){ overlay.addEventListener('click', event=>{ if(event.target === overlay && ovClose) ovClose.click(); }); }

  renderStation(STATION_CONTENT);
})();

/* --- station-08 + station-09 overrides --- */
document.addEventListener('DOMContentLoaded',()=>{
  const set = (id, value)=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='IMG') el.src=value; else el.textContent=value }
  set('startEyebrow','Zu viel Papier, zu wenig Vertrauen');
  set('startTitle','Palmstruch und die Stockholms Banco');
  const intro=document.getElementById('startIntro'); if(intro) intro.innerHTML='<p>Papiergeld war Menschen einmal genauso ungewohnt und suspekt, wie digitale Token es heute für viele sind. Als im 17. Jahrhundert die ersten Geldscheine in Europa auftauchten, war die Skepsis groß: Wie soll ein bedrucktes Stück Papier denselben Wert besitzen wie eine Münze aus Silber oder Kupfer?</p><p>Im 21. Jahrhundert kommt ein neues Abstraktionslevel hinzu: Digitale Werte (digitale Token, Stablecoins, Kryptowerte im Allgemeinen) behaupten, als Zahlungsmittel oder Wertträger zu funktionieren. Die Geschichte des Geldes demonstriert, dass es immer wieder zur Entwicklung neuer Zahlungsmittel kam. Vier Beispiele aus drei Jahrhunderten zeigen, unter welchen Bedingungen neue Geldformen entstehen, unter welchen sie gelingen oder scheitern.</p>';
  const img=document.getElementById('startImage'); if(img) img.src='../station-04/img/eknigma02.png';
});
