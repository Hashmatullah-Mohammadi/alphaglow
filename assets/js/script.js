// =============================== Load Components ==========================
// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch("./components/header.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("header").innerHTML = data;
            // Initialize navbar scroll effect after header is loaded
            initializeNavbar();
        })
        .catch((error) => {
            console.error("Error loading header:", error);
        });

    // Load footer
    fetch("./components/footer.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch((error) => {
            console.error("Error loading footer:", error);
        });
});


// =============================== index page js start ==========================

// Loader functionality
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 500); // Reduced to 500ms for faster loading
    }
});

// Navbar scroll effect
function initializeNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 15, 27, 0.95)';
                navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(15, 15, 27, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Animate stats in modal when opened
    const aboutModal = document.getElementById('aboutModal');
    if (aboutModal) {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        aboutModal.addEventListener('shown.bs.modal', function() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : (stat.textContent.includes('%') ? '%' : ''));
                    }
                }, 30);
            });
        });
    }
});

// =============================== index page js end ==========================


// =============================== ABOUT PAGE JS START ==========================

// Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for About Page Animations
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the about page
    const aboutPage = document.querySelector('.about-hero');
    
    if (aboutPage) {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger counter animation when stats section is visible
                    if (entry.target.classList.contains('stats-section')) {
                        animateCounters();
                        observer.unobserve(entry.target); // Only animate once
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('.stats-section, .our-story, .mission-vision, .core-values, .team-section, .why-choose-us');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
        
        // Animate value cards on scroll
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            cardObserver.observe(card);
        });
        
        // Animate team cards
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const teamObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }
                });
            }, { threshold: 0.2 });
            
            teamObserver.observe(card);
        });
        
        // Animate feature boxes
        const featureBoxes = document.querySelectorAll('.feature-box');
        featureBoxes.forEach((box, index) => {
            box.style.opacity = '0';
            box.style.transform = 'translateX(-30px)';
            box.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            featureObserver.observe(box);
        });
        
        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
            
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.3 });
            
            timelineObserver.observe(item);
        });
        
        // Parallax effect for floating cards
        window.addEventListener('scroll', () => {
            const floatingCards = document.querySelectorAll('.floating-card');
            const scrolled = window.pageYOffset;
            
            floatingCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });
        });
        
        // Add hover effect to highlight items
        const highlightItems = document.querySelectorAll('.highlight-item');
        highlightItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
});

// =============================== ABOUT PAGE JS END ==========================


// =============================== SERVICES PAGE JS START ==========================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the services page
    const servicesPage = document.querySelector('.services-hero');
    
    if (servicesPage) {
        // Animate service cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate service detail cards
        const serviceCards = document.querySelectorAll('.service-detail-card');
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Animate process steps
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'scale(0.9)';
            step.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
            
            const stepObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }
                });
            }, { threshold: 0.2 });
            
            stepObserver.observe(step);
        });
        
        // Animate pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const pricingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            pricingObserver.observe(card);
        });
        
        // Animate FAQ items
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const faqObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            faqObserver.observe(item);
        });
        
        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#' && targetId.length > 1) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Form validation and submission
        const contactForm = document.querySelector('.service-contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const formData = new FormData(contactForm);
                
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                
                // Show success message
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate sending (replace with actual API call)
                setTimeout(() => {
                    submitButton.textContent = 'Message Sent!';
                    submitButton.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                    }, 3000);
                }, 1500);
            });
        }
        
        // Add hover effects to badges
        const badges = document.querySelectorAll('.badge-item');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.services-hero-content');
            if (heroContent && scrolled < 500) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = `${1 - scrolled / 800}`;
            }
        });
        
        // Add active state to accordion buttons
        const accordionButtons = document.querySelectorAll('.accordion-button');
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add a subtle animation when accordion opens
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = this.classList.contains('collapsed') ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            });
        });
    }
});

// =============================== SERVICES PAGE JS END ==========================


