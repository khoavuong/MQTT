import mqtt from 'mqtt'

import config from '../../config'

const { server, clientId, topics } = config.mqtt

console.log(config)

const client = mqtt.connect(server, {
  clientId,
})

client.subscribe(topics)

client.on('connect', () => {
  console.log('Connected to MQTT server.')
})

client.on('message', (topic, message, packet) => {
  console.log({ message })
  console.log({ topic })
})

client.on('error', () => {
  console.log('Cannot connect to MQQT server.')
  process.exit(1)
})
