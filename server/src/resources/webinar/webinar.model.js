import mongoose from 'mongoose'
import validator from 'validator'

const webinarShcema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isLength(value, { min: 50 })) {
          throw new Error('Please input minimum 100 characters')
        }
      },
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate(value) {
        if (!validator.isDate(value)) {
          throw new Error('Please input a date')
        }
      },
    },
    narasumber: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Admin',
    },
  },
  { timestamps: true }
)

export const Webinar = mongoose.model('webinar', webinarShcema)
