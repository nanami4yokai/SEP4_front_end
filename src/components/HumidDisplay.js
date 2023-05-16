import React, {useState, useEffect} from 'react';
import './Displays.css';
import axios from 'axios';
// import myData from '../data/recordings-data.json' mockup access

function HumidDisplay() {
    const [humidity, setHumid] = useState(null);
    const [error, setError] = useState(null);

useEffect(() => {
const fetchData = async () => {
  try {
    const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?quantity=6');
    if (response.data.length > 0) {
      const latestReading = response.data[0];
      setHumid(latestReading.humidity);
    }
  } catch (error) {
    setError(error.message);
  }
};

fetchData();

const intervalId = setInterval(fetchData, 20000); // Update every 20 seconds

return () => clearInterval(intervalId); // Cleanup on unmount
}, []);

return (
<div>
  {error ? (
    <p>Error: {error}</p>
  ) : (
    <div className="humidbox">
      <div className="humid">
        {humidity !== null ? <h1>{humidity} %</h1> : <p>No data</p>}
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

