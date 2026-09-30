const activeTouches = new Map();
const movers = new Map();
const cards = Array.from(document.querySelectorAll(".card"));

const FRAME_MS = 1000 / 60;
const RELEASE_BOOST = 1.2;
const MAX_THROW_SPEED = 4.6;
const CRUISE_PULL = 0.02;
const COLLISION_RESTITUTION = 0.9;
const COLLISION_RADIUS_SCALE = 0.58;
const TAP_MOVE_THRESHOLD = 10;
const STICKY_PULL = 0.12;
const STICKY_DAMPING = 0.82;
const STICKY_MAX_STRETCH = 130;
const STICKY_RELEASE_BOOST = 0.24;
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
        mover.cruiseVx = 0;
        mover.cruiseVy = 0;
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
        mover.cruiseVx = 0;
        mover.cruiseVy = 0;
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
            currentMover.cruiseVx = randomSpeed();
            currentMover.cruiseVy = randomSpeed();
            scheduleGeometrySync(card);
        }
    };

    card.addEventListener("transitionend", finishClosing);
    window.setTimeout(() => finishClosing(), 280);
}

function randomSpeed() {
    const min = 0.35;
    const max = 1.25;
    const speed = min + Math.random() * (max - min);
    const dir = Math.random() < 0.5 ? -1 : 1;
    return speed * dir;
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
    mover.radius = Math.min(rect.width, rect.height) * COLLISION_RADIUS_SCALE;
}

function scheduleGeometrySync(card) {
    syncMoverGeometry(card);
    keepCardInViewport(card);
    requestAnimationFrame(() => syncMoverGeometry(card));
    requestAnimationFrame(() => keepCardInViewport(card));
    setTimeout(() => {
        syncMoverGeometry(card);
        keepCardInViewport(card);
    }, 230);
}

function initMover(card) {
    const rect = card.getBoundingClientRect();
    const cruiseVx = randomSpeed();
    const cruiseVy = randomSpeed();

    movers.set(card, {
        x: rect.left,
        y: rect.top,
        vx: cruiseVx,
        vy: cruiseVy,
        cruiseVx,
        cruiseVy,
        width: rect.width,
        height: rect.height,
        radius: Math.min(rect.width, rect.height) * COLLISION_RADIUS_SCALE
    });
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
        const sticky = stickyTargets.get(touch.element);
        if (sticky && !touch.element.classList.contains("open")) {
            mover.vx = (sticky.x - mover.x) * STICKY_RELEASE_BOOST;
            mover.vy = (sticky.y - mover.y) * STICKY_RELEASE_BOOST;
        } else {
            mover.vx = clamp(touch.throwVx * RELEASE_BOOST, -MAX_THROW_SPEED, MAX_THROW_SPEED);
            mover.vy = clamp(touch.throwVy * RELEASE_BOOST, -MAX_THROW_SPEED, MAX_THROW_SPEED);
        }
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
        mover.vx = instVx;
        mover.vy = instVy;
    }
}, { passive: false });

window.addEventListener("pointerup", e => {
    releaseTouch(e.pointerId);
});

window.addEventListener("pointercancel", e => {
    releaseTouch(e.pointerId);
});

function resolveCardCollisions() {
    const entries = Array.from(movers.entries());

    for (let i = 0; i < entries.length; i++) {
        const [cardA, a] = entries[i];
        const grabbedA = isCardGrabbed(cardA);
        const lockedA = isCardLocked(cardA);

        const ax = a.x + a.width / 2;
        const ay = a.y + a.height / 2;

        for (let j = i + 1; j < entries.length; j++) {
            const [cardB, b] = entries[j];
            const grabbedB = isCardGrabbed(cardB);
            const lockedB = isCardLocked(cardB);
            if ((grabbedA || lockedA) && (grabbedB || lockedB)) continue;

            const bx = b.x + b.width / 2;
            const by = b.y + b.height / 2;

            let dx = bx - ax;
            let dy = by - ay;
            let dist = Math.hypot(dx, dy);
            const minDist = a.radius + b.radius;

            if (dist === 0) {
                dx = 1;
                dy = 0;
                dist = 1;
            }

            if (dist >= minDist) continue;

            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            // Separate cards first so they do not stay interpenetrating.
            if ((grabbedA || lockedA) && !(grabbedB || lockedB)) {
                b.x += nx * overlap;
                b.y += ny * overlap;
            } else if (!(grabbedA || lockedA) && (grabbedB || lockedB)) {
                a.x -= nx * overlap;
                a.y -= ny * overlap;
            } else {
                a.x -= nx * (overlap / 2);
                a.y -= ny * (overlap / 2);
                b.x += nx * (overlap / 2);
                b.y += ny * (overlap / 2);
            }

            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;
            const velAlongNormal = (rvx * nx) + (rvy * ny);

            if (velAlongNormal > 0) continue;

            const canMoveA = !grabbedA && !lockedA;
            const canMoveB = !grabbedB && !lockedB;
            const invMassSum = (canMoveA ? 1 : 0) + (canMoveB ? 1 : 0);
            if (invMassSum === 0) continue;

            const impulse = -((1 + COLLISION_RESTITUTION) * velAlongNormal) / invMassSum;
            const impulseX = impulse * nx;
            const impulseY = impulse * ny;

            if (canMoveA) {
                a.vx -= impulseX;
                a.vy -= impulseY;
            }

            if (canMoveB) {
                b.vx += impulseX;
                b.vy += impulseY;
            }
        }
    }
}

function tick() {
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
        } else {
            mover.vx += (mover.cruiseVx - mover.vx) * CRUISE_PULL;
            mover.vy += (mover.cruiseVy - mover.vy) * CRUISE_PULL;
        }

        mover.x += mover.vx;
        mover.y += mover.vy;

        if (mover.x <= 0) {
            mover.x = 0;
            mover.vx = Math.abs(mover.vx);
            mover.cruiseVx = Math.abs(mover.cruiseVx);
        } else if (mover.x + mover.width >= maxX) {
            mover.x = maxX - mover.width;
            mover.vx = -Math.abs(mover.vx);
            mover.cruiseVx = -Math.abs(mover.cruiseVx);
        }

        if (mover.y <= 0) {
            mover.y = 0;
            mover.vy = Math.abs(mover.vy);
            mover.cruiseVy = Math.abs(mover.cruiseVy);
        } else if (mover.y + mover.height >= maxY) {
            mover.y = maxY - mover.height;
            mover.vy = -Math.abs(mover.vy);
            mover.cruiseVy = -Math.abs(mover.cruiseVy);
        }
    });

    resolveCardCollisions();

    movers.forEach((mover, card) => {
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
        mover.radius = Math.min(rect.width, rect.height) * COLLISION_RADIUS_SCALE;

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