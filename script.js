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

    // Load activities from database
    loadActivities();
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
    loadActivities(); // Load activities from admin
});

// Load activities from public API
async function loadActivities() {
    const loadingEl = document.getElementById('activities-loading');
    const errorEl = document.getElementById('activities-error');
    const emptyEl = document.getElementById('activities-empty');
    const gridEl = document.getElementById('activities-grid');

    try {
        // Show loading state
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';
        emptyEl.style.display = 'none';
        gridEl.style.display = 'none';

        // Fetch activities from public API
        const response = await fetch('/api/activities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
            // Display activities
            displayActivities(result.data);
            gridEl.style.display = 'grid';
        } else {
            // Show empty state
            emptyEl.style.display = 'block';
        }

        loadingEl.style.display = 'none';

    } catch (error) {
        console.error('Error loading activities:', error);

        // Hide loading and show error state
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';

        // Fallback: show default activities if API fails
        displayDefaultActivities();
        gridEl.style.display = 'grid';
    }
}

// Display activities in the grid
function displayActivities(activities) {
    const gridEl = document.getElementById('activities-grid');

    gridEl.innerHTML = activities.map(activity => `
        <div class="gallery-item">
            <img src="${activity.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'}" 
                 alt="${escapeHtml(activity.title)}" 
                 loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop'">
            <div class="gallery-item-content">
                <h3>${escapeHtml(activity.title)}</h3>
                <p>${escapeHtml(activity.description || 'Deskripsi tidak tersedia')}</p>
                <div class="activity-meta">
                    ${activity.category ? `<span class="activity-category"><i class="fas fa-tag"></i> ${escapeHtml(activity.category)}</span>` : ''}
                    ${activity.author ? `<span class="activity-author"><i class="fas fa-user"></i> ${escapeHtml(activity.author)}</span>` : ''}
                    ${activity.date ? `<span class="activity-date"><i class="fas fa-calendar-alt"></i> ${formatDate(activity.date)}</span>` :
            activity.created_at ? `<span class="activity-date"><i class="fas fa-calendar-alt"></i> ${formatDate(activity.created_at)}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Re-initialize lazy loading for new images
    initLazyLoading();
}

// Display default activities if API fails
function displayDefaultActivities() {
    const gridEl = document.getElementById('activities-grid');

    const defaultActivities = [
        {
            title: "Workshop Kesetaraan Gender",
            description: "Workshop edukatif tentang pentingnya kesetaraan gender di lingkungan kampus dan masyarakat.",
            image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop"
        },
        {
            title: "Diskusi Terbuka",
            description: "Ruang diskusi terbuka untuk membahas isu-isu sosial dan gender bersama komunitas.",
            image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop"
        },
        {
            title: "Kampanye Sosial Media",
            description: "Kampanye edukasi melalui konten kreatif di berbagai platform media sosial.",
            image_url: "https://images.unsplash.com/photo-1559027006-448665bd7c7f?w=400&h=250&fit=crop"
        }
    ];

    displayActivities(defaultActivities);
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return dateString;
    }
}
