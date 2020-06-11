import mqtt from 'mqtt'

import config from '../../config'
import { TempHudis } from '../../database'

const { server, clientId, topics } = config.mqtt

const client = mqtt.connect(server, {
  clientId,
})

client.subscribe(topics.sub)

client.on('connect', () => {
  console.log('===> Connected to MQTT server. <===')
})

client.on('message', async (topic, message, packet) => {
  switch (topic) {
    case 'Topic/TempHumi':
      const {
        device_id: deviceId,
        values: [temporature, humidity],
      } = JSON.parse(message.toString())
      const record = new TempHudis({
        deviceId,
        temporature,
        humidity,
      })
      await record.save()
      break
    default:
      break
  }
})

client.on('error', () => {
  console.log('===> Cannot connect to MQQT server. <===')
  process.exit(1)
})

export default client
