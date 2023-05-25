import React, { useState } from 'react';
import './Login.css'
import { Modal, Button } from 'react-bootstrap'
import registration from '../../images/registration.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

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
            </div >

            {/* Reg Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
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
};

export default Login;
