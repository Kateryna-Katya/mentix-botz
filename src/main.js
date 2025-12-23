/**
 * PROJECT: Mentix-Botz.blog
 * DESCRIPTION: Full interactivity script including GSAP, Lenis, Mobile Menu & Form Logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. ПЛАВНЫЙ СКРОЛЛ (LENIS) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 3. МОБИЛЬНОЕ МЕНЮ (ИСПРАВЛЕНО) ---
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
    const body = document.body;

    if (burger && mobileMenu) {
        const toggleMenu = () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');
        };

        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Закрытие при клике по ссылке
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Закрытие меню при клике вне его области
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== burger) {
                toggleMenu();
            }
        });
    }

    // --- 4. ЭФФЕКТЫ ХЕДЕРА ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 5. АНИМАЦИИ GSAP ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Посимвольная анимация заголовка (SplitType)
        const heroTitleText = document.querySelector('#hero-title');
        if (heroTitleText) {
            const split = new SplitType(heroTitleText, { types: 'chars' });
            gsap.from(split.chars, {
                opacity: 0,
                y: 50,
                rotateX: -45,
                stagger: 0.02,
                duration: 1,
                ease: "power4.out"
            });
        }

        // Плавное появление элементов при скролле
        const revealElements = document.querySelectorAll('.benefit-card, .blog-card, .section-title, .about__grid');
        revealElements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power2.out"
            });
        });

        // Микродвижение фона в Hero
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30;
            const yPos = (clientY / window.innerHeight - 0.5) * 30;
            
            gsap.to('.hero__bg-element', {
                x: xPos,
                y: yPos,
                duration: 2,
                ease: "power1.out"
            });
        });
    }

    // --- 6. ЛОГИКА КОНТАКТНОЙ ФОРМЫ ---
    const contactForm = document.getElementById('main-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    const successBox = document.getElementById('form-success');

    if (contactForm) {
        // Генерация капчи
        let n1 = Math.floor(Math.random() * 10) + 1;
        let n2 = Math.floor(Math.random() * 5) + 1;
        let correctAnswer = n1 + n2;
        
        if (captchaLabel) {
            captchaLabel.textContent = `Сколько будет ${n1} + ${n2}?`;
        }

        // Валидация телефона (только цифры и +)
        phoneInput?.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9+]/g, '');
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Проверка капчи
            if (parseInt(captchaInput.value) !== correctAnswer) {
                captchaInput.style.borderColor = '#ff4b4b';
                alert('Пожалуйста, решите математический пример правильно.');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';

            // Имитация отправки (AJAX)
            setTimeout(() => {
                contactForm.style.opacity = '0';
                contactForm.style.pointerEvents = 'none';
                
                if (successBox) {
                    successBox.classList.add('active');
                    // Скролл к сообщению об успехе
                    lenis.scrollTo('#contact', { offset: -100 });
                }
            }, 1500);
        });
    }

    // --- 7. ПЛАВНЫЙ ПЕРЕХОД ПО ЯКОРЯМ ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            lenis.scrollTo(targetId, {
                offset: -80,
                duration: 1.5
            });
        });
    });

    // Кнопка консультации в Hero
    const heroCta = document.querySelector('.scroll-to-contact');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            lenis.scrollTo('#contact', { offset: -50 });
        });
    }
});