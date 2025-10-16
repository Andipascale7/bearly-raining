import React from "react";
import { render, screen } from "@testing-library/react";
import HourlyForecast from "../../components/HourlyForecast";

jest.mock("../../components/HourlyCard", () => {
  return function MockHourlyCard({ time, temp, weatherCode }) {
    return <div data-testid="hourly-card">{`${time} - ${temp}°C`}</div>;
  };
});

describe("HourlyForecast Component", () => {
  const mockHourlyData = Array.from({ length: 24 }, (_, i) => ({
    time: `2025-10-16T${i.toString().padStart(2, "0")}:00`,
    temperature: 10 + i,
    weatherCode: 0,
  }));

  it("renders title and hourly cards", () => {
    render(<HourlyForecast hourlyData={mockHourlyData} />);
    
    expect(screen.getByText("Today's Hourly Forecast")).toBeInTheDocument();
    const cards = screen.getAllByTestId("hourly-card");
    expect(cards).toHaveLength(24);
  });

  it("renders null when hourlyData is not provided", () => {
    const { container } = render(<HourlyForecast hourlyData={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("only renders first 24 hours", () => {
    const extraData = [...mockHourlyData, ...mockHourlyData];
    render(<HourlyForecast hourlyData={extraData} />);
    
    const cards = screen.getAllByTestId("hourly-card");
    expect(cards).toHaveLength(24);
  });
});