const FooterComponent = {
    render: () => {
        const currentYear = new Date().getFullYear(); 

        const linksHtml = NAVIGATION_DATA.map(link => 
            `<li><a href="${link.url}">${link.label}</a></li>`
        ).join('');

        return `
            <div class="footer-container">
                <div class="footer-brand">
                    <a href="index.html" class="footer-logo-link">
                        <div class="footer-logo">SpeakUP <i class="fas fa-arrow-up footer-arrow"></i> <br> AUEB</div>
                    </a>
                </div>
                
                <div class="footer-nav">
                    <ul>${linksHtml}</ul>
                </div>

                <div class="footer-newsletter">
                    <p>Sign up for our newsletter</p>
                    <form id="newsletter-form" class="input-group2">
                        <input type="email" id="newsletter-email" name="Email" placeholder="john.doe@gmail.com" required>
                        <input type="hidden" name="Created" value="x-sheetmonkey-current-date-time" />
                        <button type="submit" id="newsletter-submit">Subscribe</button>
                    </form>
                    <div id="newsletter-message"></div>
                    <div class="footer-socials">
                        <a href="https://www.linkedin.com/company/speakup-aueb-genz/" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/speakup_auebgenz/" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.tiktok.com/@speakupaueb_genz" target="_blank"><i class="fab fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
            
            <div class="copyright">Copyright © ${currentYear} SpeakUp - All rights reserved | Terms & Conditions</div>
        `;
    },

    bindEvents: () => {
        const form = document.getElementById('newsletter-form');
        const messageDiv = document.getElementById('newsletter-message');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitButton = document.getElementById('newsletter-submit');
                const emailInput = document.getElementById('newsletter-email');

                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';

                try {
                    const endpointUrl = 'https://api.sheetmonkey.io/form/kwUZW3DusteuxBumrvktSk'; 
                    
                    // Create the base payload from the form (captures Email and Created)
                    const formData = new FormData(form);
                    
                    // Extract the string before the '@' symbol to use as the Name
                    const emailValue = emailInput.value;
                    const extractedName = emailValue.split('@')[0];
                    
                    // Programmatically append the derived Name to the payload
                    formData.append('Name', extractedName);
                    
                    const response = await fetch(endpointUrl, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        messageDiv.textContent = 'Thank you for subscribing!';
                        messageDiv.style.color = 'green';
                        form.reset();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                } catch (error) {
                    messageDiv.textContent = 'Something went wrong. Please try again.';
                    messageDiv.style.color = 'red';
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribe';
                }
            });
        }
    }
};