import React, {useState, useEffect} from 'react';
import './Displays.css';
import axios from 'axios';
import { useCO2Data } from './fetchingData/useCO2Data';
import myData from '../../data/recordings-data.json' 

// function CO2Display() {
//   const { co2Data, co2Error } = useCO2Data();


// const roundedCo2 = co2Data !== null ? co2Data.toFixed(0) : null;


// return (
// <div>
//   {co2Error ? (
//     <p>Error: {co2Error}</p>
//   ) : (
//     <div className="cobox">
//       <div className="co">
//         {roundedCo2 !== null ? <h1>{roundedCo2} ppm</h1> : <p>No data</p>}
//       </div>
//       <div className="co-description">
//         <p>CO2</p>
//       </div>
//     </div>
//   )}
// </div>
// );
// }

// export default CO2Display;



// Code for working with mockup file 
function CO2Display(){
  
  const showData = ({ id }) => {
    const data = myData.readings;
  
    const element = data.find((element) => element.id === id);
  
  
    if (!element) {
      return <div>Element not found</div>;
    }
  
    return (
      <div className='display-container'>
      <div className="cobox" key={element.id}>
        <div className="co">
          {element && <h1>{element.co2} ppm</h1>}
        </div>
        <div className="co-description">
          <p>CO2</p>
        </div>
      </div>
      </div>
    );
  };
  
  return (
    <div>
      {showData({ id : 1})} 
    </div>
  );
  
  
  }
  
export default CO2Display;  