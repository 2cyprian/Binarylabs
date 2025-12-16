// Component loader utility
export async function loadComponent(selector, componentPath) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element ${selector} not found`);
    return;
  }
  
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${componentPath}: ${response.status}`);
    }
    const html = await response.text();
    element.innerHTML = html;
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Import modal initialization
import { initializeModal } from './modal.js';

// Load all common components
export async function initializeComponents() {
  await Promise.all([
    loadComponent('#navbar', '/src/components/navbar.html'),
    loadComponent('#footer', '/src/components/footer.html'),
    loadComponent('#hero', '/src/components/hero.html')
  ]);
  
  // Initialize navbar toggle after components are loaded
  initializeNavbarToggle();
  
  // Initialize modal after components are loaded
  initializeModal();
  
  // Notify other scripts that components have been loaded into the DOM
  try {
    window.dispatchEvent(new Event('components:loaded'));
  } catch (e) {
    // ignore in very old browsers
  }
}

// Initialize navbar mobile toggle
function initializeNavbarToggle() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navCollapse = document.querySelector('.nav-collapse');
  const overlay = document.querySelector('.mobile-overlay');

  if (!mobileBtn || !navCollapse || !overlay) {
    console.warn('Navbar elements not found');
    return;
  }

  function toggleMenu() {
    navCollapse.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  mobileBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

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

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  initializeComponents();
}