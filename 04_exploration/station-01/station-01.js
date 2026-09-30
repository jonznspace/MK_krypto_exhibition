'use strict';
(function () {
  const STATION_CONTENT = {
    de: {
      meta: { title: 'Station 1 · Kryptografie', ariaLabel: 'Station 1 – Kryptografie' },
      start: {
        eyebrow: 'Geheime Botschaften in der Antike',
        title: 'Verschlüsseln & Versiegeln',
        summary: 'Wie bleibt eine Nachricht geheim? Schon in der Antike schützten Menschen ihre Botschaften mit Siegeln und verschlüsselten Zeichen. Entdecke die Skytale: Ein Streifen wird erst auf dem passenden Stab lesbar.',
        // Off-canvas content (shared/js/station-offcanvas.js): lead, sections, highlight.
        reading: {
          lead: 'In der Menschheit stellte sich wohl schon immer ein zentrales Problem: Wie lassen sich Nachrichten so übermitteln, dass Dritte sie nicht verstehen? Von der Antike ausgehend bestand eine Lösung beispielsweise darin, die Nachricht mit einem Siegel etwa aus Bienenwachs zu „versiegeln“. Ein Siegelbruch bedeutete, dass die Nachricht gelesen wurde. Darüber hinaus entwickelten sich weitere Lösungen: So wurden Texte, also Buchstaben, derart verändert, dass sie nur für die vorgesehenen Empfänger lesbar blieben.',
          sections: [
            { title: 'Skytale', text: 'Im antiken Sparta diente für letzteres nachweislich die Skytale. Ein Lederstreifen wurde spiralförmig um einen Holzstab gewickelt, die Nachricht über diese Wicklungen hinweg geschrieben und wurde so nach dem Abnehmen unlesbar. Erst mit einem Stab gleichen Durchmessers ließen sich die Buchstaben wieder richtig anordnen.' },
            { title: 'Caesar-Chiffre', text: 'Die sogenannte Caesar-Chiffre, deren Erfindung Julius Caesar zugeschrieben wird, funktioniert noch einfacher: Jeder Buchstabe wird im Alphabet um eine festgelegte Anzahl Plätze verschoben. Aus A wird zum Beispiel D, aus B wird E. Wer den „Schlüssel“ kennt – also die Zahl der Verschiebung –, kann die Nachricht dekodieren.' }
          ],
          highlight: { label: 'Das Wichtigste', text: 'Beide Verfahren sind leicht zu knacken. Sie zeigen jedoch ein Prinzip, das bis heute gilt: Informationen lassen sich so umwandeln, dass sie nur für Eingeweihte verständlich sind. Dieses Prinzip heißt Kryptografie. Es ist die erste von drei Grundlagen, auf denen später digitales Geld aufbauen wird.' }
        },
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
          { plain: 'DER SCHLÜSSEL LIEGT IM HAFEN', cols: 5, startCols: 3 }
        ],
        closeLabel: 'Zur Startansicht'
      }
    },
    en: {
      meta: { title: 'Station 1 · Cryptography', ariaLabel: 'Station 1 – Cryptography' },
      start: {
        eyebrow: 'Secret messages in antiquity',
        title: 'Encrypting & sealing',
        summary: 'How do you keep a message secret? Even in antiquity, people protected their messages with seals and encrypted letters. Discover the skytale: a strip becomes readable only when wrapped around the right rod.',
        // Off-canvas content (shared/js/station-offcanvas.js): lead, sections, highlight.
        reading: {
          lead: 'People have probably always faced a central problem: how can messages be sent so that others cannot understand them? One solution, used since antiquity, was to seal a message, for example with beeswax. A broken seal indicated that the message had been read. Other solutions were developed too: texts, or their letters, were changed so that only the intended recipients could read them.',
          sections: [
            { title: 'Skytale', text: 'In ancient Sparta, the skytale was used for this purpose. A strip of leather was wound around a wooden rod, and the message was written across the coils. Once removed, the strip became unreadable. Only a rod of the same diameter would put the letters back in the right order.' },
            { title: 'Caesar cipher', text: 'The Caesar cipher, whose invention is attributed to Julius Caesar, works even more simply: each letter is shifted a fixed number of places in the alphabet. A becomes D, for example, and B becomes E. Anyone who knows the key – the number of places to shift – can decode the message.' }
          ],
          highlight: { label: 'Key takeaway', text: 'Both methods are easy to crack. But they demonstrate a principle that still applies today: information can be transformed so that only those in the know can understand it. This principle is called cryptography. It is the first of three foundations on which digital money would later be built.' }
        },
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
  // Vertiefung v2: Texte des geführten Ablaufs (siehe CHANGELOG.md).
  const UI_COPY = {
    de: {
      topic: 'Kryptografie', encrypt: 'Verschlüsseln', decrypt: 'Entschlüsseln',
      taskEncrypt: 'Schreibe eine geheime Nachricht. Wickle den Streifen danach vom Stab ab.',
      taskDecrypt: 'Ein Bote bringt diesen Streifen. Finde den Stab, auf dem er wieder lesbar wird.',
      stepWrite: 'Nachricht schreiben', stepKey: 'Schlüssel wählen: Stabdicke',
      keyValue: cols => `${cols} Buchstaben pro Umdrehung`,
      unwrapAction: 'Streifen abwickeln', rewrapAction: 'Wieder aufwickeln',
      stripFound: 'Gefundener Streifen',
      resultCipher: 'Geheimtext auf dem Streifen',
      resultCipherPending: 'Wickle den Streifen ab. Dann erscheint hier der Geheimtext.',
      resultCipherNote: 'Jede Gruppe ist eine Umdrehung um den Stab.',
      resultEmpty: 'Schreibe zuerst eine Nachricht.',
      stepRead: 'Längs des Stabs gelesen',
      readWrong: 'Ergibt noch keinen Sinn. Probiere eine andere Stabdicke.',
      readSolved: 'Gelöst! Mit dem richtigen Schlüssel ist die Nachricht lesbar.',
      next: 'Nächster Streifen',
      takeawayLabel: 'Das Wichtigste',
      takeaway: 'Der Schlüssel ist die Stabdicke. Nur wer sie kennt, kann die Nachricht lesen.',
      stageEncWrapped: 'Aufgewickelt: längs des Stabs lesbar',
      stageEncUnwrapped: 'Abgewickelt: nicht mehr lesbar',
      stageDecWrong: 'Falscher Stab: die Zeilen ergeben keinen Sinn',
      stageDecSolved: 'Passender Stab: die Nachricht ist lesbar',
      legendWrapped: 'Orange: eine Zeile, längs des Stabs gelesen',
      legendUnwrapped: 'Orange: dieselbe Zeile, jetzt über den Streifen verteilt',
      drag: 'Ziehen zum Drehen',
      space: 'Leerzeichen', delete: 'Löschen', done: 'Fertig', keyboard: 'Bildschirmtastatur', mode: 'Arbeitsmodus',
      letter: letter => `Buchstabe ${letter}`,
      marker: 'Station 1 - Kryptografie', intro: 'Einführungstext zur Station', stage: 'Interaktive Skytale',
      model: 'Drehbares Modell einer Skytale'
    },
    en: {
      topic: 'Cryptography', encrypt: 'Encrypt', decrypt: 'Decrypt',
      taskEncrypt: 'Write a secret message. Then unwrap the strip from the rod.',
      taskDecrypt: 'A messenger brings this strip. Find the rod that makes it readable again.',
      stepWrite: 'Write a message', stepKey: 'Choose the key: rod thickness',
      keyValue: cols => `${cols} letters per turn`,
      unwrapAction: 'Unwrap the strip', rewrapAction: 'Wrap it back',
      stripFound: 'Recovered strip',
      resultCipher: 'Ciphertext on the strip',
      resultCipherPending: 'Unwrap the strip to reveal the ciphertext here.',
      resultCipherNote: 'Each group is one turn around the rod.',
      resultEmpty: 'Write a message first.',
      stepRead: 'Read along the rod',
      readWrong: 'Not making sense yet. Try another rod thickness.',
      readSolved: 'Solved! With the right key the message is readable.',
      next: 'Next strip',
      takeawayLabel: 'Key takeaway',
      takeaway: 'The key is the thickness of the rod. Only those who know it can read the message.',
      stageEncWrapped: 'Wrapped: readable along the rod',
      stageEncUnwrapped: 'Unwrapped: no longer readable',
      stageDecWrong: 'Wrong rod: the lines make no sense',
      stageDecSolved: 'Matching rod: the message is readable',
      legendWrapped: 'Orange: one line, read along the rod',
      legendUnwrapped: 'Orange: the same line, now spread across the strip',
      drag: 'Drag to rotate',
      space: 'Space', delete: 'Delete', done: 'Done', keyboard: 'On-screen keyboard', mode: 'Mode',
      letter: letter => `Letter ${letter}`,
      marker: 'Station 1 - Cryptography', intro: 'Introduction to the station', stage: 'Interactive skytale',
      model: 'Rotatable model of a skytale'
    }
  };
  let skytaleMode = 'encrypt';
  let skytaleWrapped = true;
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
      // Unchanged content: keep the running wrap animation untouched.
      if (this.strip && cols === this.cols && cells.join('') === this.cells.join('')) return;
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
      // Keep the current wrap progress so a rebuild never skips the animation.
      if (this.wrapAmount === undefined) this.wrapAmount = this.wrapped ? 1 : 0;
      // Flat strip shows upright letters; on the rod they read along the axis.
      this.upright = this.wrapAmount === 0;
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
      const token = (name, fallback) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
      const paper = token('--color-neutral-100', '#EEF0F3');
      const accent = token('--immersive-accent', '#F79530');
      const ink = token('--color-neutral-900', '#000000');
      const faint = alpha => {
        const value = parseInt(ink.replace('#', ''), 16);
        return `rgba(${value >> 16 & 255}, ${value >> 8 & 255}, ${value & 255}, ${alpha / 100})`;
      };
      const pixelsPerCell = 100;
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, this.cells.length * pixelsPerCell);
      canvas.height = Math.round(this.bandWidth * pixelsPerCell);
      const context = canvas.getContext('2d');
      context.fillStyle = paper;
      context.fillRect(0, 0, canvas.width, canvas.height);
      this.cells.forEach((character, index) => {
        const x = index * pixelsPerCell;
        if (this.showRead && index % this.cols === 0) {
          context.fillStyle = accent;
          context.fillRect(x, 0, pixelsPerCell, canvas.height);
        }
        context.strokeStyle = faint(28);
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
        context.save();
        context.translate(x + pixelsPerCell / 2, canvas.height / 2);
        if (!this.upright) context.rotate(-Math.PI / 2);
        context.fillStyle = character === '·' || character === ' ' ? faint(35) : ink;
        context.font = `500 ${Math.round(Math.min(pixelsPerCell, canvas.height) * .65)}px "DM Mono", monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(character === '·' || character === ' ' ? '•' : character, 0, 0);
        context.restore();
      });
      context.strokeStyle = ink;
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
      // Vertiefung v2: the wound rod fills about two thirds of the stage width
      // and leaves room for the state headline above and the legend below.
      const verticalReach = this.radius * 1.35 + this.stickLength * .05;
      const wrappedFrame = Math.max(this.stickLength * .66, verticalReach * this.aspect / .62);
      const unwrappedFrame = Math.max(this.stickLength * .56, this.stripLength * .54);
      const unwrap = 1 - this.wrapAmount;
      const halfWidth = wrappedFrame + (unwrappedFrame - wrappedFrame) * unwrap;
      const centerY = -1.1 * unwrap;
      this.camera.left = -halfWidth;
      this.camera.right = halfWidth;
      this.camera.top = halfWidth / this.aspect;
      this.camera.bottom = -halfWidth / this.aspect;
      this.camera.position.set(0, centerY, 30);
      this.camera.lookAt(0, centerY, 0);
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
      const upright = this.wrapAmount === 0;
      if (upright !== this.upright) {
        this.upright = upright;
        this.rebuildTexture();
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

  function renderStation(content) {
    document.title = content.meta.title;
    $('frame').setAttribute('aria-label', content.meta.ariaLabel);

    setText('startEyebrow', content.start.eyebrow);
    setTitle('startTitle', content.start.title);
    renderParagraphs('startIntro', [content.start.summary]);
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

  function normUp(value) {
    return value
      .toUpperCase()
      .replace(/Ä/g, 'AE')
      .replace(/Ö/g, 'OE')
      .replace(/Ü/g, 'UE')
      .replace(/ß/g, 'SS');
  }

  // Vertiefung v2: guided flow per mode. Changing texts are written into
  // spans outside the shared translator's selectors (see CHANGELOG.md).
  function setSkytaleMode(mode) {
    skytaleMode = mode;
    const isEncrypting = mode === 'encrypt';
    const action = currentContent().action;
    $('btnEncrypt').classList.toggle('active', isEncrypting);
    $('btnDecrypt').classList.toggle('active', !isEncrypting);
    $('btnEncrypt').setAttribute('aria-selected', String(isEncrypting));
    $('btnDecrypt').setAttribute('aria-selected', String(!isEncrypting));
    $('skyPanel').dataset.mode = mode;
    setText('skyTask', isEncrypting ? currentCopy().taskEncrypt : currentCopy().taskDecrypt);
    closeKeyboard();
    if (isEncrypting) $('skyIn').value = action.skytaleDefaultText;
    $('skyCols').value = String(isEncrypting ? action.skytaleDefaultCols : currentPuzzle().startCols);
    // Every mode starts on the wound rod; decrypting always reads on the rod.
    setWrapped(true);
  }
  function setWrapped(wrapped) {
    skytaleWrapped = wrapped;
    skytaleModel.setWrapped(wrapped);
    // One action button; its label always names the next step.
    $('btnUnwrap').setAttribute('aria-pressed', String(!wrapped));
    setText('unwrapLabel', wrapped ? currentCopy().unwrapAction : currentCopy().rewrapAction);
    $('skyPanel').classList.toggle('is-wrapped', wrapped);
    skytaleRender();
  }
  function chunk(value, size) {
    const groups = [];
    for (let index = 0; index < value.length; index += size) groups.push(value.slice(index, index + size));
    return groups;
  }
  // Letters as spans; orange marks the same line as on the model.
  function renderLetters(container, groups, isMarked) {
    container.replaceChildren();
    let index = 0;
    groups.forEach(group => {
      const groupNode = document.createElement('span');
      groupNode.className = 'letter-group';
      for (const character of group) {
        const letter = document.createElement('span');
        letter.className = 'letter';
        letter.classList.toggle('letter--filler', character === '·');
        letter.classList.toggle('letter--marked', isMarked(index));
        letter.textContent = character;
        groupNode.appendChild(letter);
        index++;
      }
      container.appendChild(groupNode);
    });
  }
  function showPending(container, text) {
    container.replaceChildren();
    const note = document.createElement('span');
    note.className = 'result-pending';
    note.textContent = text;
    container.appendChild(note);
  }
  function skytaleRender() {
    const copy = currentCopy();
    const cols = Number($('skyCols').value);
    const isEncrypting = skytaleMode === 'encrypt';
    const result = $('skyResult');
    let cells;
    let solved = false;
    let note = '';
    let headline;
    setText('skyColsText', copy.keyValue(cols));
    $('keyTicks').querySelectorAll('.key-tick').forEach(tick => {
      tick.classList.toggle('is-active', Number(tick.textContent) === cols);
    });
    $('stepKeyNum').textContent = isEncrypting ? '2' : '1';
    $('resultNum').hidden = isEncrypting;
    if (isEncrypting) {
      const plain = compactMessage($('skyIn').value);
      const strip = plain ? encodeStrip(plain, cols) : '';
      cells = (strip || '·'.repeat(cols)).split('');
      setText('resultTitle', copy.resultCipher);
      if (!plain) {
        showPending(result, copy.resultEmpty);
      } else if (skytaleWrapped) {
        showPending(result, copy.resultCipherPending);
      } else {
        renderLetters(result, chunk(strip, cols), index => index % cols === 0);
        note = copy.resultCipherNote;
      }
      headline = skytaleWrapped ? copy.stageEncWrapped : copy.stageEncUnwrapped;
    } else {
      const puzzle = currentPuzzle();
      const rows = Math.ceil(puzzle.strip.length / cols);
      const padded = puzzle.strip.padEnd(rows * cols, '·');
      let reading = '';
      for (let column = 0; column < cols; column++) {
        for (let row = 0; row < rows; row++) reading += padded.charAt(row * cols + column);
      }
      cells = padded.split('');
      solved = cols === puzzle.cols;
      renderLetters($('stripDisplay'), [puzzle.strip], index => index % cols === 0);
      setText('resultTitle', copy.stepRead);
      if (solved) {
        result.replaceChildren(document.createTextNode(puzzle.plain));
      } else {
        renderLetters(result, chunk(reading, rows), index => index < rows);
      }
      note = solved ? copy.readSolved : copy.readWrong;
      headline = solved ? copy.stageDecSolved : copy.stageDecWrong;
    }
    result.classList.toggle('is-solved', solved);
    result.classList.toggle('is-pending', Boolean(result.querySelector('.result-pending')));
    setText('skyResultNote', note);
    $('btnNextPuzzle').classList.toggle('hidden', !solved);
    setText('stageHeadline', headline);
    $('skyStage').classList.toggle('is-solved', solved);
    setText('stageLegend', skytaleWrapped ? copy.legendWrapped : copy.legendUnwrapped);
    $('stageHint').classList.toggle('is-hidden', !skytaleWrapped);
    skytaleModel.setData(cells, cols);
  }
  function openKeyboard() {
    if (skytaleMode !== 'encrypt') return;
    $('skyKeyboard').classList.remove('hidden');
    $('skyPanel').classList.add('is-typing');
  }
  function closeKeyboard() {
    $('skyKeyboard').classList.add('hidden');
    $('skyPanel').classList.remove('is-typing');
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
        key.dataset.letter = letter;
        key.addEventListener('click', () => typeOnKeyboard(letter));
        row.appendChild(key);
      });
    });
  }
  function buildKeyTicks() {
    const slider = $('skyCols');
    for (let value = Number(slider.min); value <= Number(slider.max); value++) {
      const tick = document.createElement('span');
      tick.className = 'key-tick';
      tick.textContent = String(value);
      tick.addEventListener('click', () => {
        slider.value = String(value);
        skytaleRender();
      });
      $('keyTicks').appendChild(tick);
    }
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
    document.querySelector('.tabs').setAttribute('aria-label', copy.mode);
    $('skyKeyboard').setAttribute('aria-label', copy.keyboard);
    document.querySelectorAll('.keyboard-key[data-letter]').forEach(key => {
      key.setAttribute('aria-label', copy.letter(key.dataset.letter));
    });
    $('btnEncrypt').textContent = copy.encrypt;
    $('btnDecrypt').textContent = copy.decrypt;
    $('btnKeyboardSpace').textContent = copy.space;
    $('btnKeyboardBackspace').textContent = copy.delete;
    $('btnKeyboardDone').textContent = copy.done;
    setText('stepWriteTitle', copy.stepWrite);
    setText('stepKeyTitle', copy.stepKey);
    setText('stripFoundTitle', copy.stripFound);
    setText('nextPuzzleLabel', copy.next);
    setText('takeawayLabel', copy.takeawayLabel);
    setText('takeawayText', copy.takeaway);
    setText('stageHintText', copy.drag);
    puzzleIndex = 0;
    setSkytaleMode(skytaleMode);
  }
  $('btnTry').addEventListener('click', () => {
    screenStart.classList.add('hidden');
    screenAction.classList.remove('hidden');
  });
  $('btnClose').addEventListener('click', () => {
    closeKeyboard();
    screenAction.classList.add('hidden');
    screenStart.classList.remove('hidden');
  });
  $('skyIn').addEventListener('click', openKeyboard);
  $('skyIn').addEventListener('focus', openKeyboard);
  $('skyCols').addEventListener('input', skytaleRender);
  $('btnEncrypt').addEventListener('click', () => setSkytaleMode('encrypt'));
  $('btnDecrypt').addEventListener('click', () => setSkytaleMode('decrypt'));
  $('btnUnwrap').addEventListener('click', () => setWrapped(!skytaleWrapped));
  $('btnKeyboardSpace').addEventListener('click', () => typeOnKeyboard(' '));
  $('btnKeyboardBackspace').addEventListener('click', () => {
    const input = $('skyIn');
    input.value = input.value.slice(0, -1);
    skytaleRender();
  });
  $('btnKeyboardDone').addEventListener('click', () => {
    closeKeyboard();
    $('skyIn').blur();
  });
  $('btnNextPuzzle').addEventListener('click', () => {
    puzzleIndex = (puzzleIndex + 1) % currentContent().action.skytalePuzzles.length;
    setSkytaleMode('decrypt');
  });
  renderStation(currentContent());
  // Shared off-canvas: layout, labels, language and behaviour come from the component.
  StationOffcanvas.create({
    trigger: $('btnReadMore'),
    content: {
      de: { title: STATION_CONTENT.de.start.title, ...STATION_CONTENT.de.start.reading },
      en: { title: STATION_CONTENT.en.start.title, ...STATION_CONTENT.en.start.reading }
    }
  });
  buildKeyboard();
  buildKeyTicks();
  const skytaleModel = new SkytaleModel($('skyCanvas'));
  // Redraw the strip once DM Mono is available, not with the fallback font.
  if (document.fonts) {
    document.fonts.load('500 60px "DM Mono"').then(() => {
      if (skytaleModel.strip) skytaleModel.rebuildTexture();
    });
  }
  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'data-language')) applyLanguage();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
  applyLanguage();
})();
