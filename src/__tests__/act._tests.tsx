import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BeatSheetDispatchContext } from "@/context/";
import Act, { ActProps } from "@/components/act";

const mockDispatch = jest.fn();

const mockActProps: ActProps = {
  id: "1",
  description: "Test Act",
  timestamp: 0,
  timeStart: 0,
  beats: [],
  bgcolor: "white",
};

describe("Act", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <BeatSheetDispatchContext.Provider value={mockDispatch}>
        <Act {...mockActProps} />
      </BeatSheetDispatchContext.Provider>,
    );

    expect(getByText("Test Act")).toBeInTheDocument();
  });
});

