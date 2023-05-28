import 'jsdom-global/register';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios, {AxiosResponse} from 'axios';
import RangeDisplay from './RangeDisplay';

// Mock axios post method
jest.mock('axios');

describe('RangeDisplay', () => {
  test('renders temperature range correctly', () => {
    render(<RangeDisplay />);
    expect(screen.getByText(/Temperature range/i)).toBeInTheDocument();
  });

  test('renders CO2 range correctly', () => {
    render(<RangeDisplay />);
    expect(screen.getByText(/CO2 range/i)).toBeInTheDocument();
  });

  test('renders humidity range correctly', () => {
    render(<RangeDisplay />);
    expect(screen.getByText(/Humidity range/i)).toBeInTheDocument();
  });

  test('clicking edit parameters button opens the modal', () => {
    render(<RangeDisplay />);
    fireEvent.click(screen.getByText(/Edit Parameters/i));
    expect(screen.getByText(/Edit Parameters/i)).toBeInTheDocument();
  });

  test('saves data when save button is clicked', async () => {
    const mockedPost = axios.post as jest.Mock<
      Promise<AxiosResponse<any>>, // Set the return type of the mock
      [string, any, any] // Set the parameter types of the mock
    >;
    mockedPost.mockResolvedValueOnce({ status: 200 });

    render(<RangeDisplay />);
    fireEvent.click(screen.getByText(/Edit Parameters/i));
    fireEvent.click(screen.getByText(/Save/i));

    expect(mockedPost).toHaveBeenCalledTimes(1);
    expect(mockedPost).toHaveBeenCalledWith(
      expect.any(String),
      {
        minTemperature: expect.any(Number),
        maxTemperature: expect.any(Number),
        minCO2: expect.any(Number),
        maxCO2: expect.any(Number),
        minHumidity: expect.any(Number),
        maxHumidity: expect.any(Number),
      },
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // You can also check for other assertions, like displaying success message, etc.
  });
});
