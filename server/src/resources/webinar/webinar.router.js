import { Router } from 'express'
import controller from './webinar.controller'

const router = Router()

router.post('', controller.createOne)

router.route('/:id').put(controller.updateOne).delete(controller.removeOne)

export default router
