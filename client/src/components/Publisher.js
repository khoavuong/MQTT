import React, { useState, useEffect } from "react";
import { InputNumber, message, Row, Col, Switch, Space } from "antd";
import styled from "styled-components";
import { GiSpeaker } from "react-icons/gi";
import useTempHumi from "./customHooks/useTempHumi";
import iot from "../api/iot.js";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Publisher = ({ speaker, client, mqttPayload, sensor }) => {
  const [power, setPower] = useState(0);
  const [isAuto, setIsAuto] = useState(speaker.auto);

  const tempAndHumid = useTempHumi(sensor.name, mqttPayload);

  useEffect(() => {
    const autoValue =
      (parseInt(tempAndHumid[0]) + parseInt(tempAndHumid[1])) * 10;

    if (isAuto && !isNaN(autoValue) && autoValue !== 0) {
      iot
        .post(
          `api/users/rooms/devices/${speaker.name}`,
          {
            value: `${autoValue}`,
          },
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then(() => {
          message.success(
            `Auto Published power level ${autoValue} to ${speaker.name} successfully`,
            1
          );
        });
      setPower(autoValue);
    }
  }, [tempAndHumid]);

  const publishHandler = () => {
    if (!isNaN(power)) {
      iot
        .post(
          `api/users/rooms/devices/${speaker.name}`,
          {
            value: `${power}`,
          },
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then(() => {
          message.success(
            `Published power level ${power} to ${speaker.name} successfully`
          );
        });
    } else
      message.error(
        `Please choose a power between 0 and 5000 for ${speaker.name}`
      );
  };

  return (
    <Row style={{ display: "flex", alignItems: "center" }}>
      <Col span={10}>
        <b>{speaker.name}: </b>
      </Col>
      <Col span={14}>
        <FlexBetween>
          <Space>
            <GiSpeaker size={"2em"} />
            <InputNumber
              disabled={isAuto}
              min={0}
              max={5000}
              value={power}
              defaultValue={0}
              onChange={(value) => setPower(value)}
              onBlur={publishHandler}
            />
          </Space>

          <Space>
            <b>Auto:</b>
            <Switch
              defaultChecked={isAuto}
              onChange={(value) => {
                message.success(
                  `Switch ${speaker.name} to ${value ? "auto" : "manual"} mode`
                );
                setIsAuto(value);
              }}
            />
          </Space>
        </FlexBetween>
      </Col>
    </Row>
  );
};
