const gameArea = document.getElementById("gameArea");
const target = document.getElementById("target");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const message = document.getElementById("message");

let score = 0;
let timeLeft = 30;
let timer = null;
let playing = false;

const savedBest = Number(localStorage.getItem("tapTargetBest") || 0);
bestEl.textContent = savedBest;

function moveTarget() {
  const areaRect = gameArea.getBoundingClientRect();
  const size = Math.max(42, 64 - Math.floor(score / 5) * 3);

  target.style.width = size + "px";
  target.style.height = size + "px";

  const maxX = areaRect.width - size;
  const maxY = areaRect.height - size;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  target.style.left = x + "px";
  target.style.top = y + "px";
}

function startGame() {
  clearInterval(timer);

  score = 0;
  timeLeft = 30;
  playing = true;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  message.style.display = "none";
  target.style.display = "block";
  startBtn.textContent = "RESTART";

  moveTarget();

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  playing = false;

  target.style.display = "none";
  message.style.display = "grid";
  message.textContent = `⏰ Time up! Your score: ${score}`;

  const best = Number(localStorage.getItem("tapTargetBest") || 0);

  if (score > best) {
    localStorage.setItem("tapTargetBest", score);
    bestEl.textContent = score;
    message.textContent = `🏆 New Best! Score: ${score}`;
  }
}

target.addEventListener("click", () => {
  if (!playing) return;

  score++;
  scoreEl.textContent = score;

  moveTarget();
});

startBtn.addEventListener("click", startGame);
