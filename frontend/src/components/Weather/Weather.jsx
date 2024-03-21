import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

// Weather component definition
const Weather = () => {
  // State for storing the input city name
  const [city, setCity] = useState('');
  // State for storing the user's geolocation (latitude and longitude)
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  // State for storing fetched weather data
  const [weatherData, setWeatherData] = useState(null);
  // State for storing the city name derived from geolocation
  const [geoCity, setGeoCity] = useState('');
  // Your weather API key (replace with your actual API key)
  const API_KEY = 'NZFg01GFjycMlynXdI9PhAssjfKPnmeA';

  // useEffect hook to fetch the user's location on component mount
  useEffect(() => {
    fetchLocation();
  }, []);

  // Function to fetch the user's geolocation and perform reverse geocoding to find the city name
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ latitude: lat, longitude: lon });

        // Reverse geocoding to get city name
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          setGeoCity(response.data.address.city || response.data.address.town || 'Unknown location');
        } catch (error) {
          console.error("Error fetching city name:", error);
        }
      }, (error) => {
        console.error("Error fetching location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to fetch weather data based on the city name or geolocation
  const fetchWeather = async () => {
    let url = '';
    if (city !== '') {
      // If a city name is provided, use it to fetch weather
      url = `https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature,windSpeed,humidity,weatherCode&timesteps=current&apikey=${API_KEY}`;
    } else if (location.latitude && location.longitude) {
      // If geolocation is available, use it to fetch weather
      url = `https://api.tomorrow.io/v4/timelines?location=${location.latitude},${location.longitude}&fields=temperature,windSpeed,humidity,weatherCode&timesteps=current&apikey=${API_KEY}`;
    } else {
      console.error("Location not available.");
      return;
    }

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Function to format the timestamp into a human-readable date and time
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      time: `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLowerCase()}`
    };
  };

  // format temperature to have no decimal places
  const formatTemperature = (temperature) => {
    return temperature.toFixed(0);
  };
  return (
    <div className='weather-card'>
      {/* <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        // placeholder="Enter city"
        // className="city-input"
      /> */}
      <button onClick={fetchWeather} className="fetch-button">Get Weather</button>
      {weatherData && (
        <div>
          <div className="date-time">
            <div className="date">{formatDateTime(weatherData.data.timelines[0].startTime).date}</div>
            <div className="time">{formatDateTime(weatherData.data.timelines[0].startTime).time}</div>
          </div>
          <div className="temperature">
            {formatTemperature(weatherData.data.timelines[0].intervals[0].values.temperature)}°C
          </div>
          <div className="city">
            {city || geoCity}
          </div>
          <div className="weather-info">
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
