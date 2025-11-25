// Wait for navbar to be loaded, then initialize
function initializeNavbar() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navCollapse = document.querySelector('.nav-collapse');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburgerIcon = document.querySelector('.menu');
    const closeIcon = document.querySelector('.close');
    
    // If elements aren't found, wait and try again
    if (!mobileBtn || !navCollapse || !overlay) {
        setTimeout(initializeNavbar, 100);
        return;
    }

    function toggleMenu() {
        if (!navCollapse || !overlay) return;
        const isActive = navCollapse.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Toggle Icon visibility
        if (hamburgerIcon && closeIcon) {
            if (isActive) {
                hamburgerIcon.style.display = 'none';
                closeIcon.style.display = 'inline-block';
            } else {
                hamburgerIcon.style.display = 'inline-block';
                closeIcon.style.display = 'none';
            }
        }
    }

    // Event Listeners
    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    
    // Close when clicking the overlay (background)
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close when clicking a link inside
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks && navLinks.length && navCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }
}

// Start initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeNavbar);