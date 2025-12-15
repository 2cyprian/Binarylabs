document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------
    // 1️⃣ Set active link based on data-page
    // -------------------------------
    const currentPage = document.body.dataset.page; // get current page
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add('active');
        }
    });

    // -------------------------------
    // 2️⃣ Initialize mobile navbar toggle
    // -------------------------------
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navCollapse = document.querySelector('.nav-collapse');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburgerIcon = document.querySelector('.menu'); // optional if you have icon switching
    const closeIcon = document.querySelector('.close');    // optional if you have icon switching

    function toggleMenu() {
        if (!navCollapse || !overlay) return;
        const isActive = navCollapse.classList.toggle('active');
        overlay.classList.toggle('active');

        // Optional: toggle icon visibility if you have hamburger/close icons
        if (hamburgerIcon && closeIcon) {
            hamburgerIcon.style.display = isActive ? 'none' : 'inline-block';
            closeIcon.style.display = isActive ? 'inline-block' : 'none';
        }
    }

    // Event Listeners
    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

});
