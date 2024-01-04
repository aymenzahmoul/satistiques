import React, { useState, useEffect } from "react";
import "./Css/StatsLive.css";
import LivestatsService from "../service/livestatsService";

export default function StatsLive() {
  const [livestats, setLivestats] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await LivestatsService.getLivestats();
      setLivestats(data);
      localStorage.setItem("cachedData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching live stats:", error);
      setError("Failed to fetch live stats");
    }
  };

  useEffect(() => {
    const checkBackendAvailability = async () => {
      try {
        await LivestatsService.getLivestats();
        return true; // Backend is available
      } catch (error) {
        return false; // Backend is not available
      }
    };

    const updateDataPeriodically = async () => {
      const isBackendAvailable = await checkBackendAvailability();

      if (isBackendAvailable) {
        console.log("Backend is available");

        // Fetch data immediately
        fetchData();

        // Set up periodic updates
        setInterval(fetchData, 60000); // Update every 60 seconds (adjust as needed)
      } else {
        console.log("Backend not available");
        const cachedData = localStorage.getItem("cachedData");
        setInterval(fetchData, 12000);
        if (cachedData) {
          setLivestats(JSON.parse(cachedData));
        } else {
          setError("Backend is not available, and no cached data available.");
        }
      }
    };

    updateDataPeriodically();
  }, []);
  return (
    <div>
      {livestats && (
        <>
          <hr></hr>
          <h2 className="titleCA">Vue Globale C.A </h2>
          <div className="container2">
            <div className="box2">
              <div className="title2">TotalH</div>
              <div className="value2">{livestats.TotalHT} $</div>
            </div>
            <div className="box2">
              <div className="title2">TVA</div>
              <div className="value2">{livestats.TVA} $</div>
            </div>
            <div className="box2">
              <div className="title2">TotalTTC</div>
              <div className="value2">{livestats.TotalTTC} $</div>
            </div>
          </div>

          <hr></hr>
          <h2 className="titleCA"> Réparitition CA par mode de paiements </h2>
          <div className="container2">
            <div className="box3">
              <div className="title2">Especes</div>
              <div className="value2">{livestats.Especes}35 $</div>
            </div>
            <div className="box3">
              <div className="title2">Carte bancaire</div>
              <div className="value2">{livestats.CarteBancaire} $</div>
            </div>
            <div className="box3">
              <div className="title2">Cheques</div>
              <div className="value2">{livestats.Cheques} $</div>
            </div>
            <div className="box3">
              <div className="title2">Ticket Resto</div>
              <div className="value2">{livestats.TicketResto} $</div>
            </div>
          </div>

          <hr></hr>
          <h2 className="titleCA">Repartition CA par Mode de Consommation </h2>
          <div className="container2">
            <div className="box2">
              <div className="title2">Sur Place</div>
              <div className="value2">{livestats.SurPlace} $</div>
            </div>
            <div className="box2">
              <div className="title2">A Emporter</div>
              <div className="value2">{livestats.A_Emporter} $</div>
            </div>
            <div className="box2">
              <div className="title2">Livraison</div>
              <div className="value2">{livestats.Livraison} $</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
