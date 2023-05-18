import React, {useState, useEffect} from 'react';
import './Displays.css';
import axios from 'axios';
// import myData from '../data/recordings-data.json' mockup file access

function CO2Display() {
  const [co2, setCo2] = useState(null);
  const [error, setError] = useState(null);

useEffect(() => {
const fetchData = async () => {
  try {
    const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00');
    if (response.data.length > 0) {
      const latestReading = response.data[0];
      setCo2(latestReading.co2);
    }
  } catch (error) {
    setError(error.message);
  }
};

fetchData();

const intervalId = setInterval(fetchData, 20000); // Update every 20 seconds

return () => clearInterval(intervalId); // Cleanup on unmount
}, []);

const roundedCo2 = co2 !== null ? co2.toFixed(0) : null;


return (
<div>
  {error ? (
    <p>Error: {error}</p>
  ) : (
    <div className="cobox">
      <div className="co">
        {roundedCo2 !== null ? <h1>{roundedCo2} ppm</h1> : <p>No data</p>}
      </div>
      <div className="co-description">
        <p>CO2</p>
      </div>
    </div>
  )}
</div>
);
}

export default CO2Display;



// Code for working with mockup file 
// function CO2Display(){
  
//   const showData = ({ id }) => {
//     const data = myData.readings;
  
//     const element = data.find((element) => element.id === id);
  
  
//     if (!element) {
//       return <div>Element not found</div>;
//     }
  
//     return (
//       <div className="cobox" key={element.id}>
//         <div className="co">
//           {element && <h1>{element.co2} ppm</h1>}
//         </div>
//         <div className="co-description">
//           <p>CO2</p>
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
  
// export default CO2Display;  