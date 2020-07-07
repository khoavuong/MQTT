import React, { useState, useEffect } from "react";
import { Chart } from "../Chart";
import { Collapse, Layout } from "antd";
import iot from "../../api/iot";

const { Header, Content } = Layout;
const { Panel } = Collapse;

const GeneralLog = (props) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await iot.get("/api/users/rooms", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        console.log(res);
        setRooms(res.data.data.rooms);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  function renderCharts() {
    if (rooms.length <= 0) return null;
    var lstLogs = rooms.map((room) => {
      return (
        <Panel
          header={room.name + " - " + room.devices.input.deviceId}
          key={room.devices.input.deviceId}
        >
          <Chart deviceId={room.devices.input.deviceId} />
        </Panel>
      );
    });
    return lstLogs;
  }
  return (
    <Layout>
      <Header style={{ backgroundColor: "white", paddingTop: "10px" }}>
        <h3>Chart for temperature and humidity</h3>
      </Header>
      <Content>
        <Collapse>{renderCharts()}</Collapse>
      </Content>
    </Layout>
  );
};

export default GeneralLog;
