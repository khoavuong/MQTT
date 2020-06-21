import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

export const NewLocation = ({ locations, setLocations, title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  return (
    <div>
      <Button
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
          setLocations([...locations, { name }]);
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
