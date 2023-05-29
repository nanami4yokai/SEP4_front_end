import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config';

export const useCO2Data = () => {
    const [co2Data, setCo2Data] = useState(null);
    const [co2Error, setCo2Error] = useState(null);

    useEffect(() => {
        const fetchCO2Data = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.reading);
                if (response.data && response.data.length > 0) {
                    const latestReading = response.data[0];
                    setCo2Data(latestReading.co2);
                }
            } catch (error) {
                setCo2Error(error.message);
            }
        };

        fetchCO2Data();

        // const intervalId = setInterval(fetchCO2Data, 20000);

        //  return () => clearInterval(intervalId); 20 sec refresh if we ever get live data
    }, []);

    return { co2Data, co2Error };
}
