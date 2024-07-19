// Array of prompts for user information collection
const prompts = [
    { category: "Personal Details", question: "What's your full name?", key: "Name" },
    { category: "Personal Details", question: "How old are you?", key: "age" },
    { category: "Personal Details", question: "Which country are you from?", key: "Country" },
    { category: "Contact Information", question: "What's your email address?", key: "Email" },
    { category: "Contact Information", question: "What's your phone number?", key: "Phone" },
    { category: "Personal Details", question: "What's your sex?", key: "sex" },
    { category: "Professional Information", question: "What's your profession?", key: "Profession" },
    { category: "Account Details", question: "Choose a username:", key: "username" },
    { category: "Account Details", question: "Create a password:", key: "password", type: "password" },
    { category: "Account Details", question: "Confirm your password:", key: "confirmPassword", type: "password" },
    { category: "Environmental Activities", question: "Have you participated in any environmental clean-up events?", key: "CleanupEvents" },
    { category: "Environmental Activities", question: "Do you practice recycling at home or work?", key: "recyclingHabits" },
    { category: "Environmental Activities", question: "Have you ever planted a tree or participated in a tree-planting event?", key: "TreePlanting" },
    { category: "Environmental Interest", question: "Are you interested in participating in future environmental activities?", key: "EnvironmentalInterest" }
];

// Index of the current prompt being displayed
let currentPromptIndex = 0;

// Object to store user profile information
let userProfile = {};

// DOM elements for interaction and display
const reviewBtn = document.getElementById('review-btn');
const currentPromptElement = document.getElementById('current-prompt');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');
const profileContent = document.getElementById('profile-content');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressText = document.getElementById('progress-text');
const profileOutputSection = document.getElementById('profile-output-section');

// Initially hide the profile output section
profileOutputSection.style.display = 'none';

// Function to display the current prompt
function displayPrompt() {
    const prompt = prompts[currentPromptIndex];
    const inputType = prompt.type || 'text';
    let inputHTML = '';

    // Handle special prompts with Yes/No buttons
    if (['cleanupEvents', 'recyclingHabits', 'treePlanting', 'environmentalInterest'].includes(prompt.key)) {
        inputHTML = `
            <div class="yes-no-buttons">
                <button class="yes-no-btn" data-value="Yes">Yes</button>
                <button class="yes-no-btn" data-value="No">No</button>
            </div>
            <input type="hidden" id="prompt-input">
        `;
    } else {
        inputHTML = `<input type="${inputType}" id="prompt-input" placeholder="Your answer...">`;
    }

    currentPromptElement.innerHTML = `
        <h3>${prompt.category}</h3>
        <p>${prompt.question}</p>
        ${inputHTML}
    `;

    // Add event listeners for Yes/No buttons
    if (['cleanupEvents', 'recyclingHabits', 'treePlanting', 'environmentalInterest'].includes(prompt.key)) {
        const buttons = currentPromptElement.querySelectorAll('.yes-no-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('prompt-input').value = this.dataset.value;
            });
        });
    } else {
        // Automatically focus on the input field
        document.getElementById('prompt-input').focus();
    }

    // Pre-fill input if the user has already answered this prompt
    if (userProfile[prompt.key]) {
        document.getElementById('prompt-input').value = userProfile[prompt.key];
    }
}

// Function to display the review screen
function displayReviewScreen() {
    currentPromptElement.innerHTML = '<h3>Review Your Profile</h3>';
    const list = document.createElement('ul');

    // List each prompt with user's response status
    prompts.forEach((prompt, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${prompt.question} ${userProfile[prompt.key] ? '✓' : '❌'}`;
        if (!userProfile[prompt.key]) {
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
                currentPromptIndex = index;
                displayPrompt();
                nextBtn.style.display = 'inline-block';
                skipBtn.style.display = 'inline-block';
                reviewBtn.style.display = 'none';
            });
        }
        list.appendChild(li);
    });

    currentPromptElement.appendChild(list);
}

// Event listener for the review button
reviewBtn.addEventListener('click', displayReviewScreen);

// Function to update and display the user's profile information
function updateProfile() {
    profileContent.innerHTML = '';
    for (const key in userProfile) {
        if (userProfile[key] && key !== 'password' && key !== 'confirmPassword') {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${userProfile[key]}`;
            p.style.opacity = '0';
            profileContent.appendChild(p);
            setTimeout(() => {
                p.style.transition = 'opacity 0.5s ease';
                p.style.opacity = '1';
            }, 10);
        }
    }
}

// Function to update the progress bar and text
function updateProgress() {
    const progress = (Object.keys(userProfile).length / prompts.length) * 100;
    progressBarFill.style.width = `${progress}%`;
    progressText.textContent = `Profile Completion: ${Math.round(progress)}%`;
}

// Function to validate user input
function validateInput(input, prompt) {
    if (input.trim() === '') {
        return 'This field is required.';
    }
    switch (prompt.key) {
        case 'Email':
            if (!/\S+@\S+\.\S+/.test(input)) {
                return 'Please enter a valid email address.';
            }
            break;
        case 'Phone':
            if (!/^\d{10,}$/.test(input.replace(/\D/g,''))) {
                return 'Please enter a valid phone number (at least 10 digits).';
            }
            break;
        case 'confirmPassword':
            if (input !== userProfile.password) {
                return 'Passwords do not match.';
            }
            break;
        // Add more validation cases as needed
    }
    return '';
}

// Event listener for the next button
nextBtn.addEventListener('click', function() {
    const prompt = prompts[currentPromptIndex];
    const input = document.getElementById('prompt-input').value.trim();
    const validationError = validateInput(input, prompt);
    if (validationError) {
        alert(validationError);
        return;
    }

    userProfile[prompt.key] = input;
    currentPromptIndex++;

    if (currentPromptIndex < prompts.length) {
        displayPrompt();
    } else {
        nextBtn.style.display = 'none';
        skipBtn.style.display = 'none';
        reviewBtn.style.display = 'inline-block';
    }

    updateProfile();
    updateProgress();
});

// Event listener for the skip button
skipBtn.addEventListener('click', function() {
    currentPromptIndex++;
    if (currentPromptIndex < prompts.length) {
        displayPrompt();
    } else {
        nextBtn.style.display = 'none';
        skipBtn.style.display = 'none';
        reviewBtn.style.display = 'inline-block';
    }
    updateProfile();
    updateProgress();
});

// Initialize the profile prompts
displayPrompt();
