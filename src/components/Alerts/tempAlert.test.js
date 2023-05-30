import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import TempAlert from './tempAlert';

describe('TempAlert', () => {
  const mockTempData = {
    graphdata: [
      {
        id: 1,
        temperature: 30.5,
        co2: 493,
        humidity: 50,
        timestamp: '29-05-23T18:00',
      },
    ],
  };

  const mockTerrData = {
    terrariumdata: [
      {
        id: 1,
        minTemperature: 18.0,
        maxTemperature: 28.0,
        minCO2: 250.0,
        maxCO2: 480.0,
        minHumidity: 45.0,
        maxHumidity: 85.0,
        user: {
          email: 'aaa@aaa.com',
          username: 'AAA',
          password: 'aaa111',
        },
      },
    ],
  };

  jest.mock('../../data/terrarium-data.json', () => mockTerrData);
  jest.mock('../../data/graph-data.json', () => mockTempData);

  test('displays alert when temperature exceeds the maximum threshold', async () => {
    const { getByText, queryByText } = render(<TempAlert />);

    // Assert that the alert is initially hidden
    expect(queryByText(/Temperature alert!/i)).toBeNull();

    // Simulate a change in temperature data to exceed the maximum threshold
    mockTempData.graphdata[0].temperature = 30.5;
    
    await waitFor(() => {
      // Assert that the alert is displayed
      expect(getByText(/Temperature alert!/i)).toBeInTheDocument();
      expect(getByText(/The temperature exceeds the permitted maximum!/i)).toBeInTheDocument();
    });
  });

  test('hides alert when temperature is within the permitted range', async () => {
    const { getByText, queryByText } = render(<TempAlert />);

    // Simulate a change in temperature data to be within the permitted range
    mockTempData.graphdata[0].temperature = 25.0;
    
    await waitFor(() => {
      // Assert that the alert is hidden
      expect(queryByText(/Temperature alert!/i)).toBeNull();
    });
  });

  test('hides alert after a certain timeout', async () => {
    const { getByText, queryByText } = render(<TempAlert />);

    // Simulate a change in temperature data to exceed the maximum threshold
    mockTempData.graphdata[0].temperature = 30.5;
    
    await waitFor(() => {
      // Assert that the alert is displayed
      expect(getByText(/Temperature alert!/i)).toBeInTheDocument();
    });

    // Wait for the timeout period
    await waitFor(() => {
      // Assert that the alert is hidden after the timeout
      expect(queryByText(/Temperature alert!/i)).toBeNull();
    });
  });
});
