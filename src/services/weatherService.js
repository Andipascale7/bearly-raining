const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const getWeatherData = async (latitude, longitude) => {
  try {
    const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      current: 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m',
      hourly: 'temperature_2m,weather_code,precipitation_probability',
      timezone: 'Europe/London',
      forecast_days: 1 // Just today for now
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};
export const searchLocation = async (cityName) => {
  try {
    const params = new URLSearchParams({
      name: cityName,
      count: 1,
      language: 'en',
      format: 'json'
    });

    const response = await fetch(`${GEOCODING_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to search location');
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('Location not found');
    }

    const result = data.results[0];
    return {
      lat: result.latitude,
      lon: result.longitude,
      name: `${result.name}, ${result.country}`
    };
    
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};