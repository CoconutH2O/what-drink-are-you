/**
 * Choose Your Own Adventure Game Engine
 * =====================================
 * A mobile-friendly adventure game with value tracking and Google Sheets integration
 * 
 * NOTE: Adventure data is loaded from adventure-data.js
 */

// ==========================================
// CONFIGURATION
// ==========================================

const CONFIG = {
    // Replace this with your Google Apps Script Web App URL
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbx99UFpZQ5-gnObfESvRLPk48yTOB0Z4jz5o9VvSh0x_EKO-yxGHooFMyDDzrsiu8yu/exec',
    
    // Enable/disable data submission
    ENABLE_TRACKING: true,
    
    // Show debug information in console
    DEBUG: true
};

// ==========================================
// GAME STATE
// ==========================================

const gameState = {
    currentScene: null,
    values: {},
    choices: [],
    startTime: null,
    sessionId: null
};

// ==========================================
// DOM ELEMENTS
// ==========================================

const elements = {
    startScreen: document.getElementById('start-screen'),
    gameScreen: document.getElementById('game-screen'),
    loadingScreen: document.getElementById('loading-screen'),
    resultsScreen: document.getElementById('results-screen'),
    
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    statsBtn: document.getElementById('stats-btn'),
    downloadBtn: document.getElementById('download-btn'),
    statsDropdown: document.getElementById('stats-dropdown'),
    statsList: document.getElementById('stats-list'),
    resultsCapture: document.getElementById('results-capture'),
    
    progressFill: document.getElementById('progress-fill'),
    sceneImage: document.getElementById('scene-image'),
    sceneText: document.getElementById('scene-text'),
    choicesContainer: document.getElementById('choices-container'),
    
    resultsTitle: document.getElementById('results-title'),
    resultsImage: document.getElementById('results-image'),
    resultsDescription: document.getElementById('results-description'),
    resultsStats: document.getElementById('results-stats'),
    achievementBadges: document.getElementById('achievement-badges')
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function log(...args) {
    if (CONFIG.DEBUG) {
        console.log('[Adventure]', ...args);
    }
}

function showScreen(screenElement) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen with animation
    setTimeout(() => {
        screenElement.classList.add('active');
    }, 50);
}

function updateProgress() {
    const totalScenes = Object.keys(ADVENTURE_DATA.scenes).length - 1; // Exclude ending
    const visitedScenes = gameState.choices.length + 1;
    const progress = Math.min((visitedScenes / totalScenes) * 100, 100);
    elements.progressFill.style.width = `${progress}%`;
}

// ==========================================
// GAME LOGIC
// ==========================================

function initGame() {
    // Initialize values for all categories
    ADVENTURE_DATA.valueCategories.forEach(category => {
        gameState.values[category.id] = 0;
    });
    
    gameState.currentScene = null;
    gameState.choices = [];
    gameState.startTime = new Date().toISOString();
    gameState.sessionId = generateSessionId();
    
    log('Game initialized', gameState);
}

function startGame() {
    initGame();
    loadScene('start');
    showScreen(elements.gameScreen);
}

function loadScene(sceneId) {
    const scene = ADVENTURE_DATA.scenes[sceneId];
    
    if (!scene) {
        console.error('Scene not found:', sceneId);
        return;
    }
    
    if (scene.isEnding) {
        endGame();
        return;
    }
    
    gameState.currentScene = scene;
    
    // Update image
    elements.sceneImage.src = scene.image;
    elements.sceneImage.alt = scene.id;
    
    // Update text
    elements.sceneText.textContent = scene.text;
    
    // Clear and populate choices
    elements.choicesContainer.innerHTML = '';
    
    scene.choices.forEach((choice, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'choice-wrapper';
        
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.addEventListener('click', () => makeChoice(choice, index));
        
        // Create info icon with tooltip
        const infoIcon = document.createElement('div');
        infoIcon.className = 'choice-info';
        infoIcon.innerHTML = `
            ℹ️
            <div class="choice-tooltip">
                ${Object.entries(choice.values).map(([key, value]) => {
                    const category = ADVENTURE_DATA.valueCategories.find(c => c.id === key);
                    const label = category ? (value < 0 ? category.labelLeft : category.labelRight) : key;
                    const valueClass = value > 0 ? 'positive' : value < 0 ? 'negative' : '';
                    return `<div class="tooltip-row">
                        <span class="tooltip-label">${label}</span>
                        <span class="tooltip-value ${valueClass}">${value > 0 ? '+' : ''}${value}</span>
                    </div>`;
                }).join('')}
            </div>
        `;
        
        wrapper.appendChild(button);
        wrapper.appendChild(infoIcon);
        
        elements.choicesContainer.appendChild(wrapper);
        
        // Stagger animation
        setTimeout(() => {
            wrapper.classList.add('animate-in');
        }, 100 + (index * 100));
    });
    
    updateProgress();
    log('Loaded scene:', sceneId);
}

