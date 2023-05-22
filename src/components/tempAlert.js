import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertStyling.css'
import axios from 'axios';

export default function TempAlert() {
    const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchAlertStatus = async () => {
      try {
        const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/alert');
        const alertStatus = response.data.alert; // Assuming the API response has an 'alert' field for the alert status
        setShowAlert(alertStatus);
        // if (alertStatus) {
        //     setTimeout(() => {
        //       setShowAlert(false);
        //     }, 300000); // Timeout after 5 minutes (300,000 milliseconds)
        // }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch initial alert status
    fetchAlertStatus();

    // Set up interval to periodically check for alert status
    // const interval = setInterval(fetchAlertStatus, 60000); // Check every 1 minute (60000 milliseconds)

    // // Clean up interval on component unmount
    // return () => clearInterval(interval);
  }, []);

    return (
        <div>
            <Alert className='notification-alert' key='danger' variant='danger'>
                <div className='notif-content'>
                    <div className='notif-header'>
                        <div id='temp-circle'></div>
                        <p><b>Temperature alert!</b></p>
                    </div>
                    <div className='notif-text'>
                        <p>The temperature exceeds the perimtted <b>maximum</b>!<br />
                            Please take action!</p>
                    </div>
                </div>
            </Alert>
        </div>
    )
}
