const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "9af412d8f9d5aa7c7eae80620fb9a0f0";

// const iconApi = fetch("http://openweathermap.org/img/w/" + iconName + ".png");
// const icon = json.weather[0].icon;

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = Math.floor(json.main.temp);
      const place = json.name;
      const icon = json.weather[0].icon;
      const image = new Image();
      image.src = `icons/${icon}.png`;
      weather.innerText = `${temp}°C ${place}`;
      weather.appendChild(image);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {
  console.log(`Can't access geo location`);
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
