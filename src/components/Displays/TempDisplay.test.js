import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TempDisplay from './TempDisplay';

describe('TempDisplay', () => {
  const data = {
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

  it('should display temperature when element is found', () => {
    const { getByText } = render(<TempDisplay data={data} />);
    const temperatureElement = getByText('30.5 C');
    expect(temperatureElement).toBeInTheDocument();
  });

  it('should display "Element not found" when element is not found', () => {
    render(<TempDisplay data={data} />);
    const elementNotFoundElement = screen.queryByText(/Element not found/i);
    expect(elementNotFoundElement).toBeNull();
  });
});
