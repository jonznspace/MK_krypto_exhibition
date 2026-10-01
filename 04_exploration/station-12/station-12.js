'use strict';
(function () {
  const CONTENT = {
    de: {
      // \n = fester Umbruch im Start-Titel (<br>); in der Leseansicht wird daraus ein Leerzeichen.
      title: 'Firmengeld:\nDie VOC und die Macht\nder Infrastruktur',
      intro: [
        'Die Vereinigte Ostindische Compagnie (VOC), gegründet 1602 in den Niederlanden, war mehr als ein Handelsunternehmen. Sie unterhielt eigene Armeen, verwaltete Territorien in Südostasien, schloss Verträge mit ausländischen Herrschern und sie gab eigenes Geld aus.',
        'Dieses umfasst Münzen verschiedener Nominale, verschiedener Metalle, aus verschiedenen Jahrzehnten. Sie zeigen, dass die VOC nicht gelegentlich Geld prägte, sondern dass sie ein eigenes monetäres System betrieb. In ihren Handelsgebieten zirkulierten diese Münzen als gängiges Zahlungsmittel. Die VOC hatte damit etwas geschaffen, das über den reinen Handel hinausging und bisher eine staatliche Verantwortung darstellte: eine monetäre Infrastruktur. Im VOC-Netzwerk zu arbeiten, zu handeln oder zu leben, bedeutete somit, sich in einem privaten Ökosystem zu bewegen, das Vorteile bot, aber auch Abhängigkeiten schuf.',
        'Im 21. Jahrhundert ist eine strukturell ähnliche Dynamik festzustellen. Große Technologie- und Finanzkonzerne errichten eigene Zahlungsinfrastrukturen. PayPal, Apple Pay, Google Pay, Alipay etc. sind bequem und weit verbreitet. Neben den monetären Infrastrukturen, die bereits sehr weit verbreitet und tief in den Alltag vieler Menschen eingebettet sind, geben einige der Unternehmen nun private Stablecoins heraus. Bei ihnen handelt es sich um digitale Token, die an staatliches Geld gekoppelt sind. Ihre Deckung basiert allein auf den Versprechen der jeweiligen Unternehmen, dass entsprechende Rücklagen (zumeist Staatsanleihen und Bargeld) zur Einlösung in staatliches Geld zur Verfügung stehen.'
      ],
      deepening: {
        tag: 'Vertiefung',
        title: 'Company Money – von der VOC zu PayPal und Stablecoins',
        paragraphs: [
          'Das Prinzip des Firmengeldes reicht weit über die VOC hinaus. Im 19. Jahrhundert zahlten Unternehmen in manchen Regionen ihre Arbeiter in eigenen Marken oder Gutscheinen aus (sogenanntes Truck-System oder Scrip), die nur in firmeneigenen Läden eingelöst werden konnten. Diese offensichtliche Form der Abhängigkeit wurde schließlich gesetzlich verboten.',
          'Die Parallele zwischen der VOC und den heutigen Technologie- und Finanzkonzernen: Private Unternehmen schaffen monetäre Infrastrukturen, die so weit verbreitet und so tief in den Alltag eingebettet sind, dass sie faktisch unvermeidlich werden – ohne dass ihre Nutzer auf die Regeln dieser Infrastrukturen Einfluss hätten.'
        ]
      }
    },
    en: {
      title: 'Company Money: The VOC and the Power of Infrastructure',
      intro: [
        'The Dutch East India Company (VOC), founded in the Netherlands in 1602, was more than a trading company. It maintained its own armies, administered territories in Southeast Asia, concluded treaties with foreign rulers, and issued its own money.',
        'This money includes coins of various denominations and metals, dating from different decades. They show that the VOC did not merely mint coins occasionally but operated a monetary system of its own. These coins circulated as commonly accepted means of payment in the regions where it traded. The VOC had thus created something that went beyond trade and had previously been a responsibility of the state: a monetary infrastructure. Working, trading, or living within the VOC’s network therefore meant participating in a private ecosystem that offered benefits but also created dependencies.',
        'A structurally similar dynamic can be observed in the 21st century. Large technology and financial corporations are building their own payment infrastructures. Services such as PayPal, Apple Pay, Google Pay, and Alipay are convenient and widely used. In addition to these monetary infrastructures, already widespread and deeply embedded in many people’s daily lives, some companies are now issuing private stablecoins. These are digital tokens pegged to government-issued money. Their backing rests solely on the issuing companies’ promises that sufficient reserves, usually government bonds and cash, are available to redeem the tokens for government-issued money.'
      ],
      deepening: {
        tag: 'Deep dive',
        title: 'Company Money—from the VOC to PayPal and Stablecoins',
        paragraphs: [
          'The principle of company money extends far beyond the VOC. In the 19th century, companies in some regions paid their workers in company-issued tokens or vouchers that could be redeemed only at company stores. This practice is known as the truck system or payment in scrip. This overt form of dependence was eventually outlawed.',
          'The parallel between the VOC and today’s technology and financial corporations is this: private companies create monetary infrastructures that become so widespread and so deeply embedded in everyday life that they are effectively unavoidable, yet their users have no say in the rules governing them.'
        ]
      }
    }
  };

  const $ = id => document.getElementById(id);

  function currentLanguage() {
    return document.documentElement.dataset.language === 'en' ? 'en' : 'de';
  }

  function setTitle(id, value) {
    const title = $(id);
    title.innerHTML = '';
    value.split('\n').forEach((line, lineIndex) => {
      if (lineIndex > 0) title.appendChild(document.createElement('br'));
      line.split(' ').forEach((word, index, words) => {
        const wordNode = document.createElement('span');
        wordNode.className = 'title-word';
        wordNode.textContent = word;
        title.appendChild(wordNode);
        if (index < words.length - 1) title.appendChild(document.createTextNode(' '));
      });
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

  // Der Sprachschalter setzt data-language nach jeder DOM-Änderung erneut
  // (gleicher Wert). Nur bei echtem Wechsel neu aufbauen, sonst Endlosschleife.
  let renderedLanguage = null;
  function render() {
    const language = currentLanguage();
    if (language === renderedLanguage) return;
    renderedLanguage = language;
    const content = CONTENT[language];
    setTitle('startTitle', content.title);
    // Start zeigt nur den ersten Absatz; der volle Text steht in der Leseansicht.
    renderParagraphs('startIntro', content.intro.slice(0, 1));
  }

  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });

  // Geteilte Leseansicht (shared/js/station-offcanvas.js) von links: Absatz 1 als Lead,
  // Absatz 2 und 3 darunter, ohne Zwischenüberschrift und ohne Infobox.
  const readingContent = language => ({
    title: CONTENT[language].title,
    lead: CONTENT[language].intro[0],
    sections: [{ text: CONTENT[language].intro.slice(1) }]
  });
  StationOffcanvas.create({
    trigger: $('btnReadMore'),
    content: { de: readingContent('de'), en: readingContent('en') }
  });

  // Vertiefung: dieselbe Leseansicht von rechts, geöffnet über den CTA mit Glühbirne.
  // Die Komponente schreibt die Beschriftung in [data-offcanvas-label], das Icon bleibt.
  const deepeningContent = language => {
    const deepening = CONTENT[language].deepening;
    return {
      eyebrow: deepening.tag,
      title: deepening.title,
      sections: [{ text: deepening.paragraphs }],
      labels: { open: deepening.tag, region: deepening.tag }
    };
  };
  StationOffcanvas.create({
    trigger: $('btnDeepen'),
    id: 'stationDeepDive',
    side: 'right',
    content: { de: deepeningContent('de'), en: deepeningContent('en') }
  });
})();
