import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertStyling.css'

export default function HumidityAlert() {
    return (
        <div>
            <Alert className='notification-alert' key='danger' variant='danger'>
                <div className='notif-content'>
                    <div className='notif-header'>
                        <div id='hum-circle'></div>
                        <p><b>Humidity alert!</b></p>
                    </div>
                    <div className='notif-text'>
                        <p>The humidity exceeds the perimtted <b>maximum</b>!<br />
                            Please take action!</p>
                    </div>
                </div>
            </Alert>
        </div>
    )
}
