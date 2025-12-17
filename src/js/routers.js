/**
 * Simple Router for Client-Side Navigation
 */

class Router {
  constructor() {
    this.routes = {
      '/': { name: 'Home', file: 'labs.html' },
      '/skills': { name: 'Skills', file: 'skills.html' },
    };
    this.currentPath = '/';
  }

  init() {
    // Handle hash changes
    window.addEventListener('hashchange', () => {
      this.navigate(window.location.hash);
    });

    // Handle initial route
    const hash = window.location.hash || '#/';
    this.navigate(hash);
  }

  navigate(path) {
    // Remove hash if present
    if (path.startsWith('#')) {
      path = path.substring(1);
    }
    
    // Normalize path
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // Find matching route
    const routePath = Object.keys(this.routes).find(route => {
      return path === route;
    });

    if (routePath) {
      this.currentPath = routePath;
      const routeConfig = this.routes[routePath];
      this.loadPage(routeConfig.file);
      window.location.hash = routePath;
      // If contact, scroll to footer
      if (routePath === '/contact') {
        setTimeout(() => {
          const footer = document.getElementById('footer');
          if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    } else {
      console.warn(`Route not found: ${path}`);
    }
  }

  async loadPage(page) {
    try {
      const response = await fetch(`/src/pages/${page}`);
      if (!response.ok) throw new Error(`Failed to load ${page}`);
      const content = await response.text();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = content;
      }
    } catch (error) {
      console.error('Error loading page:', error);
    }
  }

  add(path, page) {
    this.routes[path] = page;
  }

  getCurrentPath() {
    return this.currentPath;
  }
}

export default Router;
