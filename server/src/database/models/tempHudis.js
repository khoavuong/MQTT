import mongoose from 'mongoose'

const schemaName = 'TempHudis'
const { Schema } = mongoose

const schema = new Schema(
  {
    temporature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

export default mongoose.model(schemaName, schema)
