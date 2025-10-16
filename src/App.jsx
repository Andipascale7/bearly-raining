import Header from './components/Header';
import HourlyForecast from './components/HourlyForecast';
import { useState, useEffect } from 'react';
import { getWeatherData, searchLocation} from './services/weatherService';
import CurrentWeather from './components/CurrentWeather';
import Footer from './components/Footer';
import LocationSearch from './components/LocationSearch';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[location, setLocation] = useState({
    lat: 54.8951,
    lon: -2.9382,
    name: 'Carlisle,UK'
  });


const fetchWeatherForLocation = async (lat, lon) => {
  try {
    setLoading(true);
    setError(null);
    const data = await getWeatherData(lat, lon);
    setWeatherData(data);
  } catch (err) {
    setError('Failed to load weather data');
    console.error(err);
  } finally {
    setLoading(false);
  }
  }
   const handleLocationSearch = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const newLocation = await searchLocation(cityName);
      setLocation(newLocation);
      await fetchWeatherForLocation(newLocation.lat, newLocation.lon);
    } catch (err) {
      setError('Location not found. Try another city.');
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
 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
    <Header />
    <LocationSearch onLocationChange={handleLocationSearch} />
    <CurrentWeather 
      current={weatherData.current} 
      locationName={location.name}
    />

    <HourlyForecast hourlyData={weatherData.hourly} />
    <Footer />
  </div>

);
}

export default App;