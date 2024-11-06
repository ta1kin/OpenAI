import { Router } from "express"

import dataController from "./data.controller"


const dataRouter = Router()

dataRouter.get( '/data', dataController.getData )

export default dataRouter