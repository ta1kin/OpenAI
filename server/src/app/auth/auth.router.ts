import { Router } from "express"
import authController from "./auth.controller"


const authRouter = Router()

authRouter.post( '/sing-in', authController.singIn )
authRouter.post( '/sing-up', authController.singUp )

authRouter.get( '/verify', authController.verifyEmail )
authRouter.get( '/update-token', authController.updateTokens )

authRouter.patch( 'rewrite-pass', authController.rewritePass )

export default authRouter