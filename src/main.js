document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. Lenis - Плавный скролл
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 5. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Title Animation
    const heroTitle = new SplitType('#hero-title', { types: 'chars' });
    gsap.from(heroTitle.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out"
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.benefit-card, .section-title, .contact__info, .contact__form-wrapper');
    reveals.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 6. Contact Form Logic
    const form = document.getElementById('main-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    const successMsg = document.getElementById('form-success');

    // Генерируем капчу
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let captchaResult = num1 + num2;
    captchaLabel.innerText = `Сколько будет ${num1} + ${num2}?`;

    // Валидация телефона (только цифры)
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9+]/g, '');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Проверка капчи
        if (parseInt(captchaInput.value) !== captchaResult) {
            alert('Ошибка капчи! Попробуйте снова.');
            return;
        }

        const btn = form.querySelector('button');
        btn.innerText = 'Отправка...';
        btn.disabled = true;

        // Имитация AJAX
        setTimeout(() => {
            successMsg.classList.add('active');
            form.style.visibility = 'hidden';
            lucide.createIcons(); // Перерисовать иконку в сообщении
        }, 1500);
    });

    // Кнопка в Hero
    document.querySelector('.scroll-to-contact').addEventListener('click', () => {
        lenis.scrollTo('#contact');
    });
});