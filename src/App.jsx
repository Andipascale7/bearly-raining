import Header from "./components/Header";
import HourlyForecast from "./components/HourlyForecast";
import { useState, useEffect } from "react";
import { getWeatherData, searchLocation } from "./services/weatherService";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import LocationSearch from "./components/LocationSearch";
import DatePicker from "./components/DatePicker";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState({
    lat: 54.8951,
    lon: -2.9382,
    name: "Carlisle,UK",
  });

  const generateAvailableDates = () => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const value = date.toISOString().split("T")[0];
      const label = date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      return { value, label };
    });
  };

  const availableDates = generateAvailableDates();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchWeatherForLocation = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to load weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleLocationSearch = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const newLocation = await searchLocation(cityName);
      setLocation(newLocation);
      await fetchWeatherForLocation(newLocation.lat, newLocation.lon);
    } catch (err) {
      setError("Location not found. Try another city.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeatherForLocation(location.lat, location.lon);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
        <div className="text-white text-2xl mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
        >
          Try Again
        </button>
      </div>
    );
  }
  const getFilteredHourlyData = () => {
    if (!selectedDate) return weatherData.hourly;

    return weatherData.hourly.filter((hour) => {
      const hourDate = new Date(hour.time);
      const selected = new Date(selectedDate);
      return (
        hourDate.getFullYear() === selected.getFullYear() &&
        hourDate.getMonth() === selected.getMonth() &&
        hourDate.getDate() === selected.getDate()
      );
    });
  };

  const filteredHourlyData = getFilteredHourlyData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <Header />
      <LocationSearch onLocationChange={handleLocationSearch} />
      <DatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        availableDates={availableDates}
      />
      <CurrentWeather
        current={weatherData.current}
        locationName={location.name}
      />

      <HourlyForecast hourlyData={filteredHourlyData} />

      <Footer />
    </div>
  );
}

export default App;
