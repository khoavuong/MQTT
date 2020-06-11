import { Router } from 'express'

import './mqtt'
import deviceRoutes from './devices'

const api = Router()

api.use('/device', deviceRoutes)

export default api
