import { getWeatherDescription, getWeatherEmoji, formatTime } from '../../utils/weatherUtils';

describe('weatherUtils', () => {
  describe('getWeatherDescription', () => {
    it('returns correct descriptions for valid codes', () => {
      expect(getWeatherDescription(0)).toBe('Clear sky');
      expect(getWeatherDescription(45)).toBe('Foggy');
      expect(getWeatherDescription(95)).toBe('Thunderstorm');
    });

    it('returns "Unknown" for invalid codes', () => {
      expect(getWeatherDescription(999)).toBe('Unknown');
    });
  });

  describe('getWeatherEmoji', () => {
    it('returns correct emojis for weather codes', () => {
      expect(getWeatherEmoji(0)).toBe('☀️');
      expect(getWeatherEmoji(2)).toBe('⛅');
      expect(getWeatherEmoji(45)).toBe('🌫️');
      expect(getWeatherEmoji(61)).toBe('🌧️');
      expect(getWeatherEmoji(71)).toBe('❄️');
      expect(getWeatherEmoji(95)).toBe('⛈️');
    });

    it('returns default emoji for unknown codes', () => {
      expect(getWeatherEmoji(999)).toBe('🌤️');
    });
  });

  describe('formatTime', () => {
    it('formats ISO string to readable time', () => {
      const time = formatTime('2025-10-16T14:30:00Z');
      expect(time).toMatch(/\d{2}:\d{2}/);
    });
  });
});