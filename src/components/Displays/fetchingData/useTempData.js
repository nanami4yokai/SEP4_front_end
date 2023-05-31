import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config';

export const useTempData = () => {
    const [temperatureData, setTemperatureData] = useState(null);
    const [tempError, setError] = useState(null);

    useEffect(() => {
        const fetchTemperatureData = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.reading);
                if (response.data && response.data.length > 0) {
                    const latestReading = response.data[0];
                    setTemperatureData(latestReading.temperature);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTemperatureData();
       
    }, []);

    return { temperatureData, tempError };
};