import { Router } from 'express'
import { protect } from '../middlewares/auth.middleware'
import homeController from './home.controller'

const homeRouter = Router()

homeRouter.get( '/', homeController.hello )
homeRouter.get( '/home', protect, homeController.home )

export default homeRouter