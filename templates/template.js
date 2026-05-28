// template.js — place this in: templates/template.js
// Handles: loading, navbar, theme, language toggle (EN/TR), smooth scroll, fade-in

document.addEventListener('DOMContentLoaded', function () {

    // ── Loading screen ──────────────────────────────────────
    window.addEventListener('load', function () {
        const ls = document.getElementById('loading-screen');
        if (ls) setTimeout(() => ls.classList.add('hidden'), 800);
    });

    // ── Navbar scroll ───────────────────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // ── Mobile menu ─────────────────────────────────────────
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const expanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', String(!expanded));
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ── Theme toggle ────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon   = document.getElementById('theme-icon');

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    applyTheme(localStorage.getItem('theme') || 'dark');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            applyTheme(document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        });
    }

    // ── Smooth scroll ───────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ── Fade-in on scroll ───────────────────────────────────
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section, .template-feature-card, .template-gallery-item, .tpl-card').forEach(el => {
        fadeObserver.observe(el);
    });

    // ════════════════════════════════════════════════════════
    // LANGUAGE SYSTEM
    // Every piece of text on every template page lives here.
    // The page tells us its ID via <body data-page="restaurant">
    // ════════════════════════════════════════════════════════

    const pageId = document.body.getAttribute('data-page') || 'generic';

    const T = {

        // ── Shared text (same on every page) ────────────────
        shared: {
            en: {
                nav: { home:'Home', features:'Features', gallery:'Gallery', getTemplate:'Get This Template', about:'About', services:'Services', contact:'Contact' },
                breadcrumb: { portfolio:'Portfolio' },
                cta: { order:'Order This Template', features:"See What's Included", quote:'Get a Quote', wa:'WhatsApp Me' },
                sections: { featuresHeading:"What's Included", galleryHeading:'Design Previews', gallerySubtext:'Every section is customised with your brand, colours, photos, and content.' },
                footer: {
                    name:'Sultan Sanjar Mughis',
                    desc:'Computer Engineer building modern websites for restaurants, cafes, hotels, law firms, stores, and all kinds of small businesses.',
                    templatesHeading:'Other Templates', quickLinksHeading:'Quick Links',
                    back:'← Back to Portfolio',
                    links:{ restaurant:'Restaurant', cafe:'Cafe', lawyer:'Law Firm', hotel:'Hotel', store:'Store / Shop' },
                    copyright:'All rights reserved. | Built with passion and dedication'
                }
            },
            tr: {
                nav: { home:'Ana Sayfa', features:'Özellikler', gallery:'Galeri', getTemplate:'Bu Şablonu Al', about:'Hakkımda', services:'Hizmetler', contact:'İletişim' },
                breadcrumb: { portfolio:'Portfolyo' },
                cta: { order:'Bu Şablonu Sipariş Et', features:'Nelerin Dahil Olduğunu Gör', quote:'Teklif Al', wa:"WhatsApp'tan Yaz" },
                sections: { featuresHeading:'Neler Dahil', galleryHeading:'Tasarım Önizlemeleri', gallerySubtext:'Her bölüm markanıza, renklerinize, fotoğraflarınıza ve içeriğinize göre özelleştirilir.' },
                footer: {
                    name:'Sultan Sanjar Mughis',
                    desc:'Restoranlar, kafeler, oteller, hukuk büroları, mağazalar ve her türlü küçük işletme için modern web siteleri geliştiren Bilgisayar Mühendisi.',
                    templatesHeading:'Diğer Şablonlar', quickLinksHeading:'Hızlı Bağlantılar',
                    back:'← Portfolyoya Dön',
                    links:{ restaurant:'Restoran', cafe:'Kafe', lawyer:'Hukuk Bürosu', hotel:'Otel', store:'Mağaza / Dükkan' },
                    copyright:'Tüm hakları saklıdır. | Tutku ve özveriyle inşa edilmiştir'
                }
            }
        },

        // ── Per-page content ─────────────────────────────────
        restaurant: {
            en: {
                breadcrumbCurrent:'Restaurant Template',
                heroEyebrow:'Restaurant Template',
                heroTitle:'A Website Your Guests Will Remember',
                heroDesc:'A complete, mobile-first restaurant website with digital menu, online reservations, WhatsApp chat, photo gallery, Google Maps, and a stunning design — all customised to your brand.',
                bannerTitle:'Ready to Launch Your Restaurant Online?',
                bannerDesc:'One fixed price. Delivered in 5–7 days. Hosted on Netlify for free. No monthly fees, no lock-in — you own everything.',
                featureTitles:['QR Digital Menu','Reservation Form','WhatsApp Button','Photo Gallery','Google Maps Embed','Fully Responsive','Reviews Section','Social Media Links','SEO Ready'],
                featureDescs:[
                    'Customers scan a QR code and browse your full menu on their phone — no app needed. Update prices or dishes instantly without reprinting anything.',
                    'A clean booking form that sends reservation requests directly to your email or WhatsApp. Captures name, date, time, and party size automatically.',
                    'Sticky floating WhatsApp button so customers can reach you in one tap. Pre-filled message templates — they don\'t need to type anything.',
                    'Beautiful gallery showcasing your dishes, interior, and atmosphere. Lightbox zoom effect. Fast-loading with lazy loading on all images.',
                    'Interactive map with your exact location, opening hours, and a "Get Directions" button — so no customer ever gets lost finding you.',
                    'Looks perfect on every device — phone, tablet, and desktop. Built mobile-first because most of your customers browse on their phones.',
                    'Display your best Google or TripAdvisor reviews right on the homepage to build trust with new visitors the moment they land on your site.',
                    'Instagram, Facebook, and TripAdvisor icons in the header and footer so visitors can follow your latest updates with one click.',
                    'Proper meta tags, schema.org Restaurant markup, and fast load times to help you rank higher on Google for local searches near you.'
                ],
                galleryLabels:['Hero Section','Digital Menu','Photo Gallery','Reservation Form','Featured Dishes','Map & Contact']
            },
            tr: {
                breadcrumbCurrent:'Restoran Şablonu',
                heroEyebrow:'Restoran Şablonu',
                heroTitle:'Misafirlerinizin Hatırlayacağı Bir Web Sitesi',
                heroDesc:'Dijital menü, çevrimiçi rezervasyon, WhatsApp butonu, fotoğraf galerisi, Google Haritalar ve etkileyici tasarımla eksiksiz, mobil öncelikli restoran web sitesi — tümü markanıza göre özelleştirilmiş.',
                bannerTitle:'Restoranınızı Çevrimiçi Başlatmaya Hazır mısınız?',
                bannerDesc:'Tek sabit fiyat. 5–7 gün içinde teslim. Netlify\'da ücretsiz barındırma. Aylık ücret yok, kilitlenme yok — her şey size ait.',
                featureTitles:['QR Dijital Menü','Rezervasyon Formu','WhatsApp Butonu','Fotoğraf Galerisi','Google Haritalar','Tam Duyarlı Tasarım','Müşteri Yorumları','Sosyal Medya Bağlantıları','SEO Hazır'],
                featureDescs:[
                    'Müşteriler QR kodu tarayarak menüyü telefonlarında görüntüler — uygulama gerekmez. Fiyatları anında güncelleyin, yeniden baskı yapmaya gerek kalmaz.',
                    'Rezervasyon taleplerini doğrudan e-postanıza veya WhatsApp\'ınıza gönderen sade rezervasyon formu. İsim, tarih, saat ve kişi sayısını otomatik yakalar.',
                    'Müşterilerin tek dokunuşla ulaşabilmesi için yapışkan WhatsApp butonu. Önceden doldurulmuş mesaj şablonları sayesinde hiçbir şey yazmaları gerekmez.',
                    'Yemeklerinizi, iç mekanınızı ve atmosferinizi sergileyen güzel galeri. Lightbox zum efekti. Lazy loading ile hızlı yükleme.',
                    'Tam konumunuzu, çalışma saatlerinizi ve "Yol Tarifi Al" butonunu gösteren interaktif harita.',
                    'Her cihazda mükemmel görünüm — telefon, tablet ve masaüstü. Müşterileriniz büyük çoğunlukla telefonla gezindiği için mobil öncelikli tasarım.',
                    'En iyi Google veya TripAdvisor yorumlarınızı ana sayfada göstererek yeni ziyaretçilerde güven oluşturun.',
                    'Instagram, Facebook ve TripAdvisor ikonları sayesinde ziyaretçiler son güncellemelerinizi tek tıkla takip eder.',
                    'Meta etiketler, schema.org Restoran işaretlemesi ve hızlı yükleme ile yerel Google aramalarında üst sıralarda çıkın.'
                ],
                galleryLabels:['Hero Bölümü','Dijital Menü','Fotoğraf Galerisi','Rezervasyon Formu','Öne Çıkan Yemekler','Harita & İletişim']
            }
        },

        cafe: {
            en: {
                breadcrumbCurrent:'Cafe Template',
                heroEyebrow:'Cafe Template',
                heroTitle:'Make Every Visit Worth Coming Back For',
                heroDesc:'A warm, modern cafe website with your full drinks menu, daily specials, takeaway ordering, loyalty program, Instagram feed, and a cosy atmosphere — all in one fast page.',
                bannerTitle:'Launch Your Cafe Website This Week',
                bannerDesc:'One fixed price. Delivered in 5–7 days. Hosted on Netlify for free. No monthly subscriptions, no lock-in — you own everything.',
                featureTitles:['Digital Drinks Menu','Daily Specials Banner','Takeaway via WhatsApp','Instagram Feed Strip','Location & Hours','Customer Reviews','Loyalty / Newsletter','Mobile-First Design','Local SEO'],
                featureDescs:[
                    'Scrollable, categorised drinks and food menu with photos, prices, and allergen info. Update it yourself any time — no developer needed.',
                    'A prominent "Today\'s Special" banner to highlight seasonal drinks or limited offers and drive more visits.',
                    '"Order for Takeaway" button that opens WhatsApp with a pre-filled message — no third-party app fees.',
                    'Your latest Instagram posts in a neat grid strip so your social content stays fresh on your website automatically.',
                    'Google Maps embed with your exact pin plus a clearly formatted opening-hours block — customers always know when you\'re open.',
                    'Your best Google or TripAdvisor reviews in a rotating testimonial slider to build trust before anyone walks through the door.',
                    'Email capture form so you can build a mailing list for promotions, seasonal menus, and loyalty rewards — owned by you.',
                    'Designed on mobile first. Smooth, fast, and beautiful on every screen.',
                    'Schema markup, local keywords, and fast load times to help you appear in "best cafe near me" searches.'
                ],
                galleryLabels:['Hero Section','Drinks Menu','Atmosphere Gallery','Daily Specials','Customer Reviews','Map & Contact']
            },
            tr: {
                breadcrumbCurrent:'Kafe Şablonu',
                heroEyebrow:'Kafe Şablonu',
                heroTitle:'Her Ziyareti Geri Dönmeye Değer Kılın',
                heroDesc:'Tam içecek menüsü, günlük özel teklifler, paket sipariş, sadakat programı, Instagram akışı ve sıcak atmosferle modern kafe web sitesi — hepsi tek hızlı sayfada.',
                bannerTitle:'Kafe Web Sitenizi Bu Hafta Yayınlayın',
                bannerDesc:'Tek sabit fiyat. 5–7 gün içinde teslim. Netlify\'da ücretsiz barındırma. Aylık abonelik yok, kilitlenme yok — her şey size ait.',
                featureTitles:['Dijital İçecek Menüsü','Günlük Özel Banner','WhatsApp ile Paket Sipariş','Instagram Akışı','Konum ve Saatler','Müşteri Yorumları','Sadakat / Bülten','Mobil Öncelikli Tasarım','Yerel SEO'],
                featureDescs:[
                    'Fotoğraflar, fiyatlar ve alerjen bilgileriyle kaydırılabilir içecek ve yemek menüsü. İstediğiniz zaman kendiniz güncelleyin.',
                    'Mevsimlik içecekleri veya sınırlı teklifleri öne çıkaran belirgin "Bugünün Özelliği" başlığı.',
                    'Önceden doldurulmuş mesajla WhatsApp\'ı açan "Paket Sipariş Ver" butonu — üçüncü taraf uygulama ücreti yok.',
                    'En son Instagram gönderileriniz düzgün ızgara şeridinde otomatik olarak güncel kalır.',
                    'Tam pininizi gösteren Google Haritalar ve açıkça biçimlendirilmiş çalışma saatleri.',
                    'Dönen referans kaydırıcısında en iyi Google veya TripAdvisor yorumlarınız.',
                    'Promosyonlar ve sadakat ödülleri için posta listesi oluşturmanızı sağlayan e-posta formu.',
                    'Önce mobilden tasarlandı. Her ekranda sorunsuz, hızlı ve güzel.',
                    'Şema işaretlemesi ve yerel anahtar kelimelerle Google\'da üst sıralarda çıkın.'
                ],
                galleryLabels:['Hero Bölümü','İçecek Menüsü','Atmosfer Galerisi','Günlük Özel','Müşteri Yorumları','Harita & İletişim']
            }
        },

        lawyer: {
            en: {
                breadcrumbCurrent:'Law Firm Template',
                heroEyebrow:'Law Firm Template',
                heroTitle:'A Website That Commands Trust & Authority',
                heroDesc:'A professional law firm website with practice areas, attorney profiles, free consultation form, client testimonials, and a design that converts visitors into clients.',
                bannerTitle:'Give Your Firm the Website It Deserves',
                bannerDesc:'One fixed price. Delivered in 5–7 days. Hosted on Netlify for free. No monthly fees, no lock-in — fully handed over to you.',
                featureTitles:['Practice Areas Page','Attorney Profiles','Free Consultation Form','Trust & Credentials Bar','Client Testimonials','WhatsApp / Phone CTA','Office Location & Hours','Fully Responsive','SEO for Legal Services'],
                featureDescs:[
                    'Clearly structured pages for each area of law — Criminal, Family, Corporate, Real Estate, and more.',
                    'Professional profile cards for each attorney — photo, title, education, bar admissions, and personal statement.',
                    'A clear booking form that captures the client\'s name, contact, case type, and brief description — sent to your email.',
                    'Years of experience, cases won, bar memberships, and awards — key numbers that build instant trust.',
                    'Real client quotes, star ratings, and case types — professionally displayed to convert hesitant visitors.',
                    'Sticky "Call Now" and WhatsApp buttons so potential clients can reach you immediately — critical for urgent cases.',
                    'Google Maps showing your office, plus clearly listed office hours and a "Get Directions" button.',
                    'Sharp and professional on every device. Many clients visit in urgent moments on their phone.',
                    'Schema markup for law firms, local SEO keywords, and fast load times to help you rank in legal searches.'
                ],
                galleryLabels:['Hero Section','Practice Areas','Attorney Profiles','Trust & Credentials','Consultation Form','Office & Location']
            },
            tr: {
                breadcrumbCurrent:'Hukuk Bürosu Şablonu',
                heroEyebrow:'Hukuk Bürosu Şablonu',
                heroTitle:'Güven ve Otorite Yaratan Bir Web Sitesi',
                heroDesc:'Uygulama alanları, avukat profilleri, ücretsiz danışma formu, müvekkil referansları ve ziyaretçileri müvekkile dönüştüren tasarımla profesyonel hukuk bürosu web sitesi.',
                bannerTitle:'Büronuza Hak Ettiği Web Sitesini Verin',
                bannerDesc:'Tek sabit fiyat. 5–7 gün içinde teslim. Netlify\'da ücretsiz barındırma. Aylık ücret yok, kilitlenme yok — tamamen size devredilir.',
                featureTitles:['Uygulama Alanları Sayfası','Avukat Profilleri','Ücretsiz Danışma Formu','Güven ve Referans Çubuğu','Müvekkil Referansları','WhatsApp / Telefon CTA','Ofis Konumu ve Saatleri','Tam Duyarlı Tasarım','Hukuki Hizmetler SEO'],
                featureDescs:[
                    'Ceza, Aile, Ticaret, Gayrimenkul ve daha fazlası için net yapılandırılmış sayfalar.',
                    'Her avukat için profesyonel profil kartları — fotoğraf, unvan, eğitim, baro üyelikleri ve kişisel açıklama.',
                    'Müvekkil adını, iletişim bilgilerini, dava türünü ve kısa açıklamayı kaydeden net form — e-postanıza gönderilir.',
                    'Deneyim yılları, kazanılan davalar, baro üyelikleri ve ödüller — anında güven oluşturan temel rakamlar.',
                    'Gerçek müvekkil alıntıları, yıldız derecelendirmeleri ve dava türleriyle profesyonelce sunulmuş referanslar.',
                    'Potansiyel müvekkillerin anında ulaşabilmesi için yapışkan "Şimdi Ara" ve WhatsApp butonları.',
                    'Ofisinizi gösteren Google Haritalar ve açık çalışma saatleri.',
                    'Her cihazda keskin ve profesyonel. Birçok müvekkil acil anda telefondan sitenizi ziyaret eder.',
                    'Hukuk büroları için şema işaretlemesi ve yerel SEO ile avukat aramalarında üst sıralarda çıkın.'
                ],
                galleryLabels:['Hero Bölümü','Uygulama Alanları','Avukat Profilleri','Güven ve Referans','Danışma Formu','Ofis ve Konum']
            }
        },

        hotel: {
            en: {
                breadcrumbCurrent:'Hotel Template',
                heroEyebrow:'Hotel Template',
                heroTitle:'Turn Browsers Into Booked Guests',
                heroDesc:'A stunning hotel website with room showcase, online booking form, amenities section, local attractions map, guest reviews, and a design that makes guests feel the experience before they arrive.',
                bannerTitle:'Fill More Rooms With a Stunning Website',
                bannerDesc:'One fixed price. Delivered in 5–7 days. Hosted on Netlify for free. No monthly fees, no booking platform commissions — you own everything.',
                featureTitles:['Room Showcase','Booking Request Form','Amenities Section','Full Photo Gallery','Location & Attractions','Guest Reviews','WhatsApp Booking','Fully Responsive','Travel SEO'],
                featureDescs:[
                    'Beautiful room cards with photos, descriptions, bed types, capacity, amenities list, and price-per-night.',
                    'Check-in / check-out date picker, room type, number of guests, and special requests — sent to your email or WhatsApp.',
                    'Icon-based amenities grid — pool, spa, gym, restaurant, free WiFi, parking, airport transfer.',
                    'High-impact gallery of rooms, common areas, views, and dining. Lightbox zoom. Lazy-loaded for speed.',
                    'Google Maps plus a curated list of nearby beaches, museums, restaurants, and transport links.',
                    'Showcase your best Booking.com, TripAdvisor, or Google reviews with star ratings and guest names.',
                    'Floating WhatsApp button with pre-filled "I\'d like to book a room" message — fastest way to confirm bookings.',
                    'Beautiful on every screen. Travelers browse hotels on their phones — your site must work perfectly on mobile.',
                    'Schema markup for hotels, travel keywords, and fast load times to rank when travelers search your area.'
                ],
                galleryLabels:['Hero Section','Room Showcase','Amenities','Photo Gallery','Booking Form','Guest Reviews']
            },
            tr: {
                breadcrumbCurrent:'Otel Şablonu',
                heroEyebrow:'Otel Şablonu',
                heroTitle:'Ziyaretçileri Rezervasyon Yapan Misafirlere Dönüştürün',
                heroDesc:'Oda vitrini, çevrimiçi rezervasyon formu, olanaklar bölümü, yerel cazibe haritası, misafir yorumları ve misafirlerin gelmeden deneyimi hissettiren tasarımla etkileyici otel web sitesi.',
                bannerTitle:'Etkileyici Bir Web Sitesiyle Daha Fazla Oda Doldurun',
                bannerDesc:'Tek sabit fiyat. 5–7 gün içinde teslim. Netlify\'da ücretsiz barındırma. Aylık ücret yok, rezervasyon platformu komisyonu yok — her şey size ait.',
                featureTitles:['Oda Vitrini','Rezervasyon Talep Formu','Olanaklar Bölümü','Fotoğraf Galerisi','Konum ve Turistik Yerler','Misafir Yorumları','WhatsApp Rezervasyon','Tam Duyarlı Tasarım','Seyahat SEO'],
                featureDescs:[
                    'Fotoğraflar, açıklamalar, yatak türleri, kapasite, olanaklar ve gecelik fiyatla güzel oda kartları.',
                    'Giriş/çıkış tarih seçici, oda türü, misafir sayısı ve özel istekler — e-posta veya WhatsApp\'a gönderilir.',
                    'İkon tabanlı olanaklar ızgarası — havuz, spa, spor salonu, restoran, WiFi, otopark, havalimanı transferi.',
                    'Odalar, ortak alanlar, manzaralar ve yemek alanlarının yüksek etkili galerisi. Lightbox zum.',
                    'Google Haritalar ve yakın plajlar, müzeler, restoranlar ve ulaşım bağlantılarının seçilmiş listesi.',
                    'En iyi Booking.com, TripAdvisor veya Google yorumlarınızı yıldız derecelendirmeleriyle sergileyin.',
                    '"Bir oda rezervasyonu yapmak istiyorum" mesajıyla önceden doldurulmuş kayan WhatsApp butonu.',
                    'Her ekran boyutunda güzel. Seyahat edenler otellere telefondan göz atar.',
                    'Oteller için şema işaretlemesi ve seyahat anahtar kelimeleriyle bölgenizdeki aramalarda görünün.'
                ],
                galleryLabels:['Hero Bölümü','Oda Vitrini','Olanaklar','Fotoğraf Galerisi','Rezervasyon Formu','Misafir Yorumları']
            }
        },

        store: {
            en: {
                breadcrumbCurrent:'Store / Shop Template',
                heroEyebrow:'Store / Shop Template',
                heroTitle:'Showcase Your Products. Sell Without Limits.',
                heroDesc:'A modern store website with product catalogue, WhatsApp ordering, promotional banners, customer reviews, opening hours, and a design that drives foot traffic and online sales.',
                bannerTitle:'Put Your Store on the Map — Online & Off',
                bannerDesc:'One fixed price. Delivered in 5–7 days. Hosted on Netlify for free. No monthly fees, no e-commerce commissions — you keep 100% of every sale.',
                featureTitles:['Product Catalogue','WhatsApp Order Button','Promotions & Offers Banner','QR Code for In-Store','Store Location & Hours','Customer Reviews','Instagram Product Feed','Fully Responsive','Local SEO'],
                featureDescs:[
                    'A clean, filterable product grid with photos, names, descriptions, and prices on any device.',
                    'Every product card has an "Order via WhatsApp" button pre-filled with the product name. No payment gateway needed.',
                    'Bold promotional banner for sales, seasonal offers, or new arrivals at the top of the page.',
                    'Printable QR code linking to your catalogue — place on counter, packaging, or window.',
                    'Google Maps with your location, daily opening hours, and holiday notices.',
                    'Social proof section with your best Google reviews — ratings, names, and comments.',
                    'Link your Instagram feed so latest product photos stay fresh and encourage sharing.',
                    'Fast and beautiful on every device. Most customers discover local shops on their phones.',
                    'Schema markup for local businesses and product keywords to rank in local search results.'
                ],
                galleryLabels:['Hero Section','Product Catalogue','Promotions Banner','Customer Reviews','Store Gallery','Location & Hours']
            },
            tr: {
                breadcrumbCurrent:'Mağaza / Dükkan Şablonu',
                heroEyebrow:'Mağaza / Dükkan Şablonu',
                heroTitle:'Ürünlerinizi Sergileyin. Sınırsız Satın.',
                heroDesc:'Ürün kataloğu, WhatsApp ile sipariş, promosyon bannerları, müşteri yorumları, çalışma saatleri ve hem fiziksel hem çevrimiçi satışları artıran tasarımla modern mağaza web sitesi.',
                bannerTitle:"Mağazanızı Haritaya Koyun — Çevrimiçi ve Dışarıda",
                bannerDesc:"Tek sabit fiyat. 5–7 gün içinde teslim. Netlify'da ücretsiz barındırma. Aylık ücret yok, komisyon yok — her satışın %100'ü size kalır.",
                featureTitles:['Ürün Kataloğu','WhatsApp Sipariş Butonu','Promosyon ve Teklifler Başlığı','Mağaza İçi QR Kod','Mağaza Konumu ve Saatleri','Müşteri Yorumları','Instagram Ürün Akışı','Tam Duyarlı Tasarım','Yerel SEO'],
                featureDescs:[
                    'Fotoğraflar, isimler, açıklamalar ve fiyatlarla temiz, filtrelenebilir ürün ızgarası.',
                    'Her ürün kartında ürün adını önceden dolduran "WhatsApp ile Sipariş Ver" butonu. Ödeme altyapısı gerekmez.',
                    'İndirimler, mevsimlik teklifler veya yeni gelenler için sayfanın üstünde dikkat çekici promosyon başlığı.',
                    'Kataloğunuza bağlantı veren yazdırılabilir QR kod — tezgah, ambalaj veya vitrine yerleştirin.',
                    'Tam konumu, günlük çalışma saatlerini ve tatil bildirimlerini gösteren Google Haritalar.',
                    'En iyi Google yorumlarınızla puanlar, isimler ve yorumları içeren sosyal kanıt bölümü.',
                    'Instagram akışını bağlayarak ürün fotoğraflarınızın güncel kalmasını sağlayın.',
                    'Her cihazda hızlı ve güzel. Müşteriler yerel mağazaları telefondan keşfeder.',
                    'Yerel işletmeler için şema işaretlemesi ve ürün anahtar kelimeleriyle yerel aramalardan müşteri çekin.'
                ],
                galleryLabels:['Hero Bölümü','Ürün Kataloğu','Promosyon Başlığı','Müşteri Yorumları','Mağaza Galerisi','Konum ve Saatler']
            }
        },

        templates: {
            en: {
                breadcrumbCurrent:'All Templates',
                heroEyebrow:'Template Gallery',
                heroTitle:'Choose Your Template',
                heroDesc:'Every template is fully customised with your brand, content, and colours — deployed and handed over within 5–7 days.',
                filters:{ all:'All Templates', food:'Food & Drink', hospitality:'Hospitality', business:'Business', retail:'Retail' },
                cards:{
                    restaurant:{ badge:'Restaurant',   title:'Restaurant Website',        desc:'Full restaurant website with QR digital menu, online reservations, WhatsApp, photo gallery, Google Maps, and customer reviews.', btn:'View Template', pills:['Digital Menu','Reservations','WhatsApp','Gallery','Maps'] },
                    cafe:      { badge:'Cafe',          title:'Cafe Website',               desc:'Modern cafe with drinks menu, daily specials, takeaway via WhatsApp, Instagram feed, loyalty newsletter, and Google Maps.',    btn:'View Template', pills:['Drinks Menu','Takeaway','Daily Specials','Instagram'] },
                    hotel:     { badge:'Hotel',         title:'Hotel Website',              desc:'Luxury hotel with room showcase, booking form, amenities grid, photo gallery, local attractions, and guest reviews.',          btn:'View Template', pills:['Room Showcase','Booking Form','Amenities','Reviews'] },
                    lawyer:    { badge:'Law Firm',      title:'Law Firm Website',           desc:'Professional law firm with practice areas, attorney profiles, free consultation form, trust credentials, and testimonials.',    btn:'View Template', pills:['Practice Areas','Attorney Profiles','Consultation Form'] },
                    store:     { badge:'Store / Shop',  title:'Store / Shop Website',       desc:'Modern store with product catalogue, WhatsApp ordering, promotions banner, QR code for in-store, and customer reviews.',       btn:'View Template', pills:['Product Catalogue','WhatsApp Order','Promotions','QR Code'] }
                },
                bottomCtaTitle:"Don't See Your Business Type?",
                bottomCtaDesc:'I build custom websites for any business — wholesalers, clinics, gyms, real estate agents, and more. Just describe what you need.',
                bottomCtaBtn:'Request a Custom Template'
            },
            tr: {
                breadcrumbCurrent:'Tüm Şablonlar',
                heroEyebrow:'Şablon Galerisi',
                heroTitle:'Şablonunuzu Seçin',
                heroDesc:'Her şablon markanıza, içeriğinize ve renklerinize göre tamamen özelleştirilir — 5–7 gün içinde yayına alınarak teslim edilir.',
                filters:{ all:'Tüm Şablonlar', food:'Yiyecek & İçecek', hospitality:'Konaklama', business:'İş Dünyası', retail:'Perakende' },
                cards:{
                    restaurant:{ badge:'Restoran',      title:'Restoran Web Sitesi',         desc:'QR dijital menü, rezervasyon, WhatsApp, galeri, harita ve müşteri yorumlarıyla eksiksiz restoran web sitesi.',                 btn:'Şablonu Gör', pills:['Dijital Menü','Rezervasyon','WhatsApp','Galeri','Harita'] },
                    cafe:      { badge:'Kafe',           title:'Kafe Web Sitesi',              desc:'İçecek menüsü, günlük özel, paket sipariş, Instagram akışı, sadakat bülteni ve haritayla modern kafe web sitesi.',             btn:'Şablonu Gör', pills:['İçecek Menüsü','Paket Sipariş','Günlük Özel','Instagram'] },
                    hotel:     { badge:'Otel',           title:'Otel Web Sitesi',              desc:'Oda vitrini, rezervasyon formu, olanaklar, galeri, turistik yerler ve misafir yorumlarıyla lüks otel web sitesi.',             btn:'Şablonu Gör', pills:['Oda Vitrini','Rezervasyon','Olanaklar','Yorumlar'] },
                    lawyer:    { badge:'Hukuk Bürosu',   title:'Hukuk Bürosu Web Sitesi',      desc:'Uygulama alanları, avukat profilleri, danışma formu, güven referansları ve müvekkil yorumlarıyla profesyonel site.',           btn:'Şablonu Gör', pills:['Uygulama Alanları','Avukat Profilleri','Danışma Formu'] },
                    store:     { badge:'Mağaza',         title:'Mağaza / Dükkan Web Sitesi',   desc:'Ürün kataloğu, WhatsApp sipariş, promosyon başlığı, mağaza içi QR kod ve müşteri yorumlarıyla modern mağaza sitesi.',         btn:'Şablonu Gör', pills:['Ürün Kataloğu','WhatsApp Sipariş','Promosyon','QR Kod'] }
                },
                bottomCtaTitle:'İşletme Türünüzü Görmüyor musunuz?',
                bottomCtaDesc:'Toptancılar, klinikler, spor salonları, emlak danışmanları ve daha fazlası için özel web siteleri yapıyorum. Sadece ihtiyacınızı anlatın.',
                bottomCtaBtn:'Özel Şablon Talep Et'
            }
        }
    };

    // ════════════════════════════════════════════════════════
    // APPLY LANGUAGE — reads data-i18n attributes and replaces text
    // ════════════════════════════════════════════════════════
    function applyLanguage(lang) {
        const s = T.shared[lang];
        const p = T[pageId] ? T[pageId][lang] : null;
        if (!s) return;

        // Helper — safely set text on an element
        function setText(selector, text) {
            const el = document.querySelector(selector);
            if (el && text !== undefined) el.textContent = text;
        }
        function setHTML(selector, html) {
            const el = document.querySelector(selector);
            if (el && html !== undefined) el.innerHTML = html;
        }

        // ── Breadcrumb ──────────────────────────────────────
        setHTML('.template-breadcrumb a', `<i class="fas fa-home"></i>&nbsp; ${s.breadcrumb.portfolio}`);
        if (p) setText('.template-breadcrumb .current', p.breadcrumbCurrent);

        // ── Navbar ──────────────────────────────────────────
        setText('[data-i18n="nav-home"]',     s.nav.home);
        setText('[data-i18n="nav-features"]', s.nav.features);
        setText('[data-i18n="nav-gallery"]',  s.nav.gallery);
        setText('[data-i18n="nav-get"]',      s.nav.getTemplate);
        setText('[data-i18n="nav-about"]',    s.nav.about);
        setText('[data-i18n="nav-services"]', s.nav.services);
        setText('[data-i18n="nav-contact"]',  s.nav.contact);

        // ── Hero ────────────────────────────────────────────
        if (p) {
            const iconEl = document.querySelector('[data-i18n="hero-eyebrow"] i');
            const iconHTML = iconEl ? iconEl.outerHTML : '';
            setHTML('[data-i18n="hero-eyebrow"]', `${iconHTML}&nbsp;&nbsp;${p.heroEyebrow}`);
            setText('[data-i18n="hero-title"]', p.heroTitle);
            setText('[data-i18n="hero-desc"]',  p.heroDesc);
        }

        // ── CTA buttons ─────────────────────────────────────
        setHTML('[data-i18n="cta-order"]',    `<i class="fas fa-paper-plane"></i>&nbsp; ${s.cta.order}`);
        setHTML('[data-i18n="cta-features"]', `<i class="fas fa-list-ul"></i>&nbsp; ${s.cta.features}`);
        setHTML('[data-i18n="cta-quote"]',    `<i class="fas fa-paper-plane"></i>&nbsp; ${s.cta.quote}`);
        setHTML('[data-i18n="cta-wa"]',       `<i class="fab fa-whatsapp"></i>&nbsp; ${s.cta.wa}`);

        // ── Features section ────────────────────────────────
        setText('[data-i18n="features-heading"]', s.sections.featuresHeading);
        if (p && p.featureTitles) {
            p.featureTitles.forEach((title, i) => setText(`[data-i18n="feat-${i}-title"]`, title));
            p.featureDescs.forEach((desc, i)  => setText(`[data-i18n="feat-${i}-desc"]`,  desc));
        }

        // ── Gallery section ─────────────────────────────────
        setText('[data-i18n="gallery-heading"]', s.sections.galleryHeading);
        setText('[data-i18n="gallery-subtext"]', s.sections.gallerySubtext);
        if (p && p.galleryLabels) {
            p.galleryLabels.forEach((label, i) => setText(`[data-i18n="gall-${i}"]`, label));
        }

        // ── CTA Banner ──────────────────────────────────────
        if (p) {
            setText('[data-i18n="banner-title"]', p.bannerTitle);
            setText('[data-i18n="banner-desc"]',  p.bannerDesc);
        }

        // ── Footer ──────────────────────────────────────────
        setText('[data-i18n="footer-name"]',       s.footer.name);
        setText('[data-i18n="footer-desc"]',       s.footer.desc);
        setText('[data-i18n="footer-tpl-heading"]',s.footer.templatesHeading);
        setText('[data-i18n="footer-ql-heading"]', s.footer.quickLinksHeading);
        setText('[data-i18n="footer-back"]',       s.footer.back);
        Object.keys(s.footer.links).forEach(key => {
            setText(`[data-i18n="footer-${key}"]`, s.footer.links[key]);
        });
        const yr = new Date().getFullYear();
        setText('[data-i18n="footer-copyright"]', `© ${yr} ${s.footer.name}. ${s.footer.copyright}`);

        // ── Templates gallery page extras ───────────────────
        if (pageId === 'templates' && p) {
            setText('[data-i18n="hero-title"]', p.heroTitle);
            setText('[data-i18n="hero-desc"]',  p.heroDesc);
            const iconEl2 = document.querySelector('[data-i18n="hero-eyebrow"] i');
            const iconHTML2 = iconEl2 ? iconEl2.outerHTML : '';
            setHTML('[data-i18n="hero-eyebrow"]', `${iconHTML2}&nbsp;&nbsp;${p.heroEyebrow}`);

            Object.keys(p.filters).forEach(key => setText(`[data-i18n="filter-${key}"]`, p.filters[key]));

            Object.keys(p.cards).forEach(cardKey => {
                const c = p.cards[cardKey];
                setText(`[data-i18n="card-${cardKey}-badge"]`,  c.badge);
                setText(`[data-i18n="card-${cardKey}-title"]`,  c.title);
                setText(`[data-i18n="card-${cardKey}-desc"]`,   c.desc);
                setHTML(`[data-i18n="card-${cardKey}-btn"]`,    `<i class="fas fa-eye"></i> ${c.btn}`);
                c.pills.forEach((pill, i) => setText(`[data-i18n="card-${cardKey}-pill-${i}"]`, pill));
            });

            setText('[data-i18n="bottomcta-title"]', p.bottomCtaTitle);
            setText('[data-i18n="bottomcta-desc"]',  p.bottomCtaDesc);
            setHTML('[data-i18n="bottomcta-btn"]',   `<i class="fas fa-paper-plane"></i>&nbsp; ${p.bottomCtaBtn}`);
        }

        // ── Update active button UI ─────────────────────────
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });

        document.documentElement.setAttribute('lang', lang);
    }

    // ── Language toggle click handlers ──────────────────────
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            applyLanguage(lang);
        });
    });

    // ── Apply on page load ───────────────────────────────────
    applyLanguage(localStorage.getItem('language') || 'en');

});