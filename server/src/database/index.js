import mongoose from 'mongoose'

const DB_PATH = 'mongodb://localhost:27017/db-dev'

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', () => {
  console.log('Successfully opened the database.')
})

db.on('error', () => {
  console.error('Something wrong with your database connection.')
})

export { db }
