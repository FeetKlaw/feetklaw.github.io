// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });

    // Age gate logic
    const ageGate = document.getElementById('age-gate');
    const enterBtn = document.getElementById('enter-site');
    const ageConfirmed = localStorage.getItem('ageConfirmed');
    if (!ageConfirmed) {
        ageGate.style.display = 'flex';
    }
    enterBtn.addEventListener('click', () => {
        localStorage.setItem('ageConfirmed', 'true');
        ageGate.style.display = 'none';
    });

    // Preview video modal
    const previewBtn = document.getElementById('preview-btn');
    const videoModal = document.getElementById('video-modal');
    const modalClose = document.getElementById('modal-close');
    previewBtn.addEventListener('click', () => {
        videoModal.style.display = 'flex';
    });
    modalClose.addEventListener('click', () => {
        videoModal.style.display = 'none';
        // Stop video playback by resetting iframe src
        const iframe = document.getElementById('preview-video');
        const src = iframe.src;
        iframe.src = src;
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            const iframe = document.getElementById('preview-video');
            const src = iframe.src;
            iframe.src = src;
        }
    });

    // Scroll reveal animations for categories and tiers
    const revealElements = document.querySelectorAll('.category, .tier, .about');
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    revealElements.forEach(el => {
        el.classList.add('fade-in');
        revealObserver.observe(el);
    });
});
