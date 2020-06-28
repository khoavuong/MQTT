import React, { useState, useEffect } from "react";
import { Spin, Space, Row, Col, message, Slider } from "antd";
import styled from "styled-components";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Subscriber = ({ mqttPayload, sensor }) => {
  const [tempAndHumid, setTempAndHumid] = useState([]);
  let timeOut;

  const marks = {
    0: {
      style: {
        color: "blue",
      },
      label: <strong>0°C</strong>,
    },
    100: {
      style: {
        color: "red",
      },
      label: <strong>100°C</strong>,
    },
  };

  useEffect(() => {
    mqttPayload.forEach((item) => {
      if (item.device_id === sensor.name) {
        setTempAndHumid(item.values);
        return;
      }
    });
  }, [mqttPayload, sensor]);

  const updateBoundHanlder = (bound) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      message.success(
        `Update stable range of ${sensor.name} to [${bound}] successfully`
      );
    }, 2000);
  };

  return (
    <>
      <Row>
        <Col span={10}>
          <b>{sensor.name}:</b>
        </Col>
        <Col span={14}>
          <FlexBetween>
            <Space>
              <WiHumidity size={"2em"} style={{ color: "blue" }} />
              <b style={{ color: tempAndHumid[1] >= 30 ? "red" : "" }}>
                {tempAndHumid[1] || <Spin />}
              </b>
            </Space>
            <Space>
              <FaThermometerHalf size={"2em"} style={{ color: "red" }} />
              <b style={{ color: tempAndHumid[0] >= 30 ? "red" : "" }}>
                {tempAndHumid[0] || <Spin />}
              </b>
            </Space>
          </FlexBetween>
        </Col>
      </Row>

      <br />

      <Row>
        <Col span={23}>
          <Slider
            range
            marks={marks}
            defaultValue={[sensor.lowerBound, sensor.upperBound]}
            onChange={(value) => updateBoundHanlder(value)}
          />
        </Col>
      </Row>
    </>
  );
};
