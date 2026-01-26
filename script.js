// ==================== Smooth Scroll Navigation ====================
// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Add click event to each navigation link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the target section ID from href
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to the section smoothly
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ==================== Active Section Highlighting ====================
// Function to update active nav link based on scroll position
function updateActiveNavLink() {
    // Get all sections
    const sections = document.querySelectorAll('.section, .hero');
    
    // Get current scroll position (add offset for navbar height)
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Listen for scroll events and update active link with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavLink, 50);
});

// ==================== Scroll Reveal Animations (IntersectionObserver) ====================
// Create intersection observer for scroll-based reveals
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that should reveal on scroll
function initializeRevealElements() {
    const elementsToReveal = document.querySelectorAll('.glass-card, .section-title, .hero-content');
    
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

// Initialize reveal elements when DOM is loaded
initializeRevealElements();

// ==================== Navbar Background on Scroll ====================
// Make navbar more opaque and add shadow when scrolling down
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.85)';
        navbar.style.boxShadow = 'none';
    }
}

let navScrollTimeout;
window.addEventListener('scroll', () => {
    if (navScrollTimeout) {
        clearTimeout(navScrollTimeout);
    }
    navScrollTimeout = setTimeout(updateNavbarBackground, 50);
});

// ==================== Initialize on Page Load ====================
// Run all initialization functions when page loads
window.addEventListener('load', () => {
    updateActiveNavLink();
    updateNavbarBackground();
    
    // Add a class to body to indicate page has loaded
    document.body.classList.add('loaded');
});