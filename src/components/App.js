import React, { useState } from 'react';
import '../styles/App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '7e670ee5d61f585d783bcb50472ee82f'; 

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (data.cod === '404') {
        alert('City not found. Please enter a valid city name.');
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>City Weather</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>
      {weatherData && (
        <div className="weather">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;
