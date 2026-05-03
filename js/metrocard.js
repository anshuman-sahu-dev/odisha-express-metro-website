/* ═══════════════════════════════════════════════════
   ODISHA EXPRESS — metrocard.js
   Logic for Metro Card Registration Modal
═══════════════════════════════════════════════════ */

(function () {
    const navMetroCard = document.getElementById('navMetroCard');
    const mobileMetroCard = document.getElementById('mobileMetroCard');
    const modal = document.getElementById('metroCardModal');
    const closeBtn = document.getElementById('closeMetroCardModal');
    const cancelBtn = document.getElementById('cancelRegistration');
    const registrationForm = document.getElementById('metroCardForm');

    // Open modal
    const openModal = (e) => {
        if (e) e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    if (navMetroCard) navMetroCard.addEventListener('click', openModal);
    if (mobileMetroCard) mobileMetroCard.addEventListener('click', (e) => {
        openModal(e);
        if (window.closeMobileNav) window.closeMobileNav();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Card Selection Logic
    const cardOptions = document.querySelectorAll('input[name="cardType"]');
    cardOptions.forEach(opt => {
        opt.addEventListener('change', () => {
            console.log('Selected card type:', opt.value);
            // You could add more visual feedback here if needed
        });
    });

    // Form Submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation check for required fields
            const requiredFields = registrationForm.querySelectorAll('[required]');
            let isValid = true;
            requiredFields.forEach(field => {
                if (!field.value) isValid = false;
            });

            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate success
            const submitBtn = registrationForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">PROCESSING...</span>';

            setTimeout(() => {
                alert('Registration Successful! Your Metro Card application has been submitted. You will receive an update on your mobile number.');
                registrationForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                closeModal();
            }, 2000);
        });
    }

    // File input preview helpers
    const setupFilePreview = (inputId, labelId) => {
        const input = document.getElementById(inputId);
        const label = document.getElementById(labelId);
        if (input && label) {
            input.addEventListener('change', () => {
                if (input.files && input.files[0]) {
                    label.textContent = input.files[0].name;
                }
            });
        }
    };

    setupFilePreview('idProofFile', 'idProofLabel');
    setupFilePreview('photoFile', 'photoLabel');
    setupFilePreview('signatureFile', 'signatureLabel');

})();
