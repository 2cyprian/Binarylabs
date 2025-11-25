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
    document.getElementById('navbar-area').innerHTML = html;
    updateActiveLink();
    setupNavbarToggle();
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
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

