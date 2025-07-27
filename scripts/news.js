// News Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // News filtering functionality
    const filterButtons = document.querySelectorAll('.news-filter .btn');
    const newsItems = document.querySelectorAll('#newsGrid .col-lg-4');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Filter news items
            newsItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // News modal functionality
    const newsModal = document.getElementById('newsModal');
    const newsButtons = document.querySelectorAll('[data-bs-target="#newsModal"]');

    // News data for modal content
    const newsData = {
        1: {
            title: {
                en: "New Metro Line Project Completion",
                ar: "إنجاز مشروع خط المترو الجديد"
            },
            category: "Projects",
            date: {
                en: "December 15, 2024",
                ar: "15 ديسمبر 2024"
            },
            image: "Images/project1.jpg",
            content: {
                en: `<p>Arab Contractors has successfully completed the construction of Cairo Metro Line 4, a major infrastructure project that connects several key districts of the Egyptian capital. This achievement represents a significant milestone in the company's commitment to improving urban transportation and connectivity.</p>
                
                <h4>Project Highlights:</h4>
                <ul>
                    <li>Total length: 18.5 kilometers</li>
                    <li>15 new stations constructed</li>
                    <li>Advanced signaling systems installed</li>
                    <li>Energy-efficient lighting and ventilation</li>
                    <li>Accessibility features for all passengers</li>
                </ul>
                
                <p>The project was completed ahead of schedule and within budget, demonstrating Arab Contractors' expertise in large-scale infrastructure development. The new metro line is expected to serve over 500,000 daily passengers, significantly reducing traffic congestion in the city.</p>
                
                <h4>Technical Specifications:</h4>
                <ul>
                    <li>Underground and elevated sections</li>
                    <li>Modern rolling stock with air conditioning</li>
                    <li>Advanced safety systems</li>
                    <li>Integration with existing metro network</li>
                </ul>`,
                ar: `<p>نجحت شركة المقاولون العرب في إنجاز بناء خط مترو القاهرة الرابع، وهو مشروع بنية تحتية رئيسي يربط عدة أحياء رئيسية في العاصمة المصرية. يمثل هذا الإنجاز علامة فارقة مهمة في التزام الشركة بتحسين النقل الحضري والاتصال.</p>
                
                <h4>أبرز المشروع:</h4>
                <ul>
                    <li>الطول الإجمالي: 18.5 كيلومتر</li>
                    <li>15 محطة جديدة تم بناؤها</li>
                    <li>أنظمة إشارات متقدمة مثبتة</li>
                    <li>إضاءة وتهوية موفرة للطاقة</li>
                    <li>ميزات إمكانية الوصول لجميع الركاب</li>
                </ul>
                
                <p>تم إنجاز المشروع قبل الموعد المحدد وفي حدود الميزانية، مما يوضح خبرة المقاولون العرب في تطوير البنية التحتية واسعة النطاق. من المتوقع أن يخدم خط المترو الجديد أكثر من 500,000 راكب يومياً، مما يقلل بشكل كبير من الازدحام المروري في المدينة.</p>
                
                <h4>المواصفات التقنية:</h4>
                <ul>
                    <li>أقسام تحت الأرض ومرتفعة</li>
                    <li>قطارات حديثة مع تكييف الهواء</li>
                    <li>أنظمة أمان متقدمة</li>
                    <li>التكامل مع شبكة المترو الموجودة</li>
                </ul>`
            }
        },
        2: {
            title: {
                en: "Excellence in Construction Award 2024",
                ar: "جائزة التميز في البناء 2024"
            },
            category: "Awards",
            date: {
                en: "December 10, 2024",
                ar: "10 ديسمبر 2024"
            },
            image: "Images/project3.png",
            content: {
                en: `<p>Arab Contractors has been honored with the prestigious Excellence in Construction Award 2024, recognizing the company's outstanding contributions to infrastructure development and construction excellence across the Middle East region.</p>
                
                <h4>Award Criteria Met:</h4>
                <ul>
                    <li>Innovation in construction techniques</li>
                    <li>Sustainability and environmental responsibility</li>
                    <li>Quality management and safety standards</li>
                    <li>Community impact and social responsibility</li>
                    <li>Project delivery excellence</li>
                </ul>
                
                <p>The award ceremony was attended by industry leaders, government officials, and international construction experts. The recognition highlights Arab Contractors' commitment to maintaining the highest standards of quality and safety in all its projects.</p>
                
                <h4>Recent Achievements:</h4>
                <ul>
                    <li>Zero safety incidents in major projects</li>
                    <li>Implementation of green building practices</li>
                    <li>Advanced BIM technology adoption</li>
                    <li>Training and development programs</li>
                </ul>`,
                ar: `<p>تم تكريم شركة المقاولون العرب بجائزة التميز في البناء المرموقة لعام 2024، تقديراً لمساهماتها المتميزة في تطوير البنية التحتية والتميز في البناء في جميع أنحاء منطقة الشرق الأوسط.</p>
                
                <h4>معايير الجائزة المحققة:</h4>
                <ul>
                    <li>الابتكار في تقنيات البناء</li>
                    <li>الاستدامة والمسؤولية البيئية</li>
                    <li>إدارة الجودة ومعايير السلامة</li>
                    <li>التأثير المجتمعي والمسؤولية الاجتماعية</li>
                    <li>التميز في تسليم المشاريع</li>
                </ul>
                
                <p>حضر حفل توزيع الجوائز قادة الصناعة والمسؤولون الحكوميون والخبراء الدوليون في البناء. يسلط التقدير الضوء على التزام المقاولون العرب بالحفاظ على أعلى معايير الجودة والسلامة في جميع مشاريعها.</p>
                
                <h4>الإنجازات الحديثة:</h4>
                <ul>
                    <li>صفر حوادث سلامة في المشاريع الرئيسية</li>
                    <li>تنفيذ ممارسات البناء الأخضر</li>
                    <li>اعتماد تقنية BIM المتقدمة</li>
                    <li>برامج التدريب والتطوير</li>
                </ul>`
            }
        },
        3: {
            title: {
                en: "Strategic Partnership with International Consortium",
                ar: "شراكة استراتيجية مع اتحاد دولي"
            },
            category: "Partnerships",
            date: {
                en: "December 5, 2024",
                ar: "5 ديسمبر 2024"
            },
            image: "Images/AswanDamAxis-01.jpg",
            content: {
                en: `<p>Arab Contractors has announced a groundbreaking strategic partnership with a leading international construction consortium, marking a significant step forward in the company's global expansion and technological advancement.</p>
                
                <h4>Partnership Benefits:</h4>
                <ul>
                    <li>Access to cutting-edge construction technologies</li>
                    <li>International best practices and standards</li>
                    <li>Enhanced project management capabilities</li>
                    <li>Global supply chain optimization</li>
                    <li>Knowledge transfer and capacity building</li>
                </ul>
                
                <p>This partnership will enable Arab Contractors to undertake more complex and large-scale projects while maintaining the highest standards of quality and safety. The collaboration will focus on infrastructure development, smart city projects, and sustainable construction solutions.</p>
                
                <h4>Initial Projects:</h4>
                <ul>
                    <li>Smart transportation systems</li>
                    <li>Renewable energy infrastructure</li>
                    <li>Digital transformation initiatives</li>
                    <li>Green building certification programs</li>
                </ul>`,
                ar: `<p>أعلنت شركة المقاولون العرب عن شراكة استراتيجية رائدة مع اتحاد البناء الدولي الرائد، مما يمثل خطوة مهمة إلى الأمام في التوسع العالمي للشركة والتقدم التكنولوجي.</p>
                
                <h4>فوائد الشراكة:</h4>
                <ul>
                    <li>الوصول إلى تقنيات البناء المتطورة</li>
                    <li>أفضل الممارسات والمعايير الدولية</li>
                    <li>تعزيز قدرات إدارة المشاريع</li>
                    <li>تحسين سلسلة التوريد العالمية</li>
                    <li>نقل المعرفة وبناء القدرات</li>
                </ul>
                
                <p>ستمكن هذه الشراكة المقاولون العرب من تنفيذ مشاريع أكثر تعقيداً وواسعة النطاق مع الحفاظ على أعلى معايير الجودة والسلامة. ستركز التعاون على تطوير البنية التحتية ومشاريع المدن الذكية وحلول البناء المستدام.</p>
                
                <h4>المشاريع الأولية:</h4>
                <ul>
                    <li>أنظمة النقل الذكية</li>
                    <li>بنية تحتية للطاقة المتجددة</li>
                    <li>مبادرات التحول الرقمي</li>
                    <li>برامج شهادات المباني الخضراء</li>
                </ul>`
            }
        },
        4: {
            title: {
                en: "Green Building Initiative Launch",
                ar: "إطلاق مبادرة المباني الخضراء"
            },
            category: "Sustainability",
            date: {
                en: "November 28, 2024",
                ar: "28 نوفمبر 2024"
            },
            image: "Images/AswanDamAxis-04.jpg",
            content: {
                en: `<p>Arab Contractors has launched a comprehensive green building initiative aimed at promoting sustainable construction practices and environmental responsibility across Egypt and the region.</p>
                
                <h4>Initiative Goals:</h4>
                <ul>
                    <li>Reduce carbon footprint by 30% by 2030</li>
                    <li>Implement LEED certification standards</li>
                    <li>Promote renewable energy integration</li>
                    <li>Develop sustainable material supply chains</li>
                    <li>Train workforce in green building techniques</li>
                </ul>
                
                <p>The initiative includes the establishment of a Green Building Research Center, partnerships with environmental organizations, and the development of sustainable construction guidelines for the Egyptian market.</p>
                
                <h4>Key Features:</h4>
                <ul>
                    <li>Energy-efficient building designs</li>
                    <li>Water conservation systems</li>
                    <li>Waste reduction and recycling programs</li>
                    <li>Indoor air quality improvements</li>
                    <li>Local material sourcing</li>
                </ul>`,
                ar: `<p>أطلقت شركة المقاولون العرب مبادرة شاملة للمباني الخضراء تهدف إلى تعزيز ممارسات البناء المستدام والمسؤولية البيئية في مصر والمنطقة.</p>
                
                <h4>أهداف المبادرة:</h4>
                <ul>
                    <li>تقليل البصمة الكربونية بنسبة 30% بحلول عام 2030</li>
                    <li>تنفيذ معايير شهادة LEED</li>
                    <li>تعزيز تكامل الطاقة المتجددة</li>
                    <li>تطوير سلاسل توريد المواد المستدامة</li>
                    <li>تدريب القوى العاملة على تقنيات البناء الأخضر</li>
                </ul>
                
                <p>تتضمن المبادرة إنشاء مركز أبحاث المباني الخضراء والشراكات مع المنظمات البيئية وتطوير إرشادات البناء المستدام للسوق المصرية.</p>
                
                <h4>الميزات الرئيسية:</h4>
                <ul>
                    <li>تصاميم المباني الموفرة للطاقة</li>
                    <li>أنظمة الحفاظ على المياه</li>
                    <li>برامج تقليل النفايات وإعادة التدوير</li>
                    <li>تحسينات جودة الهواء الداخلي</li>
                    <li>توفير المواد المحلية</li>
                </ul>`
            }
        },
        5: {
            title: {
                en: "Smart City Development Project",
                ar: "مشروع تطوير المدينة الذكية"
            },
            category: "Projects",
            date: {
                en: "November 20, 2024",
                ar: "20 نوفمبر 2024"
            },
            image: "Images/CairoMetro3C_01.png",
            content: {
                en: `<p>Arab Contractors has begun construction of Egypt's first comprehensive smart city, integrating advanced technology with sustainable urban planning to create a model for future urban development.</p>
                
                <h4>Smart City Features:</h4>
                <ul>
                    <li>IoT-enabled infrastructure monitoring</li>
                    <li>Smart traffic management systems</li>
                    <li>Renewable energy integration</li>
                    <li>Digital government services</li>
                    <li>Smart waste management</li>
                </ul>
                
                <p>The project covers 15,000 acres and will house over 100,000 residents, featuring cutting-edge technology for energy management, transportation, and public services.</p>
                
                <h4>Technology Integration:</h4>
                <ul>
                    <li>5G network infrastructure</li>
                    <li>AI-powered city management</li>
                    <li>Blockchain for secure transactions</li>
                    <li>Smart grid systems</li>
                    <li>Environmental monitoring sensors</li>
                </ul>`,
                ar: `<p>بدأت شركة المقاولون العرب بناء أول مدينة ذكية شاملة في مصر، دمج التكنولوجيا المتقدمة مع التخطيط الحضري المستدام لإنشاء نموذج للتطوير الحضري المستقبلي.</p>
                
                <h4>ميزات المدينة الذكية:</h4>
                <ul>
                    <li>مراقبة البنية التحتية المدعومة بـ IoT</li>
                    <li>أنظمة إدارة المرور الذكية</li>
                    <li>تكامل الطاقة المتجددة</li>
                    <li>خدمات الحكومة الرقمية</li>
                    <li>إدارة النفايات الذكية</li>
                </ul>
                
                <p>يغطي المشروع 15,000 فدان وسيستوعب أكثر من 100,000 مقيم، ويضم تكنولوجيا متطورة لإدارة الطاقة والنقل والخدمات العامة.</p>
                
                <h4>تكامل التكنولوجيا:</h4>
                <ul>
                    <li>بنية تحتية لشبكة 5G</li>
                    <li>إدارة المدينة المدعومة بالذكاء الاصطناعي</li>
                    <li>Blockchain للمعاملات الآمنة</li>
                    <li>أنظمة الشبكة الذكية</li>
                    <li>أجهزة استشعار مراقبة البيئة</li>
                </ul>`
            }
        },
        6: {
            title: {
                en: "Heritage Preservation Award",
                ar: "جائزة الحفاظ على التراث"
            },
            category: "Awards",
            date: {
                en: "November 15, 2024",
                ar: "15 نوفمبر 2024"
            },
            image: "Images/SayyidaZainabMosque-02.jpg",
            content: {
                en: `<p>Arab Contractors has been recognized for its outstanding work in preserving and restoring historical architectural landmarks, receiving the prestigious Heritage Preservation Award for 2024.</p>
                
                <h4>Preservation Projects:</h4>
                <ul>
                    <li>Restoration of ancient mosques and churches</li>
                    <li>Conservation of historical buildings</li>
                    <li>Archaeological site protection</li>
                    <li>Traditional craftsmanship revival</li>
                    <li>Cultural heritage documentation</li>
                </ul>
                
                <p>The company's expertise in combining modern construction techniques with traditional methods has been instrumental in preserving Egypt's rich cultural heritage while ensuring structural integrity and safety.</p>
                
                <h4>Technical Approach:</h4>
                <ul>
                    <li>Non-invasive restoration techniques</li>
                    <li>Original material preservation</li>
                    <li>3D scanning and documentation</li>
                    <li>Climate-controlled environments</li>
                    <li>Expert craftsmen training</li>
                </ul>`,
                ar: `<p>تم الاعتراف بشركة المقاولون العرب لعمله المتميز في الحفاظ على المعالم المعمارية التاريخية واستعادتها، وحصلت على جائزة الحفاظ على التراث المرموقة لعام 2024.</p>
                
                <h4>مشاريع الحفاظ:</h4>
                <ul>
                    <li>استعادة المساجد والكنائس القديمة</li>
                    <li>الحفاظ على المباني التاريخية</li>
                    <li>حماية المواقع الأثرية</li>
                    <li>إحياء الحرف التقليدية</li>
                    <li>توثيق التراث الثقافي</li>
                </ul>
                
                <p>خبرة الشركة في الجمع بين تقنيات البناء الحديثة والطرق التقليدية كانت أساسية في الحفاظ على التراث الثقافي الغني لمصر مع ضمان السلامة الهيكلية والأمان.</p>
                
                <h4>النهج التقني:</h4>
                <ul>
                    <li>تقنيات الاستعادة غير الغازية</li>
                    <li>الحفاظ على المواد الأصلية</li>
                    <li>المسح ثلاثي الأبعاد والتوثيق</li>
                    <li>بيئات مناخية محكومة</li>
                    <li>تدريب الحرفيين الخبراء</li>
                </ul>`
            }
        }
    };

    // Handle news modal
    newsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newsId = this.getAttribute('data-news-id');
            const news = newsData[newsId];
            
            if (news) {
                // Update modal content
                const modal = document.getElementById('newsModal');
                const titleDisplay = modal.querySelector('.news-title-display');
                const categoryBadge = modal.querySelector('.news-category-badge');
                const dateDisplay = modal.querySelector('.news-date-display');
                const imageDisplay = modal.querySelector('.news-image-display img');
                const contentDisplay = modal.querySelector('.news-content-display');
                
                // Set content based on current language
                const isArabic = document.documentElement.dir === 'rtl';
                
                titleDisplay.innerHTML = `<span class="en-text">${news.title.en}</span><span class="ar-text">${news.title.ar}</span>`;
                categoryBadge.textContent = news.category;
                dateDisplay.innerHTML = `<span class="en-text">${news.date.en}</span><span class="ar-text">${news.date.ar}</span>`;
                imageDisplay.src = news.image;
                contentDisplay.innerHTML = `<span class="en-text">${news.content.en}</span><span class="ar-text">${news.content.ar}</span>`;
            }
        });
    });

    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMoreNews');
    let currentPage = 1;
    const itemsPerPage = 6;

    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more news
        this.innerHTML = '<span class="en-text">Loading...</span><span class="ar-text">جاري التحميل...</span>';
        this.disabled = true;

        setTimeout(() => {
            // Reset button
            this.innerHTML = '<span class="en-text">Load More News</span><span class="ar-text">تحميل المزيد من الأخبار</span>';
            this.disabled = false;
            
            // Show message that all news are loaded
            this.innerHTML = '<span class="en-text">All News Loaded</span><span class="ar-text">تم تحميل جميع الأخبار</span>';
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-secondary');
        }, 2000);
    });

    // Language toggle functionality (if not already handled by main script)
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

    // Theme toggle functionality (if not already handled by main script)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const body = document.body;
            const icon = this.querySelector('i');
            
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                icon.className = 'fas fa-sun';
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                icon.className = 'fas fa-moon';
            }
        });
    }
});

// CSS Animation for fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 