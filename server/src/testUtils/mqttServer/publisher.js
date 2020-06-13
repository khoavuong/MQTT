import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://localhost:1234')
const topics = ['temperature-bku', 'humidity-bku']
const message = 'this is a message'

client.on('connect', () => {
  setInterval(() => {
    console.log(message)
    client.publish(topics, message)
  }, 5000)
})
