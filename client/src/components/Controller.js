import React, { useState, useEffect } from "react";
import { Tabs, Collapse, Spin, Alert } from "antd";
import mqtt from "mqtt";
import { Publisher } from "./Publisher";
import { Subscriber } from "./Subscriber";
import { NewLocation } from "./NewLocation";
import iot from "../api/iot.js";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const WebSocket_URL = "mqtt://13.67.92.217:8083/mqtt";
// const demo_URL = "52.187.125.59";
const client = mqtt.connect(WebSocket_URL);

const topics = ["Topic/TempHumi"];

client.on("connect", (foo) => {
  console.log(`===> Connected to MQTT server . <===`);
});
client.on("error", (err) => {
  console.log("===> Cannot connect to MQQT server. <===");
  console.log(err);
});

export const Controller = () => {
  const [locations, setLocations] = useState([]);
  const [mqttPayload, setMqttPayload] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscribe MQTT
  useEffect(() => {
    let mounted = true;

    client.subscribe(topics);
    client.on("message", function (topic, message) {
      try {
        const payload = JSON.parse(message.toString());
        if (mounted) setMqttPayload(payload);
      } catch (err) {
        console.log(message);
      }
    });

    return () => {
      client.unsubscribe(topics);
      mounted = false;
    };
  }, []);

  // Fetch Data
  useEffect(() => {
    (async () => {
      const realData = await iot.get("/api/users/rooms", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      });
      setLoading(false);

      const locationsFetch = realData.data.data.rooms.map((location) => {
        return {
          name: location.name,
          sensor: {
            name: location.devices.input.deviceId,
            lowerBound: 50,
            upperBound: 70,
          },
          speaker: { name: location.devices.output.deviceId, auto: false },
        };
      });

      setLocations(locationsFetch);
    })();
  }, []);

  const setBound = (name, lowerBound, upperBound) => {
    const newLocations = locations.map((location) => {
      if (location.sensor.name === name)
        return {
          name: location.name,
          speaker: location.speaker,
          sensor: { name: location.sensor.name, lowerBound, upperBound },
        };
      else return location;
    });
    setLocations(newLocations);
  };

  const renderlocations = () => {
    return (
      <>
        {locations.map((location) => (
          <Panel header={location.name} key={location.name}>
            <Subscriber
              sensor={location.sensor}
              mqttPayload={mqttPayload}
              setBound={setBound}
            ></Subscriber>
            <hr style={{ backgroundColor: "black" }}></hr>
            <Publisher
              speaker={location.speaker}
              client={client}
              mqttPayload={mqttPayload}
              sensor={location.sensor}
            ></Publisher>
          </Panel>
        ))}
      </>
    );
  };

  const renderAlert = () => {
    console.log(locations, mqttPayload);
    return mqttPayload.map((device) => {
      for (const location of locations) {
        if (
          location.sensor.name === device.device_id &&
          (device.values[0] < location.sensor.lowerBound ||
            device.values[0] > location.sensor.upperBound)
        ) {
          return (
            <>
              <Alert
                key={device.device_id}
                message={`${device.device_id} is receiving temperature value of ${device.values[0]}, which is not in the [${location.sensor.lowerBound},${location.sensor.upperBound}] device's safe zone`}
                type="error"
                closable
              />
              <br />
            </>
          );
        }
      }
      return null;
    });
  };

  return (
    <>
      {renderAlert()}
      <br />
      <Tabs
        tabBarExtraContent={
          <NewLocation setLocations={setLocations} locations={locations} />
        }
      >
        <TabPane tab="Sensors & Speakers" key="1">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spin />
            </div>
          ) : (
            <Collapse>{renderlocations()}</Collapse>
          )}
        </TabPane>
      </Tabs>
    </>
  );
};
