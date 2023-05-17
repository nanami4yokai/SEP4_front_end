import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertStyling.css'

export default function CO2Alert() {
    return (
        <div>
            <Alert className='notification-alert' key='danger' variant='danger'>
                <div className='notif-content'>
                    <div className='notif-header'>
                        <div id='co2-circle'></div>
                        <p><b>CO2 alert!</b></p>
                    </div>
                    <div className='notif-text'>
                        <p>The CO2 exceeds the perimtted <b>maximum</b>!<br />
                            Please take action!</p>
                    </div>
                </div>
            </Alert>
        </div>
    )
}
