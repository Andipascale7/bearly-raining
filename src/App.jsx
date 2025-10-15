import { useEffect } from 'react';
import { getWeatherData } from './services/weatherService';

function App() {
  useEffect(() => {
    // Test the API call
    getWeatherData(54.8951, -2.9382)
      .then(data => console.log('Weather data:', data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <h1 className="text-white text-4xl font-bold">
        BearlyRaining
      </h1>
    </div>
  );
}

export default App;