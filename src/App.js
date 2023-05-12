import React from 'react'
import Sidebar from './components/sideBar';
import TempDisplay from './components/TempDisplay';
import CO2Display from './components/CO2Display';
import HumidDisplay from './components/HumidDisplay';
import TempGraph from './components/tempGraph';
import HumidityGraph from './components/humidityGraph'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <TempDisplay />
      <CO2Display/>
      <HumidDisplay/>
      <TempGraph/>
      <br/>
      <HumidityGraph/>
    </div>
  );
}

export default App;
