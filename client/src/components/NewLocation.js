import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

export const NewLocation = ({ locations, setLocations }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [sensorID, setSensorID] = useState("");
  const [speakerID, setSpeakerID] = useState("");

  const resetInput = () => {
    setRoomName("");
    setSpeakerID("");
    setSensorID("");
  };
  return (
    <div>
      <Button
        shape="round"
        style={{ marginRight: "10px" }}
        type="primary"
        onClick={() => setModalVisible(true)}
      >
        Thêm vị trí
      </Button>

      <Modal
        title={`Tạo vị trí mới`}
        visible={modalVisible}
        onOk={() => {
          const newLocation = {
            name: roomName,
            sensor: { name: sensorID, lowerBound: 30, upperBound: 70 },
            speaker: { name: speakerID, auto: false },
          };
          setLocations([...locations, newLocation]);
          resetInput();
          setModalVisible(false);
        }}
        onCancel={() => {
          resetInput();
          setModalVisible(false);
        }}
      >
        <Input
          placeholder={`Tên vị trí`}
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <br /> <br />
        <Input
          placeholder={`Sensor ID`}
          value={sensorID}
          onChange={(e) => setSensorID(e.target.value)}
        />
        <br /> <br />
        <Input
          placeholder={`Speaker ID`}
          value={speakerID}
          onChange={(e) => setSpeakerID(e.target.value)}
        />
      </Modal>
    </div>
  );
};
