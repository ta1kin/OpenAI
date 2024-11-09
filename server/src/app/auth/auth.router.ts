import { Router } from "express"

import authController from "./auth.controller"

import { protect } from "../middlewares/auth.middleware"


const authRouter = Router()

authRouter.post( '/sing-in', authController.singIn )
authRouter.post( '/sing-up', authController.singUp )
authRouter.post( '/send-code', authController.sendSecretCodeToEmail )
authRouter.post( '/verify-code', authController.verifyCode )

authRouter.get( '/verify-email', authController.verifyEmail )
authRouter.get( '/update-token', authController.updateTokens )

authRouter.put( '/rewrite-pass', authController.rewritePass )

authRouter.use( protect )
authRouter.delete( '/delete', authController.deleteUser )

export default authRouter