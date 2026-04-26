/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — chatbot.js
   KalingaBot AI assistant — Gemini API integration
═══════════════════════════════════════════════════ */

'use strict';

const Chatbot = {

  isOpen:   false,
  history:  [],   /* Conversation history for context */
  GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  data: {
    loaded: false,
    stationsByLine: null,
    lines: null,
    fares: null,
  },

  /* Metro system context injected into every prompt */
  SYSTEM_CONTEXT: `You are KalingaBot - Your YatraAI 🚢, the friendly AI assistant for Odisha Express — Bhubaneswar Metro Network.
Inspired by the spirit of Odisha, you act as a "Bandhu" (friend) to the users.
You help users with:
- Metro routes (6 lines: Blue L1, Green L2, Orange L3, Purple L4, Yellow L5, Pink L6)
- Fare information using the official fare tiers
- Timetable queries (first/last train, frequency, next train estimate)
- Station queries across ALL lines (codes, facilities, interchange)
Keep responses concise, correct, and in a friendly professional tone.
Always respond in the same language the user writes in.
You MUST refuse to answer non-metro topics and redirect the user to metro topics.`,

  /* ── Get API key ──────────────────────────────────── */
  getApiKey() {
    /* Reads from localStorage (set via .env or settings) */
    return localStorage.getItem('oe_gemini_key') || window.GEMINI_API_KEY || '';
  },

  /* ── Load local metro datasets (offline brain) ─────── */
  async loadData() {
    if (this.data.loaded) return;
    try {
      const [stationsRes, linesRes, faresRes] = await Promise.all([
        fetch('data/stations.json', { cache: 'no-store' }),
        fetch('data/lines.json', { cache: 'no-store' }),
        fetch('data/fares.json', { cache: 'no-store' }),
      ]);

      if (!stationsRes.ok) throw new Error(`stations.json HTTP ${stationsRes.status}`);
      if (!linesRes.ok) throw new Error(`lines.json HTTP ${linesRes.status}`);
      if (!faresRes.ok) throw new Error(`fares.json HTTP ${faresRes.status}`);

      const [stationsByLine, lines, fares] = await Promise.all([
        stationsRes.json(),
        linesRes.json(),
        faresRes.json(),
      ]);

      this.data.stationsByLine = stationsByLine;
      this.data.lines = Array.isArray(lines) ? lines : [];
      this.data.fares = fares || null;
      this.data.loaded = true;
    } catch (e) {
      console.warn('Chatbot offline data load failed:', e);
      // Keep going; bot can still respond with generic metro guidance.
      this.data.loaded = false;
    }
  },

  normalize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[\u2019']/g, '')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  getAllStationsFlat() {
    const out = [];
    const sbl = this.data.stationsByLine;
    if (!sbl) return out;
    Object.keys(sbl).forEach(lineId => {
      const arr = Array.isArray(sbl[lineId]) ? sbl[lineId] : [];
      arr.forEach(st => out.push({ ...st, lineId }));
    });
    return out;
  },

  findLineById(lineId) {
    return (this.data.lines || []).find(l => l?.id === lineId) || null;
  },

  findStation(query) {
    const q = this.normalize(query);
    if (!q) return null;

    // Allow searching by exact code like BN05 / GR12 etc.
    const codeMatch = q.toUpperCase().match(/\b([A-Z]{2}\d{2})\b/);
    const code = codeMatch?.[1] || null;

    const all = this.getAllStationsFlat();
    if (!all.length) return null;

    if (code) {
      const byCode = all.find(s => String(s.code).toUpperCase() === code);
      if (byCode) return byCode;
    }

    // Exact name match (normalized)
    const exact = all.find(s => this.normalize(s.name) === q);
    if (exact) return exact;

    // Substring match (best-effort)
    const partial = all.find(s => this.normalize(s.name).includes(q) || q.includes(this.normalize(s.name)));
    if (partial) return partial;

    return null;
  },

  extractStationPairs(text) {
    // crude but effective: try to match "from X to Y" or "X to Y"
    const t = this.normalize(text);
    const m1 = t.match(/\bfrom\s+(.+?)\s+to\s+(.+)\b/);
    if (m1) return { fromText: m1[1], toText: m1[2] };
    const m2 = t.match(/\b(.+?)\s+to\s+(.+)\b/);
    if (m2) return { fromText: m2[1], toText: m2[2] };
    return null;
  },

  fareForDistanceKm(distanceKm) {
    const fares = this.data.fares;
    const tiers = fares?.tiers;
    if (!Array.isArray(tiers) || !tiers.length) return null;
    const d = Math.max(0, Number(distanceKm) || 0);
    const tier = tiers.find(t => d >= Number(t.minKm) && d < Number(t.maxKm));
    if (!tier) return null;
    return {
      fare: tier.fare,
      currency: fares.currency_symbol || '₹',
      label: tier.label,
    };
  },

  nextTrainEstimate(lineId, dayType, direction) {
    // We don't have per-station real-time tracking here, so estimate next departure from line start.
    const line = this.findLineById(lineId);
    if (!line) return null;
    const freqMin = line?.frequency?.[dayType];
    const first = line.firstTrain;
    const last = line.lastTrain;
    if (!freqMin || !first || !last) return null;

    const now = new Date();
    const [fh, fm] = String(first).split(':').map(Number);
    const [lh, lm] = String(last).split(':').map(Number);
    const start = new Date(now); start.setHours(fh, fm, 0, 0);
    const end = new Date(now); end.setHours(lh, lm, 0, 0);
    if (now < start) return { status: 'not_started', next: first };
    if (now > end) return { status: 'ended', next: null };

    const minutesSinceStart = Math.floor((now - start) / 60000);
    const mod = minutesSinceStart % freqMin;
    const wait = mod === 0 ? 0 : (freqMin - mod);
    const nextTime = new Date(now.getTime() + wait * 60000);
    const hh = String(nextTime.getHours()).padStart(2, '0');
    const mm = String(nextTime.getMinutes()).padStart(2, '0');
    return { status: 'running', next: `${hh}:${mm}`, waitMin: wait, direction };
  },

  stationPOISuggestions(station) {
    if (!station?.name) return [];
    const name = station.name.toLowerCase();
    const suggestions = [];

    // Heuristic suggestions based on station name keywords (safe + general).
    if (name.includes('temple') || name.includes('lingaraj') || name.includes('mukteswar') || name.includes('brahmeswar')) {
      suggestions.push('If you have time, visit the nearby temples/heritage spots in this area.');
    }
    if (name.includes('park') || name.includes('forest')) {
      suggestions.push('You may enjoy a quick walk in the nearby park/green area if you have time.');
    }
    if (name.includes('museum')) {
      suggestions.push('If you have time, the nearby museum/heritage galleries are worth a visit.');
    }
    if (name.includes('haat') || name.includes('ekamra')) {
      suggestions.push('If you have time, explore nearby local handicrafts/food stalls (popular in this area).');
    }
    if (name.includes('nandankanan') || name.includes('zoo')) {
      suggestions.push('If you have time, Nandankanan Zoological Park is a great nearby visit.');
    }

    // Always keep it modest (avoid making up exact stall names).
    return suggestions.slice(0, 2);
  },

  detectLang(text) {
    // Very lightweight detection: if Devanagari present, respond in Hindi.
    const s = String(text || '');
    return /[\u0900-\u097F]/.test(s) ? 'hi' : 'en';
  },

  wantsDirections(text) {
    const t = this.normalize(text);
    if (!t) return false;
    return (
      t.includes('go to') ||
      t.includes('how to reach') ||
      t.includes('how do i reach') ||
      t.includes('route to') ||
      t.includes('directions') ||
      t.includes('jana') ||
      t.includes('jana hai') ||
      t.includes('kaise jau') ||
      t.includes('kaise jana') ||
      t.includes('pahunch') ||
      t.includes('reach')
    );
  },

  buildStationGuideReply(userText, station) {
    const lang = this.detectLang(userText);
    const line = this.findLineById(station.lineId);
    const day = new Date().getDay();
    const dayType = day === 0 ? 'sunday' : (day === 6 ? 'saturday' : 'weekday');
    const freq = line?.frequency?.[dayType];
    const first = line?.firstTrain;
    const last = line?.lastTrain;
    const minFare = this.data.fares?.minimum_fare;
    const maxFare = this.data.fares?.maximum_fare;
    const sym = this.data.fares?.currency_symbol || '₹';

    const poi = this.stationPOISuggestions(station);
    const poiHtml = poi.length
      ? (lang === 'hi'
        ? `<br/><br/><strong>Agar aapke paas time ho:</strong><br/>${poi.map(s => `• ${s}`).join('<br/>')}`
        : `<br/><br/><strong>If you have time:</strong><br/>${poi.map(s => `• ${s}`).join('<br/>')}`)
      : '';

    const interchangeCodes = Array.isArray(line?.interchange) ? line.interchange : [];
    const interchangeNames = interchangeCodes
      .map(code => this.getAllStationsFlat().find(s => String(s.code).toUpperCase() === String(code).toUpperCase()))
      .filter(Boolean)
      .map(s => s.name);

    const interchangeHint = interchangeNames.length
      ? (lang === 'hi'
        ? `Agar aap kisi aur line par hain, to is line par aane ke liye in interchange stations par change kar sakte hain: <strong>${interchangeNames.join(', ')}</strong>.`
        : `If you’re on another line, you can switch onto this line at these interchange stations: <strong>${interchangeNames.join(', ')}</strong>.`)
      : (lang === 'hi'
        ? `Agar aap kisi aur line par hain, to nearest interchange station par line change karke yahan aa sakte hain.`
        : `If you’re on another line, switch at the nearest interchange station to reach this line.`);

    if (lang === 'hi') {
      return `Namaste! <strong>${station.name}</strong> jane ke liye aapko <strong>${line?.name || station.lineId}</strong> (${line?.label || ''}) ka upyog karna hoga.<br/><br/>
<strong>Yaha rahi puri jankari:</strong><br/>
• Nearest Station: <strong>${station.name}</strong> (<strong>${station.code}</strong>)<br/>
• Line: <strong>${line?.name || station.lineId}</strong>${line?.label ? ` (${line.label})` : ''}<br/>
• Timings: Pehli train <strong>${first || '—'}</strong> aur aakhri train <strong>${last || '—'}</strong> tak<br/>
• Frequency: Aaj approx <strong>${freq ? `${freq} minute` : '—'}</strong> mein train milti hai<br/><br/>
<strong>Route Guide:</strong><br/>
• ${interchangeHint}<br/>
• Apna current station (ya line) bata dijiye, main aapko best route suggest kar dunga.<br/><br/>
<strong>Kiraya (Fare):</strong> Distance ke hisaab se approx <strong>${sym}${minFare ?? '—'}</strong> se <strong>${sym}${maxFare ?? '—'}</strong> tak lag sakta hai.${poiHtml}<br/><br/>
Kya main aapke liye route plan karoon? Bas batayein aap abhi <strong>kahan hain</strong> (station/line).`;
    }

    return `Hello! To go to <strong>${station.name}</strong>, use the <strong>${line?.name || station.lineId}</strong> (${line?.label || ''}).<br/><br/>
<strong>Full details:</strong><br/>
• Nearest Station: <strong>${station.name}</strong> (<strong>${station.code}</strong>)<br/>
• Line: <strong>${line?.name || station.lineId}</strong>${line?.label ? ` (${line.label})` : ''}<br/>
• Timings: First train <strong>${first || '—'}</strong> • Last train <strong>${last || '—'}</strong><br/>
• Frequency: About <strong>${freq ? `${freq} min` : '—'}</strong> today<br/><br/>
<strong>Route guide:</strong><br/>
• ${interchangeHint}<br/>
• Tell me your current station (or line) and I’ll suggest the best route.<br/><br/>
<strong>Fare:</strong> Typically ranges from <strong>${sym}${minFare ?? '—'}</strong> to <strong>${sym}${maxFare ?? '—'}</strong> depending on distance.${poiHtml}<br/><br/>
Want me to plan it? Tell me where you are right now (station/line).`;
  },

  isMetroRelated(text) {
    const t = this.normalize(text);
    if (!t) return false;
    const metroKeywords = [
      'metro', 'station', 'line', 'route', 'platform', 'interchange', 'fare', 'ticket', 'price', 'cost',
      'train', 'timetable', 'schedule', 'timing', 'first train', 'last train', 'frequency', 'arrival', 'departure',
      'track', 'tracking', 'live',
    ];
    if (metroKeywords.some(k => t.includes(k))) return true;
    // Also consider if text mentions any known station name/code.
    return Boolean(this.findStation(text));
  },

  offlineAnswer(userText) {
    if (!this.isMetroRelated(userText)) {
      return 'I can help only with <strong>metro-related</strong> questions (lines, stations, routes, fares, timings, and train schedule/tracking info). Ask me something like: <strong>"fare from Vani Vihar to Baramunda"</strong> or <strong>"which line is Nandankanan on?"</strong>.';
    }

    if (!this.data.loaded) {
      return 'Metro assistant is running, but my offline metro database is not loaded right now. Please refresh and try again. I can answer: <strong>lines, stations, routes, fares, first/last train, frequency</strong>.';
    }

    const t = this.normalize(userText);

    // Line list / overview
    if (t.includes('lines') || (t.includes('line') && (t.includes('list') || t.includes('all')))) {
      const lines = this.data.lines || [];
      const names = lines.map(l => `<strong>${l.name}</strong> (${l.label})`).join(', ');
      return `Bhubaneswar Metro has <strong>${lines.length}</strong> active lines: ${names}.`;
    }

    // Station info
    if (t.includes('station') || this.findStation(userText)) {
      const st = this.findStation(userText);
      if (st) {
        // If user is asking how to go/reach, provide a guided answer (not just raw station data).
        if (this.wantsDirections(userText)) {
          return this.buildStationGuideReply(userText, st);
        }

        const line = this.findLineById(st.lineId);
        const facilities = [
          st.elevator ? 'Elevator' : null,
          st.wheelchair ? 'Wheelchair access' : null,
          st.atm ? 'ATM' : null,
          st.parking ? 'Parking' : null,
        ].filter(Boolean);

        const poi = this.stationPOISuggestions(st);
        const poiHtml = poi.length ? `<br/><br/>${poi.map(s => `• ${s}`).join('<br/>')}` : '';

        return `Station: <strong>${st.name}</strong> (<strong>${st.code}</strong>)<br/>
Line: <strong>${line?.name || st.lineId}</strong> (${line?.label || ''})<br/>
Platform: <strong>${st.platform}</strong>${st.interchange ? '<br/>Interchange: <strong>Yes</strong>' : ''}${facilities.length ? `<br/>Facilities: ${facilities.map(f => `<strong>${f}</strong>`).join(', ')}` : ''}${poiHtml}`;
      }
    }

    // Fare query "from X to Y"
    if (t.includes('fare') || t.includes('price') || t.includes('cost') || t.includes('ticket')) {
      const pair = this.extractStationPairs(userText);
      if (pair) {
        const from = this.findStation(pair.fromText);
        const to = this.findStation(pair.toText);
        if (!from || !to) {
          return 'Tell me the <strong>from</strong> and <strong>to</strong> stations (example: <strong>"fare from Vani Vihar to Baramunda"</strong>).';
        }
        if (from.lineId !== to.lineId) {
          const fromLine = this.findLineById(from.lineId);
          const toLine = this.findLineById(to.lineId);
          return `I can calculate fare accurately when both stations are on the <strong>same line</strong>. Your stations are on different lines: <strong>${from.name}</strong> (${fromLine?.name || from.lineId}) → <strong>${to.name}</strong> (${toLine?.name || to.lineId}).<br/>
Tip: ask fare within a single line, or ask me <strong>which interchanges</strong> to use between these lines.`;
        }
        const dist = Math.abs(Number(from.km) - Number(to.km));
        const fare = this.fareForDistanceKm(dist);
        if (!fare) {
          return `Distance between <strong>${from.name}</strong> and <strong>${to.name}</strong> on ${from.lineId.toUpperCase()} is about <strong>${dist.toFixed(1)} km</strong>. Fare tiers are currently unavailable.`;
        }
        return `Estimated distance: <strong>${dist.toFixed(1)} km</strong><br/>Fare: <strong>${fare.currency}${fare.fare}</strong> (<strong>${fare.label}</strong>)`;
      }
      // If user just asks fare policy
      const minFare = this.data.fares?.minimum_fare;
      const maxFare = this.data.fares?.maximum_fare;
      const sym = this.data.fares?.currency_symbol || '₹';
      return `Fare range is <strong>${sym}${minFare}</strong> to <strong>${sym}${maxFare}</strong> based on distance. If you tell me <strong>from</strong> and <strong>to</strong> stations, I’ll calculate it.`;
    }

    // Timings / schedule / tracking
    if (t.includes('time') || t.includes('timing') || t.includes('schedule') || t.includes('timetable') || t.includes('train') || t.includes('tracking') || t.includes('track')) {
      // Determine line (if station mentioned, use that station's line)
      const st = this.findStation(userText);
      let lineId = st?.lineId || null;
      if (!lineId) {
        // Try line name match
        const lines = this.data.lines || [];
        const byName = lines.find(l => this.normalize(l.name).includes(t) || t.includes(this.normalize(l.name)) || t.includes(l.id));
        lineId = byName?.id || null;
      }
      if (!lineId) {
        return 'Which <strong>line</strong> or <strong>station</strong> are you asking about? Example: <strong>"first train on Blue Line"</strong> or <strong>"next train timing at Vani Vihar"</strong>.';
      }
      const line = this.findLineById(lineId);
      const day = new Date().getDay();
      const dayType = day === 0 ? 'sunday' : (day === 6 ? 'saturday' : 'weekday');
      const est = this.nextTrainEstimate(lineId, dayType, 'both');
      const stationPart = st ? ` for <strong>${st.name}</strong>` : '';

      if (!line) return 'I could not identify that line. Try: Blue/Green/Orange/Purple/Yellow/Pink.';

      // Tracking disclaimer (no GPS)
      const trackingNote = t.includes('track') || t.includes('tracking') || t.includes('live')
        ? '<br/><br/><strong>Note:</strong> This app does not have live GPS train tracking. I can provide schedule-based estimates and service timings.'
        : '';

      if (est?.status === 'not_started') {
        return `<strong>${line.name}</strong>${stationPart}<br/>First train: <strong>${line.firstTrain}</strong><br/>Frequency today: <strong>${line.frequency?.[dayType]} min</strong>${trackingNote}`;
      }
      if (est?.status === 'ended') {
        return `<strong>${line.name}</strong>${stationPart}<br/>Service has ended for today.<br/>Last train: <strong>${line.lastTrain}</strong>${trackingNote}`;
      }
      return `<strong>${line.name}</strong>${stationPart}<br/>First train: <strong>${line.firstTrain}</strong> • Last train: <strong>${line.lastTrain}</strong><br/>Frequency today: <strong>${line.frequency?.[dayType]} min</strong><br/>Next train estimate: <strong>${est.next}</strong> (in ~<strong>${est.waitMin}</strong> min)${trackingNote}`;
    }

    // Default metro-only response
    return 'Ask me about <strong>stations</strong>, <strong>lines</strong>, <strong>routes</strong>, <strong>fares</strong>, or <strong>timings</strong>. Example: <strong>"which line is Lingaraj Temple?"</strong> or <strong>"fare from Airport to Old Town"</strong>.';
  },

  /* ── Toggle panel ─────────────────────────────────── */
  toggle() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('chatbotPanel');
    if (panel) {
      panel.style.display = this.isOpen ? 'flex' : 'none';
      if (this.isOpen) {
        const input = document.getElementById('chatbotInput');
        input?.focus();
      }
    }
  },

  /* ── Close panel ──────────────────────────────────── */
  close() {
    this.isOpen = false;
    const panel = document.getElementById('chatbotPanel');
    if (panel) panel.style.display = 'none';
  },

  /* ── Append message ───────────────────────────────── */
  appendMessage(role, text) {
    const container = document.getElementById('chatbotMessages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `chatbot-msg ${role}`;
    div.innerHTML = this.formatText(text);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  },

  formatText(text) {
    /* Basic markdown-lite: bold, line breaks */
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  },

  /* ── Show typing indicator ─────────────────────────── */
  showTyping() {
    const container = document.getElementById('chatbotMessages');
    if (!container) return null;
    const div = document.createElement('div');
    div.className = 'chatbot-msg bot typing';
    div.id = 'typingIndicator';
    div.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  },

  hideTyping() {
    document.getElementById('typingIndicator')?.remove();
  },

  /* ── Send message ─────────────────────────────────── */
  async send(userText) {
    userText = userText?.trim();
    if (!userText) return;

    /* Clear input */
    const input  = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSend');
    if (input)   input.value = '';
    if (sendBtn) sendBtn.disabled = true;

    /* Display user message */
    this.appendMessage('user', userText);

    /* Add to history */
    this.history.push({ role: 'user', parts: [{ text: userText }] });

    /* Show typing */
    this.showTyping();

    try {
      // Always ensure offline datasets are ready (even if API key is missing)
      await this.loadData();

      const apiKey = this.getApiKey();
      if (!apiKey) {
        this.hideTyping();
        // Offline mode: answer strictly from metro datasets
        const offline = this.offlineAnswer(userText);
        this.appendMessage('bot', offline);
        if (sendBtn) sendBtn.disabled = false;
        return;
      }

      const response = await fetch(`${this.GEMINI_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: this.SYSTEM_CONTEXT }]
          },
          contents: this.history,
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text
        || 'I could not generate a response. Please try again.';

      this.hideTyping();
      this.appendMessage('bot', replyText);

      /* Add assistant reply to history */
      this.history.push({ role: 'model', parts: [{ text: replyText }] });

      /* Keep history bounded */
      if (this.history.length > 20) this.history = this.history.slice(-20);

    } catch (error) {
      this.hideTyping();
      console.error('Gemini API error:', error);

      // If Gemini fails, fall back to offline metro-only answers
      const offline = this.offlineAnswer(userText);
      this.appendMessage('bot', offline);
    }

    if (sendBtn) sendBtn.disabled = false;
    input?.focus();
  },

  /* ── Init ─────────────────────────────────────────── */
  init() {
    const fab      = document.getElementById('chatbotFab');
    const closeBtn = document.getElementById('closeChatbot');
    const sendBtn  = document.getElementById('chatbotSend');
    const input    = document.getElementById('chatbotInput');

    fab?.addEventListener('click',   () => this.toggle());
    closeBtn?.addEventListener('click', () => this.close());
    sendBtn?.addEventListener('click',  () => this.send(input?.value));

    input?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.send(input.value);
      }
    });

    window.Chatbot = this;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Chatbot.init();
});
