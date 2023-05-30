import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TempAlert from './tempAlert';

describe('TempAlert', () => {
  test('displays alert when temperature exceeds the maximum threshold', async () => {
    const { getByText } = render(<TempAlert />);

    await waitFor(() => {
      // Assert that the alert is displayed
      const alertText = getByText('Temperature alert!');
      expect(alertText).toBeInTheDocument();
    });
  });

  test('hides alert when temperature is within the permitted range', async () => {
    const { queryByTestId } = render(<TempAlert />);

    await waitFor(() => {
      // Assert that the alert is hidden
      expect(queryByTestId('temp-alert')).toBeNull();
    });
  });

  test('hides alert after a certain timeout', async () => {
    jest.useFakeTimers();
  
    const { queryByText } = render(<TempAlert />);
  
    await waitFor(() => {
      // Assert that the alert is displayed
      expect(queryByText('Temperature alert!')).toBeInTheDocument();
    });
  
    // Fast-forward time to exceed the timeout
    jest.advanceTimersByTime(5000);
  
    await waitFor(() => {
      // Assert that the alert is hidden after the timeout
      expect(queryByText('temp-alert')).toBeNull();
    });
  
    jest.useRealTimers();
  });
});
