let currentStep = 0;
const totalSteps = 3; // Adjust this as you add more steps
const steps = document.querySelectorAll('.step');
const progress = document.getElementById('progress');

function nextStep() {
    if (currentStep === 0) {
        document.getElementById('display-name').textContent = document.getElementById('first_name').value;
        document.getElementById('display-name').textContent = document.getElementById('last_name').value;
        document.getElementById('display-name').textContent = document.getElementById('age').value;
        document.getElementById('display-name').textContent = document.getElementById('gender').value;
        document.getElementById('display-name').textContent = document.getElementById('education').value;
        document.getElementById('display-name').textContent = document.getElementById('profession').value;
    }
    steps[currentStep].classList.remove('active');
    currentStep++;
    if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
    }
    updateProgress();
}

function updateProgress() {
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
    progress.style.width = progressPercentage + '%';
}

function showProfile() {
    document.getElementById('profile-first-name').textContent = document.getElementById('first_name').value;
    document.getElementById('profile-last-name').textContent = document.getElementById('last_name').value;
    document.getElementById('profile-age').textContent = document.getElementById('age').value;
    document.getElementById('profile-gender').textContent = document.getElementById('gender').value;
    document.getElementById('profile-education').textContent = document.getElementById('education').value;
    document.getElementById('profile-profession').textContent = document.getElementById('profession').value;
    document.getElementById('profile-username').textContent = document.getElementById('username').value;
    document.getElementById('profile-password').textContent = document.getElementById('password').value;
    document.getElementById('profile-email').textContent = document.getElementById('email').value;
    document.getElementById('profile-q2').textContent = document.getElementById('q2').value;
    document.getElementById('profile-q3').textContent = document.getElementById('q3').value;
    document.getElementById('profile-setup').style.display = 'none';
    document.getElementById('profile-display').style.display = 'block';
}


function editProfile() {
    document.getElementById('profile-setup').style.display = 'block';
    document.getElementById('profile-display').style.display = 'none';
    currentStep = 0;
    steps.forEach(step => step.classList.remove('active'));
    steps[0].classList.add('active');
    updateProgress();
}
