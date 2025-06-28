$(document).ready(function() {
    'use strict';

    // ===== Initialize AOS =====
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // ===== Navbar Scroll Effect =====
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const navbar = $('#mainNavbar');
        
        if (scrollTop > 100) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // ===== Fast Smooth Scrolling for Navigation Links =====
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 400); // Reduced from 1000ms to 400ms for faster scrolling
        }
    });

    // ===== Active Navigation Link =====
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        
        $('section[id]').each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                $(`.navbar-nav .nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    });

    // ===== Language Toggle =====
    let currentLang = 'en';
    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.leadership': 'Leadership',
            'nav.sustainability': 'Sustainability',
            'nav.contact': 'Contact',
            'leadership_title': 'Board of Directors',
            'gm_position': 'Chief Executive Officer',
            'leader_position': 'Project Director'
        },
        ar: {
            'nav.home': 'الرئيسية',
            'nav.about': 'عن الشركة',
            'nav.leadership': 'القيادة',
            'nav.sustainability': 'الاستدامة',
            'nav.contact': 'اتصل بنا',
            'leadership_title': 'مجلس الإدارة',
            'gm_position': 'الرئيس التنفيذي',
            'leader_position': 'مدير المشروع'
        }
    };

    $('#langToggle').on('click', function() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        toggleLanguage(currentLang);
    });

    function toggleLanguage(lang) {
        const html = $('html');
        const isRTL = lang === 'ar';
        
        // Toggle direction
        html.attr('dir', isRTL ? 'rtl' : 'ltr');
        html.attr('lang', lang);
        
        // Update translations
        $('[data-i18n]').each(function() {
            const key = $(this).data('i18n');
            if (translations[lang][key]) {
                $(this).text(translations[lang][key]);
            }
        });
        
        // Update language toggle button
        const btn = $('#langToggle');
        if (lang === 'ar') {
            btn.find('.en-text').text('EN');
            btn.find('.ar-text').text('EN');
        } else {
            btn.find('.en-text').text('AR');
            btn.find('.ar-text').text('AR');
        }
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
    }

    // ===== Dark Mode Toggle =====
    let isDarkMode = localStorage.getItem('dark-mode') === 'true';
    
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        $('body').toggleClass('dark-mode', isDarkMode);
        
        const icon = $('#themeToggle i');
        if (isDarkMode) {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
        
        localStorage.setItem('dark-mode', isDarkMode);
    }
    
    $('#themeToggle').on('click', toggleDarkMode);
    
    // Apply saved dark mode preference
    if (isDarkMode) {
        $('body').addClass('dark-mode');
        $('#themeToggle i').removeClass('fa-moon').addClass('fa-sun');
    }

    // ===== Carousel Auto-play with Pause on Hover =====
    const carousel = $('#heroCarousel');
    carousel.carousel({
        interval: 5000,
        pause: 'hover'
    });

    // ===== Enhanced Leadership Cards Hover Effects =====
    $('.leadership-card').hover(
        function() {
            $(this).find('.card-image img').css('transform', 'scale(1.1)');
            $(this).addClass('card-hovered');
        },
        function() {
            $(this).find('.card-image img').css('transform', 'scale(1)');
            $(this).removeClass('card-hovered');
        }
    );

    // ===== CEO Card Special Effects =====
    $('.ceo-card').hover(
        function() {
            $(this).addClass('ceo-hovered');
            $(this).find('.ceo-badge').addClass('badge-animated');
        },
        function() {
            $(this).removeClass('ceo-hovered');
            $(this).find('.ceo-badge').removeClass('badge-animated');
        }
    );

    // ===== Sustainability Cards Animation =====
    $('.sustainability-card').hover(
        function() {
            $(this).find('.icon-container').css('transform', 'scale(1.1) rotate(5deg)');
        },
        function() {
            $(this).find('.icon-container').css('transform', 'scale(1) rotate(0deg)');
        }
    );

    // ===== Counter Animation for Stats =====
    function animateCounters() {
        $('.stat-item h3').each(function() {
            const $this = $(this);
            const countTo = $this.text();
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(countTo);
                }
            });
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = $('#about');
    const statsSectionTop = statsSection.offset().top;
    const statsSectionHeight = statsSection.outerHeight();
    
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        if (scrollTop + windowHeight > statsSectionTop && scrollTop < statsSectionTop + statsSectionHeight) {
            if (!$('.stat-item h3').hasClass('animated')) {
                $('.stat-item h3').addClass('animated');
                animateCounters();
            }
        }
    });

    // ===== Loading Animation =====
    $(window).on('load', function() {
        $('body').addClass('loaded');
        $('.loading').addClass('loaded');
    });

    // ===== Mobile Menu Close on Link Click =====
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ===== Parallax Effect for Hero Section =====
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = $('.carousel-image');
        const speed = 0.5;
        
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // ===== Back to Top Button =====
    const backToTop = $('<button class="btn btn-primary back-to-top" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; display: none; border-radius: 50%; width: 50px; height: 50px;"><i class="fas fa-arrow-up"></i></button>');
    $('body').append(backToTop);

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 400); // Faster scroll to top
    });

    // ===== Form Validation (if contact form exists) =====
    $('form').on('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        $(this).find('input[required], textarea[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (isValid) {
            // Show success message
            const successMsg = $('<div class="alert alert-success mt-3">Message sent successfully!</div>');
            $(this).append(successMsg);
            $(this)[0].reset();
            
            setTimeout(function() {
                successMsg.fadeOut();
            }, 3000);
        }
    });

    // ===== Image Lazy Loading =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== Load Saved Language Preference =====
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== 'en') {
        toggleLanguage(savedLang);
    }

    // ===== Performance Optimization =====
    // Debounce scroll events
    let scrollTimer;
    $(window).scroll(function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            // Perform scroll-based operations here
        }, 10);
    });

    // ===== Accessibility Improvements =====
    // Add keyboard navigation for carousel
    $(document).keydown(function(e) {
        if (e.keyCode === 37) { // Left arrow
            carousel.carousel('prev');
        } else if (e.keyCode === 39) { // Right arrow
            carousel.carousel('next');
        }
    });

    // Add focus management for modals and dropdowns
    $('.dropdown-toggle').on('click', function() {
        $(this).next('.dropdown-menu').find('a').first().focus();
    });

    // ===== Error Handling =====
    $(window).on('error', function(e) {
        console.error('JavaScript error:', e);
    });

    // ===== Console Log for Development =====
    console.log('Arab Contractors website loaded successfully!');
    console.log('Features: Responsive design, Bilingual support, Dark mode, AOS animations');
}); 