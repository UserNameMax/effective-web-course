let minBox = document.getElementById("minBox");
let secBox = document.getElementById("secBox");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let resetButton = document.getElementById("resetButton");
let min1 = document.getElementById("min1");
let min5 = document.getElementById("min5");
let min10 = document.getElementById("min10");
let timer;
let audio = new Audio("sound.mp3");

let startTime = localStorage.getItem("startTime") ?? 0;
let time = localStorage.getItem("time") ?? 0;
let state = localStorage.getItem("state") ?? 0;

changeElementsState(true);
printTime();

if (state == 1) {
  startTimer();
}

startButton.onclick = startTimer;
function startTimer() {
  let min = Number(minBox.value);
  let sec = Number(secBox.value);
  if (isNaN(min) || isNaN(sec)) {
    alert("Error");
    return;
  }
  if (min == 0 && sec == 0) return;
  startTime = time = min * 60 + sec;
  timer = setInterval(timerTick, 1000);
  state = 1;
  changeElementsState(false);
}

stopButton.onclick = function (event) {
  clearInterval(timer);
  state = 0;
  startButton.disabled = false;
  stopButton.disabled = true;
};

resetButton.onclick = function (event) {
  clearInterval(timer);
  state = 0;
  changeElementsState(true);
  time = startTime;
  printTime();
  document.body.style.backgroundColor = "#3b5998";
  audio.pause();
  audio.currentTime = 0;
};

min1.onclick = onMinNClick;
min5.onclick = onMinNClick;
min10.onclick = onMinNClick;

function onMinNClick(event) {
  secBox.value = 0;
  switch (event.target) {
    case min1:
      minBox.value = 1;
      break;
    case min5:
      minBox.value = 5;
      break;
    case min10:
      minBox.value = 10;
      break;
  }
}

function timerTick() {
  --time;
  printTime();
  if (time == 0) {
    clearInterval(timer);
    state = 0;
    stopButton.disabled = true;
    document.body.style.backgroundColor = "#ff2b2b";
    audio.play();
  }
}

function changeElementsState(stateEl) {
  minBox.disabled =
    secBox.disabled =
    startButton.disabled =
    min1.disabled =
    min5.disabled =
    min10.disabled =
      !stateEl;
  stopButton.disabled = resetButton.disabled = stateEl;
}

function printTime() {
  minBox.value = Math.floor(time / 60);
  secBox.value = time % 60;
}

window.onunload = function (event) {
  localStorage.setItem("time", time);
  localStorage.setItem("startTime", startTime);
  localStorage.setItem("state", state);
};
