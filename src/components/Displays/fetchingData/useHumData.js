import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config';

export const useHumData = () => {
    const [humidityData, setHumData] = useState(null);
    const [humError, setError] = useState(null);

    useEffect(() => {
        const fetchHumData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.reading);
                if (response.data && response.data.length > 0) {
                    const latestReading = response.data[0];
                    setHumData(latestReading.humidity);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchHumData();
         // const intervalId = setInterval(fetchHumData, 20000);

        //  return () => clearInterval(intervalId); 20 sec refresh
    }, []);

    return { humidityData, humError };
}
