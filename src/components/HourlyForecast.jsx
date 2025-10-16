import HourlyCard from './HourlyCard';

function HourlyForecast({ hourlyData }) {
  if (!hourlyData) return null;

  const next24Hours = hourlyData.time.slice(0, 24);

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        Today's Hourly Forecast
      </h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4">
          {next24Hours.map((time, index) => (
            <HourlyCard
              key={time}
              time={time}
              temp={hourlyData.temperature_2m[index]}
              weatherCode={hourlyData.weather_code[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;