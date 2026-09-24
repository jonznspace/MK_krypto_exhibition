/* Static first version. Stable handles for the next animation step.
   Animate the dot itself; its wrapper keeps the original layout intact. */
(() => {
  const artboard = document.querySelector('#timeline');
  const dots = Object.freeze(Object.fromEntries(
    [...artboard.querySelectorAll('[data-event]')].map(event => [
      event.dataset.event, event.querySelector('.timeline__dot'),
    ]),
  ));

  window.timeline = Object.freeze({
    artboard,
    dots,
    ready: document.fonts.ready,
  });
})();
