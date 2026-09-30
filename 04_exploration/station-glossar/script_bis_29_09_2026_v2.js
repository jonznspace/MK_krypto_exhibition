const activeTouches = new Map();
const movers = new Map();
const cards = Array.from(document.querySelectorAll(".card"));

/*
BEWEGUNG / PHYSIK
SUCHWORT: CARD_MOTION_SETTINGS

- CRUISE_SPEED:       Konstante Reisegeschwindigkeit aller Karten (px pro 60fps-Frame).
- MAX_SPEED:          Absolute Obergrenze, auch direkt nach einem Wurf.
- SPEED_RECOVERY:     Wie schnell eine geworfene Karte wieder auf CRUISE_SPEED zurueckfaellt.
- MAX_PUSH_PER_FRAME: Max. Verschiebung pro Frame beim Aufloesen von Ueberlappungen.
                      Verhindert, dass Karten unter einer grossen offenen Karte "rausschiessen".
- MIN_AXIS_SHARE:     Mindestanteil jeder Richtungsachse, damit Karten nie exakt waagerecht/
                      senkrecht an einer Wand kleben bleiben.
*/
const FRAME_MS = 1000 / 60;
const CRUISE_SPEED = 0.9;
const MAX_SPEED = 4.6;
const SPEED_RECOVERY = 0.03;
const MAX_PUSH_PER_FRAME = 3;
const MIN_AXIS_SHARE = 0.25;
// 0 = Hitbox exakt an der Aussenkante (Kante an Kante). Positiv = Abstand, negativ = leichtes Ueberlappen.
const COLLISION_GAP = 0;
const MAX_FRAME_STEPS = 3;
const TAP_MOVE_THRESHOLD = 10;
const STICKY_PULL = 0.12;
const STICKY_DAMPING = 0.82;
const STICKY_MAX_STRETCH = 130;
let topLayer = 20;
const openCards = new Set();
const closingCards = new Set();
let stickyTargets = new Map();

const cardById = new Map();

cards.forEach(card => {
    if (card.dataset.id) {
        cardById.set(card.dataset.id, card);
    }
});

function parseLinks(card) {
    const raw = card.dataset.links || "";
    return raw
        .split(",")
        .map(value => value.trim())
        .filter(Boolean);
}

function getRelatedCards(baseCard) {
    const baseId = baseCard.dataset.id;
    if (!baseId) return [];

    const related = new Set();

    parseLinks(baseCard).forEach(targetId => {
        const target = cardById.get(targetId);
        if (target && target !== baseCard) {
            related.add(target);
        }
    });

    cards.forEach(card => {
        if (card === baseCard) return;
        if (parseLinks(card).includes(baseId)) {
            related.add(card);
        }
    });

    return Array.from(related);
}

function computeStickyTargets() {
    const accumulator = new Map();

    openCards.forEach(openCard => {
        const sourceMover = movers.get(openCard);
        if (!sourceMover) return;

        const relatedCards = getRelatedCards(openCard).filter(card => !openCards.has(card));
        if (!relatedCards.length) return;

        const sourceCenterX = sourceMover.x + (sourceMover.width / 2);
        const sourceCenterY = sourceMover.y + (sourceMover.height / 2);
        const radius = Math.max(sourceMover.width, sourceMover.height) * 0.68 + 80;

        relatedCards.forEach((card, index) => {
            const mover = movers.get(card);
            if (!mover) return;

            const angle = (-Math.PI / 2) + ((Math.PI * 2 * index) / relatedCards.length);
            const rawX = sourceCenterX + (Math.cos(angle) * radius) - (mover.width / 2);
            const rawY = sourceCenterY + (Math.sin(angle) * radius) - (mover.height / 2);

            const x = clamp(rawX, 0, Math.max(0, window.innerWidth - mover.width));
            const y = clamp(rawY, 0, Math.max(0, window.innerHeight - mover.height));

            const existing = accumulator.get(card);
            if (existing) {
                existing.sumX += x;
                existing.sumY += y;
                existing.count += 1;
            } else {
                accumulator.set(card, { sumX: x, sumY: y, count: 1 });
            }
        });
    });

    const nextTargets = new Map();
    accumulator.forEach((value, card) => {
        nextTargets.set(card, {
            x: value.sumX / value.count,
            y: value.sumY / value.count
        });
    });

    return nextTargets;
}

function getStickyTargets() {
    if (typeof window.computeStickyTargets === "function") {
        return window.computeStickyTargets();
    }

    return computeStickyTargets();
}

