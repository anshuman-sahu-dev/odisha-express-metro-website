/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — fare.js
   Accordion fare panels · Station grids · Fare calc
═══════════════════════════════════════════════════ */

'use strict';

/* Track selection state per line */
const fareState = {};

/* ── Toggle fare accordion ───────────────────────── */
function toggleFare(lineId) {
  const panel = document.getElementById('fare-' + lineId);
  const icon  = document.getElementById('fare' + capitalize(lineId) + 'Icon');
  if (!panel) return;

  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (icon) icon.classList.toggle('open', !isOpen);

  /* Render station grids on first open */
  if (!isOpen) {
    const originGrid = document.getElementById(lineId + 'OriginGrid');
    const destGrid   = document.getElementById(lineId + 'DestGrid');
    if (originGrid && originGrid.childElementCount === 0) {
      renderStationGrid(lineId, originGrid, 'origin');
      renderStationGrid(lineId, destGrid,   'dest');
    }
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ── Render station grid (origin or dest) ─────────── */
function renderStationGrid(lineId, container, role) {
  const line = window.OE_DATA?.lines[lineId];
  if (!line || !container) return;

  container.innerHTML = line.stations.map((st, i) => `
    <button
      class="fare-station-btn"
      data-line="${lineId}"
      data-role="${role}"
      data-index="${i}"
      onclick="selectFareStation('${lineId}', '${role}', ${i})"
      title="${st.name} (${st.km} km)"
    >
      <span class="fare-station-code">${st.code}</span>
      <span class="fare-station-name">${st.name}</span>
    </button>
  `).join('');
}

/* ── Select a station ────────────────────────────── */
function selectFareStation(lineId, role, index) {
  const line = window.OE_DATA?.lines[lineId];
  if (!line) return;

  /* Ensure state object exists */
  if (!fareState[lineId]) fareState[lineId] = { origin: null, dest: null };
  fareState[lineId][role] = index;

  /* Update selected class in grid */
  const gridId = lineId + capitalize(role) + 'Grid';
  const grid   = document.getElementById(gridId);
  if (grid) {
    grid.querySelectorAll('.fare-station-btn').forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.index) === index);
    });
  }

  /* Update route display */
  const st = line.stations[index];
  const displayId = lineId + capitalize(role) + 'Display';
  const display   = document.getElementById(displayId);
  if (display) display.textContent = st.code;

  /* Compute fare if both selected */
  const state = fareState[lineId];
  if (state.origin !== null && state.dest !== null && state.origin !== state.dest) {
    computeFare(lineId);
  } else {
    const amountEl = document.getElementById(lineId + 'Amount');
    if (amountEl) amountEl.innerHTML = '<span class="fare-dash">-- --</span>';
  }
}

/* ── Compute & display fare ──────────────────────── */
function computeFare(lineId) {
  const state  = fareState[lineId];
  const result = window.OE_DATA.calculateFare(lineId, state.origin, state.dest);
  if (!result) return;

  const amountEl = document.getElementById(lineId + 'Amount');
  if (!amountEl) return;

  /* Animate the number */
  amountEl.style.opacity = '0';
  amountEl.style.transform = 'scale(0.8)';

  setTimeout(() => {
    amountEl.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
        <div style="display:flex; align-items:center; gap:6px;">
          <span class="fare-rupee-icon">&#8377;</span>
          ${result.fare}.00
          <span style="font-size:12px;color:var(--text-muted);margin-left:6px;">(${result.dist} km)</span>
        </div>
        <button class="fare-collect-btn" onclick="openPaymentModal('${lineId}', ${result.fare})">Pay</button>
      </div>
    `;
    amountEl.style.transition = 'opacity 0.3s, transform 0.3s';
    amountEl.style.opacity = '1';
    amountEl.style.transform = 'scale(1)';
  }, 150);
}

/* ── Payment Modal Logic ────────────────────────── */
let pendingPayment = null;

function openPaymentModal(lineId, fare, actionType = 'TICKET') {
  pendingPayment = { lineId, fare, actionType };
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  pendingPayment = null;
}

function processPayment(method) {
  if (!pendingPayment) return;
  
  const { lineId, fare, actionType } = pendingPayment;
  
  // Show a simulated processing state
  const modalTitle = document.querySelector('#paymentModal .modal-title');
  const modalBody = document.querySelector('#paymentModal .payment-options');
  if (modalTitle) modalTitle.textContent = 'PROCESSING PAYMENT...';
  if (modalBody) modalBody.style.opacity = '0.5';
  if (modalBody) modalBody.style.pointerEvents = 'none';

  setTimeout(() => {
    closePaymentModal();
    
    if (actionType === 'RECHARGE') {
      // Handle recharge success
      if (window.Profile && typeof window.Profile.completeRecharge === 'function') {
        window.Profile.completeRecharge(fare);
      }
    } else {
      // After payment is successful, collect the ticket
      collectTicket(lineId, fare);
    }
    
    // Reset modal title for next time
    if (modalTitle) modalTitle.textContent = 'CHOOSE PAYMENT MODE';
    if (modalBody) {
      modalBody.style.opacity = '1';
      modalBody.style.pointerEvents = 'auto';
    }
  }, 1500);
}

/* ── Collect Ticket handler ──────────────────────── */
function collectTicket(lineId, fare) {
  const line = window.OE_DATA?.lines[lineId];
  const state = fareState[lineId];
  if (!line || !state || state.origin === null || state.dest === null) return;

  const origin = line.stations[state.origin].name;
  const dest   = line.stations[state.dest].name;
  
  /* Create ticket object */
  const ticket = {
    id: 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    lineName: line.name,
    lineColor: line.color,
    origin,
    dest,
    fare,
    date: new Date().toISOString(),
    status: 'ACTIVE'
  };

  /* Save to Profile user object */
  if (window.Profile && window.Profile.user) {
    if (!window.Profile.user.tickets) window.Profile.user.tickets = [];
    window.Profile.user.tickets.unshift(ticket); /* Newest first */
    window.Profile.saveUser(window.Profile.user);
    
    if (typeof window.Profile.showToast === 'function') {
      window.Profile.showToast('🎟️ TICKET COLLECTED! HAVE A PLEASANT JOURNEY. NAMASKAR! 🙏');
    }
  } else {
    alert(`🎟️ TICKET COLLECTED!\nLine: ${line.name}\nRoute: ${origin} → ${dest}\nFare: ₹${fare}.00\n\nHave a safe and wonderful journey!`);
  }
}

/* ── Init ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  function tryInit() {
    if (!window.OE_DATA) { setTimeout(tryInit, 100); return; }
    window.toggleFare         = toggleFare;
    window.selectFareStation  = selectFareStation;
    window.openPaymentModal   = openPaymentModal;
    window.processPayment     = processPayment;

    // Attach close listener
    const closeBtn = document.getElementById('closePaymentModal');
    if (closeBtn) closeBtn.addEventListener('click', closePaymentModal);
  }
  tryInit();
});
