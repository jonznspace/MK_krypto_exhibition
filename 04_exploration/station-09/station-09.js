'use strict';
(function () {
  const CONTENT = {
    de: {
      title: 'Neue Entwicklungen, bekannte Herausforderungen',
      // H1 des Startscreens: nach diesem Wortteil Bindestrich und fester Umbruch (<br>).
      // Die Leseansicht zeigt den Titel ungetrennt.
      titleBreakAfter: 'Heraus',
      intro: [
        'Papiergeld war in der Vergangenheit für Menschen einmal genauso ungewohnt und suspekt, wie es digitale Token heutzutage sind. Als im 17. Jahrhundert die ersten Geldscheine in Europa auftauchten (Einführung während der Song Dynastie in China bereits im 11. Jh.), war die Skepsis groß: Wie soll ein bedrucktes Stück Papier denselben Wert besitzen wie eine Münze aus Silber oder Kupfer?',
        'Im 21. Jahrhundert kommt ein neues Abstraktionslevel hinzu: Digitale Werte (digitale Token, Stablecoins, Kryptowerte im Allgemeinen) werden mit dem Anspruch angeboten, als Zahlungsmittel oder Wertträger zu dienen.',
        'Die Geschichte des Geldes demonstriert, dass es immer wieder zur Entwicklung neuer Zahlungsmittel kam. Vier Beispiele aus drei Jahrhunderten zeigen, unter welchen Bedingungen neue Geldformen entstehen, unter welchen sie gelingen oder scheitern.'
      ]
    },
    en: {
      title: 'New Developments, Familiar Challenges',
      intro: [
        'In the past, paper money was just as unfamiliar and suspicious to people as digital tokens are today. When the first banknotes appeared in Europe in the 17th century (introduced in Song dynasty China during the 11th century), scepticism ran high: How could a printed piece of paper have the same value as a silver or copper coin?',
        'In the 21st century, a new level of abstraction has emerged: Digital assets (such as digital tokens, stablecoins, and crypto assets in general) are offered with the claim that they serve as a means of payment or a store of value.',
        'The history of money demonstrates that new forms of payment have emerged time and time again. Four examples spanning three centuries illustrate the conditions under which new forms of money emerge, and under which they succeed or fail.'
      ]
    }
  };

  const $ = id => document.getElementById(id);

  function currentLanguage() {
    return document.documentElement.dataset.language === 'en' ? 'en' : 'de';
  }

  // breakAfter (optional): Wortteil, nach dem das Wort mit „-“ und <br> getrennt wird.
  function setTitle(id, value, breakAfter) {
    const title = $(id);
    title.innerHTML = '';
    const appendWord = text => {
      const wordNode = document.createElement('span');
      wordNode.className = 'title-word';
      wordNode.textContent = text;
      title.appendChild(wordNode);
    };
    value.split(' ').forEach((word, index, words) => {
      if (breakAfter && word.startsWith(breakAfter) && word.length > breakAfter.length) {
        appendWord(`${breakAfter}-`);
        title.appendChild(document.createElement('br'));
        appendWord(word.slice(breakAfter.length));
      } else {
        appendWord(word);
      }
      if (index < words.length - 1) title.appendChild(document.createTextNode(' '));
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
    setTitle('startTitle', content.title, content.titleBreakAfter);
    // Start zeigt nur den ersten Absatz; der volle Text steht in der Leseansicht.
    renderParagraphs('startIntro', content.intro.slice(0, 1));
  }

  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });

  // Geteilte Leseansicht (shared/js/station-offcanvas.js): Absatz 1 als Lead,
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
})();
