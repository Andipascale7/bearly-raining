import HourlyCard from "./HourlyCard";

function HourlyForecast({ hourlyData }) {
  if (!hourlyData) return null;

  const next24Hours = hourlyData.slice(0, 24);

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        Today's Hourly Forecast
      </h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4">
          {next24Hours.map((hourlyData, index) => (
            <HourlyCard
              key={index}
              time={hourlyData.time}
              temp={hourlyData.temperature}
              weatherCode={hourlyData.weatherCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;
