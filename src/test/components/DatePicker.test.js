import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "../../components/DatePicker";

describe("DatePicker Component", () => {
  const mockOnDateChange = jest.fn();
  const mockAvailableDates = [
    { value: "2025-10-16", label: "Today - Wed 16th Oct" },
    { value: "2025-10-17", label: "Tomorrow - Thu 17th Oct" },
    { value: "2025-10-18", label: "Fri 18th Oct" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with correct label and options", () => {
    render(
      <DatePicker
        selectedDate="2025-10-16"
        onDateChange={mockOnDateChange}
        availableDates={mockAvailableDates}
      />
    );

    expect(screen.getByText("Select Date")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Today - Wed 16th Oct")).toBeInTheDocument();
    expect(screen.getByText("Tomorrow - Thu 17th Oct")).toBeInTheDocument();
  });

  it("calls onDateChange when selection changes", () => {
    render(
      <DatePicker
        selectedDate="2025-10-16"
        onDateChange={mockOnDateChange}
        availableDates={mockAvailableDates}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2025-10-17" } });

    expect(mockOnDateChange).toHaveBeenCalledWith("2025-10-17");
  });

  it("displays all available dates as options", () => {
    render(
      <DatePicker
        selectedDate="2025-10-16"
        onDateChange={mockOnDateChange}
        availableDates={mockAvailableDates}
      />
    );

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });
});