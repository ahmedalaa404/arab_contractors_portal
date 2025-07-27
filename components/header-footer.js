// Header and Footer JavaScript Functions

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
    
    // Initialize navbar state on page load
    $(window).trigger('scroll');

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
            'leader_position': 'Project Director',
            'nav.news': 'News',
            'nav.hiring': 'Hiring',
            'nav.privacy': 'Privacy Policy',
        },
        ar: {
            'nav.home': 'الرئيسية',
            'nav.about': 'عن الشركة',
            'nav.leadership': 'مجلس الاداروة',
            'nav.sustainability': 'الاستدامة',
            'nav.contact': 'اتصل بنا',
            'leadership_title': 'مجلس الإدارة',
            'gm_position': 'الرئيس التنفيذي',
            'leader_position': 'مدير المشروع',
            'nav.news': 'الاخبار',
            'nav.hiring': 'التوظيف',
            'nav.privacy': 'سياسة الخصوصية',
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
            if (translations[lang] && translations[lang][key]) {
                $(this).text(translations[lang][key]);
            }
        });
        
        // Update dropdown language
        updateDropdownLanguage(isRTL);
        
        // Animate brand name
        animateBrandName();
    }

    function updateDropdownLanguage(isRTL) {
        const dropdownMenu = $('.dropdown-menu');
        if (isRTL) {
            dropdownMenu.addClass('dropdown-menu-end');
        } else {
            dropdownMenu.removeClass('dropdown-menu-end');
        }
    }

    // ===== Theme Toggle =====
    $('#themeToggle').on('click', function() {
        toggleDarkMode();
    });

    function toggleDarkMode() {
        const body = $('body');
        const themeIcon = $('#themeToggle i');
        
        if (body.hasClass('dark-mode')) {
            body.removeClass('dark-mode');
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('dark-mode', 'false');
        } else {
            body.addClass('dark-mode');
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('dark-mode', 'true');
        }
    }

    // ===== Brand Name Animation =====
    function animateBrandName() {
        const arabicName = $('#animated-arabic-name');
        const arabicText = 'المقاولون العرب';
        let currentIndex = 0;
        
        arabicName.text('');
        
        const typeInterval = setInterval(function() {
            if (currentIndex < arabicText.length) {
                arabicName.text(arabicName.text() + arabicText[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }

    // ===== Initialize Theme on Page Load =====
    function initializeTheme() {
        const savedTheme = localStorage.getItem('dark-mode');
        const body = $('body');
        const themeIcon = $('#themeToggle i');
        
        if (savedTheme === 'true') {
            body.addClass('dark-mode');
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            body.removeClass('dark-mode');
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
        }
    }

    // ===== Initialize Language on Page Load =====
    function initializeLanguage() {
        const savedLang = localStorage.getItem('language') || 'en';
        currentLang = savedLang;
        toggleLanguage(savedLang);
    }

    // ===== Carousel Functionality =====
    function initializeCarousel() {
        // Auto-play carousel
        const carousel = $('#mainCarousel');
        if (carousel.length) {
            carousel.carousel({
                interval: 5000,
                pause: 'hover'
            });
        }
    }

    // ===== Mobile Menu Toggle =====
    $('.navbar-toggler').on('click', function() {
        const navbarCollapse = $('.navbar-collapse');
        navbarCollapse.toggleClass('show');
    });

    // Close mobile menu when clicking on a link
    $('.navbar-nav .nav-link').on('click', function() {
        const navbarCollapse = $('.navbar-collapse');
        if (navbarCollapse.hasClass('show')) {
            navbarCollapse.removeClass('show');
        }
    });

    // ===== Smooth Scroll for Footer Links =====
    $('footer a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 400);
        }
    });

    // ===== Social Media Links =====
    $('.social-links a').on('click', function(e) {
        e.preventDefault();
        const platform = $(this).find('i').attr('class');
        
        // Add your social media URLs here
        const socialUrls = {
            'fab fa-facebook-f': 'https://facebook.com/arabcontractors',
            'fab fa-twitter': 'https://twitter.com/arabcontractors',
            'fab fa-linkedin-in': 'https://linkedin.com/company/arabcontractors',
            'fab fa-instagram': 'https://instagram.com/arabcontractors'
        };
        
        const url = socialUrls[platform];
        if (url) {
            window.open(url, '_blank');
        }
    });

    // ===== Initialize Everything =====
    initializeTheme();
    initializeLanguage();
    initializeCarousel();
    animateBrandName();

    // ===== Save Language Preference =====
    function saveLanguagePreference(lang) {
        localStorage.setItem('language', lang);
    }

    // Update language toggle to save preference
    $('#langToggle').off('click').on('click', function() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        toggleLanguage(currentLang);
        saveLanguagePreference(currentLang);
    });

    // ===== Responsive Header Adjustments =====
    function adjustHeaderForMobile() {
        const windowWidth = $(window).width();
        const navbar = $('#mainNavbar');
        
        if (windowWidth < 768) {
            navbar.addClass('mobile-header');
        } else {
            navbar.removeClass('mobile-header');
        }
    }

    // Call on load and resize
    adjustHeaderForMobile();
    $(window).on('resize', adjustHeaderForMobile);

    // ===== Footer Scroll to Top =====
    function addScrollToTop() {
        if ($('body').find('#scrollToTop').length === 0) {
            $('body').append(`
                <button id="scrollToTop" class="btn btn-primary position-fixed" 
                        style="bottom: 20px; right: 20px; z-index: 1000; display: none;">
                    <i class="fas fa-arrow-up"></i>
                </button>
            `);
        }
    }

    function toggleScrollToTop() {
        const scrollTop = $(window).scrollTop();
        const scrollToTopBtn = $('#scrollToTop');
        
        if (scrollTop > 300) {
            scrollToTopBtn.fadeIn();
        } else {
            scrollToTopBtn.fadeOut();
        }
    }

    // Initialize scroll to top
    addScrollToTop();
    $(window).on('scroll', toggleScrollToTop);
    
    $('#scrollToTop').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
    });

    // ===== Header Search Functionality =====
    function initializeSearch() {
        // Add search functionality if needed
        $('.search-toggle').on('click', function() {
            $('.search-form').toggleClass('active');
        });
    }

    // ===== Header Notifications =====
    function initializeNotifications() {
        // Add notification functionality if needed
        $('.notification-toggle').on('click', function() {
            $('.notification-dropdown').toggleClass('show');
        });
    }

    // Initialize additional features
    initializeSearch();
    initializeNotifications();
}); 