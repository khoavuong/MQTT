import { useState, useEffect } from "react";

function useTempHumi(sensorID, mqttPayload) {
  const [tempAndHumid, setTempAndHumid] = useState([]);

  useEffect(() => {
    const matchedSensor = mqttPayload.find(
      (item) => sensorID === item.device_id
    );
    if (matchedSensor) setTempAndHumid(matchedSensor.values);
  }, [mqttPayload, sensorID]);

  return tempAndHumid;
}

export default useTempHumi;
