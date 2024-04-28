const inputText = document.querySelector(".inputText");
const showData = document.querySelector(".showData");
const button = document.querySelector(".btn");

const API_key = "b4884fc1d298de0d2c0f6508eabed3b4";

button.addEventListener("click", () => {
  const inputCity = inputText.value;
  const currentDate = new Date(); // Get current date and time
  const formattedDate = currentDate.toLocaleString(); // Format date and time

  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${API_key}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found or API request failed");
      }
      return res.json();
    })
    .then((data) => {
      inputText.value = "";
      const temperature = data.main.temp.toFixed(0); // Round temperature to nearest integer

      let weatherDescription = data.weather[0].description.toLowerCase(); // Convert weather description to lowercase for easier comparison

      // Customize weather description for certain conditions
      if (weatherDescription.includes("haze")) {
        weatherDescription = "clear sky"; // Replace "haze" with "clear sky"
      }

      let humidityMessage = "";
      const humidity = data.main.humidity; // Get humidity level
      // Check humidity level and customize message accordingly
      if (humidity < 50) {
        humidityMessage = "Low humidity";
      } else if (humidity >= 50 && humidity <= 70) {
        humidityMessage = "Moderate humidity";
      } else {
        humidityMessage = "High humidity";
      }

      showData.innerHTML = `
        <ul>
          <li class="city">${data.name}</li>
          <li class="dateTime">${formattedDate}</li> <!-- Display date and time -->
          <li class="temp">${temperature}°C</li>
          <li class="disc">${weatherDescription}</li>
          <li class="humidity">${humidityMessage}</li>
        </ul>
      `;
    })
    .catch((error) => {
      showData.innerHTML = `<p class="error">${error.message}</p>`;
    });
});
