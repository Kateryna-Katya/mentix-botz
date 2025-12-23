// Подключаем SplitType для анимации заголовка
// (В реальном проекте добавить: <script src="https://unpkg.com/split-type"></script>)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active'); // Нужно добавить стили для крестика
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // 2. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animation
    const heroTitle = new SplitType('#hero-title', { types: 'chars' });
    gsap.from(heroTitle.chars, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(1.7)",
    });

    gsap.from('.hero__subtitle, .hero__description, .hero__btns', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 0.5
    });

    // Scroll Reveal for sections
    const revealElements = document.querySelectorAll('.benefit-card, .blog-card, .section-title');
    revealElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 3. Hover Effects on Cursor (Optional micro-move)
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero__bg-element', {
            x: x,
            y: y,
            duration: 2,
            ease: "power1.out"
        });
    });
});