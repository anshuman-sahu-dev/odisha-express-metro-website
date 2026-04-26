/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — routes.js
   Expandable line cards, station track renderer
═══════════════════════════════════════════════════ */

'use strict';

/* ── Toggle a route line open/close ─────────────── */
function toggleRoute(lineId) {
  const panel = document.getElementById('route-' + lineId);
  const icon  = document.getElementById(lineId + 'Icon');
  if (!panel) return;

  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (icon) icon.classList.toggle('open', !isOpen);

  /* Render stations on first open */
  if (!isOpen) {
    const track = document.getElementById('track-' + lineId);
    if (track && track.childElementCount === 0) {
      renderStationTrack(lineId, track);
    }
  }
}

/* ── Render horizontal station track ─────────────── */
function renderStationTrack(lineId, container) {
  const line = window.OE_DATA?.lines[lineId];
  if (!line || !container) return;

  container.innerHTML = line.stations.map((st, i) => `
    <div class="station-node" title="${st.name} — ${st.km} km">
      <div class="station-code">${st.code}</div>
      <div class="station-dot${i === 0 || i === line.stations.length - 1 ? ' active' : ''}"></div>
      <div class="station-name-label">${st.name}</div>
      <div class="station-index">S-${String(i + 1).padStart(2, '0')}</div>
    </div>
  `).join('');
}

/* ── Init ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  function tryInit() {
    if (!window.OE_DATA) { setTimeout(tryInit, 100); return; }
    /* Expose toggle globally (called from HTML onclick) */
    window.toggleRoute = toggleRoute;
  }
  tryInit();
});
