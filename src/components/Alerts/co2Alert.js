import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertStyling.css'
// import axios from 'axios';
// import { API_ENDPOINTS } from '../../config';
import terrData from '../../data/terrarium-data.json'
import co2Data from '../../data/graph-data.json'

export default function CO2Alert() {
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
    const checkCO2Threshold = () => {
      const latestCO2 = co2Data.graphdata[0].co2;
      const { minCO2, maxCO2 } = terrData.terrariumdata[0];

      const co2ExceedsThreshold = latestCO2 > maxCO2 || latestCO2 < minCO2;

      setShowAlert(co2ExceedsThreshold);

      if (co2ExceedsThreshold) {
        setTimeout(() => {
          setShowAlert(false);
        }, 5000); // Hide the alert after 2 seconds (adjust as needed)
      }
    };

    checkCO2Threshold();
  }, []);

  return (
    <div>
      <Alert className={`notification-alert ${showAlert ? 'show' : 'hide'}`} key='danger' variant='danger'>
        <div className='notif-content'>
          <div className='notif-header'>
            <div id='co2-circle'></div>
            <p>
              <b>CO2 alert!</b>
            </p>
          </div>
          <div className='notif-text'>
            <p>
              The CO2 exceeds the perimtted <b>maximum</b>!<br />
              Please take action!
            </p>
          </div>
        </div>
      </Alert>
    </div>
  );
}

