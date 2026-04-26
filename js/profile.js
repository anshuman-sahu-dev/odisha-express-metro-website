/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — profile.js
   Profile page, edit popup, avatar, language, balance
═══════════════════════════════════════════════════ */

'use strict';

const Profile = {

  user: null,

  /* ── Load user from session ─────────────────────── */
  loadUser() {
    const raw = sessionStorage.getItem('oe_user') || localStorage.getItem('oe_user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },

  saveUser(user) {
    sessionStorage.setItem('oe_user', JSON.stringify(user));
    /* Also update in the users array */
    const users = JSON.parse(localStorage.getItem('oe_users') || '[]');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) { users[idx] = user; localStorage.setItem('oe_users', JSON.stringify(users)); }
  },

  /* ── Render profile header ──────────────────────── */
  renderHeader() {
    const u = this.user;
    if (!u) return;

    const nameEl   = document.getElementById('profileName');
    const emailEl  = document.getElementById('profileEmail');
    const genderEl = document.getElementById('profileGender');
    const dobEl    = document.getElementById('profileDOB');
    const phoneEl  = document.getElementById('profilePhone');

    if (nameEl)   nameEl.textContent   = u.name || 'USER';
    if (emailEl)  emailEl.textContent  = u.email || '';
    if (genderEl) genderEl.textContent = u.gender ? u.gender.toUpperCase() : '--';
    if (dobEl)    dobEl.textContent    = u.dob ? this.formatDate(u.dob) : '--';
    if (phoneEl)  phoneEl.textContent  = u.phone || '--';

    /* Nav avatar initials */
    const navAvatar = document.getElementById('navAvatarImg');
    if (navAvatar && u.name) {
      const initials = u.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
      navAvatar.innerHTML = `<span style="font-family:var(--font-orb);font-size:14px;font-weight:700;color:var(--accent);">${initials}</span>`;
    }

    /* Profile avatar image */
    if (u.avatar) {
      const img = document.getElementById('profileAvatarImg');
      const def = document.getElementById('profileAvatarDefault');
      if (img) { img.src = u.avatar; img.style.display = 'block'; }
      if (def) def.style.display = 'none';
    }

    /* Language */
    const langEl = document.getElementById('currentLang');
    if (langEl) langEl.textContent = (u.lang || 'english').toUpperCase();
  },

  formatDate(dob) {
    try {
      const d = new Date(dob);
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return dob; }
  },

  /* ── Edit profile modal ─────────────────────────── */
  initEditProfile() {
    const openBtn  = document.getElementById('openEditProfile');
    const closeBtn = document.getElementById('closeEditProfile');
    const modal    = document.getElementById('editProfileModal');
    const form     = document.getElementById('editProfileForm');

    openBtn?.addEventListener('click', () => {
      /* Pre-fill fields */
      const u = this.user;
      if (u) {
        const nameF  = document.getElementById('editName');
        const dobF   = document.getElementById('editDob');
        const phoneF = document.getElementById('editPhone');
        const emailF = document.getElementById('editEmailField');
        if (nameF)  nameF.value  = u.name || '';
        if (dobF)   dobF.value   = u.dob || '';
        if (phoneF) phoneF.value = u.phone || '';
        if (emailF) emailF.value = u.email || '';
        /* Pre-select gender */
        if (u.gender) {
          const radio = form.querySelector(`input[name="editGender"][value="${u.gender}"]`);
          if (radio) radio.checked = true;
        }
      }
      if (modal) modal.style.display = 'flex';
    });

    closeBtn?.addEventListener('click', () => { if (modal) modal.style.display = 'none'; });
    modal?.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    form?.addEventListener('submit', e => {
      e.preventDefault();
      const u = this.user;
      if (!u) return;

      u.name   = document.getElementById('editName')?.value?.trim() || u.name;
      u.dob    = document.getElementById('editDob')?.value || u.dob;
      u.gender = form.querySelector('input[name="editGender"]:checked')?.value || u.gender;
      u.phone  = document.getElementById('editPhone')?.value?.trim() || u.phone;
      u.email  = document.getElementById('editEmailField')?.value?.trim() || u.email;

      this.saveUser(u);
      this.renderHeader();
      if (modal) modal.style.display = 'none';

      this.showToast('PROFILE UPDATED SUCCESSFULLY');
    });
  },

  /* ── Avatar picker ──────────────────────────────── */
  initAvatarPicker() {
    const openBtn  = document.getElementById('openAvatarPicker');
    const closeBtn = document.getElementById('closeAvatarPicker');
    const modal    = document.getElementById('avatarPickerModal');
    const fileIn   = document.getElementById('deviceFileInput');
    const deviceBtn = document.getElementById('openDevice');
    const cameraBtn = document.getElementById('openCamera');

    openBtn?.addEventListener('click', () => { if (modal) modal.style.display = 'flex'; });
    closeBtn?.addEventListener('click', () => { if (modal) modal.style.display = 'none'; });
    modal?.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    deviceBtn?.addEventListener('click', () => { fileIn?.click(); });
    cameraBtn?.addEventListener('click', () => {
      /* Open camera via input capture */
      if (fileIn) { fileIn.setAttribute('capture', 'camera'); fileIn.click(); }
    });

    fileIn?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target.result;
        if (this.user) {
          this.user.avatar = dataUrl;
          this.saveUser(this.user);
        }
        const img = document.getElementById('profileAvatarImg');
        const def = document.getElementById('profileAvatarDefault');
        if (img) { img.src = dataUrl; img.style.display = 'block'; }
        if (def) def.style.display = 'none';
        if (modal) modal.style.display = 'none';
        this.showToast('PROFILE PHOTO UPDATED');
      };
      reader.readAsDataURL(file);
      fileIn.value = '';
    });
  },

  /* ══════════════════════════════════════════════════
     TRANSLATION DICTIONARY — English / Hindi / Odia
  ══════════════════════════════════════════════════ */
  translations: {
    english: {
      /* Navbar */
      'nav-home':           'HOME',
      'nav-timetable':      'TIME TABLE',
      'nav-routes':         'ROUTES',
      'nav-fare':           'FARE',
      /* Mobile nav */
      'mob-home':           'HOME',
      'mob-timetable':      'TIME TABLE',
      'mob-routes':         'ROUTES',
      'mob-fare':           'FARE',
      /* Hero sections */
      'hero1-eyebrow':      "ODISHA'S FIRST",
      'hero1-title':        "ODISHA'S<br/>FIRST METRO",
      'hero1-desc':         "A new era of urban transit for Bhubaneswar. The Blue Line forms the historic backbone of Odisha's first metro network, connecting the heart of the city.",
      'hero2-eyebrow':      'EXPANDING HORIZONS',
      'hero2-title':        'EXPANDING<br/>HORIZONS',
      'hero2-desc':         'Connecting the city like never before. The Green Line bridges crucial gaps, bringing all corners of Bhubaneswar closer together.',
      'hero3-eyebrow':      'ONE SMART NETWORK',
      'hero3-title':        'ONE SMART<br/>NETWORK',
      'hero3-desc':         'Blue, Green, Orange, Purple, Yellow or Pink. Navigate the expanding, fully air-conditioned network with a single contactless tap.',
      'hero4-eyebrow':      'NETWORK ROUTES',
      'hero4-title':        'NETWORK<br/>ROUTES',
      'hero5-eyebrow':      'FARE STRUCTURE',
      'hero5-title':        'FARE<br/>STRUCTURE',
      'hero5-desc':         'Affordable transit for everyone. Use your Smart Card for seamless travel and bonus recharge value.',
      'hero6-eyebrow':      'METRO REGULATIONS',
      'hero6-title':        'METRO<br/>REGULATIONS',
      'hero6-desc':         'For the safety and comfort of all passengers, the following items cannot be taken inside metro premises.',
      'hero6-warning':      'IF CAUGHT CARRYING THESE, A FINE WILL BE IMPOSED.',
      'drag-hint':          '← DRAG CARD TO EXPLORE →',
      /* Timetable */
      'tt-filter-line':     'SELECT TRANSIT LINE',
      'tt-filter-station':  'SELECT STATION',
      'tt-filter-day':      'TEMPORAL CONTEXT',
      'tt-up-dir':          'UP DIRECTION',
      'tt-dn-dir':          'DN DIRECTION',
      'tt-up-sched':        'UP SCHEDULE',
      'tt-dn-sched':        'DN SCHEDULE',
      /* Profile menu */
      'profile-tickets':    'YOUR TICKETS / PASSES',
      'profile-recharge':   'CARD RECHARGE',
      'profile-balance':    'VIEW BALANCE',
      'profile-lang':       'APP LANGUAGE',
      'profile-support':    'SUPPORT',
      'profile-feedback':   'FEEDBACK',
      'profile-privacy':    'PRIVACY POLICY',
      'profile-about':      'ABOUT APP',
      'profile-logout':     'LOGOUT',
    },

    hindi: {
      'nav-home':           'होम',
      'nav-timetable':      'समय सारणी',
      'nav-routes':         'मार्ग',
      'nav-fare':           'किराया',
      'mob-home':           'होम',
      'mob-timetable':      'समय सारणी',
      'mob-routes':         'मार्ग',
      'mob-fare':           'किराया',
      'hero1-eyebrow':      'ओडिशा का पहला',
      'hero1-title':        'ओडिशा का<br/>पहला मेट्रो',
      'hero1-desc':         'भुवनेश्वर के शहरी यातायात का नया युग। ब्लू लाइन ओडिशा के पहले मेट्रो नेटवर्क की ऐतिहासिक रीढ़ है।',
      'hero2-eyebrow':      'विस्तार की राह',
      'hero2-title':        'विस्तार की<br/>राह',
      'hero2-desc':         'शहर को पहले से कहीं ज़्यादा जोड़ना। ग्रीन लाइन भुवनेश्वर के हर कोने को पास लाती है।',
      'hero3-eyebrow':      'एक स्मार्ट नेटवर्क',
      'hero3-title':        'एक स्मार्ट<br/>नेटवर्क',
      'hero3-desc':         'ब्लू, ग्रीन, ऑरेंज, पर्पल, येलो या पिंक। एक स्मार्ट कार्ड से पूरे नेटवर्क पर यात्रा करें।',
      'hero4-eyebrow':      'नेटवर्क मार्ग',
      'hero4-title':        'नेटवर्क<br/>मार्ग',
      'hero5-eyebrow':      'किराया संरचना',
      'hero5-title':        'किराया<br/>संरचना',
      'hero5-desc':         'सभी के लिए किफायती यात्रा। निर्बाध सफर के लिए अपना स्मार्ट कार्ड उपयोग करें।',
      'hero6-eyebrow':      'मेट्रो नियम',
      'hero6-title':        'मेट्रो<br/>नियम',
      'hero6-desc':         'सभी यात्रियों की सुरक्षा के लिए, निम्नलिखित वस्तुओं को मेट्रो परिसर में नहीं ले जाया जा सकता।',
      'hero6-warning':      'यदि पकड़े गए तो जुर्माना लगाया जाएगा।',
      'drag-hint':          '← कार्ड को खींचें →',
      'tt-filter-line':     'ट्रांजिट लाइन चुनें',
      'tt-filter-station':  'स्टेशन चुनें',
      'tt-filter-day':      'समय संदर्भ',
      'tt-up-dir':          'ऊपर दिशा',
      'tt-dn-dir':          'नीचे दिशा',
      'tt-up-sched':        'ऊपर अनुसूची',
      'tt-dn-sched':        'नीचे अनुसूची',
      'profile-tickets':    'आपके टिकट / पास',
      'profile-recharge':   'कार्ड रिचार्ज',
      'profile-balance':    'बैलेंस देखें',
      'profile-lang':       'ऐप भाषा',
      'profile-support':    'सहायता',
      'profile-feedback':   'प्रतिक्रिया',
      'profile-privacy':    'गोपनीयता नीति',
      'profile-about':      'ऐप के बारे में',
      'profile-logout':     'लॉग आउट',
    },

    odia: {
      'nav-home':           'ହୋମ',
      'nav-timetable':      'ସମୟ ସୂଚୀ',
      'nav-routes':         'ମାର୍ଗ',
      'nav-fare':           'ଭଡ଼ା',
      'mob-home':           'ହୋମ',
      'mob-timetable':      'ସମୟ ସୂଚୀ',
      'mob-routes':         'ମାର୍ଗ',
      'mob-fare':           'ଭଡ଼ା',
      'hero1-eyebrow':      'ଓଡ଼ିଶାର ପ୍ରଥମ',
      'hero1-title':        'ଓଡ଼ିଶାର<br/>ପ୍ରଥମ ମେଟ୍ରୋ',
      'hero1-desc':         'ଭୁବନେଶ୍ୱରର ନଗର ପରିବହନର ନୂଆ ଯୁଗ। ବ୍ଲୁ ଲାଇନ ଓଡ଼ିଶାର ପ୍ରଥମ ମେଟ୍ରୋ ନେଟୱର୍କର ଐତିହାସିକ ମେରୁଦଣ୍ଡ।',
      'hero2-eyebrow':      'ବିସ୍ତାର ଦିଗନ୍ତ',
      'hero2-title':        'ବିସ୍ତାର<br/>ଦିଗନ୍ତ',
      'hero2-desc':         'ସହରରକୁ ଆଗରୁ ଅଧିକ ସଂଯୁକ୍ତ କରିବା। ଗ୍ରୀନ ଲାଇନ ଭୁବନେଶ୍ୱରର ସବୁ କୋଣ ଅଣ୍ଟାକୁ ନିକଟ ଆଣୁଛି।',
      'hero3-eyebrow':      'ଏକ ସ୍ମାର୍ଟ ନେଟୱର୍କ',
      'hero3-title':        'ଏକ ସ୍ମାର୍ଟ<br/>ନେଟୱର୍କ',
      'hero3-desc':         'ବ୍ଲୁ, ଗ୍ରୀନ, ଅରେଞ୍ଜ, ପର୍ପଲ, ୟେଲୋ ବା ପିଙ୍କ। ଗୋଟିଏ ସ୍ମାର୍ଟ କାର୍ଡ ସହ ସମ୍ପୂର୍ଣ ନେଟୱର୍କ ଭ୍ରମଣ କରନ୍ତୁ।',
      'hero4-eyebrow':      'ନେଟୱର୍କ ମାର୍ଗ',
      'hero4-title':        'ନେଟୱର୍କ<br/>ମାର୍ଗ',
      'hero5-eyebrow':      'ଭଡ଼ା ସଂରଚନା',
      'hero5-title':        'ଭଡ଼ା<br/>ସଂରଚନା',
      'hero5-desc':         'ସମସ୍ତଙ୍କ ପାଇଁ ସୁଲଭ ଯାତ୍ରା। ନିରବଚ୍ଛିନ୍ନ ସଫରରେ ଆପଣଙ୍କ ସ୍ମାର୍ଟ କାର୍ଡ ବ୍ୟବହାର କରନ୍ତୁ।',
      'hero6-eyebrow':      'ମେଟ୍ରୋ ନିୟମ',
      'hero6-title':        'ମେଟ୍ରୋ<br/>ନିୟମ',
      'hero6-desc':         'ସମସ୍ତ ଯାତ୍ରୀଙ୍କ ସୁରକ୍ଷା ପାଇଁ, ନିମ୍ନଲିଖିତ ଜିନିଷ ମେଟ୍ରୋ ପରିସରରେ ଆଣିବା ଯାଇ ନ ଥାଏ।',
      'hero6-warning':      'ଏହି ଜିନିଷ ଧରା ପଡ଼ିଲେ ଜୋରିମାନା ଲାଗୁ ହେବ।',
      'drag-hint':          '← କାର୍ଡ ଟାଣନ୍ତୁ →',
      'tt-filter-line':     'ଟ୍ରାନ୍ଜିଟ ଲାଇନ ବାଛନ୍ତୁ',
      'tt-filter-station':  'ଷ୍ଟେସନ ବାଛନ୍ତୁ',
      'tt-filter-day':      'ସମୟ ପ୍ରସଙ୍ଗ',
      'tt-up-dir':          'ଉପ ଦିଗ',
      'tt-dn-dir':          'ଡାଉନ ଦିଗ',
      'tt-up-sched':        'ଉପ ସୂଚୀ',
      'tt-dn-sched':        'ଡାଉନ ସୂଚୀ',
      'profile-tickets':    'ଆପଣଙ୍କ ଟିକେଟ / ପାସ',
      'profile-recharge':   'କାର୍ଡ ରିଚାର୍ଜ',
      'profile-balance':    'ବ୍ୟାଲେନ୍ସ ଦେଖନ୍ତୁ',
      'profile-lang':       'ଆପ ଭାଷା',
      'profile-support':    'ସହାୟତା',
      'profile-feedback':   'ମତାମତ',
      'profile-privacy':    'ଗୋପନୀୟତା ନୀତି',
      'profile-about':      'ଆପ ବିଷୟରେ',
      'profile-logout':     'ଲଗ ଆଉଟ',
    },
  },

  /* ══════════════════════════════════════════════════
     APPLY TRANSLATIONS TO THE ENTIRE PAGE
  ══════════════════════════════════════════════════ */
  applyLanguage(lang) {
    const dict = this.translations[lang] || this.translations.english;

    /* 1. All elements with data-i18n attribute */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    /* 2. Desktop nav text nodes (SVG + text node together — must target text only) */
    const desktopNavMap = { 'nav-home': 'home', 'nav-timetable': 'timetable', 'nav-routes': 'routes', 'nav-fare': 'fare' };
    Object.entries(desktopNavMap).forEach(([key, page]) => {
      const link = document.querySelector(`.nav-item[data-page="${page}"]`);
      if (!link) return;
      const textNodes = [...link.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
      if (textNodes.length) textNodes[textNodes.length - 1].textContent = '\n          ' + dict[key];
    });

    /* 3. Mobile nav text nodes */
    const mobileNavMap = { 'mob-home': 'home', 'mob-timetable': 'timetable', 'mob-routes': 'routes', 'mob-fare': 'fare' };
    Object.entries(mobileNavMap).forEach(([key, page]) => {
      const link = document.querySelector(`.mobile-nav-link[data-page="${page}"]`);
      if (!link) return;
      const textNodes = [...link.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
      if (textNodes.length) textNodes[textNodes.length - 1].textContent = '\n          ' + dict[key];
    });

    /* 4. html lang attribute for screen readers */
    const langAttr = { english: 'en', hindi: 'hi', odia: 'or' };
    document.documentElement.lang = langAttr[lang] || 'en';

    /* 5. Profile "current language" badge */
    const langDisplayNames = { english: 'ENGLISH', hindi: 'हिंदी', odia: 'ଓଡ଼ିଆ' };
    const currentLangEl = document.getElementById('currentLang');
    if (currentLangEl) currentLangEl.textContent = langDisplayNames[lang] || 'ENGLISH';

    /* 6. Persist selection */
    localStorage.setItem('oe_lang', lang);
  },

  /* ── Language modal ─────────────────────────────── */
  initLanguageModal() {
    const openBtn  = document.getElementById('openLanguageModal');
    const closeBtn = document.getElementById('closeLanguageModal');
    const modal    = document.getElementById('languageModal');

    openBtn?.addEventListener('click', () => {
      /* Sync active highlight with current saved language */
      const current = this.user?.lang || localStorage.getItem('oe_lang') || 'english';
      modal?.querySelectorAll('.lang-option').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === current);
      });
      if (modal) modal.style.display = 'flex';
    });

    closeBtn?.addEventListener('click', () => { if (modal) modal.style.display = 'none'; });
    modal?.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    modal?.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        /* Update highlighted button */
        modal.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const lang = btn.dataset.lang;

        /* Save to user object */
        if (this.user) {
          this.user.lang = lang;
          this.saveUser(this.user);
        }

        /* Apply ALL translations to the page immediately */
        this.applyLanguage(lang);

        if (modal) modal.style.display = 'none';

        /* Toast in the chosen language */
        const toastMsgs = {
          english: 'LANGUAGE SET TO ENGLISH',
          hindi:   'भाषा हिंदी में बदली गई',
          odia:    'ଭାଷା ଓଡ଼ିଆ ରେ ପରିବର୍ତ୍ତନ ହୋଇଛି',
        };
        this.showToast(toastMsgs[lang] || 'LANGUAGE UPDATED');
      });
    });

    /* Apply saved language on every page load */
    const savedLang = this.user?.lang || localStorage.getItem('oe_lang') || 'english';
    this.applyLanguage(savedLang);
    modal?.querySelector(`[data-lang="${savedLang}"]`)?.classList.add('active');
  },

  /* ── General profile modals ─────────────────────── */
  initGenModal() {
    const modal    = document.getElementById('profileGenModal');
    const closeBtn = document.getElementById('closeGenModal');
    closeBtn?.addEventListener('click', () => { if (modal) modal.style.display = 'none'; });
    modal?.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  },

  showProfileModal(type) {
    const modal    = document.getElementById('profileGenModal');
    const tag      = document.getElementById('genModalTag');
    const title    = document.getElementById('genModalTitle');
    const body     = document.getElementById('genModalBody');
    if (!modal) return;

    const configs = {
      tickets: {
        tag: '[TICKETS_&_PASSES]', title: 'YOUR TICKETS / PASSES',
        body: this.renderTickets(),
      },
      recharge: {
        tag: '[CARD_RECHARGE]', title: 'CARD RECHARGE',
        body: `
          <div class="balance-display" style="margin-bottom:16px;">
            <div class="balance-amount">&#8377; ${this.user?.balance?.toFixed(2) || '0.00'}</div>
            <div class="balance-label">CURRENT BALANCE</div>
          </div>
          <div style="margin-bottom:12px; padding:10px; background:rgba(0,180,255,0.1); border:1px solid var(--accent); border-radius:var(--radius-md); font-family:var(--font-mono); font-size:10px; color:var(--accent); text-align:center; letter-spacing:0.05em;">
            [SECURE_PAYMENT_GATEWAY_ACTIVE]
          </div>
          <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--text-muted);margin-bottom:10px;">SELECT RECHARGE AMOUNT:</p>
          <div class="recharge-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom:20px;">
            ${[50,100,200,500,1000,2000].map((amt, idx) =>
              `<button class="recharge-amt-btn ${idx === 1 ? 'active' : ''}" 
                onclick="window.selectedRechargeAmt = ${amt}; 
                         const btns = this.parentElement.querySelectorAll('.recharge-amt-btn');
                         btns.forEach(b => { b.style.borderColor = 'var(--border-secondary)'; b.style.background = 'var(--bg-card)'; });
                         this.style.borderColor = 'var(--accent)'; 
                         this.style.background = 'var(--accent-glow)';" 
                style="padding:12px 4px; background:${idx === 1 ? 'var(--accent-glow)' : 'var(--bg-card)'}; border:1px solid ${idx === 1 ? 'var(--accent)' : 'var(--border-secondary)'}; border-radius:var(--radius-md); color:var(--text-primary); font-family:var(--font-orb); font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s;">
                &#8377;${amt}
              </button>`
            ).join('')}
          </div>
          <button id="mainRechargeBtn" class="btn-primary" onclick="window.openPaymentModal(null, window.selectedRechargeAmt || 100, 'RECHARGE')" style="width:100%; padding:14px; font-family:var(--font-orb); font-size:12px; font-weight:900; letter-spacing:0.12em; background:var(--accent); color:#000; border:none; border-radius:var(--radius-md); cursor:pointer; box-shadow: 0 4px 20px var(--accent-glow); display:flex; align-items:center; justify-content:center; gap:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            RECHARGE NOW
          </button>`,
      },
      balance: {
        tag: '[VIEW_BALANCE]', title: 'CARD BALANCE',
        body: `
          <div class="balance-display">
            <div class="balance-amount">&#8377; ${this.user?.balance?.toFixed(2) || '0.00'}</div>
            <div class="balance-label">AVAILABLE BALANCE</div>
          </div>`,
      },
      support: {
        tag: '[SUPPORT]', title: 'SUPPORT',
        body: `
          <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px;">
            <a href="tel:1073" style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-secondary);border:1px solid var(--border-secondary);border-radius:var(--radius-md);color:var(--accent);font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;">
              📞 HELPLINE 1073
            </a>
            <a href="tel:1074" style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-secondary);border:1px solid var(--border-secondary);border-radius:var(--radius-md);color:var(--accent);font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;">
              📞 HELPLINE 1074
            </a>
            <div style="padding:16px;background:var(--bg-secondary);border:1px solid var(--border-secondary);border-radius:var(--radius-md);font-family:var(--font-mono);font-size:10px;color:var(--text-secondary);letter-spacing:.06em;line-height:1.8;">
              EMAIL: support@odishaexpress.in<br/>
              HOURS: MON–SAT 06:00–22:00
            </div>
          </div>`,
      },
      feedback: {
        tag: '[FEEDBACK]', title: 'SEND FEEDBACK',
        body: `
          <div style="display:flex;flex-direction:column;gap:12px;margin-top:8px;">
            <textarea placeholder="WRITE YOUR FEEDBACK HERE..." style="background:var(--bg-input);border:1px solid var(--border-input);border-radius:var(--radius-md);padding:14px;font-family:var(--font-raj);font-size:14px;color:var(--text-primary);resize:vertical;min-height:120px;outline:none;"></textarea>
            <button onclick="Profile.submitFeedback(this)" style="padding:13px;background:transparent;border:1px solid var(--accent);border-radius:var(--radius-md);font-family:var(--font-orb);font-size:12px;letter-spacing:.08em;color:var(--accent);cursor:pointer;">SUBMIT FEEDBACK</button>
          </div>`,
      },
      privacy: {
        tag: '[PRIVACY_POLICY]', title: 'PRIVACY POLICY',
        body: `
          <div style="font-family:var(--font-raj);font-size:13px;color:var(--text-secondary);line-height:1.8;max-height:300px;overflow-y:auto;">
            <p><strong style="color:var(--text-primary);">DATA COLLECTION</strong><br/>We collect your name, email, phone number, and travel history to provide personalized metro services.</p>
            <br/>
            <p><strong style="color:var(--text-primary);">DATA USAGE</strong><br/>Your data is used solely to improve your Odisha Express experience and is never sold to third parties.</p>
            <br/>
            <p><strong style="color:var(--text-primary);">SECURITY</strong><br/>All data is encrypted and stored securely. We follow industry-standard security practices.</p>
            <br/>
            <p><strong style="color:var(--text-primary);">CONTACT</strong><br/>For privacy concerns: privacy@odishaexpress.in</p>
          </div>`,
      },
      about: {
        tag: '[ABOUT_APP]', title: 'ABOUT ODISHA EXPRESS',
        body: `
          <div style="text-align:center;padding:16px 0;">
            <div style="width:64px;height:64px;background:var(--accent-glow);border:1px solid var(--accent);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-family:var(--font-orb);font-size:28px;font-weight:900;color:var(--accent);">M</div>
            <p style="font-family:var(--font-orb);font-size:16px;font-weight:700;letter-spacing:.06em;color:var(--text-primary);">ODISHA EXPRESS</p>
            <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--text-muted);margin:6px 0 16px;">BHUBANESWAR METRO NETWORK</p>
            <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;color:var(--text-secondary);">VERSION 1.0.0</p>
            <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:.08em;color:var(--text-muted);margin-top:4px;"> ©2026 BHUBANESWAR METRO</p>
          </div>`,
      },
    };

    const cfg = configs[type];
    if (!cfg) return;

    if (tag)   tag.textContent   = cfg.tag;
    if (title) title.textContent = cfg.title;
    if (body)  body.innerHTML    = cfg.body;

    modal.style.display = 'flex';
  },

  /* ── Render Tickets List ───────────────────────── */
  renderTickets() {
    const tickets = this.user?.tickets || [];
    if (tickets.length === 0) {
      return `<div class="no-tickets">NO ACTIVE TICKETS OR PASSES.<br/>BOOK A JOURNEY TO SEE YOUR TICKETS HERE.</div>`;
    }

    return `
      <div class="tickets-list">
        ${tickets.map(t => `
          <div class="ticket-item" style="border-left-color: ${t.lineColor || 'var(--accent)'}">
            <div class="ticket-header">
              <span class="ticket-id">${t.id}</span>
              <div style="display:flex; align-items:center; gap:8px;">
                <button class="recharge-btn" style="padding:4px 10px; font-size:9px; margin:0;" onclick="window.openPaymentModal(null, 100, 'RECHARGE')">RECHARGE</button>
                <span class="ticket-status">${t.status}</span>
              </div>
            </div>
            <div class="ticket-route">
              <span class="ticket-station">${t.origin}</span>
              <span class="ticket-arrow">→</span>
              <span class="ticket-station">${t.dest}</span>
            </div>
            <div class="ticket-footer">
              <div class="ticket-info-group">
                <span class="ticket-label">METRO LINE</span>
                <span class="ticket-value" style="color:${t.lineColor}">${t.lineName}</span>
              </div>
              <div class="ticket-info-group">
                <span class="ticket-label">DATE</span>
                <span class="ticket-value">${new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
              </div>
              <div class="ticket-fare">₹${t.fare}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  recharge(amount) {
    if (!this.user) return;
    this.user.balance = (this.user.balance || 0) + amount;
    this.saveUser(this.user);
    /* Refresh modal body if it's currently showing recharge */
    const tag = document.getElementById('genModalTag');
    if (tag && tag.textContent === '[CARD_RECHARGE]') {
      this.showProfileModal('recharge');
    }
    this.showToast(`₹${amount} RECHARGED SUCCESSFULLY!`);
  },

  completeRecharge(amount) {
    if (!this.user) return;
    this.user.balance = (this.user.balance || 0) + amount;
    this.saveUser(this.user);
    
    /* Refresh UI */
    const tag = document.getElementById('genModalTag');
    if (tag && (tag.textContent === '[CARD_RECHARGE]' || tag.textContent === '[VIEW_BALANCE]')) {
      this.showProfileModal(tag.textContent === '[CARD_RECHARGE]' ? 'recharge' : 'balance');
    }
    
    this.showToast('Recharge completed. Start your journy now');
  },

  submitFeedback(btn) {
    const modal = document.getElementById('profileGenModal');
    if (modal) modal.style.display = 'none';
    this.showToast('FEEDBACK SUBMITTED. THANK YOU!');
  },

  /* ── Logout ──────────────────────────────────────── */
  initLogout() {
    const btn = document.getElementById('logoutBtn');
    btn?.addEventListener('click', () => {
      if (confirm('ARE YOU SURE YOU WANT TO LOGOUT?')) {
        sessionStorage.removeItem('oe_user');
        sessionStorage.removeItem('oe_current_page');
        window.location.href = 'index.html';
      }
    });
  },

  /* ── Toast notification ─────────────────────────── */
  showToast(msg) {
    const existing = document.getElementById('oe-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'oe-toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '90px',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: 'var(--bg-card)',
      border: '1px solid var(--accent)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 24px',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      letterSpacing: '0.08em',
      color: 'var(--accent)',
      zIndex: '9999',
      boxShadow: '0 4px 20px rgba(0,180,255,0.2)',
      opacity: '0',
      transition: 'opacity 0.3s, transform 0.3s',
    });
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  /* ── Init everything ─────────────────────────────── */
  init() {
    this.user = this.loadUser();
    if (!this.user) return;

    this.renderHeader();
    this.initEditProfile();
    this.initAvatarPicker();
    this.initLanguageModal();
    this.initGenModal();
    this.initLogout();

    /* Expose showProfileModal globally (called from HTML) */
    window.showProfileModal = (type) => this.showProfileModal(type);
    window.Profile = this;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Profile.init();
});