let currentStep = 0;
const totalSteps = 3; // Adjust this as you add more steps
const steps = document.querySelectorAll('.step');
const progress = document.getElementById('progress');

function updateDisplayName() {
    const firstName = document.getElementById('first_name').value;
    document.getElementById('display-name').textContent = firstName;
}

function nextStep() {
    if (validateStep(currentStep)) {
        steps[currentStep].classList.remove('active');
        currentStep++;
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
        }
    updateProgress();
    updateDisplayName();
    }  
}

function backStep() {
    steps[currentStep].classList.remove('active');
    currentStep--;
    if (currentStep >= 0) {
        steps[currentStep].classList.add('active');
    }
    updateProgress();
}

function updateProgress() {
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
    progress.style.width = progressPercentage + '%';
}

function showProfile() {
    document.getElementById('profile-setup').style.display = 'none';
    document.getElementById('profile-display').style.display = 'block';


    document.getElementById('profile-first_name').textContent = document.getElementById('first_name').value;
    document.getElementById('profile-last_name').textContent = document.getElementById('last_name').value;
    document.getElementById('profile-birthday').textContent = document.getElementById('birthday').value;
    document.getElementById('profile-gender').textContent = document.querySelector('input[name="gender"]:checked')?.value || '';
    document.getElementById('profile-profession').textContent = document.getElementById('profession').value;
    document.getElementById('profile-country').textContent = document.getElementById('country').value;
    document.getElementById('profile-username').textContent = document.getElementById('username').value;

    const countryCode = document.getElementById('country_code').value;
    const phoneNumber = document.getElementById('phone_number').value;
    document.getElementById('profile-phone_number').textContent = countryCode + ' ' + phoneNumber;
 
    document.getElementById('profile-email').textContent = document.getElementById('email').value;
    document.getElementById('profile-q2').textContent = document.getElementById('q2').value;
}



function editProfile() {
    document.getElementById('profile-setup').style.display = 'block';
    document.getElementById('profile-display').style.display = 'none';
    currentStep = 0;
    steps.forEach(step => step.classList.remove('active'));
    steps[0].classList.add('active');
    updateProgress();
}

function validateStep(step) {
    let isValid = true;
    const currentStepElement = steps[step];
    const inputs = currentStepElement.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    

        if (input.id === 'phone_number' && input.value.trim()) {
            if (!validatePhoneNumber(input.value.trim())) {
                isValid = false;
                input.classList.add('error');
                alert('Please enter a valid phone number (6-14 digits).');
            }
        }

        // Country code validation
        if (input.id === 'country_code' && !input.value) {
            isValid = false;
            input.classList.add('error');
            alert('Please select a country code.');
        }

        if (input.id === 'email' && input.value.trim()) {
            if (!validateEmail(input.value.trim())) {
              isValid = false;
              input.classList.add('error');
              alert('Please enter a valid email address.');
            }
          }
        });
    


    if (!isValid) {
        alert('Please fill in all required fields before proceeding.');
        return false;
    }

    if (step === 1) { // Assuming step 2 is index 1
        if (!validatePasswordConfirmation()) {
            return false;
        }
    }

    return true;


}



function validatePasswordConfirmation() {
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('password_confirmation').value;
    const passwordInput = document.getElementById('password');
    const passwordConfirmationInput = document.getElementById('password_confirmation');

    if (password !== passwordConfirmation) {
        passwordInput.classList.add('error');
        passwordConfirmationInput.classList.add('error');
        alert('Passwords do not match. Please try again.');
        return false;
    } else {
        passwordInput.classList.remove('error');
        passwordConfirmationInput.classList.remove('error');
        return true;
    }
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]{6,14}$/;
    return phoneRegex.test(phoneNumber);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }