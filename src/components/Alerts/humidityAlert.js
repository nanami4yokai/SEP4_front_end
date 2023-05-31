import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertStyling.css'
// import axios from 'axios';
// import { API_ENDPOINTS } from '../../config';
import terrData from '../../data/terrarium-data.json'
import humData from '../../data/graph-data.json'

export default function HumidityAlert() {
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
    const checkHumidityThreshold = () => {
      const latestHumidity = humData.graphdata[0].humidity;
      const { minHumidity, maxHumidity } = terrData.terrariumdata[0];

      const humidityExceedsThreshold = latestHumidity > maxHumidity || latestHumidity < minHumidity;

      setShowAlert(humidityExceedsThreshold);

      if (humidityExceedsThreshold) {
        setTimeout(() => {
          setShowAlert(false);
        }, 5000); // Hide the alert after 2 seconds (adjust as needed)
      }
    };

    checkHumidityThreshold();
  }, []);

  return (
    <div>
      <Alert className={`notification-alert ${showAlert ? 'show' : 'hide'}`} key='danger' variant='danger'>
        <div className='notif-content'>
          <div className='notif-header'>
            <div id='hum-circle'></div>
            <p>
              <b>Humidity alert!</b>
            </p>
          </div>
          <div className='notif-text'>
            <p>
              The humidity exceeds the perimtted <b>limits</b>!<br />
              Please take action!
            </p>
          </div>
        </div>
      </Alert>
    </div>
  );
}
