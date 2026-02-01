
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Fancybox
Fancybox.bind("[data-fancybox]", {
    // Options
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.main-navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Video Modal
const playButton = document.getElementById('playButton');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const videoIframe = document.getElementById('videoIframe');

playButton.addEventListener('click', function () {
    videoModal.classList.add('active');
    videoIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
});

closeModal.addEventListener('click', function () {
    videoModal.classList.remove('active');
    videoIframe.src = '';
});

videoModal.addEventListener('click', function (e) {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoIframe.src = '';
    }
});

// Smooth scroll for navigation links
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

// Pause reviews animation on hover
const reviewsRows = document.querySelectorAll('.reviews-row');
reviewsRows.forEach(row => {
    row.addEventListener('mouseenter', function () {
        this.style.animationPlayState = 'paused';
    });
    row.addEventListener('mouseleave', function () {
        this.style.animationPlayState = 'running';
    });
});

// Form validation
const form = document.querySelector('.appointment-form-wrapper form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple validation
    const inputs = form.querySelectorAll('.form-control');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });

    if (isValid) {
        // Show success message
        alert('Obrigado! Sua solicitação foi enviada com sucesso. Entraremos em contato em breve.');
        form.reset();
    }
});

// Add focus effect to form inputs
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function () {
        this.parentElement.classList.remove('focused');
    });
});

// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Function to open menu
function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    mobileMenuToggle.classList.add('active');
    document.body.classList.add('menu-open');
}

// Function to close menu
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Toggle menu on hamburger click
mobileMenuToggle.addEventListener('click', function () {
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Close menu on close button click
mobileMenuClose.addEventListener('click', closeMobileMenu);

// Close menu on overlay click
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close menu when clicking on nav links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        closeMobileMenu();

        // Smooth scroll to section
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        }
    });
});

// Close menu on escape key press
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu on window resize if larger than lg breakpoint
window.addEventListener('resize', function () {
    if (window.innerWidth >= 992 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Prevent scroll on touch devices when menu is open
mobileMenu.addEventListener('touchmove', function (e) {
    if (this.scrollHeight <= this.clientHeight) {
        e.preventDefault();
    }
}, { passive: false });

// WhatsApp Floating Button Functionality
const whatsappFloat = document.getElementById('whatsappFloat');
const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
const tooltipClose = document.getElementById('tooltipClose');
const whatsappButton = document.querySelector('.whatsapp-button');

// Show tooltip after delay
let tooltipTimeout;
let tooltipShown = false;
let tooltipDismissed = false;

function showTooltip() {
    if (!tooltipDismissed && !tooltipShown) {
        whatsappTooltip.classList.add('show');
        tooltipShown = true;

        // Auto-hide tooltip after 8 seconds
        setTimeout(() => {
            if (tooltipShown) {
                hideTooltip();
            }
        }, 8000);
    }
}

function hideTooltip() {
    whatsappTooltip.classList.remove('show');
    tooltipShown = false;
}

// Show tooltip after 5 seconds on page load
setTimeout(() => {
    showTooltip();
}, 5000);

// Close tooltip on close button click
tooltipClose.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideTooltip();
    tooltipDismissed = true;
});

// Show tooltip on hover (desktop)
whatsappButton.addEventListener('mouseenter', function () {
    if (!tooltipDismissed) {
        clearTimeout(tooltipTimeout);
        showTooltip();
    }
});

whatsappButton.addEventListener('mouseleave', function () {
    tooltipTimeout = setTimeout(() => {
        hideTooltip();
    }, 1000);
});

// Remove notification badge on click
whatsappButton.addEventListener('click', function () {
    this.classList.add('clicked');
    hideTooltip();
    tooltipDismissed = true;
});

// Show tooltip when user scrolls to 50% of page
let scrollTooltipShown = false;
window.addEventListener('scroll', function () {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercent > 50 && !scrollTooltipShown && !tooltipDismissed) {
        showTooltip();
        scrollTooltipShown = true;
    }
});

// Hide WhatsApp button when at very bottom (near footer) - Optional
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - scrollPosition < 100) {
        whatsappFloat.style.opacity = '0.5';
        whatsappFloat.style.transform = 'scale(0.8)';
    } else {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.transform = 'scale(1)';
    }
});

// Intersection Observer for showing tooltip when specific section is visible
const contactSection = document.getElementById('contato');
if (contactSection) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !tooltipDismissed) {
                // Change tooltip message when contact section is visible
                whatsappTooltip.querySelector('span').textContent = 'Prefere falar pelo WhatsApp?';
                showTooltip();
            }
        });
    }, observerOptions);

    contactObserver.observe(contactSection);
}