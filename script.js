const brainStructures = [
  { name: 'Amygdala', function: 'processing and regulating emotional reactions' },
  { name: 'Brain Stem', function: 'regulates vital cardiac and respiratory functions and acts as a vehicle for sensory information' },
  { name: "Broca's Area", function: 'controls motor functions involved with speech production, such as forming words' },
  { name: 'Cerebellum', function: 'active in the coordination, precision and timing of movements, as well as in motor learning' },
  { name: 'Cerebral Cortex', function: "outer layer of the brain's cerebral hemispheres that is involved with information processing activities such as perception, language, learning, memory, thinking, and problem solving" },
  { name: 'Cerebrum', function: 'responsible for thinking, perceiving, producing and understanding language' },
  { name: 'Corpus Callosum', function: 'thick set of nerve tissues dividing the brain into two halves (connects 2 halves)' },
  { name: 'Frontal Lobe', function: 'controls movement, decision-making, problem solving, and planning' },
  { name: 'Hippocampus', function: 'formation of memories' },
  { name: 'Hypothalamus', function: 'controls rage, pleasure, thirst, and sexual desire' },
  { name: 'Medulla', function: 'involuntary functions' },
  { name: 'Occipital Lobe', function: 'creates associations with visual information' },
  { name: 'Parietal Lobe', function: 'receives and processes sensory information from the body and other sensory areas in the brain' },
  { name: 'Pituitary Gland', function: 'produces hormones that affect other glands and specific organs of the body' },
  { name: 'Primary Auditory Cortex', function: 'receives and processes sounds from both ears so that we can perceive and identify different types of sounds' },
  { name: 'Primary Motor Cortex', function: 'voluntary muscle movements' },
  { name: 'Reticular Formation', function: 'pattern generator (eye movements, chewing, posture, locomotion, swallowing, coughing, micturition), respiratory control, cardiovascular control, sleeping and wakefulness control, sensory modulation' },
  { name: 'Somatosensory Cortex', function: 'receives and processes sensory information such as touch, pressure, temperature and pain' },
  { name: 'Temporal Lobe', function: 'Processes sound from ears (i.e. sound waves are processed by ears --> neural impulses --> interpreted by auditory cortices).' },
  { name: 'Thalamus', function: 'receives sensory information from other areas of the nervous system and sends this information to the cerebral cortex' },
  //{ name: "Wernicke's Area", function: 'controls the understanding of speech and language' }
];
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById(`reset`)
const functionDisplay = document.getElementById('function-display');

let cards = [];

startButton.addEventListener('click', startGame);
resetButton.addEventListener(`click`, clearGame)

function startGame() {
  hideFunctionDisplay();
  clearGame();
  createCards();
  shuffleCards();
  displayCards();
  startButton.innerHTML = `Shuffle`;
  resetButton.style.display = "inline-block";
  resetButton.innerHTML = `Reset Game`;
}
function clearGame() {
  cards = [];
  gameContainer.innerHTML = '';
  resetButton.style.display = "none";
  startButton.innerHTML = `Start Game`;
  functionDisplay.style.display = `none`;
  functionDisplay.innerHTML = ``;
}
function createCards() {
  for (let i = 0; i < brainStructures.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = brainStructures[i].name;
    card.dataset.function = brainStructures[i].function;
    card.addEventListener('click', flipCard);
    cards.push(card);
  }
}
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}
function displayCards() {
  cards.forEach(card => {
    gameContainer.appendChild(card);
  });
}
let flippedCards = [];
let lockBoard = false;
function flipCard() {
  if (lockBoard) return;
  if (this === flippedCards[0]) return;
  this.classList.add('flip');
  displayFunction(this);
  functionDisplay.style.display = `block`;

  if (flippedCards.length === 0) {
    flippedCards[0] = this;
  } else if (flippedCards.length === 1) {
    flippedCards[1] = this;
    checkForMatch();
  }
}
function displayFunction(card) {
  functionDisplay.textContent = card.dataset.function;
  functionDisplay.classList.add('show');
}
function hideFunctionDisplay() {
  functionDisplay.classList.remove('show');
}
function checkForMatch() {
  if (flippedCards[0].textContent === flippedCards[1].textContent) {
    disableCards();
  } else {
    unflipCards();
  }
}
function disableCards() {
  flippedCards[0].classList.add('matched');
  flippedCards[1].classList.add('matched');
  flippedCards = [];
  if (document.querySelectorAll('.matched').length === cards.length) {
    setTimeout(() => alert('Congratulations! You won!'), 500);
  }
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    flippedCards[0].classList.remove('flip');
    flippedCards[1].classList.remove('flip');
    flippedCards = [];
    lockBoard = false;
  }, 1000);
} 