function makeChoice(choice, choiceIndex) {
    // Record the choice
    gameState.choices.push({
        sceneId: gameState.currentScene.id,
        choiceIndex: choiceIndex,
        choiceText: choice.text,
        values: choice.values,
        timestamp: new Date().toISOString()
    });
    
    // Add values
    Object.entries(choice.values).forEach(([key, value]) => {
        if (gameState.values.hasOwnProperty(key)) {
            gameState.values[key] += value;
        }
    });
    
    log('Choice made:', choice.text);
    log('Current values:', gameState.values);
    
    // Visual feedback
    const wrappers = elements.choicesContainer.querySelectorAll('.choice-wrapper');
    const buttons = elements.choicesContainer.querySelectorAll('.choice-btn');
    wrappers[choiceIndex].querySelector('.choice-btn').classList.add('selected');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Determine next scene (handle random branching)
    const nextScene = resolveNextScene(choice.nextScene);
    
    // Transition to next scene
    setTimeout(() => {
        loadScene(nextScene);
    }, 400);
}

/**
 * Resolve the next scene, handling random branching
 * @param {string|object} nextScene - Either a scene ID string or a random config object
 * @returns {string} The resolved scene ID
 */
function resolveNextScene(nextScene) {
    // If it's a simple string, return it directly
    if (typeof nextScene === 'string') {
        return nextScene;
    }
    
    // Handle random branching: { random: [{ scene: 'x', chance: 0.5 }, { scene: 'y', chance: 0.5 }] }
    if (nextScene && nextScene.random && Array.isArray(nextScene.random)) {
        const roll = Math.random();
        let cumulative = 0;
        
        for (const option of nextScene.random) {
            cumulative += option.chance;
            if (roll < cumulative) {
                log(`Random branch: rolled ${roll.toFixed(2)}, going to ${option.scene}`);
                return option.scene;
            }
        }
        
        // Fallback to last option if rounding issues
        const lastOption = nextScene.random[nextScene.random.length - 1];
        log(`Random branch: fallback to ${lastOption.scene}`);
        return lastOption.scene;
    }
    
    // Fallback
    log('Warning: Could not resolve nextScene', nextScene);
    return 'ending';
}

function endGame() {
    showScreen(elements.loadingScreen);
    
    // Determine result
    const result = determineResult();
    
    // Submit data to Google Sheets
    submitToGoogleSheets().then(() => {
        // Show results after a brief delay
        setTimeout(() => {
            displayResults(result);
            showScreen(elements.resultsScreen);
            // Scroll to top of results
            elements.resultsScreen.scrollTop = 0;
            window.scrollTo(0, 0);
        }, 1500);
    }).catch(error => {
        log('Error submitting to sheets:', error);
        // Still show results even if submission fails
        setTimeout(() => {
            displayResults(result);
            showScreen(elements.resultsScreen);
            // Scroll to top of results
            elements.resultsScreen.scrollTop = 0;
            window.scrollTo(0, 0);
        }, 1500);
    });
}

function determineResult() {
    // Calculate similarity score for each drink
    // Lower distance = better match
    let bestMatch = null;
    let bestScore = Infinity;
    
    for (const result of ADVENTURE_DATA.results) {
        if (!result.targets) continue;
        
        // Calculate Euclidean distance between user values and drink targets
        let distance = 0;
        for (const [trait, targetValue] of Object.entries(result.targets)) {
            const userValue = gameState.values[trait] || 0;
            distance += Math.pow(userValue - targetValue, 2);
        }
        distance = Math.sqrt(distance);
        
        log(`${result.id} distance: ${distance.toFixed(2)}`);
        
        if (distance < bestScore) {
            bestScore = distance;
            bestMatch = result;
        }
    }
    
    log(`Best match: ${bestMatch?.id} with distance ${bestScore.toFixed(2)}`);
    
    // Return best match or fallback to last result
    return bestMatch || ADVENTURE_DATA.results[ADVENTURE_DATA.results.length - 1];
}

