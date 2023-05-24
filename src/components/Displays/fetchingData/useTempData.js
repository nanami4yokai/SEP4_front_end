import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useTempData = () => {
    const [temperatureData, setTemperatureData] = useState(null);
    const [tempError, setError] = useState(null);

    useEffect(() => {
        const fetchTemperatureData = async () => {
            try {
                const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00');
                if (response.data.length > 0) {
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