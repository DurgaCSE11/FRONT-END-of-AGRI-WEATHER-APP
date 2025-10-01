// --- DOM ELEMENT REFERENCES ---
const homeDefault = document.getElementById('home-default');
const profileSection = document.getElementById('profile');
const weatherSection = document.getElementById('weather');
const schemesSection = document.getElementById('schemes');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Navigation Buttons
const profileNavBtn = document.getElementById('profile-nav');
const weatherNavBtn = document.getElementById('weather-nav');
const schemesNavBtn = document.getElementById('schemes-nav');

// Profile Buttons
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');


// --- CORE FUNCTIONS ---

/**
 * Hides all content sections and shows the selected one.
 * @param {string} sectionId - The ID of the content section to show.
 */
function showSection(sectionId) {
    // Hide all major content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // Special handling for Profile section to reset form visibility
    if (sectionId === 'profile') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
    }
}

/**
 * Toggles the visibility of the login and sign up forms within the Profile section.
 * @param {string} formToShowId - The ID of the form to show ('login-form' or 'signup-form').
 */
function toggleForm(formToShowId) {
    if (formToShowId === 'login-form') {
        // Show Login, Hide Sign Up
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else if (formToShowId === 'signup-form') {
        // Show Sign Up, Hide Login
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    }
}


// --- EVENT LISTENERS ---

// 1. Navigation Clicks
profileNavBtn.addEventListener('click', () => showSection('profile'));
weatherNavBtn.addEventListener('click', () => showSection('weather'));
schemesNavBtn.addEventListener('click', () => showSection('schemes'));

// 2. Profile Button Clicks
loginBtn.addEventListener('click', () => toggleForm('login-form'));
signupBtn.addEventListener('click', () => toggleForm('signup-form'));


// 3. Form Submission (Prevent default submission for front-end demo)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login attempt initiated (Front-end only).');
    // In a real application, you would send data to a backend API here.
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Error: Passwords do not match!');
        return;
    }
    
    alert('Sign Up initiated (Front-end only).');
    // In a real application, you would send data to a backend API here.
});


// 4. Initialization (On page load)
document.addEventListener('DOMContentLoaded', () => {
    // Start by showing the home-default section
    showSection('home-default'); 
});