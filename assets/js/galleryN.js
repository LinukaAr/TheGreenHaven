let text = document.getElementById('text');
let treeLeft = document.getElementById('tree-left');
let treeRight = document.getElementById('tree-right');

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    text.style.marginTop = value * 2.5 + 'px';
    treeLeft.style.left = value * -1.5 + 'px';
    treeRight.style.left = value * 1.5 + 'px';

})

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function addHoverEffects() {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'scale(1.1)';
            box.style.backgroundColor = '#006400';
        });

        box.addEventListener('mouseleave', () => {
            box.style.transform = 'scale(1)';
            box.style.backgroundColor = '#228B22';
        });
    });
}

document.addEventListener('DOMContentLoaded', addHoverEffects);



document.getElementById("box1").addEventListener("click", function() {
    document.querySelector(".div1").scrollIntoView({ behavior: 'smooth' });
});

document.getElementById("box2").addEventListener("click", function() {
    document.querySelector(".div2").scrollIntoView({ behavior: 'smooth' });
});

document.getElementById("box3").addEventListener("click", function() {
    document.querySelector(".div3").scrollIntoView({ behavior: 'smooth' });
});


let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
});

prev.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
});

let next1 = document.querySelector('.next1');
let previous1 = document.querySelector('.previous');

next1.addEventListener('click', function () {
    let items = document.querySelectorAll('.item2');
    document.querySelector('.slide2').appendChild(items[0]);
});

previous1.addEventListener('click', function () {
    let items = document.querySelectorAll('.item2');
    document.querySelector('.slide2').prepend(items[items.length - 1]);
});


let next2 = document.querySelector('.next2');
let previous2 = document.querySelector('.previous2');

next2.addEventListener('click', function () {
    let items = document.querySelectorAll('.item3');
    document.querySelector('.slide3').appendChild(items[0]);
});

previous2.addEventListener('click', function () {
    let items = document.querySelectorAll('.item3');
    document.querySelector('.slide3').prepend(items[items.length - 1]);
});



// Function to smoothly scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


  // Auto-scroll to the gallery div after 1 second
window.addEventListener('load', function() {
    setTimeout(function() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }, 900);
});





// Ensure the page does not scroll horizontally
window.addEventListener('scroll', function() {
    if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
    }
});

// Optionally, ensure the page does not resize horizontally
window.addEventListener('resize', function() {
    document.documentElement.style.width = window.innerWidth + 'px';
});



function color1(){
    document.getElementById('div2').style.background ="black";
    document.getElementById('div1').style.background ="black";
    document.getElementById('div3').style.background ="black";
}

function color2(){
    document.getElementById('div2').style.background ="rgb(2, 31, 45)";
    document.getElementById('div1').style.background ="rgb(2, 31, 45)";
    document.getElementById('div3').style.background ="rgb(2, 31, 45)";

}

function color3(){
    document.getElementById('div2').style.background ="grey";
    document.getElementById('div1').style.background ="grey";
    document.getElementById('div3').style.background ="grey";
}

function font1() {
    ['1hf1', '1pf1', '1hf2', '1pf2', '1hf3', '1pf3', '1hf4', '1pf4', '1hf5',
    '1pf5', '1hf6', '1pf6','2hf1', '2pf1', '2hf2', '2pf2', '2hf3', '2pf3', '2hf4', '2pf4', '2hf5',
    '2pf5', '2hf6', '2pf6','3hf1', '3pf1', '3hf2', '3pf2', '3hf3', '3pf3', '3hf4', '3pf4', '3hf5',
    '3pf5', '3hf6', '3pf6'].forEach(function(id) {
        document.getElementById(id).style.fontFamily = "Times New Roman";
    });
}

function font2() {
    ['1hf1', '1pf1', '1hf2', '1pf2', '1hf3', '1pf3', '1hf4', '1pf4', '1hf5',
    '1pf5', '1hf6', '1pf6','2hf1', '2pf1', '2hf2', '2pf2', '2hf3', '2pf3', '2hf4', '2pf4', '2hf5',
    '2pf5', '2hf6', '2pf6','3hf1', '3pf1', '3hf2', '3pf2', '3hf3', '3pf3', '3hf4', '3pf4', '3hf5',
    '3pf5', '3hf6', '3pf6'].forEach(function(id) {
        document.getElementById(id).style.fontFamily = "family Anton";
    });
}

function font3() {
    ['1hf1', '1pf1', '1hf2', '1pf2', '1hf3', '1pf3', '1hf4', '1pf4', '1hf5',
    '1pf5', '1hf6', '1pf6','2hf1', '2pf1', '2hf2', '2pf2', '2hf3', '2pf3', '2hf4', '2pf4', '2hf5',
    '2pf5', '2hf6', '2pf6','3hf1', '3pf1', '3hf2', '3pf2', '3hf3', '3pf3', '3hf4', '3pf4', '3hf5',
    '3pf5', '3hf6', '3pf6'].forEach(function(id) {
        document.getElementById(id).style.fontFamily = "Rowdies";
    });
}



