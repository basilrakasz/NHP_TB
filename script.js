document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Mobile Menu Toggle Logic
    // ----------------------------------------------------------------------
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Toggle menu visibility
    const toggleMenu = () => {
        menuToggle.classList.toggle('is-active');
        navList.classList.toggle('is-open');
        
        // Update ARIA attribute
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Prevent body scrolling when menu is open on mobile
        if(navList.classList.contains('is-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    // ----------------------------------------------------------------------
    // Sticky Navbar Scroll Effect
    // ----------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
        // Change navbar appearance after scrolling down 50px
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Attach scroll listener with a passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once on init to handle page refreshing midway down the page
    handleScroll();

    // ----------------------------------------------------------------------
    // Modal Overlay Logic (Impressum & Datenschutz)
    // ----------------------------------------------------------------------
    const impressumBtn = document.getElementById('impressum-btn');
    const datenschutzBtn = document.getElementById('datenschutz-btn');
    const impressumModal = document.getElementById('impressum-modal');
    const datenschutzModal = document.getElementById('datenschutz-modal');
    const closeButtons = document.querySelectorAll('[data-close-modal]');

    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        // Only re-enable body overflow if mobile menu isn't open
        if (!navList || !navList.classList.contains('is-open')) {
            document.body.style.overflow = '';
        }
    };

    const closeAllModals = () => {
        if (impressumModal) closeModal(impressumModal);
        if (datenschutzModal) closeModal(datenschutzModal);
    };

    if (impressumBtn && impressumModal) {
        impressumBtn.addEventListener('click', (e) => {
            // Open modal on click
            e.preventDefault();
            openModal(impressumModal);
        });
    }

    if (datenschutzBtn && datenschutzModal) {
        datenschutzBtn.addEventListener('click', (e) => {
            // Open modal on click
            e.preventDefault();
            openModal(datenschutzModal);
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                closeModal(modal);
            } else {
                closeAllModals();
            }
        });
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Check URL hash for modal opening (e.g. index.html#impressum)
    const checkHash = () => {
        const hash = window.location.hash.toLowerCase();
        if (hash === '#impressum' && impressumModal) {
            openModal(impressumModal);
        } else if ((hash === '#datenschutz' || hash === '#privacy') && datenschutzModal) {
            openModal(datenschutzModal);
        }
    };

    checkHash();
});
