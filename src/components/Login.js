import React, { useState } from 'react';
import './Login.css'
import { Modal, Button } from 'react-bootstrap'
import registration from '../images/registration.png'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login form submitted:', {
            username,
            password,
        });
    };

    const handleReg = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleRegistration = () => {
        // Handle reg logic here
        console.log('Registration form submitted:', {
            username, password,
        });
        handleModalClose();
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
