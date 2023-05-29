import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './RangeDisplay.css';
import param from "../../images/param.png";
import rangesData from '../../data/terrarium-data.json';

function RangeDisplay() {
  const terrariumData = rangesData.terrariumdata.find(terrarium => terrarium.id === 1);

  const [temperatureRange, setTemperatureRange] = useState({
    min: terrariumData.minTemperature,
    max: terrariumData.maxTemperature,
  });
  const [co2Range, setCO2Range] = useState({
    min: terrariumData.minCO2,
    max: terrariumData.maxCO2,
  });
  const [humidityRange, setHumidityRange] = useState({
    min: terrariumData.minHumidity,
    max: terrariumData.maxHumidity,
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleSave = async () => {
    // Implement your save logic here
  };

  const handleEditParameters = () => {
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <>
      <div className="range-display">
        <div className="temp-ranges">
          <div id='t-circle'></div>
          <p>Temperature range: {temperatureRange.min}°C - {temperatureRange.max}°C</p>
        </div>
        <div className="co2-ranges">
          <div id='c-circle'></div>
          <p>CO2 range: {co2Range.min}ppm - {co2Range.max}ppm</p>
        </div>
        <div className="hum-ranges">
          <div id='h-circle'></div>
          <p>Humidity range: {humidityRange.min}% - {humidityRange.max}%</p>
        </div>
        <Button id="edit-parameters" variant="primary" onClick={handleEditParameters}>
          Edit Parameters
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(true)} centered>
        <Modal.Header closeButton>
          <img id="param-logo" src={param} alt="Parameter logo" />
          <Modal.Title>Edit Parameters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='parameter-grid'>
            <div className="parameter-input">
              <label htmlFor="temperatureMin">Temperature Min:</label>
              <input
                type="number"
                id="temperatureMin"
                value={temperatureRange.min}
                onChange={(e) => setTemperatureRange({ ...temperatureRange, min: parseInt(e.target.value) })}
              />
            </div>
            <div className="parameter-input">
              <label htmlFor="temperatureMax">Temperature Max:</label>
              <input
                type="number"
                id="temperatureMax"
                value={temperatureRange.max}
                onChange={(e) => setTemperatureRange({ ...temperatureRange, max: parseInt(e.target.value) })}
              />
            </div>
            <div className="parameter-input">
              <label htmlFor="co2Min">CO2 Min:</label>
              <input
                type="number"
                id="co2Min"
                value={co2Range.min}
                onChange={(e) => setCO2Range({ ...co2Range, min: parseInt(e.target.value) })}
              />
            </div>
            <div className="parameter-input">
              <label htmlFor="co2Max">CO2 Max:</label>
              <input
                type="number"
                id="co2Max"
                value={co2Range.max}
                onChange={(e) => setCO2Range({ ...co2Range, max: parseInt(e.target.value) })}
              />
            </div>
            <div className="parameter-input">
              <label htmlFor="humidityMin">Humidity Min:</label>
              <input
                type="number"
                id="humidityMin"
                value={humidityRange.min}
                onChange={(e) => setHumidityRange({ ...humidityRange, min: parseInt(e.target.value) })}
              />
            </div>
            <div className="parameter-input">
              <label htmlFor="humidityMax">Humidity Max:</label>
              <input
                type="number"
                id="humidityMax"
                value={humidityRange.max}
                onChange={(e) => setHumidityRange({ ...humidityRange, max: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id="cancel-button" variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button id="save-button" variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RangeDisplay;
