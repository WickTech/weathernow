import React from 'react';
import { IconContext } from 'react-icons';
import { WiDaySunny, WiNightClear, WiCloud, WiCloudy, WiCloudyWindy, WiShowers, WiThunderstorm, WiSnow, WiFog, WiRain } from 'react-icons/wi';

const WeatherIcon = ({ weatherData }) => {
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
        return <WiDaySunny />;
      case '01n':
        return <WiNightClear />;
      case '02d':
        return <WiCloudy />;
      case '02n':
        return <WiCloudy />;
      case '03d':
        return <WiCloud />;
      case '03n':
        return <WiCloud />;
      case '04d':
        return <WiCloudyWindy />;
      case '04n':
        return <WiCloudyWindy />;
      case '09d':
        return <WiShowers />;
      case '09n':
        return <WiShowers />;
      case '10d':
        return <WiRain />;
      case '10n':
        return <WiRain />;
      case '11d':
        return <WiThunderstorm />;
      case '11n':
        return <WiThunderstorm />;
      case '13d':
        return <WiSnow />;
      case '13n':
        return <WiSnow />;
      case '50d':
        return <WiFog />;
      case '50n':
        return <WiFog />;
      default:
        return null;
    }
  };

  const weatherIcon = getWeatherIcon(weatherData.weather[0].icon);

  return (
    <div>
      <IconContext.Provider value={{ size: '100px' }}>
        {weatherIcon}
      </IconContext.Provider>
    </div>
  );
};

export default WeatherIcon;
