document.addEventListener('DOMContentLoaded', function() {
    // Background slideshow functionality
    const bgSlides = document.querySelectorAll('.background-slideshow .slide');
    let currentBgSlide = 0;
    
    function showBgSlide(n) {
        bgSlides.forEach(slide => slide.classList.remove('active'));
        currentBgSlide = (n + bgSlides.length) % bgSlides.length;
        bgSlides[currentBgSlide].classList.add('active');
    }
    
    function nextBgSlide() {
        showBgSlide(currentBgSlide + 1);
    }
    
    showBgSlide(0);
    setInterval(nextBgSlide, 5000);
    
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    function toggleMenu() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            // Prevent default only on mobile
            if (window.innerWidth <= 992) {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                e.target !== mobileMenuToggle && 
                !mobileMenuToggle.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    toggleMenu();
                }
            });
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
    
    // Content carousel functionality
    const contentCarouselInner = document.querySelector('.content-carousel-inner');
    const contentCarouselIndicators = document.querySelector('.content-carousel-indicators');
    const contentPrevButton = document.querySelector('.content-carousel-control.prev');
    const contentNextButton = document.querySelector('.content-carousel-control.next');
    
    // Generate carousel items (using wrap images as an example)
    for (let i = 1; i <= 50; i++) {
        // Create carousel item
        const carouselItem = document.createElement('div');
        carouselItem.className = 'content-carousel-item';
        carouselItem.innerHTML = `<img src="images/wrap-${i}.webp" alt="Micro Concepts service example ${i}">`;
        contentCarouselInner.appendChild(carouselItem);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = 'content-carousel-indicator';
        indicator.setAttribute('data-index', i - 1);
        contentCarouselIndicators.appendChild(indicator);
    }
    
    let currentContentIndex = 0;
    const contentItems = document.querySelectorAll('.content-carousel-item');
    const contentIndicators = document.querySelectorAll('.content-carousel-indicator');
    const totalContentItems = contentItems.length;
    
    // Function to update carousel position
    function updateContentCarousel() {
        contentCarouselInner.style.transform = `translateX(-${currentContentIndex * 100}%)`;
        
        // Update indicators
        contentIndicators.forEach((indicator, index) => {
            if (index === currentContentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Next slide function
    function nextContentSlide() {
        currentContentIndex = (currentContentIndex + 1) % totalContentItems;
        updateContentCarousel();
    }
    
    // Previous slide function
    function prevContentSlide() {
        currentContentIndex = (currentContentIndex - 1 + totalContentItems) % totalContentItems;
        updateContentCarousel();
    }
    
    // Add event listeners
    contentPrevButton.addEventListener('click', prevContentSlide);
    contentNextButton.addEventListener('click', nextContentSlide);
    
    // Add click events to indicators
    contentIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentContentIndex = index;
            updateContentCarousel();
        });
    });
    
    // Auto-play content carousel
    let contentCarouselInterval = setInterval(nextContentSlide, 5000);
    
    // Pause on hover
    const contentCarousel = document.querySelector('.content-carousel');
    contentCarousel.addEventListener('mouseenter', () => {
        clearInterval(contentCarouselInterval);
    });
    
    contentCarousel.addEventListener('mouseleave', () => {
        contentCarouselInterval = setInterval(nextContentSlide, 5000);
    });
    
    // Initialize content carousel
    updateContentCarousel();
});
