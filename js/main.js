// Main JavaScript for the academic website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    loadHIndex();
    initPublicationFilter();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            
            // Update active states
            updateActiveNavigation(targetSection);
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Update URL hash
            history.pushState(null, null, `#${targetSection}`);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'home';
        showSection(hash);
        updateActiveNavigation(hash);
    });
    
    // Show initial section based on URL hash
    const initialSection = window.location.hash.substring(1) || 'home';
    showSection(initialSection);
    updateActiveNavigation(initialSection);
}

// Show specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
            section.classList.add('active');
        } else {
            section.classList.add('hidden');
            section.classList.remove('active');
        }
    });
}

// Update active navigation states
function updateActiveNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const linkSection = link.getAttribute('data-section');
        if (linkSection === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Close mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    // This is handled by CSS scroll-behavior: smooth
    // But we can add additional smooth scrolling logic here if needed
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple form validation
            if (validateContactForm(data)) {
                // In a real implementation, you would send this to axerver
                showFormSuccess();
                this.reset();
            } else {
                showFormError('Please fill in all required fields.');
            }
        });
    }
}

// Validate contact form
function validateContactForm(data) {
    return data.name && data.email && data.subject && data.message && 
           isValidEmail(data.email);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form success message
function showFormSuccess() {
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
}

// Show form error message
function showFormError(message) {
    showNotification(message, 'error');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Load h-index from Scopus API (placeholder)
function loadHIndex() {
    const hIndexElement = document.getElementById('h-index');
    
    if (hIndexElement) {
        // Placeholder implementation
        // In a real implementation, you would fetch this from Scopus API
        setTimeout(() => {
            hIndexElement.textContent = '2';
        }, 1000);
        
        // Uncomment and modify this for real Scopus API integration:
        /*
        fetch('/api/scopus-hindex')
            .then(response => response.json())
            .then(data => {
                hIndexElement.textContent = data.hIndex || '--';
            })
            .catch(error => {
                console.error('Error loading h-index:', error);
                hIndexElement.textContent = '--';
            });
        */
    }
}

// Utility function to debounce events
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

// Add scroll-based navigation highlighting (optional enhancement)
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavigation(sectionId);
                history.replaceState(null, null, `#${sectionId}`);
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll spy if needed
// initScrollSpy();

// Publication filter functionality
function initPublicationFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    if (filterButtons.length === 0 || publicationCards.length === 0) {
        return; // Exit if elements don't exist
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter publications
            filterPublications(filter);
        });
    });
}

// Filter publications based on type
function filterPublications(filter) {
    const publicationCards = document.querySelectorAll('.publication-card');
    
    publicationCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        
        if (filter === 'all' || cardType === filter) {
            card.classList.remove('hidden');
            card.style.display = 'block';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
    
    // Add smooth transition effect
    setTimeout(() => {
        publicationCards.forEach(card => {
            if (!card.classList.contains('hidden')) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }, 50);
}