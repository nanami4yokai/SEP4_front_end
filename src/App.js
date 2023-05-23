import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Sidebar from './components/sideBar';
import TempDisplay from './components/TempDisplay';
import CO2Display from './components/CO2Display';
import HumidDisplay from './components/HumidDisplay';
import TempGraph from './components/tempGraph';
import HumidityGraph from './components/humidityGraph'
import CO2Graph from './components/co2Graph';
import RangeDisplay from './components/RangeDisplay';
import TempAlert from './components/tempAlert';
import CO2Alert from './components/co2Alert';
import HumidityAlert from './components/humidityAlert';
import Login from './components/Login';
import WelcomePage from './components/welcomePage';
import FeedSchedule from './components/feedSchedule';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/.components/Login.js' element={<Login />} />
        <Route path='/' element={getMainPageComp()} />
        <Route path='/welcome' element={getWelcomePageComp()} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const getMainPageComp = () => {
  return (
    <>
      <div className="Main">
        <Sidebar />
        <RangeDisplay />
        <TempDisplay />
        <CO2Display />
        <HumidDisplay />
        <TempGraph />
        <br />
        <CO2Graph />
        <br />
        <HumidityGraph />
        <div className='notifications'>
          <div className='components'>
            <TempAlert />
            <CO2Alert />
            <HumidityAlert />
          </div>
        </div>
        <div className='feedingManagement'>
          <FeedSchedule />
        </div>
      </div>
    </>)
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
