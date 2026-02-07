const HeaderComponent = {
    render: () => {
        return `
        <div class="navbar">
            <div class="search-bar-container">
                <i class="fas fa-bars hamburger" id="openMenuBtn"></i>
            </div>
        </div>

        <div class="hero-content">
            <div class="logo-container">
                <div class="logo-placeholder">
                    <a href="index.html" id="logo-link">
                        <img src="assets/logo/speakup_logo.jpeg" alt="SpeakUp Logo">
                    </a>
                </div>
                </div>
            </div>

            <div class="hero-text">
                <h2>Shaping the business leaders of tomorrow</h2>
            </div>

            <div class="hero-socials">
                <a href="https://www.linkedin.com/company/speakup-aueb-genz/" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a href="https://www.instagram.com/speakup_auebgenz/" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://www.tiktok.com/@speakupaueb_genz" target="_blank"><i class="fab fa-tiktok"></i></a>
            </div>
        </div>
        `;
    }
};