import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'
import "./Sidebar.css";
import chameleon from "../../images/chameleon.png";
import user from "../../images/user.png";
import plus from '../../images/plus.png'

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [terrariums, setTerrariums] = useState([
    { id: 1, name: "Terrarium 1" },
    { id: 2, name: "Terrarium 2" },
    { id: 3, name: "Terrarium 3" },
  ]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const addTerrarium = () => {
    setShowModal(true);
  };

  const handleTerrariumAdd = () => {
    const newTerrarium = {
      id: id,
      name: name
    };
    setTerrariums([...terrariums, newTerrarium]);
    handleModalClose();
    navigate(`/terrarium/${newTerrarium.id}`); // Navigate to the new terrarium page
  };  

  const handleNameSetup = (event) => {
    setName(event.target.value);
  };

  const handleIDSetup = (event) => {
    setID(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  }

  const handleInputs = () => {
    // Handle input logic here
    console.log('Input form submitted:', {
      name,
      id,
    });
    handleModalClose();
  };

  return (
    <div className={`sidebar ${collapsed ? "" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleCollapse}>
        {collapsed ? "<<" : ">>"}
      </button>
      <div className="sidebar-content">
        <img id="logo" src={chameleon} alt="Logo" />

        <div className="user">
          <img id="avatar" src={user} alt="Avatar" />
          <div className="user-info">
            <p id="welcome-mssg">Welcome, admin</p>
            <div className="user-info-bttns">
              <button id="log-out">Log out</button>
              <button id="edit-user">Edit user</button>
            </div>
          </div>
        </div>
      </div>
      <hr id="hr" />

      <ul className="sidebar-nav">
        {terrariums.map((terrarium) => (
          <li key={terrarium.id}>
            <Link to={`/terrarium/${terrarium.id}`}>{terrarium.name}</Link>
          </li>
        ))}
      </ul>

      <div className="add-terrarium">
        <button id="add-terrarium" onClick={addTerrarium}>
          + Add terrarium
        </button>
      </div>

      {/* Add terrarium Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <img id="plusLogo" src={plus} alt='plus logo'></img>
          <Modal.Title>Add terrarium</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='fields'>
            <div className='name'>
              <p>Name</p>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={handleNameSetup}
                className='input-field'
              />
            </div>
            <div className='id'>
              <p>ID</p>
              <input
                type='number'
                id='id'
                name='id'
                placeholder='Device'
                value={id}
                onChange={handleIDSetup}
                className='input-field'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='footerBttns'>
          <Button id='cancel-btn' variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button id='save-btn' variant="primary" onClick={handleTerrariumAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sidebar;
