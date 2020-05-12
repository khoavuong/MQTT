import React from "react";
import styled from "styled-components";
import { Tabs, Collapse, InputNumber } from "antd";

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

export const Home = () => {
  return (
    <Container>
      <Tabs>
        <TabPane tab="Nhiệt độ / Độ ẩm" key="1">
          <Collapse>
            <Panel header="Phòng khách" key="1">
              <p>Nhiệt độ: 30</p>
              <p>Độ ẩm: 20</p>
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
                <div>Máy điều hòa 1:</div>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Nhiệt độ: </div>
                  <InputNumber min={1} max={100} defaultValue={25} />
                </ContentDisplay>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Độ ẩm: </div>
                  <InputNumber min={1} max={100} defaultValue={30} />
                </ContentDisplay>
              </ContentDisplay>

              <ContentDisplay style={{ marginBottom: "30px" }}>
                <div>Máy điều hòa 2:</div>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Nhiệt độ: </div>
                  <InputNumber min={1} max={100} defaultValue={25} />
                </ContentDisplay>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Độ ẩm: </div>
                  <InputNumber min={1} max={100} defaultValue={30} />
                </ContentDisplay>
              </ContentDisplay>

              <ContentDisplay style={{ marginBottom: "30px" }}>
                <div>Quạt 1:</div>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Sức gió: </div>
                  <InputNumber min={1} max={100} defaultValue={25} />
                </ContentDisplay>
              </ContentDisplay>

              <ContentDisplay>
                <div>Quạt 2:</div>
                <ContentDisplay>
                  <div style={{ marginRight: "5px" }}>Sức gió: </div>
                  <InputNumber min={1} max={100} defaultValue={25} />
                </ContentDisplay>
              </ContentDisplay>
            </Panel>
            <Panel header="Phòng ngủ" key="2"></Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="Cài đặt cá nhân" key="3">
          Content
        </TabPane>
      </Tabs>
    </Container>
  );
};
