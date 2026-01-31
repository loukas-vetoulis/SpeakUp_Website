document.addEventListener('DOMContentLoaded', () => {
    // 1. INJECT COMPONENTS
    const menuContainer = document.getElementById('navMenu');
    const headerContainer = document.querySelector('header.hero-section');
    const footerContainer = document.querySelector('footer');

    if (menuContainer) menuContainer.innerHTML = OverlayComponent.render();
    // This injects the Navbar AND the Hero content
    if (headerContainer) headerContainer.innerHTML = HeaderComponent.render();
    if (footerContainer) footerContainer.innerHTML = FooterComponent.render();

    // 2. ACTIVATE MENU LOGIC
    // We must select buttons AFTER they are injected into the DOM
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuLinks = document.querySelectorAll('.menu-link');

    const toggleMenu = () => {
        if(menuContainer) menuContainer.classList.toggle('active');
    };

    if(openMenuBtn) openMenuBtn.addEventListener('click', toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    
    menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
});


document.addEventListener('DOMContentLoaded', () => {
    const bubbles = document.querySelectorAll('.parallax-bubble');
    let mouseX = 0;
    let mouseY = 0;
    
    // 1. Track Mouse Position relative to the center of the screen
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.1; // 0.1 reduces sensitivity
        mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
    });

    // 2. The "Game Loop" - Runs every frame
    function animateBubbles() {
        const scrollY = window.scrollY;
        const time = Date.now() * 0.001; // Current time in seconds

        bubbles.forEach((bubble, index) => {
            // A. GET SETTINGS
            // Default speed if not set
            const speed = parseFloat(bubble.getAttribute('data-speed')) || 0.1;
            
            // B. CALCULATE MOVEMENTS
            
            // 1. SCROLL: Moves based on page scroll
            const scrollOffset = bubble.parentElement.offsetTop;
            const yScroll = (scrollY - scrollOffset) * speed;

            // 2. AMBIENT FLOAT: Moves on its own using Sine Wave
            // We use 'index' to make sure they don't all move in perfect sync
            const floatY = Math.sin(time + index) * 15; // Moves up/down 15px
            const floatX = Math.cos(time + index) * 10; // Moves left/right 10px

            // 3. MOUSE PARALLAX: Moves slightly opposite to mouse
            const mouseOffsetX = mouseX * speed * 2;
            const mouseOffsetY = mouseY * speed * 2;

            // 4. INTERACTIVE "POP" (The Fun Part!)
            // Calculate distance between mouse and this specific bubble
            const rect = bubble.getBoundingClientRect();
            const bubbleCenterX = rect.left + rect.width / 2;
            const bubbleCenterY = rect.top + rect.height / 2;
            
            // Real mouse coordinates (not centered)
            const realMouseX = mouseX / 0.1 + window.innerWidth / 2;
            const realMouseY = mouseY / 0.1 + window.innerHeight / 2;

            const dist = Math.hypot(realMouseX - bubbleCenterX, realMouseY - bubbleCenterY);
            
            let scale = 1;
            // If mouse is within 200px, grow the bubble!
            if (dist < 200) {
                scale = 1 + ((200 - dist) / 200) * 0.2; // Max growth 20%
            }

            // C. APPLY FINAL TRANSFORM
            // We combine all movements into one powerful line of CSS
            bubble.style.transform = `translate3d(${floatX + mouseOffsetX}px, ${yScroll + floatY + mouseOffsetY}px, 0) scale(${scale})`;
        });

        // Loop again
        requestAnimationFrame(animateBubbles);
    }

    // Start the engine
    animateBubbles();
});

/* --- CREATIVE PAGE TRANSITIONS (The Curtain Wipe) --- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INJECT THE TRANSITION LAYERS
    // We create three distinct color layers for a "Parallax" feel
    const loaderHTML = `
        <div class="transition-curtain-container">
            <div class="curtain-layer layer-1"></div>
            <div class="curtain-layer layer-2"></div>
            <div class="curtain-layer layer-3"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loaderHTML);

    // 2. PLAY THE "REVEAL" ANIMATION (Page Load)
    // We wait 100ms to ensure the HTML is ready, then slide the curtains away
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// 3. GLOBAL NAVIGATOR (Exit Animation)
window.transitionToPage = function(url) {
    // A. Remove 'page-loaded' to trigger the curtains sliding BACK IN
    document.body.classList.remove('page-loaded');
    document.body.classList.add('page-exiting');

    // B. Wait for the animation to finish (800ms) then switch pages
    setTimeout(() => {
        window.location.href = url;
    }, 800); 
};

// 4. INTERCEPT CLICKS
document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.startsWith('#') && !link.href.includes('mailto:') && link.target !== '_blank') {
        e.preventDefault();
        window.transitionToPage(link.href);
    }
});