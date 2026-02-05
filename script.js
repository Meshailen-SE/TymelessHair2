// Show popup after 5 seconds on index page only
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    setTimeout(() => {
        const popup = document.getElementById('consultPopup');
        if (popup) {
            popup.style.display = 'block';
        }
    }, 5000);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            measurements: document.getElementById('measurements').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for contacting us! We will get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
    });
}

// Mobile menu functionality
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
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
        // Close popup if clicking Learn More
        const popup = document.getElementById('consultPopup');
        if (this.closest('.popup') && popup) {
            popup.style.display = 'none';
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 968) {
            if (navLinks) navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);