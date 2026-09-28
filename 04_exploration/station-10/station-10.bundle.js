/* Station 8 content and overlay */
(function () {
  const STATION_CONTENT = {
    meta: {
      title: 'Station 08 · Scheitern ohne Regeln',
      ariaLabel: 'Station 08 – Scheitern ohne Regeln'
    },
    start: {
      eyebrow: 'Scheitern ohne Regeln',
      title: 'Palmstruch und die Stockholms Banco',
      intro: [
        'Schweden bezahlte im 17. Jahrhundert mit Kupferplatten. Sie wogen bis zu 20 Kilogramm, was das Problem unmittelbar verdeutlicht: Dieses Geld war schwer, unhandlich und im Alltag kaum zu gebrauchen.',
        'Johan Palmstruch (1611-1671), ein aus Riga stammender Kaufmann, erhielt 1656 vom schwedischen König die Genehmigung, eine Bank zu gründen. Ab 1661 gab die Stockholm Banco sogenannte Kreditzettel aus, die ersten Banknoten Europas. Sie erleichterten Zahlungen, ohne dass die schweren Kupferplatten bei jedem Geschäft transportiert und übergeben werden mussten. Die Scheine waren nicht an eine bestimmte Kupfereinlage gebunden, sondern wurden als Kredite ausgegeben. Die Bank versprach, sie auf Verlangen in Münzgeld einzulösen. Damit entstand das erste Papiergeld Europas.',
        'Anfangs funktionierte das System. Die Zettel waren viel leichter und handlicher als die Platten. Der Zahlungsverkehr konnte zudem schneller abgewickelt werden. Doch es fehlte als essenzieller Bestandteil eine Regulierung der Emissionen: Niemand kontrollierte, wie viele Scheine die Bank ausgab. Palmstruch ließ mehr drucken, als durch Einlagen gedeckt waren. Als sich das herumsprach und das Vertrauen in die Einlösbarkeit schwand, verlangten viele Menschen gleichzeitig Münzgeld für ihre Scheine zurück. Diesen Forderungen konnte die Bank nicht nachkommen. Bereits 1664 ordnete die Regierung an, die ausgegebenen Kredite zurückzufordern und die Banknoten einzuziehen. Palmstruch wurde zunächst zum Tode verurteilt, später aber zu einer Gefängnisstrafe begnadigt.',
        'Aus diesem Scheitern zog Schweden eine Konsequenz: Die Leitung der Nachfolgeeinrichtung der Stockholms Banco, die Riksens Ständers Bank, die heutige Schwedische Nationalbank (Sveriges Riksbank), wurde nicht mehr einem privaten Unternehmer überlassen, sondern unter die Aufsicht des Parlaments gestellt. Sie gilt als älteste noch bestehende Zentralbank der Welt.'
      ],
      image: { src: 'dither-output.png', alt: '' }
    },
    action: {
      eyebrow: 'Vorlage',
      title: 'Ausprobieren',
      description: 'Platzhalterbereich ohne Zirkel-Logik. Diesen Bereich kannst du als Basis für neue Stationen nutzen.',
      closeLabel: 'Zur Startansicht',
      deepening: {
        tag: 'Vertiefung',
        title: 'Bank Runs – damals und heute',
        paragraphs: [
          'Was in den 1660ern in Stockholm geschah, hat einen Namen, der bis heute verwendet wird: Bank Run. So bezeichnet man den Ansturm auf eine Bank, wenn das Vertrauen schwindet und zu viele Menschen gleichzeitig ihr Geld abheben wollen. Kann die Bank die Forderungen nicht schnell genug erfüllen, verstärkt dies die Verunsicherung.',
          'Im Bereich digitaler Token ist dieselbe Dynamik zu beobachten. Im Mai 2022 verlor der sogenannte Stablecoin TerraUSD innerhalb weniger Tage seine Bindung an den US-Dollar. Das System brach zusammen, der zugehörige Token Luna wurde praktisch wertlos. Schätzungen zufolge gingen dabei Vermögenswerte in Höhe von rund 45 Milliarden US-Dollar verloren.',
          'Anders als bei Banken gab es bei TerraUSD jedoch keine Einlagensicherung, keine Aufsichtsbehörde, die hätte eingreifen können, keinen Staat, der haftete. Es ist einer der Gründe, warum die Europäische Union mit der MiCA-Verordnung Regulierungsstrukturen schafft. Dies ist vergleichbar mit der Konsequenz, die Schweden 1668 zog, als es die Bankaufsicht dem Parlament unterstellte.'
        ]
      }
    }
  };

  const ENGLISH_CONTENT = {
    start: {
      title: 'Palmstruch and Stockholms Banco',
      intro: [
        'In the 17th century, Sweden used copper plates as money. They weighed up to 20 kilograms, making the problem immediately apparent: this money was heavy, cumbersome, and barely practical for everyday use.',
        'In 1656, Johan Palmstruch, a merchant from Riga, received permission from the Swedish king to establish a bank. From 1661, Stockholms Banco issued what were known as credit notes; Europe’s first banknotes. They made payments easier, removing the need to transport and hand over heavy copper plates with every transaction. The notes were not tied to a specific copper deposit but were issued as loans. The bank promised to redeem them in coins on demand. This marked the beginning of paper money in Europe.',
        'At first, the system worked. The notes were much lighter and easier to handle than the plates. Payments could also be processed more quickly. But an essential safeguard was missing: regulation of the issuance of banknotes. No one controlled how many notes the bank issued. Palmstruch had printed more than were backed by deposits. When word spread and confidence in their redeemability declined, many people demanded coins for their notes at the same time. The bank could not meet these demands. As early as 1664, the government ordered the bank to call in its loans and withdraw its banknotes from circulation. Palmstruch was initially sentenced to death, but his sentence was later commuted to imprisonment.',
        'Sweden drew a lesson from this failure: the management of Stockholms Banco’s successor, Riksens Ständers Bank, today Sweden’s central bank, Sveriges Riksbank, was placed under parliamentary oversight rather than entrusted to a private entrepreneur. It is regarded as the world’s oldest surviving central bank.'
      ]
    },
    deepening: {
      tag: 'A Closer Look',
      title: 'Bank Runs—Then and Now',
      paragraphs: [
        'What happened in Stockholm in the 1660s has a name still used today: a bank run. This occurs when confidence in a bank declines and too many people try to withdraw their money at the same time. If the bank cannot meet these demands quickly enough, uncertainty intensifies.',
        'The same dynamic can be observed with digital tokens. In May 2022, the stablecoin TerraUSD lost its peg to the US dollar within a matter of days. The system collapsed, and its associated token, Luna, became virtually worthless. An estimated $45 billion in asset value was lost.',
        'Unlike banks, however, TerraUSD had no deposit insurance, no supervisory authority that could have intervened, and no government liable for the losses. This is one reason why the European Union is establishing a regulatory framework through its Markets in Crypto-Assets Regulation (MiCA). A parallel can be drawn with Sweden’s response in 1668, when it placed bank oversight under parliament.'
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

    // also populate overlay content
    const ovTag = document.getElementById('ovTag'); if(ovTag) ovTag.textContent = deepening.tag;
    const ovTitle = document.getElementById('ovTitle'); if(ovTitle) ovTitle.textContent = deepening.title;
    const ovBody = document.getElementById('ovBody'); if(ovBody) { ovBody.innerHTML = ''; deepening.paragraphs.forEach(p=>{ const el=document.createElement('p'); el.textContent=p; ovBody.appendChild(el); }); }
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