// =============================== PORTFOLIO PAGE JS START ==========================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the portfolio page
    const portfolioPage = document.querySelector('.portfolio-hero');
    
    if (portfolioPage) {
        // Animate counters for portfolio stats
        function animatePortfolioCounters() {
            const counters = document.querySelectorAll('.portfolio-stats .stat-number');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
        
        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePortfolioCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const portfolioStats = document.querySelector('.portfolio-stats');
        if (portfolioStats) {
            statsObserver.observe(portfolioStats);
        }
        
        // Portfolio filtering functionality
        const filterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item-advanced');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Animate portfolio items on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate portfolio cards
        portfolioItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(item);
        });
        
        // Animate testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
            
            const testimonialObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            testimonialObserver.observe(card);
        });
        
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.portfolio-hero-content');
            
            if (heroContent && scrolled < 500) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = `${1 - scrolled / 800}`;
            }
        });
        
        // Add hover effect to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-3px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Add click animation to portfolio cards
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on a button
                if (!e.target.classList.contains('btn-view-project')) {
                    // Add a subtle pulse animation
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 100);
                }
            });
        });
        
        // Lazy load effect for portfolio images
        const portfolioImages = document.querySelectorAll('.portfolio-image');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        portfolioImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            imageObserver.observe(img);
        });
        
        // Add rating animation on hover
        const testimonialCardsWithRating = document.querySelectorAll('.testimonial-card');
        testimonialCardsWithRating.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const stars = this.querySelectorAll('.rating i');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            star.style.transform = 'scale(1)';
                        }, 100);
                    }, index * 50);
                });
            });
        });
        
        // Add transition to rating stars
        const ratingStars = document.querySelectorAll('.rating i');
        ratingStars.forEach(star => {
            star.style.transition = 'transform 0.2s ease';
        });
    }
});

// =============================== PORTFOLIO PAGE JS END ==========================


