import React from 'react'
import Sidebar from './components/sideBar';
import TempDisplay from './components/TempDisplay';
import CO2Display from './components/CO2Display';
import HumidDisplay from './components/HumidDisplay';
import TempGraph from './components/tempGraph';
import HumidityGraph from './components/humidityGraph'
import CO2Graph from './components/co2Graph';
import RangeDisplay from './components/RangeDisplay';


function App() {
  return (
    <div className="App">
      <Sidebar />
      <RangeDisplay/>
      <TempDisplay />
      <CO2Display/>
      <HumidDisplay/>
      <TempGraph/>
      <br/>
      <CO2Graph/>
      <br/>
      <HumidityGraph/>
    </div>
  );
}

export default App;
