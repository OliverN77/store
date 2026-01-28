document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug log
    
    // Initialize theme first (before other elements)
    initThemePersistence();
    
    // Wait a bit before initializing theme toggle to ensure DOM is ready
    setTimeout(() => {
        initThemeToggle();
    }, 100);
    
    // Initialize form functionality
    initFormNavigation();
    
    // Create floating particles
    createFloatingParticles();
    
    // Add subtle animations to form elements
    animateFormElements();
    
    // Form validation and submission enhancements
    enhanceFormSubmission();
    
    // Add smooth transitions to inputs
    addInputTransitions();
});

// Update window load event for theme consistency
window.addEventListener('load', function() {
    console.log('Window loaded, ensuring theme consistency...'); // Debug log
    
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) {
        authContainer.style.transform = 'translateY(0) scale(1)';
        authContainer.style.opacity = '1';
    }
    
    // Ensure theme is applied correctly after full load
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Force theme toggle to match current theme
    setTimeout(() => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            console.log('Theme toggle found, current theme:', currentTheme); // Debug log
        }
    }, 200);
});

// Save theme state when leaving page
window.addEventListener('beforeunload', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    sessionStorage.setItem('currentTheme', currentTheme);
});

// ==========================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================

function initThemePersistence() {
    // Apply theme immediately to prevent flash
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Sync with landing page theme if available
    const landingTheme = sessionStorage.getItem('currentTheme');
    if (landingTheme && !localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', landingTheme);
        localStorage.setItem('theme', landingTheme);
    }
    
    // Save theme to session for landing page sync
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    sessionStorage.setItem('currentTheme', currentTheme);
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.warn('Theme toggle not found');
        return;
    }
    
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    
    // Remove any existing listeners to prevent conflicts
    const newToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newToggle, themeToggle);
    
    // Theme toggle click handler
    newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log(`Switching from ${currentTheme} to ${newTheme}`); // Debug log
        
        // Add transition class for smooth change
        document.body.style.transition = 'all 0.3s ease';
        
        // Set new theme immediately
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        sessionStorage.setItem('currentTheme', newTheme);
        
        // Add visual feedback
        newToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            newToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        // Animate theme toggle elements
        animateThemeChange(newTheme);
        
        // Force CSS re-evaluation
        html.style.display = 'none';
        html.offsetHeight; // Trigger reflow
        html.style.display = '';
    });
    
    // Add accessibility
    addThemeToggleAccessibility(newToggle);
}

function animateThemeChange(theme) {
    const track = document.querySelector('.toggle-track');
    const thumb = document.querySelector('.toggle-thumb');
    
    if (track) {
        // Add bounce effect to track
        track.style.transform = 'scale(1.05)';
        setTimeout(() => {
            track.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Add pulse effect to auth container
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) {
        authContainer.style.transform = 'scale(0.98)';
        setTimeout(() => {
            authContainer.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update particles for new theme
    updateParticlesForTheme(theme);
}

function updateParticlesForTheme(theme) {
    const particles = document.querySelectorAll('.particles div');
    particles.forEach(particle => {
        if (theme === 'dark') {
            const currentBg = particle.style.background;
            particle.style.background = currentBg.replace('rgba(212, 175, 55,', 'rgba(244, 208, 63,');
        } else {
            const currentBg = particle.style.background;
            particle.style.background = currentBg.replace('rgba(244, 208, 63,', 'rgba(212, 175, 55,');
        }
    });
}

// Enhanced keyboard accessibility for theme toggle
function addThemeToggleAccessibility(themeToggle) {
    themeToggle.setAttribute('role', 'button');
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    themeToggle.setAttribute('tabindex', '0');
    
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    themeToggle.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--accent)';
        this.style.outlineOffset = '2px';
    });
    
    themeToggle.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
}

// ==========================================
// FORM FUNCTIONALITY
// ==========================================

function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const color = theme === 'dark' ? '244, 208, 63' : '212, 175, 55';
    
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: rgba(${color}, ${Math.random() * 0.1 + 0.05});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 20 + 15}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

function animateFormElements() {
    const inputs = document.querySelectorAll('input');
    const buttons = document.querySelectorAll('.auth-btn');
    
    // Animate inputs with stagger effect
    inputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            input.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            input.style.opacity = '1';
            input.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
    
    // Animate buttons
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
    });
}

function addInputTransitions() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Add typing effects
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = 'var(--accent)';
                this.style.background = 'var(--background)';
            } else {
                this.style.borderColor = 'var(--input-border)';
                this.style.background = 'var(--input-bg)';
            }
        });
    });
}

