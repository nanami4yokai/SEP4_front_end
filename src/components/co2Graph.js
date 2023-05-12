import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import myData from '../data/recordings-data.json'
import "./TempGraph.css"

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement)

const CO2Graph = () => {
    const [chart, setChart] = useState([]);

    useEffect(() => {
        setChart(myData.readings);
    }, [])

    var chartData = {
        labels: chart?.map(element => element.id),
        datasets: [
            {
                label: 'max alert',
                data: [1010, 1010, 1010, 1010, 1010],
                fill: false,
                backgroundColor: 'red',
                borderColor: 'red',
                borderWidth: 1
            },
            {
                label: 'humidity',
                data: chart?.map(element => element.co2),
                backgroundColor: ['rgba(000, 000, 000, 1)'],
                borderColor: ['rgba(000, 000, 000, 1)'],
                borderWidth: 1
            },
            {
                label: 'min alert',
                data: [980, 980, 980, 980, 980],
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1
            }
        ]
    }

    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                min: 970,
                max: 1015,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', 
                },
                ticks: {
                    stepSize: 5, 
                },
                position: 'left', // Ensure the y-axis is on the left side
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
                    <div id='co2-circle'></div>
                    <p id='name'>CO2</p>
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

export default CO2Graph;