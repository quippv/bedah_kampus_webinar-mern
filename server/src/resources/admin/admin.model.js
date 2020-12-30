import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '../../config'

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please input an email')
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('password is invalid')
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

adminSchema.methods.toJSON = function () {
  const admin = this
  const adminObject = admin.toObject()

  delete adminObject.password
  delete adminObject.tokens

  return adminObject
}

adminSchema.methods.generateAuthToken = async function () {
  const admin = this
  const token = jwt.sign({ _id: admin._id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })

  admin.tokens = admin.tokens.concat({ token })
  await admin.save()

  return token
}

adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email })

  if (!admin) {
    throw new Error('unable to login')
  }

  const isMatch = await bcrypt.compare(password, admin.password)

  if (!isMatch) {
    throw new Error('unable to login')
  }

  return admin
}

adminSchema.pre('save', async function (next) {
  const admin = this

  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 8)
  }

  next()
})

export const Admin = mongoose.model('admin', adminSchema)
