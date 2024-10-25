import { Router } from "express"
import homeController from "./home.controller"

const homeRouter = Router()

homeRouter.get( '/', homeController.hello )
homeRouter.get( '/json', homeController.testJson )

export default homeRouter