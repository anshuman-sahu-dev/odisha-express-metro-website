/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — auth.js
   Login · Registration · OTP · Password strength
═══════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);

function showError(fieldId, msg) {
  const grp = document.getElementById(fieldId + 'Group') || document.getElementById(fieldId)?.closest('.field-group');
  if (grp) grp.classList.add('error');
  const err = document.getElementById(fieldId + 'Error');
  if (err) err.textContent = msg;
}
function clearError(fieldId) {
  const grp = document.getElementById(fieldId + 'Group') || document.getElementById(fieldId)?.closest('.field-group');
  if (grp) { grp.classList.remove('error'); grp.classList.remove('success'); }
  const err = document.getElementById(fieldId + 'Error');
  if (err) err.textContent = '';
}
function showSuccess(fieldId) {
  const grp = document.getElementById(fieldId + 'Group') || document.getElementById(fieldId)?.closest('.field-group');
  if (grp) { grp.classList.remove('error'); grp.classList.add('success'); }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

/* Simulated OTP store (in real app this is server-side) */
const otpStore = {};
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/* ══════════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════════ */
function initLogin() {
  const form = $('loginForm');
  if (!form) return;

  const usernameInput = $('username');
  const passwordInput = $('password');
  const rememberMe = $('rememberMe');
  const togglePwd = $('togglePassword');
  const forgotLink = $('forgotPassword');
  const forgotModal = $('forgotModal');
  const closeForgot = $('closeForgotModal');
  const sendResetBtn = $('sendResetBtn');
  const loginBtn = $('loginBtn');
  const rememberWarn = $('rememberWarning');

  /* Pre-fill if remembered */
  const saved = localStorage.getItem('oe_remember');
  if (saved) {
    try {
      const { username } = JSON.parse(saved);
      if (usernameInput) usernameInput.value = username;
      if (rememberMe) rememberMe.checked = true;
    } catch (_) { }
  }

  /* Toggle password visibility */
  if (togglePwd && passwordInput) {
    togglePwd.addEventListener('click', () => {
      const isText = passwordInput.type === 'text';
      passwordInput.type = isText ? 'password' : 'text';
      const icon = $('eyeIcon');
      if (icon) {
        icon.innerHTML = isText
          ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
          : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
      }
    });
  }

  /* Forgot password modal */
  if (forgotLink && forgotModal) {
    forgotLink.addEventListener('click', e => {
      e.preventDefault();
      forgotModal.style.display = 'flex';
    });
  }
  if (closeForgot && forgotModal) {
    closeForgot.addEventListener('click', () => { forgotModal.style.display = 'none'; });
  }
  if (forgotModal) {
    forgotModal.addEventListener('click', e => {
      if (e.target === forgotModal) forgotModal.style.display = 'none';
    });
  }
  if (sendResetBtn) {
    sendResetBtn.addEventListener('click', () => {
      const email = $('resetEmail')?.value?.trim();
      const fb = $('resetFeedback');
      if (!email || !isValidEmail(email)) {
        if (fb) { fb.style.color = 'var(--danger)'; fb.textContent = 'ENTER A VALID EMAIL ADDRESS.'; }
        return;
      }
      if (fb) { fb.style.color = 'var(--success)'; fb.textContent = 'RESET LINK SENT! CHECK YOUR INBOX.'; }
      sendResetBtn.disabled = true;
      sendResetBtn.textContent = 'LINK SENT';
    });
  }

  /* Form submit */
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      /* Validate remember-me checkbox is checked (mandatory per spec) */
      if (!rememberMe?.checked) {
        if (rememberWarn) rememberWarn.style.display = 'flex';
        valid = false;
      } else {
        if (rememberWarn) rememberWarn.style.display = 'none';
      }

      const username = usernameInput?.value?.trim();
      const password = passwordInput?.value;

      clearError('username');
      clearError('password');

      if (!username) { showError('username', 'USERNAME OR EMAIL IS REQUIRED.'); valid = false; }
      if (!password) { showError('password', 'PASSWORD IS REQUIRED.'); valid = false; }

      if (!valid) return;

      /* Check stored user */
      const users = JSON.parse(localStorage.getItem('oe_users') || '[]');
      const user = users.find(u =>
        (u.email === username || u.phone === username || u.username === username) &&
        u.password === btoa(password)
      );

      if (!user) {
        showError('username', 'INVALID CREDENTIALS. CHECK AND TRY AGAIN.');
        loginBtn.textContent = 'INVALID CREDENTIALS';
        setTimeout(() => {
          const span = loginBtn.querySelector('.btn-text');
          if (span) span.textContent = 'INITIALIZE SESSION';
        }, 2000);
        return;
      }

      /* Remember me */
      if (rememberMe.checked) {
        localStorage.setItem('oe_remember', JSON.stringify({ username }));
      } else {
        localStorage.removeItem('oe_remember');
      }

      /* Store session */
      sessionStorage.setItem('oe_user', JSON.stringify(user));

      /* Redirect */
      const btnText = loginBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'ACCESS GRANTED...';
      loginBtn.style.borderColor = 'var(--success)';
      loginBtn.style.color = 'var(--success)';

      setTimeout(() => { window.location.href = 'main.html'; }, 800);
    });
  }

  /* Real-time field clearing */
  usernameInput?.addEventListener('input', () => clearError('username'));
  passwordInput?.addEventListener('input', () => clearError('password'));
  rememberMe?.addEventListener('change', () => {
    if (rememberMe.checked && rememberWarn) rememberWarn.style.display = 'none';
  });
}


