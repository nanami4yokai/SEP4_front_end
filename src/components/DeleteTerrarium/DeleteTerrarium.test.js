
import 'jsdom-global/register';
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "./axios";
import MockAdapter from "axios-mock-adapter";
import DeleteTerrarium from "./DeleteTerrarium";
import "jest-localstorage-mock";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';





describe("DeleteTerrarium", () => {
  it("displays the confirmation modal when the 'Delete terrarium' button is clicked", () => {
    // Render the component
    const { getByText, queryByText } = render(<DeleteTerrarium terrariumId="1" />);

    // Assert that the confirmation modal is initially not displayed
    expect(queryByText("Confirmation")).toBeNull();

    // Select the 'Delete terrarium' button
    const deleteButton = getByText("Delete terrarium");

    // Simulate a click event on the button
    fireEvent.click(deleteButton);

    // Assert that the confirmation modal is displayed
    expect(getByText("Confirmation")).toBeInTheDocument();
  });
});

describe("DeleteTerrarium", () => {
  it("closes the confirmation modal when the 'Cancel' button is clicked", async () => {
    // Render the component with the confirmation modal open
    const { getByText, queryByText } = render(<DeleteTerrarium />);
    fireEvent.click(getByText("Delete terrarium"));

    // Assert that the confirmation modal is displayed
    expect(queryByText("Confirmation")).toBeInTheDocument();

    // Use testing library to select the 'Cancel' button
    const cancelButton = getByText("Cancel");

    // Simulate a click event on the 'Cancel' button
    fireEvent.click(cancelButton);

    // Wait for the modal to close
    await waitFor(() => {
      // Assert that the confirmation modal is closed
      expect(queryByText("Confirmation")).toBeNull();
    });
  });
});

jest.mock('axios');
describe("DeleteTerrarium", () => {
  beforeEach(() => {
    localStorage.setItem("jwtToken", "mockToken");
    jest.spyOn(console, "log").mockImplementation(jest.fn());
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("calls the delete API when 'Yes' button is clicked and verifies the request", async () => {
    const mockResponse = { status: 200, data: { message: "Terrarium deleted" } };
    axios.delete.mockResolvedValueOnce(mockResponse);

    const { container, getByText } = render(<DeleteTerrarium terrariumId="1" />);
    fireEvent.click(getByText("Delete terrarium"));
    fireEvent.click(getByText("Yes"));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith(
        "https://terrasense-service-dot-terrasense.ew.r.appspot.com/terrarium/delete",
        {
          headers: { Authorization: "Bearer mockToken" },
          params: { terrariumId: "1" },
        }
      );
      expect(console.log).toHaveBeenCalledWith("Terrarium deleted");
    });
  });
});

describe('DeleteTerrarium', () => {
  describe('handles delete API response correctly', () => {
    beforeEach(() => {
      jest.spyOn(axios, 'delete').mockImplementation((url) => {
        if (url === 'https://terrasense-service-dot-terrasense.ew.r.appspot.com/terrarium/delete') {
          if (true) {
            return Promise.resolve({ status: 200, data: { message: 'Terrarium deleted' } });
          } else {
            return Promise.reject(new Error('Failed to delete terrarium'));
          }
        }
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('displays success message on successful delete', async () => {
      render(<DeleteTerrarium terrariumId="1" />);

      const deleteButton = screen.getByText('Delete terrarium');
      userEvent.click(deleteButton);

      await waitFor(() => {
        const yesButton = screen.getByText(/yes/i);

        const consoleSpy = jest.spyOn(console, 'log');

        act(async () => {
          await waitFor(() => {
            const yesButton = screen.getByText(/yes/i);

            expect(consoleSpy).toHaveBeenCalledWith('Terrarium deleted');

            consoleSpy.mockRestore();
          });
        });
      });
    });

    it('displays error message on failed delete', async () => {
      render(<DeleteTerrarium terrariumId="1" />);
      
      // Wait for the delete button to appear
      await waitFor(() => {
        const deleteButton = screen.getByRole('button', { name: /delete terrarium/i });
        userEvent.click(deleteButton);
      });
      
      // Wait for the error message to appear
      await waitFor(() => {
        const errorMessage = screen.getByText(/Failed to delete terrarium/i);
        expect(errorMessage).toBeInTheDocument();
      });
      
      const errorSpy = jest.spyOn(console, 'error');
      
      // Verify the error message and restore the spy
      act(async () => {
        await waitFor(() => {
          const yesButton = screen.getByRole('button', { name: /yes/i });
          userEvent.click(yesButton);
        });
  
        expect(errorSpy).toHaveBeenCalledWith('Failed to delete terrarium');
        
        errorSpy.mockRestore();
      });
    });
  });
})
