document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.classList.toggle('active', open);
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Leaf-vein scroll progress (signature element) ---------- */
  const veinProgress = document.querySelector('.vein-progress');
  const veinRail = document.querySelector('.vein-rail');
  if (veinProgress && veinRail) {
    const updateVein = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      veinProgress.style.height = (pct * veinRail.clientHeight) + 'px';
    };
    window.addEventListener('scroll', updateVein, { passive: true });
    window.addEventListener('resize', updateVein);
    updateVein();
  }

  /* ---------- Header background on scroll ---------- */
  const header = document.querySelector('.site-header');
  const setHeaderState = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 30 ? '0 8px 24px -18px rgba(22,53,31,.4)' : 'none';
  };
  window.addEventListener('scroll', setHeaderState, { passive: true });
  setHeaderState();

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.acc-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Testimonial slider ---------- */
  const slides = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.getElementById('testiDots');
  let current = 0;
  let sliderTimer;

  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showSlide(i));
      dotsWrap.appendChild(dot);
    });

    function showSlide(index) {
      slides[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
      resetTimer();
    }

    function resetTimer() {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(() => showSlide(current + 1), 6000);
    }

    slides[0].classList.add('active');
    resetTimer();
  }

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', (e.clientX - rect.left) + 'px');
      btn.style.setProperty('--ry', (e.clientY - rect.top) + 'px');
      btn.classList.remove('rippling');
      // force reflow so the animation can restart
      void btn.offsetWidth;
      btn.classList.add('rippling');
    });
  });

});
