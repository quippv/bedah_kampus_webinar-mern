import mongoose from 'mongoose'

const bookmarkSchema = new mongoose.Schema(
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

export const Bookmark = mongoose.model('bookmark', bookmarkSchema)
