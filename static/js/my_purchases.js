// ===== TOGGLE THEME =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ===== TOGGLE ORDER DETAILS =====
function toggleOrderDetails(orderId) {
    const detailsElement = document.getElementById(`details-${orderId}`);
    const button = event.currentTarget;
    const icon = button.querySelector('i');
    const span = button.querySelector('span');
    
    if (detailsElement.style.display === 'none' || detailsElement.style.display === '') {
        detailsElement.style.display = 'block';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        span.textContent = 'Ocultar detalles';
    } else {
        detailsElement.style.display = 'none';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        span.textContent = 'Ver detalles';
    }
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in viewport
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
    
    // Observe all order cards
    document.querySelectorAll('.order-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add floating particles to background
    const body = document.body;
    for (let i = 0; i < 20; i++) {
        createParticle(body);
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 5px and 15px
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration and delay
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    container.appendChild(particle);
}