'use strict';

/**
 * Station off-canvas: reading layer that slides in from the left (default)
 * or from the right (options.side = 'right').
 * Builds its own markup; a station only passes a trigger button and content
 * per language. Usage and content format: shared/README.md.
 * Styles: shared/css/station-offcanvas.css.
 */
(function () {
  const ROOT = document.documentElement;

  const DEFAULT_LABELS = {
    de: { open: 'Weiterlesen', close: 'Schließen', eyebrow: 'Hintergrund', region: 'Vollständiger Einführungstext' },
    en: { open: 'Read more', close: 'Close', eyebrow: 'Background', region: 'Full introduction' }
  };

  const CLOSE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>';

  const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  let instanceCount = 0;

  function currentLanguage() {
    return ROOT.dataset.language === 'en' ? 'en' : 'de';
  }

  function resolveElement(value) {
    return typeof value === 'string' ? document.querySelector(value) : value || null;
  }

  function toList(value) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function appendParagraphs(target, text, className) {
    toList(text).forEach(value => target.appendChild(element('p', className, value)));
  }

  // Scrolling stays native (touch, wheel); the thumb mirrors the position and can be dragged.
  function initScrollIndicator(scroller, track, thumb) {
    let dragOffset = 0;
    function update() {
      const trackHeight = track.clientHeight;
      const scrollRange = scroller.scrollHeight - scroller.clientHeight;
      track.hidden = scrollRange <= 1;
      if (track.hidden) return;
      const minThumb = parseFloat(getComputedStyle(thumb).minHeight) || 0;
      const thumbHeight = Math.max(minThumb, trackHeight * scroller.clientHeight / scroller.scrollHeight);
      const thumbTop = scroller.scrollTop / scrollRange * Math.max(0, trackHeight - thumbHeight);
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    }
    function scrollToPointer(clientY) {
      const thumbRange = track.clientHeight - thumb.offsetHeight;
      const thumbTop = Math.max(0, Math.min(thumbRange, clientY - track.getBoundingClientRect().top - dragOffset));
      scroller.scrollTop = thumbRange > 0 ? thumbTop / thumbRange * (scroller.scrollHeight - scroller.clientHeight) : 0;
    }
    scroller.addEventListener('scroll', update, { passive: true });
    track.addEventListener('pointerdown', event => {
      const thumbRect = thumb.getBoundingClientRect();
      const onThumb = event.clientY >= thumbRect.top && event.clientY <= thumbRect.bottom;
      dragOffset = onThumb ? event.clientY - thumbRect.top : thumb.offsetHeight / 2;
      track.setPointerCapture(event.pointerId);
      track.classList.add('is-dragging');
      scrollToPointer(event.clientY);
    });
    track.addEventListener('pointermove', event => {
      if (track.hasPointerCapture(event.pointerId)) scrollToPointer(event.clientY);
    });
    const stopDragging = () => track.classList.remove('is-dragging');
    track.addEventListener('pointerup', stopDragging);
    track.addEventListener('pointercancel', stopDragging);
    // Size changes (layer opens, language switch) re-measure the content.
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    new MutationObserver(() => {
      Array.from(scroller.children).forEach(child => observer.observe(child));
      update();
    }).observe(scroller, { childList: true });
    update();
    return update;
  }

  function buildMarkup(id) {
    const overlay = element('div', 'station-offcanvas');
    overlay.id = id;
    overlay.hidden = true;

    const panel = element('section', 'station-offcanvas__panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', `${id}Title`);

    const header = element('header', 'station-offcanvas__header');
    const heading = element('div', 'station-offcanvas__heading');
    const eyebrow = element('p', 'station-offcanvas__eyebrow');
    const title = element('h2', 'station-offcanvas__title');
    title.id = `${id}Title`;
    heading.append(eyebrow, title);

    const closeButton = element('button', 'station-offcanvas__close');
    closeButton.type = 'button';
    closeButton.innerHTML = CLOSE_ICON;
    header.append(heading, closeButton);

    const scroll = element('div', 'station-offcanvas__scroll');
    const body = element('div', 'station-offcanvas__body');
    body.tabIndex = 0;
    body.setAttribute('role', 'region');
    const track = element('div', 'station-offcanvas__scrollbar');
    track.setAttribute('aria-hidden', 'true');
    const thumb = element('div', 'station-offcanvas__scrollbar-thumb');
    track.appendChild(thumb);
    scroll.append(body, track);

    panel.append(header, scroll);
    overlay.appendChild(panel);
    return { overlay, panel, eyebrow, title, closeButton, body, track, thumb };
  }

  // Collapsible blue deep-dive box (as in Station 08): kicker and title in the button,
  // plus/minus on the right, text below. Only one open at a time; the opened one moves to the top.
  // Opening and closing animate the height (CSS: grid rows, --duration-5).
  function appendAccordionItem(body, section, sectionId) {
    const item = element('section', 'station-offcanvas__accordion');
    const header = element('button', 'station-offcanvas__accordion-header');
    header.type = 'button';
    header.id = `${sectionId}Header`;
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', `${sectionId}Panel`);
    if (section.kicker) header.appendChild(element('span', 'station-offcanvas__accordion-kicker', section.kicker));
    header.appendChild(element('span', 'station-offcanvas__accordion-title', section.title));

    // Panel (grid, animates 0fr ↔ 1fr) > clip (overflow hidden) > content (padding, paragraphs).
    const panel = element('div', 'station-offcanvas__accordion-panel');
    panel.id = `${sectionId}Panel`;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', header.id);
    const clip = element('div', 'station-offcanvas__accordion-clip');
    const content = element('div', 'station-offcanvas__accordion-content');
    appendParagraphs(content, section.text);
    clip.appendChild(content);
    panel.appendChild(clip);

    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') !== 'true';
      collapseAccordions(body);
      header.setAttribute('aria-expanded', String(isOpen));
      item.classList.toggle('is-open', isOpen);
      if (isOpen) scrollAlong(body, item, panel);
    });

    item.append(header, panel);
    body.appendChild(item);
  }

  // Moves the opened box to the top while the boxes animate. The target is measured every
  // frame, because a box above may be closing at the same time.
  function scrollAlong(body, item, panel) {
    cancelAnimationFrame(body.accordionScroll);
    const duration = parseFloat(getComputedStyle(panel).transitionDuration) * 1000 || 0;
    const startTop = body.scrollTop;
    const startTime = performance.now();
    // Keep the body's top padding above the opened box.
    const target = () => item.offsetTop - body.offsetTop - parseFloat(getComputedStyle(body).paddingTop);
    const step = now => {
      const progress = duration ? Math.min(1, (now - startTime) / duration) : 1;
      const eased = 1 - Math.pow(1 - progress, 3);
      body.scrollTop = startTop + (target() - startTop) * eased;
      if (progress < 1) body.accordionScroll = requestAnimationFrame(step);
    };
    body.accordionScroll = requestAnimationFrame(step);
    // A touch or wheel by the visitor takes over the scrolling.
    const stop = () => cancelAnimationFrame(body.accordionScroll);
    body.addEventListener('pointerdown', stop, { once: true });
    body.addEventListener('wheel', stop, { once: true, passive: true });
  }

  function collapseAccordions(body) {
    body.querySelectorAll('.station-offcanvas__accordion').forEach(item => {
      item.classList.remove('is-open');
      item.querySelector('.station-offcanvas__accordion-header').setAttribute('aria-expanded', 'false');
    });
  }

  function renderBody(body, content, id) {
    body.replaceChildren();
    appendParagraphs(body, content.lead, 'station-offcanvas__lead');

    toList(content.sections).forEach((section, index) => {
      if (section.collapsible && section.title) {
        appendAccordionItem(body, section, `${id}Section${index}`);
        return;
      }
      if (!section.title) {
        appendParagraphs(body, section.text);
        return;
      }
      const wrapper = element('section', 'station-offcanvas__section');
      const heading = element('h3', 'station-offcanvas__section-title', section.title);
      heading.id = `${id}Section${index}`;
      wrapper.setAttribute('aria-labelledby', heading.id);
      wrapper.appendChild(heading);
      appendParagraphs(wrapper, section.text);
      body.appendChild(wrapper);
    });

    const highlight = content.highlight;
    if (highlight && highlight.text) {
      const box = element('aside', 'station-offcanvas__highlight');
      if (highlight.label) {
        const label = element('h3', 'station-offcanvas__highlight-label', highlight.label);
        label.id = `${id}Highlight`;
        box.setAttribute('aria-labelledby', label.id);
        box.appendChild(label);
      }
      appendParagraphs(box, highlight.text);
      body.appendChild(box);
    }
  }

  /**
   * options.trigger     button (element or selector) that opens the layer
   * options.content     { de: {...}, en: {...} } or one content object
   * options.background  element made inert while open (default #scaler, else #frame)
   * options.id          id of the layer (default stationOffcanvas, stationOffcanvas2, ...)
   * options.side        'left' (default) or 'right': edge the panel slides in from
   */
  function create(options) {
    instanceCount += 1;
    const id = options.id || (instanceCount === 1 ? 'stationOffcanvas' : `stationOffcanvas${instanceCount}`);
    const trigger = resolveElement(options.trigger);
    const background = resolveElement(options.background) || document.getElementById('scaler') || document.getElementById('frame');
    const parts = buildMarkup(id);
    const { overlay, panel, closeButton, body } = parts;
    let content = options.content || {};
    let closing = false;
    let renderedLanguage = null;

    overlay.classList.toggle('station-offcanvas--right', options.side === 'right');
    document.body.appendChild(overlay);
    const updateScrollbar = initScrollIndicator(body, parts.track, parts.thumb);

    function contentFor(language) {
      return content.de || content.en ? content[language] || content.de || content.en : content;
    }

    function render() {
      const language = currentLanguage();
      renderedLanguage = language;
      const current = contentFor(language) || {};
      const labels = Object.assign({}, DEFAULT_LABELS[language], current.labels);
      parts.eyebrow.textContent = current.eyebrow !== undefined ? current.eyebrow : labels.eyebrow;
      parts.title.textContent = current.title || '';
      closeButton.setAttribute('aria-label', labels.close);
      closeButton.setAttribute('title', labels.close);
      body.setAttribute('aria-label', labels.region);
      renderBody(body, current, id);
      // Collapsible sections change the text height; the scroll indicator then keeps its
      // space even while hidden, so the boxes do not change width when it appears.
      overlay.classList.toggle('station-offcanvas--collapsible', toList(current.sections).some(section => section.collapsible));
      body.scrollTop = 0;
      // A trigger with its own markup (e.g. CTA with icon) marks the label element.
      if (trigger) (trigger.querySelector('[data-offcanvas-label]') || trigger).textContent = labels.open;
    }

    function open() {
      if (!overlay.hidden) return;
      overlay.hidden = false;
      if (background) background.inert = true;
      document.body.classList.add('has-station-offcanvas');
      body.scrollTop = 0;
      // Establish the off-screen start position before enabling the transition.
      void panel.offsetWidth;
      overlay.classList.add('is-open');
      updateScrollbar();
      closeButton.focus({ preventScroll: true });
    }

    async function close() {
      if (overlay.hidden || closing) return;
      closing = true;
      overlay.classList.remove('is-open');
      // Resolve after the actual exit transition, including a mid-entry reversal.
      void panel.offsetWidth;
      await Promise.allSettled(panel.getAnimations().map(animation => animation.finished));
      overlay.hidden = true;
      // The next visit starts with all collapsible sections closed.
      collapseAccordions(body);
      if (background) background.inert = false;
      document.body.classList.remove('has-station-offcanvas');
      closing = false;
      if (trigger) trigger.focus({ preventScroll: true });
    }

    if (trigger) {
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', id);
      trigger.addEventListener('click', open);
    }
    closeButton.addEventListener('click', close);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) close();
    });
    document.addEventListener('keydown', event => {
      if (overlay.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'Tab') {
        // Keep focus inside the dialog.
        const focusable = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(node => node.offsetParent !== null);
        if (!focusable.length) return;
        const index = focusable.indexOf(document.activeElement);
        const next = event.shiftKey
          ? focusable[index <= 0 ? focusable.length - 1 : index - 1]
          : focusable[index === -1 || index === focusable.length - 1 ? 0 : index + 1];
        event.preventDefault();
        next.focus();
      }
    });
    // The language switch rewrites data-language on every DOM change; only an
    // actual language change re-renders (otherwise the two would loop).
    new MutationObserver(() => {
      if (currentLanguage() !== renderedLanguage) render();
    }).observe(ROOT, { attributes: true, attributeFilter: ['data-language'] });

    render();

    return {
      element: overlay,
      open,
      close,
      render,
      setContent(nextContent) {
        content = nextContent || {};
        render();
      }
    };
  }

  // scrollIndicator: the same blue indicator for other scroll areas on a station
  // (e.g. Station 07). Markup and usage: shared/README.md.
  window.StationOffcanvas = { create, scrollIndicator: initScrollIndicator };
})();
