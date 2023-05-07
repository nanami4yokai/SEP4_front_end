import React, { useEffect, useState } from 'react'
import axios from 'axios';
import getData from './components/sensorData'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setData(data);
    }).catch((error) => {
      console.error(error);
    });
  })

  const showData = () => {
    return data.map((element) => (
      <div className="container" >
        <div className="temp" key={element.temperature}>{element && (
          <h1>{element.temperature}</h1>)}
        </div>
        <div className="description" >
          <p> Current temperature</p>
        </div>
      </div>

    ))
  }

  return (
    <div>
      {showData()}
    </div>
  );
}

export default App;
