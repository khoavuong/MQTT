import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export const Chart = () => {
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [timestamp, setTimestamp] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        "https://dadn-2020.herokuapp.com/api/devices/tempHumis?fbclid=IwAR0alSqQmHhiresapAW-7kmJybZOG1OXvhRvAwIq4Q7sDq8DJHbS3J3xGDI"
      );
      const data = res.data.data;
      setTemperature(data.map((item) => item.temporature));
      setHumidity(data.map((item) => item.humidity));
      setTimestamp(
        data.map((item) => item.timestamp.slice(11, item.timestamp.length - 5))
      );
    })();
  }, []);

  return (
    <Line
      data={{
        labels: timestamp,
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
