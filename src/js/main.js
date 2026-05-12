const observerOptions = {
  root: null, // use the viewport
  threshold: 0.2 // trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add data attribute to trigger the CSS
      entry.target.setAttribute('data-animate', 'true');
      
      // Stop observing this specific element after it animates once
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 1. Grab ALL elements with the class
const animatableElements = document.querySelectorAll('.animate__on-scren');

// 2. Loop through the NodeList and observe each element
animatableElements.forEach(el => {
  observer.observe(el);
});