/* ========================================
   MAIN.JS — Portfolio Massimo Caliman
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initTypingEffect();
  initScrollReveal();
  initNavbar();
  initMobileMenu();
  initCertsToggle();
  initTimelineToggle();
});

/* ----------------------------------------
   LANGUAGE TOGGLE
   ---------------------------------------- */
function initLanguageToggle() {
  const html = document.documentElement;
  const btnIt = document.getElementById('lang-it');
  const btnEn = document.getElementById('lang-en');

  // Restore saved preference
  const saved = localStorage.getItem('lang') || 'it';
  setLang(saved);

  btnIt.addEventListener('click', () => setLang('it'));
  btnEn.addEventListener('click', () => setLang('en'));

  function setLang(lang) {
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    btnIt.classList.toggle('active', lang === 'it');
    btnEn.classList.toggle('active', lang === 'en');
    // Restart typing for new language
    if (window._typingInstance) {
      window._typingInstance.restart(lang);
    }
  }
}

/* ----------------------------------------
   TYPING EFFECT
   ---------------------------------------- */
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = {
    it: ['Software Architect', 'CTO', 'Java Expert', 'Speaker', 'CoFounder JUG Genova'],
    en: ['Software Architect', 'CTO', 'Java Expert', 'Speaker', 'JUG Genova CoFounder']
  };

  let currentLang = document.documentElement.getAttribute('data-lang') || 'it';
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout = null;

  function type() {
    const currentStrings = strings[currentLang] || strings.it;
    const current = currentStrings[stringIndex % currentStrings.length];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex++;
      delay = 400;
    }

    timeout = setTimeout(type, delay);
  }

  type();

  window._typingInstance = {
    restart(lang) {
      currentLang = lang;
      clearTimeout(timeout);
      stringIndex = 0;
      charIndex = 0;
      isDeleting = false;
      el.textContent = '';
      type();
    }
  };
}

/* ----------------------------------------
   SCROLL REVEAL (IntersectionObserver)
   ---------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger children if they exist
        const children = entry.target.querySelectorAll('.reveal-child');
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 100);
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ----------------------------------------
   NAVBAR (scroll effect + active section)
   ---------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('.section[id]');

  // Scroll class
  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  // Active link highlight
  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
  }, { passive: true });

  updateNavbar();

  // Smooth scroll with offset
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu
        document.querySelector('.nav-links').classList.remove('open');
        document.querySelector('.mobile-toggle').classList.remove('open');
      }
    });
  });
}

/* ----------------------------------------
   MOBILE MENU
   ---------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-links');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });
}

/* ----------------------------------------
   CERTIFICATIONS SHOW MORE / LESS
   ---------------------------------------- */
function initCertsToggle() {
  const btn = document.getElementById('certs-toggle');
  if (!btn) return;

  const hiddenCerts = document.querySelectorAll('.cert-card.hidden-cert');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    hiddenCerts.forEach(card => {
      card.style.display = expanded ? 'flex' : 'none';
    });
    const lang = document.documentElement.getAttribute('data-lang') || 'it';
    if (expanded) {
      btn.querySelector('.lang-it').textContent = '▲ Mostra meno';
      btn.querySelector('.lang-en').textContent = '▲ Show less';
    } else {
      btn.querySelector('.lang-it').textContent = '▼ Mostra tutte le certificazioni';
      btn.querySelector('.lang-en').textContent = '▼ Show all certifications';
    }
  });
}

/* ----------------------------------------
   TIMELINE SHOW MORE / LESS
   ---------------------------------------- */
function initTimelineToggle() {
  const btn = document.getElementById('timeline-toggle');
  if (!btn) return;

  const hiddenItems = document.querySelectorAll('.timeline-item.hidden-item');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    hiddenItems.forEach(item => {
      item.style.display = expanded ? 'block' : 'none';
    });
    if (expanded) {
      btn.querySelector('.lang-it').textContent = '▲ Mostra meno';
      btn.querySelector('.lang-en').textContent = '▲ Show less';
    } else {
      btn.querySelector('.lang-it').textContent = '▼ Mostra tutta la carriera';
      btn.querySelector('.lang-en').textContent = '▼ Show full career';
    }
  });
}
