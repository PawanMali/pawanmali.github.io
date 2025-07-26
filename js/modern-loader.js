// Modern Loader JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeModernLoader();
});

function initializeModernLoader() {
    // Replace the old loader with modern design
    replaceLoader();
    
    // Initialize loader animations
    startLoaderAnimations();
    
    // Handle loader completion
    handleLoaderCompletion();
}

function replaceLoader() {
    const preloader = document.querySelector('#preloader');
    const oldLoader = document.querySelector('#loader');
    
    if (!preloader) return;
    
    // Remove old loader
    if (oldLoader) {
        oldLoader.remove();
    }
    
    // Create modern loader structure
    const modernLoaderHTML = `
        <div class="modern-loader">
            <div class="loader-bg-elements">
                <div class="bg-element"></div>
                <div class="bg-element"></div>
                <div class="bg-element"></div>
            </div>
            
            <div class="quantum-loader">
                <div class="quantum-particle"></div>
                <div class="quantum-particle"></div>
                <div class="quantum-particle"></div>
            </div>
            
            <div class="loader-text typewriter-loader">Loading Portfolio</div>
            <div class="loader-subtext">Preparing your experience...</div>
            
            <div class="loader-progress">
                <div class="loader-progress-bar"></div>
            </div>
        </div>
    `;
    
    preloader.innerHTML = modernLoaderHTML;
}

function startLoaderAnimations() {
    const progressBar = document.querySelector('.loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');
    const loaderSubtext = document.querySelector('.loader-subtext');
    
    if (!progressBar) return;
    
    // Loading messages
    const loadingMessages = [
        { main: 'Loading Portfolio', sub: 'Preparing your experience...' },
        { main: 'Initializing Systems', sub: 'Setting up components...' },
        { main: 'Loading Projects', sub: 'Gathering project data...' },
        { main: 'Optimizing Performance', sub: 'Enhancing user experience...' },
        { main: 'Almost Ready', sub: 'Final preparations...' }
    ];
    
    let currentMessageIndex = 0;
    let progress = 0;
    
    // Simulate realistic loading progress
    const progressInterval = setInterval(() => {
        // Increase progress with varying speeds (realistic loading)
        if (progress < 20) {
            progress += Math.random() * 3 + 1; // Fast initial load
        } else if (progress < 60) {
            progress += Math.random() * 2 + 0.5; // Medium speed
        } else if (progress < 90) {
            progress += Math.random() * 1 + 0.2; // Slower for final steps
        } else if (progress < 100) {
            progress += Math.random() * 0.5 + 0.1; // Very slow final loading
        }
        
        if (progress > 100) progress = 100;
        
        // Update progress bar
        progressBar.style.width = progress + '%';
        
        // Update loading messages based on progress
        const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
        if (messageIndex !== currentMessageIndex && messageIndex < loadingMessages.length) {
            currentMessageIndex = messageIndex;
            updateLoadingMessage(loadingMessages[currentMessageIndex]);
        }
        
        // Complete loading
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                completeLoading();
            }, 800);
        }
    }, 100);
    
    // Update loading message with typewriter effect
    function updateLoadingMessage(message) {
        if (loaderText && loaderSubtext) {
            // Fade out current text
            loaderText.style.opacity = '0';
            loaderSubtext.style.opacity = '0';
            
            setTimeout(() => {
                loaderText.textContent = message.main;
                loaderSubtext.textContent = message.sub;
                
                // Fade in new text
                loaderText.style.opacity = '1';
                loaderSubtext.style.opacity = '1';
            }, 300);
        }
    }
}

function handleLoaderCompletion() {
    // Listen for window load event as backup
    window.addEventListener('load', () => {
        setTimeout(() => {
            completeLoading();
        }, 1500); // Minimum display time
    });
    
    // Also check if all critical resources are loaded
    checkCriticalResources();
}

