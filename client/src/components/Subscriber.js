import React from "react";
import { Spin, Space, Row, Col, message, Slider } from "antd";
import styled from "styled-components";
import { FaThermometerHalf } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import useTempHumi from "./customHooks/useTempHumi";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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

export const Subscriber = ({ mqttPayload, sensor, setBound }) => {
  const tempAndHumid = useTempHumi(sensor.name, mqttPayload);

  const updateBoundHandler = (bound) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setBound(sensor.name, bound[0], bound[1]);
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
              <FaThermometerHalf size={"2em"} style={{ color: "red" }} />
              <b>{tempAndHumid[0] || <Spin />}</b>
            </Space>
            <Space>
              <WiHumidity size={"2em"} style={{ color: "blue" }} />
              <b>{tempAndHumid[1] || <Spin />}</b>
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
            onChange={(value) => updateBoundHandler(value)}
          />
        </Col>
      </Row>
    </>
  );
};
