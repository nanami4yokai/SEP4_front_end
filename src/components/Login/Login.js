import React, { useState } from 'react';
import './Login.css'
import { Modal, Button } from 'react-bootstrap'
jest.mock('../../images/registration.png', () => 'mock-image-path');
import axios from 'axios';
import { API_ENDPOINTS } from '../../config';

const Login = ({ onTerrariumsUpdate }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleLogin = async () => {
    try {
      const response = await fetch('https://terrasense-service-dot-terrasense.ew.r.appspot.com/public/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token } = await response.json();

      localStorage.setItem('jwtToken', token);

      console.log('Login successful');
      const authenticatedRequest = new Request('https://terrasense-service-dot-terrasense.ew.r.appspot.com/public/register', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const authenticatedResponse = await fetch(authenticatedRequest);

      if (authenticatedResponse.ok) {
        const authenticatedData = await authenticatedResponse.json();
        console.log('Authenticated data:', authenticatedData);
      } else {
        console.error('Authenticated request failed');
      }

      const terrariumsResponse = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/all', authenticatedRequest);

      if (terrariumsResponse.status === 200) {
        const terrariumsData = terrariumsResponse.data;
        console.log('Terrariums:', terrariumsData);
        // Update the terrariums in the parent component
        onTerrariumsUpdate(terrariumsData);
      } else {
        console.error('Failed to fetch terrariums');
      }

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleReg = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch('https://terrasense-service-dot-terrasense.ew.r.appspot.com/public/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

<<<<<<< HEAD
      const { token } = await response.json();
      localStorage.setItem('jwtToken', token);
      console.log('Registration successful');
      handleModalClose();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="background">
      <div className="flex-container">
        <div className="name">TerraSense</div>
        <div className="loginBox">
          <div className="loginForm">
            <div className="formRow">
              <label htmlFor="username"><b>Username:</b></label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="formRow">
              <label htmlFor="password"><b>Password:</b></label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="loginButton" type="button" onClick={handleLogin}>
              Login
            </button>
            <button className="regButton" type="button" onClick={handleReg}>
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Reg Modal */}
      <Modal show={showModal} onHide={handleModalClose} data-testid="modal">
        <Modal.Header closeButton>
          <img id="reg-logo" src={registration} alt="Registration logo" />
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="registration-email">
            <b>Email:</b>
          </label>
          <input
            type="text"
            id="registration-email"
            name="registration-email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <label htmlFor="registration-username">
            <b>Username:</b>
          </label>
          <input
            type="text"
            id="registration-username"
            name="registration-username"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <label htmlFor="registration-password">
            <b>Password:</b>
          </label>
          <input
            type="password"
            id="registration-password"
            name="registration-password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button id="cancel-btn" variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button id="reg-btn" variant="primary" onClick={handleRegistration}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
=======
    const handleLogin = async () => {
        try {
          const response = await axios.post(
            API_ENDPOINTS.login,
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
          );
    
          if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);
    
            console.log('Login successful');
            const authenticatedResponse = await axios.get(
              API_ENDPOINTS.login,
              {
                headers: { 'Authorization': `Bearer ${token}` }
              }
            );
    
            if (authenticatedResponse.status === 200) {
              const authenticatedData = authenticatedResponse.data;
              console.log('Authenticated data:', authenticatedData);
            } else {
              console.error('Authenticated request failed');
            }
    
            const terrariumsResponse = await axios.get(
              API_ENDPOINTS.terrariums,
              {
                headers: { 'Authorization': `Bearer ${token}` }
              }
            );
    
            if (terrariumsResponse.status === 200) {
              const terrariumsData = terrariumsResponse.data;
              console.log('Terrariums:', terrariumsData);
              onTerrariumsUpdate(terrariumsData);
            } else {
              console.error('Failed to fetch terrariums');
            }
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      };

    const handleReg = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }


    const handleRegistration = async () => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.register,
        { email, username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);

        console.log('Registration successful');
        handleModalClose();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

    return (
        <div className="background">
            <div className="flex-container">
                <div className="name">TerraSense</div>
                <div className="loginBox">
                    <div className="loginForm">
                        <div className="formRow">
                            <label htmlFor="username"><b>Username:</b></label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>

                        <div className="formRow">
                            <label htmlFor="password"><b>Password:</b></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <button className="loginButton" type="button" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="regButton" type="button" onClick={handleReg}>
                            Register
                        </button>
                    </div>
                </div>
            </div >

            <Modal show={showModal} onHide={handleModalClose}className='reg-modal'>
                <Modal.Header closeButton>
                    <img id="reg-logo" src={registration} alt="Registration logo" />
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="registration-email">
                        <b>Email:</b>
                    </label>
                    <input
                        type="text"
                        id="registration-email"
                        name="registration-email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <br />
                    <label htmlFor="registration-username">
                        <b>Username:</b>
                    </label>
                    <input
                        type="text"
                        id="registration-username"
                        name="registration-username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <br />
                    <label htmlFor="registration-password">
                        <b>Password:</b>
                    </label>
                    <input
                        type="password"
                        id="registration-password"
                        name="registration-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button id='cancel-btn' variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button id='reg-btn' variant="primary" onClick={handleRegistration}>
                        Register
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
>>>>>>> main
};

export default Login;
