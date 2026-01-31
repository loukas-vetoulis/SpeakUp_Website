window.addEventListener('load', () => {
    const slider = document.getElementById('slider');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');

    if (slider && typeof CAROUSEL_DATA !== 'undefined') {
        // Generate Cards
        CAROUSEL_DATA.forEach(item => {
            const card = document.createElement('div');
            card.className = `card card-${item.type}`;
            card.setAttribute('data-url', item.url);
            card.innerHTML = `<h3><span>${item.title}</span> ${item.highlight}</h3>`;
            slider.appendChild(card);
        });
        
        initInfiniteScroll(slider, btnLeft, btnRight);
    }
});

function initInfiniteScroll(slider, btnLeft, btnRight) {
    const originalCards = Array.from(slider.children);
    const cardCount = originalCards.length;

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-tail');
        slider.appendChild(clone);
    });

    originalCards.slice().reverse().forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone-head');
        slider.insertBefore(clone, slider.firstChild);
    });

    let allCards = document.querySelectorAll('.card');

    const alignToCenter = () => {
        const cardWidth = allCards[0].offsetWidth;
        const gap = 24; 
        slider.scrollLeft = (cardWidth + gap) * cardCount;
    };
    alignToCenter();
    window.addEventListener('resize', alignToCenter);

    const handleScroll = () => {
        const cardWidth = allCards[0].offsetWidth;
        const gap = 24;
        const setWidth = (cardWidth + gap) * cardCount;
        const center = slider.scrollLeft + (slider.offsetWidth / 2);

        allCards.forEach(card => {
            const dist = Math.abs(center - (card.offsetLeft + (card.offsetWidth / 2)));
            if (dist < card.offsetWidth / 2) card.classList.add('active');
            else card.classList.remove('active');
        });

        if (slider.scrollLeft >= setWidth * 2) slider.scrollLeft -= setWidth;
        else if (slider.scrollLeft <= 10) slider.scrollLeft += setWidth;
    };

    slider.addEventListener('scroll', handleScroll);

    const move = (amt) => slider.scrollBy({ left: amt, behavior: 'smooth' });
    
    if(btnRight) btnRight.addEventListener('click', () => move(allCards[0].offsetWidth + 24));
    if(btnLeft) btnLeft.addEventListener('click', () => move(-(allCards[0].offsetWidth + 24)));

    allCards.forEach(card => {
        card.addEventListener('click', function() {
            // Check if the card is currently the center (active) one
            if (this.classList.contains('active')) {
                const url = this.getAttribute('data-url');
                
                // THE FIX: Actually navigate to the URL
                if (url) {
                    window.location.href = url;
                }
            } else {
                // If it's a side card, just scroll it to the center
                const offset = (slider.offsetWidth / 2) - (this.offsetWidth / 2);
                slider.scrollTo({ left: this.offsetLeft - offset, behavior: 'smooth' });
            }
        });
    });
    
    handleScroll();
}