'use strict';

/*
  Einbettung der Medienstationen als Overlay im Onepager.
  Aufruf: stations/station-0X/index.html?embed[&lang=en]

  - öffnet direkt die Mitmach-Ansicht (die Startansicht steht schon im Onepager)
  - blendet das eigene Schließen der Station aus; geschlossen wird über das Overlay
  - übernimmt die Sprache der Website
  - Esc in der Station schließt das Overlay

  Ohne ?embed verhält sich die Station wie gewohnt.
*/
(function () {
  const params = new URLSearchParams(location.search);
  if (!params.has('embed')) return;

  const ROOT = document.documentElement;
  ROOT.classList.add('is-embedded');

  // Sprache vor dem Laden der Stations-Skripte setzen (Speicher-Schlüssel der Stationen)
  const lang = params.get('lang') === 'en' ? 'en' : 'de';
  try { localStorage.setItem('mk-station-language', lang); } catch (error) { /* Speicher nicht verfügbar */ }
  ROOT.dataset.language = lang;

  // Nach den Start-Routinen der Station in die Mitmach-Ansicht wechseln,
  // über den eigenen Button der Station, damit ihre Logik mitläuft
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const tryButton = document.getElementById('btnTry');
      if (tryButton) tryButton.click();
    }, 0);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && window.parent !== window) {
      window.parent.postMessage({ type: 'kw-overlay-close' }, location.origin);
    }
  });
})();
