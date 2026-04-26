/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — config.js
   Loads Gemini API key from .env into the browser.
   
   HOW TO SET YOUR KEY (do ONE of these):
   
   Option A — In browser console (quickest for testing):
     localStorage.setItem('oe_gemini_key', 'AIza...')
   
   Option B — Edit this file directly:
     Replace 'PASTE_YOUR_GEMINI_KEY_HERE' with your key
   
   Option C — .env file (for production):
     Your build tool should inject process.env.GEMINI_API_KEY
═══════════════════════════════════════════════════ */

(function () {
  /* ── Option B: hardcode key here for local dev ── */
  const HARDCODED_KEY = 'PASTE_YOUR_GEMINI_KEY_HERE';

  /* ── Load key: priority order ─────────────────── */
  const key =
    localStorage.getItem('oe_gemini_key') ||   /* Option A */
    (HARDCODED_KEY !== 'PASTE_YOUR_GEMINI_KEY_HERE' ? HARDCODED_KEY : '') || /* Option B */
    '';

  if (key) {
    window.GEMINI_API_KEY = key;
    /* Also keep in localStorage for persistence */
    localStorage.setItem('oe_gemini_key', key);
  } else {
    console.warn(
      '[KalingaBot] Gemini API key not set!\n' +
      'Run in console: localStorage.setItem("oe_gemini_key", "YOUR_KEY")\n' +
      'Get free key at: https://aistudio.google.com'
    );
  }
})();