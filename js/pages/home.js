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
    
    if (typeof EVENTS_DATA !== 'undefined') {
        initCountdown();
    }

    // initBrandsMarquee();

    initSponsorsMobileLoop();
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

function initCountdown() {
    const monthMap = { 'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5, 'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11 };

    const update = () => {
        const now = new Date();
        
        // Find the next event in the future
        const upcomingEvents = EVENTS_DATA.map(event => {
            const eventDate = new Date(event.year, monthMap[event.month], parseInt(event.date));
            const [hours, minutes] = event.time.split(' - ')[0].split(':');
            eventDate.setHours(parseInt(hours), parseInt(minutes), 0);
            return { ...event, fullDate: eventDate };
        }).filter(event => event.fullDate > now).sort((a, b) => a.fullDate - b.fullDate);

        const nextEvent = upcomingEvents[0];

        // If no event, clear timer
        if (!nextEvent) {
            const container = document.querySelector('.calendar-content');
            if (container) container.innerHTML = '<h2 class="calendar-title">NO UPCOMING EVENTS</h2>';
            return;
        }

        // Update Title & Link
        const titleEl = document.querySelector('.calendar-title');
        if (titleEl) titleEl.innerText = `NEXT EVENT: ${nextEvent.title.toUpperCase()}`;
        
        const linkEl = document.querySelector('.calendar-link');
        if (linkEl) linkEl.href = nextEvent.link;

        // Calculate Difference
        const diff = nextEvent.fullDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        // Update DOM (Check if element exists first to avoid errors)
        const dEl = document.getElementById('days');
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('mins');
        const sEl = document.getElementById('secs');

        if (dEl) dEl.innerText = days.toString().padStart(2, '0');
        if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
        if (mEl) mEl.innerText = mins.toString().padStart(2, '0');
        if (sEl) sEl.innerText = secs.toString().padStart(2, '0');
    };

    update(); 
    setInterval(update, 1000); // Update strictly every 1 second
}

function initSponsorsMobileLoop() {
    const track = document.querySelector('.sponsors-track');
    
    if (track) {
        // Get all original logos
        const originals = Array.from(track.children);
        
        // Clone them exactly once
        originals.forEach(logo => {
            const clone = logo.cloneNode(true);
            clone.classList.add('is-clone'); // Add class so we can hide on desktop
            track.appendChild(clone);
        });
    }
}