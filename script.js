// Add hover effects to cards
document.querySelectorAll('.bg-[#0B0F19]').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.transition = 'transform 0.2s ease-in-out';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Video play functionality for first card
document.querySelector('.bg-black\\/50').addEventListener('click', function() {
    // Video player implementation would go here
    console.log('Play video');
});

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => imageObserver.observe(img));