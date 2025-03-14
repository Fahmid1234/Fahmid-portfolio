/*
   Md Fahmid Bin Mostafa - Personal Portfolio
   Main JavaScript File
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    (function() {
        // Replace with your EmailJS public key
        emailjs.init("YOUR_PUBLIC_KEY");
    })();

    // DOM Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const backToTopButton = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contactForm');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu with X button
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        // Check if menu is active and click is outside the menu and not on the hamburger
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
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
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial slider
    if (testimonialDots.length > 0 && testimonialItems.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Hide all testimonials
                testimonialItems.forEach(item => {
                    item.style.display = 'none';
                });
                
                // Remove active class from all dots
                testimonialDots.forEach(d => {
                    d.classList.remove('active');
                });
                
                // Show selected testimonial and activate dot
                testimonialItems[index].style.display = 'block';
                dot.classList.add('active');
            });
        });

        // Initialize first testimonial
        testimonialItems.forEach((item, index) => {
            if (index === 0) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Contact Form Submission
    if (contactForm) {
        // Form validation function
        const validateForm = (formData) => {
            const errors = {};
            
            // Validate name (at least 2 characters)
            if (formData.name.trim().length < 2) {
                errors.name = 'Name must be at least 2 characters';
            }
            
            // Validate email (basic email format)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = 'Please enter a valid email address';
            }
            
            // Validate subject (at least 3 characters)
            if (formData.subject.trim().length < 3) {
                errors.subject = 'Subject must be at least 3 characters';
            }
            
            // Validate message (at least 10 characters)
            if (formData.message.trim().length < 10) {
                errors.message = 'Message must be at least 10 characters';
            }
            
            return {
                isValid: Object.keys(errors).length === 0,
                errors
            };
        };
        
        // Show validation errors
        const showValidationErrors = (form, errors) => {
            // Clear previous error messages
            form.querySelectorAll('.error-feedback').forEach(el => el.remove());
            
            // Add new error messages
            Object.entries(errors).forEach(([field, message]) => {
                const input = form.querySelector(`#${field}`);
                if (input) {
                    // Add error class to input
                    input.classList.add('error');
                    
                    // Create error message element
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-feedback';
                    errorElement.textContent = message;
                    
                    // Insert error message after input
                    input.parentNode.appendChild(errorElement);
                    
                    // Add event listener to clear error on input
                    input.addEventListener('input', function() {
                        this.classList.remove('error');
                        const errorEl = this.parentNode.querySelector('.error-feedback');
                        if (errorEl) {
                            errorEl.remove();
                        }
                    }, { once: true });
                }
            });
        };

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            const { isValid, errors } = validateForm(formObject);
            
            if (!isValid) {
                showValidationErrors(this, errors);
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Send email using EmailJS
                // Replace with your EmailJS service ID and template ID
                const result = await emailjs.send(
                    'service_id', // Your EmailJS service ID
                    'template_id', // Your EmailJS template ID
                    {
                        name: formObject.name,
                        email: formObject.email,
                        subject: formObject.subject,
                        message: formObject.message
                    }
                );
                
                // Reset form
                this.reset();
                
                // Show success message
                const messageElement = document.createElement('div');
                messageElement.className = 'success-message';
                messageElement.innerHTML = `<p>Thank you for your message! I'll get back to you soon.</p>`;
                
                // Add message to form
                this.appendChild(messageElement);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    messageElement.remove();
                }, 5000);
                
                console.log('Email sent successfully:', result);
            } catch (error) {
                console.error('Error sending email:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `<p>Sorry, there was an error sending your message. Please try again later.</p>`;
                
                // Add error message to form
                this.appendChild(errorMessage);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Enhanced Portfolio Interactions
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.transitionDelay = `${index * 0.1}s`;
        
        // Add hover effect for the overlay button
        const overlay = item.querySelector('.portfolio-overlay');
        const image = item.querySelector('.portfolio-image');
        
        if (image && overlay) {
            image.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    overlay.style.opacity = '1';
                }
            });
            
            image.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    overlay.style.opacity = '0';
                }
            });
        }
        
        // Add click event for mobile devices
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && e.target.closest('.portfolio-image') && !e.target.closest('.btn') && overlay) {
                // Toggle active class on mobile
                if (overlay.style.opacity === '1') {
                    overlay.style.opacity = '0';
                } else {
                    // Hide all other overlays first
                    portfolioItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherOverlay = otherItem.querySelector('.portfolio-overlay');
                            if (otherOverlay) {
                                otherOverlay.style.opacity = '0';
                            }
                        }
                    });
                    overlay.style.opacity = '1';
                }
            }
        });
    });

    // Add animation to service cards
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements to animate
    document.querySelectorAll('.service-card, .portfolio-item, .about-image').forEach(item => {
        observer.observe(item);
    });

    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .portfolio-item, .about-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .portfolio-item.animate, .about-image.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(2), .portfolio-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(3), .portfolio-item:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(4), .portfolio-item:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        .portfolio-item {
            transform-origin: center bottom;
        }
        
        .portfolio-item.animate:hover {
            z-index: 10;
        }
        
        .success-message {
            background-color: rgba(100, 255, 218, 0.1);
            color: var(--accent);
            padding: 1rem;
            border-radius: var(--border-radius-sm);
            margin-top: 1rem;
            text-align: center;
            border: 1px solid var(--accent);
        }
        
        .error-message {
            background-color: rgba(220, 53, 69, 0.1);
            color: var(--error);
            padding: 1rem;
            border-radius: var(--border-radius-sm);
            margin-top: 1rem;
            text-align: center;
            border: 1px solid var(--error);
        }
    `;
    document.head.appendChild(style);
}); 