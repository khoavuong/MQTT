import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import iot from "../api/iot";
import Spinner from "./Spinner/Spinner";

import { Container, Row, Col, Form, Input } from "reactstrap";
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
  const [range, setRange] = useState("month");

  function handleSelectRange(event) {
    setIsLoading(true);
    setRange(event.target.value);
  }

  useEffect(() => {
    (async function () {
      try {
        const res = await iot.get(
          `/api/users/rooms/devices/${props.deviceId}`,
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );
        // console.log(res);
        const data = res.data.data.logs;
        // console.log(data);
        let filterData = data.filter((item) =>
          checkinRange(item.timestamp, range)
        );
        setTemperature(filterData.map((item) => item.temperature));
        setHumidity(filterData.map((item) => item.humidity));
        setTimestamp(
          filterData.map((item) =>
            item.timestamp.slice(5, item.timestamp.length - 5)
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [range]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form>
            <Input
              type="select"
              onChange={handleSelectRange}
              defaultValue={range}
            >
              <option value="today">Today</option>
              <option value="week">A week ago</option>
              <option value="month">A month ago</option>
            </Input>
          </Form>
        </Col>
      </Row>
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
    </Container>
  );
};
