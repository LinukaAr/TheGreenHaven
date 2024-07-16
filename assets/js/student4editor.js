// JavaScript for hover effect (optional)
const div = document.querySelectorAll('.div');

div.forEach(div => {
    div.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
    });

    div.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
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

    
    // document.getElementById("up").onclick = function() {
    // document.body.scrollTop = 0; 
    // document.documentElement.scrollTop = 0; 
    // }
    // const links = document.querySelectorAll('.a');


    document.getElementById("up").onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }



    document.getElementById("down").onclick = function() {
        const currentDiv = document.querySelector('.div');
        const nextDiv = currentDiv.nextElementSibling;

        if (nextDiv && nextDiv.classList.contains('div')) {
            nextDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }



    




