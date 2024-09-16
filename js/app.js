let yearsElement = document.getElementById("years");
let hoursElement = document.getElementById("hours");
let dateChoosen = document.getElementById("dateChoosen");
let minutesElement = document.getElementById("minutes");
let dateElement = document.getElementById("date");
let timeElement = document.getElementById("time");
let secondsElement = document.getElementById("seconds");
let daysElement = document.getElementById("days");
let saveBtn = document.querySelector(".submit-button");
let reset = document.querySelector(".reset");

// let dateOne = new Date("04 07 2025").getTime();

let dateOne;
window.onload = function () {
  if (localStorage.getItem("dateTarget")) {
    dateOne = new Date(localStorage.getItem("dateTarget"));
    updateDateChoosen();
  } else {
    dateOne = new Date();
    dateChoosen.textContent = "";
  }
};

function updateDateChoosen() {
  let date = localStorage.getItem("dateTarget");
  dateChoosen.textContent = date;

  dateElement.value = date.split(" ")[0];
  timeElement.value = date.split(" ")[1];
}

saveBtn.onclick = function () {
  if (dateElement.value != "") {
    let allDate = `${dateElement.value} ${timeElement.value}`;
    localStorage.setItem("dateTarget", allDate);
    updateDateChoosen();
    dateOne = new Date(allDate);
  }
};

let counter = setInterval(() => {
  let dateTwo = new Date();

  dateTwo - dateOne < 0
    ? (diffDate = dateOne - dateTwo)
    : (diffDate = dateTwo - dateOne);

  let years = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 365.25));
  // let days = Math.floor(diffDate / (1000 * 60 * 60 * 24));
  let days = Math.floor((diffDate / (1000 * 60 * 60 * 24)) % 365.25);
  let hours = Math.floor((diffDate % (1000 * 60 * 60 * 24)) / 1000 / 60 / 60);
  let minutes = Math.floor((diffDate % (1000 * 60 * 60)) / 1000 / 60);
  let seconds = Math.floor((diffDate % (1000 * 60)) / 1000);

  years < 10 ? (years = "0" + years) : (years = years);
  days < 10 ? (days = "0" + days) : (days = days);
  hours < 10 ? (hours = "0" + hours) : (hours = hours);
  minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);
  seconds < 10 ? (seconds = "0" + seconds) : (seconds = seconds);

  yearsElement.textContent = years;
  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}, 900);

reset.onclick = function () {
  dateElement.value = "";
  timeElement.value = "";
  saveBtn.click();
  dateOne = new Date();
  localStorage.removeItem("dateTarget");
  dateChoosen.textContent = "";
};
