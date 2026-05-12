// Select the elements
const navToggle = document.querySelector('.navigation__toggle');
const navMenu = document.querySelector('.navigation__menu');
const body = document.body;

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    // 1. Check current state
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

    // 2. Toggle Aria-Expanded (for Accessibility and your SCSS X-animation)
    navToggle.setAttribute('aria-expanded', !isExpanded);

    // 3. Toggle the 'is-open' class (for Menu Visibility)
    navMenu.classList.toggle('is-open');
  });
}

// Optional: Close menu when clicking a link
const navLinks = document.querySelectorAll('.navigation__menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    body.classList.remove('no-scroll');
  });
});

const observerOptions = {
  root: null, // use the viewport
  threshold: 0.2 // trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add data attribute to trigger the CSS
      entry.target.setAttribute('data-animate', 'true');
      // Optional: Stop observing after it animates once
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Target the wrapper or the individual items
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  observer.observe(statsGrid);
}