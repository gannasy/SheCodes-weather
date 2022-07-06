let date = new Date();
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let buttonCurrent = document.querySelector("#current");
let searchInput = document.getElementById("search");
let formSearch = document.querySelector(".search-from");
let city = document.querySelector(".city");
let api = "ef83a86d6c6e19e2b4352f1ab9249fd9";
let dateTime = document.getElementById("date-time");
let days = ["Sunday", "Monday", "Tuesday", "Wensday", "Thurthday", "Friday", "Saturday", "Sunday"];
let day = days[date.getDay()];
let timeHours = date.getHours();
let timeMins = date.getMinutes();
let celsius = document.getElementById("celsius");
let faringeit = document.getElementById("faringeit");
if (timeMins < 10) {
    timeMins = `0${timeMins}`;
}

dateTime.innerHTML = ` ${day} ${timeHours}:${timeMins}`;

//Feature1: Send form for user's choice city
function showTemperature(response) {
    console.log(response);
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = response.data.main.humidity;
}

formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    city.innerHTML = searchInput.value;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${api}`).then(showTemperature);

})
//Feature2: Convert temperature Celsius/Farengeit
celsius.addEventListener("click", (event) => {
    event.preventDefault();
    temperature.innerHTML = 19;
})

faringeit.addEventListener("click", (event) => {
    event.preventDefault();
    temperature.innerHTML = 66;
});
//Feature3: Show weather for Current city
function showWeatherCurrentCity(response) {
    console.log(response);
    city.innerHTML = response.data.name;
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = response.data.main.humidity;
}

function getCurrentPosition(response) {
    console.log(response);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&units=metric&appid=${api}`)
        .then(showWeatherCurrentCity);
}

function getPosition() {
    navigator.geolocation.getCurrentPosition(getCurrentPosition);

}
buttonCurrent.addEventListener("click", (event) => {
    event.preventDefault();
    getPosition();
});