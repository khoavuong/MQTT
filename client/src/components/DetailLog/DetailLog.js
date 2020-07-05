import React from "react";
import { Collapse, Table, Layout } from "antd";
// import { Col, Row, Container } from "reactstrap";

const { Panel } = Collapse;
const { Header, Content } = Layout;

const devices = [
  {
    id: "klasoifwo",
    name: "speaker1",
    room: "Phong Khach",
  },
  {
    id: "jiawijfjjiojf",
    name: "speaker2",
    room: "Phong Ngu",
  },
];

const columns = [
  {
    title: "Device name",
    dataIndex: "deviceName",
    key: "deviceName",
  },
  {
    title: "Type request",
    dataIndex: "typeRequest",
    key: "typeRequest",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
];

const data = [
  {
    key: "1",
    deviceName: "speaker1",
    typeRequest: "publish",
    user: "khoa",
    value: "1000",
    timestamp: "2020-06-18T04:51:38.408Z",
  },
  {
    key: "2",
    deviceName: "speaker1",
    typeRequest: "publish",
    user: "khoa",
    value: "1000",
    timestamp: "2020-06-18T04:51:43.411Z",
  },
  {
    key: "3",
    deviceName: "speaker1",
    typeRequest: "publish",
    user: "khoa",
    value: "1000",
    timestamp: "2020-06-18T04:51:48.419Z",
  },
  {
    key: "4",
    deviceName: "speaker1",
    typeRequest: "publish",
    user: "khoa",
    value: "1000",
    timestamp: "2020-06-18T04:51:53.417Z",
  },
];

const DetailLog = (props) => {
  return (
    <Layout>
      <Header style={{ backgroundColor: "white", paddingTop: "10px" }}>
        <h3>Detail logs of each speaker</h3>
      </Header>
      <Content>
        <Collapse defaultActiveKey={[devices[0].id]}>
          {devices.map((device) => {
            return (
              // <Row key={device.name}>
              <Panel header={device.room + " - " + device.name} key={device.id}>
                <Table columns={columns} dataSource={data} />
              </Panel>
              // </Row>
            );
          })}
        </Collapse>
      </Content>
    </Layout>
  );
};

export default DetailLog;