function openCard(card) {
    closingCards.delete(card);
    card.classList.remove("closing");
    openCards.add(card);
    card.classList.add("open");
    card.style.zIndex = (++topLayer).toString();

    const mover = movers.get(card);
    if (mover) {
        mover.vx = 0;
        mover.vy = 0;
        scheduleGeometrySync(card);
    }
}

function closeCard(card) {
    if (!card.classList.contains("open")) return;

    closingCards.add(card);
    card.classList.remove("open");

    const mover = movers.get(card);
    if (mover) {
        mover.vx = 0;
        mover.vy = 0;
    }

    card.classList.add("closing");

    const finishClosing = event => {
        if (!closingCards.has(card)) return;
        if (event && event.propertyName !== "width" && event.propertyName !== "height") return;
        card.removeEventListener("transitionend", finishClosing);
        card.classList.remove("closing");
        closingCards.delete(card);
        openCards.delete(card);

        const currentMover = movers.get(card);
        if (currentMover) {
            setRandomVelocity(currentMover);
            scheduleGeometrySync(card);
        }
    };

    card.addEventListener("transitionend", finishClosing);
    window.setTimeout(() => finishClosing(), 280);
}

function setRandomVelocity(mover) {
    const angle = Math.random() * Math.PI * 2;
    mover.vx = Math.cos(angle) * CRUISE_SPEED;
    mover.vy = Math.sin(angle) * CRUISE_SPEED;
    normalizeVelocity(mover, CRUISE_SPEED);
}