function displayResults(result) {
    elements.resultsTitle.textContent = result.title;
    elements.resultsImage.src = result.image;
    elements.resultsDescription.textContent = result.description;
    
    // Display spectrum stats
    elements.resultsStats.innerHTML = '';
    ADVENTURE_DATA.valueCategories.forEach(category => {
        const value = gameState.values[category.id] || 0;
        const minValue = category.minValue || -10;
        const maxValue = category.maxValue || 10;
        
        // Calculate position as percentage (0% = left, 50% = center, 100% = right)
        // Maps from minValue (-10) to maxValue (+10) onto 0-100%
        const range = maxValue - minValue;
        const percentage = Math.min(Math.max(((value - minValue) / range) * 100, 0), 100);
        
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-labels">
                <span class="stat-label stat-label-left">${category.labelLeft}</span>
                <span class="stat-label stat-label-right">${category.labelRight}</span>
            </div>
            <div class="stat-bar">
                <div class="stat-bar-track"></div>
                <div class="stat-bar-marker" style="left: ${percentage}%"></div>
            </div>
        `;
        elements.resultsStats.appendChild(statItem);
    });
    
    // Display compatibility section
    if (result.compatibility) {
        const compatDrinks = result.compatibility.drinks
            .map(drinkId => {
                const drink = ADVENTURE_DATA.results.find(r => r.id === drinkId);
                return drink ? drink.title : drinkId;
            })
            .join(' • ');
        
        const compatSection = document.createElement('div');
        compatSection.className = 'compatibility-section';
        compatSection.innerHTML = `
            <h3 class="compatibility-title">Gets along best with</h3>
            <p class="compatibility-drinks">${compatDrinks}</p>
            <p class="compatibility-description">${result.compatibility.description}</p>
        `;
        elements.resultsStats.appendChild(compatSection);
    }
    
    // Display achievement badges
    displayAchievementBadges();
    
    log('Final result:', result.id);
    log('Final values:', gameState.values);
}

function displayAchievementBadges() {
    if (!elements.achievementBadges) return;
    
    elements.achievementBadges.innerHTML = '';
    const badges = [];
    
    const values = gameState.values;
    const visitedScenes = gameState.choices.map(c => c.sceneId);
    
    // 🎰 Risk Taker - high risk score (>= 5)
    if (values.risk >= 5) {
        badges.push({ icon: '🎰', label: 'Risk Taker', class: 'risk-taker' });
    }
    
    // 🥞 Hopeless Romantic - went on the date (stardust pancakes!)
    if (visitedScenes.includes('date_scene')) {
        badges.push({ icon: '🥞', label: 'Romantic', class: 'romantic' });
    }
    
    // 🎒 Adventurer - visited many unique scenes (>= 12)
    const uniqueScenes = new Set(visitedScenes).size;
    if (uniqueScenes >= 12) {
        badges.push({ icon: '🎒', label: 'Adventurer', class: 'adventurer' });
    }
    
    // 💰 Big Spender / Budget King - based on valueFocus
    if (values.valueFocus <= -5) {
        badges.push({ icon: '💰', label: 'Big Spender', class: 'big-spender' });
    } else if (values.valueFocus >= 5) {
        badges.push({ icon: '👑', label: 'Budget King', class: 'budget-king' });
    }
    
    // 🤝 Team Player - high integration (>= 5)
    if (values.integration >= 5) {
        badges.push({ icon: '🤝', label: 'Team Player', class: 'team-player' });
    }
    
    // Render badges
    badges.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = `achievement-badge ${badge.class}`;
        badgeEl.innerHTML = `<span class="badge-icon">${badge.icon}</span><span>${badge.label}</span>`;
        elements.achievementBadges.appendChild(badgeEl);
    });
    
    log('Badges earned:', badges.map(b => b.label));
}

// ==========================================
// GOOGLE SHEETS INTEGRATION
// ==========================================

async function submitToGoogleSheets() {
    if (!CONFIG.ENABLE_TRACKING || !CONFIG.GOOGLE_SCRIPT_URL) {
        log('Tracking disabled or no URL configured');
        return Promise.resolve();
    }
    
    const data = {
        sessionId: gameState.sessionId,
        startTime: gameState.startTime,
        endTime: new Date().toISOString(),
        values: gameState.values,
        choices: gameState.choices.map(c => ({
            scene: c.sceneId,
            choice: c.choiceIndex,
            text: c.choiceText
        })),
        result: determineResult().id,
        userAgent: navigator.userAgent
    };
    
    log('Submitting to Google Sheets:', data);
    
    try {
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        log('Submission complete');
        return response;
    } catch (error) {
        console.error('Failed to submit to Google Sheets:', error);
        throw error;
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

elements.startBtn.addEventListener('click', startGame);
elements.restartBtn.addEventListener('click', () => {
    showScreen(elements.startScreen);
    // Hide stats dropdown when restarting
    if (elements.statsDropdown) {
        elements.statsDropdown.style.display = 'none';
    }
});

// Download image button handler
if (elements.downloadBtn) {
    elements.downloadBtn.addEventListener('click', async () => {
        if (typeof html2canvas === 'undefined') {
            log('html2canvas not loaded');
            return;
        }
        
        const captureElement = elements.resultsCapture;
        if (!captureElement) return;
        
        try {
            // Convert the result image to base64 to avoid CORS issues
            const resultImg = elements.resultsImage;
            let originalSrc = resultImg.src;
            
            // Try to convert image to base64
            try {
                const response = await fetch(resultImg.src);
                const blob = await response.blob();
                const base64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
                resultImg.src = base64;
                // Wait for image to load
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (e) {
                log('Could not convert image to base64:', e);
            }
            
            // Temporarily add padding for nicer capture
            captureElement.style.padding = '20px';
            captureElement.style.background = '#FFFFFF';
            
            const canvas = await html2canvas(captureElement, {
                backgroundColor: '#FFFFFF',
                scale: 2, // Higher resolution
                useCORS: true,
                allowTaint: true,
                logging: false
            });
            
            // Reset styles and image src
            captureElement.style.padding = '';
            captureElement.style.background = '';
            resultImg.src = originalSrc;
            
            // Create download link
            const link = document.createElement('a');
            const drinkName = elements.resultsTitle.textContent.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').toLowerCase();
            link.download = `${drinkName}_results.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            log('Image downloaded');
        } catch (error) {
            log('Error capturing image:', error);
        }
    });
}

