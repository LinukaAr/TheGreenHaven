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
let currentPromptIndex = 0;
let userProfile = {};

const reviewBtn = document.getElementById('review-btn');
const currentPromptElement = document.getElementById('current-prompt');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');
const profileContent = document.getElementById('profile-content');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressText = document.getElementById('progress-text');
const profileOutputSection = document.getElementById('profile-output-section');

profileOutputSection.style.display = 'none';

function displayPrompt() {
    const prompt = prompts[currentPromptIndex];
    const inputType = prompt.type || 'text';
    let inputHTML = '';

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
        document.getElementById('prompt-input').focus();
    }
}

    if (userProfile[prompt.key]) {
        document.getElementById('prompt-input').value = userProfile[prompt.key];

    }

function displayReviewScreen() {
    currentPromptElement.innerHTML = '<h3>Review Your Profile</h3>';
    const list = document.createElement('ul');
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

reviewBtn.addEventListener('click', displayReviewScreen);

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

function updateProgress() {
    const progress = (Object.keys(userProfile).length / prompts.length) * 100;
    progressBarFill.style.width = `${progress}%`;
    progressText.textContent = `Profile Completion: ${Math.round(progress)}%`;
}

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
        case 'sex':
            const validSexes = ['male', 'female', 'other', 'prefer not to say'];
            if (!validSexes.includes(input.toLowerCase())) {
                return 'Please enter a valid sex (Male, Female, Other, or Prefer not to say).';
            }
            break;
        case 'age':
            const age = parseInt(input);
            if (isNaN(age) || age < 0 || age > 120) {
                return 'Please enter a valid age between 0 and 120.';
            }
            break;
        case 'CleanupEvents':
        case 'recyclingHabits':
        case 'TreePlanting':
        case 'EnvironmentalInterest':
            if (!['yes', 'no'].includes(input.toLowerCase())) {
                return 'Please answer with Yes or No.';
            }
            break;
    }
    return '';
}

nextBtn.addEventListener('click', () => {
    const input = document.getElementById('prompt-input');
    const prompt = prompts[currentPromptIndex];
    const errorMessage = validateInput(input.value, prompt);
    
    if (errorMessage) {
        input.style.border = '2px solid #e74c3c';
        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#e74c3c';
        currentPromptElement.appendChild(errorElement);
        return;
    }
    
    userProfile[prompt.key] = input.value;
    
    if (currentPromptIndex === 0) {
        profileOutputSection.style.display = 'block';
        profileOutputSection.style.opacity = '0';
        setTimeout(() => {
            profileOutputSection.style.transition = 'opacity 0.5s ease';
            profileOutputSection.style.opacity = '1';
        }, 10);
    }
    
    updateProfile();
    updateProgress();
    currentPromptIndex++;
    if (currentPromptIndex < prompts.length) {
        displayPrompt();
    } else {
        currentPromptElement.innerHTML = '<h3>Profile Complete!</h3><p>Thank you for building your profile! You can review and complete any skipped questions.</p>';
        nextBtn.style.display = 'none';
        skipBtn.style.display = 'none';
        reviewBtn.style.display = 'inline-block';
    }
});


skipBtn.addEventListener('click', () => {
    currentPromptIndex++;
    if (currentPromptIndex < prompts.length) {
        displayPrompt();
    } else {
        currentPromptElement.innerHTML = '<h3>Profile Complete!</h3><p>Thank you for building your profile!</p>';
        nextBtn.style.display = 'none';
        skipBtn.style.display = 'none';
        reviewBtn.style.display = 'inline-block';
    }
    
    if (profileOutputSection.style.display === 'none') {
        profileOutputSection.style.display = 'block';
        profileOutputSection.style.opacity = '0';
        setTimeout(() => {
            profileOutputSection.style.transition = 'opacity 0.5s ease';
            profileOutputSection.style.opacity = '1';
        }, 10);
    }
});

displayPrompt();