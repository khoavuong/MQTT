import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import api from './src/api'

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use(api)

export default app
