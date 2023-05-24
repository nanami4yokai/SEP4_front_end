import React, {useState, useEffect} from 'react';
import './Displays.css';
import axios from 'axios';
import { useHumData } from './fetchingData/useHumData';
// import myData from '../data/recordings-data.json' mockup access

function HumidDisplay() {
    const { humidityData, humError} = useHumData();


const roundedHumidity = humidityData !== null ? humidityData.toFixed(0) : null;


return (
<div>
  {humError ? (
    <p>Error: {humError}</p>
  ) : (
    <div className="humidbox">
      <div className="humid">
        {roundedHumidity !== null ? <h1>{roundedHumidity} %</h1> : <p>No data</p>}
      </div>
      <div className="humid-description">
        <p>Humidity</p>
      </div>
    </div>
  )}
</div>
);
}

export default HumidDisplay;

// Code for working with mockup file 
// function HumidDisplay(){
  
//   const showData = ({ id }) => {
//     const data = myData.readings;
  
//     const element = data.find((element) => element.id === id);
  
  
//     if (!element) {
//       return <div>Element not found</div>;
//     }
  
//     return (
//       <div className="humidbox" key={element.id}>
//         <div className="humid">
//           {element && <h1>{element.humidity} %</h1>}
//         </div>
//         <div className="humid-description">
//           <p>Humidity</p>
//         </div>
//       </div>
//     );
//   };
  
//   return (
//     <div>
//       {showData({ id : 1})} 
//     </div>
//   );
  
  
//   }
  
// export default HumidDisplay; 

