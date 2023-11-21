import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearchLocation } from 'react-icons/fa';
import './WeatherApp.css';
import Temptoggle from './Temptoggle';
import WeatherIcon from './WeatherIcons';
import WeatherForecast from './WeatherForecast';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState('celsius'); // State to hold the selected temperature unit
  const [weatherIcon, setWeatherIcon] = useState('');
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=82b8d70ed9fd0c4893635cd69a38e69c`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?q=${location}&units=metric&appid=82b8d70ed9fd0c4893635cd69a38e69c`
        );
        setForecastData(response.data.daily.slice(0, 7)); // Update to fetch data for 7 days
      } catch (error) {
        console.log(error);
      }
    };
    

    if (location) {
      fetchData();
      fetchForecastData();
    }
  }, [location]);

  useEffect(() => {
    const fetchWeatherIcon = async () => {
      try {
        if (weatherData) {
          const iconCode = weatherData.weather[0].icon;
          setWeatherIcon(iconCode);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherIcon();
  }, [weatherData]);

  // Search Bar
  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(e.target.elements.location.value);
  };

  //Temperature Converter
  const convertTemperature = (temp) => {
    if (tempUnit === 'celsius') {
      return (temp - 273.15).toFixed(2) + ' °C';
    } else if (tempUnit === 'fahrenheit') {
      return ((temp - 273.15) * 1.8 + 32).toFixed(2) + ' °F';
    }
  };

  //GeoLocation identifier
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=82b8d70ed9fd0c4893635cd69a38e69c`
            );
            setLocation(response.data.name);
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // Function to convert timestamp to readable time format
  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  const handleToggle = () => {
    // Toggle between 'celsius' and 'fahrenheit'
    setTempUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <div className="container">
      <h1>Weather Now</h1>

      <form onSubmit={handleSearch}>
        <input type="text" name="location" placeholder="Enter location" />
        <button type="submit">Search</button>
        <button onClick={handleGeolocation}>
          <FaSearchLocation />
        </button>
        <div className="temptoggle-container">
          <Temptoggle tempUnit={tempUnit} onToggle={handleToggle} />
        </div>
      </form>

      {weatherData && (
        <div>
          <div className="weather-info">
            <div className="left-info">
              <h2>{weatherData.name}</h2>
              <p className="temperature">
                Temp: {convertTemperature(weatherData.main.temp)}
              </p>
              <WeatherIcon weatherData={weatherData} />
              <p className="current-weather">{weatherData.weather[0].description}</p>
            </div>
            <div className="right-info">
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              {weatherData.sys && (
                <div>
                  <p>Sunrise: {convertTime(weatherData.sys.sunrise)}</p>
                  <p>Sunset: {convertTime(weatherData.sys.sunset)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {forecastData.length > 0 && (
        <div className="forecast-container">
          <h2>Weekly Forecast</h2>
          <WeatherForecast forecastData={forecastData} />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
