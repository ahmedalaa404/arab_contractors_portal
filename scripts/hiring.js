// Hiring Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize theme based on localStorage (same as main script)
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    } else {
        document.body.classList.remove('dark-mode');
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // Form validation and submission
    const form = document.getElementById('jobApplicationForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Check if form is valid
            if (form.checkValidity()) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                form.reset();
                form.classList.remove('was-validated');
            } else {
                // Show validation errors
                form.classList.add('was-validated');
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });

        // File input validation
        const fileInput = document.getElementById('cv');
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                validateFile(this);
            });
        }
    }

    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const isValid = field.checkValidity();
        
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    // File validation function
    function validateFile(fileInput) {
        const file = fileInput.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (file) {
            if (file.size > maxSize) {
                fileInput.setCustomValidity('File size must be less than 5MB');
                fileInput.classList.remove('is-valid');
                fileInput.classList.add('is-invalid');
            } else if (!allowedTypes.includes(file.type)) {
                fileInput.setCustomValidity('Please upload a PDF, DOC, or DOCX file');
                fileInput.classList.remove('is-valid');
                fileInput.classList.add('is-invalid');
            } else {
                fileInput.setCustomValidity('');
                fileInput.classList.remove('is-invalid');
                fileInput.classList.add('is-valid');
            }
        }
    }

    // Success message function
    function showSuccessMessage() {
        const isArabic = document.documentElement.dir === 'rtl';
        
        // Create success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <span class="en-text">Application submitted successfully! We will contact you soon.</span>
            <span class="ar-text">تم إرسال الطلب بنجاح! سنتواصل معك قريباً.</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Language toggle functionality
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const isArabic = html.dir === 'rtl';
            
            if (isArabic) {
                html.dir = 'ltr';
                html.lang = 'en';
            } else {
                html.dir = 'rtl';
                html.lang = 'ar';
            }
        });
    }

    // Theme toggle functionality - Remove this as it's handled by main script.js
    // The main script.js already handles theme toggling with jQuery

    // Form field focus effects
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Character counter for cover letter
    const coverLetter = document.getElementById('coverLetter');
    if (coverLetter) {
        const counter = document.createElement('small');
        counter.className = 'text-muted mt-1 d-block';
        counter.innerHTML = '<span class="en-text">0 characters</span><span class="ar-text">0 حرف</span>';
        coverLetter.parentElement.appendChild(counter);
        
        coverLetter.addEventListener('input', function() {
            const length = this.value.length;
            const isArabic = document.documentElement.dir === 'rtl';
            
            if (isArabic) {
                counter.innerHTML = `<span class="ar-text">${length} حرف</span>`;
            } else {
                counter.innerHTML = `<span class="en-text">${length} characters</span>`;
            }
        });
    }
});

// CSS for form enhancements
const hiringStyles = `
    .form-control:focus {
        border-color: var(--primary-gold);
        box-shadow: 0 0 0 0.2rem rgba(184, 157, 79, 0.25);
    }
    
    .form-label {
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .card {
        border-radius: 15px;
        transition: all 0.3s ease;
    }
    
    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .hiring-feature {
        padding: 1.5rem;
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    
    .hiring-feature:hover {
        transform: translateY(-5px);
        background: rgba(184, 157, 79, 0.1);
    }
    
    .btn-primary {
        background: var(--primary-gold);
        border-color: var(--primary-gold);
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
        background: var(--secondary-gold);
        border-color: var(--secondary-gold);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(184, 157, 79, 0.3);
    }
    
    /* Theme-specific styles are now handled in light-mode.css and dark-mode.css */
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .card-body {
            padding: 1.5rem !important;
        }
        
        .btn-lg {
            padding: 0.75rem 2rem;
            font-size: 1rem;
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = hiringStyles;
document.head.appendChild(styleSheet); 