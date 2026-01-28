document.addEventListener('DOMContentLoaded', function() {
    initThemePersistence();
    initThemeToggle();
});

function initThemePersistence() {
    // Apply theme immediately to prevent flash
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Sync with other pages
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    sessionStorage.setItem('currentTheme', currentTheme);
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.warn('Theme toggle not found');
        return;
    }
    
    const html = document.documentElement;

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    
    // Remove any existing listeners to prevent conflicts
    const newToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newToggle, themeToggle);
    
    // Theme toggle click handler
    newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log(`Switching theme from ${currentTheme} to ${newTheme}`); // Debug
        
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
        
        // Force CSS re-evaluation if needed
        html.style.display = 'none';
        html.offsetHeight; // Trigger reflow
        html.style.display = '';
    });
    
    // Add accessibility
    addThemeToggleAccessibility(newToggle);
}

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

// Save theme state when leaving page
window.addEventListener('beforeunload', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    sessionStorage.setItem('currentTheme', currentTheme);
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';