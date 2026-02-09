document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Event ID from URL (e.g., event-details.html?id=1)
    const params = new URLSearchParams(window.location.search);
    const eventId = parseInt(params.get('id'));

    // 2. Find the Event in Data
    const event = EVENTS_DATA.find(e => e.id === eventId);

    // 3. Handle Invalid ID (Redirect back to list)
    if (!event) {
        window.location.href = 'events.html';
        return;
    }

    // 4. Populate DOM Elements
    document.title = `${event.title} | SpeakUP`;
    
    // Header Info
    document.getElementById('detailCategory').textContent = event.category;
    document.getElementById('detailTitle').textContent = event.title;
    document.getElementById('detailImage').src = event.image;
    
    // Mobile Meta (Hidden on desktop via CSS, useful for mobile)
    const mobDate = document.getElementById('mobileDate');
    const mobTime = document.getElementById('mobileTime');
    if(mobDate) mobDate.textContent = `${event.date} ${event.month} ${event.year}`;
    if(mobTime) mobTime.textContent = event.time;

    // Description (Using innerHTML to support paragraphs)
    document.getElementById('detailDescription').innerHTML = event.description;

    // Highlights (Bullet points)
    const highlightsList = document.getElementById('detailHighlights');
    if (event.highlights && event.highlights.length > 0) {
        event.highlights.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            highlightsList.appendChild(li);
        });
    } else {
        // If no highlights, hide the whole section
        if(highlightsList.parentElement) highlightsList.parentElement.style.display = 'none';
    }

    // SIDEBAR: Date/Time/Location
    const sideDate = document.getElementById('sidebarDate');
    const sideTime = document.getElementById('sidebarTime');
    const sideLoc = document.getElementById('sidebarLocation');
    
    if(sideDate) sideDate.textContent = `${event.date} ${event.month} ${event.year}`;
    if(sideTime) sideTime.textContent = event.time;
    if(sideLoc) sideLoc.textContent = event.location || 'TBA';

    // SIDEBAR: Speakers
    const speakersList = document.getElementById('sidebarSpeakers');
    if (event.speakers && event.speakers.length > 0) {
        event.speakers.forEach(speaker => {
            const li = document.createElement('li');
            // Check if speaker has a role
            const roleHtml = speaker.role ? `<br><span style="font-size:0.85rem; color:#666;">${speaker.role}</span>` : '';
            li.innerHTML = `<strong>${speaker.name}</strong>${roleHtml}`;
            speakersList.appendChild(li);
        });
    } else {
        if(speakersList.parentElement) speakersList.parentElement.style.display = 'none';
    }

    // BUTTON LOGIC
    const btn = document.getElementById('registerBtn');
    
    if (event.status === 'Completed') {
        btn.innerHTML = '<span>Event Completed</span> <i class="fas fa-check"></i>';
        btn.classList.add('disabled');
        btn.removeAttribute('href');
    } else if (event.status === 'Closed') {
        btn.innerHTML = '<span>Registrations Closed</span> <i class="fas fa-lock"></i>';
        btn.classList.add('disabled');
        btn.removeAttribute('href');
    } else {
        // Active Event
        btn.innerHTML = '<span>Save Your Spot</span> <i class="fas fa-arrow-right"></i>';
        btn.href = event.registration_link || '#';
    }
});