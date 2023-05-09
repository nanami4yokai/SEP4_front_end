import React, {useState, useEffect} from 'react';
import './Displays.css';
import myData from '../data/recordings-data.json'

function CO2Display(){

    // const [co2, setCo2] = useState(null);
  
    //   useEffect(() => {
    //       const intervalId = setInterval(() => {
    //           fetch('api/co2') // insert api refrence when we get it 
    //           .then(response => response.json())
    //           .then(data => { setCo2(data.co2);
    //           });
    //       })
    //   }, 20000); //Update every 20 sec
  
  //   return (
  //     <div>
  //         <h2>CO2</h2>
  //         {co2 !== null ? (
  //             <p>{co2}</p>
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
      <div className="cobox" key={element.id}>
        <div className="co">
          {element && <h1>{element.co2} C</h1>}
        </div>
        <div className="co-description">
          <p>CO2</p>
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