import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export const Chart = () => {
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        "http://localhost:4000/api/devices/tempHumis"
      );
      setTemperature(res.data.data.map((item) => item.temporature));
      setHumidity(res.data.data.map((item) => item.humidity));
    })();
  }, []);

  return (
    <Line
      data={{
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [
          {
            data: humidity,
            label: "Humidity",
            borderColor: "#3e95cd",
            fill: false,
          },
          {
            data: temperature,
            label: "Temperature",
            borderColor: "#c45850",
            fill: false,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: "Temperature and Humidity",
        },
        legend: {
          display: true,
          position: "bottom",
        },
      }}
    />
  );
};