// Richtung beibehalten, Betrag fest auf `speed` setzen.
// Ausserdem: keine Achse darf fast 0 sein (sonst kleben Karten an Waenden).
function normalizeVelocity(mover, speed) {
    let len = Math.hypot(mover.vx, mover.vy);
    if (len < 0.0001) {
        const angle = Math.random() * Math.PI * 2;
        mover.vx = Math.cos(angle);
        mover.vy = Math.sin(angle);
        len = 1;
    }

    let dx = mover.vx / len;
    let dy = mover.vy / len;

    if (Math.abs(dx) < MIN_AXIS_SHARE) dx = (dx < 0 ? -1 : 1) * MIN_AXIS_SHARE;
    if (Math.abs(dy) < MIN_AXIS_SHARE) dy = (dy < 0 ? -1 : 1) * MIN_AXIS_SHARE;

    const fixedLen = Math.hypot(dx, dy);
    mover.vx = (dx / fixedLen) * speed;
    mover.vy = (dy / fixedLen) * speed;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function keepCardInViewport(card) {
    const mover = movers.get(card);
    if (!mover) return;

    const maxX = Math.max(0, window.innerWidth - mover.width);
    const maxY = Math.max(0, window.innerHeight - mover.height);

    mover.x = clamp(mover.x, 0, maxX);
    mover.y = clamp(mover.y, 0, maxY);
    card.style.left = mover.x + "px";
    card.style.top = mover.y + "px";
}

function syncMoverGeometry(card) {
    const mover = movers.get(card);
    if (!mover) return;

    const rect = card.getBoundingClientRect();
    mover.x = rect.left;
    mover.y = rect.top;
    mover.width = rect.width;
    mover.height = rect.height;
}

function scheduleGeometrySync(card) {
    syncMoverGeometry(card);
    keepCardInViewport(card);
    requestAnimationFrame(() => syncMoverGeometry(card));
    requestAnimationFrame(() => keepCardInViewport(card));
    setTimeout(() => {
        syncMoverGeometry(card);
        keepCardInViewport(card);
    }, 260);
}

function initMover(card) {
    const rect = card.getBoundingClientRect();
    const mover = {
        x: rect.left,
        y: rect.top,
        vx: 0,
        vy: 0,
        width: rect.width,
        height: rect.height
    };
    setRandomVelocity(mover);
    movers.set(card, mover);
}

function isCardGrabbed(card) {
    for (const touch of activeTouches.values()) {
        if (touch.element === card) return true;
    }
    return false;
}

function isCardLocked(card) {
    return (card.classList.contains("open") || closingCards.has(card)) && !isCardGrabbed(card);
}

function releaseTouch(pointerId) {
    const touch = activeTouches.get(pointerId);
    if (!touch) return;

    const mover = movers.get(touch.element);
    if (mover && touch.moved) {
        mover.vx = touch.throwVx;
        mover.vy = touch.throwVy;
        const speed = clamp(Math.hypot(mover.vx, mover.vy), CRUISE_SPEED, MAX_SPEED);
        normalizeVelocity(mover, speed);
    }

    if (!touch.moved) {
        openCard(touch.element);
    }

    activeTouches.delete(pointerId);
}

cards.forEach(card => {
    initMover(card);

    card.addEventListener("pointerdown", e => {
        if (e.target.closest(".card-close")) {
            return;
        }

        // Prevent native touch gestures from stealing the pointer stream.
        e.preventDefault();

        const rect = card.getBoundingClientRect();

        card.setPointerCapture(e.pointerId);
        card.style.zIndex = (++topLayer).toString();

        activeTouches.set(e.pointerId, {
            element: card,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
            startX: e.clientX,
            startY: e.clientY,
            lastX: e.clientX,
            lastY: e.clientY,
            lastTime: performance.now(),
            throwVx: 0,
            throwVy: 0,
            moved: false
        });
    });

    card.addEventListener("transitionend", e => {
        if (e.propertyName === "width" || e.propertyName === "height") {
            syncMoverGeometry(card);
            if (card.classList.contains("open")) keepCardInViewport(card);
        }
    });

    const closeButton = card.querySelector(".card-close");
    if (closeButton) {
        closeButton.addEventListener("click", e => {
            e.stopPropagation();
            closeCard(card);
        });
    }
});

window.addEventListener("pointermove", e => {
    const touch = activeTouches.get(e.pointerId);
    if (!touch) return;

    // Keep drag fully controlled by the app on touch hardware.
    e.preventDefault();
    e.stopPropagation();

    const now = performance.now();
    const dt = Math.max(1, now - touch.lastTime);
    const instVx = ((e.clientX - touch.lastX) / dt) * FRAME_MS;
    const instVy = ((e.clientY - touch.lastY) / dt) * FRAME_MS;

    touch.throwVx = (touch.throwVx * 0.55) + (instVx * 0.45);
    touch.throwVy = (touch.throwVy * 0.55) + (instVy * 0.45);
    touch.lastX = e.clientX;
    touch.lastY = e.clientY;
    touch.lastTime = now;

    const nextX = e.clientX - touch.offsetX;
    const nextY = e.clientY - touch.offsetY;
    const dragDistance = Math.hypot(e.clientX - touch.startX, e.clientY - touch.startY);

    if (dragDistance > TAP_MOVE_THRESHOLD) {
        touch.moved = true;
    }

    let constrainedX = nextX;
    let constrainedY = nextY;

    const sticky = stickyTargets.get(touch.element);
    if (sticky && !touch.element.classList.contains("open")) {
        const dx = constrainedX - sticky.x;
        const dy = constrainedY - sticky.y;
        const dist = Math.hypot(dx, dy);

        if (dist > STICKY_MAX_STRETCH) {
            const nx = dx / dist;
            const ny = dy / dist;
            constrainedX = sticky.x + (nx * STICKY_MAX_STRETCH);
            constrainedY = sticky.y + (ny * STICKY_MAX_STRETCH);
        }
    }

    touch.element.style.left = constrainedX + "px";
    touch.element.style.top = constrainedY + "px";

    const mover = movers.get(touch.element);
    if (mover) {
        mover.x = constrainedX;
        mover.y = constrainedY;
    }
}, { passive: false });

window.addEventListener("pointerup", e => {
    releaseTouch(e.pointerId);
});

window.addEventListener("pointercancel", e => {
    releaseTouch(e.pointerId);
});

// Rechteck-Kollision (statt Kreis): passt zu den eckigen Karten, auch zu grossen offenen.
// Ueberlappungen werden nur schrittweise (MAX_PUSH_PER_FRAME) aufgeloest und die
// Geschwindigkeit wird nur gespiegelt – es kommt also nie Energie hinzu.
function resolveCardCollisions(dt) {
    const entries = Array.from(movers.entries());
    const maxPush = MAX_PUSH_PER_FRAME * dt;

    for (let i = 0; i < entries.length; i++) {
        const [cardA, a] = entries[i];
        const canMoveA = !isCardGrabbed(cardA) && !isCardLocked(cardA);

        for (let j = i + 1; j < entries.length; j++) {
            const [cardB, b] = entries[j];
            const canMoveB = !isCardGrabbed(cardB) && !isCardLocked(cardB);
            if (!canMoveA && !canMoveB) continue;

            const overlapX = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x) + COLLISION_GAP;
            const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y) + COLLISION_GAP;
            if (overlapX <= 0 || overlapY <= 0) continue;

            const axis = overlapX < overlapY ? "x" : "y";
            const overlap = axis === "x" ? overlapX : overlapY;
            const size = axis === "x" ? "width" : "height";
            const v = axis === "x" ? "vx" : "vy";

            const centerA = a[axis] + a[size] / 2;
            const centerB = b[axis] + b[size] / 2;
            const sign = centerB >= centerA ? 1 : -1; // Richtung von A nach B

            const share = canMoveA && canMoveB ? overlap / 2 : overlap;
            const push = Math.min(share, maxPush);

            if (canMoveA) {
                a[axis] -= sign * push;
                a[v] = -sign * Math.abs(a[v]);
            }
            if (canMoveB) {
                b[axis] += sign * push;
                b[v] = sign * Math.abs(b[v]);
            }
        }
    }
}

