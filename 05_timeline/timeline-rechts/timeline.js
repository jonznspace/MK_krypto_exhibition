/* One clock drives travel, stops, pulse and marker states so they stay in sync. */
(() => {
  const artboard = document.querySelector('#timeline');
  const traveler = artboard.querySelector('#timeline-traveler');
  const trail = artboard.querySelector('#timeline-trail');
  const trailProgress = trail.querySelector('.timeline__trail-progress');
  const dots = Object.freeze(Object.fromEntries(
    [...artboard.querySelectorAll('[data-event]')].map(event => [
      event.dataset.event, event.querySelector('.timeline__dot'),
    ]),
  ));
  // speed (px/s) drives every segment except the row transfer, which has a fixed
  // duration; the loop length follows from the route. At each stop the marker
  // beats `beats` times within `pulse` ms, each beat `beatRatio` times the previous.
  // After the exit: rest on the finished picture, fade back to grey, idle, restart.
  const timing = Object.freeze({
    speed: 75, transfer: 9536, hold: 600, pulse: 4800, beats: 4, beatRatio: 0.7,
    settle: 480, reveal: 4000, rest: 8000, fade: 4000, idle: 3000,
  });
  // Test only: plays the whole loop this many times faster. Set back to 1.
  const playbackRate = 3;
  let duration = 0;
  let travelEnd = 0;
  let stops = [];
  let segments = [];
  let arrows = [];
  let path, length, origin;
  let frame = 0;
  let playing = false;
  let elapsed = 0;
  let startedAt = 0;

  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = progress => (1 - Math.cos(clamp(progress) * Math.PI)) / 2;
  const ink = amount => `color-mix(in srgb, var(--color-neutral-0), var(--color-secondary-600) ${clamp(amount) * 100}%)`;

  // CSS cubic-bezier(x1, 0, x2, 1): soft start and/or soft stop, no overshoot.
  function cubicBezier(x1, x2) {
    return progress => {
      if (progress <= 0 || progress >= 1) return clamp(progress);
      let low = 0;
      let high = 1;
      for (let i = 0; i < 24; i++) {
        const t = (low + high) / 2;
        const x = 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3;
        if (x < progress) low = t;
        else high = t;
      }
      const t = (low + high) / 2;
      return 3 * (1 - t) * t ** 2 + t ** 3;
    };
  }
  // Pull away from a stop and settle into the next one; the entry only
  // settles, the exit only pulls away.
  const easeInOut = cubicBezier(0.42, 0.58);
  const easeOut = cubicBezier(0, 0.58);
  const easeIn = cubicBezier(0.42, 1);

  // Heartbeat: beats get exponentially shorter; each rises quickly to blue
  // and decays softly back to white.
  function heartbeat(progress) {
    if (progress <= 0 || progress >= 1) return 0;
    const { beats, beatRatio } = timing;
    let time = progress * (1 - beatRatio ** beats) / (1 - beatRatio);
    let beat = 1;
    while (time > beat) {
      time -= beat;
      beat *= beatRatio;
    }
    const local = time / beat;
    const attack = 0.3;
    return local < attack ? smooth(local / attack) : (1 - (local - attack) / (1 - attack)) ** 2;
  }

  function nearestDistance(target) {
    const squaredError = distance => {
      const point = path.getPointAtLength(distance);
      return (point.x - target.x) ** 2 + (point.y - target.y) ** 2;
    };
    const step = length / 600;
    let best = 0;
    for (let distance = 0; distance <= length; distance += step) {
      if (squaredError(distance) < squaredError(best)) best = distance;
    }
    let low = Math.max(0, best - step);
    let high = Math.min(length, best + step);
    for (let i = 0; i < 32; i++) {
      const a = low + (high - low) / 3;
      const b = high - (high - low) / 3;
      if (squaredError(a) < squaredError(b)) high = b;
      else low = a;
    }
    return (low + high) / 2;
  }

  function render(time) {
    if (!path) return;
    const phase = ((time * playbackRate % duration) + duration) % duration;
    // 0 while travelling and resting, 1 once everything has faded back to grey.
    const reset = smooth((phase - travelEnd - timing.rest) / timing.fade);
    const shown = 1 - reset;
    let distance = phase >= travelEnd ? length : undefined;
    let pulse = 0;
    for (const stop of stops) {
      const active = phase >= stop.arrival && phase < stop.departure;
      const visited = phase >= stop.departure;
      stop.element.dataset.state = active ? 'active' : visited ? 'visited' : 'waiting';
      stop.element.style.setProperty('--dot-ink', ink(visited ? clamp((phase - stop.departure) / timing.settle) * shown : 0));
      if (stop.icon) {
        // Once the marker is fully blue, the icon fades in and grows from 90 %;
        // the loop-end fade mirrors this movement.
        const visible = smooth((phase - stop.departure - timing.settle) / timing.reveal) * shown;
        stop.icon.style.opacity = visible;
        stop.icon.style.transform = `scale(${0.9 + visible * 0.1})`;
      }
      if (active) {
        distance = stop.distance;
        pulse = heartbeat((phase - stop.arrival - timing.hold) / timing.pulse);
      }
    }
    if (distance === undefined) {
      const segment = segments.find(segment => phase >= segment.start && phase < segment.end);
      const progress = clamp((phase - segment.start) / (segment.end - segment.start));
      const eased = segment.ease(progress);
      distance = segment.from + (segment.to - segment.from) * eased;
    }

    // The trail ends at the traveler's center; arrows turn blue once passed.
    // Both fade out together with the markers before the next loop.
    trailProgress.style.strokeDashoffset = length - distance;
    trailProgress.style.opacity = shown;
    for (const arrow of arrows) {
      arrow.lit.style.opacity = distance >= arrow.distance ? shown : 0;
    }

    const point = path.getPointAtLength(distance);
    const before = path.getPointAtLength(Math.max(0, distance - 0.25));
    const after = path.getPointAtLength(Math.min(length, distance + 0.25));
    const angle = Math.atan2(after.y - before.y, after.x - before.x);
    // Figma marker centers differ from the line center by ~0.5 px.
    // Blend this subpixel correction near each stop for exact overlap,
    // while preserving the original route and all its curves elsewhere.
    for (const stop of stops) {
      const weight = clamp(1 - Math.abs(distance - stop.distance) / 24);
      point.x += stop.correction.x * weight;
      point.y += stop.correction.y * weight;
    }
    traveler.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle}rad)`;
    traveler.style.background = ink(pulse);
    traveler.style.visibility = 'visible';
  }

  function tick(now) {
    if (!playing) return;
    elapsed = now - startedAt;
    render(elapsed);
    frame = requestAnimationFrame(tick);
  }

  function pause() {
    if (playing) elapsed = performance.now() - startedAt;
    playing = false;
    cancelAnimationFrame(frame);
    render(elapsed);
  }

  function play() {
    if (!path || playing) return;
    startedAt = performance.now() - elapsed;
    playing = true;
    frame = requestAnimationFrame(tick);
  }

  function seek(milliseconds) {
    if (!Number.isFinite(milliseconds)) return;
    elapsed = Math.max(0, milliseconds);
    startedAt = performance.now() - elapsed;
    render(elapsed);
  }

  const ready = document.fonts.ready.then(() => {
    const source = getComputedStyle(traveler).getPropertyValue('--timeline-motion-path').trim();
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', source.match(/^path\("(.*)"\)$/)[1]);
    length = path.getTotalLength();
    for (const layer of trail.querySelectorAll('path')) layer.setAttribute('d', path.getAttribute('d'));
    trailProgress.style.strokeDasharray = `${length} ${length}`;
    origin = artboard.querySelector('.timeline__motion').getBoundingClientRect();
    stops = Object.entries(dots).map(([id, element]) => {
      const rect = element.getBoundingClientRect();
      const target = { x: rect.x + rect.width / 2 - origin.x, y: rect.y + rect.height / 2 - origin.y };
      const distance = nearestDistance(target);
      const point = path.getPointAtLength(distance);
      const icon = element.closest('[data-event]').querySelector('.event__icon');
      return { id, element, icon, distance, correction: { x: target.x - point.x, y: target.y - point.y } };
    }).sort((a, b) => a.distance - b.distance);
    // Each grey arrow gets a blue twin on top, so the switch can fade.
    arrows = [...artboard.querySelectorAll('[data-trail-src]')].map(element => {
      const rect = element.getBoundingClientRect();
      const center = { x: rect.x + rect.width / 2 - origin.x, y: rect.y + rect.height / 2 - origin.y };
      const lit = element.cloneNode();
      lit.src = element.dataset.trailSrc;
      lit.removeAttribute('data-trail-src');
      lit.removeAttribute('data-node-id');
      lit.style.opacity = 0;
      element.after(lit);
      return { lit, distance: nearestDistance(center) };
    });
    let cursor = 0;
    let previousDistance = 0;
    segments = [];
    const route = [...stops, { id: 'exit', distance: length }];
    route.forEach((stop, index) => {
      const transfer = stops[index - 1]?.id === 'bans' && stop.id === 'crime';
      const travelDuration = transfer ? timing.transfer : (stop.distance - previousDistance) / timing.speed * 1000;
      const ease = index === 0 ? easeOut : stop.id === 'exit' ? easeIn : easeInOut;
      segments.push({ from: previousDistance, to: stop.distance, start: cursor, end: cursor + travelDuration, transfer, ease });
      cursor += travelDuration;
      if (stop.id !== 'exit') {
        stop.arrival = cursor;
        stop.departure = cursor + timing.hold + timing.pulse;
        cursor = stop.departure;
      }
      previousDistance = stop.distance;
    });
    travelEnd = cursor;
    duration = travelEnd + timing.rest + timing.fade + timing.idle;
    render(0);
    play();
  });

  window.timeline = Object.freeze({
    artboard, dots, traveler, ready, timing, play, pause, seek,
    get duration() { return duration; },
    get travelEnd() { return travelEnd; },
    get segments() { return segments.map(segment => ({ ...segment })); },
    get stops() { return stops.map(({ id, arrival, departure }) => ({ id, arrival, departure })); },
  });
})();
