/**
 * Smoothly scrolls to a specific section of the page.
 * @param {string} sectionId - The ID of the section to scroll to.
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.onscroll = function() {
    // Display the back-to-top button when scrolled down 20px from the top of the document.
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

backToTopButton.onclick = function() {
    // Scroll to the top of the document.
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
};

// Highlight active section in table of contents
const sections = document.querySelectorAll('section');
const tocButtons = document.querySelectorAll('.toc-button');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Determine the currently visible section.
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    // Highlight the corresponding button in the table of contents.
    tocButtons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase() === current) {
            button.classList.add('active');
        }
    });
});

/**
 * Toggles the display of additional content in a section.
 * @param {string} section - The section containing the read-more content.
 */
function toggleReadMore(section) {
    const readMoreContent = document.getElementById(`${section}-read-more`);
    readMoreContent.classList.toggle('active');
    const btn = document.querySelector(`#${section} .read-more-btn`);
    
    // Update button text based on the visibility of the read-more content.
    if (readMoreContent.classList.contains('active')) {
        btn.textContent = 'Read Less';
    } else {
        btn.textContent = 'Read More';
    }
}