let lastTickTime = null;

function tick(now) {
    const dt = lastTickTime === null ? 1 : clamp((now - lastTickTime) / FRAME_MS, 0, MAX_FRAME_STEPS);
    lastTickTime = now;

    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    stickyTargets = getStickyTargets();

    movers.forEach((mover, card) => {
        if (isCardGrabbed(card) || isCardLocked(card)) return;

        const sticky = stickyTargets.get(card);
        if (sticky) {
            mover.vx += (sticky.x - mover.x) * STICKY_PULL;
            mover.vy += (sticky.y - mover.y) * STICKY_PULL;
            mover.vx *= STICKY_DAMPING;
            mover.vy *= STICKY_DAMPING;
            const len = Math.hypot(mover.vx, mover.vy);
            if (len > MAX_SPEED) {
                mover.vx = (mover.vx / len) * MAX_SPEED;
                mover.vy = (mover.vy / len) * MAX_SPEED;
            }
        } else {
            // Konstante Geschwindigkeit: Betrag gleitet zurueck auf CRUISE_SPEED, nie ueber MAX_SPEED.
            const speed = Math.hypot(mover.vx, mover.vy);
            const nextSpeed = clamp(
                speed + (CRUISE_SPEED - speed) * Math.min(1, SPEED_RECOVERY * dt),
                CRUISE_SPEED * 0.5,
                MAX_SPEED
            );
            normalizeVelocity(mover, nextSpeed);
        }

        mover.x += mover.vx * dt;
        mover.y += mover.vy * dt;

        if (mover.x <= 0) {
            mover.x = 0;
            mover.vx = Math.abs(mover.vx);
        } else if (mover.x + mover.width >= maxX) {
            mover.x = maxX - mover.width;
            mover.vx = -Math.abs(mover.vx);
        }

        if (mover.y <= 0) {
            mover.y = 0;
            mover.vy = Math.abs(mover.vy);
        } else if (mover.y + mover.height >= maxY) {
            mover.y = maxY - mover.height;
            mover.vy = -Math.abs(mover.vy);
        }
    });

    resolveCardCollisions(dt);

    movers.forEach((mover, card) => {
        // Nach dem Kollisions-Schieben nochmal in den Bildschirm holen.
        if (!isCardGrabbed(card) && !isCardLocked(card)) {
            mover.x = clamp(mover.x, 0, Math.max(0, maxX - mover.width));
            mover.y = clamp(mover.y, 0, Math.max(0, maxY - mover.height));
        }
        card.style.left = mover.x + "px";
        card.style.top = mover.y + "px";
    });

    requestAnimationFrame(tick);
}

window.addEventListener("resize", () => {
    movers.forEach((mover, card) => {
        const rect = card.getBoundingClientRect();
        mover.width = rect.width;
        mover.height = rect.height;

        mover.x = Math.min(Math.max(mover.x, 0), Math.max(0, window.innerWidth - mover.width));
        mover.y = Math.min(Math.max(mover.y, 0), Math.max(0, window.innerHeight - mover.height));
    });

});

cards.forEach(card => {
    const title = card.dataset.title;
    const text = card.dataset.text;
    const symbolNode = card.querySelector(".card-symbol");
    const titleNode = card.querySelector(".card-title");
    const textNode = card.querySelector(".card-text");

    if (symbolNode && title) {
        symbolNode.textContent = title;
    }

    if (titleNode && title) {
        titleNode.textContent = title;
    }

    if (textNode && text) {
        textNode.textContent = text;
    }
});

requestAnimationFrame(tick);
