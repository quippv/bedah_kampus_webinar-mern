import { authControllers } from '../../utils/auth'
import { crudControllers } from '../../utils/crud'
import { Admin } from './admin.model'

export const controllerAdmin = crudControllers(Admin)

export default authControllers(Admin)
