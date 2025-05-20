document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.main-header');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real app, you would use AJAX)
            setTimeout(() => {
                contactForm.reset();
                formSuccess.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
    
    // Subscription Form Submission
    const subscriptionForm = document.getElementById('subscriptionForm');
    const subscriptionSuccess = document.getElementById('subscriptionSuccess');
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                subscriptionForm.reset();
                subscriptionSuccess.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    subscriptionSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
    
    // Animate form inputs on focus
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Google Map (placeholder functionality)
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            alert('In a real implementation, this would show an interactive Google Map.');
        });
    }
    
    // Add animation to buttons on hover
    const buttons = document.querySelectorAll('.btn');
    
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
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Add animation to social icons
    const socialIcons = document.querySelectorAll('.social-icon, .social-icons a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate name
            const subNameInput = document.getElementById('subName');
            if (subNameInput.value.trim() === '') {
                showError(subNameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const subEmailInput = document.getElementById('subEmail');
            if (!isValidEmail(subEmailInput.value)) {
                showError(subEmailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate consent
            const consentInput = document.getElementById('consent');
            if (!consentInput.checked) {
                showError(consentInput, 'You must agree to the privacy policy');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        
        // Remove existing error if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        formGroup.appendChild(errorElement);
        input.style.borderColor = 'var(--error-color)';
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorElement.remove();
            input.style.borderColor = '';
        }, 5000);
    }
});