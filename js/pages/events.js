window.addEventListener('load', () => {
    // Select both grids
    const upcomingGrid = document.getElementById('upcoming-grid');
    const pastGrid = document.getElementById('past-grid');
    
    if (typeof EVENTS_DATA === 'undefined') return;

    // Clear grids
    if (upcomingGrid) upcomingGrid.innerHTML = '';
    if (pastGrid) pastGrid.innerHTML = '';

    const monthMap = { 'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5, 'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11 };

    // 1. Process Data
    const processedEvents = EVENTS_DATA.map(event => {
        const d = new Date(event.year, monthMap[event.month.toUpperCase()], parseInt(event.date));
        const [h, m] = event.time.split(' - ')[0].split(':');
        d.setHours(parseInt(h), parseInt(m), 0);
        return { ...event, fullDate: d };
    });

    const now = new Date();

    // 2. Separate Arrays
    const upcomingEvents = processedEvents.filter(e => e.fullDate >= now);
    const pastEvents = processedEvents.filter(e => e.fullDate < now);

    // 3. Sort
    upcomingEvents.sort((a, b) => a.fullDate - b.fullDate);
    pastEvents.sort((a, b) => b.fullDate - a.fullDate);

    // 4. Render Function
    const renderCard = (event, isExpired) => {
        const card = document.createElement('article');
        card.className = 'event-card';
        if (isExpired) card.classList.add('event-expired');

        // Button Logic
        let buttonHtml;
        if (isExpired) {
            buttonHtml = `
                <div class="card-btn" style="background: #f3e5f5; color: #4a148c; border: 1px solid #d1c4e9; cursor: default;">
                    <span style="font-weight: 700;">Completed</span>
                    <div class="icon-circle" style="background: #4a148c; color: white;"><i class="fas fa-check"></i></div>
                </div>
            `;
        } else {
            buttonHtml = `
                <a href="${event.link}" class="card-btn">
                    <span>Sign Up</span>
                    <div class="icon-circle"><i class="fas fa-arrow-right"></i></div>
                </a>
            `;
        }

        // HTML Structure
        card.innerHTML = `
            <div class="card-media" style="background: #f9f9f9;"> <img src="${event.image}" alt="${event.title}" style="object-fit: contain; width: 100%; height: 100%;">
                
                <div class="glass-date">
                    <span class="day">${event.date}</span>
                    <span class="month">${event.month}</span>
                    <span class="year" style="display:block; font-size: 0.65rem; font-weight: 600; margin-top: 2px;">${event.year}</span>
                </div>
                
                <div class="category-tag">${event.category}</div>
            </div>
            <div class="card-body">
                <div class="meta-info"><i class="far fa-clock"></i> ${event.time}</div>
                <h3 class="card-title">${event.title}</h3>
                ${buttonHtml} 
            </div>
        `;
        return card;
    };

    // 5. Inject
    if (upcomingGrid) {
        if (upcomingEvents.length === 0) upcomingGrid.innerHTML = '<p style="text-align:center; width:100%; grid-column: 1/-1;">No upcoming events.</p>';
        else upcomingEvents.forEach(e => upcomingGrid.appendChild(renderCard(e, false)));
    }

    if (pastGrid) {
        if (pastEvents.length === 0) pastGrid.innerHTML = '<p style="text-align:center; width:100%; grid-column: 1/-1;">No past events yet.</p>';
        else pastEvents.forEach(e => pastGrid.appendChild(renderCard(e, true)));
    }
});