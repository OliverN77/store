/* JavaScript for animations */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all cart functionalities
    initTheme();
    initCartAnimations();
    initCartInteractions();
    initFloatingParticles();
    initScrollEffects();
    
    console.log('🛒 Maison Aurora Cart - JavaScript loaded successfully!');
});

/* ===== THEME FUNCTIONALITY ===== */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.warn('Theme toggle not found');
        return;
    }
    
    const html = document.documentElement;
    
    // Apply saved theme with smooth transition
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Remove any existing listeners
    const newToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newToggle, themeToggle);
    
    // Enhanced theme toggle with smooth transitions
    newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log(`🎨 Switching theme from ${currentTheme} to ${newTheme}`);
        
        // Pre-transition effects
        document.body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add theme switching class for extra smooth transition
        document.body.classList.add('theme-switching');
        
        // Smooth scale animation on toggle
        newToggle.style.transform = 'scale(0.9)';
        newToggle.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            // Apply new theme
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            sessionStorage.setItem('currentTheme', newTheme);
            
            // Smooth particles transition
            updateParticlesForThemeSmooth(newTheme);
            
            // Reset toggle scale with bounce
            newToggle.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                newToggle.style.transform = 'scale(1)';
            }, 150);
            
        }, 100);
        
        // Enhanced ripple effect
        createEnhancedRippleEffect(newToggle, e);
        
        // Remove theme switching class
        setTimeout(() => {
            document.body.classList.remove('theme-switching');
            document.body.style.transition = '';
            newToggle.style.transition = '';
        }, 400);
    });
    
    // Add smooth accessibility transitions
    addSmoothThemeToggleAccessibility(newToggle);
}

function addSmoothThemeToggleAccessibility(themeToggle) {
    themeToggle.setAttribute('role', 'button');
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    themeToggle.setAttribute('tabindex', '0');
    
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Add smooth scale animation for keyboard users
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.click();
                this.style.transform = 'scale(1)';
            }, 100);
        }
    });
    
    themeToggle.addEventListener('focus', function() {
        this.style.outline = 'none';
        this.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.3)';
        this.style.transition = 'box-shadow 0.3s ease';
    });
    
    themeToggle.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
}

/* ===== CART ANIMATIONS ===== */
function initCartAnimations() {
    // Smooth stagger animation with better timing
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add smooth entrance animations
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Add gentle bounce effect for cart items
                    if (entry.target.classList.contains('cart-item')) {
                        setTimeout(() => {
                            entry.target.style.animation += ', gentleBounce 0.6s ease-out';
                        }, 300);
                    }
                    
                    // Add floating effect for summary
                    if (entry.target.classList.contains('cart-summary')) {
                        setTimeout(() => {
                            entry.target.style.animation += ', gentleFloat 3s ease-in-out infinite';
                        }, 500);
                    }
                    
                }, index * 150); // Stagger delay
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' // Trigger earlier
    });
    
    // Observe elements with smooth animation
    document.querySelectorAll('.cart-item, .cart-summary, .empty-cart-content').forEach(item => {
        observer.observe(item);
    });
}

/* ===== CART INTERACTIONS ===== */
function initCartInteractions() {
    // Remove buttons with confirmation
    initRemoveButtons();
    
    // Clear cart button with confirmation
    initClearCartButton();
    
    // Quantity updates (if you want to add quantity controls)
    initQuantityControls();
    
    // Total calculation updates
    updateCartTotals();
}

function initRemoveButtons() {
    const removeButtons = document.querySelectorAll('.btn-remove');
    
    removeButtons.forEach(button => {
        // Add smooth hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cartItem = this.closest('.cart-item');
            const productName = cartItem.querySelector('.item-name').textContent;
            
            // Add smooth click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show confirmation with smooth animation
            showRemoveConfirmationSmooth(productName, () => {
                // Enhanced removal animation
                animateItemRemovalSmooth(cartItem);
                
                // Redirect after smooth animation
                setTimeout(() => {
                    window.location.href = this.href;
                }, 800);
            });
        });
    });
}

function initClearCartButton() {
    const clearButton = document.querySelector('a[href*="empty"]');
    
    if (clearButton) {
        // Add smooth hover effects
        clearButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        clearButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        clearButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            showClearCartConfirmationSmooth(() => {
                // Smooth cascade removal animation
                const cartItems = document.querySelectorAll('.cart-item');
                cartItems.forEach((item, index) => {
                    setTimeout(() => {
                        animateItemRemovalSmooth(item);
                    }, index * 150); // Smoother cascade
                });
                
                // Redirect after all animations with buffer
                setTimeout(() => {
                    window.location.href = this.href;
                }, cartItems.length * 150 + 800);
            });
        });
    }
}

function initQuantityControls() {
    // If you want to add +/- quantity controls later
    const quantityValues = document.querySelectorAll('.quantity-value');
    
    quantityValues.forEach(qty => {
        // Add click handler for future quantity editing
        qty.addEventListener('click', function() {
            // Future: show quantity editor
            console.log('Quantity editor could go here');
        });
    });
}

