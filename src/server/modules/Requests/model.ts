import mongoose, { Schema, Document } from 'mongoose'

interface IFoodRequest extends Document {
  title: string
  description: string
  status: string
  userDetails: Object
  proposals: Array<any>
}

const defaultProperties = {
  type: String,
  required: true,
}

const FoodRequest = new Schema({
  title: {
    ...defaultProperties
  },

  description: {
    ...defaultProperties
  },

  status: {
    ...defaultProperties
  },

  userDetails: {
    type: Object,
    required: true,
  },

  proposals: {
    type: Array,
    required: false,
  },
},
{
  timestamps: {
    createdAt: 'created_at'
  }
})

export default mongoose.model<IFoodRequest>('FoodRequest', FoodRequest)