import React, { useState, useEffect } from "react";
import { Tabs, Collapse, Spin } from "antd";
import mqtt from "mqtt";
import { Publisher } from "./Publisher";
import { Subscriber } from "./Subscriber";
import { NewLocation } from "./NewLocation";

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

      try {
        const payload = JSON.parse(JSONmessage);
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
    const delay = (m) => new Promise((r) => setTimeout(r, m)); // Mimic api call

    (async () => {
      let locationsFetch;
      await delay(1500);
      setLoading(false);
      locationsFetch = [
        {
          name: "Phòng ngủ",
          sensor: { name: "TempHumi", lowerBound: 50, upperBound: 70 },
          speaker: { name: "Speaker", auto: true },
        },
        {
          name: "Phòng khách",
          sensor: { name: "TempHumi1", lowerBound: 30, upperBound: 60 },
          speaker: { name: "Speaker1", auto: false },
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
            <Subscriber
              sensor={location.sensor}
              mqttPayload={mqttPayload}
            ></Subscriber>
            <hr style={{ backgroundColor: "black" }}></hr>
            <Publisher speaker={location.speaker} client={client}></Publisher>
          </Panel>
        ))}
      </>
    );
  };

  return (
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
  );
};