/* ══════════════════════════════════════════════════
   REGISTRATION PAGE
══════════════════════════════════════════════════ */
function initRegister() {
  const form = $('registerForm');
  if (!form) return;

  /* ── OTP helpers ────────────────────────────── */
  function startOTPTimer(timerEl, resendBtn, duration = 60) {
    let remaining = duration;
    resendBtn.disabled = true;
    const iv = setInterval(() => {
      timerEl.textContent = `${remaining}s`;
      remaining--;
      if (remaining < 0) {
        clearInterval(iv);
        timerEl.textContent = '';
        resendBtn.disabled = false;
      }
    }, 1000);
    return iv;
  }

  /* Phone OTP */
  const sendPhoneBtn = $('sendPhoneOtp');
  const phoneOtpRow = $('phoneOtpRow');
  const verifyPhoneBtn = $('verifyPhoneOtp');
  const resendPhoneBtn = $('resendPhoneOtp');
  const phoneTimer = $('phoneTimer');
  const phoneVerified = $('phoneVerified');
  let phoneTimerIv = null;
  let phoneVerifiedOk = false;

  sendPhoneBtn?.addEventListener('click', () => {
    const phone = $('phone')?.value?.trim();
    clearError('phone');
    if (!phone || !isValidPhone(phone)) {
      showError('phone', 'ENTER A VALID 10-DIGIT PHONE NUMBER.'); return;
    }
    const otp = generateOTP();
    otpStore.phone = otp;
    console.info('[OTP-PHONE]', otp); /* Dev only — remove in production */
    phoneOtpRow.style.display = 'flex';
    sendPhoneBtn.textContent = 'RESEND OTP';
    sendPhoneBtn.disabled = true;
    if (phoneTimerIv) clearInterval(phoneTimerIv);
    phoneTimerIv = startOTPTimer(phoneTimer, sendPhoneBtn);
    alert(`[DEV MODE] Your Phone OTP: ${otp}`); /* Remove in production */
  });

  verifyPhoneBtn?.addEventListener('click', () => {
    const entered = $('phoneOtp')?.value?.trim();
    if (entered === otpStore.phone) {
      phoneVerified.style.display = 'flex';
      $('phoneOtp').disabled = true;
      verifyPhoneBtn.disabled = true;
      phoneVerifiedOk = true;
      showSuccess('phone');
      document.getElementById('phoneOtpError').textContent = '';
    } else {
      document.getElementById('phoneOtpError').textContent = 'INCORRECT OTP. TRY AGAIN.';
    }
  });

  resendPhoneBtn?.addEventListener('click', () => {
    const otp = generateOTP();
    otpStore.phone = otp;
    if (phoneTimerIv) clearInterval(phoneTimerIv);
    phoneTimerIv = startOTPTimer(phoneTimer, resendPhoneBtn);
    alert(`[DEV MODE] New Phone OTP: ${otp}`);
  });

  /* Email OTP */
  const sendEmailBtn = $('sendEmailOtp');
  const emailOtpRow = $('emailOtpRow');
  const verifyEmailBtn = $('verifyEmailOtp');
  const resendEmailBtn = $('resendEmailOtp');
  const emailTimer = $('emailTimer');
  const emailVerified = $('emailVerified');
  let emailTimerIv = null;
  let emailVerifiedOk = false;

  sendEmailBtn?.addEventListener('click', () => {
    const email = $('email')?.value?.trim();
    clearError('email');
    if (!email || !isValidEmail(email)) {
      showError('email', 'ENTER A VALID EMAIL ADDRESS.'); return;
    }
    const otp = generateOTP();
    otpStore.email = otp;
    console.info('[OTP-EMAIL]', otp);
    emailOtpRow.style.display = 'flex';
    sendEmailBtn.textContent = 'RESEND OTP';
    sendEmailBtn.disabled = true;
    if (emailTimerIv) clearInterval(emailTimerIv);
    emailTimerIv = startOTPTimer(emailTimer, sendEmailBtn);
    alert(`[DEV MODE] Your Email OTP: ${otp}`);
  });

  verifyEmailBtn?.addEventListener('click', () => {
    const entered = $('emailOtp')?.value?.trim();
    if (entered === otpStore.email) {
      emailVerified.style.display = 'flex';
      $('emailOtp').disabled = true;
      verifyEmailBtn.disabled = true;
      emailVerifiedOk = true;
      showSuccess('email');
      document.getElementById('emailOtpError').textContent = '';
    } else {
      document.getElementById('emailOtpError').textContent = 'INCORRECT OTP. TRY AGAIN.';
    }
  });

  resendEmailBtn?.addEventListener('click', () => {
    const otp = generateOTP();
    otpStore.email = otp;
    if (emailTimerIv) clearInterval(emailTimerIv);
    emailTimerIv = startOTPTimer(emailTimer, resendEmailBtn);
    alert(`[DEV MODE] New Email OTP: ${otp}`);
  });

  /* ── Password strength ──────────────────────── */
  const regPassword = $('regPassword');
  const strengthFill = $('strengthFill');
  const strengthLabel = $('strengthLabel');
  const criteria = {
    length: $('crit-length'),
    upper: $('crit-upper'),
    lower: $('crit-lower'),
    number: $('crit-number'),
    special: $('crit-special'),
  };

  function checkPasswordStrength(pwd) {
    const rules = {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
    };
    let score = Object.values(rules).filter(Boolean).length;

    Object.keys(rules).forEach(key => {
      const el = criteria[key];
      if (!el) return;
      const icon = el.querySelector('.crit-icon');
      if (rules[key]) {
        el.classList.add('met');
        if (icon) { icon.className = 'crit-icon crit-pass'; icon.textContent = '✓'; }
      } else {
        el.classList.remove('met');
        if (icon) { icon.className = 'crit-icon crit-fail'; icon.textContent = '✕'; }
      }
    });

    if (!strengthFill || !strengthLabel) return;
    strengthFill.className = 'strength-fill';
    if (score === 0) { strengthFill.classList.add(''); strengthLabel.textContent = 'ENTER PASSWORD'; }
    else if (score <= 2) { strengthFill.classList.add('weak'); strengthLabel.textContent = 'WEAK'; }
    else if (score === 3) { strengthFill.classList.add('fair'); strengthLabel.textContent = 'FAIR'; }
    else if (score === 4) { strengthFill.classList.add('good'); strengthLabel.textContent = 'GOOD'; }
    else { strengthFill.classList.add('strong'); strengthLabel.textContent = 'STRONG'; }

    return rules;
  }

  regPassword?.addEventListener('input', () => {
    checkPasswordStrength(regPassword.value);
    clearError('regPassword');
  });

  /* Toggle password visibility */
  $('toggleRegPassword')?.addEventListener('click', () => {
    if (!regPassword) return;
    regPassword.type = regPassword.type === 'password' ? 'text' : 'password';
  });
  $('toggleConfirmPassword')?.addEventListener('click', () => {
    const el = $('confirmPassword');
    if (!el) return;
    el.type = el.type === 'password' ? 'text' : 'password';
  });

  /* Real-time confirm match */
  $('confirmPassword')?.addEventListener('input', () => {
    clearError('confirmPassword');
    const pwd = regPassword?.value;
    const conf = $('confirmPassword')?.value;
    if (conf && pwd !== conf) showError('confirmPassword', 'PASSWORDS DO NOT MATCH.');
    else if (conf) showSuccess('confirmPassword');
  });

  /* ── Form submit ─────────────────────────────── */
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name = $('fullName')?.value?.trim();
    const dob = $('dob')?.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const phone = $('phone')?.value?.trim();
    const email = $('email')?.value?.trim();
    const pwd = $('regPassword')?.value;
    const conf = $('confirmPassword')?.value;

    /* Validations */
    clearError('fullName'); clearError('dob'); clearError('gender');
    clearError('phone'); clearError('email');
    clearError('regPassword'); clearError('confirmPassword');

    if (!name || name.length < 2) { showError('fullName', 'NAME MUST BE AT LEAST 2 CHARACTERS.'); valid = false; }
    if (!dob) { showError('dob', 'DATE OF BIRTH IS REQUIRED.'); valid = false; }
    if (!gender) { showError('gender', 'PLEASE SELECT YOUR GENDER.'); valid = false; }
    if (!phone || !isValidPhone(phone)) { showError('phone', 'ENTER A VALID 10-DIGIT PHONE NUMBER.'); valid = false; }
    else if (!phoneVerifiedOk) { showError('phone', 'PHONE NUMBER NOT VERIFIED. GET OTP FIRST.'); valid = false; }
    if (!email || !isValidEmail(email)) { showError('email', 'ENTER A VALID EMAIL ADDRESS.'); valid = false; }
    else if (!emailVerifiedOk) { showError('email', 'EMAIL NOT VERIFIED. GET OTP FIRST.'); valid = false; }

    if (!pwd) { showError('regPassword', 'PASSWORD IS REQUIRED.'); valid = false; }
    else {
      const rules = checkPasswordStrength(pwd);
      if (!Object.values(rules).every(Boolean)) {
        showError('regPassword', 'PASSWORD DOES NOT MEET ALL REQUIREMENTS.'); valid = false;
      }
    }
    if (pwd !== conf) { showError('confirmPassword', 'PASSWORDS DO NOT MATCH.'); valid = false; }

    if (!valid) return;

    /* Save user */
    const users = JSON.parse(localStorage.getItem('oe_users') || '[]');
    if (users.find(u => u.email === email)) {
      showError('email', 'THIS EMAIL IS ALREADY REGISTERED.'); return;
    }

    const newUser = {
      id: Date.now(),
      name, dob, gender, phone, email,
      password: btoa(pwd),
      balance: 0,
      lang: 'english',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('oe_users', JSON.stringify(users));

    /* Auto-login */
    sessionStorage.setItem('oe_user', JSON.stringify(newUser));

    const btn = $('registerBtn');
    const span = btn?.querySelector('.btn-text');
    if (span) span.textContent = 'ACCOUNT CREATED!';
    if (btn) { btn.style.borderColor = 'var(--success)'; btn.style.color = 'var(--success)'; }

    setTimeout(() => { window.location.href = 'main.html'; }, 900);
  });
}


/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initRegister();
});
