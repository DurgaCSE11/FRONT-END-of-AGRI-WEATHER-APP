// --- [EXISTING CODE] DOM ELEMENT REFERENCES ---
const homeDefault = document.getElementById('home-default');
const profileSection = document.getElementById('profile');
const weatherSection = document.getElementById('weather');
const schemesSection = document.getElementById('schemes');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// [EXISTING CODE] Navigation Buttons
const profileNavBtn = document.getElementById('profile-nav');
const weatherNavBtn = document.getElementById('weather-nav');
const schemesNavBtn = document.getElementById('schemes-nav');

// [EXISTING CODE] Profile Buttons
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');


// --- [NEW CODE] DOM REFERENCES FOR NEW FEATURES ---
const advisoryNavBtn = document.getElementById('advisory-nav');
const financialsNavBtn = document.getElementById('financials-nav');
const marketNavBtn = document.getElementById('market-nav');
const forumNavBtn = document.getElementById('forum-nav');


// --- [EXISTING CODE] CORE FUNCTIONS ---

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


// --- [UPDATED] EVENT LISTENERS ---

// 1. [EXISTING CODE] Navigation Clicks
profileNavBtn.addEventListener('click', () => showSection('profile'));
weatherNavBtn.addEventListener('click', () => showSection('weather'));
schemesNavBtn.addEventListener('click', () => showSection('schemes'));

// 2. [NEW CODE] Navigation Clicks for New Features
advisoryNavBtn.addEventListener('click', () => showSection('ai-advisory'));
financialsNavBtn.addEventListener('click', () => showSection('financials'));
marketNavBtn.addEventListener('click', () => showSection('market-prices'));
forumNavBtn.addEventListener('click', () => showSection('forum'));


// 3. [EXISTING CODE] Profile Button Clicks
loginBtn.addEventListener('click', () => toggleForm('login-form'));
signupBtn.addEventListener('click', () => toggleForm('signup-form'));


// 4. [EXISTING CODE] Form Submission (Prevent default submission for front-end demo)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login attempt initiated (Front-end only).');
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
});


// 5. [UPDATED] Initialization and New Feature Logic (On page load)
document.addEventListener('DOMContentLoaded', () => {
    // Start by showing the home-default section
    showSection('home-default'); 

    // --- [NEW CODE] AI CROP ADVISORY LOGIC ---
    const advisoryForm = document.getElementById('crop-advisory-form');
    advisoryForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const cropName = document.getElementById('crop-name').value;
        const soilType = document.getElementById('soil-type').value;

        // Simulate a response (in a real app, this would come from an AI backend)
        const advice = `For <strong>${cropName}</strong> in <strong>${soilType}</strong> soil, we recommend consistent watering and using a nitrogen-rich fertilizer. Monitor for pests regularly.`;
        document.getElementById('advisory-result').innerHTML = `<h3>Your Crop Advice:</h3><p>${advice}</p>`;
    });


    // --- [NEW CODE] SMART FINANCIAL DASHBOARD LOGIC ---
    const financialCtx = document.getElementById('income-expense-chart').getContext('2d');
    new Chart(financialCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Income (in ₹)',
                data: [12000, 19000, 15000, 22000, 18000, 25000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses (in ₹)',
                data: [8000, 11000, 9000, 13000, 10000, 14000],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: { scales: { y: { beginAtZero: true } } }
    });


    // --- [NEW CODE] MARKET PRICE INTEGRATION LOGIC ---
    const marketPrices = [
        { crop: 'Wheat', price: 20, location: 'Mumbai' },
        { crop: 'Rice', price: 35, location: 'Delhi' },
        { crop: 'Tomatoes', price: 40, location: 'Bangalore' },
        { crop: 'Potatoes', price: 25, location: 'Chennai' }
    ];
    const pricesTableBody = document.querySelector('#prices-table tbody');
    marketPrices.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.crop}</td><td>₹${item.price}</td><td>${item.location}</td>`;
        pricesTableBody.appendChild(row);
    });


    // --- [NEW CODE] COMMUNITY FORUM LOGIC ---
    const posts = [
        { title: 'Best fertilizer for wheat?', content: 'I am looking for recommendations...' },
        { title: 'How to deal with pests?', content: 'I have a pest problem in my tomato crop.' }
    ];
    const postsContainer = document.getElementById('forum-posts');
    const newPostForm = document.getElementById('new-post-form');

    function displayPosts() {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
            postsContainer.appendChild(postDiv);
        });
    }

    newPostForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        posts.unshift({ title, content }); // Add new post to the beginning of the array
        displayPosts();
        newPostForm.reset(); // Clear the form
    });

    displayPosts(); // Initial display
});