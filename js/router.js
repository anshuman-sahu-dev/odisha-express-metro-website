/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — router.js
   Page navigation, section switching, nav state
═══════════════════════════════════════════════════ */

'use strict';

const PAGES = ['home', 'timetable', 'routes', 'fare', 'profile'];

/* Pages that show theme/SOS/chatbot buttons */
const UTILITY_PAGES = ['home', 'timetable', 'routes', 'fare'];

/* ── Navigate to a page ──────────────────────────── */
function navigateTo(page) {
  if (!PAGES.includes(page)) return;

  /* Hide all sections */
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) {
      el.classList.remove('active');
      el.style.display = 'none';
    }
  });

  /* Show target section */
  const target = document.getElementById('page-' + page);
  if (target) {
    target.style.display = 'block';
    /* Trigger reflow then add class so CSS animation fires */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.classList.add('active');
      });
    });
  }

  /* Update nav active states */
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  /* Show/hide utility buttons (theme, SOS, chatbot) */
  const showUtils = UTILITY_PAGES.includes(page);
  const themeBtn  = document.getElementById('themeToggle');
  const sosBtn    = document.getElementById('sosBtn');
  const chatFab   = document.getElementById('chatbotFab');

  if (themeBtn) themeBtn.style.display  = showUtils ? 'flex' : 'none';
  if (sosBtn)   sosBtn.style.display    = showUtils ? 'flex' : 'none';
  if (chatFab)  chatFab.style.display   = showUtils ? 'flex' : 'none';

  /* Hide chatbot panel when leaving utility pages */
  if (!showUtils) {
    const panel = document.getElementById('chatbotPanel');
    if (panel) panel.style.display = 'none';
  }

  /* Save current page */
  sessionStorage.setItem('oe_current_page', page);

  /* Special page-specific triggers */
  if (page === 'timetable' && window.TT) {
    window.TT.render();
  }

  /* Scroll to top */
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Restore last page on load ───────────────────── */
function restoreLastPage() {
  const saved = sessionStorage.getItem('oe_current_page') || 'home';
  navigateTo(saved);
}

/* ── Init ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Check login */
  const user = sessionStorage.getItem('oe_user') || localStorage.getItem('oe_user');
  if (!user && window.location.pathname.includes('main.html')) {
    window.location.href = 'index.html';
    return;
  }

  /* Expose globally */
  window.navigateTo = navigateTo;

  /* Initial page */
  restoreLastPage();
});
