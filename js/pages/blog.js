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

// Call this function inside your document.addEventListener('DOMContentLoaded', ...) in global.js