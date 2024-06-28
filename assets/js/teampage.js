// Optional: If you want more interactivity, such as animations or further interactions
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseover', () => {
        member.querySelector('.details').style.display = 'block';
    });
    member.addEventListener('mouseout', () => {
        member.querySelector('.details').style.display = 'none';
    });
});
