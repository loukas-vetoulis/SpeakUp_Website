document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. INJECT COMPONENTS (Header, Footer, Menu)
    // =========================================
    const menuContainer = document.getElementById('navMenu');
    const headerContainer = document.querySelector('header.hero-section');
    const footerContainer = document.querySelector('footer');

    // Check if components exist before rendering
    if (typeof OverlayComponent !== 'undefined' && menuContainer) {
        menuContainer.innerHTML = OverlayComponent.render();
    }
    if (typeof HeaderComponent !== 'undefined' && headerContainer) {
        headerContainer.innerHTML = HeaderComponent.render();
    }
    if (typeof FooterComponent !== 'undefined' && footerContainer) {
        footerContainer.innerHTML = FooterComponent.render();
    }

    // =========================================
    // 2. MENU TOGGLE LOGIC
    // =========================================
    // We select buttons AFTER they are injected into the DOM
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuLinks = document.querySelectorAll('.menu-link');

    const toggleMenu = () => {
        if (menuContainer) menuContainer.classList.toggle('active');
    };

    if (openMenuBtn) openMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    if (menuLinks) {
        menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // =========================================
    // 3. PREMIUM PAGE TRANSITIONS
    // =========================================
    
    // A. Inject the Curtain HTML automatically (if not already there)
    if (!document.querySelector('.transition-curtain-container')) {
        const curtainHTML = `
            <div class="transition-curtain-container">
                <div class="curtain-layer layer-1"></div>
                <div class="curtain-layer layer-2"></div>
                <div class="curtain-layer layer-3"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', curtainHTML);
    }

    // B. Trigger "Reveal" Animation (Curtain Up)
    // We use a small timeout to ensure the browser has painted the curtain before lifting it
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 50);

    // C. Global Transition Function (Used for Exit)
    window.transitionToPage = function(url) {
        document.body.classList.remove('page-loaded'); // Reset Reveal
        document.body.classList.add('page-exiting');   // Trigger Exit (Curtain Down)
        
        // Wait for CSS animation (800ms) then go
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    };

    // D. Intercept all Link Clicks for Exit Animation
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        // Filter: Internal links only, not new tabs, not anchors
        if (link && link.href && !link.href.startsWith('#') && !link.href.includes('mailto:') && link.target !== '_blank') {
            e.preventDefault();
            window.transitionToPage(link.href);
        }
    });

    // =========================================
    // 4. PARALLAX BUBBLE ANIMATION
    // =========================================
    const bubbles = document.querySelectorAll('.parallax-bubble');
    
    // Only run if bubbles exist on this page
    if (bubbles.length > 0) {
        let mouseX = 0;
        let mouseY = 0;

        // Track Mouse relative to screen center
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
        });

        function animateBubbles() {
            const scrollY = window.scrollY;
            const time = Date.now() * 0.001; // Time for sine waves

            bubbles.forEach((bubble, index) => {
                const speed = parseFloat(bubble.getAttribute('data-speed')) || 0.1;
                const parentOffset = bubble.parentElement ? bubble.parentElement.offsetTop : 0;
                const yScroll = (scrollY - parentOffset) * speed;
                const floatY = Math.sin(time + index) * 15; 
                const floatX = Math.cos(time + index) * 10;
                const mouseOffsetX = mouseX * speed * 2;
                const mouseOffsetY = mouseY * speed * 2;

                // Interactive "Pop"
                const rect = bubble.getBoundingClientRect();
                const bubbleCenterX = rect.left + rect.width / 2;
                const bubbleCenterY = rect.top + rect.height / 2;
                const realMouseX = (mouseX / 0.1) + window.innerWidth / 2;
                const realMouseY = (mouseY / 0.1) + window.innerHeight / 2;
                const dist = Math.hypot(realMouseX - bubbleCenterX, realMouseY - bubbleCenterY);
                
                let scale = 1;
                if (dist < 200) scale = 1 + ((200 - dist) / 200) * 0.2; 

                bubble.style.transform = `translate3d(${floatX + mouseOffsetX}px, ${yScroll + floatY + mouseOffsetY}px, 0) scale(${scale})`;
            });
            requestAnimationFrame(animateBubbles);
        }
        animateBubbles();
    }
});

// =========================================
// 5. THE "BACK BUTTON" FIX
// =========================================
// This runs whenever the page is shown, including from the Back/Forward cache.
window.addEventListener('pageshow', (event) => {
    // If the page was loaded from cache (User pressed Back)
    if (event.persisted) {
        // 1. Force the curtain to be "down" (Hidden content) instantly
        document.body.classList.remove('page-loaded');
        document.body.classList.remove('page-exiting');
        
        // 2. Trigger the "Reveal" animation again after a tiny delay
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 10);
    }
});