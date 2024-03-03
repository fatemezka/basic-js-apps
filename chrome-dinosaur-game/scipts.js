// DOM
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const gameOver = document.getElementById("game-over");
const timeScore = document.querySelector("#time-score");
// const showScore = document.querySelector("#show-score");
const container = document.querySelector(".container");
timeScore.innerHTML = "0000";

// Event listeners
window.addEventListener("keydown", function (e) {
  if (dino.classList != "jump" && e.key == " ") {
    jump();
    setTimeout(() => {
      removeJump();
    }, 300);
  }
});

setInterval(() => {
  collision();
}, 10);

timeIntervalId = setInterval(() => {
  addOne(timeScore);
}, 1000);

// Functions
function jump() {
  dino.classList.add("jump");
}

function removeJump() {
  dino.classList.remove("jump");
}

function displayGameOver() {
  gameOver.style.display = "block";
  // showScore.style.display = "block";
  cactus.style.animationPlayState = "paused";
}

function collision() {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cacLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("left")
  );
  if (dinoTop > 110 && cacLeft > 0 && cacLeft < 60) {
    clearInterval(timeIntervalId);
    displayGameOver();
  }
}

function addOne(elem) {
  val = parseInt(elem.innerHTML) + 1;
  if (val % 10 == val) {
    val = "000" + val;
  } else if (val % 100 == val) {
    val = "00" + val;
  } else if (val % 1000 == val) {
    val = "0" + val;
  }
  elem.innerHTML = val;
}
