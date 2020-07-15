import React, { useEffect, useState } from "react";
import { Collapse, Table, Layout, Spin } from "antd";
import iot from "../../api/iot";
import Spinner from "../Spinner/Spinner";
// import { Col, Row, Container } from "reactstrap";

const { Panel } = Collapse;
const { Header, Content } = Layout;

// const devices = [
//   {
//     id: "klasoifwo",
//     name: "speaker1",
//     room: "Phong Khach",
//   },
//   {
//     id: "jiawijfjjiojf",
//     name: "speaker2",
//     room: "Phong Ngu",
//   },
// ];

const columns = [
  {
    title: "Device id",
    dataIndex: "deviceId",
    key: "deviceId",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: (val) => (val ? "ON" : "OFF"),
  },
  // {
  //   title: "Mode",
  //   dataIndex: "mode",
  //   key: "mode",
  // },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (val) => new Date(val).toGMTString().slice(0, -4),
  },
  // {
  //   title: "Action",
  //   dataIndex: "action",
  //   key: "action",
  // },
];

const DetailLog = (props) => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const res = await iot.get("/api/users/rooms", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        // console.log(res);
        setRooms(res.data.data.rooms);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  function renderLogs() {
    if (rooms.length <= 0) return null;
    var lstLogs = rooms.map((room) => {
      room.devices.output.logs.reverse();
      return (
        <Panel
          header={room.name + " - " + room.devices.output.deviceId}
          key={room.devices.output.deviceId}
        >
          <Table
            columns={columns}
            dataSource={room.devices.output.logs}
            key={room.devices.output.deviceId}
          />
        </Panel>
      );
    });
    return lstLogs;
  }

  if (isLoading) return <Spinner />;
  return (
    <Layout>
      <Header style={{ backgroundColor: "white", paddingTop: "10px" }}>
        <h3>Detail logs of each speaker</h3>
      </Header>
      <Content>
        <Collapse defaultActiveKey={rooms[0].devices.output.deviceId}>
          {renderLogs()}
        </Collapse>
      </Content>
    </Layout>
  );
};

export default DetailLog;
