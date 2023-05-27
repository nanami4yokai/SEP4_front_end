import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  it('should open and close the modal', async () => {
    const { getByText, getByTestId, queryByTestId } = render(<Login />);

    // Verify that the modal is initially closed
    expect(queryByTestId('modal')).toBeNull();

    // Click the "Register" button to open the modal
    fireEvent.click(getByText('Register'));
    const modal = getByTestId('modal');

    // Verify that the modal is open
    expect(modal).toBeInTheDocument();

    // Click the "Cancel" button to close the modal
    fireEvent.click(getByText('Cancel'));

    // Wait for the modal to be removed from the DOM
    await waitFor(() => {
      expect(queryByTestId('modal')).toBeNull();
    });
  });
});
