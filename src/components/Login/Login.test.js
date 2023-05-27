// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Login from "./Login"
// import axios from 'axios';

// jest.mock('axios');

// describe('Login Component', () => {
//   it('should update input values in the registration modal', async () => {
//     const { getByText, getByTestId } = render(<Login />);

//     // Click the "Register" button to open the modal
//     fireEvent.click(getByText('Register'));

//     // Verify that the modal is open
//     const modal = getByTestId('modal');
//     expect(modal).toBeInTheDocument();

//     // Find the input fields in the modal
//     const emailInput = getByTestId('registration-email');
//     const usernameInput = getByTestId('registration-username');
//     const passwordInput = getByTestId('registration-password');

//     // Type values into the input fields
//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });

//     // Verify that the input values have been updated
//     expect(emailInput.value).toBe('test@example.com');
//     expect(usernameInput.value).toBe('testuser');
//     expect(passwordInput.value).toBe('password123');

//     // Close the modal
//     fireEvent.click(getByText('Cancel'));

//     // Wait for the modal to be removed from the DOM
//     await waitFor(() => {
//       expect(queryByTestId('modal')).not.toBeInTheDocument();
//     });
//   });
// });
