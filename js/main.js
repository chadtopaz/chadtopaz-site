/* ============================================
   CHAD TOPAZ — Site Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Nav Shadow ---
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Mobile dropdown toggles
    const dropdownParents = menu.querySelectorAll('.nav-item.has-dropdown > .nav-link');
    dropdownParents.forEach(parent => {
      parent.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          parent.parentElement.classList.toggle('mobile-open');
        }
      });
    });
  }

  // --- Close mobile menu on resize ---
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu && menu.classList.contains('open')) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      // Toggle clicked
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  // --- Fade In on Scroll ---
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
