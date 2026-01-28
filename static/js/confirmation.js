document.addEventListener('DOMContentLoaded', function() {
    // Initialize all confirmation page functionalities
    initTheme();
    initCelebrationParticles();
    initSuccessAnimations();
    initInteractiveElements();
    
    console.log('🎉 Maison Aurora Confirmation - JavaScript loaded successfully!');
});

/* ===== THEME FUNCTIONALITY ===== */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Smooth theme transition
        document.body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Visual feedback
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Update particles for new theme
        updateParticlesForTheme(newTheme);
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 400);
    });
    
    // Add accessibility
    addThemeAccessibility(themeToggle);
}

function addThemeAccessibility(themeToggle) {
    themeToggle.setAttribute('role', 'button');
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    themeToggle.setAttribute('tabindex', '0');
    
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

/* ===== CELEBRATION PARTICLES ===== */
function initCelebrationParticles() {
    const container = document.getElementById('celebration-particles');
    if (!container) return;
    
    // Create initial burst of celebration particles
    setTimeout(() => {
        createParticleBurst(container, 'success');
    }, 800);
    
    setTimeout(() => {
        createParticleBurst(container, 'gold');
    }, 1200);
    
    // Continue creating particles periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingParticle(container);
        }
    }, 2000);
}

function createParticleBurst(container, type) {
    const colors = {
        success: ['#27ae60', '#2ecc71', '#58d68d'],
        gold: ['#d4af37', '#f4d03f', '#f7dc6f']
    };
    
    const particleColors = colors[type];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createCelebrationParticle(container, particleColors);
        }, i * 50);
    }
}

function createCelebrationParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';
    
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 20;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${startX}px;
        top: ${startY}px;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 10px ${color}40;
    `;
    
    // Animation properties
    const duration = Math.random() * 3 + 2;
    const rotation = Math.random() * 360;
    const drift = (Math.random() - 0.5) * 200;
    
    particle.style.animation = `
        celebrationFloat ${duration}s ease-out forwards,
        celebrationRotate ${duration * 0.8}s linear infinite,
        celebrationFade ${duration}s ease-out forwards
    `;
    
    particle.style.setProperty('--drift', `${drift}px`);
    particle.style.setProperty('--rotation', `${rotation}deg`);
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 6 + 3;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const opacity = currentTheme === 'light' ? 0.6 : 0.8;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(212, 175, 55, ${opacity});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100%;
        pointer-events: none;
        animation: gentleFloat ${Math.random() * 8 + 6}s linear forwards;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 14000);
}

function updateParticlesForTheme(theme) {
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach(particle => {
        const opacity = theme === 'light' ? 0.6 : 0.8;
        particle.style.background = `rgba(212, 175, 55, ${opacity})`;
    });
}

/* ===== SUCCESS ANIMATIONS ===== */
function initSuccessAnimations() {
    // Animate success elements with delays
    const elements = [
        { selector: '.success-circle', delay: 0 },
        { selector: '.perfume-celebration', delay: 200 },
        { selector: '.confirmation-title', delay: 400 },
        { selector: '.confirmation-subtitle', delay: 600 },
        { selector: '.detail-card', delay: 800, stagger: 100 },
        { selector: '.confirmation-message', delay: 1200 },
        { selector: '.confirmation-actions', delay: 1400 }
    ];
    
    elements.forEach(({ selector, delay, stagger }) => {
        const els = document.querySelectorAll(selector);
        els.forEach((el, index) => {
            const elementDelay = delay + (stagger ? index * stagger : 0);
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
            }, elementDelay);
        });
    });
    
    // Special animation for checkmark
    setTimeout(() => {
        const checkmark = document.querySelector('.success-circle i');
        if (checkmark) {
            checkmark.style.animation += ', checkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    }, 800);
}

/* ===== INTERACTIVE ELEMENTS ===== */
function initInteractiveElements() {
    // Add hover effects to detail cards
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-glow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }, 150);
        });
    });
    
    // Add pulse effect to success circle
    const successCircle = document.querySelector('.success-circle');
    if (successCircle) {
        setInterval(() => {
            successCircle.style.animation += ', successPulse 1.5s ease-in-out';
        }, 5000);
    }
}

/* ===== RIPPLE EFFECT ===== */
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple && ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

/* ===== ADDITIONAL CSS ANIMATIONS ===== */
const confirmationAnimationStyles = `
    @keyframes celebrationFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(var(--drift, 0px)) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes celebrationRotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(var(--rotation, 360deg));
        }
    }
    
    @keyframes celebrationFade {
        0% {
            opacity: 1;
        }
        70% {
            opacity: 0.8;
        }
        100% {
            opacity: 0;
        }
    }
    
    @keyframes gentleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-50vh) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes checkPop {
        0% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .celebration-particle {
        animation-fill-mode: forwards;
    }
    
    .floating-particle {
        animation-fill-mode: forwards;
    }
`;

// Inject confirmation animation styles
const confirmationStyleSheet = document.createElement('style');
confirmationStyleSheet.textContent = confirmationAnimationStyles;
document.head.appendChild(confirmationStyleSheet);

/* ===== AUTO REDIRECT (OPTIONAL) ===== */
// Uncomment if you want auto-redirect after success
/*
setTimeout(() => {
    const continueButton = document.querySelector('.btn-primary');
    if (continueButton && confirm('¿Deseas continuar comprando?')) {
        window.location.href = continueButton.href;
    }
}, 10000); // 10 seconds
*/