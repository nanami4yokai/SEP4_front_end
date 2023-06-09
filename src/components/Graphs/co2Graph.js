import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
// import axios from 'axios';
// import myData from '../data/recordings-data.json' mock data source
import "./Graphs.css"
import DataFilter from '../Filter/filter';
// import { useCO2ChartData } from './fetchingData/useCO2ChartData';
import myData from '../../data/graph-data.json'
import limitsData from '../../data/terrarium-data.json'


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const CO2Graph = () => {
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

  // const chartData = useCO2ChartData(filterOption);
  

  // const filterDataByOption = (data) => {
  //   if (filterOption === 'realtime') {
  //     return data.map((element) => element.co2);
  //   } else if (filterOption === 'daily') {
  //     // Filter last day's data
  //     return data.slice(-dataRange).map((element) => element.co2);
  //   } else if (filterOption === 'weekly') {
  //     // Filter last week's data
  //     return data.slice(-dataRange).map((element) => element.co2);
  //   } else if (filterOption === 'monthly') {
  //     // Filter last month's data
  //     return data.slice(-dataRange).map((element) => element.co2);
  //   }
  // };

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
  const co2Data = filteredData ? filteredData.map((element) => element.co2).reverse() : [];
  
  const filteredCO2Data = co2Data.slice(-dataRange);

  const terrariumId = 1;
  const terrarium = limitsData.terrariumdata.find((item) => item.id === terrariumId);
  const minCO2 = terrarium ? terrarium.minCO2 : 0;
  const maxCO2 = terrarium ? terrarium.maxCO2 : 0;

  const data = {
    labels: labels.slice(-dataRange),
    datasets: [
      {
        label: 'max alert',
        data: Array(dataRange).fill(maxCO2),
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
      },
      {
        label: 'co2',
        data: filteredCO2Data,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'min alert',
        data: Array(dataRange).fill(minCO2),
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
        beginAtZero: true,
        min: 200,
        max: 600,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 25,
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

export default CO2Graph;

// Code to work with Mockup data
// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement)

// const CO2Graph = () => {
//     const [chart, setChart] = useState([]);

//     useEffect(() => {
//         setChart(myData.readings);
//     }, [])

//     var chartData = {
//         labels: chart?.map(element => element.id),
//         datasets: [
//             {
//                 label: 'max alert',
//                 data: [1010, 1010, 1010, 1010, 1010],
//                 fill: false,
//                 backgroundColor: 'red',
//                 borderColor: 'red',
//                 borderWidth: 1
//             },
//             {
//                 label: 'humidity',
//                 data: chart?.map(element => element.co2),
//                 backgroundColor: ['rgba(000, 000, 000, 1)'],
//                 borderColor: ['rgba(000, 000, 000, 1)'],
//                 borderWidth: 1
//             },
//             {
//                 label: 'min alert',
//                 data: [980, 980, 980, 980, 980],
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
//                 min: 970,
//                 max: 1015,
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
//                     <div id='co2-circle'></div>
//                     <p id='name'>CO2</p>
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

// export default CO2Graph;