document.addEventListener('DOMContentLoaded', () => {

    // ======== PRELOADER ========
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        loaderWrapper.classList.add('hidden');
    });

    // ======== SMOOTH SCROLLING ========
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position, considering the fixed header height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======== SCROLL-IN ANIMATIONS (Intersection Observer) ========
    const animatedElements = document.querySelectorAll('.animate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ======== STAT COUNTER ANIMATION ========
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target'); // Get target number
            const duration = 2000; // 2 seconds
            const stepTime = 50; // Update every 50ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCount, stepTime);
                } else {
                    // Ensure it ends on the exact target
                    counter.innerText = target.toLocaleString(); 
                }
            };
            updateCount();
        });
        countersAnimated = true; // Mark as animated
    };

    // Use Intersection Observer to start counters when visible
    const statsSection = document.querySelector('.stats-counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                counterObserver.unobserve(entry.target); // Stop observing after animating
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the counter section is visible
    });

    if (statsSection) {
        counterObserver.observe(statsSection);
    }
});