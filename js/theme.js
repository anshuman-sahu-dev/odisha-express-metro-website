/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — theme.js
   Dark / light theme toggle with persistence
═══════════════════════════════════════════════════ */

'use strict';

const Theme = {
  STORAGE_KEY: 'oe_theme',
  current: 'dark',

  /* ── Apply theme ─────────────────────────────────── */
  apply(theme) {
    this.current = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);

    /* Update sun/moon icon visibility (handled by theme.css) */
    const sunIcon  = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    if (sunIcon)  sunIcon.style.display  = theme === 'dark'  ? 'block' : 'none';
    if (moonIcon) moonIcon.style.display = theme === 'light' ? 'block' : 'none';
  },

  /* ── Toggle ──────────────────────────────────────── */
  toggle() {
    this.apply(this.current === 'dark' ? 'light' : 'dark');
  },

  /* ── Init ─────────────────────────────────────────── */
  init() {
    /* Restore saved theme */
    const saved = localStorage.getItem(this.STORAGE_KEY) || 'dark';
    this.apply(saved);

    /* Bind toggle button */
    const btn = document.getElementById('themeToggle');
    btn?.addEventListener('click', () => this.toggle());
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  window.Theme = Theme;
});
