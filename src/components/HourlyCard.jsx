import { getWeatherDescription, getWeatherEmoji, formatTime } from '../utils/weatherUtils';

function HourlyCard({ time, temp, weatherCode }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow min-w-[100px]">
      <div className="text-sm text-gray-600 font-medium">
        {formatTime(time)}
      </div>
      <div className="text-3xl my-2">
        {getWeatherEmoji(weatherCode)}
      </div>
      <div className="text-lg font-semibold text-gray-900">
        {Math.round(temp)}°C
      </div>
      <div className="text-xs text-gray-500 text-center mt-1">
        {getWeatherDescription(weatherCode)}
      </div>
    </div>
  );
}

export default HourlyCard;