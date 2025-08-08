document.addEventListener('DOMContentLoaded', function() {
    
    // --- Theme Toggler ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else { // Default to light theme if nothing is saved
        applyTheme('light');
    }

    // Event listener for the toggle
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        } else {
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        }
    });


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
                const cardCategory = card.dataset.category;
                
                if (filterCategory === 'all' || cardCategory === filterCategory) {
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
    const headerHeight = document.getElementById('main-header').offsetHeight;

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

});
