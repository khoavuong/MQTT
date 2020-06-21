import React, { useState, useEffect } from "react";
import { Tabs, Collapse, Spin } from "antd";
import mqtt from "mqtt";
import { Publisher } from "./Publisher";
import { Subscriber } from "./Subscriber";
import { NewLocation } from "./NewLocation";
import { NewDevice } from "./NewDevice";

const { TabPane } = Tabs;
const { Panel } = Collapse;

// const Demo_URL = "mqtt://13.76.250.158:8083/mqtt";
const WebSocket_URL = "mqtt://13.67.92.217:8083/mqtt";
const client = mqtt.connect(WebSocket_URL);
const topics = ["Topic/TempHumi1"];

export const Controller = () => {
  const [locations, setLocations] = useState([]);
  const [mqttPayload, setMqttPayload] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscribe MQTT
  useEffect(() => {
    let mounted = true;

    client.subscribe(topics);
    client.on("message", function (topic, message) {
      message = message.toString().replace(/ /g, ""); // Remove all white spaces
      const JSONmessage = message // Turn the string in to JSON format
        .replace(/device_id/g, '"device_id"')
        .replace(/values/g, '"values"')
        .replace(/:([^[]*?),/g, ':"$1",');
      const payload = JSON.parse(JSONmessage);
      if (mounted) setMqttPayload(payload);
    });

    return () => {
      client.unsubscribe(topics);
      mounted = false;
    };
  }, []);

  // Fetch Data
  useEffect(() => {
    const delay = (m) => new Promise((r) => setTimeout(r, m)); // Mimic api call

    (async () => {
      let locationsFetch;
      await delay(1500);
      setLoading(false);
      locationsFetch = [
        {
          name: "Phòng ngủ",
          sensors: ["TempHumi1", "TempHumi2"],
          speakers: ["Speaker1"],
        },
        {
          name: "Phòng khách",
          sensors: ["TempHumi3", "TempHumi4"],
          speakers: ["Speaker2", "Speaker3"],
        },
      ];

      setLocations(locationsFetch);
    })();
  }, []);

  const renderlocations = () => {
    return (
      <>
        {locations.map((location) => (
          <Panel header={location.name} key={location.name}>
            {location.sensors &&
              location.sensors.map((sensor) => (
                <Subscriber
                  key={sensor}
                  sensor={sensor}
                  mqttPayload={mqttPayload}
                ></Subscriber>
              ))}
            <NewDevice
              locationName={location.name}
              locations={locations}
              setLocations={setLocations}
              title="sensor"
            />

            <hr style={{ backgroundColor: "black" }}></hr>

            {location.speakers &&
              location.speakers.map((speaker) => (
                <Publisher
                  key={speaker}
                  speaker={speaker}
                  client={client}
                ></Publisher>
              ))}
            <NewDevice
              locationName={location.name}
              locations={locations}
              setLocations={setLocations}
              title="speaker"
            />
          </Panel>
        ))}
      </>
    );
  };

  return (
    <Tabs
      tabBarExtraContent={
        <NewLocation
          setLocations={setLocations}
          locations={locations}
          title="vị trí"
        />
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
  );
};
