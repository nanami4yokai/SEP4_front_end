// import React, { useEffect, useState } from 'react'
// import * as sensor_data from './sensorData';


// export default function Status() {
//     const [temp, setTemp] = useState<Number(null)>

//     useEffect(() => {
//         let mounted = true;
//         sensor_data.getCurrentTemp().then((currentTemp) => {
//             if (currentTemp[0]) {
//                 if (mounted) {
//                     setTemp(currentTemp[0].value);
//                 }
//             }
//         });

//         return () => {
//             mounted = false;
//         };
//     }, []);

//     return (
//         <div className='temp-box'>
//             temperature={temp?.toString() ?? ""}
//         </div>
//     );
// }
