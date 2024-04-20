// JavaScript code

const cards = [
  "done_outline",
  "expand_circle_down",
  "download_2",
  "highlight_text_cursor",
  "arrows_outward",
  "all_match",
  "left_panel_open",
  "clock_loader_90",
  "done_outline",
  "expand_circle_down",
  "download_2",
  "highlight_text_cursor",
  "arrows_outward",
  "all_match",
  "left_panel_open",
  "clock_loader_90",
];

const container = document.querySelector(".container");
const timerDisplay = document.createElement("div");
const timerButtons = document.createElement("button");
let selectedCard = null;
let matchedPairs = 0;
let gameTimer;
let secondsLeft = 60; // Initial time
let gamePaused = false; // Variable to track game pause state

// Function to shuffle the cards array
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Update timer display
function updateTimerDisplay() {
  timerDisplay.textContent = `${secondsLeft}s`;
}

// Start game
const startGame = () => {
  clearInterval(gameTimer); // Clear previous timer
  secondsLeft = 60; // Reset time
  updateTimerDisplay(); // Update timer display
  shuffleCards(cards);
  container.innerHTML = "";
  matchedPairs = 0;
  selectedCard = null;
  gamePaused = false; // Reset game pause state
  gameTimer = setInterval(() => {
    if (!gamePaused) {
      secondsLeft--;
      updateTimerDisplay();
      if (secondsLeft === 0) {
        clearInterval(gameTimer);
        showGameOverDialog();
      }
    }
  }, 1000);

  // Creating the card elements with the shuffled cards
  const cardElements = cards.map(
    (card) => `
    <div class="inner">
      <div class="front">
        <div class="material-symbols-outlined">${card}</div>
      </div>
      <div class="back"></div>
    </div>
  `
  );

  // Put the card on the page
  cardElements.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.addEventListener("click", (event) => {
      if (!gamePaused) {
        const isVisible = event.target.classList.contains("visible");
        if (!isVisible) {
          event.target.classList.add("visible");
          if (selectedCard) {
            const currentSymbol = event.target.querySelector(
              ".material-symbols-outlined"
            ).innerHTML;
            const previousSymbol = selectedCard.querySelector(
              ".material-symbols-outlined"
            ).innerHTML;
            if (currentSymbol === previousSymbol) {
              matchedPairs++;
              selectedCard = null;
              if (matchedPairs === 8) {
                clearInterval(gameTimer);
                showCongratulationsDialog();
              }
              return;
            } else {
              setTimeout(() => {
                event.target.classList.remove("visible");
                selectedCard.classList.remove("visible");
                selectedCard = null;
              }, 800);
            }
          } else {
            selectedCard = event.target;
          }
        }
      }
    });
    div.innerHTML = element;
    container.appendChild(div);
  });
};

// Restart game
const restartGame = () => {
  hideDialog();
  startGame();
};

// Pause or play the game
const toggleGamePause = () => {
  if (gamePaused) {
    gamePaused = false;
    timerButtons.textContent = "Pause";
    playTimer();
  } else {
    gamePaused = true;
    timerButtons.textContent = "Play";
    pauseTimer();
  }
};

// Pause timer
function pauseTimer() {
  clearInterval(gameTimer);
}

// Play timer
function playTimer() {
  gameTimer = setInterval(() => {
    if (!gamePaused) {
      secondsLeft--;
      updateTimerDisplay();
      if (secondsLeft === 0) {
        clearInterval(gameTimer);
        showGameOverDialog();
      }
    }
  }, 1000);
}

// Show dialog for game over
function showGameOverDialog() {
  const dialog = document.getElementById("dialog");
  dialog.innerHTML = `
    <div class="dialog-content">
      <h2>Désolé, vous n'avez pas été assez rapide !</h2>
      <button onclick="restartGame()">Recommencer</button>
    </div>
  `;
  dialog.style.display = "flex";
}

// Show dialog for congratulations
function showCongratulationsDialog() {
  const timeElapsed = 60 - secondsLeft; // Calculate time elapsed
  const dialog = document.getElementById("dialog");
  dialog.innerHTML = `
    <div class="dialog-content">
      <h2>Félicitations, vous avez gagné en un temps record de ${timeElapsed} secondes !</h2>
      <button onclick="restartGame()">Recommencer</button>
    </div>
  `;
  dialog.style.display = "flex";
}

// Hide dialog
function hideDialog() {
  const dialog = document.getElementById("dialog");
  dialog.style.display = "none";
}

// Initialize game
startGame();
timerDisplay.classList.add("timer-display");
timerButtons.textContent = "Pause";
timerButtons.addEventListener("click", toggleGamePause);
document.body.prepend(timerDisplay, timerButtons);
