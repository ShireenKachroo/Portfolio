// ==================== Smooth Scroll Navigation ====================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Active Section Highlighting ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Throttled scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavLink, 50);
});

// ==================== Scroll Reveal Animations ====================
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

function initializeRevealElements() {
    const elementsToReveal = document.querySelectorAll('.glass-card, .section-title, .hero-content, .timeline-item, .project-card, .skill-badge, .contact-card');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

initializeRevealElements();

// ==================== Navbar Background on Scroll ====================
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
    if (navScrollTimeout) clearTimeout(navScrollTimeout);
    navScrollTimeout = setTimeout(updateNavbarBackground, 50);
});

// ==================== Projects Cards Clickable ====================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const githubLink = card.getAttribute('data-github');
        if (githubLink) window.open(githubLink, '_blank');
    });
});

// ==================== Initialize on Page Load ====================
window.addEventListener('load', () => {
    updateActiveNavLink();
    updateNavbarBackground();
    document.body.classList.add('loaded');
});
