import React from 'react'
import Sidebar from './components/sideBar';
import TempDisplay from './components/TempDisplay';
import CO2Display from './components/CO2Display';
import HumidDisplay from './components/HumidDisplay';
import TempGraph from './components/tempGraph';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <TempDisplay />
      <CO2Display/>
      <HumidDisplay/>
      <TempGraph/>
    </div>
  );
}

export default App;
