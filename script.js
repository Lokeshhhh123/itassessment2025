// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the typewriter effect
    initTypewriter();
    
    // Check if navigation is open when page loads
    checkMenuState();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Back to top button visibility
    const backToTopButton = document.querySelector('.back-to-top');
    if(backToTopButton) {
        window.addEventListener('scroll', function() {
            if(window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }
  });
  
  // Function to toggle the mobile menu
  function toggleMenu() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
    
    // Store menu state in local storage
    const isMenuOpen = dropdown.classList.contains('active');
    localStorage.setItem('menuOpen', isMenuOpen);
    
    // Toggle body scroll when menu is open/closed
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }
  
  // Check if menu was open in previous session
  function checkMenuState() {
    const wasMenuOpen = localStorage.getItem('menuOpen') === 'true';
    if(wasMenuOpen) {
        document.querySelector('.dropdown').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
  }
  
  // Typewriter effect
  function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if(!textElement) return;
    
    const phrases = [
        'Cyber Security Student',
        'Ethical Hacker',
        'IT Enthusiast',
        'Penetration Tester',
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if(isDeleting) {
            // Delete characters
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            // Type characters
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Type slower
        }
        
        // If word is complete
        if(!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            isDeleting = true;
            typingSpeed = 1500; // Wait before deleting
        } 
        // If deletion is complete
        else if(isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Next phrase
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
  }
  
  // Highlight active nav based on scroll position
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.links .link a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${currentSection}` || 
           (currentSection === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
  }
  
  // Add CSS animations on scroll
  window.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
  });
  
  // Form validation for contact form
  function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate name
    if(!name.value.trim()) {
        displayError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.value.trim() || !emailPattern.test(email.value)) {
        displayError(email, 'Valid email is required');
        isValid = false;
    }
    
    // Validate message
    if(!message.value.trim()) {
        displayError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
  }
  
  // Display error message
  function displayError(inputElement, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    
    inputElement.parentNode.appendChild(errorDiv);
    inputElement.style.borderColor = 'red';
    
    // Remove error styling when input changes
    inputElement.addEventListener('input', function() {
        this.style.borderColor = '';
        const error = this.parentNode.querySelector('.error-message');
        if(error) error.remove();
    });
  }