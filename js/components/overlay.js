const OverlayComponent = {
    render: () => {
        const linksHtml = NAVIGATION_DATA.map(link => 
            `<li><a href="${link.url}" class="menu-link">${link.label}</a></li>`
        ).join('');

        return `
            <div class="close-menu-btn" id="closeMenuBtn"><i class="fas fa-times"></i></div>
            <ul class="menu-links">${linksHtml}</ul>
        `;
    }
};