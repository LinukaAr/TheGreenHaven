function toggleSearch() {
    const searchBox = document.getElementById('searchBox');
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
}

function toggleNav() {
    const navItems = document.querySelector('.nav-items');
    navItems.classList.toggle('active');
}

// Adding active class to the current link
const navLinks = document.querySelectorAll('.nav-item a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});
