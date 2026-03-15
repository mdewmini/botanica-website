// ===========================
//  BOTANICA — JAVASCRIPT
// ===========================

// ---- 1. RESPONSIVE HAMBURGER MENU ----
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open');
  }
  
  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('open');
    });
  });
  
  
  // ---- 2. PLANT DETAIL MODAL ----
  let currentPlant = '';
  
  function openModal(name, description, price) {
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-desc').textContent = description;
    document.getElementById('modal-price').textContent = price;
    document.getElementById('cart-msg').textContent = '';
    document.getElementById('modal').classList.add('active');
    currentPlant = name;
  }
  
  function closeModal() {
    document.getElementById('modal').classList.remove('active');
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
  
  
  // ---- 3. ADD TO CART (JavaScript Function) ----
  let cart = [];
  
  function addToCart() {
    if (!currentPlant) return;
    cart.push(currentPlant);
    const msg = document.getElementById('cart-msg');
    msg.textContent = `✅ "${currentPlant}" added to cart! (${cart.length} item${cart.length > 1 ? 's' : ''} total)`;
  }
  
  
  // ---- 4. CONTACT FORM VALIDATION & RESPONSE ----
  function sendMessage() {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const response = document.getElementById('form-response');
  
    if (!name || !email || !message) {
      response.style.color = '#c0392b';
      response.textContent = '⚠️ Please fill in all fields before sending.';
      return;
    }
  
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      response.style.color = '#c0392b';
      response.textContent = '⚠️ Please enter a valid email address.';
      return;
    }
  
    // Simulate sending
    response.style.color = '#3d7a4e';
    response.textContent = `🌿 Thank you, ${name}! Your message has been sent. We'll reply to ${email} within 24 hours.`;
  
    // Clear fields
    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';
  }
  
  
  // ---- 5. SCROLL-TRIGGERED FADE-IN ANIMATION ----
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Apply scroll animation to key sections
  document.querySelectorAll(
    '.plant-card, .link-card, .about-grid, .care-inner, .contact-inner, .pricing-section .table-wrap'
  ).forEach(el => {
    el.classList.add('fade-on-scroll');
    fadeObserver.observe(el);
  });
  
  
  // ---- 6. DYNAMIC GREETING IN NAVBAR (bonus JS) ----
  (function setGreeting() {
    const hour = new Date().getHours();
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      let emoji = '🌿';
      if (hour >= 5  && hour < 12) emoji = '🌅';
      if (hour >= 12 && hour < 17) emoji = '☀️';
      if (hour >= 17 && hour < 21) emoji = '🌇';
      if (hour >= 21 || hour < 5)  emoji = '🌙';
      logo.textContent = `${emoji} Botanica`;
    }
  })();
  
  
  // ---- 7. ACTIVE NAV HIGHLIGHT ON SCROLL ----
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.getAttribute('id');
      }
    });
  
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = 'var(--green)';
      }
    });
  });