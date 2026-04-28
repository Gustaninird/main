/* ========================
   GUSTANINI FOODTRUCK JS
   ======================== */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ---- MENU TABS ----
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    // Deactivate all
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    // Activate selected
    btn.classList.add('active');
    const content = document.getElementById(`tab-${tab}-content`);
    if (content) content.classList.add('active');
  });
});

// ---- COUNTER ANIMATION ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// ---- INTERSECTION OBSERVER ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

// Stats bar counter trigger
const statsBar = document.querySelector('.stats-bar');
let countersStarted = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  });
}, observerOptions);
if (statsBar) statsObserver.observe(statsBar);

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.menu-card, .gallery-item, .value-item, .loc-item, .channel-card');
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => fadeObserver.observe(el));

// Stagger children inside grids
document.querySelectorAll('.menu-grid.active .menu-card, .gallery-grid .gallery-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

// ---- CONTACT FORM → WHATSAPP ----
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  const text = encodeURIComponent(
    `Hola Gustanini! 👋\n\n` +
    `Mi nombre es *${name}*.\n` +
    (phone ? `Teléfono: ${phone}\n` : '') +
    `\n${message}`
  );
  window.open(`https://wa.me/18091234567?text=${text}`, '_blank');
});

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
  });
});

// ---- SMOOTH SCROLL POLYFILL FOR OLDER SAFARI ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- ADD ACTIVE LINK STYLE ----
const style = document.createElement('style');
style.textContent = `.nav-link.active-link { color: var(--white) !important; }`;
document.head.appendChild(style);
