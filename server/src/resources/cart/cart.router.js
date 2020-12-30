import { Router } from 'express'
import controller from './cart.controller'

const router = Router()

router.route('').post(controller.createOne).get(controller.getMany)
router.delete('/:id', controller.removeOne)

export default router
