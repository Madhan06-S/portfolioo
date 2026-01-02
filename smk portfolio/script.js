/* ============================================
   NAVIGATION FUNCTIONALITY
   ============================================ */

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

/* ============================================
   SMOOTH SCROLL ANIMATIONS
   ============================================ */

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.skill-item, .project-card, .cert-item, .contact-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

/* ============================================
   TYPING ANIMATION (Removed - Static text now)
   ============================================ */

/* ============================================
   SKILL PROGRESS BARS ANIMATION
   ============================================ */

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const percentage = bar.querySelector('.skill-percentage');
        
        // Reset width to 0
        bar.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
            bar.style.width = progress + '%';
            if (percentage) {
                let current = 0;
                const increment = progress / 30; // 30 steps
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= progress) {
                        current = progress;
                        clearInterval(timer);
                    }
                    percentage.textContent = Math.round(current) + '%';
                }, 50);
            }
        }, 100);
    });
}

// Animate skill bars when skills page is loaded
if (window.location.pathname.includes('skills.html') || 
    document.querySelector('.skill-progress')) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills-page');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

/* ============================================
   STAT COUNTER ANIMATION (Removed - Stats section not included)
   ============================================ */

/* ============================================
   PAGE TRANSITION ANIMATIONS
   ============================================ */

// Add fade-in animation to page content on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth page transitions for navigation links
document.querySelectorAll('a[href^=""]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Only apply to internal links
    if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
        link.addEventListener('click', (e) => {
            // Don't prevent default for same-page links
            if (href !== window.location.pathname.split('/').pop()) {
                e.preventDefault();
                
                // Add fade-out effect
                document.body.style.transition = 'opacity 0.3s ease-out';
                document.body.style.opacity = '0';
                
                // Navigate after fade-out
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    }
});

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link (since we're not using a backend)
        const mailtoLink = `mailto:smk312111@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message (optional)
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Opening Email Client...';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

/* ============================================
   SCROLL TO TOP FUNCTIONALITY
   ============================================ */

// Create scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Style the scroll-to-top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 25px rgba(0, 212, 255, 0.6);
    }
`;
document.head.appendChild(style);

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ============================================
   GLASSMORPHISM EFFECT ENHANCEMENT
   ============================================ */

// Add dynamic glow effects on hover for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll handlers
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations can be added here
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            // Focus first menu item when menu opens
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });
}

/* ============================================
   INITIALIZATION
   ============================================ */

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize skill bars if on skills page
    if (window.location.pathname.includes('skills.html')) {
        // Skill bars will animate when scrolled into view
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

