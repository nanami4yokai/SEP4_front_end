import 'jsdom-global/register';

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Sidebar from './Sidebar';

jest.mock('axios');

describe('Sidebar', () => {
  beforeEach(() => {
    localStorage.setItem('jwtToken', 'mockToken');
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test('renders the sidebar with terrarium links', () => {
    const terrariums = [
      { id: 1, name: 'Terrarium 1' },
      { id: 2, name: 'Terrarium 2' },
      { id: 3, name: 'Terrarium 3' },
    ];

    render(<Sidebar terrariums={terrariums} />);

    terrariums.forEach((terrarium) => {
      const link = screen.getByText(terrarium.name);
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe(`/terrarium/${terrarium.id}`);
    });
  });

  test('shows the add terrarium modal when the button is clicked', () => {
    render(<Sidebar terrariums={[]} />);

    const addTerrariumButton = screen.getByTestId('add-terrarium');
    fireEvent.click(addTerrariumButton);

    const modalTitle = screen.getByText('Add terrarium');
    expect(modalTitle).toBeInTheDocument();
  });

  test('closes the add terrarium modal when cancel button is clicked', () => {
    render(<Sidebar terrariums={[]} />);

    const addTerrariumButton = screen.getByTestId('add-terrarium');
    fireEvent.click(addTerrariumButton);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    const modalTitle = screen.queryByText('Add terrarium');
    expect(modalTitle).not.toBeInTheDocument();
  });

  test('sends a POST request and adds a new terrarium when save button is clicked', async () => {
    render(<Sidebar terrariums={[]} />);

    const addTerrariumButton = screen.getByTestId('add-terrarium');
    fireEvent.click(addTerrariumButton);

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'New Terrarium' } });

    const idInput = screen.getByLabelText('ID');
    fireEvent.change(idInput, { target: { value: '123' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://terrasense-service-dot-terrasense.ew.r.appspot.com/terrarium/create',
        { id: '123', name: 'New Terrarium' },
        {
          headers: {
            Authorization: 'Bearer mockToken',
          },
        }
      );
    });

    const addedTerrariumLink = screen.getByText('New Terrarium');
    expect(addedTerrariumLink).toBeInTheDocument();
    expect(addedTerrariumLink.getAttribute('href')).toBe('/terrarium/123');
  });
});
