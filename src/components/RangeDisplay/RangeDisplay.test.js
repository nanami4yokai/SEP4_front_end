import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RangeDisplay from './RangeDisplay';

// Mock the data used by the component
jest.mock('../../data/terrarium-data.json', () => ({
    terrariumdata: [
        {
            id: 1,
            minTemperature: 18.0,
            maxTemperature: 28.0,
            minCO2: 250.0,
            maxCO2: 480.0,
            minHumidity: 45.0,
            maxHumidity: 85.0,
        },
    ],
}));

describe('RangeDisplay', () => {

    test('renders component correctly', () => {
        const { getByText } = render(<RangeDisplay />);
        expect(getByText(/Temperature range/i)).toBeInTheDocument();
        expect(getByText(/CO2 range/i)).toBeInTheDocument();
        expect(getByText(/Humidity range/i)).toBeInTheDocument();
        expect(getByText(/Edit Parameters/i)).toBeInTheDocument();
    });

    test('opens modal when "Edit Parameters" button is clicked', () => {
        const { getByText, getByLabelText, queryAllByText } = render(<RangeDisplay />);
        const editParametersButton = getByText(/Edit Parameters/i);

        fireEvent.click(editParametersButton);

        const modalTitle = queryAllByText(/Edit Parameters/i)[1];
        expect(modalTitle).toBeInTheDocument();
        expect(getByLabelText('Temperature Min:')).toBeInTheDocument();
        expect(getByLabelText('Temperature Max:')).toBeInTheDocument();
        expect(getByLabelText('CO2 Min:')).toBeInTheDocument();
        expect(getByLabelText('CO2 Max:')).toBeInTheDocument();
        expect(getByLabelText('Humidity Min:')).toBeInTheDocument();
        expect(getByLabelText('Humidity Max:')).toBeInTheDocument();
    });
});
