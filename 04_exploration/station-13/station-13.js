'use strict';
(function () {
  const CONTENT = {
    de: {
      // \n = fester Umbruch im Start-Titel (<br>); in der Leseansicht wird daraus ein Leerzeichen.
      title: 'Die sogenannte\n„Free-Banking Era“\n(1837–1863)',
      intro: [
        'In den USA des 19. Jahrhunderts gab es über weite Strecken keine Zentralbank und kein einheitliches Papiergeld. Zwischen 1837 und 1863, in der sogenannten „Free-Banking Era“, druckten tausende Banken, Eisenbahngesellschaften, Immobilienfirmen und einzelne Händler eigene Geldscheine. Jeder Schein musste einzeln beurteilt werden: Wer hat ihn ausgegeben? War er gedeckt? Wo konnte er eingelöst werden? Kaufleute brauchten gedruckte Nachschlagewerke, um die Glaubwürdigkeit einzelner Noten zu prüfen.',
        'Die vier ausgewählten Geldscheine zeigen die Bandbreite: Eine Banknote aus dem Baumwollhandel in Georgia, ein Drei-Dollar-Schein aus Michigan, dem Bundesstaat, der zum Inbegriff betrügerischer Bankgründungen wurde, ein Schein einer Immobilienfirma aus Iowa, die nach einem Jahr pleiteging, und ein Händlerschein aus Baltimore, der noch 1871 gedruckt wurde, obwohl ein nationales Gesetz das private Gelddrucken längst hatte beenden sollen.',
        'Die National Banking Acts 1863 und 1864 schufen einen bundeseinheitlichen Rahmen für die Ausgabe von Banknoten. Privatbanken mit einer Zulassung der Bundesregierung durften Noten ausgeben, die durch hinterlegte US-Staatsanleihen gedeckt waren. Eine 1865 beschlossene und ab 1866 wirksame hohe Steuer verdrängte die Noten der von den einzelnen Bundesstaaten zugelassenen Banken weitgehend aus dem Umlauf. 1874 wurden die Einlösungsmöglichkeiten erweitert: Die Noten der zugelassenen Banken konnten bei Dienststellen des US-Schatzamtes im ganzen Land eingelöst werden.',
        'Die Parallele zur heutigen Kryptowelt liegt in der Vielzahl privater digitaler Geldversprechen. Die Fülle an Stablecoins unterscheidet sich in Herausgeber, Deckung, Einlösbarkeit und Regulierung. Die Geschichte der „Free-Banking Era“ zeigt, dass ein unübersichtlicher Geldmarkt früher oder später die Frage nach gemeinsamen Standards und verlässlicher Aufsicht aufwirft.'
      ],
      deepening: {
        tag: 'Vertiefung',
        sections: [
          {
            title: 'Wildcat Banking, Stablecoins und die Frage nach der Ordnung',
            text: [
              'Warum die USA 76 Jahre lang kein einheitliches Papiergeld hatten',
              'Zwischen 1836 und 1913 besaßen die Vereinigten Staaten keine Zentralbank. Das war kein Zufall, sondern das Ergebnis eines erbitterten politischen Kampfes. Zweimal hatte der Kongress eine nationale Bank gegründet, 1791 und 1816, und beide Male war sie nach 20 Jahren wieder verschwunden.',
              'Anders als in Europa, wo Zentralbanken durch dauerhafte Gesetze errichtet wurden, erhielten die beiden US-Nationalbanken vom Kongress jeweils nur eine befristete Genehmigung über 20 Jahre. Diese Befristung selbst war schon ein politischer Kompromiss, denn die Gegner akzeptierten die Bank nur unter der Bedingung, dass sie automatisch enden würde, wenn die nächste Generation von Parlamentariern nicht erneut zustimmte. Genau das geschah: 1811 und 1836 hatten sich die Machtverhältnisse verschoben und eine Verlängerung scheiterte. Erst 1913, beim dritten Anlauf, wurde die Federal Reserve ohne Ablaufdatum gegründet und besteht bis heute.',
              'In die Lücke, die der Wegfall der Zentralbank hinterließ, traten hunderte privater Banken mit der Ausgabe eigener Geldscheine.'
            ]
          },
          {
            title: 'Die „Free-Banking Era“: Tausende verschiedene „Währungen"',
            text: [
              'Ab 1837 konnte in vielen Bundesstaaten praktisch jeder eine Bank gründen. Und jede Bank konnte eigene Geldscheine drucken. Aber es blieb nicht nur bei den Banken: Auch Eisenbahngesellschaften, Versicherungen, Immobilienfirmen und einzelne Kaufleute brachten Scheine in Umlauf.',
              'Die Noten sollten durch hinterlegte Sicherheiten gedeckt sein, zumeist durch Staatsanleihen der Einzelstaaten. In der Praxis variierte die Qualität enorm. In Michigan wurden teils illiquide oder bereits im Wert gefallene Anleihen akzeptiert. Im schlimmsten Fall bestanden die „Barreserven" einer Bank aus Kisten voller Nägel und Glas, die obenauf durch eine dünne Schicht an Silbermünzen getarnt wurden.',
              'Konnte man mit einem Schein einer bestimmten Bank überall bezahlen? Nein. Eine Note der Bank of New York wurde in Philadelphia vielleicht mit 1–2 % Abschlag akzeptiert; die Note einer entlegenen Bank in Michigan konnte 20–50 % unter Nennwert laufen? gehandelt werden? – oder gar nicht.',
              'Um mit diesem Chaos umzugehen, entstand eine eigene Informationsinfrastruktur, die wiederum einen Spekulationsmarkt entstehen ließ. Sogenannte Banknote Reporters listeten auf, welche Banken noch zahlungsfähig waren und zu welchem Abschlag deren Noten gehandelt wurden. Note Brokers kauften Banknoten unter Nennwert, reisten zur ausgebenden Bank und lösten sie in Gold ein, wenn dieses vorhanden war.',
              'Diese Verzeichnisse und Händler sind das historische Pendant zu heutigen Krypto-Tracking-Websites wie CoinMarketCap oder CoinGecko. Damals wie heute gilt: Wo privates Geld nicht einheitlich vertrauenswürdig ist, entsteht Spekulationshandel.'
            ]
          },
          {
            title: 'Der Weg zur Ordnung – und die Parallelen zu heute',
            text: [
              '1863 verabschiedete der Kongress den National Banking Act: Es wurden bundesweit lizenzierte Banken mit einheitlicher Deckung durch US-Staatsanleihen durchgesetzt. Eine Strafsteuer von 10 % auf die alten Banknoten machte diese unwirtschaftlich. Ab 1874 konnten die neuen National Bank Notes überall im Land zum vollen Nennwert eingelöst werden. Zum ersten Mal war es egal, welche Bank einen Schein ausgestellt hatte.',
              'Wirtschaftswissenschaftler bezeichnen diesen Zustand als „Informationsunempfindlich": Es muss bei diesem Geld nicht mehr recherchiert werden, wer es herausgegeben hat. Dasselbe Ziel hat die heutige Stablecoin-Regulierung: Ein Stablecoin soll so sicher und austauschbar werden, dass die Frage nach dem Emittenten irrelevant wird.',
              'Die MiCA-Verordnung der EU verfährt dabei ähnlich wie der National Banking Act: Dollar-Stablecoins werden nicht verboten, aber durch Lizenzpflichten und Transaktionsobergrenzen so stark reglementiert, dass nicht-konforme Emittenten aus dem europäischen Markt gedrängt werden. Die Banque de France warnte 2026 vor einer „digitalen Dollarisierung". Sie sieht es als Gefahr, dass der Zahlungsverkehr auf Blockchains standardmäßig über Dollar-Token läuft und somit der Euro an Bedeutung verliert. Als Gegenmaßnahme entwickeln europäische Banken einen Euro-Stablecoin (Qivalis, geplant Ende 2026). Die EZB treibt parallel den digitalen Euro voran.'
            ]
          }
        ]
      }
    },
    en: {
      title: 'The “Free-Banking Era” (1837–1863)',
      intro: [
        'For much of the 19th century, the United States had no central bank, and no uniform paper currency. During the period commonly known as the “Free-Banking Era”, from 1837 to 1863, thousands of banks, railroad companies, real estate firms, and individual merchants issued their own notes. Each note had to be assessed individually: Who had issued it? Was it backed by assets? Where could it be redeemed? Merchants needed printed reference guides to check the reliability of individual notes. “Free banking” meant that banks could be established under general legal requirements without a special legislative charter. Not that they operated without any regulation.',
        'The four selected notes illustrate this variety: a banknote associated with the cotton trade in Georgia; a three-dollar note from Michigan, the state that became synonymous with fraudulent banking ventures; a note issued by an Iowa real estate company that went bankrupt after just one year; and a merchant’s note from Baltimore, printed as late as 1871, showing that private monetary instruments persisted beyond the era’s conventional end.',
        'The National Banking Acts of 1863 and 1864 established a federal framework for note issuance. Privately owned banks with federal charters could issue notes backed by U.S. government bonds deposited as collateral. A heavy tax enacted in 1865 and effective from 1866 largely drove state-bank notes out of circulation. Private banknote issuance thus continued, but increasingly under uniform federal rules. Redemption arrangements were expanded in 1874, allowing national banknotes to be redeemed at Treasury offices across the country.',
        'The parallel with today’s crypto world lies in the multitude of privately issued digital promises of money. The many stablecoins differ in their issuers, backing, redemption terms, and regulation. The history of the “Free-Banking Era” shows that a monetary landscape that is difficult to navigate sooner or later raises questions about common standards and reliable oversight.'
      ],
      deepening: {
        tag: 'Deep dive',
        sections: [
          {
            title: 'Wildcat Banking, Stablecoins, and the Question of Rules',
            text: [
              'Why the United States Went Decades Without a Central Bank',
              'Between 1836 and 1913, the United States had no central bank. This was no accident but the outcome of a bitter political struggle. Congress had twice established a national bank, in 1791 and 1816, and in both cases its federal charter expired after 20 years.',
              'Congress granted each bank a charter limited to 20 years. Their continued existence as national institutions therefore depended on renewed political approval. In 1811 and again in 1836, opposition prevented renewal.',
              'Only in 1913, on the third attempt, was the Federal Reserve established. Even then, the Federal Reserve Banks initially received 20-year charters. Congress removed that time limit in 1927, and the system continues to operate today.',
              'In the absence of a central bank, hundreds of private banks issued their own notes. From the 1860s onward, federal legislation gradually established a more uniform paper currency, even though the country still lacked a central bank.'
            ]
          },
          {
            title: 'The Free-Banking Era—Thousands of Different “Currencies”',
            text: [
              'Beginning in 1837, a growing number of states adopted laws allowing anyone who met specified requirements to establish a bank. Each bank could issue its own notes. But banks were not the only issuers: railroad companies, insurance companies, real estate firms, and individual merchants also put notes into circulation.',
              'Banknotes were supposed to be backed by deposited collateral, often bonds issued by individual states. In practice, the quality of this backing varied enormously. Some assets were difficult to sell or had fallen in value. Fraud could also extend to a bank’s supposed cash reserves: in one documented Michigan case, boxes contained nails, lead, and broken glass concealed beneath a thin layer of silver coins.',
              'Could a note issued by a particular bank be used to pay anywhere? No. Notes from a trusted New York bank might be accepted in Philadelphia at close to face value, while those from a remote Michigan bank could trade at a substantial discount, or not be accepted at all.',
              'An information network developed to help people navigate this confusing market, while also supporting speculative trading. Publications known as banknote reporters listed which banks were still solvent and the discounts at which their notes traded. Note brokers bought banknotes below face value, traveled to the issuing bank, and redeemed them for gold or silver if available.',
              'These reference guides offer a historical parallel to today’s crypto-tracking websites, such as CoinMarketCap and CoinGecko. Then as now, differences in trust and access to information created opportunities for trading and speculation.'
            ]
          },
          {
            title: 'Establishing Common Rules and the Parallels with Today',
            text: [
              'The National Banking Acts of 1863 and 1864 established a system of federally chartered banks whose notes were backed by U.S. government bonds. A 10 percent tax on state-bank notes, enacted in 1865 and effective from 1866, made their continued circulation uneconomical. In 1874, redemption arrangements were expanded, allowing national banknotes to be redeemed at face value at Treasury offices across the country. The identity of the issuing bank became far less important to those using its notes.',
              'Economists describe money of this kind as “information-insensitive”: people do not need to investigate the issuer before accepting it. Stablecoin regulation seeks a comparable degree of confidence through requirements governing reserves, redemption, and supervision. This does not, however, make all stablecoins equally safe or interchangeable.',
              'The European Union’s Markets in Crypto-Assets Regulation (MiCA) offers a parallel: access to the market depends on compliance with common rules. Dollar-denominated stablecoins are not prohibited, but their issuers must meet authorization and other regulatory requirements. Additional restrictions apply to their large-scale use as a means of exchange.',
              'In 2026, the Banque de France warned of the risk of digital dollarization: if dollar tokens became the default means of payment on blockchains, the euro’s role could diminish. European banks are developing a euro-denominated stablecoin through their joint venture Qivalis, with a launch planned for the second half of 2026, subject to regulatory approval. In parallel, the European Central Bank is advancing its work on a digital euro.'
            ]
          }
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
  // Absatz 2 bis 4 darunter, ohne Zwischenüberschrift und ohne Infobox.
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
  // Die drei Vertiefungen sind blaue Boxen zum Aufklappen wie in Station 08
  // (collapsible), Kicker „Vertiefung 1–3“ / „Deep dive 1–3“.
  // Die Komponente schreibt die Beschriftung in [data-offcanvas-label], das Icon bleibt.
  const deepeningContent = language => {
    const deepening = CONTENT[language].deepening;
    return {
      eyebrow: deepening.tag,
      title: CONTENT[language].title,
      sections: deepening.sections.map((section, index) => Object.assign({}, section, {
        kicker: `${deepening.tag} ${index + 1}`,
        collapsible: true
      })),
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
