let timer;
let timeRemaining = 600;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  document.getElementById('timerDisplay').textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
  const startButton = document.querySelector('.start');

  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = '▶ Start';
  } else {
    isRunning = true;
    startButton.textContent = '⏸ Pause';

    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = '▶ Start';
        document.getElementById('alarmSound')?.play();
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  const minutes = parseInt(document.getElementById('minutesInput').value) || 10;
  timeRemaining = minutes * 60;
  updateTimerDisplay();
  document.querySelector('.start').textContent = '▶ Start';
}

function updateScore(team, delta) {
  const scoreId = `score${team}`;
  const scoreEl = document.getElementById(scoreId);
  let score = parseInt(scoreEl.textContent);
  score = Math.max(0, score + delta);
  scoreEl.textContent = score;
}

window.onload = resetTimer;