// Stats button handler
let statsLoaded = false;
if (elements.statsBtn) {
    elements.statsBtn.addEventListener('click', async () => {
        const dropdown = elements.statsDropdown;
        
        if (dropdown.style.display === 'none') {
            dropdown.style.display = 'block';
            elements.statsBtn.textContent = '📊 Hide Rarity Stats';
            
            // Fetch stats if not already loaded
            if (!statsLoaded) {
                await fetchAndDisplayStats();
            }
        } else {
            dropdown.style.display = 'none';
            elements.statsBtn.textContent = '📊 Show Rarity Stats';
        }
    });
}

async function fetchAndDisplayStats() {
    if (!CONFIG.GOOGLE_SCRIPT_URL || !CONFIG.ENABLE_TRACKING) {
        elements.statsList.innerHTML = '<p class="stats-loading">Stats not available (tracking disabled)</p>';
        return;
    }
    
    try {
        elements.statsList.innerHTML = '<p class="stats-loading">Loading stats...</p>';
        
        // Use POST with text/plain to ensure simple request (no CORS preflight)
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({ action: 'stats' })
        });
        const data = await response.json();
        
        log('Stats response:', JSON.stringify(data));
        
        if (data.success && data.stats && Object.keys(data.stats).length > 0) {
            displayStats(data.stats, data.total);
            statsLoaded = true;
        } else if (data.total === 0 || !data.stats || Object.keys(data.stats).length === 0) {
            elements.statsList.innerHTML = '<p class="stats-loading">No data yet — be the first!</p>';
        } else {
            elements.statsList.innerHTML = '<p class="stats-loading">No data yet — be the first!</p>';
        }
    } catch (error) {
        log('Error fetching stats:', error);
        elements.statsList.innerHTML = '<p class="stats-loading">Could not load stats (check console)</p>';
    }
}

function displayStats(stats, total) {
    const currentResult = gameState.result?.id;
    
    // Sort by percentage descending
    const sorted = Object.entries(stats).sort((a, b) => b[1].percentage - a[1].percentage);
    
    // Get drink titles from ADVENTURE_DATA
    const drinkTitles = {};
    ADVENTURE_DATA.results.forEach(r => {
        drinkTitles[r.id] = r.title;
    });
    
    let html = `<p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 12px;">Based on ${total} results</p>`;
    
    sorted.forEach(([drinkId, data]) => {
        const title = drinkTitles[drinkId] || drinkId;
        const isCurrent = drinkId === currentResult;
        html += `
            <div class="stats-row ${isCurrent ? 'current' : ''}">
                <span class="stats-drink">${title} ${isCurrent ? '← You!' : ''}</span>
                <span class="stats-percent">${data.percentage}%</span>
            </div>
        `;
    });
    
    elements.statsList.innerHTML = html;
}

// Preload images
function preloadImages() {
    const images = new Set();
    
    // Collect all image URLs
    Object.values(ADVENTURE_DATA.scenes).forEach(scene => {
        if (scene.image) images.add(scene.image);
    });
    
    ADVENTURE_DATA.results.forEach(result => {
        if (result.image) images.add(result.image);
    });
    
    // Preload
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    log('Preloading', images.size, 'images');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    log('Adventure game ready');
});

