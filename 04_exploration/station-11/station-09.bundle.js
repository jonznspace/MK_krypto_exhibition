/* Bundled JS for Station 11 */
/* --- base.js --- */
// Minimal base behaviors for station pages
document.addEventListener('DOMContentLoaded',()=>{
  // Simple content binding helpers for the template
  const bind = (id, value)=>{ const el=document.getElementById(id); if(!el) return; if(el.tagName==='IMG') el.src=value; else el.textContent=value }
});

/* --- station-01.js (rendering + content) --- */
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 9 · Verordnetes Vertrauen',
      ariaLabel: 'Station 9 – Verordnetes Vertrauen'
    },
    start: {
      eyebrow: 'Verordnetes Vertrauen',
      title: 'Das erste Papiergeld im deutschsprachigen Raum',
      intro: [
        'Was in Schweden scheiterte, gelang wenige Jahrzehnte später in Sachsen.', 
        'Sachsen gab als erstes deutsches Territorium Papiergeld heraus. Auch hier war die Ausgangslage pragmatisch: Der Staat brauchte Geld, und Münzmetall war knapp. Doch anders als Palmstruch in Stockholm setzte Sachsen nicht allein auf freiwillige Akzeptanz des Geldes seitens der Bevölkerung. Per Verordnung wurde festgelegt, dass bestimmte Zahlungen in der neuen Geldform geleistet werden mussten.',
        'Damit entstand ein Kreislauf. Wer Steuern in Form von Papiergeld zahlen konnte, war auch eher bereit, es als Zahlungsmittel im Handel anzunehmen. Das Vertrauen wuchs nicht aus Begeisterung für die neue Geldform, sondern aus dem alltäglichen Gebrauch und den dahinterstehenden Regeln.'
      ],
      image: { src: '../station-04/img/eknigma02.png', alt: '' },
      ctaLabel: 'Vertiefung'
    },
    action: {
      deepening: {
        tag: 'Vertiefung',
        title: 'Rahmensetzung als Voraussetzung',
        paragraphs: [
          'Was in Sachsen funktionierte, war kein Zufall. Hinter dem Erfolg stand ein Prinzip, das bis heute in der Geldtheorie diskutiert wird: Die sogenannte Steuertheorie des Geldes (auch Chartalismus genannt) argumentiert, dass Geld seinen Wert nicht aus dem Material oder einer inneren Eigenschaft bezieht, sondern aus der Tatsache, dass ein Staat es als Zahlungsmittel für Steuern akzeptiert. Dieses Akzeptanzversprechen schafft die Nachfrage, die dem Geld seinen Wert gibt.',
          'Der kurfürstliche Erlass schuf einen Rahmen, innerhalb dessen das neue Geld funktionieren konnte. Die Form der Rahmensetzung war autoritär, das Prinzip dahinter ist universell: Ohne verbindliche Regeln kein Vertrauen, ohne Vertrauen kein funktionierendes Geld.',
          'In der Gegenwart versuchen drei große Wirtschaftsräume, auf je eigene Weise Rahmenbedingungen für digitale Zahlungsmittel zu schaffen.',
          'Die Europäische Union hat 2023 mit der MiCA-Verordnung (Markets in Crypto-Assets) den weltweit ersten umfassenden Rechtsrahmen für Kryptowerte verabschiedet. MiCA unterscheidet zwischen verschiedenen Kategorien digitaler Token und verlangt von deren Herausgebern unter anderem Reservenachweise, Offenlegungspflichten und eine Zulassung durch Aufsichtsbehörden. Die Rahmensetzung geschieht hier durch demokratische Gesetzgebung im Europäischen Parlament und Rat.',
          'Die USA haben 2025 mit dem GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins) ein Gesetz speziell für Stablecoins verabschiedet. Es verlangt unter anderem, dass Herausgeber für jeden ausgegebenen Stablecoin Reserven in Höhe von mindestens einem US-Dollar halten. Zugleich hat die US-Regierung die Entwicklung einer staatlichen Digitalwährung untersagt und setzt stattdessen auf private Anbieter. Die Rahmensetzung beschränkt sich hier bewusst auf den privaten Sektor.',
          'China geht den Weg, der dem sächsischen Modell des 18. Jahrhunderts strukturell am nächsten kommt. Der digitale Yuan wird seit 2019 vom Staat eingeführt und aktiv in den Alltag eingebettet – über Gehaltszahlungen im öffentlichen Dienst, Integration in staatliche Dienstleistungen und Anreizsysteme. Zugleich ist der Kryptomarkt vollständig verboten. Wie damals in Sachsen schafft der Staat nicht nur den Rahmen, sondern bestimmt auch, welches Zahlungsmittel verwendet wird – und welches nicht. Die Rahmensetzung ist hier umfassend und autoritär.',
          'Drei Ansätze, die unterschiedlicher kaum sein könnten: Demokratisch regulieren (EU), den privaten Markt ordnen (USA), staatlich durchsetzen (China). Was sie verbindet, ist die Einsicht, die schon das sächsische Beispiel zeigt: Neue Geldformen setzen sich nicht von allein durch. Sie brauchen einen Rahmen.'
        ]
      }
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

    const ctaLabel = document.querySelector('.cta-label');
    if (ctaLabel) ctaLabel.textContent = content.start.ctaLabel;
    const ovTag = $('ovTag');
    const ovTitle = $('ovTitle');
    if (ovTag) ovTag.textContent = content.action.deepening.tag;
    if (ovTitle) ovTitle.textContent = content.action.deepening.title;
    renderParagraphs('ovBody', content.action.deepening.paragraphs);
  }

  const openOverlay = () => {
    const overlay = $('overlay');
    if (!overlay) return;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.style.display = 'flex';
    document.body.classList.add('overlay-open');
  };
  const closeOverlay = () => {
    const overlay = $('overlay');
    if (!overlay) return;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.display = 'none';
    document.body.classList.remove('overlay-open');
  };
  const btnDeepen = $('btnDeepen');
  if (btnDeepen) btnDeepen.addEventListener('click', openOverlay);
  const ovClose = $('ovClose');
  if (ovClose) ovClose.addEventListener('click', closeOverlay);
  const overlay = $('overlay');
  if (overlay) overlay.addEventListener('click', event => { if (event.target === overlay) closeOverlay(); });

  renderStation(STATION_CONTENT);
})();

