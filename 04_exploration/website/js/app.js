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
  const OVERLAY_SIZE = [1536, 864]; // Designgröße der Tablet-Stationen

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
    'arrow-up': ['M12 5l0 14', 'M18 11l-6 -6', 'M6 11l6 -6']
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

  function stationNumber(s) {
    return String(s.nr).padStart(2, '0');
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
      const parts = SECTIONS.filter(item => item.type === 'opener');
      const count = `${String(parts.indexOf(section) + 1).padStart(2, '0')} / ${String(parts.length).padStart(2, '0')}`;
      return h('section', { class: 'opener', id: section.id },
        h('div', { class: 'opener__banner' },
          h('div', { class: 'opener__label' },
            h('span', null, `${t(C.ui.part)} ${section.numeral}`),
            h('span', { class: 'opener__count', 'aria-hidden': 'true' }, count)),
          h('h2', { class: `title opener__title ${titleSize(section.title)}`, text: section.title }),
          section.hinge ? h('div', { class: 'opener__hinge prose prose--lead', ...draftProps(section.hinge.draft) },
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
      const video = h('video', { class: 'film__video', src: section.src, controls: true, muted: true, playsinline: true, preload: 'metadata' });
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

    catalog(section) {
      return h('section', { class: 'chapter chapter--catalog', id: section.id },
        chapterHead(section),
        h('div', { class: 'prose prose--story' }, paragraphs(section.text)),
        section.groups.map(group => h('div', { class: 'catalog__group split' },
          h('h3', { class: 'catalog__group-title', text: group.title }),
          h('div', { class: 'catalog' },
            group.items.map(item => h('article', { class: 'device', id: `${section.id}-${item.kicker}` },
              h('span', { class: 'device__nr' }, item.kicker),
              h('h4', { class: 'device__title', text: item.title }),
              h('ul', { class: 'device__label' }, (pick(item.museumLabel).value || []).map((line, i, lines) => h('li', null, line))),
              item.storyTitle ? h('p', { class: 'device__story', text: item.storyTitle }) : null,
              h('div', { class: 'device__text' }, paragraphs(item.text)),
              h('ul', { class: 'device__details' }, (pick(item.museumDetails).value || []).map(line => h('li', null, line)))))))));
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

    // Mitfahrende Kategorien in der linken Spalte (nur bei „Alle“)
    const index = h('nav', { class: 'glossary__index', 'aria-label': t(C.ui.glossaryCategories) },
      h('p', { class: 'eyebrow', text: C.ui.glossaryCategories }),
      h('ol', null, groups.map(group => h('li', null,
        h('a', { href: `#${groupId(group)}`, 'data-glossary-group': groupId(group), text: { de: group, en: '' } })))));

    const filters = h('div', { class: 'glossary__filters', role: 'group' });
    const list = h('div', { class: 'glossary__groups' });

    function setFilter(group) {
      filters.querySelectorAll('.chip').forEach(chip => chip.setAttribute('aria-pressed', String(chip.dataset.group === group)));
      list.querySelectorAll('.glossary__group').forEach(node => { node.hidden = group !== '*' && node.dataset.group !== group; });
      index.hidden = group !== '*';
    }

    [['*', C.ui.glossaryFilterAll], ...groups.map(group => [group, { de: group, en: '' }])].forEach(([group, label]) => {
      filters.append(h('button', { class: 'chip', type: 'button', 'data-group': group, 'aria-pressed': String(group === '*'), onclick: () => setFilter(group), text: label }));
    });

    groups.forEach(group => {
      list.append(h('div', { class: 'glossary__group', id: groupId(group), 'data-group': group },
        h('h3', { class: 'glossary__group-title', text: { de: group, en: '' } }),
        h('div', { class: 'glossary__grid' },
          terms.filter(term => term.gruppe === group).map(term => {
            const refs = String(term.querverweise || '').split(';').map(ref => ref.trim()).filter(Boolean);
            // „Siehe auch“ erscheint erst in der aufgeklappten Vertiefung
            const refsNode = refs.length ? h('p', { class: 'term__refs' },
              h('span', { class: 'eyebrow', text: C.ui.glossarySeeAlso }),
              refs.map(ref => {
                const target = lookup.get(ref.toLowerCase());
                return target ? h('a', { class: 'info-link', href: `#${termId(target)}` }, ref) : h('span', null, ref);
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
          h('span', { class: 'nav-link__label', text: section.nav }))));

    nav.append(
      h('div', { class: 'site-nav__bar' },
        h('a', { class: 'site-nav__brand', href: view === 'spuren' ? urlWith({ spuren: null, spur: null }) : '#top', text: C.site.title }),
        h('nav', { class: `site-nav__parts${view === 'spuren' ? ' is-back' : ''}`, 'aria-label': t(C.ui.chapters) }, h('ul', null, partLinks)),
        languageSwitch()),
      h('div', { class: 'site-nav__progress', 'aria-hidden': 'true' }, h('span', { id: 'scrollProgress' })));

    document.getElementById('skipLink').textContent = t(C.ui.skip);
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

  function renderFooter(view) {
    const site = C.site;
    const sponsors = site.sponsors;
    document.getElementById('siteFooter').append(
      sponsors ? h('div', { class: 'sponsors' },
        h('p', { class: 'eyebrow', text: sponsors.title }),
        h('ul', { class: 'sponsors__list' }, sponsors.items.map(item => {
          const content = item.logo
            ? h('img', { src: item.logo, alt: item.name })
            : h('span', { class: 'sponsors__placeholder' }, `${t(C.ui.logoPending)} · ${item.name}`);
          return h('li', { class: 'sponsors__item' },
            item.url ? h('a', { href: item.url, target: '_blank', rel: 'noopener' }, content) : content);
        }))) : null,
      h('div', { class: 'site-footer__grid' },
        h('div', null,
          h('p', { class: 'title site-footer__title', text: site.title }),
          h('p', { text: site.institution }),
          h('p', { text: site.venue })),
        h('div', null,
          h('p', { class: 'eyebrow', text: C.ui.runtime }),
          h('p', null, `${site.runtime.start} – ${site.runtime.end}`)),
        h('div', { class: 'site-footer__links' },
          // Versteckter Zugang zu den Schlossspuren: nur hier, nicht in der Navigation
          SPUREN && view !== 'spuren' ? h('a', { class: 'site-footer__secret', href: urlWith({ spuren: '', spur: null }), text: C.ui.secret }) : null,
          h('a', { class: 'nav-link', href: '#top' }, icon('arrow-up'), h('span', { text: C.ui.toTop })))));
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

  function renderSpuren(main) {
    main.append(
      h('section', { class: 'opener', id: 'top' },
        h('div', { class: 'opener__banner' },
          h('div', { class: 'opener__label' }, h('span', { text: SPUREN.eyebrow })),
          h('h1', { class: 'title opener__title', text: SPUREN.title }),
          SPUREN.intro ? h('div', { class: 'opener__hinge prose prose--lead', ...draftProps(SPUREN.intro.draft) }, paragraphs(SPUREN.intro.text)) : null),
        h('nav', { class: 'spuren__index', 'aria-label': t(SPUREN.ui.overview) },
          h('ol', null, SPUREN.items.map(item => h('li', null,
            h('a', { href: `#${spurId(item.nr)}` },
              h('span', { class: 'spuren__index-nr' }, String(item.nr).padStart(2, '0')),
              h('span', { text: item.title }))))))),
      ...SPUREN.items.map(item => h('section', { class: 'chapter chapter--spur', id: spurId(item.nr), ...draftProps(item.draft) },
        h('div', { class: 'chapter__head' },
          h('div', { class: 'chapter__meta' },
            h('span', { class: 'station-marker' },
              h('span', { class: 'station-marker__station' }, spurLabel(item)),
              h('span', { class: 'station-marker__topic', text: SPUREN.title }))),
          h('h2', { class: `title chapter__title ${titleSize(item.title)}`, text: item.title })),
        h('div', { class: 'chapter__visual spur__images' }, (item.images || []).map(spurImage)),
        h('div', { class: 'chapter__main' },
          h('p', { class: 'spur__description', text: item.description }),
          h('div', { class: 'prose' }, paragraphs(item.text))))));

    // ?spur=3 springt direkt zur Spur
    const requested = params.get('spur');
    if (requested) document.getElementById(spurId(requested))?.scrollIntoView();
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
    const [width, height] = OVERLAY_SIZE;
    const scale = Math.min(stage.clientWidth / width, stage.clientHeight / height, 1);
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
