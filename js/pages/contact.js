// js/pages/contact.js

// 1. Initialize EmailJS
(function() {
    // PUBLIC KEY goes here. It is visible, but we lock it in Step 3.
    emailjs.init("nk7tZmcNoedsKPwFA"); 
})();

// 2. Handle Form Submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('.submit-btn');
    const originalText = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    
    // Loading State
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.style.opacity = '0.8';
    btn.style.pointerEvents = 'none';

    // Send Email
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID'
    emailjs.sendForm('service_mkx6zra', 'template_piactal', this)
        .then(() => {
            // SUCCESS
            btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
            btn.style.background = '#4caf50';
            btn.style.borderColor = '#4caf50';
            this.reset(); // Clear form

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
            }, 3000);
        }, (error) => {
            // ERROR
            console.error('FAILED...', error);
            btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try again.';
            btn.style.background = '#f44336';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
            }, 3000);
        });
});

// 3. Animation Observer
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});