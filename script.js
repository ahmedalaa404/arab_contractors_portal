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
        
        // Show/hide language-specific content
        if (isRTL) {
            $('.en-text').hide();
            $('.ar-text').show();
        } else {
            $('.en-text').show();
            $('.ar-text').hide();
        }
        
        // Update dropdown menu language
        updateDropdownLanguage(isRTL);
        
        // Store preference
        localStorage.setItem('preferred-language', lang);
        
        // Trigger brand animation after language change
        setTimeout(function() {
            animateBrandName();
        }, 100);
    }
    
    // Function to update dropdown menu language
    function updateDropdownLanguage(isRTL) {
        if (isRTL) {
            $('.dropdown-menu .en-text').hide();
            $('.dropdown-menu .ar-text').show();
        } else {
            $('.dropdown-menu .en-text').show();
            $('.dropdown-menu .ar-text').hide();
        }
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

    // ===== Leadership Card Click Handlers =====
    $('.leadership-card').on('click', function() {
        const leaderName = $(this).find('h4, h5').first().text().trim();
        const leaderData = getLeaderDetails(leaderName);
        
        if (leaderData) {
            showLeaderDetails(leaderData);
        }
    });
    
    // New leadership cards click handlers
    $('.chairman-card').on('click', function() {
        const leaderData = getLeaderDetails('Eng. Ahmed Hassan');
        if (leaderData) {
            showLeaderDetails(leaderData);
        }
    });
    
    $('.executive-card').on('click', function() {
        const leaderId = $(this).data('leader');
        if (leadershipData[leaderId]) {
            openLeadershipModal(leaderId);
        }
    });
    
    $('.non-executive-card').on('click', function() {
        const leaderId = $(this).data('leader');
        if (leadershipData[leaderId]) {
            openLeadershipModal(leaderId);
        }
    });

    // ===== Leader Details Data =====
    function getLeaderDetails(leaderName) {
        const leaders = {
            'Eng. Ahmed Hassan': {
                name: {
                    en: 'Eng. Ahmed Hassan',
                    ar: 'م. أحمد حسن'
                },
                position: {
                    en: 'Chief Executive Officer',
                    ar: 'الرئيس التنفيذي'
                },
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                email: 'ahmed.hassan@arabcontractors.com',
                phone: '+20 2 1234 5678',
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                timeline: [
                    {
                        date: {
                            en: '1965',
                            ar: '1965'
                        },
                        title: {
                            en: 'Birth',
                            ar: 'الميلاد'
                        },
                        subtitle: {
                            en: 'Born in Cairo, Egypt',
                            ar: 'ولد في القاهرة، مصر'
                        },
                        description: {
                            en: 'Ahmed Hassan was born in Cairo, Egypt, into a family with a strong engineering background.',
                            ar: 'ولد أحمد حسن في القاهرة، مصر، في عائلة لها خلفية هندسية قوية.'
                        },
                        category: {
                            en: 'Personal',
                            ar: 'شخصي'
                        }
                    },
                    {
                        date: {
                            en: '1983-1987',
                            ar: '1983-1987'
                        },
                        title: {
                            en: 'Bachelor of Engineering',
                            ar: 'بكالوريوس الهندسة'
                        },
                        subtitle: {
                            en: 'Cairo University - Civil Engineering',
                            ar: 'جامعة القاهرة - الهندسة المدنية'
                        },
                        description: {
                            en: 'Graduated with honors from Cairo University with a degree in Civil Engineering, specializing in structural design.',
                            ar: 'تخرج بامتياز من جامعة القاهرة بدرجة في الهندسة المدنية، متخصصاً في التصميم الإنشائي.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1987-1990',
                            ar: '1987-1990'
                        },
                        title: {
                            en: 'Master of Engineering',
                            ar: 'ماجستير الهندسة'
                        },
                        subtitle: {
                            en: 'MIT - Advanced Construction Management',
                            ar: 'معهد ماساتشوستس للتكنولوجيا - إدارة البناء المتقدمة'
                        },
                        description: {
                            en: 'Pursued advanced studies at MIT, focusing on construction management and sustainable building practices.',
                            ar: 'درس الدراسات العليا في معهد ماساتشوستس للتكنولوجيا، متخصصاً في إدارة البناء والممارسات المستدامة.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1990-1995',
                            ar: '1990-1995'
                        },
                        title: {
                            en: 'Project Engineer',
                            ar: 'مهندس مشروع'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Infrastructure Division',
                            ar: 'المقاولون العرب - قسم البنية التحتية'
                        },
                        description: {
                            en: 'Started career at Arab Contractors, working on major infrastructure projects including highways and bridges.',
                            ar: 'بدأ مسيرته المهنية في المقاولون العرب، يعمل على مشاريع البنية التحتية الكبرى بما في ذلك الطرق السريعة والكباري.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '1995-2000',
                            ar: '1995-2000'
                        },
                        title: {
                            en: 'Senior Project Manager',
                            ar: 'مدير مشروع أول'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Mega Projects',
                            ar: 'المقاولون العرب - المشاريع العملاقة'
                        },
                        description: {
                            en: 'Led multiple mega projects including the Cairo Metro expansion and major commercial developments.',
                            ar: 'قاد العديد من المشاريع العملاقة بما في ذلك توسعة مترو القاهرة والتطويرات التجارية الكبرى.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2000-2005',
                            ar: '2000-2005'
                        },
                        title: {
                            en: 'Director of Operations',
                            ar: 'مدير العمليات'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Operations Division',
                            ar: 'المقاولون العرب - قسم العمليات'
                        },
                        description: {
                            en: 'Oversaw all operational activities, managing over 50 projects simultaneously across Egypt and the Middle East.',
                            ar: 'أشرف على جميع الأنشطة التشغيلية، وإدارة أكثر من 50 مشروعاً في وقت واحد عبر مصر والشرق الأوسط.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2005-2010',
                            ar: '2005-2010'
                        },
                        title: {
                            en: 'Chief Operations Officer',
                            ar: 'الرئيس التنفيذي للعمليات'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Executive Management',
                            ar: 'المقاولون العرب - الإدارة التنفيذية'
                        },
                        description: {
                            en: 'Served as COO, implementing strategic initiatives and modernizing company operations with advanced technologies.',
                            ar: 'عمل كرئيس تنفيذي للعمليات، وتنفيذ المبادرات الاستراتيجية وتحديث عمليات الشركة بالتكنولوجيات المتقدمة.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2010-Present',
                            ar: '2010-الحالي'
                        },
                        title: {
                            en: 'Chief Executive Officer',
                            ar: 'الرئيس التنفيذي'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Executive Leadership',
                            ar: 'المقاولون العرب - القيادة التنفيذية'
                        },
                        description: {
                            en: 'Appointed CEO, leading the company through unprecedented growth and expansion into international markets.',
                            ar: 'تم تعيينه كرئيس تنفيذي، يقود الشركة خلال نمو غير مسبوق والتوسع في الأسواق الدولية.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    }
                ]
            },
            'Dr. Sarah Al-Mansouri': {
                name: {
                    en: 'Dr. Sarah Al-Mansouri',
                    ar: 'د. سارة المنصوري'
                },
                position: {
                    en: 'Chief Financial Officer',
                    ar: 'الرئيس المالي'
                },
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                email: 'sarah.mansouri@arabcontractors.com',
                phone: '+20 2 1234 5679',
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                timeline: [
                    {
                        date: {
                            en: '1970',
                            ar: '1970'
                        },
                        title: {
                            en: 'Birth',
                            ar: 'الميلاد'
                        },
                        subtitle: {
                            en: 'Born in Alexandria, Egypt',
                            ar: 'ولدت في الإسكندرية، مصر'
                        },
                        description: {
                            en: 'Sarah Al-Mansouri was born in Alexandria, Egypt, showing early aptitude for mathematics and finance.',
                            ar: 'ولدت سارة المنصوري في الإسكندرية، مصر، وأظهرت ميلاً مبكراً للرياضيات والمالية.'
                        },
                        category: {
                            en: 'Personal',
                            ar: 'شخصي'
                        }
                    },
                    {
                        date: {
                            en: '1988-1992',
                            ar: '1988-1992'
                        },
                        title: {
                            en: 'Bachelor of Commerce',
                            ar: 'بكالوريوس التجارة'
                        },
                        subtitle: {
                            en: 'Alexandria University - Accounting & Finance',
                            ar: 'جامعة الإسكندرية - المحاسبة والمالية'
                        },
                        description: {
                            en: 'Graduated with distinction from Alexandria University, specializing in accounting and financial management.',
                            ar: 'تخرجت بامتياز من جامعة الإسكندرية، متخصصة في المحاسبة والإدارة المالية.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1992-1995',
                            ar: '1992-1995'
                        },
                        title: {
                            en: 'Master of Business Administration',
                            ar: 'ماجستير إدارة الأعمال'
                        },
                        subtitle: {
                            en: 'Harvard Business School - Finance',
                            ar: 'كلية هارفارد للأعمال - المالية'
                        },
                        description: {
                            en: 'Earned MBA from Harvard Business School with focus on corporate finance and investment strategies.',
                            ar: 'حصلت على ماجستير إدارة الأعمال من كلية هارفارد للأعمال متخصصة في التمويل المؤسسي واستراتيجيات الاستثمار.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1995-1998',
                            ar: '1995-1998'
                        },
                        title: {
                            en: 'PhD in Financial Economics',
                            ar: 'دكتوراه في الاقتصاد المالي'
                        },
                        subtitle: {
                            en: 'London School of Economics',
                            ar: 'كلية لندن للاقتصاد'
                        },
                        description: {
                            en: 'Completed doctoral research on emerging market finance and infrastructure investment patterns.',
                            ar: 'أكملت البحث الدكتوراه حول التمويل في الأسواق الناشئة وأنماط الاستثمار في البنية التحتية.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1998-2003',
                            ar: '1998-2003'
                        },
                        title: {
                            en: 'Financial Analyst',
                            ar: 'محلل مالي'
                        },
                        subtitle: {
                            en: 'Goldman Sachs - Investment Banking',
                            ar: 'جولدمان ساكس - الخدمات المصرفية الاستثمارية'
                        },
                        description: {
                            en: 'Worked in investment banking, specializing in infrastructure and construction sector financing.',
                            ar: 'عملت في الخدمات المصرفية الاستثمارية، متخصصة في تمويل قطاع البنية التحتية والبناء.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2003-2008',
                            ar: '2003-2008'
                        },
                        title: {
                            en: 'Senior Financial Manager',
                            ar: 'مدير مالي أول'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Finance Department',
                            ar: 'المقاولون العرب - قسم المالية'
                        },
                        description: {
                            en: 'Joined Arab Contractors, managing financial operations and developing investment strategies.',
                            ar: 'انضمت إلى المقاولون العرب، وإدارة العمليات المالية وتطوير استراتيجيات الاستثمار.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2008-2015',
                            ar: '2008-2015'
                        },
                        title: {
                            en: 'Director of Finance',
                            ar: 'مدير المالية'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Financial Leadership',
                            ar: 'المقاولون العرب - القيادة المالية'
                        },
                        description: {
                            en: 'Led financial restructuring and implemented modern financial management systems.',
                            ar: 'قاد إعادة الهيكلة المالية ونفذ أنظمة الإدارة المالية الحديثة.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2015-Present',
                            ar: '2015-الحالي'
                        },
                        title: {
                            en: 'Chief Financial Officer',
                            ar: 'الرئيس المالي'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Executive Finance',
                            ar: 'المقاولون العرب - المالية التنفيذية'
                        },
                        description: {
                            en: 'Appointed CFO, overseeing all financial operations and strategic financial planning.',
                            ar: 'تم تعيينها كرئيس مالي، تشرف على جميع العمليات المالية والتخطيط المالي الاستراتيجي.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    }
                ]
            },
            'Eng. Omar Khalil': {
                name: {
                    en: 'Eng. Omar Khalil',
                    ar: 'م. عمر خليل'
                },
                position: {
                    en: 'Chief Operations Officer',
                    ar: 'الرئيس التنفيذي للعمليات'
                },
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                email: 'omar.khalil@arabcontractors.com',
                phone: '+20 2 1234 5680',
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                timeline: [
                    {
                        date: {
                            en: '1968',
                            ar: '1968'
                        },
                        title: {
                            en: 'Birth',
                            ar: 'الميلاد'
                        },
                        subtitle: {
                            en: 'Born in Giza, Egypt',
                            ar: 'ولد في الجيزة، مصر'
                        },
                        description: {
                            en: 'Omar Khalil was born in Giza, Egypt, with a natural talent for problem-solving and engineering.',
                            ar: 'ولد عمر خليل في الجيزة، مصر، مع موهبة طبيعية في حل المشاكل والهندسة.'
                        },
                        category: {
                            en: 'Personal',
                            ar: 'شخصي'
                        }
                    },
                    {
                        date: {
                            en: '1986-1990',
                            ar: '1986-1990'
                        },
                        title: {
                            en: 'Bachelor of Engineering',
                            ar: 'بكالوريوس الهندسة'
                        },
                        subtitle: {
                            en: 'Ain Shams University - Mechanical Engineering',
                            ar: 'جامعة عين شمس - الهندسة الميكانيكية'
                        },
                        description: {
                            en: 'Graduated from Ain Shams University with a degree in Mechanical Engineering, focusing on industrial systems.',
                            ar: 'تخرج من جامعة عين شمس بدرجة في الهندسة الميكانيكية، متخصصاً في الأنظمة الصناعية.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1990-1993',
                            ar: '1990-1993'
                        },
                        title: {
                            en: 'Master of Engineering',
                            ar: 'ماجستير الهندسة'
                        },
                        subtitle: {
                            en: 'Stanford University - Operations Research',
                            ar: 'جامعة ستانفورد - بحوث العمليات'
                        },
                        description: {
                            en: 'Pursued advanced studies at Stanford University, specializing in operations research and systems optimization.',
                            ar: 'درس الدراسات العليا في جامعة ستانفورد، متخصصاً في بحوث العمليات وتحسين الأنظمة.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1993-1998',
                            ar: '1993-1998'
                        },
                        title: {
                            en: 'Operations Engineer',
                            ar: 'مهندس عمليات'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Operations Division',
                            ar: 'المقاولون العرب - قسم العمليات'
                        },
                        description: {
                            en: 'Started career optimizing construction operations and implementing lean manufacturing principles.',
                            ar: 'بدأ مسيرته المهنية في تحسين عمليات البناء وتنفيذ مبادئ التصنيع الرشيق.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '1998-2005',
                            ar: '1998-2005'
                        },
                        title: {
                            en: 'Operations Manager',
                            ar: 'مدير العمليات'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Regional Operations',
                            ar: 'المقاولون العرب - العمليات الإقليمية'
                        },
                        description: {
                            en: 'Managed regional operations across multiple construction sites, improving efficiency by 40%.',
                            ar: 'أدار العمليات الإقليمية عبر مواقع البناء المتعددة، وحسن الكفاءة بنسبة 40%.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2005-2012',
                            ar: '2005-2012'
                        },
                        title: {
                            en: 'Director of Operations',
                            ar: 'مدير العمليات'
                        },
                        subtitle: {
                            en: 'Arab Contractors - National Operations',
                            ar: 'المقاولون العرب - العمليات الوطنية'
                        },
                        description: {
                            en: 'Led national operations, implementing advanced project management methodologies.',
                            ar: 'قاد العمليات الوطنية، ونفذ منهجيات إدارة المشاريع المتقدمة.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2012-Present',
                            ar: '2012-الحالي'
                        },
                        title: {
                            en: 'Chief Operations Officer',
                            ar: 'الرئيس التنفيذي للعمليات'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Executive Operations',
                            ar: 'المقاولون العرب - العمليات التنفيذية'
                        },
                        description: {
                            en: 'Appointed COO, overseeing all operational activities and driving organizational excellence.',
                            ar: 'تم تعيينه كرئيس تنفيذي للعمليات، يشرف على جميع الأنشطة التشغيلية ويقود التميز التنظيمي.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    }
                ]
            },
            'Eng. Fatima Zahra': {
                name: {
                    en: 'Eng. Fatima Zahra',
                    ar: 'م. فاطمة الزهراء'
                },
                position: {
                    en: 'Chief Technology Officer',
                    ar: 'الرئيس التنفيذي للتكنولوجيا'
                },
                image: 'https://images.unsplash.com/photo-1438761681033-6461a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                email: 'fatima.zahra@arabcontractors.com',
                phone: '+20 2 1234 5681',
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                timeline: [
                    {
                        date: {
                            en: '1972',
                            ar: '1972'
                        },
                        title: {
                            en: 'Birth',
                            ar: 'الميلاد'
                        },
                        subtitle: {
                            en: 'Born in Cairo, Egypt',
                            ar: 'ولدت في القاهرة، مصر'
                        },
                        description: {
                            en: 'Fatima Zahra was born in Cairo, Egypt, showing early interest in technology and innovation.',
                            ar: 'ولدت فاطمة الزهراء في القاهرة، مصر، وأظهرت اهتماماً مبكراً بالتكنولوجيا والابتكار.'
                        },
                        category: {
                            en: 'Personal',
                            ar: 'شخصي'
                        }
                    },
                    {
                        date: {
                            en: '1990-1994',
                            ar: '1990-1994'
                        },
                        title: {
                            en: 'Bachelor of Computer Science',
                            ar: 'بكالوريوس علوم الحاسوب'
                        },
                        subtitle: {
                            en: 'Cairo University - Computer Science',
                            ar: 'جامعة القاهرة - علوم الحاسوب'
                        },
                        description: {
                            en: 'Graduated with honors from Cairo University, specializing in software engineering and systems architecture.',
                            ar: 'تخرجت بامتياز من جامعة القاهرة، متخصصة في هندسة البرمجيات وهندسة الأنظمة.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1994-1997',
                            ar: '1994-1997'
                        },
                        title: {
                            en: 'Master of Technology',
                            ar: 'ماجستير التكنولوجيا'
                        },
                        subtitle: {
                            en: 'MIT - Information Technology',
                            ar: 'معهد ماساتشوستس للتكنولوجيا - تكنولوجيا المعلومات'
                        },
                        description: {
                            en: 'Earned master\'s degree from MIT, focusing on emerging technologies and digital transformation.',
                            ar: 'حصلت على درجة الماجستير من معهد ماساتشوستس للتكنولوجيا، متخصصة في التكنولوجيات الناشئة والتحول الرقمي.'
                        },
                        category: {
                            en: 'Education',
                            ar: 'تعليم'
                        }
                    },
                    {
                        date: {
                            en: '1997-2002',
                            ar: '1997-2002'
                        },
                        title: {
                            en: 'Software Engineer',
                            ar: 'مهندسة برمجيات'
                        },
                        subtitle: {
                            en: 'Microsoft - Development Team',
                            ar: 'مايكروسوفت - فريق التطوير'
                        },
                        description: {
                            en: 'Worked at Microsoft developing enterprise software solutions and cloud computing platforms.',
                            ar: 'عملت في مايكروسوفت لتطوير حلول البرمجيات المؤسسية ومنصات الحوسبة السحابية.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2002-2008',
                            ar: '2002-2008'
                        },
                        title: {
                            en: 'Technology Manager',
                            ar: 'مديرة التكنولوجيا'
                        },
                        subtitle: {
                            en: 'Arab Contractors - IT Department',
                            ar: 'المقاولون العرب - قسم تكنولوجيا المعلومات'
                        },
                        description: {
                            en: 'Joined Arab Contractors, modernizing IT infrastructure and implementing digital solutions.',
                            ar: 'انضمت إلى المقاولون العرب، وتحديث البنية التحتية لتكنولوجيا المعلومات وتنفيذ الحلول الرقمية.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2008-2015',
                            ar: '2008-2015'
                        },
                        title: {
                            en: 'Director of Technology',
                            ar: 'مديرة التكنولوجيا'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Technology Leadership',
                            ar: 'المقاولون العرب - قيادة التكنولوجيا'
                        },
                        description: {
                            en: 'Led digital transformation initiatives and implemented smart construction technologies.',
                            ar: 'قادت مبادرات التحول الرقمي ونفذت تكنولوجيات البناء الذكية.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    },
                    {
                        date: {
                            en: '2015-Present',
                            ar: '2015-الحالي'
                        },
                        title: {
                            en: 'Chief Technology Officer',
                            ar: 'الرئيس التنفيذي للتكنولوجيا'
                        },
                        subtitle: {
                            en: 'Arab Contractors - Executive Technology',
                            ar: 'المقاولون العرب - التكنولوجيا التنفيذية'
                        },
                        description: {
                            en: 'Appointed CTO, driving innovation and implementing cutting-edge technologies across all operations.',
                            ar: 'تم تعيينها كرئيس تنفيذي للتكنولوجيا، تقود الابتكار وتنفذ أحدث التكنولوجيات في جميع العمليات.'
                        },
                        category: {
                            en: 'Professional',
                            ar: 'مهني'
                        }
                    }
                ]
            }
        };
        
        return leaders[leaderName] || null;
    }

    // ===== Show Leader Details Modal =====
    function showLeaderDetails(leaderData) {
        const currentLang = $('html').attr('lang') || 'en';
        const isRTL = currentLang === 'ar';
        
        // Update leader profile
        $('.leader-profile-image').attr('src', leaderData.image);
        $('.leader-name').html(`
            <span class="en-text">${leaderData.name.en}</span>
            <span class="ar-text">${leaderData.name.ar}</span>
        `);
        $('.leader-position').html(`
            <span class="en-text">${leaderData.position.en}</span>
            <span class="ar-text">${leaderData.position.ar}</span>
        `);
        
        // Update contact info
        $('.leader-email').text(leaderData.email);
        $('.leader-phone').text(leaderData.phone);
        $('.leader-location').html(`
            <span class="en-text">${leaderData.location.en}</span>
            <span class="ar-text">${leaderData.location.ar}</span>
        `);
        
        // Update timeline
        const timeline = $('.timeline');
        timeline.empty();
        
        leaderData.timeline.forEach(item => {
            const timelineItem = $(`
                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-date">
                            <span class="en-text">${item.date.en}</span>
                            <span class="ar-text">${item.date.ar}</span>
                        </div>
                        <div class="timeline-title-item">
                            <span class="en-text">${item.title.en}</span>
                            <span class="ar-text">${item.title.ar}</span>
                        </div>
                        <div class="timeline-subtitle">
                            <i class="fas fa-briefcase"></i>
                            <span class="en-text">${item.subtitle.en}</span>
                            <span class="ar-text">${item.subtitle.ar}</span>
                        </div>
                        <div class="timeline-description">
                            <span class="en-text">${item.description.en}</span>
                            <span class="ar-text">${item.description.ar}</span>
                        </div>
                        <div class="timeline-category">
                            <i class="fas fa-tag"></i>
                            <span class="en-text">${item.category.en}</span>
                            <span class="ar-text">${item.category.ar}</span>
                        </div>
                    </div>
                </div>
            `);
            timeline.append(timelineItem);
        });
        
        // Show/hide language-specific content
        if (isRTL) {
            $('.en-text').hide();
            $('.ar-text').show();
        } else {
            $('.en-text').show();
            $('.ar-text').hide();
        }
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('leadershipDetailsModal'));
        modal.show();
    }

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

    // ===== Project Cards Animation =====
    $('.project-card').hover(
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1.1)');
            $(this).find('.project-overlay').css('opacity', '1');
        },
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1)');
            $(this).find('.project-overlay').css('opacity', '0');
        }
    );

    // ===== Project Card Click Handler =====
    $('.project-card').on('click', function() {
        const projectId = $(this).data('project');
        showProjectDetails(projectId);
    });

    // ===== Project Details Data =====
    function getProjectDetails(projectId) {
        const projects = {
            'cairo-alexandria': {
                title: {
                    en: 'Cairo-Alexandria Highway',
                    ar: 'طريق القاهرة-الإسكندرية'
                },
                category: {
                    en: 'Roads & Highways',
                    ar: 'الطرق والكباري'
                },
                duration: {
                    en: '2023-2024',
                    ar: '2023-2024'
                },
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                budget: {
                    en: '$500M',
                    ar: '500 مليون دولار'
                },
                team: {
                    en: '500+ Engineers',
                    ar: '500+ مهندس'
                },
                area: {
                    en: '180 km',
                    ar: '180 كم'
                },
                floors: {
                    en: 'N/A',
                    ar: 'غير محدد'
                },
                status: {
                    en: 'In Progress',
                    ar: 'قيد التنفيذ'
                },
                description: {
                    en: 'A major highway expansion project connecting Egypt\'s two largest cities with modern infrastructure and smart traffic management systems. This project includes the construction of multiple lanes, intelligent transportation systems, rest areas, and emergency services facilities.',
                    ar: 'مشروع توسعة طريق رئيسي يربط أكبر مدينتين في مصر مع بنية تحتية حديثة وأنظمة إدارة ذكية للمرور. يتضمن هذا المشروع بناء ممرات متعددة وأنظمة نقل ذكية ومناطق راحة ومرافق خدمات الطوارئ.'
                },
                features: {
                    en: [
                        '6-lane highway with emergency lanes',
                        'Smart traffic management system',
                        'Rest areas and service stations',
                        'Emergency response facilities',
                        'Advanced lighting and signage',
                        'Environmental impact mitigation'
                    ],
                    ar: [
                        'طريق سريع بـ 6 ممرات مع ممرات الطوارئ',
                        'نظام إدارة مرور ذكي',
                        'مناطق راحة ومحطات خدمة',
                        'مرافق الاستجابة للطوارئ',
                        'إضاءة متقدمة ولافتات',
                        'تخفيف التأثير البيئي'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'ring-road': {
                title: {
                    en: 'Cairo Ring Road',
                    ar: 'طريق القاهرة الدائري'
                },
                category: {
                    en: 'Roads & Highways',
                    ar: 'الطرق والكباري'
                },
                duration: {
                    en: '2022-2023',
                    ar: '2022-2023'
                },
                location: {
                    en: 'Greater Cairo',
                    ar: 'القاهرة الكبرى'
                },
                budget: {
                    en: '$300M',
                    ar: '300 مليون دولار'
                },
                team: {
                    en: '300+ Engineers',
                    ar: '300+ مهندس'
                },
                area: {
                    en: '120 km',
                    ar: '120 كم'
                },
                floors: {
                    en: 'N/A',
                    ar: 'غير محدد'
                },
                status: {
                    en: 'Completed',
                    ar: 'مكتمل'
                },
                description: {
                    en: 'Comprehensive ring road system around Greater Cairo with multiple interchanges, tunnels, and bridges. This project significantly improved traffic flow and reduced congestion in the capital region.',
                    ar: 'نظام طريق دائري شامل حول القاهرة الكبرى مع تقاطعات متعددة وأنفاق وكباري. حسّن هذا المشروع تدفق المرور بشكل كبير وقلل من الازدحام في منطقة العاصمة.'
                },
                features: {
                    en: [
                        'Multi-level interchanges',
                        'Tunnels and bridges',
                        'Smart traffic signals',
                        'Emergency lanes',
                        'Public transportation integration',
                        'Landscaping and green spaces'
                    ],
                    ar: [
                        'تقاطعات متعددة المستويات',
                        'أنفاق وكباري',
                        'إشارات مرور ذكية',
                        'ممرات الطوارئ',
                        'تكامل النقل العام',
                        'تنسيق الحدائق والمساحات الخضراء'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'nile-bridge': {
                title: {
                    en: 'New Nile Bridge',
                    ar: 'كوبري النيل الجديد'
                },
                category: {
                    en: 'Bridges & Tunnels',
                    ar: 'الكباري والأنفاق'
                },
                duration: {
                    en: '2021-2023',
                    ar: '2021-2023'
                },
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                budget: {
                    en: '$250M',
                    ar: '250 مليون دولار'
                },
                team: {
                    en: '200+ Engineers',
                    ar: '200+ مهندس'
                },
                area: {
                    en: '2.5 km span',
                    ar: 'امتداد 2.5 كم'
                },
                floors: {
                    en: 'N/A',
                    ar: 'غير محدد'
                },
                status: {
                    en: 'Completed',
                    ar: 'مكتمل'
                },
                description: {
                    en: 'Modern suspension bridge connecting east and west Cairo across the Nile River. This architectural marvel features advanced engineering techniques and sustainable design principles.',
                    ar: 'كوبري معلق حديث يربط شرق وغرب القاهرة عبر نهر النيل. يتميز هذا المعجزة المعمارية بتقنيات هندسية متقدمة ومبادئ التصميم المستدام.'
                },
                features: {
                    en: [
                        'Suspension bridge design',
                        'Advanced structural engineering',
                        'Earthquake-resistant construction',
                        'LED lighting system',
                        'Pedestrian walkways',
                        'Bicycle lanes'
                    ],
                    ar: [
                        'تصميم كوبري معلق',
                        'هندسة إنشائية متقدمة',
                        'بناء مقاوم للزلازل',
                        'نظام إضاءة LED',
                        'ممرات للمشاة',
                        'ممرات للدراجات'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'nile-tower': {
                title: {
                    en: 'Nile Business Tower',
                    ar: 'برج النيل للأعمال'
                },
                category: {
                    en: 'Towers & Buildings',
                    ar: 'الأبراج والمباني'
                },
                duration: {
                    en: '2022-2024',
                    ar: '2022-2024'
                },
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                budget: {
                    en: '$300M',
                    ar: '300 مليون دولار'
                },
                team: {
                    en: '400+ Engineers',
                    ar: '400+ مهندس'
                },
                area: {
                    en: '85,000 sqm',
                    ar: '85,000 متر مربع'
                },
                floors: {
                    en: '50 floors',
                    ar: '50 طابق'
                },
                status: {
                    en: 'In Progress',
                    ar: 'قيد التنفيذ'
                },
                description: {
                    en: '50-story mixed-use commercial tower featuring sustainable design, smart building technology, and panoramic Nile views. This landmark project sets new standards for modern office spaces in Egypt.',
                    ar: 'برج تجاري متعدد الاستخدامات من 50 طابق يتميز بتصميم مستدام وتكنولوجيا المباني الذكية وإطلالات بانورامية على النيل. يضع هذا المشروع المعالم معايير جديدة للمساحات المكتبية الحديثة في مصر.'
                },
                features: {
                    en: [
                        'LEED Gold certification',
                        'Smart building automation',
                        'Solar panel integration',
                        'Advanced HVAC systems',
                        'High-speed elevators',
                        'Rooftop garden'
                    ],
                    ar: [
                        'شهادة LEED الذهبية',
                        'أتمتة المباني الذكية',
                        'تكامل الألواح الشمسية',
                        'أنظمة تكييف متقدمة',
                        'مصاعد عالية السرعة',
                        'حديقة على السطح'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'new-cairo': {
                title: {
                    en: 'New Cairo Gardens',
                    ar: 'حدائق القاهرة الجديدة'
                },
                category: {
                    en: 'Residential',
                    ar: 'سكني'
                },
                duration: {
                    en: '2021-2023',
                    ar: '2021-2023'
                },
                location: {
                    en: 'New Cairo, Egypt',
                    ar: 'القاهرة الجديدة، مصر'
                },
                budget: {
                    en: '$250M',
                    ar: '250 مليون دولار'
                },
                team: {
                    en: '350+ Engineers',
                    ar: '350+ مهندس'
                },
                area: {
                    en: '500,000 sqm',
                    ar: '500,000 متر مربع'
                },
                floors: {
                    en: '15 floors max',
                    ar: '15 طابق كحد أقصى'
                },
                status: {
                    en: 'Completed',
                    ar: 'مكتمل'
                },
                description: {
                    en: 'Luxury residential complex with 2000 units, featuring green spaces, community facilities, and modern amenities. This project creates a sustainable living environment with world-class facilities.',
                    ar: 'مجمع سكني فاخر يحتوي على 2000 وحدة، ويتميز بالمساحات الخضراء والمرافق المجتمعية والخدمات الحديثة. ينشئ هذا المشروع بيئة معيشية مستدامة مع مرافق عالمية المستوى.'
                },
                features: {
                    en: [
                        '2000 residential units',
                        'Community center',
                        'Swimming pools',
                        'Sports facilities',
                        'Shopping center',
                        'Green spaces and parks'
                    ],
                    ar: [
                        '2000 وحدة سكنية',
                        'مركز مجتمعي',
                        'مسابح',
                        'مرافق رياضية',
                        'مركز تسوق',
                        'مساحات خضراء وحدائق'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'airport-maintenance': {
                title: {
                    en: 'Cairo Airport Maintenance',
                    ar: 'صيانة مطار القاهرة'
                },
                category: {
                    en: 'Maintenance & Services',
                    ar: 'الصيانة والخدمات'
                },
                duration: {
                    en: '2020-2024',
                    ar: '2020-2024'
                },
                location: {
                    en: 'Cairo, Egypt',
                    ar: 'القاهرة، مصر'
                },
                budget: {
                    en: '$150M',
                    ar: '150 مليون دولار'
                },
                team: {
                    en: '250+ Engineers',
                    ar: '250+ مهندس'
                },
                area: {
                    en: 'Terminal-wide',
                    ar: 'جميع أنحاء المبنى'
                },
                floors: {
                    en: 'All levels',
                    ar: 'جميع المستويات'
                },
                status: {
                    en: 'Ongoing',
                    ar: 'مستمر'
                },
                description: {
                    en: 'Comprehensive maintenance services for Cairo International Airport facilities, including terminal buildings, runways, and infrastructure. This project ensures optimal operation and safety standards.',
                    ar: 'خدمات صيانة شاملة لمرافق مطار القاهرة الدولي، بما في ذلك مباني المطار والمدارج والبنية التحتية. يضمن هذا المشروع التشغيل الأمثل ومعايير السلامة.'
                },
                features: {
                    en: [
                        '24/7 maintenance services',
                        'Preventive maintenance programs',
                        'Emergency response systems',
                        'Infrastructure monitoring',
                        'Safety compliance',
                        'Energy efficiency optimization'
                    ],
                    ar: [
                        'خدمات صيانة على مدار الساعة',
                        'برامج الصيانة الوقائية',
                        'أنظمة الاستجابة للطوارئ',
                        'مراقبة البنية التحتية',
                        'الامتثال للسلامة',
                        'تحسين كفاءة الطاقة'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'riyadh-metro': {
                title: {
                    en: 'Riyadh Metro Project',
                    ar: 'مشروع مترو الرياض'
                },
                category: {
                    en: 'Transportation',
                    ar: 'نقل'
                },
                duration: {
                    en: '2019-2024',
                    ar: '2019-2024'
                },
                location: {
                    en: 'Riyadh, Saudi Arabia',
                    ar: 'الرياض، السعودية'
                },
                budget: {
                    en: '$800M',
                    ar: '800 مليون دولار'
                },
                team: {
                    en: '600+ Engineers',
                    ar: '600+ مهندس'
                },
                area: {
                    en: '176 km network',
                    ar: 'شبكة 176 كم'
                },
                floors: {
                    en: 'Underground & Elevated',
                    ar: 'تحت الأرض ومرتفع'
                },
                status: {
                    en: 'In Progress',
                    ar: 'قيد التنفيذ'
                },
                description: {
                    en: 'Metro system development with 6 lines and 85 stations across Riyadh. This massive infrastructure project will transform public transportation in the Saudi capital.',
                    ar: 'تطوير نظام مترو بـ 6 خطوط و85 محطة عبر الرياض. ستحول مشروع البنية التحتية الضخم هذا النقل العام في العاصمة السعودية.'
                },
                features: {
                    en: [
                        '6 metro lines',
                        '85 stations',
                        'Driverless trains',
                        'Smart ticketing system',
                        'Accessibility features',
                        'Integration with bus network'
                    ],
                    ar: [
                        '6 خطوط مترو',
                        '85 محطة',
                        'قطارات بدون سائق',
                        'نظام تذاكر ذكي',
                        'ميزات إمكانية الوصول',
                        'التكامل مع شبكة الحافلات'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'dubai-tower': {
                title: {
                    en: 'Dubai Business Tower',
                    ar: 'برج دبي للأعمال'
                },
                category: {
                    en: 'Towers & Buildings',
                    ar: 'الأبراج والمباني'
                },
                duration: {
                    en: '2021-2024',
                    ar: '2021-2024'
                },
                location: {
                    en: 'Dubai, UAE',
                    ar: 'دبي، الإمارات'
                },
                budget: {
                    en: '$450M',
                    ar: '450 مليون دولار'
                },
                team: {
                    en: '450+ Engineers',
                    ar: '450+ مهندس'
                },
                area: {
                    en: '120,000 sqm',
                    ar: '120,000 متر مربع'
                },
                floors: {
                    en: '65 floors',
                    ar: '65 طابق'
                },
                status: {
                    en: 'In Progress',
                    ar: 'قيد التنفيذ'
                },
                description: {
                    en: 'Luxury commercial tower in Dubai\'s business district with smart building systems and sustainable design. This project represents the future of office spaces in the UAE.',
                    ar: 'برج تجاري فاخر في منطقة الأعمال بدبي مع أنظمة المباني الذكية والتصميم المستدام. يمثل هذا المشروع مستقبل المساحات المكتبية في الإمارات.'
                },
                features: {
                    en: [
                        'Smart building technology',
                        'LEED Platinum certification',
                        'Advanced security systems',
                        'High-speed internet',
                        'Conference facilities',
                        'Rooftop restaurant'
                    ],
                    ar: [
                        'تكنولوجيا المباني الذكية',
                        'شهادة LEED البلاتينية',
                        'أنظمة أمان متقدمة',
                        'إنترنت عالي السرعة',
                        'مرافق المؤتمرات',
                        'مطعم على السطح'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            },
            'kuwait-bridge': {
                title: {
                    en: 'Kuwait Bay Bridge',
                    ar: 'كوبري خليج الكويت'
                },
                category: {
                    en: 'Bridges & Tunnels',
                    ar: 'الكباري والأنفاق'
                },
                duration: {
                    en: '2020-2023',
                    ar: '2020-2023'
                },
                location: {
                    en: 'Kuwait City, Kuwait',
                    ar: 'مدينة الكويت، الكويت'
                },
                budget: {
                    en: '$350M',
                    ar: '350 مليون دولار'
                },
                team: {
                    en: '280+ Engineers',
                    ar: '280+ مهندس'
                },
                area: {
                    en: '3.2 km span',
                    ar: 'امتداد 3.2 كم'
                },
                floors: {
                    en: 'N/A',
                    ar: 'غير محدد'
                },
                status: {
                    en: 'Completed',
                    ar: 'مكتمل'
                },
                description: {
                    en: 'Major bridge connecting Kuwait City with the northern regions across Kuwait Bay. This engineering marvel features advanced structural design and sustainable construction methods.',
                    ar: 'كوبري رئيسي يربط مدينة الكويت بالمناطق الشمالية عبر خليج الكويت. تتميز هذه المعجزة الهندسية بتصميم إنشائي متقدم وطرق بناء مستدامة.'
                },
                features: {
                    en: [
                        'Cable-stayed bridge design',
                        'Marine environment protection',
                        'Advanced corrosion resistance',
                        'Emergency response systems',
                        'Navigation channel clearance',
                        'Seismic resistance'
                    ],
                    ar: [
                        'تصميم كوبري معلق بالكابلات',
                        'حماية البيئة البحرية',
                        'مقاومة متقدمة للتآكل',
                        'أنظمة الاستجابة للطوارئ',
                        'مساحة ممر الملاحة',
                        'مقاومة الزلازل'
                    ]
                },
                images: [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                ]
            }
        };
        
        return projects[projectId] || null;
    }

    // ===== Show Project Details Modal =====
    function showProjectDetails(projectId) {
        const project = projects[projectId];
        if (!project) return;

        // Update modal title
        document.getElementById('projectDetailsModalLabel').innerHTML = `
            <i class="fas fa-project-diagram me-2"></i>
            <span class="en-text">${project.title.en}</span>
            <span class="ar-text">${project.title.ar}</span>
        `;

        // Populate carousel with project images
        const carouselContainer = document.querySelector('.carousel-container');
        const carouselIndicators = document.querySelector('.carousel-indicators');
        
        carouselContainer.innerHTML = '';
        carouselIndicators.innerHTML = '';

        // Add multiple images for the carousel (using different angles/views)
        const projectImages = [
            project.image,
            `https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80`,
            `https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80`,
            `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80`
        ];

        projectImages.forEach((image, index) => {
            // Create carousel slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${image}" alt="${project.title.en} - View ${index + 1}">
                <div class="carousel-overlay">
                    <h6>
                        <span class="en-text">${project.title.en}</span>
                        <span class="ar-text">${project.title.ar}</span>
                    </h6>
                    <p>
                        <span class="en-text">View ${index + 1} of ${projectImages.length}</span>
                        <span class="ar-text">منظر ${index + 1} من ${projectImages.length}</span>
                    </p>
                </div>
            `;
            carouselContainer.appendChild(slide);

            // Create indicator
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('data-slide', index);
            indicator.addEventListener('click', () => goToSlide(index));
            carouselIndicators.appendChild(indicator);
        });

        // Update project information
        document.querySelector('.project-full-description').innerHTML = `
            <span class="en-text">${project.description.en}</span>
            <span class="ar-text">${project.description.ar}</span>
        `;

        // Populate features
        const featuresList = document.querySelector('.project-features-list');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item mb-2';
            featureItem.innerHTML = `
                <i class="fas fa-check text-success me-2"></i>
                <span class="en-text">${feature.en}</span>
                <span class="ar-text">${feature.ar}</span>
            `;
            featuresList.appendChild(featureItem);
        });

        // Update project meta information
        document.querySelector('.project-category').innerHTML = `
            <span class="en-text">${project.category.en}</span>
            <span class="ar-text">${project.category.ar}</span>
        `;
        document.querySelector('.project-duration').innerHTML = `
            <span class="en-text">${project.duration.en}</span>
            <span class="ar-text">${project.duration.ar}</span>
        `;
        document.querySelector('.project-location').innerHTML = `
            <span class="en-text">${project.location.en}</span>
            <span class="ar-text">${project.location.ar}</span>
        `;
        document.querySelector('.project-budget').innerHTML = `
            <span class="en-text">${project.budget.en}</span>
            <span class="ar-text">${project.budget.ar}</span>
        `;
        document.querySelector('.project-team').innerHTML = `
            <span class="en-text">${project.team.en}</span>
            <span class="ar-text">${project.team.ar}</span>
        `;
        document.querySelector('.project-status').innerHTML = `
            <span class="en-text">${project.status.en}</span>
            <span class="ar-text">${project.status.ar}</span>
        `;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('projectDetailsModal'));
        modal.show();

        // Initialize carousel functionality
        initializeCarousel();
    }

    // ===== Counter Animation for Stats =====
    function animateCounters() {
        $('.stat-item h3').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
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
            mainCarousel.carousel('prev');
        } else if (e.keyCode === 39) { // Right arrow
            mainCarousel.carousel('next');
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

    // ===== Contact Form Handling =====
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: $('#firstName').val().trim(),
            lastName: $('#lastName').val().trim(),
            email: $('#email').val().trim(),
            phone: $('#phone').val().trim(),
            company: $('#company').val().trim(),
            subject: $('#subject').val(),
            message: $('#message').val().trim(),
            privacy: $('#privacy').is(':checked')
        };
        
        // Validate form
        if (!validateContactForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i><span class="en-text">Sending...</span><span class="ar-text">جاري الإرسال...</span>');
        submitBtn.prop('disabled', true);
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showContactMessage('success', {
                en: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
                ar: 'شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
            });
            
            // Reset form
            $('#contactForm')[0].reset();
            
            // Reset button
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
        }, 2000);
    });
    
    // Contact form validation
    function validateContactForm(data) {
        const errors = [];
        
        if (!data.firstName) {
            errors.push({
                en: 'First name is required',
                ar: 'الاسم الأول مطلوب'
            });
        }
        
        if (!data.lastName) {
            errors.push({
                en: 'Last name is required',
                ar: 'اسم العائلة مطلوب'
            });
        }
        
        if (!data.email) {
            errors.push({
                en: 'Email address is required',
                ar: 'عنوان البريد الإلكتروني مطلوب'
            });
        } else if (!isValidEmail(data.email)) {
            errors.push({
                en: 'Please enter a valid email address',
                ar: 'يرجى إدخال عنوان بريد إلكتروني صحيح'
            });
        }
        
        if (!data.subject) {
            errors.push({
                en: 'Please select a subject',
                ar: 'يرجى اختيار موضوع'
            });
        }
        
        if (!data.message) {
            errors.push({
                en: 'Message is required',
                ar: 'الرسالة مطلوبة'
            });
        }
        
        if (!data.privacy) {
            errors.push({
                en: 'Please agree to the privacy policy',
                ar: 'يرجى الموافقة على سياسة الخصوصية'
            });
        }
        
        if (errors.length > 0) {
            showContactMessage('error', errors);
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show contact form messages
    function showContactMessage(type, messages) {
        // Remove existing messages
        $('.contact-message').remove();
        
        const messageClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        let messageHtml = `<div class="contact-message alert ${messageClass} alert-dismissible fade show" role="alert">
            <i class="fas ${iconClass} me-2"></i>`;
        
        if (Array.isArray(messages)) {
            messages.forEach((msg, index) => {
                messageHtml += `<div class="en-text">${msg.en}</div>
                <div class="ar-text">${msg.ar}</div>`;
                if (index < messages.length - 1) messageHtml += '<br>';
            });
        } else {
            messageHtml += `<span class="en-text">${messages.en}</span>
            <span class="ar-text">${messages.ar}</span>`;
        }
        
        messageHtml += `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        
        // Insert message before the form
        $('#contactForm').before(messageHtml);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                $('.contact-message').fadeOut();
            }, 5000);
        }
        
        // Show/hide language-specific content
        if (isRTL) {
            $('.contact-message .en-text').hide();
            $('.contact-message .ar-text').show();
        } else {
            $('.contact-message .en-text').show();
            $('.contact-message .ar-text').hide();
        }
    }

    // === Animated Brand Name (EN/AR) ===
    function animateBrandName() {
        var isArabic = $("html").attr("dir") === "rtl";
        var name = isArabic ? "المقاولون العرب" : "Arab Contractors";
        var container = isArabic ? $("#animated-arabic-name") : $(".brand-text .en-text");
        var logo = $(".logo-container img");
        
        // Clear previous content
        container.empty();
        
        if (isArabic) {
            // Arabic: animate whole text with a beautiful effect
            var span = $("<span>")
                .addClass("arabic-brand-animate")
                .text(name);
            container.append(span);
            // Animate: fade in, scale up, gold color
            setTimeout(function() {
                span.addClass("visible");
                logo.addClass("logo-rotate");
                setTimeout(function() { logo.removeClass("logo-rotate"); }, 700);
            }, 100);
        } else {
            // English: animate letter by letter
            var chars = name.split("");
            chars.forEach(function(char, i) {
                var span = $("<span>")
                    .addClass("animated-letter en")
                    .text(char);
                container.append(span);
            });
            var letters = container.find(".animated-letter");
            letters.each(function(index) {
                setTimeout(() => {
                    $(this).addClass("visible");
                    logo.addClass("logo-rotate");
                    setTimeout(() => logo.removeClass("logo-rotate"), 700);
                }, 120 * index);
            });
        }
    }
    
    // Initialize brand animation on page load
    animateBrandName();
    
    // Apply saved language preference on page load
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== 'en') {
        toggleLanguage(savedLang);
    }
    
    // ===== Leadership Modal Functions =====
    let currentLeaderId = null;
    
    // Leadership data for modal
    const leadershipData = {
        ceo: {
            name: {
                en: 'Eng. Ahmed Hassan',
                ar: 'م. أحمد حسن'
            },
            position: {
                en: 'Chief Executive Officer',
                ar: 'الرئيس التنفيذي'
            },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            email: 'ahmed.hassan@arabcontractors.com',
            phone: '+20 2 1234 5678',
            location: {
                en: 'Cairo, Egypt',
                ar: 'القاهرة، مصر'
            }
        },
        cfo: {
            name: {
                en: 'Dr. Sarah Al-Mansouri',
                ar: 'د. سارة المنصوري'
            },
            position: {
                en: 'Chief Financial Officer',
                ar: 'الرئيس المالي'
            },
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            email: 'sarah.mansouri@arabcontractors.com',
            phone: '+20 2 1234 5679',
            location: {
                en: 'Cairo, Egypt',
                ar: 'القاهرة، مصر'
            }
        },
        coo: {
            name: {
                en: 'Eng. Omar Khalil',
                ar: 'م. عمر خليل'
            },
            position: {
                en: 'Chief Operations Officer',
                ar: 'الرئيس التنفيذي للعمليات'
            },
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            email: 'omar.khalil@arabcontractors.com',
            phone: '+20 2 1234 5680',
            location: {
                en: 'Cairo, Egypt',
                ar: 'القاهرة، مصر'
            }
        },
        cto: {
            name: {
                en: 'Eng. Fatima Zahra',
                ar: 'م. فاطمة الزهراء'
            },
            position: {
                en: 'Chief Technology Officer',
                ar: 'الرئيس التنفيذي للتكنولوجيا'
            },
            image: 'https://images.unsplash.com/photo-1438761681033-6461a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            email: 'fatima.zahra@arabcontractors.com',
            phone: '+20 2 1234 5681',
            location: {
                en: 'Cairo, Egypt',
                ar: 'القاهرة، مصر'
            }
        },
        director: {
            name: {
                en: 'Eng. Khalid Al-Rashid',
                ar: 'م. خالد الرشيد'
            },
            position: {
                en: 'Project Director',
                ar: 'مدير المشروع'
            },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            email: 'khalid.rashid@arabcontractors.com',
            phone: '+20 2 1234 5682',
            location: {
                en: 'Cairo, Egypt',
                ar: 'القاهرة، مصر'
            }
        },
        hr: {
            name: {
                en: 'Dr. Layla Al-Zahra',
                ar: 'د. ليلى الزهراء'
            },
            position: {
                en: 'Human Resources Director',
                ar: 'مديرة الموارد البشرية'
            },
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            email: 'layla.zahra@arabcontractors.com',
            phone: '+20 2 1234 5683',
            location: {
                en: 'Cairo, Egypt',
                ar: 'القاهرة، مصر'
            }
        }
    };
    
    // Enhanced open leadership modal
    function openLeadershipModal(leaderId) {
        const leader = leadershipData[leaderId];
        if (!leader) return;

        // Store current leader ID
        currentLeaderId = leaderId;

        // Update modal content
        updateModalContent(leader);
        
        // Show modal
        $('#leadershipDetailsModal').modal('show');
    }

    // Function to update modal content
    function updateModalContent(leader) {
        const currentLang = $('html').attr('lang') || 'en';
        const isRTL = currentLang === 'ar';

        // Update modal content
        $('.leader-profile-image').attr('src', leader.image);
        $('.leader-name').html(`
            <span class="en-text">${leader.name.en}</span>
            <span class="ar-text">${leader.name.ar}</span>
        `);
        $('.leader-position').html(`
            <span class="en-text">${leader.position.en}</span>
            <span class="ar-text">${leader.position.ar}</span>
        `);
        $('.leader-email').text(leader.email);
        $('.leader-phone').text(leader.phone);
        $('.leader-location').html(`
            <span class="en-text">${leader.location.en}</span>
            <span class="ar-text">${leader.location.ar}</span>
        `);

        // Update language visibility
        updateModalLanguage(isRTL);
    }

    // Function to update modal language visibility
    function updateModalLanguage(isRTL) {
        if (isRTL) {
            $('.en-text').hide();
            $('.ar-text').show();
        } else {
            $('.en-text').show();
            $('.ar-text').hide();
        }
    }
}); 