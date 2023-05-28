import 'jsdom-global/register';
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DataFilter from './filter';
import { JSDOM } from 'jsdom';


jest.mock('react-bootstrap', () => ({
    ...jest.requireActual('react-bootstrap'),
    Dropdown: ({ children }) => <div>{children}</div>,
  }));
  
  test('renders without errors', () => {
    render(<DataFilter />);
  });

  test('calls handleFilterOptionChange when a dropdown item Realtime is clicked', async () => {
    const setFilterOption = jest.fn();
    render(<DataFilter filterOption="" setFilterOption={setFilterOption} setDataRange={() => {}} />);
  
    const dropdownToggleButton = screen.getByTestId('dropdown-toggle');
    fireEvent.click(dropdownToggleButton);
  
    await waitFor(() => {
      const dropdownItem = screen.getByText('Real time');
      fireEvent.click(dropdownItem);
    });
  
    expect(setFilterOption).toHaveBeenCalledWith('realtime');
  });
  
  test('calls handleFilterOptionChange when a dropdown item Daily is clicked', async () => {
    const setFilterOption = jest.fn();
    render(<DataFilter filterOption="" setFilterOption={setFilterOption} setDataRange={() => {}} />);
  
    const dropdownToggleButton = screen.getByTestId('dropdown-toggle');
    fireEvent.click(dropdownToggleButton);
  
    await waitFor(() => {
      const dropdownItem = screen.getByText('Daily');
      fireEvent.click(dropdownItem);
    });
  
    expect(setFilterOption).toHaveBeenCalledWith('daily');
  });

  test('calls handleFilterOptionChange when a dropdown item Weekly is clicked', async () => {
    const setFilterOption = jest.fn();
    render(<DataFilter filterOption="" setFilterOption={setFilterOption} setDataRange={() => {}} />);
  
    const dropdownToggleButton = screen.getByTestId('dropdown-toggle');
    fireEvent.click(dropdownToggleButton);
  
    await waitFor(() => {
      const dropdownItem = screen.getByText('Weekly');
      fireEvent.click(dropdownItem);
    });
  
    expect(setFilterOption).toHaveBeenCalledWith('weekly');
  });

  test('calls handleFilterOptionChange when a dropdown item Monthly is clicked', async () => {
    const setFilterOption = jest.fn();
    render(<DataFilter filterOption="" setFilterOption={setFilterOption} setDataRange={() => {}} />);
  
    const dropdownToggleButton = screen.getByTestId('dropdown-toggle');
    fireEvent.click(dropdownToggleButton);
  
    await waitFor(() => {
      const dropdownItem = screen.getByText('Monthly');
      fireEvent.click(dropdownItem);
    });
  
    expect(setFilterOption).toHaveBeenCalledWith('monthly');
  });






// describe('DataFilter Component', () => {
//   it('should change the filter option when a dropdown item is clicked', () => {
//     const setFilterOption = jest.fn();
//     const setDataRange = jest.fn();
//     const { window } = new JSDOM();
// global.document = window.document;

//     const { getByRole, getByText } = render(
//       <DataFilter
//         filterOption="realtime"
//         setFilterOption={setFilterOption}
//         setDataRange={setDataRange}
//       />
//     );

//     // Open the dropdown menu
//     fireEvent.click(getByRole('button'));

//     // Click the dropdown item with the text "Daily"
//     fireEvent.click(getByText('Daily'));

//     // Verify that the filter option is changed
//     expect(setFilterOption).toHaveBeenCalledWith('daily');
//   });
// });
