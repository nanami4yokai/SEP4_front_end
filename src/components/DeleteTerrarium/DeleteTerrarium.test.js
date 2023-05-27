import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import DeleteTerrarium from "./DeleteTerrarium";

// Mock XMLHttpRequest
const mockXHR = {
  open: jest.fn(),
  setRequestHeader: jest.fn(),
  onreadystatechange: null,
  readyState: 0,
  status: 0,
  response: null,
  send: function (data) {
    this.onreadystatechange();
    if (this.status === 200) {
      this.onload();
    } else {
      this.onerror();
    }
  },
  abort: jest.fn(),
};

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
};

// Mock console.error
console.error = jest.fn();

describe("DeleteTerrarium", () => {
  beforeEach(() => {
    // Restore mock functions and values before each test
    mockXHR.open.mockClear();
    mockXHR.setRequestHeader.mockClear();
    mockXHR.onreadystatechange = null;
    mockXHR.readyState = 0;
    mockXHR.status = 0;
    mockXHR.response = null;
    mockXHR.send.mockReset(); // Replace `mockClear()` with `mockReset()`

    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.getItem.mockReturnValue("mockToken");
  });

  it("displays the delete confirmation modal when the button is clicked", () => {
    const { getByText } = render(<DeleteTerrarium terrariumId="1" />);

    fireEvent.click(getByText("Delete terrarium"));

    expect(getByText("Confirmation")).toBeInTheDocument();
    expect(getByText("Are you sure you want to delete this terrarium?")).toBeInTheDocument();
  });

  it("calls the delete API when 'Yes' button is clicked and receives a success response", async () => {
    const { getByText } = render(<DeleteTerrarium terrariumId="1" />);
    mockXHR.onreadystatechange = () => {
      if (mockXHR.readyState === 4) {
        mockXHR.status = 200;
        mockXHR.response = { message: "Terrarium deleted" };
        mockXHR.onreadystatechange();
      }
    };

    fireEvent.click(getByText("Delete terrarium"));
    fireEvent.click(getByText("Yes"));

    await waitFor(() => {
      expect(mockXHR.open).toHaveBeenCalledWith("DELETE", "https://terrasense-service-dot-terrasense.ew.r.appspot.com/terrarium/delete");
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith("Authorization", "Bearer mockToken");
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify({ terrariumId: "1" }));
      expect(console.error).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Terrarium deleted");
      expect(getByText("Confirmation")).not.toBeInTheDocument();
    });
  });

  it("calls the delete API when 'Yes' button is clicked and receives an error response", async () => {
    const { getByText } = render(<DeleteTerrarium terrariumId="1" />);
    mockXHR.onreadystatechange = () => {
      if (mockXHR.readyState === 4) {
        mockXHR.status = 500;
        mockXHR.response = { error: "Failed to delete terrarium" };
        mockXHR.onreadystatechange();
      }
    };

    fireEvent.click(getByText("Delete terrarium"));
    fireEvent.click(getByText("Yes"));

    await waitFor(() => {
      expect(mockXHR.open).toHaveBeenCalledWith("DELETE", "https://terrasense-service-dot-terrasense.ew.r.appspot.com/terrarium/delete");
      expect(mockXHR.setRequestHeader).toHaveBeenCalledWith("Authorization", "Bearer mockToken");
      expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify({ terrariumId: "1" }));
      expect(console.error).toHaveBeenCalledWith("Failed to delete terrarium");
      expect(getByText("Confirmation")).not.toBeInTheDocument();
    });
  });
});
