'use strict';
/* =========================================================================
   Station 2 — Zirkel & Permutationsscheibe
   Vanilla JS. Cipher = Verschiebung (26 Schlüssel). Modi: Verschlüsseln / Knacken.
   ========================================================================= */
(function () {

  const AL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const N = 26, STEP = 360 / N;
  const CX = 380, CY = 380;
  const R_OUTER_TXT = 340, R_INNER_TXT = 250;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const mod = (n, m) => ((n % m) + m) % m;
  const enc = (i, k) => mod(i + k, N);   // Klartext-Index -> Chiffre-Index
  const dec = (c, k) => mod(c - k, N);   // Chiffre-Index  -> Klartext-Index
  const rad = d => d * Math.PI / 180;
  const angleOf = i => -90 + i * STEP;
  const polar = (r, i) => [CX + r * Math.cos(rad(angleOf(i))), CY + r * Math.sin(rad(angleOf(i)))];

  const ENC_WORDS = ['DRESDEN', 'SACHSEN', 'ZIRKEL', 'GEHEIMNIS', 'SCHEIBE', 'KRYPTO'];
  const CRACK_WORDS = ['GEHEIM', 'SCHATZ', 'TALER', 'DUKAT', 'SILBER', 'DRESDEN'];

  let key = 3;                 // innerSteps 0..25
  let mode = 'encrypt';
  let plain = 'DRESDEN';
  let crackIdx = [], crackSecret = 0, crackWord = '';

  /* ---------------- SVG-Scheibe aufbauen ---------------- */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = $('disc');
  const el = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); return e; };

  svg.appendChild(el('circle', { cx: CX, cy: CY, r: 372, class: 'disc-ring' }));
  const innerG = el('g', { id: 'discInner' });
  innerG.appendChild(el('circle', { cx: CX, cy: CY, r: 298, class: 'disc-ring inner' }));
  const innerLetters = el('g', { id: 'discInnerLetters' });
  // äußere (statische) Buchstaben
  for (let i = 0; i < N; i++) {
    const [x, y] = polar(R_OUTER_TXT, i);
    const t = el('text', { x, y, id: 'o' + i, class: 'disc-letter' }); t.textContent = AL[i];
    svg.appendChild(t);
  }
  // innere (rotierende) Buchstaben
  for (let j = 0; j < N; j++) {
    const [x, y] = polar(R_INNER_TXT, j);
    const t = el('text', { x, y, id: 'i' + j, class: 'disc-letter inner' }); t.textContent = AL[j];
    innerLetters.appendChild(t);
  }
  svg.appendChild(innerG); svg.appendChild(innerLetters);
  svg.appendChild(el('circle', { cx: CX, cy: CY, r: 202, class: 'disc-hub' }));
  // Marker oben (zeigt auf den Schlüssel-Buchstaben unter A)
  svg.appendChild(el('polygon', { points: `${CX - 13},58 ${CX + 13},58 ${CX},84`, class: 'disc-marker' }));
  // Highlight-Layer
  const ray = el('line', { class: 'disc-ray' });
  const oDot = el('circle', { r: 7, class: 'disc-dot' });
  const iDot = el('circle', { r: 7, class: 'disc-dot' });
  svg.appendChild(ray); svg.appendChild(oDot); svg.appendChild(iDot);

  /* ---------------- Kern: Schlüssel setzen ---------------- */
  function applyRotation() {
    innerG.setAttribute('transform', `rotate(${-key * STEP} ${CX} ${CY})`);
    for (let i = 0; i < N; i++) {
      const [fromX, fromY] = polar(R_INNER_TXT, i);
      const [toX, toY] = polar(R_INNER_TXT, i - key);
      $('i' + i).style.transform = `translate(${toX - fromX}px, ${toY - fromY}px)`;
    }
  }
  function setKey(k, tick) {
    const nk = mod(k, N);
    if (nk === key) return;
    key = nk;
    applyRotation();
    $('keyRead').textContent = 'A → ' + AL[key];
    if (tick !== false) Sound.tick();
    if (mode === 'encrypt') renderCipher(); else renderCrack();
  }
  applyRotation();
  $('keyRead').textContent = 'A → ' + AL[key];

  /* ---------------- Highlight einer Zuordnung ---------------- */
  function clearHot() {
    svg.querySelectorAll('.disc-letter.hot').forEach(e => e.classList.remove('hot'));
    ray.classList.remove('on'); oDot.classList.remove('on'); iDot.classList.remove('on');
  }
  function highlight(i) {
    clearHot();
    const c = enc(i, key);
    $('o' + i).classList.add('hot');
    $('i' + c).classList.add('hot');
    const [ox, oy] = polar(R_OUTER_TXT, i), [ix, iy] = polar(R_INNER_TXT, i);
    ray.setAttribute('x1', ox); ray.setAttribute('y1', oy);
    ray.setAttribute('x2', ix); ray.setAttribute('y2', iy);
    oDot.setAttribute('cx', ox); oDot.setAttribute('cy', oy);
    iDot.setAttribute('cx', ix); iDot.setAttribute('cy', iy);
    ray.classList.add('on'); oDot.classList.add('on'); iDot.classList.add('on');
  }

  /* ---------------- Modus: Verschlüsseln ---------------- */
  function tile(ch, cls) { const d = document.createElement('div'); d.className = 'tile' + (cls ? ' ' + cls : ''); d.textContent = ch; return d; }
  function isAZ(ch) { return AL.indexOf(ch) >= 0; }

  function renderPlain() {
    const box = $('plainTiles'); box.innerHTML = '';
    for (const ch of plain) box.appendChild(tile(ch));
    renderCipher();
    // aktiven Chip markieren
    document.querySelectorAll('#wordChips .chip').forEach(c => c.classList.toggle('active', c.dataset.w === plain));
  }
  function renderCipher() {
    const box = $('cipherTiles'); box.innerHTML = '';
    for (const ch of plain) {
      const idx = AL.indexOf(ch);
      box.appendChild(tile(idx >= 0 ? AL[enc(idx, key)] : ch));
    }
  }
  async function playEncrypt() {
    const cipherTiles = $('cipherTiles').children;
    for (const t of cipherTiles) t.classList.add('pending');
    let n = 0;
    for (let p = 0; p < plain.length; p++) {
      if (!isAZ(plain[p])) { cipherTiles[p].classList.remove('pending'); continue; }
      highlight(AL.indexOf(plain[p]));
      cipherTiles[p].classList.remove('pending');
      cipherTiles[p].classList.add('active');
      Sound.tick();
      await sleep(reduced ? 0 : 240);
      cipherTiles[p].classList.remove('active');
      n++;
    }
    clearHot();
    if (n) Sound.confirm();
  }
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function setPlain(w) { plain = w.toUpperCase().slice(0, 12); renderPlain(); }

  // Chips + A–Z aufbauen
  (function buildEncryptUI() {
    const chips = $('wordChips');
    ENC_WORDS.forEach(w => {
      const b = document.createElement('button'); b.className = 'chip'; b.dataset.w = w; b.textContent = w;
      b.onclick = () => { Sound.tick(); setPlain(w); };
      chips.appendChild(b);
    });
    const az = $('azStrip');
    AL.forEach(ch => {
      const b = document.createElement('button'); b.textContent = ch;
      b.onclick = () => { Sound.tick(); if (plain.length < 12) { plain += ch; renderPlain(); } };
      az.appendChild(b);
    });
  })();
  $('playBtn').onclick = () => { Sound.tick(); playEncrypt(); };
  $('clearBtn').onclick = () => { Sound.tick(); plain = ''; renderPlain(); };

  /* ---------------- Modus: Knacken ---------------- */
  function newMessage() {
    crackWord = CRACK_WORDS[Math.floor(Math.random() * CRACK_WORDS.length)];
    crackSecret = 1 + Math.floor(Math.random() * (N - 1));
    crackIdx = crackWord.split('').map(ch => enc(AL.indexOf(ch), crackSecret));
    const box = $('crackCipher'); box.innerHTML = '';
    crackIdx.forEach(c => box.appendChild(tile(AL[c])));
    renderCrack();
  }
  function renderCrack() {
    if (!crackIdx.length) return;
    const box = $('crackPlain'); box.innerHTML = '';
    crackIdx.forEach(c => box.appendChild(tile(AL[dec(c, key)])));
    const status = $('crackStatus');
    if (key === crackSecret) {
      status.textContent = 'GEKNACKT · Schlüssel A → ' + AL[key];
      status.classList.add('solved');
      box.querySelectorAll('.tile').forEach(t => t.classList.add('active'));
      if (!crackSolvedFlag) { crackSolvedFlag = true; Sound.confirm(); toast('Botschaft geknackt'); }
    } else {
      status.textContent = 'Schlüssel drehen …';
      status.classList.remove('solved');
      crackSolvedFlag = false;
    }
  }
  let crackSolvedFlag = false;
  $('newMsg').onclick = () => { Sound.tick(); crackSolvedFlag = false; newMessage(); };

  /* ---------------- Modus-Umschaltung ---------------- */
  function switchMode(m) {
    mode = m;
    $('tabEncrypt').classList.toggle('active', m === 'encrypt');
    $('tabCrack').classList.toggle('active', m === 'crack');
    $('tabEncrypt').setAttribute('aria-selected', m === 'encrypt');
    $('tabCrack').setAttribute('aria-selected', m === 'crack');
    $('modeEncrypt').classList.toggle('hidden', m !== 'encrypt');
    $('modeCrack').classList.toggle('hidden', m !== 'crack');
    clearHot();
    if (m === 'crack') { if (!crackIdx.length) newMessage(); else renderCrack(); }
    else renderCipher();
  }
  $('tabEncrypt').onclick = () => { Sound.tick(); switchMode('encrypt'); };
  $('tabCrack').onclick = () => { Sound.tick(); switchMode('crack'); };

  /* ---------------- Scheibe drehen ---------------- */
  $('rotL').onclick = () => setKey(key - 1);
  $('rotR').onclick = () => setKey(key + 1);

  let dragging = false, startAngle = 0, startKey = 0;
  function pointerAngle(e) {
    const r = svg.getBoundingClientRect();
    return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
  }
  svg.addEventListener('pointerdown', e => {
    dragging = true; startAngle = pointerAngle(e); startKey = key;
    svg.classList.add('dragging'); innerG.classList.add('free'); innerLetters.classList.add('free');
    svg.setPointerCapture(e.pointerId);
    kick();
  });
  svg.addEventListener('pointermove', e => {
    if (!dragging) return;
    const delta = pointerAngle(e) - startAngle;
    setKey(startKey - Math.round(delta / STEP));
  });
  ['pointerup', 'pointercancel'].forEach(ev => svg.addEventListener(ev, () => {
    dragging = false; svg.classList.remove('dragging'); innerG.classList.remove('free'); innerLetters.classList.remove('free');
  }));

  /* ---------------- Vertiefung Overlay ---------------- */
  $('vertBtn').onclick = () => { Sound.open(); $('overlay').classList.add('open'); $('overlay').setAttribute('aria-hidden', 'false'); kick(); };
  $('ovClose').onclick = () => { Sound.close(); $('overlay').classList.remove('open'); $('overlay').setAttribute('aria-hidden', 'true'); };
  $('overlay').addEventListener('click', e => { if (e.target === $('overlay')) $('ovClose').onclick(); });

  /* ---------------- Toast ---------------- */
  let toastT;
  function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); }

  /* ---------------- Attract / Idle ---------------- */
  let idleT, attractInt;
  function kick() {
    $('attract').classList.remove('show'); $('attract').setAttribute('aria-hidden', 'true');
    clearInterval(attractInt); attractInt = null;
    clearTimeout(idleT); idleT = setTimeout(startAttract, 60000);
  }
  function startAttract() {
    $('attract').classList.add('show'); $('attract').setAttribute('aria-hidden', 'false');
    if (!reduced) attractInt = setInterval(() => setKey(key + 1, false), 2000);
  }
  ['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, kick, true));

  /* ---------------- Sound (Cue-Tokens) ---------------- */
  const Sound = (function () {
    let ctx = null, on = true;
    function ensure() { if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) ctx = new AC(); } if (ctx && ctx.state === 'suspended') ctx.resume(); }
    function cue(freq, dur, gain) {
      if (!on) return; ensure(); if (!ctx) return;
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain(), hp = ctx.createBiquadFilter();
      o.type = 'square'; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(freq * .6, t + dur);
      hp.type = 'highpass'; hp.frequency.value = 500;
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + .004); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(hp); hp.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur + .02);
    }
    return {
      tick: () => cue(2200, .035, .05),
      confirm: () => cue(1800, .06, .06),
      open: () => cue(1400, .09, .06),
      close: () => cue(900, .07, .05),
      toggle() { on = !on; return on; }
    };
  })();
  $('mute').onclick = () => { const on = Sound.toggle(); const b = $('mute'); b.setAttribute('aria-pressed', on); b.textContent = on ? 'Ton' : 'Stumm'; if (on) Sound.tick(); };

  /* ---------------- Skalierung auf Fenster ---------------- */
  function fit() { const s = Math.min(innerWidth / 1920, innerHeight / 1080); $('frame').style.transform = 'scale(' + s + ')'; }
  window.addEventListener('resize', fit); fit();

  /* ---------------- Start ---------------- */
  renderPlain();
  switchMode('encrypt');
  kick();

})();
