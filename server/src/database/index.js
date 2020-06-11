import mongoose from 'mongoose'

import TempHudis from './models/tempHudis'
import config from '../config'

mongoose.connect(config.db.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {
  console.log('===> Successfully opened the database. <===')
})

db.on('error', () => {
  console.error('===> Something wrong with your database connection. <===')
})

export { db, TempHudis }
