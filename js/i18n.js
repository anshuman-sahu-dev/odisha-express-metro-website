/* ═══════════════════════════════════════════════════════════════
   ODISHA EXPRESS — i18n.js
   Complete translation engine for English / Hindi / Odia
   Covers EVERY text node on the page — nav, hero, timetable,
   routes, fare, profile, modals, footer, and more.
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     TRANSLATION DICTIONARY
     Keys are logical IDs; values are { en, hi, od }
  ───────────────────────────────────────────────────────────── */
  const T = {

    /* ── NAV ─────────────────────────────────────────────────── */
    'nav-home':         { en: 'HOME',        hi: 'होम',          od: 'ହୋମ' },
    'nav-timetable':   { en: 'TIME TABLE',  hi: 'समय सारणी',    od: 'ସମୟ ତାଲିକା' },
    'nav-routes':      { en: 'ROUTES',      hi: 'रूट',          od: 'ରୁଟ' },
    'nav-fare':        { en: 'FARE',        hi: 'किराया',        od: 'ଭଡ଼ା' },
    'nav-metrocard':   { en: 'METRO CARD',  hi: 'मेट्रो कार्ड', od: 'ମେଟ୍ରୋ କାର୍ଡ' },

    /* ── STATUS BAR ──────────────────────────────────────────── */
    'status-system':   { en: 'SYSTEM STATUS:', hi: 'सिस्टम स्थिति:', od: 'ସିଷ୍ଟମ ସ୍ଥିତି:' },
    'status-online':   { en: 'ONLINE',          hi: 'ऑनलाइन',        od: 'ଅନଲାଇନ' },
    'status-auth':     { en: 'AUTH MODULE:',    hi: 'ऑथ मॉड्यूल:',   od: 'ଅଥ ମଡ୍ୟୁଲ:' },
    'status-active':   { en: 'ACTIVE',          hi: 'सक्रिय',         od: 'ସକ୍ରିୟ' },

    /* ── HERO SECTION 1 ──────────────────────────────────────── */
    'hero1-title':     { en: "ODISHA'S\nFIRST METRO", hi: 'ओडिशा का\nपहला मेट्रो', od: 'ଓଡ଼ିଶାର\nପ୍ରଥମ ମେଟ୍ରୋ' },
    'hero1-desc':      {
      en: "A new era of urban transit for Bhubaneswar. The Blue Line forms the historic backbone of Odisha's first metro network, connecting the heart of the city.",
      hi: 'भुवनेश्वर के लिए शहरी परिवहन का एक नया युग। ब्लू लाइन ओडिशा के पहले मेट्रो नेटवर्क की ऐतिहासिक रीढ़ बनती है, शहर के दिल को जोड़ती है।',
      od: 'ଭୁବନେଶ୍ୱର ପାଇଁ ସହରୀ ପରିବହନର ଏକ ନୂଆ ଯୁଗ। ନୀଳ ରେଖା ଓଡ଼ିଶାର ପ୍ରଥମ ମେଟ୍ରୋ ନେଟୱାର୍କର ଐତିହାସିକ ମେରୁଦଣ୍ଡ ଗଠନ କରେ, ସହରର ହୃଦୟକୁ ସଂଯୋଗ କରେ।'
    },
    'hero1-status':    { en: 'BLUE LINE ACTIVE', hi: 'ब्लू लाइन सक्रिय', od: 'ନୀଳ ରେଖା ସକ୍ରିୟ' },

    /* ── HERO SECTION 2 ──────────────────────────────────────── */
    'hero2-title':     { en: 'EXPANDING\nHORIZONS', hi: 'विस्तारित\nक्षितिज', od: 'ବିସ୍ତାରିତ\nଦିଗବଳୟ' },
    'hero2-desc':      {
      en: 'Connecting the city like never before. The Green Line bridges crucial gaps, bringing all corners of Bhubaneswar closer together.',
      hi: 'शहर को पहले की तरह कभी नहीं जोड़ा। ग्रीन लाइन महत्वपूर्ण अंतराल को पाटती है, भुवनेश्वर के सभी कोनों को एक-दूसरे के करीब लाती है।',
      od: 'ପ୍ରଥମ ଥର ପରି ସହରକୁ ସଂଯୋଗ କରୁଛି। ସବୁଜ ରେଖା ଗୁରୁତ୍ୱପୂର୍ଣ ଶୂନ୍ୟସ୍ଥାନ ପୂରଣ କରେ, ଭୁବନେଶ୍ୱରର ସମସ୍ତ କୋଣକୁ ପରସ୍ପର ନିକଟ ଆଣେ।'
    },
    'hero2-status':    { en: 'GREEN LINE ACTIVE', hi: 'ग्रीन लाइन सक्रिय', od: 'ସବୁଜ ରେଖା ସକ୍ରିୟ' },

    /* ── HERO SECTION 3 ──────────────────────────────────────── */
    'hero3-title':     { en: 'ONE SMART\nNETWORK', hi: 'एक स्मार्ट\nनेटवर्क', od: 'ଏକ ସ୍ମାର୍ଟ\nନେଟୱାର୍କ' },
    'hero3-desc':      {
      en: 'Blue, Green, Orange, Purple, Yellow or Pink. Navigate the expanding, fully air-conditioned network with a single contactless tap.',
      hi: 'नीला, हरा, नारंगी, बैंगनी, पीला या गुलाबी। एक सिंगल कॉन्टेक्टलेस टैप के साथ विस्तारित, पूरी तरह से वातानुकूलित नेटवर्क में नेविगेट करें।',
      od: 'ନୀଳ, ସବୁଜ, କମଳା, ବାଇଗଣୀ, ହଳଦୀ ବା ଗୋଲାପୀ। ଏକ ଏକକ ସ୍ପର୍ଶବିହୀନ ଟ୍ୟାପ ସହ ବିସ୍ତୃତ, ସম୍ପୂର୍ଣ ଏୟାର-କଣ୍ଡିଶନ ନେଟୱାର୍କ ଭ୍ରମଣ କରନ୍ତୁ।'
    },
    'hero3-status':    { en: 'VALID ALL LINES', hi: 'सभी लाइनों पर वैध', od: 'ସବୁ ରେଖାରେ ବୈଧ' },

    /* ── HERO SECTION 4 ──────────────────────────────────────── */
    'hero4-title':     { en: 'NETWORK\nROUTES', hi: 'नेटवर्क\nरूट', od: 'ନେଟୱାର୍କ\nରୁଟ' },
    'hero4-status':    { en: 'ORANGE LINE ACTIVE', hi: 'ऑरेंज लाइन सक्रिय', od: 'କମଳା ରେଖା ସକ୍ରିୟ' },

    /* ── HERO SECTION 5 ──────────────────────────────────────── */
    'hero5-title':     { en: 'FARE\nSTRUCTURE', hi: 'किराया\nसंरचना', od: 'ଭଡ଼ା\nଢ଼ାଞ୍ଚା' },
    'hero5-desc':      {
      en: 'Affordable transit for everyone. Use your Smart Card for seamless travel and bonus recharge value.',
      hi: 'सभी के लिए किफायती परिवहन। निर्बाध यात्रा और बोनस रिचार्ज मूल्य के लिए अपने स्मार्ट कार्ड का उपयोग करें।',
      od: 'ସମସ୍ତଙ୍କ ପାଇଁ ସୁଲଭ ପରିବହନ। ନିରବଚ୍ଛିନ୍ନ ଯାତ୍ରା ଏବଂ ବୋନସ ରିଚାର୍ଜ ମୂଲ୍ୟ ପାଇଁ ଆପଣଙ୍କ ସ୍ମାର୍ଟ କାର୍ଡ ବ୍ୟବହାର କରନ୍ତୁ।'
    },
    'hero5-status':    { en: 'GOLDEN LINE ACTIVE', hi: 'गोल्डन लाइन सक्रिय', od: 'ସୁବର୍ଣ ରେଖା ସକ୍ରିୟ' },
    'fare-table-dist': { en: 'DISTANCE (KM)', hi: 'दूरी (कि.मी.)', od: 'ଦୂରତା (କି.ମି.)' },
    'fare-table-std':  { en: 'STANDARD FARE', hi: 'मानक किराया',   od: 'ମାନକ ଭଡ଼ା' },
    'fare-table-r1':   { en: '0 – 5 km',    hi: '0 – 5 कि.मी.',  od: '0 – 5 କି.ମି.' },
    'fare-table-r2':   { en: '5 – 10 km',   hi: '5 – 10 कि.मी.', od: '5 – 10 କି.ମି.' },
    'fare-table-r3':   { en: '10 – 20 km',  hi: '10 – 20 कि.मी.',od: '10 – 20 କି.ମି.' },
    'fare-table-r4':   { en: '20 – 30 km',  hi: '20 – 30 कि.मी.',od: '20 – 30 କି.ମି.' },
    'fare-table-r5':   { en: 'Above 30 km', hi: '30 कि.मी. से अधिक', od: '30 କି.ମି.ରୁ ଅଧିକ' },
    'fare-table-extra':{ en: '+ ₹10 / 10km',hi: '+ ₹10 / 10 कि.मी.', od: '+ ₹10 / 10 କି.ମି.' },

    /* ── HERO SECTION 6 ──────────────────────────────────────── */
    'hero6-title':   { en: 'METRO\nREGULATIONS', hi: 'मेट्रो\nनियम', od: 'ମେଟ୍ରୋ\nନିୟମ' },
    'hero6-desc':    {
      en: 'For the safety and comfort of all passengers, the following items cannot be taken inside metro premises.',
      hi: 'सभी यात्रियों की सुरक्षा और आराम के लिए, निम्नलिखित वस्तुएं मेट्रो परिसर के अंदर नहीं ले जाई जा सकतीं।',
      od: 'ସମସ୍ତ ଯାତ୍ରୀଙ୍କ ସୁରକ୍ଷା ଓ ଆରାମ ପାଇଁ, ନିମ୍ନଲିଖିତ ଜିନିସ ମେଟ୍ରୋ ପ୍ରାଙ୍ଗଣ ଭିତରକୁ ନିଆ ଯାଇ ପାରିବ ନାହିଁ।'
    },
    'reg-item-1':    { en: 'Raw fish, meat', hi: 'कच्ची मछली, मांस', od: 'କଞ୍ଚା ମଛ, ମାଂସ' },
    'reg-item-2':    { en: 'Dynamite, explosives, flammable substances', hi: 'डायनामाइट, विस्फोटक, ज्वलनशील पदार्थ', od: 'ଡ୍ୟାନାମାଇଟ, ବିସ୍ଫୋରକ, ଜ୍ୱଳନୀୟ ପଦାର୍ଥ' },
    'reg-item-3':    { en: 'Petrol, acid, large batteries', hi: 'पेट्रोल, एसिड, बड़ी बैटरी', od: 'ପେଟ୍ରୋଲ, ଏସିଡ, ବଡ ବ୍ୟାଟେରୀ' },
    'reg-item-4':    { en: 'Objects longer than 4 feet', hi: '4 फुट से लंबी वस्तुएं', od: '4 ଫୁଟରୁ ଲମ୍ବା ଜିନିସ' },
    'reg-item-5':    { en: 'Toxic substances, tear gas', hi: 'जहरीले पदार्थ, आंसू गैस', od: 'ବିଷାକ୍ତ ପଦାର୍ଥ, କ୍ଷୋଭ ଗ୍ୟାସ' },
    'reg-item-6':    { en: 'Screwdrivers, hammers, knives, saws', hi: 'पेचकश, हथौड़े, चाकू, आरे', od: 'ସ୍କ୍ରୁ ଡ୍ରାଇଭର, ହାତୁଡ଼ି, ଛୁରି, ଆରା' },
    'hero6-warning': {
      en: 'IF CAUGHT CARRYING THESE, A FINE WILL BE IMPOSED.',
      hi: 'यदि ये वस्तुएं ले जाते हुए पकड़े गए, तो जुर्माना लगाया जाएगा।',
      od: 'ଏହି ଜିନିସ ଧରା ପଡ଼ିଲେ ଜୋରିମାନା ଲାଗୁ ହେବ।'
    },
    'hero6-status':  { en: 'RESTRICTED ITEMS', hi: 'प्रतिबंधित वस्तुएं', od: 'ପ୍ରତିବନ୍ଧିତ ଜିନିସ' },

    /* ── NETWORK STATUS LABEL (shared) ───────────────────────── */
    'network-status': { en: 'NETWORK STATUS:', hi: 'नेटवर्क स्थिति:', od: 'ନେଟୱାର୍କ ସ୍ଥିତି:' },

    /* ── DRAG HINT ───────────────────────────────────────────── */
    'drag-hint':     { en: '← DRAG CARD TO EXPLORE →', hi: '← कार्ड खींचें →', od: '← କାର୍ଡ ଟାଣନ୍ତୁ →' },

    /* ── HOME FOOTER ─────────────────────────────────────────── */
    'footer-copy':   {
      en: '© 2026 BHUBANESWAR METRO. ALL RIGHTS RESERVED. | HELP LINE:',
      hi: '© 2026 भुवनेश्वर मेट्रो. सर्वाधिकार सुरक्षित. | हेल्प लाइन:',
      od: '© 2026 ଭୁବନେଶ୍ୱର ମେଟ୍ରୋ. ସର୍ବସ୍ୱ ସଂରକ୍ଷିତ. | ସହାୟତା ଲାଇନ:'
    },

    /* ── ROUTE LIST ITEMS (hero section 4) ───────────────────── */
    'route-list-1':  { en: 'Bhubaneswar North ↔ Bhubaneswar South', hi: 'भुवनेश्वर उत्तर ↔ भुवनेश्वर दक्षिण', od: 'ଭୁବନେଶ୍ୱର ଉତ୍ତର ↔ ଭୁବନେଶ୍ୱର ଦକ୍ଷିଣ' },
    'route-list-2':  { en: 'Airport ↔ Old Town',    hi: 'हवाई अड्डा ↔ पुराना शहर',  od: 'ବିମାନ ବନ୍ଦର ↔ ପୁରୁଣା ସହର' },
    'route-list-3':  { en: 'AIIMS ↔ Infocity',      hi: 'एम्स ↔ इन्फोसिटी',         od: 'ଏଇମ୍ସ ↔ ଇନ୍ଫୋସିଟି' },
    'route-list-4':  { en: 'Rasulgarh ↔ Patia',     hi: 'रसूलगढ़ ↔ पाटिया',          od: 'ରସୁଲଗଡ଼ ↔ ପାଟିଆ' },
    'route-list-5':  { en: 'Unit-1 ↔ Baramunda',    hi: 'यूनिट-1 ↔ बारामुंडा',       od: 'ୟୁନିଟ-1 ↔ ବାରାମୁଣ୍ଡା' },
    'route-list-6':  { en: 'Lingaraj ↔ Jaydev Vihar',hi: 'लिंगराज ↔ जयदेव विहार',  od: 'ଲିଙ୍ଗରାଜ ↔ ଜୟଦେବ ବିହାର' },

    /* ── TIMETABLE PAGE ──────────────────────────────────────── */
    'page-title-tt':      { en: 'TIME_TABLE',          hi: 'समय_सारणी',       od: 'ସମୟ_ତାଲିକା' },
    'tt-filter-line':     { en: 'SELECT TRANSIT LINE', hi: 'ट्रांजिट लाइन चुनें', od: 'ଟ୍ରାନ୍ସିଟ ଲାଇନ ବାଛନ୍ତୁ' },
    'tt-filter-station':  { en: 'SELECT STATION',      hi: 'स्टेशन चुनें',       od: 'ଷ୍ଟେସନ ବାଛନ୍ତୁ' },
    'tt-filter-day':      { en: 'TEMPORAL CONTEXT',    hi: 'दिन चुनें',          od: 'ଦିନ ବାଛନ୍ତୁ' },
    'tt-day-weekday':     { en: 'Monday to Friday',    hi: 'सोमवार से शुक्रवार', od: 'ସୋମବାର ରୁ ଶୁକ୍ରବାର' },
    'tt-day-saturday':    { en: 'Saturday',            hi: 'शनिवार',             od: 'ଶନିବାର' },
    'tt-day-sunday':      { en: 'Sunday',              hi: 'रविवार',             od: 'ରବିବାର' },
    'tt-live-heading':    { en: 'LIVE DEPARTURES',     hi: 'लाइव प्रस्थान',      od: 'ଲାଇଭ ପ୍ରସ୍ଥାନ' },
    'tt-display-next':    { en: 'DISPLAYING NEXT 10 TRAINS', hi: 'अगले 10 ट्रेनें दिखाई जा रही हैं', od: 'ପ୍ରଥମ 10 ଟ୍ରେନ ଦେଖାଯାଉଛି' },
    'tt-up-dir':          { en: 'UP DIRECTION',        hi: 'ऊपर दिशा',           od: 'ଉପ ଦିଗ' },
    'tt-dn-dir':          { en: 'DN DIRECTION',        hi: 'नीचे दिशा',          od: 'ଡାଉନ ଦିଗ' },
    'tt-complete-heading':{ en: 'COMPLETE TIMETABLE',  hi: 'पूरी समय सारणी',     od: 'ସଂପୂର୍ଣ ସମୟ ତାଲିକା' },
    'tt-all-services':    { en: 'ALL SCHEDULED SERVICES', hi: 'सभी अनुसूचित सेवाएं', od: 'ସମସ୍ତ ଅନୁସୂଚିତ ସେବା' },
    'tt-up-sched':        { en: 'UP SCHEDULE',         hi: 'ऊपर अनुसूची',        od: 'ଉପ ଅନୁସୂଚୀ' },
    'tt-dn-sched':        { en: 'DN SCHEDULE',         hi: 'नीचे अनुसूची',       od: 'ଡାଉନ ଅନୁସୂଚୀ' },
    'tt-col-trainno':     { en: 'TRAIN NO.',           hi: 'ट्रेन संख्या',        od: 'ଟ୍ରେନ ନଂ.' },
    'tt-col-depart':      { en: 'DEPARTURE',           hi: 'प्रस्थान',            od: 'ପ୍ରସ୍ଥାନ' },
    'tt-col-dest':        { en: 'DESTINATION',         hi: 'गंतव्य',              od: 'ଗନ୍ତବ୍ୟ' },
    'tt-sync-status':     { en: 'SYNC STATUS:',        hi: 'सिंक स्थिति:',        od: 'ସିଙ୍କ ସ୍ଥିତି:' },
    'tt-sync-live':       { en: 'LIVE',                hi: 'लाइव',                od: 'ଲାଇଭ' },
    'tt-record-entries':  { en: 'RECORD ENTRIES:',     hi: 'रिकॉर्ड प्रविष्टियां:', od: 'ରେକର୍ଡ ପ୍ରବିଷ୍ଟି:' },

    /* ── ROUTES PAGE ─────────────────────────────────────────── */
    'page-title-routes':  { en: 'ODISHA_METRO',        hi: 'ओडिशा_मेट्रो',       od: 'ଓଡ଼ିଶା_ମେଟ୍ରୋ' },
    'routes-net-status':  { en: 'NETWORK STATUS:',     hi: 'नेटवर्क स्थिति:',     od: 'ନେଟୱାର୍କ ସ୍ଥିତି:' },
    'routes-net-optimal': { en: 'OPTIMAL',             hi: 'इष्टतम',              od: 'ଅନୁକୂଳ' },
    'routes-active-nodes':{ en: 'ACTIVE NODES:',       hi: 'सक्रिय नोड्स:',       od: 'ସକ୍ରିୟ ନୋଡ:' },
    'routes-active-total':{ en: 'ACTIVE / TOTAL',      hi: 'सक्रिय / कुल',        od: 'ସକ୍ରିୟ / ମୋଟ' },
    'route-blue-name':    { en: 'BLUE LINE',            hi: 'ब्लू लाइन',           od: 'ନୀଳ ରେଖା' },
    'route-green-name':   { en: 'GREEN LINE',           hi: 'ग्रीन लाइन',          od: 'ସବୁଜ ରେଖା' },
    'route-orange-name':  { en: 'ORANGE LINE',          hi: 'ऑरेंज लाइन',          od: 'କମଳା ରେଖା' },
    'route-purple-name':  { en: 'PURPLE LINE',          hi: 'पर्पल लाइन',           od: 'ବାଇଗଣୀ ରେଖା' },
    'route-yellow-name':  { en: 'YELLOW LINE',          hi: 'येलो लाइन',            od: 'ହଳଦୀ ରେଖା' },
    'route-pink-name':    { en: 'PINK LINE',            hi: 'पिंक लाइन',            od: 'ଗୋଲାପୀ ରେଖା' },

    /* ── FARE PAGE ───────────────────────────────────────────── */
    'page-title-fare':    { en: 'ODISHA METRO',         hi: 'ओडिशा मेट्रो',        od: 'ଓଡ଼ିଶା ମେଟ୍ରୋ' },
    'fare-mod-status':    { en: 'MODULE STATUS:',       hi: 'मॉड्यूल स्थिति:',     od: 'ମଡ୍ୟୁଲ ସ୍ଥିତି:' },
    'fare-mod-online':    { en: 'ONLINE',               hi: 'ऑनलाइन',              od: 'ଅନଲାଇନ' },
    'fare-lines-indexed': { en: 'LINES INDEXED:',       hi: 'इंडेक्स की गई लाइनें:', od: 'ଇଣ୍ଡେକ୍ସ ଲାଇନ:' },
    'fare-uplink-label':  { en: 'ROUTE UPLINK',         hi: 'रूट अपलिंक',           od: 'ରୁଟ ଅପଲିଙ୍କ' },
    'fare-awaiting':      { en: 'AWAITING INPUT',       hi: 'इनपुट की प्रतीक्षा',   od: 'ଇନପୁଟ ଅପେକ୍ଷା' },
    'fare-computed-label':{ en: 'COMPUTED FARE',        hi: 'गणना किया गया किराया', od: 'ଗଣନା କରା ଭଡ଼ା' },
    'fare-sel-origin':    { en: 'SELECT ORIGIN',        hi: 'उद्गम चुनें',           od: 'ଉତ୍ପତ୍ତି ସ୍ଥାନ ବାଛନ୍ତୁ' },
    'fare-sel-target':    { en: 'SELECT TARGET',        hi: 'गंतव्य चुनें',          od: 'ଲକ୍ଷ୍ୟ ବାଛନ୍ତୁ' },
    'fare-blue-matrix':   { en: 'BLUE LINE MATRIX',     hi: 'ब्लू लाइन मैट्रिक्स',   od: 'ନୀଳ ରେଖା ମ୍ୟାଟ୍ରିକ୍ସ' },
    'fare-green-matrix':  { en: 'GREEN LINE MATRIX',    hi: 'ग्रीन लाइन मैट्रिक्स',  od: 'ସବୁଜ ରେଖା ମ୍ୟାଟ୍ରିକ୍ସ' },
    'fare-orange-matrix': { en: 'ORANGE LINE MATRIX',   hi: 'ऑरेंज लाइन मैट्रिक्स', od: 'କମଳା ରେଖା ମ୍ୟାଟ୍ରିକ୍ସ' },
    'fare-purple-matrix': { en: 'PURPLE LINE MATRIX',   hi: 'पर्पल लाइन मैट्रिक्स',  od: 'ବାଇଗଣୀ ରେଖା ମ୍ୟାଟ୍ରିକ୍ସ' },
    'fare-yellow-matrix': { en: 'YELLOW LINE MATRIX',   hi: 'येलो लाइन मैट्रिक्स',   od: 'ହଳଦୀ ରେଖା ମ୍ୟାଟ୍ରିକ୍ସ' },
    'fare-pink-matrix':   { en: 'PINK LINE MATRIX',     hi: 'पिंक लाइन मैट्रिक्स',   od: 'ଗୋଲାପୀ ରେଖା ମ୍ୟାଟ୍ରିକ୍ସ' },
    'fare-collect-btn':   { en: 'COLLECT TICKET',       hi: 'टिकट लें',              od: 'ଟିକଟ ନିଅନ୍ତୁ' },

    /* ── PROFILE PAGE ────────────────────────────────────────── */
    'page-title-profile': { en: 'USER PROFILE',              hi: 'उपयोगकर्ता प्रोफाइल', od: 'ଉପଭୋକ୍ତା ପ୍ରୋଫାଇଲ' },
    'profile-edit-btn':   { en: 'EDIT',                      hi: 'संपादन',               od: 'ସଂଶୋଧନ' },
    'profile-gender-lbl': { en: 'GENDER',                    hi: 'लिंग',                 od: 'ଲିଙ୍ଗ' },
    'profile-dob-lbl':    { en: 'DATE OF BIRTH',             hi: 'जन्म तिथि',             od: 'ଜନ୍ମ ତାରିଖ' },
    'profile-phone-lbl':  { en: 'PHONE',                     hi: 'फोन',                  od: 'ଫୋନ' },
    'profile-tickets':    { en: 'YOUR TICKETS / PASSES',     hi: 'आपके टिकट / पास',      od: 'ଆପଣଙ୍କ ଟିକଟ / ପାସ' },
    'profile-recharge':   { en: 'CARD RECHARGE',             hi: 'कार्ड रिचार्ज',         od: 'କାର୍ଡ ରିଚାର୍ଜ' },
    'profile-balance':    { en: 'VIEW BALANCE',              hi: 'बैलेंस देखें',           od: 'ବ୍ୟାଲେନ୍ସ ଦେଖନ୍ତୁ' },
    'profile-lang':       { en: 'APP LANGUAGE',              hi: 'ऐप भाषा',               od: 'ଆପ ଭାଷା' },
    'profile-support':    { en: 'SUPPORT',                   hi: 'सहायता',                od: 'ସହାୟତା' },
    'profile-feedback':   { en: 'FEEDBACK',                  hi: 'प्रतिक्रिया',            od: 'ମତାମତ' },
    'profile-privacy':    { en: 'PRIVACY POLICY',            hi: 'गोपनीयता नीति',          od: 'ଗୋପନୀୟତା ନୀତି' },
    'profile-about':      { en: 'ABOUT APP',                 hi: 'ऐप के बारे में',         od: 'ଆପ ବିଷୟରେ' },
    'profile-logout':     { en: 'LOGOUT',                    hi: 'लॉग आउट',               od: 'ଲଗ ଆଉଟ' },

    /* ── LANGUAGE MODAL ──────────────────────────────────────── */
    'lang-modal-title':   { en: 'SELECT LANGUAGE', hi: 'भाषा चुनें',     od: 'ଭାଷା ବାଛନ୍ତୁ' },
    'lang-en':            { en: 'ENGLISH',         hi: 'अंग्रेजी',        od: 'ଇଂରାଜୀ' },
    'lang-hi':            { en: 'हिन्दी (HINDI)',   hi: 'हिन्दी',          od: 'ହିନ୍ଦୀ' },
    'lang-od':            { en: 'ଓଡ଼ିଆ (ODIA)',    hi: 'ओड़िया',          od: 'ଓଡ଼ିଆ' },
    'lang-current-en':    { en: 'ENGLISH',          hi: 'अंग्रेजी',        od: 'ଇଂରାଜୀ' },
    'lang-current-hi':    { en: 'HINDI',            hi: 'हिन्दी',          od: 'ହିନ୍ଦୀ' },
    'lang-current-od':    { en: 'ODIA',             hi: 'ओड़िया',          od: 'ଓଡ଼ିଆ' },

    /* ── SOS MODAL ───────────────────────────────────────────── */
    'sos-title':          { en: 'EMERGENCY ASSISTANCE',           hi: 'आपातकालीन सहायता',   od: 'ଜରୁରି ସହାୟତା' },
    'sos-desc':           { en: 'CONTACT BHUBANESWAR METRO EMERGENCY SERVICES IMMEDIATELY.', hi: 'तुरंत भुवनेश्वर मेट्रो आपातकालीन सेवाओं से संपर्क करें।', od: 'ତୁରନ୍ତ ଭୁବନେଶ୍ୱର ମେଟ୍ରୋ ଜରୁରି ସେବା ସାଥେ ଯୋଗାଯୋଗ କରନ୍ତୁ।' },
    'sos-helpline1':      { en: 'HELPLINE 1073',                  hi: 'हेल्पलाइन 1073',     od: 'ସହାୟତା ଲାଇନ 1073' },
    'sos-helpline2':      { en: 'HELPLINE 1074',                  hi: 'हेल्पलाइन 1074',     od: 'ସହାୟତା ଲାଇନ 1074' },

    /* ── METRO CARD MODAL ────────────────────────────────────── */
    'mcm-title':          { en: 'METRO CARD REGISTRATION',  hi: 'मेट्रो कार्ड पंजीकरण', od: 'ମେଟ୍ରୋ କାର୍ଡ ପଞ୍ଜୀକରଣ' },
    'mcm-subtitle':       { en: 'BHUBANESWAR METRO NETWORK', hi: 'भुवनेश्वर मेट्रो नेटवर्क', od: 'ଭୁବନେଶ୍ୱର ମେଟ୍ରୋ ନେଟୱାର୍କ' },
    'mcm-cancel':         { en: 'CANCEL',                   hi: 'रद्द करें',              od: 'ବାତିଲ' },
    'mcm-submit':         { en: 'SUBMIT APPLICATION',       hi: 'आवेदन जमा करें',         od: 'ଆବେଦନ ଦାଖଲ କରନ୍ତୁ' },
    'mcm-consent-1':      {
      en: 'I confirm all details provided above are correct to the best of my knowledge.',
      hi: 'मैं पुष्टि करता/करती हूं कि ऊपर दी गई सभी जानकारी मेरी जानकारी के अनुसार सही है।',
      od: 'ମୁଁ ନିଶ୍ଚିତ କରୁଛି ଯେ ଉପରେ ଦেওয়া ସମସ୍ତ ବିବରଣ ଆମ ଜ୍ଞାନ ଅନୁଯାୟୀ ସଠିକ।'
    },
    'mcm-consent-2':      {
      en: 'I agree to the Bhubaneswar Metro Terms and Conditions and privacy policy.',
      hi: 'मैं भुवनेश्वर मेट्रो की नियम एवं शर्तों और गोपनीयता नीति से सहमत हूं।',
      od: 'ମୁଁ ଭୁବନେଶ୍ୱର ମେଟ୍ରୋ ର ସର୍ତ ଏବଂ ଗୋପନୀୟତା ନୀତି ସହ ସହମତ।'
    },
    'mcm-consent-3':      {
      en: 'I provide consent for my data to be used for metro service improvements and legal compliance.',
      hi: 'मैं मेट्रो सेवा सुधार और कानूनी अनुपालन के लिए अपने डेटा के उपयोग की सहमति देता/देती हूं।',
      od: 'ମୁଁ ମେଟ୍ରୋ ସେବା ଉନ୍ନତି ଏବଂ ଆଇନ ଅନୁପାଳନ ପାଇଁ ଆମ ତଥ୍ୟ ବ୍ୟବହାରର ଅନୁମତି ଦେଉଛି।'
    },

    /* ── AUTH PAGES (index.html / register.html) ─────────────── */
    'auth-login-title':   { en: 'USER LOGIN',         hi: 'उपयोगकर्ता लॉगिन',   od: 'ଉପଭୋକ୍ତା ଲଗଇନ' },
    'auth-username-lbl':  { en: 'USERNAME / EMAIL',   hi: 'उपयोगकर्ता नाम / ईमेल', od: 'ଉପଭୋକ୍ତା ନାମ / ଇମେଲ' },
    'auth-pass-lbl':      { en: 'PASSWORD',           hi: 'पासवर्ड',              od: 'ପାସୱାର୍ଡ' },
    'auth-remember':      { en: 'REMEMBER ME',        hi: 'मुझे याद रखें',        od: 'ମୋତେ ମନେ ରଖନ୍ତୁ' },
    'auth-forgot':        { en: 'FORGOT PASSWORD?',   hi: 'पासवर्ड भूल गए?',      od: 'ପାସୱାର୍ଡ ଭୁଲି ଗଲେ?' },
    'auth-login-btn':     { en: 'INITIALIZE SESSION', hi: 'सत्र प्रारंभ करें',    od: 'ସେଶନ ଆରମ୍ଭ କରନ୍ତୁ' },
    'auth-no-account':    { en: 'NO ACCOUNT?',        hi: 'खाता नहीं है?',         od: 'ଖାତା ନାହିଁ?' },
    'auth-register-here': { en: 'REGISTER HERE',      hi: 'यहाँ पंजीकरण करें',    od: 'ଏଠାରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ' },
    'auth-stats-lines':   { en: 'LINES',              hi: 'लाइनें',               od: 'ରେଖା' },
    'auth-stats-stations':{ en: 'STATIONS',           hi: 'स्टेशन',               od: 'ଷ୍ଟେସନ' },
    'auth-stats-support': { en: 'SUPPORT',            hi: 'सहायता',               od: 'ସହାୟତା' },
    'auth-tagline-1':     { en: "ODISHA'S FIRST",     hi: 'ओडिशा का पहला',        od: 'ଓଡ଼ିଶାର ପ୍ରଥମ' },
    'auth-tagline-2':     { en: 'METRO SYSTEM',       hi: 'मेट्रो सिस्टम',        od: 'ମେଟ୍ରୋ ସିଷ୍ଟମ' },
    'auth-footer':        { en: '© 2025 BHUBANESWAR METRO. ALL RIGHTS RESERVED.', hi: '© 2025 भुवनेश्वर मेट्रो। सर्वाधिकार सुरक्षित।', od: '© 2025 ଭୁବନେଶ୍ୱର ମେଟ୍ରୋ। ସର୍ବସ୍ୱ ସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ।' },
    'auth-helpline':      { en: 'HELP LINE:',         hi: 'हेल्प लाइन:',          od: 'ସହାୟ ଲାଇନ:' },

    /* ── FORGOT PASSWORD MODAL ───────────────────────────────── */
    'forgot-title':       { en: 'RESET PASSWORD',     hi: 'पासवर्ड रीसेट करें',   od: 'ପାସୱାର୍ଡ ରିସେଟ' },
    'forgot-desc':        { en: 'ENTER YOUR REGISTERED EMAIL TO RECEIVE A RESET LINK.', hi: 'रीसेट लिंक पाने के लिए अपना पंजीकृत ईमेल दर्ज करें।', od: 'ରିସେଟ ଲିଙ୍କ ପାଇ ନିଜ ପଞ୍ଜୀକୃତ ଇମେଲ ଦିଅନ୍ତୁ।' },
    'forgot-email-lbl':   { en: 'EMAIL ADDRESS',      hi: 'ईमेल पता',              od: 'ଇମେଲ ଠିକଣା' },
    'forgot-send-btn':    { en: 'SEND RESET LINK',    hi: 'रीसेट लिंक भेजें',     od: 'ରିସେଟ ଲିଙ୍କ ପଠାନ୍ତୁ' },
  };

  /* ─────────────────────────────────────────────────────────────
     CURRENT LANGUAGE STATE
  ───────────────────────────────────────────────────────────── */
  let currentLang = localStorage.getItem('odx-lang') || 'en';

  /* ─────────────────────────────────────────────────────────────
     HELPER: get translation safely
  ───────────────────────────────────────────────────────────── */
  function t(key) {
    const entry = T[key];
    if (!entry) return null;
    return entry[currentLang] || entry['en'] || '';
  }

  /* ─────────────────────────────────────────────────────────────
     APPLY ALL TRANSLATIONS
     Uses data-i18n attribute (existing) AND direct DOM targeting
     for elements that don't have data-i18n yet.
  ───────────────────────────────────────────────────────────── */
  function applyTranslations() {
    const L = currentLang;

    /* 1. data-i18n attributes (existing + new) */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val !== null) {
        /* For titles with newlines, use innerHTML with <br> */
        if (val.includes('\n')) {
          el.innerHTML = val.replace(/\n/g, '<br />');
        } else {
          el.textContent = val;
        }
      }
    });

    /* ── 2. NAV ITEMS ──────────────────────────────────────── */
    const navMap = {
      'home': 'nav-home', 'timetable': 'nav-timetable',
      'routes': 'nav-routes', 'fare': 'nav-fare'
    };
    document.querySelectorAll('.nav-item[data-page], .mobile-nav-link[data-page]').forEach(function (el) {
      const page = el.getAttribute('data-page');
      if (navMap[page]) {
        const svg = el.querySelector('svg');
        el.textContent = t(navMap[page]) || el.textContent;
        if (svg) el.prepend(svg); // restore icon
      }
    });
    // Metro Card nav (no data-page, match by content or id)
    document.querySelectorAll('#navMetroCard, #mobileMetroCard').forEach(function (el) {
      const svg = el.querySelector('svg');
      el.textContent = t('nav-metrocard');
      if (svg) el.prepend(svg);
    });

    /* ── 3. HERO SECTIONS ──────────────────────────────────── */

    // Hero 1
    _setHeroDesc('#hero1 .hero-desc', t('hero1-desc'));
    _setStatus('#hero1 .hero-status', t('hero1-status'));
    _setTag('#hero1 .hero-tag', t('network-status'));

    // Hero 2
    _setHeroDesc('#hero2 .hero-desc', t('hero2-desc'));
    _setStatus('#hero2 .hero-status', t('hero2-status'));
    _setTag('#hero2 .hero-tag', t('network-status'));

    // Hero 3
    _setHeroDesc('#hero3 .hero-desc', t('hero3-desc'));
    _setStatus('#hero3 .hero-status', t('hero3-status'));
    _setTag('#hero3 .hero-tag', t('network-status'));

    // Hero 4 — route list items
    const routeItems = document.querySelectorAll('#hero4 .routes-list li');
    const routeKeys = ['route-list-1','route-list-2','route-list-3','route-list-4','route-list-5','route-list-6'];
    routeItems.forEach(function (li, i) {
      if (routeKeys[i]) {
        const dot = li.querySelector('.route-dot');
        li.textContent = t(routeKeys[i]);
        if (dot) li.prepend(dot);
      }
    });
    _setStatus('#hero4 .hero-status', t('hero4-status'));
    _setTag('#hero4 .hero-tag', t('network-status'));

    // Hero 5 — fare table
    _setHeroDesc('#hero5 .hero-desc', t('hero5-desc'));
    _setStatus('#hero5 .hero-status', t('hero5-status'));
    _setTag('#hero5 .hero-tag', t('network-status'));
    _setTh('#hero5 th:nth-child(1)', t('fare-table-dist'));
    _setTh('#hero5 th:nth-child(2)', t('fare-table-std'));
    const fareTds = document.querySelectorAll('#hero5 tbody td:first-child');
    const fareTdKeys = ['fare-table-r1','fare-table-r2','fare-table-r3','fare-table-r4','fare-table-r5'];
    fareTds.forEach(function (td, i) {
      if (fareTdKeys[i]) td.textContent = t(fareTdKeys[i]);
    });
    const fareLastTd = document.querySelector('#hero5 tbody tr:last-child td:last-child');
    if (fareLastTd) fareLastTd.textContent = t('fare-table-extra');

    // Hero 6 — regulations
    _setHeroDesc('#hero6 .hero-desc', t('hero6-desc'));
    const regItems = document.querySelectorAll('#hero6 .reg-list li');
    const regKeys = ['reg-item-1','reg-item-2','reg-item-3','reg-item-4','reg-item-5','reg-item-6'];
    regItems.forEach(function (li, i) {
      if (regKeys[i]) {
        const x = li.querySelector('.reg-x');
        li.textContent = t(regKeys[i]);
        if (x) li.prepend(x);
      }
    });
    _setStatus('#hero6 .hero-status', t('hero6-status'));
    _setTag('#hero6 .hero-tag', t('network-status'));

    /* ── 4. HOME FOOTER ────────────────────────────────────── */
    const footerCopy = document.querySelector('#page-home .footer-copy');
    if (footerCopy) {
      // Preserve telephone links
      const links = footerCopy.querySelectorAll('a');
      const linkHtml = links.length >= 2
        ? ` <a href="tel:1073">${links[0].textContent}</a> / <a href="tel:1074">${links[1].textContent}</a>`
        : '';
      footerCopy.innerHTML = t('footer-copy') + linkHtml;
    }

    /* ── 5. TIMETABLE PAGE ─────────────────────────────────── */
    _setText('#page-timetable .page-title', t('page-title-tt'));
    _setText('#page-timetable .sb-label:nth-of-type(1)', t('tt-sync-status'));
    _setText('#page-timetable .sb-value.online', t('tt-sync-live'));

    // Filter options
    _setOption('#ttDay option[value="weekday"]', t('tt-day-weekday'));
    _setOption('#ttDay option[value="saturday"]', t('tt-day-saturday'));
    _setOption('#ttDay option[value="sunday"]',   t('tt-day-sunday'));

    // Section headings (dynamic part preserved)
    const liveHeading = document.querySelector('#page-timetable .tt-live-section .tt-section-title');
    if (liveHeading) {
      const span = liveHeading.querySelector('span');
      const stName = span ? span.textContent : '';
      liveHeading.textContent = t('tt-live-heading') + ' — ';
      if (span) { span.textContent = stName; liveHeading.appendChild(span); }
    }
    _setText('#page-timetable .tt-live-section .tt-display-count', t('tt-display-next'));

    const completeHeading = document.querySelector('#page-timetable .tt-complete-section .tt-section-title');
    if (completeHeading) {
      const span = completeHeading.querySelector('span');
      const stName = span ? span.textContent : '';
      completeHeading.textContent = t('tt-complete-heading') + ' — ';
      if (span) { span.textContent = stName; completeHeading.appendChild(span); }
    }
    _setText('#page-timetable .tt-complete-section .tt-display-count', t('tt-all-services'));

    // Timetable column headers
    document.querySelectorAll('#page-timetable .tt-table thead th').forEach(function (th, i) {
      const keys = ['tt-col-trainno', 'tt-col-depart', 'tt-col-dest'];
      if (keys[i]) th.textContent = t(keys[i]);
    });

    /* ── 6. ROUTES PAGE ────────────────────────────────────── */
    _setText('#page-routes .page-title', t('page-title-routes'));
    _setText('#page-routes .route-count-label', t('routes-active-total'));
    document.querySelectorAll('#page-routes .route-count-label').forEach(function (el) {
      el.textContent = t('routes-active-total');
    });
    // Line names
    const lineRouteNames = {
      blue: 'route-blue-name', green: 'route-green-name', orange: 'route-orange-name',
      purple: 'route-purple-name', yellow: 'route-yellow-name', pink: 'route-pink-name'
    };
    Object.keys(lineRouteNames).forEach(function (line) {
      const card = document.querySelector('.route-card[data-line="' + line + '"] .route-line-name');
      if (card) card.textContent = t(lineRouteNames[line]);
    });

    /* ── 7. FARE PAGE ──────────────────────────────────────── */
    _setText('#page-fare .page-title', t('page-title-fare'));

    // Fare line names + uplink labels
    const lineFareNames = {
      blue: 'fare-blue-matrix', green: 'fare-green-matrix', orange: 'fare-orange-matrix',
      purple: 'fare-purple-matrix', yellow: 'fare-yellow-matrix', pink: 'fare-pink-matrix'
    };
    Object.keys(lineFareNames).forEach(function (line) {
      const nameEl = document.querySelector('.fare-card[data-line="' + line + '"] .fare-line-name');
      if (nameEl) nameEl.textContent = t(lineFareNames[line]);
    });

    // ROUTE UPLINK labels, COMPUTED FARE labels, AWAITING INPUT, SELECT ORIGIN/TARGET
    document.querySelectorAll('.fare-uplink-label').forEach(function (el) { el.textContent = t('fare-uplink-label'); });
    document.querySelectorAll('.fare-computed-label').forEach(function (el) { el.textContent = t('fare-computed-label'); });
    document.querySelectorAll('.fare-sel-title').forEach(function (el) {
      if (el.textContent.trim().indexOf('ORIGIN') !== -1 || el.textContent.trim().indexOf('उद्गम') !== -1 || el.textContent.trim().indexOf('ଉତ୍ପ') !== -1) {
        el.textContent = t('fare-sel-origin');
      } else {
        el.textContent = t('fare-sel-target');
      }
    });

    // Dynamically set sel-title based on [01]/[02] num
    document.querySelectorAll('.fare-selector-header').forEach(function (header) {
      const num = header.querySelector('.fare-sel-num');
      const title = header.querySelector('.fare-sel-title');
      if (num && title) {
        title.textContent = num.textContent.trim() === '[01]' ? t('fare-sel-origin') : t('fare-sel-target');
      }
    });

    // Awaiting input placeholders
    document.querySelectorAll('.fare-origin-display, .fare-dest-display').forEach(function (el) {
      if (el.textContent.trim() === 'AWAITING INPUT' || el.textContent.trim() === 'इनपुट की प्रतीक्षा' || el.textContent.trim() === 'ଇନପୁଟ ଅପେକ୍ଷା') {
        el.textContent = t('fare-awaiting');
      }
    });

    // Collect ticket buttons
    document.querySelectorAll('.fare-collect-btn').forEach(function (btn) { btn.textContent = t('fare-collect-btn'); });

    /* ── 8. PROFILE PAGE ───────────────────────────────────── */
    _setText('#page-profile .pic-label:nth-of-type(1)', t('profile-gender-lbl'));
    document.querySelectorAll('#page-profile .pic-label').forEach(function (el) {
      const txt = el.textContent.trim().toUpperCase();
      if (txt === 'GENDER' || txt === 'लिंग' || txt === 'ଲିଙ୍ଗ') el.textContent = t('profile-gender-lbl');
      else if (txt === 'DATE OF BIRTH' || txt === 'जन्म तिथि' || txt === 'ଜନ୍ମ ତାରିଖ') el.textContent = t('profile-dob-lbl');
      else if (txt === 'PHONE' || txt === 'फोन' || txt === 'ଫୋନ') el.textContent = t('profile-phone-lbl');
    });
    // Edit button
    const editBtn = document.querySelector('.profile-edit-btn');
    if (editBtn) {
      const svg = editBtn.querySelector('svg');
      editBtn.textContent = t('profile-edit-btn');
      if (svg) editBtn.prepend(svg);
    }
    // Current language display
    const curLangEl = document.getElementById('currentLang');
    if (curLangEl) {
      const map = { en: 'lang-current-en', hi: 'lang-current-hi', od: 'lang-current-od' };
      curLangEl.textContent = t(map[currentLang]);
    }

    /* ── 9. LANGUAGE MODAL ─────────────────────────────────── */
    const langModalTitle = document.querySelector('#languageModal .modal-title');
    if (langModalTitle) langModalTitle.textContent = t('lang-modal-title');

    /* ── 10. SOS MODAL ─────────────────────────────────────── */
    const sosTitle = document.querySelector('#sosModal .modal-title');
    if (sosTitle) sosTitle.textContent = t('sos-title');
    const sosDesc = document.querySelector('#sosModal .modal-desc');
    if (sosDesc) sosDesc.textContent = t('sos-desc');
    const sosNums = document.querySelectorAll('#sosModal .sos-number-btn');
    if (sosNums[0]) {
      const svg0 = sosNums[0].querySelector('svg');
      sosNums[0].textContent = t('sos-helpline1');
      if (svg0) sosNums[0].prepend(svg0);
    }
    if (sosNums[1]) {
      const svg1 = sosNums[1].querySelector('svg');
      sosNums[1].textContent = t('sos-helpline2');
      if (svg1) sosNums[1].prepend(svg1);
    }

    /* ── 11. METRO CARD MODAL ──────────────────────────────── */
    _setText('.mcm-title', t('mcm-title'));
    _setText('.mcm-subtitle', t('mcm-subtitle'));
    const cancelBtn = document.getElementById('cancelRegistration');
    if (cancelBtn) cancelBtn.textContent = t('mcm-cancel');
    const submitSpan = document.querySelector('.btn-submit .btn-text');
    if (submitSpan) submitSpan.textContent = t('mcm-submit');
    const consentTexts = document.querySelectorAll('.consent-text');
    const consentKeys = ['mcm-consent-1', 'mcm-consent-2', 'mcm-consent-3'];
    consentTexts.forEach(function (el, i) { if (consentKeys[i]) el.textContent = t(consentKeys[i]); });

    /* ── 12. HTML lang attribute ────────────────────────────── */
    const htmlEl = document.documentElement;
    if (L === 'hi') htmlEl.setAttribute('lang', 'hi');
    else if (L === 'od') htmlEl.setAttribute('lang', 'or');
    else htmlEl.setAttribute('lang', 'en');
  }

  /* ─────────────────────────────────────────────────────────────
     DOM HELPER FUNCTIONS
  ───────────────────────────────────────────────────────────── */
  function _setText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  }
  function _setHeroDesc(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  }
  function _setStatus(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  }
  function _setTag(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  }
  function _setTh(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  }
  function _setOption(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  }

  /* ─────────────────────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────────────────────── */
  window.ODX_i18n = {
    /**
     * Change language: 'en' | 'hi' | 'od'
     * Saves to localStorage and re-renders all text.
     */
    setLang: function (lang) {
      if (!['en', 'hi', 'od'].includes(lang)) return;
      currentLang = lang;
      localStorage.setItem('odx-lang', lang);
      applyTranslations();
      // Update language button active states
      document.querySelectorAll('.lang-option').forEach(function (btn) {
        const map = { english: 'en', hindi: 'hi', odia: 'od' };
        btn.classList.toggle('active', map[btn.dataset.lang] === lang);
      });
    },
    /** Get the current language code */
    getLang: function () { return currentLang; },
    /** Translate a key directly */
    t: t,
    /** Re-apply translations (call after dynamic DOM changes) */
    refresh: applyTranslations,
  };

  /* ─────────────────────────────────────────────────────────────
     WIRE LANGUAGE MODAL BUTTONS
  ───────────────────────────────────────────────────────────── */
  function wireLanguageButtons() {
    // Replace existing language button click handlers
    const langEn = document.getElementById('langEn');
    const langHi = document.getElementById('langHi');
    const langOd = document.getElementById('langOd');

    if (langEn) langEn.addEventListener('click', function () {
      window.ODX_i18n.setLang('en');
      closeLanguageModal();
    });
    if (langHi) langHi.addEventListener('click', function () {
      window.ODX_i18n.setLang('hi');
      closeLanguageModal();
    });
    if (langOd) langOd.addEventListener('click', function () {
      window.ODX_i18n.setLang('od');
      closeLanguageModal();
    });

    function closeLanguageModal() {
      const modal = document.getElementById('languageModal');
      if (modal) modal.style.display = 'none';
    }

    // Set initial active state
    document.querySelectorAll('.lang-option').forEach(function (btn) {
      const map = { english: 'en', hindi: 'hi', odia: 'od' };
      btn.classList.toggle('active', map[btn.dataset.lang] === currentLang);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     INIT — run when DOM is ready
  ───────────────────────────────────────────────────────────── */
  function init() {
    wireLanguageButtons();
    applyTranslations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();