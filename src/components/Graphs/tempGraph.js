import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import "./Graphs.css";
import DataFilter from '../Filter/filter';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const TempGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [filterOption, setFilterOption] = useState('realtime');
  const [dataRange, setDataRange] = useState(24); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00';

        if (filterOption === 'daily') {
          // Logic to filter by day
          const today = new Date();
          const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
          const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0);
          url += `&start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
          setDataRange(24);
        } else if (filterOption === 'weekly') {
          // Logic to filter by week
          const today = new Date();
          const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay(), 0, 0, 0);
          const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7, 0, 0, 0);
          url += `&start=${startOfWeek.toISOString()}&end=${endOfWeek.toISOString()}`;
          setDataRange(168);
        } else if (filterOption === 'monthly') {
          // Logic to filter by month
          const today = new Date();
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1, 0, 0, 0);
          url += `&start=${startOfMonth.toISOString()}&end=${endOfMonth.toISOString()}`;
          setDataRange(720);
        }

        const response = await axios.get(url);
        const readings = response.data;
        const temperatureData = readings.map((element) => ({
          temperature: element.temperature,
          timestamp: element.timestamp
        }));
        setChartData(temperatureData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filterOption]);

  const filterDataByOption = (data) => {
    if (filterOption === 'realtime') {
      return data.map((element) => element.temperature);
    } else if (filterOption === 'daily') {
      // Filter last day's data
      return data.slice(-dataRange).map((element) => element.temperature);
    } else if (filterOption === 'weekly') {
      // Filter last week's data
      return data.slice(-dataRange).map((element) => element.temperature);
    } else if (filterOption === 'monthly') {
      // Filter last month's data
      return data.slice(-dataRange).map((element) => element.temperature);
    }
  };

  const data = {
    labels: chartData ? chartData.slice(-dataRange).map((element) => element.timestamp) : [],
    datasets: [
      {
        label: 'max alert',
        data: Array(dataRange).fill(28),
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1
      },
      {
        label: 'temperature',
        data: chartData ? filterDataByOption(chartData) : [],
        backgroundColor: 'rgba(000, 000, 000, 1)',
        borderColor: 'rgba(000, 000, 000, 1)',
        borderWidth: 1
      },
      {
        label: 'min alert',
        data: Array(dataRange).fill(18),
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