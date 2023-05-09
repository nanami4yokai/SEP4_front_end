import React from 'react'
import TempMock from './components/tempMock';
import Sidebar from './components/sideBar';
import TempDisplay from './components/TempDisplay';
import CO2Display from './components/CO2Display';
import HumidDisplay from './components/HumidDisplay';

function App() {
  return (
    <div className="App">
      {/* <TempMock /> */}
      <Sidebar />
      <TempDisplay />
      <CO2Display/>
      <HumidDisplay/>
    </div>
  );
}

export default App;
