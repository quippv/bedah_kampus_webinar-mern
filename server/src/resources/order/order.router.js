import { Router } from 'express'
import controller from './order.controller'

const router = Router()

router.route('').post(controller.createOne).get(controller.getMany)

export default router
