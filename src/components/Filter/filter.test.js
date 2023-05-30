import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DataFilter from './filter';

describe('DataFilter Component', () => {
  it('should change the filter option when a dropdown item is clicked', () => {
    const setFilterOption = jest.fn();
    const setDataRange = jest.fn();

    const { getByRole, getByText } = render(
      <DataFilter
        filterOption="realtime"
        setFilterOption={setFilterOption}
        setDataRange={setDataRange}
      />
    );

    // Open the dropdown menu
    fireEvent.click(getByRole('button'));

    // Click the dropdown item with the text "Daily"
    fireEvent.click(getByText('Daily'));

    // Verify that the filter option is changed
    expect(setFilterOption).toHaveBeenCalledWith('daily');
  });
});
