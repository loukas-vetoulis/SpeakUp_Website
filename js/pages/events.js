window.addEventListener('load', () => {
    const grid = document.getElementById('events-grid');
    
    if (!grid || typeof EVENTS_DATA === 'undefined') return;

    grid.innerHTML = ''; 

    EVENTS_DATA.forEach(event => {
        const card = document.createElement('article');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="card-media">
                <img src="${event.image}" alt="${event.title}">
                <div class="glass-date"><span class="day">${event.date}</span><span class="month">${event.month}</span></div>
                <div class="category-tag">${event.category}</div>
            </div>
            <div class="card-body">
                <div class="meta-info"><i class="far fa-clock"></i> ${event.time}</div>
                <h3 class="card-title">${event.title}</h3>
                <a href="${event.link}" class="card-btn"><span>Sign Up</span><div class="icon-circle"><i class="fas fa-arrow-right"></i></div></a>
            </div>
        `;
        grid.appendChild(card);
    });
});