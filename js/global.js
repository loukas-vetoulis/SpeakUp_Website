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