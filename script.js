const cards = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h"
  ];
  
  // Function to shuffle the cards array
  function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

  }
  
  // Shuffling the cards array
  const shuffledCards = shuffleCards(cards);
  
  // Creating the card elements with the shuffled cards
  const cardElements = shuffledCards.map(card => `
    <div class="card">
      <img src="${card}" />
    </div>
  `);