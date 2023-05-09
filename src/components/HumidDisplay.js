import React, {useState, useEffect} from 'react';
import './Displays.css';
import myData from '../data/recordings-data.json'

function HumidDisplay(){

    // const [humid, setHumid] = useState(null);
  
    //   useEffect(() => {
    //       const intervalId = setInterval(() => {
    //           fetch('api/humid') // insert api refrence when we get it 
    //           .then(response => response.json())
    //           .then(data => { setHumid(data.humid);
    //           });
    //       })
    //   }, 20000); //Update every 20 sec
  
  //   return (
  //     <div>
  //         <h2>Humidity</h2>
  //         {humid !== null ? (
  //             <p>{humid}</p>
  //         ) : (
  //             <p>No data</p>
  //         )}
  //     </div>
  // ); prep for API
  
  const showData = ({ id }) => {
    const data = myData.readings;
  
    const element = data.find((element) => element.id === id);
  
  
    if (!element) {
      return <div>Element not found</div>;
    }
  
    return (
      <div className="humidbox" key={element.id}>
        <div className="humid">
          {element && <h1>{element.humidity} %</h1>}
        </div>
        <div className="humid-description">
          <p>Humidity</p>
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
  
export default HumidDisplay; 