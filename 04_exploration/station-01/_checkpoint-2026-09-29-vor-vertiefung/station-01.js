'use strict';
(function () {
  const STATION_CONTENT = {
    de: {
      meta: { title: 'Station 1 · Kryptografie', ariaLabel: 'Station 1 – Kryptografie' },
      start: {
        eyebrow: 'Geheime Botschaften in der Antike',
        title: 'Verschlüsseln & Versiegeln',
        reading: { sectionTitles: { 1: 'Skytale', 2: 'Caesar-Chiffre' }, takeawayTitle: 'Das Wichtigste' },
        summary: 'Wie bleibt eine Nachricht geheim? Schon in der Antike schützten Menschen ihre Botschaften mit Siegeln und verschlüsselten Zeichen. Entdecke die Skytale: Ein Streifen wird erst auf dem passenden Stab lesbar.',
        intro: [
          'In der Menschheit stellte sich wohl schon immer ein zentrales Problem: Wie lassen sich Nachrichten so übermitteln, dass Dritte sie nicht verstehen? Von der Antike ausgehend bestand eine Lösung beispielsweise darin, die Nachricht mit einem Siegel etwa aus Bienenwachs zu „versiegeln“. Ein Siegelbruch bedeutete, dass die Nachricht gelesen wurde. Darüber hinaus entwickelten sich weitere Lösungen: So wurden Texte, also Buchstaben, derart verändert, dass sie nur für die vorgesehenen Empfänger lesbar blieben.',
          'Im antiken Sparta diente für letzteres nachweislich die Skytale. Ein Lederstreifen wurde spiralförmig um einen Holzstab gewickelt, die Nachricht über diese Wicklungen hinweg geschrieben und wurde so nach dem Abnehmen unlesbar. Erst mit einem Stab gleichen Durchmessers ließen sich die Buchstaben wieder richtig anordnen.',
          'Die sogenannte Caesar-Chiffre, deren Erfindung Julius Caesar zugeschrieben wird, funktioniert noch einfacher: Jeder Buchstabe wird im Alphabet um eine festgelegte Anzahl Plätze verschoben. Aus A wird zum Beispiel D, aus B wird E. Wer den „Schlüssel“ kennt – also die Zahl der Verschiebung –, kann die Nachricht dekodieren.',
          'Beide Verfahren sind leicht zu knacken. Sie zeigen jedoch ein Prinzip, das bis heute gilt: Informationen lassen sich so umwandeln, dass sie nur für Eingeweihte verständlich sind. Dieses Prinzip heißt Kryptografie. Es ist die erste von drei Grundlagen, auf denen später digitales Geld aufbauen wird.'
        ],
        image: { src: 'dither-output.png', alt: '' },
        ctaLabel: 'Ausprobieren'
      },
      action: {
        eyebrow: '',
        title: 'Skytale ausprobieren',
        skytaleDefaultText: 'TREFFEN BEI MONDLICHT',
        skytaleDefaultCols: 5,
        skytalePuzzles: [
          { plain: 'BOTE KOMMT IN DREI TAGEN', cols: 5, startCols: 4 },
          { plain: 'DER SCHLUESSEL LIEGT IM HAFEN', cols: 5, startCols: 3 }
        ],
        closeLabel: 'Zur Startansicht'
      }
    },
    en: {
      meta: { title: 'Station 1 · Cryptography', ariaLabel: 'Station 1 – Cryptography' },
      start: {
        eyebrow: 'Secret messages in antiquity',
        title: 'Encrypting & sealing',
        reading: { sectionTitles: { 1: 'Skytale', 2: 'Caesar cipher' }, takeawayTitle: 'Key takeaway' },
        summary: 'How do you keep a message secret? Even in antiquity, people protected their messages with seals and encrypted letters. Discover the skytale: a strip becomes readable only when wrapped around the right rod.',
        intro: [
          'People have probably always faced a central problem: how can messages be sent so that others cannot understand them? One solution, used since antiquity, was to seal a message, for example with beeswax. A broken seal indicated that the message had been read. Other solutions were developed too: texts, or their letters, were changed so that only the intended recipients could read them.',
          'In ancient Sparta, the skytale was used for this purpose. A strip of leather was wound around a wooden rod, and the message was written across the coils. Once removed, the strip became unreadable. Only a rod of the same diameter would put the letters back in the right order.',
          'The Caesar cipher, whose invention is attributed to Julius Caesar, works even more simply: each letter is shifted a fixed number of places in the alphabet. A becomes D, for example, and B becomes E. Anyone who knows the key – the number of places to shift – can decode the message.',
          'Both methods are easy to crack. But they demonstrate a principle that still applies today: information can be transformed so that only those in the know can understand it. This principle is called cryptography. It is the first of three foundations on which digital money would later be built.'
        ],
        image: { src: 'dither-output.png', alt: '' },
        ctaLabel: 'Try it out'
      },
      action: {
        eyebrow: '',
        title: 'Try the skytale',
        skytaleDefaultText: 'MEET AT MIDNIGHT',
        skytaleDefaultCols: 5,
        skytalePuzzles: [
          { plain: 'MEET ME AT THE OLD HARBOR', cols: 5, startCols: 4 },
          { plain: 'THE KEY IS UNDER THE OLD BRIDGE', cols: 5, startCols: 3 }
        ],
        closeLabel: 'Back to start'
      }
    }
  };

  const $ = id => document.getElementById(id);
  const screenStart = $('screenStart');
  const screenAction = $('screenAction');
  const UI_COPY = {
    de: {
      topic: 'Kryptografie', templateTag: 'Zum Ausprobieren', encrypt: 'Verschlüsseln', decrypt: 'Entschlüsseln',
      readableMessage: 'Lesbare Nachricht', recoveredStrip: 'Gefundener Streifen', diameter: 'Stabdurchmesser (Wicklungen): ',
      unwrap: 'Streifen abwickeln', wrap: 'Um den Stab wickeln', readingDirection: 'Leserichtung',
      outputEncrypt: 'Abgewickelter Geheimtext', outputDecrypt: 'Entschlüsselte Nachricht', next: 'Nächste Skytale',
      drag: 'Ziehen zum Drehen', wrapped: 'Gewickelt · lesbar längs des Stabs',
      unwrapped: 'Abgewickelt · Buchstabenfolge auf dem Streifen', notReadable: 'NOCH NICHT LESBAR',
      space: 'Leerzeichen', delete: 'Löschen', done: 'Fertig', keyboard: 'Bildschirmtastatur', mode: 'Arbeitsmodus',
      marker: 'Station 1 - Kryptografie', intro: 'Einführungstext zur Station', stage: 'Interaktive Skytale',
      model: 'Drehbares Modell einer Skytale'
    },
    en: {
      topic: 'Cryptography', templateTag: 'Try it out', encrypt: 'Encrypt', decrypt: 'Decrypt',
      readableMessage: 'Readable message', recoveredStrip: 'Recovered strip', diameter: 'Rod diameter (turns): ',
      unwrap: 'Unwrap strip', wrap: 'Wrap around rod', readingDirection: 'Reading direction',
      outputEncrypt: 'Unwrapped ciphertext', outputDecrypt: 'Decoded message', next: 'Next skytale',
      drag: 'Drag to rotate', wrapped: 'Wrapped · readable along the rod',
      unwrapped: 'Unwrapped · letter sequence on the strip', notReadable: 'NOT READABLE YET',
      space: 'Space', delete: 'Delete', done: 'Done', keyboard: 'On-screen keyboard', mode: 'Mode',
      marker: 'Station 1 - Cryptography', intro: 'Introduction to the station', stage: 'Interactive skytale',
      model: 'Rotatable model of a skytale'
    }
  };
  let skytaleMode = 'encrypt';
  let skytaleWrapped = true;
  let showReadDirection = true;
  let puzzleIndex = 0;
  let appliedLanguage = null;

  function currentLanguage() {
    return document.documentElement.dataset.language === 'en' ? 'en' : 'de';
  }

  function currentContent() {
    return STATION_CONTENT[currentLanguage()];
  }

  function currentCopy() {
    return UI_COPY[currentLanguage()];
  }

  document.addEventListener('gesturestart', event => event.preventDefault());
  document.addEventListener('touchmove', event => {
    if (event.touches.length > 1) event.preventDefault();
  }, { passive: false });

  function compactMessage(value) {
    return normUp(value).replace(/[^A-Z]/g, '');
  }

  function encodeStrip(plain, cols) {
    const rows = Math.ceil(plain.length / cols);
    const padded = plain.padEnd(rows * cols, '·');
    let strip = '';
    for (let index = 0; index < padded.length; index++) {
      const row = Math.floor(index / cols);
      const column = index % cols;
      strip += padded.charAt(column * rows + row);
    }
    return strip;
  }

  function currentPuzzle() {
    const puzzle = currentContent().action.skytalePuzzles[puzzleIndex];
    return { ...puzzle, strip: encodeStrip(compactMessage(puzzle.plain), puzzle.cols).replaceAll('·', '') };
  }

  class SkytaleModel {
    constructor(host) {
      this.host = host;
      this.cells = ['S', 'K', 'Y', 'T', 'A', 'L', 'E'];
      this.cols = 5;
      this.wrapped = true;
      this.showRead = true;
      this.roll = 0.4;
      this.init();
    }

    init() {
      if (!window.THREE || !this.host) return;
      const THREE = window.THREE;
      this.THREE = THREE;
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 100);
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.host.appendChild(this.renderer.domElement);
      this.group = new THREE.Group();
      this.scene.add(this.group);
      this.bindPointer();
      this.observer = new ResizeObserver(() => this.resize());
      this.observer.observe(this.host);
      this.build();
      this.resize();
      this.lastTime = performance.now();
      this.loop();
    }

    setData(cells, cols) {
      if (!this.scene) return;
      this.cells = cells;
      this.cols = cols;
      this.build();
    }

    setWrapped(wrapped) { this.wrapped = wrapped; }

    setShowRead(showRead) {
      this.showRead = showRead;
      if (this.strip) this.rebuildTexture();
    }

    bindPointer() {
      const canvas = this.renderer.domElement;
      let lastX;
      let lastY;
      canvas.addEventListener('pointerdown', event => {
        lastX = event.clientX;
        lastY = event.clientY;
        this.dragging = true;
        canvas.setPointerCapture(event.pointerId);
      });
      canvas.addEventListener('pointermove', event => {
        if (!this.dragging) return;
        this.roll += (event.clientX - lastX) * 0.008 - (event.clientY - lastY) * 0.01;
        lastX = event.clientX;
        lastY = event.clientY;
      });
      const stopDragging = () => { this.dragging = false; };
      canvas.addEventListener('pointerup', stopDragging);
      canvas.addEventListener('pointercancel', stopDragging);
    }

    clearGroup() {
      while (this.group.children.length) {
        const object = this.group.children.pop();
        object.traverse(item => {
          if (item.geometry) item.geometry.dispose();
          if (item.material) {
            if (item.material.map) item.material.map.dispose();
            item.material.dispose();
          }
        });
      }
    }

    build() {
      const THREE = this.THREE;
      this.clearGroup();
      this.rows = Math.max(1, Math.ceil(this.cells.length / this.cols));
      this.radius = Math.max(0.65, this.cols / (Math.PI * 2));
      this.bandWidth = Math.min(1.15, this.radius * 1.05);
      this.stripLength = this.cells.length;
      const turns = this.stripLength / (Math.PI * 2 * this.radius);
      this.stickLength = Math.max(turns * this.bandWidth + this.bandWidth * 2.8, this.radius * 5.5);
      this.startX = -(turns * this.bandWidth + this.bandWidth) / 2;

      const stickGeometry = new THREE.CylinderGeometry(this.radius, this.radius, this.stickLength, 40, 1, false);
      stickGeometry.rotateZ(Math.PI / 2);
      const stick = new THREE.Mesh(stickGeometry, new THREE.MeshBasicMaterial({ color: 0x000000 }));
      this.group.add(stick);
      const outline = new THREE.Mesh(stickGeometry.clone(), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide }));
      outline.scale.set(1, 1.025, 1.025);
      this.group.add(outline);

      [-1, 1].forEach(direction => {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(this.radius * .94, this.radius, 40),
          new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        );
        ring.rotation.y = Math.PI / 2;
        ring.position.x = direction * (this.stickLength / 2 + .01);
        this.group.add(ring);
      });

      this.buildStrip();
      this.wrapAmount = this.wrapped ? 1 : 0;
      this.updateStrip();
    }

    buildStrip() {
      const THREE = this.THREE;
      const segments = Math.max(28, this.cells.length * 7);
      const widthSegments = 6;
      const vertexCount = (segments + 1) * (widthSegments + 1);
      const positions = new Float32Array(vertexCount * 3);
      const uvs = new Float32Array(vertexCount * 2);
      const indices = [];
      this.stripPositions = new Float32Array(vertexCount);
      this.stripWidths = new Float32Array(vertexCount);
      for (let lengthIndex = 0; lengthIndex <= segments; lengthIndex++) {
        for (let widthIndex = 0; widthIndex <= widthSegments; widthIndex++) {
          const vertex = lengthIndex * (widthSegments + 1) + widthIndex;
          this.stripPositions[vertex] = (lengthIndex / segments) * this.stripLength;
          this.stripWidths[vertex] = (widthIndex / widthSegments) * this.bandWidth;
          uvs[vertex * 2] = lengthIndex / segments;
          uvs[vertex * 2 + 1] = widthIndex / widthSegments;
          if (lengthIndex < segments && widthIndex < widthSegments) {
            const nextRow = vertex + widthSegments + 1;
            indices.push(vertex, nextRow, vertex + 1, vertex + 1, nextRow, nextRow + 1);
          }
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      this.strip = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: this.makeTexture(), side: THREE.DoubleSide }));
      this.group.add(this.strip);
    }

    makeTexture() {
      const THREE = this.THREE;
      const pixelsPerCell = 100;
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, this.cells.length * pixelsPerCell);
      canvas.height = Math.round(this.bandWidth * pixelsPerCell);
      const context = canvas.getContext('2d');
      context.fillStyle = '#eef0f3';
      context.fillRect(0, 0, canvas.width, canvas.height);
      this.cells.forEach((character, index) => {
        const x = index * pixelsPerCell;
        if (this.showRead && index % this.cols === 0) {
          context.fillStyle = '#f79530';
          context.fillRect(x, 0, pixelsPerCell, canvas.height);
        }
        context.strokeStyle = 'rgba(0,0,0,.28)';
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
        context.save();
        context.translate(x + pixelsPerCell / 2, canvas.height / 2);
        context.rotate(-Math.PI / 2);
        context.fillStyle = character === '·' || character === ' ' ? 'rgba(0,0,0,.35)' : '#000000';
        context.font = `500 ${Math.round(Math.min(pixelsPerCell, canvas.height) * .65)}px "DM Mono", monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(character === '·' || character === ' ' ? '•' : character, 0, 0);
        context.restore();
      });
      context.strokeStyle = '#000000';
      context.lineWidth = 2;
      context.strokeRect(0, 0, canvas.width, canvas.height);
      return new THREE.CanvasTexture(canvas);
    }

    rebuildTexture() {
      const oldTexture = this.strip.material.map;
      this.strip.material.map = this.makeTexture();
      this.strip.material.needsUpdate = true;
      oldTexture.dispose();
    }

    updateStrip() {
      const positions = this.strip.geometry.getAttribute('position');
      const values = positions.array;
      const wrap = this.wrapAmount;
      for (let vertex = 0; vertex < this.stripPositions.length; vertex++) {
        const stripPosition = this.stripPositions[vertex];
        const width = this.stripWidths[vertex];
        const peel = Math.max(0, Math.min(1, wrap * 2 - stripPosition / this.stripLength));
        const easedPeel = peel * peel * (3 - 2 * peel);
        const angle = stripPosition / this.radius + 1.2;
        const helixX = this.startX + (stripPosition / (Math.PI * 2 * this.radius)) * this.bandWidth + width;
        const helixY = this.radius * 1.07 * Math.cos(angle);
        const helixZ = this.radius * 1.07 * Math.sin(angle);
        const flatX = stripPosition - this.stripLength / 2;
        const flatY = -2 + width - this.bandWidth / 2;
        const flatZ = this.radius + 1;
        const offset = vertex * 3;
        values[offset] = flatX + (helixX - flatX) * easedPeel;
        values[offset + 1] = flatY + (helixY - flatY) * easedPeel;
        values[offset + 2] = flatZ + (helixZ - flatZ) * easedPeel;
      }
      positions.needsUpdate = true;
      this.strip.geometry.computeVertexNormals();
      this.strip.geometry.computeBoundingSphere();
    }

    resize() {
      const width = this.host.clientWidth || 600;
      const height = this.host.clientHeight || 360;
      this.renderer.setSize(width, height, false);
      this.aspect = width / height;
      this.updateCameraFrame();
    }

    updateCameraFrame() {
      const wrappedFrame = Math.max(this.stickLength * .42, this.stripLength * .37);
      const unwrappedFrame = Math.max(this.stickLength * .56, this.stripLength * .56);
      const halfWidth = wrappedFrame + (unwrappedFrame - wrappedFrame) * (1 - this.wrapAmount);
      this.camera.left = -halfWidth;
      this.camera.right = halfWidth;
      this.camera.top = halfWidth / this.aspect;
      this.camera.bottom = -halfWidth / this.aspect;
      this.camera.position.set(0, 0, 30);
      this.camera.lookAt(0, 0, 0);
      this.camera.updateProjectionMatrix();
    }

    loop() {
      this.frame = requestAnimationFrame(() => this.loop());
      const time = performance.now();
      const delta = Math.min(64, time - this.lastTime);
      this.lastTime = time;
      const target = this.wrapped ? 1 : 0;
      if (this.wrapAmount !== target) {
        const direction = target > this.wrapAmount ? 1 : -1;
        this.wrapAmount = Math.max(0, Math.min(1, this.wrapAmount + direction * delta / 1700));
        this.updateStrip();
      }
      this.updateCameraFrame();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!this.dragging && !reducedMotion) this.roll += delta / 16000;
      this.group.rotation.x = this.roll * this.wrapAmount * this.wrapAmount;
      this.group.rotation.z = -.08 * this.wrapAmount;
      this.renderer.render(this.scene, this.camera);
    }
  }

  function setText(id, value) {
    $(id).textContent = value;
  }

  function setTitle(id, value) {
    const title = $(id);
    const characterCount = value.replace(/\s/g, '').length;
    title.classList.toggle('title--medium', id === 'startTitle' && characterCount >= 20 && characterCount < 39);
    title.classList.toggle('title--long', id === 'startTitle' && characterCount >= 39);
    const words = value.split(' ');
    title.innerHTML = '';

    words.forEach((word, index) => {
      const wordNode = document.createElement('span');
      wordNode.className = 'title-word';
      wordNode.textContent = word;
      title.appendChild(wordNode);
      if (index < words.length - 1) {
        title.appendChild(document.createTextNode(' '));
      }
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

  function renderReading(start) {
    const container = $('readingBody');
    container.replaceChildren();
    start.intro.forEach((text, index) => {
      const isTakeaway = index === start.intro.length - 1;
      const title = isTakeaway ? start.reading.takeawayTitle : start.reading.sectionTitles[index];
      let target = container;
      if (title) {
        target = document.createElement(isTakeaway ? 'aside' : 'section');
        target.className = isTakeaway ? 'reading-takeaway' : 'reading-section';
        const heading = document.createElement('h3');
        heading.id = `readingSectionTitle${index}`;
        heading.textContent = title;
        target.setAttribute('aria-labelledby', heading.id);
        target.appendChild(heading);
        container.appendChild(target);
      }
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      target.appendChild(paragraph);
    });
  }

  function renderStation(content) {
    document.title = content.meta.title;
    $('frame').setAttribute('aria-label', content.meta.ariaLabel);

    setText('startEyebrow', content.start.eyebrow);
    setTitle('startTitle', content.start.title);
    renderParagraphs('startIntro', [content.start.summary]);
    renderReading(content.start);
    setText('readingTitle', content.start.title);
    const readingCopy = currentLanguage() === 'en'
      ? { open: 'Read more', close: 'Close', eyebrow: 'Background', region: 'Full introduction' }
      : { open: 'Weiterlesen', close: 'Schließen', eyebrow: 'Hintergrund', region: 'Vollständiger Einführungstext' };
    setText('btnReadMore', readingCopy.open);
    $('btnCloseReading').setAttribute('aria-label', readingCopy.close);
    $('btnCloseReading').setAttribute('title', readingCopy.close);
    setText('readingEyebrow', readingCopy.eyebrow);
    $('readingBody').setAttribute('aria-label', readingCopy.region);
    setText('tryLabel', content.start.ctaLabel);

    const startImage = $('startImage');
    startImage.src = content.start.image.src;
    startImage.alt = content.start.image.alt;

    setText('actionEyebrow', content.action.eyebrow);
    setTitle('actionTitle', content.action.title);
    $('skyIn').value = content.action.skytaleDefaultText;
    $('skyCols').value = String(content.action.skytaleDefaultCols);
    $('btnClose').setAttribute('aria-label', content.action.closeLabel);
  }

  function initReadingOverlay() {
    const overlay = $('readingOverlay');
    const background = $('scaler');
    const opener = $('btnReadMore');
    const closeButton = $('btnCloseReading');
    const readingBody = $('readingBody');
    const panel = overlay.querySelector('.reading-panel');
    let closing = false;

    async function closeReading() {
      if (overlay.hidden || closing) return;
      closing = true;
      overlay.classList.remove('is-open');
      // Resolve after the actual exit transition, including a mid-entry reversal.
      // No animation means immediate completion; no duplicated duration in JS.
      void panel.offsetWidth;
      await Promise.allSettled(panel.getAnimations().map(animation => animation.finished));
      overlay.hidden = true;
      background.inert = false;
      document.body.classList.remove('is-reading');
      closing = false;
      opener.focus({ preventScroll: true });
    }

    opener.addEventListener('click', () => {
      if (!overlay.hidden) return;
      overlay.hidden = false;
      background.inert = true;
      document.body.classList.add('is-reading');
      readingBody.scrollTop = 0;
      // Establish the off-screen start position before enabling the transition.
      void panel.offsetWidth;
      overlay.classList.add('is-open');
      closeButton.focus({ preventScroll: true });
    });
    closeButton.addEventListener('click', closeReading);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeReading();
    });
    document.addEventListener('keydown', event => {
      if (overlay.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeReading();
      } else if (event.key === 'Tab') {
        // The dialog has two focus targets: close and the scrollable text.
        event.preventDefault();
        (document.activeElement === closeButton ? readingBody : closeButton).focus();
      }
    });
  }

  function normUp(value) {
    return value
      .toUpperCase()
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE')
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS');
  }

  function setSkytaleMode(mode) {
    skytaleMode = mode;
    const isEncrypting = mode === 'encrypt';
    const action = currentContent().action;
    const copy = currentCopy();
    $('btnEncrypt').classList.toggle('active', isEncrypting);
    $('btnDecrypt').classList.toggle('active', !isEncrypting);
    $('btnEncrypt').setAttribute('aria-selected', String(isEncrypting));
    $('btnDecrypt').setAttribute('aria-selected', String(!isEncrypting));
    $('skyInLabel').textContent = isEncrypting ? copy.readableMessage : copy.recoveredStrip;
    $('skyOutLabel').textContent = isEncrypting ? copy.outputEncrypt : copy.outputDecrypt;
    $('skyKeyboard').classList.add('hidden');
    const puzzle = currentPuzzle();
    $('skyIn').value = isEncrypting
      ? action.skytaleDefaultText
      : puzzle.strip;
    $('skyCols').value = String(isEncrypting
      ? action.skytaleDefaultCols
      : puzzle.startCols);
    skytaleModel.setWrapped(skytaleWrapped);
    $('btnWrap').textContent = copy.unwrap;
    $('skyStageState').textContent = copy.wrapped;
    skytaleRender();
  }

  function skytaleRender() {
    const raw = normUp($('skyIn').value)
      .replace(/[^A-Z ]/g, '')
      .replace(/ +/g, ' ')
      .trim();
    const cols = Number($('skyCols').value);
    $('skyColsVal').textContent = String(cols);

    const rows = Math.max(1, Math.ceil(raw.length / cols));
    const cellCount = rows * cols;
    let wrapped = '';
    let output = '';

    if (skytaleMode === 'encrypt') {
      const plain = raw.padEnd(cellCount, '·');
      const cells = [];
      for (let index = 0; index < cellCount; index++) {
        const row = Math.floor(index / cols);
        const column = index % cols;
        cells.push(plain.charAt(column * rows + row));
      }
      wrapped = cells.join('');
      output = wrapped.replaceAll(' ', '·');
    } else {
      const strip = raw.padEnd(cellCount, '·');
      for (let column = 0; column < cols; column++) {
        for (let row = 0; row < rows; row++) {
          output += strip.charAt(row * cols + column);
        }
      }
      wrapped = strip;
      output = output.replaceAll('·', '').replaceAll(' ', ' ');
    }

    const puzzle = currentPuzzle();
    const solvedPuzzle = skytaleMode === 'decrypt' && raw === puzzle.strip && cols === puzzle.cols;
    $('skyOut').textContent = skytaleMode === 'decrypt'
      ? (solvedPuzzle ? puzzle.plain : currentCopy().notReadable)
      : (output || '...');
    $('skyOut').classList.toggle('is-solved', solvedPuzzle);
    $('btnNextPuzzle').classList.toggle('hidden', !solvedPuzzle);
    skytaleModel.setData(wrapped.split(''), cols);
  }

  function typeOnKeyboard(character) {
    const input = $('skyIn');
    if (input.value.length >= input.maxLength) return;
    input.value += character;
    skytaleRender();
  }

  function buildKeyboard() {
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    rows.forEach((letters, index) => {
      const row = $(['keyboardRowA', 'keyboardRowB', 'keyboardRowC'][index]);
      letters.forEach(letter => {
        const key = document.createElement('button');
        key.className = 'keyboard-key';
        key.type = 'button';
        key.textContent = letter;
        key.setAttribute('aria-label', `Buchstabe ${letter}`);
        key.addEventListener('click', () => typeOnKeyboard(letter));
        row.appendChild(key);
      });
    });
  }

  function applyLanguage() {
    const language = currentLanguage();
    if (language === appliedLanguage) return;
    appliedLanguage = language;
    const content = currentContent();
    const copy = currentCopy();
    renderStation(content);
    document.querySelector('.station-marker__topic').textContent = copy.topic;
    document.querySelector('.station-marker').setAttribute('aria-label', copy.marker);
    $('startIntro').setAttribute('aria-label', copy.intro);
    $('skyStage').setAttribute('aria-label', copy.stage);
    $('skyCanvas').setAttribute('aria-label', copy.model);
    document.querySelector('.template-tag').textContent = copy.templateTag;
    document.querySelector('.skytale-stage__instruction').textContent = copy.drag;
    document.querySelector('.tabs').setAttribute('aria-label', copy.mode);
    $('skyKeyboard').setAttribute('aria-label', copy.keyboard);
    $('btnEncrypt').textContent = copy.encrypt;
    $('btnDecrypt').textContent = copy.decrypt;
    $('skyColsLabel').firstChild.textContent = copy.diameter;
    $('btnReadDirection').textContent = copy.readingDirection;
    $('btnNextPuzzle').textContent = copy.next;
    $('btnKeyboardSpace').textContent = copy.space;
    $('btnKeyboardBackspace').textContent = copy.delete;
    $('btnKeyboardDone').textContent = copy.done;
    puzzleIndex = 0;
    setSkytaleMode(skytaleMode);
    $('readingBody').scrollTop = 0;
  }

  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
  });

  $('btnClose').addEventListener('click', () => {
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });

  $('skyIn').addEventListener('input', skytaleRender);
  $('skyIn').addEventListener('focus', () => {
    if (skytaleMode === 'encrypt') $('skyKeyboard').classList.remove('hidden');
  });
  $('skyCols').addEventListener('input', skytaleRender);
  $('btnEncrypt').addEventListener('click', () => setSkytaleMode('encrypt'));
  $('btnDecrypt').addEventListener('click', () => setSkytaleMode('decrypt'));
  $('btnWrap').addEventListener('click', () => {
    skytaleWrapped = !skytaleWrapped;
    const copy = currentCopy();
    skytaleModel.setWrapped(skytaleWrapped);
    $('btnWrap').textContent = skytaleWrapped ? copy.unwrap : copy.wrap;
    $('skyStageState').textContent = skytaleWrapped ? copy.wrapped : copy.unwrapped;
  });
  $('btnReadDirection').addEventListener('click', () => {
    showReadDirection = !showReadDirection;
    skytaleModel.setShowRead(showReadDirection);
    $('btnReadDirection').setAttribute('aria-pressed', String(showReadDirection));
  });
  $('btnKeyboardSpace').addEventListener('click', () => typeOnKeyboard(' '));
  $('btnKeyboardBackspace').addEventListener('click', () => {
    const input = $('skyIn');
    input.value = input.value.slice(0, -1);
    skytaleRender();
  });
  $('btnKeyboardDone').addEventListener('click', () => {
    $('skyKeyboard').classList.add('hidden');
    $('skyIn').blur();
  });
  $('btnNextPuzzle').addEventListener('click', () => {
    puzzleIndex = (puzzleIndex + 1) % currentContent().action.skytalePuzzles.length;
    setSkytaleMode('decrypt');
  });

  renderStation(currentContent());
  initReadingOverlay();
  buildKeyboard();
  const skytaleModel = new SkytaleModel($('skyCanvas'));
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'data-language')) applyLanguage();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
  applyLanguage();
})();
