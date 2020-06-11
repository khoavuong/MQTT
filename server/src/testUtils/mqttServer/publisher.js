import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://localhost:1234')
const topics = {
  tempHumi: 'Topic/TempHumi',
  conditioner: 'Topic/Speaker',
}

client.on('connect', () => {
  console.log('===> Publisher is ready <===')

  setInterval(() => {
    const message = JSON.stringify({
      device_id: 'TempHumi',
      values: [
        Math.floor(Math.random() * 100) + 1,
        Math.floor(Math.random() * 100) + 1,
      ],
    })
    console.log(message)
    client.publish(topics.tempHumi, message)
  }, 5000)
})
