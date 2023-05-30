import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertStyling.css'
// import axios from 'axios';
// import { API_ENDPOINTS } from '../../config';
import terrData from '../../data/terrarium-data.json'
import tempData from '../../data/graph-data.json'

export default function TempAlert() {
  const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {
  //   const fetchAlertStatus = async () => {
  //     try {
  //       const response = await axios.get(API_ENDPOINTS.alert);
  //       const alertStatus = response.data.alert; // Assuming the API response has an 'alert' field for the alert status
  //       setShowAlert(alertStatus);
  //       // if (alertStatus) {
  //       //     setTimeout(() => {
  //       //       setShowAlert(false);
  //       //     }, 300000); // Timeout after 5 minutes (300,000 milliseconds)
  //       // }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchAlertStatus();

  //   // Set up interval to periodically check for alert status
  //   // const interval = setInterval(fetchAlertStatus, 60000); // Check every 1 minute (60000 milliseconds)

  //   // // Clean up interval on component unmount
  //   // return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const checkTemperatureThreshold = () => {
      const latestTemperature = tempData.graphdata[0].temperature;
      const { minTemperature, maxTemperature } = terrData.terrariumdata[0];

      const temperatureExceedsThreshold = latestTemperature > maxTemperature || latestTemperature < minTemperature;

      setShowAlert(temperatureExceedsThreshold);

      if (temperatureExceedsThreshold) {
        setTimeout(() => {
          setShowAlert(false);
        }, 5000); // Hide the alert after 2 seconds (adjust as needed)
      }
    };

    checkTemperatureThreshold();
  }, []);

  return (
    <div>
      <Alert className={`notification-alert ${showAlert ? 'show' : 'hide'}`} key='danger' variant='danger'>
        <div className='notif-content'>
          <div className='notif-header'>
            <div id='temp-circle'></div>
            <p>
              <b>Temperature alert!</b>
            </p>
          </div>
          <div className='notif-text'>
            <p>
              The temperature exceeds the permitted <b>maximum</b>! <br />
              Please take action!
            </p>
          </div>
        </div>
      </Alert>
    </div>
  );
}