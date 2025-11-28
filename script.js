// Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing language toggle...');
            
            // Loading screen
            window.addEventListener('load', function() {
                const loadingScreen = document.getElementById('loading-screen');
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                }, 1000);
            });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', false);
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', false);
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form validation and submission
        const form = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Form validation rules
        const validators = {
            name: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return null;
            },
            email: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return null;
            },
            subject: (value) => {
                if (!value.trim()) return 'Subject is required';
                if (value.trim().length < 3) return 'Subject must be at least 3 characters';
                return null;
            },
            message: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return null;
            }
        };

        // Real-time validation
        Object.keys(validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            field.addEventListener('blur', () => {
                const error = validators[fieldName](field.value);
                if (error) {
                    field.classList.add('error');
                    errorElement.textContent = error;
                    errorElement.style.display = 'block';
                } else {
                    field.classList.remove('error');
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            });

            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    const error = validators[fieldName](field.value);
                    if (!error) {
                        field.classList.remove('error');
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                }
            });
        });

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            let hasErrors = false;
            const formData = new FormData(form);
            
            Object.keys(validators).forEach(fieldName => {
                const field = document.getElementById(fieldName);
                const errorElement = document.getElementById(`${fieldName}-error`);
                const error = validators[fieldName](formData.get(fieldName));
                
                if (error) {
                    hasErrors = true;
                    field.classList.add('error');
                    errorElement.textContent = error;
                    errorElement.style.display = 'block';
                } else {
                    field.classList.remove('error');
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            });

            if (hasErrors) {
                const currentLang = localStorage.getItem('language') || 'en';
                const t = translations[currentLang];
                showFormStatus(t.contact.form.error, 'error');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            try {
                // Send form data to Formspree
                const response = await fetch('https://formspree.io/f/xblapnvw', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const currentLang = localStorage.getItem('language') || 'en';
                    const t = translations[currentLang];
                    showFormStatus(t.contact.form.success, 'success');
                    form.reset();
                } else {
                    const data = await response.json();
                    const currentLang = localStorage.getItem('language') || 'en';
                    const t = translations[currentLang];
                    if (data.errors) {
                        showFormStatus(t.contact.form.error, 'error');
                    } else {
                        showFormStatus(t.contact.form.success, 'success');
                        form.reset();
                    }
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                const currentLang = localStorage.getItem('language') || 'en';
                const t = translations[currentLang];
                showFormStatus(t.contact.form.error, 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });

        function showFormStatus(message, type) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Hide after 10 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 10000);
        }

        // Add fade-in animation to elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        // Observe all sections and portfolio/service items
        document.querySelectorAll('section, .portfolio-item, .service-item').forEach(element => {
            observer.observe(element);
        });

        // Add error styles for form validation
        const style = document.createElement('style');
        style.textContent = `
            .contact input.error, .contact textarea.error {
                border-color: var(--error-color);
                box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
            }
            .error-message {
                display: none;
                color: var(--error-color);
                font-size: 0.9rem;
                margin-top: 0.5rem;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);

        // Section Navigation Dots Functionality
        const dots = document.querySelectorAll('.dot');
        const sections = ['hero', 'about', 'services', 'contact'];
        let currentSectionIndex = 0;

        // Function to update active dot
        function updateActiveDot(index) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Function to scroll to section
        function scrollToSection(index) {
            const targetSection = document.getElementById(sections[index]);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                currentSectionIndex = index;
                updateActiveDot(index);
            }
        }

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToSection(index);
            });
        });


        // Update active dot based on scroll position
        function updateActiveDotOnScroll() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach((sectionId, index) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        if (currentSectionIndex !== index) {
                            currentSectionIndex = index;
                            updateActiveDot(index);
                        }
                    }
                }
            });
        }

        // Throttled scroll listener
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveDotOnScroll, 100);
        });


        // Initialize active dot on page load
        updateActiveDotOnScroll();

        // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        // Check for saved theme preference or default to dark mode
        const currentTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Mobile tabs removed: services are displayed via the single .service-grid on all screen sizes.

        // Language Toggle Functionality
        const langButtons = document.querySelectorAll('.lang-btn');
        const currentLang = localStorage.getItem('language') || 'en';

        console.log('Language buttons found:', langButtons.length); // Debug log

        // Language content
        const translations = {
            en: {
                nav: {
                    home: 'Home',
                    about: 'About',
                    services: 'Services',
                    contact: 'Contact'
                },
                hero: {
                    title: "Welcome to SSM AI services",
                    subtitle: "Computer Engineer | Mobile & Web Developer | SSM Ai Service Ltd",
                    description: "I create innovative, AI-powered digital solutions specializing in customer engagement automation, modern web applications, mobile apps, and digital menu systems for businesses.",
                    tourText: "Let's have a tour 🚀",
                    cta1: "View My Services",
                    cta2: "Get In Touch"
                },
                about: {
                    title: "About Me",
                    p1: "I'm Sultan Sanjar Mughis, a passionate Computer Engineer with 2+ years of experience in creating modern, responsive, and visually appealing digital experiences. My journey began with a curiosity for how things work in the digital world, and it has evolved into a career dedicated to crafting solutions that make a difference.",
                    p2: "I specialize in social media platforms, e-commerce solutions, mobile app development, and web applications. My expertise includes front-end and back-end technologies, and I'm always exploring new technologies to deliver cutting-edge solutions for my clients.",
                    p3: "Based in Safranbolu, Karabuk, Turkey, I'm available for new projects and typically respond within 24 hours. When I'm not coding, you can find me exploring new technologies or contributing to innovative projects."
                },
                services: {
                    title: "My Services",
                    webDev: {
                        title: "Web Development",
                        description: "Custom websites and web applications built with modern technologies. From simple landing pages to complex e-commerce platforms, I deliver high-quality solutions tailored to your business needs.",
                        features: ["Custom Solutions", "Responsive Design", "SEO Optimized"]
                    },
                    uiux: {
                        title: "UI/UX Design",
                        description: "User-centered design solutions that combine aesthetics with functionality. I create intuitive interfaces that enhance user experience and drive engagement for your digital products.",
                        features: ["User Research", "Wireframing", "Prototyping"]
                    },
                    mobile: {
                        title: "Mobile App Development",
                        description: "Native and cross-platform mobile applications for iOS and Android. I build scalable, performant apps that provide seamless user experiences across all devices.",
                        features: ["Cross-Platform", "Native Performance", "App Store Ready"]
                    },
                    ai: {
                        title: "AI-Powered Customer Engagement",
                        description: "I'll set up AI-powered customer support agents to handle inquiries on your website, Instagram, and WhatsApp. These bots can provide instant support, manage common questions, and help you scale your business's customer service.",
                        features: ["24/7 AI Agents", "Omnichannel Support", "Actionable Analytics"]
                    },
                    qr: {
                        title: "QR Code + Digital Menu Solutions",
                        description: "I'll create a digital menu for your restaurant or cafe that customers can access by simply scanning a QR code with their phone. This modern, contactless solution allows you to eliminate physical menus and showcase your offerings in a professional, interactive format.",
                        features: ["Update Instantly", "Go Contactless", "Enhance Engagement", "Boost Efficiency"]
                    },
                    maintenance: {
                        title: "Maintenance & Support",
                        description: "Ongoing maintenance and support services to keep your digital products running smoothly. Regular updates, security patches, and performance monitoring.",
                        features: ["24/7 Support", "Security Updates", "Performance Monitoring"]
                    }
                },
                contact: {
                    title: "Get In Touch",
                    subtitle: "Let's work together",
                    description: "I'm always interested in new opportunities and exciting projects. I'm available for new projects and typically respond within 12 hours. Best time to contact me is between 8 AM - 11 PM (Turkey time). Preferred contact methods are WhatsApp and Instagram.",
                    available: "Available for new projects",
                    phone: "+90 552 569 15 63",
                    form: {
                        name: "Your Name *",
                        namePlaceholder: "Enter your full name",
                        email: "Your Email *",
                        emailPlaceholder: "Enter your email address",
                        subject: "Subject *",
                        subjectPlaceholder: "What's this about?",
                        message: "Your Message *",
                        messagePlaceholder: "Tell me about your project or question...",
                        submit: "Send Message",
                        sending: "Sending...",
                        success: "Thank you! Your message has been sent successfully. I'll get back to you within 12 hours.",
                        error: "Please fix the errors above"
                    }
                },
                skills: {
                    mobile: {
                        title: "Mobile Apps",
                        description: "iOS, Android, Cross-platform Development"
                    },
                    ecommerce: {
                        title: "E-Commerce",
                        description: "Online Stores, Payment Integration, CMS"
                    },
                    social: {
                        title: "Social Media",
                        description: "Platform Integration, API Development"
                    },
                    web: {
                        title: "Web Apps",
                        description: "Full-Stack Development, Modern Frameworks"
                    }
                },
                footer: {
                    name: "Sultan Sanjar Mughis",
                    description: "Computer Engineer passionate about building amazing digital experiences. Specializing in social media, e-commerce, mobile apps, and web applications.",
                    quickLinks: "Quick Links",
                    services: "Services",
                    quickLinksList: {
                        home: "Home",
                        about: "About",
                        services: "Services",
                        contact: "Contact"
                    },
                    servicesList: {
                        mobile: "Mobile App Development",
                        ai: "AI-Powered Customer Engagement",
                        social: "Social Media Integration",
                        web: "Web Applications",
                        qr: "QR Code + Digital Menu Solutions",
                        maintenance: "Maintenance & Support"
                    },
                    copyright: "All rights reserved. | Built with passion and dedication"
                }
            },
            tr: {
                nav: {
                    home: 'Ana Sayfa',
                    about: 'Hakkımda',
                    services: 'Hizmetler',
                    contact: 'İletişim'
                },
                hero: {
                    title: "SSM AI hizmetlerine hoş geldiniz",
                    subtitle: "Bilgisayar Mühendisi | Mobil ve Web Geliştirici | SSM Ai Service Ltd",
                    description: "Yapay zeka destekli çözümler, modern web uygulamaları, mobil uygulamalar ve dijital menü sistemleri konularında uzmanlaşarak işletmeniz için yenilikçi ve kullanıcı odaklı dijital deneyimler yaratıyorum.",
                    tourText: "Hadi bir tur atalım 🚀",
                    cta1: "Hizmetlerimi Gör",
                    cta2: "İletişime Geç"
                },
                about: {
                    title: "Hakkımda",
                    p1: "Ben Sultan Sanjar Mughis, yapay zeka destekli çözümler ve modern dijital teknolojiler konularında 2+ yıl deneyime sahip tutkulu bir Bilgisayar Mühendisiyim. Yolculuğum teknolojinin işletmeleri nasıl dönüştürebileceğine dair bir merakla başladı ve AI destekli yenilikçi çözümler üretmeye adanmış bir kariyere dönüştü.",
                    p2: "Yapay zeka destekli müşteri hizmetleri, dijital menü sistemleri, mobil uygulama geliştirme ve modern web uygulamaları konularında uzmanlaştım. Uzmanlığım AI chatbot entegrasyonu, QR kod çözümleri ve cross-platform geliştirme teknolojilerini içerir. Müşterilerimin işletmelerini dijital dönüşümle güçlendirmek için sürekli yeni teknolojiler keşfediyorum.",
                    p3: "Safranbolu, Karabük, Türkiye'de bulunuyorum, yeni projeler için müsaitim ve genellikle 24 saat içinde yanıt veriyorum. Kod yazmadığım zamanlarda beni yapay zeka teknolojilerini araştırırken veya işletmeler için yenilikçi dijital çözümler geliştirirken bulabilirsiniz."
                },
                services: {
                    title: "Hizmetlerim",
                    webDev: {
                        title: "Web Geliştirme",
                        description: "Modern teknolojilerle inşa edilmiş özel web siteleri ve web uygulamaları. Basit açılış sayfalarından karmaşık e-ticaret platformlarına kadar, işletmenizin ihtiyaçlarına uygun yüksek kaliteli çözümler sunuyorum.",
                        features: ["Özel Çözümler", "Duyarlı Tasarım", "SEO Optimizasyonu"]
                    },
                    uiux: {
                        title: "UI/UX Tasarım",
                        description: "Estetik ve işlevselliği birleştiren kullanıcı odaklı tasarım çözümleri. Dijital ürünleriniz için kullanıcı deneyimini geliştiren ve etkileşimi artıran sezgisel arayüzler oluşturuyorum.",
                        features: ["Kullanıcı Araştırması", "Wireframing", "Prototipleme"]
                    },
                    mobile: {
                        title: "Mobil Uygulama Geliştirme",
                        description: "iOS ve Android için yerel ve çapraz platform mobil uygulamalar. Tüm cihazlarda sorunsuz kullanıcı deneyimi sağlayan ölçeklenebilir, performanslı uygulamalar geliştiriyorum.",
                        features: ["Çapraz Platform", "Yerel Performans", "App Store Hazır"]
                    },
                    ai: {
                        title: "AI Destekli Müşteri Etkileşimi",
                        description: "Web siteniz, Instagram ve WhatsApp'taki sorguları yönetmek için AI destekli müşteri destek ajanları kuracağım. Bu botlar anında destek sağlayabilir, yaygın soruları yönetebilir ve işletmenizin müşteri hizmetlerini ölçeklendirmenize yardımcı olabilir.",
                        features: ["7/24 AI Ajanları", "Çok Kanallı Destek", "Eyleme Dönüştürülebilir Analitik"]
                    },
                    qr: {
                        title: "QR Kod + Dijital Menü Çözümleri",
                        description: "Restoranınız veya kafeniz için müşterilerin telefonlarıyla QR kod tarayarak erişebileceği dijital menü oluşturacağım. Bu modern, temasız çözüm, fiziksel menüleri ortadan kaldırmanıza ve tekliflerinizi profesyonel, etkileşimli bir formatta sergilemenize olanak tanır.",
                        features: ["Anında Güncelleme", "Temasız Geçiş", "Etkileşimi Artırma", "Verimliliği Artırma"]
                    },
                    maintenance: {
                        title: "Bakım ve Destek",
                        description: "Dijital ürünlerinizin sorunsuz çalışmasını sağlamak için devam eden bakım ve destek hizmetleri. Düzenli güncellemeler, güvenlik yamaları ve performans izleme.",
                        features: ["7/24 Destek", "Güvenlik Güncellemeleri", "Performans İzleme"]
                    }
                },
                contact: {
                    title: "İletişime Geçin",
                    subtitle: "Birlikte çalışalım",
                    description: "Her zaman yeni fırsatlar ve heyecan verici projelerle ilgileniyorum. Yeni projeler için müsaitim ve genellikle 12 saat içinde yanıt veriyorum. Benimle iletişime geçmek için en iyi zaman 08:00 - 23:00 (Türkiye saati) arasıdır. Tercih edilen iletişim yöntemleri WhatsApp ve Instagram'dır.",
                    available: "Yeni projeler için müsait",
                    phone: "+90 552 569 15 63",
                    form: {
                        name: "Adınız *",
                        namePlaceholder: "Tam adınızı girin",
                        email: "E-posta Adresiniz *",
                        emailPlaceholder: "E-posta adresinizi girin",
                        subject: "Konu *",
                        subjectPlaceholder: "Bu ne hakkında?",
                        message: "Mesajınız *",
                        messagePlaceholder: "Projeniz veya sorunuz hakkında bana anlatın...",
                        submit: "Mesaj Gönder",
                        sending: "Gönderiliyor...",
                        success: "Teşekkürler! Mesajınız başarıyla gönderildi. 12 saat içinde size geri döneceğim.",
                        error: "Lütfen yukarıdaki hataları düzeltin"
                    }
                },
                skills: {
                    mobile: {
                        title: "Mobil Uygulamalar",
                        description: "iOS, Android, Çapraz Platform Geliştirme"
                    },
                    ecommerce: {
                        title: "E-Ticaret",
                        description: "Online Mağazalar, Ödeme Entegrasyonu, CMS"
                    },
                    social: {
                        title: "Sosyal Medya",
                        description: "Platform Entegrasyonu, API Geliştirme"
                    },
                    web: {
                        title: "Web Uygulamaları",
                        description: "Full-Stack Geliştirme, Modern Framework'ler"
                    }
                },
                footer: {
                    name: "Sultan Sanjar Mughis",
                    description: "Harika dijital deneyimler oluşturmaya tutkulu Bilgisayar Mühendisi. Sosyal medya, e-ticaret, mobil uygulamalar ve web uygulamaları konularında uzmanlaşmış.",
                    quickLinks: "Hızlı Bağlantılar",
                    services: "Hizmetler",
                    quickLinksList: {
                        home: "Ana Sayfa",
                        about: "Hakkımda",
                        services: "Hizmetler", 
                        contact: "İletişim"
                    },
                    servicesList: {
                        mobile: "Mobil Uygulama Geliştirme",
                        ai: "AI Destekli Müşteri Etkileşimi",
                        social: "Sosyal Medya Entegrasyonu",
                        web: "Web Uygulamaları",
                        qr: "QR Kod + Dijital Menü Çözümleri",
                        maintenance: "Bakım ve Destek"
                    },
                    copyright: "Tüm hakları saklıdır. | Tutku ve özveriyle inşa edilmiştir"
                }
            }
        };

        // Set initial language
        if (langButtons.length > 0) {
            setLanguage(currentLang);

            langButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = button.getAttribute('data-lang');
                    console.log('Language button clicked:', lang); // Debug log
                    setLanguage(lang);
                    localStorage.setItem('language', lang);
                });
            });
        } else {
            console.error('Language buttons not found!');
        }

        function setLanguage(lang) {
            console.log('Setting language to:', lang); // Debug log
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            const activeButton = document.querySelector(`[data-lang="${lang}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }

            // Update content
            const t = translations[lang];
            if (!t) {
                console.error('Translation not found for language:', lang);
                return;
            }
            
            // Navigation
            const navLinks = document.querySelectorAll('.nav-menu a');
            if (navLinks.length >= 4) {
                navLinks[0].textContent = t.nav.home;
                navLinks[1].textContent = t.nav.about;
                navLinks[2].textContent = t.nav.services;
                navLinks[3].textContent = t.nav.contact;
            }

            // Hero section
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero .subtitle');
            const heroDescription = document.querySelector('.hero .description');
            const heroTourText = document.querySelector('.hero .tour-text');
            const btnPrimary = document.querySelector('.btn-primary');
            const btnSecondary = document.querySelector('.btn-secondary');
            
            if (heroTitle) heroTitle.textContent = t.hero.title;
            if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
            if (heroDescription) heroDescription.textContent = t.hero.description;
            if (heroTourText) heroTourText.textContent = t.hero.tourText;
            if (btnPrimary) btnPrimary.textContent = t.hero.cta1;
            if (btnSecondary) btnSecondary.textContent = t.hero.cta2;

            // About section
            const aboutHeading = document.querySelector('#about .heading');
            if (aboutHeading) aboutHeading.textContent = t.about.title;
            
            const aboutParagraphs = document.querySelectorAll('.about-text p');
            if (aboutParagraphs.length >= 3) {
                aboutParagraphs[0].textContent = t.about.p1;
                aboutParagraphs[1].textContent = t.about.p2;
                aboutParagraphs[2].textContent = t.about.p3;
            }

            // Services section
            const servicesHeading = document.querySelector('#services .heading');
            if (servicesHeading) servicesHeading.textContent = t.services.title;

            // Update service cards
            const serviceItems = document.querySelectorAll('.service-item');
            serviceItems.forEach((item) => {
                const title = item.querySelector('h3');
                const description = item.querySelector('p');
                const features = item.querySelectorAll('.feature-tag');
                
                if (title && description) {
                    // Map service cards to their translations based on current title content
                    let serviceKey = null;
                    const currentTitle = title.textContent.trim();
                    
                    // Map by current title content to handle duplicates
                    if (currentTitle.includes('Web Development') || currentTitle.includes('Web Geliştirme')) {
                        serviceKey = 'webDev';
                    } else if (currentTitle.includes('UI/UX Design') || currentTitle.includes('UI/UX Tasarım')) {
                        serviceKey = 'uiux';
                    } else if (currentTitle.includes('Mobile App Development') || currentTitle.includes('Mobil Uygulama Geliştirme')) {
                        serviceKey = 'mobile';
                    } else if (currentTitle.includes('AI-Powered') || currentTitle.includes('AI Destekli')) {
                        serviceKey = 'ai';
                    } else if (currentTitle.includes('QR Code') || currentTitle.includes('QR Kod')) {
                        serviceKey = 'qr';
                    } else if (currentTitle.includes('Maintenance') || currentTitle.includes('Bakım')) {
                        serviceKey = 'maintenance';
                    }
                    
                    if (serviceKey && t.services[serviceKey]) {
                        title.textContent = t.services[serviceKey].title;
                        description.textContent = t.services[serviceKey].description;
                        
                        // Update feature tags
                        features.forEach((feature, featureIndex) => {
                            if (t.services[serviceKey].features[featureIndex]) {
                                feature.textContent = t.services[serviceKey].features[featureIndex];
                            }
                        });
                    }
                }
            });

            // Update skills section
            const skillItems = document.querySelectorAll('.skill-item');
            const skillKeys = ['mobile', 'ecommerce', 'social', 'web'];
            skillItems.forEach((item, index) => {
                const title = item.querySelector('h3');
                const description = item.querySelector('p');
                const skillKey = skillKeys[index];
                
                if (title && description && skillKey && t.skills[skillKey]) {
                    title.textContent = t.skills[skillKey].title;
                    description.textContent = t.skills[skillKey].description;
                }
            });

            // Contact section
            const contactHeading = document.querySelector('#contact .heading');
            const contactSubtitle = document.querySelector('.contact-info h3');
            const contactDescription = document.querySelector('.contact-info p');
            const contactAvailable = document.querySelector('.contact-item .fas.fa-clock').parentElement.querySelector('span');
            
            if (contactHeading) contactHeading.textContent = t.contact.title;
            if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;
            if (contactDescription) contactDescription.textContent = t.contact.description;
            if (contactAvailable) contactAvailable.textContent = t.contact.available;
            
            // Update phone number
            const contactPhone = document.querySelector('.contact-phone-links a[href^="tel:"]');
            if (contactPhone) contactPhone.textContent = t.contact.phone;

            // Update form elements
            const nameLabel = document.querySelector('label[for="name"]');
            const nameInput = document.getElementById('name');
            const emailLabel = document.querySelector('label[for="email"]');
            const emailInput = document.getElementById('email');
            const subjectLabel = document.querySelector('label[for="subject"]');
            const subjectInput = document.getElementById('subject');
            const messageLabel = document.querySelector('label[for="message"]');
            const messageInput = document.getElementById('message');
            const submitBtn = document.querySelector('#submit-btn .btn-text');
            const sendingBtn = document.querySelector('#submit-btn .btn-loading');

            if (nameLabel) nameLabel.textContent = t.contact.form.name;
            if (nameInput) nameInput.placeholder = t.contact.form.namePlaceholder;
            if (emailLabel) emailLabel.textContent = t.contact.form.email;
            if (emailInput) emailInput.placeholder = t.contact.form.emailPlaceholder;
            if (subjectLabel) subjectLabel.textContent = t.contact.form.subject;
            if (subjectInput) subjectInput.placeholder = t.contact.form.subjectPlaceholder;
            if (messageLabel) messageLabel.textContent = t.contact.form.message;
            if (messageInput) messageInput.placeholder = t.contact.form.messagePlaceholder;
            if (submitBtn) submitBtn.textContent = t.contact.form.submit;
            if (sendingBtn) sendingBtn.textContent = t.contact.form.sending;

            // Update footer
            const footerName = document.querySelector('.footer-section h3');
            const footerDescription = document.querySelector('.footer-section p');
            const quickLinksTitle = document.querySelector('.footer-section:nth-child(2) h3');
            const servicesTitle = document.querySelector('.footer-section:nth-child(3) h3');
            const copyrightText = document.querySelector('.footer-bottom p');

            if (footerName) footerName.textContent = t.footer.name;
            if (footerDescription) footerDescription.textContent = t.footer.description;
            if (quickLinksTitle) quickLinksTitle.textContent = t.footer.quickLinks;
            if (servicesTitle) servicesTitle.textContent = t.footer.services;
            if (copyrightText) {
                const currentYear = new Date().getFullYear();
                copyrightText.textContent = `© ${currentYear} ${t.footer.name}. ${t.footer.copyright}`;
            }

            // Update footer quick links list
            const quickLinksList = document.querySelectorAll('.footer-section:nth-child(2) ul li a');
            if (quickLinksList.length >= 4) {
                quickLinksList[0].textContent = t.footer.quickLinksList.home;
                quickLinksList[1].textContent = t.footer.quickLinksList.about;
                quickLinksList[2].textContent = t.footer.quickLinksList.services;
                quickLinksList[3].textContent = t.footer.quickLinksList.contact;
            }

            // Update footer services list
            const servicesList = document.querySelectorAll('.footer-section:nth-child(3) ul li');
            if (servicesList.length >= 6) {
                servicesList[0].textContent = t.footer.servicesList.mobile;
                servicesList[1].textContent = t.footer.servicesList.ai;
                servicesList[2].textContent = t.footer.servicesList.social;
                servicesList[3].textContent = t.footer.servicesList.web;
                servicesList[4].textContent = t.footer.servicesList.qr;
                servicesList[5].textContent = t.footer.servicesList.maintenance;
            }

            // Set document direction for LTR languages
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.setAttribute('lang', lang);
        }
        
        }); // End of DOMContentLoaded
