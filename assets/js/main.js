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
// THEME TOGGLE
// ---------------------------------------------
const modeToggle = document.getElementById('modeToggle');
modeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = modeToggle.querySelector('i');

  if (document.body.classList.contains('dark-mode')) {
    icon.className = 'bi bi-sun-fill';
  } else {
    icon.className = 'bi bi-moon-fill';
  }
});

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
      formStatus.style.display = "block";
      formError.style.display = "none";
      sendBtn.innerText = "Sent ✅";
      setTimeout(() => sendBtn.innerText = "Send Message →", 1500);
    } else {
      formError.style.display = "block";
      formStatus.style.display = "none";
      sendBtn.innerText = "Try Again ❌";
    }
  });
}
