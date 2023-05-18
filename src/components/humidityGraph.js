import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
// import myData from '../data/recordings-data.json' mock data source
import "./TempGraph.css"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const HumidityGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00');
        const readings = response.data;
        const humidityData = readings.map((element) => ({
          humidity: element.humidity,
          timestamp: element.timestamp
        }));
        setChartData(humidityData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: chartData ? chartData.map((element) => element.timestamp) : [],
    datasets: [
      {
        label: 'max alert',
        data: [65, 65, 65, 65, 65, 65],
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1
      },
      {
        label: 'humidity',
        data: chartData ? chartData.map((element) => element.humidity) : [],
        backgroundColor: 'rgba(000, 000, 000, 1)',
        borderColor: 'rgba(000, 000, 000, 1)',
        borderWidth: 1
      },
      {
        label: 'min alert',
        data: [45, 45, 45, 45, 45, 45],
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 30,
        max: 75,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 2,
        },
        position: 'left',
      }
    },
    legend: {
      labels: {
        fontSize: 26
      }
    }
  };

  return (
    <div className='container'>
      <div className='top-row'>
        <div className='container-name'>
          <div id='hum-circle'></div>
          <p id='name'>Humidity</p>
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
        <div className='filter'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
              <Dropdown.Item href="#/action-1" active>Real time</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-2">Daily</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Weekly</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Monthly</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <br />
      <div className='graph'>
        {chartData ? (
          <Line
            data={data}
            height={330}
            options={options}
          />
        ) : (
          <div>Loading chart data...</div>
        )}
      </div>
    </div>
  );
};

export default HumidityGraph;

// Code to work with mocup data
// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement)

// const HumidityGraph = () => {
//     const [chart, setChart] = useState([]);

//     useEffect(() => {
//         setChart(myData.readings);
//     }, [])

//     var chartData = {
//         labels: chart?.map(element => element.id),
//         datasets: [
//             {
//                 label: 'max alert',
//                 data: [65, 65, 65, 65, 65],
//                 fill: false,
//                 backgroundColor: 'red',
//                 borderColor: 'red',
//                 borderWidth: 1
//             },
//             {
//                 label: 'humidity',
//                 data: chart?.map(element => element.humidity),
//                 backgroundColor: ['rgba(000, 000, 000, 1)'],
//                 borderColor: ['rgba(000, 000, 000, 1)'],
//                 borderWidth: 1
//             },
//             {
//                 label: 'min alert',
//                 data: [45, 45, 45, 45, 45],
//                 fill: false,
//                 backgroundColor: 'blue',
//                 borderColor: 'blue',
//                 borderWidth: 1
//             }
//         ]
//     }

//     var options = {
//         maintainAspectRatio: false,
//         scales: {
//             y: {
//                 beginAtZero: false,
//                 min: 30,
//                 max: 75,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                 },
//                 ticks: {
//                     stepSize: 5,
//                 },
//                 position: 'left', // Ensure the y-axis is on the left side
//             }
//         },
//         legend: {
//             labels: {
//                 fontSize: 26
//             }
//         }
//     }

//     return (
//         <div className='container'>
//             <div className='top-row'>
//                 <div className='container-name'>
//                     <div id='hum-circle'></div>
//                     <p id='name'>Humidity</p>
//                 </div>
//                 <div className='alerts'>
//                     <div className='alert-max'>
//                         <div id='alert-max-circle'></div>
//                         <p>Alert max</p>
//                     </div>
//                     <div className='alert-min'>
//                         <div id='alert-min-circle'></div>
//                         <p>Alert min</p>
//                     </div>
//                     <div className='current'>
//                         <div id='current'></div>
//                         <p>Current</p>
//                     </div>
//                 </div>
//             </div>
//             <br></br>
//             <div className='graph'>
//                 <Line
//                     data={chartData}
//                     height={330}
//                     options={options}
//                 />
//             </div>
//         </div>
//     )
// }

// export default HumidityGraph;