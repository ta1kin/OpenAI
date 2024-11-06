import { Router } from "express"
import { protect } from "../middlewares/auth.middleware"
import settingsController from "./settings.controller"


const settingsRouter = Router()

settingsRouter.use( protect )

settingsRouter.get( '/settings', settingsController.getSettings )
settingsRouter.put( '/settings', settingsController.updateSettings )

export default settingsRouter