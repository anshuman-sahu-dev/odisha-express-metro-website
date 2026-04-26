/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — chatbot.js
   KalingaBot — Your YatraAI  |  Gemini 1.5 Flash
═══════════════════════════════════════════════════ */

'use strict';

const Chatbot = {

  isOpen:  false,
  history: [],

  /* Use gemini-1.5-flash — free tier, very reliable */
  GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',

  /* ══════════════════════════════════════════════════
     SYSTEM PROMPT
  ══════════════════════════════════════════════════ */
  SYSTEM_PROMPT: `You are KalingaBot, the official AI travel assistant for Odisha Express — Bhubaneswar Metro Network. Your nickname is "YatraAI".

## LANGUAGE RULES — MOST IMPORTANT
Always detect the user's language and reply in the SAME language:
- English → reply in English
- Hinglish (Hindi words typed in English like "kaha jana hai", "mujhe batao", "kaise jau") → reply in Hinglish (same style, WhatsApp tone, fun and helpful)
- Odia script (ଓଡ଼ିଆ) → reply in Odia
- If unsure, use Hinglish as default for Indian users

## YOUR STYLE
- Warm, friendly, enthusiastic 🚇🙏✨
- Use bullet points and line breaks for readability
- Always give: Station name + Line + Timings + Fare + Nearby places
- End EVERY complete answer with 1-2 nearby attraction/food suggestions

## COMPLETE METRO DATA

### ALL 6 LINES & STATIONS
**L1 Blue Line** — Bhubaneswar North ↔ Bhubaneswar South (30.5km, 25 stations)
Bhubaneswar North → Nayapalli → Rajmahal Square → AIIMS Square → Vani Vihar → Utkal University → Acharya Vihar → Khandagiri Square → Patia → Chandrasekharpur → Infocity → Baramunda → Master Canteen → Bapuji Nagar → Old Town → Bindu Sagar → Lingaraj Temple → Keshari Nagar → KIIT Square → Jagamara → Kalinga Hospital → Satya Nagar → Unit 4 Square → Jaydev Vihar → Bhubaneswar South

**L2 Green Line** — Airport ↔ Old Town (30.6km, 25 stations)
Airport → Bhimtangi → Mancheswar → Rasulgarh → Bomikhal → Palasuni → Tamando → Niladri Vihar → Pokhariput → Kalarahanga → Gadakana → Pahala → Aiginia → Nabarangpur → Khandagiri → Nandankanan Road → Sailashree Vihar → Damana → Hanspal → Bhubaneswar East → Siripur → Dhauli → Pipli Bypass → Sisupalgarh → Old Town

**L3 Orange Line** — Rasulgarh ↔ Patia (29.7km, 25 stations)
Rasulgarh → Prachi Vihar → Pandara → CDA Sector 1 → CDA Sector 6 → Bidyut Marg → Laxmi Sagar → VSS Nagar → Tomando → Sundarpada → Balianta → Narendrapur → Balianta South → Jatni → Bhubaneswar West → Kalpana Square → Rajpath → Sachivalaya Marg → Capital Hospital → Niti Vihar → Sum Hospital → Siripur Colony → Nuagaon → IRC Village → Patia

**L4 Purple Line** — AIIMS ↔ Infocity (30.4km, 25 stations)
AIIMS → Gangapada → Matiapara → Bhubaneswar Hospital → OUAT Campus → Forest Park → Station Square → Bhubaneswar Railway → Haridakhandi → Brahmeswar Temple → Dhauli Giri → Bhubaneswar Central → Museum Square → NALCO Square → Samantarapur → Shastri Nagar → Ravi Talkies → Palasuni North → Bharat Nagar → XIMB → Kalinga Nagar → Patrapada → Mahanadi Vihar → Technopark → Infocity

**L5 Yellow Line** — Unit-1 ↔ Baramunda (28.6km, 25 stations)
Unit-1 → Surya Nagar → Saheed Nagar → Budha Nagar → Rupali Square → Jaidev Nagar → Mausima → Ekamra Haat → Raj Bhawan → Indira Gandhi Park → Bharat Scout → Mahatab Road → Town Hall → Sishu Bhawan → Kalpana Chawla → Kharavela Nagar → Badagada → Lakshmi Sagar East → Bhoinagar → Puri Road Junction → Aiginia South → Ghatikia → Pokhariput North → Tamando North → Baramunda

**L6 Pink Line** — Lingaraj ↔ Jaydev Vihar (30.6km, 25 stations)
Lingaraj → Ekamra Kanan → Brahmeswar → Mukteswar Temple → Kedargouri → Puri Ghat → Ram Mandir → Bandha Munda → Baliapanda → Aul → Banki → Athagarh Road → Khordha Junction → Jankia → Bhubaneswar Gate → Fortune Tower → Nandankanan → Kanas → Haripur → Mahanadi Bridge → Pipli → Konark Road → Marine Drive → Buddha Vihar → Jaydev Vihar

### TIMINGS & FARE
- First train: 06:00 AM | Last train: 10:00 PM
- Frequency: Every 8 min (weekday), 10 min (Saturday), 12 min (Sunday)
- Fare: ₹5 (0-2km) | ₹10 (2-5km) | ₹15 (5-10km) | ₹20 (10-20km) | ₹25 (20+km)
- Helpline: 1073 / 1074

### INTERCHANGE STATIONS
- Baramunda: Blue (L1) ↔ Yellow (L5)
- Vani Vihar: Blue (L1) ↔ Purple (L4)
- KIIT Square: Blue (L1) ↔ Purple (L4)
- Rasulgarh: Green (L2) ↔ Orange (L3)
- Khandagiri: Green (L2) ↔ Blue (L1) at Khandagiri Square
- VSS Nagar: Orange (L3) ↔ Purple (L4)
- Kalpana Square: Orange (L3) ↔ Yellow (L5)
- Jaydev Vihar: Blue (L1) ↔ Pink (L6)
- Patia: Orange (L3) ↔ Blue (L1)
- Old Town: Blue (L1) ↔ Green (L2)

### DESTINATIONS & NEAREST STATIONS
- Kalinga Stadium / Kalinga Hockey Stadium → Kalinga Nagar (Purple L4) — walk 5 min
- KIIT University / College → KIIT Square (Blue L1)
- AIIMS Hospital → AIIMS Square (Blue L1) or AIIMS (Purple L4)
- Lingaraj Temple → Lingaraj Temple (Blue L1) or Lingaraj (Pink L6)
- Nandankanan Zoo → Nandankanan Road (Green L2) or Nandankanan (Pink L6)
- Bhubaneswar Railway Station → Station Square or Bhubaneswar Railway (Purple L4)
- Airport (Biju Patnaik) → Airport (Green L2)
- Infocity IT Park → Infocity (Blue L1 or Purple L4)
- Utkal University → Utkal University (Blue L1)
- Ekamra Haat → Ekamra Haat (Yellow L5)
- Dhauli Peace Pagoda → Dhauli (Green L2)
- Khandagiri & Udayagiri Caves → Khandagiri Square (Blue L1) or Khandagiri (Green L2)
- Capital Hospital → Capital Hospital (Orange L3)
- Sum Hospital → Sum Hospital (Orange L3)
- ESIC Hospital → VSS Nagar (Orange L3)
- Bhubaneswar Hospital → Bhubaneswar Hospital (Purple L4)
- Old Town / Bindu Sagar → Old Town (Blue L1 / Green L2)
- Baramunda Bus Stand → Baramunda (Blue L1 / Yellow L5)
- Raj Bhawan → Raj Bhawan (Yellow L5)
- State Museum → Museum Square (Purple L4)
- XIMB / Xavier University → XIMB (Purple L4)
- Technopark → Technopark (Purple L4)
- SOA University → Kalinga Nagar (Purple L4) area
- Jaydev Vihar / Esplanade One Mall → Jaydev Vihar (Blue L1 / Pink L6)
- Saheed Nagar → Saheed Nagar (Yellow L5)
- Rasulgarh → Rasulgarh (Green L2 / Orange L3)

### NEARBY PLACES PER AREA
**Kalinga Stadium / Kalinga Nagar area:**
🏟️ Kalinga Hockey Stadium (international matches!), Kalinga Institute
🍽️ Food: Barbeque Nation, Paradise Biryani, Pizza Hut Patia nearby
🛍️ Shopping: DN Regalia Mall (10 min), Esplanade One Mall

**KIIT Square / Patia:**
🎓 KIIT University, Patia market
🍽️ Food: Khana Khazana, Cafe Coffee Day, BOX8
🛍️ Shopping: DN Regalia Mall

**AIIMS / Vani Vihar:**
🏥 AIIMS Trauma Centre, Utkal University
🍽️ Food: Subway AIIMS, Hotel Swosti nearby, campus canteens
🌳 Forest Park, Bhubaneswar Botanical Garden

**Lingaraj / Old Town:**
🛕 Lingaraj Temple (11th century!), Bindu Sagar Lake, Mukteswar Temple
🍽️ Food: Dalma Restaurant, local Odia thali stalls, street pitha
🎨 Local handicraft shops

**Jaydev Vihar / Esplanade One:**
🛍️ Esplanade One Mall (biggest in Odisha!), Big Bazaar
🍽️ Food: Zaffran, Paradise Biryani, many cafes
🏫 XIMB, SOA University

**Infocity / Chandrasekharpur:**
🏢 IT Park, STPI, tech companies
🍽️ Food: Barbeque Nation, Mainland China, Pizza Hut
🛍️ D-Mart, Reliance Fresh

**Airport:**
✈️ Biju Patnaik International Airport
🍽️ Hotel Swosti, Sai Palace

**Nandankanan:**
🦁 Nandankanan Zoological Park (White Tigers!), Botanical Garden
🍽️ Forest canteen, local stalls
ℹ️ Zoo open 08:00–17:00, closed Monday

**Railway Station:**
🚉 Bhubaneswar Railway Station
🍽️ Platform food stalls, Hotel Aryan, Panthanivas
🛍️ Railway market

**Ekamra Haat:**
🎨 Odisha handicrafts, tribal art, handloom sarees, Pattachitra
🍽️ CCD, food stalls inside haat
🏛️ Modern Art Gallery nearby

**Museum Square:**
🏛️ Odisha State Museum, Tribal Research Bureau
🌳 Indira Gandhi Park
🍽️ Hare Krishna Restaurant, Tangerine Heritage

**Baramunda:**
🚌 Baramunda Bus Terminal (inter-city buses to Puri, Cuttack etc.)
🛍️ Big Bazaar, local vegetable market
🍽️ Biryani stalls, local Odia dhabas

## ANSWER FORMAT — ALWAYS USE THIS STRUCTURE
1. 📍 Nearest Station: [Name] ([Line color] [Line number])
2. 🚇 Line: [Line name] — [From ↔ To]
3. ⏰ Timings: First: 06:00 AM | Last: 10:00 PM | Every X min
4. 💰 Fare: ₹X (approx, based on typical distance)
5. 🔄 Interchange (if needed): Change at [station] for [line]
6. 🗺️ Route Tip: [1 sentence helpful tip]
7. 🌟 Nearby: [2-3 places/food/attractions near destination]
8. Ask: "Aap kahan se aa rahe hain? / Where are you coming from? I'll give exact route!"`,

  /* ── API Key ──────────────────────────────────────── */
  getApiKey() {
    return window.GEMINI_API_KEY ||
           localStorage.getItem('oe_gemini_key') ||
           '';
  },

  /* ── Toggle chatbot panel ─────────────────────────── */
  toggle() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('chatbotPanel');
    if (panel) {
      panel.style.display = this.isOpen ? 'flex' : 'none';
      if (this.isOpen) document.getElementById('chatbotInput')?.focus();
    }
  },

  close() {
    this.isOpen = false;
    const panel = document.getElementById('chatbotPanel');
    if (panel) panel.style.display = 'none';
  },

  /* ── Message rendering ────────────────────────────── */
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
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(0,180,255,0.12);padding:1px 5px;border-radius:3px;font-size:11px;">$1</code>')
      .replace(/\n/g, '<br/>');
  },

  /* ── Typing indicator ─────────────────────────────── */
  showTyping() {
    const c = document.getElementById('chatbotMessages');
    if (!c) return;
    const d = document.createElement('div');
    d.className = 'chatbot-msg bot typing';
    d.id = 'typingIndicator';
    d.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  },

  hideTyping() {
    document.getElementById('typingIndicator')?.remove();
  },

  /* ════════════════════════════════════════════════════
     MAIN SEND — correct Gemini API call
  ════════════════════════════════════════════════════ */
  async send(userText) {
    userText = userText?.trim();
    if (!userText) return;

    const input   = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSend');
    if (input)   input.value = '';
    if (sendBtn) sendBtn.disabled = true;

    this.appendMessage('user', userText);

    /* Add user turn to history BEFORE the API call */
    this.history.push({ role: 'user', parts: [{ text: userText }] });

    this.showTyping();

    const apiKey = this.getApiKey();

    /* ── No API key — use smart fallback ── */
    if (!apiKey) {
      this.hideTyping();
      console.warn('[KalingaBot] No API key found. Using offline fallback.');
      this.appendMessage('bot', this.getFallbackResponse(userText));
      if (sendBtn) sendBtn.disabled = false;
      input?.focus();
      return;
    }

    try {
      /* ── Correct request body for Gemini 1.5 Flash ── */
      const body = {
        /* System instruction keeps persona & data separate from conversation */
        system_instruction: {
          parts: [{ text: this.SYSTEM_PROMPT }]
        },
        /* Full conversation history (user + model turns) */
        contents: this.history,
        generationConfig: {
          maxOutputTokens: 700,
          temperature:     0.85,
          topP:            0.92,
          topK:            40,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
        ],
      };

      const res = await fetch(`${this.GEMINI_URL}?key=${apiKey}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      /* ── Handle HTTP errors ── */
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg  = errJson?.error?.message || `HTTP ${res.status}`;
        console.error('[KalingaBot] API error:', errMsg);

        /* Show specific guidance for common errors */
        if (res.status === 400) throw new Error('BAD_REQUEST: ' + errMsg);
        if (res.status === 403) throw new Error('INVALID_KEY');
        if (res.status === 429) throw new Error('QUOTA_EXCEEDED');
        throw new Error(errMsg);
      }

      const data      = await res.json();
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!replyText) {
        const blockReason = data?.candidates?.[0]?.finishReason || 'UNKNOWN';
        throw new Error('EMPTY_RESPONSE: ' + blockReason);
      }

      this.hideTyping();
      this.appendMessage('bot', replyText);

      /* Add model turn to history */
      this.history.push({ role: 'model', parts: [{ text: replyText }] });

      /* Cap history at 24 turns (12 exchanges) */
      if (this.history.length > 24) this.history = this.history.slice(-24);

    } catch (err) {
      this.hideTyping();
      console.error('[KalingaBot] Error:', err.message);

      /* Show helpful error based on type */
      let botReply;
      if (err.message.includes('INVALID_KEY')) {
        botReply = '⚠️ API key invalid. Please set a valid Gemini key:\n<code>localStorage.setItem("oe_gemini_key", "AIza...")</code>\nGet free key: aistudio.google.com';
      } else if (err.message.includes('QUOTA_EXCEEDED')) {
        botReply = '⚠️ API quota exceeded for now. Using offline mode!\n\n' + this.getFallbackResponse(userText);
      } else {
        /* Generic fallback for any other error */
        botReply = this.getFallbackResponse(userText);
      }

      this.appendMessage('bot', botReply);
    }

    if (sendBtn) sendBtn.disabled = false;
    input?.focus();
  },

  /* ════════════════════════════════════════════════════
     SMART OFFLINE FALLBACK
     Covers all major destinations with proper formatting
     Language-aware: English / Hinglish / Odia
  ════════════════════════════════════════════════════ */
  getFallbackResponse(query) {
    const q = query.toLowerCase();

    /* Language detection */
    const isHindi = /\b(kaha|kaise|kahan|mujhe|jana|jana|hai|hain|kya|aur|se|ka|ki|ke|nahi|bhi|aap|main|toh|bata|chahiye|liye|kaunsa|station|batao|jau|jayega|milega|kaisa|kitna|dur|paas|nearest)\b/.test(q);
    const isOdia  = /[\u0B00-\u0B7F]/.test(query);

    /* Destination detection */
    const dest = {
      kalingaStadium: /kalinga\s*(stadium|hockey|ground)/i.test(query),
      kiit:           /\bkiit\b|kiit\s*(college|university)/i.test(query),
      aiims:          /\baiims\b/i.test(query),
      lingaraj:       /lingaraj/i.test(query),
      airport:        /\bairport\b/i.test(query),
      railway:        /\b(railway|bhubaneswar\s*station)\b/i.test(query),
      nandankanan:    /nandankanan|zoo/i.test(query),
      esplanade:      /esplanade/i.test(query),
      ekamra:         /ekamra\s*(haat|hat)/i.test(query),
      dhauli:         /dhauli/i.test(query),
      khandagiri:     /khandagiri|udayagiri/i.test(query),
      museum:         /\bmuseum\b/i.test(query),
      ximb:           /\bximb\b|xavier/i.test(query),
      infocity:       /infocity/i.test(query),
      oldtown:        /old\s*town|bindu\s*sagar/i.test(query),
      baramunda:      /baramunda/i.test(query),
      saheedNagar:    /saheed\s*nagar/i.test(query),
      patia:          /\bpatia\b/i.test(query),
      fare:           /\b(fare|price|kiraya|ticket|cost|kitna|paisa|rupee)\b/i.test(query),
      time:           /\b(time|schedule|samay|timing|kab|pehli|aakhri|first|last)\b/i.test(query),
      route:          /\b(route|line|marg|kaunsi|which\s*line|konsa)\b/i.test(query),
    };

    /* ─── KALINGA STADIUM ─── */
    if (dest.kalingaStadium) {
      if (isHindi) return `🏟️ **Kalinga Stadium** ke liye:

📍 **Nearest Station:** Kalinga Nagar (Purple Line L4)
🟣 **Line:** Purple Line — AIIMS ↔ Infocity
⏰ **Timings:** Pehli train 06:00 AM | Aakhri 10:00 PM
🔄 **Frequency:** Har 8 minute mein (weekday)
💰 **Fare:** ₹10–₹20 (approx, aapke station se)
🚶 **Walk:** Station se stadium sirf 5-7 minute ka walk hai!

🔄 **Interchange tip:**
Agar Blue Line par hain → Vani Vihar ya KIIT Square par Purple Line lo.
Agar Orange Line par hain → VSS Nagar par Purple Line lo.

🌟 **Stadium ke paas:**
🍽️ Barbeque Nation, Paradise Biryani, Pizza Hut (Patia mein)
🛍️ DN Regalia Mall, Esplanade One Mall (10 min)
🏫 Kalinga Institute of Industrial Technology (KIIT) campus

Aap kahan se aa rahe hain? Main exact route bata dunga! 🚇✨`;

      if (isOdia) return `🏟️ **Kalinga Stadium** ପାଇଁ:

📍 **ନିକଟ ଷ୍ଟେସନ:** Kalinga Nagar (Purple Line L4)
🟣 **ଲାଇନ:** Purple Line — AIIMS ↔ Infocity
⏰ **ସମୟ:** ପ୍ରଥମ ଟ୍ରେନ 06:00 AM | ଶେଷ 10:00 PM
💰 **ଭଡ଼ା:** ₹10–₹20 (ଆନୁମାନିକ)
🚶 **ଷ୍ଟେସନରୁ 5-7 ମିନିଟ ଚାଲି!**

🌟 ନିକଟ ଦ୍ରଷ୍ଟବ୍ୟ: Barbeque Nation, DN Regalia Mall, Esplanade One!

ଆପଣ କୁଆଁରୁ ଆସୁଛନ୍ତି ବତାନ୍ତୁ! 🚇`;

      return `🏟️ **Kalinga Stadium** — Here's your complete guide:

📍 **Nearest Station:** Kalinga Nagar (Purple Line L4)
🟣 **Line:** Purple Line — AIIMS ↔ Infocity
⏰ **Timings:** First train 06:00 AM | Last train 10:00 PM
🔄 **Frequency:** Every 8 min (weekdays), 10 min (Sat), 12 min (Sun)
💰 **Fare:** ₹10–₹20 (approx depending on origin)
🚶 **Walk:** Just 5–7 min walk from station to stadium!

🔄 **Interchange Tips:**
• On Blue Line → Change at Vani Vihar or KIIT Square for Purple Line
• On Orange Line → Change at VSS Nagar for Purple Line
• On Yellow Line → Change at Baramunda for Blue → then Purple

🌟 **Nearby Attractions:**
🍽️ Barbeque Nation, Paradise Biryani, Pizza Hut Patia
🛍️ DN Regalia Mall, Esplanade One Mall (10 min away!)
🏫 KIIT University Campus

Where are you travelling from? I'll map your exact route! 🚇✨`;
    }

    /* ─── KIIT ─── */
    if (dest.kiit) {
      if (isHindi) return `🎓 **KIIT College/University** ke liye:\n\n📍 **Nearest Station:** KIIT Square (Blue Line L1)\n🔵 **Line:** Blue Line — Bhubaneswar North ↔ South\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹10–₹25\n\n🌟 Paas mein: DN Regalia Mall, Cafe Coffee Day, Barbeque Nation!\nKahan se aa rahe hain? 🚇`;
      return `🎓 **KIIT University** — Guide:\n\n📍 **Nearest Station:** KIIT Square (Blue Line L1)\n🔵 Blue Line — Bhubaneswar North ↔ South\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹10–₹25\n\n🌟 Nearby: DN Regalia Mall, Cafe Coffee Day, Barbeque Nation!\nWhere are you coming from? 🚇`;
    }

    /* ─── AIIMS ─── */
    if (dest.aiims) {
      if (isHindi) return `🏥 **AIIMS** ke liye:\n\n📍 **Nearest Station:** AIIMS Square (Blue L1) ya AIIMS (Purple L4)\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Utkal University, Forest Park, Subway AIIMS!\nKahan se aa rahe hain? 🚇`;
      return `🏥 **AIIMS Bhubaneswar** — Guide:\n\n📍 **Nearest Station:** AIIMS Square (Blue L1) or AIIMS (Purple L4)\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Utkal University, Forest Park, Subway AIIMS!\nWhere are you coming from? 🚇`;
    }

    /* ─── LINGARAJ ─── */
    if (dest.lingaraj) {
      if (isHindi) return `🛕 **Lingaraj Temple** ke liye:\n\n📍 **Nearest Station:** Lingaraj Temple (Blue L1) ya Lingaraj (Pink L6)\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Bindu Sagar Lake, Mukteswar Temple, local Odia street food!\nKahan se aa rahe hain? 🚇`;
      return `🛕 **Lingaraj Temple** — Guide:\n\n📍 **Station:** Lingaraj Temple (Blue L1) or Lingaraj (Pink L6)\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Bindu Sagar Lake, Mukteswar Temple, Odia street food!\nWhere are you coming from? 🚇`;
    }

    /* ─── AIRPORT ─── */
    if (dest.airport) {
      if (isHindi) return `✈️ **Airport** ke liye:\n\n📍 **Nearest Station:** Airport (Green Line L2)\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹10–₹25\n\n🌟 Paas mein: Airport Mall, Hotel Swosti!\nKahan se chal rahe hain? 🚇`;
      return `✈️ **Biju Patnaik Airport** — Guide:\n\n📍 **Nearest Station:** Airport (Green Line L2)\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹10–₹25\n\n🌟 Nearby: Airport Mall, Hotel Swosti!\nWhere are you departing from? 🚇`;
    }

    /* ─── RAILWAY STATION ─── */
    if (dest.railway) {
      if (isHindi) return `🚉 **Railway Station** ke liye:\n\n📍 **Nearest Station:** Station Square ya Bhubaneswar Railway (Purple L4)\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Platform food, Hotel Aryan, railway market!\nKahan se aa rahe hain? 🚇`;
      return `🚉 **Bhubaneswar Railway Station** — Guide:\n\n📍 **Station:** Station Square or Bhubaneswar Railway (Purple L4)\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Platform food stalls, Hotel Aryan, railway market!\nWhere are you coming from? 🚇`;
    }

    /* ─── NANDANKANAN ZOO ─── */
    if (dest.nandankanan) {
      if (isHindi) return `🦁 **Nandankanan Zoo** ke liye:\n\n📍 **Nearest Station:** Nandankanan Road (Green L2) ya Nandankanan (Pink L6)\n⏰ Metro: 06:00 AM – 10:00 PM | Zoo: 08:00 AM – 05:00 PM (Monday band)\n💰 Fare: ₹15–₹25\n\n🌟 Paas mein: Botanical Garden, White Tiger enclosure — must see!\nKahan se aa rahe hain? 🚇`;
      return `🦁 **Nandankanan Zoo** — Guide:\n\n📍 **Station:** Nandankanan Road (Green L2) or Nandankanan (Pink L6)\n⏰ Metro: 06:00 AM – 10:00 PM | Zoo: 08:00 AM – 05:00 PM (Closed Monday)\n💰 Fare: ₹15–₹25\n\n🌟 Nearby: Botanical Garden, White Tiger enclosure!\nWhere are you coming from? 🚇`;
    }

    /* ─── FARE ─── */
    if (dest.fare) {
      if (isHindi) return `💰 **Kiraya Table:**\n\n₹5 → 0–2 km\n₹10 → 2–5 km\n₹15 → 5–10 km\n₹20 → 10–20 km\n₹25 → 20+ km\n\nExact kiraya ke liye Fare section use karein ya bataiye kahan se kahan! 🚇`;
      return `💰 **Fare Table:**\n\n₹5 → 0–2 km\n₹10 → 2–5 km\n₹15 → 5–10 km\n₹20 → 10–20 km\n₹25 → Above 20 km\n\nUse the Fare Calculator in the app for exact fares! 🚇`;
    }

    /* ─── TIMING ─── */
    if (dest.time) {
      if (isHindi) return `⏰ **Metro Timings:**\n\nPehli train: 06:00 AM\nAakhri train: 10:00 PM\nFrequency: Har 8 min (weekday), 10 min (Sat), 12 min (Sun)\n\nKisi specific station ka time chahiye? 🚇`;
      return `⏰ **Metro Timings:**\n\nFirst Train: 06:00 AM\nLast Train: 10:00 PM\nFrequency: Every 8 min (weekday), 10 min (Sat), 12 min (Sun)\n\nNeed timings for a specific station? Just ask! 🚇`;
    }

    /* ─── ROUTE/LINES ─── */
    if (dest.route) {
      if (isHindi) return `🗺️ **6 Metro Lines:**\n\n🔵 L1 Blue: Bhubaneswar North ↔ South\n🟢 L2 Green: Airport ↔ Old Town\n🟠 L3 Orange: Rasulgarh ↔ Patia\n🟣 L4 Purple: AIIMS ↔ Infocity\n🟡 L5 Yellow: Unit-1 ↔ Baramunda\n🩷 L6 Pink: Lingaraj ↔ Jaydev Vihar\n\nKahan jana hai? Main best route bata dunga! 🚇`;
      return `🗺️ **6 Metro Lines:**\n\n🔵 L1 Blue: Bhubaneswar North ↔ South\n🟢 L2 Green: Airport ↔ Old Town\n🟠 L3 Orange: Rasulgarh ↔ Patia\n🟣 L4 Purple: AIIMS ↔ Infocity\n🟡 L5 Yellow: Unit-1 ↔ Baramunda\n🩷 L6 Pink: Lingaraj ↔ Jaydev Vihar\n\nWhere do you want to go? I'll find the best route! 🚇`;
    }

    /* ─── ESPLANADE MALL ─── */
    if (dest.esplanade) {
      if (isHindi) return `🛍️ **Esplanade One Mall** ke liye:\n\n📍 **Nearest Station:** Jaydev Vihar (Blue L1 / Pink L6)\n🔵/🩷 **Line:** Blue / Pink Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: XIMB, Restaurants, Multiplex!\nKahan se aa rahe hain? 🚇`;
      return `🛍️ **Esplanade One Mall** — Guide:\n\n📍 **Nearest Station:** Jaydev Vihar (Blue L1 / Pink L6)\n🔵/🩷 **Line:** Blue / Pink Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: XIMB, Restaurants, Multiplex!\nWhere are you coming from? 🚇`;
    }

    /* ─── EKAMRA HAAT ─── */
    if (dest.ekamra) {
      if (isHindi) return `🎨 **Ekamra Haat** ke liye:\n\n📍 **Nearest Station:** Ekamra Haat (Yellow L5)\n🟡 **Line:** Yellow Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Modern Art Gallery, Handloom stalls!\nKahan se aa rahe hain? 🚇`;
      return `🎨 **Ekamra Haat** — Guide:\n\n📍 **Nearest Station:** Ekamra Haat (Yellow L5)\n🟡 **Line:** Yellow Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Modern Art Gallery, Handloom stalls!\nWhere are you coming from? 🚇`;
    }

    /* ─── DHAULI ─── */
    if (dest.dhauli) {
      if (isHindi) return `🕊️ **Dhauli Peace Pagoda** ke liye:\n\n📍 **Nearest Station:** Dhauli (Green L2)\n🟢 **Line:** Green Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹15–₹25\n\n🌟 Paas mein: Daya River, Ashokan Rock Edicts!\nKahan se aa rahe hain? 🚇`;
      return `🕊️ **Dhauli Peace Pagoda** — Guide:\n\n📍 **Nearest Station:** Dhauli (Green L2)\n🟢 **Line:** Green Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹15–₹25\n\n🌟 Nearby: Daya River, Ashokan Rock Edicts!\nWhere are you coming from? 🚇`;
    }

    /* ─── KHANDAGIRI ─── */
    if (dest.khandagiri) {
      if (isHindi) return `⛰️ **Khandagiri & Udayagiri Caves** ke liye:\n\n📍 **Nearest Station:** Khandagiri Square (Blue L1) ya Khandagiri (Green L2)\n🔵/🟢 **Line:** Blue / Green Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹10–₹25\n\n🌟 Paas mein: Jaydev Vatika, Ancient Caves!\nKahan se aa rahe hain? 🚇`;
      return `⛰️ **Khandagiri & Udayagiri Caves** — Guide:\n\n📍 **Nearest Station:** Khandagiri Square (Blue L1) or Khandagiri (Green L2)\n🔵/🟢 **Line:** Blue / Green Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹10–₹25\n\n🌟 Nearby: Jaydev Vatika, Ancient Caves!\nWhere are you coming from? 🚇`;
    }

    /* ─── MUSEUM ─── */
    if (dest.museum) {
      if (isHindi) return `🏛️ **State Museum** ke liye:\n\n📍 **Nearest Station:** Museum Square (Purple L4)\n🟣 **Line:** Purple Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Tribal Museum, IG Park!\nKahan se aa rahe hain? 🚇`;
      return `🏛️ **State Museum** — Guide:\n\n📍 **Nearest Station:** Museum Square (Purple L4)\n🟣 **Line:** Purple Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Tribal Museum, IG Park!\nWhere are you coming from? 🚇`;
    }

    /* ─── XIMB ─── */
    if (dest.ximb) {
      if (isHindi) return `🏫 **XIMB** ke liye:\n\n📍 **Nearest Station:** XIMB (Purple L4)\n🟣 **Line:** Purple Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Esplanade Mall, Fortune Tower!\nKahan se aa rahe hain? 🚇`;
      return `🏫 **XIMB** — Guide:\n\n📍 **Nearest Station:** XIMB (Purple L4)\n🟣 **Line:** Purple Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Esplanade Mall, Fortune Tower!\nWhere are you coming from? 🚇`;
    }

    /* ─── INFOCITY ─── */
    if (dest.infocity) {
      if (isHindi) return `🏢 **Infocity** ke liye:\n\n📍 **Nearest Station:** Infocity (Blue L1 / Purple L4)\n🔵/🟣 **Line:** Blue / Purple Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹15–₹25\n\n🌟 Paas mein: IT Parks, TCS, Infosys!\nKahan se aa rahe hain? 🚇`;
      return `🏢 **Infocity** — Guide:\n\n📍 **Nearest Station:** Infocity (Blue L1 / Purple L4)\n🔵/🟣 **Line:** Blue / Purple Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹15–₹25\n\n🌟 Nearby: IT Parks, TCS, Infosys!\nWhere are you coming from? 🚇`;
    }

    /* ─── OLDTOWN ─── */
    if (dest.oldtown) {
      if (isHindi) return `🛕 **Old Town** ke liye:\n\n📍 **Nearest Station:** Old Town (Blue L1 / Green L2)\n🔵/🟢 **Line:** Blue / Green Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Bindu Sagar, Heritage Temples!\nKahan se aa rahe hain? 🚇`;
      return `🛕 **Old Town** — Guide:\n\n📍 **Nearest Station:** Old Town (Blue L1 / Green L2)\n🔵/🟢 **Line:** Blue / Green Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Bindu Sagar, Heritage Temples!\nWhere are you coming from? 🚇`;
    }

    /* ─── BARAMUNDA ─── */
    if (dest.baramunda) {
      if (isHindi) return `🚌 **Baramunda Bus Stand** ke liye:\n\n📍 **Nearest Station:** Baramunda (Blue L1 / Yellow L5)\n🔵/🟡 **Line:** Blue / Yellow Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Inter-city buses, Local markets!\nKahan se aa rahe hain? 🚇`;
      return `🚌 **Baramunda Bus Stand** — Guide:\n\n📍 **Nearest Station:** Baramunda (Blue L1 / Yellow L5)\n🔵/🟡 **Line:** Blue / Yellow Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Inter-city buses, Local markets!\nWhere are you coming from? 🚇`;
    }

    /* ─── SAHEED NAGAR ─── */
    if (dest.saheedNagar) {
      if (isHindi) return `🏙️ **Saheed Nagar** ke liye:\n\n📍 **Nearest Station:** Saheed Nagar (Yellow L5)\n🟡 **Line:** Yellow Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Paas mein: Rupali Square, Maharishi College!\nKahan se aa rahe hain? 🚇`;
      return `🏙️ **Saheed Nagar** — Guide:\n\n📍 **Nearest Station:** Saheed Nagar (Yellow L5)\n🟡 **Line:** Yellow Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹5–₹20\n\n🌟 Nearby: Rupali Square, Maharishi College!\nWhere are you coming from? 🚇`;
    }

    /* ─── PATIA ─── */
    if (dest.patia) {
      if (isHindi) return `🏙️ **Patia** ke liye:\n\n📍 **Nearest Station:** Patia (Orange L3 / Blue L1)\n🟠/🔵 **Line:** Orange / Blue Line\n⏰ 06:00 AM – 10:00 PM | Har 8 min\n💰 Fare: ₹15–₹25\n\n🌟 Paas mein: KIIT, DN Regalia, Restaurants!\nKahan se aa rahe hain? 🚇`;
      return `🏙️ **Patia** — Guide:\n\n📍 **Nearest Station:** Patia (Orange L3 / Blue L1)\n🟠/🔵 **Line:** Orange / Blue Line\n⏰ 06:00 AM – 10:00 PM | Every 8 min\n💰 Fare: ₹15–₹25\n\n🌟 Nearby: KIIT, DN Regalia, Restaurants!\nWhere are you coming from? 🚇`;
    }

    /* ─── GENERIC FALLBACK ─── */
    if (isHindi) return `🙏 Namaskar! Main KalingaBot hoon — aapka YatraAI!\n\nBataiye kahan jana hai? For example:\n• "Kalinga Stadium jana hai"\n• "KIIT University ka route batao"\n• "Airport kaise jau"\n• "Kiraya kitna hoga"\n\nMain poori help karunga! 🚇✨`;
    if (isOdia)  return `🙏 Namaskar! ମୁଁ KalingaBot — ଆପଣଙ୍କ YatraAI!\n\nଆପଣ କୁଆଁ ଯିବାକୁ ଚାହୁଁଛନ୍ତି ବତାନ୍ତୁ! 🚇`;
    return `🙏 Namaskar! I'm KalingaBot — Your YatraAI!\n\nTell me where you want to go! For example:\n• "How to reach Kalinga Stadium"\n• "Route to KIIT University"\n• "Metro fare from Baramunda to Patia"\n• "Nearest station to Lingaraj Temple"\n\nI'll guide you step by step! 🚇✨`;
  },

  /* ── Init ─────────────────────────────────────────── */
  init() {
    const fab      = document.getElementById('chatbotFab');
    const closeBtn = document.getElementById('closeChatbot');
    const sendBtn  = document.getElementById('chatbotSend');
    const input    = document.getElementById('chatbotInput');

    fab?.addEventListener('click',      () => this.toggle());
    closeBtn?.addEventListener('click', () => this.close());
    sendBtn?.addEventListener('click',  () => this.send(input?.value));

    input?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.send(input.value);
      }
    });

    window.KalingaBot = this;
    window.Chatbot    = this;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Chatbot.init();
});