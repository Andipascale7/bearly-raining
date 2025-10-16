import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

describe("Header Component", () => {
  it("renders app title", () => {
    render(<Header />);
    expect(screen.getByText(/lyRaining/i)).toBeInTheDocument();
  });

  it("renders tagline", () => {
    render(<Header />);
    expect(screen.getByText("Your friendly weather companion")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(<Header />);
    const header = container.firstChild;
    expect(header).toHaveClass("text-center", "mb-8");
  });
});