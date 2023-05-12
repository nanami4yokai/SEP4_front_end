import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import myData from '../data/recordings-data.json'
import "./TempGraph.css"

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement)

const TempGraph = () => {
    const [chart, setChart] = useState([]);

    useEffect(() => {
        setChart(myData.readings);
    }, [])

    var chartData = {
        labels: chart?.map(element => element.id),
        datasets: [{
            label: 'temperature',
            data: chart?.map(element => element.temperature),
            backgroundColor: ['rgba(000, 000, 000, 1)'],
            borderColor: ['rgba(000, 000, 000, 1)'],
            borderWidth: 1
        }]
    }

    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                min: 14,
                max: 32
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }

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
            <br></br>
            <div className='graph'>
                <Line
                    data={chartData}
                    height={330}
                    options={options}
                />
            </div>
        </div>
    )
}

export default TempGraph;