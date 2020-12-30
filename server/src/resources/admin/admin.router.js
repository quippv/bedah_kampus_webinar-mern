import { Router } from 'express'
import controller, { controllerAdmin } from './admin.controller'
import { controllerUser } from '../user/user.controller'

const router = Router()

router.get('/me', controllerAdmin.me)
router.put('', controllerAdmin.updateMe)
router.post('/signout', controller.signout)
router.post('/signoutAll', controller.signoutAll)
router.get('/user', controllerUser.getAll)
router.get('/user/:id', controllerUser.getOne)

export default router
