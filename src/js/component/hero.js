// Initialize counters when the hero markup exists.
function initCounters() {
    const counters = document.querySelectorAll('.stat-item h2');
    if (!counters || counters.length === 0) return;

    const options = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = +counter.dataset.target;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentValue = Math.floor(progress * target);
                counter.innerText = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    const symbols = { '500': '+', '89': '%', '50': '+' };
                    const targetValue = counter.dataset.target;
                    if (symbols[targetValue]) counter.innerText += symbols[targetValue];
                }
            };

            requestAnimationFrame(animate);
            observer.unobserve(counter);
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function ensureInit() {
    if (document.querySelectorAll('.stat-item h2').length) {
        initCounters();
    } else {
        // Wait for components to be loaded and injected
        window.addEventListener('components:loaded', () => initCounters(), { once: true });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureInit);
} else {
    ensureInit();
}
