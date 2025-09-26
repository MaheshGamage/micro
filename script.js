// Navigation and UI functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active page highlighting
    const currentLocation = location.href;
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.href === currentLocation) link.classList.add('active');
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
    }

    // Navigation menu
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let menuHoverTimeout;
    const isTouchDevice = 'ontouchstart' in window;

    function openMenu() {
        clearTimeout(menuHoverTimeout);
        navMenu.classList.add('active');
    }

    function closeMenu() {
        menuHoverTimeout = setTimeout(() => navMenu.classList.remove('active'), 100);
    }

    function toggleMenu() {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    }

    if (isTouchDevice) {
        navToggle.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(); });
        navMenu.querySelectorAll('a').forEach(item => item.addEventListener('click', closeMenu));
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    } else {
        navToggle.addEventListener('mouseenter', openMenu);
        navMenu.addEventListener('mouseleave', closeMenu);
        navMenu.addEventListener('mouseenter', () => clearTimeout(menuHoverTimeout));
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // Slideshows
    const homeSlides = document.querySelectorAll('.home-slide');
    let currentHomeSlide = 0;
    
    if (homeSlides.length > 1) {
        setInterval(() => {
            homeSlides[currentHomeSlide].classList.remove('active');
            currentHomeSlide = (currentHomeSlide + 1) % homeSlides.length;
            homeSlides[currentHomeSlide].classList.add('active');
        }, 4000);
    }

    document.querySelectorAll('.service-card').forEach(card => {
        const slides = card.querySelectorAll('.slide');
        let currentSlide = 0;
        
        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 3000);
        }
    });
});
