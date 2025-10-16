import React from "react";
import { render, screen } from "@testing-library/react";
import HourlyCard from "../../components/HourlyCard";
import {
  getWeatherDescription,
  getWeatherEmoji,
  formatTime,
} from "../../utils/weatherUtils";

jest.mock("../../utils/weatherUtils", () => ({
  getWeatherDescription: jest.fn(),
  getWeatherEmoji: jest.fn(),
  formatTime: jest.fn(),
}));

describe("HourlyCard Component", () => {
  const mockTime = "2025-10-16T14:00:00Z";
  const mockTemp = 18.4;
  const mockWeatherCode = 100;

  beforeEach(() => {
    jest.clearAllMocks();


    formatTime.mockReturnValue("2 PM");
    getWeatherEmoji.mockReturnValue("☀️");
    getWeatherDescription.mockReturnValue("Clear sky");
  });

  it("renders without crashing and shows correct data", () => {
    render(
      <HourlyCard
        time={mockTime}
        temp={mockTemp}
        weatherCode={mockWeatherCode}
      />
    );

    expect(formatTime).toHaveBeenCalledWith(mockTime);
    expect(getWeatherEmoji).toHaveBeenCalledWith(mockWeatherCode);
    expect(getWeatherDescription).toHaveBeenCalledWith(mockWeatherCode);

    expect(screen.getByText("2 PM")).toBeInTheDocument();

    expect(screen.getByText("☀️")).toBeInTheDocument();

    expect(screen.getByText("18°C")).toBeInTheDocument();

    expect(screen.getByText("Clear sky")).toBeInTheDocument();
  });

  it("rounds temperature to nearest integer", () => {
    render(
      <HourlyCard time={mockTime} temp={18.6} weatherCode={mockWeatherCode} />
    );
    expect(screen.getByText("19°C")).toBeInTheDocument();
  });

  it("applies expected styling classes", () => {
    const { container } = render(
      <HourlyCard
        time={mockTime}
        temp={mockTemp}
        weatherCode={mockWeatherCode}
      />
    );
    const card = container.firstChild;
    expect(card).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "p-4",
      "bg-white",
      "rounded-lg",
      "shadow",
      "min-w-[100px]"
    );
  });
});
