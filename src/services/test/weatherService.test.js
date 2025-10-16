import {
  getWeatherData,
  searchLocation,
} from "/home/andi/northcoders/bearly-raining/src/services/weatherService.js";

global.fetch = jest.fn();

describe("weatherService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getWeatherData", () => {
    it("fetches and transforms weather data", async () => {
      const mockResponse = {
        current: { temperature_2m: 15, weather_code: 0 },
        hourly: {
          time: ["2025-10-16T00:00"],
          temperature_2m: [15],
          weather_code: [0],
          precipitation_probability: [0],
        },
        daily: {
          time: ["2025-10-16"],
          temperature_2m_max: [20],
          temperature_2m_min: [10],
          weather_code: [0],
        },
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getWeatherData(54.8951, -2.9382);
      expect(result.current).toBeDefined();
      expect(result.hourly).toHaveLength(1);
      expect(result.daily).toHaveLength(1);
    });

    it("throws error on failed fetch", async () => {
      fetch.mockResolvedValueOnce({ ok: false });
      await expect(getWeatherData(0, 0)).rejects.toThrow();
    });
  });

  describe("searchLocation", () => {
    it("returns location data for valid city", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              latitude: 51.5,
              longitude: -0.1,
              name: "London",
              country: "UK",
            },
          ],
        }),
      });

      const result = await searchLocation("London");
      expect(result.lat).toBe(51.5);
      expect(result.lon).toBe(-0.1);
      expect(result.name).toBe("London, UK");
    });

    it("throws error for location not found", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [] }),
      });

      await expect(searchLocation("InvalidCity")).rejects.toThrow(
        "Location not found"
      );
    });
  });
});
