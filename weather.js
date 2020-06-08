const weather = document.querySelector(".js-weather");
const API_KEY = "87d687f22962e11ab6277450dfbf6d6a";
const COORDS = "coords";

function getWeather(lat, lng) {
  //api 데이터 가져오기
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&lang={en}&units=metric`
  ).then(function(response){
    //   console.log(response.json());
    return response.json();
  }).then(function(json){
    //console.log(json);
    const temperature = Math.round(json.main.temp);
    const place = json.name;
    weather.innerText = `온도 : ${temperature} @ 지역 : ${place}`;
  });
  //then() : data가 들어온후 ()함수 호출
  //끝나길 기다리는 함수
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  //위도, 경도 읽기
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
    // latitude : latitude,
    // longitude : longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(position) {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    //   console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
