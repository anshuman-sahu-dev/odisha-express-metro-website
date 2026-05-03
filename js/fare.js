/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — fare.js
   Grid layout fare computation and payment
═══════════════════════════════════════════════════ */

'use strict';

/* Track selection state per line */
const fareState = {};

/* ── Render station selects ─────────── */
function renderStationSelects() {
  const lines = ['blue', 'green', 'orange', 'purple', 'yellow', 'pink'];
  lines.forEach(lineId => {
    const line = window.OE_DATA?.lines[lineId];
    if (!line) return;

    fareState[lineId] = { origin: null, dest: null };

    const originSelect = document.getElementById(lineId + 'OriginSelect');
    const destSelect = document.getElementById(lineId + 'DestSelect');

    if (originSelect && destSelect) {
      let optionsHtml = '<option value="">Select</option>';
      line.stations.forEach((st, i) => {
        optionsHtml += `<option value="${i}">${st.name}</option>`;
      });

      originSelect.innerHTML = optionsHtml;
      destSelect.innerHTML = optionsHtml;

      originSelect.addEventListener('change', (e) => handleSelectChange(lineId, 'origin', e.target.value));
      destSelect.addEventListener('change', (e) => handleSelectChange(lineId, 'dest', e.target.value));
    }
  });
}

function handleSelectChange(lineId, role, value) {
  if (!fareState[lineId]) fareState[lineId] = { origin: null, dest: null };
  fareState[lineId][role] = value === '' ? null : parseInt(value, 10);

  const state = fareState[lineId];
  if (state.origin !== null && state.dest !== null && state.origin !== state.dest) {
    computeFare(lineId);
  } else {
    resetFareDisplay(lineId);
  }
}

function resetFareDisplay(lineId) {
  const amountEl = document.getElementById(lineId + 'Amount');
  const subtextEl = document.getElementById(lineId + 'Subtext');
  const payBtnContainer = document.getElementById(lineId + 'PayBtnContainer');

  if (amountEl) amountEl.innerHTML = '<span class="fare-dash">--</span> <span class="fare-rupee">&#8377;</span>';
  if (subtextEl) subtextEl.textContent = 'select stations';
  if (payBtnContainer) payBtnContainer.innerHTML = '';
}

/* ── Compute & display fare ──────────────────────── */
function computeFare(lineId) {
  const state = fareState[lineId];
  const result = window.OE_DATA.calculateFare(lineId, state.origin, state.dest);
  if (!result) return;

  const amountEl = document.getElementById(lineId + 'Amount');
  const subtextEl = document.getElementById(lineId + 'Subtext');
  const payBtnContainer = document.getElementById(lineId + 'PayBtnContainer');

  if (!amountEl) return;

  /* Animate the number */
  amountEl.style.opacity = '0';
  amountEl.style.transform = 'scale(0.8)';

  setTimeout(() => {
    const tokenFare = result.fare.toFixed(2);
    const cardFare = (result.fare * 0.9).toFixed(2);

    amountEl.innerHTML = `
      <span style="font-size: 0.5em; color: var(--text-muted); text-decoration: line-through; text-shadow: none; margin-right: 6px;">&#8377; ${tokenFare}</span>
      ${cardFare} <span class="fare-rupee">&#8377;</span>
    `;
    
    if (subtextEl) subtextEl.textContent = `(${result.dist} km)`;
    
    if (payBtnContainer) {
      payBtnContainer.innerHTML = `<button class="fare-collect-btn" onclick="openPaymentModal('${lineId}', ${result.fare})">Pay</button>`;
    }

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

  let { lineId, fare, actionType } = pendingPayment;

  // Apply 10% discount if paying with Metro Card
  if (method === 'Metro Card' && actionType === 'TICKET') {
    fare = fare * 0.9;
  }

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
      // Deduct balance if paid via Metro Card
      if (method === 'Metro Card') {
        if (window.Profile && window.Profile.user) {
          window.Profile.user.balance = (window.Profile.user.balance || 0) - fare;
          window.Profile.saveUser(window.Profile.user);

          // Optionally refresh UI if Profile modal is open
          const tag = document.getElementById('genModalTag');
          if (tag && (tag.textContent === '[CARD_RECHARGE]' || tag.textContent === '[VIEW_BALANCE]')) {
            window.Profile.showProfileModal(tag.textContent === '[CARD_RECHARGE]' ? 'recharge' : 'balance');
          }
        }
      }

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
  const dest = line.stations[state.dest].name;

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
    window.openPaymentModal = openPaymentModal;
    window.processPayment = processPayment;

    // Render dropdowns
    renderStationSelects();

    // Attach close listener
    const closeBtn = document.getElementById('closePaymentModal');
    if (closeBtn) closeBtn.addEventListener('click', closePaymentModal);
  }
  tryInit();
});
