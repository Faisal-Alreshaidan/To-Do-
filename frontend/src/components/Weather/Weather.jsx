import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Make sure you have the CSS file with the necessary styles

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'NZFg01GFjycMlynXdI9PhAssjfKPnmeA'; // Replace with your actual API key

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature,windSpeed,humidity,weatherCode&timesteps=current&apikey=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      time: `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase()}`
    };
  };

  const formatTemperature = (temperature) => {
    return temperature.toFixed(0); // Format temperature to have no decimal places
  };

  return (
    <div className='weather-card'>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="city-input"
      />
      <button onClick={fetchWeather} className="fetch-button">Get Weather</button>
      {weatherData && (
        <div>
          <div className="date-time">
            {/* Assuming you get the timestamp from the API data */}
            <div className="date">{formatDateTime(weatherData.data.timelines[0].startTime).date}</div>
            <div className="time">{formatDateTime(weatherData.data.timelines[0].startTime).time}</div>
          </div>
          <div className="temperature">
            {formatTemperature(weatherData.data.timelines[0].intervals[0].values.temperature)}°C
          </div>
          <div className="city">
            {city}
          </div>
          <div className="weather-info">
            {/* Assuming weatherCode maps correctly to your weather conditions */}
            <div className="description">Overcast</div>
            <div className="humidity">Humidity: {weatherData.data.timelines[0].intervals[0].values.humidity}%</div>
            <div className="wind">Wind: {weatherData.data.timelines[0].intervals[0].values.windSpeed} km/h</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
