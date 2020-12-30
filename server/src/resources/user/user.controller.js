import { User } from './user.model'
import { authControllers } from '../../utils/auth'
import { crudControllers } from '../../utils/crud'
import sharp from 'sharp'

export const uploadAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}

export const controllerUser = crudControllers(User)

export default authControllers(User)
