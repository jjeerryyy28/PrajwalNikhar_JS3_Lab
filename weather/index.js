"use strict";
const apiKey = "9252bff3cc2156610e0ddbebdfaeba5a";
document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherInfo = document.getElementById("weatherInfo");
    getWeatherBtn.addEventListener("click", () => {
        const city = cityInput.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            if (data.cod === 200) {
                const cityName = data.name;
                const countryName = data.sys.country;
                const temperature = data.main.temp;
                const minTemperature = data.main.temp_min;
                const maxTemperature = data.main.temp_max;
                const description = data.weather[0].description;
                const upperCaseDescription = description.toUpperCase();
                // Get current day and date
                const currentDate = new Date();
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = currentDate.toLocaleDateString(undefined, options);
                const weatherInfoText = `<h1 class="city-country">${cityName}, ${countryName}</h1>
                    <h4 class="date">${formattedDate}</h4>
                    <br><br>
                    <p class="temp temp-size">${temperature} °C</p>
                    <p class="description desc-size">${upperCaseDescription}</p>
                    <p class="min-max-temperature mm-size">${minTemperature} °C / ${maxTemperature} °C</p>`;
                weatherInfo.innerHTML = weatherInfoText;
            }
            else {
                weatherInfo.textContent = "City not found or API error.";
            }
        })
            .catch((error) => {
            weatherInfo.textContent = "Error fetching data. Check your internet connection.";
        });
    });
});
