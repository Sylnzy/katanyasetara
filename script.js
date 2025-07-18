document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Initialize navbar effects
    initNavbarEffects();

    // Initialize stats animation
    initStatsAnimation();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize lazy loading for images
    initLazyLoading();
});

// Smooth scrolling functionality
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Animated statistics counter
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-item .number');

    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const finalText = element.textContent;
    const numericValue = parseInt(finalText.replace(/\D/g, ''));
    const suffix = finalText.replace(/\d/g, '');

    if (isNaN(numericValue)) return;

    let current = 0;
    const increment = numericValue / 50;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            element.textContent = numericValue + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.style.display = 'none';
            hamburger.classList.remove('active');
        }
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Add fade-in animation for elements
function initFadeInAnimation() {
    const elements = document.querySelectorAll('.team-member, .gallery-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize all animations after page load
window.addEventListener('load', function () {
    initFadeInAnimation();
});
