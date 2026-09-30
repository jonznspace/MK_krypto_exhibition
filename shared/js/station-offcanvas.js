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

  function renderBody(body, content, id) {
    body.replaceChildren();
    appendParagraphs(body, content.lead, 'station-offcanvas__lead');

    toList(content.sections).forEach((section, index) => {
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
      body.scrollTop = 0;
      if (trigger) trigger.textContent = labels.open;
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
