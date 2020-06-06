import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, Collapse, InputNumber, Switch } from "antd";
import mqtt from "mqtt";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 860px;
  padding: 20px;
  box-sizing: border-box;
`;

const ContentDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const options = {
  protocol: "mqtts",
};
const temperatureConnection = mqtt.connect(
  "mqtt://test.mosquitto.org:8081",
  options
);
const humidityConnection = mqtt.connect(
  "mqtt://test.mosquitto.org:8081",
  options
);
const fanConnection = mqtt.connect("mqtt://test.mosquitto.org:8081", options);
const ACConnection = mqtt.connect("mqtt://test.mosquitto.org:8081", options);

temperatureConnection.subscribe("temperature-bku");
humidityConnection.subscribe("humidity-bku");

export const Home = () => {
  const [temperature, setTemperature] = useState(
    localStorage.getItem("temperature")
      ? localStorage.getItem("temperature")
      : "Loading"
  );
  const [humidity, setHumidity] = useState(
    localStorage.getItem("humidity")
      ? localStorage.getItem("humidity")
      : "Loading"
  );
  // const [fan, setFan] = useState("Loading");

  temperatureConnection.on("message", function (topic, message) {
    setTemperature(message.toString());
    localStorage.setItem("temperature", message.toString());
  });

  humidityConnection.on("message", function (topic, message) {
    setHumidity(message.toString());
    localStorage.setItem("humidity", message.toString());
  });

  function acChange(checked) {
    localStorage.setItem("ac", checked);
    ACConnection.publish("ac-bku", checked ? "On" : "Off");
  }

  function fanChange(checked) {
    localStorage.setItem("fan", checked);
    fanConnection.publish("fan-bku", checked ? "On" : "Off");
  }

  return (
    <Container>
      <Tabs>
        <TabPane tab="Nhiệt độ / Độ ẩm" key="1">
          <Collapse>
            <Panel header="Phòng khách" key="1">
              <p>
                Nhiệt độ:{" "}
                <b style={{ color: temperature >= 30 ? "red" : "" }}>
                  {temperature}
                </b>
              </p>
              <p>
                Độ ẩm:{" "}
                <b style={{ color: humidity >= 30 ? "red" : "" }}>{humidity}</b>
              </p>
            </Panel>
            <Panel header="Phòng ngủ" key="2">
              <p>Nhiệt độ: 30</p>
              <p>Độ ẩm: 20</p>
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="Danh sách thiết bị" key="2">
          <Collapse>
            <Panel header="Phòng khách" key="1">
              <ContentDisplay style={{ marginBottom: "30px" }}>
                <div>
                  <b>Máy điều hòa:</b>
                </div>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Nhiệt độ: </div>
                  <InputNumber min={1} max={100} defaultValue={25} />
                </ContentDisplay>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Độ ẩm: </div>
                  <InputNumber min={1} max={100} defaultValue={30} />
                </ContentDisplay>
                <Switch
                  defaultChecked={
                    localStorage.getItem("ac") === "true" ? true : false
                  }
                  onChange={acChange}
                ></Switch>
              </ContentDisplay>

              <ContentDisplay style={{ marginBottom: "30px" }}>
                <div>
                  <b>Quạt:</b>
                </div>
                <Switch
                  defaultChecked={
                    localStorage.getItem("fan") === "true" ? true : false
                  }
                  onChange={fanChange}
                ></Switch>
              </ContentDisplay>
            </Panel>
            <Panel header="Phòng ngủ" key="2"></Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </Container>
  );
};
