

// document.addEventListener('DOMContentLoaded', function () {
//   const input = document.querySelector('#cityInput');
//   const button = document.querySelector('#Btn');


//   async function submitButton(city) {
//     // event.preventDefault();

//     const inputValue = input.value;


//     const apiKey = "597c40c39084687093b091cd48b366f8";
//     // const city = inputValue;

//     try {
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`);
//       const data = await response.json();
//       console.log(data, "this is the data===============>")
//       const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;


//       //     const weatherDataContainer = document.getElementById('weatherData');
//       //     weatherDataContainer.innerHTML = `
//       //       <h2>${data.name}, ${data.sys.country}</h2>
//       //  <p>Temperature: ${Math.round(data.main.temp)}°C</p>
//       //       <p>Weather: ${data.weather[0].description}</p>
//       //       <img src="${iconUrl}" alt="Weather Icon">


//       //     `;
//       document.querySelector('.city').innerHTML = data.name;
//       document.querySelector('.temp').innerHTML = Math, round(data.main.temp) + "℃";
//       document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
//       document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   }

//   // button.addEventListener('click', submitButton);
//   button.addEventListener('click', () => {
//     submitButton(input.value)
//   });
// });



// 

document.addEventListener('DOMContentLoaded', async function () {
  const input = document.querySelector('#cityInput');
  const button = document.querySelector('#Btn');
  // const weatherData = document.querySelector('#weatherData')
  // const error404 = document.querySelector('.not-found')


  async function submitButton(event) {
    event.preventDefault();

    const inputValue = input.value;
    const apiKey = "597c40c39084687093b091cd48b366f8";

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      updateWeatherDisplay(data);
      // if (data.cod === '404') {
      //   // Handle 404 error
      //   weatherData.classList.remove('active');
      //   error404.classList.add('active');
      // } else {
      //   // Display weather data
      //   weatherData.classList.add('active');
      //   error404.classList.remove('active');
      //   updateWeatherDisplay(data);
      // }


    } catch (error) {
      console.error('Error fetching weather data:', error);
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
    // document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    // document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
    document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `Wind: ${data.wind.speed} km/h`;
  }

});