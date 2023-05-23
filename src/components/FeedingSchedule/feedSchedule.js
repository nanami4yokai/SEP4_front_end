import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import foodTray from '../../images/food-tray.png'
import './feedSchedule.css'

export default function FeedSchedule() {
  const [datetime, setDatetime] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleDateTimeSetup = () => {
    setDatetime();
  };

  const handleAmountSetup = () => {
    setAmount();
  }

  const handleFrequencySetup = () => {
    setFrequency();
  }

  const handleFeederEdit = () => {
    setShowModal(true);
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  const handleInputs = () => {
    // Handle input logic here
    console.log('Input form submitted:', {
      datetime,
      amount,
      frequency,
    });
    handleModalClose();
  };

  return (
    <div className='schedule'>
      <div className='feedingSch'>
        <div className='header'>
          <img id='feeding-logo' src={foodTray} alt='feedingSch logo'></img>
          <p id='feedingSch-title'>Feeding schedule</p>
        </div>
        <div className='details'>
          <p>Next feeding time - 01/01/2024 12:00</p>
          <p>Amount - 200g</p>
          <p>Frequency - every 3 days</p>
        </div>
      </div>
      <div className='feedingSchButtons'>
        <button id='feedBttn'><b>Feed</b></button>
        <button id='editFeedBttn' type='button' onClick={handleFeederEdit}>Edit schedule</button>
      </div>

      {/* Feeding schedule editor Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <img id='feeding-logo' src={foodTray} alt='feedingSch logo'></img>
          <Modal.Title>Feeding schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='fields'>
            <div className='datetime'>
              <p>Date & time</p>
              <input
                type='text'
                id='datetime'
                name='datetime'
                placeholder='dd/mm/yy hh:mm'
                value={datetime}
                onChange={handleDateTimeSetup}
                className='input-field'
              />
            </div>
            <div className='amount'>
              <p>Amount</p>
              <input
                type='text'
                id='amount'
                name='amount'
                placeholder='_____ g'
                value={amount}
                onChange={handleAmountSetup}
                className='input-field'
              />
            </div>
            <div className='frequency'>
              <p>Frequency</p>
              <input
                type='text'
                id='frequency'
                name='frequency'
                placeholder='every _____'
                value={frequency}
                onChange={handleFrequencySetup}
                className='input-field'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='footerBttns'>
          <Button id='cancel-btn' variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button id='save-btn' variant="primary" onClick={handleFeederEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
