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

let selectedCard = null;

let matchedPairs = 0;

// Function to shuffle the cards array
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Show end game dialog
function showCongratulations() {
  const dialog = document.getElementById("dialog");
  dialog.style.display = "flex";
}

// Start game
const startGame = () => {
  // Shuffling the cards array
  shuffleCards(cards);

  // Creating the card elements with the shuffled cards
  const cardElements = cards.map(
    (card) => `
    <div class="inner">
      <div class="front">
        <div class="material-symbols-outlined"> ${card} </div>
      </div>
      <div class="back">
      </div>
    </div>
  `
  );

  // Put the card on the page
  cardElements.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.addEventListener("click", (event) => {
      // Check if card is visible
      const isVisible = event.target.classList.contains("visible");
      if (!isVisible) {
        event.target.classList.add("visible");
        // Check if first card selected
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
            if (matchedPairs == 8) {
              showCongratulations();
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
    });
    div.innerHTML = element;
    container.appendChild(div);
  });
};

// Restart game
const restartGame = () => {
  const dialog = document.getElementById("dialog");
  dialog.style.display = "none";
  container.innerHTML = "";
  selectedCard = null;
  matchedPairs = 0;
  startGame();
};

startGame();
