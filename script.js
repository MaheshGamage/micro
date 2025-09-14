// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.nav-menu a');
    const menuLength = navLinks.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (navLinks[i].href === currentLocation) {
            navLinks[i].classList.add('active');
        }
    }
});

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }
});

// Initially hide the back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Navigation menu hover functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
let menuHoverTimeout;

// Open menu on hover
navToggle.addEventListener('mouseenter', function() {
  clearTimeout(menuHoverTimeout);
  navMenu.classList.add('active');
});

// Close menu when leaving menu area
navMenu.addEventListener('mouseleave', function() {
  menuHoverTimeout = setTimeout(function() {
    navMenu.classList.remove('active');
  }, 100); // 100ms delay before closing
});

// Keep menu open when hovering over menu items
navMenu.addEventListener('mouseenter', function() {
  clearTimeout(menuHoverTimeout);
});

// Close menu when leaving the nav wrapper
const navWrapper = document.querySelector('.nav-wrapper');
if (navWrapper) {
  navWrapper.addEventListener('mouseleave', function() {
    menuHoverTimeout = setTimeout(function() {
      navMenu.classList.remove('active');
    }, 100);
  });
}

// Also close menu if user clicks outside
document.addEventListener('click', function(event) {
  const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
  if (!isClickInsideNav && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }
});

// Add click event to navigate to home page
navToggle.addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = 'micro-1home.html';
});