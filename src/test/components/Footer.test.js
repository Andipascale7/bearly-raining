import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer Component", () => {
  it("renders footer text", () => {
    render(<Footer />);
    expect(screen.getByText(/Weather data from/i)).toBeInTheDocument();
  });

  it("renders link to Open-Meteo", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /Open-Meteo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://open-meteo.com/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies correct styling classes", () => {
    const { container } = render(<Footer />);
    const footer = container.firstChild;
    expect(footer).toHaveClass("text-center", "mt-12", "pb-8");
  });
});