// Innovative Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeHomePage();
});

function initializeHomePage() {
    // Only enhance home section if it exists
    const homeSection = document.querySelector('.s-home');
    if (!homeSection) return;
    
    // Create enhanced home page structure
    enhanceHomeContent();
    
    // Add floating geometric shapes
    addGeometricShapes();
    
    // Initialize typewriter effect
    initTypewriterEffect();
    
    // Add scroll indicator functionality
    addScrollIndicator();
    
    // Add interactive effects
    addHomeInteractiveEffects();
    
    // Initialize performance optimizations
    optimizeHomeAnimations();
}

function enhanceHomeContent() {
    const homeSection = document.querySelector('.s-home');
    const homeContent = homeSection.querySelector('.home-content');
    const originalH1 = homeContent.querySelector('h1');
    const originalP = homeContent.querySelector('p');
    
    if (!originalH1 || !originalP) return;
    
    // Extract the name and role information
    const name = originalH1.textContent.trim();
    const roleText = originalP.innerHTML;
    
    // Create new innovative structure
    const newHTML = `
        <h1>${name}</h1>
        <div class="home-subtitle">
            <span class="typewriter">Research Scholar @ IIT Dharwad</span>
        </div>
        <div class="role-tags">
            <span class="role-tag">🎓 Research Scholar</span>
            <span class="role-tag">💻 Lead Developer</span>
            <span class="role-tag">🔬 R Shiny Specialist</span>
            <span class="role-tag">🐍 Python Expert</span>
            <span class="role-tag">📊 Data Scientist</span>
        </div>
        <div class="action-buttons">
            <a href="#intro" class="btn-primary">Explore My Work</a>
            <a href="#contact" class="btn-secondary">Get In Touch</a>
        </div>
    `;
    
    homeContent.innerHTML = newHTML;
    
    // Add scroll indicator
    const scrollIndicatorHTML = `
        <div class="scroll-indicator">
            <div class="scroll-arrow" onclick="scrollToNext()"></div>
        </div>
    `;
    
    homeSection.insertAdjacentHTML('beforeend', scrollIndicatorHTML);
}

function addGeometricShapes() {
    const homeSection = document.querySelector('.s-home');
    
    // Create geometric shapes container
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'geometric-shapes';
    
    // Create floating shapes
    for (let i = 0; i < 4; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shapesContainer.appendChild(shape);
    }
    
    homeSection.appendChild(shapesContainer);
}

function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'Research Scholar @ IIT Dharwad',
        'Lead Developer & R Shiny Expert',
        'Data Science & AI Specialist',
        'Python & Clinical Data Expert'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeEffect() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typewriterElement.textContent = currentText;
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed = 50;
        }
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typewriter effect after initial animation
    setTimeout(() => {
        typewriterElement.style.width = 'auto';
        typewriterElement.style.animation = 'blink-caret 0.75s step-end infinite';
        typeEffect();
    }, 6000);
}

function addScrollIndicator() {
    // Smooth scroll functionality
    window.scrollToNext = function() {
        const nextSection = document.querySelector('#intro');
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Hide scroll indicator when scrolling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = window.pageYOffset > 100 ? '0' : '1';
        }
        
        // Clear previous timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Set new timeout
        scrollTimeout = setTimeout(() => {
            if (scrollIndicator && window.pageYOffset <= 100) {
                scrollIndicator.style.opacity = '1';
            }
        }, 150);
    }, { passive: true });
}

function addHomeInteractiveEffects() {
    // Enhanced button hover effects
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Role tag interactions
    document.querySelectorAll('.role-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Pause other animations temporarily
            document.querySelectorAll('.role-tag').forEach(otherTag => {
                if (otherTag !== this) {
                    otherTag.style.animationPlayState = 'paused';
                }
            });
        });
        
        tag.addEventListener('mouseleave', function() {
            // Resume animations
            document.querySelectorAll('.role-tag').forEach(otherTag => {
                otherTag.style.animationPlayState = 'running';
            });
        });
    });
    
    // Parallax effect for geometric shapes on mouse move
    document.addEventListener('mousemove', handleParallax);
}

function handleParallax(e) {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
    });
}

function createRipple(event, element) {
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
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple animation if not exists
    if (!document.querySelector('#home-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'home-ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function optimizeHomeAnimations() {
    // Use Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Home section is visible, start animations
                entry.target.classList.add('active');
            } else {
                // Home section is not visible, pause heavy animations
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });
    
    const homeSection = document.querySelector('.s-home');
    if (homeSection) {
        observer.observe(homeSection);
    }
    
    // Optimize animations based on device capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        // Disable heavy animations for users who prefer reduced motion
        document.body.classList.add('reduced-motion');
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            // Handle responsive adjustments
            adjustForScreenSize();
        }, 250);
    });
}

function adjustForScreenSize() {
    const homeContent = document.querySelector('.home-content');
    const shapes = document.querySelectorAll('.shape');
    
    if (window.innerWidth <= 768) {
        // Mobile optimizations
        shapes.forEach(shape => {
            shape.style.opacity = '0.3';
        });
    } else {
        // Desktop optimizations
        shapes.forEach(shape => {
            shape.style.opacity = '';
        });
    }
}

// Initialize accessibility features
function enhanceAccessibility() {
    // Add keyboard navigation for interactive elements
    document.querySelectorAll('.btn-primary, .btn-secondary, .scroll-arrow').forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add ARIA labels
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.setAttribute('aria-label', 'Scroll to next section');
        scrollArrow.setAttribute('role', 'button');
    }
    
    // Add focus management
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('focus', () => {
            button.style.outline = '3px solid rgba(102, 126, 234, 0.5)';
            button.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', () => {
            button.style.outline = '';
            button.style.outlineOffset = '';
        });
    });
}

// Initialize everything
setTimeout(() => {
    enhanceAccessibility();
    adjustForScreenSize();
}, 500);