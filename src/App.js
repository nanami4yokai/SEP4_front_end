import React, { useState } from 'react'
import { Route, BrowserRouter, Routes, } from 'react-router-dom';
import Sidebar from './components/Sidebar/sideBar';
import Login from './components/Login/Login';
import WelcomePage from './components/WelcomePage/welcomePage';
import NewTerLandPage from './components/NewTerrariumLandingPage/NewTerLandPage';
import './App.css'

import Terrarium from './Terrarium'

function App() {
  const [terrariums, setTerrariums] = useState([]);

  const handleTerrariumsUpdate = (terrariumsData) => {
    setTerrariums(terrariumsData);
  };
  return (
    
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<Login onTerrariumsUpdate={handleTerrariumsUpdate} />} />
        <Route path='/' element={<Terrarium />} />
        <Route path="/terrarium/:id" component={NewTerLandPage} />
        <Route path='/welcome' element={getWelcomePageComp()} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  
  );
}


const getWelcomePageComp = () => {
  return (
    <>
      <div className='Welcome'>
        <Sidebar />
        <WelcomePage />
      </div>
    </>
  )
}


function NotFound() {
  return <h1>404 - Page not found</h1>;
}

export default App;
