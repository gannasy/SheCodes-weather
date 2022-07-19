let date = new Date();
let defaultCity = "Kyiv";
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let buttonCurrent = document.querySelector("#current");
let searchInput = document.getElementById("search");
let formSearch = document.querySelector(".search-from");
let city = document.querySelector(".city");
let api = "ef83a86d6c6e19e2b4352f1ab9249fd9";
let dateTime = document.getElementById("date-time");
let days = ["Sunday", "Monday", "Tuesday", "Wensday", "Thurthday", "Friday", "Saturday", "Sunday"];
let weatherIcon = document.querySelector("#icon");
let celsius = document.getElementById("celsius");
let faringeit = document.getElementById("faringeit");
let tempValue = null;
let forecast = document.querySelector("#weather-forecast");
let todayLink = document.querySelector("#today");
let tomorrowLink = document.querySelector("#tomorrow");

function formatTime(timestamp) {
    let date = new Date(timestamp);
    console.log(date);
    let day = days[date.getDay()];
    let timeHours = date.getHours();
    if (timeHours < 10) {
        timeHours = `0${timeHours}`;
    }
    let timeMins = date.getMinutes();
    if (timeMins < 10) {
        timeMins = `0${timeMins}`;
    }
    return ` ${day} ${timeHours}:${timeMins}`;
}


//Feature1: Send form for user's choice city
function showTemperature(response) {
    console.log(response);
    tempValue = response.data.main.temp;
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = response.data.main.humidity;
    dateTime.innerHTML = formatTime(response.data.dt * 1000);
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);

    getForecast(response.data.coord);
}

function search(event) {
    event.preventDefault();

    city.innerHTML = searchInput.value;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${api}`).then(showTemperature);
}

formSearch.addEventListener("submit", search);

//Feature2: Convert temperature Celsius/Farengeit
celsius.addEventListener("click", (event) => {
    event.preventDefault();
    temperature.innerHTML = Math.round(tempValue);
    celsius.classList.add("activable");
    faringeit.classList.remove("activable");

})

faringeit.addEventListener("click", (event) => {
    event.preventDefault();
    let farengeitTemp = (tempValue * 9) / 5 + 32;
    temperature.innerHTML = Math.round(farengeitTemp);
    celsius.classList.remove("activable");
    faringeit.classList.add("activable");
});

function getForecast(coords) {

    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${api}&units=metric`;
    axios.get(url)
        .then(displayforecast);

}
function formatDayForecast(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mn", "Tu", "Wn", "Th", "Fr", "Sat"];

    return days[day];
}

function displayforecast(response) {
    console.log(response);
    let forecastAPI = response.data.daily;
    console.log(forecastAPI);
    let forecastHTML = `<div class="row">`;
    //let days = ["Thu", "Fri", "Sat", "Sun", "Mn", "Tu"];
    forecastAPI.forEach(function (day, index) {
        if (index < 5) {
            forecastHTML = forecastHTML +
                `<div class="col-2">
            <div class="weather-forecast-date">${formatDayForecast(day.dt)}</div>

            <img
                src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png"
                alt=""
                width="42"
            />
            <div class="weather-forecast-temperature">
                <span class="temp-max">${Math.round(day.temp.max)}°</span>
                
            </div >
        </div >
            `;
        }
    })


    forecastHTML = forecastHTML + "</div>"
    forecast.innerHTML = forecastHTML;
}

function displayTomorrowWeather(response) {
    console.log(response);
    tempValue = response.data.main.temp;
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = response.data.main.humidity;
    dateTime.innerHTML = formatTime(response.data.dt * 1000);
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);
}

function getCurrentCityCoords(response) {
    let coords = response.data.coord;
    console.log(coords);
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${api}&units=metric`).then(showTomorrowData);

}


document.addEventListener('DOMContentLoaded', function () {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${api}`).then(showTemperature);
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=50.4333&lon=30.5167&appid=${api}`).then(displayforecast);
})
