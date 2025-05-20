// Wait until the full page content is loaded before running our scripts
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MOBILE NAVIGATION LOGIC
    // ======================
    // Grab our mobile menu elements
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.main-header');
    
    // Hamburger menu click handler - toggles mobile menu visibility
    hamburger.addEventListener('click', function() {
        // Toggle active state on both hamburger icon and navigation menu
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when any navigation link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            // Remove active states to hide the mobile menu
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // =====================
    // SCROLL EFFECTS LOGIC
    // =====================
    // Add/remove scrolled class to header based on scroll position
    window.addEventListener('scroll', function() {
        // When scrolled more than 50px down, add visual effect to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Return to normal when near top of page
            header.classList.remove('scrolled');
        }
    });
    
    // ======================
    // CONTACT FORM HANDLING
    // ======================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        // Handle form submission with simulated AJAX request
        contactForm.addEventListener('submit', function(e) {
            // Prevent default form submission behavior
            e.preventDefault();
            
            // Simulate network request with timeout
            setTimeout(() => {
                // Reset form fields and show success message
                contactForm.reset();
                formSuccess.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
    
    // =========================
    // SUBSCRIPTION FORM HANDLING
    // =========================
    const subscriptionForm = document.getElementById('subscriptionForm');
    const subscriptionSuccess = document.getElementById('subscriptionSuccess');
    
    if (subscriptionForm) {
        // Similar handling to contact form but for newsletter signups
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate subscription processing
            setTimeout(() => {
                subscriptionForm.reset();
                subscriptionSuccess.style.display = 'block';
                
                // Auto-dismiss success message
                setTimeout(() => {
                    subscriptionSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
    
    // ======================
    // FORM INPUT ANIMATIONS
    // ======================
    // Add visual feedback for form field interactions
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Highlight field container when focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove highlight when blurred, but only if empty
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // ======================
    // SMOOTH SCROLLING LOGIC
    // ======================
    // Make navigation to page sections smooth and pleasant
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent default jump-to behavior
            e.preventDefault();
            
            // Get target section from href
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Find target element and scroll to it with offset for fixed header
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth' // Animate the scroll
                });
            }
        });
    });
    
    // =====================
    // MAP PLACEHOLDER LOGIC
    // =====================
    // Temporary handler for map element until real implementation
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            alert('In a real implementation, this would show an interactive Google Map.');
        });
    }
    
    // =====================
    // BUTTON EFFECTS LOGIC
    // =====================
    // Add visual feedback to buttons for better interactivity
    const buttons = document.querySelectorAll('.btn');
    
    // Hover effects - subtle lift and shadow
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(248, 197, 55, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Click effects - ripple animation
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Calculate click position relative to button
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add to button and auto-remove after animation
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // =====================
    // FORM VALIDATION LOGIC
    // =====================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate name field
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email format
            const emailInput = document.getElementById('email');
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate message content
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            // Prevent submission if validation failed
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate name field
            const subNameInput = document.getElementById('subName');
            if (subNameInput.value.trim() === '') {
                showError(subNameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email format
            const subEmailInput = document.getElementById('subEmail');
            if (!isValidEmail(subEmailInput.value)) {
                showError(subEmailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate privacy policy consent
            const consentInput = document.getElementById('consent');
            if (!consentInput.checked) {
                showError(consentInput, 'You must agree to the privacy policy');
                isValid = false;
            }
            
            // Prevent submission if validation failed
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // =====================
    // HELPER FUNCTIONS
    // =====================
    // Simple email format validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Display error message for form fields
    function showError(input, message) {
        const formGroup = input.parentElement;
        
        // Create error message element
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        
        // Remove any existing error first
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message and highlight field
        formGroup.appendChild(errorElement);
        input.style.borderColor = 'var(--error-color)';
        
        // Auto-remove error after 5 seconds
        setTimeout(() => {
            errorElement.remove();
            input.style.borderColor = '';
        }, 5000);
    }
});