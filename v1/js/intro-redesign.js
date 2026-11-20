// Introduction Section Redesign JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeIntroSection();
});

function initializeIntroSection() {
    const introSection = document.querySelector('#intro');
    if (!introSection) return;
    
    // Redesign the introduction content
    redesignIntroContent();
    
    // Initialize animations
    initIntroAnimations();
    
    // Add interactive effects
    addIntroInteractiveEffects();
    
    // Add counter animations
    animateCounters();
    
    // Enhance accessibility
    enhanceIntroAccessibility();
}

function redesignIntroContent() {
    const introSection = document.querySelector('#intro');
    const inner = introSection.querySelector('.inner');
    
    if (!inner) return;
    
    // Create the new modern introduction content
    const newHTML = `
        <div class="intro-container">
            <div class="intro-hero-card fade-in-up">
                <div class="intro-header">
                    <h1>About Me</h1>
                    <p class="intro-tagline">
                        Bridging the gap between cutting-edge research and real-world applications through innovative data science solutions
                    </p>
                </div>
                
            </div>
            
            <div class="intro-content-grid">
                <div class="about-card fade-in-up" style="animation-delay: 0.6s">
                    <h3>
                        <i class="fas fa-graduation-cap icon"></i>
                        Research & Innovation
                    </h3>
                    <p>
                        As a Research Scholar at IIT Dharwad, I'm pioneering advancements in deep learning applications. My research focuses on developing novel methodologies that bridge theoretical concepts with practical industry solutions.
                    </p>
                </div>
                
                <div class="expertise-card fade-in-up" style="animation-delay: 0.7s">
                    <h3>
                        <i class="fas fa-code icon"></i>
                        Core Expertise
                    </h3>
                    <ul class="expertise-list">
                        <li class="expertise-item">
                            <i class="fas fa-check-circle expertise-icon"></i>
                            <span class="expertise-text">Advanced R Shiny Application Development</span>
                        </li>
                        <li class="expertise-item">
                            <i class="fas fa-check-circle expertise-icon"></i>
                            <span class="expertise-text">Clinical Data Management & CDISC Standards</span>
                        </li>
                        <li class="expertise-item">
                            <i class="fas fa-check-circle expertise-icon"></i>
                            <span class="expertise-text">Python Development & Machine Learning</span>
                        </li>
                        <li class="expertise-item">
                            <i class="fas fa-check-circle expertise-icon"></i>
                            <span class="expertise-text">Production-Scale Deployment & DevOps</span>
                        </li>
                        <li class="expertise-item">
                            <i class="fas fa-check-circle expertise-icon"></i>
                            <span class="expertise-text">API Development & System Integration</span>
                        </li>
                        <li class="expertise-item">
                            <i class="fas fa-check-circle expertise-icon"></i>
                            <span class="expertise-text">Statistical Analysis & Data Visualization</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="intro-cta fade-in-up" style="animation-delay: 0.8s">
                <p>
                    Ready to transform your data challenges into innovative solutions? 
                    Let's collaborate on your next breakthrough project.
                </p>
                <div class="cta-buttons">
                    <a href="#projects" class="btn-primary-intro">View My Work</a>
                    <a href="#contact" class="btn-secondary-intro">Start a Conversation</a>
                </div>
            </div>
        </div>
    `;
    
    inner.innerHTML = newHTML;
}

function initIntroAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger counter animation when stats section comes into view
                if (entry.target.classList.contains('intro-hero-card')) {
                    setTimeout(() => {
                        animateCounters();
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    setTimeout(() => {
        document.querySelectorAll('#intro .fade-in-up').forEach(element => {
            observer.observe(element);
        });
    }, 100);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                
                // Add + symbol for percentage
                if (target === 100) {
                    counter.textContent = target + '%';
                } else if (target > 10) {
                    counter.textContent = target + '+';
                }
            }
        };
        
        // Start animation only if element is visible
        if (counter.closest('.animate')) {
            updateCounter();
        }
    });
}

function addIntroInteractiveEffects() {
    // Enhanced button interactions
    document.querySelectorAll('.btn-primary-intro, .btn-secondary-intro').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createIntroRipple(e, this);
        });
    });
    
    // Expertise item hover effects
    document.querySelectorAll('.expertise-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.background = 'rgba(102, 126, 234, 0.08)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
        });
    });
    
    // Card tilt effect on mouse move
    document.querySelectorAll('.about-card, .expertise-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Smooth scroll for CTA buttons
    document.querySelectorAll('.btn-primary-intro[href^="#"], .btn-secondary-intro[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function createIntroRipple(event, element) {
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
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: introRipple 0.6s linear;
        pointer-events: none;
        z-index: 100;
    `;
    
    // Add ripple animation if not exists
    if (!document.querySelector('#intro-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'intro-ripple-style';
        style.textContent = `
            @keyframes introRipple {
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

function enhanceIntroAccessibility() {
    // Add ARIA labels for interactive elements
    document.querySelectorAll('.stat-item').forEach((item, index) => {
        const number = item.querySelector('.stat-number').textContent;
        const label = item.querySelector('.stat-label').textContent;
        item.setAttribute('aria-label', `${number} ${label}`);
        item.setAttribute('role', 'img');
    });
    
    // Add keyboard navigation for buttons
    document.querySelectorAll('.btn-primary-intro, .btn-secondary-intro').forEach(button => {
        button.setAttribute('tabindex', '0');
        
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Add focus management
    document.querySelectorAll('.btn-primary-intro, .btn-secondary-intro').forEach(button => {
        button.addEventListener('focus', () => {
            button.style.outline = '3px solid rgba(102, 126, 234, 0.5)';
            button.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', () => {
            button.style.outline = '';
            button.style.outlineOffset = '';
        });
    });
    
    // Add semantic roles
    document.querySelectorAll('.about-card, .expertise-card').forEach(card => {
        card.setAttribute('role', 'article');
        const title = card.querySelector('h3').textContent;
        card.setAttribute('aria-label', title);
    });
}

// Performance optimization for animations
function optimizeIntroPerformance() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    function updateIntroAnimations() {
        // Update any continuous animations here
        ticking = false;
    }
    
    function requestIntroTick() {
        if (!ticking) {
            requestAnimationFrame(updateIntroAnimations);
            ticking = true;
        }
    }
    
    // Throttle scroll events
    window.addEventListener('scroll', requestIntroTick, { passive: true });
}

// Initialize performance optimizations
setTimeout(() => {
    optimizeIntroPerformance();
}, 300);