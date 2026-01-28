// ==========================================
// VARIABLES GLOBALES
// ==========================================
let currentSlide = 0;
const totalSlides = 4;
let autoSlideInterval;
let currentTheme = localStorage.getItem('theme') || 'light';

// ==========================================
// TEMA OSCURO/CLARO
// ==========================================
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Theme toggle principal
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Theme toggle móvil (se inicializa en initNavigation)
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// ==========================================
// CARRUSEL
// ==========================================
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carousel = document.querySelector('.products-carousel');

    if (!track) return;

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Auto-slide
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch support
    addTouchSupport(carousel);

    // Iniciar
    updateCarousel();
    startAutoSlide();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');
    const products = document.querySelectorAll('.product-card-modern');

    if (!track) return;

    // Mover carrusel
    track.style.transform = `translateX(-${currentSlide * 25}%)`;

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    // Actualizar productos activos
    products.forEach((product, index) => {
        product.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    restartAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    restartAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    restartAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

function addTouchSupport(carousel) {
    if (!carousel) return;

    let startX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
}

// ==========================================
// NAVEGACIÓN
// ==========================================
function initNavigation() {
    // Scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.minimal-nav');
        if (nav) {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Smooth scroll para enlaces principales
    document.querySelectorAll('.nav-links a, .cta-minimal').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href') || '#collections';
            const section = document.querySelector(target);

            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FUNCIONALIDAD DEL MENÚ HAMBURGUESA
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');

    // Abrir menú móvil
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            openMobileNav();
        });
    }

    // Cerrar menú móvil
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => {
            closeMobileNav();
        });
    }

    // Cerrar con overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            closeMobileNav();
        });
    }

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });

    // Smooth scroll para enlaces móviles
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const section = document.querySelector(target);

            if (section) {
                closeMobileNav(); // Cerrar menú primero
                setTimeout(() => {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // Esperar a que se cierre el menú
            }
        });
    });

    // Theme toggle móvil
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

// Funciones para el menú móvil
function openMobileNav() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburgerBtn) hamburgerBtn.classList.add('active');
    if (mobileNav) mobileNav.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');

    // Prevenir scroll del body
    document.body.classList.add('nav-open');
}

function closeMobileNav() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');

    // Restaurar scroll del body
    document.body.classList.remove('nav-open');
}

// ==========================================
// MODAL DE ALERTA
// ==========================================
function showAlertModal() {
    const modal = document.getElementById('alertModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideAlertModal() {
    const modal = document.getElementById('alertModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function initModal() {
    // Cerrar modal de alerta con el botón X
    const closeBtn = document.getElementById('closeAlertModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideAlertModal);
    }

    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('alertModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideAlertModal();
            }
        });
    }

    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAlertModal();
        }
    });

    // Manejar el botón "Regístrate" del modal de alerta
    const registerBtn = document.querySelector('.register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Cambiar texto del botón temporalmente
            const originalText = registerBtn.textContent;
            registerBtn.textContent = 'Redirigiendo...';
            registerBtn.disabled = true;

            // Simular redirección o acción
            setTimeout(() => {
                hideAlertModal();
                showNotification('¡Redirigiendo al registro!');

                // Restaurar botón
                registerBtn.textContent = originalText;
                registerBtn.disabled = false;

                window.location.href = '/form';
            }, 1000);
        });
    }
}

// ==========================================
// PRODUCTOS
// ==========================================
function initProducts() {
    document.querySelectorAll('.add-to-cart-modern').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            showAlertModal();
        });
    });

    // Quick View
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const product = btn.closest('.product-card-modern');
            const name = product?.querySelector('.product-name-modern')?.textContent;
            showNotification(`Vista rápida: ${name}`);
        });
    });
}

// ==========================================
// ANIMACIONES
// ==========================================
function initAnimations() {
    // Intersection Observer para fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Aplicar a elementos
    document.querySelectorAll('.section-header-modern, .collection-card-modern, .product-card-modern, .hero-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Counter animation
    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
        counter.addEventListener('animateCounter', () => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 30;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (counter.textContent.match(/[^\d]/g) || []).join('');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (counter.textContent.match(/[^\d]/g) || []).join('');
                }
            }, 50);
        });
    });
}

// ==========================================
// NEWSLETTER
// ==========================================

function submitNewsletter() {
    const form = document.getElementById('newsletterForm');
    const email = document.getElementById('emailInput').value.trim();
    const button = document.getElementById('submitButton');

    // Validación
    if (!email || !email.includes('@') || email.length < 5) {
        alert('Por favor ingresa un email válido');
        document.getElementById('emailInput').focus();
        return;
    }

    // Animación de loading
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    // Enviar formulario
    setTimeout(() => {
        form.submit();
    }, 300);
}

// Permitir envío con Enter
document.getElementById('emailInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitNewsletter();
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; background: #34c759;
        color: white; padding: 15px 20px; border-radius: 10px; z-index: 10000;
        transform: translateX(100%); transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ==========================================
// UTILIDADES
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCarousel();
    initNavigation();
    initModal();
    initProducts();
    initAnimations();

    console.log('🚀 AURA Perfumería cargada');
});

// Cleanup
window.addEventListener('beforeunload', () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
});

// Resize handler
window.addEventListener('resize', debounce(() => {
    updateCarousel();
}, 250));