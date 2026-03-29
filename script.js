// UI Elements - Setup
const catSelect = document.getElementById('category');
const subcatSelect = document.getElementById('subcategory');
const subsubContainer = document.getElementById('subsubcategories-container');
const startBtn = document.getElementById('start-btn');
const btnSelectAll = document.getElementById('btn-select-all');
const btnDeselectAll = document.getElementById('btn-deselect-all');
const setupCard = document.getElementById('setup-card');

// UI Elements - Testing
const testCard = document.getElementById('test-card');
const resetBtn = document.getElementById('reset-btn');
const answerInput = document.getElementById('answer-input');
const countFoundEl = document.getElementById('count-found');
const countTotalEl = document.getElementById('count-total');
const countPercentageEl = document.getElementById('count-percentage');
const boardsContainer = document.getElementById('boards-container');
const giveUpBtn = document.getElementById('give-up-btn');
const statusMessage = document.getElementById('status-message');

// State Variables
let activeTestSets = []; 
let totalSlots = 0;
let filledSlots = 0;
let testIsActive = false;

// Initialize Dropdowns
function init() {
    populateSelect(catSelect, Object.keys(appData));
    updateSubcategories();
    
    catSelect.addEventListener('change', updateSubcategories);
    subcatSelect.addEventListener('change', updateSubsubcategories);
}

function populateSelect(element, options) {
    element.innerHTML = '';
    options.forEach(opt => {
        const optionEl = document.createElement('option');
        optionEl.value = opt;
        optionEl.textContent = opt;
        element.appendChild(optionEl);
    });
}

function updateSubcategories() {
    const selectedCat = catSelect.value;
    const subcats = Object.keys(appData[selectedCat]);
    populateSelect(subcatSelect, subcats);
    updateSubsubcategories();
}

function updateSubsubcategories() {
    subsubContainer.innerHTML = '';
    const selectedCat = catSelect.value;
    const selectedSubCat = subcatSelect.value;
    const subsubcats = Object.keys(appData[selectedCat][selectedSubCat]);

    subsubcats.forEach(item => {
        const wrapper = document.createElement('label');
        wrapper.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item;
        checkbox.className = 'subsub-cb';
        checkbox.checked = true;

        const text = document.createTextNode(item);
        
        wrapper.appendChild(checkbox);
        wrapper.appendChild(text);
        subsubContainer.appendChild(wrapper);
    });
}

// Select/Deselect All
btnSelectAll.addEventListener('click', () => {
    document.querySelectorAll('.subsub-cb').forEach(cb => cb.checked = true);
});

btnDeselectAll.addEventListener('click', () => {
    document.querySelectorAll('.subsub-cb').forEach(cb => cb.checked = false);
});

// Setup Test Boards
startBtn.addEventListener('click', () => {
    const selectedCat = catSelect.value;
    const selectedSubCat = subcatSelect.value;
    const checkedBoxes = document.querySelectorAll('.subsub-cb:checked');
    
    if (checkedBoxes.length === 0) {
        showStatusMessage("Please select at least one set to test.", "error");
        setTimeout(hideStatusMessage, 3000);
        return;
    }

    // Reset state
    activeTestSets = [];
    totalSlots = 0;
    filledSlots = 0;
    boardsContainer.innerHTML = '';
    hideStatusMessage();

    // Build Data Structure and UI Columns
    checkedBoxes.forEach((cb, setIndex) => {
        const setName = cb.value;
        const items = appData[selectedCat][selectedSubCat][setName];
        
        const setObj = {
            name: setName,
            items: items.map(itemName => ({ name: itemName, found: false }))
        };
        activeTestSets.push(setObj);
        totalSlots += items.length;

        // Build UI Board
        const boardDiv = document.createElement('div');
        boardDiv.className = 'board';
        boardDiv.id = `board-${setIndex}`; 
        
        // Inject Base Colors via CSS Variables
        const colorInfo = categoryColors[setName] || { h: 0, l: 50, text: '#ffffff' };
        boardDiv.style.setProperty('--board-h', colorInfo.h);
        boardDiv.style.setProperty('--board-l', colorInfo.l + '%');
        boardDiv.style.setProperty('--board-s', '0%'); // Starts 0%
        boardDiv.style.setProperty('--header-text', colorInfo.text);
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'board-header';
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'board-title';
        titleSpan.textContent = setName;

        const statsSpan = document.createElement('span');
        statsSpan.className = 'board-stats';
        statsSpan.id = `board-stats-${setIndex}`;
        statsSpan.textContent = `0 / ${items.length} (0%)`;

        headerDiv.appendChild(titleSpan);
        headerDiv.appendChild(statsSpan);
        
        const listUl = document.createElement('ul');
        listUl.className = 'board-list';

        setObj.items.forEach((item, itemIndex) => {
            const li = document.createElement('li');
            li.id = `slot-${setIndex}-${itemIndex}`;
            li.textContent = item.name; 
            listUl.appendChild(li);
        });

        boardDiv.appendChild(headerDiv);
        boardDiv.appendChild(listUl);
        boardsContainer.appendChild(boardDiv);
    });

    updateScoreboard();
    answerInput.value = '';
    answerInput.disabled = false;
    giveUpBtn.disabled = false;
    testIsActive = true;
    
    setupCard.classList.add('hidden');
    testCard.classList.remove('hidden');
    answerInput.focus();
});

