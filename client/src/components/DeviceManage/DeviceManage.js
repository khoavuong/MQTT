import React, { useState, useEffect } from "react";

import { List } from "antd/lib/form/Form";
import {
  Button,
  Tabs,
  Skeleton,
  Avatar,
  Modal,
  Row,
  Col,
  Card,
  Layout,
} from "antd";
import { Input, Collapse } from "@material-ui/core";
import iot from "../../api/iot";

const { Header, Content, Footer, Sider } = Layout;

export const DeviceManage = () => {
  const [device, setDevices] = useState([]);
  const [mqttPayload, setMqttPayload] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null);
  const [focusDevice, setFocusDevice] = useState({ name: "nil", room: "nil" });

  const deviceFetchFake = [
    {
      name: "TempHumi1",
      room: "Phòng ngủ",
    },
    {
      name: "TempHumi2",
      room: "Phòng ngủ",
    },
    {
      name: "Speaker1",
      room: "Phòng ngủ",
    },
    {
      name: "TempHumi3",
      room: "Phòng khách",
    },
    {
      name: "TempHumi4",
      room: "Phòng khách",
    },
    {
      name: "Speaker2",
      room: "Phòng khách",
    },
    {
      name: "Speaker3",
      room: "Phòng khách",
    },
  ];

  // Fetch Data
  useEffect(() => {
    const delay = (m) => new Promise((r) => setTimeout(r, m)); // Mimic api call

    (async () => {
      let deviceFetch;
      await delay(1500);
      setLoading(false);

      setDevices(deviceFetchFake);
      setLoading(true);
      setShowModal(false);
    })();
  }, []);

  const handleRename = (e) => {
    setShowModal(false);
    rename();
  };

  const handleDelete = (e) => {
    setShowModal(false);
    deleteDevice();
  };

  const rename = async (e) => {
    console.log({
      old_name: focusDevice.name,
      room: focusDevice.room,
      new_name: newName,
    });
    e.preventDefault();
    setError(null);
    iot
      .post("/api/device/rename", {
        old_name: focusDevice.name,
        room: focusDevice.room,
        new_name: newName,
      })
      .then((res) => {})
      .catch((err) => {
        const errMsg = err.response.data.message;
        setError(errMsg);
      });
  };

  const deleteDevice = async (e) => {
    var i = 0,
      j = 0;
    while (i < device.length) {
      if (
        device[i].name == focusDevice.name ||
        device[i].room == focusDevice.room
      )
        j = i;
      i++;
    }
    device.splice(j, 1);
    setError(null);
    iot
      .post("/api/device/delete", {
        name: focusDevice.name,
        room: focusDevice.room,
      })
      .then((res) => {})
      .catch((err) => {
        const errMsg = err.response.data.message;
        setError(errMsg);
      });
  };

  const renderDevice = () => {
    return (
      <>
        {device.map((item) => (
          <Tabs header={"Room: " + item.room} key={item.room}>
            Name: {item.name}
            <hr style={{ backgroundColor: "black" }}></hr>
            <Button
              key="rename"
              type="dashed"
              onClick={() => setShowModal(true)}
            >
              Rename
            </Button>
            ,
            <Button key="delete" type="dashed" onClick={handleDelete}>
              Delete
            </Button>
          </Tabs>
        ))}
      </>
    );
  };

  return (
    <div>
      <Layout>
        <Header style={{ paddingRight: "20px", backgroundColor: "white" }}>
          {" "}
          Manage Devices{" "}
        </Header>
        <Content
          style={{
            paddingLeft: "10%",
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          {device.map((item) => (
            <div style={{ paddingTop: "1%" }}>
              <Card style={{ width: "600px" }}>
                <Row>
                  <Col span={16}>{item.room + ">" + item.name}</Col>
                  <Col style={{ paddingRight: "10px" }}>
                    <Button
                      key="rename"
                      type="dashed"
                      onClick={() => setShowModal(true)}
                    >
                      Rename
                    </Button>
                  </Col>
                  <Col>
                    <Button key="delete" type="dashed" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      <Modal
        visible={showModal}
        title="Rename"
        footer={[
          <Button key="back" onClick={() => setShowModal(false)}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleRename}>
            OK
          </Button>,
        ]}
      >
        <Row>
          <Col span={12}>Room: </Col>
          <Col span={12} style={{ textAlign: "left" }}>
            {focusDevice.room}
          </Col>
        </Row>
        <Row>
          <Col span={12}>Current name: </Col>
          <Col span={12} style={{ textAlign: "left" }}>
            {focusDevice.name}
          </Col>
        </Row>
        <Row>
          <Col span={12}>Type in new name</Col>
          <Col span={12} style={{ textAlign: "left" }}>
            <Input
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Modal>

      <div></div>
    </div>
  );
};
