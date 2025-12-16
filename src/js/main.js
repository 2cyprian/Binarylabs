// Utility to include HTML components
async function includeComponent(selector, url) {
  const el = document.querySelector(selector);
  if (el) {
    const res = await fetch(url);
    el.innerHTML = await res.text();
  }
}
// Example usage in page JS:
// includeComponent('#navbar', '/src/components/navbar.html');
// includeComponent('#footer', '/src/components/footer.html');
// main.js - Main application file for loading components and handling interactions

// Load navbar component
async function loadNavbar() {
  try {
    const response = await fetch('../components/navbar.html');
    const html = await response.text();
    const navbarContainer = document.getElementById('navbar-area') || document.getElementById('navbar');
    if (navbarContainer) {
      navbarContainer.innerHTML = html;
      // Initialize navbar functionality AFTER HTML is loaded
      initializeNavbar();
    }
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

// Initialize navbar toggle functionality
function initializeNavbar() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navCollapse = document.querySelector('.nav-collapse');
  const overlay = document.querySelector('.mobile-overlay');

  function toggleMenu() {
    if (!navCollapse || !overlay) return;
    navCollapse.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking any nav link
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// Load footer component
async function loadFooter() {
  try {
    const response = await fetch('../components/footer.html');
    const html = await response.text();
    document.getElementById('footer').innerHTML = html;
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

// Load hero component
async function loadHero() {
  try {
    const heroElement = document.getElementById('hero');
    if (!heroElement) return;
    
    const response = await fetch('../components/hero.html');
    const html = await response.text();
    heroElement.innerHTML = html;
  } catch (error) {
    console.error('Error loading hero:', error);
  }
}

