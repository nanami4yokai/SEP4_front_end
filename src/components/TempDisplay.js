import React, {useState, useEffect} from 'react';
import './Displays.css';
import axios from 'axios';
// import myData from '../data/recordings-data.json' mockup file 

function TempDisplay() {
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00');
        if (response.data.length > 0) {
          const latestReading = response.data[0];
          setTemperature(latestReading.temperature);
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
        <div className="tempbox">
          <div className="temp">
            {temperature !== null ? <h1>{temperature} C</h1> : <p>No data</p>}
          </div>
          <div className="temp-description">
            <p>Temperature</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TempDisplay;




// Code for working with mockup file 
// function TempDisplay() {

//     const showData = ({ id }) => {
//         const data = myData.readings;
      
//         const element = data.find((element) => element.id === id);

      
//         if (!element) {
//           return <div>Element not found</div>;
//         }
      
//         return (
//           <div className="tempbox" key={element.id}>
//             <div className="temp">
//               {element && <h1>{element.temperature} C</h1>}
//             </div>
//             <div className="temp-description">
//               <p>Temperature</p>
//             </div>
//           </div>
//         );
//       };
      
//       return (
//         <div>
//           {showData({ id : 1})} 
//         </div>
//       );
    
// }

// export default TempDisplay;

