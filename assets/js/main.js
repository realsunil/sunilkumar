// ---------------------------------------------
// PRELOADER
// ---------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const pre = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      pre.style.opacity = '0';
      setTimeout(() => pre.style.display = 'none', 600);
    }, 600);
  });

  setTimeout(() => {
    if (pre.style.display !== 'none') {
      pre.style.opacity = '0';
      setTimeout(() => pre.style.display = 'none', 600);
    }
  }, 4000);
});

if (window.innerWidth < 768) {
  document.querySelectorAll("[data-tilt]").forEach(el => {
    el.vanillaTilt?.destroy();
  });
}


// ---------------------------------------------
// AOS INIT
// ---------------------------------------------
AOS.init({
  duration: 800,
  once: true
});

// ---------------------------------------------
// TYPED TEXT HERO
// ---------------------------------------------
const typedEl = document.querySelector('.typed-text');
if (typedEl) {
  new Typed(typedEl, {
    strings: ['Developer', 'Video Editor', 'Content Creator', 'Freelancer'],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1200,
    loop: true
  });
}

// ---------------------------------------------
// VanillaTilt - Project cards tilt effect
// ---------------------------------------------
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.18,
  });
}

// ---------------------------------------------
// GSAP Entrance Animations
// ---------------------------------------------
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero h1', { y: 30, opacity: 0, duration: 1.1 });
  gsap.from('.hero .lead', { y: 20, opacity: 0, duration: 1.2, delay: 0.2 });

  gsap.utils.toArray('.section').forEach((sec, i) => {
    gsap.from(sec, {
      scrollTrigger: { trigger: sec, start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.9,
      delay: i * 0.08
    });
  });
}

// ---------------------------------------------
// PROJECT POPUP MODAL FILL
// ---------------------------------------------
const projectModal = document.getElementById('projectModal');

if (projectModal) {
  projectModal.addEventListener('show.bs.modal', function (event) {
    const btn = event.relatedTarget;
    const title = btn.getAttribute('data-title') || '';
    const desc = btn.getAttribute('data-desc') || '';
    const img = btn.getAttribute('data-img') || '';
    const live = btn.getAttribute('data-live') || '#';
    const repo = btn.getAttribute('data-repo') || '#';

    document.getElementById('projectModalLabel').textContent = title;
    document.getElementById('projectModalDesc').textContent = desc;
    document.getElementById('projectModalImg').src = img;
    document.getElementById('projectModalLive').href = live;
    document.getElementById('projectModalRepo').href = repo;
  });
}

// ---------------------------------------------
// PROJECT FILTER
// ---------------------------------------------
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    document.querySelectorAll('.project-item').forEach(item => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.style.display = 'block';
        item.classList.add('aos-animate');
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ---------------------------------------------
// THEME TOGGLE (Desktop)
// ---------------------------------------------
const modeToggle = document.getElementById('modeToggle');
if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = modeToggle.querySelector('i');

    if (document.body.classList.contains('light-mode')) {
      icon.className = 'bi bi-sun-fill';
    } else {
      icon.className = 'bi bi-moon-fill';
    }
  });
}

// ---------------------------------------------
// MOBILE MENU TOGGLE - ADD THIS NEW CODE
// ---------------------------------------------
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  // Toggle menu on button click
  mobileMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = mobileMenu.classList.contains('active') ? 'bi bi-x-lg' : 'bi bi-list';
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.querySelector('i').className = 'bi bi-list';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.querySelector('i').className = 'bi bi-list';
    }
  });
}

// ---------------------------------------------
// MOBILE THEME TOGGLE - ADD THIS NEW CODE
// ---------------------------------------------
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = mobileThemeToggle.querySelector('i');
    icon.className = document.body.classList.contains('light-mode') ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    
    // Sync with desktop theme toggle
    const desktopIcon = document.querySelector('#modeToggle i');
    if (desktopIcon) {
      desktopIcon.className = document.body.classList.contains('light-mode') ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  });
}

// ---------------------------------------------
// CURRENT YEAR (Footer)
// ---------------------------------------------
const yearEl = document.getElementById('curYear');
yearEl && (yearEl.textContent = new Date().getFullYear());

// ---------------------------------------------
// CONTACT FORM — FORMSPREE ✅
// ---------------------------------------------
const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const formStatus = document.getElementById("formStatus");
const formError = document.getElementById("formError");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    sendBtn.innerText = "Sending...";

    let res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      form.reset();
      if (formStatus) {
        formStatus.style.display = "block";
      }
      if (formError) {
        formError.style.display = "none";
      }
      sendBtn.innerText = "Sent ✅";
      setTimeout(() => sendBtn.innerText = "Send Message →", 1500);
    } else {
      if (formError) {
        formError.style.display = "block";
      }
      if (formStatus) {
        formStatus.style.display = "none";
      }
      sendBtn.innerText = "Try Again ❌";
    }
  });
}