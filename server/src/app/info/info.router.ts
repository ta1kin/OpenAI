import { Router } from "express"

import infoController from "./info.controller"


const infoRouter = Router()

infoRouter.get( '/info', infoController.getInfo )

export default infoRouter