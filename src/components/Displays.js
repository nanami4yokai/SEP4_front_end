import React, {useState, useEffect} from 'react';
import './Displays.css';
import myData from '../data/recordings-data.json'


function TempDisplay() {

    // const [temperature, setTemperature] = useState(null);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         fetch('api/temperature') // insert api refrence when we get it 
    //         .then(response => response.json())
    //         .then(data => { setTemperature(data.temperature);
    //         });
    //     })
    // }, 20000); //Update every 20 sec

    const showData = ({ id }) => {
        const data = myData.readings;
      
        const element = data.find((element) => element.id === id);

      
        if (!element) {
          return <div>Element not found</div>;
        }
      
        return (
          <div className="tempbox" key={element.id}>
            <div className="temp">
              {element && <h1>{element.temperature} C</h1>}
            </div>
            <div className="description">
              <p>Temperature</p>
            </div>
          </div>
        );
      };
      
      return (
        <div>
          {showData({ id : 1})} 
        </div>
      );
    

    // return (
    //     <div>
    //         <h2>Temperature</h2>
    //         {temperature !== null ? (
    //             <p>{temperature}</p>
    //         ) : (
    //             <p>No data</p>
    //         )}
    //     </div>
    // );
}

export default TempDisplay;