/* ===== CONFIRMATION MODALS ===== */
function showRemoveConfirmationSmooth(productName, onConfirm) {
    const modal = createModalSmooth(
        '¿Eliminar producto?',
        `¿Estás seguro de que deseas eliminar "${productName}" del carrito?`,
        [
            {
                text: 'Eliminar',
                class: 'btn-danger',
                icon: 'fas fa-trash',
                action: onConfirm
            },
            {
                text: 'Cancelar',
                class: 'btn-secondary',
                icon: 'fas fa-times',
                action: () => {}
            }
        ]
    );
    
    showModalSmooth(modal);
}

function showClearCartConfirmationSmooth(onConfirm) {
    const modal = createModalSmooth(
        '¿Vaciar carrito?',
        '¿Estás seguro de que deseas eliminar todos los productos del carrito? Esta acción no se puede deshacer.',
        [
            {
                text: 'Vaciar carrito',
                class: 'btn-danger',
                icon: 'fas fa-trash-alt',
                action: onConfirm
            },
            {
                text: 'Cancelar',
                class: 'btn-secondary',
                icon: 'fas fa-times',
                action: () => {}
            }
        ]
    );
    
    showModalSmooth(modal);
}

function createModalSmooth(title, message, buttons) {
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-icon">
                    <div class="perfume-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9 2V4H7C6.45 4 6 4.45 6 5S6.45 6 7 6H17C17.55 6 18 5.55 18 5S17.55 4 17 4H15V2H9ZM8 7V9H16V7L18 9V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V9L8 7ZM10 12V18H14V12H10Z"/>
                        </svg>
                    </div>
                </div>
                <h3>${title}</h3>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-actions">
                ${buttons.map(btn => `
                    <button class="modal-btn ${btn.class}" data-action="${btn.text}">
                        <i class="${btn.icon}"></i>
                        <span>${btn.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add smooth interactions to buttons
    buttons.forEach(btn => {
        const buttonEl = modal.querySelector(`[data-action="${btn.text}"]`);
        
        // Smooth hover effects
        buttonEl.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        buttonEl.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        buttonEl.addEventListener('click', () => {
            // Smooth click animation
            buttonEl.style.transform = 'scale(0.95)';
            setTimeout(() => {
                hideModalSmooth(modal);
                btn.action();
            }, 150);
        });
    });
    
    // Smooth backdrop close
    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
        hideModalSmooth(modal);
    });
    
    return modal;
}

function showModalSmooth(modal) {
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Smooth entrance animation
    modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        modal.classList.add('active');
        
        // Add gentle bounce to modal content
        const content = modal.querySelector('.modal-content');
        content.style.animation = 'gentleBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 10);
}

function hideModalSmooth(modal) {
    const content = modal.querySelector('.modal-content');
    
    // Smooth exit animation
    content.style.transform = 'translate(-50%, -50%) scale(0.9)';
    content.style.opacity = '0';
    content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = '';
    }, 300);
}

/* ===== ANIMATIONS ===== */
function animateItemRemoval(cartItem) {
    cartItem.style.transform = 'translateX(-100%)';
    cartItem.style.opacity = '0';
    cartItem.style.height = '0';
    cartItem.style.padding = '0';
    cartItem.style.margin = '0';
    
    // Update totals after animation
    setTimeout(() => {
        updateCartTotals();
    }, 300);
}

function animateItemRemovalSmooth(cartItem) {
    // Multi-stage smooth removal animation
    cartItem.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Stage 1: Fade and scale
    cartItem.style.opacity = '0.7';
    cartItem.style.transform = 'scale(0.98) rotateX(10deg)';
    
    setTimeout(() => {
        // Stage 2: Slide out
        cartItem.style.transform = 'translateX(-100%) scale(0.8)';
        cartItem.style.opacity = '0';
    }, 200);
    
    setTimeout(() => {
        // Stage 3: Collapse height
        cartItem.style.height = '0';
        cartItem.style.padding = '0';
        cartItem.style.margin = '0';
        cartItem.style.border = 'none';
    }, 500);
    
    // Update totals with smooth transition
    setTimeout(() => {
        updateCartTotalsSmooth();
    }, 400);
}

function updateCartTotals() {
    // Recalculate totals if needed
    const cartItems = document.querySelectorAll('.cart-item:not([style*="height: 0"])');
    const totalItems = cartItems.length;
    
    // Update item count if element exists
    const itemCountEl = document.querySelector('.summary-value');
    if (itemCountEl && itemCountEl.textContent.includes('artículo')) {
        itemCountEl.textContent = `${totalItems} artículo${totalItems !== 1 ? 's' : ''}`;
    }
}

function updateCartTotalsSmooth() {
    const cartItems = document.querySelectorAll('.cart-item:not([style*="height: 0"])');
    const totalItems = cartItems.length;
    
    // Smooth update of item count
    const itemCountEl = document.querySelector('.summary-value');
    if (itemCountEl && itemCountEl.textContent.includes('artículo')) {
        itemCountEl.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        itemCountEl.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            itemCountEl.textContent = `${totalItems} artículo${totalItems !== 1 ? 's' : ''}`;
            itemCountEl.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Pulse animation for total value
    const totalValue = document.querySelector('.total-value');
    if (totalValue) {
        totalValue.style.animation = 'gentlePulse 0.6s ease-out';
    }
}

/* ===== FLOATING PARTICLES ===== */
function initFloatingParticles() {
    const body = document.body;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particleContainer';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    body.appendChild(particleContainer);
    
    // Create initial particles
    for (let i = 0; i < 12; i++) {
        createParticle(particleContainer);
    }
    
    // Recreate particles periodically
    setInterval(() => {
        if (particleContainer.children.length < 12) {
            createParticle(particleContainer);
        }
    }, 4000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 4px and 10px
    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${100 + Math.random() * 20}%`;
    
    // Set particle style based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        particle.style.background = 'rgba(212, 175, 55, 0.08)';
    } else {
        particle.style.background = 'rgba(212, 175, 55, 0.12)';
    }
    
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.pointerEvents = 'none';
    
    // Random animation duration and delay
    const duration = Math.random() * 25 + 20;
    const delay = Math.random() * 5;
    particle.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

function updateParticlesForTheme(theme) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (theme === 'light') {
            particle.style.background = 'rgba(212, 175, 55, 0.08)';
        } else {
            particle.style.background = 'rgba(212, 175, 55, 0.12)';
        }
    });
}

