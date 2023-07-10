/* eslint-disable no-duplicate-case */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayHaze, WiDust, WiTornado, WiSmoke, WiSandstorm, WiStrongWind } from 'react-icons/wi';
import { FaSearchLocation } from 'react-icons/fa';
import './WeatherApp.css';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState('celsius');
  const [forecastData, setForecastData] = useState([]);

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
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=82b8d70ed9fd0c4893635cd69a38e69c`
        );
        setForecastData(response.data.list.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    if (location) {
      fetchData();
      fetchForecastData();
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(e.target.elements.location.value);
  };

  const getWeatherIcon = (conditionId) => {
    switch (conditionId) {
      case 800:
        return <WiDaySunny className="weather-icon" />;
      case 801:
      case 802:
      case 803:
      case 804:
        return <WiCloudy className="weather-icon" />;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return <WiRain className="weather-icon" />;
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return <WiSnow className="weather-icon" />;
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return <WiThunderstorm className="weather-icon" />;
      case 701:
      case 711:
      case 721:
        return <WiFog className="weather-icon" />;
      case 731:
      case 741:
        return <WiDayHaze className="weather-icon" />;
      case 751:
      case 761:
      case 762:
        return <WiSmoke className="weather-icon" />;
      case 771:
      case 781:
        return <WiTornado className="weather-icon" />;
      case 701:
      case 721:
        return <WiDust className="weather-icon" />;
      case 731:
      case 751:
      case 761:
      case 762:
        return <WiSandstorm className="weather-icon" />;
      case 771:
        return <WiStrongWind className="weather-icon" />;
      default:
        return null;
    }
  };

  const convertTemperature = (temp, unit) => {
    if (unit === 'celsius') {
      return (temp - 273.15).toFixed(2) + ' °C';
    } else if (unit === 'fahrenheit') {
      return ((temp - 273.15) * 1.8 + 32).toFixed(2) + ' °F';
    } else {
      return temp + ' °K';
    }
  };

  const handleTempUnitChange = (unit) => {
    setTempUnit(unit);
  };

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

  return (
    <div className="container">
      <h1>Weather Now</h1>

      <form onSubmit={handleSearch}>
        <input type="text" name="location" placeholder="Enter location" />
        <button type="submit">Search</button>
        <button onClick={handleGeolocation}>
          <FaSearchLocation />
        </button>
      </form>

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <div className="weather-info">
            <div>{getWeatherIcon(weatherData.weather[0].id)}</div>
            <div>
              <p>
                Temperature: {convertTemperature(weatherData.main.temp, tempUnit)}
                <button onClick={() => handleTempUnitChange('celsius')}>C</button>
                <button onClick={() => handleTempUnitChange('fahrenheit')}>F</button>
              </p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}

      {forecastData.length > 0 && (
        <div>
          <h2>5-day Forecast</h2>
          <div className="forecast-container">
            {forecastData.map((forecast, index) => (
              <div className="forecast-card" key={index}>
                <div>{getWeatherIcon(forecast.weather[0].id)}</div>
                <p>Date: {forecast.dt_txt}</p>
                <p>Temperature: {convertTemperature(forecast.main.temp, tempUnit)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default WeatherApp;
