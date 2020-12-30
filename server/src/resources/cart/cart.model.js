import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
  {
    webinar: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Webinar',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export const Cart = mongoose.model('cart', cartSchema)
