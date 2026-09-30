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
      image: { src: 'dither-output.png', alt: '' },
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

  const ENGLISH_CONTENT = {
    start: {
      title: 'Trust by Decree: The First Paper Money in the German-Speaking World',
      intro: [
        'What failed in Sweden succeeded a few decades later in Saxony.',
        'Saxony was the first German territory to issue paper money. Here, too, the reasons were practical: the state needed money, and metal for minting coins was scarce. Unlike Palmstruch in Stockholm, however, Saxony did not rely solely on the public’s voluntary acceptance of the new money. A decree required certain payments to be made in this new form.',
        'This created a cycle. People who could pay their taxes with paper money were also more willing to accept it as payment in trade. Trust grew through everyday use and the rules supporting it, rather than enthusiasm for the new form of money.'
      ]
    },
    deepening: {
      tag: 'Deep dive',
      title: 'A Framework as a Prerequisite',
      paragraphs: [
        'The success of paper money in Saxony was no coincidence. Behind it lay a principle still debated in monetary theory today: the tax theory of money, also known as chartalism, argues that money derives its value not from its material or any intrinsic property, but from the fact that a government accepts it as payment for taxes. This commitment to accept it creates the demand that gives money its value.',
        'The electoral decree established a framework within which the new money could function. The way this framework was imposed was authoritarian, but the underlying principle is universal: without binding rules, there is no trust; without trust, money cannot function.',
        'Today, three major economic regions are each taking their own approach to establishing frameworks for digital means of payment.',
        'In 2023, the European Union adopted the world’s first comprehensive legal framework for crypto assets through its Markets in Crypto-Assets Regulation (MiCA). MiCA distinguishes between different categories of digital tokens and requires their issuers, among other things, to provide evidence of reserves, meet disclosure obligations, and obtain authorization from supervisory authorities. Here, the framework is established through democratic lawmaking in the European Parliament and the Council of the European Union.',
        'In 2025, the United States passed the GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins), legislation specifically addressing stablecoins. Among other requirements, it stipulates that issuers must hold reserves of at least one US dollar for every stablecoin issued. At the same time, the US government has prohibited the development of a government-issued digital currency, opting instead to rely on private providers. Here, the framework is deliberately confined to the private sector.',
        'China is following the approach that most closely resembles the structure of Saxony’s 18th-century model. Since 2019, the government has been introducing the digital yuan and actively embedding it in everyday life through public-sector salary payments, integration into government services, and incentive programs. At the same time, the crypto market is entirely prohibited. As in Saxony centuries earlier, the government not only establishes the framework but also determines which means of payment are used—and which are not. Here, the framework is comprehensive and authoritarian.',
        'These three approaches could hardly be more different: democratic regulation in the EU, rules for the private market in the United States, and state-directed implementation in China. What they share is an insight already illustrated by the Saxon example: new forms of money do not gain acceptance on their own. They need a framework.'
      ]
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

  function renderStation(content, language) {
    document.title = content.meta.title;
    $('frame').setAttribute('aria-label', content.meta.ariaLabel);

    const start = language === 'en' ? ENGLISH_CONTENT.start : content.start;
    const deepening = language === 'en' ? ENGLISH_CONTENT.deepening : content.action.deepening;
    setTitle('startTitle', start.title);
    renderParagraphs('startIntro', start.intro);

    const startImage = $('startImage');
    startImage.src = content.start.image.src;
    startImage.alt = content.start.image.alt;

    const ctaLabel = document.querySelector('.cta-label');
    if (ctaLabel) ctaLabel.textContent = content.start.ctaLabel;
    const ovTag = $('ovTag');
    const ovTitle = $('ovTitle');
    if (ovTag) ovTag.textContent = deepening.tag;
    if (ovTitle) ovTitle.textContent = deepening.title;
    renderParagraphs('ovBody', deepening.paragraphs);
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

  let appliedLanguage = null;
  function applyLanguage() {
    const language = document.documentElement.dataset.language === 'en' ? 'en' : 'de';
    if (language === appliedLanguage) return;
    appliedLanguage = language;
    renderStation(STATION_CONTENT, language);
  }

  applyLanguage();
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'data-language')) applyLanguage();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
})();

