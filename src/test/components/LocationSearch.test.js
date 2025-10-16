import { render, screen, fireEvent } from "@testing-library/react";
import LocationSearch from "../../components/LocationSearch";

describe("LocationSearch Component", () => {
  const mockOnLocationChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and search button", () => {
    render(<LocationSearch onLocationChange={mockOnLocationChange} />);
    
    expect(screen.getByPlaceholderText(/Enter city name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<LocationSearch onLocationChange={mockOnLocationChange} />);
    
    const input = screen.getByPlaceholderText(/Enter city name/i);
    fireEvent.change(input, { target: { value: "London" } });
    
    expect(input.value).toBe("London");
  });

  it("calls onLocationChange with trimmed value on submit", () => {
    render(<LocationSearch onLocationChange={mockOnLocationChange} />);
    
    const input = screen.getByPlaceholderText(/Enter city name/i);
    const button = screen.getByRole("button", { name: /Search/i });
    
    fireEvent.change(input, { target: { value: "  Paris  " } });
    fireEvent.click(button);
    
    expect(mockOnLocationChange).toHaveBeenCalledWith("Paris");
  });

  it("does not call onLocationChange with empty input", () => {
    render(<LocationSearch onLocationChange={mockOnLocationChange} />);
    
    const button = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(button);
    
    expect(mockOnLocationChange).not.toHaveBeenCalled();
  });

  it("submits on Enter key press", () => {
    render(<LocationSearch onLocationChange={mockOnLocationChange} />);
    
    const input = screen.getByPlaceholderText(/Enter city name/i);
    fireEvent.change(input, { target: { value: "Berlin" } });
    fireEvent.submit(input.closest("form"));
    
    expect(mockOnLocationChange).toHaveBeenCalledWith("Berlin");
  });
});