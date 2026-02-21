const BlogComponent = {
    render: (blogs) => {
        return `
            <div class="blog-grid" id="blogGrid">
                ${blogs.map(blog => `
                    <article class="blog-card">
                        <div class="blog-content">
                            <span class="blog-tag">${blog.category}</span>
                            <h3 class="blog-title">${blog.title}</h3>
                            
                            <div class="expandable-wrapper">
                                <p class="blog-excerpt">${blog.description}</p>
                                
                                <ul class="blog-highlights">
                                    ${blog.highlights.map(point => `<li>${point}</li>`).join('')}
                                </ul>

                                ${blog.videoUrl ? `
                                    <a href="${blog.videoUrl}" target="_blank" class="video-link">
                                        <i class="fab fa-youtube"></i> Watch Huddle
                                    </a>
                                ` : ''}
                            </div>
                            
                            <button class="read-more-btn">Read More</button>
                        </div>
                        <div class="blog-footer">
                            <span class="blog-date">${blog.date}</span>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;
    }
};