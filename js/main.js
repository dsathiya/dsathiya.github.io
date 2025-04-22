document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-nav-toggle') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileNavToggle.classList.remove('active');
        }
    });
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme or light mode by default
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Make sure the toggle is visible
    if (themeToggle) {
        console.log('Theme toggle found:', themeToggle);
        
        // Toggle theme when the button is clicked
        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            console.log('Theme changed to:', newTheme);
        });
    } else {
        console.error('Theme toggle element not found!');
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Show particles only on desktop
    if (window.innerWidth > 768) {
        // Particles.js is initialized via the dedicated particles-config.js file
        document.getElementById('particles-js').style.display = 'block';
    } else {
        document.getElementById('particles-js').style.display = 'none';
    }
    
    // Update active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu li');
    
    function updateActiveNavItem() {
        const scrollPosition = window.scrollY + 100; // Add offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.querySelector('a').getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial call to set active menu item
    updateActiveNavItem();
    
    // Update active menu item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
});