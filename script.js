/* ============================================
   MUROX PORTFOLIO — script.js
   Light & Clean version
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. NAVBAR — scroll shadow + mobile toggle
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ==========================================
  // 2. SCROLL REVEAL
  // ==========================================
  const revealEls = document.querySelectorAll(
    '.reveal, .section-label, .section-title, .hero-content, ' +
    '.about-text, .about-cards, .info-card, .contact-left, .contact-right'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards slightly
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    // Add stagger delay to grid children
    if (el.closest('.skills-grid') || el.closest('.work-grid') || el.closest('.about-cards')) {
      el.dataset.delay = (i % 3) * 80;
    }
    revealObserver.observe(el);
  });

  // ==========================================
  // 3. SKILL BARS ANIMATE ON SCROLL
  // ==========================================
  const skillFills = document.querySelectorAll('.skill-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.w + '%';
        setTimeout(() => { fill.style.width = width; }, 200);
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => barObserver.observe(fill));

  // ==========================================
  // 4. WORK FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================
  // 5. CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate sending — swap with Formspree / EmailJS for real emails
      setTimeout(() => {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        formSuccess.style.display = 'block';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
      }, 1400);
    });
  }

  // ==========================================
  // 6. ACTIVE NAV LINK ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = '#111111';
      }
    });
  });

  // ==========================================
  // 7. INJECT KEYFRAME ANIMATION
  // ==========================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

});
