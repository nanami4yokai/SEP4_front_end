import React, { useEffect, useState } from 'react';
import myData from '../data/recordings-data.json'

export default function TempMock() {
    // const [data, setData] = useState()

    const showData = () => {
        const data = myData.readings;

        if (!data || !data.length) {
            return <div>Loading...</div>;
        }
        return data.map((element) => (
            <div className="container" key={element.id}>
                <div className="temp"> 
                    {element && <h1>{element.temperature} C</h1>}
                </div>
                <div className="description">
                    <p>Current temperature</p>
                </div>
            </div>
        ));
    };

    return (
        <div>
            {showData()}
        </div>
    );
}
