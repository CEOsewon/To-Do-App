const clock = document.querySelector(".js-clock");

function getTime() {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  if (minutes < 10) {
    clock.innerText = `${hours}:0${minutes}`;
  } else {
    clock.innerText = `${hours}:${minutes}`;
  }
}

function init() {
  setInterval(getTime, 1000);
}

init();
