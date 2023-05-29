import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import "./Graphs.css";
import DataFilter from '../Filter/filter';
import {useTempChartData} from './fetchingData/useTempChartData';
import myData from '../../data/graph-data.json'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const TempGraph = () => {
  const [filterOption, setFilterOption] = useState('realtime');
  const [dataRange, setDataRange] = useState(24); 

//  const chartData = useTempChartData(filterOption);

  // const filterDataByOption = (data) => {
  //   if (filterOption === 'realtime') {
  //     return data.map((element) => element.temperature);
  //   } else if (filterOption === 'daily') {
  //     // Filter last day's data
  //     return data.slice(-dataRange).map((element) => element.temperature);
  //   } else if (filterOption === 'weekly') {
  //     // Filter last week's data
  //     return data.slice(-dataRange).map((element) => element.temperature);
  //   } else if (filterOption === 'monthly') {
  //     // Filter last month's data
  //     return data.slice(-dataRange).map((element) => element.temperature);
  //   }
  // };

  // const data = {
  //   labels: chartData ? chartData.slice(-dataRange).map((element) => element.timestamp) : [],
  //   datasets: [
  //     {
  //       label: 'max alert',
  //       data: Array(dataRange).fill(28),
  //       fill: false,
  //       backgroundColor: 'red',
  //       borderColor: 'red',
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'temperature',
  //       data: chartData ? filterDataByOption(chartData) : [],
  //       backgroundColor: 'rgba(000, 000, 000, 1)',
  //       borderColor: 'rgba(000, 000, 000, 1)',
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'min alert',
  //       data: Array(dataRange).fill(18),
  //       fill: false,
  //       backgroundColor: 'blue',
  //       borderColor: 'blue',
  //       borderWidth: 1
  //     }
  //   ]
  // };

  //mock data code below
  const chartData = myData.graphdata;


  const filterDataByOption = (data) => {
    if (filterOption === 'realtime') {
      return data.map((element) => element.temperature).reverse();
    } else if (filterOption === 'daily') {
      // Filter last day's data
      return data.slice(-dataRange).map((element) => element.temperature).reverse();
    } else if (filterOption === 'weekly') {
      // Filter last week's data
      return data.slice(-dataRange).map((element) => element.temperature).reverse();
    } else if (filterOption === 'monthly') {
      // Filter last month's data
      return data.slice(-dataRange).map((element) => element.temperature).reverse();
    }
  };
  
  const labels = chartData ? chartData.map((element) => element.timestamp).reverse() : [];
  const temperatureData = chartData ? filterDataByOption(chartData) : [];

  const data = {
    labels: labels.slice(-dataRange),
    datasets: [
      {
        label: 'max alert',
        data: Array(dataRange).fill(28),
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
      },
      {
        label: 'temperature',
        data: temperatureData.slice(-dataRange),
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'min alert',
        data: Array(dataRange).fill(18),
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
        min: 14,
        max: 32,
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
    <div className='graph-container'>
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

export default TempGraph;