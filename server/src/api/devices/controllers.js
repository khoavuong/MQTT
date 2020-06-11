import { TempHudis } from '../../database'
import errorHandler from '../../utils/errorHandler'

export const getTempHudis = errorHandler(async (req, res) => {
  const data = await TempHudis.find({})
  res.respondSuccess({ data })
})
