'use strict';

/*
  Krypto, was? – Onepager-Renderer.
  Baut Navigation, Kapitel, Footer und Overlay aus window.KW_CONTENT (js/content.js).
  Inhalte werden hier nie geschrieben, nur angeordnet.
*/
(function () {
  const C = window.KW_CONTENT;
  // "hidden": true blendet Abschnitte aus, ohne sie aus content.js zu löschen
  const SECTIONS = C.sections.filter(section => !section.hidden);
  const SPUREN = window.KW_SPUREN || null;
  const ROOT = document.documentElement;
  const params = new URLSearchParams(location.search);
  const LANG_KEY = 'kw-onepager-language';
  const LANG = [params.get('lang'), readStoredLanguage(), C.site.defaultLanguage].find(lang => C.site.languages.includes(lang));

  function readStoredLanguage() {
    try { return localStorage.getItem(LANG_KEY); } catch (error) { return null; }
  }

  function storeLanguage(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (error) { /* Speicher nicht verfügbar */ }
  }
  const OVERLAY_SIZE = [1536, 864]; // Designgröße der Tablet-Stationen (Querformat)
  const OVERLAY_PORTRAIT_WIDTH = 600; // Hochformat (Handy): schmale Ansicht, Stationen stapeln ihre Inhalte
  const OVERLAY_MAX_SCALE = 1.25;     // auf großen Bildschirmen darf die Station etwas größer werden

  ROOT.lang = LANG;
  if (params.has('review')) ROOT.classList.add('is-review');
  if (C.site.justifyText) ROOT.classList.add('is-justified');

  // ---------------------------------------------------------------- i18n

  // Liefert den Text der aktiven Sprache; fehlt er, den deutschen als Fallback.
  function pick(value) {
    if (value == null) return { value: '', lang: LANG };
    if (typeof value !== 'object' || Array.isArray(value)) return { value, lang: LANG };
    const own = value[LANG];
    const present = Array.isArray(own) ? own.length > 0 : Boolean(own);
    return present ? { value: own, lang: LANG } : { value: value.de, lang: 'de' };
  }

  const t = value => pick(value).value;

  function markLanguage(node, lang) {
    if (lang === LANG) return;
    node.lang = lang;
    node.dataset.i18nMissing = LANG;
  }

  function setText(node, value) {
    const result = pick(value);
    node.textContent = result.value;
    markLanguage(node, result.lang);
  }

  // ---------------------------------------------------------------- DOM helpers

  function h(tag, props, ...children) {
    const node = document.createElement(tag);
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (value == null || value === false) return;
        if (key === 'class') node.className = value;
        else if (key === 'text') setText(node, value);
        else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
        else node.setAttribute(key, value === true ? '' : value);
      });
    }
    children.flat(Infinity).forEach(child => {
      if (child == null || child === false) return;
      node.append(child instanceof Node ? child : document.createTextNode(child));
    });
    return node;
  }

  function paragraphs(value, className) {
    const result = pick(value);
    return (result.value || []).map(text => {
      const node = h('p', { class: className });
      node.textContent = text;
      markLanguage(node, result.lang);
      return node;
    });
  }

  function draftProps(isDraft) {
    return isDraft ? { 'data-draft': t(C.ui.draft) } : {};
  }

  // Tabler.io Outline-Icons (tabler.io/icons)
  const ICONS = {
    'chevron-down': ['M6 9l6 6l6 -6'],
    x: ['M18 6l-12 12', 'M6 6l12 12'],
    'external-link': ['M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6', 'M11 13l9 -9', 'M15 4h5v5'],
    'arrow-up': ['M12 5l0 14', 'M18 11l-6 -6', 'M6 11l6 -6'],
    'arrow-down': ['M12 5l0 14', 'M18 13l-6 6', 'M6 13l6 6'],
    'arrow-right': ['M5 12l14 0', 'M13 18l6 -6', 'M13 6l6 6']
  };

  function icon(name, className) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', `icon ${className || ''}`);
    ICONS[name].forEach(d => {
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    return svg;
  }

  function slug(value) {
    return String(value).toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // ---------------------------------------------------------------- stations

  const station = key => C.stations[key];
  const numbered = Object.entries(C.stations)
    .filter(([, s]) => s.nr != null)
    .sort((a, b) => a[1].nr - b[1].nr);

  // Nummer wie im Ausstellungsskript, ohne führende Null
  function stationNumber(s) {
    return String(s.nr);
  }

  function stationLabel(s) {
    return s.nr == null ? t(s.label) : `${t(C.ui.station)} ${stationNumber(s)}`;
  }

  function stationMarker(key) {
    const s = station(key);
    if (!s) return null;
    return h('span', { class: 'station-marker' },
      h('span', { class: 'station-marker__station' }, stationLabel(s)),
      h('span', { class: 'station-marker__topic', text: s.topic }));
  }

  // Erster Abschnitt einer Station = Sprungziel aus der Stationsleiste
  function sectionForStation(key) {
    return SECTIONS.find(section => section.station === key);
  }

  function sectionLabel(section) {
    return section.title || section.nav || { de: section.id };
  }

  // ---------------------------------------------------------------- shared components

  function titleSize(value) {
    const length = t(value).replace(/\s/g, '').length;
    if (length >= 39) return 'is-long';
    if (length >= 20) return 'is-medium';
    return '';
  }

  function chapterHead(section, level = 'h2') {
    return h('div', { class: 'chapter__head' },
      h('div', { class: 'chapter__meta' },
        section.station ? stationMarker(section.station) : null,
        // Rubrik nur zeigen, wenn sie nicht schon im Stations-Tag steht
        section.eyebrow && !(section.station && t(section.eyebrow) === t(station(section.station).topic))
          ? h('span', { class: 'eyebrow', text: section.eyebrow }) : null),
      h(level, { class: `title chapter__title ${titleSize(section.title)}`, text: section.title, ...draftProps(section.titleDraft) }));
  }

  // „Ausprobieren“ ist vorerst ausgeblendet: site.showActions in content.js
  function actionButton(action, section) {
    if (!action || !C.site.showActions) return null;
    return h('button', { class: 'cta', type: 'button', onclick: () => openOverlay(action, section) },
      h('span', { class: 'cta__label', text: action.label || C.ui.tryIt }),
      h('span', { class: 'cta__icon' }, h('img', { src: 'assets/design-system/symbols/brand-apple-arcade.svg', alt: '' })));
  }

  function actions(section) {
    const button = actionButton(section.action, section);
    return button ? h('div', { class: 'chapter__actions' }, button) : null;
  }

  function tagLabel(tag) {
    return tag && tag.de ? tag : C.ui.deepDive;
  }

  function compare(items) {
    return h('div', { class: 'compare' },
      items.map(item => h('div', { class: 'compare__item' },
        h('h4', { class: 'title compare__label', text: item.label }),
        h('p', { text: item.text }))));
  }

  function deepDive(dd, open) {
    const body = h('div', { class: 'deepdive__body prose' });
    if (dd.subtitle) body.append(h('p', { class: 'deepdive__subtitle', text: dd.subtitle }));
    if (dd.blocks) {
      dd.blocks.forEach(block => body.append(block.type === 'columns' ? compare(block.items) : h('p', { text: block.text })));
    } else {
      body.append(...paragraphs(dd.text));
    }
    return h('details', { class: 'deepdive', open: open || null },
      h('summary', { class: 'deepdive__summary' },
        h('span', { class: 'deepdive__tag', text: tagLabel(dd.tag) }),
        h('span', { class: 'deepdive__title', text: dd.title }),
        icon('chevron-down', 'deepdive__chevron')),
      body);
  }

  function deepDives(list, open) {
    if (!list || !list.length) return null;
    return h('div', { class: 'deepdives' }, list.map(dd => deepDive(dd, open)));
  }

  function figure(image, className) {
    if (!image || !image.src) return null;
    return h('figure', { class: className }, h('img', { src: image.src, alt: t(image.alt), loading: 'lazy' }));
  }

  function subhead(tag, title) {
    return h('div', { class: 'subhead' },
      h('span', { class: 'deepdive__tag', text: tagLabel(tag) }),
      h('h3', { class: 'subhead__title', text: title }));
  }

  // ---------------------------------------------------------------- section renderers

  const renderers = {
    hero() {
      const site = C.site;
      return h('header', { class: 'hero', id: 'top' },
        site.heroLayers ? h('figure', { class: 'hero__visual', 'data-parallax': '' },
          h('img', { class: 'hero__layer hero__layer--back', src: site.heroLayers.background.src, alt: '', 'data-depth': 'auto' }),
          h('img', { class: 'hero__layer hero__layer--front', src: site.heroLayers.foreground.src, alt: t(site.heroLayers.foreground.alt), 'data-depth': '0.15' })) : null,
        h('div', { class: 'hero__intro' },
          h('div', { class: 'hero__head' },
            h('span', { class: 'eyebrow', text: site.institution }),
            h('h1', { class: 'title hero__title', text: site.title })),
          h('div', { class: 'hero__body' },
            site.lede ? h('p', { class: 'hero__lede', text: site.lede.text, ...draftProps(site.lede.draft) }) : null,
            h('dl', { class: 'hero__meta' },
              h('div', null, h('dt', { class: 'eyebrow', text: C.ui.runtime }), h('dd', null, `${site.runtime.start} – ${site.runtime.end}`)),
              h('div', null, h('dt', { class: 'eyebrow', text: C.ui.venue }), h('dd', { text: site.venue }))))));
    },

    // Kapitel-Banner eines Ausstellungsbereichs, darunter der Scharniertext
    opener(section) {
      return h('section', { class: 'opener', id: section.id },
        h('div', { class: 'opener__banner' },
          h('div', { class: 'opener__label' },
            h('span', null, `${t(C.ui.part)} ${section.numeral}`)),
          h('h2', { class: `title opener__title ${titleSize(section.title)}`, text: section.title }),
          section.hinge ? h('div', { class: 'opener__hinge prose prose--lead', ...draftProps(section.hinge.draft) },
            section.hinge.title ? h('h3', { class: 'opener__hinge-title', text: section.hinge.title }) : null,
            paragraphs(section.hinge.text)) : null));
    },

    object(section) {
      return h('section', { class: 'chapter', id: section.id },
        chapterHead(section),
        figure(section.image, 'chapter__visual'),
        h('div', { class: 'chapter__main' },
          h('div', { class: 'prose prose--story' }, paragraphs(section.text)),
          actions(section),
          deepDives(section.deepDives)));
    },

    bridge(section) {
      return h('section', { class: 'bridge', id: section.id },
        h('p', { class: 'bridge__text', text: section.text, ...draftProps(section.draft) }));
    },

    film(section) {
      const video = h('video', { class: 'film__video', src: section.src, controls: true, muted: true, loop: true, playsinline: true, preload: 'metadata' });
      video.muted = true;
      const buttons = section.chapters.map((chapter, index) => h('button', {
        class: 'film__chapter', type: 'button',
        onclick: () => { video.currentTime = chapter.t; video.play(); }
      },
        h('span', { class: 'film__chapter-nr' }, String(index + 1).padStart(2, '0')),
        h('span', { class: 'film__chapter-title', text: chapter.title })));

      video.addEventListener('timeupdate', () => {
        let active = 0;
        section.chapters.forEach((chapter, index) => { if (video.currentTime >= chapter.t) active = index; });
        buttons.forEach((button, index) => button.setAttribute('aria-current', String(index === active)));
      });

      // Autoplay (stumm), sobald der Film zur Hälfte im Bild ist; pausiert beim Wegscrollen.
      // Hat jemand selbst pausiert, startet er nicht von allein neu. Bei „Bewegung reduzieren“ kein Autoplay.
      let userPaused = false;
      let autoPausing = false;
      video.addEventListener('pause', () => { if (!autoPausing && !video.ended) userPaused = true; autoPausing = false; });
      video.addEventListener('play', () => { userPaused = false; });
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && video.paused && !userPaused) video.play().catch(() => {});
          else if (!entry.isIntersecting && !video.paused) { autoPausing = true; video.pause(); }
        }, { threshold: 0.5 }).observe(video);
      }

      return h('section', { class: 'chapter chapter--film', id: section.id },
        chapterHead({ eyebrow: section.meta, title: section.title }),
        h('div', { class: 'film__frame' }, video),
        h('div', { class: 'film__chapters', role: 'group', 'aria-label': t(C.ui.chapters) }, buttons));
    },

    longread(section) {
      const partId = part => `${section.id}-${part.kicker}`;
      return h('section', { class: 'chapter chapter--longread', id: section.id },
        chapterHead(section),
        h('div', { class: 'longread' },
          h('nav', { class: 'longread__index', 'aria-label': t(C.ui.chapters) },
            h('ol', null, section.parts.map(part => h('li', null,
              h('a', { href: `#${partId(part)}`, 'data-longread-link': partId(part) },
                h('span', { class: 'longread__index-nr' }, part.kicker),
                h('span', { text: part.title })))))),
          h('div', { class: 'longread__body' },
            section.parts.map(part => h('article', { class: 'longread__part', id: partId(part) },
              h('div', { class: 'longread__part-head' },
                h('span', { class: 'longread__part-nr', 'aria-hidden': 'true' }, part.kicker),
                h('h3', { class: 'title longread__part-title', text: part.title })),
              h('div', { class: 'prose prose--story' }, paragraphs(part.text)),
              deepDives(part.deepDives))))));
    },

    monitors(section) {
      return h('section', { class: 'chapter chapter--monitors', id: section.id, ...draftProps(section.draft) },
        chapterHead({ eyebrow: section.kicker, title: section.title }),
        h('ol', { class: 'monitors' },
          section.items.map((item, index) => h('li', { class: 'monitor' },
            h('span', { class: 'eyebrow' }, `${t(C.ui.live)} · ${String(index + 1).padStart(2, '0')} · `, h('span', { text: item.ref })),
            h('h3', { class: 'monitor__title', text: item.title }),
            h('p', { text: item.text }),
            h('ul', { class: 'monitor__links' }, item.links.map(url => h('li', null,
              h('a', { class: 'info-link', href: url, target: '_blank', rel: 'noopener' },
                new URL(url).hostname.replace(/^www\./, ''), icon('external-link')))))))));
    },

    // Mining-Geräte: links das Schaubild (Gläserne Münze + Sockel), rechts der Text des gewählten Geräts
    catalog(section) {
      const items = section.groups.flatMap(group => group.items);
      const articles = items.map(item => h('article', { class: 'device', id: `${section.id}-${item.kicker}` },
        // Objektnummer wie im Skript (I–V); die Sockel haben keine
        item.nr ? h('span', { class: 'device__nr' }, item.nr) : null,
        h('h4', { class: 'device__title', text: item.title }),
        h('ul', { class: 'device__label' }, (pick(item.museumLabel).value || []).map(line => h('li', null, line))),
        item.storyTitle ? h('p', { class: 'device__story', text: item.storyTitle }) : null,
        h('div', { class: 'device__text' }, paragraphs(item.text)),
        h('ul', { class: 'device__details' }, (pick(item.museumDetails).value || []).map(line => h('li', null, line)))));
      const detail = h('div', { class: 'miners__detail' }, articles);

      function select(kicker, fromUser) {
        items.forEach((item, index) => { articles[index].hidden = item.kicker !== kicker; });
        map.querySelectorAll('.miner-map__target').forEach(target => target.setAttribute('aria-pressed', String(target.dataset.kicker === kicker)));
        if (!fromUser) return;
        map.classList.remove('is-hinting');
        // Handy/Tablet: Text steht unter dem Schaubild – dorthin scrollen, falls nicht zu sehen
        if (matchMedia('(max-width: 1100px)').matches) detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const map = minerMap(section, items, select);
      select(items[0].kicker, false);
      return h('section', { class: 'chapter chapter--catalog', id: section.id },
        chapterHead(section),
        h('div', { class: 'prose prose--story' }, paragraphs(section.text)),
        h('div', { class: 'miners split' }, map, detail));
    },

    money(section) {
      const text = { de: [], en: [] };
      [section.text, ...section.blocks.map(block => block.text)].forEach(part => {
        text.de.push(...part.de);
        text.en.push(...part.en);
      });
      if (text.en.length < text.de.length) text.en = [];

      return h('section', { class: 'chapter chapter--money', id: section.id },
        chapterHead(section),
        figure(section.image, 'chapter__visual'),
        h('div', { class: 'chapter__main' },
          h('div', { class: 'prose prose--story' }, paragraphs(text))),
        h('div', { class: 'money__deep' },
          subhead(section.timeline.tag, section.timeline.title),
          h('p', { class: 'money__deep-intro', text: section.timeline.intro }),
          h('ol', { class: 'timeline' },
            section.timeline.items.map(item => h('li', { class: 'timeline__item' },
              h('span', { class: 'timeline__date', text: item.date }),
              h('p', { class: 'timeline__text', text: item.text }))))),
        h('div', { class: 'money__deep' },
          subhead(section.forms.tag, section.forms.title),
          h('div', { class: 'money__deep-intro' }, paragraphs(section.forms.intro)),
          h('ol', { class: 'forms' },
            section.forms.items.map(item => h('li', { class: 'forms__row' },
              h('span', { class: 'forms__title', text: item.title }),
              h('span', { class: 'forms__cell', text: item.shape }),
              h('span', { class: 'forms__cell', text: item.backing }))))),
        h('div', { class: 'money__deep' },
          subhead(section.notMoney.tag, section.notMoney.title),
          h('div', { class: 'prose' },
            section.notMoney.subtitle ? h('p', { class: 'deepdive__subtitle', text: section.notMoney.subtitle }) : null,
            paragraphs(section.notMoney.text))));
    },

    lead(section) {
      return h('section', { class: 'chapter chapter--lead', id: section.id },
        chapterHead(section),
        h('div', { class: 'prose prose--story' }, paragraphs(section.text)));
    },

    case(section) {
      // Eine einzelne Vertiefung ist geöffnet, mehrere starten geschlossen
      const open = section.deepDives.length === 1;
      return h('section', { class: 'chapter chapter--case', id: section.id },
        chapterHead(section),
        figure(section.image, 'chapter__visual'),
        h('div', { class: 'chapter__main' },
          h('div', { class: 'prose prose--story' }, paragraphs(section.text)),
          deepDives(section.deepDives, open)));
    },

    glossary(section) {
      const node = h('section', { class: 'chapter chapter--glossary', id: section.id },
        chapterHead(section),
        actions(section),
        h('div', { class: 'glossary', 'aria-live': 'polite' }));
      loadGlossary(section, node.querySelector('.glossary'));
      return node;
    }
  };

  // ---------------------------------------------------------------- glossary

  async function loadGlossary(section, container) {
    let terms;
    try {
      const response = await fetch(section.source);
      if (!response.ok) throw new Error(response.status);
      terms = await response.json();
    } catch (error) {
      container.append(h('p', { class: 'notice', text: C.ui.glossaryError }));
      return;
    }

    const termId = term => `glossar-${slug(term.begriff_de)}`;
    const groupId = group => `glossar-gruppe-${slug(group)}`;
    const lookup = new Map();
    terms.forEach(term => {
      const names = [term.begriff_de, ...term.begriff_de.split('/'), term.begriff_de.replace(/\(.*?\)/g, '')];
      names.forEach(name => lookup.set(name.trim().toLowerCase(), term));
    });

    const groups = [...new Set(terms.map(term => term.gruppe))];
    const text = (de, en) => ({ de: de || '', en: en || '' });
    const groupLabel = group => (C.ui.glossaryGroups && C.ui.glossaryGroups[group]) || { de: group, en: '' };

    // Mitfahrende Kategorien in der linken Spalte (nur bei „Alle“)
    const index = h('nav', { class: 'glossary__index', 'aria-label': t(C.ui.glossaryCategories) },
      h('p', { class: 'eyebrow', text: C.ui.glossaryCategories }),
      h('ol', null, groups.map(group => h('li', null,
        h('a', { href: `#${groupId(group)}`, 'data-glossary-group': groupId(group), text: groupLabel(group) })))));

    const filters = h('div', { class: 'glossary__filters', role: 'group' });
    const list = h('div', { class: 'glossary__groups' });

    function setFilter(group) {
      filters.querySelectorAll('.chip').forEach(chip => chip.setAttribute('aria-pressed', String(chip.dataset.group === group)));
      list.querySelectorAll('.glossary__group').forEach(node => { node.hidden = group !== '*' && node.dataset.group !== group; });
      index.hidden = group !== '*';
    }

    [['*', C.ui.glossaryFilterAll], ...groups.map(group => [group, groupLabel(group)])].forEach(([group, label]) => {
      filters.append(h('button', { class: 'chip', type: 'button', 'data-group': group, 'aria-pressed': String(group === '*'), onclick: () => setFilter(group), text: label }));
    });

    groups.forEach(group => {
      list.append(h('div', { class: 'glossary__group', id: groupId(group), 'data-group': group },
        h('h3', { class: 'glossary__group-title', text: groupLabel(group) }),
        h('div', { class: 'glossary__grid' },
          terms.filter(term => term.gruppe === group).map(term => {
            const refs = String(term.querverweise || '').split(';').map(ref => ref.trim()).filter(Boolean);
            // „Siehe auch“ erscheint erst in der aufgeklappten Vertiefung
            const refsNode = refs.length ? h('p', { class: 'term__refs' },
              h('span', { class: 'eyebrow', text: C.ui.glossarySeeAlso }),
              refs.map(ref => {
                const target = lookup.get(ref.toLowerCase());
                // Im Englischen den englischen Begriff des Ziels zeigen
                return target
                  ? h('a', { class: 'info-link', href: `#${termId(target)}`, text: text(ref, target.term_en) })
                  : h('span', null, ref);
              })) : null;
            const hasMore = term.ebene_2_vertiefung_de || refsNode;
            return h('article', { class: 'term', id: termId(term) },
              h('h4', { class: 'term__title', text: text(term.begriff_de, term.term_en) }),
              h('p', { class: 'term__short', text: text(term.ebene_1_kurzdefinition_de, term.level_1_short_definition_en) }),
              hasMore ? h('details', { class: 'deepdive deepdive--compact' },
                h('summary', { class: 'deepdive__summary' },
                  h('span', { class: 'deepdive__tag', text: C.ui.glossaryMore }),
                  icon('chevron-down', 'deepdive__chevron')),
                h('div', { class: 'deepdive__body' },
                  term.ebene_2_vertiefung_de ? h('p', { text: text(term.ebene_2_vertiefung_de, term.level_2_extended_en) }) : null,
                  refsNode)) : null);
          }))));
    });

    container.append(index, h('div', { class: 'glossary__main' }, filters, list));

    // Querverweis auf einen ausgefilterten Begriff: Filter zurücksetzen
    container.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#glossar-"]:not([data-glossary-group])');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (target && target.closest('.glossary__group').hidden) setFilter('*');
    });

    const groupObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        index.querySelectorAll('a').forEach(link => link.setAttribute('aria-current', String(link.dataset.glossaryGroup === entry.target.id)));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    list.querySelectorAll('.glossary__group').forEach(node => groupObserver.observe(node));

    if (location.hash.startsWith('#glossar-')) document.querySelector(location.hash)?.scrollIntoView();
  }

  // ---------------------------------------------------------------- navigation

  function languageSwitch() {
    if (!(C.site.showLanguageSwitch || params.has('lang'))) return null;
    return h('div', { class: 'station-language-switch', role: 'group', 'aria-label': 'Sprache / Language' },
      C.site.languages.map(lang => h('a', {
        class: `station-language-switch__button${lang === LANG ? ' is-active' : ''}`, href: urlWith({ lang }) + location.hash,
        'aria-current': String(lang === LANG), lang, onclick: () => storeLanguage(lang)
      }, lang.toUpperCase())));
  }

  // URL der aktuellen Seite mit geänderten Parametern (null entfernt einen Parameter)
  function urlWith(changes) {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === null) next.delete(key);
      else next.set(key, value);
    });
    const query = next.toString().replace(/=(&|$)/g, '$1');
    return `${location.pathname}${query ? `?${query}` : ''}`;
  }

  function renderNav(view) {
    const nav = document.getElementById('siteNav');
    const partLinks = view === 'spuren'
      ? [h('li', null, h('a', { class: 'nav-link', href: urlWith({ spuren: null, spur: null }) }, h('span', { class: 'nav-link__label', text: SPUREN.ui.back })))]
      : SECTIONS.filter(section => section.type === 'opener').map(section => h('li', null,
        h('a', { class: 'nav-link', href: `#${section.id}`, 'data-nav': section.id },
          section.numeral ? h('span', { class: 'nav-link__nr' }, section.numeral) : null,
          // Kurzname; beim Überfahren klappt unter der Leiste der volle Titel des Ausstellungsbereichs auf
          h('span', { class: 'nav-link__label', text: section.nav }))));

    nav.append(
      h('div', { class: 'site-nav__bar' },
        h('a', { class: 'site-nav__brand', href: view === 'spuren' ? urlWith({ spuren: null, spur: null }) : '#top', text: C.site.title }),
        h('nav', { class: `site-nav__parts${view === 'spuren' ? ' is-back' : ''}`, 'aria-label': t(C.ui.chapters) }, h('ul', null, partLinks)),
        languageSwitch()),
      h('div', { class: 'site-nav__progress', 'aria-hidden': 'true' }, h('span', { id: 'scrollProgress' })),
      h('div', { class: 'site-nav__drop', 'aria-hidden': 'true' }, h('div', { class: 'site-nav__drop-inner' })));
    initNavExpand(nav);

    document.getElementById('skipLink').textContent = t(C.ui.skip);
  }

  // Überfahrener/fokussierter Navigationspunkt: direkt darunter läuft der volle Titel des
  // Ausstellungsbereichs weiter, bündig mit dem Punkt. Die Wörter fahren nacheinander von unten
  // ein (CSS), beim Wechsel gleitet der Titel unter den neuen Punkt.
  function initNavExpand(nav) {
    const list = nav.querySelector('.site-nav__parts ul');
    const links = [...nav.querySelectorAll('.nav-link[data-nav]')];
    const drop = nav.querySelector('.site-nav__drop');
    const inner = drop.querySelector('.site-nav__drop-inner');
    let current = null;

    const fill = section => {
      const words = t(section.title).split(/\s+/).filter(Boolean);
      inner.replaceChildren(
        h('p', { class: 'site-nav__drop-title' }, words.map((word, index) =>
          h('span', { class: 'site-nav__drop-word', style: `--i: ${index}` }, h('span', null, word)))));
    };

    // Titel bündig unter dem Link beginnen lassen; reicht der Platz bis zum rechten Rand nicht
    // (mind. 20em), rückt er so weit nach links wie nötig
    const place = link => {
      const dropBox = drop.getBoundingClientRect();
      const style = getComputedStyle(drop);
      const padLeft = parseFloat(style.paddingLeft);
      const contentWidth = dropBox.width - padLeft - parseFloat(style.paddingRight);
      const start = link.getBoundingClientRect().left + parseFloat(getComputedStyle(link).paddingLeft) - dropBox.left - padLeft;
      const width = Math.min(contentWidth, Math.max(contentWidth - start, 20 * parseFloat(getComputedStyle(inner).fontSize)));
      inner.style.setProperty('--w', `${width}px`);
      inner.style.setProperty('--x', `${Math.max(0, Math.min(start, contentWidth - width))}px`);
    };

    const open = link => {
      links.forEach(other => other.classList.toggle('is-open', other === link));
      nav.classList.toggle('has-drop', Boolean(link));
      if (!link || link === current) { current = link; return; }
      const section = SECTIONS.find(item => item.id === link.dataset.nav);
      if (!current) inner.classList.add('no-slide'); // beim ersten Aufklappen direkt an Ort und Stelle
      fill(section);
      place(link);
      inner.offsetWidth; // Position übernehmen, bevor die Gleitbewegung wieder eingeschaltet wird
      inner.classList.remove('no-slide');
      current = link;
    };

    links.forEach(link => {
      link.addEventListener('mouseenter', () => open(link));
      link.addEventListener('focus', () => open(link));
      link.addEventListener('blur', () => open(null));
      link.addEventListener('click', () => open(null));
    });
    list.addEventListener('mouseleave', () => { if (!list.contains(document.activeElement)) open(null); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') open(null); });
    window.addEventListener('resize', () => { if (current) place(current); });
  }

  // Aufklappbare Stationsliste unten rechts (LAYER/300)
  function renderStationDock() {
    const unnumbered = Object.entries(C.stations).filter(([, s]) => s.nr == null);
    const rows = [...numbered, ...unnumbered].map(([key, s]) => {
      const target = sectionForStation(key);
      if (!target) return null;
      return h('li', null, h('a', { class: 'station-dock__link', href: `#${target.id}`, 'data-station': key },
        h('span', { class: 'station-dock__nr' }, s.nr == null ? t(s.label) : stationNumber(s)),
        h('span', { class: 'station-dock__title', text: sectionLabel(target) })));
    });

    const panel = h('div', { class: 'station-dock__panel', id: 'stationDockPanel', hidden: true },
      h('p', { class: 'eyebrow', text: C.ui.stations }),
      h('ol', null, rows));
    const current = h('span', { class: 'station-dock__current', id: 'stationDockCurrent' }, '–');
    const toggle = h('button', {
      class: 'station-dock__toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'stationDockPanel',
      title: t(C.ui.stationsOpen)
    }, h('span', { class: 'station-dock__label', text: C.ui.stations }), current, icon('chevron-down', 'station-dock__chevron'));

    const dock = h('div', { class: 'station-dock' }, panel, toggle);
    const setOpen = open => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      dock.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    panel.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
    document.addEventListener('click', event => { if (!dock.contains(event.target)) setOpen(false); });
    document.body.append(dock);
  }

  // Footer in drei Zeilen: Ausstellung + Förderer · SKD-Logo mittig · Leiste mit Impressum und „Nach oben“
  function renderFooter(view) {
    const site = C.site;
    const sponsors = site.sponsors;
    const sponsorTitle = sponsors ? t(sponsors.title).trim() : '';
    const legal = [
      site.imprint && site.showImprint !== false ? h('button', { class: 'site-footer__imprint', type: 'button', onclick: openImprint, text: site.imprint.title }) : null,
      // Versteckter Zugang zu den Krypto-Spuren: nur hier, nicht in der Navigation
      SPUREN && view !== 'spuren' ? h('a', { class: 'site-footer__secret', href: urlWith({ spuren: '', spur: null }), text: C.ui.secret }) : null
    ].filter(Boolean);
    document.getElementById('siteFooter').append(
      h('div', { class: 'site-footer__top' },
        h('div', { class: 'site-footer__info' },
          h('p', { class: 'title site-footer__title', text: site.title }),
          h('p', { text: site.venue }),
          h('p', { class: 'site-footer__runtime' },
            h('span', { class: 'eyebrow', text: C.ui.runtime }),
            h('span', null, `${site.runtime.start} – ${site.runtime.end}`))),
        // Förderer & Partner
        sponsors ? h('div', { class: 'sponsors' },
          sponsorTitle ? h('p', { class: 'eyebrow', text: sponsors.title }) : null,
          h('ul', { class: 'sponsors__list' }, sponsors.items.map(item => {
            const content = item.logo
              ? h('img', { src: item.logo, alt: t(item.name) })
              : h('span', { class: 'sponsors__placeholder' }, `${t(C.ui.logoPending)} · ${t(item.name)}`);
            return h('li', { class: 'sponsors__item' },
              item.url ? h('a', { href: item.url, target: '_blank', rel: 'noopener' }, content) : content);
          }))) : null),
      site.logo ? h('div', { class: 'site-footer__logo' },
        h('a', { href: site.logo.url || null, target: site.logo.url ? '_blank' : null, rel: site.logo.url ? 'noopener' : null },
          h('img', { src: site.logo.src, alt: t(site.logo.alt) }))) : null,
      // „Nach oben“ über der Linie, darunter die Leiste (nur wenn sie etwas enthält)
      h('div', { class: 'site-footer__end' },
        h('a', { class: 'nav-link site-footer__totop', href: '#top' }, icon('arrow-up'), h('span', { text: C.ui.toTop })),
        legal.length ? h('div', { class: 'site-footer__bar' }, h('div', { class: 'site-footer__legal' }, legal)) : null));
  }

  // Impressum als eigenes Fenster (LAYER/400), Inhalt aus site.imprint
  let imprintDialog = null;

  function openImprint() {
    if (!imprintDialog) {
      const imprint = C.site.imprint;
      imprintDialog = h('dialog', { class: 'imprint', 'aria-labelledby': 'imprintTitle' },
        h('div', { class: 'imprint__panel' },
          h('div', { class: 'imprint__head' },
            h('h2', { class: 'title imprint__title', id: 'imprintTitle', text: imprint.title }),
            h('button', { class: 'close-btn', type: 'button', 'aria-label': t(C.ui.close), onclick: () => imprintDialog.close() }, icon('x'))),
          h('div', { class: 'imprint__body' },
            imprint.blocks.map(block => h('section', { class: 'imprint__block' },
              h('p', { class: 'eyebrow', text: block.heading }),
              h('p', { class: 'imprint__text', text: block.text }))))));
      imprintDialog.addEventListener('click', event => { if (event.target === imprintDialog) imprintDialog.close(); });
      document.body.append(imprintDialog);
    }
    imprintDialog.showModal();
  }

  // ---------------------------------------------------------------- Mining-Geräte: Schaubild

  // Grundriss der „Gläsernen Münze“ nach dem Ausstellungsplan, rechts daneben die drei Sockel
  // untereinander, ohne Überschneidung mit der Münze.
  // Koordinaten im viewBox 0 0 840 720. Schlüssel = "kicker" der Geräte in content.js.
  // shapes: ['rect', x, y, Breite, Höhe] oder ['circle', x, y, Radius]; labels: [Text, x, y, Ausrichtung]
  // Bei Sockeln sind die shapes relativ zur linken oberen Ecke des Sockels.
  const MINER_MAP = {
    viewBox: '0 0 840 720',
    coin: { cx: 330, cy: 350, r: 320 },
    // gepunktet: übrige Einbauten der Münze (nicht klickbar)
    fixtures: [[251, 196, 164, 114], [57, 319, 164, 113], [277, 342, 110, 62], [442, 317, 164, 114], [250, 437, 164, 113]],
    pedestalSize: 120,
    targets: {
      '01': { shapes: [['rect', 121, 150, 69, 116]], labels: [['I', 155, 136, 'middle']] },
      '02': { shapes: [['rect', 315, 89, 36, 68], ['rect', 509, 202, 35, 70]], labels: [['IIa', 361, 129, 'start'], ['IIb', 554, 244, 'start']] },
      '03': { shapes: [['rect', 75, 503, 19, 19]], labels: [['III', 84, 489, 'middle']] },
      '04': { shapes: [['rect', 110, 498, 58, 24]], labels: [['IV', 139, 489, 'middle']] },
      '05': { shapes: [['rect', 495, 495, 24, 43], ['rect', 534, 495, 24, 43]], labels: [['V', 526, 482, 'middle']] },
      // Sockel links, Mitte, rechts mit angedeutetem Gerät; Beschriftung = erste Zeile des Objektschilds
      '06': { pedestal: [690, 60], shapes: [['rect', 45, 15, 30, 90]] },
      '07': {
        pedestal: [690, 270],
        shapes: [['rect', 28, 30, 64, 60],
          ...[0, 1, 2].flatMap(col => [0, 1].map(row => ['rect', 37 + col * 17, 41 + row * 20, 11, 11]))]
      },
      '08': { pedestal: [690, 480], shapes: [['rect', 20, 21, 80, 78], ['circle', 60, 60, 24]] }
    }
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs, ...children) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => { if (value != null) node.setAttribute(key, value); });
    children.flat(Infinity).forEach(child => { if (child != null) node.append(child); });
    return node;
  }

  function mapShape([type, a, b, c, d]) {
    return type === 'circle'
      ? svg('circle', { class: 'miner-map__shape', cx: a, cy: b, r: c })
      : svg('rect', { class: 'miner-map__shape', x: a, y: b, width: c, height: d });
  }

  function shapesBox(shapes) {
    const boxes = shapes.map(([type, a, b, c, d]) => type === 'circle' ? [a - c, b - c, a + c, b + c] : [a, b, a + c, b + d]);
    const [x1, y1] = [Math.min(...boxes.map(box => box[0])), Math.min(...boxes.map(box => box[1]))];
    const [x2, y2] = [Math.max(...boxes.map(box => box[2])), Math.max(...boxes.map(box => box[3]))];
    return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
  }

  function minerMap(section, items, onSelect) {
    const size = MINER_MAP.pedestalSize;
    const pedestals = [];
    const coinTargets = [];
    items.forEach((item, index) => {
      const spec = MINER_MAP.targets[item.kicker];
      if (!spec) return;
      const labels = (spec.labels || []).map(([text, x, y, anchor]) => svg('text', { class: 'miner-map__label', x, y, 'text-anchor': anchor }, text));
      let base;
      if (spec.pedestal) {
        base = svg('rect', { class: 'miner-map__pedestal', x: 0, y: 0, width: size, height: size });
        labels.push(svg('text', { class: 'miner-map__label', x: size / 2, y: size + 26, 'text-anchor': 'middle' }, (pick(item.museumLabel).value || [])[0] || ''));
      } else {
        // unsichtbare, größere Trefferfläche, damit auch kleine Geräte gut zu treffen sind
        const box = shapesBox(spec.shapes);
        base = svg('rect', { class: 'miner-map__hit', x: box.x - 14, y: box.y - 14, width: box.width + 28, height: box.height + 28 });
      }
      const target = svg('g', {
        class: 'miner-map__target', role: 'button', tabindex: 0, 'data-kicker': item.kicker, 'aria-pressed': 'false',
        'aria-label': `${(pick(item.museumLabel).value || [])[0] || item.kicker} · ${pick(item.title).value}`, style: `--i: ${index}`,
        transform: spec.pedestal ? `translate(${spec.pedestal[0]} ${spec.pedestal[1]})` : null
      }, base, spec.shapes.map(mapShape), labels);
      target.addEventListener('click', () => onSelect(item.kicker, true));
      target.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(item.kicker, true); }
      });
      (spec.pedestal ? pedestals : coinTargets).push(target);
    });

    const { cx, cy, r } = MINER_MAP.coin;
    return h('div', { class: 'miner-map is-hinting' },
      svg('svg', { class: 'miner-map__svg', viewBox: MINER_MAP.viewBox, role: 'group', 'aria-label': t(section.title) },
        svg('circle', { class: 'miner-map__coin', cx, cy, r }),
        MINER_MAP.fixtures.map(([x, y, width, height]) => svg('rect', { class: 'miner-map__fixture', x, y, width, height })),
        coinTargets,
        pedestals),
      h('p', { class: 'miner-map__hint', text: C.ui.minersHint }));
  }

  // ---------------------------------------------------------------- Schlossspuren (versteckt)

  const spurId = nr => `spur-${String(nr).padStart(2, '0')}`;

  function spurLabel(item) {
    return `${t(SPUREN.ui.trace)} ${String(item.nr).padStart(2, '0')}`;
  }

  function spurImage(image) {
    if (image && image.src) return h('figure', { class: 'spur__image' }, h('img', { src: image.src, alt: t(image.alt), loading: 'lazy' }));
    return h('figure', { class: 'spur__image spur__image--pending' }, h('span', { class: 'eyebrow', text: SPUREN.ui.imagePending }));
  }

  // Mehrere Bilder: ein Bild im festen Rahmen, darunter Vorschaubilder zum Umschalten.
  // Klick aufs große Bild schaltet zum nächsten.
  function spurGallery(images) {
    if (images.length < 2) return images.map(spurImage);
    const slides = images.map((image, index) => h('img', {
      class: 'spur__slide', src: image.src, alt: t(image.alt), loading: 'lazy', 'aria-hidden': String(index > 0)
    }));
    const thumbs = images.map((image, index) => h('button', {
      class: 'spur__thumb', type: 'button', 'aria-pressed': String(index === 0),
      'aria-label': `${t(SPUREN.ui.image)} ${index + 1} / ${images.length}`, onclick: () => show(index)
    }, h('img', { src: image.src, alt: '', loading: 'lazy' })));
    let current = 0;
    function show(index) {
      current = index;
      slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
      thumbs.forEach((thumb, i) => thumb.setAttribute('aria-pressed', String(i === index)));
    }
    return h('div', { class: 'spur__gallery' },
      h('div', { class: 'spur__stage', onclick: () => show((current + 1) % images.length) }, slides),
      h('div', { class: 'spur__thumbs', role: 'group', 'aria-label': t(SPUREN.ui.images) }, thumbs));
  }

  function renderSpuren(main) {
    main.append(
      h('section', { class: 'opener', id: 'top' },
        h('div', { class: 'opener__banner' },
          h('div', { class: 'opener__label' }, SPUREN.eyebrow ? h('span', { text: SPUREN.eyebrow }) : null),
          h('h1', { class: 'title opener__title', text: SPUREN.title }),
          SPUREN.intro ? h('div', { class: 'opener__hinge prose prose--lead', ...draftProps(SPUREN.intro.draft) }, paragraphs(SPUREN.intro.text)) : null)),
      ...SPUREN.items.map((item, index) => h('section', { class: 'chapter chapter--spur', id: spurId(item.nr), ...draftProps(item.draft) },
        h('div', { class: 'chapter__head' },
          h('div', { class: 'chapter__meta' },
            h('span', { class: 'station-marker' },
              h('span', { class: 'station-marker__station' }, spurLabel(item)),
              h('span', { class: 'station-marker__topic', text: SPUREN.title }))),
          h('h2', { class: `title chapter__title ${titleSize(item.title)}`, text: item.title })),
        // Bildspalte: Bilder, darunter das Objektschild (description)
        h('div', { class: 'chapter__visual spur__images' },
          spurGallery(item.images || []),
          h('p', { class: 'spur__description', text: item.description })),
        h('div', { class: 'chapter__main' },
          h('div', { class: 'prose' }, paragraphs(item.text)),
          h('div', { class: 'spur__actions' }, spurWebsiteButton())),
        spurNext(SPUREN.items[index + 1]))));

    // ?spur=3 (per QR-Code): die Spur steht allein wie eine einzelne Seite
    const requested = SPUREN.items.find(item => String(item.nr) === params.get('spur'));
    if (requested) initSpurFocus(requested);
  }

  // Einstieg per QR-Code: Nur die aufgerufene Spur ist zu sehen. Erst kräftiges
  // Weiterscrollen am Seitenende (Mausrad/Trackpad bzw. Wischen) oder der Button
  // „Weitere Spuren“ öffnet die übrigen Spuren; danach scrollt die Seite ganz normal.
  // Einstieg über den Footer (?spuren) = gleich die normale, frei scrollbare Seite.
  const PULL_WHEEL = 500; // Scrollweg in px, der am Seitenende gesammelt werden muss
  const PULL_TOUCH = 140; // Wischweg in px am Seitenende

  function initSpurFocus(item) {
    const section = document.getElementById(spurId(item.nr));
    const nextLink = section.querySelector('.spur__next');
    const next = SPUREN.items[SPUREN.items.indexOf(item) + 1];
    let pull = 0;
    let armed = false;
    let lastWheel = 0;
    let wheelReset = null;
    let touchStart = null;

    section.classList.add('is-focus');
    ROOT.classList.add('is-spur-focus');
    scrollTo({ top: 0, behavior: 'instant' });

    const atEnd = () => innerHeight + scrollY >= ROOT.scrollHeight - 4;
    const setPull = value => {
      pull = Math.max(0, value);
      nextLink.style.setProperty('--pull', Math.min(1, pull).toFixed(3));
    };

    function onWheel(event) {
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      if (event.deltaY <= 0 || !atEnd()) { armed = false; setPull(0); return; }
      // Nachlaufender Schwung vom Scrollen bis ans Ende zählt nicht: erst eine neue Geste
      if (!armed) { if (gap < 250) return; armed = true; }
      clearTimeout(wheelReset);
      wheelReset = setTimeout(() => setPull(0), 350);
      setPull(pull + (event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY) / PULL_WHEEL);
      if (pull >= 1) release();
    }
    function onTouchStart(event) { touchStart = atEnd() ? event.touches[0].clientY : null; }
    function onTouchMove(event) { if (touchStart !== null) setPull((touchStart - event.touches[0].clientY) / PULL_TOUCH); }
    function onTouchEnd() {
      if (touchStart === null) return;
      touchStart = null;
      if (pull >= 1) release(); else setPull(0);
    }
    function onNextClick(event) { event.preventDefault(); release(); }

    function release() {
      removeEventListener('wheel', onWheel);
      removeEventListener('touchstart', onTouchStart);
      removeEventListener('touchmove', onTouchMove);
      removeEventListener('touchend', onTouchEnd);
      nextLink.removeEventListener('click', onNextClick);
      clearTimeout(wheelReset);
      setPull(0);
      // Übrige Spuren einblenden, ohne dass die aktuelle Spur springt, dann weiter zur nächsten
      const before = section.getBoundingClientRect().top;
      ROOT.classList.remove('is-spur-focus');
      scrollBy({ top: section.getBoundingClientRect().top - before, behavior: 'instant' });
      const target = document.getElementById(next ? spurId(next.nr) : 'top');
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' });
    }

    addEventListener('wheel', onWheel, { passive: true });
    addEventListener('touchstart', onTouchStart, { passive: true });
    addEventListener('touchmove', onTouchMove, { passive: true });
    addEventListener('touchend', onTouchEnd);
    nextLink.addEventListener('click', onNextClick);
  }

  // Button zur Ausstellungswebsite unter jeder Spur (Ziel: SPUREN.websiteUrl, sonst dieser Onepager)
  function spurWebsiteButton() {
    return h('a', { class: 'cta', href: SPUREN.websiteUrl || urlWith({ spuren: null, spur: null }) },
      h('span', { class: 'cta__label', text: SPUREN.ui.website }),
      h('span', { class: 'cta__icon' }, icon('arrow-right')));
  }

  // Animierter Pfeil am unteren Rand: zur nächsten Spur, nach der letzten zurück zur Übersicht
  function spurNext(next) {
    return h('a', { class: `spur__next${next ? '' : ' is-last'}`, href: next ? `#${spurId(next.nr)}` : '#top' },
      h('span', { class: 'spur__next-label', text: next ? SPUREN.ui.next : SPUREN.ui.toOverview }),
      icon(next ? 'arrow-down' : 'arrow-up', 'spur__next-icon'));
  }

  // Aktiven Teil, aktive Station und aktives Longread-Kapitel markieren
  function observeScroll() {
    const partOf = {};
    let currentPart = null;
    SECTIONS.forEach(section => {
      if (section.nav) currentPart = section.id;
      partOf[section.id] = currentPart;
    });

    const byId = Object.fromEntries(SECTIONS.map(section => [section.id, section]));
    const setCurrent = (selector, attr, value) => document.querySelectorAll(selector).forEach(link => {
      link.setAttribute('aria-current', String(link.getAttribute(attr) === value));
    });

    const sectionObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        const section = byId[entry.target.id];
        if (!section) return;
        setCurrent('[data-nav]', 'data-nav', partOf[section.id]);
        setCurrent('[data-station]', 'data-station', section.station || '');
        const dockCurrent = document.getElementById('stationDockCurrent');
        const current = section.station && station(section.station);
        if (dockCurrent) dockCurrent.textContent = current ? (current.nr == null ? t(current.label) : stationNumber(current)) : '–';
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(section => {
      const node = document.getElementById(section.id);
      if (node) sectionObserver.observe(node);
    });

    const partObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        setCurrent('[data-longread-link]', 'data-longread-link', entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.longread__part').forEach(node => partObserver.observe(node));

    const bar = document.getElementById('scrollProgress');
    let frame = null;
    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    };
    addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  // ---------------------------------------------------------------- parallax (Hero)

  // Die Ebenen im Hero wandern beim Scrollen unterschiedlich schnell mit:
  // data-depth = Anteil der Bühnenhöhe, um den sich die Ebene bis zum Verlassen
  // des Bildschirms verschiebt; "auto" = genau um ihren Überstand über die Bühne,
  // so bleibt das Bild in voller Breite ohne sichtbare Kante.
  // Nur Verschiebung, kein Zoom und keine Unschärfe (DNA6).
  function initParallax() {
    const stage = document.querySelector('[data-parallax]');
    if (!stage) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const layers = [...stage.querySelectorAll('[data-depth]')];
    let frame = null;

    const update = () => {
      frame = null;
      const rect = stage.getBoundingClientRect();
      if (motion.matches) {
        layers.forEach(layer => { layer.style.transform = ''; });
        return;
      }
      if (rect.bottom < 0) return;
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      layers.forEach(layer => {
        const travel = layer.dataset.depth === 'auto'
          ? Math.max(layer.offsetHeight - rect.height, 0)
          : rect.height * Number(layer.dataset.depth);
        const offset = progress * travel;
        layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };

    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    motion.addEventListener('change', request);
    update();
  }

  // ---------------------------------------------------------------- overlay (LAYER/400)

  const overlay = document.getElementById('overlay');
  let overlayResize = null;

  function buildOverlay() {
    overlay.append(h('div', { class: 'overlay__panel' },
      h('div', { class: 'overlay__head' },
        h('div', { class: 'overlay__marker' }),
        h('h2', { class: 'overlay__title visually-hidden', id: 'overlayTitle' }),
        h('button', { class: 'close-btn', type: 'button', 'aria-label': t(C.ui.close), onclick: closeOverlay }, icon('x'))),
      h('div', { class: 'overlay__stage' },
        h('div', { class: 'overlay__viewport' },
          h('iframe', { title: '', allow: 'fullscreen' })))));

    overlay.addEventListener('click', event => { if (event.target === overlay) closeOverlay(); });
    // Esc innerhalb der eingebetteten Station (stations/embed.js)
    addEventListener('message', event => {
      if (event.origin === location.origin && event.data && event.data.type === 'kw-overlay-close' && overlay.open) closeOverlay();
    });
    overlay.addEventListener('close', () => {
      overlay.querySelector('iframe').src = 'about:blank';
      if (overlayResize) overlayResize.disconnect();
    });
  }

  function fitOverlay() {
    const stage = overlay.querySelector('.overlay__stage');
    const viewport = overlay.querySelector('.overlay__viewport');
    const iframe = overlay.querySelector('iframe');
    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;
    if (!stageWidth || !stageHeight) return;
    // Die Station bekommt eine Fläche im Seitenverhältnis der Bühne, damit sie diese ganz füllt:
    // Hochformat → 600 px breit (Handy-Layouts der Stationen), sonst mindestens 1536 × 864.
    let width;
    let height;
    if (stageWidth / stageHeight < 0.8) {
      width = OVERLAY_PORTRAIT_WIDTH;
      height = Math.round(width * stageHeight / stageWidth);
    } else if (stageWidth / stageHeight > OVERLAY_SIZE[0] / OVERLAY_SIZE[1]) {
      height = OVERLAY_SIZE[1];
      width = Math.round(height * stageWidth / stageHeight);
    } else {
      width = OVERLAY_SIZE[0];
      height = Math.round(width * stageHeight / stageWidth);
    }
    const scale = Math.min(stageWidth / width, stageHeight / height, OVERLAY_MAX_SCALE);
    viewport.style.width = `${width * scale}px`;
    viewport.style.height = `${height * scale}px`;
    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
    iframe.style.transform = `scale(${scale})`;
  }

  function openOverlay(action, section) {
    const marker = overlay.querySelector('.overlay__marker');
    marker.replaceChildren(section.station ? stationMarker(section.station) : '');
    setText(overlay.querySelector('.overlay__title'), action.label);
    const iframe = overlay.querySelector('iframe');
    iframe.title = t(action.label);
    // Sprache der Website an die Station weitergeben
    iframe.src = `${action.src}${action.src.includes('?') ? '&' : '?'}lang=${LANG}`;
    overlay.showModal();
    fitOverlay();
    overlayResize = new ResizeObserver(fitOverlay);
    overlayResize.observe(overlay.querySelector('.overlay__stage'));
  }

  function closeOverlay() {
    overlay.close();
  }

  // ---------------------------------------------------------------- init

  const main = document.getElementById('content');
  // Versteckte Ansicht „Schlossspuren“: index.html?spuren bzw. ?spur=3
  const view = SPUREN && (params.has('spuren') || params.has('spur')) ? 'spuren' : 'main';

  if (view === 'spuren') {
    ROOT.classList.add('is-spuren');
    document.title = `${t(SPUREN.title)} · ${t(C.site.title)}`;
    renderSpuren(main);
  } else {
    if (C.site.pageTitle) document.title = t(C.site.pageTitle);
    if (C.site.description) document.querySelector('meta[name="description"]')?.setAttribute('content', t(C.site.description));
    SECTIONS.forEach((section, index) => {
      const render = renderers[section.type];
      if (!render) { console.warn('Unbekannter Abschnittstyp:', section.type); return; }
      main.append(render(section, index));
    });
  }

  renderNav(view);
  renderFooter(view);
  if (view === 'main') {
    renderStationDock();
    buildOverlay();
    initParallax();
  }
  observeScroll();

  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
})();