// =============================== CONTACT PAGE JS START ==========================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the contact page
    const contactPage = document.querySelector('.contact-hero');
    
    if (contactPage) {
        // Animate sections on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate contact info cards
        const contactInfoCards = document.querySelectorAll('.contact-info-card');
        contactInfoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Animate contact method items
        const methodItems = document.querySelectorAll('.contact-method-item');
        methodItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            item.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
            
            const methodObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }
                });
            }, { threshold: 0.2 });
            
            methodObserver.observe(item);
        });
        
        // Animate social media cards
        const socialCards = document.querySelectorAll('.social-media-card');
        socialCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
            
            const socialObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            socialObserver.observe(card);
        });
        
        // Form validation and submission
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const company = document.getElementById('company').value;
                const service = document.getElementById('service').value;
                const budget = document.getElementById('budget').value;
                const message = document.getElementById('message').value;
                const newsletter = document.getElementById('newsletter').checked;
                
                // Basic validation
                if (!firstName || !lastName || !email || !service || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Simulate sending (replace with actual API call)
                setTimeout(() => {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Reset form after showing success
                    setTimeout(() => {
                        contactForm.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                    
                    // Optional: Hide success message and show form again after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        contactForm.style.display = 'block';
                    }, 5000);
                }, 1500);
            });
            
            // Real-time form validation
            const formInputs = contactForm.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.hasAttribute('required') && !this.value) {
                        this.style.borderColor = 'rgba(255, 101, 132, 0.5)';
                    } else {
                        this.style.borderColor = '';
                    }
                });
                
                input.addEventListener('focus', function() {
                    this.style.borderColor = '';
                });
            });
        }
        
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.contact-hero-content');
            
            if (heroContent && scrolled < 500) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = `${1 - scrolled / 800}`;
            }
        });
        
        // Add animation to feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
            
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            featureObserver.observe(item);
        });
        
        // Animate FAQ items
        const faqItems = document.querySelectorAll('.contact-faq .accordion-item');
        faqItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const faqObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.2 });
            
            faqObserver.observe(item);
        });
        
        // Add smooth scroll to map section
        const mapLink = document.querySelector('a[href="#map-section"]');
        if (mapLink) {
            mapLink.addEventListener('click', function(e) {
                e.preventDefault();
                const mapSection = document.getElementById('map-section');
                if (mapSection) {
                    mapSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
        
        // Add hover effect to contact info cards
        contactInfoCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.contact-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.contact-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Add click tracking for social media links
        socialCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Add a subtle animation on click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
});

// =============================== CONTACT PAGE JS END ==========================


// =============================== LOGIN PAGE JS START ==========================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    const loginPage = document.querySelector('.login-page');
    
    if (loginPage) {
        // Create particles
        createParticles();
        
        // Card flip functionality
        const loginCard = document.getElementById('loginCard');
        const toggleLinks = document.querySelectorAll('.toggle-card');
        
        toggleLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                loginCard.classList.toggle('flipped');
                
                // Reset forms when switching
                setTimeout(() => {
                    document.getElementById('loginForm').reset();
                    document.getElementById('signupForm').reset();
                    resetPasswordStrength();
                }, 400);
            });
        });
        
        // Password toggle functionality
        const togglePasswordButtons = document.querySelectorAll('.toggle-password');
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const input = document.getElementById(targetId);
                const icon = this.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
        
        // Password strength indicator
        const signupPassword = document.getElementById('signupPassword');
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        if (signupPassword) {
            signupPassword.addEventListener('input', function() {
                const password = this.value;
                const strength = calculatePasswordStrength(password);
                
                strengthBar.className = 'strength-bar';
                
                if (password.length === 0) {
                    strengthBar.classList.remove('weak', 'medium', 'strong');
                    strengthText.textContent = '';
                } else if (strength < 40) {
                    strengthBar.classList.add('weak');
                    strengthText.textContent = 'Weak password';
                    strengthText.style.color = '#ff4444';
                } else if (strength < 70) {
                    strengthBar.classList.add('medium');
                    strengthText.textContent = 'Medium password';
                    strengthText.style.color = '#ffa500';
                } else {
                    strengthBar.classList.add('strong');
                    strengthText.textContent = 'Strong password';
                    strengthText.style.color = '#4caf50';
                }
            });
        }
        
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Validate
                if (!validateEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                if (password.length < 6) {
                    showNotification('Password must be at least 6 characters', 'error');
                    return;
                }
                
                // Show loading state
                const submitButton = this.querySelector('.btn-auth');
                const originalHTML = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Logging in...</span>';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.innerHTML = originalHTML;
                    submitButton.disabled = false;
                    
                    // Show success modal
                    showSuccessModal('Welcome Back!', 'You have successfully logged in to your account.');
                    
                    // Redirect after 2 seconds
                    setTimeout(() => {
                        window.location.href = './index.html';
                    }, 2000);
                }, 1500);
            });
        }
        
        // Signup form submission
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = document.getElementById('signupFirstName').value;
                const lastName = document.getElementById('signupLastName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const agreeTerms = document.getElementById('agreeTerms').checked;
                
                // Validate
                if (!firstName || !lastName) {
                    showNotification('Please enter your full name', 'error');
                    return;
                }
                
                if (!validateEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                if (password.length < 6) {
                    showNotification('Password must be at least 6 characters', 'error');
                    return;
                }
                
                if (password !== confirmPassword) {
                    showNotification('Passwords do not match', 'error');
                    return;
                }
                
                if (!agreeTerms) {
                    showNotification('Please agree to the Terms & Conditions', 'error');
                    return;
                }
                
                // Show loading state
                const submitButton = this.querySelector('.btn-auth');
                const originalHTML = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Creating account...</span>';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.innerHTML = originalHTML;
                    submitButton.disabled = false;
                    
                    // Show success modal
                    showSuccessModal('Account Created!', `Welcome to AlphaGlow, ${firstName}! Your account has been created successfully.`);
                    
                    // Switch to login after 2 seconds
                    setTimeout(() => {
                        loginCard.classList.remove('flipped');
                        this.reset();
                        resetPasswordStrength();
                    }, 2000);
                }, 1500);
            });
        }
        
        // Social login buttons
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.classList.contains('google') ? 'Google' : 
                               this.classList.contains('facebook') ? 'Facebook' : 'GitHub';
                showNotification(`Redirecting to ${platform} login...`, 'info');
            });
        });
        
        // Input animations
        const formInputs = document.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Success modal close
        const closeModalButton = document.getElementById('closeModal');
        const successModal = document.getElementById('successModal');
        
        if (closeModalButton) {
            closeModalButton.addEventListener('click', function() {
                successModal.classList.remove('show');
            });
        }
        
        // Click outside modal to close
        if (successModal) {
            successModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('show');
                }
            });
        }
    }
});

// Helper Functions

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    
    return strength;
}

function resetPasswordStrength() {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (strengthBar) {
        strengthBar.className = 'strength-bar';
    }
    
    if (strengthText) {
        strengthText.textContent = '';
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showSuccessModal(title, message) {
    const successModal = document.getElementById('successModal');
    const successTitle = document.getElementById('successTitle');
    const successMessage = document.getElementById('successMessage');
    
    if (successModal) {
        successTitle.textContent = title;
        successMessage.textContent = message;
        successModal.classList.add('show');
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification ' + type;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? 'rgba(255, 68, 68, 0.9)' : type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(33, 150, 243, 0.9)'};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        z-index: 10000;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =============================== LOGIN PAGE JS END ==========================
