import dotenv from 'dotenv'
dotenv.config()
// dotenv.config({
//   path: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
// })
import { db } from './src/database'
import server from './server'
import config from './src/config'

const PORT = config.port

server.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`)
})
