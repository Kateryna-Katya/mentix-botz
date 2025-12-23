document.addEventListener('DOMContentLoaded', () => {

  // Инициализация иконок
  if (window.lucide) window.lucide.createIcons();

  // Lenis Smooth Scroll
  let lenis;
  if (window.Lenis) {
      lenis = new Lenis();
      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
  }

  // МОБИЛЬНОЕ МЕНЮ
  const burger = document.querySelector('#burger');
  const mobileMenu = document.querySelector('#mobile-menu');
  const body = document.body;

  if (burger && mobileMenu) {
      burger.addEventListener('click', (e) => {
          e.preventDefault();
          const active = mobileMenu.classList.toggle('active');
          burger.classList.toggle('active');
          body.style.overflow = active ? 'hidden' : '';
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              mobileMenu.classList.remove('active');
              burger.classList.remove('active');
              body.style.overflow = '';
          });
      });
  }

  // GSAP + SplitType
  if (window.gsap && window.SplitType) {
      const title = document.querySelector('#hero-title');
      if (title) {
          const split = new SplitType(title, { types: 'words, chars' });
          gsap.from(split.chars, {
              opacity: 0,
              y: 30,
              stagger: 0.02,
              duration: 1,
              ease: "power3.out"
          });
      }
  }

  // ЛОГИКА ФОРМЫ (Франция)
  const form = document.querySelector('#main-form');
  if (form) {
      const captchaLabel = document.querySelector('#captcha-label');
      const captchaInput = document.querySelector('#captcha-input');
      const phoneInput = document.querySelector('#phone-input');

      const v1 = Math.floor(Math.random() * 8) + 2;
      const v2 = Math.floor(Math.random() * 5) + 1;
      const sum = v1 + v2;
      if (captchaLabel) captchaLabel.textContent = `${v1} + ${v2} = ?`;

      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9+]/g, '');
      });

      form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (parseInt(captchaInput.value) !== sum) {
              alert('Неверная капча!');
              return;
          }
          form.querySelector('button').textContent = 'Отправка...';
          setTimeout(() => {
              form.style.display = 'none';
              document.querySelector('#form-success').classList.add('active');
              if (window.lucide) window.lucide.createIcons();
          }, 1500);
      });
  }

  // Хедер
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
  });
});