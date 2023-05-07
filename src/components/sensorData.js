// import axios from "axios";
// import Measurement from "../domain/Measurement";

// export async function getCurrentTemp(): Promise<Measurement[]>{
//   let temperatureList;
  
//   try {
//     let url = ``; /* get api from cloud team */
//     const response = await axios.get(url);
//     if (response.status !== 200) return [];

//     temperatureList = response.data;

//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
//   return temperatureList;
// }

// export async function getTemperature(
//   startTimestamp?: number,
//   endTimestamp?: number
// ): Promise<Measurement[]> {
//   let temperatureList;

//   try {
//     let url = ``; /* get api from cloud team */

//     if (startTimestamp !== undefined) {
//       url += `?startTimestamp=${startTimestamp}`;
//     }
//     if (endTimestamp !== undefined) {
//       if (startTimestamp !== undefined) {
//         url += "&";
//       } else {
//         url += "?";
//       }
//       url += `endTimestamp=${endTimestamp}`;
//     }
//     const response = await axios.get(url);
//     if (response.status !== 200) return [];

//     temperatureList = response.data;

//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
//   return temperatureList;
// }

export default function getData(data) {
  const dataPromises = data.map(temperature => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open("GET", `https://api/terasense/measurements/last/${temperature}`); /* mocked */
        xhr.responseType = "json";
  
        xhr.onload = function() {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(`Error fetching ${temperature}`);
          }
        };
  
        xhr.send();
      });
    });
  
    return Promise.all(dataPromises);
}
