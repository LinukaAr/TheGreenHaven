// Select all elements with class 'team-member' and add event listeners
document.querySelectorAll('.team-member').forEach(member => {
    // Add mouseover event listener to each team member
    member.addEventListener('mouseover', (event) => {
        // Hide details for all team members
        document.querySelectorAll('.team-member .details').forEach(detail => {
            detail.style.display = 'none';
        });
        // Show details for the hovered team member
        event.currentTarget.querySelector('.details').style.display = 'block';
    });
    // Add mouseout event listener to each team member
    member.addEventListener('mouseout', (event) => {
        // Hide details when the mouse leaves the team member
        event.currentTarget.querySelector('.details').style.display = 'none';
    });
});
