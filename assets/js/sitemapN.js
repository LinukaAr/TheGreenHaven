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
    link.addEventListener('click', function () {
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

document.addEventListener("DOMContentLoaded", function () {
    function addEventListeners(buttonId) {
        var btn = document.getElementById(buttonId);

        btn.addEventListener("mousemove", function () {
            btn.style.backgroundColor = "transparent";
        });
        btn.addEventListener("click", function () {
            btn.style.backgroundColor = "#4682B4";
        });


        btn.addEventListener("mouseover", function () {
            btn.style.transform = "scale(1.2)";
        });

        btn.addEventListener("mouseout", function () {
            btn.style.transform = "scale(1)";
        });
    }

    // Call the function for each button
    for (let i = 1; i <= 16; i++) {
        addEventListeners('btn' + i);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        { from: 'btn1', to: 'btn2' },
        { from: 'btn2', to: 'btn3' },
        { from: 'btn3', to: 'btn4' },
        { from: 'btn4', to: 'btn5' },
        { from: 'btn5', to: 'btn6' },
        { from: 'btn2', to: 'btn7' },
        { from: 'btn7', to: 'btn8' },
        { from: 'btn8', to: 'btn9' },
        { from: 'btn6', to: 'btn10' },
        { from: 'btn1', to: 'btn14' },
        { from: 'btn14', to: 'btn15' },
        { from: 'btn15', to: 'btn16' },
        { from: 'btn10', to: 'btn11' },
        { from: 'btn11', to: 'btn12' },
        { from: 'btn12', to: 'btn13' },
    ];

    const svg = document.getElementById('svg');
    const buttonPadding = 10;

    lines.forEach(line => {
        const from = document.getElementById(line.from).getBoundingClientRect();
        const to = document.getElementById(line.to).getBoundingClientRect();

        let x1 = from.left + from.width / 2;
        let y1 = from.top + from.height / 2;
        let x2 = to.left + to.width / 2;
        let y2 = to.top + to.height / 2;

        // Calculate the angle of the line
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Adjust the start and end points to be outside the button borders
        x1 += Math.cos(angle) * (from.width / 2 + buttonPadding);
        y1 += Math.sin(angle) * (from.height / 2 + buttonPadding);
        x2 -= Math.cos(angle) * (to.width / 2 + buttonPadding);
        y2 -= Math.sin(angle) * (to.height / 2 + buttonPadding);

        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        svgLine.setAttribute('x1', x1);
        svgLine.setAttribute('y1', y1);
        svgLine.setAttribute('x2', x2);
        svgLine.setAttribute('y2', y2);
        svgLine.setAttribute('stroke', 'white');
        svgLine.setAttribute('stroke-width', '2');
        svg.appendChild(svgLine);
    });
});





function navigateTo(url) {
    window.location.href = url;
}

// Adding event listeners to the buttons
document.getElementById('btn1').addEventListener('click', function () {
    navigateTo('../index.html');
});

document.getElementById('btn2').addEventListener('click', function () {
    navigateTo('gallery.html');
});

document.getElementById('btn3').addEventListener('click', function () {
    navigateTo('shop.html');
});

document.getElementById('btn4').addEventListener('click', function () {
    navigateTo('profile.html');
});

document.getElementById('btn5').addEventListener('click', function () {
    navigateTo('feedback.html');
});

document.getElementById('btn6').addEventListener('click', function () {
    navigateTo('content_main.html');
});

document.getElementById('btn10').addEventListener('click', function () {
    navigateTo('editorL.html');
});

document.getElementById('btn11').addEventListener('click', function () {
    navigateTo('Sandaru_pageeditor.html');
});

document.getElementById('btn12').addEventListener('click', function () {
    navigateTo('St3_editorial.html');
});

document.getElementById('btn13').addEventListener('click', function () {
    navigateTo('student4editor.html');
});

document.getElementById('btn7').addEventListener('click', function () {
    navigateTo('gallery.html#div1');
});

document.getElementById('btn8').addEventListener('click', function () {
    navigateTo('gallery.html#div2');
});

document.getElementById('btn9').addEventListener('click', function () {
    navigateTo('gallery.html#div3');
});

document.getElementById('btn14').addEventListener('click', function () {
    navigateTo('../home.html#targets');

});

document.getElementById('btn15').addEventListener('click', function () {
    navigateTo('../home.html#thingtodo');
});

document.getElementById('btn16').addEventListener('click', function () {
    navigateTo('content_main.html');
});

