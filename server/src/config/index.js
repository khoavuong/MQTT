import { merge } from 'lodash'

const defaultConfig = {
  port: process.env.PORT || 4000,
}

const developmentConfig = {
  mqtt: {
    server: 'mqtt://localhost:1234',
    topics: ['temperature-bku', 'humidity-bku'],
    clientId: 'mqttjs01',
  },
}

const productionConfig = {
  mqtt: {
    server: 'mqtt://13.67.92.217:8083/mqtt',
    topics: ['temperature-bku', 'humidity-bku'],
  },
}

let config
switch (process.env.NODE_ENV) {
  case 'development':
    config = merge(defaultConfig, developmentConfig)
    break
  case 'production':
    config = merge(defaultConfig, productionConfig)
    break
  default:
    config = defaultConfig
    break
}

export default config
