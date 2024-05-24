import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Beat from "@/components/beat";

describe("Beat component", () => {
  const mockProps = {
    id: "1",
    timeStart: 1000,
    timestamp: 1000,
    description: "Test description",
    duration: 2000,
    cameraAngle: "Test angle",
  };

  beforeEach(() => {
    render(<Beat {...mockProps} />);
  });

  test("renders without crashing", () => {
    const beatElement = screen.getByTestId("beat");
    expect(beatElement).toBeInTheDocument();
  });

  test("renders the correct timestamp", () => {
    const timestampElement = screen.getByText("0:01");
    expect(timestampElement).toBeInTheDocument();
  });

  test("renders the correct description", () => {
    const descriptionElement = screen.getByText(mockProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders the correct duration", () => {
    const durationElement = screen.getByText("0:02");
    expect(durationElement).toBeInTheDocument();
  });

  test("renders the correct camera angle", () => {
    const cameraAngleElement = screen.getByText(mockProps.cameraAngle);
    expect(cameraAngleElement).toBeInTheDocument();
  });
});
