import { Router } from 'express'
import controller, { controllerUser, uploadAvatar } from './user.controller'
import multer from 'multer'

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  },
})

const router = Router()

router.get('/me', controllerUser.me)
router.put('', controllerUser.updateMe)
router.post('/signout', controller.signout)
router.post('/signoutAll', controller.signoutAll)

router.post(
  '/avatar',
  upload.single('avatar'),
  uploadAvatar,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

export default router
