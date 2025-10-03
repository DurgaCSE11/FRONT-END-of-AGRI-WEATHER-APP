// --- DOM ELEMENT REFERENCES ---

// Navigation & Sections
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const navDropdown = document.getElementById('nav-dropdown');
const allNavLinks = document.querySelectorAll('.nav-link');
const profileNavBtn = document.getElementById('profile-nav');

// --- [NEW] WEATHER SECTION REFERENCES ---
const districtSelect = document.getElementById('district-select');
const weatherElements = {
    region: document.getElementById('weather-region'),
    lastUpdated: document.getElementById('weather-last-updated'),
    soilType: document.getElementById('weather-soil-type'),
    idealCrops: document.getElementById('weather-ideal-crops'),
    currentTemp: document.getElementById('weather-current-temp'),
    minMaxTemp: document.getElementById('weather-min-max-temp'),
    rainForecast: document.getElementById('weather-rain-forecast'),
    humidity: document.getElementById('weather-humidity'),
    windSpeed: document.getElementById('weather-wind-speed'),
    pressure: document.getElementById('weather-pressure'),
    alert: document.getElementById('weather-alert'),
    advisory: document.getElementById('weather-advisory')
};

// Financials Section Elements
const profitCalcForm = document.getElementById('profit-calc-form');
const profitResult = document.getElementById('profit-result');
const emiCalcForm = document.getElementById('emi-calc-form');
const emiResult = document.getElementById('emi-result');
const transactionForm = document.getElementById('transaction-form');
const transactionsTableBody = document.querySelector('#transactions-table tbody');

// CROP MANAGER REFERENCES
const addCropForm = document.getElementById('add-crop-form');
const cropManagerInput = document.getElementById('crop-manager-input');
const myCropsList = document.getElementById('my-crops-list');


// --- CORE FUNCTIONS ---

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    if (sectionId === 'profile') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
    }
    navDropdown.classList.remove('show');
}

function toggleForm(formToShowId) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    if (formToShowId === 'login-form') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else if (formToShowId === 'signup-form') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    }
}


