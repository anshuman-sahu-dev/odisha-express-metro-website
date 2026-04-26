/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — timetable.js
   Live departures + complete schedule rendering
═══════════════════════════════════════════════════ */

'use strict';

const TT = {
  currentLine:    'blue',
  currentStation: 0,
  currentDay:     'weekday',
  liveInterval:   null,

  /* ── Init ──────────────────────────────────────── */
  init() {
    this.lineSelect    = document.getElementById('ttLine');
    this.stationSelect = document.getElementById('ttStation');
    this.daySelect     = document.getElementById('ttDay');
    if (!this.lineSelect) return;

    this.lineSelect.addEventListener('change',    () => this.onLineChange());
    this.stationSelect.addEventListener('change', () => this.onStationChange());
    this.daySelect.addEventListener('change',     () => this.onDayChange());

    this.populateStations('blue');
    this.render();

    /* Refresh live times and clock every 30s */
    if (this.liveInterval) clearInterval(this.liveInterval);
    this.updateClock();
    this.liveInterval = setInterval(() => {
      this.renderLive();
      this.updateClock();
    }, 30000);
  },

  updateClock() {
    const syncVal = document.querySelector('#page-timetable .sb-value.online');
    if (!syncVal) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    syncVal.textContent = `LIVE @ ${timeStr}`;
  },

  /* ── Populate station dropdown ─────────────────── */
  populateStations(lineId) {
    const data = window.OE_DATA?.lines[lineId];
    if (!data) return;
    const sel = this.stationSelect;
    if (!sel) return;
    sel.innerHTML = '';
    data.stations.forEach((st, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${st.name} (${st.code})`;
      sel.appendChild(opt);
    });
    this.updateLineTag(lineId);
  },

  updateLineTag(lineId) {
    const data = window.OE_DATA?.lines[lineId];
    const tag  = document.getElementById('ttLineTag');
    if (tag && data) tag.textContent = `[${data.name.toUpperCase().replace(' ', '_')}.ACTIVE]`;
  },

  /* ── Event handlers ─────────────────────────────── */
  onLineChange() {
    this.currentLine    = this.lineSelect.value;
    this.currentStation = 0;
    this.populateStations(this.currentLine);
    this.render();
  },
  onStationChange() {
    this.currentStation = parseInt(this.stationSelect.value) || 0;
    this.render();
  },
  onDayChange() {
    this.currentDay = this.daySelect.value;
    this.render();
  },

  /* ── Full render ─────────────────────────────────── */
  render() {
    const line = window.OE_DATA?.lines[this.currentLine];
    if (!line) return;
    const stName = line.stations[this.currentStation]?.name || '';

    /* Update station name labels */
    const nameEls = document.querySelectorAll('#ttStationName, #ttCompleteStation');
    nameEls.forEach(el => { el.textContent = stName.toUpperCase(); });

    /* Directions */
    const upDest = document.getElementById('ttUpDest');
    const dnDest = document.getElementById('ttDnDest');
    if (upDest) upDest.textContent = `TOWARDS ${line.to.toUpperCase()}`;
    if (dnDest) dnDest.textContent = `TOWARDS ${line.from.toUpperCase()}`;

    this.renderLive();
    this.renderComplete();
  },

  /* ── Live departures ─────────────────────────────── */
  renderLive() {
    const { up, dn } = window.OE_DATA.generateTimetable(this.currentLine, this.currentStation, this.currentDay);
    const now = window.OE_DATA.nowInMins();

    /* Filter upcoming only, next 10 */
    const upComing = up.filter(t => {
      const [h, m] = t.dep.split(':').map(Number);
      return (h * 60 + m) >= now;
    }).slice(0, 10);

    const dnComing = dn.filter(t => {
      const [h, m] = t.dep.split(':').map(Number);
      return (h * 60 + m) >= now;
    }).slice(0, 10);

    this.renderTrainCards('ttUpTrains', upComing, true);
    this.renderTrainCards('ttDnTrains', dnComing, false);
  },

  renderTrainCards(containerId, trains, isUp) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!trains.length) {
      container.innerHTML = `<div class="tt-no-service">NO SERVICES CURRENTLY SCHEDULED</div>`;
      return;
    }

    const now = window.OE_DATA.nowInMins();
    container.innerHTML = trains.map((t, i) => {
      const [h, m] = t.dep.split(':').map(Number);
      const depMins = h * 60 + m;
      const diff = depMins - now;
      const minsLabel = diff <= 0 ? 'NOW' : diff === 1 ? '1 MIN' : `${diff} MIN`;
      const isNext = i === 0;

      return `
        <div class="tt-train-card ${isNext ? 'next-train' : ''}">
          <div class="tt-train-left">
            <div class="tt-train-time">${t.dep}</div>
            <div class="tt-train-dest">TO ${t.dest.toUpperCase()}</div>
          </div>
          <div class="tt-train-right">
            <div class="tt-train-no">${t.no}</div>
            <div class="tt-train-mins">${minsLabel}</div>
          </div>
        </div>`;
    }).join('');
  },

  /* ── Complete schedule ───────────────────────────── */
  renderComplete() {
    const { up, dn } = window.OE_DATA.generateTimetable(this.currentLine, this.currentStation, this.currentDay);
    const line = window.OE_DATA.lines[this.currentLine];

    this.renderScheduleTable('ttUpSchedule', up, line?.to || '');
    this.renderScheduleTable('ttDnSchedule', dn, line?.from || '');

    const upCount = document.getElementById('ttUpCount');
    const dnCount = document.getElementById('ttDnCount');
    if (upCount) upCount.textContent = up.length;
    if (dnCount) dnCount.textContent = dn.length;

    const recCount = document.getElementById('ttRecordCount');
    if (recCount) recCount.textContent = up.length + dn.length;
  },

  renderScheduleTable(tbodyId, trains, dest) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    if (!trains.length) {
      tbody.innerHTML = '<tr><td colspan="3"><div class="tt-no-data">NO DATA AVAILABLE</div></td></tr>';
      return;
    }

    tbody.innerHTML = trains.map(t => `
      <tr>
        <td>${t.no}</td>
        <td>${t.dep}</td>
        <td>${dest.toUpperCase()}</td>
      </tr>`).join('');
  },
};

/* ── Init when timetable page becomes active ──────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Wait for OE_DATA to be available */
  function tryInit() {
    if (window.OE_DATA) { TT.init(); }
    else setTimeout(tryInit, 100);
  }
  tryInit();

  /* Expose for router */
  window.TT = TT;
});
