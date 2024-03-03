// DOM-------------------------------------------------
const time_show = document.querySelector(".watch .time");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

// Variables--------------------------------------------
let seconds = 0;
let interval = null;

// Event listeners--------------------------------------
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

// Functions--------------------------------------------
function timer() {
  seconds++;
  // format our time
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  let secs = seconds % 60;

  if (secs < 10) secs = "0" + secs;
  if (minutes < 10) minutes = "0" + minutes;
  if (hours < 10) hours = "0" + hours;

  time_show.innerHTML = `${hours}:${minutes}:${secs}`;
}

function start() {
  if (interval) {
    return;
  }
  interval = setInterval(timer, 1000);
}

function stop() {
  clearInterval(interval);
  interval = null;
}

function reset() {
  stop();
  seconds = 0;
  time_show.innerText = "00:00:00";
}
