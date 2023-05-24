import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/sideBar';
import TempDisplay from './components/Displays/TempDisplay';
import CO2Display from './components/Displays/CO2Display';
import HumidDisplay from './components/Displays/HumidDisplay';
import TempGraph from './components/Graphs/tempGraph';
import HumidityGraph from './components/Graphs/humidityGraph'
import CO2Graph from './components/Graphs/co2Graph';
import RangeDisplay from './components/RangeDisplay/RangeDisplay';
import TempAlert from './components/Alerts/tempAlert';
import CO2Alert from './components/Alerts/co2Alert';
import HumidityAlert from './components/Alerts/humidityAlert';
import Login from './components/Login/Login';
import WelcomePage from './components/WelcomePage/welcomePage';
import FeedSchedule from './components/FeedingSchedule/feedSchedule'
import './App.css'

import Terrarium from './Terrarium'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/.components/Login.js' element={<Login />} />
        {/* maybe if the api will work for once, have to modify this
          <Route path="/" element={<Navigate to="/terrarium/1" />} />
          <Route path="/terrarium/:terrariumId" element={<Terrarium />} />
        */}
        <Route path='/' element={<Terrarium />} />
        <Route path='/welcome' element={getWelcomePageComp()} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// const getMainPageComp = () => {
//   return (
//     <>
//       <div className="Main">
//         <Sidebar />
//         <RangeDisplay />
//         <TempDisplay />
//         <CO2Display />
//         <HumidDisplay />
//         <TempGraph />
//         <br />
//         <CO2Graph />
//         <br />
//         <HumidityGraph />
//         <div className='notifications'>
//           <div className='components'>
//             <TempAlert />
//             <CO2Alert />
//             <HumidityAlert />
//           </div>
//         </div>
//         <div className='feedingManagement'>
//           <FeedSchedule />
//         </div>
//       </div>
//     </>)
// }

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
