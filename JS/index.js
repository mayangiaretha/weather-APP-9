

document.addEventListener('DOMContentLoaded', async function () {
  const input = document.querySelector('#cityInput');
  const button = document.querySelector('#Btn');


  async function submitButton(event) {
    event.preventDefault();

    const inputValue = input.value;
    const apiKey = "597c40c39084687093b091cd48b366f8";

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      updateWeatherDisplay(data);

    } catch (error) {
      console.error('Error fetching weather data:', error);
      weatherData.innerHTML = `<div class="not-found">
      <img src="./assets/3828537.jpg" alt="" width="100px">
      <h4 style="color:red">City not found!, please enter correct city</h4>
      </div>`;

    }
  }

  button.addEventListener('click', submitButton);

  // Default weather display for a specific city 
  const defaultCity = "Benin";
  const defaultWeather = await fetchWeatherData(defaultCity);
  updateWeatherDisplay(defaultWeather);


  async function fetchWeatherData(city) {
    const apiKey = "597c40c39084687093b091cd48b366f8";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data; // Return the entire data object
  }

  function updateWeatherDisplay(data) {
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    document.querySelector('.icon').src = iconUrl;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "℃";

    document.querySelector('.humidity').innerHTML = `<i class="fa-solid fa-water"></i> Humidity: ${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${data.wind.speed} km/h`;
  }

});