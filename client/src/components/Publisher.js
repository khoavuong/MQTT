import React, { useState } from "react";
import { InputNumber, Button, message, Row, Col } from "antd";
import styled from "styled-components";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Publisher = ({ speaker, client }) => {
  const [devicePower, setDevicePower] = useState(null);

  const onPublishClick = () => {
    if (devicePower != null) {
      client.publish(
        "Topic/Speaker",
        `[{ device_id: ${speaker}, values: ["1", "${devicePower}"] }]`,
        () => {
          message.success(
            `Published power level ${devicePower} to ${speaker} successfully`,
            3
          );
        }
      );
    } else message.error(`Please choose a power level for ${speaker}`, 3);
  };

  return (
    <Row>
      <Col span={11}>
        <b style={{ marginRight: "10px" }}>{speaker}: </b>
      </Col>
      <Col span={13}>
        <FlexBetween>
          <InputNumber
            min={0}
            max={5000}
            onChange={(value) => {
              setDevicePower(value);
            }}
          />
          <Button
            style={{ backgroundColor: "green" }}
            type="primary"
            onClick={onPublishClick}
          >
            Publish
          </Button>
        </FlexBetween>
      </Col>
    </Row>
  );
};
