// Dom & Variables-------------------------------------
const selectMenu = document.querySelectorAll("select");
let timeShow = document.querySelector("h1");
let setAlarmBtn = document.querySelector("button");
let content = document.querySelector(".content");

let alarmTime;
let isAlarmSet = false;
let ringtone = new Audio("./audios/ringtone.mp3");

// Set options for each select hours
for (i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
// Set options for each select minutes
for (i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
// Set options for each select PM/AM
for (i = 2; i > 0; i--) {
  let amPm = i == 1 ? "AM" : "PM";
  let option = `<option value="${amPm}">${amPm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Event listeners-------------------------------------
setAlarmBtn.addEventListener("click", setAlarm);

// Funtions & Operations-------------------------------

// Show the current time
setInterval(() => {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let amPm = "AM";
  // set timer to PM if it's after 12
  if (h >= 12) {
    h -= 12;
    amPm = "PM";
  }
  // if hour value is 0, set it to 12
  h = h == 0 ? 12 : h;
  // format digits : adding 0 before the hour or minute or second if the are less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeShow.innerText = `${h}:${m}:${s} ${amPm}`;

  if (alarmTime == `${h}:${m} ${amPm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

// To set alarm at that specific time
function setAlarm() {
  if (isAlarmSet) {
    // if isAlarmSet is true
    alarmTime = ""; // clear the value of alarmTime
    ringtone.pause(); // pause the ringtone
    content.classList.remove("disable");
    setAlarmBtn.innerHTML = "Set Alarm";
    return (isAlarmSet = false); // return isAlarmSet value to flase
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`; // for example: 09:18 PM

  // if user doesn't choose correct time to set alarm
  if (
    time.includes("hour") ||
    time.includes("minute") ||
    time.includes("am/pm")
  ) {
    return alert("Please select a valid time to set Alarm!");
  }

  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerHTML = "Clear Alarm";
}
