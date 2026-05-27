var id;
let sessionNum = 0;
const circle = document.querySelector("svg circle");
const circleText = document.querySelector("svg text");
const startButton = document.querySelector(".start");
const sessionTime = 25;
const shortBreakTime = 5;
const longBreakTime = 15;
var started = false;
function session() {
  playSound("focusTime");
  update(sessionTime, "gold");
  time(sessionTime, "work");
}
const start = document.querySelector(".start");
start.addEventListener("click", function () {
  sessionNum = 1;
  if (!circle.classList.contains("start-animation")) {
    circle.classList.add("start-animation");

    session();
  }
});

const r = document.querySelector(".reset");
r.addEventListener("click", function () {
  circle.classList.remove("start-animation");
  circleText.textContent = "25:00";
  started = false;
  reset();
});

function reset() {
  clearInterval(id);

  void circle.offsetWidth;
  circle.style.strokeDashoffset = "0";
  circle.style.strokeDasharray = "1260";
  circle.style.setProperty("--strokeIncrement", "1");
  circle.style.setProperty("--strokeCalc", "0");
  sessionNum = 0;
}

function shortBreak() {
  playSound("breakTime");

  update(shortBreakTime, "lightgreen");
  time(shortBreakTime, "shortBreak");
}
function longBreak() {
  playSound("breakTime");

  update(longBreakTime, "cyan");
  time(longBreakTime, "longBreak");
}

function time(mins, type) {
  clearInterval(id);
  if (started) {
    return;
  }
  started = true;
  var millMins = mins * 60;
  const targetTime = new Date().getTime() + millMins * 1000;
  id = setInterval(function () {
    const currentTime = new Date().getTime();
    const distance = targetTime - currentTime;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
    var secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (distance < 0) {
      clearInterval(id);

      started = false;
      if (type === "work") {
        if (sessionNum === 4) longBreak();
        else shortBreak();
        ++sessionNum;
        sessionNum %= 5;
      } else {
        session();
      }
      return;
      //add voice time to break
    }
    circleText.textContent = `${minutesText}:${secondsText}`;
  }, 500);
}
function update(mins, color) {
  circle.classList.remove("start-animation");
  circle.style.setProperty("--current-color", color);
  startButton.style.setProperty("--current-color", color);
  void circle.offsetWidth;
  var millMins = mins * 60;
  circle.style.animationDuration = `${millMins}s`;
  circle.style.strokeDashoffset = "0";
  circle.style.strokeDasharray = "1260";
  circle.style.setProperty("--strokeIncrement", "1");
  circle.style.setProperty("--strokeCalc", "0");
  circleText.textContent = `${mins}:00`;
  setTimeout(() => circle.classList.add("start-animation"), 15);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
