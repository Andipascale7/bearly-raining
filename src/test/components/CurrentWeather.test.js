import { render, screen } from "@testing-library/react";
import CurrentWeather from "../../components/CurrentWeather";
import {
  getWeatherDescription,
  getWeatherEmoji,
} from "../../utils/weatherUtils";

jest.mock("../../utils/weatherUtils", () => ({
  getWeatherDescription: jest.fn(),
  getWeatherEmoji: jest.fn(),
}));

describe("CurrentWeather Component", () => {
  const mockLocation = "New York";
  const mockCurrentWeather = {
    temperature_2m: 22.4,
    weather_code: 0,
    wind_speed_10m: 15,
    relative_humidity_2m: 65,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    getWeatherEmoji.mockReturnValue("☀️");
    getWeatherDescription.mockReturnValue("Clear sky");
  });

  it("renders without crashing and shows correct data", () => {
    render(
      <CurrentWeather
        current={mockCurrentWeather}
        locationName={mockLocation}
      />
    );

    expect(getWeatherEmoji).toHaveBeenCalledWith(
      mockCurrentWeather.weather_code
    );
    expect(getWeatherDescription).toHaveBeenCalledWith(
      mockCurrentWeather.weather_code
    );

    expect(screen.getByText(mockLocation)).toBeInTheDocument();
    expect(screen.getByText("☀️")).toBeInTheDocument();
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("Clear sky")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCurrentWeather.wind_speed_10m} km/h`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCurrentWeather.relative_humidity_2m}%`)
    ).toBeInTheDocument();
  });

  it("rounds temperature to nearest integer", () => {
    render(
      <CurrentWeather
        current={{ ...mockCurrentWeather, temperature_2m: 22.6 }}
        locationName={mockLocation}
      />
    );
    expect(screen.getByText("23°C")).toBeInTheDocument();
  });

  it("renders null if 'current' is not provided", () => {
    const { container } = render(
      <CurrentWeather current={null} locationName={mockLocation} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("applies expected styling classes", () => {
    const { container } = render(
      <CurrentWeather
        current={mockCurrentWeather}
        locationName={mockLocation}
      />
    );
    const card = container.firstChild;
    expect(card).toHaveClass(
      "bg-white",
      "rounded-lg",
      "shadow-lg",
      "p-6",
      "max-w-md",
      "mx-auto"
    );
  });
});
