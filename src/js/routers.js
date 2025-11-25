/**
 * Simple Router for Client-Side Navigation
 */

class Router {
  constructor() {
    this.routes = {
      '/': 'index.html',
      '/home': 'home.html',
      '/about': 'about.html',
      '/projects': 'projects.html',
      '/contact': 'contact.html'
    };
    this.currentPath = '/';
  }

  init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname);
    });

    // Handle initial route
    const path = window.location.pathname;
    if (path !== '/' && path !== '') {
      this.navigate(path);
    }
  }

  navigate(path) {
    // Normalize path
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // Find matching route
    const routePath = Object.keys(this.routes).find(route => {
      return path.includes(route) || path.endsWith(this.routes[route]);
    });

    if (routePath) {
      this.currentPath = routePath;
      const page = this.routes[routePath];
      this.loadPage(page);
      window.history.pushState(null, '', routePath);
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

  loadPage(page) {
    // This is a placeholder for actual page loading
    // In a real SPA, you might use fetch to load page content
    console.log(`Navigating to: ${page}`);
  }

  add(path, page) {
    this.routes[path] = page;
  }

  getCurrentPath() {
    return this.currentPath;
  }
}

export default Router;
