import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Space,
  Spin,
  message,
  Tabs,
  Collapse,
  InputNumber,
  Button,
} from "antd";
import mqtt from "mqtt";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// const test_URL = "mqtt://test.mosquitto.org:8081";
const WebSocket_URL = "mqtt://13.67.92.217:8083/mqtt";
// const Demo_URL = "mqtt://13.76.250.158:8083/mqtt";
const client = mqtt.connect(WebSocket_URL);
const topics = ["Topic/TempHumi"];

export const Controller = () => {
  const [temperature, setTemperature] = useState(<Spin />);
  const [humidity, setHumidity] = useState(<Spin />);
  const [devicePower, setDevicePower] = useState(null);

  useEffect(() => {
    let mounted = true;
    (function () {
      client.subscribe(topics);
      client.on("message", function (topic, message) {
        switch (topic) {
          case "Topic/TempHumi":
            const content = message.toString().slice(1, message.length - 1);
            const regExpValue = /\[([^)]+)\]/;
            const values = regExpValue.exec(content)[1].split(",");
            if (mounted) {
              setTemperature(parseInt(values[0]));
              setHumidity(parseInt(values[1]));
            }
            break;
          default:
        }
      });
    })();

    return () => {
      client.unsubscribe(topics);
      mounted = false;
    };
  }, []);

  const onPublishClick = () => {
    if (devicePower != null) {
      client.publish(
        "Topic/Speaker",
        `[{ device_id: "Speaker", values: ["1", "${devicePower}"] }]`,
        () => {
          message.success(
            `Published power level ${devicePower} successfully`,
            3
          );
        }
      );
    } else message.error("Please choose a power level for the device", 3);
  };

  return (
    <Tabs>
      <TabPane tab="Nhiệt độ / Độ ẩm" key="1">
        <Collapse>
          <Panel header="Phòng khách" key="1">
            <div>
              <Space>
                Nhiệt độ:{" "}
                <b style={{ color: temperature >= 30 ? "red" : "" }}>
                  {temperature}
                </b>
              </Space>
            </div>
            <div>
              <Space>
                Độ ẩm:{" "}
                <b style={{ color: humidity >= 30 ? "red" : "" }}>{humidity}</b>
              </Space>
            </div>
          </Panel>
          <Panel header="Phòng ngủ" key="2"></Panel>
        </Collapse>
      </TabPane>
      <TabPane tab="Danh sách thiết bị" key="2">
        <Collapse>
          <Panel header="Phòng khách" key="1">
            <FlexBetween>
              <div>
                <b style={{ marginRight: "10px" }}>Speaker: </b>
                <InputNumber
                  min={0}
                  max={5000}
                  onChange={(value) => {
                    setDevicePower(value);
                  }}
                />
              </div>
              <Button type="primary" onClick={onPublishClick}>
                Publish
              </Button>
            </FlexBetween>
          </Panel>
          <Panel header="Phòng ngủ" key="2"></Panel>
        </Collapse>
      </TabPane>
    </Tabs>
  );
};
