import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './Css/index.css';

import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import LivestatsService from '../service/livestatsService';


export default function StatsParDate() {
  const [livestats, setLivestats] = useState(null);

  
  const fetchData = async () => {
    try {
      const data = await LivestatsService.getLivestats();
      setLivestats(data);
      localStorage.setItem("cachedData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching live stats:", error);
    }
  };

  useEffect(() => {
    const checkBackendAvailability = async () => {
      try {
        await LivestatsService.getLivestats();
        return true; 
      } catch (error) {
        return false; 
      }
    };

    const updateDataPeriodically = async () => {
      const isBackendAvailable = await checkBackendAvailability();

      if (isBackendAvailable) {
        console.log("Backend is available");
        fetchData();

        const intervalId = setInterval(fetchData, 60000); 

        return () => clearInterval(intervalId); 
      } else {
        console.log("Backend not available");
        const cachedData = localStorage.getItem("cachedData");

       
        if (cachedData) {
          setLivestats(JSON.parse(cachedData));
          const intervalId = setInterval(fetchData, 60000); 

          return () => clearInterval(intervalId); 
        } else {
          console.log("Backend is not available, and no cached data available.");
        }
      }
    };

    const fetchDataAndSetInterval = async () => {
      const cleanupInterval = await updateDataPeriodically();

      return cleanupInterval;
    };

    fetchDataAndSetInterval();
  }, []);
 // Assurez-vous que les noms de variables sont cohérents
 


const [chartData] = useState({
  labels: ['TOTALH', 'TVA', 'TOTALTTC'],
  datasets: [
    {
      data: [200, 50, 200],
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
    },
  ],
});
const [chartData2] = useState({
  labels: ['ESPECES', 'CARTE BANCAIRE', 'CHEQUES','TICKET RESTO'],
  datasets: [
    {
      data: [100, 50, 100,100],
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726","#F30F0F"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D","#F30F0F"],
    },
  ],
});
const [chartData3] = useState({
  labels: ['SUR PLACE', 'A EMPORTER', 'LIVRAISON'],
  datasets: [
    {
      data: [200, 50, 200],
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
    },
  ],
});

const [lightOptions] = useState({
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    }
});
   

  return (
<div className="card">
  <div className="row">
    <div className="col-md-4">
      <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '100%' }} />
    </div>
    <div className="col-md-4">
      <Chart type="pie" data={chartData2} options={lightOptions} style={{ position: 'relative', width: '100%' }} />
    </div>
    <div className="col-md-4">
      <Chart type="pie" data={chartData3} options={lightOptions} style={{ position: 'relative', width: '100%' }} />
    </div>
  </div>
  <div className="row">
   
    </div>
  </div>

  );
}
