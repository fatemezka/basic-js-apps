//DOM
let cells = document.querySelectorAll(".game--container > div");
let turnStatus = document.querySelector(".game--status");
let restartBtn = document.querySelector(".game--restart");

// let cells = $(".game--container > div")
// let turnStatus = $(".game--status")

// Initial values:
let currentTurn = "X";
turnStatus.innerHTML = `It's ${currentTurn}'s turn`;
let cellsResult = Array(9).fill("");

// Funtions
function changeTurn() {
  currentTurn = currentTurn === "X" ? "O" : "X";
}

function restartGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  cellsResult = Array(9).fill("");
  currentTurn = "X";
  turnStatus.innerHTML = `It's ${currentTurn}'s turn`;
}

function checkTheCells(arr, turn) {
  let res = false;
  let turns = turn.repeat(3);
  switch (turns) {
    case arr[0] + arr[1] + arr[2]:
      res = true;
      break;
    case arr[3] + arr[4] + arr[5]:
      res = true;
      break;
    case arr[6] + arr[7] + arr[8]:
      res = true;
      break;
    case arr[0] + arr[3] + arr[6]:
      res = true;
      break;
    case arr[1] + arr[4] + arr[7]:
      res = true;
      break;
    case arr[2] + arr[5] + arr[8]:
      res = true;
      break;
    case arr[0] + arr[4] + arr[8]:
      res = true;
      break;
    case arr[2] + arr[4] + arr[6]:
      res = true;
      break;
    default:
      break;
  }
  return res;
}

// Events:
cells.forEach((cell, index) => {
  // change the content of each cell onclick event
  cell.addEventListener("click", (e) => {
    if (cell.innerHTML === "") {
      //change the innerHTML of that cell to X or O
      cell.innerHTML = currentTurn;

      // put that X or O in result array
      cellsResult[index] = currentTurn;

      changeTurn();

      // check 4 situation for each move:
      if (checkTheCells(cellsResult, "X")) {
        // 1. X won the game
        turnStatus.innerHTML = `Player X has won!`;
      } else if (checkTheCells(cellsResult, "O")) {
        // 2. O won the game
        turnStatus.innerHTML = `Player O has won!`;
      } else if (
        // 3. there is still no winner
        !checkTheCells(cellsResult, "O") &&
        !checkTheCells(cellsResult, "X") &&
        cellsResult.includes("")
      ) {
        turnStatus.innerHTML = `It's ${currentTurn}'s turn`;
      } else {
        // 4. game ended with no winner
        turnStatus.innerHTML = "Game ended in a draw";
      }
    }
  });
});

restartBtn.addEventListener("click", restartGame);
