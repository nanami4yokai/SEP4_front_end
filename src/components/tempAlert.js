import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertStyling.css'

export default function TempAlert() {
    return (
        <div>
            <Alert className='notification-alert' key='danger' variant='danger'>
                <div className='notif-content'>
                    <div className='notif-header'>
                        <div id='notif-circle'></div>
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
