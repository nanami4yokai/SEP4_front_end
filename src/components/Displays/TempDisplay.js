import React, {useState, useEffect} from 'react';
import './Displays.css';
import axios from 'axios';
import { useTempData } from './fetchingData/useTempData';
import myData from '../../data/recordings-data.json' 

// function TempDisplay() {
//   const { temperatureData, tempError} = useTempData();


//   const roundedTemperature = temperatureData !== null ? temperatureData.toFixed(1) : null;


//   return (
//     <div>
//       {tempError ? (
//         <p>Error: {tempError}</p>
//       ) : (
//         <div className="tempbox">
//           <div className="temp">
//             {roundedTemperature !== null ? <h1>{roundedTemperature} C</h1> : <p>No data</p>}
//           </div>
//           <div className="temp-description">
//             <p>Temperature</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TempDisplay;




// Code for working with mockup file 
function TempDisplay() {

    const showData = ({ id }) => {
        const data = myData.readings;
      
        const element = data.find((element) => element.id === id);

      
        if (!element) {
          return <div>Element not found</div>;
        }
      
        return (
          <div className='display-container'>
          <div className="tempbox" key={element.id}>
            <div className="temp">
              {element && <h1>{element.temperature} C</h1>}
            </div>
            <div className="temp-description">
              <p>Temperature</p>
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

export default TempDisplay;

