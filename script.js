let score = 0;
let clickPower = 1;
let clickCost = 10;
let autoClickerCost = 100;
let autoClickerActive = false;

const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('click-button');
const upgradeClickButton = document.getElementById('upgrade-click');
const autoClickerButton = document.getElementById('auto-clicker');
const achievementsList = document.getElementById('achievements-list');
const clickSound = document.getElementById('click-sound');

const achievements = [
    { id: 'achievement-100', text: 'Reach 100 points', target: 100, unlocked: false },
    { id: 'achievement-500', text: 'Reach 500 points', target: 500, unlocked: false },
    { id: 'achievement-1000', text: 'Reach 1000 points', target: 1000, unlocked: false }
];

clickButton.addEventListener('click', () => {
    score += clickPower;
    updateScore();
    playClickSound();
    checkAchievements();
    showFloatingScore("+1");
});

upgradeClickButton.addEventListener('click', () => {
    if (score >= clickCost) {
        score -= clickCost;
        clickPower++;
        clickCost *= 2;
        updateScore();
    }
});

autoClickerButton.addEventListener('click', () => {
    if (score >= autoClickerCost && !autoClickerActive) {
        score -= autoClickerCost;
        autoClickerActive = true;
        autoClickerButton.disabled = true;
        updateScore();
        startAutoClicker();
    }
});

function updateScore() {
    scoreDisplay.textContent = score;
    scoreDisplay.classList.add('pop');
    setTimeout(() => {
        scoreDisplay.classList.remove('pop');
    }, 300);
}

function checkAchievements() {
    achievements.forEach(achievement => {
        if (score >= achievement.target && !achievement.unlocked) {
            achievement.unlocked = true;
            addAchievement(achievement.text, achievement.id);
            showAchievementPopup(achievement.text);
        }
    });
}

function addAchievement(text, id) {
    const achievementItem = document.createElement('li');
    achievementItem.id = id;
    achievementItem.innerHTML = `
        <div>${text}</div>
        <div class="achievement-progress">
            <div class="achievement-progress-bar" style="width: 100%;"></div>
        </div>
    `;
    achievementsList.appendChild(achievementItem);
}

function showAchievementPopup(text) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.textContent = `Achievement Unlocked: ${text}`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 500);
        }, 3000);
    }, 100);
}

function startAutoClicker() {
    setInterval(() => {
        score += clickPower;
        updateScore();
        checkAchievements();
    }, 1000);
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function showFloatingScore(text) {
    const floatingText = document.createElement('span');
    floatingText.textContent = text;
    floatingText.className = 'floating-text';
    document.body.appendChild(floatingText);

    const clickButtonRect = clickButton.getBoundingClientRect();
    floatingText.style.left = `${clickButtonRect.left + clickButtonRect.width / 2}px`;
    floatingText.style.top = `${clickButtonRect.top}px`;

    setTimeout(() => {
        floatingText.remove();
    }, 1000);
}
