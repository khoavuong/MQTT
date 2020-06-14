import React, { useState, useEffect } from "react";
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

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// const test_URL = "mqtt://test.mosquitto.org:8081";
const WebSocket_URL = "mqtt://13.67.92.217:8083/mqtt";
// const Demo_URL = "mqtt://13.76.250.158:8083/mqtt";
const client = mqtt.connect(WebSocket_URL);
const topics = ["Topic/TempHumi"];
client.subscribe(topics);

export const Home = () => {
  const [temperature, setTemperature] = useState("Loading");
  const [humidity, setHumidity] = useState("Loading");

  useEffect(() => {
    (function () {
      client.on("message", function (topic, message) {
        switch (topic) {
          case "Topic/TempHumi":
            const content = message.toString().slice(1, message.length - 1);
            const regExpValue = /\[([^)]+)\]/;
            const values = regExpValue.exec(content)[1].split(",");
            setTemperature(parseInt(values[0]));
            setHumidity(parseInt(values[1]));
            break;
          default:
        }
      });
    })();

    return () => {
      client.unsubscribe(topics);
    };
  }, []);

  function acToggle(checked) {
    localStorage.setItem("ac", checked);
    client.publish("ac-bku", checked ? "On" : "Off");
  }

  function fanToggle(checked) {
    localStorage.setItem("fan", checked);
    client.publish("fan-bku", checked ? "On" : "Off");
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
            <Panel header="Phòng ngủ" key="2"></Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="Danh sách thiết bị" key="2">
          <Collapse>
            <Panel header="Phòng khách" key="1">
              <FlexBetween style={{ marginBottom: "30px" }}>
                <div>
                  <b>Máy điều hòa:</b>
                </div>
                <FlexBetween>
                  <div style={{ marginRight: "5px" }}>Nhiệt độ: </div>
                  <InputNumber min={1} max={100} defaultValue={25} />
                </FlexBetween>
                <FlexBetween>
                  <div style={{ marginRight: "5px" }}>Độ ẩm: </div>
                  <InputNumber min={1} max={100} defaultValue={30} />
                </FlexBetween>
                <Switch
                  defaultChecked={
                    localStorage.getItem("ac") === "true" ? true : false
                  }
                  onChange={acToggle}
                ></Switch>
              </FlexBetween>

              <FlexBetween style={{ marginBottom: "30px" }}>
                <div>
                  <b>Quạt:</b>
                </div>
                <Switch
                  defaultChecked={
                    localStorage.getItem("fan") === "true" ? true : false
                  }
                  onChange={fanToggle}
                ></Switch>
              </FlexBetween>
            </Panel>
            <Panel header="Phòng ngủ" key="2"></Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </Container>
  );
};
