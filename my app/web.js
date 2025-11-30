async function fetchWeatherData(city) {
    const apiKey = 'YOUR_API_KEY'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found'); 
        }

        const data = await response.json();
        console.log('Weather data:', data); 

        
        const weatherInfo = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].main} - ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        
        document.getElementById('weather-result').innerHTML = weatherInfo;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    
        document.getElementById('weather-result').innerHTML = `<p style="color:red">${error.message}</p>`;
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

