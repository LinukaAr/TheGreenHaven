let text = document.getElementById('text');
let treeLeft = document.getElementById('tree-left');
let treeRight = document.getElementById('tree-right');




window.addEventListener('scroll', () => {
    let value = window.scrollY;
    text.style.marginTop = value * 2.5 + 'px';
    treeLeft.style.left = value * -1.5 + 'px';
    treeRight.style.left = value * 1.5 + 'px';

})

let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

let next1 = document.querySelector('.next1');
let previous = document.querySelector('.previous');

next.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
});
prev.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
});

next1.addEventListener('click', function () {
    
    let items = document.querySelectorAll('.item2');
    document.querySelector('.slide2').appendChild(items[0]);
    

    
});
previous.addEventListener('click', function () {
    
    let items = document.querySelectorAll('.item2');
    document.querySelector('.slide2').prepend(items[items.length - 1]);
});