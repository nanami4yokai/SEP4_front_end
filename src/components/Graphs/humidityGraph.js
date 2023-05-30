import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
// import myData from '../data/recordings-data.json' mock data source
import "./Graphs.css"
import DataFilter from '../Filter/filter';
import { useHumChartData } from './fetchingData/useHumChartData';
import myData from '../../data/graph-data.json'
import limitsData from '../../data/terrarium-data.json'


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const HumidityGraph = () => {
  const [filterOption, setFilterOption] = useState('');

  const getInitialDataRange = (filterOption) => {
    if (filterOption === 'realtime') {
      return 10;
    } else if (filterOption === 'daily') {
      return 24;
    } else if (filterOption === 'weekly') {
      return 168;
    }

    return 10; // Default to 10 if filterOption is not recognized
  };

  const [dataRange, setDataRange] = useState(getInitialDataRange(filterOption));

    useEffect(() => {
    setDataRange(getInitialDataRange(filterOption));
  }, [filterOption]);

  // const chartData = useHumChartData(filterOption);

  // const filterDataByOption = (data) => {
  //   if (filterOption === 'realtime') {
  //     return data.map((element) => element.humidity);
  //   } else if (filterOption === 'daily') {
  //     // Filter last day's data
  //     return data.slice(-dataRange).map((element) => element.humidity);
  //   } else if (filterOption === 'weekly') {
  //     // Filter last week's data
  //     return data.slice(-dataRange).map((element) => element.humidity);
  //   } else if (filterOption === 'monthly') {
  //     // Filter last month's data
  //     return data.slice(-dataRange).map((element) => element.humidity);
  //   }
  // };

  //mock data code below 
  const chartData = myData.graphdata;

  const filterDataByOption = (data) => {
    if (filterOption === 'realtime') {
      return data.slice(0, dataRange);
    } else if (filterOption === 'daily') {
      return data.slice(0, -24);
    } else if (filterOption === 'weekly') {
      return data.slice(-168);
    }
  
    return data.slice(0, dataRange); // Default to the current data range if filterOption is not recognized
  };
  
  const filteredData = filterDataByOption(chartData);
  const labels = filteredData ? filteredData.map((element) => element.timestamp).reverse() : [];
  const humidityData = filteredData ? filteredData.map((element) => element.humidity).reverse() : [];

  const filteredHumidityData = humidityData.slice(-dataRange);

  const terrariumId = 1;
  const terrarium = limitsData.terrariumdata.find((item) => item.id === terrariumId);
  const minHumidity = terrarium ? terrarium.minHumidity : 0;
  const maxHumidity = terrarium ? terrarium.maxHumidity : 0;

  const data = {
    labels: labels.slice(-dataRange),
    datasets: [
      {
        label: 'max alert',
        data: Array(dataRange).fill(maxHumidity),
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
      },
      {
        label: 'humidity',
        data: filteredHumidityData,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'min alert',
        data: Array(dataRange).fill(minHumidity),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
      },
    ],
  };



  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 25,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 5,
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
    <div className='graph-container'>
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
          <DataFilter
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            setDataRange={setDataRange}
          />
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