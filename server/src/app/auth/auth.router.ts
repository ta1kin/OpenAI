import { Router } from "express"
import authController from "./auth.controller"


const authRouter = Router()

authRouter.post( '/sing-in', authController.singIn )
authRouter.post( '/sing-up', authController.singUp )

authRouter.get( '/verify', authController.verifyEmail )

export default authRouter