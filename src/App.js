import React from 'react'
import TempMock from './components/tempMock';
import Sidebar from './components/sideBar';
import Displays from './components/Displays';
import CO2Display from './components/CO2Display';

function App() {
  return (
    <div className="App">
      {/* <TempMock /> */}
      <Sidebar />
      <Displays />
      <CO2Display/>
    </div>
  );
}

export default App;