function checkCriticalResources() {
    const criticalResources = [
        'css/home-redesign.css',
        'css/intro-redesign.css',
        'css/projects-redesign.css'
    ];
    
    let loadedResources = 0;
    
    criticalResources.forEach(resource => {
        const link = document.querySelector(`link[href*="${resource}"]`);
        if (link) {
            link.addEventListener('load', () => {
                loadedResources++;
                if (loadedResources === criticalResources.length) {
                    // All critical resources loaded
                    setTimeout(() => {
                        completeLoading();
                    }, 2000);
                }
            });
        } else {
            loadedResources++; // Resource doesn't exist, count as loaded
        }
    });
}

function completeLoading() {
    const preloader = document.querySelector('#preloader');
    const html = document.documentElement;
    
    if (!preloader) return;
    
    // Update final message
    const loaderText = document.querySelector('.loader-text');
    const loaderSubtext = document.querySelector('.loader-subtext');
    const progressBar = document.querySelector('.loader-progress-bar');
    
    if (loaderText && loaderSubtext && progressBar) {
        loaderText.textContent = 'Welcome!';
        loaderSubtext.textContent = 'Portfolio ready to explore';
        progressBar.style.width = '100%';
    }
    
    // Wait a moment then fade out
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after fade
        setTimeout(() => {
            preloader.remove();
            
            // Remove preload class from html
            html.classList.remove('preload');
            html.classList.add('loaded');
            
            // Trigger page animations
            triggerPageAnimations();
        }, 500);
    }, 800);
}

function triggerPageAnimations() {
    // Dispatch custom event for other scripts to listen to
    const loadCompleteEvent = new CustomEvent('portfolioLoadComplete', {
        detail: { timestamp: Date.now() }
    });
    
    document.dispatchEvent(loadCompleteEvent);
    
    // Start home page animations if visible
    const homeSection = document.querySelector('.s-home');
    if (homeSection && isElementInViewport(homeSection)) {
        homeSection.classList.add('loaded');
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Alternative loader designs (can be activated by changing CSS)
function switchLoaderStyle(style) {
    const quantumLoader = document.querySelector('.quantum-loader');
    const neuralLoader = document.querySelector('.neural-loader');
    const dnaLoader = document.querySelector('.dna-loader');
    
    // Hide all loaders first
    if (quantumLoader) quantumLoader.style.display = 'none';
    if (neuralLoader) neuralLoader.style.display = 'none';
    if (dnaLoader) dnaLoader.style.display = 'none';
    
    // Show selected loader
    switch (style) {
        case 'quantum':
            if (quantumLoader) quantumLoader.style.display = 'block';
            break;
        case 'neural':
            if (neuralLoader) neuralLoader.style.display = 'flex';
            break;
        case 'dna':
            if (dnaLoader) dnaLoader.style.display = 'block';
            break;
        default:
            if (quantumLoader) quantumLoader.style.display = 'block';
    }
}

// Performance optimization
function optimizeLoaderPerformance() {
    // Use CSS transforms instead of changing layout properties
    const particles = document.querySelectorAll('.quantum-particle, .dna-strand, .neural-node');
    
    particles.forEach(particle => {
        particle.style.willChange = 'transform';
    });
    
    // Cleanup after loader is removed
    document.addEventListener('portfolioLoadComplete', () => {
        particles.forEach(particle => {
            particle.style.willChange = 'auto';
        });
    });
}

// Initialize performance optimizations
optimizeLoaderPerformance();

// Handle visibility change (page focus/blur)
document.addEventListener('visibilitychange', () => {
    const preloader = document.querySelector('#preloader');
    
    if (document.hidden) {
        // Page is hidden, pause animations
        if (preloader) {
            preloader.style.animationPlayState = 'paused';
        }
    } else {
        // Page is visible, resume animations
        if (preloader) {
            preloader.style.animationPlayState = 'running';
        }
    }
});

// Accessibility: Skip loader for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(() => {
        completeLoading();
    }, 500); // Minimal loading time for reduced motion users
}