// Testing Input Logic
answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && testIsActive) {
        const attempt = answerInput.value.trim().toLowerCase();
        if (!attempt) return;

        let matchFound = false;

        // Check all sets for matches
        activeTestSets.forEach((set, setIndex) => {
            let setJustGotMatch = false;
            
            set.items.forEach((item, itemIndex) => {
                if (!item.found && item.name.toLowerCase() === attempt) {
                    item.found = true;
                    filledSlots++;
                    matchFound = true;
                    setJustGotMatch = true;

                    const slotEl = document.getElementById(`slot-${setIndex}-${itemIndex}`);
                    slotEl.classList.add('found');
                }
            });
            
            // Update the UI and saturation for this specific board
            if (setJustGotMatch) {
                const setFoundCount = set.items.filter(i => i.found).length;
                const setTotalCount = set.items.length;
                const setPercentage = Math.round((setFoundCount / setTotalCount) * 100);
                
                // Update board stats text
                const boardStatsEl = document.getElementById(`board-stats-${setIndex}`);
                boardStatsEl.textContent = `${setFoundCount} / ${setTotalCount} (${setPercentage}%)`;

                // Calculate saturation (caps at 50% instead of 75/100%)
                const newSaturation = (setFoundCount / setTotalCount) * 50; 
                
                const boardEl = document.getElementById(`board-${setIndex}`);
                boardEl.style.setProperty('--board-s', `${newSaturation}%`);
            }
        });

        if (matchFound) {
            answerInput.value = '';
            updateScoreboard();

            // Check Win Condition
            if (filledSlots === totalSlots) {
                endTest(true);
            }
        } else {
            // Visual feedback for wrong answer
            answerInput.style.borderColor = 'var(--error-color)';
            setTimeout(() => answerInput.style.borderColor = 'var(--border-color)', 500);
        }
    }
});

function updateScoreboard() {
    countFoundEl.textContent = filledSlots;
    countTotalEl.textContent = totalSlots;
    
    const overallPercentage = totalSlots === 0 ? 0 : Math.round((filledSlots / totalSlots) * 100);
    countPercentageEl.textContent = `${overallPercentage}%`;
}

// Give Up Logic
giveUpBtn.addEventListener('click', () => {
    if(testIsActive) endTest(false);
});

function endTest(userWon) {
    testIsActive = false;
    answerInput.disabled = true;
    giveUpBtn.disabled = true;
    
    if (userWon) {
        showStatusMessage("Congratulations! You remembered all of them!", "success");
    } else {
        // Reveal missed items
        activeTestSets.forEach((set, setIndex) => {
            set.items.forEach((item, itemIndex) => {
                if (!item.found) {
                    const slotEl = document.getElementById(`slot-${setIndex}-${itemIndex}`);
                    slotEl.classList.add('missed');
                }
            });
        });
        showStatusMessage("Test ended. The ones you missed are marked in red.", "error");
    }
}

// UI Helpers
function showStatusMessage(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = `status-message ${type}`;
}

function hideStatusMessage() {
    statusMessage.className = 'status-message hidden';
}

// Reset Logic
resetBtn.addEventListener('click', () => {
    testCard.classList.add('hidden');
    setupCard.classList.remove('hidden');
});

// Boot app
init();