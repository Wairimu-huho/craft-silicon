// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Functionality ---
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    let isMenuOpen = false;

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('mobile-menu-enter-active');
            mobileMenu.classList.remove('mobile-menu-exit-active');
        } else {
            mobileMenu.classList.add('mobile-menu-exit-active');
            mobileMenu.classList.remove('mobile-menu-enter-active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 200);
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
        if (!isClickInside && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.add('mobile-menu-exit-active');
            mobileMenu.classList.remove('mobile-menu-enter-active');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 200);
        }
    });

    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) { // 768px is Tailwind's md breakpoint
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
        }
    });

    // --- Navigation Scroll Effect ---
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add/remove background blur on scroll
        if (currentScroll > 50) {
            nav.classList.add('bg-black/95');
            nav.style.backdropFilter = 'blur(5px)';
        } else {
            nav.classList.remove('bg-black/95');
            nav.style.backdropFilter = 'none';
        }

        // Hide/show nav on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // --- Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (isMenuOpen) {
                    mobileMenuButton.click();
                }
            }
        });
    });

    // --- Lazy Loading Images ---
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        root: null,
        threshold: 0,
        rootMargin: '50px'
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

    lazyImages.forEach(img => imageObserver.observe(img));

    // --- Card Hover Effects ---
    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.2s ease-in-out';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Add click handler for video cards
        const videoOverlay = card.querySelector('.video-overlay');
        if (videoOverlay) {
            card.addEventListener('click', function() {
                handleVideoClick(this);
            });
        }
    });

    // --- Video Card Click Handler ---
    function handleVideoClick(card) {
        const videoId = card.dataset.videoId; // You'll need to add data-video-id to your video cards
        const videoTitle = card.querySelector('h3').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="relative w-full max-w-4xl p-4">
                <button class="absolute top-4 right-4 text-white text-xl">&times;</button>
                <div class="aspect-video bg-black">
                    <!-- Add your video player here -->
                    <div class="w-full h-full flex items-center justify-center text-white">
                        Video Player Placeholder
                    </div>
                </div>
                <h3 class="text-white text-xl mt-4">${videoTitle}</h3>
            </div>
        `;

        // Add close functionality
        modal.querySelector('button').addEventListener('click', () => {
            modal.remove();
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.body.appendChild(modal);
    }

    // --- Search Functionality ---
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'hidden absolute right-0 top-full mt-2 p-2 bg-black border border-yellow-400 text-white rounded';
    searchInput.placeholder = 'Search...';

    searchIcon.parentElement.style.position = 'relative';
    searchIcon.parentElement.appendChild(searchInput);

    searchIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        searchInput.classList.toggle('hidden');
        if (!searchInput.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    // Hide search on click outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchIcon.contains(e.target)) {
            searchInput.classList.add('hidden');
        }
    });

    // --- Initialize Loading Animation ---
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// --- Utility Functions ---
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// --- Handle Loading State ---
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});