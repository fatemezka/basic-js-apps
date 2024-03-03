// DOM & Variables --------------------------------------------
const selectionBtns = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
let yourScore = document.querySelector("[data-your-score]");
let computerScore = document.querySelector("[data-computer-score]");

const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊🏾",
    beats: "scissors", // what does rock beat in battle
  },
  {
    name: "paper",
    emoji: "🤚🏾",
    beats: "rock", // what does paper beat in battle
  },
  {
    name: "scissors",
    emoji: "✌🏾",
    beats: "paper", // what does scissors beat in battle
  },
];

// Event listeners --------------------------------------------
// rock or paper or scissors clicked:
selectionBtns.forEach((selectionBtn) => {
  selectionBtn.addEventListener("click", () => {
    const selectionName = selectionBtn.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    ); // for instance it will be : {name:'rock', emoji:'✊🏾', beats:'scrissors'}
    makeSelection(selection);
  });
});

// Functions --------------------------------------------------
function makeSelection(selection) {
  const computerSelection = randomSelection();
  // check who win:
  const youWin = isWinner(selection, computerSelection);
  const computerWin = isWinner(computerSelection, selection);

  // add the selections after score div to show the previous results:
  addSelectionResult(computerSelection, computerWin);
  addSelectionResult(selection, youWin);

  // increase the score of each winner:
  if (youWin) incrementScore(yourScore);
  if (computerWin) incrementScore(computerScore);
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length); // it will be 0 or 1 or 2
  return SELECTIONS[randomIndex];
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function addSelectionResult(selection, win) {
  const div = document.createElement("div");
  div.innerHTML = selection.emoji;
  div.classList.add("result-selection");
  // if this selection has been win:
  if (win) div.classList.add("winner");
  finalColumn.after(div);
}

function incrementScore(scoreSpan) {
  scoreSpan.innerHTML = parseInt(scoreSpan.innerHTML) + 1;
}
