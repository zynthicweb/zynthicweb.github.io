/* ==========================================================================
   VANILLA JAVASCRIPT CONTROLLER - ZYNTHIC WEB SOLUTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initBackToTop();
  initWhatsAppButton();
  initActiveNav();
  initFaqAccordion();
  initPortfolioFilter();
  initStepForm();
  initFormValidation();
  initHeroSlider();
  initTestimonialsSlider();
});

/* 1. Sticky Header */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  });
}

/* 2. Accessible Mobile Navigation Drawer */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-active');
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-active');
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-active');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-active')) {
      closeMenu();
    }
  });
}

/* 3. Back To Top Button */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Centralized WhatsApp Floating Button Configuration */
const WHATSAPP_CONFIG = {
  // International format: country code + number without +, spaces, or hyphens
  phone: '917820072009',
  message: 'Hi, I would like to discuss a website or digital solution for my business.'
};

function initWhatsAppButton() {
  if (document.querySelector('.whatsapp-float')) return;

  const encodedMessage = encodeURIComponent(WHATSAPP_CONFIG.message);
  const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodedMessage}`;

  const waBtn = document.createElement('a');
  waBtn.href = waUrl;
  waBtn.className = 'whatsapp-float';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waBtn.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.484 1.332 5.002L2 22l5.127-1.341a9.96 9.96 0 0 0 4.881 1.28h.004c5.506 0 9.99-4.478 9.99-9.984A9.94 9.94 0 0 0 19.08 4.91a9.94 9.94 0 0 0-7.068-2.91zm0 1.667c4.588 0 8.324 3.734 8.324 8.317 0 2.222-.865 4.31-2.438 5.882a8.27 8.27 0 0 1-5.886 2.436h-.004a8.28 8.28 0 0 1-4.062-1.07l-.291-.173-3.023.791.806-2.943-.189-.302a8.31 8.31 0 0 1-1.272-4.622c0-4.583 3.737-8.317 8.325-8.317zm-3.6 3.658c-.198 0-.524.074-.798.372-.274.298-1.045 1.021-1.045 2.49 0 1.47 1.07 2.89 1.22 3.09.15.198 2.062 3.298 5.094 4.542.72.296 1.282.473 1.721.613.724.23 1.382.197 1.902.12.58-.087 1.785-.73 2.037-1.433.251-.703.251-1.306.175-1.433-.075-.127-.274-.202-.572-.351-.298-.15-1.785-.881-2.062-.98-.276-.1-.478-.15-.677.15-.198.298-.77 0.98-.944 1.179-.174.198-.348.223-.646.074-.298-.15-1.26-.465-2.4-1.482-.888-.792-1.488-1.77-1.662-2.068-.174-.298-.018-.46.13-.607.135-.134.298-.348.447-.522.15-.174.198-.298.298-.496.1-.198.05-.373-.025-.522-.075-.15-.677-1.638-.928-2.242-.244-.588-.493-.508-.677-.517-.174-.009-.373-.009-.572-.009z"/></svg>`;

  document.body.appendChild(waBtn);
}

/* 4. Active Navigation State Based on Current URL */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link, .mobile-nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* 5. FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all others
      faqItems.forEach(i => i.classList.remove('is-open'));

      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

/* 6. Portfolio Category Filter */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* 7. Step Form Switcher */
function initStepForm() {
  const stepItems = document.querySelectorAll('.step-item');
  const stepPanes = document.querySelectorAll('.step-pane');
  const nextBtn = document.querySelector('.btn-step-next');

  if (!stepItems.length || !stepPanes.length) return;

  function goToStep(index) {
    stepItems.forEach((item, i) => {
      if (i === index) item.classList.add('active');
      else item.classList.remove('active');
    });

    stepPanes.forEach((pane, i) => {
      if (i === index) pane.style.display = 'block';
      else pane.style.display = 'none';
    });
  }

  stepItems.forEach((item, idx) => {
    item.addEventListener('click', () => goToStep(idx));
  });

  if (nextBtn) {
    let current = 0;
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      current = (current + 1) % stepPanes.length;
      goToStep(current);
    });
  }
}

/* 8. Contact Form Client-Side Validation & Feedback */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#EF3B24';
        } else {
          input.style.borderColor = '';
        }
      });

      const feedback = form.querySelector('.form-feedback');
      if (feedback) {
        if (valid) {
          feedback.style.display = 'block';
          feedback.style.color = '#22C55E';
          feedback.textContent = 'Thank you! Your inquiry has been logged. Our team will get back to you shortly.';
          form.reset();
        } else {
          feedback.style.display = 'block';
          feedback.style.color = '#EF3B24';
          feedback.textContent = 'Please complete all required fields before submitting.';
        }
      }
    });
  });
}

/* 9. Dynamic Interactive Hero Slider */
function initHeroSlider() {
  const heroSection = document.querySelector('.hero-slider');
  if (!heroSection) return;

  const slides = heroSection.querySelectorAll('.hero-slide');
  const dots = heroSection.querySelectorAll('.hero-dot');
  const prevBtn = heroSection.querySelector('.hero-prev-btn');
  const nextBtn = heroSection.querySelector('.hero-next-btn');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(i);
      startAutoPlay();
    });
  });

  heroSection.addEventListener('mouseenter', stopAutoPlay);
  heroSection.addEventListener('mouseleave', startAutoPlay);

  showSlide(0);
  startAutoPlay();
}

/* 10. Dynamic Interactive Testimonials Slider */
function initTestimonialsSlider() {
  const sliderWrapper = document.querySelector('.testimonial-slider-container');
  if (!sliderWrapper) return;

  const track = sliderWrapper.querySelector('.testimonial-track');
  const slides = sliderWrapper.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev-btn');
  const nextBtn = document.querySelector('.testimonial-next-btn');
  const dotsContainer = document.querySelector('.testimonial-dots');

  if (!slides.length || !track) return;

  let currentIndex = 0;
  let autoTimer = null;

  function getSlidesPerPage() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function updateSlider() {
    const slidesPerPage = getSlidesPerPage();
    const maxIndex = Math.max(0, slides.length - slidesPerPage);

    if (currentIndex > maxIndex) currentIndex = maxIndex;

    // Calculate percentage shift
    const itemPercentage = 100 / slidesPerPage;
    const moveAmount = currentIndex * itemPercentage;

    track.style.transform = `translateX(-${moveAmount}%)`;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((d, i) => {
        if (i === currentIndex) d.classList.add('active');
        else d.classList.remove('active');
      });
    }
  }

  function renderDots() {
    if (!dotsContainer) return;
    const slidesPerPage = getSlidesPerPage();
    const maxIndex = Math.max(0, slides.length - slidesPerPage);

    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('span');
      dot.className = `testimonial-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    const slidesPerPage = getSlidesPerPage();
    const maxIndex = Math.max(0, slides.length - slidesPerPage);

    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
    currentIndex = index;
    updateSlider();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoTimer) clearInterval(autoTimer);
  }

  window.addEventListener('resize', () => {
    renderDots();
    updateSlider();
  });

  sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
  sliderWrapper.addEventListener('mouseleave', startAutoPlay);

  renderDots();
  updateSlider();
  startAutoPlay();
}
