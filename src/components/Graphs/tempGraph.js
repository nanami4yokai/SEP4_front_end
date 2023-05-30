import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import "./Graphs.css";
import DataFilter from '../Filter/filter';
import { useTempChartData } from './fetchingData/useTempChartData';
import myData from '../../data/graph-data.json'
import limitsData from '../../data/terrarium-data.json'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const TempGraph = () => {
  const [filterOption, setFilterOption] = useState('');
  
  const getInitialDataRange = (filterOption) => {
    if (filterOption === 'realtime') {
      return 10;
    } else if (filterOption === 'daily') {
      return 24;
    } else if (filterOption === 'weekly') {
      return 200;
    }

    return 10; // Default to 10 if filterOption is not recognized
  };

  const [dataRange, setDataRange] = useState(getInitialDataRange(filterOption));

  useEffect(() => {
    setDataRange(getInitialDataRange(filterOption));
  }, [filterOption]);

  // mock data code below
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
  const temperatureData = filteredData ? filteredData.map((element) => element.temperature).reverse() : [];
  
  const filteredTemperatureData = temperatureData.slice(-dataRange);

  // Extract minTemperature and maxTemperature from the limitsData file for the terrarium with id 1
  const terrariumId = 1;
  const terrarium = limitsData.terrariumdata.find((item) => item.id === terrariumId);
  const minTemperature = terrarium ? terrarium.minTemperature : 0;
  const maxTemperature = terrarium ? terrarium.maxTemperature : 0;

  const data = {
    labels: labels.slice(-dataRange),
    datasets: [
      {
        label: 'max alert',
        data: Array(dataRange).fill(maxTemperature),
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
      },
      {
        label: 'temperature',
        data: filteredTemperatureData,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'min alert',
        data: Array(dataRange).fill(minTemperature),
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
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
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
