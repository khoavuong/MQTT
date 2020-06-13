import express from 'express'
import bodyParser from 'body-parser'

import { a, b } from './src/api'

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello Babel')
})

app.listen(4000, () => {
  console.log(`App is listening to port 4000`)
})
