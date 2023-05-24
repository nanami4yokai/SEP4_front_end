import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useHumData = () => {
    const [humidityData, setHumData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHumData = async () => {
            try {
                const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00');
                if (response.data.length > 0) {
                    const latestReading = response.data[0];
                    setHumData(latestReading.humidity);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchHumData();
    }, []);

    return { humidityData, error };
}
