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

// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById('btn').addEventListener("mousemove", function() {
//         document.getElementById("btn").style.backgroundColor = "blue";
//     });
// });

// document.addEventListener("DOMContentLoaded", function() {
//     function addEventListeners(buttonId) {
//         var btn = document.getElementById(buttonId);

//         btn.addEventListener("mousemove", function() {
//             btn.style.backgroundColor = "blue";
//         });
//     }

//     // Call the function for each button
//     for (let i = 1; i <= 6; i++) {
//         addEventListeners('btn' + i);
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
    function addEventListeners(buttonId) {
        var btn = document.getElementById(buttonId);

        btn.addEventListener("mousemove", function() {
            btn.style.backgroundColor = "black";
        });
        

        btn.addEventListener("mouseover", function() {
            btn.style.transform = "scale(1.2)";
        });

        btn.addEventListener("mouseout", function() {
            btn.style.transform = "scale(1)";
        });
    }

    // Call the function for each button
    for (let i = 1; i <= 16; i++) {
        addEventListeners('btn' + i);
    }
});



