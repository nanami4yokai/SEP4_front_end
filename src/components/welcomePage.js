import React from 'react'
import './welcomePage.css'
import pets from '../images/pets.png'

export default function WelcomePage() {
    return (
        <div className= 'welcome-msg'>
            <p id='welcome'>Welcome, user!</p>
            <p id='2'>You are using <i>TerraSense</i>. Please take the following instructions to get started with your first terrarium:</p>
            <p id='3'>1. Navigate to the side menu and select “Add terrarium button”.<br />
                2. A form will show up. Please fill in the form with the necessary information about the name you want to register your terrarium as,
                and device you want to register. Save the information.<br />
                3. Once you are done registering the terrarium, you will be able to see the name you chose and the device id. You will also see empty graphs
                that will fill in once you chose sensor ranges and launch the device.<br />
                4. Next, navigate to the “Edit parameters” button.<br />
                5. A form will show up. Fill it in with the necessary information about the minimum and maximum ranges of the sensors. Save the information.<br />
                6. After setting the ranges, the graphs will start showcasing sensor information.  </p>
            <p id='4'>Additionally, you will be able to set up a feeding schedule that will make sure to feed your pets automatically, add, remove or edit information
                about your pets and receive alerts in case the sensors go beyond the set limits, so you can take action on preventing a dangerous environment
                for your pets. </p>
            <p id='5'>Have fun!</p>
            <p id='signature'>Sincerely, <i>TerraSense</i> development team.
                <img id="paw-sign" src={pets} alt="Paw signature" />
            </p>
        </div>
    )
}
