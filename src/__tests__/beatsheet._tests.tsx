import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BeatSheetContext, BeatSheetDispatchContext } from "@/context/";
import BeatSheet from "@/components/beatsheet";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("BeatSheet", () => {
  const mockDispatch = jest.fn();
  const mockBeatSheet = {
    _id: "1",
    title: "Test Title",
    acts: [
      { id: "1", description: "Test Act 1", timestamp: 0, beats: [] },
      { id: "2", description: "Test Act 2", timestamp: 0, beats: [] },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <BeatSheetContext.Provider value={mockBeatSheet}>
        <BeatSheetDispatchContext.Provider value={mockDispatch}>
          <BeatSheet />
        </BeatSheetDispatchContext.Provider>
      </BeatSheetContext.Provider>,
    );
  });

  it("renders title correctly", () => {
    const { getByText } = render(
      <BeatSheetContext.Provider value={mockBeatSheet}>
        <BeatSheetDispatchContext.Provider value={mockDispatch}>
          <BeatSheet />
        </BeatSheetDispatchContext.Provider>
      </BeatSheetContext.Provider>,
    );
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("renders acts correctly", () => {
    const { getByText } = render(
      <BeatSheetContext.Provider value={mockBeatSheet}>
        <BeatSheetDispatchContext.Provider value={mockDispatch}>
          <BeatSheet />
        </BeatSheetDispatchContext.Provider>
      </BeatSheetContext.Provider>,
    );
    expect(getByText("Test Act 1")).toBeInTheDocument();
    expect(getByText("Test Act 2")).toBeInTheDocument();
  });
});
