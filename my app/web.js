async function fetchWeatherData(city) {
const apiKey = '47f4cd979e828560c8182ccdee075910';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok && data.sys && data.weather) {
            const weatherInfo = `
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].main} - ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weather-result').innerHTML = weatherInfo;
        } else {
            document.getElementById('weather-result').innerHTML = `<p style="color:red">${data.message}</p>`;
        }

    } catch (error) {
        document.getElementById('weather-result').innerHTML = `<p style="color:red">Unable to fetch weather data</p>`;
        console.error('Error fetching weather data:', error);
    }
}

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});
