import React, { useState } from 'react';
import './Login.css'
import { Modal, Button } from 'react-bootstrap'
import registration from '../../images/registration.png'
import axios from 'axios';
import { API_ENDPOINTS } from '../../config';

const Login = ({ onTerrariumsUpdate}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };



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
          setErrorMessage('Login failed. Please check your credentials.');
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
      setErrorMessage('Registration failed. Please try again later.');
    }
  };

    return (
        <div className="background">
            <div className="flex-container">
                <div className="name">TerraSense</div>
                <div className="loginBox">
                    <div className="loginForm">
                    {errorMessage && <div className="error">{errorMessage}</div>}
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
                    {errorMessage && <div className="error">{errorMessage}</div>}
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
};

export default Login;
