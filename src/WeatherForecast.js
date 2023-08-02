import React from 'react';
import WeatherIcon from './WeatherIcons';

const WeatherForecast = ({ forecastData }) => {
  return (
    <div className="forecast-container">
      {forecastData.map((forecast, index) => (
        <div className="forecast-card" key={index}>
          <p>Date: {forecast.dt}</p> {/* Update to use 'dt' instead of 'dt_txt' */}
          <WeatherIcon weatherData={forecast.weather[0]} /> {/* Pass forecast.weather[0] */}
          <p>Temperature: {forecast.temp.day} °C</p> {/* Update to use 'temp.day' */}
          <p>Description: {forecast.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
