'use strict';

function toggleRoute(lineId) {
  const panel = document.getElementById('route-' + lineId);
  const icon = document.getElementById(lineId + 'Icon');
  if (!panel) return;

  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (icon) icon.classList.toggle('open', !isOpen);

  if (!isOpen) {
    const track = document.getElementById('track-' + lineId);
    if (track && track.childElementCount === 0) {
      renderStationTrack(lineId, track);
    }
  }
}

function renderStationTrack(lineId, container) {
  const line = window.OE_DATA?.lines[lineId];
  if (!line || !container) return;

  container.innerHTML = line.stations.map((station, index) => {
    const isOrigin = index === 0;
    const isTerminal = index === line.stations.length - 1;

    return `
      <div class="station-node" title="${station.name} - ${station.km} km">
        <div class="station-code">${station.code}</div>
        <div class="station-dot${isOrigin ? ' station-dot--origin' : ''}${isTerminal ? ' station-dot--terminal' : ''}">
          ${isOrigin ? `
            <svg class="station-origin-train" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="4" y="3" width="16" height="13" rx="2"></rect>
              <path d="M8 16l-2 4"></path>
              <path d="M16 16l2 4"></path>
              <path d="M8 20h8"></path>
              <path d="M8 7h.01"></path>
              <path d="M16 7h.01"></path>
              <path d="M6 11h12"></path>
            </svg>
          ` : ''}
        </div>
        <div class="station-name-label">${station.name}</div>
        <div class="station-index">S-${String(index + 1).padStart(2, '0')}</div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  function tryInit() {
    if (!window.OE_DATA) {
      setTimeout(tryInit, 100);
      return;
    }

    window.toggleRoute = toggleRoute;
  }

  tryInit();
});
