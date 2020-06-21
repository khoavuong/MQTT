import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

export const NewDevice = ({ locations, setLocations, title, locationName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  return (
    <div>
      <Button
        ghost
        shape="round"
        style={{ marginRight: "10px" }}
        type="primary"
        onClick={() => setModalVisible(true)}
      >
        Thêm {title}
      </Button>
      <Modal
        title={`Tạo ${title} mới`}
        visible={modalVisible}
        onOk={() => {
          let newDevices = locations.map((location) => {
            if (locationName === location.name) {
              switch (title) {
                case "sensor":
                  location.sensors
                    ? location.sensors.push(name)
                    : (location.sensors = [name]);
                  break;
                case "speaker":
                  location.speakers
                    ? location.speakers.push(name)
                    : (location.speakers = [name]);
                  break;
                default:
              }
              return location;
            }

            return location;
          });
          setLocations(newDevices);
          setName("");
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      >
        <Input
          placeholder={`Tên ${title}`}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};
