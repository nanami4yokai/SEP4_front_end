import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import data from '../data/recordings-data.json'
import "./TempGraph.css"

const TempGraph = () => {
    

    return (
        <div className='container'>
            <div className='top-row'>
                <div className='container-name'>
                    <div id='temp-circle'></div>
                    <p id='name'>Temperature</p>
                </div>
                <div className='alerts'>
                    <div className='alert-max'>
                        <div id='alert-max-circle'></div>
                        <p>Alert max</p>
                    </div>
                    <div className='alert-min'>
                        <div id='alert-min-circle'></div>
                        <p>Alert min</p>
                    </div>
                    <div className='current'>
                        <div id='current'></div>
                        <p>Current</p>
                    </div>
                </div>
            </div>
            <div className='graph'>
            <canvas ref={canvasRef} id='temp-chart'></canvas>
            </div>
        </div>
    )
}

export default TempGraph