import React from 'react';
import foodTray from '../../images/food-tray.png'
import './feedSchedule.css'

export default function FeedSchedule() {
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
        <button id='editFeedBttn'>Edit schedule</button>
      </div>
    </div>
  )
}