function enhanceFormSubmission() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('.auth-btn');
            const originalText = submitBtn.innerHTML;
            
            // Add loading animation to entire form
            form.style.opacity = '0.7';
            form.style.pointerEvents = 'none';
            
            // Show loading state with smooth transition
            submitBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Procesando...</span>
                `;
                submitBtn.disabled = true;
                submitBtn.style.transform = 'scale(1)';
            }, 100);
            
            // Reset after 3 seconds if no redirect occurs
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.style.opacity = '1';
                form.style.pointerEvents = 'auto';
                submitBtn.style.transform = 'scale(1)';
            }, 3000);
        });
    });
}

function initFormNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const formWrappers = document.querySelectorAll('.form-wrapper');
    
    // Navigation between forms with smooth transitions
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetForm = button.getAttribute('data-form');
            const currentActive = document.querySelector('.form-wrapper.active');
            const targetFormElement = document.getElementById(targetForm + 'Form');
            
            // Don't proceed if clicking the same tab
            if (currentActive === targetFormElement) return;
            
            // Update navigation buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Smooth transition between forms
            if (currentActive) {
                // Fade out current form
                currentActive.style.transform = 'translateX(-20px)';
                currentActive.style.opacity = '0';
                
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    
                    // Prepare new form for animation
                    targetFormElement.style.transform = 'translateX(20px)';
                    targetFormElement.style.opacity = '0';
                    targetFormElement.classList.add('active');
                    
                    // Animate new form in
                    setTimeout(() => {
                        targetFormElement.style.transform = 'translateX(0)';
                        targetFormElement.style.opacity = '1';
                    }, 50);
                }, 200);
            } else {
                // No current form, just show target
                targetFormElement.classList.add('active');
            }
        });
    });
}

// Add enhanced floating particle animation and styles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Enhanced form transitions */
    .form-wrapper {
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        transform: translateX(0);
        opacity: 1;
    }
    
    .form-wrapper.transitioning-out {
        transform: translateX(-20px);
        opacity: 0;
    }
    
    .form-wrapper.transitioning-in {
        transform: translateX(20px);
        opacity: 0;
    }
    
    /* Input group transitions */
    .input-group {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        transform-origin: center;
    }
    
    .input-group:hover {
        transform: translateY(-1px);
    }
    
    /* Navigation button transitions */
    .nav-btn {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
        overflow: hidden;
    }
    
    .nav-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
        z-index: 1;
    }
    
    .nav-btn:hover::before {
        left: 100%;
    }
    
    .nav-btn.active {
        transform: translateY(-1px);
    }
    
    /* Enhanced button animations */
    .auth-btn {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
    }
    
    .auth-btn:hover {
        transform: translateY(-3px) scale(1.02);
    }
    
    .auth-btn:active {
        transform: translateY(-1px) scale(0.98);
    }
    
    /* Form header animations */
    .form-header h2 {
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    .form-wrapper.active .form-header h2 {
        transform: translateY(0);
        opacity: 1;
    }
    
    .form-wrapper:not(.active) .form-header h2 {
        transform: translateY(-10px);
        opacity: 0.7;
    }
    
    /* Staggered input animations */
    .auth-form .input-group:nth-child(1) { transition-delay: 0.1s; }
    .auth-form .input-group:nth-child(2) { transition-delay: 0.2s; }
    .auth-form .input-group:nth-child(3) { transition-delay: 0.3s; }
    .auth-form .input-group:nth-child(4) { transition-delay: 0.4s; }
    
    /* Micro-interactions */
    .remember-me:hover .checkmark {
        transform: scale(1.1);
        border-color: var(--accent);
    }
    
    .forgot-password:hover {
        transform: translateX(2px);
    }
    
    /* Loading state animations */
    .auth-btn[disabled] {
        cursor: not-allowed;
        opacity: 0.8;
    }
    
    .auth-form.loading {
        pointer-events: none;
    }
    
    .auth-form.loading .input-group {
        opacity: 0.5;
    }
    
    /* Smooth theme transitions */
    * {
        transition-property: background-color, border-color, color, box-shadow, background, transform;
        transition-duration: 0.3s;
        transition-timing-function: ease;
    }
    
    /* Override for specific elements that need different transitions */
    .toggle-thumb, .toggle-track, input, .auth-btn, .nav-btn, .form-wrapper {
        transition-property: all;
    }
`;
document.head.appendChild(style);

// Enhanced ripple effect
document.addEventListener('click', function(e) {
    if (e.target.matches('.auth-btn, .nav-btn') || e.target.closest('.auth-btn, .nav-btn')) {
        const button = e.target.closest('.auth-btn, .nav-btn') || e.target;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height) * 1.2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEnhanced 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 800);
    }
});

// Enhanced ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEnhanced {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Enhance tab navigation with keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && (e.target.matches('.nav-btn'))) {
        const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
        const currentIndex = navButtons.indexOf(e.target);
        
        if (e.shiftKey && currentIndex > 0) {
            e.preventDefault();
            navButtons[currentIndex - 1].focus();
        } else if (!e.shiftKey && currentIndex < navButtons.length - 1) {
            e.preventDefault();
            navButtons[currentIndex + 1].focus();
        }
    }
    
    // Allow Enter to switch tabs
    if (e.key === 'Enter' && e.target.matches('.nav-btn')) {
        e.target.click();
    }
});