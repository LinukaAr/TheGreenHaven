document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseover', (event) => {
        // Hide all details first
        document.querySelectorAll('.team-member .details').forEach(detail => {
            detail.style.display = 'none';
        });
        // Show details only for the hovered member
        event.currentTarget.querySelector('.details').style.display = 'block';
    });
    member.addEventListener('mouseout', (event) => {
        // Hide details when mouse leaves the member
        event.currentTarget.querySelector('.details').style.display = 'none';
    });
});