import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useTempChartData = (filterOption) => {
    const [chartData, setChartData] = useState([]);
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

    return chartData;
}
