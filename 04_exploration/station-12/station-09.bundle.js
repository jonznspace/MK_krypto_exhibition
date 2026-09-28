/* Bundled JS for Station 12 */
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
      title: 'Station 10 · Firmengeld',
      ariaLabel: 'Station 10 – Firmengeld'
    },
    start: {
      eyebrow: 'Firmengeld',
      title: 'Firmengeld: Die VOC und die Macht der Infrastruktur',
      intro: [
        'Die Vereinigte Ostindische Compagnie (VOC), gegründet 1602 in den Niederlanden, war mehr als ein Handelsunternehmen. Sie unterhielt eigene Armeen, verwaltete Territorien in Südostasien, schloss Verträge mit ausländischen Herrschern und sie gab eigenes Geld aus.',  
        'Dieses umfasst Münzen verschiedener Nominale, verschiedener Metalle, aus verschiedenen Jahrzehnten. Sie zeigen, dass die VOC nicht gelegentlich Geld prägte, sondern dass sie ein eigenes monetäres System betrieb. In ihren Handelsgebieten zirkulierten diese Münzen als gängiges Zahlungsmittel. Die VOC hatte damit etwas geschaffen, das über den reinen Handel hinausging und bisher eine staatliche Verantwortung darstellte: eine monetäre Infrastruktur. Im VOC-Netzwerk zu arbeiten, zu handeln oder zu leben, bedeutete somit, sich in einem privaten Ökosystem zu bewegen, das Vorteile bot, aber auch Abhängigkeiten schuf.',
        'Im 21. Jahrhundert ist eine strukturell ähnliche Dynamik festzustellen. Große Technologie- und Finanzkonzerne errichten eigene Zahlungsinfrastrukturen. PayPal, Apple Pay, Google Pay, Alipay etc. sind bequem und weit verbreitet. Neben den monetären Infrastrukturen, die bereits sehr weit verbreitet und tief in den Alltag vieler Menschen eingebettet sind, geben einige der Unternehmen nun private Stablecoins heraus. Bei ihnen handelt es sich um digitale Token, die an staatliches Geld gekoppelt sind. Ihre Deckung basiert allein auf den Versprechen der jeweiligen Unternehmen, dass entsprechende Rücklagen (zumeist Staatsanleihen und Bargeld) zur Einlösung in staatliches Geld zur Verfügung stehen.'
      ],
      image: { src: 'dither-output.png', alt: '' },
      ctaLabel: 'Vertiefung'
    },
    action: {
      deepening: {
        tag: 'Vertiefung',
        title: 'Company Money – von der VOC zu PayPal und Stablecoins',
        paragraphs: [
          'Das Prinzip des Firmengeldes reicht weit über die VOC hinaus. Im 19. Jahrhundert zahlten Unternehmen in manchen Regionen ihre Arbeiter in eigenen Marken oder Gutscheinen aus (sogenanntes Truck-System oder Scrip), die nur in firmeneigenen Läden eingelöst werden konnten. Diese offensichtliche Form der Abhängigkeit wurde schließlich gesetzlich verboten.',
          'Die Parallele zwischen der VOC und den heutigen Technologie- und Finanzkonzernen: Private Unternehmen schaffen monetäre Infrastrukturen, die so weit verbreitet und so tief in den Alltag eingebettet sind, dass sie faktisch unvermeidlich werden – ohne dass ihre Nutzer auf die Regeln dieser Infrastrukturen Einfluss hätten.'
        ]
      }
    }
  };

  const ENGLISH_CONTENT = {
    start: {
      title: 'Company Money: The VOC and the Power of Infrastructure',
      intro: [
        'The Dutch East India Company (VOC), founded in the Netherlands in 1602, was more than a trading company. It maintained its own armies, administered territories in Southeast Asia, concluded treaties with foreign rulers, and issued its own money.',
        'This money includes coins of various denominations and metals, dating from different decades. They show that the VOC did not merely mint coins occasionally but operated a monetary system of its own. These coins circulated as commonly accepted means of payment in the regions where it traded. The VOC had thus created something that went beyond trade and had previously been a responsibility of the state: a monetary infrastructure. Working, trading, or living within the VOC’s network therefore meant participating in a private ecosystem that offered benefits but also created dependencies.',
        'A structurally similar dynamic can be observed in the 21st century. Large technology and financial corporations are building their own payment infrastructures. Services such as PayPal, Apple Pay, Google Pay, and Alipay are convenient and widely used. In addition to these monetary infrastructures, already widespread and deeply embedded in many people’s daily lives, some companies are now issuing private stablecoins. These are digital tokens pegged to government-issued money. Their backing rests solely on the issuing companies’ promises that sufficient reserves, usually government bonds and cash, are available to redeem the tokens for government-issued money.'
      ]
    },
    deepening: {
      tag: 'A Closer Look',
      title: 'Company Money—from the VOC to PayPal and Stablecoins',
      paragraphs: [
        'The principle of company money extends far beyond the VOC. In the 19th century, companies in some regions paid their workers in company-issued tokens or vouchers that could be redeemed only at company stores. This practice is known as the truck system or payment in scrip. This overt form of dependence was eventually outlawed.',
        'The parallel between the VOC and today’s technology and financial corporations is this: private companies create monetary infrastructures that become so widespread and so deeply embedded in everyday life that they are effectively unavoidable, yet their users have no say in the rules governing them.'
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

