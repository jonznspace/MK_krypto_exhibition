'use strict';

/**
 * Reloads the current station page after a period of visitor inactivity.
 * Shows a warning overlay with a countdown before reloading, so an active
 * visitor can dismiss it with any interaction.
 */
(function () {
  const IDLE_TIMEOUT_MS = 30000;
  const COUNTDOWN_SECONDS = 15;
  const OVERLAY_ID = 'stationIdleReloadOverlay';
  const ACTIVITY_EVENTS = ['pointerdown', 'pointermove', 'touchstart', 'mousemove', 'wheel', 'keydown', 'scroll'];

  const ROOT = document.documentElement;

  const TEXT = {
    de: {
      title: 'Sind Sie noch da?',
      body: 'Ohne Interaktion startet die Station in',
      unit: 'Sekunden neu.',
      hint: 'Tippen Sie irgendwo, um fortzufahren.'
    },
    en: {
      title: 'Still there?',
      body: 'Without interaction the station restarts in',
      unit: 'seconds.',
      hint: 'Tap anywhere to continue.'
    }
  };

  let idleTimer = null;
  let countdownTimer = null;
  let overlay = null;
  let countdownValueEl = null;
  let remaining = COUNTDOWN_SECONDS;

  function getLanguage() {
    return ROOT.dataset.language === 'en' ? 'en' : 'de';
  }

  function buildOverlay() {
    const el = document.createElement('div');
    el.id = OVERLAY_ID;
    el.className = 'station-idle-overlay';
    el.setAttribute('role', 'alertdialog');
    el.setAttribute('aria-live', 'assertive');
    el.innerHTML =
      '<div class="station-idle-overlay__panel">' +
        '<p class="station-idle-overlay__title"></p>' +
        '<p class="station-idle-overlay__body"></p>' +
        '<p class="station-idle-overlay__hint"></p>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function updateOverlayText() {
    if (!overlay) return;
    const language = getLanguage();
    const copy = TEXT[language];

    overlay.querySelector('.station-idle-overlay__title').textContent = copy.title;
    overlay.querySelector('.station-idle-overlay__body').textContent =
      copy.body + ' ' + remaining + ' ' + copy.unit;
    overlay.querySelector('.station-idle-overlay__hint').textContent = copy.hint;
  }

  function showOverlay() {
    if (!overlay) overlay = buildOverlay();
    remaining = COUNTDOWN_SECONDS;
    updateOverlayText();
    overlay.classList.add('is-visible');

    countdownTimer = window.setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        window.clearInterval(countdownTimer);
        window.location.reload();
        return;
      }
      updateOverlayText();
    }, 1000);
  }

  function hideOverlay() {
    if (overlay) overlay.classList.remove('is-visible');
    if (countdownTimer) {
      window.clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }

  function resetIdleTimer() {
    hideOverlay();
    if (idleTimer) window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(showOverlay, IDLE_TIMEOUT_MS);
  }

  function init() {
    ACTIVITY_EVENTS.forEach(eventName => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });
    resetIdleTimer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
