import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import api from './src/api'
import { responseFormatter } from './src/middlewares/responseFormatter'

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use(responseFormatter)

app.use('/api', api)

export default app
