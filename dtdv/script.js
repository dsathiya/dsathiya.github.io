document.addEventListener('DOMContentLoaded', function() {
    // Highlight active section in navigation
    function updateActiveNavLink() {
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('text-green-600', 'font-semibold');
                    link.classList.add('text-gray-700');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-gray-700');
                    activeLink.classList.add('text-green-600', 'font-semibold');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Update active link on page load
    updateActiveNavLink();
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Add active class for animation
            if (!mobileMenu.classList.contains('hidden')) {
                setTimeout(() => {
                    mobileMenu.classList.add('active');
                }, 10);
                
                // Update active link in mobile menu
                const mobileLinks = mobileMenu.querySelectorAll('a');
                const desktopLinks = document.querySelectorAll('nav .hidden.md\\:flex a');
                
                // Sync active state from desktop to mobile
                desktopLinks.forEach((link, index) => {
                    if (link.classList.contains('text-green-600')) {
                        mobileLinks[index].classList.remove('text-gray-700');
                        mobileLinks[index].classList.add('text-green-600', 'font-semibold');
                    }
                });
            } else {
                mobileMenu.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Form navigation
    const form = document.getElementById('nutritional-assessment-form');
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const progressBar = document.getElementById('progress-bar');
    
    // Initialize current section
    let currentSection = 0;
    
    // Update progress bar
    function updateProgressBar() {
        const progress = (currentSection / (sections.length - 1)) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // Show specific section
    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.add('hidden');
            if (i === index) {
                section.classList.remove('hidden');
                // Add fade-in effect
                setTimeout(() => {
                    section.classList.add('fade-in');
                }, 10);
            } else {
                section.classList.remove('fade-in');
            }
        });
        
        currentSection = index;
        updateProgressBar();
        
        // Only scroll to form if user has clicked a button to navigate
        // Don't auto-scroll on page load
    }
    
    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add validation class to enable validation styling
            form.classList.add('validate-active');
            
            // Validate current section before proceeding
            const currentSectionEl = sections[currentSection];
            const requiredFields = currentSectionEl.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    
                    // Remove error message if it exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (isValid && currentSection < sections.length - 1) {
                showSection(currentSection + 1);
                // Only scroll when user clicks next
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentSection > 0) {
                showSection(currentSection - 1);
                // Only scroll when user clicks previous
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Initialize form without validation on page load
    if (sections.length > 0 && form) {
        // Remove validation class to ensure no validation styling on load
        form.classList.remove('validate-active');
        
        // Just show the first section without scrolling
        sections.forEach((section, i) => {
            if (i === 0) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        updateProgressBar();
        
        // Disable automatic validation on focus/blur for required fields
        document.querySelectorAll('[required]').forEach(field => {
            // Remove any validation styling that might be applied by the browser
            field.classList.remove('border-red-500');
            
            field.addEventListener('invalid', function(e) {
                // Prevent the browser's default validation popup
                e.preventDefault();
            });
        });
    }
    
    // Handle anchor links to assessment section
    document.querySelectorAll('a[href="#assessment"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Scroll to assessment section without triggering validation
            const assessmentSection = document.getElementById('assessment');
            if (assessmentSection) {
                assessmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Remove validation class to prevent validation styling
                if (form) {
                    form.classList.remove('validate-active');
                }
                
                // Reset any validation errors that might be showing
                document.querySelectorAll('.error-message').forEach(msg => msg.remove());
                document.querySelectorAll('.border-red-500').forEach(field => {
                    field.classList.remove('border-red-500');
                });
            }
        });
    });
    
    // BMI Calculation
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiOutput = document.getElementById('bmi');
    const bmiCategoryOutput = document.getElementById('bmiCategory');
    
    function calculateBMI() {
        if (heightInput && weightInput && bmiOutput && heightInput.value && weightInput.value) {
            const height_cm = parseFloat(heightInput.value);
            const weight_kg = parseFloat(weightInput.value);
            
            if (height_cm > 0 && weight_kg > 0) {
                const height_m = height_cm / 100;
                const bmi = (weight_kg / (height_m * height_m)).toFixed(2);
                bmiOutput.value = bmi;
                
                // Set BMI category
                let category = '';
                let categoryClass = '';
                
                if (bmi < 18.5) {
                    category = 'Underweight';
                    categoryClass = 'bmi-underweight';
                } else if (bmi >= 18.5 && bmi < 25) {
                    category = 'Normal weight';
                    categoryClass = 'bmi-normal';
                } else if (bmi >= 25 && bmi < 30) {
                    category = 'Overweight';
                    categoryClass = 'bmi-overweight';
                } else {
                    category = 'Obese';
                    categoryClass = 'bmi-obese';
                }
                
                bmiCategoryOutput.value = category;
                bmiCategoryOutput.className = `w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 ${categoryClass}`;
            }
        }
    }
    
    // Waist-Hip Ratio Calculation
    const waistInput = document.getElementById('waistCircumference');
    const hipInput = document.getElementById('hipCircumference');
    const whrOutput = document.getElementById('waistHipRatio');
    
    function calculateWHR() {
        if (waistInput && hipInput && whrOutput && waistInput.value && hipInput.value) {
            const waist_cm = parseFloat(waistInput.value);
            const hip_cm = parseFloat(hipInput.value);
            
            if (waist_cm > 0 && hip_cm > 0) {
                const whr = (waist_cm / hip_cm).toFixed(2);
                whrOutput.value = whr;
            }
        }
    }
    
    // Add event listeners for calculation
    if (heightInput && weightInput) {
        heightInput.addEventListener('input', calculateBMI);
        weightInput.addEventListener('input', calculateBMI);
    }
    
    if (waistInput && hipInput) {
        waistInput.addEventListener('input', calculateWHR);
        hipInput.addEventListener('input', calculateWHR);
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            // Add validation class to enable validation styling
            form.classList.add('validate-active');
            
            // Validate all required fields before submission
            let isValid = true;
            const allRequiredFields = form.querySelectorAll('[required]');
            
            allRequiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                    
                    // Show the section containing this field
                    const sectionEl = field.closest('.form-section');
                    if (sectionEl) {
                        const sectionIndex = Array.from(sections).indexOf(sectionEl);
                        if (sectionIndex !== -1) {
                            showSection(sectionIndex);
                            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            return; // Exit the loop after finding the first error
                        }
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
                return;
            }
            
            // For FormSubmit integration with thank you message
            // This will work with the default form submission
            const thankYouSection = document.getElementById('thank-you-section');
            if (thankYouSection) {
                // Store the form data in localStorage before submission
                // This allows us to show the thank you message after redirect
                localStorage.setItem('formSubmitted', 'true');
                
                // Let the form submit normally
                // FormSubmit will handle the email sending
            }
            
            // If you want to handle the submission with JavaScript (AJAX) instead:
            /*
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            
            // Send data to FormSubmit
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Hide all sections
                    sections.forEach(section => {
                        section.classList.add('hidden');
                    });
                    
                    // Show thank you section
                    const thankYouSection = document.getElementById('thank-you-section');
                    if (thankYouSection) {
                        thankYouSection.classList.remove('hidden');
                        thankYouSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem submitting your form. Please try again later.');
            });
            */
        });
        
        // Check if form was just submitted (after redirect from FormSubmit)
        if (localStorage.getItem('formSubmitted') === 'true') {
            // Clear the flag
            localStorage.removeItem('formSubmitted');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show thank you section
            const thankYouSection = document.getElementById('thank-you-section');
            if (thankYouSection) {
                thankYouSection.classList.remove('hidden');
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
    
    // Clear form field error on input
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            const errorMessage = this.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        });
    });
});