import 'jsdom-global/register';

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from "./Login"
import axios from 'axios';
import "jest-localstorage-mock";


jest.mock('axios');

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can log the error or handle it in a different way
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <div>Error occurred. Please check the console for more details.</div>;
      }
  
      return this.props.children;
    }
  }

describe('Login Component', () => {
  it('should update input values in the registration modal', async () => {
    const { getByText, getByTestId } = render(
    <ErrorBoundary>
    <Login />
    </ErrorBoundary>
    ); 

    // Click the "Register" button to open the modal
    const registerButton = screen.getByText((content, element) => {
        // Customize the text matching logic as per your component structure
        // For example, you might need to check the parent element's className or id
        return element.tagName.toLowerCase() === 'button' && content === 'Register';
      });
  
      fireEvent.click(registerButton);

    // Verify that the modal is open
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    // Find the input fields in the modal
    const emailInput = screen.getByTestId('registration-email');
    const usernameInput = screen.getByTestId('registration-username');
    const passwordInput = screen.getByTestId('registration-password');

    // Type values into the input fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Verify that the input values have been updated
    expect(emailInput.value).toBe('test@example.com');
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');

    // Close the modal
    fireEvent.click(screen.getByText('Cancel'));

    // Wait for the modal to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });
});
