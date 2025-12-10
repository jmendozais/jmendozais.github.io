document.addEventListener('DOMContentLoaded', function() {
    console.log("TEST")
    // --- Theme Toggler ---
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Function to update the icon based on the current theme
    const updateIcon = () => {
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            updateIcon();
        } else {
            body.classList.remove('dark-mode');
            updateIcon();
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else { // Default to light theme if nothing is saved
        applyTheme('light');
    }

    // Event listener for the button click
    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // After toggling, update the icon
        updateIcon();
    });

    // Set the correct icon when the page loads
    updateIcon();

    // --- Project Filtering ---
    const filterContainer = document.querySelector('.filter-buttons');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            // Ensure a button was clicked
            if (e.target.tagName !== 'BUTTON') return;

            // Handle active button state
            const activeBtn = filterContainer.querySelector('.active');
            if(activeBtn) activeBtn.classList.remove('active');
            e.target.classList.add('active');

            const filterCategory = e.target.dataset.category;

            projectCards.forEach(card => {
                const cardCategories = card.dataset.category.split(' ');
                
                if (filterCategory === 'all' || cardCategories.includes(filterCategory)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    }


    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar a');
    console.log("TEST 2")

    const headerHeight = 0 //document.getElementById('navbar').offsetHeight;
    console.log("TEST 3")

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        let currentSectionId = '';

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 50;
            if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', navHighlighter);
    navHighlighter(); // Initial check

        // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks2 = document.querySelector('#navbar ul');
    console.log("TEST")
    console.log(navLinks2)
    if (menuToggle && navLinks2) {
        menuToggle.addEventListener('click', () => {
            navLinks2.classList.toggle('navbar-active');
        });
        
        // Optional: Close menu when a link is clicked
        navLinks2.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks2.classList.contains('navbar-active')) {
                    navLinks2.classList.remove('navbar-active');
                }
            });
        });
    }
});
