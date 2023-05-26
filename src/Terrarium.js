import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar/sideBar';
import { useTempData } from './components/Displays/fetchingData/useTempData';
import { useCO2Data } from './components/Displays/fetchingData/useCO2Data'
import { useHumData } from './components/Displays/fetchingData/useHumData';
import { useTempChartData } from './components/Graphs/fetchingData/useTempChartData';
import { useCO2ChartData } from './components/Graphs/fetchingData/useCO2ChartData';
import { useHumChartData } from './components/Graphs/fetchingData/useHumChartData';
import RangeDisplay from './components/RangeDisplay/RangeDisplay';
import TempDisplay from './components/Displays/TempDisplay';
import CO2Display from './components/Displays/CO2Display';
import HumidDisplay from './components/Displays/HumidDisplay';
import TempGraph from './components/Graphs/tempGraph';
import CO2Graph from './components/Graphs/co2Graph';
import HumidityGraph from './components/Graphs/humidityGraph'
import TempAlert from './components/Alerts/tempAlert';
import CO2Alert from './components/Alerts/co2Alert';
import HumidityAlert from './components/Alerts/humidityAlert';
import DeleteTerrarium from './components/DeleteTerrarium/DeleteTerrarium';
import './App.css'

const Terrarium = () => {
    const { terrariumId } = useParams(); // Get the terrariumId from the URL
    const [terrariumData, setTerrariumData] = useState(null);

    // Fetch terrarium data based on the terrariumId
    // useEffect(() => {
    //     const fetchTerrariumData = async () => {
    //         try {
    //             const response = await fetch(`/api/terrariums/${terrariumId}`);
    //             const data = await response.json();
    //             setTerrariumData(data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchTerrariumData();
    // }, [terrariumId]);

    const { temperatureData, tempError } = useTempData();
    const { co2Data, co2Error } = useCO2Data();
    const { humidityData, humError } = useHumData();

    const filterOption = 'realtime'; // Set the desired filter option here

    const tempChartData = useTempChartData( filterOption);
    const co2ChartData = useCO2ChartData( filterOption);
    const humChartData = useHumChartData( filterOption);

    // if (!terrariumData) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="Main">
            <Sidebar />
            <DeleteTerrarium/>
            <RangeDisplay />
            <TempDisplay temperatureData={temperatureData} error={tempError} />
            <CO2Display co2Data={co2Data} error={co2Error} />
            <HumidDisplay humidityData={humidityData} error={humError} />
            <TempGraph tempChartData={tempChartData} filterOption={filterOption} />
            <br />
            <CO2Graph co2ChartData={co2ChartData} filterOption={filterOption} />
            <br />
            <HumidityGraph humChartData={humChartData} filterOption={filterOption} />
            <div className="notifications">
                <div className="components">
                    <TempAlert />
                    <CO2Alert />
                    <HumidityAlert />
                </div>
            </div>
        </div >
    );
}

export default Terrarium;

