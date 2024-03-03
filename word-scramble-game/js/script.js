// DOMs
let scramWord = document.querySelector(".word");
let input = document.querySelector("input");
let hint = document.querySelector(".hint > span");
let time = document.querySelector("b");
let refreshBtn = document.querySelector(".refresh-word");
let checkBtn = document.querySelector(".check-word");

let RESULT;
let intervalId;
// FUNCTIONs
const initGame = () => {
  timeCounter();
  let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random obj from words
  let wordArr = randomObj.word.split(""); // splitting each letter of random word
  let shuffleWord = wordArr.sort(() => Math.random() - 0.5); // shuffle word
  scramWord.innerHTML = shuffleWord.join("");
  hint.innerHTML = randomObj.hint;
  RESULT = randomObj.word;
  console.log(randomObj);
};

function checkWord() {
  if (input.value === RESULT) {
    alert("Oh yes, That's correct👏🏽");
    refreshWord();
  } else if (input.value === "") {
    alert("Please type an answer.");
  } else {
    alert("Oops that's wrong!🤦‍♀️ \ntry again");
  }
}

function refreshWord() {
  input.value = "";
  initGame();
  timeCounter();
}

function timeCounter() {
  clearInterval(intervalId);
  time.innerHTML = 40;
  intervalId = setInterval(() => {
    let t = parseInt(time.innerHTML) - 1;
    if (t >= 0) {
      time.innerHTML = t;
    } else {
      refreshWord();
    }
  }, 1000);
}

// EVENT LISTENERs
addEventListener("load", initGame);

refreshBtn.addEventListener("click", refreshWord);
checkBtn.addEventListener("click", checkWord);
