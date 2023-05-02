import React, {useState} from 'react'
import axios from 'axios';

function App() {
  return (
    <div className="app">
      <div className= "container">
        <div className="temp">
          <h1>25º</h1>
        </div>
        <div className="description" >
          <p> Current temperature</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
