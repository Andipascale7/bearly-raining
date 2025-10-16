import { getWeatherDescription, getWeatherEmoji } from '../utils/weatherUtils';

function CurrentWeather({ current, locationName }) {
  if (!current) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {locationName}
      </h2>
      
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">
          {getWeatherEmoji(current.weather_code)}
        </div>
        <div className="text-5xl font-bold text-gray-900">
          {Math.round(current.temperature_2m)}°C
        </div>
        <div className="text-xl text-gray-600 mt-2">
          {getWeatherDescription(current.weather_code)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600">Wind Speed</div>
          <div className="text-lg font-semibold text-gray-900">
            {current.wind_speed_10m} km/h
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="text-lg font-semibold text-gray-900">
            {current.relative_humidity_2m}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;