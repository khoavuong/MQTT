import { Router } from 'express'

import { getTempHudis } from './controllers'

const deviceRoutes = Router()

deviceRoutes.get('/tempHudis', getTempHudis)

export default deviceRoutes
