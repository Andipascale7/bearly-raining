import Header from './components/Header';
import HourlyForecast from './components/HourlyForecast';
import { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherService';
import CurrentWeather from './components/CurrentWeather';
import Footer from './components/Footer';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherData(54.8951, -2.9382);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
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
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-white text-2xl">{error}</div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
    <Header />
    
    <CurrentWeather 
      current={weatherData.current} 
      locationName="Carlisle, UK"
    />

    <HourlyForecast hourlyData={weatherData.hourly} />
    <Footer />
  </div>

);
}

export default App;