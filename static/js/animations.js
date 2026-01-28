document.addEventListener('DOMContentLoaded', function() {
  // ===== UTILITY FUNCTIONS =====
  
  // Debounce function to limit function calls
  function debounce(func, wait) {
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
  
  // Check if element is in viewport
  function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - offset) &&
      rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * offset
    );
  }
  
  // Lerp (Linear Interpolation) for smooth animations
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  // ===== SCROLL PROGRESS =====
  
  // Create scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);
  
  // ===== PARALLAX EFFECTS =====
  
  // Add parallax background to header
  const header = document.querySelector('header');
  if (header) {
    // Create parallax background
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';
    parallaxBg.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%;
      background: radial-gradient(circle at 20% 30%, rgba(142, 68, 173, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(243, 156, 18, 0.4) 0%, transparent 50%);
      transform: translateY(0);
      z-index: 0;
      opacity: 0.7;
    `;
    header.prepend(parallaxBg);
    
    // Add floating particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    `;
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1});
        top: ${posY}%;
        left: ${posX}%;
        animation: float ${duration}s ease-in-out ${delay}s infinite alternate;
      `;
      
      particlesContainer.appendChild(particle);
    }
    
    header.prepend(particlesContainer);
  }
  
  // ===== SCROLL ANIMATIONS =====
  
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll('.mision, .vision, .objetivo, .product-card, .contact-form, h2');
  
  // Add initial classes
  animatedElements.forEach(element => {
    element.classList.add('animate-on-scroll');
    if (!isInViewport(element, 0.1)) {
      element.classList.add('animate-hidden');
    }
  });
    
  // Smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Add active class to the clicked nav item
        document.querySelectorAll('.nav__nav a').forEach(navLink => {
          navLink.classList.remove('active-nav');
        });
        this.classList.add('active-nav');
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== CAROUSEL FUNCTIONALITY =====
  
  // Get carousel elements
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const productGrid = document.querySelector('.product-grid');
  const productCards = document.querySelectorAll('.product-card');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  // Initialize variables
  let currentIndex = 0;
  let isScrolling = false;
  let hasViewedAllProducts = false;
  
  // Simplified carousel initialization
  function initCarousel() {
    if (!carouselContainer) return;
    
    // Set initial active state
    setActiveCard(currentIndex);
    
    // Only keep the wheel event for scrolling functionality
    if (carouselWrapper) {
      carouselWrapper.addEventListener('wheel', function(e) {
        // If user has seen all products and is trying to scroll down, allow natural scroll
        if (hasViewedAllProducts && e.deltaY > 0) {
          return true;
        }
        
        // Otherwise prevent default and handle carousel navigation
        e.preventDefault();
        
        if (isScrolling) return;
        
        setTimeout(() => {
          if (e.deltaY > 0) {
            nextSlide();
            // If this was the last slide, mark as viewed all products
            if (currentIndex === productCards.length - 1) {
              hasViewedAllProducts = true;
              carouselContainer.classList.add('all-viewed');
            }
          } else {
            prevSlide();
          }
        }, 50);
      }, { passive: false });
    }
    
    // Simple click handlers for navigation buttons
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);
  }
  
  // Simplified active card setter
  function setActiveCard(index) {
    productCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
  
  // Simplified slide navigation
  function goToSlide(index) {
    if (isScrolling || !productGrid) return;
    
    isScrolling = true;
    currentIndex = Math.max(0, Math.min(index, productCards.length - 1));
    
    // Calculate the scroll position
    const cardWidth = productCards[0].offsetWidth;
    const scrollPosition = cardWidth * currentIndex;
    
    // Simple transform without fancy animations
    productGrid.style.transition = 'transform 0.3s ease';
    productGrid.style.transform = `translateX(-${scrollPosition}px)`;
    
    // Set active card
    setActiveCard(currentIndex);
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      isScrolling = false;
      
      // Check if user has viewed the last slide
      if (currentIndex === productCards.length - 1) {
        hasViewedAllProducts = true;
        carouselContainer.classList.add('all-viewed');
      }
    }, 400);
  }
  
  // Simple next slide function
  function nextSlide() {
    if (!productGrid || isScrolling) return;
    
    if (currentIndex < productCards.length - 1) {
      goToSlide(currentIndex + 1);
    }
  }
  
  // Simple previous slide function
  function prevSlide() {
    if (!productGrid || isScrolling) return;
    
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }
  
  // Initialize carousel if it exists
  if (carouselContainer) {
    initCarousel();
  }
  
  // ===== SCROLL EVENTS =====
  
  // Variables for scroll handling
  let lastScrollTop = 0;
  let scrollTimeout;
  let scrollDirection = 0;
  let ticking = false;
  
  // Handle scroll events
  window.addEventListener('scroll', function() {
    // Update progress bar
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
    
    // Request animation frame for performance
    if (!ticking) {
      window.requestAnimationFrame(function() {
        // Parallax effect for header
        if (header && window.scrollY < window.innerHeight) {
          const parallaxBg = header.querySelector('.parallax-bg');
          if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
            parallaxBg.style.opacity = Math.max(0.1, 1 - (window.scrollY / window.innerHeight) * 1.5);
          }
        }
        
        // Animate elements when they enter viewport
        animatedElements.forEach(element => {
          if (isInViewport(element, 0.1)) {
            element.classList.remove('animate-hidden');
            element.classList.add('animate-visible');
            
            // Special animation for titles
            if (element.tagName.toLowerCase() === 'h2') {
              const inner = element.querySelector('.title-inner');
              if (inner) {
                inner.style.transform = 'translateY(0)';
              }
            }
          }
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  }, { passive: true });
  
  // ===== INTERSECTION OBSERVER =====
  
  // Create observers for different animation types
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        slideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Apply fade animations to specific elements
  document.querySelectorAll('.mision, .vision, .objetivo').forEach(el => {
    fadeObserver.observe(el);
  });
  
  // Apply slide animations to other elements
  document.querySelectorAll('.contact-form, .auth-buttons, .perfume-bottle').forEach(el => {
    slideObserver.observe(el);
  });
  
  // ===== FORM ANIMATIONS =====
  
  // Animate form inputs on focus
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('input-focused');
    });
    
    // Remove focus animation
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('input-focused');
      }
    });
    
    // Check initial state (for form with saved values)
    if (input.value !== '') {
      input.parentElement.classList.add('input-focused');
    }
  });
  
  // ===== INITIALIZE =====
  
  // Add CSS for new animations
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    .animate-on-scroll {
      transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1), 
                  transform 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    
    .animate-hidden {
      opacity: 0;
      transform: translateY(50px);
    }
    
    .animate-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .fade-in {
      animation: fadeIn 1.2s cubic-bezier(0.5, 0, 0, 1) forwards;
    }
    
    .slide-in {
      animation: slideIn 1.2s cubic-bezier(0.5, 0, 0, 1) forwards;
    }
    
    .input-focused label {
      top: -20px !important;
      font-size: 0.9rem !important;
      color: var(--secondary) !important;
      font-weight: 500 !important;
    }
    
    .active-nav {
      color: var(--accent) !important;
    }
    
    .active-nav::after {
      width: 100% !important;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Staggered animation for about section */
    .mision, .vision, .objetivo {
      opacity: 0;
      transform: translateY(50px);
    }
    
    .mision.fade-in {
      animation-delay: 0.1s;
    }
    
    .vision.fade-in {
      animation-delay: 0.3s;
    }
    
    .objetivo.fade-in {
      animation-delay: 0.5s;
    }
    
    /* Highlight current section in navigation */
    .nav__nav a {
      transition: color 0.3s ease, transform 0.3s ease;
    }
    
    .nav__nav a:hover {
      transform: translateY(-3px);
    }
    
    /* Floating animation for perfume bottle */
    .perfume-bottle {
      animation: float 6s ease-in-out infinite;
    }
  `;
  document.head.appendChild(styleElement);
  
  // Add scroll-triggered animations to section titles
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to highlight current section in navigation
        const id = entry.target.getAttribute('id');
        if (id) {
          document.querySelectorAll('.nav__nav a').forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active-nav');
            }
          });
        }
      }
    });
  }, { threshold: 0.3 });
  
  // Observe all sections
  document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Add initial active state to navigation based on current scroll position
  function setInitialActiveNav() {
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav__nav a').forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active-nav');
      }
    });
  }
  
  // Set initial active nav item
  setInitialActiveNav();

  // Add particle background to products section
  function addProductParticles() {
    const productSection = document.querySelector('#productos');
    
    if (productSection) {
      // Add floating particles
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'products-particles-container';
      particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
        pointer-events: none;
      `;
      
      // Create luxury-themed particles with brand colors
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 2; // Smaller size for elegance
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 25 + 15; // Slower movement for luxury feel
        const delay = Math.random() * 5;
        
        // Determine particle type with 70% chance for circles, 30% for premium shapes
        const particleType = Math.random();
        
        // Choose between different particle types for luxury aesthetic
        if (particleType < 0.7) {
          // Circular particles with gradient background
          particle.className = 'product-particle';
          particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: ${Math.random() > 0.5 ? 
              `rgba(142, 68, 173, ${Math.random() * 0.2 + 0.1})` : 
              `rgba(243, 156, 18, ${Math.random() * 0.2 + 0.1})`};
            top: ${posY}%;
            left: ${posX}%;
            filter: blur(${Math.random() > 0.7 ? Math.random() * 1.5 : 0}px);
            animation: floatProduct ${duration}s ease-in-out ${delay}s infinite alternate;
            opacity: ${Math.random() * 0.4 + 0.2};
          `;
        } else {
          // Premium diamond shape for luxury feel
          const shapeSize = size * 1.5;
          particle.className = 'product-particle-diamond';
          particle.style.cssText = `
            position: absolute;
            width: ${shapeSize}px;
            height: ${shapeSize}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05});
            top: ${posY}%;
            left: ${posX}%;
            transform: rotate(45deg);
            animation: floatProductSpecial ${duration}s ease-in-out ${delay}s infinite alternate;
            opacity: ${Math.random() * 0.3 + 0.1};
          `;
        }
        
        particlesContainer.appendChild(particle);
      }
      
      // Add the container to the products section
      productSection.style.position = 'relative';
      productSection.prepend(particlesContainer);
      
      // Add animation styles
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        @keyframes floatProduct {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(${Math.random() * -30 - 10}px) rotate(${Math.random() * 180}deg); }
          100% { transform: translateY(${Math.random() * 20}px) rotate(${Math.random() * 360}deg); }
        }
        
        @keyframes floatProductSpecial {
          0% { transform: translateY(0) rotate(45deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(135deg); }
          66% { transform: translateY(10px) translateX(-15px) rotate(225deg); }
          100% { transform: translateY(-5px) translateX(5px) rotate(405deg); }
        }
      `;
      document.head.appendChild(styleElement);
    }
  }

  // Call the function to add particles to products section
  addProductParticles();
});