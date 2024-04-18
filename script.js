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

// Function to shuffle the cards array
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Shuffling the cards array
shuffleCards(cards);

// Creating the card elements with the shuffled cards
const cardElements = cards.map(
  (card) => `
    <span class="material-symbols-outlined"> ${card} </span>
  `
);

// Put the card on the page
cardElements.forEach((element) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = element;
  container.appendChild(div);
});