// --- EVENT LISTENERS & INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // --- Initial Setup ---
    showSection('home-default');

    // --- Navigation Logic ---
    menuToggleBtn.addEventListener('click', () => navDropdown.classList.toggle('show'));
    window.addEventListener('click', (event) => {
        if (!menuToggleBtn.contains(event.target) && !navDropdown.contains(event.target)) {
            navDropdown.classList.remove('show');
        }
    });
    allNavLinks.forEach(link => {
        const sectionId = link.id.replace('-nav', '');
        link.addEventListener('click', () => showSection(sectionId));
    });
    profileNavBtn.addEventListener('click', () => showSection('profile'));
    document.getElementById('login-btn').addEventListener('click', () => toggleForm('login-form'));
    document.getElementById('signup-btn').addEventListener('click', () => toggleForm('signup-form'));
    document.getElementById('login-form').addEventListener('submit', (e) => { e.preventDefault(); alert('Login attempt initiated.'); });
    document.getElementById('signup-form').addEventListener('submit', (e) => { e.preventDefault(); alert('Sign Up initiated.'); });


    // --- [NEW] WEATHER TAB LOGIC ---
    const odishaWeather = {
        'angul': { regionName: 'Angul', soilType: 'Red & Laterite', idealCrops: 'Rice, Maize, Pulses', currentTemp: '27°C', minMaxTemp: '23°C / 32°C', rainForecast: 'Moderate chance (50%)', humidity: '82%', windSpeed: '8 km/h (SW)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Chance of afternoon showers. Check soil moisture before irrigation.' },
        'balangir': { regionName: 'Balangir', soilType: 'Red & Yellow', idealCrops: 'Cotton, Rice, Maize', currentTemp: '28°C', minMaxTemp: '24°C / 33°C', rainForecast: 'Low chance (20%)', humidity: '75%', windSpeed: '12 km/h (W)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Dry conditions expected. Continue regular irrigation for cotton.' },
        'balasore': { regionName: 'Balasore', soilType: 'Coastal Alluvial', idealCrops: 'Rice, Groundnut, Vegetables', currentTemp: '28°C', minMaxTemp: '25°C / 31°C', rainForecast: 'High chance (80%)', humidity: '88%', windSpeed: '15 km/h (SE)', pressure: '1009 hPa', alert: 'Heavy Rain Warning', advisory: 'Heavy rainfall expected. Ensure field drainage is clear. Postpone spraying.' },
        'bargarh': { regionName: 'Bargarh', soilType: 'Alluvial, Red & Black', idealCrops: 'Rice, Sugarcane, Onion', currentTemp: '29°C', minMaxTemp: '24°C / 34°C', rainForecast: 'Low chance (15%)', humidity: '72%', windSpeed: '10 km/h (W)', pressure: '1010 hPa', alert: 'NONE', advisory: 'Mainly clear skies. Good for harvesting and drying produce.' },
        'bhadrak': { regionName: 'Bhadrak', soilType: 'Coastal Alluvial', idealCrops: 'Rice, Pulses, Jute', currentTemp: '28°C', minMaxTemp: '25°C / 31°C', rainForecast: 'High chance (75%)', humidity: '87%', windSpeed: '14 km/h (SE)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Cloudy with likely rain. Monitor crops for fungal diseases.' },
        'boudh': { regionName: 'Boudh', soilType: 'Red & Yellow', idealCrops: 'Rice, Pulses, Oilseeds', currentTemp: '27°C', minMaxTemp: '23°C / 32°C', rainForecast: 'Moderate chance (40%)', humidity: '80%', windSpeed: '7 km/h (S)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Partly cloudy. Suitable for intercultural operations.' },
        'cuttack': { regionName: 'Cuttack', soilType: 'Alluvial', idealCrops: 'Rice, Vegetables, Pulses', currentTemp: '27°C', minMaxTemp: '25°C / 32°C', rainForecast: 'High chance (70%)', humidity: '86%', windSpeed: '11 km/h (E)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Likely thunderstorms. Postpone irrigation activities.' },
        'deogarh': { regionName: 'Deogarh', soilType: 'Red & Laterite', idealCrops: 'Rice, Maize, Turmeric', currentTemp: '26°C', minMaxTemp: '22°C / 31°C', rainForecast: 'Moderate chance (60%)', humidity: '84%', windSpeed: '9 km/h (SW)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Overcast skies. Good for transplanting activities.' },
        'dhenkanal': { regionName: 'Dhenkanal', soilType: 'Red & Laterite', idealCrops: 'Rice, Mango, Cashew', currentTemp: '27°C', minMaxTemp: '24°C / 32°C', rainForecast: 'Moderate chance (50%)', humidity: '83%', windSpeed: '8 km/h (S)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Possible afternoon showers. Protect young seedlings.' },
        'gajapati': { regionName: 'Gajapati', soilType: 'Hilly Red Soil', idealCrops: 'Maize, Ginger, Pineapple', currentTemp: '25°C', minMaxTemp: '21°C / 29°C', rainForecast: 'High chance (70%)', humidity: '89%', windSpeed: '12 km/h (SE)', pressure: '1010 hPa', alert: 'NONE', advisory: 'Rain expected. Ensure proper drainage in ginger fields to avoid rot.' },
        'ganjam': { regionName: 'Ganjam', soilType: 'Coastal Alluvial, Laterite', idealCrops: 'Rice, Coconut, Cashew', currentTemp: '28°C', minMaxTemp: '25°C / 31°C', rainForecast: 'Moderate chance (60%)', humidity: '85%', windSpeed: '16 km/h (SE)', pressure: '1010 hPa', alert: 'NONE', advisory: 'Breezy with a chance of rain. Monitor for pest attacks.' },
        'jagatsinghpur': { regionName: 'Jagatsinghpur', soilType: 'Coastal Alluvial', idealCrops: 'Rice, Betel Vine, Sugarcane', currentTemp: '28°C', minMaxTemp: '26°C / 31°C', rainForecast: 'High chance (80%)', humidity: '88%', windSpeed: '13 km/h (E)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Rain likely. Provide support to betel vines.' },
        'jajpur': { regionName: 'Jajpur', soilType: 'Alluvial', idealCrops: 'Rice, Jute, Pulses', currentTemp: '27°C', minMaxTemp: '25°C / 32°C', rainForecast: 'High chance (70%)', humidity: '87%', windSpeed: '10 km/h (E)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Ensure good drainage in Jute fields.' },
        'jharsuguda': { regionName: 'Jharsuguda', soilType: 'Red & Yellow', idealCrops: 'Rice, Groundnut, Vegetables', currentTemp: '28°C', minMaxTemp: '23°C / 33°C', rainForecast: 'Low chance (25%)', humidity: '74%', windSpeed: '11 km/h (W)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Mostly dry weather. Good for land preparation.' },
        'kalahandi': { regionName: 'Kalahandi', soilType: 'Red & Black Soil', idealCrops: 'Cotton, Rice, Maize', currentTemp: '27°C', minMaxTemp: '22°C / 32°C', rainForecast: 'Low chance (20%)', humidity: '78%', windSpeed: '9 km/h (SW)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Clear weather. Ideal for cotton picking.' },
        'kandhamal': { regionName: 'Kandhamal', soilType: 'Hilly Brown & Red Soil', idealCrops: 'Turmeric, Ginger, Pulses', currentTemp: '23°C', minMaxTemp: '20°C / 28°C', rainForecast: 'High chance (70%)', humidity: '90%', windSpeed: '8 km/h (S)', pressure: '1010 hPa', alert: 'NONE', advisory: 'High humidity and rain can cause fungal issues in Turmeric. Monitor closely.' },
        'kendrapara': { regionName: 'Kendrapara', soilType: 'Coastal Alluvial', idealCrops: 'Rice, Jute, Coconut', currentTemp: '28°C', minMaxTemp: '26°C / 31°C', rainForecast: 'High chance (85%)', humidity: '89%', windSpeed: '14 km/h (E)', pressure: '1009 hPa', alert: 'Heavy Rain Warning', advisory: 'Heavy showers expected. Postpone all spraying and fertilizer application.' },
        'keonjhar': { regionName: 'Keonjhar', soilType: 'Red Soil', idealCrops: 'Rice, Maize, Vegetables', currentTemp: '25°C', minMaxTemp: '21°C / 30°C', rainForecast: 'Moderate chance (60%)', humidity: '85%', windSpeed: '7 km/h (S)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Chance of afternoon thundershowers.' },
        'khordha': { regionName: 'Khordha (Bhubaneswar)', soilType: 'Laterite & Alluvial Soil', idealCrops: 'Rice, Vegetables, Mango, Coconut', currentTemp: '26°C', minMaxTemp: '24°C / 31°C', rainForecast: 'High chance (70%)', humidity: '85%', windSpeed: '10 km/h (Easterly)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Likely thunderstorms tonight. Postpone irrigation. Ensure proper field drainage.' },
        'koraput': { regionName: 'Koraput', soilType: 'Hilly Red & Brown Forest', idealCrops: 'Coffee, Ginger, Millets', currentTemp: '22°C', minMaxTemp: '19°C / 26°C', rainForecast: 'High chance (80%)', humidity: '92%', windSpeed: '9 km/h (SE)', pressure: '1011 hPa', alert: 'NONE', advisory: 'Continuous drizzle expected. Ideal conditions for coffee plantations.' },
        'malkangiri': { regionName: 'Malkangiri', soilType: 'Red Soil', idealCrops: 'Maize, Rice, Pulses', currentTemp: '26°C', minMaxTemp: '22°C / 31°C', rainForecast: 'Moderate chance (50%)', humidity: '84%', windSpeed: '8 km/h (SW)', pressure: '1010 hPa', alert: 'NONE', advisory: 'Partly cloudy. Suitable for weeding in maize fields.' },
        'mayurbhanj': { regionName: 'Mayurbhanj', soilType: 'Red & Laterite', idealCrops: 'Rice, Sabai Grass, Pulses', currentTemp: '26°C', minMaxTemp: '23°C / 31°C', rainForecast: 'Moderate chance (60%)', humidity: '86%', windSpeed: '10 km/h (SE)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Overcast conditions. Monitor for pests in pulse crops.' },
        'nabarangpur': { regionName: 'Nabarangpur', soilType: 'Red & Yellow', idealCrops: 'Maize, Rice, Millets', currentTemp: '25°C', minMaxTemp: '21°C / 30°C', rainForecast: 'Moderate chance (40%)', humidity: '82%', windSpeed: '7 km/h (SW)', pressure: '1010 hPa', alert: 'NONE', advisory: 'Continue intercultural operations in Maize fields.' },
        'nayagarh': { regionName: 'Nayagarh', soilType: 'Laterite & Alluvial', idealCrops: 'Sugarcane, Rice, Vegetables', currentTemp: '27°C', minMaxTemp: '24°C / 32°C', rainForecast: 'Moderate chance (50%)', humidity: '84%', windSpeed: '9 km/h (S)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Chance of rain. Check props for sugarcane to prevent lodging.' },
        'nuapada': { regionName: 'Nuapada', soilType: 'Red & Yellow', idealCrops: 'Rice, Pulses, Groundnut', currentTemp: '28°C', minMaxTemp: '23°C / 33°C', rainForecast: 'Low chance (10%)', humidity: '73%', windSpeed: '12 km/h (W)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Dry and clear. Perfect for harvesting groundnut.' },
        'puri': { regionName: 'Puri', soilType: 'Coastal Sandy & Alluvial', idealCrops: 'Coconut, Rice, Casuarina', currentTemp: '28°C', minMaxTemp: '26°C / 31°C', rainForecast: 'High chance (80%)', humidity: '88%', windSpeed: '18 km/h (SE)', pressure: '1010 hPa', alert: 'Strong Wind Warning', advisory: 'Strong winds expected. Provide support to young coconut saplings.' },
        'rayagada': { regionName: 'Rayagada', soilType: 'Hilly Red & Black Soil', idealCrops: 'Cotton, Maize, Mango', currentTemp: '26°C', minMaxTemp: '22°C / 30°C', rainForecast: 'Moderate chance (60%)', humidity: '85%', windSpeed: '10 km/h (SE)', pressure: '1010 hPa', alert: 'NONE', advisory: 'Rainy conditions may affect cotton bolls. Monitor closely.' },
        'sambalpur': { regionName: 'Sambalpur', soilType: 'Red & Yellow', idealCrops: 'Rice, Onion, Groundnut', currentTemp: '29°C', minMaxTemp: '24°C / 34°C', rainForecast: 'Low chance (20%)', humidity: '73%', windSpeed: '10 km/h (W)', pressure: '1009 hPa', alert: 'NONE', advisory: 'Clear skies. Good time for land preparation for Rabi crops.' },
        'subarnapur': { regionName: 'Subarnapur (Sonepur)', soilType: 'Alluvial', idealCrops: 'Rice, Pulses, Vegetables', currentTemp: '28°C', minMaxTemp: '23°C / 33°C', rainForecast: 'Low chance (30%)', humidity: '79%', windSpeed: '8 km/h (SW)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Partly cloudy, continue normal farm operations.' },
        'sundargarh': { regionName: 'Sundargarh', soilType: 'Red & Laterite', idealCrops: 'Rice, Groundnut, Vegetables', currentTemp: '27°C', minMaxTemp: '22°C / 32°C', rainForecast: 'Moderate chance (50%)', humidity: '80%', windSpeed: '9 km/h (SW)', pressure: '1008 hPa', alert: 'NONE', advisory: 'Possible afternoon showers. Plan activities accordingly.' }
    };

    function updateWeatherDisplay(districtKey) {
        const data = odishaWeather[districtKey];
        if (!data) return;

        weatherElements.region.innerHTML = `📍 Region: ${data.regionName}, Odisha`;
        weatherElements.lastUpdated.innerText = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        weatherElements.soilType.innerText = data.soilType;
        weatherElements.idealCrops.innerText = data.idealCrops;
        weatherElements.currentTemp.innerText = data.currentTemp;
        weatherElements.minMaxTemp.innerText = data.minMaxTemp;
        weatherElements.rainForecast.innerText = data.rainForecast;
        weatherElements.humidity.innerText = data.humidity;
        weatherElements.windSpeed.innerText = data.windSpeed;
        weatherElements.pressure.innerText = data.pressure;
        weatherElements.alert.innerText = data.alert;
        weatherElements.advisory.innerText = data.advisory;
    }

    districtSelect.addEventListener('change', (event) => {
        updateWeatherDisplay(event.target.value);
    });
    
    // Initial load
    updateWeatherDisplay('khordha');


    // --- CROP MANAGER LOGIC (Remains unchanged) ---
    const cropData = {
        'rice': { name: 'Rice (Paddy)', watering: 'Maintain a consistent water level of 2-5 cm in the paddy.', fertilizer: 'High in Nitrogen (Urea), Phosphorus (P), and Potassium (K).', harvest: 'Approximately 90-120 days from sowing.' },
        'wheat': { name: 'Wheat', watering: 'Requires irrigation every 20-25 days. Critical stages are crown root initiation and flowering.', fertilizer: 'A balanced mix of Nitrogen, Phosphorus, and Potassium is crucial.', harvest: 'Typically ready for harvest in 100-120 days.' },
        'maize': { name: 'Maize (Corn)', watering: 'Needs consistent moisture, especially during tasseling stages.', fertilizer: 'Heavy feeder of Nitrogen. Apply in splits.', harvest: 'Ready in 60-100 days.' },
        'soybean': { name: 'Soybean', watering: 'Requires consistent moisture, especially during pod-filling.', fertilizer: 'Fixes its own Nitrogen. Requires Phosphorus and Potassium.', harvest: 'Matures in 100-130 days.' },
        'cotton': { name: 'Cotton', watering: 'Drought-tolerant but needs water during flowering and boll development.', fertilizer: 'Requires high levels of Nitrogen and Potassium.', harvest: 'Takes about 150-180 days for the bolls to mature.' },
        'sugarcane': { name: 'Sugarcane', watering: 'High water requirement. Requires frequent irrigation.', fertilizer: 'Heavy feeder. Needs significant amounts of N, P, and K.', harvest: 'Long duration crop, typically takes 10-18 months.' },
        'tomato': { name: 'Tomato', watering: 'Water 1-2 times a day, ensuring the soil is moist.', fertilizer: 'Balanced NPK initially, higher Potassium during fruiting.', harvest: 'Roughly 60-85 days after transplanting.' },
        'potato': { name: 'Potato', watering: 'Keep soil evenly moist. Water deeply 1-2 times per week.', fertilizer: 'Prefers fertilizer low in Nitrogen but high in P and K.', harvest: 'Ready in 70-120 days.' },
        'onion': { name: 'Onion', watering: 'Requires consistent watering, about 1 inch per week.', fertilizer: 'Nitrogen-heavy at the beginning, then switch to P and K.', harvest: 'About 100-120 days when tops fall over.' },
        'coffee': { name: 'Coffee', watering: 'Needs well-distributed rainfall. Requires irrigation in dry periods.', fertilizer: 'Regular application of balanced NPK fertilizer is crucial.', harvest: 'Takes 3-4 years to bear fruit.' },
        'jute': { name: 'Jute', watering: 'Requires large amounts of water. Grows well in humid climates.', fertilizer: 'Primarily needs Nitrogen for vegetative growth.', harvest: 'Harvested after 120-150 days.' },
        'bajra': { name: 'Bajra (Pearl Millet)', watering: 'Drought-tolerant. Irrigate every 15-20 days during dry spells.', fertilizer: 'Responds well to Nitrogen. Balanced NPK at sowing is recommended.', harvest: 'Typically matures in 75-95 days.' },
        'lentils': { name: 'Lentils (Masur)', watering: 'Low water requirement. One irrigation may be needed at flowering.', fertilizer: 'Requires less Nitrogen. A starter dose of NPK is beneficial.', harvest: 'Ready for harvest in 100-110 days.' }
    };
    addCropForm.addEventListener('submit', function(e) { e.preventDefault(); const key = cropManagerInput.value.trim().toLowerCase(); const data = cropData[key] || cropData[key.replace(' ', '')]; if (data) { const p = myCropsList.querySelector('.placeholder-text'); if(p){p.remove();} const card = document.createElement('div'); card.className = 'crop-card'; card.innerHTML = `<button class="remove-crop-btn">&times;</button><h3>${data.name}</h3><p><strong>💧 Watering Needs:</strong> ${data.watering}</p><p><strong>🌱 Fertilizer Needs:</strong> ${data.fertilizer}</p><p><strong>🕒 Time to Harvest:</strong> ${data.harvest}</p>`; myCropsList.prepend(card); } else { alert(`Sorry, data for "${cropManagerInput.value}" is not available.`); } addCropForm.reset(); });
    myCropsList.addEventListener('click', function(e) { if (e.target.classList.contains('remove-crop-btn')) { e.target.closest('.crop-card').remove(); if (myCropsList.children.length === 0) { myCropsList.innerHTML = `<p class="placeholder-text">Your added crops will appear here.</p>`; } } });

    // --- FINANCIALS & OTHER LOGIC (Remains unchanged, collapsed for brevity) ---
    // (The detailed code for the Financials, Market Prices, and Forum is omitted here but is unchanged from your provided file)
    const financialCtx = document.getElementById('income-expense-chart').getContext('2d'); new Chart(financialCtx, { type: 'bar', data: { labels: ['January', 'February', 'March', 'April', 'May', 'June'], datasets: [{ label: 'Income (in ₹)', data: [12000, 19000, 15000, 22000, 18000, 25000], backgroundColor: 'rgba(40, 167, 69, 0.5)', borderColor: 'rgba(40, 167, 69, 1)', borderWidth: 1 }, { label: 'Expenses (in ₹)', data: [8000, 11000, 9000, 13000, 10000, 14000], backgroundColor: 'rgba(220, 53, 69, 0.5)', borderColor: 'rgba(220, 53, 69, 1)', borderWidth: 1 }] }, options: { scales: { y: { beginAtZero: true } } } }); profitCalcForm.addEventListener('submit', function(e) { e.preventDefault(); const r=parseFloat(document.getElementById('total-revenue').value),c=parseFloat(document.getElementById('total-cost').value); if(isNaN(r)||isNaN(c)){profitResult.innerHTML=`<p style="color: red;">Please enter valid numbers.</p>`;return;} const p=r-c; if(p>=0){profitResult.innerHTML=`<p><strong>Net Profit:</strong> <span style="color: green;">₹${p.toLocaleString('en-IN')}</span></p>`;}else{profitResult.innerHTML=`<p><strong>Net Loss:</strong> <span style="color: red;">₹${Math.abs(p).toLocaleString('en-IN')}</span></p>`;}}); emiCalcForm.addEventListener('submit', function(e) { e.preventDefault(); const p=parseFloat(document.getElementById('loan-amount').value),a=parseFloat(document.getElementById('interest-rate').value),y=parseFloat(document.getElementById('loan-tenure').value); if(isNaN(p)||isNaN(a)||isNaN(y)||p<=0||a<=0||y<=0){emiResult.innerHTML=`<p style="color: red;">Please enter valid positive numbers.</p>`;return;} const r=(a/100)/12,n=y*12,emi=p*r*(Math.pow(1+r,n))/(Math.pow(1+r,n)-1); emiResult.innerHTML=`<p><strong>Your Monthly EMI:</strong> ₹${emi.toFixed(2).toLocaleString('en-IN')}</p>`;}); transactionForm.addEventListener('submit', function(e) { e.preventDefault(); const t=document.getElementById('transaction-type').value,d=document.getElementById('transaction-desc').value,a=parseFloat(document.getElementById('transaction-amount').value),dt=document.getElementById('transaction-date').value; if(!t||!d||isNaN(a)||!dt){alert('Please fill all fields correctly.');return;} const nR=document.createElement('tr'); const fA=t==='income'?`<td class="income-amount">+ ₹${a.toLocaleString('en-IN')}</td>`:`<td class="expense-amount">- ₹${a.toLocaleString('en-IN')}</td>`; nR.innerHTML=`<td>${dt}</td><td>${d}</td><td>${t.charAt(0).toUpperCase()+t.slice(1)}</td>${fA}`; transactionsTableBody.prepend(nR); transactionForm.reset();});
    const marketPrices = [ { crop: 'Paddy (Rice)', price: 22, location: 'Sambalpur' }, { crop: 'Mustard', price: 58, location: 'Balasore' }, { crop: 'Tomatoes', price: 30, location: 'Cuttack' }, { crop: 'Potatoes', price: 20, location: 'Puri' }, { crop: 'Onions', price: 25, location: 'Bargarh' }, { crop: 'Brinjal', price: 22, location: 'Khordha' }, { crop: 'Turmeric', price: 75, location: 'Kandhamal' }, { crop: 'Moong (Green Gram)', price: 85, location: 'Kendrapara' }, { crop: 'Cotton', price: 65, location: 'Kalahandi' }, { crop: 'Maize', price: 20, location: 'Nabarangpur' }, { crop: 'Ginger', price: 90, location: 'Koraput' }, { crop: 'Groundnut', price: 70, location: 'Ganjam' }, { crop: 'Chilli', price: 110, location: 'Nayagarh' }, { crop: 'Black Gram (Biri)', price: 92, location: 'Jajpur' }, { crop: 'Mango (Raw)', price: 35, location: 'Mayurbhanj' }, ]; const pricesTableBody=document.querySelector('#prices-table tbody'); pricesTableBody.innerHTML = ''; marketPrices.forEach(item=>{const row=document.createElement('tr'); row.innerHTML=`<td>${item.crop}</td><td>₹${item.price}</td><td>${item.location}</td>`; pricesTableBody.appendChild(row);});
    const posts=[{title:'Best time for paddy cultivation in Odisha?',content:'What Kharif month is ideal to start sowing paddy seeds for best yield?'},{title:'How to deal with pests in Brinjal crop?',content:'I have a fruit and shoot borer problem in my brinjal crop. Any organic solutions?'}]; const postsContainer=document.getElementById('forum-posts'); const newPostForm=document.getElementById('new-post-form'); function displayPosts(){postsContainer.innerHTML=''; posts.forEach(post=>{const postDiv=document.createElement('div'); postDiv.className='post'; postDiv.innerHTML=`<h3>${post.title}</h3><p>${post.content}</p>`; postsContainer.appendChild(postDiv);});} newPostForm.addEventListener('submit',function(event){event.preventDefault(); const title=document.getElementById('post-title').value; const content=document.getElementById('post-content').value; posts.unshift({title,content}); displayPosts(); newPostForm.reset();}); displayPosts();
});