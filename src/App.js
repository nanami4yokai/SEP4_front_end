import React from 'react'
import TempMock from './components/tempMock';
import Sidebar from './components/sideBar';
import Displays from './components/Displays';

function App() {
  return (
    <div className="App">
      {/* <TempMock /> */}
      <Sidebar />
      <Displays />
    </div>
  );
}

export default App;
