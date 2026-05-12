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