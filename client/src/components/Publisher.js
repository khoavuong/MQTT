import React, { useState } from "react";
import { InputNumber, message, Row, Col, Switch, Space } from "antd";
import styled from "styled-components";
import { GiSpeaker } from "react-icons/gi";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Publisher = ({ speaker, client }) => {
  const [power, setPower] = useState(0);
  const [isAuto, setIsAuto] = useState(speaker.auto);

  const publishHandler = () => {
    if (!isNaN(power)) {
      client.publish(
        "Topic/Speaker",
        `[{ "device_id": "${speaker.name}", "values": ["1", "${power}"] }]`,
        () => {
          message.success(
            `Published power level ${power} to ${speaker.name} successfully`
          );
        }
      );
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
