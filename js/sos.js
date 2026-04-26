/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — sos.js
   Emergency SOS button and modal
═══════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const sosBtn   = document.getElementById('sosBtn');
  const sosModal = document.getElementById('sosModal');
  const closeBtn = document.getElementById('closeSosModal');

  sosBtn?.addEventListener('click', () => {
    if (sosModal) sosModal.style.display = 'flex';
  });

  closeBtn?.addEventListener('click', () => {
    if (sosModal) sosModal.style.display = 'none';
  });

  sosModal?.addEventListener('click', e => {
    if (e.target === sosModal) sosModal.style.display = 'none';
  });

  /* Keyboard ESC closes modal */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (sosModal?.style.display !== 'none') sosModal.style.display = 'none';
    }
  });
});
