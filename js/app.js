/**
 * Choose Your Own Adventure Game Engine
 * =====================================
 * A mobile-friendly adventure game with value tracking and Google Sheets integration
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
// ADVENTURE DATA
// ==========================================
// Edit this object to create your adventure!

const ADVENTURE_DATA = {
    title: "The Financial Path",
    
    // Define the value categories that will be tracked
    valueCategories: [
        { id: 'risk', label: 'Risk Tolerance' },
        { id: 'growth', label: 'Growth Focus' },
        { id: 'stability', label: 'Stability Preference' },
        { id: 'innovation', label: 'Innovation Interest' }
    ],
    
    // Define all scenes/screens in your adventure
    scenes: {
        start: {
            id: 'start',
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
            text: 'You stand at a crossroads in your financial journey. The morning sun casts long shadows on the path ahead. Which way does your intuition guide you?',
            choices: [
                {
                    text: 'Take the mountain path - challenging but promising great views',
                    values: { risk: 2, growth: 2, stability: 0, innovation: 1 },
                    nextScene: 'mountain'
                },
                {
                    text: 'Follow the river - steady and reliable, with hidden depths',
                    values: { risk: 0, growth: 1, stability: 2, innovation: 0 },
                    nextScene: 'river'
                },
                {
                    text: 'Enter the forest - mysterious paths with unexpected discoveries',
                    values: { risk: 1, growth: 1, stability: 0, innovation: 2 },
                    nextScene: 'forest'
                }
            ]
        },
        
        mountain: {
            id: 'mountain',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
            text: 'The mountain path is steep but invigorating. Halfway up, you discover a cave with glowing crystals and a well-worn trail continuing upward. What calls to you?',
            choices: [
                {
                    text: 'Explore the crystal cave - there might be treasures within',
                    values: { risk: 2, growth: 1, stability: 0, innovation: 2 },
                    nextScene: 'cave'
                },
                {
                    text: 'Continue to the summit - the goal is clear and the reward certain',
                    values: { risk: 1, growth: 2, stability: 1, innovation: 0 },
                    nextScene: 'summit'
                }
            ]
        },
        
        river: {
            id: 'river',
            image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80',
            text: 'The river flows peacefully, its waters clear and deep. You find a sturdy boat tied to the shore and notice a bridge in the distance. How do you proceed?',
            choices: [
                {
                    text: 'Take the boat downstream - let the current guide your journey',
                    values: { risk: 1, growth: 1, stability: 1, innovation: 1 },
                    nextScene: 'downstream'
                },
                {
                    text: 'Cross the bridge - a solid path to the other side',
                    values: { risk: 0, growth: 1, stability: 2, innovation: 0 },
                    nextScene: 'bridge'
                }
            ]
        },
        
        forest: {
            id: 'forest',
            image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
            text: 'The forest whispers ancient secrets. Bioluminescent mushrooms light a hidden path, while a treehouse village glimmers through the canopy above.',
            choices: [
                {
                    text: 'Follow the mushroom trail - embrace the unconventional path',
                    values: { risk: 2, growth: 0, stability: 0, innovation: 3 },
                    nextScene: 'mushroom'
                },
                {
                    text: 'Climb to the treehouse village - community awaits above',
                    values: { risk: 1, growth: 2, stability: 1, innovation: 1 },
                    nextScene: 'treehouse'
                }
            ]
        },
        
        cave: {
            id: 'cave',
            image: 'https://images.unsplash.com/photo-1504699439244-a7f8b9e3e1b9?w=800&q=80',
            text: 'The crystals pulse with an inner light. Deep within, you find an ancient chest and a mirror that shows not your reflection, but possibilities...',
            choices: [
                {
                    text: 'Open the chest - fortune favors the bold',
                    values: { risk: 3, growth: 2, stability: -1, innovation: 1 },
                    nextScene: 'ending'
                },
                {
                    text: 'Gaze into the mirror - understand before you act',
                    values: { risk: 0, growth: 1, stability: 2, innovation: 2 },
                    nextScene: 'ending'
                }
            ]
        },
        
        summit: {
            id: 'summit',
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
            text: 'At the summit, the world spreads before you. An eagle offers to carry you to new heights, while a mountain sage offers wisdom for the descent.',
            choices: [
                {
                    text: 'Accept the eagle\'s gift - soar to new possibilities',
                    values: { risk: 2, growth: 3, stability: 0, innovation: 1 },
                    nextScene: 'ending'
                },
                {
                    text: 'Learn from the sage - wisdom is the greatest treasure',
                    values: { risk: 0, growth: 1, stability: 2, innovation: 1 },
                    nextScene: 'ending'
                }
            ]
        },
        
        downstream: {
            id: 'downstream',
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
            text: 'The river carries you to a delta where three channels diverge. Each leads to a different shore - one golden, one green, one shimmering with starlight.',
            choices: [
                {
                    text: 'The golden shore - prosperity awaits',
                    values: { risk: 1, growth: 3, stability: 1, innovation: 0 },
                    nextScene: 'ending'
                },
                {
                    text: 'The green shore - sustainable growth beckons',
                    values: { risk: 0, growth: 2, stability: 2, innovation: 1 },
                    nextScene: 'ending'
                },
                {
                    text: 'The starlit shore - dreams become reality',
                    values: { risk: 2, growth: 1, stability: 0, innovation: 3 },
                    nextScene: 'ending'
                }
            ]
        },
        
        bridge: {
            id: 'bridge',
            image: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&q=80',
            text: 'The bridge leads to a peaceful valley. A farmer offers you seeds to plant, while a merchant suggests investing in their caravan.',
            choices: [
                {
                    text: 'Accept the seeds - grow your own future',
                    values: { risk: 0, growth: 2, stability: 3, innovation: 0 },
                    nextScene: 'ending'
                },
                {
                    text: 'Join the caravan - diversify your opportunities',
                    values: { risk: 1, growth: 2, stability: 1, innovation: 1 },
                    nextScene: 'ending'
                }
            ]
        },
        
        mushroom: {
            id: 'mushroom',
            image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
            text: 'The mushroom path leads to an enchanted glade where ideas take physical form. A thought-creature offers to show you futures yet unimagined.',
            choices: [
                {
                    text: 'Embrace the vision - innovation requires imagination',
                    values: { risk: 2, growth: 1, stability: 0, innovation: 4 },
                    nextScene: 'ending'
                },
                {
                    text: 'Thank it but stay grounded - keep one foot in reality',
                    values: { risk: 0, growth: 1, stability: 2, innovation: 2 },
                    nextScene: 'ending'
                }
            ]
        },
        
        treehouse: {
            id: 'treehouse',
            image: 'https://images.unsplash.com/photo-1520637836993-a071674e5362?w=800&q=80',
            text: 'The treehouse village thrives on cooperation. The elders offer you a place in their council or a map to unexplored territories beyond.',
            choices: [
                {
                    text: 'Join the council - build something lasting together',
                    values: { risk: 0, growth: 2, stability: 3, innovation: 1 },
                    nextScene: 'ending'
                },
                {
                    text: 'Take the map - new frontiers await',
                    values: { risk: 2, growth: 2, stability: 0, innovation: 2 },
                    nextScene: 'ending'
                }
            ]
        },
        
        ending: {
            id: 'ending',
            isEnding: true
        }
    },
    
    // Define result profiles based on value combinations
    results: [
        {
            id: 'adventurer',
            title: 'The Bold Adventurer',
            description: 'You embrace risk and seek growth at every turn. Your financial journey will be marked by bold moves and potentially great rewards. Consider balancing your portfolio with some stable investments.',
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
            condition: (values) => values.risk >= 5 && values.growth >= 4
        },
        {
            id: 'innovator',
            title: 'The Creative Innovator',
            description: 'You see possibilities where others see obstacles. Your openness to new ideas positions you well for emerging opportunities. Stay curious but do your due diligence.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
            condition: (values) => values.innovation >= 5
        },
        {
            id: 'guardian',
            title: 'The Steady Guardian',
            description: 'Security and stability guide your choices. You build wealth through patience and careful planning. Your approach protects against volatility while ensuring steady progress.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
            condition: (values) => values.stability >= 5
        },
        {
            id: 'balanced',
            title: 'The Balanced Seeker',
            description: 'You walk the middle path, balancing risk with security, growth with stability. This versatile approach allows you to adapt to changing circumstances while maintaining a solid foundation.',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            condition: (values) => true // Default fallback
        }
    ]
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
    
    progressFill: document.getElementById('progress-fill'),
    sceneImage: document.getElementById('scene-image'),
    sceneText: document.getElementById('scene-text'),
    choicesContainer: document.getElementById('choices-container'),
    
    resultsTitle: document.getElementById('results-title'),
    resultsImage: document.getElementById('results-image'),
    resultsDescription: document.getElementById('results-description'),
    resultsStats: document.getElementById('results-stats')
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
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.addEventListener('click', () => makeChoice(choice, index));
        
        // Stagger animation
        setTimeout(() => {
            button.classList.add('animate-in');
        }, 100 + (index * 100));
        
        elements.choicesContainer.appendChild(button);
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
    const buttons = elements.choicesContainer.querySelectorAll('.choice-btn');
    buttons[choiceIndex].classList.add('selected');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Transition to next scene
    setTimeout(() => {
        loadScene(choice.nextScene);
    }, 400);
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
        }, 1500);
    }).catch(error => {
        log('Error submitting to sheets:', error);
        // Still show results even if submission fails
        setTimeout(() => {
            displayResults(result);
            showScreen(elements.resultsScreen);
        }, 1500);
    });
}

function determineResult() {
    // Find the first matching result
    for (const result of ADVENTURE_DATA.results) {
        if (result.condition(gameState.values)) {
            return result;
        }
    }
    // Return last result as fallback
    return ADVENTURE_DATA.results[ADVENTURE_DATA.results.length - 1];
}

function displayResults(result) {
    elements.resultsTitle.textContent = result.title;
    elements.resultsImage.src = result.image;
    elements.resultsDescription.textContent = result.description;
    
    // Display stats
    elements.resultsStats.innerHTML = '';
    ADVENTURE_DATA.valueCategories.forEach(category => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-value">${gameState.values[category.id]}</div>
            <div class="stat-label">${category.label}</div>
        `;
        elements.resultsStats.appendChild(statItem);
    });
    
    log('Final result:', result.id);
    log('Final values:', gameState.values);
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
});

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