function updateParticlesForThemeSmooth(theme) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.transition = 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
            
            if (theme === 'light') {
                particle.style.background = 'rgba(212, 175, 55, 0.08)';
            } else {
                particle.style.background = 'rgba(212, 175, 55, 0.12)';
            }
        }, index * 50); // Stagger the particle updates
    });
}

/* ===== SCROLL EFFECTS ===== */
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax effect on particles
        const particleContainer = document.getElementById('particleContainer');
        if (particleContainer) {
            particleContainer.style.transform = `translateY(${rate * 0.1}px)`;
        }
        
        // Header opacity effect
        const header = document.querySelector('.main-header');
        if (header) {
            const opacity = Math.max(0.8, 1 - scrolled / 400);
            header.style.opacity = opacity;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
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
        background: rgba(212, 175, 55, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple && ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

/* ===== SAVE THEME STATE ===== */
// Save theme state when leaving page
window.addEventListener('beforeunload', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    sessionStorage.setItem('currentTheme', currentTheme);
});

// Apply theme immediately on load to prevent flash
(function() {
    const savedTheme = localStorage.getItem('theme') || 
                     sessionStorage.getItem('currentTheme') || 
                     'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

/* ===== ADDITIONAL CSS ANIMATIONS ===== */
const additionalStyles = `
    /* Cart-specific animations */
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
        }
        50% {
            transform: translateY(-100vh) rotate(180deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Modal styles */
    .cart-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .cart-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    }
    
    .cart-modal .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        backdrop-filter: blur(20px);
        transition: transform 0.3s ease;
    }
    
    .cart-modal.active .modal-content {
        transform: translate(-50%, -50%) scale(1);
    }
    
    .modal-header {
        text-align: center;
        margin-bottom: 1.5rem;
    }
    
    .modal-header .perfume-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--accent), var(--accent-light));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        box-shadow: var(--shadow-glow);
    }
    
    .modal-header .perfume-icon svg {
        width: 25px;
        height: 25px;
        fill: white;
    }
    
    .modal-header h3 {
        font-family: 'Playfair Display', serif;
        color: var(--text-primary);
        margin: 0;
    }
    
    .modal-body p {
        color: var(--text-secondary);
        text-align: center;
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    .modal-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.5rem;
        border: 1px solid var(--card-border);
        border-radius: 50px;
        background: transparent;
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .modal-btn.btn-danger {
        border-color: #e74c3c;
        color: #e74c3c;
    }
    
    .modal-btn.btn-danger:hover {
        background: #e74c3c;
        color: white;
    }
    
    .modal-btn.btn-secondary:hover {
        background: var(--surface);
        border-color: var(--accent);
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

/* ===== ADDITIONAL SMOOTH ANIMATIONS CSS ===== */
const smoothAnimationStyles = `
    /* Enhanced animations */
    @keyframes smoothRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(2);
            opacity: 0.8;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes gentlePulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.03);
            opacity: 0.95;
        }
    }
    
    @keyframes gentleBounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        40%, 43% {
            transform: translate(-50%, -50%) scale(1.02);
        }
        70% {
            transform: translate(-50%, -50%) scale(1.01);
        }
    }
    
    @keyframes gentleFloat {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }
    
    /* Theme switching smooth transition */
    .theme-switching * {
        transition-duration: 0.4s !important;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* Smooth focus transitions */
    *:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
        transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

// Inject smooth animation styles
const smoothStyleSheet = document.createElement('style');
smoothStyleSheet.textContent = smoothAnimationStyles;
document.head.appendChild(smoothStyleSheet);