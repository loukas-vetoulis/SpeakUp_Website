const BlogComponent = {
    render: (blogs) => {
        return `
            <div class="blog-grid" id="blogGrid">
                ${blogs.map(blog => `
                    <article class="blog-card" data-id="${blog.id}">
                        <div class="blog-content">
                            <span class="blog-tag">${blog.category}</span>
                            <h3 class="blog-title">${blog.title}</h3>
                            
                            <div class="expandable-wrapper">
                                ${blog.description ? `<p class="blog-excerpt">${blog.description}</p>` : ''}
                                
                                ${/* Render list if highlights exist */
                                    blog.highlights && blog.highlights.length > 0 ? `
                                    <ul class="blog-highlights">
                                        ${blog.highlights.map(point => `<li>${point}</li>`).join('')}
                                    </ul>
                                ` : ''}

                                ${/* Render precise essay content if it exists */
                                    blog.fullContent ? `
                                    <div class="blog-full-text-content">
                                        ${blog.fullContent}
                                    </div>
                                ` : ''}

                                ${blog.videoUrl ? `
                                    <a href="${blog.videoUrl}" target="_blank" class="video-link">
                                        <i class="fab fa-youtube"></i> Watch Huddle
                                    </a>
                                ` : ''}
                            </div>
                            
                            <button class="read-more-btn">Read More</button>
                        </div>
                        <div class="blog-footer">
                            <div class="blog-meta" style="display: flex; justify-content: space-between; align-items: center;">
                                <span class="blog-author" style="font-size: 0.85rem; font-weight: 700; color: var(--brand-dark);">${blog.author || 'SpeakUP Team'}</span>
                                <span class="blog-date">${blog.date}</span>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;
    }
};