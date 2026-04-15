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
});
