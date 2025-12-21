const gameArea = document.getElementById("game-area");

const scoreEl = document.getElementById("score");
const poppedEl = document.getElementById("popped");
const accuracyEl = document.getElementById("accuracy");
const timeEl = document.getElementById("time");

let score = 0;
let popped = 0;
let clicks = 0;
let startTime = Date.now();

let bubbleInterval = 1200;

// GAME LOOP
function createBubble() {
  const bubble = document.createElement("div");
  const size = Math.random() * 40 + 30;

  bubble.className = "bubble";
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * (window.innerWidth - size)}px`;
  bubble.style.bottom = `-60px`;
  bubble.style.animationDuration = `${Math.random() * 4 + 4}s`;

  bubble.addEventListener("click", () => {
    popped++;
    score += Math.round(100 / size);
    updateStats();
    bubble.remove();
  });

  bubble.addEventListener("animationend", () => {
    bubble.remove();
  });

  gameArea.appendChild(bubble);
}

// CLICK TRACKING
gameArea.addEventListener("click", () => {
  clicks++;
  updateStats();
});

// STATS UPDATE
function updateStats() {
  scoreEl.textContent = score;
  poppedEl.textContent = popped;

  const accuracy = clicks === 0 ? 100 : Math.round((popped / clicks) * 100);
  accuracyEl.textContent = `${accuracy}%`;
}

// TIMER
setInterval(() => {
  timeEl.textContent = Math.floor((Date.now() - startTime) / 1000);
}, 1000);

// DIFFICULTY SCALING
setInterval(() => {
  if (bubbleInterval > 400) bubbleInterval -= 100;
}, 10000);

// SPAWN LOOP
function startGame() {
  setInterval(() => {
    createBubble();
  }, bubbleInterval);
}

startGame();
