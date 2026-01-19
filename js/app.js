document.addEventListener('DOMContentLoaded', () => {

    // --- MENU TOGGLE ---
    const navMenu = document.getElementById('navMenu');
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuLinks = document.querySelectorAll('.menu-link');

    const toggleMenu = () => navMenu.classList.toggle('active');

    if(openMenuBtn) openMenuBtn.addEventListener('click', toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', toggleMenu));


    // --- INFINITE CAROUSEL LOGIC ---
    const slider = document.getElementById('slider');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    
    if (!slider) return;

    // 1. CLONE
    const originalCards = Array.from(slider.children);
    const cardCount = originalCards.length;

    // Tail Clones
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-tail');
        slider.appendChild(clone);
    });

    // Head Clones
    originalCards.slice().reverse().forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-head');
        slider.insertBefore(clone, slider.firstChild);
    });

    // Re-select all cards (Originals + Clones)
    let allCards = document.querySelectorAll('.card');

    // 2. ALIGN TO CENTER
    const alignToCenter = () => {
        const cardWidth = allCards[0].offsetWidth;
        const gap = 24; 
        const totalSingleSetWidth = (cardWidth + gap) * cardCount;
        slider.scrollLeft = totalSingleSetWidth;
    };

    window.addEventListener('load', alignToCenter);
    window.addEventListener('resize', alignToCenter);

    // 3. SCROLL LOGIC
    const handleInfiniteScroll = () => {
        const cardWidth = allCards[0].offsetWidth;
        const gap = 24;
        const singleSetWidth = (cardWidth + gap) * cardCount;

        const centerPoint = slider.scrollLeft + (slider.offsetWidth / 2);
        
        allCards.forEach(card => {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(centerPoint - cardCenter);
            
            if (distance < card.offsetWidth / 2) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Teleport
        if (slider.scrollLeft >= singleSetWidth * 2) {
            slider.scrollLeft -= singleSetWidth;
        } else if (slider.scrollLeft <= 10) {
            slider.scrollLeft += singleSetWidth;
        }
    };

    slider.addEventListener('scroll', handleInfiniteScroll);

    // 4. BUTTONS
    const smoothScroll = (amount) => {
        slider.scrollBy({ left: amount, behavior: 'smooth' });
    };

    if(btnRight) {
        btnRight.addEventListener('click', () => {
            const moveAmt = allCards[0].offsetWidth + 24;
            smoothScroll(moveAmt);
        });
    }

    if(btnLeft) {
        btnLeft.addEventListener('click', () => {
            const moveAmt = -(allCards[0].offsetWidth + 24);
            smoothScroll(moveAmt);
        });
    }

    // 5. CLICK LOGIC (Navigate vs Slide)
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            
            // IF ACTIVE -> NAVIGATE
            if (this.classList.contains('active')) {
                const url = this.getAttribute('data-url');
                if (url) {
                    // For demo purposes, I'll log it. Uncomment line below for real navigation.
                    console.log(`Navigating to: ${url}`); 
                    // window.location.href = url; 
                }
            } 
            // IF NOT ACTIVE -> SLIDE TO CENTER
            else {
                const centerOffset = (slider.offsetWidth / 2) - (this.offsetWidth / 2);
                const scrollTarget = this.offsetLeft - centerOffset;
                slider.scrollTo({ left: scrollTarget, behavior: 'smooth' });
            }
        });
    });

    // Init
    handleInfiniteScroll();
});