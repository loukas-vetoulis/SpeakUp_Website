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

    // Duplicate logos for seamless infinite scroll
    duplicateLogos();
});

function duplicateLogos() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    // Duplicate sponsors ONLY on mobile (≤768px)
    if (isMobile) {
        const sponsorsTrack = document.querySelector('.sponsors-track');
        if (sponsorsTrack && !sponsorsTrack.hasAttribute('data-duplicated')) {
            const originalLogos = Array.from(sponsorsTrack.querySelectorAll('.sponsor-img'));
            originalLogos.forEach(logo => {
                const clone = logo.cloneNode(true);
                sponsorsTrack.appendChild(clone);
            });
            sponsorsTrack.setAttribute('data-duplicated', 'true');
        }
    }
    
    // Duplicate brand rows ONLY on tablet/mobile (≤1024px)
    if (isTablet) {
        const brandRows = document.querySelectorAll('.brands-row');
        brandRows.forEach(row => {
            if (!row.hasAttribute('data-duplicated')) {
                const originalLogos = Array.from(row.querySelectorAll('img'));
                originalLogos.forEach(logo => {
                    const clone = logo.cloneNode(true);
                    row.appendChild(clone);
                });
                row.setAttribute('data-duplicated', 'true');
            }
        });
    }
}

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
            if (this.classList.contains('active')) {
                const url = this.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            } else {
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
        
        const upcomingEvents = EVENTS_DATA.map(event => {
            const eventDate = new Date(event.year, monthMap[event.month], parseInt(event.date));
            const [hours, minutes] = event.time.split(' - ')[0].split(':');
            eventDate.setHours(parseInt(hours), parseInt(minutes), 0);
            return { ...event, fullDate: eventDate };
        }).filter(event => event.fullDate > now).sort((a, b) => a.fullDate - b.fullDate);

        const nextEvent = upcomingEvents[0];

        if (!nextEvent) {
            const container = document.querySelector('.calendar-content');
            if (container) container.innerHTML = '<h2 class="calendar-title">NO UPCOMING EVENTS</h2>';
            return;
        }

        const titleEl = document.querySelector('.calendar-title');
        if (titleEl) titleEl.innerText = `NEXT EVENT: ${nextEvent.title.toUpperCase()}`;
        
        const linkEl = document.querySelector('.calendar-link');
        if (linkEl) linkEl.href = nextEvent.link;

        const diff = nextEvent.fullDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);

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
    setInterval(update, 1000);
}