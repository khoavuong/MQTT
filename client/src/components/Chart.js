import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import iot from "../api/iot";
import Spinner from "./Spinner/Spinner";

function checkinRange(timestamp, range) {
  var now = new Date();
  var date = new Date(timestamp);
  if (range === "today") {
    return date.toDateString() === now.toDateString();
  } else if (range === "week") {
    return date.getTime() >= now.getTime() - 3600 * 24 * 7 * 1000;
  } else if (range === "month") {
    // console.log(date.getTime() >= now.getTime() - 3600 * 24 * 30 * 1000);
    return date.getTime() >= now.getTime() - 3600 * 24 * 30 * 1000;
  }
}

export const Chart = (props) => {
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [timestamp, setTimestamp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const res = await iot.get("/api/devices/tempHumis");
      const data = res.data.data;
      // console.log(data);
      let filterData = data.filter((item) =>
        checkinRange(item.timestamp, props.range)
      );
      setTemperature(filterData.map((item) => item.temporature));
      setHumidity(filterData.map((item) => item.humidity));
      setTimestamp(
        filterData.map((item) =>
          item.timestamp.slice(5, item.timestamp.length - 5)
        )
      );
      setIsLoading(false);
    })();
  }, [props.range]);

  if (isLoading) {
    return <Spinner />;
  }

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
