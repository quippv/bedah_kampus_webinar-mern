import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
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

export const Order = mongoose.model('order', orderSchema)
