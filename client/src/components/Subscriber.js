import React, { useState, useEffect } from "react";
import { Spin, Space, Row, Col } from "antd";
import styled from "styled-components";

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Subscriber = ({ mqttPayload, sensor }) => {
  const [tempAndHumid, setTempAndHumid] = useState([]);

  useEffect(() => {
    mqttPayload.forEach((item) => {
      if (item.device_id === sensor) {
        setTempAndHumid(item.values);
        return;
      }
    });
  }, [mqttPayload, sensor]);

  return (
    <Row>
      <Col span={11}>
        <b>{sensor}:</b>
      </Col>
      <Col span={13}>
        <FlexBetween>
          <Space>
            Nhiệt độ:
            <b style={{ color: tempAndHumid[0] >= 30 ? "red" : "" }}>
              {tempAndHumid[0] || <Spin />}
            </b>
          </Space>
          <Space>
            Độ ẩm:{" "}
            <b style={{ color: tempAndHumid[1] >= 30 ? "red" : "" }}>
              {tempAndHumid[1] || <Spin />}
            </b>
          </Space>
        </FlexBetween>
      </Col>
    </Row>
  );
};
