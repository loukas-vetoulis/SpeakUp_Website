const initBlogAnimations = () => {
    const header = document.querySelector('.section-header');
    const cards = document.querySelectorAll('.blog-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('section-header')) {
                    entry.target.classList.add('revealed');
                } else {
                    // Staggered delay logic
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, cardIndex * 150);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (header) observer.observe(header);
    cards.forEach(card => observer.observe(card));
};

const initReadMore = () => {
    // Find the parent grid wrapper
    const container = document.querySelector('.blog-up-section');
    if (!container) return;

    // Attach a single listener to the container (Event Delegation)
    container.addEventListener('click', (event) => {
        // Ensure we only fire when a read-more button is clicked
        const btn = event.target.closest('.read-more-btn');
        if (!btn) return;

        // Find the specific card belonging to the clicked button
        const card = btn.closest('.blog-card');
        if (!card) return;

        // Toggle the expanded state
        const isExpanded = card.classList.toggle('is-expanded');

        // Update the button text based on the new state
        btn.textContent = isExpanded ? 'Read Less' : 'Read More';

        // Automatically scroll the card into view if expanding pushes it off-screen
        if (isExpanded) {
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300); // Slight delay to allow the CSS expansion transition to begin
        }
    });
};
