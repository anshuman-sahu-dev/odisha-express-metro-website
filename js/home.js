/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — home.js  (FIXED)
   360° draggable metro card — all bugs resolved
═══════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════
   SHARED DRAG STATE
══════════════════════════════════════════════════ */
const dragState = {
  card:       null,
  active:     false,
  startX:     0,
  startY:     0,
  rotX:       -6,
  rotY:       0,
  baseRotX:   -6,
  baseRotY:   0,
  velX:       0,
  velY:       0,
  rafId:      null,
};

/* ══════════════════════════════════════════════════
   APPLY TRANSFORM  ← the single source of truth
   Kills the CSS animation first so it can't override
══════════════════════════════════════════════════ */
function applyTransform(card, rotX, rotY) {
  if (!card) return;
  card.style.animation = 'none';   /* CRITICAL – stops cardFloat overriding */
  card.style.willChange = 'transform';
  card.style.transform =
    `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}

/* ══════════════════════════════════════════════════
   MOUSE DRAG
══════════════════════════════════════════════════ */
function handleMouseDown(e) {
  if (e.button !== 0) return;
  const card = e.currentTarget;

  stopInertia();
  dragState.card     = card;
  dragState.active   = true;
  dragState.startX   = e.clientX;
  dragState.startY   = e.clientY;
  dragState.baseRotX = dragState.rotX;
  dragState.baseRotY = dragState.rotY;
  dragState.velX     = 0;
  dragState.velY     = 0;

  card.style.cursor           = 'grabbing';
  document.body.style.userSelect = 'none';

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup',   handleMouseUp);
  e.preventDefault();
}

function handleMouseMove(e) {
  if (!dragState.active) return;

  const dx = e.clientX - dragState.startX;
  const dy = e.clientY - dragState.startY;

  const newRotY = dragState.baseRotY + dx * 0.7;
  const newRotX = clampX(dragState.baseRotX - dy * 0.4);

  /* Track per-frame delta for inertia */
  dragState.velY = newRotY - dragState.rotY;
  dragState.velX = newRotX - dragState.rotX;

  dragState.rotX = newRotX;
  dragState.rotY = newRotY;

  applyTransform(dragState.card, rotX(), rotY());
}

function handleMouseUp() {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup',   handleMouseUp);
  if (!dragState.active) return;
  dragState.active = false;
  if (dragState.card) dragState.card.style.cursor = 'grab';
  document.body.style.userSelect = '';
  startInertia();
}

/* ══════════════════════════════════════════════════
   TOUCH DRAG
══════════════════════════════════════════════════ */
function handleTouchStart(e) {
  if (e.touches.length !== 1) return;
  const t = e.touches[0];

  stopInertia();
  dragState.card     = e.currentTarget;
  dragState.active   = true;
  dragState.startX   = t.clientX;
  dragState.startY   = t.clientY;
  dragState.baseRotX = dragState.rotX;
  dragState.baseRotY = dragState.rotY;
  dragState.velX     = 0;
  dragState.velY     = 0;
}

function handleTouchMove(e) {
  if (!dragState.active || e.touches.length !== 1) return;
  e.preventDefault(); /* prevent page scroll during card drag */

  const t  = e.touches[0];
  const dx = t.clientX - dragState.startX;
  const dy = t.clientY - dragState.startY;

  const newRotY = dragState.baseRotY + dx * 0.7;
  const newRotX = clampX(dragState.baseRotX - dy * 0.4);

  dragState.velY = newRotY - dragState.rotY;
  dragState.velX = newRotX - dragState.rotX;
  dragState.rotX = newRotX;
  dragState.rotY = newRotY;

  applyTransform(dragState.card, rotX(), rotY());
}

function handleTouchEnd() {
  if (!dragState.active) return;
  dragState.active = false;
  startInertia();
}

/* ══════════════════════════════════════════════════
   INERTIA COAST
══════════════════════════════════════════════════ */
function startInertia() {
  const card = dragState.card;
  if (!card) return;

  let vx = dragState.velX;
  let vy = dragState.velY;

  function step() {
    if (Math.abs(vx) < 0.04 && Math.abs(vy) < 0.04) return;

    dragState.rotX = clampX(dragState.rotX + vx);
    dragState.rotY += vy;
    vx *= 0.88;
    vy *= 0.88;

    applyTransform(card, rotX(), rotY());
    dragState.rafId = requestAnimationFrame(step);
  }

  dragState.rafId = requestAnimationFrame(step);
}

function stopInertia() {
  if (dragState.rafId) {
    cancelAnimationFrame(dragState.rafId);
    dragState.rafId = null;
  }
}

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
function clampX(v)  { return Math.max(-35, Math.min(35, v)); }
function rotX()     { return dragState.rotX; }
function rotY()     { return dragState.rotY; }

/* ══════════════════════════════════════════════════
   DOUBLE-CLICK / DOUBLE-TAP FLIP (180°)
══════════════════════════════════════════════════ */
function doFlip(card) {
  if (!card || dragState.active) return;
  stopInertia();

  const fromY   = dragState.rotY;
  const toY     = dragState.rotY + 180;
  const fromX   = dragState.rotX;
  const dur     = 550;
  const t0      = performance.now();

  function tick(now) {
    const p    = Math.min((now - t0) / dur, 1);
    const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
    dragState.rotY = fromY + (toY - fromY) * ease;
    dragState.rotX = fromX * (1 - ease);
    applyTransform(card, rotX(), rotY());
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ══════════════════════════════════════════════════
   ATTACH — bind all events to one card element
══════════════════════════════════════════════════ */
function attachDrag(card) {
  if (!card || card.dataset.dragBound === '1') return;
  card.dataset.dragBound = '1';

  /* Kill floating CSS animation at source */
  card.style.animation = 'none';
  card.style.cursor    = 'grab';

  /* Mouse */
  card.addEventListener('mousedown', handleMouseDown);

  /* Touch */
  card.addEventListener('touchstart', handleTouchStart, { passive: true  });
  card.addEventListener('touchmove',  handleTouchMove,  { passive: false });
  card.addEventListener('touchend',   handleTouchEnd,   { passive: true  });

  /* Flip */
  card.addEventListener('dblclick', () => doFlip(card));

  /* Double-tap detection for mobile */
  let lastTap = 0;
  card.addEventListener('touchend', () => {
    const now = Date.now();
    if (now - lastTap < 280) doFlip(card);
    lastTap = now;
  });
}

/* ══════════════════════════════════════════════════
   INIT ALL HERO CARDS
══════════════════════════════════════════════════ */
function initAllCards() {
  /* Main interactive card in hero-1 */
  const main = document.getElementById('metroCard');
  if (main) {
    applyTransform(main, dragState.rotX, dragState.rotY);
    attachDrag(main);
  }

  /* Other hero cards — static tilt, still draggable */
  document.querySelectorAll('.metro-card:not(#metroCard)').forEach(card => {
    card.style.animation = 'none';
    const isLeft = !!card.closest('.hero-card-wrap--left');
    card.style.transform =
      `perspective(1000px) rotateX(-5deg) rotateY(${isLeft ? 8 : -8}deg)`;
    attachDrag(card);
  });
}

/* ══════════════════════════════════════════════════
   SCROLL REVEAL — ONLY hero-content, NOT card wraps
   (putting translateY on card wraps broke transforms)
══════════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll('.hero-content, .home-footer');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

  targets.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    io.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('page-home')) return;

  initAllCards();
  initScrollReveal();

  window.flipCard = () => doFlip(document.getElementById('metroCard'));
});