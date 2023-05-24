import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useCO2Data = () => {
    const [co2Data, setCo2Data] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCO2Data = async () => {
            try {
                const response = await axios.get('https://terrasense-service-dot-terrasense.ew.r.appspot.com/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00');
                if (response.data.length > 0) {
                    const latestReading = response.data[0];
                    setCo2Data(latestReading.co2);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCO2Data();
    }, []);

    return { co2Data, error };
}
