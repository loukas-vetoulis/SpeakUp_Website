const FooterComponent = {
    render: () => {
        // 1. Get the current year automatically
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
                    <div class="input-group">
                        <input type="email" placeholder="john.doe@gmail.com">
                    </div>
                    <div class="footer-socials">
                        <a href="https://www.linkedin.com/company/speakup-aueb-genz/" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/speakup_auebgenz/" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.tiktok.com/@speakupaueb_genz" target="_blank"><i class="fab fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
            
            <div class="copyright">Copyright © ${currentYear} SpeakUp - All rights reserved | Terms & Conditions</div>
        `;
    }
};