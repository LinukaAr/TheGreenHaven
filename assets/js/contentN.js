// Select all images with the class 'img'
const images = document.querySelectorAll('.img');

// Add event listeners for mouseover and mouseout
images.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transition = 'transform 0.3s ease-in-out';
        img.style.transform = 'scale(1.2)';
    });

    img.addEventListener('mouseout', () => {
        img.style.transition = 'transform 0.3s ease-in-out';
        img.style.transform = 'scale(1)';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.getElementById('main-title');

    
    mainTitle.style.opacity = 0;

    
    let opacity = 0;
    const animationInterval = setInterval(function() {
        opacity += 0.05; 
        mainTitle.style.opacity = opacity;

        
        if (opacity >= 1) {
            clearInterval(animationInterval);
        }
    }, 50); 
});


    // Show the link when user scrolls down 20px from the top of the document
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    var upLink = document.getElementById("up");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        upLink.style.display = "inline-block"; 
    } else {
        upLink.style.display = "none"; 
    }
    }

    
    document.getElementById("up").onclick = function() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
    }

    const links = document.querySelectorAll('.a');

    
    function enlargeFontSize(event) {
        event.target.style.fontSize = '20px';
    }


    function resetFontSize(event) {
        event.target.style.fontSize = '16px';
    }

    
    links.forEach(link => {
        link.addEventListener('mouseover', enlargeFontSize);
        link.addEventListener('mouseout', resetFontSize);
    });


// make the page without scroll horizontally
window.addEventListener('scroll', function() {
    if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
    }
});


window.addEventListener('resize', function() {
    document.documentElement.style.width = window.innerWidth + 'px';
});
    